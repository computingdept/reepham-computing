// Cloudflare Workers + D1 backend for RHS Computing's code-only practice pilot.
// No pupil names, email addresses, or school identifiers are accepted or stored.

const CODE_PATTERN = /^P-[A-HJ-NP-Z2-9]{10}$/;
const ITEM_PATTERN = /^(j277|h446)-(?:skill|practice)-[a-z0-9-]{1,80}$/;
const ASSIGNMENT_PATTERN = /^(10|11|12|13)\|(j277|h446)-(?:skill|practice)-[a-z0-9-]{1,80}\|(both)?$/;
const LEVELS = new Set(['', 'easy', 'medium']);
const MAX_BODY = 16_384;
const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

export function isIndependentWorkTime(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
  }).formatToParts(date);
  const hour = Number(parts.find(part => part.type === 'hour')?.value);
  const minute = Number(parts.find(part => part.type === 'minute')?.value);
  const now = hour * 60 + minute;
  return (now >= 12 * 60 + 30 && now < 13 * 60 + 20) || now >= 15 * 60 + 30;
}

export function newPracticeCode() {
  const bytes = crypto.getRandomValues(new Uint8Array(10));
  return 'P-' + [...bytes].map(byte => ALPHABET[byte & 31]).join('');
}

export function assignmentKey(cohort, itemId, level) {
  const year = /^Y(10|11|12|13)$/.exec(cohort || '')?.[1];
  if (!year || !ITEM_PATTERN.test(itemId)) return null;
  if ((Number(year) <= 11 ? 'j277' : 'h446') !== itemId.slice(0, 4)) return null;
  const expected = itemId.includes('-skill-') ? 'both' : '';
  if (level !== expected) return null;
  return `${year}|${itemId}|${level}`;
}

function compareSecrets(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || !a || !b) return false;
  const left = new TextEncoder().encode(a);
  const right = new TextEncoder().encode(b);
  if (left.length !== right.length) return false;
  let difference = 0;
  for (let i = 0; i < left.length; i++) difference |= left[i] ^ right[i];
  return difference === 0;
}

function respond(body, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...extraHeaders }
  });
}

async function jsonBody(request) {
  if (!request.headers.get('content-type')?.toLowerCase().includes('application/json')) throw Error('JSON request required');
  const source = await request.text();
  if (source.length > MAX_BODY) throw Error('Request too large');
  let data;
  try { data = JSON.parse(source); } catch { throw Error('Invalid JSON'); }
  if (!data || typeof data !== 'object' || Array.isArray(data)) throw Error('Object expected');
  return data;
}

function allowedOrigin(request, env) {
  const origin = request.headers.get('origin');
  if (!origin) return null;
  const allowed = (env.ALLOWED_ORIGINS || 'https://rhsccs.org').split(',').map(value => value.trim());
  return allowed.includes(origin) ? origin : false;
}

function cohortIsValid(value) { return ['Y10', 'Y11', 'Y12', 'Y13'].includes(value); }
function codeIsValid(value) { return typeof value === 'string' && CODE_PATTERN.test(value); }
function teacherIsValid(request, env) {
  return compareSecrets(request.headers.get('authorization')?.replace(/^Bearer\s+/i, ''), env.TEACHER_TOKEN);
}

async function learner(env, code) {
  return env.DB.prepare('SELECT code, cohort FROM practice_codes WHERE code = ? AND enabled = 1').bind(code).first();
}

async function work(env, code, cohort) {
  const { results } = await env.DB.prepare(`
    SELECT a.assignment_key AS assignmentKey, a.item_id AS itemId, a.level,
      COUNT(t.attempt_id) AS attempts, MAX(t.score) AS bestScore
    FROM assignments a LEFT JOIN attempts t ON t.assignment_key = a.assignment_key AND t.code = ?
    WHERE a.cohort = ? AND a.active = 1
    GROUP BY a.assignment_key ORDER BY a.created_at DESC
  `).bind(code, cohort).all();
  return results;
}

async function handle(request, env) {
  const url = new URL(request.url);
  const path = url.pathname;
  if (path === '/v1/health' && request.method === 'GET') return respond({ ok: true, pilot: true });
  if (!env.DB) return respond({ error: 'Database not configured' }, 503);

  if (path === '/v1/work' && request.method === 'POST') {
    if (!isIndependentWorkTime() && !teacherIsValid(request, env)) return respond({ error: 'Independent work opens at 12:30–13:20 and 15:30–midnight (UK time).' }, 403);
    const { code } = await jsonBody(request);
    if (!codeIsValid(code)) return respond({ error: 'Check your practice code' }, 400);
    const student = await learner(env, code);
    if (!student) return respond({ error: 'Practice code not recognised' }, 404);
    return respond({ cohort: student.cohort, work: await work(env, code, student.cohort) });
  }

  if (path === '/v1/attempts' && request.method === 'POST') {
    if (!isIndependentWorkTime() && !teacherIsValid(request, env)) return respond({ error: 'Independent work is closed at this time.' }, 403);
    const { code, assignmentKey: key, attemptId, score, level, source } = await jsonBody(request);
    if (!codeIsValid(code) || typeof key !== 'string' || !ASSIGNMENT_PATTERN.test(key) ||
        typeof attemptId !== 'string' || !/^[0-9a-f-]{36}$/i.test(attemptId) ||
        !Number.isInteger(score) || score < 0 || score > 100 ||
        !LEVELS.has(level || '') || !['skill', 'practice'].includes(source)) {
      return respond({ error: 'Invalid practice attempt' }, 400);
    }
    if (key.includes('-skill-') !== (source === 'skill') ||
        (source === 'skill' ? !['easy', 'medium'].includes(level) : Boolean(level))) {
      return respond({ error: 'Activity level does not match assignment' }, 400);
    }
    const student = await learner(env, code);
    if (!student || !key.startsWith(student.cohort.slice(1) + '|')) return respond({ error: 'Practice code not recognised' }, 404);
    const activity = await env.DB.prepare('SELECT assignment_key FROM assignments WHERE assignment_key = ? AND cohort = ? AND active = 1').bind(key, student.cohort).first();
    if (!activity) return respond({ error: 'This activity is not assigned' }, 403);
    const recent = await env.DB.prepare("SELECT COUNT(*) AS n FROM attempts WHERE code = ? AND created_at > datetime('now', '-1 minute')").bind(code).first();
    if (Number(recent?.n || 0) >= 8) return respond({ error: 'Please wait before submitting more attempts' }, 429);
    const result = await env.DB.prepare(`
      INSERT OR IGNORE INTO attempts (attempt_id, code, assignment_key, score, level, source)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(attemptId, code, key, score, level || '', source).run();
    return respond({ saved: Boolean(result.meta?.changes), duplicate: !result.meta?.changes });
  }

  if (path.startsWith('/v1/teacher/')) {
    if (!teacherIsValid(request, env)) return respond({ error: 'Teacher access required' }, 401);
    if (path === '/v1/teacher/codes' && request.method === 'POST') {
      const { cohort, count } = await jsonBody(request);
      if (!cohortIsValid(cohort) || !Number.isInteger(count) || count < 1 || count > 100) return respond({ error: 'Choose a cohort and 1–100 codes' }, 400);
      const created = [];
      for (let i = 0; i < count; i++) {
        let saved = false;
        for (let retry = 0; retry < 5 && !saved; retry++) {
          const code = newPracticeCode();
          const row = await env.DB.prepare('INSERT OR IGNORE INTO practice_codes (code, cohort) VALUES (?, ?)').bind(code, cohort).run();
          if (row.meta?.changes) { created.push(code); saved = true; }
        }
        if (!saved) return respond({ error: 'Unable to issue all codes', created }, 503);
      }
      // Store code-to-pupil-name mappings privately at school, never in this API.
      return respond({ cohort, codes: created }, 201);
    }
    if (path === '/v1/teacher/assignments' && request.method === 'POST') {
      const { cohort, itemId, level } = await jsonBody(request);
      const key = assignmentKey(cohort, itemId, level || '');
      if (!key) return respond({ error: 'Invalid activity assignment' }, 400);
      const result = await env.DB.prepare('INSERT OR IGNORE INTO assignments (assignment_key, cohort, item_id, level) VALUES (?, ?, ?, ?)').bind(key, cohort, itemId, level || '').run();
      return respond({ assignmentKey: key, added: Boolean(result.meta?.changes) }, 201);
    }
    if (path === '/v1/teacher/progress' && request.method === 'GET') {
      const cohort = url.searchParams.get('cohort');
      if (!cohortIsValid(cohort)) return respond({ error: 'Choose Year 10 or Year 11' }, 400);
      const students = await env.DB.prepare('SELECT code FROM practice_codes WHERE cohort = ? AND enabled = 1 ORDER BY code').bind(cohort).all();
      const assignments = await env.DB.prepare('SELECT assignment_key AS assignmentKey, item_id AS itemId, level FROM assignments WHERE cohort = ? AND active = 1 ORDER BY created_at DESC').bind(cohort).all();
      const attempts = await env.DB.prepare(`SELECT t.code, t.assignment_key AS assignmentKey, t.level,
        COUNT(*) AS attempts, MAX(t.score) AS bestScore, MAX(t.created_at) AS lastAttempt
        FROM attempts t JOIN practice_codes p ON p.code = t.code
        WHERE p.cohort = ? GROUP BY t.code, t.assignment_key, t.level`).bind(cohort).all();
      return respond({ cohort, codes: students.results.map(row => row.code), assignments: assignments.results, progress: attempts.results });
    }
  }
  return respond({ error: 'Not found' }, 404);
}

export default {
  async fetch(request, env) {
    const origin = allowedOrigin(request, env);
    if (origin === false) return respond({ error: 'Origin not permitted' }, 403);
    const cors = origin ? { 'access-control-allow-origin': origin, 'vary': 'Origin', 'access-control-allow-methods': 'GET, POST, OPTIONS', 'access-control-allow-headers': 'Content-Type, Authorization', 'access-control-max-age': '600' } : {};
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    let reply;
    try { reply = await handle(request, env); }
    catch (error) {
      const invalidInput = error instanceof Error && /^(JSON request required|Request too large|Invalid JSON|Object expected)$/.test(error.message);
      reply = respond({ error: invalidInput ? error.message : 'Service temporarily unavailable' }, invalidInput ? 400 : 503);
    }
    const headers = new Headers(reply.headers);
    for (const [key, value] of Object.entries(cors)) headers.set(key, value);
    return new Response(reply.body, { status: reply.status, headers });
  }
};

// Cloudflare Workers + D1 backend for RHS Computing's code-only practice pilot.
// No pupil names, email addresses, or school identifiers are accepted or stored.

const CODE_PATTERN = /^P-[A-HJ-NP-Z2-9]{10}$/;
const ITEM_PATTERN = /^(j277|h446)-(?:skill|practice)-[a-z0-9-]{1,80}$/;
const ASSIGNMENT_PATTERN = /^(10|11|12|13)\|(j277|h446)-(?:skill|practice)-[a-z0-9-]{1,80}\|(both)?$/;
const LEVELS = new Set(['', 'easy', 'medium']);
const MAX_BODY = 16_384;
const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const USERNAME_PATTERN = /^[a-z0-9][a-z0-9._-]{2,39}$/;
const PASSWORD_PATTERN = /^[0-9]{4}$/;
const SESSION_PATTERN = /^[A-Za-z0-9_-]{43}$/;
// Matches all 63 activated PIN hashes and Cloudflare's 100,000-iteration PBKDF2 limit.
const PASSWORD_ITERATIONS = 100_000;
const SESSION_LIFETIME_SECONDS = 8 * 60 * 60;
const LOGIN_ATTEMPT_LIMIT = 5;
const LOGIN_LOCK_SECONDS = 15 * 60;
const encoder = new TextEncoder();
const INDEPENDENT_WORK_SCHEDULE = 'Independent work is available Mon–Fri 12:30–13:20 and 15:30–midnight, and all day Sat–Sun (UK time).';

export function isIndependentWorkTime(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London', weekday: 'long', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
  }).formatToParts(date);
  const weekday = parts.find(part => part.type === 'weekday')?.value;
  if (weekday === 'Saturday' || weekday === 'Sunday') return true;
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

function hex(bytes) { return [...bytes].map(byte => byte.toString(16).padStart(2, '0')).join(''); }
function fromHex(value) { return new Uint8Array(value.match(/../g).map(part => parseInt(part, 16))); }
function randomHex(length) { return hex(crypto.getRandomValues(new Uint8Array(length))); }
function normalizeUsername(value) {
  if (typeof value !== 'string') return null;
  const username = value.trim().toLowerCase();
  return USERNAME_PATTERN.test(username) ? username : null;
}
async function digest(value) {
  return hex(new Uint8Array(await crypto.subtle.digest('SHA-256', encoder.encode(value))));
}
async function usernameKey(username) { return digest('rhs-my-work-login:v1:' + username); }
async function passwordHash(password, salt) {
  const key = await crypto.subtle.importKey('raw', encoder.encode(password), 'PBKDF2', false, ['deriveBits']);
  const derived = await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt: fromHex(salt), iterations: PASSWORD_ITERATIONS }, key, 256);
  return hex(new Uint8Array(derived));
}
async function checkPassword(password, row) {
  return compareSecrets(await passwordHash(password, row.password_salt), row.password_hash);
}
function newSessionToken() {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return btoa(String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
async function sessionLearner(request, env) {
  const token = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '') || '';
  if (!SESSION_PATTERN.test(token)) return null;
  return env.DB.prepare(`SELECT p.code, p.cohort FROM login_sessions s
    JOIN practice_codes p ON p.code = s.code
    WHERE s.token_hash = ? AND s.expires_at > ? AND p.enabled = 1`)
    .bind(await digest(token), Math.floor(Date.now() / 1000)).first();
}

async function signIn(request, env) {
  const { username: rawUsername, password } = await jsonBody(request);
  const username = normalizeUsername(rawUsername);
  if (!username || typeof password !== 'string' || !PASSWORD_PATTERN.test(password)) {
    return respond({ error: 'Username or password not recognised' }, 401);
  }
  const key = await usernameKey(username);
  const row = await env.DB.prepare(`SELECT l.code, l.password_salt, l.password_hash, l.failed_attempts, l.locked_until
    FROM login_profiles l JOIN practice_codes p ON p.code = l.code
    WHERE l.username_key = ? AND p.enabled = 1`).bind(key).first();
  if (!row) return respond({ error: 'Username or password not recognised' }, 401);
  const now = Math.floor(Date.now() / 1000);
  if (row.locked_until > now) return respond({ error: 'Too many attempts. Please try again later.' }, 429);
  if (!(await checkPassword(password, row))) {
    const failures = row.locked_until && row.locked_until <= now ? 1 : row.failed_attempts + 1;
    const locked = failures >= LOGIN_ATTEMPT_LIMIT ? now + LOGIN_LOCK_SECONDS : 0;
    await env.DB.prepare('UPDATE login_profiles SET failed_attempts = ?, locked_until = ? WHERE username_key = ?')
      .bind(failures, locked, key).run();
    return respond({ error: 'Username or password not recognised' }, 401);
  }
  await env.DB.prepare('UPDATE login_profiles SET failed_attempts = 0, locked_until = 0 WHERE username_key = ?').bind(key).run();
  const token = newSessionToken();
  const expiresAt = now + SESSION_LIFETIME_SECONDS;
  await env.DB.prepare('INSERT INTO login_sessions (token_hash, code, expires_at) VALUES (?, ?, ?)')
    .bind(await digest(token), row.code, expiresAt).run();
  return respond({ session: token, expiresAt });
}

async function provisionLogins(request, env) {
  const { logins } = await jsonBody(request);
  if (!Array.isArray(logins) || logins.length < 1 || logins.length > 5) return respond({ error: 'Provide 1–5 logins per request' }, 400);
  const seen = new Set();
  const prepared = [];
  for (const entry of logins) {
    const username = normalizeUsername(entry?.username);
    const code = entry?.code;
    const password = entry?.password;
    if (!username || !codeIsValid(code) || typeof password !== 'string' || !PASSWORD_PATTERN.test(password) || seen.has(username)) {
      return respond({ error: 'Check the anonymous usernames, codes and passwords' }, 400);
    }
    seen.add(username);
    prepared.push({ username, code, password, key: await usernameKey(username) });
  }
  const result = [];
  for (const entry of prepared) {
    const code = await learner(env, entry.code);
    if (!code) return respond({ error: 'One or more practice codes are not active. No more rows were imported.' }, 409);
    const existing = await env.DB.prepare('SELECT code, password_salt, password_hash FROM login_profiles WHERE username_key = ?').bind(entry.key).first();
    if (existing) {
      if (existing.code !== entry.code || !(await checkPassword(entry.password, existing))) {
        return respond({ error: 'A username is already assigned differently. No more rows were imported.' }, 409);
      }
      result.push({ username: entry.username, status: 'already-imported' });
      continue;
    }
    const assigned = await env.DB.prepare('SELECT username_key FROM login_profiles WHERE code = ?').bind(entry.code).first();
    if (assigned) return respond({ error: 'A practice code is already assigned. No more rows were imported.' }, 409);
    const salt = randomHex(16);
    const hash = await passwordHash(entry.password, salt);
    await env.DB.prepare('INSERT INTO login_profiles (username_key, code, password_salt, password_hash) VALUES (?, ?, ?, ?)')
      .bind(entry.key, entry.code, salt, hash).run();
    result.push({ username: entry.username, status: 'created' });
  }
  return respond({ results: result }, 201);
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
  const groupWork = await env.DB.prepare(`
    SELECT a.assignment_key AS assignmentKey, a.item_id AS itemId, a.level,
      COUNT(t.attempt_id) AS attempts, MAX(t.score) AS bestScore
    FROM assignments a LEFT JOIN attempts t ON t.assignment_key = a.assignment_key AND t.code = ?
    WHERE a.cohort = ? AND a.active = 1
    GROUP BY a.assignment_key ORDER BY a.created_at DESC
  `).bind(code, cohort).all();
  const individualWork = await env.DB.prepare(`
    SELECT a.assignment_key AS assignmentKey, a.item_id AS itemId, a.level,
      COUNT(t.attempt_id) AS attempts, MAX(t.score) AS bestScore
    FROM student_assignments s JOIN assignments a ON a.assignment_key = s.assignment_key
    LEFT JOIN attempts t ON t.assignment_key = a.assignment_key AND t.code = s.code
    WHERE s.code = ? AND s.active = 1
    GROUP BY a.assignment_key ORDER BY s.created_at DESC
  `).bind(code).all();
  return [...new Map([...groupWork.results, ...individualWork.results]
    .map(item => [item.assignmentKey, item])).values()];
}

async function handle(request, env) {
  const url = new URL(request.url);
  const path = url.pathname;
  if (path === '/v1/health' && request.method === 'GET') return respond({ ok: true, pilot: true });
  if (!env.DB) return respond({ error: 'Database not configured' }, 503);

  if (path === '/v1/login' && request.method === 'POST') return signIn(request, env);
  if (path === '/v1/logout' && request.method === 'POST') {
    const token = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '') || '';
    if (SESSION_PATTERN.test(token)) await env.DB.prepare('DELETE FROM login_sessions WHERE token_hash = ?').bind(await digest(token)).run();
    return respond({ signedOut: true });
  }

  if (path === '/v1/work' && request.method === 'POST') {
    if (!isIndependentWorkTime() && !teacherIsValid(request, env)) return respond({ error: INDEPENDENT_WORK_SCHEDULE }, 403);
    const { code } = await jsonBody(request);
    const student = code === undefined ? await sessionLearner(request, env)
      : codeIsValid(code) ? await learner(env, code) : null;
    if (!student) return respond({ error: 'Practice code not recognised' }, 404);
    return respond({ cohort: student.cohort, work: await work(env, student.code, student.cohort) });
  }

  if (path === '/v1/attempts' && request.method === 'POST') {
    if (!isIndependentWorkTime() && !teacherIsValid(request, env)) return respond({ error: INDEPENDENT_WORK_SCHEDULE }, 403);
    const { code, assignmentKey: key, attemptId, score, level, source } = await jsonBody(request);
    // Pilot Skills can submit through the anonymous login session. Legacy
    // practice-code submissions remain supported for existing clients.
    const student = code === undefined ? await sessionLearner(request, env)
      : codeIsValid(code) ? await learner(env, code) : null;
    if (!student || typeof key !== 'string' || !ASSIGNMENT_PATTERN.test(key) ||
        typeof attemptId !== 'string' || !/^[0-9a-f-]{36}$/i.test(attemptId) ||
        !Number.isInteger(score) || score < 0 || score > 100 ||
        !LEVELS.has(level || '') || !['skill', 'practice'].includes(source)) {
      return respond({ error: 'Invalid practice attempt' }, 400);
    }
    if (key.includes('-skill-') !== (source === 'skill') ||
        (source === 'skill' ? !['easy', 'medium'].includes(level) : Boolean(level))) {
      return respond({ error: 'Activity level does not match assignment' }, 400);
    }
    if (!key.startsWith(student.cohort.slice(1) + '|')) return code === undefined
      ? respond({ error: 'Activity does not match your year group' }, 403)
      : respond({ error: 'Practice code not recognised' }, 404);
    let activity = await env.DB.prepare('SELECT assignment_key FROM assignments WHERE assignment_key = ? AND cohort = ? AND active = 1').bind(key, student.cohort).first();
    if (!activity) activity = await env.DB.prepare('SELECT assignment_key FROM student_assignments WHERE assignment_key = ? AND code = ? AND active = 1').bind(key, student.code).first();
    if (!activity) return respond({ error: 'This activity is not assigned' }, 403);
    const recent = await env.DB.prepare("SELECT COUNT(*) AS n FROM attempts WHERE code = ? AND created_at > datetime('now', '-1 minute')").bind(student.code).first();
    if (Number(recent?.n || 0) >= 8) return respond({ error: 'Please wait before submitting more attempts' }, 429);
    const result = await env.DB.prepare(`
      INSERT OR IGNORE INTO attempts (attempt_id, code, assignment_key, score, level, source)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(attemptId, student.code, key, score, level || '', source).run();
    return respond({ saved: Boolean(result.meta?.changes), duplicate: !result.meta?.changes });
  }

  if (path.startsWith('/v1/teacher/')) {
    if (!teacherIsValid(request, env)) return respond({ error: 'Teacher access required' }, 401);
    if (path === '/v1/teacher/logins' && request.method === 'POST') return provisionLogins(request, env);
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
      const activated = result.meta?.changes ? null : await env.DB.prepare('UPDATE assignments SET active = 1 WHERE assignment_key = ? AND active = 0').bind(key).run();
      return respond({ assignmentKey: key, added: Boolean(result.meta?.changes || activated?.meta?.changes) }, 201);
    }
    if (path === '/v1/teacher/student-assignments' && request.method === 'POST') {
      const { username: rawUsername, itemId, level } = await jsonBody(request);
      const username = normalizeUsername(rawUsername);
      if (!username || typeof itemId !== 'string' || typeof level !== 'string') return respond({ error: 'Choose an anonymous username and activity' }, 400);
      const profile = await env.DB.prepare(`SELECT p.code, p.cohort FROM login_profiles l
        JOIN practice_codes p ON p.code = l.code
        WHERE l.username_key = ? AND p.enabled = 1`).bind(await usernameKey(username)).first();
      if (!profile) return respond({ error: 'Anonymous username not found among active logins' }, 404);
      const key = assignmentKey(profile.cohort, itemId, level);
      if (!key) return respond({ error: 'Activity does not match the pupil year or level' }, 400);
      // Keep an inactive activity definition for the attempts foreign key; do not grant it to the cohort.
      await env.DB.prepare('INSERT OR IGNORE INTO assignments (assignment_key, cohort, item_id, level, active) VALUES (?, ?, ?, ?, 0)')
        .bind(key, profile.cohort, itemId, level).run();
      const result = await env.DB.prepare('INSERT OR IGNORE INTO student_assignments (code, assignment_key) VALUES (?, ?)')
        .bind(profile.code, key).run();
      return respond({ cohort: profile.cohort, assignmentKey: key, added: Boolean(result.meta?.changes), scope: 'individual' }, 201);
    }
    if (path === '/v1/teacher/student-progress' && request.method === 'POST') {
      const { username: rawUsername } = await jsonBody(request);
      const username = normalizeUsername(rawUsername);
      if (!username) return respond({ error: 'Enter an anonymous username' }, 400);
      const profile = await env.DB.prepare(`SELECT p.code, p.cohort FROM login_profiles l
        JOIN practice_codes p ON p.code = l.code
        WHERE l.username_key = ? AND p.enabled = 1`).bind(await usernameKey(username)).first();
      if (!profile) return respond({ error: 'Anonymous username not found among active logins' }, 404);
      return respond({ username, cohort: profile.cohort, work: await work(env, profile.code, profile.cohort) });
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
      // Log only exception type/message for diagnosis: never request headers or bodies.
      console.error('MY_WORK_API_ERROR', error?.name || 'Error', String(error?.message || 'Unknown').slice(0, 300));
      const invalidInput = error instanceof Error && /^(JSON request required|Request too large|Invalid JSON|Object expected)$/.test(error.message);
      reply = respond({ error: invalidInput ? error.message : 'Service temporarily unavailable' }, invalidInput ? 400 : 503);
    }
    const headers = new Headers(reply.headers);
    for (const [key, value] of Object.entries(cors)) headers.set(key, value);
    return new Response(reply.body, { status: reply.status, headers });
  }
};


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
    const expectedCohort = entry?.expectedCohort;
    if (!username || !codeIsValid(code) || typeof password !== 'string' || !PASSWORD_PATTERN.test(password) ||
        !cohortIsValid(expectedCohort) || seen.has(username)) {
      return respond({ error: 'Every login needs a valid anonymous username, practice code, four-digit PIN and expected year group (expectedCohort: Y10–Y13)' }, 400);
    }
    seen.add(username);
    prepared.push({ username, code, password, expectedCohort, key: await usernameKey(username) });
  }
  // Preflight the entire batch before inserting any account. A practice code
  // allocated to another year must never silently override the private roster.
  for (const entry of prepared) {
    const code = await learner(env, entry.code);
    if (!code || code.cohort !== entry.expectedCohort) {
      return respond({ error: 'Login import stopped: a practice code is inactive or does not match its expected year group. No rows in this batch were imported.' }, 409);
    }
  }
  const result = [];
  for (const entry of prepared) {
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

async function auditLoginCohorts(request, env) {
  const { roster, confirm, previewToken } = await jsonBody(request);
  if (!Array.isArray(roster) || roster.length < 1 || roster.length > 150 || typeof confirm !== 'boolean') {
    return respond({ error: 'Provide 1–150 original roster rows and choose preview or confirm.' }, 400);
  }
  const expected = new Map();
  for (const entry of roster) {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry) ||
        Object.keys(entry).some(key => !['username', 'cohort'].includes(key))) {
      return respond({ error: 'Use only anonymous username and cohort. Never submit PINs, codes or pupil names.' }, 400);
    }
    const username = normalizeUsername(entry.username);
    if (!username || entry.username !== username || !cohortIsValid(entry.cohort)) {
      return respond({ error: 'Check each anonymous username and year (Y10–Y13).' }, 400);
    }
    const key = await usernameKey(username);
    if (expected.has(key)) return respond({ error: 'Duplicate username in original roster: ' + username }, 400);
    expected.set(key, { username, cohort: entry.cohort });
  }

  // Only teacher-authenticated requests can compare registrations. Do not
  // expose practice codes, username hashes, or PINs in API responses.
  const active = await env.DB.prepare(`SELECT l.username_key, p.code, p.cohort
    FROM login_profiles l JOIN practice_codes p ON p.code = l.code
    WHERE p.enabled = ?`).bind(1).all();
  const found = new Set();
  const corrections = [];
  const currentCounts = Object.fromEntries(['Y10', 'Y11', 'Y12', 'Y13'].map(year => [year, 0]));
  const expectedCounts = Object.fromEntries(['Y10', 'Y11', 'Y12', 'Y13'].map(year => [year, 0]));
  for (const { cohort } of expected.values()) expectedCounts[cohort]++;
  for (const row of active.results) {
    currentCounts[row.cohort] = (currentCounts[row.cohort] || 0) + 1;
    const original = expected.get(row.username_key);
    if (!original) continue;
    found.add(row.username_key);
    if (original.cohort !== row.cohort) corrections.push({ username: original.username, code: row.code, previousCohort: row.cohort, targetCohort: original.cohort });
  }
  const missing = [...expected.entries()].filter(([key]) => !found.has(key)).map(([, row]) => row.username).sort();
  const unlistedActive = active.results.length - found.size;
  corrections.sort((a, b) => a.username.localeCompare(b.username));
  const ready = !missing.length && !unlistedActive && found.size === expected.size;
  // Bind a confirmation to the same roster, exact registrations and their
  // current years. If anything changes, the teacher must preview again.
  const fingerprintRows = active.results.map(row => [row.username_key, row.code, row.cohort, expected.get(row.username_key)?.cohort || 'unlisted']);
  fingerprintRows.sort((a, b) => a[0].localeCompare(b[0]));
  const fingerprint = await digest('cohort-audit:v1:' + JSON.stringify(fingerprintRows));
  const response = {
    ready, rosterCount: expected.size, activeCount: active.results.length,
    missing, unlistedActive, registeredCounts: currentCounts, expectedCounts,
    matchedCount: found.size - corrections.length,
    mismatches: corrections.map(({ username, previousCohort, targetCohort }) => ({ username, registeredCohort: previousCohort, expectedCohort: targetCohort }))
  };
  if (!confirm) return respond({ ...response, previewToken: ready ? fingerprint : null });
  if (!ready) return respond({ error: 'The original roster does not cover every active login. Nothing was changed.', ...response }, 409);
  if (typeof previewToken !== 'string' || !compareSecrets(previewToken, fingerprint)) {
    return respond({ error: 'The roster or registrations have changed since preview. Audit again before confirming. Nothing was changed.' }, 409);
  }
  if (!corrections.length) return respond({ ...response, corrected: 0, progressPreserved: true });

  // One SQLite UPDATE statement makes all approved corrections atomically.
  // The MATERIALIZED guard is evaluated once from the pre-update years: if
  // any affected account changed since preflight, zero rows are updated.
  const values = corrections.map(() => '(?, ?, ?)').join(', ');
  const binds = corrections.flatMap(row => [row.code, row.previousCohort, row.targetCohort]);
  const update = await env.DB.prepare(`WITH corrections(code, previous, target) AS MATERIALIZED (VALUES ${values}),
    checked AS MATERIALIZED (SELECT COUNT(*) AS n FROM corrections c
      JOIN practice_codes p ON p.code = c.code WHERE p.cohort = c.previous AND p.enabled = 1)
    UPDATE practice_codes SET cohort = (SELECT target FROM corrections c WHERE c.code = practice_codes.code)
    WHERE code IN (SELECT code FROM corrections) AND (SELECT n FROM checked) = ?`)
    .bind(...binds, corrections.length).run();
  if (update.meta?.changes !== corrections.length) {
    return respond({ error: 'Registrations changed during correction. Check the audit again before proceeding.', corrected: Number(update.meta?.changes || 0) }, 409);
  }
  return respond({ ...response, corrected: corrections.length, progressPreserved: true });
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
      COUNT(CASE WHEN t.level NOT LIKE 'q-%' THEN t.attempt_id END) AS attempts,
      MAX(CASE WHEN t.level NOT LIKE 'q-%' THEN t.score END) AS bestScore,
      COUNT(CASE WHEN t.level LIKE 'q-%' THEN t.attempt_id END) AS questionsAttempted,
      COALESCE(SUM(CASE WHEN t.level LIKE 'q-%' AND t.score = 100 THEN 1 ELSE 0 END), 0) AS firstTryCorrect,
      COUNT(CASE WHEN t.level = 'q-easy' THEN t.attempt_id END) AS easyQuestions,
      COALESCE(SUM(CASE WHEN t.level = 'q-easy' AND t.score = 100 THEN 1 ELSE 0 END), 0) AS easyCorrect,
      COUNT(CASE WHEN t.level = 'q-medium' THEN t.attempt_id END) AS mediumQuestions,
      COALESCE(SUM(CASE WHEN t.level = 'q-medium' AND t.score = 100 THEN 1 ELSE 0 END), 0) AS mediumCorrect,
      COUNT(CASE WHEN t.level = 'q-quiz' THEN t.attempt_id END) AS quizQuestions,
      COALESCE(SUM(CASE WHEN t.level = 'q-quiz' AND t.score = 100 THEN 1 ELSE 0 END), 0) AS quizCorrect
    FROM assignments a LEFT JOIN attempts t ON t.assignment_key = a.assignment_key AND t.code = ?
    WHERE a.cohort = ? AND a.active = 1
    GROUP BY a.assignment_key ORDER BY a.created_at DESC
  `).bind(code, cohort).all();
  const individualWork = await env.DB.prepare(`
    SELECT a.assignment_key AS assignmentKey, a.item_id AS itemId, a.level,
      COUNT(CASE WHEN t.level NOT LIKE 'q-%' THEN t.attempt_id END) AS attempts,
      MAX(CASE WHEN t.level NOT LIKE 'q-%' THEN t.score END) AS bestScore,
      COUNT(CASE WHEN t.level LIKE 'q-%' THEN t.attempt_id END) AS questionsAttempted,
      COALESCE(SUM(CASE WHEN t.level LIKE 'q-%' AND t.score = 100 THEN 1 ELSE 0 END), 0) AS firstTryCorrect,
      COUNT(CASE WHEN t.level = 'q-easy' THEN t.attempt_id END) AS easyQuestions,
      COALESCE(SUM(CASE WHEN t.level = 'q-easy' AND t.score = 100 THEN 1 ELSE 0 END), 0) AS easyCorrect,
      COUNT(CASE WHEN t.level = 'q-medium' THEN t.attempt_id END) AS mediumQuestions,
      COALESCE(SUM(CASE WHEN t.level = 'q-medium' AND t.score = 100 THEN 1 ELSE 0 END), 0) AS mediumCorrect,
      COUNT(CASE WHEN t.level = 'q-quiz' THEN t.attempt_id END) AS quizQuestions,
      COALESCE(SUM(CASE WHEN t.level = 'q-quiz' AND t.score = 100 THEN 1 ELSE 0 END), 0) AS quizCorrect
    FROM student_assignments s JOIN assignments a ON a.assignment_key = s.assignment_key
    LEFT JOIN attempts t ON t.assignment_key = a.assignment_key AND t.code = s.code
    WHERE s.code = ? AND s.active = 1 AND a.cohort = ?
    GROUP BY a.assignment_key ORDER BY s.created_at DESC
  `).bind(code, cohort).all();
  const older = [...new Map([...groupWork.results, ...individualWork.results]
    .map(item => [item.assignmentKey, item])).values()];
  const grouped = await workSetRows(env, code, cohort);
  const groupedKeys = new Set(grouped.map(row => row.assignmentKey));
  return [...grouped, ...older.filter(row => !groupedKeys.has(row.assignmentKey))];
}

// Classwork can run during lessons for seven days after assignment. This
// registry mirrors the catalogue's workType: "classwork" entries. Other
// activities remain independent practice and keep their UK-time restrictions.
const CLASSWORK_PILOT = /^(12|13)\|h446-(?:skill-p1-convert\|both|practice-141-a\|)$/;
const isClasswork = key => CLASSWORK_PILOT.test(key || '');
export async function liveClasswork(env, student, key) {
  if (!isClasswork(key)) return false;
  const cohort = await env.DB.prepare(`
    SELECT assignment_key FROM assignments
    WHERE assignment_key = ? AND cohort = ? AND active = 1
      AND created_at >= datetime('now', '-7 days')
  `).bind(key, student.cohort).first();
  if (cohort) return true;
  const individual = await env.DB.prepare(`
    SELECT s.assignment_key FROM student_assignments s
    JOIN assignments a ON a.assignment_key = s.assignment_key
    WHERE s.assignment_key = ? AND s.code = ? AND s.active = 1
      AND s.created_at >= datetime('now', '-7 days')
  `).bind(key, student.code).first();
  return Boolean(individual);
}

// A work set is one teacher assignment containing several existing activities.
// The legacy assignments/attempts tables are deliberately not rewritten, so
// historic scores and individual allocations remain available.
function ukToday(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London', year: 'numeric', month: '2-digit', day: '2-digit'
  }).formatToParts(date);
  const part = name => parts.find(value => value.type === name)?.value;
  return `${part('year')}-${part('month')}-${part('day')}`;
}

export function workSetIsCurrent(set, date = new Date()) {
  if (!set || Number(set.active) !== 1) return false;
  if (set.kind === 'homework') return typeof set.dueDate === 'string' && ukToday(date) <= set.dueDate;
  if (set.kind !== 'classwork' || typeof set.createdAt !== 'string') return false;
  const issued = Date.parse(set.createdAt.replace(' ', 'T') + (set.createdAt.includes('Z') ? '' : 'Z'));
  return Number.isFinite(issued) && date.getTime() >= issued && date.getTime() < issued + 7 * 86400000;
}

function missingWorkSets(error) {
  return /no such table: (?:work_sets|work_set_items)/i.test(String(error?.message || ''));
}

async function ensureWorkSetTables(env) {
  // Additive first-use migration, invoked only by an authenticated teacher
  // creating a work set. No existing pupil/assignment/attempt row is modified.
  await env.DB.prepare(`CREATE TABLE IF NOT EXISTS work_sets (
    id TEXT PRIMARY KEY,
    cohort TEXT NOT NULL CHECK (cohort IN ('Y10','Y11','Y12','Y13')),
    title TEXT NOT NULL,
    kind TEXT NOT NULL CHECK (kind IN ('classwork','homework')),
    scope TEXT NOT NULL CHECK (scope IN ('cohort','individual')),
    target_code TEXT REFERENCES practice_codes(code),
    due_date TEXT,
    active INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )`).run();
  await env.DB.prepare(`CREATE TABLE IF NOT EXISTS work_set_items (
    work_set_id TEXT NOT NULL REFERENCES work_sets(id),
    assignment_key TEXT NOT NULL REFERENCES assignments(assignment_key),
    position INTEGER NOT NULL,
    PRIMARY KEY (work_set_id, assignment_key)
  )`).run();
  await env.DB.prepare('CREATE INDEX IF NOT EXISTS work_sets_by_year ON work_sets(cohort, active, target_code)').run();
}

async function workSetRows(env, code, cohort) {
  try {
    const data = await env.DB.prepare(`
      SELECT s.id AS packageId, s.title AS packageTitle, s.kind, s.kind AS workType,
        s.created_at AS createdAt, s.due_date AS dueDate, s.active,
        a.assignment_key AS assignmentKey, a.item_id AS itemId, a.level,
        COUNT(CASE WHEN t.level NOT LIKE 'q-%' THEN t.attempt_id END) AS attempts,
        MAX(CASE WHEN t.level NOT LIKE 'q-%' THEN t.score END) AS bestScore,
        COUNT(CASE WHEN t.level LIKE 'q-%' THEN t.attempt_id END) AS questionsAttempted,
        COALESCE(SUM(CASE WHEN t.level LIKE 'q-%' AND t.score = 100 THEN 1 ELSE 0 END), 0) AS firstTryCorrect,
        COUNT(CASE WHEN t.level = 'q-easy' THEN t.attempt_id END) AS easyQuestions,
        COALESCE(SUM(CASE WHEN t.level = 'q-easy' AND t.score = 100 THEN 1 ELSE 0 END), 0) AS easyCorrect,
        COUNT(CASE WHEN t.level = 'q-medium' THEN t.attempt_id END) AS mediumQuestions,
        COALESCE(SUM(CASE WHEN t.level = 'q-medium' AND t.score = 100 THEN 1 ELSE 0 END), 0) AS mediumCorrect,
        COUNT(CASE WHEN t.level = 'q-quiz' THEN t.attempt_id END) AS quizQuestions,
        COALESCE(SUM(CASE WHEN t.level = 'q-quiz' AND t.score = 100 THEN 1 ELSE 0 END), 0) AS quizCorrect
      FROM work_sets s JOIN work_set_items si ON si.work_set_id = s.id
      JOIN assignments a ON a.assignment_key = si.assignment_key
      LEFT JOIN attempts t ON t.assignment_key = a.assignment_key AND t.code = ?
      WHERE s.cohort = ? AND s.active = 1 AND (s.scope = 'cohort' OR s.target_code = ?)
      GROUP BY s.id, a.assignment_key ORDER BY s.created_at DESC, si.position
    `).bind(code, cohort, code).all();
    return data.results.filter(row => workSetIsCurrent(row));
  } catch (error) {
    if (missingWorkSets(error)) return [];
    throw error;
  }
}

// Teacher-only snapshot of the one-day pilot. Unlike student My Work, this
// reads historic attempts even after the combined assignments have expired.
// Usernames are SHA-256 hashes at rest: the teacher supplies the existing
// anonymous roster privately, and no raw alias is persisted in D1.
async function pilotResults(request, env) {
  const { roster } = await jsonBody(request);
  if (!Array.isArray(roster) || roster.length < 1 || roster.length > 150)
    return respond({ error: 'Provide 1–150 anonymous usernames and their original year groups' }, 400);
  const supplied = [];
  const seen = new Set();
  for (const item of roster) {
    if (!item || typeof item !== 'object' || Array.isArray(item) ||
        Object.keys(item).some(key => !['username', 'cohort'].includes(key)))
      return respond({ error: 'Use anonymous username and year only; never include names, PINs or codes' }, 400);
    const username = normalizeUsername(item.username);
    if (!username || !cohortIsValid(item.cohort) || seen.has(username))
      return respond({ error: 'Check the anonymous usernames and original year groups for duplicates or invalid entries' }, 400);
    seen.add(username);
    supplied.push({ username, expectedCohort: item.cohort, usernameKey: await usernameKey(username) });
  }

  // Each query stays below D1 parameter limits. EXISTS avoids duplicate
  // attempts if an activity happens to belong to several combined work sets.
  const found = new Map();
  for (let i = 0; i < supplied.length; i += 50) {
    const keys = supplied.slice(i, i + 50).map(entry => entry.usernameKey);
    const slots = keys.map(() => '?').join(',');
    const data = await env.DB.prepare(`SELECT l.username_key AS usernameKey, p.cohort AS registeredCohort,
      a.item_id AS itemId,
      COUNT(t.attempt_id) AS records,
      COUNT(CASE WHEN t.level LIKE 'q-%' THEN 1 END) AS questionsAttempted,
      COALESCE(SUM(CASE WHEN t.level LIKE 'q-%' AND t.score = 100 THEN 1 ELSE 0 END), 0) AS firstTryCorrect,
      COUNT(CASE WHEN t.level NOT LIKE 'q-%' THEN 1 END) AS attempts,
      MAX(CASE WHEN t.level NOT LIKE 'q-%' THEN t.score END) AS bestScore,
      MAX(t.created_at) AS lastAttempt
      FROM login_profiles l JOIN practice_codes p ON p.code = l.code
      LEFT JOIN attempts t ON t.code = p.code
        AND t.created_at >= '2026-11-19 00:00:00' AND t.created_at < '2026-11-20 00:00:00'
        AND EXISTS (
          SELECT 1 FROM work_set_items si WHERE si.assignment_key = t.assignment_key
          AND si.work_set_id IN ('pilot-20261119-Y11','pilot-20261119-Y12','pilot-20261119-Y13')
        )
      LEFT JOIN assignments a ON a.assignment_key = t.assignment_key
      WHERE l.username_key IN (${slots}) AND p.enabled = 1
      GROUP BY l.username_key, p.cohort, a.item_id
      ORDER BY l.username_key, a.item_id`).bind(...keys).all();
    for (const row of data.results) {
      if (!found.has(row.usernameKey))
        found.set(row.usernameKey, { registeredCohort: row.registeredCohort, work: [] });
      if (row.itemId && Number(row.records) > 0)
        found.get(row.usernameKey).work.push({
          itemId: row.itemId, attempts: Number(row.attempts || 0),
          bestScore: row.bestScore === null ? null : Number(row.bestScore),
          questionsAttempted: Number(row.questionsAttempted || 0),
          firstTryCorrect: Number(row.firstTryCorrect || 0),
          lastAttempt: row.lastAttempt
        });
    }
  }
  return respond({ pilotDate: '2026-11-19', accounts: supplied.map(entry => ({
    username: entry.username, expectedCohort: entry.expectedCohort,
    registeredCohort: found.get(entry.usernameKey)?.registeredCohort || null,
    work: found.get(entry.usernameKey)?.work || []
  })) });
}

async function assignmentAccess(env, student, key, teacherOverride) {
  const group = await env.DB.prepare('SELECT assignment_key FROM assignments WHERE assignment_key = ? AND cohort = ? AND active = 1').bind(key, student.cohort).first();
  const individual = group ? null : await env.DB.prepare('SELECT assignment_key FROM student_assignments WHERE assignment_key = ? AND code = ? AND active = 1').bind(key, student.code).first();
  if (group || individual) {
    if (isClasswork(key) && await liveClasswork(env, student, key)) return true;
    if (!isClasswork(key) && (isIndependentWorkTime() || teacherOverride)) return true;
  }
  try {
    const sets = await env.DB.prepare(`SELECT s.kind, s.active, s.created_at AS createdAt,
      s.due_date AS dueDate FROM work_sets s
      JOIN work_set_items si ON si.work_set_id = s.id
      WHERE si.assignment_key = ? AND s.cohort = ? AND s.active = 1
        AND (s.scope = 'cohort' OR s.target_code = ?)`)
      .bind(key, student.cohort, student.code).all();
    return sets.results.some(set => workSetIsCurrent(set) &&
      (set.kind === 'classwork' || isIndependentWorkTime() || teacherOverride));
  } catch (error) {
    if (missingWorkSets(error)) return false;
    throw error;
  }
}

async function handle(request, env) {
  const url = new URL(request.url);
  const path = url.pathname;
  if (path === '/v1/health' && request.method === 'GET') return respond({ ok: true, pilot: true, classworkPolicy: '7-day-renewable-v2', workSets: 'v1', cohortCorrection: '11-to-12-v1', selectedClasswork: 'v1', cohortAudit: 'v1', mcqQuestionTracking: 'v1' });
  if (!env.DB) return respond({ error: 'Database not configured' }, 503);

  if (path === '/v1/login' && request.method === 'POST') return signIn(request, env);
  if (path === '/v1/logout' && request.method === 'POST') {
    const token = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '') || '';
    if (SESSION_PATTERN.test(token)) await env.DB.prepare('DELETE FROM login_sessions WHERE token_hash = ?').bind(await digest(token)).run();
    return respond({ signedOut: true });
  }

  if (path === '/v1/work' && request.method === 'POST') {
    const { code } = await jsonBody(request);
    const student = code === undefined ? await sessionLearner(request, env)
      : codeIsValid(code) ? await learner(env, code) : null;
    if (!student) return respond({ error: 'Practice code not recognised' }, 404);
    const outsideLesson = isIndependentWorkTime() || teacherIsValid(request, env);
    const assigned = await work(env, student.code, student.cohort);
    const visible = [];
    let expiredClasswork = false;
    for (const item of assigned) {
      if (item.packageId) {
        if (item.workType === 'classwork' || outsideLesson) visible.push(item);
        continue;
      }
      const classwork = isClasswork(item.assignmentKey);
      if (classwork) {
        if (await liveClasswork(env, student, item.assignmentKey)) visible.push({ ...item, workType: 'classwork' });
        else expiredClasswork = true;
      } else if (outsideLesson) visible.push({ ...item, workType: 'independent' });
    }
    // Every signed-in pupil should see their recorded year group rather than a
    // misleading time error. If an H446 pupil was provisioned under Y10/Y11,
    // their teacher can now spot the mismatch without sharing any credentials.
    // Keep the legacy practice-code API's original time restriction.
    if (!outsideLesson && !visible.length && code === undefined) {
      return respond({ cohort: student.cohort, work: [], notice: expiredClasswork
        ? 'Your Classwork has expired. Ask your teacher to renew it for another seven days.'
        : `No Classwork is available for Year ${student.cohort.slice(1)}. If this is not your year group, ask your teacher to check your anonymous login. Independent practice opens at 12:30–13:20 or after 15:30.` });
    }
    if (!outsideLesson && !visible.length) return respond({ error: INDEPENDENT_WORK_SCHEDULE }, 403);
    return respond({ cohort: student.cohort, work: visible });
  }

  if (path === '/v1/attempts' && request.method === 'POST') {
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
    if (!(await assignmentAccess(env, student, key, teacherIsValid(request, env))))
      return respond({ error: 'This activity is not currently available. Check its classwork period or homework hours and deadline.' }, 403);
    const recent = await env.DB.prepare("SELECT COUNT(*) AS n FROM attempts WHERE code = ? AND level NOT LIKE 'q-%' AND created_at > datetime('now', '-1 minute')").bind(student.code).first();
    if (Number(recent?.n || 0) >= 8) return respond({ error: 'Please wait before submitting more attempts' }, 429);
    const result = await env.DB.prepare(`
      INSERT OR IGNORE INTO attempts (attempt_id, code, assignment_key, score, level, source)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(attemptId, student.code, key, score, level || '', source).run();
    return respond({ saved: Boolean(result.meta?.changes), duplicate: !result.meta?.changes });
  }

  // One row per first checked answer. Reuses the existing attempts table: the
  // q- prefix distinguishes individual questions from legacy completed rounds,
  // so no live D1 migration or changes to existing pupil records are needed.
  if (path === '/v1/questions' && request.method === 'POST') {
    const { assignmentKey: key, attemptId, level, firstTryCorrect } = await jsonBody(request);
    const student = await sessionLearner(request, env);
    if (!student) return respond({ error: 'Sign in to save your progress' }, 401);
    const conversion = /^(?:(?:10|11)\|j277-skill-p1-convert\|both|(?:12|13)\|h446-skill-p1-convert\|both)$/.test(key || '') &&
      ['easy', 'medium'].includes(level);
    const practiceQuiz = /^(?:(?:10|11)\|j277-practice-[a-z0-9-]+\||(?:12|13)\|h446-practice-[a-z0-9-]+\|)$/.test(key || '') && level === 'quiz';
    if (typeof key !== 'string' || (!conversion && !practiceQuiz) || typeof firstTryCorrect !== 'boolean' ||
        typeof attemptId !== 'string' || !/^[0-9a-f-]{36}$/i.test(attemptId)) {
      return respond({ error: 'Invalid question attempt' }, 400);
    }
    if (!key.startsWith(student.cohort.slice(1) + '|')) return respond({ error: 'Activity does not match your year group' }, 403);
    if (!(await assignmentAccess(env, student, key, teacherIsValid(request, env))))
      return respond({ error: 'This activity is not currently available. Check its classwork period or homework hours and deadline.' }, 403);
    const previous = await env.DB.prepare('SELECT attempt_id FROM attempts WHERE attempt_id = ? AND code = ?')
      .bind(attemptId, student.code).first();
    if (previous) return respond({ saved: false, duplicate: true });
    const recent = await env.DB.prepare(`SELECT COUNT(*) AS n FROM attempts
      WHERE code = ? AND level LIKE 'q-%' AND created_at > datetime('now', '-1 minute')`)
      .bind(student.code).first();
    if (Number(recent?.n || 0) >= 40) return respond({ error: 'Please wait before saving more questions' }, 429);
    const result = await env.DB.prepare(`INSERT OR IGNORE INTO attempts
      (attempt_id, code, assignment_key, score, level, source) VALUES (?, ?, ?, ?, ?, ?)`)
      .bind(attemptId, student.code, key, firstTryCorrect ? 100 : 0, 'q-' + level, practiceQuiz ? 'practice' : 'skill').run();
    return respond({ saved: Boolean(result.meta?.changes), duplicate: !result.meta?.changes });
  }

  if (path.startsWith('/v1/teacher/')) {
    if (!teacherIsValid(request, env)) return respond({ error: 'Teacher access required' }, 401);
      if (path === '/v1/teacher/pilot-results' && request.method === 'POST') return pilotResults(request, env);
    if (path === '/v1/teacher/logins' && request.method === 'POST') return provisionLogins(request, env);
    if (path === '/v1/teacher/audit-cohorts' && request.method === 'POST') return auditLoginCohorts(request, env);
    if (path === '/v1/teacher/assignment-inventory' && request.method === 'GET') {
      const cohort = url.searchParams.get('cohort');
      if (!cohortIsValid(cohort)) return respond({ error: 'Choose a valid year group' }, 400);
      const whole = await env.DB.prepare('SELECT COUNT(*) AS count FROM assignments WHERE cohort = ? AND active = 1').bind(cohort).first();
      const individual = await env.DB.prepare(`SELECT COUNT(*) AS count FROM student_assignments s
        JOIN practice_codes p ON p.code = s.code WHERE p.cohort = ? AND s.active = 1`).bind(cohort).first();
      let combined = 0;
      try {
        const row = await env.DB.prepare('SELECT COUNT(*) AS count FROM work_sets WHERE cohort = ? AND active = 1').bind(cohort).first();
        combined = Number(row?.count || 0);
      } catch (error) {
        if (!missingWorkSets(error)) throw error;
      }
      return respond({ cohort, wholeYearActivityRecords: Number(whole?.count || 0),
        individualActivityRecords: Number(individual?.count || 0), combinedAssignments: combined });
    }
    if (path === '/v1/teacher/work-sets' && request.method === 'GET') {
      const cohort = url.searchParams.get('cohort');
      if (!cohortIsValid(cohort)) return respond({ error: 'Choose a valid year group' }, 400);
      try {
        const sets = await env.DB.prepare(`SELECT s.id, s.title, s.kind, s.scope,
          s.due_date AS dueDate, s.created_at AS createdAt, s.active,
          a.item_id AS itemId, a.level
          FROM work_sets s JOIN work_set_items si ON si.work_set_id = s.id
          JOIN assignments a ON a.assignment_key = si.assignment_key
          WHERE s.cohort = ? ORDER BY s.created_at DESC, si.position`).bind(cohort).all();
        return respond({ cohort, sets: sets.results });
      } catch (error) {
        if (missingWorkSets(error)) return respond({ cohort, sets: [] });
        throw error;
      }
    }
    if (path === '/v1/teacher/work-sets' && request.method === 'POST') {
      const { cohort, scope, username: rawUsername, kind, title, dueDate, items } = await jsonBody(request);
      if (!cohortIsValid(cohort) || !['cohort', 'individual'].includes(scope) ||
          !['classwork', 'homework'].includes(kind) || typeof title !== 'string' ||
          title.trim().length < 3 || title.trim().length > 90 ||
          !Array.isArray(items) || items.length < 1 || items.length > 25) {
        return respond({ error: 'Choose a year, recipient, assignment type, title and 1–25 activities' }, 400);
      }
      const validDate = typeof dueDate === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(dueDate) &&
        !Number.isNaN(Date.parse(dueDate)) && new Date(dueDate).toISOString().slice(0, 10) === dueDate;
      if (kind === 'homework' && (!validDate || dueDate < ukToday()))
        return respond({ error: 'Set a homework deadline of today or later' }, 400);
      const keys = items.map(item => item && typeof item === 'object' &&
        assignmentKey(cohort, item.itemId, item.level));
      if (keys.some(key => !key) || new Set(keys).size !== keys.length)
        return respond({ error: 'Choose distinct activities from the correct course and year' }, 400);
      let targetCode = null;
      if (scope === 'individual') {
        const username = normalizeUsername(rawUsername);
        if (!username) return respond({ error: 'Enter one valid anonymous username' }, 400);
        const pupil = await env.DB.prepare(`SELECT p.code, p.cohort FROM login_profiles l
          JOIN practice_codes p ON p.code = l.code
          WHERE l.username_key = ? AND p.enabled = 1`).bind(await usernameKey(username)).first();
        if (!pupil || pupil.cohort !== cohort)
          return respond({ error: 'This anonymous username is not registered in the chosen year. No work assigned.' }, 409);
        targetCode = pupil.code;
      }
      await ensureWorkSetTables(env);
      // The legacy attempt key identifies an activity, not a work-set instance.
      // Reject overlapping new sets for that activity so teachers do not get
      // two differently timed assignments sharing one set of results.
      for (const key of keys) {
        const overlaps = await env.DB.prepare(`SELECT s.kind, s.active,
          s.created_at AS createdAt, s.due_date AS dueDate
          FROM work_sets s JOIN work_set_items si ON si.work_set_id = s.id
          WHERE si.assignment_key = ? AND s.cohort = ? AND s.active = 1
            AND (s.scope = 'cohort' OR ? = 'cohort' OR s.target_code = ?)`)
          .bind(key, cohort, scope, targetCode).all();
        if (overlaps.results.some(row => workSetIsCurrent(row)))
          return respond({ error: 'An activity is already in a current combined assignment for these pupils. Choose different activities or wait until that assignment expires.' }, 409);
      }
      const id = crypto.randomUUID();
      // D1 batches commit atomically. Old assignment definitions are left alone;
      // new ones remain inactive outside their work set.
      const statements = items.map((item, index) => env.DB.prepare(`INSERT OR IGNORE INTO assignments
        (assignment_key, cohort, item_id, level, active) VALUES (?, ?, ?, ?, 0)`)
        .bind(keys[index], cohort, item.itemId, item.level));
      statements.push(env.DB.prepare(`INSERT INTO work_sets
        (id, cohort, title, kind, scope, target_code, due_date) VALUES (?, ?, ?, ?, ?, ?, ?)`)
        .bind(id, cohort, title.trim(), kind, scope, targetCode, kind === 'homework' ? dueDate : null));
      for (const [index, key] of keys.entries()) statements.push(env.DB.prepare(`INSERT INTO work_set_items
        (work_set_id, assignment_key, position) VALUES (?, ?, ?)`).bind(id, key, index));
      await env.DB.batch(statements);
      return respond({ id, cohort, scope, kind, title: title.trim(), activityCount: keys.length,
        dueDate: kind === 'homework' ? dueDate : null, classworkDays: kind === 'classwork' ? 7 : null }, 201);
    }
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
      const classwork = isClasswork(key);
      // Explicitly reassigning expired Classwork restarts its seven-day window.
      // The assignment key and existing pupil attempts stay unchanged.
      const renewed = result.meta?.changes ? null : classwork
        ? await env.DB.prepare("UPDATE assignments SET active = 1, created_at = datetime('now') WHERE assignment_key = ? AND (active = 0 OR created_at < datetime('now', '-7 days'))").bind(key).run()
        : null;
      const activated = result.meta?.changes || classwork ? null
        : await env.DB.prepare('UPDATE assignments SET active = 1 WHERE assignment_key = ? AND active = 0').bind(key).run();
      return respond({ assignmentKey: key, added: Boolean(result.meta?.changes || activated?.meta?.changes), renewed: Boolean(renewed?.meta?.changes), workType: classwork ? 'classwork' : 'independent' }, 201);
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
      const classwork = isClasswork(key);
      const renewed = !result.meta?.changes && classwork
        ? await env.DB.prepare("UPDATE student_assignments SET active = 1, created_at = datetime('now') WHERE code = ? AND assignment_key = ? AND (active = 0 OR created_at < datetime('now', '-7 days'))").bind(profile.code, key).run()
        : null;
      return respond({ cohort: profile.cohort, assignmentKey: key, added: Boolean(result.meta?.changes), renewed: Boolean(renewed?.meta?.changes), workType: classwork ? 'classwork' : 'independent', scope: 'individual' }, 201);
    }
    if (path === '/v1/teacher/selected-classwork' && request.method === 'POST') {
      const { cohort, usernames: rawUsernames, confirm } = await jsonBody(request);
      if (!['Y12', 'Y13'].includes(cohort) || !Array.isArray(rawUsernames) ||
          rawUsernames.length < 1 || rawUsernames.length > 20 || typeof confirm !== 'boolean') {
        return respond({ error: 'Choose Year 12 or 13 and 1–20 anonymous usernames' }, 400);
      }
      const usernames = rawUsernames.map(normalizeUsername);
      if (usernames.some(username => !username) || new Set(usernames).size !== usernames.length) {
        return respond({ error: 'Use valid, different anonymous usernames, one per pupil' }, 400);
      }
      const activities = [
        { itemId: 'h446-skill-p1-convert', level: 'both' },
        { itemId: 'h446-practice-141-a', level: '' }
      ].map(item => ({ ...item, key: assignmentKey(cohort, item.itemId, item.level) }));
      // Check every registration before writing anything. A mismatched login
      // cannot accidentally receive an assignment for a different year.
      const profiles = [];
      const issues = [];
      for (const username of usernames) {
        const row = await env.DB.prepare(`SELECT p.code, p.cohort FROM login_profiles l
          JOIN practice_codes p ON p.code = l.code
          WHERE l.username_key = ? AND p.enabled = 1`).bind(await usernameKey(username)).first();
        if (!row || row.cohort !== cohort) issues.push(username + ': ' + (row ? 'registered as Year ' + row.cohort.slice(1) : 'login not found'));
        else profiles.push({ code: row.code, username });
      }
      if (issues.length) return respond({ error: 'No work assigned. Check these accounts: ' + issues.join('; ') }, 409);
      const group = await env.DB.prepare(`SELECT assignment_key FROM assignments
        WHERE cohort = ? AND active = 1 AND assignment_key IN (?, ?)`).bind(cohort, activities[0].key, activities[1].key).all();
      if (group.results.length) return respond({ error: 'One or both activities are already assigned to the entire year group. Selected assignments cannot restrict that existing access; no changes made.' }, 409);
      if (!confirm) return respond({ ready: true, cohort, usernames, activities: activities.map(({ itemId }) => itemId), assignmentCount: usernames.length * activities.length });

      // Definitions remain inactive at cohort level. D1 batch is one atomic
      // transaction: either all selected pupil assignments commit, or none.
      const statements = activities.map(item => env.DB.prepare(`INSERT OR IGNORE INTO assignments
        (assignment_key, cohort, item_id, level, active) VALUES (?, ?, ?, ?, 0)`)
        .bind(item.key, cohort, item.itemId, item.level));
      for (const profile of profiles) for (const item of activities) {
        statements.push(env.DB.prepare('INSERT OR IGNORE INTO student_assignments (code, assignment_key) VALUES (?, ?)')
          .bind(profile.code, item.key));
        statements.push(env.DB.prepare("UPDATE student_assignments SET active = 1, created_at = datetime('now') WHERE code = ? AND assignment_key = ? AND (active = 0 OR created_at < datetime('now', '-7 days'))")
          .bind(profile.code, item.key));
      }
      const outcomes = await env.DB.batch(statements);
      let newlyAssigned = 0;
      let renewed = 0;
      for (let index = activities.length; index < outcomes.length; index += 2) {
        newlyAssigned += Number(outcomes[index]?.meta?.changes || 0);
        renewed += Number(outcomes[index + 1]?.meta?.changes || 0);
      }
      return respond({ cohort, pupilCount: profiles.length, activityCount: activities.length,
        newlyAssigned, renewed, alreadyActive: profiles.length * activities.length - newlyAssigned - renewed }, 201);
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
    if (path === '/v1/teacher/reclassify-y12-login' && request.method === 'POST') {
      const { username: rawUsername, expectedCohort, targetCohort, confirm } = await jsonBody(request);
      const username = normalizeUsername(rawUsername);
      // Deliberately narrow correction: this pilot only supports moving a
      // verified Year 11 login to Year 12, never bulk or automatic moves.
      if (!username || expectedCohort !== 'Y11' || targetCohort !== 'Y12' || confirm !== true) {
        return respond({ error: 'Check the username and confirm Year 11 to Year 12' }, 400);
      }
      const profile = await env.DB.prepare(`SELECT p.code, p.cohort FROM login_profiles l
        JOIN practice_codes p ON p.code = l.code
        WHERE l.username_key = ? AND p.enabled = 1`).bind(await usernameKey(username)).first();
      if (!profile) return respond({ error: 'Anonymous username not found among active logins' }, 404);
      if (profile.cohort !== expectedCohort) return respond({ error: 'This login is registered as ' + profile.cohort + ', not Year 11. Nothing changed.' }, 409);
      // Only the cohort changes; login hash, PIN, sessions, existing attempts,
      // assignment definitions and learner records all keep their identities.
      const changed = await env.DB.prepare("UPDATE practice_codes SET cohort = 'Y12' WHERE code = ? AND cohort = 'Y11' AND enabled = 1")
        .bind(profile.code).run();
      if (changed.meta?.changes !== 1) return respond({ error: 'Year-group allocation changed while checking. Nothing further changed.' }, 409);
      return respond({ username, previousCohort: 'Y11', cohort: 'Y12', changed: true, progressPreserved: true });
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



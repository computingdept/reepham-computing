import { test } from 'node:test';
import assert from 'node:assert/strict';
import worker, { assignmentKey, isIndependentWorkTime, newPracticeCode } from '../src/index.mjs';

const TOKEN = 'fictional-teacher-secret-for-local-tests-only';
const ORIGIN = 'https://rhsccs.org';

class FakeD1 {
  constructor() { this.codes = new Map(); this.assignments = new Map(); this.attempts = new Map(); this.logins = new Map(); this.sessions = new Map(); }
  prepare(sql) {
    return { bind: (...args) => {
      const first = async () => {
        if (sql.includes('SELECT code, cohort FROM practice_codes')) {
          const code = this.codes.get(args[0]);
          return code?.enabled ? code : null;
        }
        if (sql.includes('SELECT assignment_key FROM assignments')) {
          const task = this.assignments.get(args[0]);
          return task?.cohort === args[1] && task.active ? task : null;
        }
        if (sql.includes('COUNT(*) AS n FROM attempts')) {
          return { n: [...this.attempts.values()].filter(x => x.code === args[0]).length };
        }
        if (sql.includes('FROM login_profiles l JOIN practice_codes p')) {
          const login = this.logins.get(args[0]);
          return login && this.codes.get(login.code)?.enabled ? login : null;
        }
        if (sql.includes('FROM login_sessions s')) {
          const row = this.sessions.get(args[0]);
          const code = this.codes.get(row?.code);
          return row && row.expires_at > args[1] && code?.enabled ? code : null;
        }
        if (sql.includes('FROM login_profiles WHERE username_key')) return this.logins.get(args[0]) || null;
        if (sql.includes('SELECT username_key FROM login_profiles WHERE code')) {
          const row = [...this.logins.values()].find(login => login.code === args[0]);
          return row ? { username_key: row.username_key } : null;
        }
        throw Error('Unrecognised test SELECT one: ' + sql);
      };
      const run = async () => {
        if (sql.includes('INSERT OR IGNORE INTO practice_codes')) {
          const [code, cohort] = args;
          if (this.codes.has(code)) return { meta: { changes: 0 } };
          this.codes.set(code, { code, cohort, enabled: 1 });
          return { meta: { changes: 1 } };
        }
        if (sql.includes('INSERT OR IGNORE INTO assignments')) {
          const [assignment_key, cohort, item_id, level] = args;
          if (this.assignments.has(assignment_key)) return { meta: { changes: 0 } };
          this.assignments.set(assignment_key, { assignment_key, cohort, item_id, level, active: 1 });
          return { meta: { changes: 1 } };
        }
        if (sql.includes('INSERT OR IGNORE INTO attempts')) {
          const [attempt_id, code, assignment_key, score, level, source] = args;
          if (this.attempts.has(attempt_id)) return { meta: { changes: 0 } };
          this.attempts.set(attempt_id, { attempt_id, code, assignment_key, score, level, source, created_at: '2026-11-14 16:00:00' });
          return { meta: { changes: 1 } };
        }
        if (sql.includes('INSERT INTO login_profiles')) {
          const [username_key, code, password_salt, password_hash] = args;
          if (this.logins.has(username_key) || [...this.logins.values()].some(login => login.code === code)) throw Error('Duplicate login');
          this.logins.set(username_key, { username_key, code, password_salt, password_hash, failed_attempts: 0, locked_until: 0 });
          return { meta: { changes: 1 } };
        }
        if (sql.includes('UPDATE login_profiles SET failed_attempts = ?, locked_until = ?')) {
          const [failed_attempts, locked_until, key] = args;
          Object.assign(this.logins.get(key), { failed_attempts, locked_until });
          return { meta: { changes: 1 } };
        }
        if (sql.includes('UPDATE login_profiles SET failed_attempts = 0')) {
          Object.assign(this.logins.get(args[0]), { failed_attempts: 0, locked_until: 0 });
          return { meta: { changes: 1 } };
        }
        if (sql.includes('INSERT INTO login_sessions')) {
          const [token_hash, code, expires_at] = args;
          this.sessions.set(token_hash, { token_hash, code, expires_at });
          return { meta: { changes: 1 } };
        }
        if (sql.includes('DELETE FROM login_sessions')) {
          this.sessions.delete(args[0]);
          return { meta: { changes: 1 } };
        }
        throw Error('Unrecognised test INSERT: ' + sql);
      };
      const all = async () => {
        if (sql.includes('COUNT(t.attempt_id)')) {
          const [code, cohort] = args;
          return { results: [...this.assignments.values()].filter(x => x.cohort === cohort).map(a => {
            const scores = [...this.attempts.values()].filter(t => t.code === code && t.assignment_key === a.assignment_key);
            return { assignmentKey: a.assignment_key, itemId: a.item_id, level: a.level, attempts: scores.length, bestScore: scores.length ? Math.max(...scores.map(x => x.score)) : null };
          }) };
        }
        if (sql.includes('SELECT code FROM practice_codes')) return { results: [...this.codes.values()].filter(x => x.cohort === args[0]).map(x => ({ code: x.code })) };
        if (sql.includes('SELECT assignment_key AS assignmentKey')) return { results: [...this.assignments.values()].filter(x => x.cohort === args[0]).map(x => ({ assignmentKey: x.assignment_key, itemId: x.item_id, level: x.level })) };
        if (sql.includes('SELECT t.code, t.assignment_key')) return { results: [...this.attempts.values()].filter(x => this.codes.get(x.code)?.cohort === args[0]).map(x => ({ code: x.code, assignmentKey: x.assignment_key, level: x.level, attempts: 1, bestScore: x.score, lastAttempt: x.created_at })) };
        throw Error('Unrecognised test SELECT all: ' + sql);
      };
      return { first, run, all };
    } };
  }
}

function request(path, method = 'GET', body, { teacher = false, origin = ORIGIN } = {}) {
  return new Request(`https://example.workers.dev${path}`, {
    method,
    headers: { origin, ...(body ? { 'content-type': 'application/json' } : {}), ...(teacher ? { authorization: `Bearer ${TOKEN}` } : {}) },
    ...(body ? { body: JSON.stringify(body) } : {})
  });
}

async function call(db, path, method = 'GET', body, opts = {}) {
  const response = await worker.fetch(request(path, method, body, opts), {
    DB: db, TEACHER_TOKEN: TOKEN, ALLOWED_ORIGINS: ORIGIN
  });
  return { status: response.status, cors: response.headers.get('access-control-allow-origin'), data: await response.json() };
}

test('independent-work windows use UK local time, including boundaries', () => {
  // November is GMT.
  assert.equal(isIndependentWorkTime(new Date('2026-11-16T12:29:00Z')), false);
  assert.equal(isIndependentWorkTime(new Date('2026-11-16T12:30:00Z')), true);
  assert.equal(isIndependentWorkTime(new Date('2026-11-16T13:19:00Z')), true);
  assert.equal(isIndependentWorkTime(new Date('2026-11-16T13:20:00Z')), false);
  assert.equal(isIndependentWorkTime(new Date('2026-11-16T15:29:00Z')), false);
  assert.equal(isIndependentWorkTime(new Date('2026-11-16T15:30:00Z')), true);
  assert.equal(isIndependentWorkTime(new Date('2026-11-16T23:59:00Z')), true);
  assert.equal(isIndependentWorkTime(new Date('2026-11-17T00:00:00Z')), false);
  // July is BST, so 11:30 UTC is 12:30 UK time.
  assert.equal(isIndependentWorkTime(new Date('2026-07-16T11:30:00Z')), true);
});

test('weekends are open all day in UK local time, including BST midnight', () => {
  assert.equal(isIndependentWorkTime(new Date('2026-11-14T00:00:00Z')), true); // Saturday
  assert.equal(isIndependentWorkTime(new Date('2026-11-15T13:58:00Z')), true); // Sunday during weekday restriction
  assert.equal(isIndependentWorkTime(new Date('2026-11-15T23:59:00Z')), true);
  assert.equal(isIndependentWorkTime(new Date('2026-07-19T22:59:00Z')), true); // Sunday 23:59 BST
  assert.equal(isIndependentWorkTime(new Date('2026-07-19T23:00:00Z')), false); // Monday 00:00 BST
  assert.equal(isIndependentWorkTime(new Date('2026-11-16T00:00:00Z')), false); // Monday 00:00 GMT
});

test('one code format for all cohorts without identifying data', () => {
  const values = new Set(Array.from({ length: 100 }, newPracticeCode));
  assert.equal(values.size, 100);
  for (const code of values) assert.match(code, /^P-[A-HJ-NP-Z2-9]{10}$/);
});

test('J277 and H446 assignment keys cannot cross year groups', () => {
  assert.equal(assignmentKey('Y10', 'j277-skill-p1-convert', 'both'), '10|j277-skill-p1-convert|both');
  assert.equal(assignmentKey('Y11', 'j277-practice-11-components', ''), '11|j277-practice-11-components|');
  assert.equal(assignmentKey('Y12', 'h446-practice-141-data-types', ''), '12|h446-practice-141-data-types|');
  assert.equal(assignmentKey('Y13', 'h446-skill-kmaps', 'both'), '13|h446-skill-kmaps|both');
  assert.equal(assignmentKey('Y12', 'j277-skill-p1-convert', 'both'), null);
  assert.equal(assignmentKey('Y10', 'h446-practice-141-data-types', ''), null);
  assert.equal(assignmentKey('Y12', 'h446-practice-141-data-types', 'both'), null);
});

test('health, CORS and teacher-only write access', async () => {
  const db = new FakeD1();
  assert.deepEqual((await call(db, '/v1/health')).data, { ok: true, pilot: true });
  const blocked = await call(db, '/v1/teacher/codes', 'POST', { cohort: 'Y12', count: 10 });
  assert.equal(blocked.status, 401);
  const wrongOrigin = await call(db, '/v1/health', 'GET', undefined, { origin: 'https://not-rhsccs.org' });
  assert.equal(wrongOrigin.status, 403);
  assert.equal(wrongOrigin.cors, null);
});

test('10 Year 12 and 10 Year 13 codes, assignment, repeat score saving', async () => {
  const db = new FakeD1();
  const y12 = await call(db, '/v1/teacher/codes', 'POST', { cohort: 'Y12', count: 10 }, { teacher: true });
  const y13 = await call(db, '/v1/teacher/codes', 'POST', { cohort: 'Y13', count: 10 }, { teacher: true });
  assert.equal(y12.status, 201); assert.equal(y13.status, 201);
  assert.equal(y12.data.codes.length, 10); assert.equal(y13.data.codes.length, 10);
  assert.equal(new Set([...y12.data.codes, ...y13.data.codes]).size, 20);
  const issued = await call(db, '/v1/teacher/assignments', 'POST', { cohort: 'Y12', itemId: 'h446-practice-141-data-types', level: '' }, { teacher: true });
  assert.equal(issued.status, 201);
  const assigned = await call(db, '/v1/work', 'POST', { code: y12.data.codes[0] }, { teacher: true });
  assert.equal(assigned.data.work.length, 1);
  assert.equal(assigned.data.work[0].attempts, 0);
  const submission = { code: y12.data.codes[0], assignmentKey: issued.data.assignmentKey, attemptId: crypto.randomUUID(), score: 80, level: '', source: 'practice' };
  const first = await call(db, '/v1/attempts', 'POST', submission, { teacher: true });
  assert.equal(first.status, 200); assert.equal(first.data.saved, true);
  const repeat = await call(db, '/v1/attempts', 'POST', submission, { teacher: true });
  assert.equal(repeat.data.saved, false); assert.equal(repeat.data.duplicate, true);
  const second = await call(db, '/v1/attempts', 'POST', { ...submission, attemptId: crypto.randomUUID(), score: 100 }, { teacher: true });
  assert.equal(second.data.saved, true);
  const updated = await call(db, '/v1/work', 'POST', { code: y12.data.codes[0] }, { teacher: true });
  assert.equal(updated.data.work[0].attempts, 2); assert.equal(updated.data.work[0].bestScore, 100);
  const teacher = await call(db, '/v1/teacher/progress?cohort=Y12', 'GET', undefined, { teacher: true });
  assert.equal(teacher.data.codes.length, 10);
  assert.equal(teacher.data.progress.length, 2);
  const wrongCohort = await call(db, '/v1/attempts', 'POST', { ...submission, code: y13.data.codes[0], attemptId: crypto.randomUUID() }, { teacher: true });
  assert.equal(wrongCohort.status, 404);
});

test('anonymous username and four-digit PIN sign-in can read work but not teacher data', async () => {
  const db = new FakeD1();
  const issued = await call(db, '/v1/teacher/codes', 'POST', { cohort: 'Y12', count: 1 }, { teacher: true });
  const code = issued.data.codes[0];
  const privatePassword = '4821';
  const notTeacher = await call(db, '/v1/teacher/logins', 'POST', { logins: [{ username: 'Y12-04', code, password: privatePassword }] });
  assert.equal(notTeacher.status, 401);
  const added = await call(db, '/v1/teacher/logins', 'POST', { logins: [{ username: 'Y12-04', code, password: privatePassword }] }, { teacher: true });
  assert.equal(added.status, 201);
  assert.deepEqual(added.data.results, [{ username: 'y12-04', status: 'created' }]);
  assert.equal([...db.logins.values()][0].password_hash.includes(privatePassword), false);
  const retry = await call(db, '/v1/teacher/logins', 'POST', { logins: [{ username: 'Y12-04', code, password: privatePassword }] }, { teacher: true });
  assert.equal(retry.data.results[0].status, 'already-imported');
  const bad = await call(db, '/v1/login', 'POST', { username: 'Y12-04', password: '9999' });
  assert.equal(bad.status, 401);
  const invalidPin = await call(db, '/v1/login', 'POST', { username: 'y12-04', password: '12345' });
  assert.equal(invalidPin.status, 401);
  const good = await call(db, '/v1/login', 'POST', { username: 'y12-04', password: privatePassword });
  assert.equal(good.status, 200);
  assert.match(good.data.session, /^[A-Za-z0-9_-]{43}$/);
  assert.equal(good.data.session.includes(code), false);
  const response = await worker.fetch(new Request('https://example.workers.dev/v1/work', {
    method: 'POST', headers: { origin: ORIGIN, 'content-type': 'application/json', authorization: 'Bearer ' + good.data.session }, body: '{}'
  }), { DB: db, TEACHER_TOKEN: TOKEN, ALLOWED_ORIGINS: ORIGIN });
  // Session authentication is valid; the same UK-time window still gates access.
  assert.ok([200, 403].includes(response.status));
  const teacher = await worker.fetch(new Request('https://example.workers.dev/v1/teacher/progress?cohort=Y12', {
    headers: { origin: ORIGIN, authorization: 'Bearer ' + good.data.session }
  }), { DB: db, TEACHER_TOKEN: TOKEN, ALLOWED_ORIGINS: ORIGIN });
  assert.equal(teacher.status, 401);
  const logout = await worker.fetch(new Request('https://example.workers.dev/v1/logout', {
    method: 'POST', headers: { origin: ORIGIN, authorization: 'Bearer ' + good.data.session }
  }), { DB: db, TEACHER_TOKEN: TOKEN, ALLOWED_ORIGINS: ORIGIN });
  assert.equal(logout.status, 200);
  assert.equal(db.sessions.size, 0);
});

test('repeated wrong PINs lock one anonymous ID for 15 minutes', async () => {
  const db = new FakeD1();
  const code = (await call(db, '/v1/teacher/codes', 'POST', { cohort: 'Y11', count: 1 }, { teacher: true })).data.codes[0];
  await call(db, '/v1/teacher/logins', 'POST', { logins: [{ username: 'Y11-01', code, password: '1436' }] }, { teacher: true });
  for (let i = 0; i < 5; i++) {
    const bad = await call(db, '/v1/login', 'POST', { username: 'Y11-01', password: '9999' });
    assert.equal(bad.status, 401);
  }
  assert.equal((await call(db, '/v1/login', 'POST', { username: 'Y11-01', password: '1436' })).status, 429);
});

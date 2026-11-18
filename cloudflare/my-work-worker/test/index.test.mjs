import { test } from 'node:test';
import assert from 'node:assert/strict';
import worker, { assignmentKey, isIndependentWorkTime, newPracticeCode, liveClasswork } from '../src/index.mjs';

const TOKEN = 'fictional-teacher-secret-for-local-tests-only';
const ORIGIN = 'https://rhsccs.org';

function attemptStats(scores) {
  const rounds = scores.filter(row => !row.level.startsWith('q-'));
  const easy = scores.filter(row => row.level === 'q-easy');
  const medium = scores.filter(row => row.level === 'q-medium');
  const quiz = scores.filter(row => row.level === 'q-quiz');
  return {
    attempts: rounds.length,
    bestScore: rounds.length ? Math.max(...rounds.map(row => row.score)) : null,
    questionsAttempted: easy.length + medium.length + quiz.length,
    firstTryCorrect: [...easy, ...medium, ...quiz].filter(row => row.score === 100).length,
    easyQuestions: easy.length,
    easyCorrect: easy.filter(row => row.score === 100).length,
    mediumQuestions: medium.length,
    mediumCorrect: medium.filter(row => row.score === 100).length,
    quizQuestions: quiz.length,
    quizCorrect: quiz.filter(row => row.score === 100).length
  };
}

class FakeD1 {
  constructor() { this.codes = new Map(); this.assignments = new Map(); this.individualAssignments = new Map(); this.attempts = new Map(); this.logins = new Map(); this.sessions = new Map(); }
  prepare(sql) {
    return { bind: (...args) => {
      const first = async () => {
        if (sql.includes('SELECT code, cohort FROM practice_codes')) {
          const code = this.codes.get(args[0]);
          return code?.enabled ? code : null;
        }
        if (sql.includes('SELECT s.assignment_key FROM student_assignments s')) {
          const task = this.individualAssignments.get(args[1] + '|' + args[0]);
          return task?.active && Date.parse(task.created_at) >= Date.now() - 7 * 86400000
            ? { assignment_key: task.assignment_key } : null;
        }
        if (sql.includes('AND created_at >= datetime')) {
          const task = this.assignments.get(args[0]);
          return task?.active && task.cohort === args[1] && Date.parse(task.created_at) >= Date.now() - 7 * 86400000
            ? { assignment_key: task.assignment_key } : null;
        }
        if (sql.includes('SELECT assignment_key FROM assignments')) {
          const task = this.assignments.get(args[0]);
          return task?.cohort === args[1] && task.active ? task : null;
        }
        if (sql.includes('SELECT assignment_key FROM student_assignments')) {
          const row = this.individualAssignments.get(args[1] + '|' + args[0]);
          return row?.active ? { assignment_key: args[0] } : null;
        }
        if (sql.includes('SELECT attempt_id FROM attempts WHERE attempt_id = ? AND code = ?')) {
          const row = this.attempts.get(args[0]);
          return row?.code === args[1] ? { attempt_id: row.attempt_id } : null;
        }
        if (sql.includes('COUNT(*) AS n FROM attempts')) {
          return { n: [...this.attempts.values()].filter(x => x.code === args[0] &&
            (!sql.includes("level LIKE 'q-%'") || x.level.startsWith('q-'))).length };
        }
        if (sql.includes('FROM login_profiles l') && sql.includes('JOIN practice_codes p')) {
          const login = this.logins.get(args[0]);
          if (!login || !this.codes.get(login.code)?.enabled) return null;
          return sql.includes('SELECT p.code, p.cohort') ? this.codes.get(login.code) : login;
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
          this.assignments.set(assignment_key, { assignment_key, cohort, item_id, level, active: sql.includes('active) VALUES') ? 0 : 1, created_at: new Date().toISOString() });
          return { meta: { changes: 1 } };
        }
        if (sql.includes('UPDATE assignments SET active = 1')) {
          const row = this.assignments.get(args[0]);
          const expired = row && Date.parse(row.created_at) < Date.now() - 7 * 86400000;
          if (!row || (row.active && (!sql.includes("created_at = datetime('now')") || !expired))) return { meta: { changes: 0 } };
          row.active = 1;
          if (sql.includes("created_at = datetime('now')")) row.created_at = new Date().toISOString();
          return { meta: { changes: 1 } };
        }
        if (sql.includes('INSERT OR IGNORE INTO student_assignments')) {
          const [code, assignment_key] = args;
          assert.ok(this.codes.has(code) && this.assignments.has(assignment_key), 'Individual assignment has valid FK targets');
          const key = code + '|' + assignment_key;
          if (this.individualAssignments.has(key)) return { meta: { changes: 0 } };
          this.individualAssignments.set(key, { code, assignment_key, active: 1, created_at: new Date().toISOString() });
          return { meta: { changes: 1 } };
        }
        if (sql.includes('UPDATE student_assignments SET active = 1')) {
          const row = this.individualAssignments.get(args[0] + '|' + args[1]);
          if (!row || (row.active && Date.parse(row.created_at) >= Date.now() - 7 * 86400000)) return { meta: { changes: 0 } };
          row.active = 1;
          row.created_at = new Date().toISOString();
          return { meta: { changes: 1 } };
        }
        if (sql.includes('INSERT OR IGNORE INTO attempts')) {
          const [attempt_id, code, assignment_key, score, level, sourceArg] = args;
          const source = sourceArg || (sql.includes("'skill')") ? 'skill' : undefined);
          if (this.attempts.has(attempt_id)) return { meta: { changes: 0 } };
          assert.ok(this.codes.has(code) && this.assignments.has(assignment_key), 'Attempt has valid FK targets');
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
        if (sql.includes('FROM student_assignments s JOIN assignments a')) {
          const code = args[0];
          return { results: [...this.individualAssignments.values()].filter(x => x.code === code && x.active).map(x => {
            const a = this.assignments.get(x.assignment_key);
            const scores = [...this.attempts.values()].filter(t => t.code === code && t.assignment_key === a.assignment_key);
            return { assignmentKey: a.assignment_key, itemId: a.item_id, level: a.level, ...attemptStats(scores) };
          }) };
        }
        if (sql.includes('FROM assignments a LEFT JOIN attempts t')) {
          const [code, cohort] = args;
          return { results: [...this.assignments.values()].filter(x => x.cohort === cohort && x.active).map(a => {
            const scores = [...this.attempts.values()].filter(t => t.code === code && t.assignment_key === a.assignment_key);
            return { assignmentKey: a.assignment_key, itemId: a.item_id, level: a.level, ...attemptStats(scores) };
          }) };
        }
        if (sql.includes('SELECT code FROM practice_codes')) return { results: [...this.codes.values()].filter(x => x.cohort === args[0]).map(x => ({ code: x.code })) };
        if (sql.includes('SELECT assignment_key AS assignmentKey')) return { results: [...this.assignments.values()].filter(x => x.cohort === args[0] && x.active).map(x => ({ assignmentKey: x.assignment_key, itemId: x.item_id, level: x.level })) };
        if (sql.includes('SELECT t.code, t.assignment_key')) return { results: [...this.attempts.values()].filter(x => this.codes.get(x.code)?.cohort === args[0]).map(x => ({ code: x.code, assignmentKey: x.assignment_key, level: x.level, attempts: 1, bestScore: x.score, lastAttempt: x.created_at })) };
        throw Error('Unrecognised test SELECT all: ' + sql);
      };
      return { first, run, all };
    } };
  }
}

function request(path, method = 'GET', body, { teacher = false, bearer = '', origin = ORIGIN } = {}) {
  return new Request(`https://example.workers.dev${path}`, {
    method,
    headers: { origin, ...(body ? { 'content-type': 'application/json' } : {}), ...((teacher || bearer) ? { authorization: `Bearer ${teacher ? TOKEN : bearer}` } : {}) },
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

test('H446 conversion Classwork is limited to an assigned seven-day window', async () => {
  const db = new FakeD1();
  const student = { code: 'P-ABCDEFGHJK', cohort: 'Y13' };
  const key = '13|h446-skill-p1-convert|both';
  db.assignments.set(key, { assignment_key: key, cohort: 'Y13', active: 1, created_at: new Date().toISOString() });
  assert.equal(await liveClasswork({ DB: db }, student, key), true);
  assert.equal(await liveClasswork({ DB: db }, student, '13|h446-skill-kmaps|both'), false);
  assert.equal(await liveClasswork({ DB: db }, student, '10|j277-skill-p1-convert|both'), false);
  db.assignments.get(key).created_at = '2020-01-01 00:00:00';
  assert.equal(await liveClasswork({ DB: db }, student, key), false);
  db.individualAssignments.set(student.code + '|' + key, {
    code: student.code, assignment_key: key, active: 1, created_at: new Date().toISOString()
  });
  assert.equal(await liveClasswork({ DB: db }, student, key), true);
});

test('H446 1.4.1(a) MCQ Classwork uses the same seven-day assigned window', async () => {
  const db = new FakeD1();
  const student = { code: 'P-ABCDEFGHJK', cohort: 'Y12' };
  const key = '12|h446-practice-141-a|';
  db.assignments.set(key, { assignment_key: key, cohort: 'Y12', active: 1, created_at: new Date().toISOString() });
  assert.equal(await liveClasswork({ DB: db }, student, key), true);
  assert.equal(await liveClasswork({ DB: db }, student, '12|h446-practice-141-b|'), false);
  db.assignments.get(key).created_at = '2020-01-01 00:00:00';
  assert.equal(await liveClasswork({ DB: db }, student, key), false);
});

test('Year 12 has a clear message before classwork is assigned, not a wrong-time error', async () => {
  const RealDate = globalThis.Date;
  const duringLesson = new RealDate('2026-11-18T10:00:00Z');
  globalThis.Date = class extends RealDate {
    constructor(...args) { super(...(args.length ? args : [duringLesson.valueOf()])); }
    static now() { return duringLesson.valueOf(); }
  };
  try {
    const db = new FakeD1();
    const [code] = (await call(db, '/v1/teacher/codes', 'POST', { cohort: 'Y12', count: 1 }, { teacher: true })).data.codes;
    await call(db, '/v1/teacher/logins', 'POST', { logins: [{ username: 'year12bird', code, password: '1234' }] }, { teacher: true });
    const session = (await call(db, '/v1/login', 'POST', { username: 'year12bird', password: '1234' })).data.session;
    const view = await call(db, '/v1/work', 'POST', {}, { bearer: session });
    assert.equal(view.status, 200);
    assert.deepEqual(view.data.work, []);
    assert.match(view.data.notice, /No Classwork is available for Year 12/);
    const beforeClass = await call(db, '/v1/teacher/assignments', 'POST', { cohort: 'Y12', itemId: 'h446-practice-141-b', level: '' }, { teacher: true });
    assert.equal(beforeClass.data.workType, 'independent');
    assert.deepEqual((await call(db, '/v1/work', 'POST', {}, { bearer: session })).data.work, [], 'Independent practice stays restricted during lessons');
    assert.equal((await call(db, '/v1/work', 'POST', { code })).status, 403, 'Legacy code-only access remains time restricted');
  } finally { globalThis.Date = RealDate; }
});

test('a wrongly allocated year-group login reveals its actual cohort without unlocking practice', async () => {
  const RealDate = globalThis.Date;
  const duringLesson = new RealDate('2026-11-18T10:00:00Z');
  globalThis.Date = class extends RealDate {
    constructor(...args) { super(...(args.length ? args : [duringLesson.valueOf()])); }
    static now() { return duringLesson.valueOf(); }
  };
  try {
    const db = new FakeD1();
    const [code] = (await call(db, '/v1/teacher/codes', 'POST', { cohort: 'Y10', count: 1 }, { teacher: true })).data.codes;
    await call(db, '/v1/teacher/logins', 'POST', { logins: [{ username: 'misplacedbird', code, password: '1234' }] }, { teacher: true });
    const session = (await call(db, '/v1/login', 'POST', { username: 'misplacedbird', password: '1234' })).data.session;
    const response = await call(db, '/v1/work', 'POST', {}, { bearer: session });
    assert.equal(response.status, 200);
    assert.equal(response.data.cohort, 'Y10');
    assert.deepEqual(response.data.work, []);
    assert.match(response.data.notice, /Year 10/);
    assert.match(response.data.notice, /not your year group/);
  } finally { globalThis.Date = RealDate; }
});

test('teacher can renew expired Year 12 Classwork without losing previous attempts', async () => {
  const RealDate = globalThis.Date;
  const duringLesson = new RealDate('2026-11-18T10:00:00Z');
  globalThis.Date = class extends RealDate {
    constructor(...args) { super(...(args.length ? args : [duringLesson.valueOf()])); }
    static now() { return duringLesson.valueOf(); }
  };
  try {
    const db = new FakeD1();
    const [code] = (await call(db, '/v1/teacher/codes', 'POST', { cohort: 'Y12', count: 1 }, { teacher: true })).data.codes;
    const body = { cohort: 'Y12', itemId: 'h446-skill-p1-convert', level: 'both' };
    const first = await call(db, '/v1/teacher/assignments', 'POST', body, { teacher: true });
    const key = first.data.assignmentKey;
    assert.equal(first.data.workType, 'classwork');
    db.attempts.set('previous-attempt', { attempt_id: 'previous-attempt', code, assignment_key: key, level: 'q-easy', score: 100, source: 'skill' });
    db.assignments.get(key).created_at = '2020-01-01 00:00:00';
    await call(db, '/v1/teacher/logins', 'POST', { logins: [{ username: 'renewclassbird', code, password: '1234' }] }, { teacher: true });
    const session = (await call(db, '/v1/login', 'POST', { username: 'renewclassbird', password: '1234' })).data.session;
    const expired = await call(db, '/v1/work', 'POST', {}, { bearer: session });
    assert.deepEqual(expired.data.work, []);
    assert.match(expired.data.notice, /expired/);
    const renewal = await call(db, '/v1/teacher/assignments', 'POST', body, { teacher: true });
    assert.equal(renewal.data.renewed, true);
    assert.equal(renewal.data.added, false);
    const visible = await call(db, '/v1/work', 'POST', {}, { bearer: session });
    assert.equal(visible.data.work[0].workType, 'classwork');
    assert.equal(visible.data.work[0].firstTryCorrect, 1, 'Previous recorded answers remain intact');
    assert.equal(db.attempts.size, 1);
    assert.equal((await call(db, '/v1/teacher/assignments', 'POST', body, { teacher: true })).data.renewed, false, 'Re-assigning current Classwork does not silently extend its deadline');
  } finally { globalThis.Date = RealDate; }
});

test('renewing an individual Classwork assignment does not grant access to the whole year', async () => {
  const db = new FakeD1();
  const [firstCode, otherCode] = (await call(db, '/v1/teacher/codes', 'POST', { cohort: 'Y12', count: 2 }, { teacher: true })).data.codes;
  await call(db, '/v1/teacher/logins', 'POST', { logins: [
    { username: 'renewbird', code: firstCode, password: '1234' },
    { username: 'renewfox', code: otherCode, password: '5678' }
  ] }, { teacher: true });
  const body = { username: 'renewbird', itemId: 'h446-practice-141-a', level: '' };
  const assigned = await call(db, '/v1/teacher/student-assignments', 'POST', body, { teacher: true });
  db.individualAssignments.get(firstCode + '|' + assigned.data.assignmentKey).created_at = '2020-01-01 00:00:00';
  const renewed = await call(db, '/v1/teacher/student-assignments', 'POST', body, { teacher: true });
  assert.equal(renewed.data.renewed, true);
  assert.equal(await liveClasswork({ DB: db }, { code: firstCode, cohort: 'Y12' }, assigned.data.assignmentKey), true);
  assert.equal(await liveClasswork({ DB: db }, { code: otherCode, cohort: 'Y12' }, assigned.data.assignmentKey), false);
});

test('health, CORS and teacher-only write access', async () => {
  const db = new FakeD1();
  assert.deepEqual((await call(db, '/v1/health')).data, { ok: true, pilot: true, classworkPolicy: '7-day-renewable-v2' });
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

test('individual assignment stays private, accepts scores and can later become year-wide', async () => {
  const db = new FakeD1();
  const codes = (await call(db, '/v1/teacher/codes', 'POST', { cohort: 'Y10', count: 2 }, { teacher: true })).data.codes;
  const addLogins = await call(db, '/v1/teacher/logins', 'POST', { logins: [
    { username: 'pilotbird', code: codes[0], password: '1234' },
    { username: 'pilotfox', code: codes[1], password: '5678' }
  ] }, { teacher: true });
  assert.equal(addLogins.status, 201);

  const activity = { username: 'PILOTBIRD', itemId: 'j277-practice-12-binary', level: '' };
  const forbidden = await call(db, '/v1/teacher/student-assignments', 'POST', activity);
  assert.equal(forbidden.status, 401);
  const unknown = await call(db, '/v1/teacher/student-assignments', 'POST', { ...activity, username: 'nobody-here' }, { teacher: true });
  assert.equal(unknown.status, 404);
  const wrongYear = await call(db, '/v1/teacher/student-assignments', 'POST', { ...activity, itemId: 'h446-practice-141-data-types' }, { teacher: true });
  assert.equal(wrongYear.status, 400);
  const assign = await call(db, '/v1/teacher/student-assignments', 'POST', activity, { teacher: true });
  assert.equal(assign.status, 201);
  assert.equal(assign.data.scope, 'individual');
  assert.equal(assign.data.cohort, 'Y10');
  assert.equal(assign.data.added, true);
  assert.equal(JSON.stringify(assign.data).includes('pilotbird'), false);
  assert.equal(JSON.stringify(assign.data).includes(codes[0]), false);
  assert.equal(db.assignments.get(assign.data.assignmentKey).active, 0, 'Inactive definition does not assign whole year');

  const repeat = await call(db, '/v1/teacher/student-assignments', 'POST', activity, { teacher: true });
  assert.equal(repeat.data.added, false);
  const mine = await call(db, '/v1/work', 'POST', { code: codes[0] }, { teacher: true });
  const other = await call(db, '/v1/work', 'POST', { code: codes[1] }, { teacher: true });
  assert.equal(mine.data.work.length, 1);
  assert.equal(other.data.work.length, 0);
  const cohortProgress = await call(db, '/v1/teacher/progress?cohort=Y10', 'GET', undefined, { teacher: true });
  assert.equal(cohortProgress.data.assignments.length, 0, 'Individual work is not listed as year-wide');

  const attempt = { code: codes[0], assignmentKey: assign.data.assignmentKey,
    attemptId: crypto.randomUUID(), score: 85, level: '', source: 'practice' };
  const score = await call(db, '/v1/attempts', 'POST', attempt, { teacher: true });
  assert.equal(score.status, 200); assert.equal(score.data.saved, true);
  const otherScore = await call(db, '/v1/attempts', 'POST', { ...attempt, code: codes[1], attemptId: crypto.randomUUID() }, { teacher: true });
  assert.equal(otherScore.status, 403);
  const refreshed = await call(db, '/v1/work', 'POST', { code: codes[0] }, { teacher: true });
  assert.equal(refreshed.data.work[0].attempts, 1);
  assert.equal(refreshed.data.work[0].bestScore, 85);

  const everyone = await call(db, '/v1/teacher/assignments', 'POST',
    { cohort: 'Y10', itemId: activity.itemId, level: '' }, { teacher: true });
  assert.equal(everyone.status, 201);
  assert.equal(everyone.data.added, true, 'Whole-year assignment activates existing inactive definition');
  assert.equal(db.assignments.get(assign.data.assignmentKey).active, 1);
  const nowBoth = await Promise.all(codes.map(code => call(db, '/v1/work', 'POST', { code }, { teacher: true })));
  assert.deepEqual(nowBoth.map(result => result.data.work.length), [1, 1], 'First pupil is not shown a duplicate');
  assert.equal(nowBoth[0].data.work[0].bestScore, 85);
});

test('Conversion Grid reports with the pupil session only to their own assignment', async () => {
  const RealDate = globalThis.Date;
  // Fixed Sunday during the permitted pilot window, independent of test host time.
  const when = new RealDate('2026-11-15T16:00:00Z');
  globalThis.Date = class extends RealDate {
    constructor(...args) { super(...(args.length ? args : [when.valueOf()])); }
    static now() { return when.valueOf(); }
  };
  try {
    const db = new FakeD1();
    const codes = (await call(db, '/v1/teacher/codes', 'POST', { cohort: 'Y10', count: 2 }, { teacher: true })).data.codes;
    await call(db, '/v1/teacher/logins', 'POST', { logins: [
      { username: 'testbird', code: codes[0], password: '1234' },
      { username: 'testfox', code: codes[1], password: '5678' }
    ] }, { teacher: true });
    const assigned = await call(db, '/v1/teacher/student-assignments', 'POST',
      { username: 'testbird', itemId: 'j277-skill-p1-convert', level: 'both' }, { teacher: true });
    const firstSession = (await call(db, '/v1/login', 'POST', { username: 'testbird', password: '1234' })).data.session;
    const secondSession = (await call(db, '/v1/login', 'POST', { username: 'testfox', password: '5678' })).data.session;
    assert.equal(firstSession.length, 43);
    const attempt = { assignmentKey: assigned.data.assignmentKey,
      attemptId: crypto.randomUUID(), score: 70, level: 'easy', source: 'skill' };
    const withoutSession = await call(db, '/v1/attempts', 'POST', attempt);
    assert.equal(withoutSession.status, 400);
    const otherPupil = await call(db, '/v1/attempts', 'POST', attempt, { bearer: secondSession });
    assert.equal(otherPupil.status, 403);
    const saved = await call(db, '/v1/attempts', 'POST', attempt, { bearer: firstSession });
    assert.equal(saved.status, 200);
    assert.equal(saved.data.saved, true);
    const duplicate = await call(db, '/v1/attempts', 'POST', attempt, { bearer: firstSession });
    assert.equal(duplicate.data.duplicate, true);
    const work = await call(db, '/v1/work', 'POST', {}, { bearer: firstSession });
    assert.equal(work.data.work[0].bestScore, 70);
    assert.equal(work.data.work[0].attempts, 1);
    const teacherResult = await call(db, '/v1/teacher/student-progress', 'POST', { username: 'testbird' }, { teacher: true });
    assert.equal(teacherResult.status, 200);
    assert.equal(teacherResult.data.work[0].bestScore, 70);
    const forbiddenProgress = await call(db, '/v1/teacher/student-progress', 'POST', { username: 'testbird' });
    assert.equal(forbiddenProgress.status, 401);
    assert.equal(JSON.stringify(teacherResult.data).includes(codes[0]), false, 'Teacher progress excludes raw practice codes');
  } finally {
    globalThis.Date = RealDate;
  }
});

test('one checked Conversion Grid answer immediately updates pupil and teacher progress', async () => {
  const RealDate = globalThis.Date;
  const when = new RealDate('2026-11-15T16:00:00Z');
  globalThis.Date = class extends RealDate {
    constructor(...args) { super(...(args.length ? args : [when.valueOf()])); }
    static now() { return when.valueOf(); }
  };
  try {
    const db = new FakeD1();
    const codes = (await call(db, '/v1/teacher/codes', 'POST', { cohort: 'Y10', count: 2 }, { teacher: true })).data.codes;
    await call(db, '/v1/teacher/logins', 'POST', { logins: [
      { username: 'testbird', code: codes[0], password: '1234' },
      { username: 'testfox', code: codes[1], password: '5678' }
    ] }, { teacher: true });
    const assigned = await call(db, '/v1/teacher/student-assignments', 'POST',
      { username: 'testbird', itemId: 'j277-skill-p1-convert', level: 'both' }, { teacher: true });
    const assignmentKey = assigned.data.assignmentKey;
    const firstSession = (await call(db, '/v1/login', 'POST', { username: 'testbird', password: '1234' })).data.session;
    const secondSession = (await call(db, '/v1/login', 'POST', { username: 'testfox', password: '5678' })).data.session;
    const question = { assignmentKey, attemptId: crypto.randomUUID(), level: 'easy', firstTryCorrect: true };
    assert.equal((await call(db, '/v1/questions', 'POST', question)).status, 401, 'Requires a pupil session');
    assert.equal((await call(db, '/v1/questions', 'POST', question, { bearer: secondSession })).status, 403, 'Cannot record a different pupil assignment');
    assert.equal((await call(db, '/v1/questions', 'POST', { ...question, level: 'hard' }, { bearer: firstSession })).status, 400);
    const saved = await call(db, '/v1/questions', 'POST', question, { bearer: firstSession });
    assert.equal(saved.status, 200);
    assert.equal(saved.data.saved, true);
    assert.equal((await call(db, '/v1/questions', 'POST', question, { bearer: firstSession })).data.duplicate, true, 'Retry is idempotent');

    let work = await call(db, '/v1/work', 'POST', {}, { bearer: firstSession });
    assert.equal(work.data.work[0].questionsAttempted, 1);
    assert.equal(work.data.work[0].firstTryCorrect, 1);
    assert.equal(work.data.work[0].attempts, 0, 'Question does not count as a completed round');
    assert.equal(work.data.work[0].bestScore, null);
    const another = await call(db, '/v1/questions', 'POST',
      { assignmentKey, attemptId: crypto.randomUUID(), level: 'medium', firstTryCorrect: false }, { bearer: firstSession });
    assert.equal(another.data.saved, true);
    work = await call(db, '/v1/work', 'POST', {}, { bearer: firstSession });
    assert.deepEqual({ attempted: work.data.work[0].questionsAttempted, correct: work.data.work[0].firstTryCorrect,
      easy: work.data.work[0].easyQuestions, medium: work.data.work[0].mediumQuestions },
    { attempted: 2, correct: 1, easy: 1, medium: 1 });
    const teacher = await call(db, '/v1/teacher/student-progress', 'POST', { username: 'testbird' }, { teacher: true });
    assert.equal(teacher.data.work[0].questionsAttempted, 2);
    assert.equal(teacher.data.work[0].firstTryCorrect, 1);
    assert.equal([...db.attempts.values()].filter(row => row.level.startsWith('q-')).length, 2);
    assert.equal((await call(db, '/v1/teacher/student-progress', 'POST', { username: 'testfox' }, { teacher: true })).data.work.length, 0);
  } finally {
    globalThis.Date = RealDate;
  }
});

test('Year 12 1.4.1(a) MCQ records each checked answer during lessons without changing old results', async () => {
  const RealDate = globalThis.Date;
  const duringLesson = new RealDate('2026-11-17T10:00:00Z');
  globalThis.Date = class extends RealDate {
    constructor(...args) { super(...(args.length ? args : [duringLesson.valueOf()])); }
    static now() { return duringLesson.valueOf(); }
  };
  try {
    const db = new FakeD1();
    const codes = (await call(db, '/v1/teacher/codes', 'POST', { cohort: 'Y12', count: 2 }, { teacher: true })).data.codes;
    await call(db, '/v1/teacher/logins', 'POST', { logins: [
      { username: 'quizbird', code: codes[0], password: '1234' },
      { username: 'quizfox', code: codes[1], password: '5678' }
    ] }, { teacher: true });
    const assigned = await call(db, '/v1/teacher/student-assignments', 'POST',
      { username: 'quizbird', itemId: 'h446-practice-141-a', level: '' }, { teacher: true });
    assert.equal(assigned.status, 201);
    assert.equal(assigned.data.assignmentKey, '12|h446-practice-141-a|');
    const session = (await call(db, '/v1/login', 'POST', { username: 'quizbird', password: '1234' })).data.session;
    const other = (await call(db, '/v1/login', 'POST', { username: 'quizfox', password: '5678' })).data.session;
    const workDuringLesson = await call(db, '/v1/work', 'POST', {}, { bearer: session });
    assert.equal(workDuringLesson.status, 200, 'Assigned MCQ is visible during a school lesson');
    assert.equal(workDuringLesson.data.work[0].itemId, 'h446-practice-141-a');
    const question = { assignmentKey: assigned.data.assignmentKey, attemptId: crypto.randomUUID(), level: 'quiz', firstTryCorrect: true };
    assert.equal((await call(db, '/v1/questions', 'POST', question)).status, 401);
    assert.equal((await call(db, '/v1/questions', 'POST', question, { bearer: other })).status, 403);
    assert.equal((await call(db, '/v1/questions', 'POST', { ...question, level: 'easy' }, { bearer: session })).status, 400);
    assert.equal((await call(db, '/v1/questions', 'POST', { ...question, assignmentKey: '12|h446-practice-141-b|' }, { bearer: session })).status, 400);
    const saved = await call(db, '/v1/questions', 'POST', question, { bearer: session });
    assert.equal(saved.status, 200);
    assert.equal(saved.data.saved, true);
    assert.equal((await call(db, '/v1/questions', 'POST', question, { bearer: session })).data.duplicate, true);
    await call(db, '/v1/questions', 'POST', { ...question, attemptId: crypto.randomUUID(), firstTryCorrect: false }, { bearer: session });
    const updated = await call(db, '/v1/work', 'POST', {}, { bearer: session });
    assert.deepEqual({ attempts: updated.data.work[0].attempts, answered: updated.data.work[0].questionsAttempted,
      correct: updated.data.work[0].firstTryCorrect, quizQuestions: updated.data.work[0].quizQuestions,
      quizCorrect: updated.data.work[0].quizCorrect },
    { attempts: 0, answered: 2, correct: 1, quizQuestions: 2, quizCorrect: 1 });
    const teacher = await call(db, '/v1/teacher/student-progress', 'POST', { username: 'quizbird' }, { teacher: true });
    assert.equal(teacher.data.work[0].quizQuestions, 2);
    assert.equal([...db.attempts.values()].every(row => row.level === 'q-quiz' && row.source === 'practice'), true);
    db.individualAssignments.get(codes[0] + '|' + assigned.data.assignmentKey).created_at = '2020-01-01 00:00:00';
    assert.equal((await call(db, '/v1/questions', 'POST', { ...question, attemptId: crypto.randomUUID() }, { bearer: session })).status, 403);
  } finally {
    globalThis.Date = RealDate;
  }
});


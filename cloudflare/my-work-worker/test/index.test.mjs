import { test } from 'node:test';
import assert from 'node:assert/strict';
import worker, { assignmentKey, isIndependentWorkTime, newPracticeCode, liveClasswork, workSetIsCurrent } from '../src/index.mjs';

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
  constructor() { this.codes = new Map(); this.assignments = new Map(); this.individualAssignments = new Map(); this.attempts = new Map(); this.logins = new Map(); this.sessions = new Map(); this.workSets = new Map(); this.workSetItems = []; }
  async batch(statements) { const results = []; for (const statement of statements) results.push(await statement.run()); return results; }
  prepare(sql) {
    return { run: () => this.prepare(sql).bind().run(), bind: (...args) => {
      const first = async () => {
        if (sql.includes('COUNT(*) AS count FROM assignments'))
          return { count: [...this.assignments.values()].filter(row => row.cohort === args[0] && row.active).length };
        if (sql.includes('COUNT(*) AS count FROM student_assignments'))
          return { count: [...this.individualAssignments.values()].filter(row => row.active && this.codes.get(row.code)?.cohort === args[0]).length };
        if (sql.includes('COUNT(*) AS count FROM work_sets'))
          return { count: [...this.workSets.values()].filter(row => row.cohort === args[0] && row.active).length };
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
            (!sql.includes("level LIKE 'q-%'") || x.level.startsWith('q-')) &&
            (!sql.includes("level NOT LIKE 'q-%'") || !x.level.startsWith('q-'))).length };
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
        if (sql.startsWith('CREATE TABLE IF NOT EXISTS work_sets') ||
            sql.startsWith('CREATE TABLE IF NOT EXISTS work_set_items') ||
            sql.startsWith('CREATE INDEX IF NOT EXISTS work_sets_by_year')) return { meta: { changes: 0 } };
        if (sql.includes('INSERT INTO work_sets')) {
          const [id, cohort, title, kind, scope, target_code, due_date] = args;
          this.workSets.set(id, { id, cohort, title, kind, scope, target_code, dueDate: due_date, active: 1, createdAt: new Date().toISOString() });
          return { meta: { changes: 1 } };
        }
        if (sql.includes('INSERT INTO work_set_items')) {
          const [work_set_id, assignment_key, position] = args;
          this.workSetItems.push({ work_set_id, assignment_key, position });
          return { meta: { changes: 1 } };
        }
        if (sql.includes('WITH corrections(code, previous, target) AS MATERIALIZED')) {
          const expectedCount = args[args.length - 1];
          const corrections = [];
          for (let i = 0; i < args.length - 1; i += 3) corrections.push({ code: args[i], from: args[i + 1], to: args[i + 2] });
          if (corrections.length !== expectedCount || corrections.some(c => !this.codes.get(c.code)?.enabled || this.codes.get(c.code)?.cohort !== c.from)) {
            return { meta: { changes: 0 } };
          }
          for (const correction of corrections) this.codes.get(correction.code).cohort = correction.to;
          return { meta: { changes: corrections.length } };
        }
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
        if (sql.includes("UPDATE practice_codes SET cohort = 'Y12'")) {
          const row = this.codes.get(args[0]);
          if (!row || row.cohort !== 'Y11' || !row.enabled) return { meta: { changes: 0 } };
          row.cohort = 'Y12';
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
        if (sql.includes('LEFT JOIN attempts t ON t.code = p.code') &&
            sql.includes('pilot-20261119-Y11')) {
          const wanted = new Set(args);
          return { results: [...this.logins.values()].filter(login => wanted.has(login.username_key)).flatMap(login => {
            const pupil = this.codes.get(login.code);
            if (!pupil?.enabled) return [];
            const scores = [...this.attempts.values()].filter(attempt => attempt.code === pupil.code &&
              attempt.created_at >= '2026-11-19 00:00:00' && attempt.created_at < '2026-11-20 00:00:00' &&
              this.workSetItems.some(item => item.assignment_key === attempt.assignment_key &&
                ['pilot-20261119-Y11', 'pilot-20261119-Y12', 'pilot-20261119-Y13'].includes(item.work_set_id)));
            if (!scores.length) return [{ usernameKey: login.username_key, registeredCohort: pupil.cohort,
              itemId: null, records: 0, questionsAttempted: 0, firstTryCorrect: 0, attempts: 0, bestScore: null, lastAttempt: null }];
            const byItem = new Map();
            for (const attempt of scores) {
              const itemId = this.assignments.get(attempt.assignment_key)?.item_id;
              if (!itemId) continue;
              if (!byItem.has(itemId)) byItem.set(itemId, []);
              byItem.get(itemId).push(attempt);
            }
            return [...byItem].map(([itemId, itemScores]) => ({
              usernameKey: login.username_key, registeredCohort: pupil.cohort,
              itemId, records: itemScores.length, lastAttempt: itemScores.at(-1).created_at,
              ...attemptStats(itemScores)
            }));
          }) };
        }
        if (sql.includes('FROM work_sets s') && sql.includes('JOIN work_set_items si')) {
          const permissionQuery = sql.includes('WHERE si.assignment_key = ?');
          const teacherQuery = sql.includes('WHERE s.cohort = ? ORDER BY');
          return { results: this.workSetItems.flatMap(item => {
            const set = this.workSets.get(item.work_set_id);
            const a = this.assignments.get(item.assignment_key);
            if (!set || !a) return [];
            if (sql.includes("s.id NOT LIKE 'pilot-20261119-%'") && set.id.startsWith('pilot-20261119-')) return [];
            if (permissionQuery) {
              const overlap = sql.includes("OR ? = 'cohort'");
              return item.assignment_key === args[0] && set.cohort === args[1] && set.active &&
                (set.scope === 'cohort' || (overlap && args[2] === 'cohort') || set.target_code === (overlap ? args[3] : args[2])) ? [set] : [];
            }
            if (teacherQuery) return set.cohort === args[0]
              ? [{ ...set, itemId: a.item_id, level: a.level }] : [];
            const [code, cohort] = args;
            if (set.cohort !== cohort || !set.active || (set.scope === 'individual' && set.target_code !== code)) return [];
            const scores = [...this.attempts.values()].filter(t => t.code === code && t.assignment_key === item.assignment_key &&
              (!sql.includes('t.created_at >= s.created_at') || Date.parse(t.created_at) >= Date.parse(set.createdAt)));
            return [{ packageId: set.id, packageTitle: set.title, workType: set.kind, kind: set.kind,
              createdAt: set.createdAt, dueDate: set.dueDate, active: set.active,
              assignmentKey: a.assignment_key, itemId: a.item_id, level: a.level,
              lastAttempt: scores.at(-1)?.created_at || null, ...attemptStats(scores) }];
          }) };
        }
        if (sql.includes('SELECT l.username_key, p.code, p.cohort')) {
          return { results: [...this.logins.values()].map(login => ({ ...this.codes.get(login.code), username_key: login.username_key }))
            .filter(row => row.enabled).map(({ username_key, code, cohort }) => ({ username_key, code, cohort })) };
        }
        if (sql.includes('FROM student_assignments s JOIN assignments a')) {
          const [code, cohort] = args;
          return { results: [...this.individualAssignments.values()].filter(x => x.code === code && x.active && this.assignments.get(x.assignment_key)?.cohort === cohort).map(x => {
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
        if (sql.includes('SELECT assignment_key FROM assignments') && sql.includes('assignment_key IN')) {
          return { results: [...this.assignments.values()].filter(x => x.cohort === args[0] && x.active && [args[1], args[2]].includes(x.assignment_key)).map(x => ({ assignment_key: x.assignment_key })) };
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

test('work-set availability separates seven-day classwork from the homework deadline', () => {
  const set = { kind: 'classwork', active: 1, createdAt: '2026-11-18 09:00:00' };
  assert.equal(workSetIsCurrent(set, new Date('2026-11-18T10:00:00Z')), true);
  assert.equal(workSetIsCurrent(set, new Date('2026-11-25T08:59:59Z')), true);
  assert.equal(workSetIsCurrent(set, new Date('2026-11-25T09:00:00Z')), false);
  assert.equal(workSetIsCurrent({ kind: 'homework', active: 1, dueDate: '2026-11-20' }, new Date('2026-11-20T22:00:00Z')), true);
  assert.equal(workSetIsCurrent({ kind: 'homework', active: 1, dueDate: '2026-11-20' }, new Date('2026-11-21T00:00:00Z')), false);
  assert.equal(workSetIsCurrent({ ...set, active: 0 }, new Date('2026-11-18T10:00:00Z')), false);
});

test('one individual classwork set groups Skill and Revision Practice without widening access', async () => {
  const OriginalDate = globalThis.Date;
  let now = new OriginalDate('2026-11-18T10:00:00Z');
  globalThis.Date = class extends OriginalDate {
    constructor(...args) { super(...(args.length ? args : [now.valueOf()])); }
    static now() { return now.valueOf(); }
  };
  try {
    const db = new FakeD1();
    const codes = (await call(db, '/v1/teacher/codes', 'POST', { cohort: 'Y12', count: 2 }, { teacher: true })).data.codes;
    const login = await call(db, '/v1/teacher/logins', 'POST', { logins: [
      { username: 'testwaffle', code: codes[0], password: '1234', expectedCohort: 'Y12' },
      { username: 'testmuffin', code: codes[1], password: '5678', expectedCohort: 'Y12' }
    ] }, { teacher: true });
    assert.equal(login.status, 201);
    const payload = { cohort: 'Y12', scope: 'individual', username: 'testwaffle',
      title: 'Number systems and data types', kind: 'classwork', items: [
        { itemId: 'h446-skill-p1-convert', level: 'both' },
        { itemId: 'h446-practice-141-a', level: '' }
      ] };
    const noTeacher = await call(db, '/v1/teacher/work-sets', 'POST', payload);
    assert.equal(noTeacher.status, 401);
    const wrongYear = await call(db, '/v1/teacher/work-sets', 'POST', { ...payload, cohort: 'Y13' }, { teacher: true });
    assert.equal(wrongYear.status, 409);
    assert.equal(db.workSets.size, 0);
    const created = await call(db, '/v1/teacher/work-sets', 'POST', payload, { teacher: true });
    assert.equal(created.status, 201, JSON.stringify(created.data));
    assert.equal(created.data.activityCount, 2);
    assert.equal(db.workSets.size, 1);
    const inventory = await call(db, '/v1/teacher/assignment-inventory?cohort=Y12', 'GET', undefined, { teacher: true });
    assert.deepEqual(inventory.data, { cohort: 'Y12', wholeYearActivityRecords: 0, individualActivityRecords: 0, combinedAssignments: 1 });
    assert.equal((await call(db, '/v1/teacher/work-sets', 'POST', payload, { teacher: true })).status, 409,
      'Do not create overlapping sets that share activity-level scores');
    assert.equal([...db.assignments.values()].filter(row => row.active).length, 0,
      'New work-set definitions must not allocate activities to the entire cohort');
    const first = await call(db, '/v1/work', 'POST', { code: codes[0] });
    const secondSession = (await call(db, '/v1/login', 'POST', { username: 'testmuffin', password: '5678' })).data.session;
    const second = await call(db, '/v1/work', 'POST', {}, { bearer: secondSession });
    assert.equal(first.status, 200, JSON.stringify(first.data));
    assert.equal(first.data.work.length, 2);
    assert.ok(first.data.work.every(row => row.packageId === created.data.id && row.workType === 'classwork'));
    assert.equal(second.data.work.length, 0);
    const firstSaved = await call(db, '/v1/questions', 'POST', {
      assignmentKey: '12|h446-practice-141-a|', attemptId: crypto.randomUUID(),
      level: 'quiz', firstTryCorrect: true
    }, { bearer: (await call(db, '/v1/login', 'POST', { username: 'testwaffle', password: '1234' })).data.session });
    assert.equal(firstSaved.status, 200, JSON.stringify(firstSaved.data));
    assert.equal(db.attempts.size, 1);
    const grouped = await call(db, '/v1/teacher/work-sets?cohort=Y12', 'GET', undefined, { teacher: true });
    assert.equal(grouped.data.sets.length, 2);
    now = new OriginalDate('2026-11-26T10:00:00Z');
    const firstSession = (await call(db, '/v1/login', 'POST', { username: 'testwaffle', password: '1234' })).data.session;
    const expired = await call(db, '/v1/work', 'POST', {}, { bearer: firstSession });
    assert.equal(expired.data.work.length, 0);
    assert.equal(db.attempts.size, 1, 'Expiry does not delete marks');
  } finally { globalThis.Date = OriginalDate; }
});

test('a combined H446 work-set saves regular revision quiz scores through student login', async () => {
  const db = new FakeD1();
  const [code] = (await call(db, '/v1/teacher/codes', 'POST', { cohort: 'Y13', count: 1 }, { teacher: true })).data.codes;
  const createdLogin = await call(db, '/v1/teacher/logins', 'POST', { logins: [
    { username:'topicwaffle', code, password:'1234', expectedCohort:'Y13' }
  ] }, { teacher:true });
  assert.equal(createdLogin.status, 201);
  const set = await call(db, '/v1/teacher/work-sets', 'POST', {
    cohort:'Y13', scope:'cohort', title:'Two A Level revision topics and a Skill', kind:'classwork',
    items: [
      { itemId:'h446-practice-11-components', level:'' },
      { itemId:'h446-practice-23-complexity', level:'' },
      { itemId:'h446-skill-p2-bigo', level:'both' }
    ]
  }, { teacher:true });
  assert.equal(set.status, 201, JSON.stringify(set.data));
  const session = (await call(db, '/v1/login', 'POST', { username:'topicwaffle', password:'1234' })).data.session;
  const work = await call(db, '/v1/work', 'POST', {}, { bearer:session });
  assert.equal(work.status, 200);
  assert.deepEqual(work.data.work.map(row => row.itemId).sort(),
    ['h446-practice-11-components','h446-practice-23-complexity','h446-skill-p2-bigo']);
  for (const [itemId,score] of [['h446-practice-11-components',80],['h446-practice-23-complexity',60]]) {
    const saved = await call(db, '/v1/attempts', 'POST', {
      assignmentKey:`13|${itemId}|`, attemptId:crypto.randomUUID(), score, level:'', source:'practice'
    }, { bearer:session });
    assert.equal(saved.status, 200, JSON.stringify(saved.data));
    assert.equal(saved.data.saved, true);
  }
  const updated = await call(db, '/v1/work', 'POST', {}, { bearer:session });
  assert.equal(updated.data.work.find(row => row.itemId === 'h446-practice-11-components').bestScore, 80);
  assert.equal(updated.data.work.find(row => row.itemId === 'h446-practice-23-complexity').bestScore, 60);
  assert.equal(updated.data.work.find(row => row.itemId === 'h446-skill-p2-bigo').attempts, 0,
    'Link-only Skill is assigned but never claims an automatic score');
});

test('homework sets require a deadline and do not bypass independent study hours', async () => {
  const OriginalDate = globalThis.Date;
  let now = new OriginalDate('2026-11-18T10:00:00Z');
  globalThis.Date = class extends OriginalDate {
    constructor(...args) { super(...(args.length ? args : [now.valueOf()])); }
    static now() { return now.valueOf(); }
  };
  try {
    const db = new FakeD1();
    const [code] = (await call(db, '/v1/teacher/codes', 'POST', { cohort: 'Y10', count: 1 }, { teacher: true })).data.codes;
    const payload = { cohort: 'Y10', scope: 'cohort', title: 'Homework: number systems', kind: 'homework',
      items: [{ itemId: 'j277-skill-p1-convert', level: 'both' }] };
    assert.equal((await call(db, '/v1/teacher/work-sets', 'POST', payload, { teacher: true })).status, 400);
    const created = await call(db, '/v1/teacher/work-sets', 'POST', { ...payload, dueDate: '2026-11-20' }, { teacher: true });
    assert.equal(created.status, 201);
    const closed = await call(db, '/v1/work', 'POST', { code });
    assert.equal(closed.status, 403, JSON.stringify(closed.data));
    now = new OriginalDate('2026-11-18T16:00:00Z');
    assert.equal((await call(db, '/v1/work', 'POST', { code })).data.work.length, 1);
    now = new OriginalDate('2026-11-21T10:00:00Z');
    assert.equal((await call(db, '/v1/work', 'POST', { code })).data.work.length, 0);
  } finally { globalThis.Date = OriginalDate; }
});

test('learner overview preserves homework history, excludes the pilot and cannot open homework at lesson time', async () => {
  const OriginalDate = globalThis.Date;
  let now = new OriginalDate('2026-11-19T10:00:00Z');
  globalThis.Date = class extends OriginalDate {
    constructor(...args) { super(...(args.length ? args : [now.valueOf()])); }
    static now() { return now.valueOf(); }
  };
  try {
    const db = new FakeD1();
    const codes = (await call(db, '/v1/teacher/codes', 'POST', { cohort: 'Y12', count: 2 }, { teacher: true })).data.codes;
    assert.equal((await call(db, '/v1/teacher/logins', 'POST', { logins: [
      { username:'studywaffle', code:codes[0], password:'1234', expectedCohort:'Y12' },
      { username:'studytoast', code:codes[1], password:'5678', expectedCohort:'Y12' }
    ] }, { teacher:true })).status, 201);
    const homework = await call(db, '/v1/teacher/work-sets', 'POST', {
      cohort:'Y12', scope:'individual', username:'studywaffle', kind:'homework', dueDate:'2026-11-20',
      title:'Binary homework', items:[{ itemId:'h446-practice-141-a', level:'' }]
    }, { teacher:true });
    assert.equal(homework.status, 201, JSON.stringify(homework.data));
    const key = '12|h446-practice-141-a|';
    const pilotId = 'pilot-20261119-Y12';
    db.workSets.set(pilotId, { id:pilotId, cohort:'Y12', scope:'cohort', title:'Pilot Year 12',
      kind:'classwork', active:1, dueDate:null, createdAt:'2026-11-19T09:00:00Z' });
    db.workSetItems.push({ work_set_id:pilotId, assignment_key:key, position:0 });
    db.attempts.set('old', { attempt_id:'old', code:codes[0], assignment_key:key,
      score:100, level:'q-quiz', created_at:'2026-11-18 11:00:00' });
    const session = (await call(db, '/v1/login', 'POST', {
      username:'studywaffle', password:'1234'
    })).data.session;
    const otherSession = (await call(db, '/v1/login', 'POST', {
      username:'studytoast', password:'5678'
    })).data.session;
    assert.equal((await call(db, '/v1/learner/overview', 'POST', {})).status, 401);
    assert.equal((await call(db, '/v1/learner/overview', 'POST', {}, { bearer:otherSession })).data.work.length, 0);
    const duringLesson = await call(db, '/v1/learner/overview', 'POST', {}, { bearer:session });
    assert.equal(duringLesson.status, 200, JSON.stringify(duringLesson.data));
    assert.equal(duringLesson.data.work.length, 1, 'A pilot set must never appear on student dashboard');
    assert.equal(duringLesson.data.work[0].questionsAttempted, 0, 'Old marks must not complete a newly issued homework');
    assert.equal(duringLesson.data.work[0].available, false, 'Cannot launch homework during restricted hours');
    db.attempts.set('new', { attempt_id:'new', code:codes[0], assignment_key:key,
      score:100, level:'q-quiz', created_at:'2026-11-19 16:00:00' });
    now = new OriginalDate('2026-11-19T16:05:00Z');
    const open = await call(db, '/v1/learner/overview', 'POST', {}, { bearer:session });
    assert.equal(open.data.work[0].questionsAttempted, 1);
    assert.equal(open.data.work[0].available, true);
    now = new OriginalDate('2026-11-21T16:05:00Z');
    const freshSession = (await call(db, '/v1/login', 'POST', {
      username:'studywaffle', password:'1234'
    })).data.session;
    const past = await call(db, '/v1/learner/overview', 'POST', {}, { bearer:freshSession });
    assert.equal(past.data.work.length, 1, 'Expired homework remains in progress history');
    assert.equal(past.data.work[0].available, false, 'Expired work is review-only');
  } finally { globalThis.Date = OriginalDate; }
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
    await call(db, '/v1/teacher/logins', 'POST', { logins: [{ username: 'year12bird', code, password: '1234', expectedCohort: 'Y12' }] }, { teacher: true });
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
    await call(db, '/v1/teacher/logins', 'POST', { logins: [{ username: 'misplacedbird', code, password: '1234', expectedCohort: 'Y10' }] }, { teacher: true });
    const session = (await call(db, '/v1/login', 'POST', { username: 'misplacedbird', password: '1234' })).data.session;
    const response = await call(db, '/v1/work', 'POST', {}, { bearer: session });
    assert.equal(response.status, 200);
    assert.equal(response.data.cohort, 'Y10');
    assert.deepEqual(response.data.work, []);
    assert.match(response.data.notice, /Year 10/);
    assert.match(response.data.notice, /not your year group/);
  } finally { globalThis.Date = RealDate; }
});

test('teacher can correct one verified Year 11 login to Year 12 without altering PIN or progress', async () => {
  const RealDate = globalThis.Date;
  const duringLesson = new RealDate('2026-11-18T10:00:00Z');
  globalThis.Date = class extends RealDate {
    constructor(...args) { super(...(args.length ? args : [duringLesson.valueOf()])); }
    static now() { return duringLesson.valueOf(); }
  };
  try {
    const db = new FakeD1();
    const [wrongCode, otherCode] = (await call(db, '/v1/teacher/codes', 'POST', { cohort: 'Y11', count: 2 }, { teacher: true })).data.codes;
    await call(db, '/v1/teacher/logins', 'POST', { logins: [
      { username: 'fictionalbird', code: wrongCode, password: '1234', expectedCohort: 'Y11' },
      { username: 'otheryear11', code: otherCode, password: '5678', expectedCohort: 'Y11' }
    ] }, { teacher: true });
    const [year12Code] = (await call(db, '/v1/teacher/codes', 'POST', { cohort: 'Y12', count: 1 }, { teacher: true })).data.codes;
    assert.ok(year12Code);
    const oldTask = await call(db, '/v1/teacher/student-assignments', 'POST',
      { username: 'fictionalbird', itemId: 'j277-skill-p1-convert', level: 'both' }, { teacher: true });
    db.attempts.set('historic-score', { attempt_id: 'historic-score', code: wrongCode,
      assignment_key: oldTask.data.assignmentKey, level: 'q-easy', score: 100, source: 'skill' });
    await call(db, '/v1/teacher/assignments', 'POST',
      { cohort: 'Y12', itemId: 'h446-skill-p1-convert', level: 'both' }, { teacher: true });
    const session = (await call(db, '/v1/login', 'POST', { username: 'fictionalbird', password: '1234' })).data.session;
    assert.equal((await call(db, '/v1/work', 'POST', {}, { bearer: session })).data.cohort, 'Y11');
    const correction = { username: 'fictionalbird', expectedCohort: 'Y11', targetCohort: 'Y12', confirm: true };
    assert.equal((await call(db, '/v1/teacher/reclassify-y12-login', 'POST', correction)).status, 401);
    assert.equal((await call(db, '/v1/teacher/reclassify-y12-login', 'POST', { ...correction, confirm: false }, { teacher: true })).status, 400);
    assert.equal((await call(db, '/v1/teacher/reclassify-y12-login', 'POST', { ...correction, username: 'unknownlogin' }, { teacher: true })).status, 404);
    const fixed = await call(db, '/v1/teacher/reclassify-y12-login', 'POST', correction, { teacher: true });
    assert.equal(fixed.status, 200);
    assert.deepEqual(fixed.data, { username: 'fictionalbird', previousCohort: 'Y11', cohort: 'Y12', changed: true, progressPreserved: true });
    assert.equal(db.codes.get(wrongCode).cohort, 'Y12');
    assert.equal(db.codes.get(otherCode).cohort, 'Y11', 'Other Year 11 learner not changed');
    assert.equal(db.attempts.get('historic-score').score, 100, 'Historical score is retained');
    const visible = await call(db, '/v1/work', 'POST', {}, { bearer: session });
    assert.equal(visible.data.cohort, 'Y12', 'Existing login session gets corrected cohort');
    assert.deepEqual(visible.data.work.map(item => item.itemId), ['h446-skill-p1-convert'], 'Old individual Year 11 work is not shown under Year 12');
    assert.equal(visible.data.work[0].workType, 'classwork');
    assert.equal((await call(db, '/v1/login', 'POST', { username: 'fictionalbird', password: '1234' })).status, 200, 'PIN continues to work');
    assert.equal((await call(db, '/v1/teacher/reclassify-y12-login', 'POST', correction, { teacher: true })).status, 409, 'Repeat correction does not silently reassign');
    assert.equal((await call(db, '/v1/teacher/progress?cohort=Y12', 'GET', undefined, { teacher: true })).data.codes.length, 2);
  } finally { globalThis.Date = RealDate; }
});

test('selected Year 13 Classwork assigns both activities only to validated logins', async () => {
  const RealDate = globalThis.Date;
  const duringLesson = new RealDate('2026-11-18T10:00:00Z');
  globalThis.Date = class extends RealDate {
    constructor(...args) { super(...(args.length ? args : [duringLesson.valueOf()])); }
    static now() { return duringLesson.valueOf(); }
  };
  try {
    const db = new FakeD1();
    const codes = (await call(db, '/v1/teacher/codes', 'POST', { cohort: 'Y13', count: 5 }, { teacher: true })).data.codes;
    const names = ['fictionalswan', 'fictionalgoose', 'fictionaltoad', 'fictionalfudge'];
    await call(db, '/v1/teacher/logins', 'POST', { logins: [...names, 'spareyear13'].map((username, i) => ({ username, code: codes[i], password: '1234', expectedCohort: 'Y13' })) }, { teacher: true });
    const body = { cohort: 'Y13', usernames: names, confirm: false };
    assert.equal((await call(db, '/v1/teacher/selected-classwork', 'POST', body)).status, 401);
    assert.equal((await call(db, '/v1/teacher/selected-classwork', 'POST', { ...body, usernames: [names[0], names[0]] }, { teacher: true })).status, 400);
    const preview = await call(db, '/v1/teacher/selected-classwork', 'POST', body, { teacher: true });
    assert.equal(preview.status, 200);
    assert.equal(preview.data.assignmentCount, 8);
    assert.equal(db.individualAssignments.size, 0, 'Preview does not write assignments');
    const assigned = await call(db, '/v1/teacher/selected-classwork', 'POST', { ...body, confirm: true }, { teacher: true });
    assert.equal(assigned.status, 201);
    assert.deepEqual({ pupils: assigned.data.pupilCount, tasks: assigned.data.activityCount, created: assigned.data.newlyAssigned }, { pupils: 4, tasks: 2, created: 8 });
    assert.equal(db.individualAssignments.size, 8);
    assert.equal([...db.assignments.values()].every(a => a.cohort === 'Y13' && !a.active), true, 'No whole-year assignment is activated');
    assert.equal([...db.individualAssignments.values()].some(a => a.code === codes[4]), false, 'Spare Year 13 account receives nothing');
    const session = (await call(db, '/v1/login', 'POST', { username: names[0], password: '1234' })).data.session;
    const work = await call(db, '/v1/work', 'POST', {}, { bearer: session });
    assert.equal(work.status, 200);
    assert.deepEqual(work.data.work.map(row => row.itemId).sort(), ['h446-practice-141-a', 'h446-skill-p1-convert']);
    db.attempts.set('old-verified-answer', { attempt_id: 'old-verified-answer', code: codes[0],
      assignment_key: '13|h446-skill-p1-convert|both', level: 'q-easy', score: 100, source: 'skill' });
    const repeat = await call(db, '/v1/teacher/selected-classwork', 'POST', { ...body, confirm: true }, { teacher: true });
    assert.deepEqual({ added: repeat.data.newlyAssigned, renewed: repeat.data.renewed, active: repeat.data.alreadyActive }, { added: 0, renewed: 0, active: 8 });
    assert.equal(db.attempts.size, 1, 'Repeated assignment does not erase scores');
    for (const row of db.individualAssignments.values()) row.created_at = '2020-01-01 00:00:00';
    const renewal = await call(db, '/v1/teacher/selected-classwork', 'POST', { ...body, confirm: true }, { teacher: true });
    assert.equal(renewal.data.renewed, 8);
    assert.equal(db.attempts.size, 1, 'Renewal keeps historical answers');
  } finally { globalThis.Date = RealDate; }
});

test('selected Classwork rejects wrong-year accounts and existing whole-year work before any changes', async () => {
  const db = new FakeD1();
  const [right] = (await call(db, '/v1/teacher/codes', 'POST', { cohort: 'Y13', count: 1 }, { teacher: true })).data.codes;
  const [wrong] = (await call(db, '/v1/teacher/codes', 'POST', { cohort: 'Y11', count: 1 }, { teacher: true })).data.codes;
  await call(db, '/v1/teacher/logins', 'POST', { logins: [
    { username: 'fictionalright', code: right, password: '1234', expectedCohort: 'Y13' },
    { username: 'fictionalwrong', code: wrong, password: '5678', expectedCohort: 'Y11' }
  ] }, { teacher: true });
  const mismatch = await call(db, '/v1/teacher/selected-classwork', 'POST',
    { cohort: 'Y13', usernames: ['fictionalright','fictionalwrong'], confirm: true }, { teacher: true });
  assert.equal(mismatch.status, 409);
  assert.match(mismatch.data.error, /registered as Year 11/);
  assert.equal(db.individualAssignments.size, 0);
  await call(db, '/v1/teacher/assignments', 'POST', { cohort: 'Y13', itemId: 'h446-practice-141-a', level: '' }, { teacher: true });
  const overlap = await call(db, '/v1/teacher/selected-classwork', 'POST',
    { cohort: 'Y13', usernames: ['fictionalright'], confirm: true }, { teacher: true });
  assert.equal(overlap.status, 409);
  assert.match(overlap.data.error, /entire year group/);
  assert.equal(db.individualAssignments.size, 0);
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
    await call(db, '/v1/teacher/logins', 'POST', { logins: [{ username: 'renewclassbird', code, password: '1234', expectedCohort: 'Y12' }] }, { teacher: true });
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
    { username: 'renewbird', code: firstCode, password: '1234', expectedCohort: 'Y12' },
    { username: 'renewfox', code: otherCode, password: '5678', expectedCohort: 'Y12' }
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
  assert.deepEqual((await call(db, '/v1/health')).data, { ok: true, pilot: true, classworkPolicy: '7-day-renewable-v2', workSets: 'v1', cohortCorrection: '11-to-12-v1', selectedClasswork: 'v1', cohortAudit: 'v1', mcqQuestionTracking: 'v1', learnerOverview: 'v1', synopticPublishing: 'teacher-only-v1', synopticLearner: 'unreleased-v1' });
  const blocked = await call(db, '/v1/teacher/codes', 'POST', { cohort: 'Y12', count: 10 });
  assert.equal(blocked.status, 401);
  const wrongOrigin = await call(db, '/v1/health', 'GET', undefined, { origin: 'https://not-rhsccs.org' });
  assert.equal(wrongOrigin.status, 403);
  assert.equal(wrongOrigin.cors, null);
});

test('new login imports require and check the original year before creating any accounts', async () => {
  const db = new FakeD1();
  const [y11] = (await call(db, '/v1/teacher/codes', 'POST', { cohort: 'Y11', count: 1 }, { teacher: true })).data.codes;
  const [y13] = (await call(db, '/v1/teacher/codes', 'POST', { cohort: 'Y13', count: 1 }, { teacher: true })).data.codes;
  const missingYear = await call(db, '/v1/teacher/logins', 'POST', { logins: [
    { username: 'examplebird', code: y11, password: '1234' }
  ] }, { teacher: true });
  assert.equal(missingYear.status, 400);
  const wrongYear = await call(db, '/v1/teacher/logins', 'POST', { logins: [
    { username: 'examplebird', code: y11, password: '1234', expectedCohort: 'Y11' },
    { username: 'examplefox', code: y13, password: '5678', expectedCohort: 'Y12' }
  ] }, { teacher: true });
  assert.equal(wrongYear.status, 409);
  assert.match(wrongYear.data.error, /year group/);
  assert.equal(db.logins.size, 0, 'No earlier row is silently added before the mismatch is noticed');
  const okay = await call(db, '/v1/teacher/logins', 'POST', { logins: [
    { username: 'examplebird', code: y11, password: '1234', expectedCohort: 'Y11' },
    { username: 'examplefox', code: y13, password: '5678', expectedCohort: 'Y13' }
  ] }, { teacher: true });
  assert.equal(okay.status, 201);
  assert.equal(db.logins.size, 2);
  assert.equal((await call(db, '/v1/teacher/logins', 'POST', { logins: [
    { username: 'examplebird', code: y11, password: '1234', expectedCohort: 'Y13' }
  ] }, { teacher: true })).status, 409, 'Even repeated imports must agree with the year');
});

test('whole-roster audit protects all accounts and corrects only approved year mismatches without changing PINs or scores', async () => {
  const db = new FakeD1();
  const misplaced = (await call(db, '/v1/teacher/codes', 'POST', { cohort: 'Y11', count: 5 }, { teacher: true })).data.codes;
  const [correct] = (await call(db, '/v1/teacher/codes', 'POST', { cohort: 'Y12', count: 1 }, { teacher: true })).data.codes;
  const usernames = ['imaginaryswan', 'imaginarygoose', 'imaginarytoad', 'imaginaryfudge', 'imaginarybop', 'correctbird'];
  const codes = [...misplaced, correct];
  for (let index = 0; index < 6; index++) {
    const cohort = index === 5 ? 'Y12' : 'Y11';
    const result = await call(db, '/v1/teacher/logins', 'POST', { logins: [
      { username: usernames[index], code: codes[index], password: '1234', expectedCohort: cohort }
    ] }, { teacher: true });
    assert.equal(result.status, 201);
  }
  const initialProfiles = structuredClone([...db.logins.values()]);
  const session = (await call(db, '/v1/login', 'POST', { username: usernames[0], password: '1234' })).data.session;
  const oldTask = (await call(db, '/v1/teacher/student-assignments', 'POST',
    { username: usernames[0], itemId: 'j277-skill-p1-convert', level: 'both' }, { teacher: true })).data.assignmentKey;
  db.attempts.set('old-score', { code: misplaced[0], assignment_key: oldTask, score: 100, level: 'q-easy' });
  const roster = usernames.map((username, index) => ({ username, cohort: index < 4 ? 'Y13' : 'Y12' }));
  const auditPath = '/v1/teacher/audit-cohorts';
  assert.equal((await call(db, auditPath, 'POST', { roster, confirm: false })).status, 401);
  assert.equal((await call(db, auditPath, 'POST', { roster: [{ ...roster[0], password: '1234' }], confirm: false }, { teacher: true })).status, 400);
  assert.equal((await call(db, auditPath, 'POST', { roster: [roster[0], roster[0]], confirm: false }, { teacher: true })).status, 400);
  const partial = await call(db, auditPath, 'POST', { roster: roster.slice(0, 5), confirm: false }, { teacher: true });
  assert.equal(partial.data.ready, false);
  assert.equal(partial.data.unlistedActive, 1);
  const blocked = await call(db, auditPath, 'POST', { roster: roster.slice(0, 5), confirm: true, previewToken: partial.data.previewToken }, { teacher: true });
  assert.equal(blocked.status, 409);
  assert.equal(db.codes.get(misplaced[0]).cohort, 'Y11');
  const preview = await call(db, auditPath, 'POST', { roster, confirm: false }, { teacher: true });
  assert.equal(preview.status, 200);
  assert.equal(preview.data.ready, true);
  assert.equal(preview.data.activeCount, 6);
  assert.equal(preview.data.rosterCount, 6);
  assert.equal(preview.data.mismatches.length, 5);
  assert.equal(preview.data.matchedCount, 1);
  assert.equal(preview.data.registeredCounts.Y11, 5);
  assert.equal(preview.data.expectedCounts.Y13, 4);
  const wrongToken = await call(db, auditPath, 'POST', { roster, confirm: true, previewToken: 'old-preview' }, { teacher: true });
  assert.equal(wrongToken.status, 409);
  assert.equal(db.codes.get(misplaced[0]).cohort, 'Y11');
  const applied = await call(db, auditPath, 'POST', { roster, confirm: true, previewToken: preview.data.previewToken }, { teacher: true });
  assert.equal(applied.status, 200);
  assert.equal(applied.data.corrected, 5);
  assert.equal(applied.data.progressPreserved, true);
  assert.deepEqual([...db.logins.values()], initialProfiles, 'All account IDs, PIN hashes and failed attempt counters unchanged');
  assert.equal(db.attempts.get('old-score').score, 100);
  assert.equal(db.attempts.get('old-score').assignment_key, oldTask);
  assert.equal(db.sessions.size, 1, 'Current session is not removed');
  assert.equal((await call(db, '/v1/work', 'POST', {}, { bearer: session })).data.cohort, 'Y13');
  assert.equal((await call(db, '/v1/login', 'POST', { username: usernames[4], password: '1234' })).status, 200);
  const again = await call(db, auditPath, 'POST', { roster, confirm: false }, { teacher: true });
  assert.equal(again.data.mismatches.length, 0);
  assert.equal(again.data.matchedCount, 6);
});

test('whole-roster audit detects a year changed after preview and refuses stale confirmation', async () => {
  const db = new FakeD1();
  const [code] = (await call(db, '/v1/teacher/codes', 'POST', { cohort: 'Y11', count: 1 }, { teacher: true })).data.codes;
  await call(db, '/v1/teacher/logins', 'POST', { logins: [
    { username: 'imaginaryjay', code, password: '1234', expectedCohort: 'Y11' }
  ] }, { teacher: true });
  const roster = [{ username: 'imaginaryjay', cohort: 'Y13' }];
  const preview = await call(db, '/v1/teacher/audit-cohorts', 'POST', { roster, confirm: false }, { teacher: true });
  db.codes.get(code).cohort = 'Y12';
  const stale = await call(db, '/v1/teacher/audit-cohorts', 'POST', { roster, confirm: true, previewToken: preview.data.previewToken }, { teacher: true });
  assert.equal(stale.status, 409);
  assert.equal(db.codes.get(code).cohort, 'Y12');
});

test('audit accepts a complete 63-login original roster and does not require practice codes or PINs', async () => {
  const db = new FakeD1();
  const codes = (await call(db, '/v1/teacher/codes', 'POST', { cohort: 'Y11', count: 63 }, { teacher: true })).data.codes;
  const roster = Array.from({ length: 63 }, (_, index) => ({
    username: 'fakeaccount' + String(index + 1).padStart(2, '0'),
    cohort: index < 4 ? 'Y13' : 'Y11'
  }));
  for (let index = 0; index < 63; index += 5) {
    const rows = roster.slice(index, index + 5).map((entry, offset) => ({
      username: entry.username, code: codes[index + offset], password: '1234', expectedCohort: 'Y11'
    }));
    const result = await call(db, '/v1/teacher/logins', 'POST', { logins: rows }, { teacher: true });
    assert.equal(result.status, 201);
  }
  const audit = await call(db, '/v1/teacher/audit-cohorts', 'POST', { roster, confirm: false }, { teacher: true });
  assert.equal(audit.status, 200);
  assert.equal(audit.data.ready, true);
  assert.equal(audit.data.activeCount, 63);
  assert.equal(audit.data.matchedCount, 59);
  assert.equal(audit.data.mismatches.length, 4);
  assert.equal(audit.data.missing.length, 0);
  assert.equal(audit.data.unlistedActive, 0);
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
  const notTeacher = await call(db, '/v1/teacher/logins', 'POST', { logins: [{ username: 'Y12-04', code, password: privatePassword, expectedCohort: 'Y12' }] });
  assert.equal(notTeacher.status, 401);
  const added = await call(db, '/v1/teacher/logins', 'POST', { logins: [{ username: 'Y12-04', code, password: privatePassword, expectedCohort: 'Y12' }] }, { teacher: true });
  assert.equal(added.status, 201);
  assert.deepEqual(added.data.results, [{ username: 'y12-04', status: 'created' }]);
  assert.equal([...db.logins.values()][0].password_hash.includes(privatePassword), false);
  const retry = await call(db, '/v1/teacher/logins', 'POST', { logins: [{ username: 'Y12-04', code, password: privatePassword, expectedCohort: 'Y12' }] }, { teacher: true });
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
  await call(db, '/v1/teacher/logins', 'POST', { logins: [{ username: 'Y11-01', code, password: '1436', expectedCohort: 'Y11' }] }, { teacher: true });
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
    { username: 'pilotbird', code: codes[0], password: '1234', expectedCohort: 'Y10' },
    { username: 'pilotfox', code: codes[1], password: '5678', expectedCohort: 'Y10' }
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
      { username: 'testbird', code: codes[0], password: '1234', expectedCohort: 'Y10' },
      { username: 'testfox', code: codes[1], password: '5678', expectedCohort: 'Y10' }
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
      { username: 'testbird', code: codes[0], password: '1234', expectedCohort: 'Y10' },
      { username: 'testfox', code: codes[1], password: '5678', expectedCohort: 'Y10' }
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
      { username: 'quizbird', code: codes[0], password: '1234', expectedCohort: 'Y12' },
      { username: 'quizfox', code: codes[1], password: '5678', expectedCohort: 'Y12' }
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
    assert.equal((await call(db, '/v1/questions', 'POST', { ...question, assignmentKey: '12|h446-practice-141-b|' }, { bearer: session })).status, 403,
      'Another valid topic is still forbidden unless it was assigned');
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

test('teacher-only pilot report retains checked scores after assignment expiry without altering data', async () => {
  const db = new FakeD1();
  const username = 'pilotbird';
  const username_key = [...new Uint8Array(await crypto.subtle.digest(
    'SHA-256', new TextEncoder().encode('rhs-my-work-login:v1:' + username)
  ))].map(x => x.toString(16).padStart(2, '0')).join('');
  const code = 'P-BCDFGHJKM2';
  const key = '12|h446-practice-141-a|';
  db.codes.set(code, { code, cohort: 'Y12', enabled: 1 });
  db.logins.set(username_key, { username_key, code });
  db.assignments.set(key, { assignment_key: key, cohort: 'Y12', item_id: 'h446-practice-141-a', active: 0 });
  db.workSets.set('pilot-20261119-Y12', { id: 'pilot-20261119-Y12', cohort: 'Y12', active: 0 });
  db.workSetItems.push({ work_set_id: 'pilot-20261119-Y12', assignment_key: key });
  db.attempts.set('first', { attempt_id: 'first', code, assignment_key: key, level: 'q-quiz', score: 100, created_at: '2026-11-19 10:00:00' });
  db.attempts.set('second', { attempt_id: 'second', code, assignment_key: key, level: 'q-quiz', score: 0, created_at: '2026-11-19 10:01:00' });
  db.attempts.set('older', { attempt_id: 'older', code, assignment_key: key, level: 'q-quiz', score: 100, created_at: '2026-11-18 10:00:00' });
  const roster = [{ username, cohort: 'Y12' }, { username: 'missingbird', cohort: 'Y13' }];
  const blocked = await call(db, '/v1/teacher/pilot-results', 'POST', { roster });
  assert.equal(blocked.status, 401, 'Teacher token is required');
  const report = await call(db, '/v1/teacher/pilot-results', 'POST', { roster }, { teacher: true });
  assert.equal(report.status, 200);
  assert.equal(report.data.pilotDate, '2026-11-19');
  assert.equal(report.data.accounts.length, 2);
  assert.deepEqual(report.data.accounts[0].work.map(w => ({
    item: w.itemId, attempted: w.questionsAttempted, correct: w.firstTryCorrect
  })), [{ item: 'h446-practice-141-a', attempted: 2, correct: 1 }]);
  assert.equal(report.data.accounts[1].registeredCohort, null, 'Unknown usernames remain visible but unscored');
  assert.equal(JSON.stringify(report.data).includes(code), false, 'Practice codes never leave the Worker');
  assert.equal(db.attempts.size, 3, 'Report did not change attempts');
  assert.equal(db.workSets.get('pilot-20261119-Y12').active, 0, 'Report did not reactivate expired work');
  const invalid = await call(db, '/v1/teacher/pilot-results', 'POST', {
    roster: [{ username, cohort: 'Y12', password: '1234' }]
  }, { teacher: true });
  assert.equal(invalid.status, 400, 'Roster cannot carry credentials');
});

test('every assigned J277 and H446 revision MCQ saves first-checked answers without requiring ten', async () => {
  const RealDate = globalThis.Date;
  const when = new RealDate('2026-11-19T10:00:00Z');
  globalThis.Date = class extends RealDate {
    constructor(...args) { super(...(args.length ? args : [when.valueOf()])); }
    static now() { return when.valueOf(); }
  };
  try {
    const health = await call(new FakeD1(), '/v1/health');
    assert.equal(health.data.mcqQuestionTracking, 'v1', 'The frontend only enables reporting after this capability is advertised');
    for (const { cohort, username, itemId, unassignedId } of [
      { cohort: 'Y10', username: 'j277bird', itemId: 'j277-practice-11-components', unassignedId: 'j277-practice-11-registers' },
      { cohort: 'Y12', username: 'h446bird', itemId: 'h446-practice-11-components', unassignedId: 'h446-practice-11-buses' }
    ]) {
      const db = new FakeD1();
      const [code] = (await call(db, '/v1/teacher/codes', 'POST', { cohort, count: 1 }, { teacher: true })).data.codes;
      assert.equal((await call(db, '/v1/teacher/logins', 'POST', { logins: [
        { username, code, password: '1234', expectedCohort: cohort }
      ] }, { teacher: true })).status, 201);
      const set = await call(db, '/v1/teacher/work-sets', 'POST', {
        cohort, scope: 'cohort', title: 'MCQ recording check', kind: 'classwork',
        items: [{ itemId, level: '' }]
      }, { teacher: true });
      assert.equal(set.status, 201, JSON.stringify(set.data));
      const session = (await call(db, '/v1/login', 'POST', { username, password: '1234' })).data.session;
      const year = cohort.slice(1);
      const key = `${year}|${itemId}|`;
      const firstId = crypto.randomUUID();
      const first = await call(db, '/v1/questions', 'POST', {
        assignmentKey: key, attemptId: firstId, level: 'quiz', firstTryCorrect: true
      }, { bearer: session });
      assert.equal(first.status, 200, JSON.stringify(first.data));
      assert.equal(first.data.saved, true);
      const afterOne = (await call(db, '/v1/work', 'POST', {}, { bearer: session })).data.work[0];
      assert.equal(afterOne.questionsAttempted, 1, 'A single first check must count');
      assert.equal(afterOne.firstTryCorrect, 1);
      assert.equal(afterOne.attempts, 0, 'One question is not a completed quiz');
      const duplicate = await call(db, '/v1/questions', 'POST', {
        assignmentKey: key, attemptId: firstId, level: 'quiz', firstTryCorrect: true
      }, { bearer: session });
      assert.equal(duplicate.data.duplicate, true);
      const notAssigned = await call(db, '/v1/questions', 'POST', {
        assignmentKey: `${year}|${unassignedId}|`, attemptId: crypto.randomUUID(),
        level: 'quiz', firstTryCorrect: true
      }, { bearer: session });
      assert.equal(notAssigned.status, 403, 'Only assigned MCQ topics can send scores');
      const wrongYear = await call(db, '/v1/questions', 'POST', {
        assignmentKey: `13|${itemId}|`, attemptId: crypto.randomUUID(),
        level: 'quiz', firstTryCorrect: true
      }, { bearer: session });
      assert.notEqual(wrongYear.status, 200, 'Year group mismatches remain blocked');
      for (let i = 1; i < 10; i++) {
        const next = await call(db, '/v1/questions', 'POST', {
          assignmentKey: key, attemptId: crypto.randomUUID(),
          level: 'quiz', firstTryCorrect: i % 2 === 0
        }, { bearer: session });
        assert.equal(next.status, 200, `Question ${i + 1}: ${JSON.stringify(next.data)}`);
      }
      const completed = await call(db, '/v1/attempts', 'POST', {
        assignmentKey: key, attemptId: crypto.randomUUID(), score: 60, level: '', source: 'practice'
      }, { bearer: session });
      assert.equal(completed.status, 200, 'Ten question rows must not consume the completed-quiz rate limit');
      const all = (await call(db, '/v1/work', 'POST', {}, { bearer: session })).data.work[0];
      assert.equal(all.questionsAttempted, 10);
      assert.equal(all.firstTryCorrect, 5);
      assert.equal(all.attempts, 1);
      assert.equal(all.bestScore, 60);
      assert.equal(db.attempts.size, 11, 'Ten distinct first checks plus one completed round');
    }
  } finally { globalThis.Date = RealDate; }
});



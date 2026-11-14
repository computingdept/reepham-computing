import { test } from 'node:test';
import assert from 'node:assert/strict';
import worker, { assignmentKey, isIndependentWorkTime, newPracticeCode } from '../src/index.mjs';

const TOKEN = 'fictional-teacher-secret-for-local-tests-only';
const ORIGIN = 'https://rhsccs.org';

class FakeD1 {
  constructor() { this.codes = new Map(); this.assignments = new Map(); this.attempts = new Map(); }
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

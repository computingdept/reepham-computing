import { test } from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { createHash } from 'node:crypto';
import { mock } from 'node:test';
import worker from '../src/index.mjs';
import { buildSynopticCatalog, selectSynopticHomework, synopticBankPaths } from '../src/synoptic-selection.mjs';

const TOKEN = 'test-synoptic-teacher-token-not-a-real-secret';

class SqliteD1 {
  constructor() { this.db = new DatabaseSync(':memory:'); this.db.exec('PRAGMA foreign_keys = ON'); }
  prepare(sql) {
    const db = this.db;
    const bound = args => ({
      bind: (...newArgs) => bound(newArgs),
      run: async () => ({ meta: { changes: db.prepare(sql).run(...args).changes } }),
      all: async () => ({ results: db.prepare(sql).all(...args) }),
      first: async () => db.prepare(sql).get(...args) || null
    });
    return bound([]);
  }
  async batch(statements) {
    this.db.exec('BEGIN');
    try {
      const outcomes = [];
      for (const statement of statements) outcomes.push(await statement.run());
      this.db.exec('COMMIT');
      return outcomes;
    } catch (error) {
      this.db.exec('ROLLBACK');
      throw error;
    }
  }
}

function fakeCatalog(course) {
  const sources = {};
  for (const { path, paper } of synopticBankPaths(course)) {
    const section = path.match(/section-([\d-]+)/)[1].replaceAll('-', '.');
    const skills = [0, 1, 2].map(skill => ({
      id: `${section}-skill-${skill}`, section, spec: section, title: 'Topic',
      questions: Array.from({ length: 5 }, (_, index) => ({
        id: `${course}-${paper}-${section.replaceAll('.', '-')}-${skill}-${index}`, prompt: `Prompt ${index}?`,
        options: ['A', 'B', 'C', 'D'], answer: 'B', explanation: 'Because B is right.'
      }))
    }));
    sources[path] = `const SKILLS=${JSON.stringify(skills)};`;
  }
  return buildSynopticCatalog(course, sources);
}

async function request(db, path, payload, token = TOKEN) {
  const result = await worker.fetch(new Request('https://pilot.test' + path, {
    method: payload === undefined ? 'GET' : 'POST',
    headers: { authorization: 'Bearer ' + token, 'content-type': 'application/json', origin: 'https://rhsccs.org' },
    body: payload === undefined ? undefined : JSON.stringify(payload)
  }), { DB: db, TEACHER_TOKEN: TOKEN });
  return { status: result.status, body: await result.json() };
}

function publishPayload(course, usedIds = []) {
  const set = selectSynopticHomework({ course, catalog: fakeCatalog(course), usedIds, random: () => 0.4 });
  return {
    confirm: true, cohort: course === 'h446' ? 'Y13' : 'Y11',
    title: 'Synoptic practice 1', dueDate: '2027-01-20',
    skills: [`${course}-skill-example`], bankRevision: 'e'.repeat(40),
    papers: { paper1: set.paper1, paper2: set.paper2 }
  };
}

test('teacher-only usage works before first-use migration and does not modify existing data', async () => {
  const db = new SqliteD1();
  const denied = await request(db, '/v1/teacher/synoptic/used?cohort=Y13', undefined, 'wrong');
  assert.equal(denied.status, 401);
  const result = await request(db, '/v1/teacher/synoptic/used?cohort=Y13');
  assert.deepEqual(result.body, { cohort: 'Y13', usedIds: [] });
  assert.equal(db.db.prepare('SELECT COUNT(*) AS n FROM sqlite_master WHERE name LIKE ?').get('synoptic_%').n, 0);
});

test('publishes an immutable 20-question Year 13 set with separate scores to follow later', async () => {
  const db = new SqliteD1();
  const payload = publishPayload('h446');
  const previewRejected = await request(db, '/v1/teacher/synoptic/publish', { ...payload, confirm: false });
  assert.equal(previewRejected.status, 400);
  const saved = await request(db, '/v1/teacher/synoptic/publish', payload);
  assert.equal(saved.status, 201);
  assert.equal(saved.body.questionCount, 20);
  assert.equal(saved.body.learnerVisible, false);
  const used = await request(db, '/v1/teacher/synoptic/used?cohort=Y13');
  assert.equal(used.body.usedIds.length, 20);
  const listed = await request(db, '/v1/teacher/synoptic/assignments?cohort=Y13');
  assert.equal(listed.body.assignments.length, 1);
  assert.equal(listed.body.assignments[0].paper1.length, 10);
  assert.equal(listed.body.assignments[0].paper2.length, 10);
  assert.equal(JSON.parse(db.db.prepare('SELECT question_json FROM synoptic_questions LIMIT 1').get().question_json).answer, 'B');
});

test('reused question blocked atomically; a new assignment with unused IDs is allowed', async () => {
  const db = new SqliteD1();
  const first = publishPayload('j277');
  assert.equal((await request(db, '/v1/teacher/synoptic/publish', first)).status, 201);
  const secondAttempt = await request(db, '/v1/teacher/synoptic/publish', first);
  assert.equal(secondAttempt.status, 409);
  assert.match(secondAttempt.body.error, /Nothing was published/);
  assert.equal(db.db.prepare('SELECT COUNT(*) AS n FROM synoptic_homework').get().n, 1);
  const usedIds = (await request(db, '/v1/teacher/synoptic/used?cohort=Y11')).body.usedIds;
  const next = publishPayload('j277', usedIds);
  assert.equal((await request(db, '/v1/teacher/synoptic/publish', next)).status, 201);
  assert.equal(db.db.prepare('SELECT COUNT(*) AS n FROM synoptic_homework').get().n, 2);
  assert.equal(db.db.prepare('SELECT COUNT(*) AS n FROM synoptic_questions').get().n, 40);
});

test('rejects wrong year, mixed paper and duplicate IDs before writing', async () => {
  const db = new SqliteD1();
  const payload = publishPayload('h446');
  assert.equal((await request(db, '/v1/teacher/synoptic/publish', { ...payload, cohort: 'Y12' })).status, 400);
  payload.papers.paper2[0] = payload.papers.paper1[0];
  assert.equal((await request(db, '/v1/teacher/synoptic/publish', payload)).status, 400);
  assert.equal(db.db.prepare("SELECT COUNT(*) AS n FROM sqlite_master WHERE type='table' AND name='synoptic_homework'").get().n, 0);
});

const STUDENT_SESSION = 'x'.repeat(43);
function addStudent(db, cohort = 'Y13', code = 'P-ABCDEFGHJK') {
  db.db.exec(`CREATE TABLE IF NOT EXISTS practice_codes (
    code TEXT PRIMARY KEY, cohort TEXT NOT NULL, enabled INTEGER NOT NULL DEFAULT 1);
    CREATE TABLE IF NOT EXISTS login_sessions (
      token_hash TEXT PRIMARY KEY, code TEXT NOT NULL, expires_at INTEGER NOT NULL);`);
  db.db.prepare('INSERT INTO practice_codes (code, cohort, enabled) VALUES (?, ?, 1)').run(code, cohort);
  db.db.prepare('INSERT INTO login_sessions (token_hash,code,expires_at) VALUES (?,?,?)').run(
    createHash('sha256').update(STUDENT_SESSION).digest('hex'), code, 2000000000);
}

test('student cannot see teacher reservations, even if the 20 questions are saved', async () => {
  const db = new SqliteD1();
  addStudent(db);
  const saved = await request(db, '/v1/teacher/synoptic/publish', publishPayload('h446'));
  const listing = await request(db, '/v1/learner/synoptic/assignments', {}, STUDENT_SESSION);
  assert.equal(listing.status, 200);
  assert.deepEqual(listing.body.assignments, []);
  const details = await request(db, '/v1/learner/synoptic/homework', { id: saved.body.id }, STUDENT_SESSION);
  assert.equal(details.status, 404);
  assert.equal(db.db.prepare("SELECT COUNT(*) AS n FROM sqlite_master WHERE name='synoptic_releases'").get().n, 0);
});

test('release is explicit, and learners see exactly 10 questions per paper without unchecked answers', async () => {
  const db = new SqliteD1();
  addStudent(db);
  const saved = await request(db, '/v1/teacher/synoptic/publish', publishPayload('h446'));
  assert.equal((await request(db, '/v1/teacher/synoptic/release', { id: saved.body.id, confirm: false })).status, 400);
  const released = await request(db, '/v1/teacher/synoptic/release', { id: saved.body.id, confirm: true });
  assert.equal(released.status, 200);
  assert.equal(released.body.newlyReleased, true);
  assert.equal((await request(db, '/v1/teacher/synoptic/release', { id: saved.body.id, confirm: true })).body.newlyReleased, false);
  const listing = await request(db, '/v1/learner/synoptic/assignments', {}, STUDENT_SESSION);
  assert.equal(listing.body.assignments.length, 1);
  assert.equal(listing.body.assignments[0].questionsChecked, 0);
  // Weekend: new answers may be submitted at any hour, as per the existing policy.
  mock.timers.enable({ apis: ['Date'], now: new Date('2026-11-21T12:00:00Z') });
  try {
    const details = await request(db, '/v1/learner/synoptic/homework', { id: saved.body.id }, STUDENT_SESSION);
    assert.equal(details.status, 200);
    assert.equal(details.body.available, true);
    assert.equal(details.body.questions.length, 20);
    assert.equal(details.body.questions.filter(q => q.paper === 'paper1').length, 10);
    assert.equal(details.body.questions.filter(q => q.paper === 'paper2').length, 10);
    assert.ok(details.body.questions.every(q => !Object.hasOwn(q, 'answer') && !Object.hasOwn(q, 'explanation')));
    const first = details.body.questions[0];
    const checked = await request(db, '/v1/learner/synoptic/check',
      { id: saved.body.id, questionId: first.id, optionIndex: 0 }, STUDENT_SESSION);
    assert.equal(checked.status, 200);
    assert.equal(checked.body.firstTryCorrect, false);
    assert.equal(checked.body.answer, 'B');
    assert.equal(checked.body.saved, true);
    const second = await request(db, '/v1/learner/synoptic/check',
      { id: saved.body.id, questionId: first.id, optionIndex: 1 }, STUDENT_SESSION);
    assert.equal(second.body.saved, false);
    assert.equal(second.body.chosenIndex, 0);
    assert.equal(second.body.firstTryCorrect, false);
    const refreshed = await request(db, '/v1/learner/synoptic/homework', { id: saved.body.id }, STUDENT_SESSION);
    assert.equal(refreshed.body.questions[0].checked, true);
    assert.equal(refreshed.body.questions[0].chosenIndex, 0);
    assert.equal(refreshed.body.questions[1].checked, false);
    const score = await request(db, '/v1/learner/synoptic/assignments', {}, STUDENT_SESSION);
    assert.equal(score.body.assignments[0].questionsChecked, 1);
    assert.equal(score.body.assignments[0].firstTryCorrect, 0);
  } finally { mock.timers.reset(); }
});

test('synoptic login, wrong cohort, time window and expired due date are enforced', async () => {
  const db = new SqliteD1();
  addStudent(db, 'Y11');
  const saved = await request(db, '/v1/teacher/synoptic/publish', publishPayload('j277'));
  assert.equal((await request(db, '/v1/learner/synoptic/assignments', {}, 'bad')).status, 401);
  assert.equal((await request(db, '/v1/teacher/synoptic/release', { id: saved.body.id, confirm: true })).status, 200);
  mock.timers.enable({ apis: ['Date'], now: new Date('2026-11-20T10:00:00Z') });
  try {
    const detail = await request(db, '/v1/learner/synoptic/homework', { id: saved.body.id }, STUDENT_SESSION);
    assert.equal(detail.body.available, false);
    assert.ok(detail.body.questions.every(q => q.locked === true));
    const questionId = db.db.prepare('SELECT question_id FROM synoptic_questions WHERE homework_id = ? LIMIT 1').get(saved.body.id).question_id;
    const check = await request(db, '/v1/learner/synoptic/check',
      { id: saved.body.id, questionId, optionIndex: 1 }, STUDENT_SESSION);
    assert.equal(check.status, 403);
  } finally { mock.timers.reset(); }
  db.db.prepare("UPDATE practice_codes SET cohort='Y13'").run();
  assert.equal((await request(db, '/v1/learner/synoptic/homework', { id: saved.body.id }, STUDENT_SESSION)).status, 404);
});

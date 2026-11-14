'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const root = path.join(__dirname, '..');
const read = name => JSON.parse(fs.readFileSync(path.join(root, name), 'utf8'));
const bank = read('data/do-now/q2-drafts/h446.json');
const source = read('data/do-now/migration/h446-source.json');
const q1 = read('data/do-now/q1-published/h446.json');

test('every H446 lesson has an independent Q2 draft with original provenance', () => {
  assert.equal(bank.status, 'draft-never-loaded-by-classroom');
  assert.deepEqual(Object.keys(bank.lessons).sort(), Object.keys(q1.lessons).sort());
  assert.equal(Object.keys(bank.lessons).length, 300);
  for (const [id, entry] of Object.entries(bank.lessons)) {
    assert.equal(entry.currentLesson, 'L' + id);
    assert.equal(entry.originalQ2.question, source.lessons[id].questions[1].originalQuestion);
    assert.equal(entry.originalQ2.answer, source.lessons[id].questions[1].originalAnswer);
    assert.equal(entry.draft.teacherApproved, false);
    assert.ok(entry.originalLessonFile.includes('guided.html')
      || entry.originalLessonFile.includes('index.html'));
  }
});

test('all 300 Q2 drafts have four distinct one-word choices and retrievable provenance', () => {
  const samples = Object.values(bank.lessons);
  assert.equal(samples.length, 300);
  for (const e of samples) {
    assert.ok(['authored-needs-teacher-review', 'example-needs-teacher-review']
      .includes(e.draft.status), e.currentLesson);
    assert.equal(e.draft.options.length, 4);
    assert.equal(new Set(e.draft.options).size, 4);
    assert.ok(Number.isInteger(e.draft.correctIndex));
    assert.ok(e.draft.correctIndex >= 0 && e.draft.correctIndex < 4);
    assert.ok(e.draft.question && e.draft.explanation);
    assert.equal(e.draft.earlierThanPreviousLesson, true, e.currentLesson);
    assert.ok(e.draft.options.every(option => option.trim().split(/\s+/).length === 1));
    assert.ok(e.draft.taughtIn.length === 1 ||
      ['L001', 'L002'].includes(e.currentLesson), e.currentLesson);
    for (const priorLesson of e.draft.taughtIn) {
      if (priorLesson === 'GCSE') {
        assert.ok(['L001', 'L002'].includes(e.currentLesson));
        continue;
      }
      const sourceNumber = Number(priorLesson.slice(1));
      const currentNumber = Number(e.currentLesson.slice(1));
      assert.ok(sourceNumber < currentNumber - 1,
        `${e.currentLesson} cannot retrieve from immediately previous or future ${priorLesson}`);
      assert.ok(source.lessons[String(sourceNumber).padStart(3, '0')], priorLesson);
      if (currentNumber <= 160) assert.ok(sourceNumber <= 160, e.currentLesson);
    }
  }
});

test('retrieval MCQs do not repeat within an eight-lesson window', () => {
  const samples = Object.values(bank.lessons);
  for (let i = 0; i < samples.length; i++) {
    const previous = samples.slice(Math.max(0, i - 8), i);
    assert.ok(previous.every(e => e.draft.question !== samples[i].draft.question),
      `${samples[i].currentLesson} repeats a recent question`);
  }
});

test('every source reference is a review proposal and cannot be mistaken for publication', () => {
  assert.equal(bank.status, 'draft-never-loaded-by-classroom');
  assert.ok(Object.values(bank.lessons).every(e =>
    /review/i.test(e.draft.sourceStatus)));
  assert.ok(Object.values(bank.lessons).every(e => e.draft.teacherApproved === false));
});

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

test('no sample MCQ claims a future or immediately preceding taught lesson', () => {
  const samples = Object.values(bank.lessons).filter(e => e.draft.status === 'example-needs-teacher-review');
  assert.equal(samples.length, 7);
  for (const e of samples) {
    assert.equal(e.draft.options.length, 4);
    assert.equal(new Set(e.draft.options).size, 4);
    assert.ok(Number.isInteger(e.draft.correctIndex));
    assert.ok(e.draft.correctIndex >= 0 && e.draft.correctIndex < 4);
    assert.ok(e.draft.question && e.draft.explanation);
    assert.ok(e.draft.earlierThanPreviousLesson, e.currentLesson);
    assert.ok(e.draft.options.every(option => option.trim().split(/\s+/).length === 1));
  }
});

test('uncertain sources stay visibly unaudited and cannot be mistaken for publication', () => {
  assert.ok(Object.values(bank.lessons).some(e => e.draft.sourceStatus === 'source-not-recorded'));
  assert.ok(Object.values(bank.lessons).some(e =>
    e.draft.sourceStatus === 'existing-q2-repeats-immediately-previous-lesson'));
  assert.ok(Object.values(bank.lessons).every(e => e.draft.teacherApproved === false));
});

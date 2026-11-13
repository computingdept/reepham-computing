const test = require('node:test');
const assert = require('node:assert/strict');
const { makeQuestion, checkAnswer, parseAssignments } = require('./variables.js');

test('every level generates ten usable questions across random seeds', () => {
  for (const seed of [1, 42, 20261113, 90001]) {
    for (const level of ['easy', 'medium', 'hard']) {
      for (let i = 0; i < 10; i++) {
        const q = makeQuestion(level, i, seed);
        assert.ok(q.prompt && q.hint && q.model && q.explanation);
        assert.equal(q.level, level);
        if (level === 'easy') {
          const response = q.type === 'identify' ? q.expected : q.expected;
          assert.equal(checkAnswer(q, response).correct, true);
        }
        if (level === 'medium') assert.equal(checkAnswer(q, String(q.expected)).correct, true);
        if (level === 'hard') assert.equal(checkAnswer(q, q.model).correct, true, `${i}: ${q.model}`);
      }
    }
  }
});

test('easy interactions distinguish constants and changed values', () => {
  const question = makeQuestion('easy', 3, 42);
  assert.equal(question.type, 'identify');
  assert.equal(checkAnswer(question, '').complete, false);
  assert.equal(checkAnswer(question, question.expected).correct, true);
  assert.equal(checkAnswer(question, question.options.find(v => v !== question.expected)).correct, false);
  const numeric = makeQuestion('easy', 0, 42);
  assert.equal(checkAnswer(numeric, numeric.expected + 1).correct, false);
});

test('medium tracing accepts signed whole numbers but rejects invalid text', () => {
  const q = makeQuestion('medium', 0, 42);
  assert.equal(checkAnswer(q, '  ' + q.expected + '  ').correct, true);
  assert.equal(checkAnswer(q, '').complete, false);
  assert.equal(checkAnswer(q, q.expected + '.0').correct, false);
});

test('hard marking accepts student-chosen names and OCR assignment symbols', () => {
  const q = makeQuestion('hard', 0, 42);
  assert.equal(checkAnswer(q, `dragon ← ${q.start}\ndragon := dragon + ${q.amount}`).correct, true);
  assert.equal(checkAnswer(q, `HP = ${q.start}\nHP = ${q.amount} + HP`).correct, true);
  assert.equal(checkAnswer(q, `HP = ${q.start}\nHP = HP + ${q.amount + 1}`).correct, false);
  assert.equal(checkAnswer(q, `HP = ${q.start}\nHP = ${q.start + q.amount}`).correct, false);
});

test('hard checking insists on the intended use of constants and copies', () => {
  const constant = makeQuestion('hard', 4, 42);
  assert.equal(checkAnswer(constant,
    `constant BONUS = ${constant.bonus}\nhealth = ${constant.start}\nhealth = BONUS + health`).correct, true);
  assert.equal(checkAnswer(constant,
    `BONUS = ${constant.bonus}\nhealth = ${constant.start}\nhealth = health + ${constant.bonus}`).correct, false);
  const copy = makeQuestion('hard', 5, 42);
  assert.equal(checkAnswer(copy,
    `a = ${copy.start}\nb = a\nb = b + ${copy.amount}`).correct, true);
  assert.equal(checkAnswer(copy,
    `a = ${copy.start}\nb = a\na = a + ${copy.amount}`).correct, false);
});

test('the ERL interpreter is assignment-only, without execution of arbitrary code', () => {
  assert.equal(parseAssignments('score = 3\nscore = score + 2').at(-1).value, 5);
  assert.equal(parseAssignments('score = nope'), null);
  assert.equal(parseAssignments('print(5)'), null);
  assert.equal(parseAssignments('score = globalThis.alert(1)'), null);
  assert.equal(parseAssignments('score = 1\nscore = score * 2'), null);
});

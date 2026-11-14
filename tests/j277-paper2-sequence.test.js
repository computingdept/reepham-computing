/* Run with: node --test tests/j277-paper2-sequence.test.js */
const { test } = require('node:test');
const assert = require('node:assert/strict');
const engine = require('../exercise/paper2/sequence.js');

test('all 30 sequence questions are repeatable and model answers are correct', () => {
  for (const seed of [1, 79, 20261114]) {
    for (const level of ['easy', 'medium', 'hard']) {
      for (let index = 0; index < 10; index++) {
        const q = engine.makeQuestion(level, index, seed);
        assert.deepEqual(q, engine.makeQuestion(level, index, seed));
        const answer = level === 'easy' ? q.expected : level === 'medium' ? String(q.output) : q.model;
        assert.equal(engine.checkAnswer(q, answer).correct, true, `${level} ${index} seed ${seed}`);
      }
    }
  }
});

test('easy starts scrambled and only the correct complete order earns a point', () => {
  for (let index = 0; index < 10; index++) {
    const q = engine.makeQuestion('easy', index, 21);
    assert.deepEqual(q.scrambled.map(step => step.id).sort(), [0, 1, 2]);
    assert.notDeepEqual(q.scrambled.map(step => step.id), [0, 1, 2]);
    assert.deepEqual(engine.checkAnswer(q, [0, 1]), { complete: false, correct: false });
    assert.deepEqual(engine.checkAnswer(q, [1, 0, 2]), { complete: true, correct: false });
  }
});

test('medium requires correct printed value', () => {
  const q = engine.makeQuestion('medium', 3, 42);
  assert.equal(engine.checkAnswer(q, '').complete, false);
  assert.equal(engine.checkAnswer(q, String(q.output + 1)).correct, false);
  assert.equal(engine.checkAnswer(q, String(q.output)).correct, true);
});

test('hard accepts alternate variable names, assignment arrows and casts', () => {
  for (let index = 0; index < 10; index++) {
    const q = engine.makeQuestion('hard', index, 77);
    const renamed = q.model.replace(/\bnumber\b|\btotal\b|\banswer\b|\bvalue\b|\bleft\b|\bx\b|\by\b|\bscore\b|\bage\b|\bnextAge\b|\bn\b|\btriple\b|\bresult\b|\bstart\b|\bendValue\b|\bnewValue\b/g,
      match => 'pupil_' + match);
    assert.equal(engine.checkAnswer(q, renamed).correct, true, `renamed model ${index}`);
    assert.equal(engine.checkAnswer(q, renamed.replaceAll(' = ', ' ← ')).correct, true, `assignment arrow ${index}`);
    assert.equal(engine.checkAnswer(q, q.model.replace(/= input\(([^)]*)\)/, '= int(input($1))')).correct, true, `int(input()) ${index}`);
  }
});

test('hard checks more than one input and rejects missing code', () => {
  const q = engine.makeQuestion('hard', 0, 1);
  assert.equal(engine.checkAnswer(q, '').complete, false);
  assert.equal(engine.checkAnswer(q, 'answer = 14\nanswer = answer + 1\nprint(answer)').correct, false);
  assert.equal(engine.checkAnswer(q, 'n = input("Number")\nanswer = n + 12\nprint(answer)').correct, false);
  assert.equal(engine.checkAnswer(q, 'n = input("Number")\nprint(n)').correct, false);
  assert.equal(engine.evaluateProgram('n = int(input("Number"))\nanswer = n + 3\nprint(answer)', 5), 8);
});

test('invalid levels and indexes fail', () => {
  assert.throws(() => engine.makeQuestion('unknown', 1, 1));
  assert.throws(() => engine.makeQuestion('easy', -1, 1));
});

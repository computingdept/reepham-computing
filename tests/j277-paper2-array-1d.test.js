/* Run: node --test tests/j277-paper2-array-1d.test.js */
const {test} = require('node:test');
const assert = require('node:assert/strict');
const engine = require('../exercise/paper2/array-1d.js');

test('all 30 array tasks generate deterministically and accept their model answers', () => {
  for (const seed of [1, 17, 20261114, 98765]) {
    for (const level of ['easy', 'medium', 'hard']) {
      for (let i = 0; i < 10; i++) {
        const q = engine.makeQuestion(level, i, seed);
        assert.deepEqual(q, engine.makeQuestion(level, i, seed));
        const answer = q.type === 'write' ? q.model : q.expected;
        assert.equal(engine.checkAnswer(q, String(answer)).correct, true, `${seed}/${level}/${i}`);
        assert.equal(q.values.length, 5);
        assert.match(q.code[0], /^array scores = \[/);
        assert.equal(q.values.every(Number.isInteger), true);
      }
    }
  }
});

test('Easy uses zero-based indices with a single unambiguous tap target', () => {
  for (let i = 0; i < 10; i++) {
    const q = engine.makeQuestion('easy', i, 33);
    assert.equal(q.type, 'cell');
    assert.equal(new Set(q.values).size, 5, 'values must be unique for value-based prompts');
    assert.ok(Number(q.expected) >= 0 && Number(q.expected) < 5);
    assert.equal(engine.checkAnswer(q, String((Number(q.expected) + 1) % 5)).correct, false);
    assert.match(q.explanation, /index \d+/i);
  }
});

test('Medium traces assignments, swaps, indirect indexing and both loop patterns', () => {
  for (let i = 0; i < 10; i++) {
    const q = engine.makeQuestion('medium', i, 72);
    assert.equal(q.type, 'number');
    assert.match(q.code[q.code.length - 1], /^print\(/);
    assert.equal(engine.checkAnswer(q, String(q.expected + 1)).correct, false);
    assert.match(q.explanation, /Output:/);
  }
  const all = engine.makeQuestion('medium', 6, 72);
  const everyOther = engine.makeQuestion('medium', 9, 72);
  assert.ok(all.code.includes('for i = 0 to 4'));
  assert.ok(everyOther.code.includes('for i = 0 to 4 step 2'));
  assert.equal(all.expected, all.values.reduce((sum, n) => sum + n, 0));
  assert.equal(everyOther.expected, everyOther.values[0] + everyOther.values[2] + everyOther.values[4]);
});

test('Hard accepts whitespace, capitals, assignment arrows and commutative sums', () => {
  for (let i = 0; i < 10; i++) {
    const q = engine.makeQuestion('hard', i, 7);
    assert.equal(q.type, 'write');
    assert.equal(engine.checkAnswer(q, q.model.toUpperCase()).correct, true);
    assert.equal(engine.checkAnswer(q, q.model.replace(/ = /g, ' ← ')).correct, true);
    assert.equal(engine.checkAnswer(q, 'scores[99] = 0').correct, false);
  }
  const sum = engine.makeQuestion('hard', 7, 7);
  const match = sum.model.match(/total = (scores\[\d+\]) \+ (scores\[\d+\])/);
  assert.ok(match);
  assert.equal(engine.checkAnswer(sum, 'total = ' + match[2] + ' + ' + match[1]).correct, true);
});

test('Empty and invalid input are rejected safely', () => {
  const q = engine.makeQuestion('medium', 0, 1);
  assert.deepEqual(engine.checkAnswer(q, ''), {complete: false, correct: false});
  assert.deepEqual(engine.checkAnswer(q, 'not a number'), {complete: true, correct: false});
  assert.throws(() => engine.makeQuestion('invalid', 0, 1));
  assert.throws(() => engine.makeQuestion('easy', -1, 1));
  assert.throws(() => engine.makeQuestion('easy', 10, 1));
});

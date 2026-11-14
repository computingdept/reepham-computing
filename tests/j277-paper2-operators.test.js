/* Run with: node --test tests/j277-paper2-operators.test.js */
const { test } = require('node:test');
const assert = require('node:assert/strict');
const engine = require('../exercise/paper2/operators.js');

test('all 30 operators models are correct and repeatable for three seeds', () => {
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

test('easy expressions have exactly one matching operator', () => {
  for (let index = 0; index < 10; index++) {
    const q = engine.makeQuestion('easy', index, 314);
    const result = engine.calculate(q.a, q.b, q.expected);
    assert.equal(q.options.filter(op => engine.calculate(q.a, q.b, op) === result).length, 1);
    assert.deepEqual(engine.checkAnswer(q, ''), { complete: false, correct: false });
    assert.equal(engine.checkAnswer(q, q.options.find(op => op !== q.expected)).correct, false);
  }
});

test('DIV, MOD and real division have different meanings', () => {
  assert.equal(engine.calculate(17, 5, 'DIV'), 3);
  assert.equal(engine.calculate(17, 5, 'MOD'), 2);
  assert.equal(engine.calculate(17, 5, '/'), 3.4);
  assert.equal(engine.evaluateExpression('n DIV 4 + n MOD 4', { n: 19 }), 7);
  assert.equal(engine.evaluateExpression('5 + 3 * 2', {}), 11);
  assert.equal(engine.evaluateExpression('(5 + 3) * 2', {}), 16);
  assert.equal(engine.evaluateExpression('5 / 0', {}), null);
  assert.equal(engine.evaluateExpression('hello()', {}), null);
});

test('medium accepts exact numeric answer, including a half or quarter', () => {
  const q = engine.makeQuestion('medium', 2, 123);
  assert.ok(!Number.isInteger(q.output));
  assert.equal(engine.checkAnswer(q, String(q.output)).correct, true);
  assert.equal(engine.checkAnswer(q, '').complete, false);
  assert.equal(engine.checkAnswer(q, String(Math.trunc(q.output))).correct, false);
});

test('hard accepts other variable names, optional int(input) and assignment arrows', () => {
  for (let index = 0; index < 10; index++) {
    const q = engine.makeQuestion('hard', index, 41);
    const renamed = q.model.replace(/\b(?:n|a|b|answer)\b/g, name => 'student_' + name);
    assert.equal(engine.checkAnswer(q, renamed).correct, true, `renamed ${index}`);
    assert.equal(engine.checkAnswer(q, renamed.replaceAll(' = ', ' ← ')).correct, true, `arrow ${index}`);
    assert.equal(engine.checkAnswer(q, renamed.replace(/= input\(([^)]*)\)/g, '= int(input($1))')).correct, true, `cast input ${index}`);
  }
});

test('hard checks several different inputs and rejects missing or incorrect operations', () => {
  const mod = engine.makeQuestion('hard', 1, 11);
  assert.equal(engine.checkAnswer(mod, '').complete, false);
  assert.equal(engine.checkAnswer(mod, 'n = input("Number")\nanswer = 1 + 1\nprint(answer)').correct, false);
  assert.equal(engine.checkAnswer(mod, 'n = input("Number")\nprint(n)').correct, false);
  assert.equal(engine.checkAnswer(mod, mod.model.replace(' MOD ', ' DIV ')).correct, false);
  const both = engine.makeQuestion('hard', 5, 21);
  assert.equal(engine.checkAnswer(both, 'a = input("First")\nanswer = a MOD 4\nprint(answer)').correct, false);
  assert.equal(engine.checkAnswer(both, both.model).correct, true);
});

test('invalid difficulty and index fail explicitly', () => {
  assert.throws(() => engine.makeQuestion('extra', 0, 1));
  assert.throws(() => engine.makeQuestion('easy', -1, 1));
});

/* Run: node --test tests/j277-paper2-records.test.js */
const {test} = require('node:test');
const assert = require('node:assert/strict');
const engine = require('../exercise/paper2/records.js');

test('all 30 record tasks generate deterministically with valid model responses', () => {
  for (const seed of [1, 17, 20261114, 98765]) {
    for (const level of ['easy', 'medium', 'hard']) {
      for (let i = 0; i < 10; i++) {
        const q = engine.makeQuestion(level, i, seed);
        assert.deepEqual(q, engine.makeQuestion(level, i, seed));
        assert.equal(engine.checkAnswer(q, String(q.expected)).correct, true, `${seed}/${level}/${i}`);
        assert.deepEqual(Object.keys(q.values), engine.FIELD_NAMES);
        assert.equal(typeof q.values.name, 'string');
        assert.equal(Number.isInteger(q.values.score), true);
        assert.equal(typeof q.values.house, 'string');
        assert.equal(typeof q.values.active, 'boolean');
      }
    }
  }
});

test('Easy selects the correct named field, not its position', () => {
  for (let i = 0; i < 10; i++) {
    const q = engine.makeQuestion('easy', i, 34);
    assert.equal(q.type, 'field');
    assert.ok(engine.FIELD_NAMES.includes(q.expected));
    const wrong = engine.FIELD_NAMES.find(name => name !== q.expected);
    assert.equal(engine.checkAnswer(q, wrong).correct, false);
    assert.match(q.explanation, new RegExp(q.expected));
  }
});

test('Medium traces number, string and Boolean field changes', () => {
  for (let i = 0; i < 10; i++) {
    const q = engine.makeQuestion('medium', i, 72);
    assert.equal(q.type, 'value');
    assert.ok(q.code.some(line => /print\(/.test(line)));
    assert.match(q.explanation, /Output:/);
  }
  const increment = engine.makeQuestion('medium', 2, 72);
  assert.equal(Number(increment.expected) > increment.values.score, true);
  const inactive = engine.makeQuestion('medium', 3, 72);
  assert.equal(inactive.expected, 'False');
  assert.equal(engine.checkAnswer(inactive, 'false').correct, true);
  const changedName = engine.makeQuestion('medium', 4, 72);
  assert.equal(engine.checkAnswer(changedName, '"Kai"').correct, true);
});

test('Hard supports equivalent assignment symbols, case and quote style', () => {
  for (let i = 0; i < 10; i++) {
    const q = engine.makeQuestion('hard', i, 19);
    assert.equal(q.type, 'write');
    assert.equal(engine.checkAnswer(q, q.model.toUpperCase()).correct, true);
    assert.equal(engine.checkAnswer(q, q.model.replace(/ = /g, ' ← ')).correct, true);
    assert.equal(engine.checkAnswer(q, q.model.replace(/"/g, "'")).correct, true);
    assert.equal(engine.checkAnswer(q, 'print(player.nonexistent)').correct, false);
  }
});

test('Invalid questions and empty input are rejected safely', () => {
  const q = engine.makeQuestion('easy', 0, 1);
  assert.deepEqual(engine.checkAnswer(q, ''), {complete: false, correct: false});
  assert.throws(() => engine.makeQuestion('unknown', 0, 1));
  assert.throws(() => engine.makeQuestion('easy', -1, 1));
  assert.throws(() => engine.makeQuestion('easy', 10, 1));
});

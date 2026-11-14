/* Run: node --test tests/j277-paper2-array-2d.test.js */
const {test} = require('node:test');
const assert = require('node:assert/strict');
const engine = require('../exercise/paper2/array-2d.js');

test('all 30 2D array questions are deterministic and have valid model answers', () => {
  for (const seed of [1, 27, 20261114, 98765]) {
    for (const level of ['easy', 'medium', 'hard']) {
      for (let i = 0; i < 10; i++) {
        const q = engine.makeQuestion(level, i, seed);
        assert.deepEqual(q, engine.makeQuestion(level, i, seed));
        assert.equal(q.values.length, 3);
        assert.equal(q.values.every(row => row.length === 4 && row.every(Number.isInteger)), true);
        assert.equal(engine.checkAnswer(q, String(q.expected)).correct, true, `${seed}/${level}/${i}`);
        assert.equal(q.code[0], 'array seats[3,4]');
      }
    }
  }
});

test('Easy selects unique cell using zero-based row and column', () => {
  for (let i = 0; i < 10; i++) {
    const q = engine.makeQuestion('easy', i, 12);
    assert.equal(q.type, 'cell');
    assert.equal(new Set(q.values.flat()).size, 12);
    const [row, col] = q.expected.split(',').map(Number);
    assert.ok(row >= 0 && row < 3 && col >= 0 && col < 4);
    assert.equal(engine.checkAnswer(q, row + ',' + ((col + 1) % 4)).correct, false);
    assert.match(q.explanation, /row/i);
  }
});

test('Medium row and column loops calculate expected totals', () => {
  const row = engine.makeQuestion('medium', 6, 42);
  const col = engine.makeQuestion('medium', 7, 42);
  const all = engine.makeQuestion('medium', 9, 42);
  const rowIndex = Number(row.code[3].match(/seats\[(\d+),c\]/)[1]);
  const colIndex = Number(col.code[3].match(/seats\[r,(\d+)\]/)[1]);
  assert.equal(row.expected, row.values[rowIndex].reduce((a, b) => a + b, 0));
  assert.equal(col.expected, col.values.reduce((a, values) => a + values[colIndex], 0));
  assert.equal(all.expected, all.values.flat().reduce((a, b) => a + b, 0));
  assert.ok(all.code.includes('    for c = 0 to 3'));
  assert.equal(engine.checkAnswer(all, 'not a number').correct, false);
});

test('Hard accepts OCR equivalent two-dimensional indexing forms and whitespace', () => {
  for (let i = 0; i < 10; i++) {
    const q = engine.makeQuestion('hard', i, 19);
    assert.equal(q.type, 'write');
    assert.equal(engine.checkAnswer(q, q.model.toUpperCase()).correct, true);
    assert.equal(engine.checkAnswer(q, q.model.replace(/ = /g, ' ← ')).correct, true);
    const bracketForm = q.model.replace(/seats\[(\d+),(\d+)\]/g, 'seats[$1][$2]');
    assert.equal(engine.checkAnswer(q, bracketForm).correct, true);
    assert.equal(engine.checkAnswer(q, 'print(seats[99,99])').correct, false);
  }
  const sum = engine.makeQuestion('hard', 7, 19);
  const match = sum.model.match(/^total = (seats\[\d+,\d+\]) \+ (seats\[\d+,\d+\])$/);
  assert.ok(match);
  assert.equal(engine.checkAnswer(sum, 'total = ' + match[2] + ' + ' + match[1]).correct, true);
});

test('invalid questions and empty input are safely rejected', () => {
  const q = engine.makeQuestion('easy', 0, 1);
  assert.deepEqual(engine.checkAnswer(q, ''), {complete: false, correct: false});
  assert.throws(() => engine.makeQuestion('unknown', 0, 1));
  assert.throws(() => engine.makeQuestion('easy', -1, 1));
  assert.throws(() => engine.makeQuestion('easy', 10, 1));
});

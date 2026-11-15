const assert = require('node:assert/strict');
const random = require('./random.js');

for (const level of ['easy', 'medium', 'hard']) {
  for (let index = 0; index < 10; index++) {
    const q = random.makeQuestion(level, index, 123);
    const answer = level === 'hard' ? q.model : q.expected;
    assert.equal(random.checkAnswer(q, answer).correct, true,
      'Model answer failed: ' + level + '/' + index);
    assert.equal(random.checkAnswer(q, '').complete, false);
    const demo = random.makeDemo(q);
    assert.ok(demo.entryLine >= 1 && demo.entryLine <= demo.lines.length);
    assert.ok(demo.lines[demo.entryLine - 1]);
    assert.ok(demo.steps.every(step => step[0] >= 1 && step[0] <= demo.lines.length));
    assert.equal(demo.steps[0][1], 'START HERE');
  }
}

for (let index = 0; index < 10; index++) {
  const q = random.makeQuestion('hard', index, 1);
  for (const [kind, source] of [
    ['no random', q.model.replace('random(1,sides)', '1')],
    ['wrong minimum', q.model.replace('random(1,sides)', 'random(0,sides)')],
    ['wrong maximum', q.model.replace('random(1,sides)', 'random(1,sides-1)')],
    ['off-by-one loop', q.model.replace('for i = 1 to rolls', 'for i = 1 to rolls - 1')],
    ['no IF', q.model.replace('if ' + q.test + ' then', 'if true then')],
    ['wrong subprogram call', q.model.replace(/\((\d+), (\d+)\)/, '(1, 1)')]
  ]) {
    assert.equal(random.checkAnswer(q, source).correct, false,
      'Incorrect ' + kind + ' accepted: ' + index);
  }
  const renamed = q.model.replace(/\bcount\b/g, 'tally');
  assert.equal(random.checkAnswer(q, renamed).correct, true,
    'Equivalent variable rename was rejected: ' + index);
}
const q = random.makeQuestion('hard', 0, 1);
assert.equal(random.checkAnswer(q, 'I will just return the answer').correct, false);
assert.equal(random.checkAnswer(q, 'function evil(x)\nwhile true\nendfunction').correct, false);
console.log('Skill 18: 30 models, 30 demos, 60 incorrect programs, and equivalent variable names passed.');

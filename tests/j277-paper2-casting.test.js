const assert = require('node:assert/strict');
const skill = require('../exercise/paper2/casting.js');

for (const level of ['easy', 'medium', 'hard']) {
  for (const seed of [1, 79, 20261114]) {
    for (let index = 0; index < 10; index++) {
      const q = skill.makeQuestion(level, index, seed);
      assert.deepEqual(q, skill.makeQuestion(level, index, seed), 'Question must be repeatable');
      if (level === 'easy') {
        assert.equal(skill.checkAnswer(q, q.expected).correct, true, q.model);
        assert.equal(skill.checkAnswer(q, null).complete, false);
      } else if (level === 'medium') {
        assert.equal(skill.checkAnswer(q, { output: q.output, typeName: q.typeName }).correct, true, q.model);
        assert.equal(skill.checkAnswer(q, { output: q.output, typeName: '' }).complete, false);
        const wrong = skill.TYPES.find(type => type !== q.typeName);
        assert.equal(skill.checkAnswer(q, { output: q.output, typeName: wrong }).correct, false);
      } else {
        assert.equal(skill.checkAnswer(q, q.model).correct, true, q.model);
        const custom = q.model.replace(/^[A-Za-z_][\w]*/, 'myVariable').replace(' = ', ' ← ');
        assert.equal(skill.checkAnswer(q, custom).correct, true, custom);
        if (q.cast === 'real') {
          assert.equal(skill.checkAnswer(q, custom.replace('real(', 'float(')).correct, true);
        }
        assert.equal(skill.checkAnswer(q, 'x = str("wrong value")').correct, false);
      }
    }
  }
}
assert.equal(skill.parseCastingAssignment('total = int("12")').cast, 'int');
assert.equal(skill.parseCastingAssignment('total := real("2.5")').cast, 'real');
assert.equal(skill.parseCastingAssignment('total ← str(7)').argument.value, '7');
assert.equal(skill.parseCastingAssignment('x = eval("1")'), null);
assert.equal(skill.parseCastingAssignment('x = int(1)\ny = 2'), null);
assert.equal(skill.classifyLiteral('"False"').type, 'String');
console.log('J277 Paper 2 Casting: 90 seeded questions and safe parsing checks passed.');

const assert = require('node:assert/strict');
const skill = require('../exercise/paper2/data-types.js');

assert.deepEqual(skill.TYPES, ['Integer', 'Real', 'Boolean', 'Character', 'String']);
for (const level of ['easy', 'medium', 'hard']) {
  for (const seed of [1, 79, 20261114]) {
    for (let index = 0; index < 10; index++) {
      const question = skill.makeQuestion(level, index, seed);
      assert.deepEqual(question, skill.makeQuestion(level, index, seed), 'repeatable seed');
      if (level === 'easy') {
        assert.equal(skill.checkAnswer(question, question.expected).correct, true);
        assert.equal(skill.checkAnswer(question, null).complete, false);
      } else if (level === 'medium') {
        assert.equal(question.examples.length, 3);
        assert.equal(skill.checkAnswer(question, question.expected).correct, true);
        assert.equal(skill.checkAnswer(question, ['Integer']).complete, false);
      } else {
        assert.equal(skill.checkAnswer(question, question.model).correct, true, question.model);
        const alternate = question.model.replace(/^[A-Za-z_][\w]*/, 'studentChoice').replace(' = ', ' ← ');
        assert.equal(skill.checkAnswer(question, alternate).correct, true, alternate);
        assert.equal(skill.checkAnswer(question, 'studentChoice = "not the intended value"').correct, false);
      }
    }
  }
}
assert.deepEqual(skill.classifyLiteral('42'), { type: 'Integer', value: '42' });
assert.deepEqual(skill.classifyLiteral('42.0'), { type: 'Real', value: '42' });
assert.deepEqual(skill.classifyLiteral('True'), { type: 'Boolean', value: 'true' });
assert.deepEqual(skill.classifyLiteral("'A'"), { type: 'Character', value: 'A' });
assert.deepEqual(skill.classifyLiteral('"007"'), { type: 'String', value: '007' });
assert.equal(skill.classifyLiteral('something()'), null);
assert.equal(skill.parseAssignment('student = alert(1)'), null);
assert.equal(skill.parseAssignment('x = 2\ny = 3'), null);
console.log('J277 Paper 2 Data Types: 90 seeded questions and parsing checks passed.');

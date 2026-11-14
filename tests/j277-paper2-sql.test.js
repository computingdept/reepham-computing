const test = require('node:test');
const assert = require('node:assert/strict');
const engine = require('../exercise/paper2/sql.js');

test('all 30 SQL questions have clear prompts and valid model answers', () => {
  for (const level of ['easy', 'medium', 'hard']) {
    for (let index = 0; index < 10; index++) {
      const q = engine.makeQuestion(level, index, 123);
      assert.ok(q.prompt && q.context && q.hint && q.model);
      assert.ok(engine.TABLES[q.table]);
      if (level === 'easy') {
        assert.ok(q.options.includes(q.expected));
        assert.deepEqual(engine.checkAnswer(q, q.expected), {complete: true, correct: true});
      } else {
        assert.equal(engine.checkSQL(q, q.model).correct, true, `Model fails ${level} ${index + 1}`);
      }
    }
  }
  assert.match(engine.makeDemo(engine.makeQuestion('easy', 6, 1)).lines[2], />/);
  assert.match(engine.makeDemo(engine.makeQuestion('hard', 3, 1)).task, /where Genre is Science/);
});

test('valid alternative SQL syntax is accepted without literal model matching', () => {
  const plain = engine.makeQuestion('hard', 1, 1);
  assert.equal(engine.checkAnswer(plain, 'select house, name from pupils;').correct, true);
  assert.equal(engine.checkAnswer(plain, '\n SELECT\n Name,\n House\n FROM\n Pupils ;\n').correct, true);
  const filtered = engine.makeQuestion('hard', 3, 1);
  assert.equal(engine.checkAnswer(filtered, 'select name from PUPILS where HOUSE = "red"').correct, true);
  const scores = engine.makeQuestion('hard', 4, 1);
  assert.equal(engine.checkAnswer(scores, 'select Score, Name from Pupils where Score > 59').correct, true);
  assert.equal(engine.checkAnswer(scores, "SELECT Name, Score FROM Pupils WHERE Score >= '60'").correct, true);
  const pages = engine.makeQuestion('hard', 8, 1);
  assert.equal(engine.checkAnswer(pages, 'SELECT Pages, Title FROM Books WHERE Pages <= 199;').correct, true);
});

test('SQL checks distinguish syntax mistakes and wrong logic', () => {
  const red = engine.makeQuestion('hard', 3, 1);
  const cases = [
    ['SELECT Name FROM Pupils WHERE House = Red', 'quotation marks'],
    ["SELECT Name FROM Books WHERE House = 'Red'", 'table'],
    ["SELECT Score FROM Pupils WHERE House = 'Red'", 'columns'],
    ['SELECT Name FROM Pupils', 'WHERE'],
    ["SELECT Name FROM Pupils WHERE Score = 'Red'", 'column'],
    ["SELECT Name FROM Pupils WHERE House = 'Blue'", 'comparison'],
    ["SELECT Name WHERE House = 'Red' FROM Pupils", 'order'],
    ["SELECT Name FROM Pupils WHERE House = 'Red'; DROP TABLE Pupils", 'one SELECT'],
    ["SELECT Name FROM Pupils WHERE House = 'Red' AND Year = 11", 'WHERE value']
  ];
  cases.forEach(([statement, partial]) => {
    const result = engine.checkAnswer(red, statement);
    assert.equal(result.correct, false, statement);
    assert.match(result.feedback, new RegExp(partial, 'i'), statement);
  });
  assert.equal(engine.checkAnswer(red, '').complete, false);
});

test('SQL checker requires exact projection and no unnecessary filter', () => {
  const all = engine.makeQuestion('hard', 2, 1);
  assert.equal(engine.checkAnswer(all, 'SELECT * FROM Pupils').correct, true);
  assert.equal(engine.checkAnswer(all, 'SELECT Name, House, Score, Year FROM Pupils').correct, false);
  const names = engine.makeQuestion('hard', 0, 1);
  assert.equal(engine.checkAnswer(names, 'SELECT Name FROM Pupils WHERE Year = 11').correct, false);
  assert.equal(engine.checkAnswer(names, 'SELECT Name, Name FROM Pupils').correct, false);
});

test('medium builder creates the same meaningful query as hard text', () => {
  const q = engine.makeQuestion('medium', 9, 1);
  assert.equal(engine.checkAnswer(q, {columns: 'Title, Genre', table: 'Books', filter: 'Pages >= 300'}).correct, true);
  assert.equal(engine.checkAnswer(q, {columns: 'Title, Genre', table: 'Books', filter: 'No filter'}).correct, false);
  assert.equal(engine.checkAnswer(q, {columns: '', table: 'Books', filter: 'Pages >= 300'}).complete, false);
  for (let index = 0; index < 10; index++) {
    const question = engine.makeQuestion('medium', index, 1);
    const filter = question.where
      ? question.where.field + ' ' + question.where.op + ' ' +
        (typeof question.where.value === 'string' ? "'" + question.where.value + "'" : question.where.value)
      : 'No filter';
    assert.ok(question.columnsToChoose.includes(question.columns.join(', ')));
    assert.ok(question.filtersToChoose.includes(filter));
    assert.equal(engine.checkAnswer(question, {columns: question.columns.join(', '), table: question.table, filter}).correct, true);
  }
});

test('reject malformed or dangerous SQL without evaluating anything', () => {
  const q = engine.makeQuestion('hard', 0, 1);
  for (const source of ['DELETE FROM Pupils', 'SELECT FROM Pupils', 'SELECT Name FROM Pupils WHERE',
    'SELECT Name FROM Pupils; SELECT Score FROM Pupils', 'SELECT Name, * FROM Pupils',
    'SELECT Name FROM Pupils -- comment', 'SELECT Name FROM Pupils WHERE Year = 10 OR 1=1']) {
    assert.equal(engine.checkAnswer(q, source).correct, false, source);
  }
  assert.throws(() => engine.makeQuestion('hard', 10, 1));
});

test('SQL demos match each question structure without revealing its own answer', () => {
  for (const level of ['easy', 'medium', 'hard']) {
    for (let index = 0; index < 10; index++) {
      const question = engine.makeQuestion(level, index, 1);
      const demo = engine.makeDemo(question);
      assert.ok(demo.task.startsWith('Similar example:'));
      assert.notEqual(demo.lines[1], 'FROM ' + question.table);
      assert.equal(demo.lines.length, demo.steps.length);
      assert.ok(demo.lines[0].startsWith('SELECT '));
      assert.ok(demo.lines[1].startsWith('FROM '));
      const needsFilter = level === 'easy' ? [2, 5, 6, 8, 9].includes(index) : !!question.where;
      assert.equal(demo.lines.some(line => line.startsWith('WHERE ')), needsFilter);
      assert.ok(demo.end.includes(needsFilter ? 'WHERE filters' : 'No WHERE is needed'));
    }
  }
});

test('SQL feedback teaches the distinction between * and filtering every row', () => {
  const question = engine.makeQuestion('hard', 0, 1);
  assert.match(engine.checkAnswer(question, 'SELECT FROM Pupils WHERE Name = *').feedback, /column name/i);
  assert.match(engine.checkAnswer(question, 'SELECT Name FROM Pupils WHERE Name = *').feedback, /every column/i);
});

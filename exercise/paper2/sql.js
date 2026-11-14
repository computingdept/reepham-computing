/* OCR J277/02 Skill 14: SELECT, FROM and WHERE. No student SQL is executed. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.J277Paper2SQL = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const TABLES = {
    Pupils: {
      columns: ['Name', 'House', 'Score', 'Year'],
      rows: [
        ['Asha', 'Red', 82, 10], ['Ben', 'Blue', 58, 11],
        ['Mia', 'Red', 67, 11], ['Leo', 'Green', 74, 10]
      ]
    },
    Books: {
      columns: ['Title', 'Genre', 'Pages'],
      rows: [
        ['Orbit', 'Science', 320], ['River', 'Mystery', 180],
        ['Forest', 'Nature', 156], ['Stars', 'Science', 240]
      ]
    }
  };

  const TASKS = [
    {table: 'Pupils', columns: ['Name'], where: null, task: 'Show the Name of every pupil.'},
    {table: 'Pupils', columns: ['Name', 'House'], where: null, task: 'Show each pupil’s Name and House.'},
    {table: 'Pupils', columns: ['*'], where: null, task: 'Show every column for every pupil.'},
    {table: 'Pupils', columns: ['Name'], where: {field: 'House', op: '=', value: 'Red'}, task: 'Show the Name of pupils in the Red house.'},
    {table: 'Pupils', columns: ['Name', 'Score'], where: {field: 'Score', op: '>=', value: 60}, task: 'Show Name and Score for pupils scoring 60 or more.'},
    {table: 'Pupils', columns: ['Name'], where: {field: 'Year', op: '=', value: 11}, task: 'Show the Name of pupils in Year 11.'},
    {table: 'Books', columns: ['Title'], where: null, task: 'Show the Title of every book.'},
    {table: 'Books', columns: ['Title'], where: {field: 'Genre', op: '=', value: 'Science'}, task: 'Show the Title of Science books.'},
    {table: 'Books', columns: ['Title', 'Pages'], where: {field: 'Pages', op: '<', value: 200}, task: 'Show Title and Pages for books shorter than 200 pages.'},
    {table: 'Books', columns: ['Title', 'Genre'], where: {field: 'Pages', op: '>=', value: 300}, task: 'Show Title and Genre for books with 300 or more pages.'}
  ];

  const EASY = [
    {task: 'Choose the keyword that tells SQL which columns to show.', line: '___ Name FROM Pupils', correct: 'SELECT', options: ['SELECT', 'WHERE', 'FROM', 'PRINT']},
    {task: 'Choose the keyword that names the table.', line: 'SELECT Name ___ Pupils', correct: 'FROM', options: ['WHERE', 'FROM', 'SELECT', 'TABLE']},
    {task: 'Choose the keyword that filters rows.', line: 'SELECT Name FROM Pupils ___ House = "Red"', correct: 'WHERE', options: ['FROM', 'ORDER', 'SELECT', 'WHERE']},
    {task: 'Choose the correct table name.', line: 'SELECT Title FROM ___', correct: 'Books', options: ['Pupils', 'Genre', 'Title', 'Books']},
    {task: 'Choose the column containing pupil names.', line: 'SELECT ___ FROM Pupils', correct: 'Name', options: ['Score', 'Name', 'Year', 'House']},
    {task: 'Choose the correctly quoted text value.', line: 'SELECT Name FROM Pupils WHERE House = ___', correct: "'Red'", options: ['Red', "'Red'", 'House', 'Red()']},
    {task: 'Choose the operator for a score greater than 75.', line: 'SELECT Name FROM Pupils WHERE Score ___ 75', correct: '>', options: ['<', '=', '>=', '>']},
    {task: 'Choose how to show every column.', line: 'SELECT ___ FROM Books', correct: '*', options: ['Title', '*', 'ALL', 'WHERE']},
    {task: 'Choose the correct column to filter on.', line: 'SELECT Title FROM Books WHERE ___ = "Science"', correct: 'Genre', options: ['Pages', 'Title', 'Genre', 'Books']},
    {task: 'Choose the correct SQL clause order.', line: '___', correct: 'SELECT → FROM → WHERE', options: ['FROM → WHERE → SELECT', 'SELECT → WHERE → FROM', 'SELECT → FROM → WHERE', 'WHERE → SELECT → FROM']}
  ];

  const quote = value => typeof value === 'number' ? String(value) : "'" + value + "'";
  function makeSQL(q) {
    return 'SELECT ' + q.columns.join(', ') + ' FROM ' + q.table +
      (q.where ? ' WHERE ' + q.where.field + ' ' + q.where.op + ' ' + quote(q.where.value) : '');
  }

  function columnOptions(q) {
    const possibilities = q.table === 'Pupils'
      ? ['Name', 'House', 'Score', 'Year', 'Name, House', 'Name, Score', '*']
      : ['Title', 'Genre', 'Pages', 'Title, Pages', 'Title, Genre', '*'];
    return possibilities;
  }
  function filterOptions(q) {
    return q.table === 'Pupils'
      ? ['No filter', "House = 'Red'", "House = 'Blue'", 'Score >= 60', 'Score > 75', 'Year = 11', 'Year = 10']
      : ['No filter', "Genre = 'Science'", "Genre = 'Mystery'", 'Pages < 200', 'Pages >= 300'];
  }

  function makeQuestion(level, index, seed) {
    if (!['easy', 'medium', 'hard'].includes(level) || !Number.isInteger(index) || index < 0 || index > 9)
      throw new Error('Invalid SQL question');
    if (level === 'easy') {
      const item = EASY[index];
      return {level, type: 'choice', table: index === 3 || index === 7 || index === 8 ? 'Books' : 'Pupils',
        prompt: 'Complete the SQL statement.', context: item.task, line: item.line,
        options: item.options, expected: item.correct,
        hint: 'SELECT chooses columns, FROM chooses the table, and WHERE filters rows.',
        model: item.line.replace('___', item.correct),
        explanation: item.correct + ' completes this SQL statement.'};
    }
    const task = TASKS[index];
    return {level, type: level === 'medium' ? 'build' : 'write',
      table: task.table, columns: task.columns, where: task.where,
      prompt: level === 'medium' ? 'Build the SQL query.' : 'Write the SQL query.',
      context: task.task, model: makeSQL(task),
      columnsToChoose: columnOptions(task), tablesToChoose: ['Pupils', 'Books'], filtersToChoose: filterOptions(task),
      hint: task.where ? 'SELECT the columns, FROM the table, then WHERE to filter the rows.' :
        'You need SELECT and FROM. No WHERE is needed to show every row.',
      explanation: 'Correct — your query selects the requested columns and rows.'};
  }

  // A deliberately small parser: only the OCR-required SELECT/FROM/WHERE subset.
  // Parsing, not executing, stops extra commands from being accepted.
  function parseSQL(source) {
    let text = String(source ?? '').trim();
    if (!text) return {error: 'Enter an SQL query first.'};
    text = text.replace(/;\s*$/, '').trim();
    if (text.includes(';')) return {error: 'Write one SELECT query only.'};
    const head = /^SELECT\s+(.+?)\s+FROM\s+([A-Za-z_][A-Za-z0-9_]*)(?:\s+WHERE\s+(.+))?$/is.exec(text);
    if (!head) return {error: 'Use the order SELECT columns FROM table WHERE condition.'};
    if (/\bWHERE\b/i.test(head[1])) return {error: 'Use the order SELECT columns FROM table WHERE condition.'};
    const columns = head[1].split(',').map(item => item.trim());
    if (!columns.length || columns.some(item => !/^(?:\*|[A-Za-z_][A-Za-z0-9_]*)$/.test(item)) ||
        (columns.includes('*') && columns.length !== 1))
      return {error: 'After SELECT, list column names separated by commas, or use * for every column.'};
    if (new Set(columns.map(item => item.toLowerCase())).size !== columns.length)
      return {error: 'Do not list the same column more than once.'};
    let where = null;
    if (head[3] !== undefined) {
      const parts = /^([A-Za-z_][A-Za-z0-9_]*)\s*(>=|<=|<>|!=|=|>|<)\s*(.+)$/s.exec(head[3].trim());
      if (!parts) return {error: 'After WHERE, write a column, a comparison and a value.'};
      const raw = parts[3].trim();
      let value, quoted = false;
      if ((raw.startsWith("'") && raw.endsWith("'")) || (raw.startsWith('"') && raw.endsWith('"'))) {
        value = raw.slice(1, -1); quoted = true;
        if (value.includes(raw[0])) return {error: 'Check the quotation marks around your text.'};
      } else if (/^-?\d+(?:\.\d+)?$/.test(raw)) value = Number(raw);
      else if (/^[A-Za-z_][A-Za-z0-9_]*$/.test(raw)) value = raw;
      else return {error: 'Check the WHERE value and its quotation marks.'};
      where = {field: parts[1], op: parts[2], value, quoted};
    }
    return {table: head[2], columns, where};
  }

  function sameNumberCondition(actual, expected) {
    const a = Number(actual.value), e = expected.value;
    if (!Number.isFinite(a)) return false;
    if (actual.op === expected.op && a === e) return true;
    // Scores, years and pages are whole numbers: these are equivalent cut-offs.
    return (expected.op === '>=' && actual.op === '>' && a === e - 1) ||
      (expected.op === '>' && actual.op === '>=' && a === e + 1) ||
      (expected.op === '<=' && actual.op === '<' && a === e + 1) ||
      (expected.op === '<' && actual.op === '<=' && a === e - 1) ||
      (expected.op === '=' && actual.op === '=' && a === e);
  }

  function checkSQL(q, source) {
    const sql = parseSQL(source);
    if (sql.error) return {complete: sql.error !== 'Enter an SQL query first.', correct: false, feedback: sql.error};
    if (sql.table.toLowerCase() !== q.table.toLowerCase())
      return {complete: true, correct: false, feedback: 'Check the table after FROM.'};
    const real = TABLES[q.table].columns.map(item => item.toLowerCase());
    if (sql.columns.some(item => item !== '*' && !real.includes(item.toLowerCase())))
      return {complete: true, correct: false, feedback: 'Check the column names after SELECT.'};
    if (sql.columns.length !== q.columns.length ||
        sql.columns.map(item => item.toLowerCase()).sort().join(',') !==
        q.columns.map(item => item.toLowerCase()).sort().join(','))
      return {complete: true, correct: false, feedback: 'SELECT the columns requested in the question.'};
    if (!q.where && sql.where)
      return {complete: true, correct: false, feedback: 'You need every row, so remove the WHERE filter.'};
    if (q.where && !sql.where)
      return {complete: true, correct: false, feedback: 'Add WHERE to select only the requested rows.'};
    if (q.where) {
      const w = sql.where, expected = q.where;
      if (!real.includes(w.field.toLowerCase()) || w.field.toLowerCase() !== expected.field.toLowerCase())
        return {complete: true, correct: false, feedback: 'Check which column the WHERE condition uses.'};
      if (typeof expected.value === 'string') {
        if (!w.quoted) return {complete: true, correct: false, feedback: 'Put quotation marks around a text value, for example \'Red\'.'};
        if (w.op !== '=' || String(w.value).toLowerCase() !== expected.value.toLowerCase())
          return {complete: true, correct: false, feedback: 'Check the WHERE comparison and the text value.'};
      } else if (!sameNumberCondition(w, expected))
        return {complete: true, correct: false, feedback: 'Check the WHERE comparison and number.'};
    }
    return {complete: true, correct: true};
  }

  function checkAnswer(q, response) {
    if (q.type === 'choice') {
      const value = String(response ?? '').trim();
      if (!value) return {complete: false, correct: false};
      return {complete: true, correct: value === q.expected};
    }
    if (q.type === 'build') {
      if (!response || !response.columns || !response.table || !response.filter)
        return {complete: false, correct: false};
      const statement = 'SELECT ' + response.columns + ' FROM ' + response.table +
        (response.filter === 'No filter' ? '' : ' WHERE ' + response.filter);
      return checkSQL(q, statement);
    }
    return checkSQL(q, response);
  }
  return {TABLES, TASKS, makeQuestion, parseSQL, checkSQL, checkAnswer};
});

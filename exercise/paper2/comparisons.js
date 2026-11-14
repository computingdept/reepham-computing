/* OCR J277/02 Skill 06: comparison operators and Boolean expressions. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.J277Paper2Comparisons = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const OPERATORS = ['==', '!=', '<', '<=', '>', '>='];
  const MEANINGS = {
    '==': ['equal to', 'exactly the same as'],
    '!=': ['not equal to', 'different from'],
    '<': ['less than', 'strictly below'],
    '<=': ['less than or equal to', 'no more than'],
    '>': ['greater than', 'strictly above'],
    '>=': ['greater than or equal to', 'at least']
  };
  function randomFor(seed, level, index) {
    let n = (Number(seed) || 1) | 0;
    for (const c of level + ':' + index) n = (Math.imul(n, 31) + c.charCodeAt(0)) | 0;
    return function () {
      n = (n + 0x6D2B79F5) | 0;
      let t = Math.imul(n ^ (n >>> 15), 1 | n);
      t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const int = (r, low, high) => low + Math.floor(r() * (high - low + 1));
  function compare(left, op, right) {
    if (op === '==') return left === right;
    if (op === '!=') return left !== right;
    if (op === '<') return left < right;
    if (op === '<=') return left <= right;
    if (op === '>') return left > right;
    if (op === '>=') return left >= right;
    return null;
  }
  function easy(index, r) {
    const operator = ['==','!=','<','<=','>','>=','>=','!=','<=','=='][index % 10];
    const meaning = MEANINGS[operator][int(r, 0, 1)];
    return {
      level: 'easy', type: 'choose', options: OPERATORS.slice(), expected: operator,
      prompt: 'Which comparison operator means this?',
      context: meaning,
      hint: '== checks equality. != checks inequality. The = comes after < or > when equal counts too.',
      model: operator + ' means ' + MEANINGS[operator][0] + '.',
      explanation: operator + ' means ' + MEANINGS[operator][0] + '.'
    };
  }
  function medium(index, r) {
    const op = OPERATORS[index % OPERATORS.length];
    const trueWanted = index % 2 === 0;
    let a, b;
    for (let attempt = 0; attempt < 200; attempt++) {
      a = int(r, 0, 20); b = int(r, 0, 20);
      if (compare(a, op, b) === trueWanted) break;
    }
    if (compare(a, op, b) !== trueWanted) throw new Error('Could not generate comparison example');
    return {
      level: 'medium', type: 'boolean', expected: trueWanted ? 'True' : 'False',
      prompt: 'Will the program print True or False?',
      context: 'Trace the values, then check the comparison.',
      code: ['a = ' + a, 'b = ' + b, 'answer = a ' + op + ' b', 'print(answer)'],
      hint: 'Find a and b first. The comparison returns a Boolean: True or False.',
      model: trueWanted ? 'True' : 'False',
      explanation: a + ' ' + op + ' ' + b + ' is ' + (trueWanted ? 'True.' : 'False.')
    };
  }
  const TASKS = [
    { variable: 'score', op: '>=', constant: 40, phrase: 'score is at least 40' },
    { variable: 'attempts', op: '<', constant: 3, phrase: 'attempts is fewer than 3' },
    { variable: 'temperature', op: '>', constant: 20, phrase: 'temperature is above 20' },
    { variable: 'level', op: '!=', constant: 5, phrase: 'level is not equal to 5' },
    { variable: 'value', op: '==', constant: 0, phrase: 'value is exactly zero' },
    { variable: 'age', op: '<=', constant: 16, phrase: 'age is no more than 16' },
    { variable: 'score', other: 'passMark', op: '>', phrase: 'score is greater than passMark' },
    { variable: 'guess', other: 'target', op: '==', phrase: 'guess is equal to target' },
    { variable: 'amount', other: 'limit', op: '!=', phrase: 'amount is different from limit' },
    { variable: 'start', other: 'end', op: '<=', phrase: 'start is less than or equal to end' }
  ];
  function hard(index) {
    const item = TASKS[index % TASKS.length];
    return {
      level: 'hard', type: 'write', ...item,
      prompt: 'Write an OCR ERL condition that is True when ' + item.phrase + '.',
      context: 'Write one Boolean comparison using the variable names shown.',
      hint: 'Use == for equal and != for not equal. Use >= or <= when equality is included.',
      model: item.variable + ' ' + item.op + ' ' + (item.other ?? item.constant),
      explanation: 'Your condition matches the requirement across different values.'
    };
  }
  function makeQuestion(level, index, seed) {
    if (!['easy','medium','hard'].includes(level) || !Number.isInteger(index) || index < 0) {
      throw new Error('Invalid comparisons question');
    }
    const r = randomFor(seed, level, index);
    return level === 'easy' ? easy(index, r) : level === 'medium' ? medium(index, r) : hard(index);
  }
  function evaluateCondition(source, environment) {
    const text = String(source ?? '').trim();
    const match = text.match(/^([A-Za-z_]\w*|-?\d+)\s*(==|!=|<=|>=|<|>|≠|≤|≥)\s*([A-Za-z_]\w*|-?\d+)$/);
    if (!match) return null;
    const resolve = token => /^-?\d+$/.test(token) ? Number(token) :
      Object.prototype.hasOwnProperty.call(environment, token) ? environment[token] : null;
    const left = resolve(match[1]), right = resolve(match[3]);
    if (left === null || right === null) return null;
    const operator = ({ '≠':'!=', '≤':'<=', '≥':'>=' })[match[2]] ?? match[2];
    return compare(left, operator, right);
  }
  function checkAnswer(question, response) {
    if (question.type !== 'write') {
      const value = String(response ?? '').trim();
      return { complete: value !== '', correct: value === question.expected };
    }
    const complete = String(response ?? '').trim() !== '';
    const values = question.other ?
      [[0,0], [5,5], [5,10], [10,5], [-2,3], [3,-2], [7,9], [9,7]] :
      [question.constant - 3, question.constant - 1, question.constant, question.constant + 1, question.constant + 3, -3, 0];
    return {
      complete,
      correct: complete && values.every(value => {
        const a = Array.isArray(value) ? value[0] : value;
        const b = question.other ? value[1] : question.constant;
        const env = { [question.variable]: a };
        if (question.other) env[question.other] = b;
        const actual = evaluateCondition(response, env);
        const expected = compare(a, question.op, b);
        return actual !== null && actual === expected;
      })
    };
  }
  return { OPERATORS, makeQuestion, checkAnswer, compare, evaluateCondition };
});

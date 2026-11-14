/* OCR J277/02 Skill 05: arithmetic operators, real division, DIV and MOD. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.J277Paper2Operators = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const OPERATORS = ['+', '−', '×', '/', 'DIV', 'MOD'];
  const DESCRIPTIONS = {
    '+': 'Add the two numbers.',
    '−': 'Subtract the second number from the first.',
    '×': 'Multiply the numbers.',
    '/': '/ gives a real-number answer, including the fractional part.',
    DIV: 'DIV gives the whole-number quotient, dropping the remainder.',
    MOD: 'MOD gives only the remainder after division.'
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
  const fmt = n => Number.isInteger(n) ? String(n) : String(Number(n.toFixed(5)));
  function calculate(a, b, op) {
    if (op === '+') return a + b;
    if (op === '−') return a - b;
    if (op === '×') return a * b;
    if (b === 0) return null;
    if (op === '/') return a / b;
    if (op === 'DIV') return Math.trunc(a / b);
    if (op === 'MOD') return a % b;
    return null;
  }
  function easy(index, r) {
    const op = ['+', '−', '×', '/', 'DIV', 'MOD', 'MOD', '/', 'DIV', '−'][index % 10];
    let a, b, result;
    for (let attempt = 0; attempt < 1000; attempt++) {
      b = [2, 4][int(r, 0, 1)];
      a = int(r, 9, 47);
      if (a % b === 0) continue;
      result = calculate(a, b, op);
      const matches = OPERATORS.filter(candidate => calculate(a, b, candidate) === result);
      if (matches.length === 1) break;
    }
    if (OPERATORS.filter(candidate => calculate(a, b, candidate) === result).length !== 1) {
      throw new Error('Could not build an unambiguous operators question');
    }
    return {
      level: 'easy', type: 'choose', options: OPERATORS.slice(), a, b, expected: op,
      prompt: 'Which operator completes the calculation?',
      context: a + '  ?  ' + b + '  =  ' + fmt(result),
      hint: 'DIV is the whole-number answer. MOD is the remainder. / keeps the decimal part.',
      model: a + ' ' + op + ' ' + b + ' = ' + fmt(result),
      explanation: DESCRIPTIONS[op]
    };
  }
  function medium(index, r) {
    const b = [2, 4][int(r, 0, 1)];
    const a = int(r, 11, 35) * 2 + 1;
    const inc = int(r, 2, 7);
    const cases = [
      { expression: 'a DIV b', output: Math.trunc(a / b), why: 'DIV keeps the whole-number quotient.' },
      { expression: 'a MOD b', output: a % b, why: 'MOD keeps only the remainder.' },
      { expression: 'a / b', output: a / b, why: '/ keeps the fractional part.' },
      { expression: 'a * b', output: a * b, why: '* means multiply in OCR ERL.' },
      { expression: 'a + b', output: a + b, why: 'The values are added.' },
      { expression: 'a - b', output: a - b, why: 'Subtract b from a.' },
      { expression: '(a DIV b) + ' + inc, output: Math.trunc(a / b) + inc, why: 'Perform DIV inside the brackets, then add.' },
      { expression: '(a MOD b) * ' + inc, output: (a % b) * inc, why: 'Find the remainder, then multiply it.' },
      { expression: 'a DIV b', then: 'answer = answer + ' + inc, output: Math.trunc(a / b) + inc, why: 'Use the result of DIV in the next assignment.' },
      { expression: 'a MOD b', then: 'answer = answer * ' + inc, output: (a % b) * inc, why: 'Use the remainder in the next assignment.' }
    ];
    const item = cases[index % 10];
    return {
      level: 'medium', type: 'trace',
      prompt: 'What number will be printed?',
      context: 'Follow the operations in order.',
      code: ['a = ' + a, 'b = ' + b, 'answer = ' + item.expression, ...(item.then ? [item.then] : []), 'print(answer)'],
      output: item.output, hint: 'Work out DIV, MOD or / carefully. Then follow any next line.',
      model: 'Output: ' + fmt(item.output), explanation: item.why
    };
  }
  function hard(index, r) {
    const k = int(r, 3, 8), c = int(r, 2, 6);
    const tasks = [
      { inputs: 1, prompt: 'Ask for a whole number. Print the whole-number result of dividing it by ' + k + '.', rule: 'div', model: 'n = input("Number")\nanswer = n DIV ' + k + '\nprint(answer)' },
      { inputs: 1, prompt: 'Ask for a whole number. Print its remainder when divided by ' + k + '.', rule: 'mod', model: 'n = input("Number")\nanswer = n MOD ' + k + '\nprint(answer)' },
      { inputs: 1, prompt: 'Ask for a number. Add ' + c + ', then use DIV ' + k + ' to print the whole-number quotient.', rule: 'add-div', model: 'n = input("Number")\nanswer = (n + ' + c + ') DIV ' + k + '\nprint(answer)' },
      { inputs: 1, prompt: 'Ask for a number. Add ' + c + ', then print the remainder when divided by ' + k + '.', rule: 'add-mod', model: 'n = input("Number")\nanswer = (n + ' + c + ') MOD ' + k + '\nprint(answer)' },
      { inputs: 2, prompt: 'Ask for two whole numbers. Print their whole-number quotient using DIV.', rule: 'two-div', model: 'a = input("First")\nb = input("Second")\nanswer = a DIV b\nprint(answer)' },
      { inputs: 2, prompt: 'Ask for two whole numbers. Print the remainder of the first divided by the second.', rule: 'two-mod', model: 'a = input("First")\nb = input("Second")\nanswer = a MOD b\nprint(answer)' },
      { inputs: 1, prompt: 'Ask for a number. Multiply it by ' + k + ', then add ' + c + ' and print.', rule: 'multiply-add', model: 'n = input("Number")\nanswer = n * ' + k + ' + ' + c + '\nprint(answer)' },
      { inputs: 1, prompt: 'Ask for a number. Subtract twice ' + c + ' from it, then print.', rule: 'subtract-double', model: 'n = input("Number")\nanswer = n - ' + c + ' * 2\nprint(answer)' },
      { inputs: 1, prompt: 'Ask for a number. Divide it by 2 using /, keeping the fractional part.', rule: 'real-div', model: 'n = input("Number")\nanswer = n / 2\nprint(answer)' },
      { inputs: 1, prompt: 'Ask for a number. Divide it by ' + k + ', then add its whole-number quotient and remainder.', rule: 'quotient-plus-rem', model: 'n = input("Number")\nanswer = (n DIV ' + k + ') + (n MOD ' + k + ')\nprint(answer)' }
    ];
    const task = tasks[index % 10];
    return {
      level: 'hard', type: 'write', ...task, k, c,
      context: 'Write the input, calculation and print statements in OCR ERL.',
      hint: 'Use input("Prompt"), then an assignment with the right operator, then print(answer).',
      explanation: 'Your algorithm was tested with several inputs, not just one example.'
    };
  }
  function makeQuestion(level, index, seed) {
    if (!['easy', 'medium', 'hard'].includes(level) || !Number.isInteger(index) || index < 0) {
      throw new Error('Invalid operators question');
    }
    const r = randomFor(seed, level, index);
    return level === 'easy' ? easy(index, r) : level === 'medium' ? medium(index, r) : hard(index, r);
  }
  function expectedOutput(q, supplied) {
    const n = supplied[0], b = supplied[1];
    switch (q.rule) {
      case 'div': return Math.trunc(n / q.k);
      case 'mod': return n % q.k;
      case 'add-div': return Math.trunc((n + q.c) / q.k);
      case 'add-mod': return (n + q.c) % q.k;
      case 'two-div': return Math.trunc(n / b);
      case 'two-mod': return n % b;
      case 'multiply-add': return n * q.k + q.c;
      case 'subtract-double': return n - q.c * 2;
      case 'real-div': return n / 2;
      case 'quotient-plus-rem': return Math.trunc(n / q.k) + n % q.k;
      default: return null;
    }
  }
  function tokenize(expr) {
    const result = [];
    let pos = 0;
    while (pos < expr.length) {
      const match = expr.slice(pos).match(/^\s*(DIV\b|MOD\b|[A-Za-z_]\w*|\d+(?:\.\d+)?|[()+*\/\-])\s*/i);
      if (!match) return null;
      result.push(match[1]); pos += match[0].length;
    }
    return result;
  }
  function evaluateExpression(expr, env) {
    const tokens = tokenize(expr); if (!tokens || tokens.length === 0) return null;
    let i = 0;
    function primary() {
      const token = tokens[i++]; if (!token) return null;
      if (token === '(') {
        const value = add(); if (tokens[i++] !== ')') return null;
        return value;
      }
      if (token === '-' || token === '+') {
        const value = primary(); return value === null ? null : token === '-' ? -value : value;
      }
      if (/^\d/.test(token)) return Number(token);
      return Object.prototype.hasOwnProperty.call(env, token.toLowerCase()) ? env[token.toLowerCase()] : null;
    }
    function multiply() {
      let value = primary(); if (value === null) return null;
      while (i < tokens.length && ['*', '/', 'DIV', 'MOD'].includes(tokens[i].toUpperCase())) {
        const op = tokens[i++].toUpperCase(); const right = primary();
        if (right === null || (right === 0 && ['/', 'DIV', 'MOD'].includes(op))) return null;
        if (op === '*') value *= right;
        if (op === '/') value /= right;
        if (op === 'DIV') value = Math.trunc(value / right);
        if (op === 'MOD') value %= right;
      }
      return value;
    }
    function add() {
      let value = multiply(); if (value === null) return null;
      while (i < tokens.length && ['+', '-'].includes(tokens[i])) {
        const op = tokens[i++]; const right = multiply(); if (right === null) return null;
        value = op === '+' ? value + right : value - right;
      }
      return value;
    }
    const value = add();
    return i === tokens.length && Number.isFinite(value) ? value : null;
  }
  function evaluateProgram(source, inputs) {
    const lines = String(source || '').replace(/\r/g, '').split('\n')
      .map(line => line.replace(/\/\/.*$/, '').trim()).filter(Boolean);
    if (!Array.isArray(inputs) || lines.length < inputs.length + 2 || lines.length > 12) return null;
    const env = Object.create(null);
    let inputCount = 0, processCount = 0, printCount = 0, output;
    for (const line of lines) {
      const printed = line.match(/^print\s*\(\s*(.+)\s*\)$/i);
      if (printed) {
        if (printCount || inputCount !== inputs.length || processCount < 1) return null;
        output = evaluateExpression(printed[1], env);
        if (output === null) return null;
        printCount++; continue;
      }
      if (printCount) return null;
      const statement = line.match(/^([A-Za-z_]\w*)\s*(?:=|:=|←)\s*(.+)$/);
      if (!statement) return null;
      const name = statement[1].toLowerCase(), rhs = statement[2].trim();
      if (/^(?:int\s*\(\s*)?input\s*\(\s*(?:"[^"]*"|'[^']*')?\s*\)\s*\)?$/i.test(rhs)) {
        if (inputCount >= inputs.length) return null;
        env[name] = inputs[inputCount++]; continue;
      }
      const value = evaluateExpression(rhs, env); if (value === null) return null;
      const usesOperator = /(?:\bDIV\b|\bMOD\b|[+*\/\-])/i.test(rhs);
      if (usesOperator) processCount++;
      env[name] = value;
    }
    return inputCount === inputs.length && processCount >= 1 && printCount === 1 ? output : null;
  }
  function checkAnswer(question, response) {
    if (question.type === 'choose') {
      const value = String(response ?? '').trim();
      return { complete: value !== '', correct: value === question.expected };
    }
    if (question.type === 'trace') {
      const value = String(response ?? '').trim();
      return { complete: value !== '', correct: value !== '' && Number.isFinite(Number(value)) && Math.abs(Number(value) - question.output) < 1e-9 };
    }
    const complete = String(response ?? '').trim() !== '';
    const examples = question.inputs === 2 ? [[19,4],[26,5],[43,6],[37,8],[28,3]] : [[11],[14],[23],[34],[47],[56]];
    return {
      complete,
      correct: complete && examples.every(inputs => {
        const actual = evaluateProgram(response, inputs);
        const expected = expectedOutput(question, inputs);
        return actual !== null && expected !== null && Math.abs(actual - expected) < 1e-9;
      })
    };
  }
  return { OPERATORS, makeQuestion, checkAnswer, calculate, expectedOutput, evaluateExpression, evaluateProgram };
});

/* OCR J277/02 Skill 04: sequence, input-process-output and safe ERL tracing. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.J277Paper2Sequence = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
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
  function easy(index, r) {
    const add = int(r, 2, 9), multiplier = int(r, 2, 4);
    const name = ['score', 'number', 'price', 'points', 'tickets'][index % 5];
    const result = ['total', 'answer', 'cost', 'newScore', 'finalValue'][index % 5];
    const operations = [
      result + ' = ' + name + ' + ' + add,
      result + ' = ' + name + ' * ' + multiplier,
      result + ' = ' + name + ' - ' + add,
      result + ' = ' + name + ' + ' + multiplier
    ];
    const steps = [
      name + ' = input("Enter ' + name + '")',
      operations[index % operations.length],
      'print(' + result + ')'
    ];
    const scrambled = steps.map((text, id) => ({ id, text }));
    for (let i = scrambled.length - 1; i > 0; i--) {
      const j = Math.floor(r() * (i + 1));
      [scrambled[i], scrambled[j]] = [scrambled[j], scrambled[i]];
    }
    if (scrambled.every((step, i) => step.id === i)) scrambled.push(scrambled.shift());
    return {
      level: 'easy', type: 'order',
      prompt: 'Tap the instructions in the correct order.',
      context: 'Build a short Input → Process → Output algorithm.',
      steps, scrambled, expected: steps.map((_, i) => i),
      hint: 'Get the input first, calculate a new value, then print it.',
      model: steps.join('\n'),
      explanation: 'The computer runs the statements from top to bottom.'
    };
  }
  function medium(index, r) {
    const n = int(r, 2, 12), change = int(r, 2, 7);
    const multiplier = int(r, 2, 4);
    const cases = [
      { input: n, code: ['score = input("Score")', 'total = score + ' + change, 'print(total)'], output: n + change, why: 'Add the amount after reading the input.' },
      { input: n, code: ['number = input("Number")', 'answer = number * ' + multiplier, 'print(answer)'], output: n * multiplier, why: 'The input is multiplied before it is printed.' },
      { input: n + change, code: ['tickets = input("Tickets")', 'left = tickets - ' + change, 'print(left)'], output: n, why: 'Subtract the amount from the supplied input.' },
      { input: n, code: ['x = input("Number")', 'y = x + ' + change, 'y = y * 2', 'print(y)'], output: (n + change) * 2, why: 'Each line uses the most recently calculated value.' },
      { input: n, code: ['n = input("Number")', 'result = n * ' + multiplier, 'result = result + 1', 'print(result)'], output: n * multiplier + 1, why: 'Multiply first, then add one.' },
      { input: n, code: ['value = input("Value")', 'copy = value', 'copy = copy + ' + change, 'print(copy)'], output: n + change, why: 'The copy is updated before being printed.' },
      { input: n, code: ['age = input("Age")', 'nextAge = age + 1', 'print(nextAge)'], output: n + 1, why: 'The new age is one more than the supplied age.' },
      { input: n, code: ['coins = input("Coins")', 'double = coins * 2', 'print(double)'], output: n * 2, why: 'Two times the input is printed.' },
      { input: n, code: ['price = input("Price")', 'discounted = price - 2', 'print(discounted)'], output: n - 2, why: 'The subtraction happens before the print.' },
      { input: n, code: ['start = input("Start")', 'endValue = start + ' + change, 'print(endValue)'], output: n + change, why: 'The final variable stores the updated input.' }
    ];
    const item = cases[index % cases.length];
    return {
      level: 'medium', type: 'trace', prompt: 'What number will be printed?',
      context: 'The input provided is ' + item.input + '. Follow each line in order.',
      ...item,
      hint: 'Write down the variable value after each assignment.',
      model: 'Output: ' + item.output,
      explanation: item.why
    };
  }
  function hard(index, r) {
    const amount = int(r, 2, 8), multiplier = int(r, 2, 4);
    const patterns = [
      { description: 'add ' + amount, rule: { first: '+', value: amount }, model: 'number = input("Number")\ntotal = number + ' + amount + '\nprint(total)' },
      { description: 'multiply it by ' + multiplier, rule: { first: '*', value: multiplier }, model: 'number = input("Number")\nanswer = number * ' + multiplier + '\nprint(answer)' },
      { description: 'subtract ' + amount, rule: { first: '-', value: amount }, model: 'value = input("Value")\nleft = value - ' + amount + '\nprint(left)' },
      { description: 'add ' + amount + ', then double the result', rule: { first: '+', value: amount, second: '*', secondValue: 2 }, model: 'x = input("Number")\ny = x + ' + amount + '\ny = y * 2\nprint(y)' },
      { description: 'double it, then add ' + amount, rule: { first: '*', value: 2, second: '+', secondValue: amount }, model: 'score = input("Score")\nscore = score * 2\nscore = score + ' + amount + '\nprint(score)' },
      { description: 'increase it by 1', rule: { first: '+', value: 1 }, model: 'age = input("Age")\nnextAge = age + 1\nprint(nextAge)' },
      { description: 'triple it', rule: { first: '*', value: 3 }, model: 'n = input("Number")\ntriple = n * 3\nprint(triple)' },
      { description: 'subtract ' + amount + ', then add 1', rule: { first: '-', value: amount, second: '+', secondValue: 1 }, model: 'n = input("Number")\nresult = n - ' + amount + '\nresult = result + 1\nprint(result)' },
      { description: 'add ' + amount, rule: { first: '+', value: amount }, model: 'start = input("Start")\nendValue = start + ' + amount + '\nprint(endValue)' },
      { description: 'multiply it by ' + multiplier, rule: { first: '*', value: multiplier }, model: 'value = input("Value")\nnewValue = value * ' + multiplier + '\nprint(newValue)' }
    ];
    const item = patterns[index % patterns.length];
    return {
      level: 'hard', type: 'write',
      prompt: 'Ask for a number, ' + item.description + ', then print the answer.',
      context: 'Write the input, processing and print statements in OCR ERL.',
      ...item,
      hint: 'Start with a variable = input("Prompt"), update a value, then print it.',
      explanation: 'The algorithm takes input, performs the calculation and outputs the answer.'
    };
  }
  function makeQuestion(level, index, seed) {
    if (!['easy', 'medium', 'hard'].includes(level) || !Number.isInteger(index) || index < 0) {
      throw new Error('Invalid sequence question');
    }
    const r = randomFor(seed, level, index);
    return level === 'easy' ? easy(index, r) : level === 'medium' ? medium(index, r) : hard(index, r);
  }
  function calculateRule(rule, value) {
    const apply = (left, op, right) => op === '+' ? left + right :
      op === '-' ? left - right : op === '*' ? left * right : null;
    const first = apply(value, rule.first, rule.value);
    return rule.second ? apply(first, rule.second, rule.secondValue) : first;
  }
  function evaluateProgram(source, suppliedInput) {
    const lines = String(source || '').replace(/\r/g, '').split('\n')
      .map(line => line.replace(/\/\/.*$/, '').trim()).filter(Boolean);
    if (lines.length < 3 || lines.length > 8) return null;
    const env = Object.create(null);
    let inputCount = 0, processCount = 0, printCount = 0, output;
    const identifier = '[A-Za-z_][A-Za-z_0-9]*';
    const assign = new RegExp('^(' + identifier + ')\\s*(?:=|:=|←)\\s*(.+)$');
    const operandPattern = '(?:' + identifier + '|-?\\d+)';
    const expression = new RegExp('^(' + operandPattern + ')(?:\\s*([+*\\-])\\s*(' + operandPattern + '))?$');
    const resolve = token => /^-?\d+$/.test(token) ? Number(token) :
      Object.prototype.hasOwnProperty.call(env, token.toLowerCase()) ? env[token.toLowerCase()] : null;
    for (const line of lines) {
      const printed = line.match(/^(?:print|output)\s*\(\s*([A-Za-z_][\w]*|-?\d+)\s*\)$/i);
      if (printed) {
        if (printCount || inputCount !== 1 || processCount < 1) return null;
        output = resolve(printed[1]);
        if (output === null) return null;
        printCount++;
        continue;
      }
      if (printCount) return null;
      const statement = line.match(assign);
      if (!statement) return null;
      const name = statement[1].toLowerCase(), rhs = statement[2].trim();
      if (/^(?:int\s*\(\s*)?input\s*\(\s*(?:"[^"]*"|'[^']*')?\s*\)\s*\)?$/i.test(rhs)) {
        if (inputCount) return null;
        env[name] = suppliedInput; inputCount++;
        continue;
      }
      const parts = rhs.match(expression);
      if (!parts) return null;
      const left = resolve(parts[1]);
      if (left === null) return null;
      let value = left;
      if (parts[2]) {
        const right = resolve(parts[3]);
        if (right === null) return null;
        value = parts[2] === '+' ? left + right : parts[2] === '-' ? left - right : left * right;
        processCount++;
      }
      if (!Number.isSafeInteger(value)) return null;
      env[name] = value;
    }
    return inputCount === 1 && processCount >= 1 && printCount === 1 ? output : null;
  }
  function checkAnswer(question, response) {
    if (question.type === 'order') {
      const actual = Array.isArray(response) ? response : [];
      return {
        complete: actual.length === question.expected.length,
        correct: actual.length === question.expected.length && actual.every((v, i) => v === question.expected[i])
      };
    }
    if (question.type === 'trace') {
      const text = String(response ?? '').trim();
      return { complete: text !== '', correct: /^-?\d+$/.test(text) && Number(text) === question.output };
    }
    const complete = String(response ?? '').trim() !== '';
    const inputs = [2, 7, 11];
    return {
      complete,
      correct: complete && inputs.every(n => evaluateProgram(response, n) === calculateRule(question.rule, n))
    };
  }
  return { makeQuestion, checkAnswer, evaluateProgram, calculateRule };
});

/* OCR J277/02 Skill 03: predictable, safe casting practice without eval(). */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.J277Paper2Casting = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const CASTS = ['int', 'str', 'real', 'bool'];
  const TYPES = ['Integer', 'Real', 'Boolean', 'String'];
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
  const choose = (r, list) => list[Math.floor(r() * list.length)];
  function easy(index, r) {
    const n = int(r, 2, 19);
    const decimal = choose(r, ['2.5', '3.75', '4.2', '7.5']);
    const cases = [
      { source: '"' + n + '"', sourceType: 'String', target: String(n), targetType: 'Integer', cast: 'int' },
      { source: String(n), sourceType: 'Integer', target: '"' + n + '"', targetType: 'String', cast: 'str' },
      { source: '"' + decimal + '"', sourceType: 'String', target: decimal, targetType: 'Real', cast: 'real' },
      { source: '"True"', sourceType: 'String', target: 'True', targetType: 'Boolean', cast: 'bool' },
      { source: '"' + (n + 20) + '"', sourceType: 'String', target: String(n + 20), targetType: 'Integer', cast: 'int' },
      { source: String(n), sourceType: 'Integer', target: n + '.0', targetType: 'Real', cast: 'real' },
      { source: 'True', sourceType: 'Boolean', target: '"True"', targetType: 'String', cast: 'str' },
      { source: '0', sourceType: 'Integer', target: 'False', targetType: 'Boolean', cast: 'bool' },
      { source: decimal, sourceType: 'Real', target: '"' + decimal + '"', targetType: 'String', cast: 'str' },
      { source: '"' + decimal + '"', sourceType: 'String', target: decimal, targetType: 'Real', cast: 'real' }
    ];
    const item = cases[index % cases.length];
    return {
      level: 'easy', type: 'choose', prompt: 'Which cast changes this value?',
      context: 'Tap the function that makes the change shown.',
      ...item, expected: item.cast,
      hint: 'int = whole number · real = decimal · str = text · bool = True/False.',
      model: item.cast + '(' + item.source + ')',
      explanation: item.cast + '() converts ' + item.sourceType.toLowerCase() +
        ' into ' + item.targetType.toLowerCase() + '.'
    };
  }
  function medium(index, r) {
    const a = int(r, 2, 9), b = int(r, 2, 9);
    const d = choose(r, ['2.5', '3.5', '4.5']);
    const cases = [
      { code: ['a = "' + a + '"', 'b = "' + b + '"', 'print(a + b)'], output: String(a) + b, typeName: 'String', why: 'Two strings join; the numbers are not added.' },
      { code: ['a = int("' + a + '")', 'b = int("' + b + '")', 'print(a + b)'], output: String(a + b), typeName: 'Integer', why: 'int() converts both strings to whole numbers before addition.' },
      { code: ['a = str(' + a + ')', 'print(a + "2")'], output: String(a) + '2', typeName: 'String', why: 'str() makes text, so + joins strings.' },
      { code: ['a = real("' + d + '")', 'print(a + 1)'], output: String(Number(d) + 1), typeName: 'Real', why: 'real() makes a decimal number so arithmetic is possible.' },
      { code: ['a = bool(0)', 'print(a)'], output: 'False', typeName: 'Boolean', why: 'The number 0 converts to Boolean False.' },
      { code: ['a = str(' + a + ')', 'b = str(' + b + ')', 'print(a + b)'], output: String(a) + b, typeName: 'String', why: 'Both numbers were cast to strings; + joins them.' },
      { code: ['a = int("0' + a + '")', 'print(a + 1)'], output: String(a + 1), typeName: 'Integer', why: 'int() removes the leading zero from the numeric value.' },
      { code: ['a = "' + a + '"', 'b = int(a)', 'print(b * 2)'], output: String(a * 2), typeName: 'Integer', why: 'int() converts the string before multiplication.' },
      { code: ['a = bool(1)', 'print(a)'], output: 'True', typeName: 'Boolean', why: 'The number 1 converts to Boolean True.' },
      { code: ['a = str(' + d + ')', 'print(a + "0")'], output: d + '0', typeName: 'String', why: 'The number becomes a string and "0" is joined onto it.' }
    ];
    const item = cases[index % cases.length];
    return {
      level: 'medium', type: 'trace', prompt: 'What is printed, and what type is it?',
      context: 'Follow the casts first, then enter the output and choose its data type.',
      ...item, hint: 'A cast changes the data type. Strings join with +; numbers add with +.',
      model: 'Output: ' + item.output + '\nData type: ' + item.typeName,
      explanation: item.why
    };
  }
  function hard(index, r) {
    const n = int(r, 2, 19);
    const decimal = choose(r, ['2.5', '3.75', '4.5']);
    const cases = [
      { source: '"' + n + '"', sourceType: 'String', targetType: 'Integer', cast: 'int', name: 'number' },
      { source: String(n), sourceType: 'Integer', targetType: 'String', cast: 'str', name: 'text' },
      { source: '"' + decimal + '"', sourceType: 'String', targetType: 'Real', cast: 'real', name: 'measurement' },
      { source: '0', sourceType: 'Integer', targetType: 'Boolean', cast: 'bool', name: 'isReady' },
      { source: '"0' + n + '"', sourceType: 'String', targetType: 'Integer', cast: 'int', name: 'value' },
      { source: decimal, sourceType: 'Real', targetType: 'String', cast: 'str', name: 'label' },
      { source: String(n), sourceType: 'Integer', targetType: 'Real', cast: 'real', name: 'result' },
      { source: '"True"', sourceType: 'String', targetType: 'Boolean', cast: 'bool', name: 'enabled' },
      { source: 'True', sourceType: 'Boolean', targetType: 'String', cast: 'str', name: 'message' },
      { source: '"' + (n + 10) + '"', sourceType: 'String', targetType: 'Integer', cast: 'int', name: 'score' }
    ];
    const item = cases[index % cases.length];
    return {
      level: 'hard', type: 'write',
      prompt: 'Convert ' + item.source + ' from ' + item.sourceType.toLowerCase() +
        ' to ' + item.targetType.toLowerCase() + '.',
      context: 'Write one OCR ERL assignment. Choose your own variable name.',
      ...item,
      model: item.name + ' = ' + item.cast + '(' + item.source + ')',
      hint: 'Put the original value inside the casting function.',
      explanation: item.cast + '() converts ' + item.sourceType.toLowerCase() +
        ' to ' + item.targetType.toLowerCase() + '.'
    };
  }
  function makeQuestion(level, index, seed) {
    if (!['easy', 'medium', 'hard'].includes(level) || !Number.isInteger(index) || index < 0) {
      throw new Error('Invalid casting question');
    }
    const r = randomFor(seed, level, index);
    return level === 'easy' ? easy(index, r) : level === 'medium' ? medium(index, r) : hard(index, r);
  }
  function classifyLiteral(raw) {
    const value = String(raw).trim();
    if (/^-?\d+$/.test(value)) return { type: 'Integer', value: String(Number(value)) };
    if (/^-?\d+\.\d+$/.test(value)) return { type: 'Real', value: String(Number(value)) };
    if (/^(True|False)$/i.test(value)) return { type: 'Boolean', value: value.toLowerCase() };
    if (/^"[^"\n]*"$/.test(value)) return { type: 'String', value: value.slice(1, -1) };
    return null;
  }
  function parseCastingAssignment(text) {
    const source = String(text ?? '').trim();
    const match = source.match(/^([A-Za-z_][A-Za-z_0-9]*)\s*(?:=|:=|←)\s*(int|str|real|float|bool)\s*\(\s*(.*?)\s*\)\s*;?$/i);
    if (!match || /[\r\n]/.test(source)) return null;
    const arg = classifyLiteral(match[3]);
    return arg ? { variable: match[1], cast: match[2].toLowerCase(), argument: arg } : null;
  }
  function checkAnswer(question, answer) {
    if (question.type === 'choose') return { complete: Boolean(answer), correct: answer === question.expected };
    if (question.type === 'trace') {
      const output = String(answer?.output ?? '').trim();
      const chosenType = String(answer?.typeName ?? '');
      const clean = /^(['"]).*\1$/.test(output) ? output.slice(1, -1) : output;
      const matches = question.typeName === 'String' ? clean === question.output :
        question.typeName === 'Boolean' ? clean.toLowerCase() === question.output.toLowerCase() :
        clean !== '' && Number(clean) === Number(question.output);
      return { complete: output !== '' && chosenType !== '', correct: matches && chosenType === question.typeName };
    }
    const complete = String(answer ?? '').trim() !== '';
    const parsed = parseCastingAssignment(answer), source = classifyLiteral(question.source);
    const cast = question.cast === 'real' && parsed?.cast === 'float' ? 'real' : parsed?.cast;
    return {
      complete,
      correct: Boolean(parsed && source && cast === question.cast &&
        parsed.argument.type === source.type && parsed.argument.value === source.value)
    };
  }
  return { CASTS, TYPES, makeQuestion, classifyLiteral, parseCastingAssignment, checkAnswer };
});

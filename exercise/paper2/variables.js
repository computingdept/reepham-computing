/* OCR J277 Paper 2 — Skill 01. Pure question generation and answer checking.
   This file is deliberately independent of the hub's UI and saved progress. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.J277Paper2Variables = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  function randomFor(seed, level, index) {
    let n = (Number(seed) || 1) | 0;
    const key = level + ':' + index;
    for (const c of key) n = (Math.imul(n, 31) + c.charCodeAt(0)) | 0;
    return function () {
      n = (n + 0x6D2B79F5) | 0;
      let t = Math.imul(n ^ (n >>> 15), 1 | n);
      t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const int = (r, low, high) => low + Math.floor(r() * (high - low + 1));
  const pick = (r, choices) => choices[int(r, 0, choices.length - 1)];
  const variableNames = ['score', 'lives', 'coins', 'points', 'level', 'tickets'];
  const constants = [
    ['MAX_LIVES', 3, 'lives'], ['START_LEVEL', 1, 'level'],
    ['MAX_SCORE', 20, 'score'], ['BONUS', 5, 'points']
  ];

  function makeEasy(index, r) {
    const name = pick(r, variableNames);
    if (index % 5 === 3) {
      const [constant, value, changing] = pick(r, constants);
      const askConstant = index % 2 === 1;
      return {
        level: 'easy', type: 'identify', prompt: askConstant ? 'Tap the constant.' : 'Tap the variable.',
        context: 'One value must stay the same. The other can change while the program runs.',
        code: [`${constant} = ${value}    // constant`, `${changing} = ${int(r, 1, 9)}    // variable`],
        options: [constant, changing], expected: askConstant ? constant : changing,
        hint: 'A constant stays fixed. A variable can be assigned a new value.',
        model: `${constant} is a constant; ${changing} is a variable.`,
        explanation: 'Constants keep their value; variables can be updated.'
      };
    }
    const initial = int(r, 3, 10);
    const replace = index % 5 === 2;
    const delta = int(r, 1, 4) * (int(r, 0, 1) ? 1 : -1);
    let finalValue = replace ? int(r, 1, 13) : Math.max(0, initial + delta);
    if (replace && finalValue === initial) finalValue = initial === 13 ? 12 : initial + 1;
    const operation = replace ? `${name} = ${finalValue}` :
      `${name} = ${name} ${delta < 0 ? '-' : '+'} ${Math.abs(delta)}`;
    return {
      level: 'easy', type: 'tap-value', prompt: `Set the new value of ${name}.`,
      context: 'Read the assignments. Tap + or − until the variable shows its final value.',
      code: [`${name} = ${initial}`, operation], name, initial, expected: finalValue,
      hint: replace ? 'The second assignment replaces the old value.' :
        'Start with ' + initial + ', then follow the second line.',
      model: `${name} finishes with the value ${finalValue}.`,
      explanation: replace ? `The second assignment replaces ${initial} with ${finalValue}.` :
        `${initial} ${delta < 0 ? '−' : '+'} ${Math.abs(delta)} = ${finalValue}.`
    };
  }

  function makeMedium(index, r) {
    const name = pick(r, variableNames);
    const start = int(r, 3, 13);
    let code, expected, hint, explanation, target = name;
    switch (index % 5) {
      case 0: {
        const add = int(r, 2, 7), subtract = int(r, 1, 3);
        code = [`${name} = ${start}`, `${name} = ${name} + ${add}`, `${name} = ${name} - ${subtract}`];
        expected = start + add - subtract;
        hint = 'After each line, replace the previous value of ' + name + '.';
        explanation = `${start} + ${add} − ${subtract} = ${expected}.`;
        break;
      }
      case 1: {
        const newValue = int(r, 1, 15);
        code = [`${name} = ${start}`, `${name} = ${name} + ${int(r, 2, 5)}`, `${name} = ${newValue}`];
        expected = newValue;
        hint = 'The last assignment overwrites the value calculated earlier.';
        explanation = `The last line assigns ${newValue}; it replaces the old value.`;
        break;
      }
      case 2: {
        const bonus = int(r, 2, 6);
        code = [`BONUS = ${bonus}    // constant`, `${name} = ${start}`, `${name} = ${name} + BONUS`];
        expected = start + bonus;
        hint = 'BONUS is a constant. Use its fixed value in the last line.';
        explanation = `${start} + ${bonus} = ${expected}. BONUS stays ${bonus}.`;
        break;
      }
      case 3: {
        const copy = name === 'score' ? 'total' : 'score';
        const add = int(r, 2, 6);
        code = [`${name} = ${start}`, `${copy} = ${name}`, `${copy} = ${copy} + ${add}`];
        expected = start + add; target = copy;
        hint = `${copy} first copies ${name}, then its own value changes.`;
        explanation = `${copy} copies ${start}, then becomes ${start} + ${add} = ${expected}.`;
        break;
      }
      default: {
        const change = int(r, 2, 7);
        code = [`${name} = ${start}`, `${name} = ${name} - ${change}`, `${name} = ${name} + ${change}`];
        expected = start;
        hint = 'Subtracting and then adding the same number returns to the start.';
        explanation = `${start} − ${change} + ${change} = ${expected}.`;
      }
    }
    return {
      level: 'medium', type: 'trace', prompt: `What is the final value of ${target}?`,
      context: 'Follow each assignment in order. Enter one whole number.',
      code, expected, hint, model: `${target} = ${expected}`, explanation
    };
  }

  function makeHard(index, r) {
    const start = int(r, 2, 12);
    const amount = int(r, 2, 7);
    switch (index % 6) {
      case 0: return {
        level: 'hard', type: 'write', rule: 'add', start, amount,
        prompt: `Store ${start}, then increase the value by ${amount}.`,
        context: 'Write two ERL assignment lines. You may choose the variable name.',
        hint: 'The second line must use the variable’s previous value.',
        model: `score = ${start}\nscore = score + ${amount}`,
        explanation: `The value changes from ${start} to ${start + amount}.`
      };
      case 1: return {
        level: 'hard', type: 'write', rule: 'subtract', start, amount,
        prompt: `Store ${start}, then decrease the value by ${amount}.`,
        context: 'Write two ERL assignment lines. You may choose the variable name.',
        hint: 'Read the old value on the right of the assignment.',
        model: `lives = ${start}\nlives = lives - ${amount}`,
        explanation: `The value changes from ${start} to ${start - amount}.`
      };
      case 2: {
        const replacement = int(r, 1, 12);
        return {
          level: 'hard', type: 'write', rule: 'replace', start, replacement,
          prompt: `Store ${start}, then replace it with ${replacement}.`,
          context: 'Write two ERL assignment lines using one variable name.',
          hint: 'An assignment with a number on the right overwrites the old value.',
          model: `coins = ${start}\ncoins = ${replacement}`,
          explanation: `The final value is ${replacement}, not ${start + replacement}.`
        };
      }
      case 3: {
        const subtract = int(r, 1, 5);
        return {
          level: 'hard', type: 'write', rule: 'two-updates', start, amount, subtract,
          prompt: `Store ${start}, add ${amount}, then subtract ${subtract}.`,
          context: 'Write three ERL assignment lines using one variable name.',
          hint: 'Update the same variable twice, using its latest value each time.',
          model: `points = ${start}\npoints = points + ${amount}\npoints = points - ${subtract}`,
          explanation: `The values are ${start}, ${start + amount} and ${start + amount - subtract}.`
        };
      }
      case 4: {
        const bonus = int(r, 2, 6);
        return {
          level: 'hard', type: 'write', rule: 'constant', start, bonus,
          prompt: `Set constant BONUS to ${bonus}. Store ${start} in a variable, then add BONUS to it.`,
          context: 'Write three ERL assignment lines. Keep BONUS unchanged.',
          hint: 'Assign BONUS first, then refer to BONUS by name in the final calculation.',
          model: `BONUS = ${bonus}    // constant\nscore = ${start}\nscore = score + BONUS`,
          explanation: `BONUS stays ${bonus}; the variable becomes ${start + bonus}.`
        };
      }
      default: return {
        level: 'hard', type: 'write', rule: 'copy', start, amount,
        prompt: `Store ${start} in a variable. Copy it to a second variable, then increase only the copy by ${amount}.`,
        context: 'Write three ERL assignment lines. Choose two different names.',
        hint: 'The second assignment should read the first variable; the third should update the copy.',
        model: `original = ${start}\ncopy = original\ncopy = copy + ${amount}`,
        explanation: `The original stays ${start}; the copy becomes ${start + amount}.`
      };
    }
  }

  function makeQuestion(level, index, seed) {
    if (!['easy', 'medium', 'hard'].includes(level)) throw new Error('Unknown difficulty');
    if (!Number.isInteger(index) || index < 0) throw new Error('Invalid question index');
    const r = randomFor(seed, level, index);
    return level === 'easy' ? makeEasy(index, r) : level === 'medium' ? makeMedium(index, r) : makeHard(index, r);
  }

  function readExpression(expression, env) {
    const source = expression.trim();
    const token = '[A-Za-z_][A-Za-z_0-9]*|-?\\d+';
    const match = source.match(new RegExp('^(' + token + ')(?:\\s*([+\\-])\\s*(' + token + '))?$'));
    if (!match) return null;
    const resolve = part => {
      if (/^-?\d+$/.test(part)) return Number(part);
      const id = part.toUpperCase();
      return Object.prototype.hasOwnProperty.call(env, id) ? env[id] : null;
    };
    const first = resolve(match[1]);
    if (first === null) return null;
    if (!match[2]) return { value: first, references: /^[A-Za-z_]/.test(match[1]) ? [match[1].toUpperCase()] : [] };
    const second = resolve(match[3]);
    if (second === null) return null;
    const references = [match[1], match[3]].filter(v => /^[A-Za-z_]/.test(v)).map(v => v.toUpperCase());
    return { value: match[2] === '+' ? first + second : first - second, references };
  }

  // Deliberately interpret a safe, small assignment-only subset of OCR ERL.
  // No eval(), Function(), arbitrary statements or user-supplied JavaScript.
  function parseAssignments(source) {
    const text = String(source || '').replace(/\r/g, '');
    const lines = text.split(/[;\n]/).map(line => line.replace(/\/\/.*$/, '').trim()).filter(Boolean);
    if (lines.length > 8) return null;
    const env = Object.create(null), steps = [];
    for (const line of lines) {
      const match = line.match(/^(?:(?:const|constant)\s+)?([A-Za-z_][A-Za-z_0-9]*)\s*(?:=|:=|←)\s*(.+)$/i);
      if (!match) return null;
      const name = match[1].toUpperCase();
      const result = readExpression(match[2], env);
      if (!result || !Number.isSafeInteger(result.value)) return null;
      env[name] = result.value;
      steps.push({ name, value: result.value, references: result.references });
    }
    return steps;
  }

  function checkHard(question, text) {
    const steps = parseAssignments(text);
    if (!steps) return { complete: String(text || '').trim() !== '', correct: false };
    const [a, b, c] = steps;
    const same = b && a && b.name === a.name;
    const updates = step => step && step.references.includes(step.name);
    let correct = false;
    switch (question.rule) {
      case 'add': correct = steps.length === 2 && same && a.value === question.start &&
        updates(b) && b.value === question.start + question.amount; break;
      case 'subtract': correct = steps.length === 2 && same && a.value === question.start &&
        updates(b) && b.value === question.start - question.amount; break;
      case 'replace': correct = steps.length === 2 && same && a.value === question.start &&
        b.references.length === 0 && b.value === question.replacement; break;
      case 'two-updates': correct = steps.length === 3 && same && c.name === a.name &&
        a.value === question.start && updates(b) && updates(c) &&
        b.value === question.start + question.amount &&
        c.value === question.start + question.amount - question.subtract; break;
      case 'constant': correct = steps.length === 3 && a.name === 'BONUS' && a.value === question.bonus &&
        b.name !== a.name && b.value === question.start && c.name === b.name &&
        c.references.includes(c.name) && c.references.includes('BONUS') &&
        c.value === question.start + question.bonus; break;
      case 'copy': correct = steps.length === 3 && a.name !== b.name &&
        a.value === question.start && b.value === question.start &&
        b.references.includes(a.name) && c.name === b.name &&
        updates(c) && c.value === question.start + question.amount; break;
    }
    return { complete: true, correct };
  }

  function checkAnswer(question, response) {
    if (question.type === 'write') return checkHard(question, response);
    if (question.type === 'identify') return { complete: Boolean(response), correct: response === question.expected };
    if (question.type === 'tap-value') return {
      complete: Number.isInteger(response), correct: response === question.expected
    };
    const raw = String(response ?? '').trim();
    return { complete: raw !== '', correct: /^-?\d+$/.test(raw) && Number(raw) === question.expected };
  }

  return { makeQuestion, checkAnswer, parseAssignments };
});

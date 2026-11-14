/* OCR J277/02 Skill 10: zero-indexed 1D arrays, reading and updating values. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.J277Paper2Array1D = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const LEVELS = ['easy', 'medium', 'hard'];

  function randomFor(seed, level, index) {
    let n = (Number(seed) || 1) | 0;
    for (const char of level + ':' + index) n = (Math.imul(n, 31) + char.charCodeAt(0)) | 0;
    return function () {
      n = (n + 0x6D2B79F5) | 0;
      let t = Math.imul(n ^ (n >>> 15), 1 | n);
      t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const pick = (r, lo, hi) => lo + Math.floor(r() * (hi - lo + 1));
  function uniqueValues(r, length) {
    const pool = Array.from({length: 27}, (_, i) => i + 2);
    for (let i = pool.length - 1; i > 0; i--) {
      const j = pick(r, 0, i);
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool.slice(0, length);
  }
  const declaration = values => 'array scores = [' + values.join(', ') + ']';

  function easy(index, r) {
    const values = uniqueValues(r, 5);
    const target = pick(r, 0, 4);
    const code = [declaration(values)];
    let prompt, context, hint, explanation;
    if (index < 4) {
      code.push('print(scores[' + target + '])');
      prompt = 'Tap the value at index ' + target + '.';
      context = 'The first cell is index 0, not index 1.';
      hint = 'Count from 0 under the array until you reach index ' + target + '.';
      explanation = 'Index ' + target + ' holds ' + values[target] + '. The print statement outputs ' + values[target] + '.';
    } else if (index < 7) {
      prompt = 'Tap the cell holding ' + values[target] + '.';
      context = 'Look at the values, then read the index underneath.';
      hint = 'Find the value ' + values[target] + ' in the array row.';
      explanation = values[target] + ' is stored at index ' + target + '.';
    } else {
      code.push('scores[' + target + '] = ' + pick(r, 30, 59));
      prompt = 'Tap the cell that will change.';
      context = 'The number in square brackets selects the position to update.';
      hint = 'Look at the index inside scores[...].';
      explanation = 'Only the cell at index ' + target + ' changes. Every other cell stays the same.';
    }
    return {
      level: 'easy', type: 'cell', values, code, prompt, context, hint,
      expected: String(target), model: 'Index ' + target + ' → ' + values[target], explanation
    };
  }

  function medium(index, r) {
    const values = uniqueValues(r, 5).map(n => n % 9 + 1);
    const [a, b, c, d, e] = values;
    const j = pick(r, 0, 4), k = (j + pick(r, 1, 4)) % 5;
    const delta = pick(r, 2, 6);
    const code = [declaration(values)];
    let answer, why;
    switch (index) {
      case 0:
        code.push('print(scores[' + j + '])');
        answer = values[j]; why = 'Index ' + j + ' starts at 0 and holds ' + answer + '.'; break;
      case 1:
        code.push('scores[' + j + '] = ' + delta, 'print(scores[' + j + '])');
        answer = delta; why = 'The assignment replaces the original value at index ' + j + ' with ' + delta + '.'; break;
      case 2:
        code.push('total = scores[0] + scores[2]', 'print(total)');
        answer = a + c; why = 'Add the values at indices 0 and 2: ' + a + ' + ' + c + '.'; break;
      case 3:
        code.push('scores[' + j + '] = scores[' + j + '] + ' + delta, 'print(scores[' + j + '])');
        answer = values[j] + delta; why = 'The old value ' + values[j] + ' increases by ' + delta + '.'; break;
      case 4:
        code.push('temp = scores[' + j + ']', 'scores[' + j + '] = scores[' + k + ']', 'scores[' + k + '] = temp', 'print(scores[' + j + '])');
        answer = values[k]; why = 'The two elements swap. Index ' + j + ' now holds the old value from index ' + k + ': ' + answer + '.'; break;
      case 5:
        code.push('position = ' + j, 'print(scores[position])');
        answer = values[j]; why = 'position is ' + j + ', so scores[position] means scores[' + j + '].'; break;
      case 6:
        code.push('total = 0', 'for i = 0 to 4', '    total = total + scores[i]', 'next i', 'print(total)');
        answer = values.reduce((sum, n) => sum + n, 0);
        why = 'The loop visits indices 0, 1, 2, 3 and 4. Add all five values: ' + values.join(' + ') + '.'; break;
      case 7:
        code.push('scores[3] = scores[1] + scores[2]', 'print(scores[3])');
        answer = b + c; why = 'Replace index 3 with the sum of indices 1 and 2: ' + b + ' + ' + c + '.'; break;
      case 8:
        code.push('scores[0] = scores[4]', 'print(scores[0])');
        answer = e; why = 'The value from the final cell, index 4, is copied into index 0.'; break;
      default:
        code.push('total = 0', 'for i = 0 to 4 step 2', '    total = total + scores[i]', 'next i', 'print(total)');
        answer = a + c + e;
        why = 'STEP 2 visits indices 0, 2 and 4. Add ' + a + ' + ' + c + ' + ' + e + '.';
    }
    return {
      level: 'medium', type: 'number', values, code, expected: answer,
      prompt: 'What number will be printed?',
      context: 'Follow each line, using the latest value stored in every cell.',
      hint: 'Write the array indices 0–4 above the values. Update a cell as soon as an assignment runs.',
      model: 'Output: ' + answer, explanation: why + ' Output: ' + answer + '.'
    };
  }

  function hard(index, r) {
    const values = uniqueValues(r, 5).map(n => n % 9 + 1);
    const j = pick(r, 0, 3), k = j + 1;
    const change = pick(r, 2, 8);
    const tasks = [
      ['Print the element at index ' + j + '.', ['print(scores[' + j + '])']],
      ['Replace the element at index ' + j + ' with ' + change + '.', ['scores[' + j + '] = ' + change]],
      ['Increase the value at index ' + j + ' by ' + change + '.', ['scores[' + j + '] = scores[' + j + '] + ' + change]],
      ['Copy the value at index ' + j + ' into the variable total.', ['total = scores[' + j + ']']],
      ['Copy the value at index ' + k + ' into index ' + j + '.', ['scores[' + j + '] = scores[' + k + ']']],
      ['Print the last element in this five-element array.', ['print(scores[4])']],
      ['Double the number stored at index ' + j + '.', ['scores[' + j + '] = scores[' + j + '] * 2']],
      ['Store the sum of indices ' + j + ' and ' + k + ' in total.', ['total = scores[' + j + '] + scores[' + k + ']']],
      ['Replace index ' + j + ' with 1 more than the value at index ' + k + '.', ['scores[' + j + '] = scores[' + k + '] + 1']],
      ['Print the values at indices ' + j + ' and ' + k + ' on separate lines.', ['print(scores[' + j + '])', 'print(scores[' + k + '])']]
    ];
    const [task, lines] = tasks[index % tasks.length];
    return {
      level: 'hard', type: 'write', values, code: [declaration(values)],
      prompt: 'Write the OCR ERL statement' + (lines.length > 1 ? 's' : '') + '.',
      context: task + ' Use the array name scores and the variable names given.',
      hint: 'Index 0 means the first value. Use scores[index], = for assignment, and print(...) for output.',
      model: lines.join('\n'), expected: lines.join('\n'),
      explanation: 'A correct solution is: ' + lines.join('  /  ') + '. A different valid algorithm may also work.'
    };
  }

  function makeQuestion(level, index, seed) {
    if (!LEVELS.includes(level) || !Number.isInteger(index) || index < 0 || index > 9) throw new Error('Invalid 1D array question');
    const r = randomFor(seed, level, index);
    return level === 'easy' ? easy(index, r) : level === 'medium' ? medium(index, r) : hard(index, r);
  }
  function normaliseLines(source) {
    return String(source ?? '').replace(/\r/g, '').split('\n').map(line =>
      line.trim().replace(/\s*(?:←|:=)\s*/g, '=').replace(/\s+/g, '').toLowerCase()
    ).filter(Boolean).join('\n');
  }
  function checkAnswer(q, response) {
    const entered = String(response ?? '').trim();
    if (!entered) return {complete: false, correct: false};
    if (q.type === 'cell') return {complete: true, correct: entered === q.expected};
    if (q.type === 'number') return {complete: true, correct: Number.isFinite(Number(entered)) && Number(entered) === q.expected};
    if (q.type === 'write') {
      const actual = normaliseLines(entered);
      const expected = normaliseLines(q.expected);
      if (actual === expected) return {complete: true, correct: true};
      // Addition is commutative: accept the equivalent order on sum tasks.
      if (q.expected.startsWith('total = scores[') && q.expected.includes(' + scores[')) {
        const parts = q.expected.match(/^total = (scores\[\d+\]) \+ (scores\[\d+\])$/);
        if (parts && actual === normaliseLines('total = ' + parts[2] + ' + ' + parts[1])) return {complete: true, correct: true};
      }
      return {complete: true, correct: false};
    }
    return {complete: true, correct: false};
  }
  return {makeQuestion, checkAnswer, normaliseLines};
});

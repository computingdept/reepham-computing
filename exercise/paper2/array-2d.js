/* OCR J277/02 Skill 11: row-first, zero-indexed 2D arrays. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.J277Paper2Array2D = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const LEVELS = ['easy', 'medium', 'hard'];
  const ROWS = 3, COLS = 4;
  const address = (row, col) => 'seats[' + row + ',' + col + ']';

  function randomFor(seed, level, index) {
    let n = (Number(seed) || 1) | 0;
    for (const ch of level + ':' + index) n = (Math.imul(n, 31) + ch.charCodeAt(0)) | 0;
    return function () {
      n = (n + 0x6D2B79F5) | 0;
      let t = Math.imul(n ^ (n >>> 15), 1 | n);
      t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const pick = (r, lo, hi) => lo + Math.floor(r() * (hi - lo + 1));
  function matrix(r) {
    const pool = Array.from({length: 30}, (_, n) => n + 2);
    for (let i = pool.length - 1; i > 0; i--) {
      const j = pick(r, 0, i);
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    const chosen = pool.slice(0, ROWS * COLS);
    return Array.from({length: ROWS}, (_, row) => chosen.slice(row * COLS, (row + 1) * COLS));
  }
  const declaration = 'array seats[3,4]';
  function position(r) { return [pick(r, 0, ROWS - 1), pick(r, 0, COLS - 1)]; }
  function another(r, row, col) {
    const other = (row * COLS + col + pick(r, 1, ROWS * COLS - 1)) % (ROWS * COLS);
    return [Math.floor(other / COLS), other % COLS];
  }

  function easy(index, r) {
    const values = matrix(r);
    const [row, col] = position(r);
    const code = [declaration];
    let prompt, context, hint, explanation;
    if (index < 4) {
      code.push('print(' + address(row, col) + ')');
      prompt = 'Tap the cell at row ' + row + ', column ' + col + '.';
      context = 'The first index is the row. The second is the column.';
      hint = 'Find row ' + row + ' on the left, then column ' + col + ' across the top.';
      explanation = 'Row ' + row + ', column ' + col + ': ' + address(row, col) + ' holds ' + values[row][col] + '.';
    } else if (index < 7) {
      prompt = 'Tap the cell containing ' + values[row][col] + '.';
      context = 'Read the row and column labels around the grid.';
      hint = 'Find ' + values[row][col] + ', then read both its row and column.';
      explanation = values[row][col] + ' is at row ' + row + ', column ' + col + '.';
    } else {
      code.push(address(row, col) + ' = ' + pick(r, 32, 69));
      prompt = 'Tap the cell that will change.';
      context = 'The two numbers inside the brackets select one position.';
      hint = 'In ' + address(row, col) + ', the row is ' + row + ' and the column is ' + col + '.';
      explanation = 'The assignment changes only row ' + row + ', column ' + col + '.';
    }
    return {
      level: 'easy', type: 'cell', values, code, prompt, context, hint,
      expected: row + ',' + col, model: 'Row ' + row + ' → Column ' + col,
      explanation
    };
  }

  function medium(index, r) {
    const values = matrix(r).map(line => line.map(value => value % 9 + 1));
    const [row, col] = position(r);
    const [otherRow, otherCol] = another(r, row, col);
    const first = address(row, col), second = address(otherRow, otherCol);
    const a = values[row][col], b = values[otherRow][otherCol];
    const n = pick(r, 2, 7);
    const code = [declaration];
    let expected, explanation;
    switch (index) {
      case 0:
        code.push('print(' + first + ')');
        expected = a; explanation = first + ' contains ' + a + '.'; break;
      case 1:
        code.push(first + ' = ' + n, 'print(' + first + ')');
        expected = n; explanation = 'Replace the old value at ' + first + ' with ' + n + '.'; break;
      case 2:
        code.push('total = ' + first + ' + ' + second, 'print(total)');
        expected = a + b; explanation = a + ' + ' + b + ' = ' + expected + '.'; break;
      case 3:
        code.push(first + ' = ' + first + ' + ' + n, 'print(' + first + ')');
        expected = a + n; explanation = 'Update ' + first + ' from ' + a + ' to ' + expected + '.'; break;
      case 4:
        code.push(first + ' = ' + second, 'print(' + first + ')');
        expected = b; explanation = 'Copy ' + b + ' from ' + second + ' into ' + first + '.'; break;
      case 5:
        code.push('temp = ' + first, first + ' = ' + second, second + ' = temp', 'print(' + first + ')');
        expected = b; explanation = 'Swap two cells. ' + first + ' now contains the old value ' + b + '.'; break;
      case 6:
        code.push('total = 0', 'for c = 0 to 3', '    total = total + seats[' + row + ',c]', 'next c', 'print(total)');
        expected = values[row].reduce((sum, value) => sum + value, 0);
        explanation = 'The loop adds every value in row ' + row + ': ' + values[row].join(' + ') + '.'; break;
      case 7:
        code.push('total = 0', 'for r = 0 to 2', '    total = total + seats[r,' + col + ']', 'next r', 'print(total)');
        expected = values.reduce((sum, line) => sum + line[col], 0);
        explanation = 'The loop adds column ' + col + ' across rows 0, 1 and 2.'; break;
      case 8:
        code.push('r = ' + row, 'c = ' + col, 'print(seats[r,c])');
        expected = a; explanation = 'r is ' + row + ' and c is ' + col + ', so seats[r,c] is ' + first + '.'; break;
      default:
        code.push('total = 0', 'for r = 0 to 2', '    for c = 0 to 3', '        total = total + seats[r,c]', '    next c', 'next r', 'print(total)');
        expected = values.flat().reduce((sum, value) => sum + value, 0);
        explanation = 'The nested loops visit all 12 cells and add their values.';
    }
    return {
      level: 'medium', type: 'number', values, code, expected,
      prompt: 'What number will be printed?',
      context: 'Use the grid shown. The first index is the row, the second the column.',
      hint: 'Trace the code line by line. If a cell is assigned a new value, use that new value from then on.',
      model: 'Output: ' + expected, explanation: explanation + ' Output: ' + expected + '.'
    };
  }

  function hard(index, r) {
    const values = matrix(r).map(line => line.map(value => value % 9 + 1));
    const [row, col] = position(r);
    const [otherRow, otherCol] = another(r, row, col);
    const first = address(row, col), second = address(otherRow, otherCol);
    const n = pick(r, 2, 8);
    const tasks = [
      ['Print the value at row ' + row + ', column ' + col + '.', ['print(' + first + ')']],
      ['Replace the value at row ' + row + ', column ' + col + ' with ' + n + '.', [first + ' = ' + n]],
      ['Increase the value at row ' + row + ', column ' + col + ' by ' + n + '.', [first + ' = ' + first + ' + ' + n]],
      ['Copy the value at row ' + row + ', column ' + col + ' into total.', ['total = ' + first]],
      ['Copy the value in ' + second + ' into ' + first + '.', [first + ' = ' + second]],
      ['Print the last value in the last row of this 3×4 array.', ['print(seats[2,3])']],
      ['Double the value in ' + first + '.', [first + ' = ' + first + ' * 2']],
      ['Store the sum of ' + first + ' and ' + second + ' in total.', ['total = ' + first + ' + ' + second]],
      ['Make ' + first + ' one more than ' + second + '.', [first + ' = ' + second + ' + 1']],
      ['Print ' + first + ' and ' + second + ' on separate lines.', ['print(' + first + ')', 'print(' + second + ')']]
    ];
    const [task, lines] = tasks[index];
    return {
      level: 'hard', type: 'write', values, code: [declaration],
      prompt: 'Write the OCR ERL statement' + (lines.length > 1 ? 's' : '') + '.',
      context: task + ' Use the array name seats.',
      hint: 'Use seats[row,column] with row first. Both indices start at zero.',
      expected: lines.join('\n'), model: lines.join('\n'),
      explanation: 'A correct solution is ' + lines.join(' / ') + '.'
    };
  }

  function makeQuestion(level, index, seed) {
    if (!LEVELS.includes(level) || !Number.isInteger(index) || index < 0 || index > 9) throw new Error('Invalid 2D array question');
    const r = randomFor(seed, level, index);
    return level === 'easy' ? easy(index, r) : level === 'medium' ? medium(index, r) : hard(index, r);
  }
  function normaliseLines(source) {
    return String(source ?? '').replace(/\r/g, '').split('\n').map(line =>
      line.trim().replace(/\s*(?:←|:=)\s*/g, '=').replace(/\s+/g, '')
        .replace(/seats\[(\d+)\]\[(\d+)\]/gi, 'seats[$1,$2]').toLowerCase()
    ).filter(Boolean).join('\n');
  }
  function checkAnswer(q, response) {
    const input = String(response ?? '').trim();
    if (!input) return {complete: false, correct: false};
    if (q.type === 'cell') return {complete: true, correct: input === q.expected};
    if (q.type === 'number') return {complete: true, correct: Number.isFinite(Number(input)) && Number(input) === q.expected};
    if (q.type === 'write') {
      const actual = normaliseLines(input), expected = normaliseLines(q.expected);
      if (actual === expected) return {complete: true, correct: true};
      const match = q.expected.match(/^total = (seats\[\d+,\d+\]) \+ (seats\[\d+,\d+\])$/);
      if (match && actual === normaliseLines('total = ' + match[2] + ' + ' + match[1])) return {complete: true, correct: true};
      return {complete: true, correct: false};
    }
    return {complete: true, correct: false};
  }
  return {ROWS, COLS, makeQuestion, checkAnswer, normaliseLines};
});

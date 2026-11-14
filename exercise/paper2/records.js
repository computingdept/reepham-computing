/* OCR J277/02 Skill 12: records group named fields of different data types.
   Field-access notation here is an illustrative teaching convention, not
   a claim that OCR prescribes one record declaration syntax. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.J277Paper2Records = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const LEVELS = ['easy', 'medium', 'hard'];
  const FIELD_NAMES = ['name', 'score', 'house', 'active'];
  const TYPES = {name: 'String', score: 'Integer', house: 'String', active: 'Boolean'};
  const names = ['Asha', 'Ben', 'Mia', 'Sam', 'Leo', 'Zara', 'Noor', 'Ella'];
  const houses = ['Red', 'Blue', 'Green', 'Yellow'];

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
  function startingRecord(r) {
    return {
      name: names[pick(r, 0, names.length - 1)],
      score: pick(r, 8, 25),
      house: houses[pick(r, 0, houses.length - 1)],
      active: r() < 0.5
    };
  }
  const display = value => typeof value === 'boolean' ? (value ? 'True' : 'False') : String(value);
  const quote = value => typeof value === 'string' ? '"' + value + '"' : display(value);
  const fieldAccess = key => 'player.' + key;

  function easy(index, r) {
    const values = startingRecord(r);
    const key = FIELD_NAMES[index % FIELD_NAMES.length];
    const code = [];
    let prompt, context, hint, explanation;
    if (index < 4) {
      code.push('print(' + fieldAccess(key) + ')');
      prompt = 'Tap the ' + key + ' field.';
      context = 'Each named field stores one part of this player record.';
      hint = 'Read the field names: name, score, house and active.';
      explanation = fieldAccess(key) + ' stores ' + quote(values[key]) + '.';
    } else if (index < 7) {
      prompt = 'Tap the field containing ' + quote(values[key]) + '.';
      context = 'A record can store several different data types together.';
      hint = 'Look at the values. Then read the field name above the matching value.';
      explanation = 'The ' + key + ' field contains ' + quote(values[key]) + '.';
    } else {
      const changed = key === 'score' ? pick(r, 30, 50) : key === 'active' ? !values.active :
        key === 'name' ? 'Kai' : 'Purple';
      code.push(fieldAccess(key) + ' = ' + quote(changed));
      prompt = 'Tap the field that will change.';
      context = 'An assignment updates one named field of the record.';
      hint = 'Look after player. in the assignment.';
      explanation = 'Only the ' + key + ' field is updated.';
    }
    return {level: 'easy', type: 'field', values, types: TYPES, code,
      prompt, context, hint, expected: key, model: fieldAccess(key), explanation};
  }

  function medium(index, r) {
    const values = startingRecord(r), n = pick(r, 2, 9);
    const code = [];
    let expected, why;
    switch (index) {
      case 0:
        code.push('print(player.score)'); expected = values.score;
        why = 'Read the score field of this one player.'; break;
      case 1:
        code.push('player.score = ' + n, 'print(player.score)'); expected = n;
        why = 'The assignment replaces the old score with ' + n + '.'; break;
      case 2:
        code.push('player.score = player.score + ' + n, 'print(player.score)'); expected = values.score + n;
        why = 'The score changes from ' + values.score + ' to ' + expected + '.'; break;
      case 3:
        code.push('player.active = False', 'print(player.active)'); expected = false;
        why = 'The active field is now False, regardless of its starting value.'; break;
      case 4:
        code.push('player.name = "Kai"', 'print(player.name)'); expected = 'Kai';
        why = 'Only the name field is changed.'; break;
      case 5:
        code.push('player.house = "Purple"', 'print(player.house)'); expected = 'Purple';
        why = 'The house field now stores the string Purple.'; break;
      case 6:
        code.push('if player.score >= 20 then', '    print("Pass")', 'else', '    print("Retry")', 'endif');
        expected = values.score >= 20 ? 'Pass' : 'Retry';
        why = values.score + (values.score >= 20 ? ' meets ' : ' is below ') + 'the threshold of 20.'; break;
      case 7:
        code.push('bonus = ' + n, 'player.score = player.score + bonus', 'print(player.score)');
        expected = values.score + n; why = 'Add the bonus of ' + n + ' to the starting score ' + values.score + '.'; break;
      case 8:
        code.push('player.score = player.score * 2', 'print(player.score)');
        expected = values.score * 2; why = 'Double the score field, leaving the other fields unchanged.'; break;
      default:
        code.push('if player.active then', '    print(player.name)', 'else', '    print("Absent")', 'endif');
        expected = values.active ? values.name : 'Absent';
        why = 'The Boolean field active selects which branch runs.';
    }
    return {level: 'medium', type: 'value', values, types: TYPES, code,
      expected: display(expected), prompt: 'What value will be printed?',
      context: 'Use the starting record shown, then trace any field updates.',
      hint: 'Follow the code from top to bottom. A change to one field does not change the others.',
      model: 'Output: ' + display(expected),
      explanation: why + ' Output: ' + display(expected) + '.'};
  }

  function hard(index, r) {
    const values = startingRecord(r), n = pick(r, 2, 9);
    const tasks = [
      ['Print the player’s score.', ['print(player.score)']],
      ['Set the player’s score to ' + n + '.', ['player.score = ' + n]],
      ['Increase the player’s score by ' + n + '.', ['player.score = player.score + ' + n]],
      ['Copy the player’s name into the variable chosenName.', ['chosenName = player.name']],
      ['Set active to False.', ['player.active = False']],
      ['Change the player’s house to Purple.', ['player.house = "Purple"']],
      ['Print the player’s name.', ['print(player.name)']],
      ['Double the player’s score.', ['player.score = player.score * 2']],
      ['Set active to True and then print it.', ['player.active = True', 'print(player.active)']],
      ['Print the player’s house and score on separate lines.', ['print(player.house)', 'print(player.score)']]
    ];
    const [task, lines] = tasks[index];
    return {level: 'hard', type: 'write', values, types: TYPES, code: [],
      prompt: 'Write the record-field statement' + (lines.length > 1 ? 's' : '') + '.',
      context: task + ' Use the example notation player.field.',
      hint: 'Use player.name, player.score, player.house or player.active. = assigns a value.',
      expected: lines.join('\n'), model: lines.join('\n'),
      explanation: 'One correct solution is ' + lines.join(' / ') + '.'};
  }

  function makeQuestion(level, index, seed) {
    if (!LEVELS.includes(level) || !Number.isInteger(index) || index < 0 || index > 9) throw new Error('Invalid records question');
    const r = randomFor(seed, level, index);
    return level === 'easy' ? easy(index, r) : level === 'medium' ? medium(index, r) : hard(index, r);
  }
  function normaliseLines(source) {
    return String(source ?? '').replace(/\r/g, '').split('\n').map(line =>
      line.trim().replace(/\s*(?:←|:=)\s*/g, '=').replace(/[‘’']/g, '"')
        .replace(/\s+/g, '').toLowerCase()
    ).filter(Boolean).join('\n');
  }
  function checkAnswer(q, response) {
    const input = String(response ?? '').trim();
    if (!input) return {complete: false, correct: false};
    if (q.type === 'field') return {complete: true, correct: input === q.expected};
    if (q.type === 'value') return {complete: true,
      correct: input.replace(/^[\s'"“”]+|[\s'"“”]+$/g, '').toLowerCase() === String(q.expected).toLowerCase()};
    if (q.type === 'write') return {complete: true, correct: normaliseLines(input) === normaliseLines(q.expected)};
    return {complete: true, correct: false};
  }
  return {FIELD_NAMES, TYPES, makeQuestion, checkAnswer, normaliseLines};
});

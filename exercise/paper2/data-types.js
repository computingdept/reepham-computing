/* OCR J277/02, 2.2.2: deterministic practice, independent of the page and saved progress. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.J277Paper2DataTypes = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const TYPES = ['Integer', 'Real', 'Boolean', 'Character', 'String'];

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
  const pick = (r, choices) => choices[Math.floor(r() * choices.length)];
  const sample = {
    Integer: [
      ['lives = 3', '3', 'A whole number has no decimal point.'],
      ['score = -8', '-8', 'A negative whole number is still an integer.'],
      ['tickets = 120', '120', 'Whole-number counts use integer.'],
      ['year = 2026', '2026', 'A year stored as a whole number is an integer.']
    ],
    Real: [
      ['price = 2.50', '2.50', 'A decimal number is real.'],
      ['height = 1.65', '1.65', 'Measurements with decimals use real.'],
      ['temperature = -3.5', '-3.5', 'Negative decimals are real.'],
      ['time = 10.0', '10.0', 'The decimal point makes this a real value.']
    ],
    Boolean: [
      ['isReady = True', 'True', 'Boolean values can only be True or False.'],
      ['gameOver = False', 'False', 'False is a Boolean value, not a string.'],
      ['loggedIn = True', 'True', 'True/False values use Boolean.'],
      ['hasTicket = False', 'False', 'A yes/no state is represented by Boolean.']
    ],
    Character: [
      ["grade = 'B'", "'B'", 'One character in single quotes is a character.'],
      ["initial = 'J'", "'J'", 'A single letter in single quotes is a character.'],
      ["answer = 'Y'", "'Y'", 'This holds exactly one character.'],
      ["symbol = '?'", "'?'", 'Punctuation can be a character too.']
    ],
    String: [
      ['name = "Asha"', '"Asha"', 'Text inside double quotes is a string.'],
      ['code = "007"', '"007"', 'Digits in quotes are text, not a number.'],
      ['message = "Go!"', '"Go!"', 'A group of characters is a string.'],
      ['word = "True"', '"True"', 'The word in quotes is text, not Boolean.']
    ]
  };
  const hardTasks = {
    Integer: [
      { scenario: 'Store a pupil\'s age as the whole number 14.', literal: '14', model: 'age = 14' },
      { scenario: 'Store a score of -5 as a whole number.', literal: '-5', model: 'score = -5' }
    ],
    Real: [
      { scenario: 'Store a measured height of 1.75 metres.', literal: '1.75', model: 'height = 1.75' },
      { scenario: 'Store a temperature of -2.5 degrees.', literal: '-2.5', model: 'temperature = -2.5' }
    ],
    Boolean: [
      { scenario: 'Store the fact that a game is over (True).', literal: 'True', model: 'gameOver = True' },
      { scenario: 'Store that a user is NOT logged in (False).', literal: 'False', model: 'loggedIn = False' }
    ],
    Character: [
      { scenario: 'Store a pupil\'s single-letter initial J.', literal: "'J'", model: "initial = 'J'" },
      { scenario: 'Store a single-letter grade B.', literal: "'B'", model: "grade = 'B'" }
    ],
    String: [
      { scenario: 'Store the username Asha as text.', literal: '"Asha"', model: 'username = "Asha"' },
      { scenario: 'Store the text 007 (not the number 7).', literal: '"007"', model: 'code = "007"' }
    ]
  };
  function makeQuestion(level, index, seed) {
    if (!['easy', 'medium', 'hard'].includes(level) || !Number.isInteger(index) || index < 0) {
      throw new Error('Invalid skill question');
    }
    const r = randomFor(seed, level, index);
    // Exactly two examples of each data type in every ten-question set.
    const offset = Math.floor(randomFor(seed, level, -1)() * TYPES.length);
    const type = TYPES[(index + offset) % TYPES.length];
    if (level === 'easy') {
      const [code, literal, explanation] = pick(r, sample[type]);
      return {
        level, type: 'identify', prompt: 'What data type is this value?',
        context: 'Look at the value on the right of =.',
        code, literal, expected: type,
        hint: 'Whole number · decimal · True/False · one character · text.',
        explanation, model: type
      };
    }
    if (level === 'medium') {
      const kinds = [type];
      const others = TYPES.filter(k => k !== type);
      while (kinds.length < 3) {
        const candidate = pick(r, others);
        if (!kinds.includes(candidate)) kinds.push(candidate);
      }
      const examples = kinds.map(k => {
        const [code, literal] = pick(r, sample[k]);
        return { code, literal, type: k };
      });
      for (let n = examples.length - 1; n > 0; n--) {
        const j = Math.floor(r() * (n + 1));
        [examples[n], examples[j]] = [examples[j], examples[n]];
      }
      return {
        level, type: 'match', prompt: 'Match each value to its data type.',
        context: 'Choose a type for all three values.',
        examples, expected: examples.map(e => e.type),
        hint: 'Check the quotation marks and decimal points carefully.',
        explanation: examples.map(e => e.literal + ' → ' + e.type).join(' · '),
        model: examples.map(e => e.code + '  →  ' + e.type).join('\n')
      };
    }
    const task = hardTasks[type][Math.floor(index / 5) % 2];
    return {
      level, type: 'write', prompt: task.scenario,
      context: 'Write one OCR ERL assignment. Choose your own variable name.',
      expected: type, literal: task.literal, model: task.model,
      hint: type === 'Character' ? 'One letter: use single quotes.' :
        type === 'String' ? 'Text: use double quotes.' :
        type === 'Boolean' ? 'Use True or False without quotation marks.' :
        type === 'Real' ? 'Keep the decimal point.' : 'Use a whole number without quotes.',
      explanation: 'The value is correctly stored as ' + type.toLowerCase() + '.'
    };
  }
  function classifyLiteral(raw) {
    const value = String(raw).trim();
    if (/^-?\d+$/.test(value)) return { type: 'Integer', value: String(Number(value)) };
    if (/^-?\d+\.\d+$/.test(value)) return { type: 'Real', value: String(Number(value)) };
    if (/^(true|false)$/i.test(value)) return { type: 'Boolean', value: value.toLowerCase() };
    if (/^'[^'\n]'$/.test(value)) return { type: 'Character', value: value.slice(1, -1) };
    if (/^"[^"\n]*"$/.test(value)) return { type: 'String', value: value.slice(1, -1) };
    return null;
  }
  function parseAssignment(source) {
    const raw = String(source ?? '').trim();
    const match = raw.match(/^([A-Za-z_][A-Za-z_0-9]*)\s*(?:=|:=|←)\s*(.+?);?\s*$/);
    if (!match || /[\r\n]/.test(match[2])) return null;
    const value = classifyLiteral(match[2].trim().replace(/;$/, '').trim());
    return value ? { name: match[1], ...value } : null;
  }
  function checkAnswer(question, response) {
    if (question.type === 'identify') return {
      complete: Boolean(response), correct: response === question.expected
    };
    if (question.type === 'match') {
      const answers = Array.isArray(response) ? response : [];
      return {
        complete: answers.length === 3 && answers.every(Boolean),
        correct: answers.length === 3 && answers.every((v, i) => v === question.expected[i])
      };
    }
    const complete = String(response ?? '').trim() !== '';
    const parsed = parseAssignment(response);
    const expected = classifyLiteral(question.literal);
    return {
      complete,
      correct: Boolean(parsed && expected && parsed.type === question.expected && parsed.value === expected.value)
    };
  }
  return { TYPES, makeQuestion, classifyLiteral, parseAssignment, checkAnswer };
});

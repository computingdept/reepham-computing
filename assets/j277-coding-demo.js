/* Shared, always-available worked demos for J277 Paper 2 coding Skills.
   Each demo is a separate example: opening it never changes a practice answer,
   question number, score, local progress, or the skill's own reveal behaviour. */
(function () {
  'use strict';

  const examples = {
    'data-types': {
      title: 'Data Types', columns: ['Value', 'Type'],
      lines: ['score = 14', 'name = "Asha"', 'ready = True'],
      steps: [
        [1, '14', 'Integer', '14 is a whole number.'],
        [2, '"Asha"', 'String', 'Quotation marks make the name text.'],
        [3, 'True', 'Boolean', 'True is a Boolean value.']
      ],
      end: 'Three values, three appropriate data types.'
    },
    casting: {
      title: 'Casting', columns: ['Variable', 'Value / type'],
      lines: ['code = "12"', 'count = int(code)', 'total = count + 3', 'print(total)'],
      steps: [
        [1, 'code', '"12" · String', 'The quotation marks make 12 text.'],
        [2, 'count', '12 · Integer', 'int() converts the string to an integer.'],
        [3, 'total', '15 · Integer', 'Now 12 + 3 performs addition.'],
        [4, 'Output', '15', 'The number 15 is printed.']
      ],
      end: 'Output: 15'
    },
    operators: {
      title: 'Operators', columns: ['Variable', 'Value'],
      lines: ['a = 17', 'b = 5', 'quotient = a DIV b', 'remainder = a MOD b', 'print(quotient)'],
      steps: [
        [1, 'a', '17', 'Store 17.'],
        [2, 'b', '5', 'Store 5.'],
        [3, 'quotient', '3', 'DIV gives the whole-number quotient.'],
        [4, 'remainder', '2', 'MOD gives the remainder.'],
        [5, 'Output', '3', 'Only quotient is printed.']
      ],
      end: '17 DIV 5 = 3, and 17 MOD 5 = 2.'
    },
    comparisons: {
      title: 'Comparisons', columns: ['Variable', 'Value'],
      lines: ['score = 58', 'passed = score >= 40', 'print(passed)'],
      steps: [
        [1, 'score', '58', 'Store the score.'],
        [2, 'passed', 'True', '58 is greater than or equal to 40.'],
        [3, 'Output', 'True', 'The Boolean result is printed.']
      ],
      end: 'Output: True'
    },
    sequence: {
      title: 'Sequence', columns: ['Variable', 'Value'],
      lines: ['number = 4', 'total = number * 3', 'total = total + 2', 'print(total)'],
      steps: [
        [1, 'number', '4', 'Start by storing 4.'],
        [2, 'total', '12', '4 multiplied by 3 equals 12.'],
        [3, 'total', '14', 'Update total using its current value: 12 + 2.'],
        [4, 'Output', '14', 'Print the final value of total.']
      ],
      end: 'Output: 14'
    },
    selection: {
      title: 'Selection', columns: ['Check / action', 'Result'],
      lines: [
        'score = 63',
        'if score >= 75 then',
        '    print("High")',
        'elseif score >= 40 then',
        '    print("Pass")',
        'else',
        '    print("Retry")',
        'endif'
      ],
      steps: [
        [1, 'score', '63', 'Store the score before testing conditions.'],
        [2, '63 >= 75', 'False', 'The first IF branch is skipped.'],
        [4, '63 >= 40', 'True', 'The ELSEIF condition matches.'],
        [5, 'Output', 'Pass', 'Print Pass; do not run the ELSE branch.'],
        [8, 'ENDIF', 'Finish', 'Selection ends after the chosen branch.']
      ],
      end: 'Output: Pass'
    },
    'for-loops': {
      title: 'FOR Loops', columns: ['i', 'total'],
      lines: ['total = 0', 'for i = 1 to 4', '    total = total + i', 'next i', 'print(total)'],
      steps: (function () {
        const result = [[1, '—', '0', 'Start the running total at zero.']];
        let total = 0;
        for (let i = 1; i <= 4; i++) {
          result.push([2, String(i), String(total), 'FOR checks that ' + i + ' is still within 1 to 4.']);
          total += i;
          result.push([3, String(i), String(total), 'Add ' + i + ' to total.']);
          result.push([4, String(i + 1), String(total), 'NEXT increases i by 1.']);
        }
        result.push([2, '5', '10', '5 is beyond 4, so the loop stops.']);
        result.push([5, '—', '10', 'Print the final total.']);
        return result;
      })(),
      end: 'Output: 10'
    },
    'while-until': {
      title: 'WHILE / UNTIL', columns: ['i / check', 'total'],
      lines: ['total = 0', 'i = 1', 'while i < 5', '    total = total + i', '    i = i + 1', 'endwhile', 'print(total)'],
      steps: (function () {
        const result = [[1, '—', '0', 'Start with total = 0.'], [2, '1', '0', 'Set i to 1.']];
        let total = 0;
        for (let i = 1; i < 5; i++) {
          result.push([3, i + ' < 5', String(total), 'True: enter the loop.']);
          total += i;
          result.push([4, String(i), String(total), 'Add i to total.']);
          result.push([5, String(i + 1), String(total), 'Increase i by 1.']);
          result.push([6, String(i + 1), String(total), 'Return to the WHILE condition.']);
        }
        result.push([3, '5 < 5', String(total), 'False: leave the loop.']);
        result.push([7, 'Output', String(total), 'Print total after the loop.']);
        return result;
      })(),
      end: 'Output: 10'
    }
  };

  const parts = location.pathname.split('/').filter(Boolean);
  const page = parts[parts.length - 1] === 'index.html' ? parts[parts.length - 2] : parts[parts.length - 1];
  const example = examples[page];
  const practice = document.querySelector('main .practice');
  const title = practice && practice.querySelector('.practice-name');
  if (!example || !practice || !title) return;

  const make = (tag, className, label) => {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (label !== undefined) el.textContent = label;
    return el;
  };
  const launch = make('button', 'skill-demo-open', '▶ Demo');
  launch.type = 'button';
  launch.setAttribute('aria-controls', 'skill-demo');
  launch.setAttribute('aria-expanded', 'false');
  launch.title = 'Watch a separate worked example. Your answer and marks are kept.';
  title.append(launch);

  const section = make('section', 'skill-demo');
  section.id = 'skill-demo';
  section.hidden = true;
  section.setAttribute('aria-label', example.title + ' worked demonstration');

  const header = make('div', 'skill-demo-header');
  const back = make('button', 'skill-demo-back', '← Back to practice');
  back.type = 'button';
  const heading = make('h1', '', example.title + ' · Demo');
  const subtitle = make('p', '', 'Follow the highlighted line. This worked example does not affect your marks.');
  const headText = make('div', 'skill-demo-heading');
  headText.append(heading, subtitle);
  header.append(back, headText);

  const grid = make('div', 'skill-demo-grid');
  const codePanel = make('div', 'skill-demo-code');
  const label = make('span', 'code-label', 'OCR Exam Reference Language');
  const pre = make('pre', 'erl skill-demo-source');
  const codeRows = [];
  example.lines.forEach((line, idx) => {
    const row = make('span', 'skill-demo-line');
    const number = make('span', 'skill-demo-line-number', String(idx + 1).padStart(2, '0'));
    number.setAttribute('aria-hidden', 'true');
    const source = make('span', 'skill-demo-line-text', line);
    row.append(number, source);
    pre.append(row);
    codeRows.push(row);
  });
  codePanel.append(label, pre);

  const trace = make('div', 'skill-demo-trace');
  const traceLabel = make('strong', 'skill-demo-trace-title', 'Live trace table');
  const controls = make('div', 'skill-demo-controls');
  const play = make('button', 'skill-demo-play', '▶ Play');
  const step = make('button', '', '⏭ Step');
  const reset = make('button', '', '↺ Reset');
  for (const button of [play, step, reset]) button.type = 'button';
  controls.append(play, step, reset);
  const scroll = make('div', 'skill-demo-table-scroll');
  scroll.tabIndex = 0;
  scroll.setAttribute('aria-label', 'Model trace table');
  const table = make('table', 'skill-demo-table');
  const head = make('thead');
  const headRow = make('tr');
  for (const headingText of ['Line', ...example.columns]) headRow.append(make('th', '', headingText));
  head.append(headRow);
  const body = make('tbody');
  table.append(head, body);
  scroll.append(table);
  const status = make('p', 'skill-demo-status', 'Ready. Press Play or Step.');
  status.setAttribute('role', 'status');
  status.setAttribute('aria-live', 'polite');
  const result = make('p', 'skill-demo-result', '');
  result.hidden = true;
  trace.append(traceLabel, controls, scroll, status, result);
  grid.append(codePanel, trace);
  section.append(header, grid);
  practice.after(section);

  let index = 0;
  let timer = null;
  let previousScroll = 0;
  function pause() {
    if (timer !== null) { clearInterval(timer); timer = null; }
  }
  function paint() {
    body.replaceChildren();
    const visible = example.steps.slice(0, index);
    for (const event of visible) {
      const row = make('tr');
      if (event === visible[visible.length - 1]) row.classList.add('current');
      for (const value of [String(event[0]).padStart(2, '0'), event[1], event[2]]) {
        row.append(make('td', '', value));
      }
      body.append(row);
    }
    const current = visible[visible.length - 1];
    codeRows.forEach((row, idx) => {
      const active = !!current && idx === current[0] - 1;
      row.classList.toggle('is-tracing', active);
      if (active) row.setAttribute('aria-current', 'step');
      else row.removeAttribute('aria-current');
    });
    if (current) status.textContent = 'Line ' + String(current[0]).padStart(2, '0') + ' · ' + current[3];
    else status.textContent = 'Ready. Press Play or Step.';
    const done = index === example.steps.length;
    step.disabled = done;
    play.textContent = timer !== null ? 'Ⅱ Pause' : done ? '▶ Replay' : '▶ Play';
    result.hidden = !done;
    result.textContent = done ? example.end : '';
    scroll.scrollTop = scroll.scrollHeight;
  }
  function advance() {
    if (index < example.steps.length) index++;
    if (index === example.steps.length) pause();
    paint();
  }
  function openDemo() {
    previousScroll = window.scrollY;
    practice.hidden = true;
    section.hidden = false;
    launch.setAttribute('aria-expanded', 'true');
    pause(); index = 0; paint();
    window.scrollTo(0, 0);
    back.focus({ preventScroll: true });
  }
  function backToPractice() {
    pause();
    section.hidden = true;
    practice.hidden = false;
    launch.setAttribute('aria-expanded', 'false');
    launch.focus({ preventScroll: true });
    window.scrollTo(0, previousScroll);
  }
  launch.addEventListener('click', openDemo);
  back.addEventListener('click', backToPractice);
  play.addEventListener('click', () => {
    if (timer !== null) { pause(); paint(); return; }
    if (index === example.steps.length) index = 0;
    advance();
    if (index < example.steps.length) timer = setInterval(advance, 700);
    paint();
  });
  step.addEventListener('click', () => { pause(); advance(); });
  reset.addEventListener('click', () => { pause(); index = 0; paint(); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !section.hidden) backToPractice();
  });
  paint();
})();

(function () {
  'use strict';
  const variables = window.J277Paper2Variables;
  const core = window.RHSCSkills;
  if (!core) return;
  const $ = id => document.getElementById(id);
  const STORAGE_KEY = 'rhs-j277-paper2-progress-v1';
  const LEVELS = ['easy', 'medium', 'hard'];
  const LEVEL_TEXT = { easy: 'Tap and explore', medium: 'Trace and complete', hard: 'Write in OCR ERL' };
  const groups = [
    {
      name: 'Programming fundamentals', caption: 'Build first · OCR 2.2.1–2.2.2',
      items: [
        ['variables', 'Variables & Constants', 'x =', 'Assign and update values'],
        ['data-types', 'Data Types', '123', 'Integer, real, Boolean, character, string'],
        ['casting', 'Casting', 'int', 'Convert between types'],
        ['sequence', 'Sequence', '→', 'Input, process and output'],
        ['operators', 'Operators', '+ −', 'Arithmetic, DIV and MOD'],
        ['comparisons', 'Comparisons', '≥', 'Compare two values'],
        ['selection', 'Selection', 'IF', 'IF, ELSEIF and ELSE'],
        ['for-loops', 'FOR Loops', 'FOR', 'Count-controlled loops'],
        ['while-until', 'WHILE / UNTIL', '↻', 'Condition-controlled loops']
      ]
    },
    {
      name: 'Data structures & techniques', caption: 'Build on the basics · OCR 2.2.3',
      items: [
        ['array-1d', '1D Arrays', '[ ]', 'Read, change and index'],
        ['array-2d', '2D Arrays', '▦', 'Rows, columns and loops'],
        ['strings', 'String Handling', 'Aa', 'Slicing and character access'],
        ['records', 'Records', '{}', 'Fields and values'],
        ['procedures', 'Procedures', 'P()', 'Call and pass values'],
        ['functions', 'Functions', 'f(x)', 'Return a result'],
        ['random', 'Random Numbers', '?', 'Choose values in a range'],
        ['files', 'File Handling', 'TXT', 'Read, write and close'],
        ['sql', 'SQL Builder', 'SQL', 'Write SELECT statements']
      ]
    },
    {
      name: 'Algorithms & problem-solving', caption: 'Predict, trace and improve · OCR 2.1',
      items: [
        ['thinking', 'Computational Thinking', '□', 'Decompose and abstract'],
        ['flowcharts', 'Flowchart Builder', '◇', 'Complete flowcharts'],
        ['tracing', 'Trace Table Lab', '#', 'Follow program state'],
        ['linear-search', 'Linear Search', '→', 'Check each item'],
        ['binary-search', 'Binary Search', '½', 'Choose the middle'],
        ['bubble-sort', 'Bubble Sort', '⇅', 'Compare and swap'],
        ['insertion-sort', 'Insertion Sort', '⇥', 'Put values in place'],
        ['merge-sort', 'Merge Sort', '⋈', 'Split and merge'],
        ['algorithm-repair', 'Algorithm Repair', '!', 'Find and fix errors']
      ]
    },
    {
      name: 'Reliable programs & logic', caption: 'Test and evaluate · OCR 2.3–2.5',
      items: [
        ['validation', 'Validation & Authentication', '✓', 'Check and protect input'],
        ['test-data', 'Test Data & Plans', 'T', 'Normal, boundary and invalid'],
        ['maintain', 'Maintainable Code', '{ }', 'Name, comment and structure'],
        ['logic', 'Logic Gates', '∧', 'AND, OR and NOT'],
        ['truth', 'Truth Tables', '0/1', 'Combine logic'],
        ['ides', 'Translators & IDEs', 'IDE', 'Tools and errors']
      ]
    },
    {
      name: 'Section B · Write, Test, Improve', caption: 'Bring the skills together · OCR J277/02',
      items: [['synoptic', 'Synoptic Challenge', '</>', 'Predict, write, test and improve']]
    }
  ];
  const state = {
    level: 'easy', index: 0, seed: 1, score: 0, wrong: 0,
    question: null, response: null, locked: false
  };

  function storage() {
    return core.readProgress(STORAGE_KEY);
  }
  function save(value) {
    core.writeProgress(STORAGE_KEY, value);
  }
  function readProgress(skill, level) {
    const p = storage();
    const entry = p[skill] && p[skill][level];
    return entry && typeof entry === 'object' ? entry : { solved: 0, best: 0, sessions: 0 };
  }
  function updateProgress(skill, level, key, value) {
    const p = storage();
    if (!p[skill] || typeof p[skill] !== 'object') p[skill] = {};
    const current = readProgress(skill, level);
    p[skill][level] = {
      solved: Number.isSafeInteger(current.solved) && current.solved >= 0 ? current.solved : 0,
      best: Number.isSafeInteger(current.best) && current.best >= 0 ? current.best : 0,
      sessions: Number.isSafeInteger(current.sessions) && current.sessions >= 0 ? current.sessions : 0
    };
    p[skill][level][key] = value;
    save(p);
    updateTileProgress();
  }
  function updateTileProgress() {
    ['variables', 'data-types', 'casting'].forEach(skill => {
      const target = $(skill + '-progress');
      if (!target) return;
      const total = LEVELS.reduce((sum, level) => sum + (Number(readProgress(skill, level).solved) || 0), 0);
      target.textContent = total + ' correct · replay any time';
    });
  }

  function createTile(item, index) {
    const [id, title, , subtitle] = item;
    const ready = ['variables', 'data-types', 'casting'].includes(id);
    const card = document.createElement('article');
    card.className = 'tile ' + (ready ? 'ready' : 'planned');
    const main = document.createElement('div');
    main.className = 'tile-main';
    const label = document.createElement('div');
    label.className = 'tile-title'; label.textContent = String(index).padStart(2, '0') + ' · ' + title;
    const sub = document.createElement('div');
    sub.className = 'tile-sub'; sub.textContent = subtitle;
    main.append(label, sub);
    if (ready) {
      const spec = document.createElement('div');
      spec.className = 'tile-spec'; spec.textContent = id === 'variables' ? '2.2.1' : '2.2.2';
      main.append(spec);
    }
    card.append(main);
    if (ready) {
      const foot = document.createElement('div');
      foot.id = id + '-progress'; foot.className = 'tile-foot';
      main.append(foot);
      const actions = document.createElement('div');
      actions.className = 'tile-actions';
      const play = document.createElement('a');
      play.className = 'tile-action';
      play.innerHTML = '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m8 5 11 7-11 7z"/></svg><span>Practise</span>';
      play.href = '/exercise/paper2/' + id + '/';
      play.setAttribute('aria-label', 'Practise ' + title);
      const print = document.createElement(id === 'variables' ? 'a' : 'span');
      print.className = 'tile-action' + (id === 'variables' ? '' : ' tile-action--coming-soon');
      print.innerHTML = '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9V3h12v6"/><rect x="6" y="15" width="12" height="6" rx="1"/><path d="M6 17H3v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6h-3M17 12h.01"/></svg><span>Print</span>';
      if (id === 'variables') {
        print.href = '/exercise/paper2/variables/print/';
        print.setAttribute('aria-label', 'Print Variables and Constants worksheet');
      } else {
        print.querySelector('span').textContent = 'Soon';
        print.setAttribute('aria-label', 'Printable worksheet coming soon');
        print.title = 'Printable worksheet coming soon';
      }
      actions.append(play, print);
      card.append(actions);
    } else {
      const status = document.createElement('span');
      status.className = 'planned-note'; status.textContent = 'Planned';
      main.append(status);
    }
    return card;
  }

  function renderGroups() {
    const container = $('groups');
    let number = 1;
    groups.forEach((group, i) => {
      const details = document.createElement('details');
      details.className = 'group'; details.open = i === 0;
      const summary = document.createElement('summary');
      summary.className = 'group-summary';
      const name = document.createElement('div');
      name.className = 'group-title';
      name.append(document.createTextNode(group.name));
      const caption = document.createElement('small');
      caption.textContent = group.caption; name.append(caption);
      const meta = document.createElement('div');
      meta.className = 'group-meta';
      const count = document.createElement('span');
      count.className = 'count';
      count.textContent = i === 0 ? '3 ready / 9' : group.items.length + ' planned';
      const chevron = document.createElement('span');
      chevron.className = 'group-chevron'; chevron.setAttribute('aria-hidden', 'true');
      meta.append(count, chevron); summary.append(name, meta);
      const content = document.createElement('div');
      content.className = 'group-content';
      const tiles = document.createElement('div');
      tiles.className = 'tiles';
      group.items.forEach(item => tiles.append(createTile(item, number++)));
      content.append(tiles); details.append(summary, content); container.append(details);
    });
    updateTileProgress();
  }

  function returnHome() {
    window.location.assign('/exercise/paper2/');
  }
  function chooseLevel(level) {
    state.level = core.validLevel(level);
    core.updateLevelUrl(state.level);
    state.index = 0;
    state.seed = Math.floor(Math.random() * 2147483647) + 1;
    state.score = 0;
    document.querySelectorAll('.level').forEach(button => {
      const chosen = button.dataset.level === level;
      button.classList.toggle('active', chosen);
      button.setAttribute('aria-pressed', String(chosen));
    });
    $('level-description').textContent = LEVEL_TEXT[level];
    const printLink = $('print-skill');
    if (printLink) printLink.href = 'print/?level=' + encodeURIComponent(state.level);
    renderQuestion();
  }

  function codePanel(lines) {
    const panel = document.createElement('div');
    panel.className = 'code-panel';
    const label = document.createElement('span');
    label.className = 'code-label'; label.textContent = 'OCR Exam Reference Language';
    const code = document.createElement('pre');
    code.className = 'erl'; code.textContent = lines.join('\n');
    panel.append(label, code);
    return panel;
  }
  function renderEasy(question, work) {
    work.append(codePanel(question.code));
    if (question.type === 'identify') {
      const options = document.createElement('div');
      options.className = 'pick-buttons';
      question.options.forEach(option => {
        const button = document.createElement('button');
        button.type = 'button'; button.textContent = option;
        button.setAttribute('aria-pressed', 'false');
        button.addEventListener('click', () => {
          if (state.locked) return;
          state.response = option;
          options.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
        });
        options.append(button);
      });
      work.append(options);
      return;
    }
    state.response = question.initial;
    const board = document.createElement('div');
    board.className = 'variable-work';
    const caption = document.createElement('span');
    caption.className = 'work-label'; caption.textContent = 'Variable after the code runs';
    const variable = document.createElement('div');
    variable.className = 'variable-display';
    const name = document.createElement('span');
    name.textContent = question.name;
    const output = document.createElement('output');
    output.setAttribute('aria-live', 'polite'); output.textContent = String(state.response);
    variable.append(name, output);
    const stepper = document.createElement('div');
    stepper.className = 'stepper';
    [[-1, 'Decrease value by 1', '−'], [1, 'Increase value by 1', '+']].forEach(([delta, text, glyph]) => {
      const button = document.createElement('button');
      button.type = 'button'; button.textContent = glyph; button.setAttribute('aria-label', text);
      button.addEventListener('click', () => {
        if (state.locked) return;
        state.response = Math.max(-20, Math.min(60, state.response + delta));
        output.textContent = String(state.response);
      });
      stepper.append(button);
    });
    board.append(caption, variable, stepper); work.append(board);
  }
  function renderMedium(question, work) {
    work.append(codePanel(question.code));
    const inputWrap = document.createElement('div');
    inputWrap.className = 'input-work';
    const label = document.createElement('label');
    label.className = 'work-label'; label.htmlFor = 'trace-value'; label.textContent = 'Final value';
    const input = document.createElement('input');
    input.className = 'number-entry'; input.id = 'trace-value'; input.type = 'text';
    input.inputMode = 'numeric'; input.autocomplete = 'off'; input.placeholder = '?';
    input.addEventListener('input', () => { state.response = input.value; });
    input.addEventListener('keydown', event => { if (event.key === 'Enter') $('check').click(); });
    inputWrap.append(label, input); work.append(inputWrap);
  }
  function renderHard(_, work) {
    const inputWrap = document.createElement('div');
    inputWrap.className = 'input-work';
    const label = document.createElement('label');
    label.className = 'work-label'; label.htmlFor = 'erl-answer'; label.textContent = 'Write your algorithm';
    const input = document.createElement('textarea');
    input.className = 'code-entry'; input.id = 'erl-answer'; input.rows = 4;
    input.autocapitalize = 'off'; input.autocomplete = 'off'; input.spellcheck = false;
    input.placeholder = 'Write each assignment on a new line';
    input.addEventListener('input', () => { state.response = input.value; });
    const note = document.createElement('span');
    note.className = 'writer-note'; note.textContent = 'Use =, := or ← for assignment. One statement per line.';
    inputWrap.append(label, input, note); work.append(inputWrap);
  }

  function resetMessages() {
    $('feedback').hidden = true;
    $('feedback').textContent = '';
    $('hint-panel').hidden = true;
    $('hint-panel').replaceChildren();
    $('hint').textContent = 'Show hint';
  }
  function renderQuestion() {
    state.question = variables.makeQuestion(state.level, state.index, state.seed);
    state.wrong = 0;
    state.response = null;
    state.locked = false;
    $('question-card').classList.remove('finished');
    $('prompt').textContent = state.question.prompt;
    $('context').textContent = state.question.context;
    $('question-position').textContent = 'Question ' + (state.index + 1) + ' of 10';
    $('meter').setAttribute('aria-valuenow', String(state.index));
    $('meter-fill').style.width = state.index * 10 + '%';
    $('check').hidden = false;
    $('clear').hidden = false;
    $('hint').hidden = false;
    $('show-answer').hidden = true;
    $('next').hidden = true;
    $('next').textContent = state.index === 9 ? 'See results →' : 'Next question →';
    resetMessages();
    const work = $('workspace');
    work.replaceChildren();
    work.classList.toggle('is-hard', state.level === 'hard');
    if (state.level === 'easy') renderEasy(state.question, work);
    if (state.level === 'medium') renderMedium(state.question, work);
    if (state.level === 'hard') renderHard(state.question, work);
  }
  function feedback(message, kind) {
    $('feedback').className = 'message ' + kind;
    $('feedback').textContent = message;
    $('feedback').hidden = false;
  }
  function hideAnswerInputs() {
    $('workspace').querySelectorAll('button,input,textarea').forEach(element => { element.disabled = true; });
    $('check').hidden = true;
    $('clear').hidden = true;
    $('hint').hidden = true;
    $('show-answer').hidden = true;
    $('next').hidden = false;
  }
  function check() {
    if (state.locked) return;
    const result = variables.checkAnswer(state.question, state.response);
    if (!result.complete) {
      feedback(state.level === 'hard' ? 'Write the assignment statements before checking.' :
        state.level === 'medium' ? 'Enter a whole number before checking.' : 'Choose an answer first.', 'neutral');
      return;
    }
    if (result.correct) {
      state.locked = true;
      state.score += 1;
      const current = readProgress('variables', state.level);
      updateProgress('variables', state.level, 'solved', (Number(current.solved) || 0) + 1);
      feedback('Correct! ' + state.question.explanation, 'good');
      hideAnswerInputs();
      return;
    }
    state.wrong += 1;
    feedback(state.level === 'hard' ?
      'Not quite. Check the number of lines, variable updates and final values.' :
      'Not quite. Follow each assignment again, then retry.', 'bad');
    if (state.wrong >= 2) $('show-answer').hidden = false;
  }
  function showModel() {
    if (state.locked || state.wrong < 2) return;
    state.locked = true;
    hideAnswerInputs();
    const panel = $('hint-panel');
    const label = document.createElement('strong');
    label.textContent = 'Model answer';
    const model = document.createElement('pre');
    model.className = 'erl'; model.textContent = state.question.model;
    panel.replaceChildren(label, model); panel.hidden = false;
    feedback('Compare your work with the model. This question has not been added to your score.', 'neutral');
  }
  function clearAnswer() {
    if (state.locked) return;
    resetMessages();
    const work = $('workspace');
    work.replaceChildren();
    state.response = null;
    if (state.level === 'easy') renderEasy(state.question, work);
    if (state.level === 'medium') renderMedium(state.question, work);
    if (state.level === 'hard') renderHard(state.question, work);
    $('show-answer').hidden = state.wrong < 2;
  }
  function finish() {
    const current = readProgress('variables', state.level);
    updateProgress('variables', state.level, 'best', Math.max(Number(current.best) || 0, state.score));
    updateProgress('variables', state.level, 'sessions', (Number(current.sessions) || 0) + 1);
    $('question-position').textContent = 'Completed';
    $('level-description').textContent = LEVEL_TEXT[state.level];
    $('meter').setAttribute('aria-valuenow', '10');
    $('meter-fill').style.width = '100%';
    $('question-card').classList.add('finished');
    const work = $('workspace');
    work.replaceChildren();
    $('prompt').textContent = '';
    $('context').textContent = '';
    resetMessages();
    $('check').hidden = true;
    $('clear').hidden = true;
    $('show-answer').hidden = true;
    $('hint').hidden = true;
    $('next').hidden = true;
    const results = document.createElement('div');
    results.className = 'results';
    const kicker = document.createElement('span');
    kicker.className = 'result-kicker'; kicker.textContent = 'Skill 01 · ' + state.level + ' complete';
    const score = document.createElement('strong');
    score.textContent = state.score + ' / 10';
    const heading = document.createElement('h2');
    heading.textContent = state.score === 10 ? 'Great work!' : 'Keep practising';
    const text = document.createElement('p');
    text.textContent = 'Best score on this device: ' + readProgress('variables', state.level).best +
      '/10. You can replay this level or try another at any time.';
    const actions = document.createElement('div');
    actions.className = 'results-actions';
    const replay = document.createElement('button');
    replay.type = 'button'; replay.className = 'btn primary'; replay.textContent = 'Practise again';
    replay.addEventListener('click', () => { chooseLevel(state.level); window.scrollTo(0, 0); });
    const all = document.createElement('button');
    all.type = 'button'; all.className = 'btn'; all.textContent = 'All skills';
    all.addEventListener('click', returnHome);
    actions.append(replay, all);
    results.append(kicker, score, heading, text, actions); work.append(results);
  }

  if ($('groups')) {
    renderGroups();
    // Preserve lesson and worksheet links made before each skill got its own HTML page.
    if (new URLSearchParams(window.location.search).get('skill') === 'variables') {
      window.location.replace('/exercise/paper2/variables/?level=' + core.levelFromUrl());
    }
    if (new URLSearchParams(window.location.search).get('skill') === 'data-types') {
      window.location.replace('/exercise/paper2/data-types/?level=' + core.levelFromUrl());
    }
    if (new URLSearchParams(window.location.search).get('skill') === 'casting') {
      window.location.replace('/exercise/paper2/casting/?level=' + core.levelFromUrl());
    }
  }
  if ($('practice')) {
    if (!variables) throw new Error('Variables question engine did not load.');
    document.querySelectorAll('.level').forEach(button => button.addEventListener('click', () => chooseLevel(button.dataset.level)));
    $('check').addEventListener('click', check);
    $('clear').addEventListener('click', clearAnswer);
    $('show-answer').addEventListener('click', showModel);
    $('next').addEventListener('click', () => {
      if (!state.locked) return;
      if (state.index === 9) finish();
      else { state.index += 1; renderQuestion(); window.scrollTo(0, 0); }
    });
    $('hint').addEventListener('click', () => {
      const panel = $('hint-panel');
      panel.hidden = !panel.hidden;
      panel.textContent = state.question.hint;
      $('hint').textContent = panel.hidden ? 'Show hint' : 'Hide hint';
    });
    chooseLevel(core.levelFromUrl());
  }
})();

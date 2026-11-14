/* Skill 14: compact SQL practice. Students construct queries; none is executed. */
(function () {
  'use strict';
  const engine = window.J277Paper2SQL, core = window.RHSCSkills;
  if (!engine || !core) throw new Error('SQL Builder scripts did not load.');
  const $ = id => document.getElementById(id);
  const KEY = 'rhs-j277-paper2-progress-v1', SKILL = 'sql';
  const LEVEL_TEXT = {easy: 'Choose the missing SQL part', medium: 'Build a SELECT query', hard: 'Write a SELECT query'};
  const state = {level: 'easy', index: 0, seed: 1, score: 0, firstTry: 0, wrong: 0,
    question: null, response: null, locked: false};

  function el(tag, className, value) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (value !== undefined) node.textContent = value;
    return node;
  }
  function progress() {
    const all = core.readProgress(KEY), item = all[SKILL] && all[SKILL][state.level];
    return item && typeof item === 'object' ? item : {solved: 0, best: 0, sessions: 0};
  }
  function updateProgress(field, value) {
    const all = core.readProgress(KEY), previous = progress();
    if (!all[SKILL] || typeof all[SKILL] !== 'object') all[SKILL] = {};
    all[SKILL][state.level] = {solved: Number(previous.solved) || 0,
      best: Number(previous.best) || 0, sessions: Number(previous.sessions) || 0, [field]: value};
    core.writeProgress(KEY, all);
  }
  function feedback(message, type) {
    $('feedback').textContent = message;
    $('feedback').className = 'message ' + type;
    $('feedback').hidden = false;
  }
  function resetFeedback() {
    $('feedback').textContent = ''; $('feedback').hidden = true;
    $('hint-panel').replaceChildren(); $('hint-panel').hidden = true;
    $('hint').textContent = 'Show hint';
  }
  function tableCard(q) {
    const data = engine.TABLES[q.table];
    const section = el('section', 'sql-table-card');
    const heading = el('div', 'sql-table-title');
    heading.append(el('strong', '', q.table + ' table'), el('span', '', 'Example data'));
    const scroll = el('div', 'sql-table-scroll');
    scroll.tabIndex = 0;
    scroll.setAttribute('aria-label', q.table + ' table values');
    const table = el('table', 'sql-table');
    const thead = el('thead'), head = el('tr');
    data.columns.forEach(col => head.append(el('th', '', col)));
    thead.append(head); table.append(thead);
    const body = el('tbody');
    data.rows.forEach(row => {
      const tr = el('tr'); row.forEach(value => tr.append(el('td', '', String(value))));body.append(tr);
    });
    table.append(body); scroll.append(table); section.append(heading, scroll); return section;
  }
  function renderEasy(q, panel) {
    const sample = el('div', 'sql-missing-line', q.line.replace('___', '_____'));
    sample.setAttribute('aria-label', 'SQL statement with a missing part: ' + q.line.replace('___', 'blank'));
    panel.append(sample);
    const choices = el('div', 'sql-choices');
    choices.setAttribute('role', 'group'); choices.setAttribute('aria-label', 'Choose the missing SQL part');
    q.options.forEach(option => {
      const button = el('button', 'sql-choice', option); button.type = 'button';
      button.setAttribute('aria-pressed', 'false');
      button.addEventListener('click', () => {
        if (state.locked) return;
        state.response = option;
        choices.querySelectorAll('button').forEach(item =>
          item.setAttribute('aria-pressed', String(item === button)));
      });
      choices.append(button);
    });
    panel.append(choices);
  }
  function labelledSelect(label, choices, key, panel) {
    const row = el('label', 'sql-select-label'), title = el('span', '', label);
    const select = el('select', 'sql-select');
    select.setAttribute('aria-label', label);
    const prompt = el('option', '', 'Choose…'); prompt.value = ''; select.append(prompt);
    choices.forEach(choice => {const option = el('option', '', choice);option.value = choice;select.append(option);});
    select.addEventListener('change', () => {
      if (state.locked) return;
      state.response[key] = select.value;
      updatePreview();
    });
    row.append(title, select); panel.append(row);
  }
  function updatePreview() {
    const r = state.response || {};
    const query = 'SELECT ' + (r.columns || '…') + '\nFROM ' + (r.table || '…') +
      '\n' + (r.filter === 'No filter' ? '' : 'WHERE ' + (r.filter || '…'));
    $('sql-preview').textContent = query.trim();
  }
  function renderMedium(q, panel) {
    const controls = el('div', 'sql-builder');
    labelledSelect('SELECT · columns', q.columnsToChoose, 'columns', controls);
    labelledSelect('FROM · table', q.tablesToChoose, 'table', controls);
    labelledSelect('WHERE · condition', q.filtersToChoose, 'filter', controls);
    const output = el('div', 'sql-preview-block');
    output.append(el('strong', 'sql-preview-title', 'Your SQL query'));
    const preview = el('pre', 'sql-preview', 'SELECT …\nFROM …\nWHERE …');
    preview.id = 'sql-preview'; output.append(preview);
    panel.append(controls, output);
    state.response = {columns: '', table: '', filter: ''};
  }
  function renderHard(panel) {
    const answer = el('div', 'sql-answer');
    const label = el('label', 'work-label', 'Your SQL query');label.htmlFor = 'sql-answer';
    const area = el('textarea', 'code-entry sql-code-entry');
    area.id = 'sql-answer';area.rows = 3;area.spellcheck = false;area.autocapitalize = 'off';
    area.autocomplete = 'off';area.placeholder = 'SELECT …\nFROM …\nWHERE …';
    area.addEventListener('input', () => {state.response = area.value;});
    answer.append(label, area);panel.append(answer);
  }
  function renderQuestion() {
    const q = state.question = engine.makeQuestion(state.level, state.index, state.seed);
    state.wrong = 0;state.response = null;state.locked = false;
    $('question-card').classList.remove('finished');
    $('prompt').textContent = q.prompt;$('context').textContent = q.context;
    $('question-position').textContent = 'Question ' + (state.index + 1) + ' of 10';
    $('meter').setAttribute('aria-valuenow', String(state.index));
    $('meter-fill').style.width = state.index * 10 + '%';
    ['check', 'clear', 'hint'].forEach(id => $(id).hidden = false);
    $('next').hidden = true;$('show-answer').hidden = true;
    $('next').textContent = state.index === 9 ? 'See results →' : 'Next question →';
    resetFeedback();
    const work = $('workspace');work.replaceChildren();
    const grid = el('div', 'sql-layout'), left = el('div', 'sql-reference'), right = el('div', 'sql-task');
    left.append(tableCard(q));
    if (state.level === 'easy') renderEasy(q, right);
    else if (state.level === 'medium') renderMedium(q, right);
    else renderHard(right);
    grid.append(left, right);work.append(grid);
  }
  function disableInputs() {
    $('workspace').querySelectorAll('button,select,input,textarea').forEach(node => node.disabled = true);
    ['check', 'clear', 'hint', 'show-answer'].forEach(id => $(id).hidden = true);
    $('next').hidden = false;
  }
  function check() {
    if (state.locked) return;
    const result = engine.checkAnswer(state.question, state.response);
    if (!result.complete) {feedback('Choose the SQL parts or write your query first.', 'neutral');return;}
    if (result.correct) {
      state.locked = true;state.score++;
      if (state.wrong === 0) state.firstTry++;
      updateProgress('solved', (Number(progress().solved) || 0) + 1);
      feedback('Correct! ' + state.question.explanation, 'good');disableInputs();return;
    }
    state.wrong++;
    feedback(result.feedback || 'Check the missing part of the SQL statement.', 'bad');
    if (state.wrong >= 2) $('show-answer').hidden = false;
  }
  function showModel() {
    if (state.locked || state.wrong < 2) return;
    state.locked = true;disableInputs();
    const panel = $('hint-panel');
    panel.replaceChildren(el('strong', '', 'Model answer'), el('pre', 'erl', state.question.model));
    panel.hidden = false;feedback('Compare with the model. No point was added.', 'neutral');
  }
  function clearAnswer() {
    if (state.locked) return;
    const wrong = state.wrong;
    const q = state.question;resetFeedback();state.response = null;
    const work = $('workspace'), right = work.querySelector('.sql-task');right.replaceChildren();
    if (state.level === 'easy') renderEasy(q, right);
    else if (state.level === 'medium') renderMedium(q, right);
    else renderHard(right);
    $('show-answer').hidden = wrong < 2;
  }
  function finish() {
    core.reportCompletion(2, SKILL, state.level, state.firstTry, 10);
    const before = progress();updateProgress('best', Math.max(Number(before.best) || 0, state.score));
    updateProgress('sessions', (Number(progress().sessions) || 0) + 1);
    $('question-position').textContent = 'Completed';$('meter').setAttribute('aria-valuenow', '10');
    $('meter-fill').style.width = '100%';$('question-card').classList.add('finished');
    $('prompt').textContent = '';$('context').textContent = '';resetFeedback();
    ['check', 'clear', 'hint', 'show-answer', 'next'].forEach(id => $(id).hidden = true);
    const work = $('workspace');work.replaceChildren();
    const result = el('div', 'results');
    const kicker = el('span', 'result-kicker', 'Skill 14 · ' + state.level + ' complete');
    const score = el('strong', '', state.score + ' / 10');
    const heading = el('h2', '', state.score === 10 ? 'Great work!' : 'Keep practising');
    const message = el('p', '', 'Best score on this device: ' + progress().best + '/10. Replay or try another level.');
    const actions = el('div', 'results-actions'), replay = el('button', 'btn primary', 'Practise again');
    replay.type = 'button';replay.addEventListener('click', () => chooseLevel(state.level));
    const hub = el('a', 'btn', 'All skills');hub.href = '/exercise/paper2/';
    actions.append(replay, hub);result.append(kicker, score, heading, message, actions);work.append(result);
  }
  function chooseLevel(level) {
    state.level = core.validLevel(level);core.updateLevelUrl(state.level);
    state.index = 0;state.seed = Math.floor(Math.random() * 2147483647) + 1;
    state.score = 0;state.firstTry = 0;
    document.querySelectorAll('.level').forEach(button => {
      const active = button.dataset.level === state.level;
      button.classList.toggle('active', active);button.setAttribute('aria-pressed', String(active));
    });
    $('level-description').textContent = LEVEL_TEXT[state.level];renderQuestion();
  }
  document.querySelectorAll('.level').forEach(button => button.addEventListener('click', () => chooseLevel(button.dataset.level)));
  $('check').addEventListener('click', check);$('clear').addEventListener('click', clearAnswer);
  $('show-answer').addEventListener('click', showModel);
  $('next').addEventListener('click', () => {
    if (!state.locked) return;
    if (state.index === 9) finish();
    else {state.index++;renderQuestion();window.scrollTo(0, 0);}
  });
  $('hint').addEventListener('click', () => {
    const panel = $('hint-panel');panel.hidden = !panel.hidden;
    panel.textContent = state.question.hint;
    $('hint').textContent = panel.hidden ? 'Show hint' : 'Hide hint';
  });
  chooseLevel(core.levelFromUrl());
})();

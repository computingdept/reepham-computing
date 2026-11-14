/* Skill 10: mobile-first 1D array practice with an independent worked Demo. */
(function () {
  'use strict';
  const engine = window.J277Paper2Array1D;
  const core = window.RHSCSkills;
  if (!engine || !core) throw new Error('1D Arrays scripts did not load.');
  const $ = id => document.getElementById(id);
  const KEY = 'rhs-j277-paper2-progress-v1';
  const SKILL = 'array-1d';
  const LEVEL_TEXT = {easy: 'Tap the correct cell', medium: 'Trace the final number', hard: 'Write OCR ERL statements'};
  const state = {level: 'easy', index: 0, seed: 1, score: 0, firstTry: 0, wrong: 0, question: null, response: null, locked: false};

  function progress() {
    const all = core.readProgress(KEY);
    const entry = all[SKILL] && all[SKILL][state.level];
    return entry && typeof entry === 'object' ? entry : {solved: 0, best: 0, sessions: 0};
  }
  function updateProgress(key, value) {
    const all = core.readProgress(KEY);
    if (!all[SKILL] || typeof all[SKILL] !== 'object') all[SKILL] = {};
    const current = progress();
    all[SKILL][state.level] = {
      solved: Number(current.solved) || 0,
      best: Number(current.best) || 0,
      sessions: Number(current.sessions) || 0,
      [key]: value
    };
    core.writeProgress(KEY, all);
  }
  function feedback(message, kind) {
    const node = $('feedback');
    node.textContent = message; node.className = 'message ' + kind; node.hidden = false;
  }
  function resetFeedback() {
    $('feedback').textContent = ''; $('feedback').hidden = true;
    $('hint-panel').replaceChildren(); $('hint-panel').hidden = true;
    $('hint').textContent = 'Show hint';
  }
  function codePanel(lines) {
    const panel = document.createElement('div'); panel.className = 'code-panel';
    const caption = document.createElement('span'); caption.className = 'code-label'; caption.textContent = 'OCR Exam Reference Language';
    const pre = document.createElement('pre'); pre.className = 'erl'; pre.textContent = lines.join('\n');
    panel.append(caption, pre); return panel;
  }
  function arrayStrip(q, interactive) {
    const box = document.createElement('div'); box.className = 'array-strip';
    const heading = document.createElement('strong'); heading.className = 'array-strip-title';
    heading.textContent = interactive ? 'Tap one cell' : 'Starting array · indices 0–4';
    const row = document.createElement('div'); row.className = 'array-cells';
    row.setAttribute('role', interactive ? 'group' : 'list');
    row.setAttribute('aria-label', interactive ? 'Choose one array cell' : 'Array values and indices');
    q.values.forEach((value, index) => {
      const cell = document.createElement(interactive ? 'button' : 'div');
      cell.className = 'array-cell';
      if (interactive) {
        cell.type = 'button'; cell.setAttribute('aria-pressed', 'false');
        cell.setAttribute('aria-label', 'Index ' + index + ', value ' + value);
        cell.addEventListener('click', () => {
          if (state.locked) return;
          state.response = String(index);
          row.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === cell)));
        });
      } else cell.setAttribute('role', 'listitem');
      const val = document.createElement('span'); val.className = 'array-value'; val.textContent = String(value);
      const pos = document.createElement('span'); pos.className = 'array-index'; pos.textContent = 'Index ' + index;
      cell.append(val, pos); row.append(cell);
    });
    box.append(heading, row); return box;
  }
  function renderEasy(q, work) {
    const layout = document.createElement('div'); layout.className = 'array-layout';
    layout.append(codePanel(q.code), arrayStrip(q, true)); work.append(layout);
  }
  function renderMedium(q, work) {
    const layout = document.createElement('div'); layout.className = 'array-layout';
    const left = document.createElement('div'); left.className = 'array-left';
    left.append(arrayStrip(q, false), codePanel(q.code));
    const answer = document.createElement('div'); answer.className = 'array-answer';
    const label = document.createElement('label'); label.htmlFor = 'array-final'; label.className = 'work-label'; label.textContent = 'Final printed number';
    const input = document.createElement('input'); input.id = 'array-final'; input.className = 'number-entry';
    input.type = 'text'; input.inputMode = 'numeric'; input.autocomplete = 'off'; input.placeholder = '?';
    input.addEventListener('input', () => { state.response = input.value; });
    input.addEventListener('keydown', event => { if (event.key === 'Enter') $('check').click(); });
    const note = document.createElement('span'); note.className = 'writer-note'; note.textContent = 'Cross out a cell’s old value when the code updates it.';
    answer.append(label, input, note); layout.append(left, answer); work.append(layout);
  }
  function renderHard(q, work) {
    const layout = document.createElement('div'); layout.className = 'array-layout';
    const left = document.createElement('div'); left.className = 'array-left';
    left.append(arrayStrip(q, false), codePanel(q.code));
    const answer = document.createElement('div'); answer.className = 'array-answer';
    const label = document.createElement('label'); label.htmlFor = 'array-erl'; label.className = 'work-label'; label.textContent = 'Your OCR ERL statement' + (q.model.includes('\n') ? 's' : '');
    const input = document.createElement('textarea'); input.id = 'array-erl'; input.className = 'code-entry';
    input.rows = 3; input.autocomplete = 'off'; input.autocapitalize = 'off'; input.spellcheck = false;
    input.placeholder = 'Type the missing statement…';
    input.addEventListener('input', () => { state.response = input.value; });
    const note = document.createElement('span'); note.className = 'writer-note';
    note.textContent = 'Write only the requested line(s). Use the variable names shown.';
    answer.append(label, input, note); layout.append(left, answer); work.append(layout);
  }
  function renderQuestion() {
    state.question = engine.makeQuestion(state.level, state.index, state.seed);
    state.response = null; state.wrong = 0; state.locked = false;
    $('question-card').classList.remove('finished');
    $('prompt').textContent = state.question.prompt; $('context').textContent = state.question.context;
    $('question-position').textContent = 'Question ' + (state.index + 1) + ' of 10';
    $('meter').setAttribute('aria-valuenow', String(state.index)); $('meter-fill').style.width = state.index * 10 + '%';
    ['check', 'clear', 'hint'].forEach(id => { $(id).hidden = false; });
    $('show-answer').hidden = true; $('next').hidden = true;
    $('next').textContent = state.index === 9 ? 'See results →' : 'Next question →';
    resetFeedback();
    const work = $('workspace'); work.replaceChildren(); work.classList.toggle('is-hard', state.level === 'hard');
    if (state.level === 'easy') renderEasy(state.question, work);
    else if (state.level === 'medium') renderMedium(state.question, work);
    else renderHard(state.question, work);
  }
  function disableInputs() {
    $('workspace').querySelectorAll('button,input,textarea').forEach(el => { el.disabled = true; });
    ['check', 'clear', 'hint', 'show-answer'].forEach(id => { $(id).hidden = true; });
    $('next').hidden = false;
  }
  function check() {
    if (state.locked) return;
    const result = engine.checkAnswer(state.question, state.response);
    if (!result.complete) { feedback('Choose a cell or enter your answer first.', 'neutral'); return; }
    if (result.correct) {
      state.locked = true; if (state.wrong === 0) state.firstTry++; state.score++;
      updateProgress('solved', (Number(progress().solved) || 0) + 1);
      feedback('Correct! ' + state.question.explanation, 'good'); disableInputs(); return;
    }
    state.wrong++;
    feedback(state.level === 'easy' ? 'Try counting the indices from zero.' :
      state.level === 'medium' ? 'Trace the latest value in each position before printing.' :
      'Check the index, array name, brackets and OCR ERL assignment.', 'bad');
    if (state.wrong >= 2) $('show-answer').hidden = false;
  }
  function showModel() {
    if (state.locked || state.wrong < 2) return;
    state.locked = true; disableInputs();
    const panel = $('hint-panel');
    const label = document.createElement('strong'); label.textContent = 'Model answer';
    const pre = document.createElement('pre'); pre.className = 'erl'; pre.textContent = state.question.model;
    panel.replaceChildren(label, pre); panel.hidden = false;
    feedback('Compare with the model. No point was added.', 'neutral');
  }
  function clearAnswer() {
    if (state.locked) return;
    resetFeedback(); state.response = null;
    const work = $('workspace'); work.replaceChildren();
    if (state.level === 'easy') renderEasy(state.question, work);
    else if (state.level === 'medium') renderMedium(state.question, work);
    else renderHard(state.question, work);
    $('show-answer').hidden = state.wrong < 2;
  }
  function finish() {
    core.reportCompletion(2, SKILL, state.level, state.firstTry, 10);
    const prior = progress(); updateProgress('best', Math.max(Number(prior.best) || 0, state.score));
    updateProgress('sessions', (Number(progress().sessions) || 0) + 1);
    $('question-position').textContent = 'Completed'; $('meter').setAttribute('aria-valuenow', '10'); $('meter-fill').style.width = '100%';
    $('question-card').classList.add('finished'); $('prompt').textContent = ''; $('context').textContent = '';
    resetFeedback(); ['check','clear','hint','show-answer','next'].forEach(id => { $(id).hidden = true; });
    const work = $('workspace'); work.replaceChildren();
    const result = document.createElement('div'); result.className = 'results';
    const kicker = document.createElement('span'); kicker.className = 'result-kicker'; kicker.textContent = 'Skill 10 · ' + state.level + ' complete';
    const score = document.createElement('strong'); score.textContent = state.score + ' / 10';
    const heading = document.createElement('h2'); heading.textContent = state.score === 10 ? 'Great work!' : 'Keep practising';
    const message = document.createElement('p'); message.textContent = 'Best score on this device: ' + progress().best + '/10. Replay this level or try another.';
    const actions = document.createElement('div'); actions.className = 'results-actions';
    const replay = document.createElement('button'); replay.className = 'btn primary'; replay.type = 'button'; replay.textContent = 'Practise again';
    replay.addEventListener('click', () => chooseLevel(state.level));
    const hub = document.createElement('a'); hub.href = '/exercise/paper2/'; hub.className = 'btn'; hub.textContent = 'All skills';
    actions.append(replay, hub); result.append(kicker, score, heading, message, actions); work.append(result);
  }
  function chooseLevel(level) {
    state.level = core.validLevel(level); core.updateLevelUrl(state.level);
    state.index = 0; state.seed = Math.floor(Math.random() * 2147483647) + 1;
    state.score = 0; state.firstTry = 0;
    document.querySelectorAll('.level').forEach(button => {
      const active = button.dataset.level === state.level;
      button.classList.toggle('active', active); button.setAttribute('aria-pressed', String(active));
    });
    $('level-description').textContent = LEVEL_TEXT[state.level]; renderQuestion();
  }

  document.querySelectorAll('.level').forEach(button => button.addEventListener('click', () => chooseLevel(button.dataset.level)));
  $('check').addEventListener('click', check); $('clear').addEventListener('click', clearAnswer);
  $('show-answer').addEventListener('click', showModel);
  $('next').addEventListener('click', () => {
    if (!state.locked) return;
    if (state.index === 9) finish();
    else { state.index++; renderQuestion(); window.scrollTo(0, 0); }
  });
  $('hint').addEventListener('click', () => {
    const panel = $('hint-panel'); panel.hidden = !panel.hidden; panel.textContent = state.question.hint;
    $('hint').textContent = panel.hidden ? 'Show hint' : 'Hide hint';
  });
  chooseLevel(core.levelFromUrl());
})();

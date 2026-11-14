/* Skill 05: shared Skills shell, with operators-specific tap, trace and write workspaces. */
(function () {
  'use strict';
  const engine = window.J277Paper2Operators;
  const core = window.RHSCSkills;
  if (!engine || !core) throw new Error('Operators skill scripts did not load.');
  const $ = id => document.getElementById(id);
  const STORAGE_KEY = 'rhs-j277-paper2-progress-v1';
  const SKILL = 'operators';
  const LEVEL_TEXT = { easy: 'Choose the operator', medium: 'Trace and complete', hard: 'Write in OCR ERL' };
  const state = { level: 'easy', index: 0, seed: 1, score: 0, wrong: 0, question: null, response: null, locked: false };
  const printSvg = '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9V3h12v6"/><rect x="6" y="15" width="12" height="6" rx="1"/><path d="M6 17H3v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6h-3M17 12h.01"/></svg>';

  function readProgress() {
    const p = core.readProgress(STORAGE_KEY);
    const entry = p[SKILL] && p[SKILL][state.level];
    return entry && typeof entry === 'object' ? entry : { solved: 0, best: 0, sessions: 0 };
  }
  function updateProgress(key, value) {
    const p = core.readProgress(STORAGE_KEY);
    if (!p[SKILL] || typeof p[SKILL] !== 'object') p[SKILL] = {};
    const entry = readProgress();
    p[SKILL][state.level] = {
      solved: Number.isSafeInteger(entry.solved) && entry.solved >= 0 ? entry.solved : 0,
      best: Number.isSafeInteger(entry.best) && entry.best >= 0 ? entry.best : 0,
      sessions: Number.isSafeInteger(entry.sessions) && entry.sessions >= 0 ? entry.sessions : 0,
      [key]: value
    };
    core.writeProgress(STORAGE_KEY, p);
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
    const label = document.createElement('span'); label.className = 'code-label';
    label.textContent = 'OCR Exam Reference Language';
    const pre = document.createElement('pre'); pre.className = 'erl'; pre.textContent = lines.join('\n');
    panel.append(label, pre); return panel;
  }
  function renderEasy(question, work) {
    state.response = null;
    const expression = document.createElement('div'); expression.className = 'operators-expression';
    expression.textContent = question.context;
    const label = document.createElement('strong'); label.className = 'operators-label';
    label.textContent = 'Tap the missing operator';
    const controls = document.createElement('div'); controls.className = 'operators-options';
    controls.setAttribute('role', 'group'); controls.setAttribute('aria-label', 'Choose the missing operator');
    question.options.forEach(operator => {
      const button = document.createElement('button'); button.type = 'button';
      button.textContent = operator; button.setAttribute('aria-pressed', 'false');
      button.addEventListener('click', () => {
        if (state.locked) return;
        state.response = operator;
        controls.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      });
      controls.append(button);
    });
    const panel = document.createElement('div'); panel.className = 'operators-easy';
    panel.append(expression, label, controls); work.append(panel);
  }
  function renderMedium(question, work) {
    work.append(codePanel(question.code));
    const field = document.createElement('div'); field.className = 'operators-answer';
    const label = document.createElement('label'); label.className = 'work-label';
    label.htmlFor = 'operators-output'; label.textContent = 'Printed number';
    const input = document.createElement('input'); input.id = 'operators-output';
    input.type = 'number'; input.inputMode = 'numeric'; input.autocomplete = 'off';
    input.placeholder = '?';
    input.addEventListener('input', () => { state.response = input.value; });
    input.addEventListener('keydown', event => { if (event.key === 'Enter') $('check').click(); });
    field.append(label, input); work.append(field);
  }
  function renderHard(_, work) {
    const field = document.createElement('div'); field.className = 'operators-writer';
    const label = document.createElement('label'); label.className = 'work-label';
    label.htmlFor = 'operators-code'; label.textContent = 'Your OCR ERL algorithm';
    const input = document.createElement('textarea'); input.id = 'operators-code';
    input.className = 'code-entry'; input.rows = 5;
    input.autocomplete = 'off'; input.autocapitalize = 'off'; input.spellcheck = false;
    input.placeholder = 'number = input("Number")\nanswer = number ^ 2\nprint(answer)';
    input.addEventListener('input', () => { state.response = input.value; });
    const note = document.createElement('span'); note.className = 'writer-note';
    note.textContent = 'Use any variable names. Your algorithm is checked with several inputs.';
    field.append(label, input, note); work.append(field);
  }
  function renderQuestion() {
    state.question = engine.makeQuestion(state.level, state.index, state.seed);
    state.response = null; state.wrong = 0; state.locked = false;
    $('question-card').classList.remove('finished');
    $('prompt').textContent = state.question.prompt;
    $('context').textContent = state.level === 'easy' ? 'Select one operator below.' : state.question.context;
    $('question-position').textContent = 'Question ' + (state.index + 1) + ' of 10';
    $('meter').setAttribute('aria-valuenow', String(state.index));
    $('meter-fill').style.width = state.index * 10 + '%';
    ['check','clear','hint'].forEach(id => { $(id).hidden = false; });
    $('show-answer').hidden = true; $('next').hidden = true;
    $('next').textContent = state.index === 9 ? 'See results →' : 'Next question →';
    resetFeedback();
    const work = $('workspace'); work.replaceChildren();
    work.classList.toggle('is-hard', state.level === 'hard');
    if (state.level === 'easy') renderEasy(state.question, work);
    if (state.level === 'medium') renderMedium(state.question, work);
    if (state.level === 'hard') renderHard(state.question, work);
  }
  function disableInputs() {
    $('workspace').querySelectorAll('button,input,textarea').forEach(el => { el.disabled = true; });
    ['check','clear','hint','show-answer'].forEach(id => { $(id).hidden = true; });
    $('next').hidden = false;
  }
  function check() {
    if (state.locked) return;
    const result = engine.checkAnswer(state.question, state.response);
    if (!result.complete) {
      feedback(state.level === 'easy' ? 'Choose an operator.' :
        state.level === 'medium' ? 'Enter the printed number.' : 'Write your input, calculation and print lines.', 'neutral');
      return;
    }
    if (result.correct) {
      state.locked = true; state.score++;
      updateProgress('solved', (Number(readProgress().solved) || 0) + 1);
      feedback('Correct! ' + state.question.explanation, 'good');
      disableInputs(); return;
    }
    state.wrong++;
    feedback(state.level === 'easy' ? 'Check whether the missing operator is a power (^), a division, or another calculation.' :
      state.level === 'medium' ? 'Check the order of operations: powers (^) before multiplication and addition.' :
      'Check the operator and the calculation. Try again.', 'bad');
    if (state.wrong >= 2) $('show-answer').hidden = false;
  }
  function showModel() {
    if (state.locked || state.wrong < 2) return;
    state.locked = true; disableInputs();
    const panel = $('hint-panel');
    const label = document.createElement('strong'); label.textContent = 'Model answer';
    const pre = document.createElement('pre'); pre.className = 'erl'; pre.textContent = state.question.model;
    panel.replaceChildren(label, pre); panel.hidden = false;
    feedback('Compare with the model. No point was added for this question.', 'neutral');
  }
  function clearAnswer() {
    if (state.locked) return;
    resetFeedback();
    const work = $('workspace'); work.replaceChildren();
    if (state.level === 'easy') renderEasy(state.question, work);
    if (state.level === 'medium') renderMedium(state.question, work);
    if (state.level === 'hard') renderHard(state.question, work);
    $('show-answer').hidden = state.wrong < 2;
  }
  function finish() {
    const entry = readProgress();
    updateProgress('best', Math.max(Number(entry.best) || 0, state.score));
    updateProgress('sessions', (Number(entry.sessions) || 0) + 1);
    $('question-position').textContent = 'Completed';
    $('meter').setAttribute('aria-valuenow', '10'); $('meter-fill').style.width = '100%';
    $('question-card').classList.add('finished');
    $('prompt').textContent = ''; $('context').textContent = '';
    resetFeedback(); ['check','clear','hint','show-answer','next'].forEach(id => { $(id).hidden = true; });
    const board = $('workspace'); board.replaceChildren();
    const result = document.createElement('div'); result.className = 'results';
    const kicker = document.createElement('span'); kicker.className = 'result-kicker';
    kicker.textContent = 'Skill 05 · ' + state.level + ' complete';
    const score = document.createElement('strong'); score.textContent = state.score + ' / 10';
    const heading = document.createElement('h2'); heading.textContent = state.score === 10 ? 'Great work!' : 'Keep practising';
    const message = document.createElement('p');
    message.textContent = 'Best score on this device: ' + readProgress().best + '/10. Replay this level or try another.';
    const actions = document.createElement('div'); actions.className = 'results-actions';
    const replay = document.createElement('button'); replay.type = 'button'; replay.className = 'btn primary'; replay.textContent = 'Practise again';
    replay.addEventListener('click', () => chooseLevel(state.level));
    const home = document.createElement('a'); home.href = '/exercise/paper2/'; home.className = 'btn'; home.textContent = 'All skills';
    actions.append(replay, home); result.append(kicker, score, heading, message, actions); board.append(result);
  }
  function chooseLevel(level) {
    state.level = core.validLevel(level); core.updateLevelUrl(state.level);
    state.index = 0; state.seed = Math.floor(Math.random() * 2147483647) + 1; state.score = 0;
    document.querySelectorAll('.level').forEach(button => {
      const current = button.dataset.level === state.level;
      button.classList.toggle('active', current); button.setAttribute('aria-pressed', String(current));
    });
    $('level-description').textContent = LEVEL_TEXT[state.level]; renderQuestion();
  }
  document.querySelectorAll('.level').forEach(button => button.addEventListener('click', () => chooseLevel(button.dataset.level)));
  $('check').addEventListener('click', check);
  $('clear').addEventListener('click', clearAnswer);
  $('show-answer').addEventListener('click', showModel);
  $('next').addEventListener('click', () => {
    if (!state.locked) return;
    if (state.index === 9) finish();
    else { state.index++; renderQuestion(); window.scrollTo(0, 0); }
  });
  $('hint').addEventListener('click', () => {
    const panel = $('hint-panel'); panel.hidden = !panel.hidden;
    panel.textContent = state.question.hint;
    $('hint').textContent = panel.hidden ? 'Show hint' : 'Hide hint';
  });
  const print = $('print-skill');
  if (print) { print.innerHTML = printSvg + '<span>Soon</span>'; print.title = 'Printable worksheet coming soon'; }
  chooseLevel(core.levelFromUrl());
})();

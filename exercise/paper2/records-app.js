/* Skill 12: mobile-first records practice with an independent worked Demo. */
(function () {
  'use strict';
  const engine = window.J277Paper2Records;
  const core = window.RHSCSkills;
  if (!engine || !core) throw new Error('Records scripts did not load.');
  const $ = id => document.getElementById(id);
  const KEY = 'rhs-j277-paper2-progress-v1';
  const SKILL = 'records';
  const LEVEL_TEXT = {easy: 'Identify records and fields', medium: 'Trace indexed fields', hard: 'Write loops over records'};
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
    const pre = core.numberedCode(lines);
    panel.append(caption, pre); return panel;
  }
  function recordBoard(q, interactive) {
    const box = document.createElement('div'); box.className = 'record-board';
    const heading = document.createElement('strong'); heading.className = 'record-board-title';
    heading.textContent = 'pupils[4,3] · four records, three fields';
    const table = document.createElement('table'); table.className = 'record-table';
    const head = document.createElement('thead'), headingRow = document.createElement('tr');
    const corner = document.createElement('th'); corner.scope = 'col'; corner.textContent = 'Row'; headingRow.append(corner);
    q.fields.forEach((field,col) => {
      const th = document.createElement('th'); th.scope = 'col';
      const index = document.createElement('span'); index.className = 'record-column-number'; index.textContent = String(col);
      const label = document.createElement('span'); label.textContent = field;
      th.append(index,label); headingRow.append(th);
    });
    head.append(headingRow); table.append(head);
    const body = document.createElement('tbody');
    q.values.forEach((record,row) => {
      const tr = document.createElement('tr'), number = document.createElement('th');
      number.scope = 'row'; number.className = 'record-row-number'; number.textContent = String(row);
      tr.append(number);
      record.forEach((value,col) => {
        const td = document.createElement('td');
        const node = document.createElement(interactive ? 'button' : 'span');
        node.className = 'record-value';
        node.textContent = String(value);
        if(interactive) {
          node.type = 'button'; node.setAttribute('aria-pressed','false');
          node.setAttribute('aria-label','Record '+row+', '+q.fields[col]+' field: '+value);
          node.addEventListener('click',()=>{
            if(state.locked)return;
            state.response = row+','+col;
            table.querySelectorAll('button').forEach(button =>
              button.setAttribute('aria-pressed',String(button===node)));
          });
        }
        td.append(node); tr.append(td);
      });
      body.append(tr);
    });
    table.append(body);
    const note = document.createElement('span'); note.className = 'record-index-note';
    note.textContent = 'Index order in this question: pupils[row, column] · counting starts at 0.';
    box.append(heading,table,note); return box;
  }
  function renderEasy(q, work) {
    const layout = document.createElement('div'); layout.className = 'array-layout';
    layout.append(recordBoard(q, true));
    if (q.code.length) layout.append(codePanel(q.code));
    work.append(layout);
  }
  function renderMedium(q, work) {
    const layout = document.createElement('div'); layout.className = 'array-layout';
    const left = document.createElement('div'); left.className = 'array-left';
    left.append(recordBoard(q, false), codePanel(q.code));
    const answer = document.createElement('div'); answer.className = 'array-answer';
    const label = document.createElement('label'); label.htmlFor = 'record-final'; label.className = 'work-label'; label.textContent = 'Final printed value';
    const input = document.createElement('input'); input.id = 'record-final'; input.className = 'number-entry';
    input.type = 'text'; input.autocomplete = 'off'; input.placeholder = '?';
    input.addEventListener('input', () => { state.response = input.value; });
    input.addEventListener('keydown', event => { if (event.key === 'Enter') $('check').click(); });
    const note = document.createElement('span'); note.className = 'writer-note'; note.textContent = 'Each row is a pupil. Column 1 stores surnames.';
    answer.append(label, input, note); layout.append(left, answer); work.append(layout);
  }
  function renderHard(q, work) {
    const layout = document.createElement('div'); layout.className = 'array-layout';
    const left = document.createElement('div'); left.className = 'array-left';
    left.append(recordBoard(q, false));
    if (q.code.length) left.append(codePanel(q.code));
    const answer = document.createElement('div'); answer.className = 'array-answer';
    const label = document.createElement('label'); label.htmlFor = 'record-notation'; label.className = 'work-label'; label.textContent = 'Your OCR ERL code';
    const input = document.createElement('textarea'); input.id = 'record-notation'; input.className = 'code-entry';
    input.rows = Math.max(4,Math.min(8,q.model.split('\n').length + 1));
    input.autocomplete = 'off'; input.autocapitalize = 'off'; input.spellcheck = false;
    input.placeholder = 'Write a FOR loop…';
    input.addEventListener('input', () => { state.response = input.value; });
    const note = document.createElement('span'); note.className = 'writer-note';
    note.textContent = 'Use the row counter as the index: pupils[row,1] is a surname.';
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
    feedback(state.level === 'easy' ? 'Check the row and field column.' :
      state.level === 'medium' ? 'Follow each assignment and read the indexed field.' :
      'Check the FOR bounds, the array indexes and NEXT.', 'bad');
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
    const kicker = document.createElement('span'); kicker.className = 'result-kicker'; kicker.textContent = 'Skill 12 · ' + state.level + ' complete';
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
  window.RHSSkillsDemoProvider = () => window.J277SkillsGuidedExamples.make('records', state.question);
  chooseLevel(core.levelFromUrl());
})();

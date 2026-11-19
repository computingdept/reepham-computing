/* Synoptic homework learner view. First checked answers live in D1, not here. */
(() => {
  'use strict';
  const API = 'https://rhsccs-my-work-api.jeromedthompson.workers.dev';
  const SESSION_KEY = 'rhs-my-work-learner-session-v1';
  const app = document.getElementById('synoptic-app');
  const params = new URLSearchParams(location.search);
  const demo = params.get('demo') === '1';
  const token = sessionStorage.getItem(SESSION_KEY) || '';
  const selections = new Map();
  const catalog = new Map();
  let homework = null;
  let mode = 'overview';
  let paper = 'paper1';
  let index = 0;
  let reviewing = false;
  let busy = false;
  let warning = '';
  const esc = value => String(value ?? '').replace(/[&<>"']/g,
    char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const paperName = p => p === 'paper1' ? 'Paper 1' : 'Paper 2';
  const questions = p => (homework?.questions || []).filter(q => q.paper === p);
  const checked = items => items.filter(q => q.checked).length;
  const correct = items => items.filter(q => q.checked && q.firstTryCorrect).length;
  const due = value => /^\d{4}-\d{2}-\d{2}$/.test(value || '')
    ? new Intl.DateTimeFormat('en-GB', { day:'numeric',month:'short',year:'numeric',timeZone:'Europe/London' })
      .format(new Date(value + 'T12:00:00Z')) : 'Not set';

  function safeHref(value) {
    if (typeof value !== 'string' || !value || value.startsWith('//')) return null;
    try {
      const url = new URL(value, location.origin);
      if (url.origin !== location.origin || !['https:','http:'].includes(url.protocol)) return null;
      return url.pathname + url.search + url.hash;
    } catch { return null; }
  }

  async function api(path, body = {}) {
    const response = await fetch(API + path, { method:'POST', cache:'no-store',
      headers:{'content-type':'application/json',authorization:'Bearer '+ token},
      body:JSON.stringify(body) });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      const error = new Error(result.error || 'Your work could not be loaded.');
      error.status = response.status;
      throw error;
    }
    return result;
  }

  function demoHomework() {
    const make = (p, n) => ({
      id:`preview-${p}-${n}`,paper:p,position:n,group:p === 'paper1' ? '1.1' : '2.1',
      spec:p === 'paper1' ? '1.1.1' : '2.1.1', skillTitle:p === 'paper1' ? 'CPU architecture' : 'Programming techniques',
      prompt:p === 'paper1' ? `Which register holds the address of the next instruction?` :
        `Which programming construct repeats a block while a condition is true?`,
      options:p === 'paper1' ? ['Accumulator','Program Counter','Memory Data Register','Current Instruction Register'] :
        ['Sequence','Selection','Iteration','Recursion'],
      answer:p === 'paper1' ? 'Program Counter' : 'Iteration',
      explanation:p === 'paper1' ? 'The Program Counter stores the address of the next instruction.' :
        'Iteration repeats instructions under the control of a condition.',
      checked:false,chosenIndex:null,firstTryCorrect:null
    });
    return { id:'teacher-preview',title:'Synoptic revision · example homework',cohort:'Y13',dueDate:'2026-11-26',
      skillIds:['h446-skill-p1-convert'],available:true,preview:true,
      questions:[...Array.from({length:10},(_,i)=>make('paper1',i)),
        ...Array.from({length:10},(_,i)=>make('paper2',i))] };
  }

  async function loadCatalog() {
    try {
      const response = await fetch('/assets/j277-assignment-catalog.json',{cache:'no-cache'});
      if (!response.ok) return;
      const data = await response.json();
      for (const item of data.items || []) if (item?.id) catalog.set(item.id,item);
    } catch { /* Learner can always complete papers if catalogue is offline. */ }
  }

  function feedbackLinks(question) {
    if (homework?.preview || !question?.skillId) return '';
    const course = homework.cohort === 'Y13' ? 'h446' : 'j277';
    const links = [];
    const add = (href, label) => {
      const safe = safeHref(href);
      if (safe && !links.some(l => l.href === safe)) links.push({href:safe,label});
    };
    try {
      if (course === 'h446') {
        const guide = window.RHSC_GUIDE_LINKS?.[question.paper];
        // The existing H446 helper validates a legacy page key before using
        // the stable Skill ID to find the correct final-guide page.
        if (typeof guide === 'function') add(guide(1,question.skillId),'Revision guide');
        const numbers = Array.isArray(question.lessons) ? question.lessons : [];
        for (const number of numbers.slice(0,2)) {
          const id = Number(number);
          if (Number.isInteger(id) && id > 0 && id < 1000)
            add(`/lessons/h446/lesson-${String(id).padStart(3,'0')}/index.html#new-learning`, `Lesson ${id}`);
        }
      } else {
        const index = window.J277_RESOURCE_INDEX;
        if (typeof index?.guideLink === 'function') add(index.guideLink(question.skillId),'Revision guide');
        if (typeof index?.lessonLinks === 'function') {
          const rows = index.lessonLinks(question.skillId);
          if (Array.isArray(rows)) for (const row of rows.slice(0,2))
            add(typeof row === 'string' ? row : row?.lesson || row?.url || row?.href, 'Lesson');
        }
      }
    } catch { /* Missing guide mapping must not obscure marked feedback. */ }
    return links.length ? `<nav class="s-links" aria-label="Further revision">${links.map(link =>
      `<a href="${esc(link.href)}" target="_blank" rel="noopener">${esc(link.label)} ↗</a>`).join('')}</nav>` : '';
  }

  function skillsMarkup() {
    return (homework.skillIds || []).map(id => {
      const item = catalog.get(id);
      const url = item && safeHref(item.url);
      return `<div class="s-skill"><div><strong>${esc(item?.title || id.replace(/^[^-]+-skill-/,'').replaceAll('-',' '))}</strong>
        <small class="muted">Practise and return to this homework tab</small></div>
        ${url ? `<a href="${esc(url)}" target="_blank" rel="noopener">Open Skill ↗</a>` :
          '<small class="muted">Link unavailable</small>'}</div>`;
    }).join('');
  }

  function header() {
    return `<a class="s-back" href="/my-work-login-pilot.html">← My Work</a>
      ${homework.preview ? '<div class="s-warning"><strong>Teacher visual preview.</strong> These are fictional questions; nothing is recorded or assigned to pupils.</div>' : ''}`;
  }

  function overview() {
    const p1 = questions('paper1'), p2 = questions('paper2');
    const total = checked(p1) + checked(p2);
    app.innerHTML = `${header()}<div class="s-head"><div class="s-label">${esc(homework.cohort.replace('Y','Year '))} · Homework</div>
        <h1>${esc(homework.title)}</h1><p>Due ${esc(due(homework.dueDate))} · About 30–40 minutes</p></div>
      <div class="s-summary"><span class="s-pill">${total} of 20 answers checked</span>
        ${total ? `<span class="s-pill">${correct(p1)+correct(p2)} correct first time</span>` : ''}
        <span class="s-pill">${homework.skillIds.length} ${homework.skillIds.length===1?'Skill':'Skills'} to practise</span></div>
      <div class="s-steps">
        ${['paper1','paper2'].map(p => {
          const qs = questions(p), done = checked(qs);
          return `<a href="#${p}" class="s-step" data-action="paper" data-paper="${p}">
            <div><h2>${paperName(p)} · 10 questions</h2><small>${done} of 10 checked${done===10 ? ` · ${correct(qs)}/10 first time` : ''}</small></div>
            <span class="s-open">${done===10?'Review':done?'Continue':'Start'} →</span></a>`;
        }).join('')}
        <div class="panel"><h2>Skills practice</h2><p class="muted small">Use these activities to strengthen your understanding. They open in a separate tab so you can easily return here.</p>
          ${skillsMarkup()}</div>
      </div>
      ${!homework.available ? '<p class="s-warning">New question checks are currently closed. You can review answers already checked.</p>' : ''}
      <p class="s-info">Your first checked answer is saved automatically and cannot be changed. Questions you miss link to lessons and revision guides. Skills links are not yet included in the completion percentage.</p>`;
  }

  function contextMarkup(q) {
    let html = '';
    if (q.model) html += `<p>${esc(q.model)}</p>`;
    if (q.code) html += `${q.language ? `<small>${esc(q.language)}</small>` : ''}<pre><code>${esc(q.code)}</code></pre>`;
    if (q.diagram?.src?.startsWith('/revision/')) html += `<img src="${esc(q.diagram.src)}" alt="${esc(q.diagram.alt || 'Question diagram')}" loading="lazy">`;
    if (Array.isArray(q.table?.headers) && Array.isArray(q.table?.rows))
      html += `${q.table.caption ? `<small>${esc(q.table.caption)}</small>` : ''}
        <div style="overflow-x:auto"><table><thead><tr>${q.table.headers.map(h=>`<th>${esc(h)}</th>`).join('')}</tr></thead>
        <tbody>${q.table.rows.map(row=>`<tr>${row.map(v=>`<td>${esc(v)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
    return html ? `<div class="s-context">${html}</div>` : '';
  }

  function answerFeedback(q) {
    if (!q.checked) return '';
    return `<div class="s-result ${q.firstTryCorrect ? '' : 'wrong'}" role="status">
      <strong>${q.firstTryCorrect ? 'Correct — well done.' : 'Not quite — here is the explanation.'}</strong>
      <p><b>Correct answer:</b> ${esc(q.answer)}</p>
      <p>${esc(q.explanation)}</p>
      ${!q.firstTryCorrect ? feedbackLinks(q) : ''}</div>`;
  }

  function paperView() {
    const qs = questions(paper), done = checked(qs);
    if (done === 10 && !reviewing) { mode = 'summary'; summary(); return; }
    const q = qs[index];
    if (!q) { overview(); return; }
    const locked = Boolean(q.locked || (!homework.available && !q.checked));
    const selected = q.checked ? q.chosenIndex : selections.get(q.id);
    app.innerHTML = `${header()}<button class="s-back text-button" type="button" data-action="overview">← Assignment overview</button>
      <div class="s-paper-top"><div><div class="s-label">${paperName(paper)} · Synoptic MCQ</div>
        <h1>${esc(homework.title)}</h1><p>${done} of 10 answers checked</p></div></div>
      <div class="s-dashes" role="group" aria-label="Ten questions">
        ${qs.map((item,n)=>`<button type="button" data-action="question" data-index="${n}"
          class="s-dash ${item.checked ? (item.firstTryCorrect ? 'done':'wrong') : ''}" 
          aria-label="Question ${n+1}: ${item.checked ? (item.firstTryCorrect ? 'correct':'incorrect'):'not checked'}"
          ${n===index ? 'aria-current="step"' : ''}></button>`).join('')}
      </div>
      <section class="s-question" aria-label="Question ${index+1}">
        <div class="s-label">Question ${index+1} of 10${q.spec ? ` · ${esc(q.spec)}` : ''}</div>
        ${locked ? '<div class="s-warning">This question is closed for new checks. Previous answers can still be reviewed.</div>' : ''}
        ${q.prompt ? `<h2>${esc(q.prompt)}</h2>` : ''}
        ${contextMarkup(q)}
        ${Array.isArray(q.options) ? `<div class="s-options" role="group" aria-label="Choose an answer">
          ${q.options.map((answer,n) => {
            const chosen = selected === n;
            const className = q.checked ? (answer === q.answer ? 'correct' : chosen ? 'chosen-wrong' : '') : (chosen ? 'selected' : '');
            return `<button class="s-option ${className}" type="button" data-action="choose" data-index="${n}"
              aria-pressed="${chosen}" ${q.checked || locked || busy ? 'disabled' : ''}>
              <span class="letter">${'ABCD'[n]}</span><span>${esc(answer)}</span></button>`;
          }).join('')}</div>` : ''}
        ${answerFeedback(q)}
        ${warning ? `<p class="s-error" role="alert">${esc(warning)}</p>` : ''}
        <div class="s-actions"><button type="button" class="btn secondary" data-action="previous" ${index===0 ? 'disabled' : ''}>← Previous</button>
          ${!q.checked && !locked ? `<button type="button" class="btn" data-action="check" ${selected===undefined || busy ? 'disabled' : ''}>${busy?'Saving…':'Check answer'}</button>` :
            `<button type="button" class="btn" data-action="next">${index===9 && done===10 ? 'Paper summary →' : 'Next question →'}</button>`}
        </div>
      </section>
      <p class="s-info">${q.checked ? 'Your first answer is recorded. You can revisit this explanation.' : 'Choose one answer, then select Check answer to save it.'}</p>`;
  }

  function summary() {
    const qs = questions(paper), mistakes = qs.filter(q=>q.checked && !q.firstTryCorrect);
    app.innerHTML = `${header()}<button class="s-back text-button" data-action="overview" type="button">← Assignment overview</button>
      <div class="s-head"><div class="s-label">${paperName(paper)} · First-attempt results</div><h1>Paper review</h1>
        <div class="s-figure">${correct(qs)} / 10</div><p>All ten answers checked · ${mistakes.length} ${mistakes.length === 1 ? 'question':'questions'} to revisit</p></div>
      ${mistakes.length ? `<h2>Revise these questions</h2>${mistakes.map(q=>
        `<div class="s-review"><div class="s-label">Question ${q.position+1} · ${esc(q.spec || q.group || '')}</div>
          <h2>${esc(q.prompt)}</h2><p>${esc(q.explanation)}</p>${feedbackLinks(q)}</div>`).join('')}` :
        '<p class="s-review">Excellent work. You answered every question correctly on your first check.</p>'}
      <div class="s-actions"><button type="button" class="btn secondary" data-action="review-paper">Review all questions</button>
        <button type="button" class="btn" data-action="overview">Back to homework →</button></div>`;
  }

  function render() {
    if (!homework) return;
    if (mode === 'overview') overview();
    else if (mode === 'paper') paperView();
    else summary();
  }

  function openPaper(value) {
    paper = value === 'paper2' ? 'paper2' : 'paper1';
    const qs = questions(paper);
    const first = qs.findIndex(q => !q.checked && !q.locked);
    index = first >= 0 ? first : 0;
    mode = checked(qs) === 10 ? 'summary' : 'paper';
    reviewing = false;
    warning = '';
    render();
    window.scrollTo({top:0,behavior:'instant'});
  }

  async function checkAnswer() {
    const q = questions(paper)[index];
    const optionIndex = selections.get(q?.id);
    if (!q || !Number.isInteger(optionIndex) || q.checked || busy) return;
    busy = true; warning = ''; render();
    try {
      const result = demo ? {
        chosenIndex:optionIndex,firstTryCorrect:q.options[optionIndex] === q.answer,
        answer:q.answer,explanation:q.explanation,checkedAt:new Date().toISOString()
      } : await api('/v1/learner/synoptic/check',{id:homework.id,questionId:q.id,optionIndex});
      Object.assign(q,{checked:true,chosenIndex:result.chosenIndex,firstTryCorrect:result.firstTryCorrect,
        answer:result.answer,explanation:result.explanation,checkedAt:result.checkedAt});
      selections.delete(q.id);
    } catch (error) {
      warning = error.message || 'Could not save. Please try again.';
    } finally { busy = false; render(); }
  }

  app.addEventListener('click',event => {
    const target = event.target.closest('[data-action]');
    if (!target || busy) return;
    const action = target.dataset.action;
    if (action === 'paper') { event.preventDefault(); openPaper(target.dataset.paper); }
    if (action === 'overview') { mode = 'overview'; warning = ''; render(); }
    if (action === 'review-paper') { mode = 'paper'; reviewing = true; index = 0; render(); }
    if (action === 'question') { mode = 'paper'; reviewing = true; index = Number(target.dataset.index); warning = ''; render(); }
    if (action === 'choose') { const q = questions(paper)[index]; if (q && !q.checked) { selections.set(q.id,Number(target.dataset.index));render(); } }
    if (action === 'previous') { index = Math.max(0,index-1); warning = '';render(); }
    if (action === 'next') {
      const qs = questions(paper);
      if (checked(qs)===10 && index===9) { reviewing = false; mode='summary'; render(); return; }
      const next = qs.findIndex((q,n)=>n > index && !q.checked && !q.locked);
      index = next >= 0 ? next : (index+1 < 10 ? index+1 : 0);
      mode = checked(qs)===10 && !reviewing ? 'summary' : 'paper'; warning = '';render();
    }
    if (action === 'check') checkAnswer();
  });

  (async () => {
    if (!demo && !token) { location.replace('/my-work-login-pilot.html'); return; }
    try {
      await loadCatalog();
      homework = demo ? demoHomework() : await api('/v1/learner/synoptic/homework',{id:params.get('id')});
      if (!['Y11','Y13'].includes(homework.cohort) || !Array.isArray(homework.questions) ||
          homework.questions.length !== 20) throw Error('Homework details are incomplete. Please ask your teacher.');
      render();
    } catch (error) {
      app.innerHTML = `<a class="s-back" href="/my-work-login-pilot.html">← My Work</a>
        <div class="s-empty"><h1>Homework unavailable</h1><p>${esc(error.message || 'Please try again.')}</p>
          <a class="btn" href="/my-work-login-pilot.html">Back to My Work</a></div>`;
    }
  })();
})();

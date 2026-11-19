/* My Work learner pages. No pupil names, PINs or tokens are stored permanently. */
(() => {
  'use strict';
  const API = 'https://rhsccs-my-work-api.jeromedthompson.workers.dev';
  const SESSION_KEY = 'rhs-my-work-learner-session-v1';
  const app = document.getElementById('app');
  const page = document.body.dataset.page || 'dashboard';
  const params = new URLSearchParams(location.search);
  const type = params.get('type') === 'classwork' ? 'classwork' : 'homework';
  let session = sessionStorage.getItem(SESSION_KEY) || '';
  const catalog = new Map();
  const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));

  async function request(path, bearer = session, body = {}) {
    const response = await fetch(API + path, {
      method: 'POST', cache: 'no-store',
      headers: { 'content-type':'application/json', ...(bearer ? { authorization:'Bearer ' + bearer } : {}) },
      body: JSON.stringify(body)
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      const error = new Error(result.error || 'My Work could not connect.');
      error.status = response.status;
      throw error;
    }
    return result;
  }

  async function loadCatalog() {
    try {
      const response = await fetch('/assets/j277-assignment-catalog.json', { cache:'no-cache' });
      if (!response.ok) return;
      const data = await response.json();
      for (const item of Array.isArray(data.items) ? data.items : [])
        if (item && typeof item.id === 'string') catalog.set(item.id, item);
    } catch { /* A catalogue outage must not block sign-in or recorded progress. */ }
  }

  async function overview() {
    try {
      return await request('/v1/learner/overview');
    } catch (error) {
      // Cloudflare and the static page can deploy a few minutes apart.
      if (error.status !== 404) throw error;
      const older = await request('/v1/work');
      return { cohort:older.cohort, independentOpen:false,
        work:(older.work || []).filter(row => row.packageId &&
          !String(row.packageId).startsWith('pilot-20261119-')).map(row => ({ ...row, available:true })) };
    }
  }

  function isPilot(row) {
    return String(row.packageId || '').startsWith('pilot-20261119-') ||
      /^Pilot Year (11|12|13)$/.test(String(row.packageTitle || '')) &&
      String(row.dueDate || '') === '2026-11-19';
  }

  function setsFromRows(rows) {
    const grouped = new Map();
    for (const row of rows) {
      if (!row || !row.packageId || isPilot(row)) continue;
      if (!grouped.has(row.packageId)) grouped.set(row.packageId, {
        id:row.packageId, title:row.packageTitle || 'Assignment',
        kind:row.workType === 'classwork' ? 'classwork' : 'homework',
        createdAt:row.createdAt, dueDate:row.dueDate,
        available:Boolean(row.available), activities:[]
      });
      grouped.get(row.packageId).activities.push(row);
    }
    return [...grouped.values()];
  }

  function recorded(row) {
    const item = catalog.get(row.itemId);
    const rounds = Number(row.attempts || 0);
    const questions = Number(row.questionsAttempted || 0);
    // Some Skills are links without marking; opening a link is not completion.
    const questionOnly = item?.tracking === 'question' ||
      ['h446-skill-p1-convert','j277-skill-p1-convert','h446-practice-141-a'].includes(row.itemId);
    const complete = rounds > 0 || (questionOnly && questions >= 10);
    return { complete, started:complete || questions > 0, questions,
      correct:Number(row.firstTryCorrect || 0), rounds,
      tracked:item?.tracking !== 'link-only' &&
        (questionOnly || item?.tracking === 'completion' || row.itemId.includes('-practice-')) };
  }

  function progress(set) {
    const total = set.activities.length;
    let complete = 0, started = 0, untracked = 0;
    for (const row of set.activities) {
      const state = recorded(row);
      if (state.complete && state.tracked) complete++;
      if (state.started) started++;
      if (!state.tracked) untracked++;
    }
    return { complete, started, total, untracked,
      percent:total ? Math.round(complete / total * 100) : null };
  }

  function overall(sets) {
    const sum = sets.reduce((acc,set) => {
      const state = progress(set);
      acc.complete += state.complete;
      acc.total += state.total;
      acc.untracked += state.untracked;
      return acc;
    }, { complete:0, total:0, untracked:0 });
    return { ...sum, percent:sum.total ? Math.round(100 * sum.complete / sum.total) : null };
  }

  function gauge(label, kind, stats) {
    const amount = stats.percent;
    const dash = amount === null ? 0 : (amount * 1.131).toFixed(1);
    const display = amount === null ? '–' : amount + '%';
    const subtitle = amount === null ? 'No assignments yet' : 'View progress →';
    return `<a class="gauge-card" href="/my-work-progress.html?type=${kind}" aria-label="${label} completion: ${escapeHtml(display)}. Open progress history">
      <svg class="gauge" viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r="18" fill="none" stroke="#dce9e1" stroke-width="5"/>
        <circle cx="24" cy="24" r="18" fill="none" stroke="#006347" stroke-width="5" stroke-linecap="round"
          stroke-dasharray="${dash} 113.1" transform="rotate(-90 24 24)"/>
        <text x="24" y="28" font-size="${amount === null ? 15 : 10}" text-anchor="middle">${escapeHtml(display)}</text>
      </svg>
      <span class="gauge-text"><strong>${label}</strong><small>${subtitle}</small></span></a>`;
  }

  function displayDate(date) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(String(date || ''))) return '';
    return new Intl.DateTimeFormat('en-GB', { day:'numeric', month:'short', year:'numeric', timeZone:'Europe/London' })
      .format(new Date(date + 'T12:00:00Z'));
  }

  function itemLink(row, level = null) {
    const item = catalog.get(row.itemId);
    if (!item || typeof item.url !== 'string' || !item.url.startsWith('/') || item.url.startsWith('//')) return null;
    const url = new URL(item.url, location.origin);
    if (level) url.searchParams.set('level', level);
    if ((['j277-skill-p1-convert','h446-skill-p1-convert'].includes(item.id) ||
        item.id.startsWith('j277-practice-') ||
        (item.id.startsWith('h446-practice-') && ['completion','question'].includes(item.tracking))) &&
        row.assignmentKey) url.searchParams.set('workKey', row.assignmentKey);
    return url.pathname + url.search + url.hash;
  }

  function nextActivity(set) {
    const available = set.activities.filter(row => itemLink(row) !== null);
    if (!available.length) return null;
    const inProgress = available.find(row => {
      const state = recorded(row);
      return state.started && !state.complete;
    });
    const unfinished = available.find(row => !recorded(row).complete);
    const row = inProgress || unfinished || available[0];
    const item = catalog.get(row.itemId);
    const level = item?.paper === 2 && item?.levels?.includes('easy') ? 'easy' : null;
    return itemLink(row, level);
  }

  function sortedHomeworks(sets) {
    return sets.filter(set => set.kind === 'homework').sort((a,b) => {
      const doneA = progress(a).complete === progress(a).total ? 1 : 0;
      const doneB = progress(b).complete === progress(b).total ? 1 : 0;
      if (doneA !== doneB) return doneA - doneB;
      if (!doneA && a.dueDate !== b.dueDate) return String(a.dueDate || '9999').localeCompare(String(b.dueDate || '9999'));
      return String(b.createdAt || '').localeCompare(String(a.createdAt || ''));
    });
  }

  function homeworkRow(set) {
    const state = progress(set);
    const finished = state.total && state.complete === state.total;
    const label = !set.available ? 'Details' : finished ? 'Review' : state.started ? 'Continue' : 'Start';
    const href = set.available ? nextActivity(set) : null;
    const dest = href || '/my-work-progress.html?type=homework&assignment=' + encodeURIComponent(set.id);
    const due = set.dueDate ? 'Due ' + displayDate(set.dueDate) : 'Homework';
    const detail = state.percent === null ? 'No recorded work' :
      state.untracked ? state.percent + '% recorded · some Skills untracked' :
        state.percent + '% complete';
    return `<a class="homework-row" href="${escapeHtml(dest)}">
      <div><strong>${escapeHtml(set.title)}</strong><small>${escapeHtml(due)} · ${escapeHtml(detail)}</small></div>
      <span class="row-action">${label}<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg></span>
    </a>`;
  }

  function userTools(cohort) {
    return `<div class="user-tools"><span>${escapeHtml(cohort.replace('Y','Year '))}</span>
      <button class="text-button" type="button" id="refreshWork">Refresh</button>
      <button class="text-button" type="button" id="signOut">Sign out</button></div>`;
  }

  function dashboard(data) {
    const sets = setsFromRows(data.work);
    const homework = sortedHomeworks(sets);
    const classwork = sets.filter(set => set.kind === 'classwork');
    app.innerHTML = `<div class="gauge-grid" aria-label="Your recorded assignment completion">
        ${gauge('Homework','homework',overall(homework))}
        ${gauge('Classwork','classwork',overall(classwork))}
      </div>
      <div class="section-caption">Your homework</div>
      <div class="homework-list">${homework.length ? homework.slice(0,3).map(homeworkRow).join('') :
        '<div class="no-items">No homework has been set for you yet.</div>'}</div>
      <div class="bottom-link"><a href="/my-work-progress.html?type=homework">View all homework →</a></div>
      ${userTools(data.cohort)}
      <p class="tracking-note">Percentages mean recorded completion of assigned activities, not quiz accuracy. Some Skills cannot yet report completion automatically.</p>`;
  }

  function activityEntry(row, available) {
    const item = catalog.get(row.itemId);
    const state = recorded(row);
    const title = item?.title || row.itemId.replace(/^(j277|h446)-(skill|practice)-/, '').replace(/-/g,' ');
    const score = state.questions ? `${state.questions} checked · ${state.correct} correct first time` :
      state.rounds ? `${Number(row.bestScore || 0)}% best recorded score` :
      !state.tracked ? 'Skill available · automatic completion not yet connected' : 'Not started';
    const levels = item?.paper === 2 && item?.levels?.includes('easy') && item?.levels?.includes('medium')
      ? ['easy','medium'] : [null];
    const links = available ? levels.map(level => {
      const href = itemLink(row, level);
      return href ? `<a class="open-link" href="${escapeHtml(href)}">${level ? level[0].toUpperCase()+level.slice(1) : 'Open'} →</a>` : '';
    }).join('') : '';
    return `<div class="activity-item"><div><strong>${escapeHtml(title)}</strong>
      <small>${escapeHtml(score)}</small></div>
      <div class="activity-actions">${links || '<span class="muted small">View only</span>'}</div></div>`;
  }

  function detailCard(set, selected) {
    const state = progress(set);
    const note = set.kind === 'homework' && set.dueDate ? 'Due ' + displayDate(set.dueDate) :
      'Classwork assignment';
    const completeText = state.total ? `${state.complete} of ${state.total} activities with recorded completion` : 'No activities';
    return `<details class="detail-card" id="assignment-${escapeHtml(set.id)}" ${selected === set.id ? 'open' : ''}>
      <summary><span><h2>${escapeHtml(set.title)}</h2><small>${escapeHtml(note)} · ${completeText}</small></span>
        <span class="detail-chevron" aria-hidden="true">›</span></summary>
      <div class="detail-body">
        ${!set.available ? '<p class="small muted">This assignment is not currently open for new attempts. Previous progress remains visible.</p>' : ''}
        ${set.activities.map(row => activityEntry(row,set.available)).join('')}
      </div>
    </details>`;
  }

  function detailPage(data) {
    const sets = setsFromRows(data.work).filter(set => set.kind === type);
    sets.sort((a,b) => String(b.createdAt || '').localeCompare(String(a.createdAt || '')));
    const label = type === 'homework' ? 'Homework' : 'Classwork';
    const stats = overall(sets);
    app.innerHTML = `<a class="back-link" href="/my-work-login-pilot.html">← Back to My Work</a>
      <div class="detail-head"><div><h1>${label} progress</h1>
        <p class="detail-summary">${stats.percent === null ? 'No assignments yet.' :
          stats.complete + ' of ' + stats.total + ' activities with recorded completion · ' + stats.percent + '%'}</p>
      </div></div>
      <div class="detail-list">${sets.length ? sets.map(set => detailCard(set,params.get('assignment'))).join('') :
        '<div class="no-items">No assignments to show here yet.</div>'}</div>
      ${userTools(data.cohort)}
      <p class="tracking-note">Completion and first-attempt accuracy are different measures. The progress percentage only counts recorded completed activities; Skills without marking are identified separately. Past assignments remain here for review.</p>`;
  }

  async function signOut() {
    const old = session;
    session = '';
    sessionStorage.removeItem(SESSION_KEY);
    if (page === 'progress') location.assign('/my-work-login-pilot.html');
    else showLogin();
    if (old) await request('/v1/logout',old).catch(() => {});
  }

  function showLogin(message = '') {
    app.innerHTML = `<div class="login panel"><span class="eyebrow">RHS Computing</span><h1>My Work</h1>
      <p class="muted">Sign in to continue your assigned homework and revision.</p>
      <form id="signIn"><div class="field"><label for="username">Anonymous username</label>
        <input id="username" name="username" autocomplete="username" autocapitalize="none" spellcheck="false" maxlength="40" required></div>
        <div class="field"><label for="pin">4-digit PIN</label>
        <input id="pin" name="pin" type="password" inputmode="numeric" autocomplete="off" pattern="[0-9]{4}" minlength="4" maxlength="4" required></div>
        <button class="btn" id="submit" type="submit">Sign in</button>
        <p class="error" id="error" role="alert" ${message ? '' : 'hidden'}>${escapeHtml(message)}</p>
      </form><p class="notice">Classwork can be opened during lessons. Homework practice opens on school days from 12:30–13:20 and after 15:30, and all day at weekends (UK time).</p></div>`;
    document.getElementById('signIn').addEventListener('submit',async event => {
      event.preventDefault();
      const button = document.getElementById('submit');
      button.disabled = true; button.textContent = 'Signing in…';
      try {
        const result = await request('/v1/login','',{
          username:document.getElementById('username').value,
          password:document.getElementById('pin').value
        });
        session = result.session;
        sessionStorage.setItem(SESSION_KEY,session);
        await showWork();
      } catch (error) {
        showLogin(error instanceof TypeError ? 'Connection problem. Please try again.' : error.message);
      }
    });
  }

  async function showWork() {
    if (!session) { if (page === 'progress') location.assign('/my-work-login-pilot.html'); else showLogin(); return; }
    try {
      const data = await overview();
      if (!/^Y(10|11|12|13)$/.test(data.cohort) || !Array.isArray(data.work)) throw Error('Unexpected response from My Work.');
      if (page === 'progress') detailPage(data); else dashboard(data);
    } catch (error) {
      if ([401,404].includes(error.status)) { await signOut(); return; }
      app.innerHTML = `<div class="login panel"><h1>My Work</h1><p class="error">${escapeHtml(error.message || 'Connection problem')}</p>
        <button type="button" id="refreshWork" class="btn">Try again</button></div>`;
    }
  }

  app.addEventListener('click',event => {
    const refresh = event.target.closest('#refreshWork');
    const exit = event.target.closest('#signOut');
    if (refresh) showWork();
    if (exit) signOut();
  });
  (async () => { await loadCatalog(); await showWork(); })();
})();

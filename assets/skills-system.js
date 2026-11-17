/* Shared stage-neutral helpers for independently linked Skills activities.
   Stage and skill-specific question/marking engines live outside this file. */
(function (global) {
  'use strict';
  const LEVELS = Object.freeze(['easy', 'medium', 'hard']);
  function validLevel(value) { return LEVELS.includes(value) ? value : 'easy'; }
  function levelFromUrl() { return validLevel(new URLSearchParams(global.location.search).get('level')); }
  function updateLevelUrl(value) {
    const url = new URL(global.location.href);
    url.searchParams.set('level', validLevel(value));
    global.history.replaceState(null, '', url.pathname + url.search + url.hash);
  }
  function readProgress(key) {
    try {
      const data = JSON.parse(global.localStorage.getItem(key) || '{}');
      return data && typeof data === 'object' && !Array.isArray(data) ? data : {};
    } catch (_) { return {}; }
  }
  function writeProgress(key, data) {
    try { global.localStorage.setItem(key, JSON.stringify(data)); } catch (_) { /* Storage may be unavailable. */ }
  }
  // Shared, opt-in source viewer for coding Skills. Display line numbers are
  // separate from code text so copying code never includes the numbers.
  function numberedCode(lines, options = {}) {
    const pre = global.document.createElement('pre');
    pre.className = 'erl rhsc-code-lines';
    lines.forEach((line, index) => {
      const row = global.document.createElement('span');
      row.className = 'rhsc-code-line';
      row.dataset.line = String(index + 1);
      const number = global.document.createElement('span');
      number.className = 'rhsc-code-line-number';
      number.textContent = String(index + 1).padStart(2, '0');
      number.setAttribute('aria-hidden', 'true');
      const source = global.document.createElement('span');
      source.className = 'rhsc-code-line-text';
      source.textContent = line;
      if (options.startLine === index + 1) {
        const marker = global.document.createElement('mark');
        marker.className = 'rhsc-skill-start';
        marker.textContent = 'START HERE';
        source.append(' ', marker);
      }
      row.append(number, source);
      pre.append(row);
    });
    return pre;
  }
  function highlightCodeLine(pre, lineNumber) {
    pre.querySelectorAll('.rhsc-code-line').forEach(row => {
      row.classList.toggle('is-active', row.dataset.line === String(lineNumber));
    });
  }
  // Shared first-answer recording bridge for assigned Conversion Grid work.
  // The Worker resolves the anonymous pupil from their existing session.
  // A workKey in the URL is an activity reference, never authentication.
  function pilotQuestionContext(paper, sourceKey, level, assignmentKey) {
    const isH446 = new URLSearchParams(global.location.search).get('course') === 'h446';
    const assignmentPattern = isH446
      ? /^(12|13)\|h446-skill-p1-convert\|both$/
      : /^(10|11)\|j277-skill-p1-convert\|both$/;
    if (paper !== 1 || sourceKey !== 'convert' ||
        !['easy', 'medium'].includes(level) ||
        !assignmentPattern.test(assignmentKey || '')) return null;
    let session = '';
    try { session = global.sessionStorage.getItem('rhs-my-work-learner-session-v1') || ''; } catch (_) {}
    if (!/^[A-Za-z0-9_-]{43}$/.test(session) || !global.crypto?.randomUUID || !global.fetch) return null;
    return { assignmentKey, session };
  }
  function reportQuestion(paper, sourceKey, level, firstTryCorrect) {
    if (typeof firstTryCorrect !== 'boolean' ||
        !global.location.pathname.startsWith('/exercise/paper1/')) return false;
    const assignmentKey = new URLSearchParams(global.location.search).get('workKey');
    const context = pilotQuestionContext(paper, sourceKey, level, assignmentKey);
    if (!context) return false;
    const attemptId = global.crypto.randomUUID();
    global.fetch('https://rhsccs-my-work-api.jeromedthompson.workers.dev/v1/questions', {
      method: 'POST', keepalive: true, cache: 'no-store',
      headers: { 'content-type': 'application/json', authorization: 'Bearer ' + context.session },
      body: JSON.stringify({ assignmentKey, attemptId, level, firstTryCorrect })
    }).then(response => {
      if (!response.ok) throw new Error('My Work did not save this answer.');
      if (global.CustomEvent) global.dispatchEvent?.(new global.CustomEvent('rhsc-my-work-score-saved', {
        detail: { paper, sourceKey, level, firstTryCorrect }
      }));
    }).catch(() => {
      if (global.CustomEvent) global.dispatchEvent?.(new global.CustomEvent('rhsc-my-work-score-failed', {
        detail: { paper, sourceKey, level }
      }));
    });
    return true;
  }
  // A fictional, browser-only score bridge. URL context is set by My Work; it is
  // not authentication and must never be used for real pupil records.
  function reportCompletion(paper, sourceKey, level, correct, total) {
    try {
      const params = new URLSearchParams(global.location.search);
      const student = params.get('workCode');
      const assignmentKey = params.get('workKey');
      if (![1, 2].includes(paper) || !global.location.pathname.startsWith('/exercise/paper' + paper + '/')) return false;
      if (!/^[a-z-]+$/.test(sourceKey) || !['easy', 'medium'].includes(level)) return false;
      if (!Number.isInteger(correct) || !Number.isInteger(total) || total < 1 || correct < 0 || correct > total) return false;
      // These learners save on the first valid Check, not after ten questions.
      // Keep the old round-reporting path only for fictional local demos.
      if (pilotQuestionContext(paper, sourceKey, level, assignmentKey)) return true;
      // H446 scores are assignment-only, never stored in the J277 demo.
      if (params.get('course') === 'h446') return false;
      if (!/^Y(10|11)-(0[1-9]|[12][0-9]|30)$/.test(student || '') || !assignmentKey) return false;
      const key = 'rhs-j277-teacher-demo-v1';
      const data = JSON.parse(global.localStorage.getItem(key) || '{}');
      if (!data || !Array.isArray(data.assignments) || !Array.isArray(data.results)) return false;
      const year = Number(student.slice(1, 3));
      const itemId = 'j277-skill-p' + paper + '-' + sourceKey;
      if (!data.assignments.some(a =>
        a.key === assignmentKey && a.year === year && a.itemId === itemId && a.level === 'both'
      )) return false;
      data.results.push({
        student, assignmentKey, level,
        score: Math.round(100 * correct / total),
        at: new Date().toISOString(), source: 'automatic-skill'
      });
      global.localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (_) { return false; }
  }
  global.RHSCSkills = Object.freeze({ LEVELS, validLevel, levelFromUrl, updateLevelUrl, readProgress, writeProgress, numberedCode, highlightCodeLine, reportQuestion, reportCompletion });
})(window);

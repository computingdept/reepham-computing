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
  function numberedCode(lines) {
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
  // A fictional, browser-only score bridge. URL context is set by My Work; it is
  // not authentication and must never be used for real pupil records.
  function reportCompletion(paper, sourceKey, level, correct, total) {
    try {
      const params = new URLSearchParams(global.location.search);
      const student = params.get('workCode');
      const assignmentKey = params.get('workKey');
      if (!/^Y(10|11)-(0[1-9]|[12][0-9]|30)$/.test(student || '') || !assignmentKey) return false;
      if (![1, 2].includes(paper) || !global.location.pathname.startsWith('/exercise/paper' + paper + '/')) return false;
      if (!/^[a-z-]+$/.test(sourceKey) || !['easy', 'medium'].includes(level)) return false;
      if (!Number.isInteger(correct) || !Number.isInteger(total) || total < 1 || correct < 0 || correct > total) return false;
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
  global.RHSCSkills = Object.freeze({ LEVELS, validLevel, levelFromUrl, updateLevelUrl, readProgress, writeProgress, numberedCode, highlightCodeLine, reportCompletion });
})(window);

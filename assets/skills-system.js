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
  global.RHSCSkills = Object.freeze({ LEVELS, validLevel, levelFromUrl, updateLevelUrl, readProgress, writeProgress });
})(window);

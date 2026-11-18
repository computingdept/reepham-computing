// Optional bridge from existing H446 MCQ results to assigned My Work.
// Does nothing for ordinary (unassigned) revision practice.
(() => {
  'use strict';
  const key = new URLSearchParams(location.search).get('workKey') || '';
  const match = /^(12|13)\|(h446-practice-[a-z0-9-]+)\|$/.exec(key);
  if (!match || !/^\/revision\/h446\/section-[0-9-]+\/index\.html$/.test(location.pathname)) return;
  const topicId = match[2].slice('h446-practice-'.length);
  let session = '';
  try { session = sessionStorage.getItem('rhs-my-work-learner-session-v1') || ''; } catch { /* Browser storage might be disabled. */ }
  const ready = /^[A-Za-z0-9_-]{43}$/.test(session) && !!globalThis.crypto?.randomUUID;
  const isQuestionPilot = topicId === '141-a';

  const note = document.querySelector('.save-info .save-note');
  if (note) note.textContent = ready
    ? (isQuestionPilot
      ? 'Assigned work: each checked answer saves to My Work. A copy also stays on this browser.'
      : 'Assigned work: your first-check score saves to My Work when you finish the quiz.')
    : 'To save this assignment to My Work, open it from your signed-in My Work page.';

  const status = document.createElement('p');
  status.id = 'rhsc-work-result-status';
  status.setAttribute('role', 'status');
  status.setAttribute('aria-live', 'polite');
  status.style.fontWeight = '750';
  status.style.color = '#006347';
  status.style.margin = '10px 0';
  document.getElementById('results')?.append(status);

  function reportCompletedQuiz(id, correct, total) {
    if (isQuestionPilot || !ready || id !== topicId ||
        location.hash.split('/').at(-1) !== id ||
        !Number.isInteger(correct) || !Number.isInteger(total) || total < 1 || correct < 0 || correct > total) {
      if (!ready && status) status.textContent = 'Your result is on this browser only. Sign in through My Work to record it.';
      return false;
    }
    const attemptId = crypto.randomUUID();
    status.textContent = 'Saving this completed quiz to My Work…';
    fetch('https://rhsccs-my-work-api.jeromedthompson.workers.dev/v1/attempts', {
      method: 'POST', keepalive: true, cache: 'no-store',
      headers: { 'content-type': 'application/json', authorization: 'Bearer ' + session },
      body: JSON.stringify({ assignmentKey: key, attemptId, score: Math.round(100 * correct / total), level: '', source: 'practice' })
    }).then(response => {
      if (!response.ok) throw Error('My Work rejected the result.');
      status.textContent = 'Quiz score saved to My Work.';
    }).catch(() => {
      status.textContent = 'Could not save this quiz to My Work. Your answers are still saved on this browser; please tell your teacher.';
      status.style.color = '#9b2828';
    });
    return true;
  }

  window.RHSCMyWorkH446 = Object.freeze({ reportCompletedQuiz });
})();

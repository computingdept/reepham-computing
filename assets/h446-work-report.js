// Optional bridge from existing J277/H446 MCQ results to assigned My Work.
// Does nothing for ordinary (unassigned) revision practice.
(() => {
  'use strict';
  const key = new URLSearchParams(location.search).get('workKey') || '';
  const match = /^(10|11|12|13)\|((?:j277|h446)-practice-[a-z0-9-]+)\|$/.exec(key);
  const course = Number(match?.[1]) <= 11 ? 'j277' : 'h446';
  if (!match || !match[2].startsWith(course + '-practice-') ||
      !new RegExp(`^/revision/${course}/section-[0-9-]+/index\\.html$`).test(location.pathname)) return;
  const topicId = match[2].slice((course + '-practice-').length);
  let session = '';
  try { session = sessionStorage.getItem('rhs-my-work-learner-session-v1') || ''; } catch { /* Browser storage might be disabled. */ }
  const ready = /^[A-Za-z0-9_-]{43}$/.test(session) && !!globalThis.crypto?.randomUUID;
  // H446 1.4.1(a) already reports via RHSCSkills and must not be counted twice.
  const isQuestionPilot = course === 'h446' && topicId === '141-a';
  const isAssigned = id => ready && id === topicId && location.hash.split('/').at(-1) === id;

  const note = document.querySelector('.save-info .save-note');
  let questionTracking = null; // Wait for the deployed Worker to advertise this capability.
  let questionQueue = [];
  let savedAnswers = 0;
  let failedAnswers = 0;
  function updateNote() {
    if (!note) return;
    if (!ready) note.textContent = 'To save this assignment to My Work, open it from your signed-in My Work page.';
    else if (isQuestionPilot) note.textContent = 'Assigned work: each checked answer saves to My Work. A copy also stays on this browser.';
    else if (questionTracking === null) note.textContent = 'Assigned work: checking whether individual answers can save to My Work…';
    else if (!questionTracking) note.textContent = 'Assigned work: your completed quiz saves to My Work. Individual-answer saving is temporarily unavailable.';
    else if (failedAnswers) note.textContent = `${savedAnswers} checked answer(s) saved; ${failedAnswers} could not save. Your answers remain on this browser. Please tell your teacher.`;
    else if (savedAnswers) note.textContent = `${savedAnswers} checked answer(s) saved to My Work. You may stop before question 10.`;
    else note.textContent = 'Assigned work: every first-checked answer saves to My Work, even if you stop before question 10.';
  }
  updateNote();

  function sendCheckedAnswer(attemptId, correct) {
    fetch('https://rhsccs-my-work-api.jeromedthompson.workers.dev/v1/questions', {
      method: 'POST', keepalive: true, cache: 'no-store',
      headers: { 'content-type': 'application/json', authorization: 'Bearer ' + session },
      body: JSON.stringify({ assignmentKey: key, attemptId, level: 'quiz', firstTryCorrect: correct })
    }).then(response => {
      if (!response.ok) throw Error('My Work rejected the answer.');
      savedAnswers++;
      updateNote();
    }).catch(() => { failedAnswers++; updateNote(); });
  }

  if (ready && !isQuestionPilot) {
    fetch('https://rhsccs-my-work-api.jeromedthompson.workers.dev/v1/health', { cache: 'no-store' })
      .then(response => response.ok ? response.json() : null)
      .then(data => {
        questionTracking = data?.mcqQuestionTracking === 'v1';
        if (questionTracking) questionQueue.forEach(({ attemptId, correct }) => sendCheckedAnswer(attemptId, correct));
        questionQueue = [];
        updateNote();
      }).catch(() => { questionTracking = false; questionQueue = []; updateNote(); });
  }

  function reportCheckedAnswer(id, correct) {
    if (isQuestionPilot || !isAssigned(id) || typeof correct !== 'boolean' || questionTracking === false) return false;
    const attemptId = crypto.randomUUID();
    if (questionTracking === null) questionQueue.push({ attemptId, correct });
    else sendCheckedAnswer(attemptId, correct);
    return true;
  }

  const status = document.createElement('p');
  status.id = 'rhsc-work-result-status';
  status.setAttribute('role', 'status');
  status.setAttribute('aria-live', 'polite');
  status.style.fontWeight = '750';
  status.style.color = '#006347';
  status.style.margin = '10px 0';
  document.getElementById('results')?.append(status);

  function reportCompletedQuiz(id, correct, total) {
    if (isQuestionPilot || !isAssigned(id) ||
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

  window.RHSCMyWorkH446 = Object.freeze({ reportCompletedQuiz, reportCheckedAnswer, isAssigned });
})();

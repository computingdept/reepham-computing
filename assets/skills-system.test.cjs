const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const script = fs.readFileSync(path.join(__dirname, 'skills-system.js'), 'utf8');
const assignment = '10|j277-skill-p1-convert|both';
const token = 'T'.repeat(43);

function loadBridge({ session = token, query = '?skill=convert&workKey=' + encodeURIComponent(assignment),
  pathname = '/exercise/paper1/', hash = '' } = {}) {
  const calls = [];
  const events = [];
  const window = {
    location: { pathname, search: query, hash },
    sessionStorage: { getItem: () => session },
    localStorage: { getItem: () => null, setItem: () => {} },
    crypto: { randomUUID: () => '11111111-1111-4111-8111-111111111111' },
    fetch: (url, options) => {
      calls.push({ url, options });
      return Promise.resolve({ ok: true });
    },
    CustomEvent: class { constructor(name, options) { this.type = name; this.detail = options.detail; } },
    dispatchEvent: event => { events.push(event.type); },
    history: { replaceState: () => {} },
    document: {}
  };
  vm.runInNewContext(script, { window, URLSearchParams, URL });
  return { bridge: window.RHSCSkills, calls, events };
}

test('Conversion Grid saves one first-checked answer immediately, never a PIN or practice code', async () => {
  const { bridge, calls, events } = loadBridge();
  assert.equal(bridge.reportQuestion(1, 'convert', 'easy', false), true);
  assert.equal(bridge.reportCompletion(1, 'convert', 'easy', 7, 10), true, 'No second write for a completed round');
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(calls.length, 1);
  assert.match(calls[0].url, /\/v1\/questions$/);
  assert.equal(calls[0].options.keepalive, true);
  assert.equal(calls[0].options.headers.authorization, 'Bearer ' + token);
  const payload = JSON.parse(calls[0].options.body);
  assert.equal(payload.firstTryCorrect, false);
  assert.equal(payload.assignmentKey, assignment);
  assert.equal(payload.level, 'easy');
  assert.match(payload.attemptId, /^[0-9a-f-]{36}$/i);
  assert.equal('code' in payload, false);
  assert.equal('password' in payload, false);
  assert.deepEqual(events, ['rhsc-my-work-score-saved']);
});

test('unassigned Skills, hard level and missing session cannot record', () => {
  const x = loadBridge();
  assert.equal(x.bridge.reportQuestion(1, 'add', 'easy', true), false);
  assert.equal(x.bridge.reportQuestion(1, 'convert', 'hard', true), false);
  assert.equal(x.bridge.reportQuestion(1, 'convert', 'easy', null), false);
  assert.equal(x.calls.length, 0);
  const y = loadBridge({ session: '' });
  assert.equal(y.bridge.reportQuestion(1, 'convert', 'easy', true), false);
  assert.equal(y.calls.length, 0);
  const z = loadBridge({ query: '?skill=convert' });
  assert.equal(z.bridge.reportQuestion(1, 'convert', 'easy', true), false);
  assert.equal(z.calls.length, 0);
});

test('H446 assigned classwork uses the same question recording, with separate assignment', () => {
  const y12 = loadBridge({ query: '?course=h446&skill=convert&workKey=12%7Ch446-skill-p1-convert%7Cboth' });
  assert.equal(y12.bridge.reportQuestion(1, 'convert', 'medium', true), true);
  assert.equal(JSON.parse(y12.calls[0].options.body).assignmentKey, '12|h446-skill-p1-convert|both');
});

test('H446 1.4.1(a) MCQ saves individual answers without altering unrelated quizzes', () => {
  const quiz = loadBridge({
    pathname: '/revision/h446/section-1-4/index.html', hash: '#1.4.1/141-a',
    query: '?workKey=12%7Ch446-practice-141-a%7C'
  });
  assert.equal(quiz.bridge.reportQuestion(1, 'h446-practice-141-a', 'quiz', false), true);
  assert.equal(quiz.calls.length, 1);
  const payload = JSON.parse(quiz.calls[0].options.body);
  assert.deepEqual({ assignmentKey: payload.assignmentKey, level: payload.level, firstTryCorrect: payload.firstTryCorrect },
    { assignmentKey: '12|h446-practice-141-a|', level: 'quiz', firstTryCorrect: false });
  assert.equal(quiz.calls[0].options.headers.authorization, 'Bearer ' + token);
  assert.equal('code' in payload, false);
  const otherQuiz = loadBridge({
    pathname: '/revision/h446/section-1-4/index.html', hash: '#1.4.1/141-b',
    query: '?workKey=12%7Ch446-practice-141-a%7C'
  });
  assert.equal(otherQuiz.bridge.reportQuestion(1, 'h446-practice-141-a', 'quiz', true), false);
  assert.equal(otherQuiz.calls.length, 0);
  const noAssignment = loadBridge({ pathname: '/revision/h446/section-1-4/index.html', hash: '#1.4.1/141-a', query: '' });
  assert.equal(noAssignment.bridge.reportQuestion(1, 'h446-practice-141-a', 'quiz', true), false);
});

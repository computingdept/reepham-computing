const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const script = fs.readFileSync(path.join(__dirname, 'skills-system.js'), 'utf8');
const assignment = '10|j277-skill-p1-convert|both';
const token = 'T'.repeat(43);

function loadBridge({ session = token, query = '?skill=convert&workKey=' + encodeURIComponent(assignment) } = {}) {
  const calls = [];
  const events = [];
  const window = {
    location: { pathname: '/exercise/paper1/', search: query },
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

test('Conversion Grid submits first-time score with session, never a PIN or practice code', async () => {
  const { bridge, calls, events } = loadBridge();
  assert.equal(bridge.reportCompletion(1, 'convert', 'easy', 7, 10), true);
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(calls.length, 1);
  assert.match(calls[0].url, /\/v1\/attempts$/);
  assert.equal(calls[0].options.keepalive, true);
  assert.equal(calls[0].options.headers.authorization, 'Bearer ' + token);
  const payload = JSON.parse(calls[0].options.body);
  assert.equal(payload.score, 70);
  assert.equal(payload.assignmentKey, assignment);
  assert.equal(payload.level, 'easy');
  assert.equal(payload.source, 'skill');
  assert.equal('code' in payload, false);
  assert.equal('password' in payload, false);
  assert.deepEqual(events, ['rhsc-my-work-score-saved']);
});

test('unassigned Skills, hard level and missing session cannot record', () => {
  const x = loadBridge();
  assert.equal(x.bridge.reportCompletion(1, 'add', 'easy', 7, 10), false);
  assert.equal(x.bridge.reportCompletion(1, 'convert', 'hard', 7, 10), false);
  assert.equal(x.calls.length, 0);
  const y = loadBridge({ session: '' });
  assert.equal(y.bridge.reportCompletion(1, 'convert', 'easy', 7, 10), false);
  assert.equal(y.calls.length, 0);
});

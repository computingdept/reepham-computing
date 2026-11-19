import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext, Script } from 'node:vm';

const root = new URL('../../../', import.meta.url);
const source = path => readFileSync(new URL(path, root), 'utf8');
const bridge = source('assets/h446-work-report.js');
const h446Sections = ['1-1', '1-2', '1-3', '1-4', '1-5', '2-1', '2-2-1', '2-2-2', '2-3'];
const j277Sections = ['1-1', '1-2', '1-3', '1-4', '1-5', '1-6', '2-1', '2-2', '2-3', '2-4', '2-5'];

function openAssignedQuiz({ year = 12, id = '11-components', tracking = 'v1', holdHealth = false } = {}) {
  const course = year <= 11 ? 'j277' : 'h446';
  const requests = [];
  let resolveHealth;
  let uuids = 0;
  const note = { textContent: '' };
  const status = { textContent: '', style: {}, setAttribute() {} };
  const sandbox = {
    URLSearchParams,
    location: {
      search: '?workKey=' + encodeURIComponent(`${year}|${course}-practice-${id}|`),
      pathname: `/revision/${course}/section-1-1/index.html`,
      hash: '#1.1/' + id
    },
    sessionStorage: { getItem: () => 'A'.repeat(43) },
    crypto: { randomUUID: () => `00000000-0000-4000-8000-${String(++uuids).padStart(12, '0')}` },
    document: {
      querySelector: () => note,
      createElement: () => status,
      getElementById: () => ({ append() {} })
    },
    fetch: (url, options) => {
      requests.push({ url, options });
      if (url.endsWith('/v1/health')) {
        if (holdHealth) return new Promise(resolve => { resolveHealth = resolve; });
        return Promise.resolve({ ok: true, json: async () => ({ mcqQuestionTracking: tracking }) });
      }
      return Promise.resolve({ ok: true });
    }
  };
  sandbox.window = sandbox;
  runInNewContext(bridge, sandbox);
  return {
    api: sandbox.RHSCMyWorkH446,
    requests, note, status,
    releaseHealth: () => resolveHealth?.({ ok: true, json: async () => ({ mcqQuestionTracking: tracking }) })
  };
}

const settle = () => new Promise(resolve => setImmediate(resolve));

test('every J277 and H446 revision section loads the new bridge and checks one answer at a time', () => {
  for (const course of ['j277', 'h446']) {
    const sections = course === 'j277' ? j277Sections : h446Sections;
    const apps = course === 'j277' ? ['revision/j277/shared/app.js'] :
      sections.map(s => `revision/h446/section-${s}/app.js`);
    for (const app of apps) {
      const script = source(app);
      new Script(script, { filename: app });
      assert.equal(script.split('reportCheckedAnswer?.(active.id,correct)').length - 1, 1, app);
      assert.match(script, /if\(missed\.length\)\{const box=/, app + ' should give help after any mistake, even at 80%');
      assert.match(script, /Areas to revisit:/, app + ' should identify the skills to revisit');
      assert.match(script, /Revision guide/, app + ' retains its revision-guide link');
      assert.match(script, /Lesson /, app + ' retains its lesson link');
    }
    for (const section of sections) {
      const page = source(`revision/${course}/section-${section}/index.html`);
      assert.match(page, /h446-work-report\.js\?v=20261119-mcq-answers1/);
      assert.match(page, /app\.js\?v=20261119-mcq-answers1/);
      assert.match(page, /revision-ui\.js\?v=20261119-mcq-steps1/);
    }
  }
  assert.match(source('revision/h446/section-1-4/app.js'), /recordAssignedAnswer\(correct\)/,
    'Existing H446 1.4.1(a) per-answer reporter remains in place');
});

test('visible progress dashes grow from five to ten when an assigned MCQ starts', () => {
  const shared = source('revision/shared/revision-ui.js');
  new Script(shared);
  const start = shared.indexOf('  const counter=document.getElementById(\'counter\');');
  const end = shared.indexOf('  // Existing site-nav.js', start);
  assert.ok(start > 0 && end > start);
  const counter = { textContent: 'Question 1 of 5' };
  const progress = { max: 5, after(node) { this.steps = node; } };
  const quiz = { querySelector(selector) { return selector === '#progress' ? progress : null; } };
  let observerCallback;
  const document = {
    getElementById: () => counter,
    createElement: type => ({
      className: '', children: [], classes: {},
      setAttribute() {},
      append(child) { this.children.push(child); },
      replaceChildren() { this.children.length = 0; },
      classList: { toggle(name, selected) { this[name] = selected; } }
    })
  };
  const MutationObserver = class {
    constructor(callback) { observerCallback = callback; }
    observe() {}
  };
  runInNewContext(`(()=>{const quiz=globalThis.quiz; ${shared.slice(start, end)}})()`,
    { document, quiz, MutationObserver });
  assert.equal(progress.steps.children.length, 5);
  progress.max = 10;
  counter.textContent = 'Question 4 of 10';
  observerCallback();
  assert.equal(progress.steps.children.length, 10, 'Ten progress dashes appear for assigned work');
  assert.equal(progress.steps.children[3].classList['is-current'], true);
  assert.equal(progress.steps.children[2].classList['is-complete'], true);
  progress.max = 5;
  counter.textContent = 'Question 1 of 5';
  observerCallback();
  assert.equal(progress.steps.children.length, 5, 'Normal five-question practice retains five dashes');
});

test('new Worker capability queues early checks and saves each first answer and final quiz separately', async () => {
  const page = openAssignedQuiz({ holdHealth: true });
  assert.ok(page.api.isAssigned('11-components'));
  assert.equal(page.api.reportCheckedAnswer('11-components', true), true);
  assert.equal(page.requests.length, 1, 'Before health resolves, answers are queued');
  page.releaseHealth();
  await settle();
  const question = page.requests.find(r => r.url.endsWith('/v1/questions'));
  assert.deepEqual(JSON.parse(question.options.body), {
    assignmentKey: '12|h446-practice-11-components|',
    attemptId: '00000000-0000-4000-8000-000000000001',
    level: 'quiz', firstTryCorrect: true
  });
  assert.equal(page.api.reportCheckedAnswer('11-components', false), true);
  page.api.reportCompletedQuiz('11-components', 1, 2);
  await settle();
  assert.equal(page.requests.filter(r => r.url.endsWith('/v1/questions')).length, 2);
  const result = page.requests.find(r => r.url.endsWith('/v1/attempts'));
  assert.equal(JSON.parse(result.options.body).score, 50);
  assert.match(page.note.textContent, /2 checked answer/);
});

test('older Worker retains completed-quiz scores without submitting unsupported question events', async () => {
  const page = openAssignedQuiz({ year: 10, tracking: null, holdHealth: true });
  assert.equal(page.api.reportCheckedAnswer('11-components', true), true);
  page.releaseHealth();
  await settle();
  assert.equal(page.requests.filter(r => r.url.endsWith('/v1/questions')).length, 0);
  page.api.reportCompletedQuiz('11-components', 3, 5);
  await settle();
  assert.equal(page.requests.filter(r => r.url.endsWith('/v1/attempts')).length, 1);
  assert.match(page.note.textContent, /completed quiz saves/);
});

test('H446 1.4.1(a) keeps its existing reporter without double-submitting, and other topics are gated', async () => {
  const original = openAssignedQuiz({ id: '141-a' });
  assert.equal(original.api.reportCheckedAnswer('141-a', true), false);
  assert.equal(original.api.reportCompletedQuiz('141-a', 8, 10), false);
  assert.equal(original.requests.length, 0, 'RHSCSkills remains the single sender for this one quiz');
  const page = openAssignedQuiz();
  assert.equal(page.api.reportCheckedAnswer('11-buses', true), false);
  assert.equal(page.api.reportCompletedQuiz('11-buses', 8, 10), false);
  assert.equal(page.requests.filter(r => r.url.endsWith('/v1/questions')).length, 0);
});

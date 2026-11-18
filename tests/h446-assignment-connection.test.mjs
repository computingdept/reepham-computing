import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createContext, runInContext, Script } from 'node:vm';
import test from 'node:test';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const catalog = JSON.parse(readFileSync(join(root, 'assets/j277-assignment-catalog.json'), 'utf8')).items;
const script = readFileSync(join(root, 'assets/h446-work-report.js'), 'utf8');
const sections = ['1-1','1-2','1-3','1-4','1-5','2-1','2-2-1','2-2-2','2-3'];
const h446 = catalog.filter(item => item.id.startsWith('h446-'));

test('complete H446 catalogue preserves J277 and has genuine published routes', () => {
  assert.equal(catalog.filter(item => item.id.startsWith('j277-')).length, 95);
  assert.equal(h446.filter(item => item.type === 'skill').length, 16);
  assert.equal(h446.filter(item => item.type === 'practice').length, 157);
  assert.equal(new Set(catalog.map(item => item.id)).size, catalog.length);
  for (const item of h446) {
    assert.match(item.id, /^h446-(skill|practice)-[a-z0-9-]+$/);
    assert.match(item.spec, /^\d\.\d/);
    assert.ok([1,2].includes(item.paper));
    const url = new URL(item.url, 'https://rhsccs.org');
    assert.ok(existsSync(join(root, url.pathname.replace(/^\//,'')) ), `Published page exists: ${item.url}`);
    assert.ok(['completion','question','link-only'].includes(item.tracking));
    if (item.type === 'practice') assert.ok(['completion','question'].includes(item.tracking));
  }
  assert.equal(h446.filter(item => item.tracking === 'link-only').length, 15);
  assert.equal(h446.filter(item => item.tracking === 'question').length, 2);
  assert.equal(h446.filter(item => item.tracking === 'completion').length, 156);
});

test('every published MCQ bank topic has one deep link and a reporting hook', () => {
  for (const section of sections) {
    const base = join(root, 'revision/h446/section-' + section);
    const topics = runInContext(readFileSync(join(base, 'bank.js'), 'utf8') + '\nSKILLS', createContext({}));
    const html = readFileSync(join(base, 'index.html'), 'utf8');
    const app = readFileSync(join(base, 'app.js'), 'utf8');
    new Script(app, { filename: section + '-app.js' });
    assert.match(html, /<script src="\/assets\/h446-work-report\.js\?v=[^"]+"><\/script>/);
    assert.ok(html.indexOf('/assets/h446-work-report.js') < html.indexOf('src="app.js'), 'Reporter loads before quiz code');
    assert.match(app, /window\.RHSCMyWorkH446\?\.reportCompletedQuiz\(active\.id,correct,questions\.length\)/);
    for (const topic of topics) {
      const entry = h446.find(item => item.id === 'h446-practice-' + topic.id);
      assert.ok(entry, `${section}/${topic.id} listed`);
      assert.equal(entry.url, `/revision/h446/section-${section}/index.html#${topic.section}/${topic.id}`);
      assert.equal(entry.spec, topic.spec);
    }
  }
});

function reporterHarness({ key = '12|h446-practice-11-components|', topic = '11-components', session = 'a'.repeat(43) } = {}) {
  const results = { append() {} };
  const note = { textContent: '' };
  const status = { textContent: '', style: {}, setAttribute() {} };
  const requests = [];
  const context = createContext({
    location: { search: key ? `?workKey=${encodeURIComponent(key)}` : '',
      pathname:'/revision/h446/section-1-1/index.html', hash:'#1.1/' + topic },
    URLSearchParams, Number, JSON, Promise,
    sessionStorage: { getItem: () => session },
    document: { querySelector: () => note, createElement: () => status, getElementById: () => results },
    fetch: (...args) => { requests.push(args); return Promise.resolve({ ok:true }); },
    crypto: { randomUUID: () => '12345678-1234-1234-1234-123456789abc' },
    window: {}
  });
  runInContext(script, context);
  return { report: context.window.RHSCMyWorkH446?.reportCompletedQuiz, requests, status, note };
}

test('completed assigned H446 quiz saves percentage through the existing student-session API', async () => {
  const { report, requests, status, note } = reporterHarness();
  assert.match(note.textContent, /first-check score saves/);
  assert.equal(report('11-components',4,5), true);
  assert.equal(requests.length, 1);
  const [url, options] = requests[0];
  assert.match(url, /\/v1\/attempts$/);
  assert.equal(options.method, 'POST');
  assert.equal(options.headers.authorization, 'Bearer ' + 'a'.repeat(43));
  assert.deepEqual(JSON.parse(options.body), {
    assignmentKey:'12|h446-practice-11-components|',
    attemptId:'12345678-1234-1234-1234-123456789abc',
    score:80, level:'', source:'practice'
  });
  await Promise.resolve(); await Promise.resolve();
  assert.match(status.textContent, /saved to My Work/);
});

test('unassigned, mismatched, and incomplete sessions never send a result', () => {
  const unassigned = reporterHarness({ key:'' });
  assert.equal(unassigned.report, undefined);
  assert.equal(unassigned.requests.length, 0);
  const wrongTopic = reporterHarness();
  assert.equal(wrongTopic.report('11-buses',5,5), false);
  assert.equal(wrongTopic.requests.length, 0);
  const noSession = reporterHarness({ session:'' });
  assert.equal(noSession.report('11-components',5,5), false);
  assert.equal(noSession.requests.length, 0);
  const questionPilot = reporterHarness({ key:'12|h446-practice-141-a|', topic:'141-a' });
  assert.equal(questionPilot.report('141-a',5,5), false);
  assert.equal(questionPilot.requests.length, 0);
});

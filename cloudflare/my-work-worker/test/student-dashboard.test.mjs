import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const script = readFileSync(new URL('../../../assets/my-work-student.js', import.meta.url), 'utf8');
const assignment = (id, title, type, itemId, changes = {}) => ({
  packageId:id, packageTitle:title, workType:type,
  createdAt:'2026-11-19 09:00:00', dueDate:'2026-11-26',
  itemId, assignmentKey:'12|' + itemId + '|',
  available:true, attempts:0, questionsAttempted:0, firstTryCorrect:0,
  ...changes
});
const items = [
  { id:'h446-practice-141-a', url:'/revision/h446/section-1-4/index.html', tracking:'question', title:'Primitive data types' },
  { id:'h446-practice-11-components', url:'/revision/h446/section-1-1/index.html', tracking:'completion', title:'CPU' },
  { id:'h446-practice-23-complexity', url:'/revision/h446/section-2-3/index.html', tracking:'completion', title:'Big O' },
  { id:'h446-skill-p2-bigo', url:'/revision/h446/section-2-3/big-o-lab.html', tracking:'link-only', title:'Big O Lab' }
];

async function render(view, work, search = '') {
  const app = { innerHTML:'', addEventListener() {} };
  const sessionStorage = { getItem:() => 'fictional-session', setItem() {}, removeItem() {} };
  const fetch = async url => ({ ok:true, json:async () =>
    String(url).includes('assignment-catalog') ? { items } : { cohort:'Y12', independentOpen:true, work } });
  const context = { document:{ body:{ dataset:{ page:view } }, getElementById:id => id === 'app' ? app : null },
    sessionStorage, fetch, location:{ search, origin:'https://rhsccs.org', assign() {} },
    URL, URLSearchParams, console };
  runInNewContext(script, context);
  await new Promise(resolve => setTimeout(resolve,0));
  return app.innerHTML;
}

test('student dashboard shows two gauges, three relevant homework rows and no pilot results', async () => {
  const work = [
    assignment('hw-1','Binary homework','homework','h446-practice-141-a', { questionsAttempted:6, firstTryCorrect:5, dueDate:'2026-11-20' }),
    assignment('hw-2','Boolean revision','homework','h446-practice-11-components', { dueDate:'2026-11-23' }),
    assignment('hw-3','Complexity review','homework','h446-practice-23-complexity', { attempts:1, bestScore:80, dueDate:'2026-11-18' }),
    assignment('hw-4','Fourth homework','homework','h446-skill-p2-bigo', { dueDate:'2026-12-01' }),
    assignment('cw-1','CPU classwork','classwork','h446-practice-11-components', { attempts:1, bestScore:70 }),
    assignment('pilot-20261119-Y12','Pilot Year 12','classwork','h446-practice-141-a', { attempts:1 })
  ];
  const html = await render('dashboard',work);
  assert.match(html,/Homework/);
  assert.match(html,/Classwork/);
  assert.match(html,/Binary homework/);
  assert.match(html,/Boolean revision/);
  assert.match(html,/Fourth homework/);
  assert.doesNotMatch(html,/Complexity review/,'A completed older assignment comes after the three outstanding ones');
  assert.doesNotMatch(html,/Pilot Year 12/);
  assert.doesNotMatch(html,/CPU classwork/,'Classwork activities belong on their separate progress page');
  assert.match(html,/0%/,'Six checked answers must not masquerade as a completed quiz');
  assert.match(html,/100%/,'A completed classwork quiz counts as recorded completion');
});

test('homework progress page displays past records, individual checked answers and safe activity links', async () => {
  const work = [assignment('hw-1','Binary homework','homework','h446-practice-141-a', {
    questionsAttempted:6, firstTryCorrect:5, available:false
  })];
  const html = await render('progress',work,'?type=homework&assignment=hw-1');
  assert.match(html,/Homework progress/);
  assert.match(html,/6 checked · 5 correct first time/);
  assert.match(html,/not currently open for new attempts/);
  assert.doesNotMatch(html,/workKey=/,'Expired homework cannot launch a recorded activity');
  const active = await render('progress',[{ ...work[0], available:true }],'?type=homework');
  assert.match(active,/workKey=12%7Ch446-practice-141-a%7C/);
});

test('empty student dashboard does not invent results or display a 0% score', async () => {
  const html = await render('dashboard',[]);
  assert.match(html,/No homework has been set/);
  assert.match(html,/No assignments yet/);
  assert.doesNotMatch(html,/NaN|Pilot Year/);
});

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createContext, runInContext, Script } from 'node:vm';
import test from 'node:test';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const catalog = JSON.parse(readFileSync(join(root, 'assets/j277-assignment-catalog.json'), 'utf8')).items;
const sections = {
  j277:['1-1','1-2','1-3','1-4','1-5','1-6','2-1','2-2','2-3','2-4','2-5'],
  h446:['1-1','1-2','1-3','1-4','1-5','2-1','2-2-1','2-2-2','2-3']
};

test('all 227 published revision topics offer ten questions in the assigned pilot', () => {
  let count = 0;
  for (const [course, folders] of Object.entries(sections)) {
    for (const section of folders) {
      const bank = readFileSync(join(root,`revision/${course}/section-${section}/bank.js`),'utf8');
      const topics = runInContext(bank + '\nSKILLS',createContext({}));
      for (const topic of topics) {
        assert.equal(topic.questions.length,10,`${course} ${topic.id}: ten questions`);
        const catalogItem = catalog.find(item => item.id === `${course}-practice-${topic.id}`);
        assert.ok(catalogItem,`${course} ${topic.id}: visible in assignments`);
        assert.match(catalogItem.subtitle,/10.question/i);
        count++;
      }
      const html = readFileSync(join(root,`revision/${course}/section-${section}/index.html`),'utf8');
      assert.ok(html.indexOf('/assets/h446-work-report.js') < html.indexOf('src="app.js') ||
        (course === 'j277' && html.indexOf('/assets/h446-work-report.js') < html.indexOf('/shared/app.js')),
        `${course} ${section}: score reporter loaded before app`);
      const app = readFileSync(join(root,course === 'j277' ? 'revision/j277/shared/app.js' : `revision/h446/section-${section}/app.js`),'utf8');
      new Script(app,{filename:`${course}-${section}.js`});
      assert.match(app,/RHSCMyWorkH446\?\.isAssigned\(t\.id\)/);
      assert.match(app,/\?t\.questions:t\.questions\.slice\(/);
    }
  }
  assert.equal(count,227);
});

test('J277 Year 11 assigned revision saves a ten-question score via the session API', async () => {
  const script = readFileSync(join(root,'assets/h446-work-report.js'),'utf8');
  const posted = [];
  const note = { textContent:'' }, status = { textContent:'', style:{}, setAttribute(){} };
  const context = createContext({
    location:{ search:'?workKey=11%7Cj277-practice-11-components%7C', pathname:'/revision/j277/section-1-1/index.html', hash:'#1.1/11-components' },
    URLSearchParams,Number,JSON,Promise,
    sessionStorage:{getItem:()=>'A'.repeat(43)},
    document:{querySelector:()=>note,createElement:()=>status,getElementById:()=>({append(){}})},
    fetch:(...args)=>{ posted.push(args);return Promise.resolve({ok:true}); },
    crypto:{randomUUID:()=> '12345678-1234-1234-1234-123456789abc'},window:{}
  });
  runInContext(script,context);
  assert.equal(context.window.RHSCMyWorkH446.isAssigned('11-components'),true);
  assert.equal(context.window.RHSCMyWorkH446.reportCompletedQuiz('11-components',8,10),true);
  assert.equal(posted.length,1);
  assert.deepEqual(JSON.parse(posted[0][1].body),{
    assignmentKey:'11|j277-practice-11-components|',
    attemptId:'12345678-1234-1234-1234-123456789abc',
    score:80,level:'',source:'practice'
  });
  await Promise.resolve();await Promise.resolve();
  assert.match(status.textContent,/saved to My Work/);
});

test('Year 10 and unassigned revision remain ordinary half-bank practice', () => {
  const code = readFileSync(join(root,'assets/h446-work-report.js'),'utf8');
  const context = createContext({
    location:{ search:'?workKey=10%7Cj277-practice-11-components%7C', pathname:'/revision/j277/section-1-1/index.html', hash:'#1.1/11-components' },
    URLSearchParams,sessionStorage:{getItem:()=>''},document:{querySelector:()=>null,createElement:()=>({style:{},setAttribute(){}}),getElementById:()=>({append(){}})},
    crypto:{randomUUID:()=> '12345678-1234-1234-1234-123456789abc'},window:{}
  });
  runInContext(code,context);
  assert.equal(context.window.RHSCMyWorkH446.isAssigned('11-components'),false);
});

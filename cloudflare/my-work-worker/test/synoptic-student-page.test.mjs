import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const html = readFileSync(new URL('../../../synoptic-homework.html',import.meta.url),'utf8');
const script = readFileSync(new URL('../../../assets/synoptic-homework-student.js',import.meta.url),'utf8');
const css = readFileSync(new URL('../../../assets/synoptic-homework-student.css',import.meta.url),'utf8');
const tick = () => new Promise(resolve => setTimeout(resolve,0));

test('student page loads shared Hub styles and links existing guide indices', () => {
  assert.match(html,/my-work-student\.css/);
  assert.match(html,/revision\/h446\/guide-links\.js/);
  assert.match(html,/revision\/j277\/guides\/guide-links\.js/);
  assert.match(css,/--green|var\(--green\)/);
  assert.match(css,/max-width:620px/);
});

test('fictional visual preview shows 10 dashes and saves the first checked selection locally', async () => {
  const handlers = {};
  const app = { innerHTML:'', addEventListener:(name,fn) => {handlers[name] = fn;} };
  const location = {search:'?demo=1',origin:'https://rhsccs.org'};
  const context = { document:{getElementById:() => app},location,URL,URLSearchParams,
    sessionStorage:{getItem:()=>null},fetch:async()=>({ok:true,json:async()=>({items:[]})}),
    window:{scrollTo() {}},console,setTimeout,Date,Intl };
  runInNewContext(script,context);
  await tick();
  assert.match(app.innerHTML,/Teacher visual preview/);
  assert.match(app.innerHTML,/Paper 1 · 10 questions/);
  assert.match(app.innerHTML,/Paper 2 · 10 questions/);
  const click = (action,dataset = {}) => handlers.click({preventDefault() {},target:{closest:()=>({dataset:{action,...dataset}})}});
  click('paper',{paper:'paper1'});
  assert.equal((app.innerHTML.match(/class="s-dash /g)||[]).length,10);
  assert.match(app.innerHTML,/Question 1 of 10/);
  assert.match(app.innerHTML,/Check answer/);
  click('choose',{index:'0'});
  click('check');
  await tick();
  assert.match(app.innerHTML,/Not quite — here is the explanation/);
  assert.match(app.innerHTML,/Correct answer:|Correct answer:<\/b>/);
  click('overview');
  assert.match(app.innerHTML,/1 of 20 answers checked/);
});

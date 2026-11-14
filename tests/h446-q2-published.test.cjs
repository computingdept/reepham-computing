'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
const json=file=>JSON.parse(read(file));
const bank=json('data/do-now/q2-published/h446.json');
const migration=json('data/do-now/migration/h446-source.json');

test('all 300 H446 Q2s are short, distinct, sourced earlier retrieval MCQs',()=>{
 assert.equal(bank.course,'h446');
 assert.equal(bank.status,'published');
 assert.equal(Object.keys(bank.lessons).length,300);
 for(const [id,q] of Object.entries(bank.lessons)){
  assert.ok(migration.lessons[id],`Missing H446 lesson ${id}`);
  assert.ok(typeof q.question==='string'&&q.question.endsWith('?'),id);
  assert.equal(q.options.length,4,id);
  assert.equal(new Set(q.options.map(x=>x.toLowerCase())).size,4,id);
  assert.ok(q.options.every(x=>typeof x==='string'&&!/\s/.test(x)),id);
  assert.ok(Number.isInteger(q.correctIndex)&&q.correctIndex>=0&&q.correctIndex<=3,id);
  assert.ok(typeof q.explanation==='string'&&q.explanation.length>10,id);
  if(Number(id)<=2)assert.equal(q.taughtIn,'GCSE',id);
  else{
   assert.match(q.taughtIn,/^L\d{3}$/,id);
   assert.ok(Number(q.taughtIn.slice(1))<Number(id)-1,`L${id} must retrieve earlier than previous lesson`);
   assert.ok(migration.lessons[q.taughtIn.slice(1)],`L${id} source must exist`);
  }
 }
});

test('published Q2 renderer is H446-only and preserves authored fallback',()=>{
 const script=read('assets/h446-lesson/lesson.js');
 assert.match(script,/function applyPublishedH446Q2\(\)/);
 assert.match(script,/\/lessons\\\/h446\\\/lesson-/);
 assert.match(script,/q2-published\/h446\.json/);
 assert.match(script,/bank\.status!=='published'/);
 assert.match(script,/h446-q2-original/);
 assert.match(script,/applyPublishedH446Q1\(\);\s*applyPublishedH446Q2\(\);/);
 assert.match(read('assets/h446-lesson/h446-q2.css'),/grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/);
});

test('298 standard lessons and two mind-map lessons all receive published Q2',()=>{
 for(const [id,value] of Object.entries(migration.lessons)){
  if(['036','037'].includes(id))continue;
  const html=read(value.source);
  assert.match(html,/assets\/h446-lesson\/lesson\.js/,id);
  assert.ok((html.match(/class="donow-stage"/g)||[]).length>=5,id);
 }
 const special=read('assets/h446-mindmap/presentation.js');
 assert.match(special,/function applyPublishedH446MindMapQ2\(\)/);
 assert.match(special,/q2-published\/h446\.json/);
 assert.match(special,/applyPublishedH446MindMapQ1\(\);\s*applyPublishedH446MindMapQ2\(\);/);
 assert.match(special,/class="q2-options"/);
 for(const id of ['036','037']){
  assert.match(read(`lessons/h446/lesson-${id}/guided.html`),/h446-mindmap\/presentation\.js/);
  assert.ok(bank.lessons[id]);
 }
});

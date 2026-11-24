'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const skill=require('../assets/j277-systems-skill.js');
test('All eight Skills have 30 distinct scenarios and correctly check every decision and reason',()=>{
 for(const id of ['memory','storage','cpu','security','os','utility','netperformance','netmodels']){
  const prompts=new Set();
  for(const level of ['easy','medium','hard'])for(let i=0;i<10;i++){
   const p=skill.make(id,level,i);prompts.add(p.prompt);
   assert.equal(new Set(p.choices.map(x=>x.v)).size,4);
   assert.equal(p.choices.filter(x=>x.i===p.a).length,1);
   assert.equal(skill.isCorrect(p,{a:p.a,b:0}),true);
   assert.equal(skill.isCorrect(p,{a:(p.a+1)%4,b:0}),false);
   assert.equal(skill.isComplete(p,{a:-1,b:0}),false);
   if(level!=='easy'){assert.equal(p.reasons.length,3);assert.equal(skill.isCorrect(p,{a:p.a,b:1}),false);assert.equal(skill.isComplete(p,{a:p.a,b:-1}),false);}
   else assert.equal(p.reasons,null);
  }
  assert.equal(prompts.size,30);
 }
});

test('Extended Skills mix new and original questions in ten-question rounds',()=>{
 for(const id of ['cpu','utility','security'])for(const level of ['easy','medium','hard']){
  const all=new Set();
  for(let round=0;round<4;round++){
   const current=new Set();
   for(let i=0;i<10;i++){const p=skill.make(id,level,i,round);current.add(p.prompt);all.add(p.prompt);assert.equal(skill.isCorrect(p,{a:p.a,b:0}),true);}
   assert.equal(current.size,10);
  }
  assert.equal(all.size,14);
 }
});

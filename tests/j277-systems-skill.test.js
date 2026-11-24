'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const skill=require('../assets/j277-systems-skill.js');
test('Both Skills have 30 distinct scenarios and correctly check every decision and reason',()=>{
 for(const id of ['memory','storage']){
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

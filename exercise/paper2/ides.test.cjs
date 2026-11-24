const test=require('node:test'),assert=require('node:assert/strict'),engine=require('./ides.js');
test('all 30 language, translator and IDE tasks are distinct and markable',()=>{
 const prompts=new Set();
 for(const l of ['easy','medium','hard'])for(let i=0;i<10;i++){
  const q=engine.makeQuestion(l,i),r=Object.fromEntries(q.fields.map(f=>[f.id,f.answer]));prompts.add(q.prompt);
  assert.equal(engine.checkAnswer(q,r).correct,true);assert.equal(engine.checkAnswer(q,{}).complete,false);
  for(const f of q.fields){assert.equal(f.options.filter(x=>x===f.answer).length,1);assert.equal(engine.checkAnswer(q,{...r,[f.id]:f.options.find(x=>x!==f.answer)}).correct,false);}
 }
 assert.equal(prompts.size,30);
});
test('separate demonstrations cover the three topics',()=>{assert.equal(engine.makeDemo().variants.length,3);});

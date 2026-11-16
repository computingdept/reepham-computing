const assert=require('node:assert/strict');
const engine=require('./test-data.js');
assert.deepEqual(engine.TYPE_ORDER,['Normal','Boundary','Invalid','Erroneous']);
let easyTypes={Normal:0,Boundary:0,Invalid:0,Erroneous:0};
for(let index=0;index<10;index++){
  const easy=engine.makeQuestion('easy',index),medium=engine.makeQuestion('medium',index),hard=engine.makeQuestion('hard',index);
  assert.equal(easy.visible.length,1);easyTypes[easy.visible[0].type]++;
  assert.equal(medium.visible.length,2);assert.equal(hard.samples.length,4);
  for(const sample of hard.samples){assert.match(sample.display,/ = /);assert.equal(sample.result,['Normal','Boundary'].includes(sample.type)?'Accept':'Reject');}
  assert.equal(new Set(hard.samples.map(s=>s.value)).size,4,'Every plan offers four distinct samples.');
  assert.deepEqual(new Set(hard.choices.map(s=>s.value)),new Set(hard.samples.map(s=>s.value)));
  const answerEasy={type:easy.visible[0].type};
  const answerMedium={rows:medium.visible.map(s=>({type:s.type,result:s.result})),stage:medium.stages.answer};
  const answerHard={rows:hard.samples.map(s=>({value:s.value,result:s.result})),stage:hard.stages.answer};
  for(const [q,response] of [[easy,answerEasy],[medium,answerMedium],[hard,answerHard]]){
    assert.equal(engine.checkAnswer(q,response).correct,true,`Correct ${index} ${q.level}`);
    assert.equal(engine.checkAnswer(q,{}).complete,false,`Incomplete ${index} ${q.level}`);
    assert.equal(engine.model(q).rows.length,4);
  }
  assert.equal(engine.checkAnswer(easy,{type:engine.TYPE_ORDER.find(t=>t!==easy.visible[0].type)}).correct,false);
  const mediumWrong={...answerMedium,rows:answerMedium.rows.map(r=>({...r}))};mediumWrong.rows[0].result=mediumWrong.rows[0].result==='Accept'?'Reject':'Accept';
  assert.equal(engine.checkAnswer(medium,mediumWrong).correct,false);
  const hardWrong={...answerHard,rows:answerHard.rows.map(r=>({...r}))};hardWrong.rows[1].value=hardWrong.rows[0].value;
  assert.equal(engine.checkAnswer(hard,hardWrong).correct,false);
  assert.equal(engine.checkAnswer(hard,{...answerHard,stage:hard.stages.answer==='Iterative'?'Final/terminal':'Iterative'}).correct,false);
}
assert.ok(Object.values(easyTypes).every(n=>n>=2),'Every category appears at least twice at Easy.');
const demo=engine.makeDemo();assert.equal(demo.variants.length,2);
for(const variant of demo.variants){const x=variant.example;assert.equal(x.steps[0][0],x.entryLine);assert.equal(x.steps[0][1],'START HERE');assert.ok(x.steps.every(s=>s[0]>=1&&s[0]<=x.lines.length));}
assert.throws(()=>engine.makeQuestion('hard',10));
console.log('Test Data & Plans: 30 complete cases; category coverage, expected outcomes, stages, wrong answers and 2 Demos passed.');

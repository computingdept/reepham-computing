const assert=require('node:assert/strict');
const engine=require('./thinking.js');
for(const level of ['easy','medium','hard']){
  for(let index=0;index<10;index++){
    const q=engine.makeQuestion(level,index,123+index);
    const expected=level==='easy'?q.expected:q.expected.slice();
    assert.equal(engine.checkAnswer(q,expected).correct,true,level+' '+index);
    assert.equal(q.options.length,level==='easy'?4:level==='medium'?5:8);
    assert.equal(new Set(q.options.map(x=>x.id)).size,q.options.length);
    assert.equal(engine.checkAnswer(q,null).complete,false);
    const bad=level==='easy'?'Not a principle':level==='medium'?[0,1,4]:[1,0,2,3,4,5];
    assert.equal(engine.checkAnswer(q,bad).correct,false);
    const demo=engine.makeDemo(q);
    assert.equal(demo.steps[0][1],'START HERE');
    assert.ok(demo.steps.every(step=>step[0]>=1&&step[0]<=demo.lines.length));
  }
}
const hard=engine.makeQuestion('hard',0,123);
assert.equal(engine.checkAnswer(hard,[0,1,2,3,4]).complete,false);
assert.equal(engine.checkAnswer(hard,[0,1,2,3,4,7]).correct,false);
console.log('Computational Thinking: 30 questions, 30 demos and wrong-answer checks passed.');

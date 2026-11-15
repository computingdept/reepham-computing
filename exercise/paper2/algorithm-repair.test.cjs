const assert=require('node:assert/strict');const engine=require('./algorithm-repair.js');
for(let index=0;index<10;index++)for(const level of ['easy','medium','hard']){
  const q=engine.makeQuestion(level,index),model=engine.model(q);
  assert.equal(q.code[q.line-1]===q.fix,false,'faulty line actually differs from fix');
  assert.ok(q.line>=1&&q.line<=q.code.length,'fault location valid');
  assert.ok(q.actual!==q.expected,'bug changes output');
  assert.ok(q.candidateLines.includes(q.line),'easy includes correct line');
  assert.ok(q.choices.includes(q.fix),'medium includes correct choice');
  const answer=level==='easy'?{line:q.line}:{fix:q.fix,output:q.expected};
  assert.equal(engine.checkAnswer(q,answer).correct,true,level+' '+index+' model marked');
  assert.equal(engine.checkAnswer(q,{}).complete,false,level+' '+index+' incomplete');
  const wrong=level==='easy'?{line:q.candidateLines.find(n=>n!==q.line)}:{fix:q.choices.find(x=>x!==q.fix),output:q.expected};
  assert.equal(engine.checkAnswer(q,wrong).correct,false,level+' '+index+' wrong fix');
  if(level!=='easy')assert.equal(engine.checkAnswer(q,{fix:q.fix,output:q.actual}).correct,false,'wrong retest output');
  assert.deepEqual(model,{line:q.line,fix:q.fix,expected:q.expected,why:q.why});
}
const demo=engine.makeDemo();assert.equal(demo.entryLine,8);assert.equal(demo.steps[0][1],'START HERE');
assert.ok(demo.steps.every(step=>step[0]>0&&step[0]<=demo.lines.length));
assert.equal(demo.steps.at(-1)[2],'10');
console.log('Algorithm Repair: 30 cases, fault identification, fixes, retests and model Demo passed.');

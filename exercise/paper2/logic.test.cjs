const assert=require('node:assert/strict');const e=require('./logic.js');
for(const [type,a,b,want] of [['AND',0,0,0],['AND',0,1,0],['AND',1,0,0],['AND',1,1,1],['OR',0,0,0],['OR',0,1,1],['OR',1,0,1],['OR',1,1,1],['NOT',0,null,1],['NOT',1,null,0]])assert.equal(e.gate(type,a,b),want);
const stats={easy:{zero:0,one:0},medium:{zero:0,one:0},hard:{zero:0,one:0}};
for(let i=0;i<10;i++)for(const level of ['easy','medium','hard']){
  const q=e.makeQuestion(level,i),m=e.model(q);stats[level][q.Q?'one':'zero']++;
  assert.equal(q.index,i);assert.ok(q.steps.length>=2);
  const response=Object.fromEntries(Object.entries(q.output).map(([k,v])=>[k,String(v)]));if(level==='hard')response.expression=q.expression;
  assert.equal(e.checkAnswer(q,response).correct,true,level+' '+i);
  assert.equal(e.checkAnswer(q,{}).complete,false);
  const wrong={...response,Q:String(1-q.Q)};assert.equal(e.checkAnswer(q,wrong).correct,false);
  assert.equal(m.output.Q,q.Q);
  if(level==='medium'){assert.equal(Object.keys(q.output).length,2);assert.ok(q.steps[0].startsWith('X ='));}
  if(level==='hard'){
    assert.deepEqual(Object.keys(q.output),['X','Y','Q']);assert.equal(q.expressionChoices.length,4);
    assert.equal(new Set(q.expressionChoices).size,4);assert.ok(q.expressionChoices.includes(q.expression));
    assert.equal(e.checkAnswer(q,{...response,expression:q.expressionChoices.find(x=>x!==q.expression)}).correct,false);
  }
}
for(const level of ['easy','medium','hard'])assert.deepEqual(stats[level],{zero:5,one:5},'Balanced outputs for '+level);
const demo=e.makeDemo();assert.equal(demo.variants.length,2);
for(const {example} of demo.variants){assert.equal(example.steps[0][0],example.entryLine);assert.equal(example.steps[0][1],'START HERE');assert.ok(example.steps.every(step=>step[0]>=1&&step[0]<=example.lines.length));}
assert.throws(()=>e.makeQuestion('hard',10));assert.throws(()=>e.gate('XOR',1,1));
console.log('Logic Gates: gate tables, 30 cases, 5/5 outcomes per level, expressions, two Demos and auto-marking passed.');

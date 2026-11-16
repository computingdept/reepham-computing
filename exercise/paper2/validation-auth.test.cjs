const assert=require('node:assert/strict');const e=require('./validation-auth.js');
let accepted=0,rejected=0;
for(let i=0;i<10;i++)for(const level of ['easy','medium','hard']){
  const q=e.makeQuestion(level,i),model=e.model(q);
  if(level==='easy')q.allowA?accepted++:rejected++;
  assert.equal(q.code[q.conditionLine-1],'if '+q.condition+' then');
  assert.ok(q.choices.includes(q.method),'method must be an available choice');
  assert.notEqual(q.allowA,q.allowB,'two cases test opposite outcomes');
  const response=level==='easy'?{accept:q.allowA}:level==='medium'?{method:q.method,outputA:q.outputA}:{condition:q.condition,outputA:q.outputA,outputB:q.outputB};
  assert.equal(e.checkAnswer(q,response).correct,true,'correct '+i+' '+level);
  assert.equal(e.checkAnswer(q,{}).complete,false,'incomplete '+i+' '+level);
  const wrong=level==='easy'?{accept:!q.allowA}:level==='medium'?{method:q.choices.find(s=>s!==q.method),outputA:q.outputA}:{condition:q.condition,outputA:q.outputB,outputB:q.outputB};
  assert.equal(e.checkAnswer(q,wrong).correct,false,'wrong '+i+' '+level);
  assert.equal(model.condition,q.condition);
}
assert.equal(accepted,5);assert.equal(rejected,5);
const demo=e.makeDemo();assert.equal(demo.variants.length,2);assert.ok(Array.isArray(demo.lines)&&Array.isArray(demo.steps));
for(const variant of demo.variants){const x=variant.example;assert.equal(x.steps[0][0],x.entryLine);assert.equal(x.steps[0][1],'START HERE');assert.ok(x.steps.every(s=>s[0]>=1&&s[0]<=x.lines.length));}
assert.equal(e.normal('if age >= 11 AND age <= 16 then'),e.normal('age >= 11 AND age <= 16'));
console.log('Validation & Authentication: 30 cases, balanced outcomes, boundary checks, two Demos and marking passed.');

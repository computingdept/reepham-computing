const assert=require('node:assert/strict');const e=require('./maintain.js');
const count={};
for(let i=0;i<10;i++){
  const easy=e.makeQuestion('easy',i),medium=e.makeQuestion('medium',i),hard=e.makeQuestion('hard',i);
  count[easy.entry.technique]=(count[easy.entry.technique]||0)+1;
  assert.ok(easy.entry.bad.length>=3&&easy.entry.good.length>=3);
  assert.notDeepEqual(easy.entry.bad,easy.entry.good);
  assert.ok(easy.techniqueChoices.includes(easy.entry.technique));
  assert.deepEqual(new Set(medium.codeChoices.map(v=>v.id)),new Set(['good','cosmetic','changed']));
  assert.equal(medium.codeChoices.find(v=>v.id==='good').lines.join('\n'),medium.entry.good.join('\n'));
  assert.deepEqual(new Set(hard.fixChoicesA.map(v=>v.id)),new Set(['fix','wrong1','wrong2']));
  assert.deepEqual(new Set(hard.fixChoicesB.map(v=>v.id)),new Set(['fix','wrong1','wrong2']));
  assert.ok(hard.reasonChoices.includes(hard.entry.why));
  for(const [q,r] of [[easy,{technique:easy.entry.technique}],[medium,{code:'good',technique:medium.entry.technique}],[hard,{fixA:'fix',fixB:'fix',reason:hard.entry.why}]]){
    assert.equal(e.checkAnswer(q,r).correct,true,`Correct ${i} ${q.level}`);
    assert.equal(e.checkAnswer(q,{}).complete,false,`Incomplete ${i} ${q.level}`);
    const m=e.model(q);assert.equal(m.technique,q.entry.technique);assert.equal(m.fixA,q.entry.fix);
  }
  assert.equal(e.checkAnswer(easy,{technique:e.TECHNIQUES.find(x=>x!==easy.entry.technique)}).correct,false);
  assert.equal(e.checkAnswer(medium,{code:'cosmetic',technique:medium.entry.technique}).correct,false);
  assert.equal(e.checkAnswer(hard,{fixA:'wrong1',fixB:'fix',reason:hard.entry.why}).correct,false);
  assert.equal(e.checkAnswer(hard,{fixA:'fix',fixB:'fix',reason:'It guarantees the code runs faster.'}).correct,false);
}
assert.deepEqual(count,{'Meaningful names':3,'Indentation':2,'Useful comments':3,'Subprograms':2});
const demo=e.makeDemo();assert.equal(demo.variants.length,2);
for(const {example} of demo.variants){assert.equal(example.steps[0][0],example.entryLine);assert.equal(example.steps[0][1],'START HERE');assert.ok(example.steps.every(s=>s[0]>=1&&s[0]<=example.lines.length));}
assert.throws(()=>e.makeQuestion('easy',10));
console.log('Maintainable Code: 30 cases, 4 OCR techniques, applied fixes, two Demos and scoring pass.');

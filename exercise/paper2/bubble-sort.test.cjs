const assert=require('node:assert/strict');
const e=require('./bubble-sort.js');
for(let i=0;i<10;i++){
  for(const level of ['easy','medium','hard']){
    const q=e.makeQuestion(level,i),m=e.model(q);
    assert.deepEqual(q.sorted,q.values.slice().sort((a,b)=>a-b));
    assert.equal(q.events.length,10);
    assert.equal(q.firstPass.length,4);
    assert.equal(q.passes.length,4);
    assert.deepEqual(q.passes[0].after.at(-1),Math.max(...q.values));
    const r=level==='easy'?{swaps:q.firstPass.map(s=>s.swap)}:
      level==='medium'?{swaps:q.firstPass.map(s=>s.swap),result:q.passes[0].after.join(',')}:
      {code:Object.fromEntries(q.gaps.map(n=>[n,q.code[n-1]])),passes:q.passes.map(x=>x.after.join(', '))};
    assert.equal(e.checkAnswer(q,r).correct,true,level+' '+i);
    assert.equal(e.checkAnswer(q,{}).complete,false);
    const bad=level==='easy'?{swaps:r.swaps.map((x,j)=>j===0?!x:x)}:
      level==='medium'?{...r,result:'0,0,0,0,0'}:
      {...r,code:{...r.code,[q.gaps[0]]:'print(0)'}};
    assert.equal(e.checkAnswer(q,bad).correct,false,level+' bad '+i);
    assert.equal(m.passes.length,4);
  }
}
const demo=e.makeDemo();
assert.equal(demo.steps[0][1],'START HERE');
assert.equal(demo.entryLine,13);
assert.ok(demo.steps.some(s=>s[6]?.swapped));
assert.ok(demo.steps.some(s=>s[6]?.pair));
assert.deepEqual(demo.steps.at(-1)[6].values,[1,2,4,5]);
console.log('Bubble Sort: 30 question models, swaps, full passes and code checks passed.');

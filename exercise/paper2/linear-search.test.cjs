const assert=require('node:assert/strict');
const engine=require('./linear-search.js');
for(let i=0;i<10;i++){
  for(const level of ['easy','medium','hard']){
    const q=engine.makeQuestion(level,i);
    const matches=q.visits.map(j=>q.values[j]===q.target);
    const values=Object.fromEntries(q.visits.filter(j=>j%2===1).map(j=>[j,String(q.values[j])]));
    const code=Object.fromEntries(q.gaps.map(line=>[line,q.code[line-1]]));
    const r=level==='easy'?{visited:q.visits.slice(),notFound:q.found<0}:
      {values,matches,result:String(q.found),code};
    assert.deepEqual(engine.checkAnswer(q,r).correct,true,level+' '+i);
    assert.deepEqual(engine.checkAnswer(q,{}).complete,false);
    if(level==='easy'){
      const wrong={visited:q.visits.slice().reverse(),notFound:q.found<0};
      if(q.visits.length>1)assert.equal(engine.checkAnswer(q,wrong).correct,false);
      if(q.found<0)assert.equal(engine.checkAnswer(q,{visited:q.visits.slice(),notFound:false}).complete,false);
    } else {
      const wrong={...r,result:String(q.found+1)};
      assert.equal(engine.checkAnswer(q,wrong).correct,false);
      if(level==='hard'){
        const malformed={...r,code:{...code,[q.gaps[0]]:'return 999'}};
        assert.equal(engine.checkAnswer(q,malformed).correct,false);
      }
    }
    assert.equal(engine.model(q).rows.length,q.visits.length);
  }
}
const demo=engine.makeDemo();
assert.equal(demo.steps[0][1],'START HERE');
assert.equal(demo.entryLine,10);
assert.equal(demo.dataTable.values[3],6);
assert.equal(demo.steps.at(-1)[2],'3');
assert.ok(demo.steps.every(e=>e[0]>0&&e[0]<=demo.lines.length));
console.log('Linear Search: 30 cases, found/not-found, first-match, code and trace checks passed.');

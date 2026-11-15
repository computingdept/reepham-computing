const assert=require('node:assert/strict');
const engine=require('./binary-search.js');
for(let i=0;i<10;i++){
  for(const level of ['easy','medium','hard']){
    const q=engine.makeQuestion(level,i);
    assert.ok(q.values.every((n,j)=>j===0||q.values[j-1]<n),'sorted input');
    assert.equal(q.code[16],'print(binarySearch(numbers, '+q.target+'))');
    assert.equal(q.found,q.values.indexOf(q.target));
    for(const row of q.rows){
      assert.equal(row.mid,Math.floor((row.low+row.high)/2));
      assert.equal(row.value,q.values[row.mid]);
    }
    const response=level==='easy'?{steps:q.rows.map(r=>({mid:r.mid,decision:r.decision})),notFound:q.found<0}:
      {mids:q.rows.map(r=>String(r.mid)),values:q.rows.map(r=>String(r.value)),
       decisions:q.rows.map(r=>r.decision),result:String(q.found),
       code:Object.fromEntries(q.gaps.map(line=>[line,q.code[line-1]]))};
    assert.equal(engine.checkAnswer(q,response).correct,true,level+' '+i);
    assert.equal(engine.checkAnswer(q,{}).complete,false);
    if(level==='easy'){
      const wrong={...response,steps:response.steps.map(s=>({...s}))};wrong.steps[0].mid++;
      assert.equal(engine.checkAnswer(q,wrong).correct,false);
      if(q.found<0)assert.equal(engine.checkAnswer(q,{...response,notFound:false}).complete,false);
    }else{
      assert.equal(engine.checkAnswer(q,{...response,result:String(q.found+1)}).correct,false);
      if(level==='hard'){
        const bad={...response,code:{...response.code,[q.gaps[0]]:'return 999'}};
        assert.equal(engine.checkAnswer(q,bad).correct,false);
      }
    }
  }
}
const demo=engine.makeDemo();
assert.equal(demo.entryLine,17);
assert.equal(demo.steps[0][1],'START HERE');
assert.ok(demo.steps.some(s=>s[5]?.low>0));
assert.equal(demo.steps.at(-1)[2],'2');
assert.equal(demo.dataTable.values.length,7);
assert.ok(demo.steps.every(s=>s[0]>0&&s[0]<=demo.lines.length));
console.log('Binary Search: 30 cases, midpoint rounding, halving, misses and ERL trace checks passed.');

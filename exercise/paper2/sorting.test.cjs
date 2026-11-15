const assert=require('node:assert/strict');
for(const [name,engine] of [['Insertion Sort',require('./insertion-sort.js')],['Merge Sort',require('./merge-sort.js')]]){
  for(let index=0;index<10;index++)for(const level of ['easy','medium','hard']){
    const q=engine.makeQuestion(level,index),model=engine.model(q);
    assert.deepEqual(q.sorted,q.values.slice().sort((a,b)=>a-b),name+' correct final ordering');
    assert.equal(q.code[q.entryLine-1].includes('Sort(numbers)')||q.code[q.entryLine-1].includes('Sorted(left, right)'),true,'call first');
    let response;
    if(level==='easy')response=name==='Insertion Sort'?{positions:q.rounds.map(x=>x.position)}:{sources:q.actions.map(x=>x.from)};
    else response={rows:model.rows.map(x=>name==='Insertion Sort'?{position:String(x.position),array:x.array.join(', ')}:{from:x.from,array:x.array.join(', ')}),code:Object.fromEntries(q.gaps.map(n=>[n,q.code[n-1]]))};
    assert.equal(engine.checkAnswer(q,response).correct,true,name+' '+level+' '+index);
    assert.equal(engine.checkAnswer(q,{}).complete,false,name+' incomplete');
    const wrong=structuredClone(response);
    if(level==='easy'){const field=name==='Insertion Sort'?'positions':'sources';wrong[field][0]=name==='Insertion Sort'?99:(wrong[field][0]==='left'?'right':'left');}
    else wrong.rows[0].array='99, 98, 97';
    assert.equal(engine.checkAnswer(q,wrong).correct,false,name+' wrong trace');
    if(level==='hard'){const wrongCode=structuredClone(response);wrongCode.code[q.gaps[0]]='return 999';assert.equal(engine.checkAnswer(q,wrongCode).correct,false,name+' wrong code');}
  }
  const demo=engine.makeDemo();
  assert.ok(demo.steps.length>15,name+' rich demo');
  assert.equal(demo.steps[0][0],demo.entryLine,'starts at call');
  assert.equal(demo.steps[0][1],'START HERE');
  assert.ok(demo.steps.every(x=>x[0]>0&&x[0]<=demo.lines.length),'line bounds');
  assert.equal(demo.steps.at(-1)[2],'1, 2, 5, 6');
  console.log(name+': 30 questions, marking, mistakes, code and visual Demo passed');
}

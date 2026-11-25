const test=require('node:test');
const assert=require('node:assert/strict');
const skills=require('../assets/skills-review.js');

const ids=['cpu-cycle','trace-table','binary-search','bitwise-mask','stack-queue','tree-traversal'];
const levels=['easy','medium','hard'];

test('six independent review skills cover all three levels',()=>{
  assert.deepEqual(Object.keys(skills.names),ids);
  for(const id of ids){
    assert.ok(skills.demos[id].steps.length>=3,id+' demo');
    for(const level of levels){
      for(let n=0;n<6;n++){
        const q=skills.make(id,level,n);
        assert.ok(q?.type,id+' '+level+' '+n);
        assert.ok(q.prompt&&q.instruction&&q.hint&&q.model);
        assert.ok(!q.model.includes('undefined'));
        assert.ok(!q.model.includes('NaN'));
      }
    }
  }
});

test('trace rows only contain integers and match their code statements',()=>{
  for(const level of levels)for(let n=0;n<10;n++){
    const q=skills.make('trace-table',level,n);
    assert.ok(q.rows.length>=3);
    for(const row of q.rows)for(const v of row.values)assert.equal(v===null||Number.isInteger(v),true);
    if(level==='easy'){
      const a=2+n%6,b=2+n%4;
      assert.deepEqual(q.rows.map(r=>r.values),[[a],[a+b],[(a+b)*2]]);
    }
    if(level==='hard'){
      assert.equal(q.rows.length,4+n%2);
      assert.deepEqual(q.columns,['i','x']);
    }
  }
});

test('binary-search trace always terminates with found or not found',()=>{
  for(const level of levels)for(let n=0;n<15;n++){
    const q=skills.make('binary-search',level,n);
    assert.equal(q.arr.every((v,i)=>!i||q.arr[i-1]<v),true);
    const trace=skills.searchTrace(q.arr,q.target);
    assert.ok(trace.length>0&&trace.length<=Math.ceil(Math.log2(q.arr.length+1))+2);
    assert.equal(trace.some(s=>s.includes('(FOUND)')),q.arr.includes(q.target));
  }
});

test('bit masks match actual bitwise results',()=>{
  for(const level of levels)for(let n=0;n<12;n++){
    const q=skills.make('bitwise-mask',level,n);
    const result=level==='easy'?q.value&q.m1:
      level==='medium'?q.op==='OR'?q.value|q.m1:q.value^q.m1:(q.value&q.m1)|q.m2;
    assert.equal(q.result,result);
    assert.equal(q.answer,skills.bits(result));
  }
});

test('stack and queue removals obey LIFO and FIFO',()=>{
  assert.deepEqual(skills.simulate('stack',['PUSH A','PUSH B','POP']).removed,['B']);
  assert.deepEqual(skills.simulate('queue',['ENQUEUE A','ENQUEUE B','DEQUEUE']).removed,['A']);
  for(const level of levels)for(let n=0;n<12;n++){
    const q=skills.make('stack-queue',level,n);
    assert.equal(q.answers.length,2);
    assert.ok(!q.answers.some(x=>x.includes('undefined')));
  }
});

test('tree traversal easy/medium/hard use breadth, post and both',()=>{
  for(let n=0;n<15;n++){
    const easy=skills.make('tree-traversal','easy',n),medium=skills.make('tree-traversal','medium',n),hard=skills.make('tree-traversal','hard',n);
    assert.equal(easy.mode,'breadth-first');assert.equal(medium.mode,'post-order');assert.equal(hard.mode,'both');
    assert.deepEqual(hard.answers,[easy.answers[0],medium.answers[0]]);
    assert.equal(hard.answers.length,2);
  }
});

test('review engine does not access stored mastery',()=>{
  const source=require('node:fs').readFileSync(require.resolve('../assets/skills-review.js'),'utf8');
  assert.doesNotMatch(source,/localStorage|sessionStorage|fetch\(|XMLHttpRequest/);
  assert.ok(skills.clean('A, b C')===skills.clean('a b, c'));
});

test('CPU extension mixes role questions with original fetch and execution practice',()=>{
 for(const level of levels)for(let n=0;n<16;n++){const q=skills.make('cpu-cycle',level,n);assert.ok(q.answers.length===q.labels.length);if(q.options)assert.ok(q.answers.every(a=>q.options.includes(a)));if(level==='hard'&&n%2===1)assert.deepEqual(q.answers,['ALU',String(5+n+2+n%7)]);}
});

test('J277 trace tables use numbered lines, include initialization and preserve signed answers',()=>{for(let n=0;n<10;n++){const m=skills.make('trace-table','medium',n),h=skills.make('trace-table','hard',n);assert.deepEqual(m.rows.map(r=>r.line),[1,2,3,4,5]);assert.equal(m.rows[0].values[1],null);assert.equal(h.rows[0].line,1);assert.ok(h.rows.slice(1).every(r=>r.line===3));}assert.equal(skills.matchesAnswer('-5',5,true),false);assert.equal(skills.matchesAnswer('5',5,true),true);assert.equal(skills.matchesAnswer('',0,true),false);assert.equal(skills.matchesAnswer('5.0',5,true),false);assert.equal(skills.matchesAnswer('−5',-5,true),true);});

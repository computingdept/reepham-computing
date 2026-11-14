/* Run with: node --test tests/j277-paper2-while-until.test.js */
const {test}=require('node:test');
const assert=require('node:assert/strict');
const engine=require('../exercise/paper2/while-until.js');

test('all WHILE / DO UNTIL models are correct and deterministic across seeds',()=>{
  for(const seed of [1,9,47,20261114]){
    for(const level of ['easy','medium','hard']){
      for(let index=0;index<10;index++){
        const q=engine.makeQuestion(level,index,seed);
        assert.deepEqual(q,engine.makeQuestion(level,index,seed));
        const answer=level==='hard'?q.model:q.expected;
        assert.equal(engine.checkAnswer(q,answer).correct,true,`${seed}/${level}/${index}`);
      }
    }
  }
});

test('Easy explicitly contrasts WHILE zero iterations with DO UNTIL once',()=>{
  const whileZero=engine.makeQuestion('easy',1,12);
  const doOnce=engine.makeQuestion('easy',3,12);
  assert.equal(whileZero.mode,'while');
  assert.equal(whileZero.expected,'0');
  assert.ok(whileZero.code.some(line=>line==='endwhile'));
  assert.equal(doOnce.mode,'do');
  assert.equal(doOnce.expected,'1');
  assert.ok(doOnce.code.some(line=>line==='do'));
  assert.ok(doOnce.code.some(line=>line.startsWith('until ')));
  for(let index=0;index<10;index++){
    const q=engine.makeQuestion('easy',index,8);
    assert.equal(q.options.length,4);
    assert.equal(new Set(q.options).size,4);
    assert.ok(q.options.includes(q.expected));
    assert.equal(engine.checkAnswer(q,q.options.find(x=>x!==q.expected)).correct,false);
  }
});

test('Condition checker and loop simulator follow check-before and check-after rules',()=>{
  assert.equal(engine.comparison(5,'<',5),false);
  assert.equal(engine.comparison(5,'>=',5),true);
  assert.deepEqual(engine.loopValues({mode:'while',start:3,bound:3,operator:'<',delta:1}),[]);
  assert.deepEqual(engine.loopValues({mode:'do',start:3,bound:3,operator:'>=',delta:1}),[3]);
  assert.deepEqual(engine.loopValues({mode:'while',start:7,bound:3,operator:'>',delta:-1}),[7,6,5,4]);
  assert.deepEqual(engine.loopValues({mode:'do',start:8,bound:2,operator:'<=',delta:-2}),[8,6,4]);
  assert.equal(engine.loopValues({mode:'while',start:0,bound:2,operator:'<',delta:-1}),null);
});

test('Medium traces final numbers, including zero-run and at-least-once cases',()=>{
  for(let index=0;index<10;index++){
    const q=engine.makeQuestion('medium',index,3);
    assert.equal(q.type,'number');
    assert.ok(q.code.some(line=>line==='endwhile'||line.startsWith('until ')));
    assert.ok(q.code.includes('print(total)'));
    assert.equal(engine.checkAnswer(q,String(q.expected)).correct,true);
    assert.equal(engine.checkAnswer(q,String(q.expected+1)).correct,false);
  }
  assert.equal(engine.makeQuestion('medium',1,3).expected,0);
  assert.ok(engine.makeQuestion('medium',2,3).expected>=5);
});

test('Animated model traces include every iteration, stopping check and correct final output',()=>{
  for(const seed of [1,19,20261114]){
    for(const level of ['easy','medium']){
      for(let index=0;index<10;index++){
        const q=engine.makeQuestion(level,index,seed),trace=q.trace;
        assert.ok(trace,`${level}/${index} trace exists`);
        assert.equal(trace.final,Number(q.expected),`${level}/${index} matches answer`);
        assert.equal(trace.mode,q.mode);
        assert.ok(trace.rows.length>=1);
        assert.equal(trace.rows.at(-1).stop,true,'last row stops the loop');
        assert.equal(trace.rows.at(-1).total,trace.final);
        if(q.mode==='while'){
          assert.equal(trace.rows.at(-1).conditionResult,false,'WHILE ends on false');
          assert.ok(trace.rows.slice(0,-1).every(row=>row.conditionResult===true));
        }else{
          assert.equal(trace.rows.at(-1).conditionResult,true,'DO UNTIL ends on true');
          assert.ok(trace.rows.slice(0,-1).every(row=>row.conditionResult===false));
          assert.ok(trace.rows.length>=1,'DO UNTIL runs at least once');
        }
      }
    }
  }
  const never=engine.makeQuestion('medium',1,9).trace;
  assert.equal(never.rows.length,1);
  assert.equal(never.rows[0].step,'Stop');
  assert.equal(never.final,0);
});

test('Every Play / Step event points to the actual executed code line',()=>{
  for(const seed of [1,9,20261114]){
    for(const level of ['easy','medium']){
      for(let index=0;index<10;index++){
        const q=engine.makeQuestion(level,index,seed);
        const events=q.trace.events;
        const iterations=q.mode==='while'?q.trace.rows.length-1:q.trace.rows.length;
        const setup=level==='medium'?2:1;
        const finalPrint=level==='medium'?1:0;
        assert.equal(events.length,setup+iterations*(q.mode==='while'?3:4)+(q.mode==='while'?1:0)+finalPrint);
        assert.deepEqual(events.slice(0,setup).map(event=>event.line),level==='medium'?[1,2]:[1]);
        assert.equal(events.at(-1).total,q.trace.final);
        for(const event of events){
          assert.ok(Number.isInteger(event.line)&&event.line>=1&&event.line<=q.code.length,'line must exist');
          assert.ok(typeof event.action==='string'&&event.action.length>4);
          if(event.condition!==null){
            assert.match(q.code[event.line-1].trim(),q.mode==='while'?/^while /:/^until /);
            assert.match(event.condition,/^(?:-?\d+) (?:<=|>=|<|>|==|!=) -?\d+$/);
          }
        }
        const checks=events.filter(event=>event.condition!==null);
        assert.equal(checks.length,q.mode==='while'?iterations+1:iterations);
        assert.equal(checks.at(-1).conditionResult,q.mode==='do');
        if(level==='medium'){
          assert.equal(events.at(-1).line,q.code.length);
          assert.equal(q.code.at(-1),'print(total)');
        }else{
          assert.equal(events.filter(event=>event.action.startsWith('Print "Tick"')).length,iterations);
        }
      }
    }
  }
  const zero=engine.makeQuestion('medium',1,9);
  assert.deepEqual(zero.trace.events.map(event=>event.line),[1,2,3,7]);
  assert.equal(zero.trace.events[2].conditionResult,false);
  assert.equal(zero.trace.events.at(-1).total,0);
  const once=engine.makeQuestion('easy',3,9);
  assert.deepEqual(once.trace.events.map(event=>event.line),[1,2,3,4,5]);
  assert.equal(once.trace.events.at(-1).conditionResult,true);
});

test('Hard supports alternate variable names and ERL assignment symbols',()=>{
  for(let index=0;index<10;index++){
    const q=engine.makeQuestion('hard',index,19);
    const renamed=q.model.replace(/\bn\b/g,'limit').replace(/\bi\b/g,'counter')
      .replace(/\btotal\b/g,'sum').replace(/\bcount\b/g,'steps').replace(/\bproduct\b/g,'answer');
    assert.equal(engine.checkAnswer(q,renamed).correct,true,`alternate names ${index}`);
    assert.equal(engine.checkAnswer(q,renamed.replace(' = int(input("Number"))',' ← input("Number")')).correct,true,`arrow input ${index}`);
    assert.equal(engine.checkAnswer(q,renamed.replaceAll(' = ',' := ')).correct,true,`colon assignment ${index}`);
    for(const n of [1,2,5,8,12,15]){
      const actual=engine.runProgram(engine.parseProgram(q.model),n);
      assert.deepEqual(actual,engine.expectedOutput(q,n),`input ${n}, hard ${index}`);
    }
  }
});

test('Hard enforces requested WHILE versus DO UNTIL construct',()=>{
  const whileQ=engine.makeQuestion('hard',0,3);
  const doQ=engine.makeQuestion('hard',1,3);
  assert.equal(engine.checkAnswer(whileQ,whileQ.model).correct,true);
  assert.equal(engine.checkAnswer(doQ,doQ.model).correct,true);
  assert.equal(engine.checkAnswer(whileQ,doQ.model).correct,false);
  assert.equal(engine.checkAnswer(doQ,whileQ.model).correct,false);
  assert.equal(engine.checkAnswer(whileQ,whileQ.model.replace('endwhile','')).correct,false);
  assert.equal(engine.checkAnswer(doQ,doQ.model.replace('until i > n','')).correct,false);
  assert.equal(engine.checkAnswer(whileQ,whileQ.model.replace('while i <= n','while i < n')).correct,false);
  assert.equal(engine.checkAnswer(doQ,doQ.model.replace('i = i + 1','i = i + 2')).correct,false);
  assert.equal(engine.checkAnswer(whileQ,whileQ.model.replace('n = int(input("Number"))','n = 3')).correct,false);
  assert.deepEqual(engine.checkAnswer(whileQ,''),{complete:false,correct:false});
});

test('Equivalent stopping comparisons earn credit',()=>{
  const whileQ=engine.makeQuestion('hard',0,19);
  const doQ=engine.makeQuestion('hard',1,19);
  assert.equal(engine.checkAnswer(whileQ,whileQ.model.replace('while i <= n','while i < n + 1')).correct,true);
  assert.equal(engine.checkAnswer(doQ,doQ.model.replace('until i > n','until i >= n + 1')).correct,true);
});

test('Invalid, unsafe and unbounded programs fail safely',()=>{
  const q=engine.makeQuestion('hard',0,2);
  assert.equal(engine.parseProgram('x = eval("oops")'),null);
  assert.equal(engine.parseProgram('n = input("Number")\nwhile n > 0\nprint(n)'),null);
  assert.equal(engine.checkAnswer(q,q.model.replace('i = i + 1','i = i - 1')).correct,false);
  assert.equal(engine.checkAnswer(q,q.model.replace('print(i)','console.log(i)')).correct,false);
  assert.equal(engine.runProgram(engine.parseProgram(q.model),21),null);
  assert.equal(engine.evaluateCondition('i == 5',{i:5}),true);
  assert.equal(engine.evaluateCondition('i = 5',{i:5}),null);
  assert.equal(engine.evaluateExpression('2 ^ 3 ^ 2',{}),512);
  assert.equal(engine.evaluateExpression('9 DIV 2 + 9 MOD 2',{}),5);
  assert.throws(()=>engine.makeQuestion('unexpected',0,1));
  assert.throws(()=>engine.makeQuestion('easy',-1,1));
});

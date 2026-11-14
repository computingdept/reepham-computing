/* Run with: node --test tests/j277-paper2-for-loops.test.js */
const {test}=require('node:test');
const assert=require('node:assert/strict');
const engine=require('../exercise/paper2/for-loops.js');

test('all 30 FOR-loop models are deterministic and pass their checkers',()=>{
  for(const seed of [1,17,20261114,90001]){
    for(const level of ['easy','medium','hard']){
      for(let i=0;i<10;i++){
        const q=engine.makeQuestion(level,i,seed);
        assert.deepEqual(q,engine.makeQuestion(level,i,seed));
        const answer=level==='hard'?q.model:q.expected;
        assert.equal(engine.checkAnswer(q,answer).correct,true,`${seed}/${level}/${i}`);
      }
    }
  }
});

test('Easy: inclusive start/end values, STEP 2 and negative STEP',()=>{
  const expectedSteps=[1,1,2,2,2,3,3,-1,-1,-2];
  for(let i=0;i<10;i++){
    const q=engine.makeQuestion('easy',i,128);
    assert.equal(q.options.length,4);
    assert.equal(new Set(q.options).size,4);
    assert.ok(q.options.includes(q.expected));
    assert.equal(q.code[0].startsWith('for i = '),true);
    assert.equal(q.code[q.code.length-1],'next i');
    assert.ok(q.explanation.includes('iterations'));
    assert.equal(engine.checkAnswer(q,q.options.find(x=>x!==q.expected)).correct,false);
    const actualStep=Number(q.code[0].match(/step (-?\d+)/)?.[1]||'1');
    assert.equal(actualStep,expectedSteps[i],`Easy Q${i+1} STEP progression`);
  }
  assert.deepEqual(engine.range(0,3,1),[0,1,2,3]);
  assert.deepEqual(engine.range(0,9,3),[0,3,6,9]);
  assert.deepEqual(engine.range(2,8,2),[2,4,6,8]);
  assert.deepEqual(engine.range(8,2,-2),[8,6,4,2]);
  assert.deepEqual(engine.range(2,1,2),[]);
  assert.equal(engine.range(1,10,0),null);
});

test('Medium: numeric trace output covers ascending, descending, powers and products',()=>{
  const steps=new Set();
  for(let i=0;i<10;i++){
    const q=engine.makeQuestion('medium',i,29);
    assert.equal(q.type,'number');
    assert.ok(q.code.includes('print(total)'));
    assert.ok(q.code.includes('next i'));
    assert.equal(engine.checkAnswer(q,String(q.expected)).correct,true);
    assert.equal(engine.checkAnswer(q,String(q.expected+1)).correct,false);
    steps.add(q.code[1].match(/step (-?\d+)/)?.[1]||'1');
  }
  assert.deepEqual(steps,new Set(['1','2','-1','-2']));
});

test('Hard: equivalent algorithms with different variable names pass',()=>{
  for(let i=0;i<10;i++){
    const q=engine.makeQuestion('hard',i,15);
    const renamed=q.model.replace(/\bn\b/g,'limit').replace(/\bi\b/g,'counter').replace(/\btotal\b/g,'sum').replace(/\bproduct\b/g,'answer');
    assert.equal(engine.checkAnswer(q,renamed).correct,true,`renamed ${i}`);
    assert.equal(engine.checkAnswer(q,renamed.replace(' = int(input("Number"))',' ← input("Number")')).correct,true,`assignment ${i}`);
    assert.equal(engine.checkAnswer(q,renamed.replaceAll(' = ',' := ')).correct,true,`colon ${i}`);
    for(const n of [1,2,3,6,10,15]){
      assert.deepEqual(engine.runProgram(engine.parseProgram(q.model),n),engine.expectedOutput(q,n));
    }
  }
});

test('Hard: common mistakes are rejected across varied input sizes',()=>{
  const q=engine.makeQuestion('hard',0,3);
  assert.equal(engine.checkAnswer(q,q.model.replace(' to n',' to n - 1')).correct,false,'off by one');
  assert.equal(engine.checkAnswer(q,q.model.replace('next i','next k')).correct,false,'wrong counter');
  assert.equal(engine.checkAnswer(q,q.model.replace('next i','')).correct,false,'missing NEXT');
  assert.equal(engine.checkAnswer(q,q.model.replace('n = int(input("Number"))','n = 5')).correct,false,'no user input');
  assert.equal(engine.checkAnswer(q,q.model.replace('for i = 1 to n','for i = 1 to n step 2')).correct,false,'wrong step');
  assert.equal(engine.checkAnswer(q,q.model.replace('print(i)','print(i + 1)')).correct,false,'wrong output');
  assert.deepEqual(engine.checkAnswer(q,''),{complete:false,correct:false});
});

test('Parser is bounded and rejects unsafe or invalid statements',()=>{
  const q=engine.makeQuestion('hard',9,5);
  assert.equal(engine.parseProgram('x = eval("oops")'),null);
  assert.equal(engine.checkAnswer(q,q.model.replace('for i = 1 to n','for i = 1 to n step 0')).correct,false);
  assert.equal(engine.checkAnswer(q,q.model.replace('print(product)','console.log(product)')).correct,false);
  assert.equal(engine.runProgram(engine.parseProgram(q.model),31),null,'input bounded');
  assert.equal(engine.range(1,1000,1),null,'loop bounded');
  assert.throws(()=>engine.makeQuestion('other',0,1));
  assert.throws(()=>engine.makeQuestion('easy',-1,1));
});

test('Expression evaluator respects precedence and right-associative exponentiation',()=>{
  const env={i:4,total:3};
  assert.equal(engine.evaluateExpression('total + i * 2',env),11);
  assert.equal(engine.evaluateExpression('2 ^ 3 ^ 2',env),512);
  assert.equal(engine.evaluateExpression('(total + i) * 2',env),14);
  assert.equal(engine.evaluateExpression('9 DIV 2 + 9 MOD 2',env),5);
  assert.equal(engine.evaluateExpression('1 / 0',env),null);
  assert.equal(engine.evaluateExpression('foo()',env),null);
});

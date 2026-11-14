/* Run with: node --test tests/j277-paper2-selection.test.js */
const {test}=require('node:test');
const assert=require('node:assert/strict');
const engine=require('../exercise/paper2/selection.js');

test('all 30 Selection questions are deterministic and their models pass',()=>{
  for(const seed of [1,71,20261114,99999]) {
    for(const level of ['easy','medium','hard']) {
      for(let index=0;index<10;index++) {
        const q=engine.makeQuestion(level,index,seed);
        assert.deepEqual(q,engine.makeQuestion(level,index,seed));
        assert.equal(engine.checkAnswer(q,level==='hard'?q.model:q.expected).correct,true,`${seed}/${level}/${index}`);
      }
    }
  }
});

test('Easy shows both IF and ELSE outcomes and never has duplicate answers',()=>{
  const answers=new Set();
  for(let index=0;index<10;index++) {
    const q=engine.makeQuestion('easy',index,12);
    assert.equal(q.options.length,2);
    assert.equal(new Set(q.options).size,2);
    assert.equal(q.code[1].startsWith('if '),true);
    assert.equal(q.code[q.code.length-1],'endif');
    assert.ok(q.options.includes(q.expected));
    assert.equal(engine.checkAnswer(q,q.options.find(x=>x!==q.expected)).correct,false);
    answers.add(q.expected);
  }
  assert.ok(answers.size>=5);
});

test('Medium uses OCR elseif and demonstrates all branches',()=>{
  const outputs=new Set();
  for(let index=0;index<10;index++) {
    const q=engine.makeQuestion('medium',index,13);
    assert.equal(q.options.length,3);
    assert.equal(new Set(q.options).size,3);
    assert.ok(q.code.some(line=>line.startsWith('elseif ')));
    assert.ok(q.code.some(line=>line==='else'));
    assert.equal(q.code[q.code.length-1],'endif');
    outputs.add(q.expected);
  }
  assert.ok(outputs.size>=6);
});

test('Hard accepts independent variable names and int(input())',()=>{
  for(let index=0;index<10;index++) {
    const q=engine.makeQuestion('hard',index,16);
    const renamed=q.model.replace(new RegExp('\\b'+q.variable+'\\b','g'),'my_value');
    assert.equal(engine.checkAnswer(q,renamed).correct,true,`variable ${index}`);
    assert.equal(engine.checkAnswer(q,renamed.replace(' = input(', ' = int(input(').replace(')\nif ', '))\nif ')).correct,true,`cast ${index}`);
    assert.equal(engine.checkAnswer(q,renamed.replace(' = ', ' ← ')).correct,true,`arrow ${index}`);
  }
});

test('Hard checks equality boundaries and ELSEIF order, not just sample input',()=>{
  const q=engine.makeQuestion('hard',4,9);
  assert.equal(q.clauses.length,2);
  assert.ok(engine.testValues(q).includes(q.clauses[0][1]));
  assert.ok(engine.testValues(q).includes(q.clauses[0][1]-1));
  assert.ok(engine.testValues(q).includes(q.clauses[1][1]));
  assert.equal(engine.checkAnswer(q,q.model).correct,true);
  const wrongOrder=q.model.replace(/if (.+?) then/,'if $1 then').replace(/>=/g,'>');
  assert.equal(engine.checkAnswer(q,wrongOrder).correct,false);
  const reversed=q.model.replace(/(if .+? then)([\s\S]*?)(elseif .+? then)([\s\S]*?)(else)/,(_,$1,$2,$3,$4,$5)=>$3+$4+$1+$2+$5);
  assert.equal(engine.checkAnswer(q,reversed).correct,false);
  assert.equal(engine.checkAnswer(q,q.model.replace('endif','')).correct,false);
  assert.equal(engine.checkAnswer(q,q.model.replace('elseif','elif')).correct,false);
  assert.equal(engine.checkAnswer(q,q.model.replace('print("Retry")','print("High")')).correct,false);
});

test('Hard allows equivalent comparisons and assigning a message first',()=>{
  const q=engine.makeQuestion('hard',0,19);
  const threshold=q.clauses[0][1];
  const code=[
    'mark = input("Mark")',
    'if '+threshold+' <= mark then',
    '    message = "Pass"',
    'else',
    '    message = "Retry"',
    'endif',
    'print(message)'
  ].join('\n');
  assert.equal(engine.checkAnswer(q,code).correct,true);
  assert.equal(engine.runProgram(engine.parseProgram(code),threshold),'Pass');
  assert.equal(engine.runProgram(engine.parseProgram(code),threshold-1),'Retry');
});

test('invalid, unsafe or incomplete ERL input is rejected without execution',()=>{
  const q=engine.makeQuestion('hard',7,43);
  assert.deepEqual(engine.checkAnswer(q,''),{complete:false,correct:false});
  assert.equal(engine.checkAnswer(q,'print("Positive")').correct,false);
  assert.equal(engine.checkAnswer(q,'number = input("Number")\nif number < 0 then\nprint("Negative")\nendif').correct,false);
  assert.equal(engine.parseProgram('x = eval("bad")'),null);
  assert.equal(engine.runProgram(engine.parseProgram(q.model),0),'Zero');
  assert.equal(engine.runProgram(engine.parseProgram(q.model),-1),'Negative');
  assert.equal(engine.runProgram(engine.parseProgram(q.model),1),'Positive');
  assert.throws(()=>engine.makeQuestion('extra',0,1));
  assert.throws(()=>engine.makeQuestion('easy',-1,1));
});

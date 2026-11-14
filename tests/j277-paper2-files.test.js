/* Run: node --test tests/j277-paper2-files.test.js */
const {test}=require('node:test');
const assert=require('node:assert/strict');
const engine=require('../exercise/paper2/files.js');

test('all 30 file tasks are deterministic and accept their model answers',()=>{
  for(const seed of [1,17,20261114,98765]){
    for(const level of ['easy','medium','hard']){
      for(let i=0;i<10;i++){
        const q=engine.makeQuestion(level,i,seed);
        assert.deepEqual(q,engine.makeQuestion(level,i,seed));
        assert.equal(engine.checkAnswer(q,q.expected).correct,true,`${seed}/${level}/${i}`);
        assert.equal(q.filename,'names.txt');
        assert.ok(q.hint.length>0);
      }
    }
  }
});

test('Easy provides four unique clickable OCR commands and exactly one answer',()=>{
  for(let i=0;i<10;i++){
    const q=engine.makeQuestion('easy',i,72);
    assert.equal(q.type,'operation');assert.equal(q.choices.length,4);
    const keys=q.choices.map(choice=>choice.id);
    assert.equal(new Set(keys).size,4);
    assert.ok(keys.includes(q.expected));
    assert.equal(keys.filter(id=>engine.checkAnswer(q,id).correct).length,1);
  }
  assert.deepEqual(engine.makeQuestion('easy',4,3).expected,'eof');
  assert.deepEqual(engine.makeQuestion('easy',5,3).expected,'new');
});

test('Medium models read cursor, append and endOfFile without changing original lines',()=>{
  for(let i=0;i<10;i++){
    const q=engine.makeQuestion('medium',i,95);
    assert.equal(q.type,'value');assert.equal(q.lines.length,3);
    assert.equal(q.code[0],'myFile = open("names.txt")');
    assert.equal(q.code.some(line=>line.includes('readLine'))||q.code.some(line=>line.includes('writeLine')),true);
    assert.match(q.explanation,/Answer:/);
  }
  const q1=engine.makeQuestion('medium',0,95);
  assert.equal(q1.expected,q1.lines[0]);
  const q2=engine.makeQuestion('medium',1,95);
  assert.equal(q2.expected,q2.lines[1]);
  assert.equal(engine.makeQuestion('medium',2,95).expected,'Ruby');
  assert.equal(engine.makeQuestion('medium',3,95).expected,'5');
  assert.equal(engine.makeQuestion('medium',5,95).expected,'False');
  assert.equal(engine.makeQuestion('medium',6,95).expected,'True');
  assert.equal(engine.makeQuestion('medium',8,95).expected,'3');
});

test('Hard accepts case, white space, assignment symbols and quote style',()=>{
  for(let i=0;i<10;i++){
    const q=engine.makeQuestion('hard',i,10);
    assert.equal(q.type,'write');
    assert.equal(engine.checkAnswer(q,q.expected.toUpperCase()).correct,true);
    assert.equal(engine.checkAnswer(q,q.expected.replace(/ = /g,' ← ')).correct,true);
    assert.equal(engine.checkAnswer(q,q.expected.replace(/"/g,"'")).correct,true);
    assert.equal(engine.checkAnswer(q,'myFile.deleteEverything()').correct,false);
  }
  assert.match(engine.makeQuestion('hard',5,1).expected,/while NOT myFile.endOfFile\(\)/);
  assert.match(engine.makeQuestion('hard',6,1).expected,/newFile\("results.txt"\)/);
});

test('Missing answers and invalid question coordinates are rejected',()=>{
  assert.deepEqual(engine.checkAnswer(engine.makeQuestion('easy',0,1),''),{complete:false,correct:false});
  assert.throws(()=>engine.makeQuestion('other',0,1));
  assert.throws(()=>engine.makeQuestion('easy',-1,1));
  assert.throws(()=>engine.makeQuestion('easy',10,1));
});

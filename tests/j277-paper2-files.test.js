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
    assert.equal(q.lineCount,q.expected.split('\n').length);
    assert.ok(q.helpers.length>=1&&q.helpers.length<=3);
    for(const helper of q.helpers){
      assert.ok(helper.label.length>0&&helper.syntax.length>0);
      assert.notEqual(helper.syntax,q.expected,'building blocks should not supply a whole answer');
    }
    assert.ok(q.hint.length>15);
    assert.equal(engine.checkAnswer(q,q.expected.toUpperCase()).correct,true);
    assert.equal(engine.checkAnswer(q,q.expected.replace(/ = /g,' ← ')).correct,true);
    assert.equal(engine.checkAnswer(q,q.expected.replace(/"/g,"'")).correct,true);
    assert.equal(engine.checkAnswer(q,'myFile.deleteEverything()').correct,false);
  }
  assert.match(engine.makeQuestion('hard',5,1).expected,/while NOT myFile.endOfFile\(\)/);
  assert.match(engine.makeQuestion('hard',6,1).expected,/newFile\("results.txt"\)/);
  assert.equal(engine.makeQuestion('hard',1,1).lineCount,1);
  assert.equal(engine.makeQuestion('hard',9,1).lineCount,3);
});

test('Hard marks file operations, not a preferred choice of variable names',()=>{
  const q=i=>engine.makeQuestion('hard',i,1);
  for(const i of [0,1,8,9]) assert.match(q(i).context,/variable of your choice|another variable/i);
  assert.equal(engine.checkAnswer(q(0),'x = open("names.txt")').correct,true);
  assert.equal(engine.checkAnswer(q(0),"fileRef ← open('names.txt')").correct,true);
  assert.equal(engine.checkAnswer(q(1),'line_1 = myFile.readLine()').correct,true);
  assert.equal(engine.checkAnswer(q(8),'nextName = myFile.readLine()\nmyFile.close()').correct,true);
  assert.equal(engine.checkAnswer(q(9),
    'handle = open("names.txt")\nfirstLine = handle.readLine()\nhandle.close()').correct,true);
});

test('Hard rejects missing quotes, invalid identifiers and broken file references',()=>{
  const q=i=>engine.makeQuestion('hard',i,1);
  const quoted=engine.checkAnswer(q(0),'x = open(names.txt)');
  assert.equal(quoted.correct,false);
  assert.match(quoted.feedback,/quotation marks/i);
  assert.equal(engine.checkAnswer(q(0),'1x = open("names.txt")').correct,false);
  assert.equal(engine.checkAnswer(q(0),';').correct,false);
  assert.equal(engine.checkAnswer(q(0),'x = open("other.txt")').correct,false);
  assert.equal(engine.checkAnswer(q(1),'myFile = myFile.readLine()').correct,false);
  assert.equal(engine.checkAnswer(q(8),'x = myFile.readLine()').correct,false);
  const broken=engine.checkAnswer(q(9),
    'f = open("names.txt")\nname = other.readLine()\nf.close()');
  assert.equal(broken.correct,false);
  assert.match(broken.feedback,/same file variable/i);
  assert.equal(engine.checkAnswer(q(9),
    'f = open("names.txt")\nf = f.readLine()\nf.close()').correct,false);
  assert.equal(engine.checkAnswer(q(3),'myFile.writeLine(Ruby)').correct,false);
  assert.equal(engine.checkAnswer(q(6),'newFile(results.txt)').correct,false);
  assert.equal(engine.checkAnswer(q(5),
    'while NOT myFile.endOfFile()\n    print(other.readLine())\nendwhile').correct,false);
});

test('Missing answers and invalid question coordinates are rejected',()=>{
  assert.deepEqual(engine.checkAnswer(engine.makeQuestion('easy',0,1),''),{complete:false,correct:false});
  assert.throws(()=>engine.makeQuestion('other',0,1));
  assert.throws(()=>engine.makeQuestion('easy',-1,1));
  assert.throws(()=>engine.makeQuestion('easy',10,1));
});

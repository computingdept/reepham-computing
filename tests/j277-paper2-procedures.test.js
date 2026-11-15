const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const skills = require('../exercise/paper2/procedures.js');

test('the shared coding demo recognises Procedures and offers a separate demo', () => {
  const shared=fs.readFileSync(path.join(__dirname,'../assets/j277-coding-demo.js'),'utf8');
  const page=fs.readFileSync(path.join(__dirname,'../exercise/paper2/procedures/index.html'),'utf8');
  assert.match(shared,/procedures:\s*\{\s*title:\s*'Procedures'/);
  assert.match(page,/j277-coding-demo\.js\?v=20261115-skill-calls1/);
});

test('worked demos trace the call before entering the sub program at every level', () => {
  const shared=fs.readFileSync(path.join(__dirname,'../assets/j277-coding-demo.js'),'utf8');
  const style=fs.readFileSync(path.join(__dirname,'../assets/j277-coding-demo.css'),'utf8');
  assert.match(shared,/idx \\+ 1 === next\\.entryLine/);
  assert.match(style,/\\.skill-demo-line \.rhsc-skill-start/);
  for (const level of ['easy','medium','hard']) {
    const demo=skills.makeDemo(skills.makeQuestion(level,0,42));
    assert.equal(demo.entryLine,demo.lines.length,level);
    assert.equal(demo.steps[0][0],demo.entryLine,level+' call first');
    assert.equal(demo.steps[1][0],1,level+' enter header second');
    assert.match(demo.steps[0][1],/START HERE/);
    assert.match(demo.steps[1][3],/parameter/);
  }
});

test('each level offers ten usable questions and a separate demo', () => {
  for (const level of ['easy','medium','hard']) for (let i=0;i<10;i++) {
    const q=skills.makeQuestion(level,i,123);
    assert.equal(q.index,i);
    assert.ok(q.prompt.length>14);
    assert.ok(skills.makeDemo(q).steps.length>=3);
    assert.equal(skills.checkAnswer(q,q.model).correct,true,`model ${level} ${i}`);
    assert.equal(skills.checkAnswer(q,'').complete,false);
  }
});

test('hard exercises require full procedures, iteration and selection', () => {
  for (let i=0;i<10;i++) {
    const q=skills.makeQuestion('hard',i,4);
    assert.match(q.prompt,/^Write an OCR ERL procedure called/);
    assert.match(q.prompt,/FOR loop and IF statement/);
    assert.match(q.prompt,/Then call the procedure with/);
    assert.equal(q.context,'');
    assert.equal(q.expectedLines.length>0,true);
    assert.equal(skills.checkAnswer(q,q.model).correct,true);
    assert.equal(skills.checkAnswer(q,`print(${q.expectedLines[0]})`).correct,false);
    const noCall=q.model.split('\n').slice(0,-1).join('\n');
    assert.equal(skills.checkAnswer(q,noCall).correct,false);
    const noIf=q.model.replace(/^\s*if\s+.+?\s+then$/m,'').replace(/^\s*endif$/m,'');
    assert.equal(skills.checkAnswer(q,noIf).correct,false);
  }
});

test('the marker accepts valid equivalent conditions and rejects hard-coded answers', () => {
  const q=skills.makeQuestion('hard',0,1);
  const valid=q.model.replace('i MOD 2 == 0','i MOD 2 != 1');
  assert.equal(skills.checkAnswer(q,valid).correct,true);
  const hardCoded=['procedure showEvens(limit)','  for i = 1 to limit','    if i > 0 then','      print(2)','      print(4)','      print(6)','      print(8)','    endif','  next i','endprocedure','showEvens(8)'].join('\n');
  assert.equal(skills.checkAnswer(q,hardCoded).correct,false);
});

test('an invalid or unbounded program cannot run', () => {
  const q=skills.makeQuestion('hard',0,1);
  assert.equal(skills.parseProcedure('procedure a(x)\nprint(x)\nendprocedure\na(2)'),null);
  assert.equal(skills.checkAnswer(q,q.model.replace('to limit','to 50000')).correct,false);
  assert.equal(skills.checkAnswer(q,q.model.replace('next i','next other')).correct,false);
});

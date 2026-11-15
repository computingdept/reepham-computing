const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const skills=require('../exercise/paper2/functions.js');

test('Functions has ten independent, markable questions at each level',()=>{
  for(const level of ['easy','medium','hard'])for(let index=0;index<10;index++){
    const q=skills.makeQuestion(level,index,18);
    assert.equal(q.level,level);
    assert.equal(q.index,index);
    assert.equal(skills.checkAnswer(q,q.model).correct,true,`${level} ${index}`);
    assert.equal(skills.checkAnswer(q,'').complete,false);
    assert.ok(skills.makeDemo(q).steps.length>=3);
  }
});

test('Hard prompts explicitly name the function, its task and the call',()=>{
  for(let index=0;index<10;index++){
    const q=skills.makeQuestion('hard',index,11);
    assert.match(q.prompt,/^Write an OCR ERL function called/);
    assert.match(q.prompt,/FOR loop and IF statement/);
    assert.match(q.prompt,/Then call it using print\(/);
    assert.equal(q.context,'');
    assert.match(q.model,/^function /);
    assert.match(q.model,/return /);
    assert.match(q.model,/endfunction/);
    assert.match(q.model,/print\(/);
  }
});

test('Hard marker accepts equivalent full ERL and checks unseen arguments',()=>{
  const q=skills.makeQuestion('hard',0,7);
  const equivalent=q.model.replace(/total/g,'answer');
  assert.equal(skills.checkAnswer(q,equivalent).correct,true);
  const stored=q.model.replace('print(sumEvens(8))','result = sumEvens(8)\nprint(result)');
  assert.equal(skills.checkAnswer(q,stored).correct,true);
  const hardCoded=q.model.replace('return total','return 20');
  assert.equal(skills.checkAnswer(q,hardCoded).correct,false);
  assert.equal(skills.checkAnswer(q,q.model.replace('sumEvens(8)','sumEvens(7)')).correct,false);
});

test('Hard marker rejects missing return, missing call and invalid or unbounded code',()=>{
  const q=skills.makeQuestion('hard',1,8);
  assert.equal(skills.checkAnswer(q,q.model.replace('return count','print(count)')).correct,false);
  assert.equal(skills.checkAnswer(q,q.model.split('\n').slice(0,-1).join('\n')).correct,false);
  assert.equal(skills.checkAnswer(q,q.model.replace('for i = 1 to limit','for i = 1 to 50000')).correct,false);
  assert.equal(skills.checkAnswer(q,q.model.replace('next i','next j')).correct,false);
  assert.equal(skills.parseFunction('function f(n)\nreturn 4\nendfunction\nprint(f(2))'),null);
});

test('Return reaches the caller even when it is inside a conditional branch',()=>{
  const q=skills.makeQuestion('hard',9,4);
  const ast=skills.parseFunction(q.model);
  assert.ok(ast);
  assert.equal(skills.runFunction(ast,[6,40]).value,'Pass');
  assert.equal(skills.runFunction(ast,[2,100]).value,'Retry');
});

test('Demo starts at the call and shows return to the caller',()=>{
  const shared=fs.readFileSync(path.join(__dirname,'../assets/j277-coding-demo.js'),'utf8');
  const page=fs.readFileSync(path.join(__dirname,'../exercise/paper2/functions/index.html'),'utf8');
  assert.match(shared,/functions:\s*\{\s*title:\s*'Functions'/);
  assert.match(page,/j277-coding-demo\.js\?v=20261115-skill-calls1/);
  for(const level of ['easy','medium','hard']){
    const d=skills.makeDemo(skills.makeQuestion(level,0,3));
    assert.equal(d.steps[0][0],d.entryLine);
    assert.equal(d.steps[1][0],1);
    assert.match(d.steps[0][1],/START HERE/);
    assert.match(d.end,/RETURN|returns|return/);
  }
});

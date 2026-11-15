/* Run: node --test tests/j277-paper2-strings.test.js */
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const engine=require('../exercise/paper2/strings.js');

test('All 30 String Handling tasks have distinct questions and correct model answers',()=>{
  for(const level of ['easy','medium','hard']){
    const items=[];
    for(let index=0;index<10;index++){
      const q=engine.makeQuestion(level,index,21);
      assert.deepEqual(q,engine.makeQuestion(level,index,21));
      assert.equal(q.level,level);
      assert.equal(q.index,index);
      assert.equal(engine.checkAnswer(q,level==='easy'?q.expected:q.model).correct,true,level+'/'+index);
      assert.equal(engine.checkAnswer(q,'').complete,false);
      assert.ok(q.context.length>0);
      assert.ok(q.code.length>0);
      items.push(q.prompt+' / '+q.context+' / '+q.code.join(' / '));
    }
    assert.equal(new Set(items).size,10,'Each challenge differs at this level');
  }
});

test('Easy teaches correct zero-based character positions',()=>{
  for(let index=0;index<10;index++){
    const q=engine.makeQuestion('easy',index);
    assert.equal(q.type,'tap');
    assert.equal(q.model,q.word[Number(q.expected)]);
    assert.equal(engine.checkAnswer(q,String((Number(q.expected)+1)%q.word.length)).correct,false);
    assert.match(q.code[1],/substring\(\d+,1\)/);
  }
});

test('Medium uses OCR ERL string operations and checks exact outputs',()=>{
  const expected=['7','DAT','TER','GORI','SCHOOL','binary','Asha Khan','NET!','VALE','YTON'];
  for(let index=0;index<10;index++){
    const q=engine.makeQuestion('medium',index);
    assert.equal(q.type,'value');
    assert.equal(q.expected,expected[index]);
    assert.equal(engine.checkAnswer(q,q.expected).correct,true);
    assert.equal(engine.checkAnswer(q,q.expected.toLowerCase()+'x').correct,false);
  }
});

test('Hard permits equivalent expressions but requires the requested operations',()=>{
  const slice=engine.makeQuestion('hard',0);
  assert.equal(engine.checkAnswer(slice,'word.substring(0,3)').correct,true);
  assert.equal(engine.checkAnswer(slice,'"NET"').correct,false,'A literal is not an algorithmic solution');
  assert.equal(engine.checkAnswer(slice,'word.left(2)').correct,false);
  const join=engine.makeQuestion('hard',3);
  assert.equal(engine.checkAnswer(join,"first + ' ' + last").correct,true);
  assert.equal(engine.checkAnswer(join,'last + " " + first').correct,false);
  assert.equal(engine.checkAnswer(join,'"Asha Khan"').correct,false);
  const changeCase=engine.makeQuestion('hard',4);
  assert.equal(engine.checkAnswer(changeCase,'word.upper').correct,true);
  assert.equal(engine.checkAnswer(changeCase,'word.lower').correct,false);
  const composite=engine.makeQuestion('hard',7);
  assert.equal(engine.checkAnswer(composite,'word.substring(0,2) + word.right(2)').correct,true);
  assert.equal(engine.checkAnswer(composite,'word.left(2) + "LE"').correct,true,'Other valid composition is accepted');
  assert.equal(engine.checkAnswer(composite,'"VALE"').correct,false);
});

test('Expression reader does not execute student text',()=>{
  const env={word:'COMPUTER'};
  for(const malicious of [
    'alert("bad")','word.constructor.constructor("return process")()',
    'word.substring(-1,2)','word.substring(3,999)','word.slice(2,3)',
    'window.location','word.left(2);print("oops")','word[0]','word.toString()',
    'word + `unexpected`','word.substring(1,2,3)'
  ])assert.equal(engine.readExpression(malicious,env),null,malicious);
  assert.equal(engine.readExpression('word.substring(2,3)',env).value,'MPU');
  assert.equal(engine.readExpression('word.right(3)',env).value,'TER');
  assert.equal(engine.readExpression('word.length',env).value,8);
  assert.equal(engine.readExpression('word + (word)',env).value,'COMPUTERCOMPUTER');
  assert.equal(engine.readExpression('word.right(0)',env).value,'');
});

test('Each difficulty offers a separate stepped worked example',()=>{
  const demos=['easy','medium','hard'].map(level=>engine.makeDemo(engine.makeQuestion(level,0)));
  assert.deepEqual(demos.map(d=>d.steps.length),[2,3,5]);
  for(const demo of demos){
    assert.ok(demo.lines.length>0);
    assert.ok(demo.steps.every(step=>step.length===4));
    assert.match(demo.end,/Output:/);
  }
});

test('Page, hub and reusable demo are connected without touching other skills',()=>{
  const root=path.join(__dirname,'..');
  const page=fs.readFileSync(path.join(root,'exercise/paper2/strings/index.html'),'utf8');
  const hub=fs.readFileSync(path.join(root,'exercise/paper2/app.js'),'utf8');
  const demo=fs.readFileSync(path.join(root,'assets/j277-coding-demo.js'),'utf8');
  assert.match(page,/strings-app\.js/);
  assert.match(page,/strings\.js/);
  assert.match(page,/j277-coding-demo\.js/);
  assert.match(hub,/'sql', 'strings'/);
  assert.match(demo,/strings: \{/);
});

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

test('Medium traces string operations within IF / ELSE / ELSEIF decisions',()=>{
  const expected=['Long','Starts D','Match','GO','Yes','Not upper','Asha Khan','NET!','Different','Medium'];
  for(let index=0;index<10;index++){
    const q=engine.makeQuestion('medium',index);
    assert.equal(q.type,'value');
    assert.equal(q.expected,expected[index]);
    assert.ok(q.code.some(line=>/^if /i.test(line)));
    assert.ok(q.code.some(line=>/^else/i.test(line)));
    assert.ok(q.code.includes('endif'));
    assert.equal(engine.checkAnswer(q,q.expected).correct,true);
    assert.equal(engine.checkAnswer(q,q.expected.toLowerCase()+'x').correct,false);
  }
});

test('Hard requires complete FOR programs, with IF wherever the task needs selection',()=>{
  for(let i=0;i<10;i++){
    const q=engine.makeQuestion('hard',i);
    assert.equal(q.type,'program');
    assert.match(q.model,/for i = /);
    assert.match(q.model,/next i/);
    assert.equal(engine.checkAnswer(q,q.model).correct,true,'Valid model '+i);
    assert.equal(engine.checkAnswer(q,q.model.replace(/next i/, '')).correct,false,'Incomplete FOR '+i);
    if(q.needIf){
      assert.match(q.model,/if .* then/);
      assert.match(q.model,/endif/);
      assert.equal(engine.checkAnswer(q,q.model.replace('endif','')).correct,false,'Incomplete IF '+i);
    }
  }
  const each=engine.makeQuestion('hard',0);
  const equivalent=each.model.replace(/\bi\b/g,'position')
    .replace('word.substring(position,1)','word.substring(position, 1)');
  assert.equal(engine.checkAnswer(each,equivalent).correct,true,'Any consistent loop variable works');
  assert.equal(engine.checkAnswer(each,'print("N")\nprint("E")').correct,false);
  assert.equal(engine.checkAnswer(each,'for i = 0 to 2\n    print(word.substring(i,1))\nnext i').correct,false,
    'Check several differently sized words to catch hardcoded end bounds');
  const count=engine.makeQuestion('hard',4);
  assert.equal(engine.checkAnswer(count,count.model.replace('count = count + 1','count = count + 2')).correct,false);
  const vowels=engine.makeQuestion('hard',1);
  assert.equal(engine.checkAnswer(vowels,vowels.model.replace(' OR ', ' AND ')).correct,false);
});

test('Hard task-first headings and example output make every goal explicit without exposing code',()=>{
  for(let i=0;i<10;i++){
    const q=engine.makeQuestion('hard',i);
    assert.equal(q.prompt,q.task.replace(/\.$/,''));
    assert.match(q.context,/Given word = "/);
    assert.match(q.context,/FOR loop/);
    assert.equal(q.context.includes('IF selection'),q.needIf);
    assert.deepEqual(q.expectedLines,engine.expectedOutput(q.kind,q.word));
    assert.equal(q.expectedLines.some(line=>/for |if |print\(/i.test(line)),false);
  }
  assert.deepEqual(engine.makeQuestion('hard',0).expectedLines,['N','E','T','W','O','R','K']);
  assert.deepEqual(engine.makeQuestion('hard',4).expectedLines,['3']);
  assert.deepEqual(engine.makeQuestion('hard',8).expectedLines,['D-A-T-A-B-A-S-E']);
});

test('Hard simulator executes bounded string programs on different input words',()=>{
  const model=engine.parseProgram(engine.makeQuestion('hard',0).model);
  assert.deepEqual(engine.runProgram(model,'CAT'),['C','A','T']);
  assert.deepEqual(engine.runProgram(model,''),[]);
  assert.deepEqual(engine.expectedOutput('reverse','NETWORK'),['KROWTEN']);
  assert.deepEqual(engine.expectedOutput('countVowels','Education'),['5']);
  for(const candidate of [
    'for i = 0 to word.length - 1\n    print(process.exit())\nnext i',
    'while true\n    print(word)\nendwhile',
    'for i = 0 to word.length - 1\n    window.location = word\nnext i'
  ])assert.equal(engine.checkAnswer(engine.makeQuestion('hard',0),candidate).correct,false);
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
  assert.deepEqual(demos.map(d=>d.steps.length),[2,4,16]);
  for(const demo of demos){
    assert.ok(demo.lines.length>0);
    assert.ok(demo.steps.every(step=>step.length===4));
    assert.match(demo.end,/Output:/);
  }
  assert.match(demos[1].lines.join('\n'),/if .* then/);
  assert.match(demos[2].lines.join('\n'),/for .* to/);
  assert.match(demos[2].lines.join('\n'),/if .* then/);
  assert.deepEqual(demos[2].loopBack,{from:7,to:2});
});

test('Page, hub and reusable demo are connected without touching other skills',()=>{
  const root=path.join(__dirname,'..');
  const page=fs.readFileSync(path.join(root,'exercise/paper2/strings/index.html'),'utf8');
  const hub=fs.readFileSync(path.join(root,'exercise/paper2/app.js'),'utf8');
  const demo=fs.readFileSync(path.join(root,'assets/j277-coding-demo.js'),'utf8');
  assert.match(page,/strings-app\.js/);
  assert.match(page,/strings\.js/);
  assert.match(page,/j277-coding-demo\.js/);
  assert.match(page,/expected-preview/,'All Hard tasks have a dedicated expected-output panel');
  assert.match(page,/strings3/,'The published page loads the task-first version');
  assert.match(hub,/'sql', 'strings'/);
  assert.match(demo,/strings: \{/);
});

'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const guided=require('../assets/j277-skills-guided-examples.js');
const skills=['data-types','casting','operators','comparisons','sequence','selection',
  'for-loops','while-until','array-1d','array-2d','records'];
const repeating=new Set(['for-loops','while-until']);

test('Every active J277 coding question has a separate progressive Demo',()=>{
  let count=0;
  for(const skill of skills){
    const engine=require('../exercise/paper2/'+skill+'.js');
    for(const level of ['easy','medium','hard']){
      for(let i=0;i<10;i++){
        for(const seed of [1,42,2026]){
          const q=engine.makeQuestion(level,i,seed);
          const demo=guided.make(skill,q);
          const arrayLoop=['array-1d','array-2d'].includes(skill)&&level==='medium'
            &&q.code.some(line=>/^for [irc]\s*=/i.test(line));
          const looping=repeating.has(skill)||arrayLoop;
          assert.equal(demo.progressive,looping?undefined:true,`${skill}/${level}/${i}`);
          assert.match(demo.task,/^Similar example:/);
          assert.ok(demo.lines.length>0 && demo.lines.length<=10);
          if(repeating.has(skill)){
            assert.ok(demo.steps.length>demo.lines.length);
            assert.equal(demo.loopBack.to,skill==='for-loops'&&level==='easy'?1:2);
            assert.ok(demo.steps.some((step,j)=>j>0&&step[0]<demo.steps[j-1][0]),'Demo revisits the FOR line');
          }else if(arrayLoop){
            assert.ok(demo.steps.length>demo.lines.length,'Each array iteration is traced');
            assert.ok(demo.steps.some((step,j)=>j>0&&step[0]<demo.steps[j-1][0]),'Loop revisits earlier source line');
            assert.match(demo.end,/Output: \d+/);
          }else if(skill==='selection'){
            assert.equal(demo.steps.length,5,'only lines which execute should be traced');
            assert.deepEqual(demo.steps.map(step=>step[0]),[1,2,4,5,6]);
            assert.deepEqual(demo.skippedLines,[3]);
            assert.equal(demo.showAllCode,true,'students need to see which complete branch is skipped');
          }else{
            assert.equal(demo.steps.length,demo.lines.length);
            assert.equal(demo.placeholders.length,demo.lines.length);
            assert.ok(demo.steps.every((s,j)=>s[0]===j+1&&s[3].length>10));
          }
          assert.ok(demo.steps.every(s=>s[3].length>10));
          assert.ok(demo.end.length>8);
          if(!looping)assert.ok(demo.lines.every((s,j)=>s!==demo.placeholders[j]));
          count++;
        }
      }
    }
  }
  assert.equal(count,990);
});

test('WHILE and DO UNTIL demos show different control flow',()=>{
  const engine=require('../exercise/paper2/while-until.js');
  const wh=guided.make('while-until',engine.makeQuestion('hard',0,1));
  const until=guided.make('while-until',engine.makeQuestion('hard',1,1));
  assert.match(wh.lines.join(' '),/endwhile/);
  assert.match(until.lines.join(' '),/until i/);
  assert.doesNotMatch(until.lines.join(' '),/endwhile/);
  assert.equal(wh.steps.at(-1)[0],2,'WHILE rechecks its condition after ENDWHILE');
  assert.equal(wh.steps.at(-1)[2],'False · stop');
  assert.equal(until.steps.at(-1)[0],5,'DO UNTIL stops at the test following the body');
  assert.equal(until.steps.at(-1)[2],'True · stop');
});

test('Selection demos skip non-executing PRINT statements at every level',()=>{
  for(const level of ['easy','medium','hard']){
    const engine=require('../exercise/paper2/selection.js');
    const demo=guided.make('selection',engine.makeQuestion(level,0,42));
    assert.deepEqual(demo.steps.map(step=>step[0]),[1,2,4,5,6],level);
    assert.ok(demo.steps[1][3].includes('line 03 is skipped'),level);
    assert.match(demo.end,level==='medium'?/Output: Pass/:/Output: Wait/);
  }
});

test('1D array loop demos visit the correct zero-based indices',()=>{
  const engine=require('../exercise/paper2/array-1d.js');
  for(const [index,expected] of [[6,['0','1','2','3','4']],[9,['0','2','4']]]){
    const demo=guided.make('array-1d',engine.makeQuestion('medium',index,42));
    const visited=demo.steps.filter(step=>step[0]===4).map(step=>step[1].match(/\[(\d+)\]/)[1]);
    assert.deepEqual(visited,expected);
    assert.equal(demo.steps.at(-2)[0],3,'FOR must check its stopping condition');
    assert.equal(demo.steps.at(-1)[0],6,'Print runs only after the loop');
  }
});

test('2D array demos trace a row, column and nested-loop path',()=>{
  const engine=require('../exercise/paper2/array-2d.js');
  for(const [index,expectedCells,output] of [
    [6,['1,0','1,1','1,2'],15],
    [7,['0,2','1,2'],13],
    [9,['0,0','0,1','0,2','1,0','1,1','1,2'],27]
  ]){
    const demo=guided.make('array-2d',engine.makeQuestion('medium',index,42));
    const update=demo.lines.findIndex(line=>line.includes('total = total + grid'))+1;
    const visited=demo.steps.filter(step=>step[0]===update)
      .map(step=>step[1].match(/\[(\d+,\d+)\]/)[1]);
    assert.deepEqual(visited,expectedCells);
    assert.equal(Number(demo.steps.at(-1)[2]),output);
    assert.match(demo.codeLabel,/Given grid/);
  }
});

test('Guided demos are not full model answers to the live question',()=>{
  for(const skill of skills){
    const engine=require('../exercise/paper2/'+skill+'.js');
    const q=engine.makeQuestion('hard',0,42);
    const demo=guided.make(skill,q);
    assert.notEqual(demo.lines.join('\n'),q.model,skill);
  }
});

test('Invalid skill and question are rejected',()=>{
  assert.throws(()=>guided.make('sql',{level:'hard'}));
  assert.throws(()=>guided.make('selection',{level:'unknown'}));
});

test('Variables worked example covers assignment, replacement and constants',()=>{
  for(const q of [
    {level:'easy',type:'identify'}, {level:'easy',type:'tap-value'},
    {level:'medium',type:'trace'}, {level:'hard',type:'write'}
  ]){
    const demo=guided.make('variables',q);
    assert.equal(demo.progressive,true);
    assert.equal(demo.steps.length,demo.lines.length);
  }
});

test('All 12 coding pages load the one shared Demo before students open it',()=>{
  for(const skill of ['variables',...skills]){
    const html=fs.readFileSync(path.join(__dirname,'../exercise/paper2',skill,'index.html'),'utf8');
    const app=skill==='variables'?'app.js':skill+'-app.js';
    const code=fs.readFileSync(path.join(__dirname,'../exercise/paper2',app),'utf8');
    const examples=html.indexOf('/assets/j277-skills-guided-examples.js?');
    const application=html.indexOf('../'+app+'?');
    const component=html.indexOf('/assets/j277-coding-demo.js?');
    assert.ok(examples>0&&application>examples&&component>application,skill);
    assert.match(code,/RHSSkillsDemoProvider/,skill);
  }
});

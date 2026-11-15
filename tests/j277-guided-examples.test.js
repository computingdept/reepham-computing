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
          assert.equal(demo.progressive,repeating.has(skill)?undefined:true,`${skill}/${level}/${i}`);
          assert.match(demo.task,/^Similar example:/);
          assert.ok(demo.lines.length>0 && demo.lines.length<=10);
          if(repeating.has(skill)){
            assert.ok(demo.steps.length>demo.lines.length);
            assert.equal(demo.loopBack.to,skill==='for-loops'&&level==='easy'?1:2);
            assert.ok(demo.steps.some((step,j)=>j>0&&step[0]<demo.steps[j-1][0]),'Demo revisits the FOR line');
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
          if(!repeating.has(skill))assert.ok(demo.lines.every((s,j)=>s!==demo.placeholders[j]));
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

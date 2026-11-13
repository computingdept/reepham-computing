"use strict";
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');

const root=path.resolve(__dirname,'..');
const read=file=>JSON.parse(fs.readFileSync(path.join(root,file),'utf8'));

test('published H446 Q1 covers every active lesson and retrieves the preceding lesson',()=>{
  const bank=read('data/do-now/q1-published/h446.json');
  const source=read('data/do-now/migration/h446-source.json');
  assert.equal(bank.course,'h446');
  assert.equal(bank.status,'published');
  assert.equal(bank.slot,1);
  const ids=Object.keys(bank.lessons).sort();
  assert.equal(ids.length,300);
  assert.deepEqual(ids,Object.keys(source.lessons).sort());
  let trueCount=0,falseCount=0;
  for(const id of ids){
    const q=bank.lessons[id],n=Number(id);
    assert.equal(q.id,'H446-L'+id+'-Q1');
    assert.ok(q.statement?.trim(),'Missing question for '+id);
    assert.equal(typeof q.correct,'boolean');
    assert.ok(q.explanation?.trim(),'Missing explanation for '+id);
    if(q.correct)trueCount++;else{
      falseCount++;
      assert.ok(q.correction?.trim(),'Missing correction for '+id);
    }
    if(n===1||n===181){
      assert.equal(q.diagnostic,true,'Entry lesson '+id+' requires a diagnostic');
      assert.equal(q.previousTaughtLesson,null);
      assert.ok(q.exceptionReason?.trim());
    }else{
      const expected='L'+String(n-1).padStart(3,'0');
      assert.equal(q.previousTaughtLesson,expected,'Incorrect predecessor for '+id);
      assert.ok(q.sourceRefs.includes(expected),'Missing previous-lesson source for '+id);
    }
  }
  assert.ok(trueCount>=105&&trueCount<=195,'True/False answers should remain reasonably balanced');
  assert.equal(trueCount+falseCount,300);
});

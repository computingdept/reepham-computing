'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const json=f=>JSON.parse(fs.readFileSync(path.join(root,f),'utf8'));
const draft=json('data/do-now/q2-drafts/h446.json');
const preview=json('data/do-now/q2-preview/h446.json');
const migration=json('data/do-now/migration/h446-source.json');

test('Q2 preview is opt-in, explicitly unpublished and never changes existing Q1 data',()=>{
  assert.equal(draft.status,'draft-never-loaded-by-classroom');
  assert.equal(preview.status,'review-preview-not-published');
  assert.equal(preview.course,'h446');
  assert.deepEqual(Object.keys(preview.lessons).sort(),Object.keys(draft.lessons).sort());
  assert.equal(Object.keys(preview.lessons).length,300);
  const script=fs.readFileSync(path.join(root,'assets/h446-lesson/lesson.js'),'utf8');
  assert.match(script,/get\('h446-q2-preview'\)!=='1'/);
  assert.match(script,/location\.pathname\.match\(\/\\\/lessons\\\/h446\\\/lesson-/);
  assert.match(script,/bank\.status!=='review-preview-not-published'/);
  assert.match(script,/applyPublishedH446Q1\(\);\s*applyPreviewH446Q2\(\);/);
  const css=fs.readFileSync(path.join(root,'assets/h446-lesson/h446-q2-preview.css'),'utf8');
  assert.match(css,/grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/);
});

test('preview copies one short MCQ per lesson with correct origin and answer',()=>{
  for(const [id,entry] of Object.entries(preview.lessons)){
    const original=draft.lessons[id].draft;
    assert.deepEqual(entry.options,original.options,id);
    assert.equal(entry.question,original.question,id);
    assert.equal(entry.explanation,original.explanation,id);
    assert.equal(entry.correctIndex,original.correctIndex,id);
    assert.equal(entry.taughtIn,original.taughtIn[0],id);
    assert.equal(entry.options.length,4);
    assert.ok(entry.options.every(v=>v.split(/\s+/).length===1),id);
  }
});

test('the 298 standard lesson pages have the shared renderer and expected Do Now stages',()=>{
  for(const [id,lesson] of Object.entries(migration.lessons)){
    if(['036','037'].includes(id))continue; // Separate guided mind-map presentation.
    const html=fs.readFileSync(path.join(root,lesson.source),'utf8');
    assert.match(html,/assets\/h446-lesson\/lesson\.js/,`L${id} missing shared script`);
    assert.ok((html.match(/class="donow-question"/g)||[]).length>=4,`L${id} question cards`);
    assert.ok((html.match(/class="donow-stage"/g)||[]).length>=5,`L${id} review stages`);
    assert.ok((html.match(/class="donow-review-question"/g)||[]).length>=4,
      `L${id} answer questions`);
  }
  for(const id of ['036','037']){
    const html=fs.readFileSync(path.join(root,`lessons/h446/lesson-${id}/guided.html`),'utf8');
    assert.match(html,/assets\/h446-mindmap\/presentation\.js/);
  }
});

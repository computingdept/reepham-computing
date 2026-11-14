const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.join(__dirname,'..');
const script=fs.readFileSync(path.join(root,'assets/h446-lesson/lesson.js'),'utf8');
const css=fs.readFileSync(path.join(root,'assets/h446-lesson/lesson-classroom.css'),'utf8');
const j277=fs.readFileSync(path.join(root,'assets/j277/classroom-polish.css'),'utf8');

test('H446 Do Now layout is enabled by course path only',()=>{
  assert.match(script,/\/lessons\\\/h446\\\/lesson-/);
  assert.match(script,/classList\.add\('h446-donow-layout-parity'\)/);
  assert.doesNotMatch(script,/classList\.add\('h446-donow-layout-parity'\).*j277/);
});

test('H446 uses the same compact two by two layout and four card outlines',()=>{
  assert.match(css,/body\.h446-donow-layout-parity:not\(\.answer-page\) #do-now \.donow-questions/);
  assert.match(css,/grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/);
  assert.match(css,/grid-template-rows:auto auto/);
  for(const colour of ['#347ca8','#2c8b68','#b97624','#8662a8']){
    assert.ok(css.includes(colour),'Missing H446 outline '+colour);
    assert.ok(j277.includes(colour),'Colour not in approved J277 source '+colour);
  }
});

test('MCQ changes are visual and confined to the first H446 Do Now stage',()=>{
  assert.match(css,/#do-now\[data-h446-q2-published="true"\] \.donow-questions \.h446-q2-options/);
  assert.match(css,/\.donow-stage:first-child \.donow-questions/);
  assert.doesNotMatch(css,/body\.h446-donow-layout-parity[^\n]*#you-do/);
});

'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');

test('all formerly reviewed skills are normal hub tiles without preview banners',()=>{
  const paper1=fs.readFileSync(path.join(root,'exercise/paper1/index.html'),'utf8');
  const paper2=fs.readFileSync(path.join(root,'exercise/paper2/index.html'),'utf8');
  const paper2App=fs.readFileSync(path.join(root,'exercise/paper2/app.js'),'utf8');
  const h446=fs.readFileSync(path.join(root,'exercise/h446/tools.html'),'utf8');
  for(const html of [paper1,paper2,h446])assert.doesNotMatch(html,/PREVIEWS|rhsc-skills-review|Try preview/);
  assert.match(paper1,/rhsc-resource-card--skill[\s\S]*?skill=cpu-cycle/);
  for(const skill of ['trace-table','binary-search'])assert.ok(paper2App.includes('/exercise/skills-review/?skill='+skill));
  for(const skill of ['bitwise-mask','stack-queue','tree-traversal']){
    assert.match(h446,new RegExp('rhsc-resource-card--skill[\\s\\S]*?skill='+skill));
  }
  assert.match(paper2App,/EXTERNAL_SKILLS\[id\]/);
});

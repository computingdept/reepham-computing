/* Run with: node --test tests/j277-hard-code-prompts.test.js */
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');

const skills=[
  'sequence','selection','for-loops','while-until','operators',
  'casting','comparisons','data-types','sql'
];

test('Hard coding editors never reveal example solutions as grey placeholders',()=>{
  for(const skill of skills){
    const source=fs.readFileSync(path.join(__dirname,'../exercise/paper2',`${skill}-app.js`),'utf8');
    const section=source.match(/function renderHard\([^]*?(?=\n  function |\n  document\.|\n\}\))/);
    assert.ok(section,`${skill} has a Hard editor`);
    assert.doesNotMatch(section[0],/\.placeholder\s*=/,`${skill} Hard editor starts blank`);
    const page=fs.readFileSync(path.join(__dirname,'../exercise/paper2',skill,'index.html'),'utf8');
    const version=skill==='selection'?'trace-pilot1':'hard-blank1';
    assert.match(page,new RegExp(`${skill}-app\\.js\\?v=20261115-${version}`),`${skill} uses the corrected version`);
  }
});

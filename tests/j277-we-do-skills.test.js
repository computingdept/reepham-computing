const test=require('node:test'),assert=require('node:assert/strict');
const api=require('../assets/j277/we-do-skills.js'),p1=require('../assets/j277-paper1-guided-demo.js'),p2=require('../assets/j277-skills-guided-examples.js');
const map=require('../docs/audits/j277-we-do-skills-map.json');
test('pilots use mapped Skill IDs and existing demo sources',()=>{
 const a=api.prepare({id:map.lessons['022'].primary},p1,p2),b=api.prepare({id:map.lessons['057'].primary},p1,p2);
 assert.equal(a.steps.length,3);assert.equal(a.steps[0].value,p1.get('netmodels').steps[2][1]);
 assert.deepEqual(b.lines,p2.make('for-loops',{level:'easy'}).lines);
 assert.equal(b.steps.length,p2.make('for-loops',{level:'easy'}).steps.length);
 assert.equal(api.prepare({id:'p2:unmapped'},p1,p2),null);
});

test('next Year 10 batch reuses mapped Skill demos',()=>{
 for(const id of ['023','024','025','058']){
 const key=map.lessons[id].primary,model=api.prepare({id:key},p1,p2);
 assert.ok(model.steps.length>=3);assert.ok(model.steps.every(s=>s.question&&s.explanation));
 if(key.startsWith('p1:'))assert.deepEqual(model.steps.map(s=>s.value),p1.get(key.slice(3)).steps.map(s=>s[1]));
 else assert.deepEqual(model.lines,p2.make(key.slice(3),{level:'easy'}).lines);
 }
});

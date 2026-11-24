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

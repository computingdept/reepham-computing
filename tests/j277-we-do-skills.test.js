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

test('network lessons reuse shared demos with lesson-appropriate focus',()=>{
 const batch={"026":{"id":"p1:netperformance","title":"Network Performance","url":"/exercise/paper1/?skill=netperformance"},"027":{"id":"p1:address","title":"Address Detective","url":"/exercise/paper1/?skill=address"},"028":{"id":"p1:protocol","title":"Protocol Paths","url":"/exercise/paper1/?skill=protocol"},"029":{"id":"p1:protocol","title":"Protocol Paths","url":"/exercise/paper1/?skill=protocol","variant":"standards"}};
 for(const [id,config] of Object.entries(batch)){
 assert.equal(config.id,map.lessons[id].primary);const model=api.prepare(config,p1,p2);
 assert.ok(model.steps.length>=3);assert.ok(model.steps.every(s=>s.question&&s.explanation));
 const source=p1.get(config.id.slice(3));assert.deepEqual(model.steps.map(s=>s.value),model.focus.map(i=>source.steps[i][1]));
 }
 assert.notDeepEqual(api.prepare(batch['028'],p1,p2).steps,api.prepare(batch['029'],p1,p2).steps);
});

test('security lessons share one Skill with five curriculum-specific focuses',()=>{
 const batch={"030":{"id":"p1:security","title":"Cybersecurity Investigator","url":"/exercise/paper1/?skill=security","variant":"malware"},"031":{"id":"p1:security","title":"Cybersecurity Investigator","url":"/exercise/paper1/?skill=security","variant":"attacks"},"032":{"id":"p1:security","title":"Cybersecurity Investigator","url":"/exercise/paper1/?skill=security","variant":"firewalls"},"033":{"id":"p1:security","title":"Cybersecurity Investigator","url":"/exercise/paper1/?skill=security","variant":"controls"},"034":{"id":"p1:security","title":"Cybersecurity Investigator","url":"/exercise/paper1/?skill=security"}};
 const topics=new Set();for(const [id,config] of Object.entries(batch)){
 assert.equal(config.id,map.lessons[id].primary);const model=api.prepare(config,p1,p2);
 assert.ok(model.steps.length>=3);assert.ok(model.steps.every(s=>s.question&&s.explanation));
 const source=p1.get('security',model.demoFocus);assert.deepEqual(model.steps.map(s=>s.value),model.focus.map(i=>source.steps[i][1]));topics.add(model.task);
 }
 assert.equal(topics.size,5);
});


test('OS and utility lessons reuse mapped demos; assessment and feedback stay untouched',()=>{
 const batch={"037":{"id":"p1:os","title":"Operating Systems","url":"/exercise/paper1/?skill=os","variant":"interfaces-memory"},"038":{"id":"p1:os","title":"Operating Systems","url":"/exercise/paper1/?skill=os","variant":"files-devices"},"039":{"id":"p1:utility","title":"Utility Software","url":"/exercise/paper1/?skill=utility"}};
 for(const [id,config] of Object.entries(batch)){
  assert.equal(config.id,map.lessons[id].primary);const model=api.prepare(config,p1,p2);
  assert.ok(model.steps.length>=3);assert.ok(model.steps.every(s=>s.question&&s.explanation));
  assert.deepEqual(model.steps.map(s=>s.value),model.focus.map(i=>p1.get(config.id.slice(3)).steps[i][1]));
 }
 assert.notDeepEqual(api.prepare(batch['037'],p1,p2).steps,api.prepare(batch['038'],p1,p2).steps);
 assert.ok(!map.lessons['035'].primary&&!map.lessons['036'].primary);
});

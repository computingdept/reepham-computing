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


test('impact and legislation lessons share two Skills with distinct curriculum-focused demos',()=>{
 const batch={"040":{"id":"p1:impact","title":"Impact Answer Builder","url":"/exercise/paper1/?skill=impact","variant":"social"},"041":{"id":"p1:legislation","title":"Legislation & Licences","url":"/exercise/paper1/?skill=legislation","variant":"data-protection"},"042":{"id":"p1:legislation","title":"Legislation & Licences","url":"/exercise/paper1/?skill=legislation","variant":"computer-misuse"},"043":{"id":"p1:legislation","title":"Legislation & Licences","url":"/exercise/paper1/?skill=legislation","variant":"copyright-licences"},"044":{"id":"p1:impact","title":"Impact Answer Builder","url":"/exercise/paper1/?skill=impact","variant":"evaluation"}};
 const topics=new Set();for(const [id,config] of Object.entries(batch)){
  assert.equal(config.id,map.lessons[id].primary);const model=api.prepare(config,p1,p2);
  assert.equal(model.steps.length,4);assert.ok(model.steps.every(s=>s.question&&s.explanation));
  assert.deepEqual(model.steps.map(s=>s.value),p1.get(config.id.slice(3),config.variant).steps.map(s=>s[1]));topics.add(model.task);
 }
 assert.equal(topics.size,5);
});


test('computational thinking and coding batch uses existing demonstrations',()=>{
 const thinking=require('../exercise/paper2/thinking.js');const batch={"045":{"id":"p2:thinking","title":"Computational Thinking","url":"/exercise/paper2/thinking/","variant":"abstraction-decomposition"},"046":{"id":"p2:thinking","title":"Computational Thinking","url":"/exercise/paper2/thinking/","variant":"algorithmic-thinking"},"047":{"id":"p2:sequence","title":"Sequence","url":"/exercise/paper2/sequence/","variant":"ipo"},"051":{"id":"p2:sequence","title":"Sequence","url":"/exercise/paper2/sequence/","variant":"input-output"},"052":{"id":"p2:variables","title":"Variables & Constants","url":"/exercise/paper2/variables/","variant":"assignment"},"053":{"id":"p2:operators","title":"Operators","url":"/exercise/paper2/operators/","variant":"arithmetic"},"055":{"id":"p2:selection","title":"Selection","url":"/exercise/paper2/selection/","variant":"if"}};
 for(const [id,config] of Object.entries(batch)){
  assert.equal(config.id,map.lessons[id].primary);const model=api.prepare(config,p1,p2,thinking);
  assert.ok(model.steps.length>=2);assert.ok(model.steps.every(s=>s.question&&s.explanation&&s.line>=1&&s.line<=model.lines.length));
 }
});


test('array and record lessons reuse existing Skill demos',()=>{const batch={"065":{"id":"p2:array-1d","title":"1D Arrays","url":"/exercise/paper2/array-1d/","variant":"lesson065"},"066":{"id":"p2:array-1d","title":"1D Arrays","url":"/exercise/paper2/array-1d/","variant":"lesson066"},"067":{"id":"p2:array-2d","title":"2D Arrays","url":"/exercise/paper2/array-2d/","variant":"lesson067"},"068":{"id":"p2:records","title":"Records","url":"/exercise/paper2/records/","variant":"lesson068"}};for(const [id,config] of Object.entries(batch)){assert.equal(config.id,map.lessons[id].primary);const model=api.prepare(config,p1,p2);assert.ok(model.steps.length>=2);assert.ok(model.steps.every(s=>s.question&&s.explanation&&s.line>=1&&s.line<=model.lines.length));}});


test('debugging, strings, validation and subprogram batch reuses existing Skill demos',()=>{
 const modules={"algorithm-repair":require('../exercise/paper2/algorithm-repair.js'),"strings":require('../exercise/paper2/strings.js'),"validation-auth":require('../exercise/paper2/validation-auth.js'),"functions":require('../exercise/paper2/functions.js'),"files":require('../exercise/paper2/files.js'),"sql":require('../exercise/paper2/sql.js')};
 const batch={"061":{"id":"p2:algorithm-repair","title":"Algorithm Repair","url":"/exercise/paper2/algorithm-repair/","variant":"lesson061"},"063":{"id":"p2:strings","title":"String Handling","url":"/exercise/paper2/strings/","variant":"lesson063"},"064":{"id":"p2:validation","title":"Validation & Authentication","url":"/exercise/paper2/validation/","variant":"lesson064"},"069":{"id":"p2:functions","title":"Functions","url":"/exercise/paper2/functions/","variant":"lesson069"},"072":{"id":"p2:files","title":"File Handling","url":"/exercise/paper2/files/","variant":"lesson072"},"073":{"id":"p2:sql","title":"SQL Builder","url":"/exercise/paper2/sql/","variant":"lesson073"}};
 for(const [id,config] of Object.entries(batch)){
  assert.equal(config.id,map.lessons[id].primary);const model=api.prepare(config,p1,p2,undefined,modules);
  assert.ok(model.steps.length>=2);assert.ok(model.steps.every(s=>s.question&&s.explanation&&s.line>=1&&s.line<=model.lines.length));
 }
});


test('random, defensive design and translator lessons reuse their mapped Skill demos',()=>{const modules={"random":require('../exercise/paper2/random.js'),"validation-auth":require('../exercise/paper2/validation-auth.js'),"maintain":require('../exercise/paper2/maintain.js'),"test-data":require('../exercise/paper2/test-data.js'),"ides":require('../exercise/paper2/ides.js')};const batch={"074":{"id":"p2:random","title":"Random Numbers","url":"/exercise/paper2/random/","variant":"lesson074"},"075":{"id":"p2:validation","title":"Validation & Authentication","url":"/exercise/paper2/validation/","variant":"lesson075"},"076":{"id":"p2:maintain","title":"Maintainable Code","url":"/exercise/paper2/maintain/","variant":"lesson076"},"077":{"id":"p2:test-data","title":"Test Data & Plans","url":"/exercise/paper2/test-data/","variant":"lesson077"},"091":{"id":"p2:ides","title":"Translators & IDEs","url":"/exercise/paper2/ides/","variant":"lesson091"},"092":{"id":"p2:ides","title":"Translators & IDEs","url":"/exercise/paper2/ides/","variant":"lesson092"},"093":{"id":"p2:ides","title":"Translators & IDEs","url":"/exercise/paper2/ides/","variant":"lesson093"}};for(const [id,config] of Object.entries(batch)){assert.equal(config.id,map.lessons[id].primary);const model=api.prepare(config,p1,p2,undefined,modules);assert.ok(model.steps.length>=3);assert.ok(model.steps.every(s=>s.question&&s.explanation&&s.line>=1&&s.line<=model.lines.length));}});


test('early sequence, variables and LAN/WAN lessons reuse mapped Skill examples',()=>{const batch={"019":{"id":"p2:sequence","title":"Sequence","url":"/exercise/paper2/sequence/","variant":"input-output"},"020":{"id":"p2:variables","title":"Variables & Constants","url":"/exercise/paper2/variables/","variant":"assignment"},"021":{"id":"p1:netmodels","title":"Network Models","url":"/exercise/paper1/?skill=netmodels","variant":"coverage"}};for(const [id,config] of Object.entries(batch)){assert.equal(config.id,map.lessons[id].primary);const model=api.prepare(config,p1,p2);assert.ok(model.steps.length>=2);assert.ok(model.steps.every(s=>s.question&&s.explanation));}});


test('Autumn 1 lessons reuse the existing We Do Skills and preserve curriculum focus',()=>{const thinking=require('../exercise/paper2/thinking.js'),modules={'validation-auth':require('../exercise/paper2/validation-auth.js')};const batch={"007":{"id":"p1:utility","title":"Utility Software","url":"/exercise/paper1/?skill=utility","variant":"compression"},"008":{"id":"p1:memory","title":"Memory Explorer","url":"/exercise/paper1/?skill=memory","variant":"primary"},"009":{"id":"p1:storage","title":"Storage Selector","url":"/exercise/paper1/?skill=storage","variant":"devices"},"011":{"id":"p1:cpu","title":"CPU Performance & Embedded Systems","url":"/exercise/paper1/?skill=cpu","variant":"performance"},"012":{"id":"p2:thinking","title":"Computational Thinking","url":"/exercise/paper2/thinking/","variant":"abstraction-decomposition"},"016":{"id":"p2:variables","title":"Variables & Constants","url":"/exercise/paper2/variables/","variant":"assignment"},"017":{"id":"p2:validation","title":"Validation & Authentication","url":"/exercise/paper2/validation/","variant":"lesson064"}};for(const [id,config] of Object.entries(batch)){assert.equal(config.id,map.lessons[id].primary);const model=api.prepare(config,p1,p2,thinking,modules);assert.ok(model.steps.length>=2);assert.ok(model.steps.every(s=>s.question&&s.explanation));}});


test('character, image and sound lessons reuse mapped Paper 1 demos',()=>{const batch={"004":{"id":"p1:ascii","title":"ASCII Code Builder","url":"/exercise/paper1/?skill=ascii","variant":"lesson004"},"005":{"id":"p1:image","title":"Image file sizes","url":"/exercise/paper1/?skill=image","variant":"lesson005"},"006":{"id":"p1:sound","title":"Sound file sizes","url":"/exercise/paper1/?skill=sound","variant":"lesson006"}};for(const [id,config] of Object.entries(batch)){assert.equal(config.id,map.lessons[id].primary);const model=api.prepare(config,p1,p2);assert.equal(model.steps.length,4);assert.ok(model.steps.every(s=>s.question&&s.explanation));}});


test('visual lesson practice appends without replacing original examples',()=>{const config={"id":"p1:convert","title":"Conversion grid","url":"/exercise/paper1/?skill=convert","preserve":true,"check":"Why does the binary number 00001010 represent 10?","answer":"The 8 and 2 columns contain 1, so 8 + 2 = 10."};const make=tag=>({tag,dataset:{},children:[],append(...nodes){this.children.push(...nodes);},querySelector(sel){return sel==='.wedo-example'?this.children[0]:null;}});const deck=make('div'),original=make('article');deck.append(original);const page=make('section');page.querySelector=()=>deck;const doc={getElementById:()=>page,createElement:make};assert.equal(api.install(config,doc,{}),true);assert.equal(deck.children[0],original);assert.equal(deck.children.length,2);assert.equal(deck.children[1].hidden,true);assert.equal(api.install(config,doc,{}),false);});

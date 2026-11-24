const test=require('node:test'),assert=require('node:assert/strict'),engine=require('./truth.js');
test('all 30 tables include every input combination and mark every missing cell',()=>{
 for(const level of ['easy','medium','hard'])for(let i=0;i<10;i++){
 const q=engine.makeQuestion(level,i),r=Object.fromEntries(q.fields.map(f=>[f.id,f.answer]));
 assert.equal(q.rows.length,2**q.inputs.length);assert.equal(new Set(q.rows.map(row=>JSON.stringify(row.inputs))).size,q.rows.length);
 assert.equal(engine.checkAnswer(q,r).correct,true);assert.equal(engine.checkAnswer(q,{}).complete,false);
 for(const f of q.fields)assert.equal(engine.checkAnswer(q,{...r,[f.id]:f.answer==='1'?'0':'1'}).correct,false);
 for(const row of q.rows){const vals={...row.inputs};for(const [name,expr] of Object.entries(q.expressions)){const t=expr.split(' ');const value=t[0]==='NOT'?1-vals[t[1]]:t[1]==='AND'?Number(Boolean(vals[t[0]]&&vals[t[2]])):Number(Boolean(vals[t[0]]||vals[t[2]]));assert.equal(row.outputs[name],value);vals[name]=value;}}
 }
});
test('three demos cover single gates, combined gates and eight input rows',()=>{assert.equal(engine.makeDemo().variants.length,3);assert.equal(engine.makeDemo().variants[2].example.steps.length,8);});

const test=require('node:test'),assert=require('node:assert/strict'),engine=require('./flowcharts.js');
test('all 30 flowchart questions are markable and unique within a level',()=>{
 for(const level of ['easy','medium','hard']){
 const cases=new Set();
 for(let i=0;i<10;i++){const q=engine.makeQuestion(level,i),response=Object.fromEntries(q.fields.map(f=>[f.id,f.answer]));
 cases.add(q.context+' '+(q.action||q.start||''));
 assert.deepEqual(engine.checkAnswer(q,response),{complete:true,correct:true});
 assert.equal(engine.checkAnswer(q,{}).complete,false);
 assert.equal(engine.checkAnswer(q,{...response,[q.fields[0].id]:'wrong'}).correct,false);
 q.fields.filter(f=>f.options).forEach(f=>assert.equal(f.options.filter(x=>x===f.answer).length,1));
 if(level==='hard'){const expected=[];let n=q.start;while(n<q.limit){expected.push(n);n+=q.step;}assert.equal(response.output,expected.join(','));assert.equal(response.final,String(n));}
 if(level==='medium')assert.equal(response.output,q.value>=q.limit?q.yes:q.no);
 }
 assert.equal(cases.size,10);
 }
});
test('Demo offers separate sequence, selection and iteration models',()=>{assert.deepEqual(engine.makeDemo().variants.map(x=>x.label),['Sequence','Selection','Iteration']);});

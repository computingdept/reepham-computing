/* OCR J277 Skill 29 · selecting test data, completing test plans and testing stages. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.J277TestData=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const TYPE_ORDER=['Normal','Boundary','Invalid','Erroneous'];
  const cases=[
    ['A pupil age must be an integer from 11 to 16, inclusive.','age',14,11,18,'"twelve"','An age of 11 is on the valid edge; 18 is outside the range.'],
    ['A test score must be an integer from 0 to 100, inclusive.','score',63,100,101,'"eighty"','100 is an allowed boundary; 101 is outside the range.'],
    ['Tickets ordered must be an integer from 1 to 8.','tickets',4,1,0,'"two"','1 is the minimum; 0 is invalid, while a word is the wrong data type.'],
    ['A temperature reading must be an integer from -5 to 5.','temperature',0,-5,-6,'"cold"','A negative boundary is still a valid boundary.'],
    ['The number of pages must be an integer from 1 to 50.','pages',27,50,51,'"many"','50 is the maximum allowed value.'],
    ['A club code must be text containing 4–8 characters.','code','"RHS72"','"ABCD"','"AB"','42','A four-character code is on the boundary; a number is the wrong data type.'],
    ['A username must be text containing 4–12 characters.','username','"Morgan"','"Mia4"','"Al"','9876','The four-character username meets the minimum; an integer is not text.'],
    ['A year-group number must be an integer from 7 to 11.','year',9,11,12,'"Year Ten"','11 is allowed; 12 fails the range check.'],
    ['Login attempts must be an integer from 0 to 3.','attempts',2,0,-1,'"one"','0 is a valid boundary; -1 is invalid.'],
    ['An angle must be an integer from 0 to 360 degrees.','angle',90,360,361,'"right angle"','360 is within the stated limit; 361 is not.']
  ];
  const easySequence=[0,1,2,3,1,2,0,3,2,1];
  function makeQuestion(level,index){
    if(!['easy','medium','hard'].includes(level)||!Number.isInteger(index)||index<0||index>=10)throw Error('Invalid Test Data question');
    const [rule,field,normal,boundary,invalid,erroneous,why]=cases[index];
    const samples=[normal,boundary,invalid,erroneous].map((value,i)=>({type:TYPE_ORDER[i],display:field+' = '+String(value),value:String(value),result:i<2?'Accept':'Reject'}));
    const order=[(index+2)%4,(index+1)%4,(index+3)%4,index%4];
    const stages=index%2===0?{prompt:'The programmer tests after each small change to the code.',answer:'Iterative'}:{prompt:'The completed program is tested against the final requirements.',answer:'Final/terminal'};
    const visible=level==='easy'?[samples[easySequence[index]]]:level==='medium'?[samples[(index+1)%4],samples[(index+3)%4]]:samples;
    return{level,index,rule,field,samples,visible,choices:order.map(i=>samples[i]),stages,why,
      hint:'Normal = valid ordinary value. Boundary = edge value. Invalid = correct data type, but outside the rule. Erroneous = wrong data type.',
      explanation:why+' Boundary tests can also include values just outside an edge; this activity uses valid edge values to keep categories distinct.'};
  }
  function checkAnswer(q,response={}){
    if(q.level==='easy'){const complete=Boolean(response.type);return{complete,correct:complete&&response.type===q.visible[0].type};}
    if(q.level==='medium'){
      const rows=Array.isArray(response.rows)?response.rows:[];
      const complete=rows.length===2&&rows.every(r=>r?.type&&r?.result)&&Boolean(response.stage);
      return{complete,correct:complete&&q.visible.every((item,i)=>rows[i].type===item.type&&rows[i].result===item.result)&&response.stage===q.stages.answer};
    }
    const rows=Array.isArray(response.rows)?response.rows:[];
    const complete=rows.length===4&&rows.every(r=>r?.value&&r?.result)&&Boolean(response.stage);
    return{complete,correct:complete&&q.samples.every((sample,i)=>rows[i].value===sample.value&&rows[i].result===sample.result)&&response.stage===q.stages.answer};
  }
  function model(q){return{rows:q.samples.map(s=>({type:s.type,value:s.value,display:s.display,result:s.result})),stage:q.stages.answer,explanation:q.explanation};}
  function makeDemo(){
    const data={title:'Build a test plan',task:'For valid ages 11–16, choose ordinary, edge, outside-range and wrong-type inputs.',entryLine:4,progressive:true,showAllCode:true,codeLabel:'OCR ERL · range check',traceTitle:'Test plan · one row at a time',columns:['Test data','Expected'],lines:['function validAge(age)','    return age >= 11 AND age <= 16','endfunction','print(validAge(14))'],steps:[
      [4,'START HERE','validAge(14)','Begin with the call. The same function can be called with other test data.'],
      [1,'Normal · 14','Accept','An ordinary valid integer should be accepted.'],
      [2,'Boundary · 11','Accept','The smallest allowed integer is on the edge.'],
      [2,'Invalid · 18','Reject','18 is an integer, but it breaks the age rule.'],
      [1,'Erroneous · "twelve"','Reject','Wrong data type: reject before a numeric comparison.'],
      [4,'Test plan','4 cases','Include the input, type and expected result for each case.']],end:'The function shown checks a numeric range. Real input handling must check the data type before calling it with an erroneous value.'};
    const stages={title:'Iterative and final testing',task:'A bug rejects the lower boundary. Follow the test, fix the logic and retest.',entryLine:4,progressive:true,showAllCode:true,codeLabel:'OCR ERL · find a logic error',traceTitle:'Testing during development',columns:['Step','Outcome'],lines:['function validScore(score)','    return score > 0 AND score <= 100','endfunction','print(validScore(0))'],steps:[
      [4,'START HERE','validScore(0)','A test calls the function with a boundary value.'],
      [2,'0 > 0','False','The program rejects 0, but the rule says 0 is allowed.'],
      [2,'Error','Logic','The code is valid syntax, but the comparison is wrong.'],
      [2,'Fix','score >= 0','Change > to >=, then retest while developing.'],
      [4,'Iterative','Retest after fix','Small changes are tested throughout development.'],
      [4,'Final/terminal','After completion','Run the full test plan again against requirements.']],end:'Iterative testing happens as the program is developed. Final (terminal) testing happens when the completed program is tested.'};
    return{...data,variants:[{label:'Test data',example:data},{label:'Testing stages',example:stages}]};
  }
  return{TYPE_ORDER,cases,makeQuestion,checkAnswer,model,makeDemo};
});

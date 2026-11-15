/* OCR J277 Skill 22: linear search. Pure question, trace and marking model. */
(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  else root.J277LinearSearch=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const cases=[
    {values:[8,3,12,5,9],target:5,context:'Find the first 5.'},
    {values:[17,4,8,11,4],target:4,context:'Find the first 4. A value may occur twice.'},
    {values:[6,13,2,19,7],target:10,context:'Search for 10. It may be absent.'},
    {values:[21,7,15,3,10,18],target:21,context:'Find 21. Remember where searching begins.'},
    {values:[40,12,25,12,3],target:12,context:'Find the first 12, not the last one.'},
    {values:[11,22,33,44,55,66],target:66,context:'Find 66 in this unsorted array.'},
    {values:[5,9,2,14,8],target:14,context:'Find 14, checking one element at a time.'},
    {values:[3,6,9,12,15],target:1,context:'Search for 1, including the possibility of no match.'},
    {values:[18,1,18,2,10],target:18,context:'Find the first 18. Stop when it is found.'},
    {values:[26,31,14,20,9,5],target:20,context:'Find 20 and report its array index.'}
  ];
  const code=[
    'function linearSearch(values, target)',
    '    for i = 0 to values.length - 1',
    '        if values[i] == target then',
    '            return i',
    '        endif',
    '    next i',
    '    return -1',
    'endfunction'
  ];
  const codeGaps=[[2,3,4],[2,3,7],[2,4,7],[3,4,7]];
  function makeQuestion(level,index){
    if(!['easy','medium','hard'].includes(level)||!Number.isInteger(index)||index<0||index>=cases.length)throw Error('Invalid search question');
    const item=cases[index];
    const found=item.values.indexOf(item.target);
    const visits=Array.from({length:found===-1?item.values.length:found+1},(_,i)=>i);
    const gaps=level==='hard'?codeGaps[index%4]:[];
    const program=[...code,'array numbers = ['+item.values.join(', ')+']',
      'print(linearSearch(numbers, '+item.target+'))'];
    return {level,index,values:item.values.slice(),target:item.target,context:item.context,
      found,visits,code:program,gaps,entryLine:10,
      explanation:found<0?'No element matches '+item.target+'. The search reaches the end and returns -1.':
        'The first '+item.target+' is at index '+found+'. Search stops at the first match.',
      hint:'Begin at index 0. Compare one item at a time from left to right. Stop at the first match, or return -1 if there is none.'};
  }
  function norm(value){return String(value??'').toLowerCase().replace(/\s+/g,'').replace(/;+$/,'');}
  function completeTrace(q,r){
    if(!r||!Array.isArray(r.matches)||r.matches.length!==q.visits.length||
      r.matches.some(v=>v!==true&&v!==false)||!r.values||String(r.result??'').trim()==='')return false;
    return q.visits.every(i=>i%2===0||String(r.values[i]??'').trim()!=='');
  }
  function traceCorrect(q,r){
    return q.visits.every((i,j)=>r.matches[j]===(q.values[i]===q.target)&&
      (i%2===0||Number(r.values[i])===q.values[i]))&&Number(r.result)===q.found;
  }
  function checkAnswer(q,response){
    if(q.level==='easy'){
      const r=response||{},visits=r.visited||[];
      const complete=visits.length===q.visits.length&&(q.found>=0||r.notFound===true);
      return {complete,correct:complete&&visits.every((v,i)=>v===q.visits[i])&&
        (q.found>=0?!r.notFound:r.notFound===true)};
    }
    if(!completeTrace(q,response))return {complete:false,correct:false};
    const codeOkay=q.level==='medium'||q.gaps.every(line=>norm(response.code?.[line])===norm(q.code[line-1]));
    const codeComplete=q.level==='medium'||q.gaps.every(line=>String(response.code?.[line]??'').trim());
    return {complete:!!codeComplete,correct:!!codeComplete&&codeOkay&&traceCorrect(q,response),codeCorrect:codeOkay,traceCorrect:traceCorrect(q,response)};
  }
  function model(q){
    const rows=q.visits.map(i=>[String(i),String(q.values[i]),String(q.values[i]===q.target)]);
    return {lines:q.code.slice(),rows,result:q.found};
  }
  function makeDemo(){
    const nums=[9,2,15,6,10],target=6,lines=[...code,'array numbers = [9,2,15,6,10]','print(linearSearch(numbers, 6))'];
    const steps=[[10,'START HERE','linearSearch(numbers, 6)','The call starts the function. Look for 6.'],
      [1,'Values','9, 2, 15, 6, 10','The values array and the target are passed to the function.']];
    for(let i=0;i<nums.length;i++){
      steps.push([2,'i',String(i),'FOR starts at 0 and moves to the next index.',{row:0,col:i}]);
      steps.push([3,'values[i]',nums[i]+' · '+(nums[i]===target?'True':'False'),
        'Compare '+nums[i]+' with '+target+'.'+(nums[i]===target?' Match!':' Not a match.'),{row:0,col:i}]);
      if(nums[i]===target){steps.push([4,'RETURN',String(i),'Return index '+i+' immediately.']);break;}
      steps.push([6,'NEXT',String(i+1),'No match: move to the next array index.']);
    }
    steps.push([10,'Output','3','The calling code prints the returned index.']);
    return {title:'Linear Search',task:'Find 6 by checking the array in order. The yellow mark identifies the CALL that starts the code.',
      entryLine:10,progressive:true,showAllCode:true,codeLabel:'OCR ERL · call → code → live trace',
      traceTitle:'Trace each comparison',columns:['Action','Value'],lines,steps,
      dataTable:{layout:'array',name:'numbers · indices 0–4',caption:'target = 6',values:nums},
      loopBack:{from:6,to:2},end:'Returned index: 3. Linear search checks 9, 2, 15, then 6 — and stops.'};
  }
  return {makeQuestion,checkAnswer,model,makeDemo,code,cases};
});

/* OCR J277 Skill 23: binary search, sorted arrays, halving and ERL trace tables. */
(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  else root.J277BinarySearch=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const cases=[
    {values:[2,5,8,12,16,21,29],target:16},
    {values:[3,6,9,14,18,24,31],target:3},
    {values:[1,4,7,11,13,17,20,25],target:17},
    {values:[4,8,12,16,20,24,28,32],target:14},
    {values:[2,4,6,8,10,12,14],target:8},
    {values:[5,10,15,20,25,30,35,40],target:40},
    {values:[1,3,5,7,9,11,13],target:6},
    {values:[10,20,30,40,50,60,70,80,90],target:10},
    {values:[4,9,14,19,24,29,34],target:34},
    {values:[2,7,12,17,22,27,32,37],target:23}
  ];
  const code=[
    'function binarySearch(values, target)',
    '    low = 0',
    '    high = values.length - 1',
    '    while low <= high',
    '        mid = (low + high) DIV 2',
    '        if values[mid] == target then',
    '            return mid',
    '        elseif values[mid] < target then',
    '            low = mid + 1',
    '        else',
    '            high = mid - 1',
    '        endif',
    '    endwhile',
    '    return -1',
    'endfunction'
  ];
  const gaps=[[4,5,7],[5,8,9],[6,9,11],[4,7,11],[5,13,14],[5,9,11]];
  function trace(values,target){
    let low=0,high=values.length-1;const result=[];
    while(low<=high){
      const mid=Math.floor((low+high)/2),value=values[mid],
        decision=value===target?'Found':value<target?'Right':'Left';
      result.push({low,high,mid,value,decision});
      if(decision==='Found')return {rows:result,found:mid};
      if(decision==='Right')low=mid+1;else high=mid-1;
    }
    return {rows:result,found:-1};
  }
  function makeQuestion(level,index){
    if(!['easy','medium','hard'].includes(level)||!Number.isInteger(index)||index<0||index>=cases.length)throw Error('Invalid binary search question');
    const c=cases[index],t=trace(c.values,c.target),program=[...code,
      'array numbers = ['+c.values.join(', ')+']',
      'print(binarySearch(numbers, '+c.target+'))'];
    return {level,index,values:c.values.slice(),target:c.target,rows:t.rows,found:t.found,
      code:program,gaps:level==='hard'?gaps[index%gaps.length]:[],entryLine:17,
      explanation:t.found<0?'No match. Once low is greater than high, return -1.':
        'The target '+c.target+' is at index '+t.found+'. Each comparison discards half of the remaining range.',
      hint:'The array is SORTED. Check mid = (low + high) DIV 2 (round down). If target is smaller, keep the left half; if larger, keep the right half.'};
  }
  function normal(value){return String(value??'').toLowerCase().replace(/\s+/g,'').replace(/;+$/,'');}
  function checkAnswer(q,response){
    if(q.level==='easy'){
      const r=response||{},steps=r.steps||[];
      const complete=steps.length===q.rows.length&&(q.found>=0||r.notFound===true);
      return {complete,correct:complete&&steps.every((s,i)=>s.mid===q.rows[i].mid&&s.decision===q.rows[i].decision)&&
        (q.found>=0?!r.notFound:r.notFound===true)};
    }
    const r=response||{};
    const hasTrace=Array.isArray(r.mids)&&Array.isArray(r.values)&&Array.isArray(r.decisions)&&
      r.mids.length===q.rows.length&&r.values.length===q.rows.length&&r.decisions.length===q.rows.length&&
      String(r.result??'').trim()!==''&&q.rows.every((_,i)=>String(r.mids[i]??'').trim()!==''&&
        String(r.values[i]??'').trim()!==''&&['Left','Right','Found'].includes(r.decisions[i]));
    const codeComplete=q.level==='medium'||q.gaps.every(line=>String(r.code?.[line]??'').trim());
    if(!hasTrace||!codeComplete)return {complete:false,correct:false};
    const traceCorrect=q.rows.every((row,i)=>Number(r.mids[i])===row.mid&&Number(r.values[i])===row.value&&
      r.decisions[i]===row.decision)&&Number(r.result)===q.found;
    const codeCorrect=q.level==='medium'||q.gaps.every(line=>normal(r.code[line])===normal(q.code[line-1]));
    return {complete:true,correct:traceCorrect&&codeCorrect,traceCorrect,codeCorrect};
  }
  function model(q){return {lines:q.code.slice(),rows:q.rows.map(r=>[r.low,r.high,r.mid,r.value,r.decision]),result:q.found};}
  function makeDemo(){
    const values=[3,7,11,15,19,23,27],target=11,t=trace(values,target);
    const lines=[...code,'array numbers = [3,7,11,15,19,23,27]','print(binarySearch(numbers, 11))'];
    const steps=[[17,'START HERE','binarySearch(numbers, 11)','The function call begins the search. The array has already been set up.'],
      [2,'low','0','The left boundary starts at index 0.'],[3,'high','6','The right boundary starts at the last index.']];
    for(const row of t.rows){
      const focus={row:0,col:row.mid},range={low:row.low,high:row.high};
      steps.push([4,'Range',row.low+'–'+row.high,'Repeat while low <= high.',focus,range]);
      steps.push([5,'mid',String(row.mid),'Calculate the middle index, rounding DOWN.',focus,range]);
      steps.push([6,'Compare',row.value+' vs '+target,'Inspect numbers['+row.mid+'] = '+row.value+'.',focus,range]);
      if(row.decision==='Found')steps.push([7,'RETURN',String(row.mid),'Target found at index '+row.mid+'.',focus,range]);
      else if(row.decision==='Right')steps.push([9,'Keep RIGHT',(row.mid+1)+'–'+row.high,
        'Middle is too small. Discard the middle and LEFT half.',focus,{low:row.mid+1,high:row.high}]);
      else steps.push([11,'Keep LEFT',row.low+'–'+(row.mid-1),
        'Middle is too large. Discard the middle and RIGHT half.',focus,{low:row.low,high:row.mid-1}]);
    }
    steps.push([17,'Output','2','The caller prints the matching index.']);
    return {title:'Binary Search',task:'Follow the sorted array as the range halves. The yellow START HERE marks the function call.',
      entryLine:17,progressive:true,showAllCode:true,codeLabel:'OCR ERL · sorted array → midpoint → half',
      traceTitle:'Build the binary-search trace',columns:['Check','Value'],lines,steps,
      dataTable:{layout:'array',name:'numbers · SORTED',caption:'target = 11',values},
      end:'The search checks 15, then 7, then 11. It returns index 2.'};
  }
  return {makeQuestion,checkAnswer,makeDemo,model,trace,cases,code};
});

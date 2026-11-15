/* OCR J277 Skill 25: Insertion Sort. Pure model, deterministic questions and marking. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.J277InsertionSort=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const cases=[[7,2,9,3,5],[4,1,6,2,8],[5,5,1,4,2],[9,7,5,3,1],[1,3,2,5,4],[8,2,6,4,0],[3,9,1,7,2],[6,4,2,8,5],[10,3,7,1,9],[2,5,1,4,3]];
  const lines=['procedure insertionSort(values)','    for i = 1 to values.length - 1','        key = values[i]','        j = i - 1','        while j >= 0 AND values[j] > key','            values[j+1] = values[j]','            j = j - 1','        endwhile','        values[j+1] = key','    next i','endprocedure'];
  const gapSets=[[3,5,9],[2,6,9],[3,7,9],[2,5,6],[4,5,9]];
  function trace(input){const a=input.slice(),rounds=[];for(let i=1;i<a.length;i++){const before=a.slice(),key=a[i];let j=i-1,shifts=0;while(j>=0&&a[j]>key){a[j+1]=a[j];j--;shifts++;}a[j+1]=key;rounds.push({i,key,position:j+1,shifts,before,after:a.slice()});}return{rounds,sorted:a};}
  function makeQuestion(level,index){if(!['easy','medium','hard'].includes(level)||!Number.isInteger(index)||index<0||index>=10)throw Error('Invalid Insertion Sort question');const values=cases[index].slice(),t=trace(values);return{level,index,values,...t,code:[...lines,'array numbers = ['+values.join(', ')+']','insertionSort(numbers)','print(numbers)'],entryLine:13,gaps:level==='hard'?gapSets[index%gapSets.length]:[],hint:'Build a sorted left-hand section. Take the key, shift larger values one place RIGHT, then put the key into the gap.',explanation:'Each round puts the key in the correct place in the growing sorted section.'};}
  function parseArray(x){const s=String(x??'').trim();if(!s||!/^-?\d+(?:[\s,]+-?\d+)*$/.test(s))return null;return s.split(/[\s,]+/).filter(Boolean).map(Number);}
  function same(a,b){return Array.isArray(a)&&a.length===b.length&&a.every((v,i)=>v===b[i]);}
  function normal(x){return String(x??'').toLowerCase().replace(/\s+/g,'').replace(/;+$/,'');}
  function checkAnswer(q,r={}){
    if(q.level==='easy'){const picks=r.positions||[];return{complete:picks.length===q.rounds.length,correct:picks.length===q.rounds.length&&picks.every((p,i)=>p===q.rounds[i].position)};}
    const rows=Array.isArray(r.rows)?r.rows:[];const completeRows=rows.length===q.rounds.length&&rows.every(row=>Number.isInteger(Number(row?.position))&&String(row?.position??'').trim()!==''&&parseArray(row?.array)!==null);
    if(!completeRows)return{complete:false,correct:false};
    const traceRight=rows.every((row,i)=>Number(row.position)===q.rounds[i].position&&same(parseArray(row.array),q.rounds[i].after));
    if(q.level==='medium')return{complete:true,correct:traceRight};
    const codeComplete=q.gaps.every(n=>String(r.code?.[n]??'').trim());
    return{complete:Boolean(codeComplete),correct:Boolean(codeComplete)&&traceRight&&q.gaps.every(n=>normal(r.code[n])===normal(q.code[n-1])),traceCorrect:traceRight};
  }
  function model(q){return{rows:q.rounds.map(r=>({position:r.position,array:r.after.slice()})),lines:q.code.slice()};}
  function makeDemo(){
    const values=[6,2,5,1],t=trace(values),code=[...lines,'array numbers = [6,2,5,1]','insertionSort(numbers)','print(numbers)'];
    const steps=[[13,'START HERE','insertionSort(numbers)','The procedure call begins the sort.',null,null,{values:values.slice()}]];
    for(const r of t.rounds){steps.push([2,'FOR i',String(r.i),'Take the next value from the unsorted section.',null,null,{values:r.before.slice(),pair:[r.i]}]);steps.push([3,'Key',String(r.key),'Store the current key while the larger values move right.',null,null,{values:r.before.slice(),pair:[r.i]}]);let moving=r.before.slice();for(let j=r.i-1;j>=r.position;j--){moving[j+1]=moving[j];steps.push([6,'Shift',moving.join(', '),'Shift '+moving[j]+' one space to the RIGHT.',null,null,{values:moving.slice(),pair:[j,j+1]}]);steps.push([7,'j',String(j-1),'Move left to check the next value.',null,null,{values:moving.slice()}]);}steps.push([9,'INSERT',r.after.join(', '),'Put '+r.key+' at index '+r.position+'. The first '+(r.i+1)+' values are sorted.',null,null,{values:r.after.slice(),pair:[r.position],swapped:true}]);steps.push([10,'NEXT i',String(r.i+1),'Return to FOR for the next key.',null,null,{values:r.after.slice()}]);}
    steps.push([14,'Output',t.sorted.join(', '),'Print the sorted array.',null,null,{values:t.sorted.slice()}]);
    return{title:'Insertion Sort',task:'Watch the key move into the sorted section. This example is separate from the task.',entryLine:13,progressive:true,showAllCode:true,codeLabel:'OCR ERL · called procedure, key and shifting',traceTitle:'Trace each insertion',columns:['Action','Value / array'],lines:code,steps,dataTable:{layout:'array',name:'numbers · ASCENDING',caption:'Sorted section grows left to right',values:values.slice()},loopBack:{from:10,to:2},end:'Sorted result: 1, 2, 5, 6. Only larger values shift right.'};
  }
  return{makeQuestion,checkAnswer,model,makeDemo,trace,parseArray,cases,lines};
});

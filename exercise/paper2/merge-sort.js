/* OCR J277 Skill 26: Merge Sort · split recursively, then merge two sorted halves. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.J277MergeSort=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const cases=[[6,2,5,1],[8,3,7,4],[4,1,4,2],[9,7,5,3],[1,3,2,5],[8,2,6,0],[3,9,1,7],[6,4,2,8],[10,3,7,1],[2,5,1,4]];
  const lines=['function mergeSorted(left, right)','    result = []','    i = 0','    j = 0','    while i < left.length OR j < right.length','        if j >= right.length OR (i < left.length AND left[i] <= right[j]) then','            result.append(left[i])','            i = i + 1','        else','            result.append(right[j])','            j = j + 1','        endif','    endwhile','    return result','endfunction'];
  const gapSets=[[5,6,7],[2,7,10],[3,6,11],[4,5,14],[6,8,10]];
  function trace(input){const values=input.slice(),singletons=values.map(v=>[v]),left=values.slice(0,2).sort((a,b)=>a-b),right=values.slice(2).sort((a,b)=>a-b),merged=[];let i=0,j=0;const actions=[];while(i<left.length||j<right.length){const from=j===right.length||(i<left.length&&left[i]<=right[j])?'left':'right';const current=from==='left'?left[i++]:right[j++];merged.push(current);actions.push({from,value:current,leftIndex:i,rightIndex:j,after:merged.slice()});}return{values,left,right,singletons,actions,sorted:merged};}
  function makeQuestion(level,index){if(!['easy','medium','hard'].includes(level)||!Number.isInteger(index)||index<0||index>=10)throw Error('Invalid Merge Sort question');const t=trace(cases[index]);return{level,index,...t,code:[...lines,'array left = ['+t.left.join(', ')+']','array right = ['+t.right.join(', ')+']','print(mergeSorted(left, right))'],entryLine:18,gaps:level==='hard'?gapSets[index%gapSets.length]:[],hint:'Merge Sort splits until each group has one value. Then combine two SORTED groups: take the smaller FRONT value each time, until both are empty.',explanation:'The sorted groups were merged in ascending order. Equal values are kept in their original left-to-right order.'};}
  function parseArray(x){const s=String(x??'').trim();if(!s||!/^-?\d+(?:[\s,]+-?\d+)*$/.test(s))return null;return s.split(/[\s,]+/).filter(Boolean).map(Number);}
  function same(a,b){return Array.isArray(a)&&a.length===b.length&&a.every((v,i)=>v===b[i]);}
  function normal(x){return String(x??'').toLowerCase().replace(/\s+/g,'').replace(/;+$/,'');}
  function checkAnswer(q,r={}){
    if(q.level==='easy'){const picks=r.sources||[];return{complete:picks.length===q.actions.length,correct:picks.length===q.actions.length&&picks.every((p,i)=>p===q.actions[i].from)};}
    const rows=Array.isArray(r.rows)?r.rows:[];const completeRows=rows.length===q.actions.length&&rows.every(row=>['left','right'].includes(row?.from)&&parseArray(row?.array)!==null);
    if(!completeRows)return{complete:false,correct:false};
    const traceRight=rows.every((row,i)=>row.from===q.actions[i].from&&same(parseArray(row.array),q.actions[i].after));
    if(q.level==='medium')return{complete:true,correct:traceRight};
    const codeComplete=q.gaps.every(n=>String(r.code?.[n]??'').trim());
    return{complete:Boolean(codeComplete),correct:Boolean(codeComplete)&&traceRight&&q.gaps.every(n=>normal(r.code[n])===normal(q.code[n-1])),traceCorrect:traceRight};
  }
  function model(q){return{rows:q.actions.map(a=>({from:a.from,array:a.after.slice()})),lines:q.code.slice()};}
  function makeDemo(){
    const t=trace([6,2,5,1]),code=[...lines,'array left = [2,6]','array right = [1,5]','print(mergeSorted(left, right))'];
    const frame=a=>({values:[...a,...Array(4-a.length).fill('·')].slice(0,4)});
    const steps=[[18,'START HERE','mergeSorted(left,right)','The final merge is called after smaller groups have been sorted.',null,null,frame(t.values)],
      [18,'Split','[6,2] | [5,1]','Divide the original list into two halves.',null,null,frame(t.values)],
      [18,'Split','[6] [2] [5] [1]','Split again until groups contain one value.',null,null,frame(t.values)],
      [18,'Combine','[2,6] | [1,5]','Merge the singletons into two sorted pairs. Now merge those pairs.',null,null,frame([...t.left,...t.right])],
      [2,'result','[]','Start an empty output list.',null,null,frame([])],
      [3,'i','0','Start at the front of the left sorted pair.',null,null,frame([])],
      [4,'j','0','Start at the front of the right sorted pair.',null,null,frame([])]];
    for(const a of t.actions){steps.push([5,'WHILE','More values?','Continue while either sorted group has values left.',null,null,frame(a.after.slice(0,-1))]);steps.push([6,'Compare',a.from.toUpperCase(),'Take the smaller front value, or the only remaining front value.',null,null,frame(a.after.slice(0,-1))]);steps.push([a.from==='left'?7:10,'Take '+a.from,a.after.join(', '),'Append '+a.value+' to the merged output.',null,null,frame(a.after)]);steps.push([a.from==='left'?8:11,'Move pointer','i='+a.leftIndex+', j='+a.rightIndex,'Move forward in the group just used.',null,null,frame(a.after)]);steps.push([13,'Repeat','Output '+a.after.length+'/4','Return to WHILE for the next value.',null,null,frame(a.after)]);}
    steps.push([14,'RETURN',t.sorted.join(', '),'Return the sorted result to the caller.',null,null,frame(t.sorted)]);steps.push([18,'Output',t.sorted.join(', '),'The caller prints the final sorted array.',null,null,frame(t.sorted)]);
    return{title:'Merge Sort',task:'First split into singletons; then watch two sorted pairs merge. Separate worked example.',entryLine:18,progressive:true,showAllCode:true,codeLabel:'OCR-style ERL · final merge of two sorted halves',traceTitle:'Split → merge trace',columns:['Action','Group / output'],lines:code,steps,dataTable:{layout:'array',name:'Merged output',caption:'Values are taken left or right',values:['·','·','·','·']},loopBack:{from:13,to:5},end:'Sorted result: 1, 2, 5, 6. Merge Sort splits, then combines sorted groups.'};
  }
  return{makeQuestion,checkAnswer,model,makeDemo,trace,parseArray,cases,lines};
});

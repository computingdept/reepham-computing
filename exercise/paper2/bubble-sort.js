/* OCR J277 Skill 24: Bubble Sort · understand swaps, trace passes and read ERL. */
(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  else root.J277BubbleSort=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const cases=[
    [7,2,9,3,5],[4,1,6,2,8],[5,5,1,4,2],[9,7,5,3,1],[1,3,2,5,4],
    [8,2,6,4,0],[3,9,1,7,2],[6,4,2,8,5],[10,3,7,1,9],[2,5,1,4,3]
  ];
  const lines=[
    'procedure bubbleSort(values)',
    '    for pass = 0 to values.length - 2',
    '        for i = 0 to values.length - pass - 2',
    '            if values[i] > values[i+1] then',
    '                temp = values[i]',
    '                values[i] = values[i+1]',
    '                values[i+1] = temp',
    '            endif',
    '        next i',
    '    next pass',
    'endprocedure'
  ];
  const gapSets=[[2,3,4],[3,4,5],[4,6,7],[2,7,9],[3,4,10],[2,5,6]];
  function trace(original){
    const values=original.slice(),events=[],passes=[];
    for(let pass=0;pass<values.length-1;pass++){
      let swaps=0;
      for(let i=0;i<values.length-pass-1;i++){
        const before=values.slice(),left=values[i],right=values[i+1],swap=left>right;
        if(swap){values[i]=right;values[i+1]=left;swaps++;}
        events.push({pass,i,left,right,swap,before,after:values.slice()});
      }
      passes.push({pass,after:values.slice(),swaps});
    }
    return {events,passes,sorted:values};
  }
  function makeQuestion(level,index){
    if(!['easy','medium','hard'].includes(level)||!Number.isInteger(index)||index<0||index>=cases.length)throw Error('Invalid Bubble Sort question');
    const values=cases[index].slice(),t=trace(values);
    return {level,index,values,events:t.events,firstPass:t.events.filter(e=>e.pass===0),
      passes:t.passes,sorted:t.sorted,
      code:[...lines,'array numbers = ['+values.join(', ')+']','bubbleSort(numbers)','print(numbers)'],
      entryLine:13,gaps:level==='hard'?gapSets[index%gapSets.length]:[],
      hint:'Compare adjacent values. For ascending order, SWAP only when the LEFT value is greater than the RIGHT. Repeat passes until all values are sorted.',
      explanation:'Each comparison moves larger values towards the right. After the full set of passes the array is sorted.'};
  }
  function parseArray(answer){
    const s=String(answer??'').trim();if(!s||!/^-?\d+(?:[\s,]+-?\d+)*$/.test(s))return null;
    return s.split(/[\s,]+/).filter(Boolean).map(Number);
  }
  function same(a,b){return Array.isArray(a)&&a.length===b.length&&a.every((v,i)=>v===b[i]);}
  function normal(s){return String(s??'').toLowerCase().replace(/\s+/g,'').replace(/;+$/,'');}
  function checkAnswer(q,response){
    const r=response||{};
    if(q.level==='easy'){
      const picks=Array.isArray(r.swaps)?r.swaps:[];
      const complete=picks.length===q.firstPass.length;
      return {complete,correct:complete&&picks.every((value,i)=>value===q.firstPass[i].swap)};
    }
    if(q.level==='medium'){
      const picks=r.swaps||[];
      const complete=Array.isArray(picks)&&picks.length===q.firstPass.length&&
        picks.every(x=>x===true||x===false)&&parseArray(r.result)!==null;
      return {complete,correct:complete&&picks.every((x,i)=>x===q.firstPass[i].swap)&&
        same(parseArray(r.result),q.passes[0].after)};
    }
    const complete=Array.isArray(r.passes)&&r.passes.length===q.passes.length&&
      r.passes.every(x=>parseArray(x)!==null)&&q.gaps.every(i=>String(r.code?.[i]??'').trim());
    if(!complete)return {complete:false,correct:false};
    const arrays=q.passes.every((pass,i)=>same(parseArray(r.passes[i]),pass.after));
    const code=q.gaps.every(i=>normal(r.code[i])===normal(q.code[i-1]));
    return {complete:true,correct:arrays&&code,arraysCorrect:arrays,codeCorrect:code};
  }
  function model(q){return {lines:q.code.slice(),onePass:q.firstPass.map(e=>[e.i,e.left,e.right,e.swap,e.after.slice()]),
    passes:q.passes.map(p=>p.after.slice()),sorted:q.sorted.slice()};}
  function makeDemo(){
    const values=[5,2,4,1],t=trace(values),code=[...lines,'array numbers = [5,2,4,1]','bubbleSort(numbers)','print(numbers)'];
    const steps=[[13,'START HERE','bubbleSort(numbers)','The array is ready. The procedure call begins sorting.',null,null,{values:values.slice()}]];
    for(const p of t.passes){
      const last=p.pass===0?values:t.passes[p.pass-1].after;
      steps.push([2,'Pass '+(p.pass+1),last.join(', '),'Begin a pass over adjacent pairs.',null,null,{values:last.slice()}]);
      for(const e of t.events.filter(x=>x.pass===p.pass)){
        const pair=[e.i,e.i+1];
        steps.push([4,'Compare',e.left+' > '+e.right+'?',
          e.swap?'Left is larger: swap.':'Already in order: do not swap.',null,null,{values:e.before.slice(),pair}]);
        steps.push([e.swap?7:8,e.swap?'SWAP':'Keep',e.after.join(', '),
          e.swap?'The adjacent values exchange positions.':'The array stays the same.',null,null,{values:e.after.slice(),pair,swapped:e.swap}]);
      }
    }
    steps.push([14,'Output',t.sorted.join(', '),'The caller prints the sorted array.',null,null,{values:t.sorted.slice()}]);
    return {title:'Bubble Sort',task:'Watch adjacent comparisons, swaps and repeated passes on a separate example.',
      entryLine:13,progressive:true,showAllCode:true,codeLabel:'OCR ERL · procedure call, nested loops and IF',
      traceTitle:'Trace each comparison',columns:['Action','Array / comparison'],lines:code,steps,
      dataTable:{layout:'array',name:'numbers · ASCENDING',caption:'Compare adjacent cells',values:values.slice()},
      end:'Sorted result: 1, 2, 4, 5. Larger values move right after each pass.'};
  }
  return {makeQuestion,checkAnswer,makeDemo,model,trace,parseArray,cases,lines};
});

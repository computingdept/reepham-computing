/* H446 You Do phase module. Opt-in; no global navigation or other phases. */
(function(){
  'use strict';
  if(!/^\/lessons\/h446\/lesson-\d{3}(?:\/|\.html|$)/i.test(location.pathname))return;
  const root=document.querySelector('#you-do[data-h446-two-page-pilot="true"]');
  if(!root)return;
  // Authored command metadata is authoritative. No guessing from ordinary verbs.
  function markQuestion(heading){
    const explicit=heading.dataset.h446Commands;
    const plain=heading.textContent;
    const command='Analyse|Annotate|Assess|Calculate|Compare|Complete|Construct|Convert|Define|Describe|Design|Determine|Discuss|Draw|Evaluate|Explain|Give|Identify|Illustrate|Justify|Label|List|Name|Outline|Predict|Recommend|Show|Simplify|Sketch|State|Suggest|Trace|Write|Perform|Normalise|Select|Tick|Order|Solve|Add|Modify|Correct|Use';
    const pattern=new RegExp('(?:^|[.!?;]\\s+|\\([a-zivx0-9]+\\)\\s*|\\b(?:and|then)\\s+)('+command+')\\b','gi');
    const matches=[];
    if(explicit){
      for(const word of explicit.split('|').map(s=>s.trim()).filter(s=>/^[a-z]+(?: [a-z]+)*$/i.test(s))){
        const m=new RegExp('\\b'+word+'\\b','i').exec(plain);
        if(m)matches.push({start:m.index,length:m[0].length});
      }
    }else{
      for(const m of plain.matchAll(pattern)){
        const start=m.index+m[0].length-m[1].length;
        const prefix=m[0].slice(0,-m[1].length);
        if(/^(?:and|then)\s+/i.test(prefix)&&(!matches.length||/^(?:add|use|order|select|design)$/i.test(m[1])))continue;
        matches.push({start,length:m[1].length});
      }
    }
    // Prevent the legacy shared highlighter from adding misleading commands.
    heading.setAttribute('data-rhsc-command-ready','true');
    const walk=document.createTreeWalker(heading,NodeFilter.SHOW_TEXT);
    const nodes=[];let node,offset=0;
    while((node=walk.nextNode())){
      const start=offset;offset+=node.nodeValue.length;
      if(!node.parentElement.closest('mark,pre,code,svg,math,script,style'))nodes.push({node,start,end:offset});
    }
    for(const item of nodes){
      const node=item.node;
      const ranges=matches.filter(m=>m.start>=item.start&&m.start+m.length<=item.end)
        .map(m=>({start:m.start-item.start,length:m.length}));
      ranges.sort((a,b)=>b.start-a.start);
      for(const range of ranges){
        const part=node.splitText(range.start);
        part.splitText(range.length);
        const mark=document.createElement('mark');
        mark.className='h446-youdo-command';
        mark.textContent=part.nodeValue;
        part.replaceWith(mark);
      }
    }
  }
  root.querySelectorAll('.youdo-question-prompt').forEach(prompt=>{
    const heading=prompt.querySelector('.rhs-y13-task,.y13-rhs-task');
    if(!heading)return;
    for(const child of [...prompt.children]){
      if(child.matches('.rhs-y13-context-title,.rhs-y13-context,.rhs-y13-code,.y13-rhs-brief,.y13-rhs-context,.y13-rhs-illustration-question')){
        prompt.insertBefore(child,heading);
      }
    }
    markQuestion(heading);
  });
})();

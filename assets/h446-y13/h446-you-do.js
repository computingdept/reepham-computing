/* H446 You Do phase module. Opt-in; no global navigation or other phases. */
(function(){
  'use strict';
  if(!/^\/lessons\/h446\/lesson-\d{3}(?:\/|\.html|$)/i.test(location.pathname))return;
  const root=document.querySelector('#you-do[data-h446-two-page-pilot="true"]');
  if(!root)return;
  // Authored command metadata is authoritative. No guessing from ordinary verbs.
  function markQuestion(heading){
    const words=(heading.dataset.h446Commands||'').split('|').map(s=>s.trim()).filter(s=>/^[a-z]+(?: [a-z]+)*$/i.test(s));
    if(!words.length)return;
    // Prevent the legacy shared highlighter from adding misleading commands.
    heading.setAttribute('data-rhsc-command-ready','true');
    const walk=document.createTreeWalker(heading,NodeFilter.SHOW_TEXT);
    const nodes=[];let node;
    while((node=walk.nextNode())){
      if(!node.parentElement.closest('mark,pre,code,svg,math,script,style'))nodes.push(node);
    }
    const used=new Set();
    for(const node of nodes){
      const text=node.nodeValue;
      const ranges=[];
      for(const word of words){
        if(used.has(word.toLowerCase()))continue;
        const match=new RegExp('\\b'+word+'\\b','i').exec(text);
        if(match){ranges.push({start:match.index,length:match[0].length});used.add(word.toLowerCase());}
      }
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
  root.querySelectorAll('.youdo-question-prompt .rhs-y13-task[data-h446-commands]').forEach(markQuestion);
})();

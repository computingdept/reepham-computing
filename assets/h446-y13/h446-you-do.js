/* H446 You Do phase module. Opt-in; no global navigation or other phases. */
(function(){
  'use strict';
  function selectGroups(count, fits, narrow){
    const groups=[];
    for(let i=0;i<count;){
      let size=1;
      if(!narrow&&count-i>=4&&fits(i,4))size=4;
      else if(!narrow&&count-i>=3&&fits(i,3))size=3;
      else if(!narrow&&count-i>=2&&fits(i,2))size=2;
      groups.push({start:i,end:i+size});
      i+=size;
    }
    return groups;
  }
  // Shared screen-fit test: use the actual scrollable boxes, not a second
  // arbitrary gap inside a card. Both courses use this same tolerance.
  function boxesFit(boxes){
    return Array.from(boxes).every(box=>box&&box.clientHeight>0&&box.clientWidth>0&&
      box.scrollHeight<=box.clientHeight+4&&box.scrollWidth<=box.clientWidth+4);
  }
  // Shared pure grouping policy; course-specific controllers keep their own DOM.
  function commandRanges(plain,explicit){
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
    return matches;
  }
  window.RHSYouDoLayout=Object.freeze({selectGroups,commandRanges,boxesFit});
  if(!/^\/lessons\/h446\/lesson-\d{3}(?:\/|\.html|$)/i.test(location.pathname))return;
  const root=document.querySelector('#you-do[data-h446-two-page-pilot="true"]');
  if(!root)return;
  const year12=root.dataset.h446Y12Shared==='true';
  const legacy=year12&&root.dataset.h446Y12Legacy==='true';
  // Authored command metadata is authoritative. No guessing from ordinary verbs.
  function markQuestion(heading){
    const explicit=heading.dataset.h446Commands;
    const plain=heading.textContent;
    const matches=commandRanges(plain,explicit);
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
    const heading=prompt.querySelector('.rhs-y13-task,.y13-rhs-task')||(year12?prompt.querySelector(legacy?'h2,h3':'h2'):null);
    if(year12&&heading)heading.classList.add('rhs-y13-task');
    if(legacy){
      prompt.querySelectorAll('.question-text').forEach(block=>{
        const parts=block.matches('p')?[block]:[...block.querySelectorAll('p,li')];
        parts.forEach(part=>{if(!part.closest('pre,figure,table,svg')&&!part.querySelector('mark')){part.classList.add('h446-legacy-task');markQuestion(part);}});
      });
    }
    if(!heading)return;
    for(const child of [...prompt.children]){
      if(child.matches('.rhs-y13-context-title,.rhs-y13-context,.rhs-y13-code,.y13-rhs-brief,.y13-rhs-context,.y13-rhs-illustration-question')){
        prompt.insertBefore(child,heading);
      }
    }
    markQuestion(heading);
  });

  // Only shared exam decks are affected. Retain the previously approved
  // compact linked-list and ERD/readability pilots exactly as authored.
  if(root.dataset.h446CompactAnswer!=='true'&&root.dataset.h446ReadabilityPilot!=='true'){
    root.querySelectorAll('.youdo-question').forEach(q=>{
      const prompt=q.querySelector('.youdo-question-prompt');
      const answer=q.querySelector('.youdo-solution');
      if(!prompt||!answer)return;
      const visual='svg,img,table';
      const code='pre:not(.arithmetic)';
      const qVisual=!!prompt.querySelector(visual);
      const aVisual=!!answer.querySelector(visual);
      const qCode=!!prompt.querySelector(code);
      const aCode=!!answer.querySelector(code);
      q.classList.toggle('h446-specialist-visual-question',qVisual);
      q.classList.toggle('h446-specialist-visual-answer',aVisual);
      q.classList.toggle('h446-specialist-question',qVisual||qCode);
      q.classList.toggle('h446-specialist-answer',qVisual||aVisual||qCode||aCode);
    });
  }

  // Choose stable, ordered groups. Never split a question or change its content.
  // Measure the actual cards at their real desktop size, before displaying them.
  // All temporary visibility and dataset values are restored synchronously.
  function fitsOnScreen(questions,start,size){
    if(!root.classList.contains('active')||root.clientWidth===0)return false;
    // A diagram or table on the question needs a whole screen in adaptive
    // decks. Explicitly authored grouping remains authoritative.
    if(size>1&&questions.slice(start,start+size).some(q=>q.classList.contains('h446-specialist-visual-question')))return false;
    const keys=['h446QuestionSheet','answerMode','h446GroupCount'];
    const previous=keys.map(k=>root.dataset[k]);
    const state=questions.map(q=>({hidden:q.hidden,answer:q.querySelector('.youdo-solution'),answerHidden:q.querySelector('.youdo-solution')?.hidden}));
    try{
      root.dataset.h446QuestionSheet='true';
      root.dataset.answerMode='false';
      root.dataset.h446GroupCount=String(size);
      questions.forEach((q,i)=>{q.hidden=i<start||i>=start+size;if(state[i].answer)state[i].answer.hidden=true;});
      const deck=root.querySelector('.youdo-questions');
      const visible=questions.slice(start,start+size);
      if(!deck||!deck.clientHeight||!deck.clientWidth)return false;
      // Measure the question contents rather than the outer grid's scroll
      // extent. Grid gutters and inherited card margins are not content.
      // Reject genuine card overflow and keep code/visual safeguards.
      return visible.every(q=>{
        const prompt=q.querySelector('.youdo-question-prompt');
        if(!prompt||!q.clientHeight||!q.clientWidth)return false;
        if(boxesFit([q]))return true;
        const card=q.getBoundingClientRect(),content=prompt.getBoundingClientRect();
        const style=getComputedStyle(q);
        const bottom=card.bottom-(parseFloat(style.paddingBottom)||0)-(parseFloat(style.borderBottomWidth)||0);
        const right=card.right-(parseFloat(style.paddingRight)||0)-(parseFloat(style.borderRightWidth)||0);
        return boxesFit([prompt])&&content.bottom<=bottom+4&&content.right<=right+4;
      });
    }finally{
      keys.forEach((k,i)=>{if(previous[i]===undefined)delete root.dataset[k];else root.dataset[k]=previous[i];});
      questions.forEach((q,i)=>{q.hidden=state[i].hidden;if(state[i].answer)state[i].answer.hidden=state[i].answerHidden;});
    }
  }
  function installGroups(){
    if(typeof h446QuestionSheetGroups!=='function'||typeof h446SequentialQuestions!=='function'||typeof isH446BankQuestionSheet!=='function'||!isH446BankQuestionSheet(root))return;
    const id=Number(location.pathname.match(/lesson-(\d{3})/)?.[1]);
    if(year12?(id<1||id>160):(id<181||id>320))return;
    const authored=root.dataset.h446SingleQuestion==='true'||!!root.dataset.h446PageGroups;
    // The approved original two-question ERD pilot remains exactly as authored.
    if(!authored&&(id===276||root.dataset.h446ReadabilityPilot==='true'))return;
    const defaultGroups=h446QuestionSheetGroups;
    const questions=h446SequentialQuestions(root);
    if(!questions.length)return;
    if(year12){
      // Match the existing controller's mark parser using the original task total.
      // Preserve the authored tag text, and never infer missing totals.
      questions.forEach(q=>{
        const p=q.querySelector('.youdo-question-prompt');
        const tag=p?.querySelector('.phase-tag');
        const heading=p?.querySelector('h2,h3');
        const total=(heading?.textContent||'').match(/\[(\d{1,2})\]\s*$/)?.[1]||(legacy?((tag?.textContent||'').match(/\[(\d{1,2})\]\s*$/)?.[1]||(p?.querySelector('.classroom-marks')?.textContent||'').match(/(?:marks?)\s*:\s*(\d{1,2})/i)?.[1]):null);
        if(tag&&total&&!/\b\d{1,2}\s*marks?\b/i.test(tag.textContent))tag.append(' · '+total+' MARKS');
        q.querySelectorAll('.youdo-solution>p').forEach(p=>p.classList.add('rhs-y13-answer'));
      });
    }
    let groups=null;
    if(authored){
      const sizes=root.dataset.h446SingleQuestion==='true'?questions.map(()=>1):root.dataset.h446PageGroups.split(',').map(Number);
      if(sizes.some(n=>![1,2,3,4].includes(n))||sizes.reduce((a,b)=>a+b,0)!==questions.length)return;
      let start=0;
      groups=sizes.map(n=>{const group={start,end:start+n};start+=n;return group;});
    }else{
      root.dataset.h446AutoGroups='true';
      // Existing context is not rewritten. Open only question-context disclosures.
      root.querySelectorAll('.youdo-question-prompt details.y13-rhs-context').forEach(d=>{d.open=true;});
    }
    h446QuestionSheetGroups=function(page){
      if(page!==root)return defaultGroups(page);
      if(groups)return groups;
      const narrow=window.matchMedia('(max-width:900px)').matches;
      if(!root.classList.contains('active')||root.clientWidth===0)return selectGroups(questions.length,()=>false,narrow);
      // Freeze the plan for this page visit, so forward/back navigation is stable.
      try{groups=selectGroups(questions.length,(start,size)=>fitsOnScreen(questions,start,size),narrow);}
      catch(error){groups=selectGroups(questions.length,()=>false,narrow);console.warn('H446 You Do layout fallback:',error);}
      return groups;
    };
    if(root.classList.contains('active')&&root.dataset.answerMode!=='true'){
      h446ShowQuestionSheet(root,0);
      updateControl();
    }
    // Like J277, settle the initial grouping after the phase is visible and
    // the classroom header has updated. Never regroup during self-marking.
    if(!authored){
      let settled=false,scheduled=false;
      const settle=()=>{
        scheduled=false;
        if(settled||!root.classList.contains('active')||!root.clientWidth||!root.clientHeight)return;
        if(root.dataset.answerMode==='true'||Number(root.dataset.h446GroupStart||0)!==0)return;
        settled=true;observer.disconnect();
        groups=null;
        h446ShowQuestionSheet(root,0);
        updateControl();
      };
      const queue=()=>{
        if(settled||scheduled)return;
        scheduled=true;requestAnimationFrame(settle);
      };
      const observer=new MutationObserver(queue);
      observer.observe(root,{attributes:true,attributeFilter:['class']});
      queue();
    }
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',installGroups,{once:true});
  else installGroups();
})();

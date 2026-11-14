/* Classroom-sized presentation for legacy three-statement True/False exits.
   Keep each lesson's authored questions, answers and three-stage reveal order. */
(function(){
  'use strict';

  function parseNumberedLines(lines){
    if(!Array.isArray(lines)||lines.length!==3)return null;
    const result=[];
    for(let i=0;i<3;i++){
      const match=String(lines[i]||'').trim().match(/^([1-3])[.)]\s+(.+)$/);
      if(!match||Number(match[1])!==i+1)return null;
      result.push(match[2].trim());
    }
    return result;
  }

  function readBreakLines(paragraph){
    if(!paragraph||!paragraph.querySelector('br'))return null;
    const lines=[];
    let text='';
    paragraph.childNodes.forEach(node=>{
      if(node.nodeType===1&&node.tagName==='BR'){
        lines.push(text.trim());
        text='';
      }else text+=node.textContent||'';
    });
    lines.push(text.trim());
    return parseNumberedLines(lines);
  }

  function present(){
    const page=document.getElementById('exit');
    if(!page||page.classList.contains('exit-yesno-generated')||page.classList.contains('exit-three-statements'))return;
    const stages=[...page.querySelectorAll(':scope > .exit-stage')];
    if(stages.length!==3)return;
    const headings=stages.map(stage=>stage.querySelector(':scope > h2'));
    const paragraphs=stages.map(stage=>stage.querySelector(':scope > p'));
    if(headings.some(h=>!h)||paragraphs.some(p=>!p)
      ||!/true\s+or\s+false/i.test(headings[0].textContent)
      ||!/model\s+answers?/i.test(headings[1].textContent)
      ||!/confidence/i.test(headings[2].textContent))return;
    const questionLines=readBreakLines(paragraphs[0]);
    const answerLines=readBreakLines(paragraphs[1]);
    if(!questionLines||!answerLines)return;

    function makePanel(stage,heading,paragraph,lines,kicker){
      const panel=document.createElement('div');
      panel.className='exit-three-panel';
      const label=document.createElement('p');
      label.className='exit-three-kicker';
      label.textContent=kicker;
      heading.classList.add('exit-three-title');
      const list=document.createElement('ol');
      list.className='exit-three-list';
      list.setAttribute('aria-label',kicker);
      lines.forEach((line,i)=>{
        const row=document.createElement('li');
        row.className='exit-three-row';
        const number=document.createElement('span');
        number.className='exit-three-number';
        number.textContent=String(i+1);
        number.setAttribute('aria-hidden','true');
        const wording=document.createElement('span');
        wording.className='exit-three-wording';
        const truth=line.match(/^(True|False)\b/i);
        if(truth&&kicker.includes('ANSWERS')){
          const mark=document.createElement('strong');
          mark.className='exit-three-truth';
          mark.textContent=truth[1];
          wording.append(mark,document.createTextNode(line.slice(truth[0].length)));
        }else wording.textContent=line;
        row.append(number,wording);
        list.append(row);
      });
      paragraph.remove();
      panel.append(label,heading,list);
      stage.replaceChildren(panel);
    }

    makePanel(stages[0],headings[0],paragraphs[0],questionLines,'EXIT TICKET · TRUE OR FALSE?');
    makePanel(stages[1],headings[1],paragraphs[1],answerLines,'EXIT TICKET · CHECK YOUR ANSWERS');
    const confidence=document.createElement('div');
    confidence.className='exit-three-panel exit-three-confidence';
    const label=document.createElement('p');
    label.className='exit-three-kicker';
    label.textContent='EXIT TICKET · YOUR CONFIDENCE';
    headings[2].classList.add('exit-three-title');
    paragraphs[2].classList.add('exit-three-confidence-question');
    confidence.append(label,headings[2],paragraphs[2]);
    stages[2].replaceChildren(confidence);
    page.classList.add('exit-three-statements');
  }

  if(typeof module==='object'&&module.exports)module.exports={parseNumberedLines};
  if(typeof document!=='undefined'){
    if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',present,{once:true});
    else present();
  }
})();

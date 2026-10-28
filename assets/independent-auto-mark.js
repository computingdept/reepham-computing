/* Central, opt-in independent-lesson auto-marking.
   Only objective fields are automatically assessed. Explanations remain for
   student self-review. Source booklet pages and printed spreads are unchanged.
   No answers are transmitted: all response checking happens in this browser. */
(function(){
  'use strict';
  function element(tag,klass,text){
    const el=document.createElement(tag);
    if(klass)el.className=klass;
    if(text!==undefined)el.textContent=text;
    return el;
  }
  function normalise(type,input){
    const raw=String(input||'').trim();
    if(type==='number'){
      const trimmed=raw.replace(/,/g,'').replace(/\s*(bits?|bytes?)\s*$/i,'').trim();
      return /^\d+(?:\.\d+)?$/.test(trimmed)?String(Number(trimmed)):raw;
    }
    if(type==='hex')return raw.replace(/^0x/i,'').replace(/\s+/g,'').toUpperCase();
    if(type==='binary8')return raw.replace(/^0b/i,'').replace(/[\s_]/g,'');
    if(type==='truefalse')return raw.toLowerCase();
    if(type==='code')return raw.replace(/\r/g,'').replace(/;(?=\s|$)/g,'').trim()
      .split(/\n/).map(x=>x.trim().replace(/\s+/g,'')).filter(Boolean).join('\n').toLowerCase();
    return raw.toLowerCase();
  }
  function insertAfterTarget(target,node){
    if(target.matches('p,li,strong'))target.after(node);
    else target.append(node);
  }
  function hideFollowingLines(target){
    let sibling=target.nextElementSibling;
    while(sibling&&sibling.classList.contains('write-line')){
      sibling.classList.add('am-screen-replaced');
      sibling=sibling.nextElementSibling;
    }
  }
  // Hide legacy paper-only choice squares after enhancing the on-screen MCQ.
  // The print spreads are cloned before this runs, so printed choices stay intact.
  function hidePaperChoiceText(target){
    if(!target.matches('.q')||target.querySelector('.am-paper-choices'))return;
    const breaks=[...target.children].filter(node=>node.tagName==='BR');
    if(!breaks.length)return;
    const br=breaks[breaks.length-1];
    const paper=element('span','am-paper-choices');
    let current=br.nextSibling;
    while(current){
      const next=current.nextSibling;
      paper.append(current);
      current=next;
    }
    br.after(paper);
    br.classList.add('am-paper-choice-break');
  }
  function fieldUI(question,field,n,id){
    const box=element('div','am-field');
    const label=element('label','am-field-label',field.label||question.label||'Your answer');
    const name=id+'-'+n;
    if(field.type==='choice'||field.type==='truefalse'){
      const choices=field.type==='truefalse'?['True','False']:(field.options||[]);
      const group=element('fieldset','am-choice-group');
      const legend=element('legend','am-field-label',field.label||question.label||'Select an answer');
      const grid=element('div','am-choice-options');
      group.append(legend,grid);
      choices.forEach((option,i)=>{
        const optionLabel=element('label','am-option');
        const radio=element('input');
        radio.type='radio';
        radio.name=name;
        radio.value=field.type==='truefalse'?option.toLowerCase():option;
        optionLabel.append(radio,document.createTextNode(option));
        grid.append(optionLabel);
      });
      box.append(group);
      return {box,value:()=>group.querySelector('input:checked')?.value||'',listen:fn=>group.addEventListener('change',fn)};
    }
    const input=element(field.type==='code'?'textarea':'input','am-answer-input');
    input.id=name;
    if(field.type==='code'){
      input.rows=3;
      input.spellcheck=false;
      input.setAttribute('autocapitalize','off');
    }else{
      input.type='text';
      input.autocomplete='off';
      input.spellcheck=false;
      input.setAttribute('autocapitalize','off');
      input.placeholder=field.type==='binary8'?'Eight bits':field.type==='hex'?'Hexadecimal value':'Enter your answer';
      input.setAttribute('inputmode',field.type==='number'?'numeric':'text');
    }
    label.htmlFor=name;
    box.append(label,input);
    return {box,value:()=>input.value,listen:fn=>input.addEventListener('input',fn)};
  }
  function setupReflection(target){
    const label=target.getAttribute('data-reflect-label')||'Explain your answer';
    const wrap=element('div','am-reflection');
    const fieldId='am-reflection-'+(document.querySelectorAll('.am-reflection').length+1);
    const prompt=element('label','am-field-label',label+' (self-check)');
    prompt.htmlFor=fieldId;
    const box=element('textarea','am-answer-input');
    box.id=fieldId;
    box.rows=2;
    box.placeholder='Write your response. Compare it with the model answer on Step 4.';
    wrap.append(prompt,box);
    if(target.matches('strong')||target.matches('p')){
      const following=target.nextElementSibling;
      if(following&&following.classList.contains('am-answer-fields'))following.after(wrap);
      else target.after(wrap);
    }else target.append(wrap);
    hideFollowingLines(target);
    const tail=wrap.nextElementSibling;
    let candidate=tail;
    while(candidate&&candidate.classList.contains('write-line')){
      candidate.classList.add('am-screen-replaced');
      candidate=candidate.nextElementSibling;
    }
  }
  async function init(){
    const configUrl=document.body.dataset.autoMarkConfig;
    if(!configUrl)return;
    const viewer=document.getElementById('viewer');
    if(!viewer)return;
    let config;
    try{
      const response=await fetch(configUrl,{cache:'no-store'});
      if(!response.ok)throw Error('Marking key unavailable');
      config=await response.json();
      if(!Array.isArray(config.groups)||!config.groups.length)throw Error('Incomplete marking key');
      const id=document.body.dataset.lesson;
      if(config.lesson!==id)throw Error('Lesson and key mismatch');
    }catch(error){
      console.error('Independent marking unavailable; original booklet is still accessible.',error);
      return;
    }
    const grades=new Map();
    const questionCount=config.groups.reduce((a,g)=>a+g.questions.reduce((b,q)=>b+q.fields.length,0),0);
    const groupEls=new Map();
    for(const group of config.groups){
      const page=viewer.querySelector('[data-page="'+group.page+'"]');
      const main=page?.querySelector(':scope > main');
      if(!main)continue;
      const questionEls=[];
      for(const question of group.questions){
        const target=page.querySelector('[data-mark-key="'+question.key+'"]');
        if(!target){console.warn('Marking target not found:',question.key);continue;}
        const fields=element('div','am-answer-fields');
        if(question.fields.some(field=>field.type==='choice'))hidePaperChoiceText(target);
        const controls=question.fields.map((field,n)=>fieldUI(question,field,n,'am-'+question.key));
        controls.forEach(control=>fields.append(control.box));
        insertAfterTarget(target,fields);
        hideFollowingLines(target);
        questionEls.push({question,controls});
      }
      if(!questionEls.length)continue;
      const panel=element('div','am-check-panel');
      panel.append(element('strong','am-check-heading',group.title+' · Answer check'));
      const check=element('button','am-check-button','Check my answers');
      check.type='button';
      const status=element('div','am-check-result');
      status.setAttribute('role','status');
      status.setAttribute('aria-live','polite');
      panel.append(check,status);
      let marker=null;
      if(group.placement?.beforeHeading){
        marker=[...main.querySelectorAll(':scope > .heading')].find(x=>
          x.textContent.trim().toLowerCase().startsWith(group.placement.beforeHeading.toLowerCase()));
      }
      if(marker)marker.before(panel);
      else main.append(panel);
      groupEls.set(group.id,{panel,check,status});
      const reset=()=>{
        status.replaceChildren();
        check.textContent='Check my answers';
        // An edited answer invalidates its previous score immediately.
        questionEls.forEach(({question})=>question.fields.forEach((_,i)=>
          grades.delete(question.key+'-'+i)));
        updateOverview();
      };
      questionEls.forEach(entry=>entry.controls.forEach(control=>control.listen(reset)));
      check.addEventListener('click',()=>{
        status.replaceChildren();
        let correct=0,answered=0,possible=0;
        questionEls.forEach(({question,controls})=>{
          controls.forEach((control,i)=>{
            const field=question.fields[i];
            const actual=control.value();
            const key=question.key+'-'+i;
            const normalized=normalise(field.type,actual);
            const expected=normalise(field.type,field.answer);
            const attempted=actual.trim().length>0;
            const success=attempted&&normalized===expected;
            possible++;
            if(attempted)answered++;
            if(success)correct++;
            grades.set(key,attempted?success:null);
            const line=element('p',success?'am-correct':attempted?'am-review':'am-missing');
            const prefix=question.label+(question.fields.length>1?' · '+(field.label||'part '+(i+1)):'');
            line.textContent=prefix+': '+(success?'Correct.':attempted?(question.reviewOnMismatch?'Compare your code with the model answer.':'Not yet correct. '+question.feedback):'No answer yet.');
            status.append(line);
          });
        });
        status.prepend(element('strong','',correct+' of '+possible+' correct · '+answered+' attempted.'));
        check.textContent='Check again';
        updateOverview();
      });
    }
    const checkPage=viewer.querySelector('[data-page="4"] > main');
    if(checkPage){
      const headings=[...checkPage.querySelectorAll(':scope > .heading')];
      const first=headings.find(x=>/^Do Now.*Model answers/i.test(x.textContent));
      const last=headings.find(x=>/^Correct.*return/i.test(x.textContent));
      if(first&&last){
        const details=element('details','am-model-answers');
        const summary=element('summary','', 'Reveal model answers to review written explanations');
        details.append(summary);
        const content=element('div','am-model-content');
        while(first!==last.previousElementSibling&&first.parentNode===checkPage){
          // Move every node from the answer heading up to the correction prompt.
          const node=first;
          const next=node.nextSibling;
          if(node===last)break;
          content.append(node);
          let cursor=next;
          while(cursor&&cursor!==last){
            const subsequent=cursor.nextSibling;
            content.append(cursor);
            cursor=subsequent;
          }
          break;
        }
        details.append(content);
        last.before(details);
      }
    }
    viewer.querySelectorAll('[data-reflect-label]').forEach(setupReflection);
    document.body.classList.add('auto-mark-ready');
    const finish=checkPage?.querySelector('.am-check-panel');
    const overview=element('div','am-overview');
    overview.setAttribute('role','status');
    overview.setAttribute('aria-live','polite');
    if(finish)finish.after(overview);
    function updateOverview(){
      const marked=[...grades.values()].filter(v=>v!==null);
      const correct=marked.filter(Boolean).length;
      overview.textContent=marked.length
        ?'Across this lesson: '+correct+' correct out of '+marked.length+' answered; '+(questionCount-marked.length)+' not yet checked. Written explanations are for self-review.'
        :'After checking your answers on each step, your results will appear here. Written explanations are self-reviewed.';
    }
    updateOverview();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();

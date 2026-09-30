const order=['do-now','overview','new-learning','i-do','we-do','you-do','vocabulary','exit'];
const signalMap={
  'do-now':['Do Now','Silent Working','MWBs'],
  overview:['Objectives','Listening','Hands Up'],
  'new-learning':['New Learning','Listening','Cold Calling'],
  'i-do':['I Do','Listening','MWBs'],
  'we-do':['We Do','Quiet Working','MWBs'],
  'you-do':['You Do','Quiet Working','Turn & Talk'],
  vocabulary:['Questioning','Listening','Cold Calling'],
  exit:['Exit Questioning','Silence','Thumbs']
};
const youDoIndependentSignals=['You Do','Silence','Independent'];
const pages=[...document.querySelectorAll('.page')];
const nav=[...document.querySelectorAll('[data-page]')];
const advance=document.getElementById('advance');
const previous=document.getElementById('previous');
let current='do-now';

function visibleIndex(items){
  return Math.max(0,items.findIndex(x=>!x.hidden));
}
function showOnly(items,index){
  items.forEach((item,i)=>item.hidden=i!==index);
}
function setYouDoWindow(page,start){
  const questions=[...page.querySelectorAll('.youdo-question')];
  if(!questions.length)return;
  const requestedSize=Math.max(1,Number(page.dataset.windowSize||3));
  const size=Math.min(requestedSize,questions.length);
  const maxStart=Math.max(0,questions.length-size);
  const safe=Math.max(0,Math.min(start,maxStart));
  page.dataset.windowStart=String(safe);
  questions.forEach((q,i)=>q.hidden=!(i>=safe&&i<safe+size));
  const progress=page.querySelector('.youdo-window-progress');
  if(progress){
    const first=safe+1;
    const last=Math.min(safe+size,questions.length);
    const noun=page.dataset.youDoMode==='coding'?'Challenges':'Questions';
    progress.textContent=noun+' '+first+'–'+last+' of '+questions.length;
  }
}

function prepareVocabulary(){
  const page=document.getElementById('vocabulary');
  if(!page||page.dataset.vocabPrepared==='true')return;
  const stages=[...page.querySelectorAll('.vocab-stage')];
  if(!stages.length)return;

  const entries=[];
  stages.forEach((stage,i)=>{
    const prompt=stage.querySelector('.vocab-prompt');
    const answer=stage.querySelector('[data-vocab-answer]');
    const promptLabel=prompt?.querySelector('.vocab-test-label');
    const heading=prompt?.querySelector('h2');
    const question=prompt?.querySelector('.vocab-question');
    const answerLabel=answer?.querySelector('.vocab-test-label');
    const answerValue=answer?.querySelector('.vocab-answer-value');
    const note=answer?.querySelector('p');

    const term=(answerValue?.textContent||heading?.textContent||('Term '+(i+1))).trim();
    const definition=(question?.textContent||note?.textContent||'').trim();
    const noteText=(note?.textContent||'').trim();

    stage.dataset.vocabTerm=term;
    stage.dataset.vocabDefinition=definition;
    if(prompt)prompt.classList.add('vocab-term-mode');
    if(promptLabel)promptLabel.textContent='TERM '+(i+1)+' OF '+stages.length;
    if(heading){
      heading.textContent=term;
      heading.classList.add('vocab-term-heading');
    }
    if(question)question.hidden=true;
    if(answerLabel)answerLabel.textContent='DEFINITION';
    if(answerValue){
      answerValue.textContent=definition;
      answerValue.classList.add('vocab-definition-value');
    }
    if(note){
      if(!noteText||noteText.toLowerCase()===definition.toLowerCase())note.hidden=true;
      else note.classList.add('vocab-definition-note');
    }
    entries.push({term,definition});
  });

  const byTerm=new Map(entries.map(entry=>[entry.term.toLowerCase(),entry]));
  const chips=[...document.querySelectorAll('.vocab-intro-list span')];
  chips.forEach((chip,i)=>{
    const entry=byTerm.get(chip.textContent.trim().toLowerCase())||entries[i];
    if(!entry?.definition)return;
    chip.classList.add('vocab-tip');
    chip.tabIndex=0;
    chip.dataset.definition=entry.definition;
    chip.setAttribute('aria-label',entry.term+': '+entry.definition);
  });

  page.dataset.vocabPrepared='true';
}
function resetPhaseState(id){
  const page=document.getElementById(id);
  if(!page)return;
  document.querySelectorAll('details.answers').forEach(d=>d.open=false);
  if(id==='do-now'){
    const stages=[...page.querySelectorAll('.donow-stage')];
    if(stages.length)showOnly(stages,0);
  }
  if(id==='new-learning'){
    const stages=[...page.querySelectorAll('.nl-stage')];
    if(stages.length)showOnly(stages,0);
  }
  if(id==='i-do'){
    const examples=[...page.querySelectorAll('.ido-example')];
    if(examples.length){
      showOnly(examples,0);
      examples.forEach(example=>{
        const steps=[...example.querySelectorAll('.ido-step')];
        if(steps.length)showOnly(steps,0);
      });
    }else{
      const stages=[...page.querySelectorAll('.model-stage')];
      if(stages.length)showOnly(stages,0);
    }
  }
  if(id==='we-do'){
    const examples=[...page.querySelectorAll('.wedo-example')];
    if(examples.length){
      showOnly(examples,0);
      examples.forEach(example=>{
        const steps=[...example.querySelectorAll('.wedo-step')];
        if(steps.length)showOnly(steps,0);
      });
    }else{
      page.querySelectorAll('[data-reveal-answer]').forEach(el=>el.hidden=true);
      page.querySelectorAll('[data-reveal-prompt]').forEach(el=>el.hidden=false);
    }
  }
  if(id==='you-do'){
    page.dataset.workMode=page.dataset.assessmentMode==='true'?'independent':'discuss';
    const questions=[...page.querySelectorAll('.youdo-question')];
    if(questions.length){
      setYouDoWindow(page,0);
    }else{
      const stages=[...page.querySelectorAll('.youdo-stage')];
      if(stages.length)showOnly(stages,0);
    }
  }
  if(id==='exit'){
    const stages=[...page.querySelectorAll('.exit-stage')];
    if(stages.length)showOnly(stages,0);
  }
  if(id==='vocabulary'){
    const stages=[...page.querySelectorAll('.vocab-stage')];
    if(stages.length){
      showOnly(stages,0);
      stages.forEach(stage=>{
        const answer=stage.querySelector('[data-vocab-answer]');
        if(answer)answer.hidden=true;
      });
    }else{
      page.querySelectorAll('.vocab-card').forEach((card,i)=>{
        const term=card.querySelector('dt');
        const definition=card.querySelector('dd');
        const blank=card.querySelector('.vocab-blank');
        if(!term||!definition||!blank)return;
        term.hidden=false;definition.hidden=false;
        term.removeAttribute('data-answer');definition.removeAttribute('data-answer');
        const missing=i%2===0?definition:term;
        missing.hidden=true;missing.setAttribute('data-answer','');
        blank.hidden=false;
        blank.textContent=i%2===0?'Definition: __________':'Keyword: __________';
        card.insertBefore(blank,missing);
      });
    }
  }
}
function updateSignals(id){
  const page=document.getElementById(id);
  let values=id==='you-do'&&(page?.dataset.workMode==='independent'||page?.dataset.assessmentMode==='true')
    ?youDoIndependentSignals
    :(signalMap[id]||['','','']);
  const kinds=['phase','routine','response'];

  ['phase-logo','behaviour-logo','response-logo'].forEach((key,i)=>{
    let slot=document.getElementById(key);
    if(!slot)return;

    if(slot.tagName==='IMG'){
      const replacement=document.createElement('span');
      replacement.id=key;
      slot.replaceWith(replacement);
      slot=replacement;
    }

    slot.hidden=false;
    slot.className='signal-tile signal-'+kinds[i];
    slot.textContent=values[i]||'—';
    slot.setAttribute('aria-label',values[i]||'');
  });

  const phaseTime=document.getElementById('phase-time');
  if(phaseTime){
    phaseTime.textContent=page?.dataset.phaseTime||'';
  }

  const exitSignal=document.getElementById('exit-ticket-signal');
  if(exitSignal)exitSignal.hidden=true;
}
function updateControl(){
  const page=document.getElementById(current);
  let label='Continue →';
  if(current==='do-now'){
    const stages=[...page.querySelectorAll('.donow-stage')];
    const i=visibleIndex(stages);
    if(i===0 && stages.length>1)label='Reveal answer 1 →';
    else if(i<stages.length-1)label='Next answer →';
    else label='Continue → Objectives';
  }else if(current==='new-learning'){
    const stages=[...page.querySelectorAll('.nl-stage')];
    if(stages.length){
      const i=visibleIndex(stages);
      label=i<stages.length-1?'Next step →':'Continue → I Do';
    }
  }else if(current==='i-do'){
    const examples=[...page.querySelectorAll('.ido-example')];
    if(examples.length){
      const exampleIndex=visibleIndex(examples);
      const example=examples[exampleIndex];
      const steps=[...example.querySelectorAll('.ido-step')];
      const stepIndex=visibleIndex(steps);
      if(stepIndex<steps.length-1)label='Next step →';
      else if(exampleIndex<examples.length-1)label='Next example →';
      else label='Continue → We Do';
    }else{
      const stages=[...page.querySelectorAll('.model-stage')];
      const i=visibleIndex(stages);
      label=i<stages.length-1?'Next worked example →':'Continue →';
    }
  }else if(current==='we-do'){
    const examples=[...page.querySelectorAll('.wedo-example')];
    if(examples.length){
      const exampleIndex=visibleIndex(examples);
      const example=examples[exampleIndex];
      const steps=[...example.querySelectorAll('.wedo-step')];
      const stepIndex=visibleIndex(steps);
      if(stepIndex===0 && steps.length>1)label='Reveal answer →';
      else if(stepIndex<steps.length-1)label='Next check →';
      else if(exampleIndex<examples.length-1)label='Next example →';
      else label='Continue → You Do';
    }else if(page.querySelector('[data-reveal-answer][hidden]')){
      label='Reveal model response';
    }
  }else if(current==='you-do'){
    if(page.dataset.assessmentMode==='true'){
      label='Test in progress';
    }else if(page.dataset.workMode!=='independent'){
      label='Begin silent work →';
    }else{
      const questions=[...page.querySelectorAll('.youdo-question')];
      if(questions.length){
        const requestedSize=Math.max(1,Number(page.dataset.windowSize||3));
        const size=Math.min(requestedSize,questions.length);
        const maxStart=Math.max(0,questions.length-size);
        const start=Number(page.dataset.windowStart||0);
        if(page.dataset.youDoMode==='coding'){
          label=start<maxStart?'Next challenges →':'Open solutions →';
        }else{
          label=start<maxStart?'Next questions →':'Open answers →';
        }
      }else{
        const stages=[...page.querySelectorAll('.youdo-stage')];
        const i=visibleIndex(stages);
        label=i<stages.length-1?'Next independent questions →':'Open answers →';
      }
    }
  }else if(current==='vocabulary'){
    const stages=[...page.querySelectorAll('.vocab-stage')];
    if(stages.length){
      const i=visibleIndex(stages);
      const answer=stages[i].querySelector('[data-vocab-answer]');
      if(answer&&answer.hidden)label='Reveal definition →';
      else if(i<stages.length-1)label='Next term →';
      else label='Continue → Exit Ticket';
    }else if(page.querySelector('.vocab-card [data-answer][hidden]')){
      label='Reveal next answer';
    }
  }else if(page.querySelector('details.answers:not([open])')){
    label='Reveal answers';
  }else if(current==='exit'){
    const stages=[...page.querySelectorAll('.exit-stage')];
    if(stages.length){
      const i=visibleIndex(stages);
      if(i===0)label='Reveal answers →';
      else if(i===1)label='How did the lesson go? →';
      else label='Back to Do Now';
    }else{
      label='Back to Do Now';
    }
  }
  advance.textContent=label;
  previous.disabled=order.indexOf(current)===0||(current==='you-do'&&page?.dataset.assessmentMode==='true');
  document.getElementById('page-count').textContent=(order.indexOf(current)+1)+' / '+order.length;
}
function showPage(id){
  if(!order.includes(id))id='do-now';
  current=id;
  pages.forEach(p=>p.classList.toggle('active',p.id===id));
  nav.forEach(b=>{
    const active=b.dataset.page===id;
    b.classList.toggle('active',active);
    if(active)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');
  });
  resetPhaseState(id);
  updateSignals(id);
  history.replaceState(null,'','#'+id);
  updateControl();
  window.scrollTo({top:0,behavior:'instant'});
}
function next(){
  const page=document.getElementById(current);
  if(current==='do-now'){
    const stages=[...page.querySelectorAll('.donow-stage')];
    const i=visibleIndex(stages);
    if(i<stages.length-1){showOnly(stages,i+1);updateControl();return;}
  }
  if(current==='new-learning'){
    const stages=[...page.querySelectorAll('.nl-stage')];
    const i=visibleIndex(stages);
    if(i<stages.length-1){showOnly(stages,i+1);updateControl();return;}
  }
  if(current==='i-do'){
    const examples=[...page.querySelectorAll('.ido-example')];
    if(examples.length){
      const exampleIndex=visibleIndex(examples);
      const example=examples[exampleIndex];
      const steps=[...example.querySelectorAll('.ido-step')];
      const stepIndex=visibleIndex(steps);
      if(stepIndex<steps.length-1){
        showOnly(steps,stepIndex+1);updateControl();return;
      }
      if(exampleIndex<examples.length-1){
        showOnly(examples,exampleIndex+1);
        const nextSteps=[...examples[exampleIndex+1].querySelectorAll('.ido-step')];
        if(nextSteps.length)showOnly(nextSteps,0);
        updateControl();return;
      }
    }else{
      const stages=[...page.querySelectorAll('.model-stage')];
      const i=visibleIndex(stages);
      if(i<stages.length-1){showOnly(stages,i+1);updateControl();return;}
    }
  }
  if(current==='we-do'){
    const examples=[...page.querySelectorAll('.wedo-example')];
    if(examples.length){
      const exampleIndex=visibleIndex(examples);
      const example=examples[exampleIndex];
      const steps=[...example.querySelectorAll('.wedo-step')];
      const stepIndex=visibleIndex(steps);
      if(stepIndex<steps.length-1){
        showOnly(steps,stepIndex+1);
        updateControl();
        return;
      }
      if(exampleIndex<examples.length-1){
        showOnly(examples,exampleIndex+1);
        const nextSteps=[...examples[exampleIndex+1].querySelectorAll('.wedo-step')];
        if(nextSteps.length)showOnly(nextSteps,0);
        updateControl();
        return;
      }
    }else{
      const answer=page.querySelector('[data-reveal-answer][hidden]');
      if(answer){
        page.querySelectorAll('[data-reveal-prompt]').forEach(el=>el.hidden=true);
        answer.hidden=false;updateControl();return;
      }
    }
  }
  if(current==='you-do'){
    if(page.dataset.assessmentMode==='true'){
      updateSignals('you-do');
      updateControl();
      return;
    }
    if(page.dataset.workMode!=='independent'){
      page.dataset.workMode='independent';
      updateSignals('you-do');
      updateControl();
      return;
    }
    const questions=[...page.querySelectorAll('.youdo-question')];
    if(questions.length){
      const requestedSize=Math.max(1,Number(page.dataset.windowSize||3));
      const size=Math.min(requestedSize,questions.length);
      const maxStart=Math.max(0,questions.length-size);
      const start=Number(page.dataset.windowStart||0);
      if(start<maxStart){
        setYouDoWindow(page,start+1);updateControl();return;
      }
      location.href='answers.html';return;
    }
    const stages=[...page.querySelectorAll('.youdo-stage')];
    const i=visibleIndex(stages);
    if(i<stages.length-1){showOnly(stages,i+1);updateControl();return;}
    location.href='answers.html';return;
  }
  if(current==='exit'){
    const stages=[...page.querySelectorAll('.exit-stage')];
    if(stages.length){
      const i=visibleIndex(stages);
      if(i<stages.length-1){
        showOnly(stages,i+1);
        updateControl();
        return;
      }
    }
  }
  if(current==='vocabulary'){
    const stages=[...page.querySelectorAll('.vocab-stage')];
    if(stages.length){
      const i=visibleIndex(stages);
      const answer=stages[i].querySelector('[data-vocab-answer]');
      if(answer&&answer.hidden){
        answer.hidden=false;
        updateControl();return;
      }
      if(i<stages.length-1){
        showOnly(stages,i+1);
        const nextAnswer=stages[i+1].querySelector('[data-vocab-answer]');
        if(nextAnswer)nextAnswer.hidden=true;
        updateControl();return;
      }
    }else{
      const answer=page.querySelector('.vocab-card [data-answer][hidden]');
      if(answer){
        answer.hidden=false;
        const blank=answer.parentElement.querySelector('.vocab-blank');
        if(blank)blank.hidden=true;
        updateControl();return;
      }
    }
  }
  const answers=[...page.querySelectorAll('details.answers:not([open])')];
  if(answers.length){answers.forEach(d=>d.open=true);updateControl();return;}
  showPage(order[(order.indexOf(current)+1)%order.length]);
}
function previousAction(){
  const page=document.getElementById(current);
  if(current==='exit'){
    const stages=[...page.querySelectorAll('.exit-stage')];
    if(stages.length){
      const i=visibleIndex(stages);
      if(i>0){
        showOnly(stages,i-1);
        updateControl();
        return;
      }
    }
  }
  if(current==='vocabulary'){
    const stages=[...page.querySelectorAll('.vocab-stage')];
    if(stages.length){
      const i=visibleIndex(stages);
      const answer=stages[i].querySelector('[data-vocab-answer]');
      if(answer&&!answer.hidden){
        answer.hidden=true;
        updateControl();
        return;
      }
      if(i>0){
        showOnly(stages,i-1);
        const previousAnswer=stages[i-1].querySelector('[data-vocab-answer]');
        if(previousAnswer)previousAnswer.hidden=false;
        updateControl();
        return;
      }
    }
  }
  if(current==='you-do'){
    if(page.dataset.assessmentMode==='true'){
      updateSignals('you-do');
      updateControl();
      return;
    }
    const questions=[...page.querySelectorAll('.youdo-question')];
    if(questions.length){
      const start=Number(page.dataset.windowStart||0);
      if(start>0){
        setYouDoWindow(page,start-1);
        updateControl();
        return;
      }
      if(page.dataset.workMode==='independent'){
        page.dataset.workMode='discuss';
        updateSignals('you-do');
        updateControl();
        return;
      }
    }else{
      const stages=[...page.querySelectorAll('.youdo-stage')];
      const i=visibleIndex(stages);
      if(i>0){
        showOnly(stages,i-1);
        updateControl();
        return;
      }
      if(page.dataset.workMode==='independent'){
        page.dataset.workMode='discuss';
        updateSignals('you-do');
        updateControl();
        return;
      }
    }
  }
  if(current==='new-learning'){
    const stages=[...page.querySelectorAll('.nl-stage')];
    const i=visibleIndex(stages);
    if(i>0){
      showOnly(stages,i-1);
      updateControl();
      return;
    }
  }
  if(current==='we-do'){
    const examples=[...page.querySelectorAll('.wedo-example')];
    if(examples.length){
      const exampleIndex=visibleIndex(examples);
      const example=examples[exampleIndex];
      const steps=[...example.querySelectorAll('.wedo-step')];
      const stepIndex=visibleIndex(steps);

      if(stepIndex>0){
        showOnly(steps,stepIndex-1);
        updateControl();
        return;
      }

      if(exampleIndex>0){
        showOnly(examples,exampleIndex-1);
        const previousSteps=[...examples[exampleIndex-1].querySelectorAll('.wedo-step')];
        if(previousSteps.length)showOnly(previousSteps,previousSteps.length-1);
        updateControl();
        return;
      }
    }
  }
  if(current==='i-do'){
    const examples=[...page.querySelectorAll('.ido-example')];
    if(examples.length){
      const exampleIndex=visibleIndex(examples);
      const example=examples[exampleIndex];
      const steps=[...example.querySelectorAll('.ido-step')];
      const stepIndex=visibleIndex(steps);

      if(stepIndex>0){
        showOnly(steps,stepIndex-1);
        updateControl();
        return;
      }

      if(exampleIndex>0){
        showOnly(examples,exampleIndex-1);
        const previousSteps=[...examples[exampleIndex-1].querySelectorAll('.ido-step')];
        if(previousSteps.length)showOnly(previousSteps,previousSteps.length-1);
        updateControl();
        return;
      }
    }else{
      const stages=[...page.querySelectorAll('.model-stage')];
      const i=visibleIndex(stages);
      if(i>0){
        showOnly(stages,i-1);
        updateControl();
        return;
      }
    }
  }

  showPage(order[Math.max(0,order.indexOf(current)-1)]);
}

nav.forEach(b=>b.addEventListener('click',()=>showPage(b.dataset.page)));
advance.addEventListener('click',next);
previous.addEventListener('click',previousAction);
document.querySelectorAll('details.answers').forEach(d=>d.addEventListener('toggle',updateControl));
document.addEventListener('keydown',e=>{
  if(e.target.closest('button,a,input,textarea,select,summary')||e.altKey||e.ctrlKey||e.metaKey)return;
  if(e.key==='ArrowRight'){e.preventDefault();next();}
  if(e.key==='ArrowLeft'){e.preventDefault();previousAction();}
});
prepareVocabulary();
showPage(location.hash.slice(1)||'do-now');

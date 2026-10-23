const order=['do-now','overview','new-learning','i-do','we-do','you-do','vocabulary','exit'];
const signalMap={
  'do-now':['Do Now','Silent Working','MWBs'],
  overview:['Objectives','Listening','Hands Up'],
  'new-learning':['New Learning','Listening','Cold Calling'],
  'i-do':['I Do','Listening','MWBs'],
  'we-do':['We Do','Quiet Working','MWBs'],
  'you-do':['You Do','Quiet Working','Turn & Talk'],
  'catch-up':['Catch Up','Quiet Working','Independent'],
  'exam-practice':['Exam Practice','Quiet Working','Independent'],
  vocabulary:['Questioning','Listening','Cold Calling'],
  exit:['Exit Questioning','Silence','Thumbs']
};
const youDoIndependentSignals=['You Do','Silence','Independent'];
const pages=[...document.querySelectorAll('.page')];
const nav=[...document.querySelectorAll('[data-page]')];
const advance=document.getElementById('advance');
const previous=document.getElementById('previous');
let current='do-now';

/* Shared H446/J277 lesson identity: badge is drawn once from the URL, so
   a pupil sees the same lesson number on TV, laptop and the phone header. */
function lessonIdFromUrl(){
  const match=window.location.pathname.match(/\/lessons\/(?:h446|j277)\/lesson-(\d{3})(?:\/|\.html|$)/i);
  return match ? match[1] : null;
}
function createLessonIdBadge(){
  const number=lessonIdFromUrl();
  if(!number)return null;
  const namespace='http://www.w3.org/2000/svg';
  const badge=document.createElement('span');
  badge.className='lesson-id-badge';
  const svg=document.createElementNS(namespace,'svg');
  svg.setAttribute('class','lesson-id-svg');
  svg.setAttribute('viewBox','0 0 120 52');
  svg.setAttribute('role','img');
  svg.setAttribute('aria-label','Lesson '+number);
  const rect=document.createElementNS(namespace,'rect');
  rect.setAttribute('x','1');rect.setAttribute('y','1');
  rect.setAttribute('width','118');rect.setAttribute('height','50');
  rect.setAttribute('rx','9');rect.setAttribute('fill','#1d2421');
  const accent=document.createElementNS(namespace,'rect');
  accent.setAttribute('x','2');accent.setAttribute('y','9');
  accent.setAttribute('width','6');accent.setAttribute('height','34');
  accent.setAttribute('rx','3');accent.setAttribute('fill','#64b58c');
  const text=document.createElementNS(namespace,'text');
  text.setAttribute('x','62');text.setAttribute('y','34');
  text.setAttribute('text-anchor','middle');text.setAttribute('font-family','Arial,Helvetica,sans-serif');
  text.setAttribute('font-weight','800');text.setAttribute('font-size','26');text.setAttribute('fill','#fff');
  text.textContent='L'+number;
  svg.append(rect,accent,text);
  badge.appendChild(svg);
  return badge;
}
function prepareLessonIdBadge(){
  const meta=document.querySelector('.signal-meta');
  const label=meta?.querySelector('.lesson-label');
  if(!meta||!label||meta.querySelector('.lesson-id-row'))return;
  const badge=createLessonIdBadge();
  if(!badge)return;
  const row=document.createElement('div');
  row.className='lesson-id-row';
  label.before(row);
  row.append(badge,label);
}


function visibleIndex(items){
  return Math.max(0,items.findIndex(x=>!x.hidden));
}
function showOnly(items,index){
  items.forEach((item,i)=>item.hidden=i!==index);
}
function showYouDoAnswer(page,index){
  const questions=[...page.querySelectorAll('.youdo-question')];
  if(!questions.length)return;
  page.dataset.answerIndex=String(index);
  questions.forEach(q=>{
    if(q.querySelector('.youdo-question-prompt'))return;
    const prompt=document.createElement('div');
    prompt.className='youdo-question-prompt';
    [...q.children].filter(el=>!el.classList.contains('youdo-solution')).forEach(el=>prompt.appendChild(el));
    q.insertBefore(prompt,q.firstChild);
  });
  questions.forEach((q,i)=>{
    q.hidden=i!==index;
    const solution=q.querySelector('.youdo-solution');
    if(solution)solution.hidden=i!==index;
    if(i===index){
      const prompt=q.querySelector('.youdo-question-prompt');
      if(prompt)prompt.scrollTop=0;
      if(solution)solution.scrollTop=0;
    }
  });
  const progress=page.querySelector('.youdo-window-progress');
  if(progress)progress.textContent='ANSWER '+(index+1)+' OF '+questions.length;
}

/* Opt-in H446 You Do self-marking for explicitly flagged lessons only.
   Independent questions and model answers must never occupy the same screen. */
function isH446GroupedMarking(page){
  return page?.dataset.selfMarking==='grouped'
    && /^\/lessons\/h446\/lesson-\d{3}(?:\/|\.html|$)/i.test(location.pathname);
}
function prepareH446GroupedMarking(page){
  if(!isH446GroupedMarking(page))return;
  if(page.querySelector('.h446-marking-screen'))return;
  const questions=[...page.querySelectorAll('.youdo-questions > .youdo-question')];
  if(!questions.length||questions.some(q=>!q.querySelector('.youdo-solution')))return;
  const screen=document.createElement('div');
  screen.className='h446-marking-screen';
  screen.hidden=true;
  const heading=document.createElement('h2');
  heading.className='h446-marking-heading';
  heading.textContent='Self-marking · Model answers';
  const cards=document.createElement('div');
  cards.className='h446-marking-cards';
  cards.setAttribute('aria-label','You Do model answers');
  questions.forEach((q,i)=>{
    const card=document.createElement('article');
    card.className='h446-marking-card';
    const label=document.createElement('strong');
    label.className='h446-marking-label';
    const level=(q.querySelector('.phase-tag')?.textContent||'').replace(/QUESTION\s+\d+\s+OF\s+\d+/gi,'').replace(/^[·\s]+|[·\s]+$/g,'').trim();
    label.textContent='Q'+(i+1)+(level?' · '+level:'');
    const prompt=document.createElement('p');
    prompt.className='h446-marking-question';
    prompt.textContent=q.querySelector('.youdo-question-prompt h2')?.textContent||'';
    const solution=q.querySelector('.youdo-solution').cloneNode(true);
    solution.hidden=false;
    card.append(label,prompt,solution);
    cards.append(card);
  });
  screen.append(heading,cards);
  page.querySelector('.youdo-deck')?.after(screen);
  page.querySelectorAll('.youdo-questions .youdo-solution').forEach(a=>a.hidden=true);
}
function showH446GroupedMarking(page,visible,index=0){
  const screen=page.querySelector('.h446-marking-screen');
  const deck=page.querySelector('.youdo-deck');
  if(!screen||!deck)return false;
  const cards=[...screen.querySelectorAll('.h446-marking-card')];
  const safe=Math.min(cards.length-1,Math.max(0,index));
  page.dataset.answerMode=visible?'true':'false';
  page.dataset.answerIndex=String(safe);
  deck.hidden=!!visible;
  screen.hidden=!visible;
  cards.forEach((card,i)=>card.classList.toggle('is-active',i===safe));
  if(!visible)page.querySelectorAll('.youdo-questions .youdo-solution').forEach(a=>a.hidden=true);
  return true;
}

function prepareYouDoAnswers(page){
  const questions=[...page.querySelectorAll('.youdo-question')];
  if(!questions.length)return;
  const missing=questions.map((q,i)=>({q,i})).filter(({q})=>!q.querySelector('.youdo-solution'));
  if(!missing.length||page.dataset.modelAnswersLoading==='true')return;

  // Never label a success-check hint as a complete model answer.
  // Reuse the authored worked solutions from the lesson's answers.html.
  missing.forEach(({q,i})=>{
    const panel=document.createElement('div');
    panel.className='youdo-solution';
    panel.hidden=true;
    panel.innerHTML='<strong>WORKED ANSWER '+(i+1)+' OF '+questions.length+'</strong><p>Loading the model answer…</p>';
    q.appendChild(panel);
  });

  page.dataset.modelAnswersLoading='true';
  fetch('answers.html',{cache:'no-cache'}).then(response=>{
    if(!response.ok)throw Error('Model answers unavailable');
    return response.text();
  }).then(html=>{
    const doc=new DOMParser().parseFromString(html,'text/html');
    const stages=[...doc.querySelectorAll('.answer-stage')];
    if(stages.length!==questions.length)throw Error('Answer count differs from question count');
    missing.forEach(({q,i})=>{
      const source=stages[i].querySelector('.answer-solution,.solution-card,.answer-card');
      if(!source)throw Error('Worked answer '+(i+1)+' is missing');
      const panel=q.querySelector('.youdo-solution');
      if(!panel)return;
      panel.innerHTML='<strong>WORKED ANSWER '+(i+1)+' OF '+questions.length+'</strong>'+source.innerHTML;
    });
  }).catch(()=>{
    // A genuine missing answer must be reported, not invented from an answer hint.
    missing.forEach(({q,i})=>{
      const panel=q.querySelector('.youdo-solution');
      if(!panel)return;
      panel.innerHTML='<strong>WORKED ANSWER '+(i+1)+' OF '+questions.length+'</strong><p>The worked answer could not be loaded on this screen.</p><p><a href="answers.html" target="_blank" rel="noopener">Open the full answer booklet →</a></p>';
    });
  }).finally(()=>{page.dataset.modelAnswersLoading='false';});
}
function setYouDoWindow(page,start){
  const questions=[...page.querySelectorAll('.youdo-question')];
  if(!questions.length)return;
  const requestedSize=Math.max(1,Number(page.dataset.windowSize||3));
  const size=Math.min(requestedSize,questions.length);
  const maxStart=Math.max(0,questions.length-size);
  const safe=Math.max(0,Math.min(start,maxStart));
  page.dataset.windowStart=String(safe);
  // Opt-in: begin with one full-width coding challenge, then return to
  // the normal three-question window for exam practice. Other lessons unchanged.
  const codingFirst=page.dataset.codingFirst==='true';
  questions.forEach((q,i)=>q.hidden=codingFirst&&safe===0 ? i!==0 : !(i>=safe&&i<safe+size));
  const progress=page.querySelector('.youdo-window-progress');
  if(progress){
    if(codingFirst&&safe===0){
      progress.textContent='CODE FIRST · THEN EXAM PRACTICE';
    }else{
      const first=safe+1;
      const last=Math.min(safe+size,questions.length);
      const noun=page.dataset.youDoMode==='coding'?'Challenges':'Questions';
      progress.textContent=noun+' '+first+'–'+last+' of '+questions.length;
    }
  }
}

function prepareObjectiveVocabularySupport(){
  document.querySelectorAll('.objective-vocab-stage').forEach(stage=>{
    const definition=stage.querySelector('[data-objective-vocab-definition]');
    if(!definition)return;

    const existing=definition.querySelector('.objective-vocab-support');
    const support=(stage.dataset.support||existing?.textContent||'').trim();

    if(!support){
      if(existing)existing.remove();
      return;
    }

    const p=existing||document.createElement('p');
    p.className='objective-vocab-support';
    p.textContent=support;
    if(!existing)definition.appendChild(p);
  });
}

function prepareVocabulary(){
  const page=document.getElementById('vocabulary');
  if(!page||page.dataset.vocabPrepared==='true')return;
  const stages=[...page.querySelectorAll('.vocab-stage')];
  if(!stages.length)return;


  // H446 vocabulary uses definition-first retrieval, matching Lesson 001.
  // Older generated pages store term and definition together; build the same
  // prompt/hidden-answer markup before the normal phase controller runs.
  if(document.querySelector('.course-back[href*="h446-hub"]')){
    if(stages.every(stage=>stage.querySelector('.vocab-prompt')&&stage.querySelector('[data-vocab-answer]'))){
      page.dataset.vocabFlow='retrieval';
    }else if(stages.every(stage=>stage.querySelector('h2')&&stage.querySelector('p'))){
      const entries=stages.map(stage=>({
        term:stage.querySelector('h2').textContent.trim(),
        definition:stage.querySelector('p').textContent.trim()
      }));
      const deck=document.createElement('div');
      deck.className='vocab-deck';
      const make=(tag,cls,text)=>{const el=document.createElement(tag);el.className=cls;if(text!==undefined)el.textContent=text;return el;};
      entries.forEach((entry,i)=>{
        const stage=make('article','vocab-stage');stage.hidden=i!==0;
        const prompt=make('div','vocab-prompt');
        prompt.append(make('span','vocab-test-label','QUESTION '+(i+1)+' OF '+entries.length),
          make('h2','','Recall the term'),make('p','vocab-question',entry.definition),
          make('span','vocab-stage-count',(i+1)+' of '+entries.length));
        const answer=make('div','vocab-answer');answer.setAttribute('data-vocab-answer','');answer.hidden=true;
        answer.append(make('span','vocab-test-label','ANSWER'),make('div','vocab-answer-value',entry.term));
        stage.append(prompt,answer);deck.append(stage);
      });
      page.replaceChildren(deck);
      page.dataset.vocabFlow='retrieval';
    }
    if(page.dataset.vocabFlow==='retrieval'){page.dataset.vocabPrepared='true';return;}
  }

  if(page.dataset.vocabFlow==='retrieval'){
    page.dataset.vocabPrepared='true';
    return;
  }

  if(page.dataset.vocabFlow==='term-definition'){
    const entries=stages.map((stage,i)=>({
      term:(stage.querySelector('.vocab-term-heading')?.textContent||('Term '+(i+1))).trim(),
      definition:(stage.querySelector('.vocab-definition-value')?.textContent||'').trim()
    }));
    const byTerm=new Map(entries.map(entry=>[entry.term.toLowerCase(),entry]));
    document.querySelectorAll('.vocab-intro-list .vocab-tip').forEach((chip,i)=>{
      const entry=byTerm.get(chip.textContent.trim().toLowerCase())||entries[i];
      if(!entry?.definition)return;
      if(!chip.dataset.definition)chip.dataset.definition=entry.definition;
      chip.tabIndex=0;
      chip.setAttribute('aria-label',entry.term+': '+entry.definition);
    });
    page.dataset.vocabPrepared='true';
    return;
  }

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
  if(id==='overview'&&page.dataset.objectivesVocab==='true'){
    const stages=[...page.querySelectorAll('.objective-vocab-stage')];
    if(stages.length){
      showOnly(stages,0);
      stages.forEach(stage=>{
        const definition=stage.querySelector('[data-objective-vocab-definition]');
        if(definition)definition.hidden=true;
      });
    }
  }
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
    page.dataset.answerMode='false';
    page.dataset.answerIndex='0';
    prepareYouDoAnswers(page);
    if(isH446GroupedMarking(page)){
      prepareH446GroupedMarking(page);
      showH446GroupedMarking(page,false);
    }
    page.dataset.workMode=page.dataset.assessmentMode==='true'?'independent':'discuss';
    const questions=[...page.querySelectorAll('.youdo-question')];
    if(questions.length){
      setYouDoWindow(page,0);
    }else{
      const stages=[...page.querySelectorAll('.youdo-stage')];
      if(stages.length)showOnly(stages,0);
    }
  }
  if(id==='catch-up'||id==='exam-practice')window.H446Optional?.reset?.(id);
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

function updateMobileLessonStatus(){
  const status=document.getElementById('mobile-lesson-status');
  if(!status)return;

  const title=status.querySelector('.mobile-lesson-title');
  const phase=status.querySelector('.mobile-phase-status');
  const activeNav=nav.find(button=>button.dataset.page===current);
  const phaseName=(activeNav?.textContent||current).trim();
  const phaseIndex=Math.max(0,order.indexOf(current))+1;

  if(title){
    const raw=document.title.replace(/^OCR (?:H446|J277) · /,'');
    title.textContent=lessonIdFromUrl()?raw.replace(/^Lesson \d{3} · /,''):raw;
  }
  if(phase)phase.textContent=phaseName+' · '+phaseIndex+' / '+order.length;
}

function updateControl(){
  const page=document.getElementById(current);
  let label='Continue →';
  if(current==='overview'){
    if(page.dataset.objectivesVocab==='true'){
      const stages=[...page.querySelectorAll('.objective-vocab-stage')];
      const i=visibleIndex(stages);
      const definition=stages[i]?.querySelector('[data-objective-vocab-definition]');
      if(definition&&definition.hidden)label='Reveal definition →';
      else if(i<stages.length-1)label='Next term →';
      else label='Continue →';
    }else{
      label='Next step →';
    }
  }else if(current==='do-now'){
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
      if(stepIndex===0 && steps.length>1)label=page.dataset.guidedSteps==='true'?'Reveal step 1 →':'Reveal answer →';
      else if(stepIndex<steps.length-1)label=page.dataset.guidedSteps==='true'?'Next guided step →':'Next check →';
      else if(exampleIndex<examples.length-1)label='Next example →';
      else label='Continue → You Do';
    }else if(page.querySelector('[data-reveal-answer][hidden]')){
      label='Reveal model response';
    }
  }else if(current==='you-do'){
    if(isH446GroupedMarking(page)&&page.querySelector('.h446-marking-screen')){
      const count=page.querySelectorAll('.h446-marking-card').length;
      const index=Number(page.dataset.answerIndex||0);
      if(page.dataset.answerMode==='true')label=window.matchMedia('(max-width:700px)').matches&&index<count-1?'Next answer →':'Continue → Key Vocabulary';
      else label=page.dataset.workMode==='independent'?'Self-mark answers →':'Begin silent work →';
    }else if(page.dataset.answerMode==='true'){
      const count=page.querySelectorAll('.youdo-question').length;
      const index=Number(page.dataset.answerIndex||0);
      label=index<count-1?'Next answer →':'Continue → Key Vocabulary';
    }else if(page.dataset.assessmentMode==='true'){
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
        if(page.dataset.codingFirst==='true'&&start===0){
          label='Continue → Exam questions';
        }else if(page.dataset.youDoMode==='coding'){
          label=start<maxStart?'Next challenges →':'Continue → Key Vocabulary';
        }else{
          label=start<maxStart?'Next questions →':'Continue → Key Vocabulary';
        }
      }else{
        const stages=[...page.querySelectorAll('.youdo-stage')];
        const i=visibleIndex(stages);
        label=i<stages.length-1?'Next independent questions →':'Continue → Key Vocabulary';
      }
    }
  }else if(current==='catch-up'||current==='exam-practice'){
    label=window.H446Optional?.nextLabel?.(current)||'Continue → Key Vocabulary';
  }else if(current==='vocabulary'){
    const stages=[...page.querySelectorAll('.vocab-stage')];
    if(stages.length){
      const i=visibleIndex(stages);
      const answer=stages[i].querySelector('[data-vocab-answer]');
      if(page.dataset.vocabFlow==='retrieval'){
        if(answer&&answer.hidden)label='Reveal term →';
        else if(i<stages.length-1)label='Next definition →';
        else label='Continue → Exit Ticket';
      }else if(answer&&answer.hidden)label='Reveal definition →';
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
  updateMobileLessonStatus();
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
  if(current==='overview'&&page.dataset.objectivesVocab==='true'){
    const stages=[...page.querySelectorAll('.objective-vocab-stage')];
    const i=visibleIndex(stages);
    const definition=stages[i]?.querySelector('[data-objective-vocab-definition]');
    if(definition&&definition.hidden){
      definition.hidden=false;
      updateControl();
      return;
    }
    if(i<stages.length-1){
      showOnly(stages,i+1);
      const nextDefinition=stages[i+1].querySelector('[data-objective-vocab-definition]');
      if(nextDefinition)nextDefinition.hidden=true;
      updateControl();
      return;
    }
  }
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
    if(isH446GroupedMarking(page)&&page.querySelector('.h446-marking-screen')&&page.dataset.answerMode==='true'){
      const count=page.querySelectorAll('.h446-marking-card').length;
      const index=Number(page.dataset.answerIndex||0);
      if(window.matchMedia('(max-width:700px)').matches&&index<count-1){showH446GroupedMarking(page,true,index+1);updateControl();return;}
      showPage(order[order.indexOf('you-do')+1]||'vocabulary');return;
    }
    if(page.dataset.answerMode==='true'){
      const count=page.querySelectorAll('.youdo-question').length;
      const index=Number(page.dataset.answerIndex||0);
      if(index<count-1){showYouDoAnswer(page,index+1);updateControl();return;}
      showPage(order[order.indexOf('you-do')+1]||'vocabulary');return;
    }
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
      if(isH446GroupedMarking(page)&&showH446GroupedMarking(page,true,0)){
        updateControl();window.scrollTo({top:0,behavior:'instant'});return;
      }
      page.dataset.answerMode='true';
      showYouDoAnswer(page,0);updateControl();return;
    }
    const stages=[...page.querySelectorAll('.youdo-stage')];
    const i=visibleIndex(stages);
    if(i<stages.length-1){showOnly(stages,i+1);updateControl();return;}
    showPage(order[order.indexOf('you-do')+1]||'vocabulary');return;
  }
  if(current==='catch-up'||current==='exam-practice'){
    if(window.H446Optional?.step?.(current,1)){updateControl();return;}
    showPage(order[order.indexOf(current)+1]||'vocabulary');return;
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
  if(current==='catch-up'||current==='exam-practice'){
    if(window.H446Optional?.step?.(current,-1)){updateControl();return;}
    const prior=order[Math.max(0,order.indexOf(current)-1)];
    showPage(prior);
    if(prior==='you-do'){
      const yp=document.getElementById('you-do');
      if(yp?.dataset.assessmentMode!=='true'){
        const qs=[...yp.querySelectorAll('.youdo-question')];
        yp.dataset.workMode='independent';
        if(qs.length){
          yp.dataset.answerMode='true';
          showYouDoAnswer(yp,qs.length-1);
        }
        updateSignals('you-do');updateControl();
      }
    }
    return;
  }
  if(current==='overview'&&page.dataset.objectivesVocab==='true'){
    const stages=[...page.querySelectorAll('.objective-vocab-stage')];
    const i=visibleIndex(stages);
    const definition=stages[i]?.querySelector('[data-objective-vocab-definition]');
    if(definition&&!definition.hidden){
      definition.hidden=true;
      updateControl();
      return;
    }
    if(i>0){
      showOnly(stages,i-1);
      const previousDefinition=stages[i-1].querySelector('[data-objective-vocab-definition]');
      if(previousDefinition)previousDefinition.hidden=false;
      updateControl();
      return;
    }
  }
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
  // Optional phases belong between You Do and Key Vocabulary when populated.
  if(current==='vocabulary'&&order[order.indexOf('vocabulary')-1]!=='you-do'){
    const prior=order[order.indexOf('vocabulary')-1];
    showPage(prior);
    window.H446Optional?.showLast?.(prior);
    updateControl();
    return;
  }
  // When returning from the first vocabulary term, restore the final You Do task,
  // rather than restarting pupils at the first question.
  if(current==='vocabulary'){
    showPage('you-do');
    const youPage=document.getElementById('you-do');
    if(youPage?.dataset.assessmentMode!=='true'){
      youPage.dataset.workMode='independent';
      const questions=[...youPage.querySelectorAll('.youdo-question')];
      if(questions.length&&isH446GroupedMarking(youPage)&&showH446GroupedMarking(youPage,true,Math.max(0,questions.length-1))){
        // Back from vocabulary returns to the final self-marking answer on mobile.
      }else if(questions.length){
        const requestedSize=Math.max(1,Number(youPage.dataset.windowSize||3));
        const size=Math.min(requestedSize,questions.length);
        setYouDoWindow(youPage,questions.length-size);
      }else{
        const stages=[...youPage.querySelectorAll('.youdo-stage')];
        if(stages.length)showOnly(stages,stages.length-1);
      }
      updateSignals('you-do');
      updateControl();
    }
    return;
  }
  if(current==='you-do'){
    if(isH446GroupedMarking(page)&&page.dataset.answerMode==='true'){
      const index=Number(page.dataset.answerIndex||0);
      if(window.matchMedia('(max-width:700px)').matches&&index>0){showH446GroupedMarking(page,true,index-1);updateControl();return;}
      showH446GroupedMarking(page,false);
      page.dataset.workMode='independent';
      updateSignals('you-do');updateControl();return;
    }
    if(page.dataset.assessmentMode==='true'){
      updateSignals('you-do');
      updateControl();
      return;
    }
    if(page.dataset.answerMode==='true'){
      const index=Number(page.dataset.answerIndex||0);
      if(index>0){showYouDoAnswer(page,index-1);updateControl();return;}
      page.dataset.answerMode='false';
      const questions=[...page.querySelectorAll('.youdo-question')];
      setYouDoWindow(page,Math.max(0,questions.length-Math.max(1,Number(page.dataset.windowSize||3))));
      questions.forEach(q=>{const a=q.querySelector('.youdo-solution');if(a)a.hidden=true;});
      updateControl();return;
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



// Keep the normal phase order: You Do → Key Vocabulary → Exit.
// Solutions remain a separate, optional self-marking action after the exit check.
function prepareYouDoSolutionsLink(){
  if(isH446GroupedMarking(document.getElementById('you-do')))return;
  const createLink=()=>{
    const anchor=document.createElement('a');
    anchor.className='answer-cta youdo-solutions-link';
    anchor.href='answers.html';
    anchor.target='_blank';
    anchor.rel='noopener';
    anchor.textContent='Self-mark You Do answers →';
    anchor.setAttribute('aria-label','Open the You Do answers in a separate tab');
    return anchor;
  };
  const card=document.getElementById('exit')?.querySelector('.exit-check-card');
  if(card&&!card.querySelector('.youdo-solutions-link'))card.append(createLink());
}

function prepareMobileSwipeNavigation(){
  const phone=window.matchMedia('(max-width: 700px)');

  const navwrap=document.querySelector('.navwrap');
  const courseBack=navwrap?.querySelector('.course-back');
  if(navwrap&&!document.getElementById('mobile-lesson-status')){
    const status=document.createElement('div');
    status.id='mobile-lesson-status';
    status.className='mobile-lesson-status';
    status.setAttribute('aria-live','polite');
    const badge=createLessonIdBadge();
    const copy=document.createElement('span');
    copy.className='mobile-lesson-copy';
    copy.innerHTML='<span class="mobile-lesson-title"></span><span class="mobile-phase-status"></span>';
    if(badge)status.append(badge,copy);else status.append(copy);
    if(courseBack)courseBack.insertAdjacentElement('afterend',status);
    else navwrap.prepend(status);
  }
  updateMobileLessonStatus();

  let startX=0;
  let startY=0;
  let tracking=false;
  let direction=null;

  const interactiveSelector='button,a,input,textarea,select,summary,[contenteditable="true"]';

  function startsInHorizontalScroller(target){
    let el=target instanceof Element?target:null;
    while(el&&el!==document.body){
      const style=getComputedStyle(el);
      const overflowX=style.overflowX;
      if((overflowX==='auto'||overflowX==='scroll')&&el.scrollWidth>el.clientWidth+4){
        return true;
      }
      el=el.parentElement;
    }
    return false;
  }

  function hideHint(){
    const hint=document.querySelector('.mobile-swipe-hint');
    if(hint)hint.remove();
  }

  function showHint(){
    try{
      if(sessionStorage.getItem('h446-swipe-hint-seen')==='1')return;
      sessionStorage.setItem('h446-swipe-hint-seen','1');
    }catch(e){}
    const hint=document.createElement('div');
    hint.className='mobile-swipe-hint';
    hint.textContent='Swipe left: next · right: back · scroll to read';
    hint.setAttribute('role','status');
    hint.setAttribute('aria-live','polite');
    document.body.appendChild(hint);
    window.setTimeout(()=>hint.classList.add('is-fading'),4200);
    window.setTimeout(()=>hint.remove(),5000);
  }

  // On phones the reference sits above the changing panel. Bring the newly
  // revealed answer/step into view instead of returning to the unchanged title.
  const changeSelector='.donow-stage,.objective-vocab-stage,[data-objective-vocab-definition],.nl-stage,.ido-example,.ido-step,.model-stage,.wedo-example,.wedo-step,[data-reveal-answer],.youdo-question,.youdo-stage,.vocab-stage,[data-vocab-answer],.vocab-card [data-answer],.exit-stage,details.answers';
  function isVisible(element){
    return !element.closest('[hidden]')&&(!element.closest('.page')||element.closest('.page').classList.contains('active'));
  }
  function navigate(action){
    const oldPage=current;
    const elements=[...document.querySelectorAll(changeSelector)];
    const before=new Map(elements.map(element=>[element,isVisible(element)&&(element.tagName!=='DETAILS'||element.open)]));
    action();
    const revealed=elements.find(element=>isVisible(element)&&!before.get(element)&&(element.tagName!=='DETAILS'||element.open));
    window.requestAnimationFrame(()=>{
      if(oldPage!==current){
        window.scrollTo({top:0,behavior:'instant'});
      }else if(revealed){
        const header=document.querySelector('.navwrap');
        const inset=(header?.getBoundingClientRect().height||0)+12;
        const top=window.scrollY+revealed.getBoundingClientRect().top-inset;
        window.scrollTo({top:Math.max(0,top),behavior:'instant'});
      }
    });
  }

  document.addEventListener('touchstart',e=>{
    tracking=false;
    direction=null;
    if(!phone.matches||e.touches.length!==1)return;
    const target=e.target instanceof Element?e.target:null;
    if(target?.closest(interactiveSelector)||startsInHorizontalScroller(target))return;
    startX=e.touches[0].clientX;
    startY=e.touches[0].clientY;
    // Let the browser own edge gestures such as back/forward.
    if(startX<24||startX>window.innerWidth-24)return;
    tracking=true;
  },{passive:true});

  document.addEventListener('touchmove',e=>{
    if(!tracking)return;
    if(e.touches.length!==1){tracking=false;return;}
    const dx=Math.abs(e.touches[0].clientX-startX);
    const dy=Math.abs(e.touches[0].clientY-startY);
    if(!direction&&Math.max(dx,dy)>=12){
      if(dy>=dx){tracking=false;return;}
      if(dx>dy*1.25)direction='horizontal';
    }
    // Prevent the browser from cancelling a recognised lesson swipe.
    if(direction==='horizontal'&&e.cancelable)e.preventDefault();
  },{passive:false});

  document.addEventListener('touchend',e=>{
    if(!tracking||!phone.matches||e.changedTouches.length!==1)return;
    tracking=false;
    const dx=e.changedTouches[0].clientX-startX;
    const dy=e.changedTouches[0].clientY-startY;
    if(Math.abs(dx)<48||Math.abs(dx)<=Math.abs(dy)*1.25)return;
    hideHint();
    navigate(dx<0?next:previousAction);
  },{passive:true});

  document.addEventListener('touchcancel',()=>{tracking=false;direction=null;},{passive:true});
  if(phone.matches)showHint();
}


/* J277 Year 10: each question and answer names the lesson in which
   its underlying knowledge was previously taught, with KS3 for L001. */
function prepareJ277DoNowSourceLabels(){
  const found=location.pathname.match(/\/lessons\/j277\/lesson-(\d{3})(?:\/|\.html|$)/i);
  if(!found)return;
  const number=Number(found[1]);
  const prior={"1":["KS3","KS3","KS3 Maths","KS3"],"2":["L001","L001","L001","L001"],"3":["L002","L001","L002","L002"],"4":["L003","L001","L002","L001 + L003"],"5":["L004","L003","L002","L004"],"6":["L005","L002","L003","L005"],"7":["L006","L003","L005","L006"],"8":["L007","L004","L005","L007"],"9":["L008","L005","L007","L007 + L008"],"10":["L009","L006","L005","L007 + L009"],"11":["L010","L008","L004","L010"],"12":["L011","L007","L010","L011"],"13":["L012","L011","L005","L011 + L012"],"14":["L013","L012","L010","L013"],"15":["L014","L006","L013","L014"],"16":["L015","L010","L012","L007 + L015"],"17":["L016","L004","L008","L011 + L016"],"18":["L017","L003","L012","L007 + L010 + L015"]};
  const refs=prior[number];
  if(!refs)return;
  const questions=[...document.querySelectorAll('#do-now .donow-questions .donow-question > strong')];
  const reviews=[...document.querySelectorAll('#do-now .donow-review-question .review-number')];
  if(questions.length!==4||reviews.length!==4)return;
  for(let i=0;i<4;i++){
    const stage=number===1?(i===3?'CHALLENGE':'KS3 RECALL'):(i===0?'LAST LESSON':i===3?'CHALLENGE':'RETRIEVAL');
    const label=number===1?'PRIOR · '+refs[i]:'TAUGHT · '+refs[i];
    for(const [heading,answerView] of [[questions[i],false],[reviews[i],true]]){
      heading.classList.add('j277-origin-heading');
      heading.textContent=(answerView?'QUESTION '+(i+1)+' OF 4':String(i+1))+' · '+stage;
      const origin=document.createElement('span');
      origin.className='j277-retrieval-origin';
      origin.textContent=label;
      origin.title=number===1?'Prior Key Stage 3 learning':'Previously taught in '+refs[i];
      heading.appendChild(origin);
    }
  }
}


/* OCR H446 – progressive spaced retrieval from previously taught lessons.
   Year 12 and Year 13 are mapped separately. Stage cards and answer views
   both display identical prior-teaching references. Non-question Do Nows
   (revision, assessment and feedback) remain unchanged. */
function prepareH446DoNowSourceLabels(){
  const match=location.pathname.match(/\/lessons\/h446\/lesson-(\d{3})(?:\/|\.html|$)/i);
  if(!match)return;
  const n=Number(match[1]);
  const origins={"1":["GCSE","GCSE","GCSE","GCSE"],"2":["L001","L001","L001","L001"],"3":["L001","L001","L002","L002"],"4":["L001","L003","L002","L003"],"5":["L004","L003","L002","L003"],"6":["L005","L004","L002","L003"],"7":["L006","L005","L003","L002"],"8":["L001","L003","L003","L007"],"9":["L008","L005","L003","L002"],"10":["L009","L008","L005","L009"],"11":["L010","L009","L001","L009 + L010"],"12":["L011","L010","L009","L011"],"13":["L012","L010","L011","L009 + L010"],"14":["L013","L010","L011","L013"],"15":["L014","L013","L014","L013 + L014"],"16":["L015","L015","L015","L013 + L015"],"17":["L014","L011","L003","L013"],"18":["L017","L017","L017","L017"],"19":["L018","L017","L018","L017 + L018"],"20":["L017","L018","L019","L019"],"21":["L020","L020","L019","L019"],"22":["L017","L019","L020","L021"],"23":["L022","L019","L021 + L022","L022"],"24":["L020","L020","L022","L019–L023"],"25":["L017","L019","L017","L017"],"26":["L020","L025","L017","L025"],"27":["L004","L025","GCSE","L026"],"28":["L002","L027","GCSE","L004"],"29":["L028","GCSE","L017","L006"],"30":["L026","L027","L028","L027"],"31":["L026","L026","L002","L002"],"32":["L030","L030","L031","L031"],"33":["L027","L031","L030","L026"],"35":["L003","L023","L027","L031"],"181":["L020","L027","L002","L013 + L017"],"182":["L012","GCSE","L012","L181"],"183":["L181","L010","GCSE","L181 + L182"],"184":["L017","L010","GCSE","GCSE"],"185":["L184","L184","L017","L184"],"186":["L181","L185","L017","L185"],"187":["L186","L181","L186","L181 + L186"],"188":["L187","L186","L025","L025"],"189":["L021","L021","L020","L021"],"190":["L189","L189","L189","L189"],"191":["L184","L187","L025 + L188","L190"]};
  const updates={"13":{"0":["What is the difference between a parameter and an argument in C#?","A parameter is named in a method declaration; an argument is the value supplied when calling it."],"1":["Which type of C# loop is suitable when you know how many repetitions are required?","A for loop is appropriate for a known number of repetitions."],"2":["What is the difference between a function and a void method?","A function returns a value; a void method does not return a value."],"3":["A program repeatedly prints three lines. Which previously taught programming construct reduces repeated statements, and why?","A loop: it repeats the same instructions without writing them out each time."]},"14":{"0":["On the 3 × 3 board from L013, which square is board[1,2] (zero-based rows and columns)?","Square 6: row 1, column 2 in the board shown in L013."],"1":["Name the three parts of a C# for loop header.","Initialisation, condition and update."],"2":["What is the difference between a C# function and a void method?","A function returns a value; a void method does not."],"3":["Why is a 2D array more suitable for a 3 × 3 board than nine unrelated variables?","It keeps related squares together and lets code access each square by its row and column."]},"16":{"3":["A player selects square 8. Give its zero-based row and column, and explain why an occupied square must be rejected.","Square 8 is row 2, column 1. An occupied square must be rejected to avoid overwriting a previous move."]},"18":{"3":["A 3D C# array has dimensions [2,3,4]. How many values can it hold and what does GetLength(2) return?","It can store 2 × 3 × 4 = 24 values; GetLength(2) returns 4."]},"19":{"2":["Give one advantage of grouping a student's name, candidate number and score into a record.","The related values can be represented and handled together as one structured item."],"3":["A program must frequently add items to the beginning of a collection. Is a C# fixed-size array or a List<T> more suitable, and why?","List<T>, because its size can change and elements can be inserted without manually creating a new fixed-size array."]},"21":{"3":["In an array-based linked list, why can the logical next item be at a non-adjacent array index?","The next pointer stores the next item's index, so the logical order does not have to match the physical array order."]},"23":{"2":["State one difference between a tree and a general graph.","A tree has a hierarchy and no cycles; a general graph may contain cycles."],"3":["A binary search tree contains 15 at its root, with 9 on the left and 21 on the right. Where would 12 be inserted?","12 belongs to the right of 9, because 12 is less than 15 but greater than 9."]},"25":{"1":["How is moving to the next item in a linked list different from accessing the next item of an array?","A linked list follows the next pointer; an array normally uses the next numeric index."],"3":["For int[] numbers = {3, 7, 12, 18, 24}, give the first and last valid indexes. Explain why numbers[5] is invalid.","Valid indexes are 0 to 4. numbers[5] is outside the array's bounds."]},"30":{"1":["What does ¬¬A simplify to in Boolean algebra?","A — double negation cancels out."],"2":["In a Karnaugh-map group, what happens to an input that changes between 0 and 1?","The changing input is removed from the simplified term."],"3":["Use De Morgan's law to simplify ¬(A ∧ B), and explain why the expressions are equivalent.","¬A ∨ ¬B. Both expressions give the same output for every input combination."]},"186":{"3":["An insertion sort has a sorted section [4, 7, 9] and must insert 6. Where should 6 go, and which values move?","Insert 6 between 4 and 7; shift 7 and 9 one position right."]},"187":{"2":["When merging the sorted halves [2, 8] and [3, 7], what is the combined sorted order?","[2, 3, 7, 8]."],"3":["Why must a recursive sorting algorithm include a base case?","It stops recursion on a sufficiently small input and prevents calls from continuing indefinitely."]},"189":{"2":["Which previously studied structure removes items in first-in-first-out order, and how is it different from a stack?","A queue uses FIFO; a stack removes the most recently added item first (LIFO)."],"3":["For a directed edge A → B, can you assume B → A also exists? Explain.","No. A directed edge permits travel from A to B only unless a reverse edge is also specified."]},"190":{"3":["Why does Dijkstra's algorithm select the unvisited node with the smallest tentative distance next?","With non-negative edge weights, this is the nearest unsettled node; its shortest distance can then be finalised."]}};
  const taught=origins[n];
  if(!taught)return;
  // Lessons 030–034 define their own sequenced retrieval questions and worked answers.
  // Do not overwrite them or relabel their actual topic sources with legacy metadata.
  if([30,31,32,33,34].includes(n))return;
  const section=document.querySelector('#do-now');
  if(!section)return;
  const questions=[...section.querySelectorAll('.donow-questions .donow-question')];
  if(questions.length!==4)return;
  const deck=section.querySelector('.donow-deck');
  if(!deck)return;
  let reviews=[...section.querySelectorAll('.donow-review-question')];
  if(n===33&&reviews.length===0){
    /* The pre-existing L033 Do Now had questions but no model answer screens. */
    const answers=['A (double negation).','XOR.','It stores one bit of state, updated at a triggering clock edge.','2³ = 8 rows.'];
    questions.forEach((q,i)=>{
      const stage=document.createElement('div');stage.className='donow-stage';stage.hidden=true;
      const layout=document.createElement('div');layout.className='donow-review';
      const lhs=document.createElement('article');lhs.className='donow-review-question';
      const num=document.createElement('span');num.className='review-number';num.textContent='QUESTION '+(i+1)+' OF 4';
      const title=document.createElement('h2');title.textContent='Retrieve earlier learning';
      const prompt=document.createElement('p');prompt.className='review-question';
      prompt.textContent=q.querySelector('p')?.textContent||'';
      lhs.append(num,title,prompt);
      const rhs=document.createElement('article');rhs.className='donow-review-answer';
      const label=document.createElement('span');label.className='review-label';label.textContent='MODEL ANSWER';
      const answer=document.createElement('p');answer.className='review-answer';answer.textContent=answers[i];
      rhs.append(label,answer);layout.append(lhs,rhs);stage.append(layout);deck.append(stage);
    });
    reviews=[...section.querySelectorAll('.donow-review-question')];
  }
  if(reviews.length!==4)return;
  const edits=updates[n]||{};
  for(let i=0;i<4;i++){
    const card=questions[i],review=reviews[i],source=taught[i];
    if(edits[i]){
      const [questionText,answerText]=edits[i];
      const paragraphs=[...card.querySelectorAll('p')];
      if(paragraphs.length){
        paragraphs[paragraphs.length-1].textContent=questionText;
        paragraphs.slice(0,-1).forEach(p=>p.remove());
      }else{
        const p=document.createElement('p');p.textContent=questionText;card.append(p);
      }
      const answerPrompt=review.querySelector('.review-question');
      if(answerPrompt)answerPrompt.textContent=questionText;
      const rhs=review.parentElement?.querySelector('.review-answer');
      if(rhs)rhs.textContent=answerText;
      review.parentElement?.querySelectorAll('.review-explain').forEach(note=>note.remove());
    }
    const style=n===1?(i===3?'CHALLENGE':'PRIOR KNOWLEDGE'):(i===0?'LAST LESSON':i===3?'CHALLENGE':'RETRIEVAL');
    const fromGCSE=source==='GCSE';
    const reference=fromGCSE?'PRIOR · GCSE':'TAUGHT · '+source;
    const headings=[card.querySelector(':scope > strong'),review.querySelector('.review-number')];
    for(let k=0;k<headings.length;k++){
      const heading=headings[k];
      if(!heading)continue;
      heading.classList.add('h446-origin-heading');
      heading.textContent=(k===0?String(i+1):'QUESTION '+(i+1)+' OF 4')+' · '+style;
      const tag=document.createElement('span');
      tag.className='h446-retrieval-origin';
      tag.textContent=reference;
      tag.title=fromGCSE?'GCSE knowledge revisited; no H446 lesson source claimed':'Previously taught in '+source;
      heading.append(tag);
    }
  }
}


/* Optional H446 phases: same L-number badge, routine tiles and lesson controls.
   Resources are discovered from same-folder JSON; no empty phase is registered. */
window.H446OptionalBridge={
  register(type,section,button){
    if(!['catch-up','exam-practice'].includes(type)||order.includes(type))return false;
    const before=type==='catch-up'
      ?(order.includes('exam-practice')?'exam-practice':'vocabulary')
      :'vocabulary';
    const pos=order.indexOf(before);
    if(pos<0)return false;
    order.splice(pos,0,type);
    pages.splice(pos,0,section);
    nav.splice(pos,0,button);
    const nextButton=document.querySelector('[data-page="'+before+'"]');
    nextButton?.before(button);
    const nextSection=document.getElementById(before);
    nextSection?.before(section);
    button.addEventListener('click',()=>showPage(type));
    const afterHash=window.location.hash.slice(1);
    if(afterHash===type)showPage(type);
    else updateControl();
    return true;
  },
  go(id){showPage(id);},
  state(){return current;},
  refresh(){updateControl();}
};

nav.forEach(b=>b.addEventListener('click',()=>showPage(b.dataset.page)));
advance.addEventListener('click',next);
previous.addEventListener('click',previousAction);
document.querySelectorAll('details.answers').forEach(d=>d.addEventListener('toggle',updateControl));
document.addEventListener('keydown',e=>{
  if(e.target.closest('button,a,input,textarea,select,summary')||e.altKey||e.ctrlKey||e.metaKey)return;
  if(e.key==='ArrowRight'){e.preventDefault();next();}
  if(e.key==='ArrowLeft'){e.preventDefault();previousAction();}
});
prepareObjectiveVocabularySupport();
prepareVocabulary();
/* H446-only: publication status belongs in source and the staff workflow,
   not in the student-facing Classroom TV heading, footer or browser tab. */
function hideH446PublicationStatus(){
  if(!/^\/lessons\/h446\/lesson-\d{3}(?:\/|\.html|$)/i.test(location.pathname))return;
  document.querySelectorAll('.lesson-label .ready-badge, .lesson-label .h13-draft, .lesson-label .draft-pill')
    .forEach(badge=>{if(badge.textContent.trim().toUpperCase()==='READY')badge.remove();});
  document.querySelectorAll('.lesson-label, .lesson-footer').forEach(container=>{
    container.childNodes.forEach(node=>{
      if(node.nodeType!==Node.TEXT_NODE || !/\bREADY\b/.test(node.textContent))return;
      node.textContent=node.textContent
        .replace(/\bREADY\b\s*(?:·\s*)?/g,'')
        .replace(/\s*[·•]\s*$/,'')
        .replace(/^\s*[·•]\s*/,'')
        .replace(/\s{2,}/g,' ');
    });
  });
  document.title=document.title.replace(/\s*[·|—–-]\s*Ready\s*$/i,'');
}

hideH446PublicationStatus();
prepareLessonIdBadge();
prepareJ277DoNowSourceLabels();
prepareH446DoNowSourceLabels();
prepareMobileSwipeNavigation();
prepareYouDoSolutionsLink();
showPage(location.hash.slice(1)||'do-now');
if(/^\/lessons\/h446\/lesson-\d{3}(?:\/|\.html|$)/i.test(location.pathname)){
  const optionalModule=document.createElement('script');
  optionalModule.src='../../../assets/h446-lesson/optional-resources.js?v=20261015-optionalh4461';
  optionalModule.async=true;
  document.body.appendChild(optionalModule);
}


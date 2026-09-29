const order=['do-now','overview','new-learning','i-do','we-do','you-do','vocabulary','exit'];
const signalMap={
  'do-now':['DoNow','SilentWorking','MWBs'],
  overview:['','Listening',''],
  'new-learning':['','Listening','ColdCalling'],
  'i-do':['IDo','Listening',''],
  'we-do':['WeDo','QuietWorking','Think-Pair-Share'],
  'you-do':['YouDo','SilentWorking','MWBs'],
  vocabulary:['Questionning','Listening','ColdCalling'],
  exit:['QuestionningEx','SilentWorking','']
};
const labels={
  DoNow:'Do Now',SilentWorking:'Silent Working',ExerciseBook:'Exercise Book',
  Questionning:'Questioning',MWBs:'Mini whiteboards',Listening:'Listening',
  ColdCalling:'Cold Calling',IDo:'I Do',WeDo:'We Do',QuietWorking:'Quiet Working',
  'Think-Pair-Share':'Think-Pair-Share',YouDo:'You Do',ChoralResponse:'Choral Response',
  QuestionningEx:'Exit Questioning'
};
const pages=[...document.querySelectorAll('.page')];
const nav=[...document.querySelectorAll('[data-page]')];
const advance=document.getElementById('advance');
const previous=document.getElementById('previous');
const iconPath=document.body.dataset.iconPath||'assets/';
let current='do-now';

function visibleIndex(items){
  return Math.max(0,items.findIndex(x=>!x.hidden));
}
function showOnly(items,index){
  items.forEach((item,i)=>item.hidden=i!==index);
}
function resetPhaseState(id){
  const page=document.getElementById(id);
  if(!page)return;
  document.querySelectorAll('details.answers').forEach(d=>d.open=false);
  if(id==='do-now'){
    const stages=[...page.querySelectorAll('.donow-stage')];
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
    page.querySelectorAll('[data-reveal-answer]').forEach(el=>el.hidden=true);
    page.querySelectorAll('[data-reveal-prompt]').forEach(el=>el.hidden=false);
  }
  if(id==='you-do'){
    const stages=[...page.querySelectorAll('.youdo-stage')];
    if(stages.length)showOnly(stages,0);
  }
  if(id==='vocabulary'){
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
function updateSignals(id){
  ['phase-logo','behaviour-logo','response-logo'].forEach((key,i)=>{
    const img=document.getElementById(key);
    if(!img)return;
    const name=(signalMap[id]||[])[i];
    img.hidden=!name;
    if(name){
      img.src=iconPath+name+'_CodingIcon.png';
      img.alt=labels[name]||name;
    }
  });
  const exitSignal=document.getElementById('exit-ticket-signal');
  if(exitSignal)exitSignal.hidden=id!=='exit';
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
  }else if(current==='we-do'&&page.querySelector('[data-reveal-answer][hidden]')){
    label='Reveal model response';
  }else if(current==='you-do'){
    const stages=[...page.querySelectorAll('.youdo-stage')];
    const i=visibleIndex(stages);
    label=i<stages.length-1?'Next independent questions →':'Open answers →';
  }else if(current==='vocabulary'&&page.querySelector('.vocab-card [data-answer][hidden]')){
    label='Reveal next answer';
  }else if(page.querySelector('details.answers:not([open])')){
    label='Reveal answers';
  }else if(current==='exit'){
    label='Back to Do Now';
  }
  advance.textContent=label;
  previous.disabled=order.indexOf(current)===0;
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
    const answer=page.querySelector('[data-reveal-answer][hidden]');
    if(answer){
      page.querySelectorAll('[data-reveal-prompt]').forEach(el=>el.hidden=true);
      answer.hidden=false;updateControl();return;
    }
  }
  if(current==='you-do'){
    const stages=[...page.querySelectorAll('.youdo-stage')];
    const i=visibleIndex(stages);
    if(i<stages.length-1){showOnly(stages,i+1);updateControl();return;}
    location.href='answers.html';return;
  }
  if(current==='vocabulary'){
    const answer=page.querySelector('.vocab-card [data-answer][hidden]');
    if(answer){
      answer.hidden=false;
      const blank=answer.parentElement.querySelector('.vocab-blank');
      if(blank)blank.hidden=true;
      updateControl();return;
    }
  }
  const answers=[...page.querySelectorAll('details.answers:not([open])')];
  if(answers.length){answers.forEach(d=>d.open=true);updateControl();return;}
  showPage(order[(order.indexOf(current)+1)%order.length]);
}
nav.forEach(b=>b.addEventListener('click',()=>showPage(b.dataset.page)));
advance.addEventListener('click',next);
previous.addEventListener('click',()=>showPage(order[Math.max(0,order.indexOf(current)-1)]));
document.querySelectorAll('details.answers').forEach(d=>d.addEventListener('toggle',updateControl));
document.addEventListener('keydown',e=>{
  if(e.target.closest('button,a,input,textarea,select,summary')||e.altKey||e.ctrlKey||e.metaKey)return;
  if(e.key==='ArrowRight'){e.preventDefault();next();}
  if(e.key==='ArrowLeft'){e.preventDefault();showPage(order[Math.max(0,order.indexOf(current)-1)]);}
});
showPage(location.hash.slice(1)||'do-now');

/* One J277 Code First classroom renderer.
   Student task and starter come from the reviewed central question bank.
   Assessment/special lessons are excluded; exam questions and model answers stay intact. */
(()=>{'use strict';
 const match=location.pathname.match(/\/lessons\/j277\/lesson-(\d{3})\//);
 if(!match)return;
 const id=match[1];
 // The RHS Lesson 134 exam-pilot=2 owns its numbered ERL Code First screen.
 // Do not replace it with the central green Code First renderer. All normal
 // lessons (including normal Lesson 134) keep their existing shared behaviour.
 if(id==='134' && new URLSearchParams(location.search).get('exam-pilot')==='2')return;
 const excluded=new Set(['018','035','050','078','094','113','120','143','156','157']);
 if(excluded.has(id))return;

 const stylesheet=document.createElement('link');
 stylesheet.rel='stylesheet';
 stylesheet.href='../../../assets/j277/code-first-rollout.css?v=20261115-brush2';
 document.head.append(stylesheet);

 const waitForCard=()=>new Promise(resolve=>{
  let attempts=0;
  const poll=()=>{
   const card=document.querySelector('#you-do .j277-code-first');
   if(card||attempts++>40)return resolve(card);
   setTimeout(poll,80);
  };
  poll();
 });

 const make=(tag,className,text)=>{
  const element=document.createElement(tag);
  element.className=className;
  if(text!==undefined)element.textContent=text;
  return element;
 };

 async function render(){
  const card=await waitForCard();
  if(!card)return;
  const response=await fetch('../code-first-master-20261021.json?v=20261115-central1');
  if(!response.ok)throw new Error('Reviewed Code First bank unavailable');
  const bank=await response.json();
  const entry=bank.lessons?.[id];
  if(!entry||!entry.task||!entry.starter)return;

  // Keep the existing answer/reveal node if self-marking has already installed it.
  const answer=card.querySelector(':scope > .youdo-solution');
  const trace=card.querySelector('.j277-code-trace');
  const existingERL=card.querySelector('.j277-code-tasks a[href^="https://www.examreferencelanguage.co.uk/"]');

  const header=make('div','j277-cf-label','CODE FIRST · MWB');
  const main=make('div','j277-cf-main');
  const instructions=String(entry.task).trim()
   .replace(/^On your mini-whiteboard,?\s*/i,'')
   .replace(/^([a-z])/,first=>first.toUpperCase());
  // Only split on sentence endings, leaving expressions such as .upper intact.
  const parts=instructions.split(/(?<=[.!?])\s+(?=[A-Z])/);
  const prompt=make('h2','j277-cf-task',parts.shift()||instructions);
  main.append(prompt);
  if(parts.length)main.append(make('p','j277-cf-detail',parts.join(' ')));

  const code=make('pre','arithmetic j277-cf-code',entry.starter);
  main.append(code);
  if(existingERL){
   const link=existingERL.cloneNode(true);
   link.className='j277-cf-erl-link';
   main.append(link);
  }
  // Existing optional lesson-specific tracing remains available, not forced open.
  if(trace){trace.open=false;main.append(trace)}

  // The existing central bank determines which part of the routine is in focus.
  // Keep this a compact teaching cue, not four extra buttons or content panels.
  const stages=[['predict','Predict'],['write','Write'],['test','Test'],['iterate','Improve']];
  const focus=stages.some(([key])=>key===entry.focus_stage)?entry.focus_stage:'predict';
  const focusedLabel=stages.find(([key])=>key===focus)[1];
  const routine=make('p','j277-cf-routine');
  routine.setAttribute('role','group');
  routine.setAttribute('aria-label','Code First routine. Current focus: '+focusedLabel);
  stages.forEach(([key,label],index)=>{
   if(index){
    const divider=make('span','j277-cf-divider',' · ');
    divider.setAttribute('aria-hidden','true');
    routine.append(divider);
   }
   const active=key===focus;
   const step=make(active?'mark':'span','j277-cf-stage'+(active?' is-active':''),active?label.toUpperCase():label);
   if(active)step.setAttribute('aria-current','step');
   routine.append(step);
  });
  card.replaceChildren(header,main,routine,...(answer?[answer]:[]));

  const lines=String(entry.starter).split('\n');
  const widest=Math.max(...lines.map(line=>line.length));
  card.dataset.codeDensity=lines.length<=3&&widest<=52?'short':lines.length<=7&&widest<=72?'medium':'long';
  card.dataset.taskDensity=instructions.length>115?'dense':'normal';
  card.dataset.cycleRollout='central';
  card.dataset.codeFocus=focus;
  card.classList.add('j277-code-first-shared');
 }
 render().catch(error=>console.warn('Code First retained original lesson layout',error));
})();

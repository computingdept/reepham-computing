/* One J277 Code First classroom renderer.
   Student task and starter come from the reviewed central question bank.
   Assessment/special lessons are excluded; exam questions and model answers stay intact. */
(()=>{'use strict';
 const match=location.pathname.match(/\/lessons\/j277\/lesson-(\d{3})\//);
 if(!match)return;
 const id=match[1];
 const excluded=new Set(['018','035','050','078','094','113','120','143','156','157']);
 if(excluded.has(id))return;

 const stylesheet=document.createElement('link');
 stylesheet.rel='stylesheet';
 stylesheet.href='../../../assets/j277/code-first-rollout.css?v=20261115-central1';
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

  const routine=make('p','j277-cf-routine','Predict  ·  Write  ·  Test  ·  Improve');
  routine.setAttribute('aria-label','Code First routine: Predict, Write, Test, Improve');
  card.replaceChildren(header,main,routine,...(answer?[answer]:[]));

  const lines=String(entry.starter).split('\n');
  const widest=Math.max(...lines.map(line=>line.length));
  card.dataset.codeDensity=lines.length<=3&&widest<=52?'short':lines.length<=7&&widest<=72?'medium':'long';
  card.dataset.taskDensity=instructions.length>115?'dense':'normal';
  card.dataset.cycleRollout='central';
  card.classList.add('j277-code-first-shared');
 }
 render().catch(error=>console.warn('Code First retained original lesson layout',error));
})();

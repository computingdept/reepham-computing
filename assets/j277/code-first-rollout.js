/* J277 Code First shared classroom presentation and selective blank tracing.
   Presentation only: never rewrites task, starter, model or marking. */
(()=>{'use strict';
 const match=location.pathname.match(/\/lessons\/j277\/lesson-(\d{3})\//);
 if(!match)return;
 const id=match[1];
 const except=new Set(['018','035','050','078','094','113','120','143','156','157']);
 if(except.has(id))return;
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const base='../../../assets/j277/';
 const link=document.createElement('link');link.rel='stylesheet';link.href=base+'code-first-rollout.css?v=20261115-apple-shared2';document.head.appendChild(link);
 const wait=()=>new Promise(resolve=>{let n=0;const poll=()=>{const card=document.querySelector('#you-do .j277-code-first');if(card||n++>30)return resolve(card);setTimeout(poll,80)};poll()});
 const stages=['predict','write','test','iterate'];
 async function run(){
  const card=await wait();if(!card||card.dataset.cycleRollout)return;
  const data=await fetch('../code-first-master-20261021.json?v=20261025-stage-map1').then(r=>{if(!r.ok)throw Error('Missing master');return r.json()});
  const entry=data.lessons[id];if(!entry||!stages.includes(entry.focus_stage))return;
  card.dataset.cycleRollout='1';card.dataset.codeFocus=entry.focus_stage;
  card.classList.add('j277-code-first-shared');
  const content=card.querySelector('.j277-code-tasks')||card.querySelector('.question-text')||card;
  // Keep every original challenge and reference, but give the first task a clear,
  // readable position. Existing static pilot cards opt out above.
  const eyebrow=document.createElement('div');eyebrow.className='j277-shared-eyebrow';eyebrow.textContent='CODE FIRST';
  const instruction=document.createElement('p');instruction.className='j277-shared-instruction';instruction.textContent='On your mini-whiteboard';
  card.prepend(instruction);card.prepend(eyebrow);
  const taskParagraph=[...content.querySelectorAll('p')].find(p=>/^YOUR TASK:|^1\s*[·.]\s*Predict:/i.test((p.textContent||'').trim()));
  if(taskParagraph){
    taskParagraph.classList.add('j277-shared-prompt');
    const label=taskParagraph.querySelector('strong');
    if(label&&/^YOUR TASK:/i.test(label.textContent.trim()))label.remove();
    // The activity still uses the identical question; avoid repeating the
    // mini-whiteboard response cue now shown directly above it.
    const lead=[...taskParagraph.childNodes].find(node=>node.nodeType===3&&node.textContent.trim());
    if(lead&&/^\s*On your mini-whiteboard,?\s+/i.test(lead.textContent)){
      lead.textContent=lead.textContent.replace(/^\s*On your mini-whiteboard,?\s+/i,'').replace(/^([a-z])/,(_,first)=>first.toUpperCase());
    }
  }
  const prompts=content.querySelectorAll('p');
  const code=[...content.querySelectorAll('pre.arithmetic')];
  const lines=code.reduce((sum,pre)=>sum+(pre.textContent||'').split('\n').length,0);
  const maxWidth=code.reduce((max,pre)=>Math.max(max,...(pre.textContent||'').split('\n').map(line=>line.length)),0);
  card.dataset.codeDensity=lines<=3&&maxWidth<=52?'short':lines<=8&&maxWidth<=72?'medium':'long';
  card.dataset.taskDensity=(taskParagraph?.textContent.length||0)>130||prompts.length>5?'dense':'normal';
  let host=card.querySelector('.j277-code-cycle');
  if(!host){
    host=document.createElement('div');host.className='j277-code-cycle';
    card.append(host);
  }
  // Existing static pilot may already contain the cycle at the top: dock it below task and code.
  card.append(host);
  host.dataset.focus=entry.focus_stage;
  host.setAttribute('role','group');host.setAttribute('aria-label','Coding routine. Current focus: '+entry.focus_stage);
  const strip=document.createElement('div');strip.className='j277-apple-steps';strip.setAttribute('aria-hidden','true');
  [['predict','Predict'],['write','Write'],['test','Test'],['iterate','Improve']].forEach(([key,label],index)=>{
    const step=document.createElement('span');step.className='j277-apple-step'+(key===entry.focus_stage?' is-active':'');step.dataset.codeFirstStep=key;
    const number=document.createElement('small');number.textContent=String(index+1).padStart(2,'0');
    const caption=document.createElement('b');caption.textContent=label;
    step.append(number,caption);strip.append(step);
  });
  host.replaceChildren(strip);
  // Existing Lesson 057 trace stays intact; only its responsive placement changes.
  // Keep the full-width task until the teacher opens the optional trace.
  // On wide screens the two areas then share one row; mobile stays stacked.
  function arrangeTrace(){
    const tasks=card.querySelector('.j277-code-tasks');
    const trace=tasks?.querySelector('.j277-code-trace');
    if(!tasks||!trace)return;
    let primary=tasks.querySelector(':scope > .j277-code-primary');
    if(!primary){
      primary=document.createElement('div');
      primary.className='j277-code-primary';
      for(const node of [...tasks.childNodes])if(node!==trace)primary.append(node);
      tasks.prepend(primary);
    }
    tasks.append(trace);
    trace.open=true;
    trace.removeAttribute('data-code-first-trace');
    trace.dataset.codeFirstTrace='visible';
    tasks.classList.add('j277-trace-responsive');
    const sync=()=>tasks.classList.toggle('j277-trace-open',trace.open);
    trace.addEventListener('toggle',sync);sync();
  }
  if(card.querySelector('.j277-code-trace')){arrangeTrace();return;}
  const source=String(entry.starter||'');
  // Opt in only for observable state changes in a loop. Never assume the correct trace or output.
  const loops=/\b(for\s+\w+\s*=|while\b|repeat\b)/i.test(source);
  const update=/\b([A-Za-z]\w*)\s*=\s*\1\s*[+*/-]/.test(source);
  const nested=/\b(for|while)\b[\s\S]*\b(for|while)\b/i.test(source);
  if(!loops||!update||nested)return;
  const variable=(source.match(/\b([A-Za-z]\w*)\s*=\s*\1\s*[+*/-]/)||[])[1];
  if(!variable)return;
  const details=document.createElement('details');details.className='j277-code-trace j277-selective-trace';details.dataset.codeFirstTrace='optional';
  const summary=document.createElement('summary');summary.textContent='TRACE TABLE';details.append(summary);
  const explain=document.createElement('p');explain.textContent='Track '+variable+' after each loop pass.';details.append(explain);
  const scroll=document.createElement('div');scroll.className='j277-trace-scroll';
  const table=document.createElement('table');table.setAttribute('aria-label','Blank optional loop trace table');
  const head=document.createElement('thead');head.innerHTML='<tr><th scope="col">Pass</th><th scope="col">'+esc(variable)+'</th><th scope="col">Output / observation</th></tr>';table.append(head);
  const body=document.createElement('tbody');for(let i=0;i<5;i++){const row=document.createElement('tr');row.innerHTML='<td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>';body.append(row)}table.append(body);scroll.append(table);details.append(scroll);
  content.append(details);
  arrangeTrace();
 }
 run().catch(e=>console.warn('J277 Code First enhancement: existing task kept',e));
})();

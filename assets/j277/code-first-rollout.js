/* J277 Code First visual cycle and selective blank tracing.
   Presentation only: never rewrites task, starter, model or marking. */
(()=>{'use strict';
 const match=location.pathname.match(/\/lessons\/j277\/lesson-(\d{3})\//);
 if(!match)return;
 const id=match[1];
 const except=new Set(['018','035','050','078','094','113','120','143','156','157']);
 if(except.has(id))return;
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const base='../../../assets/j277/';
 const link=document.createElement('link');link.rel='stylesheet';link.href=base+'code-first-rollout.css?v=20261025-side3';document.head.appendChild(link);
 const wait=()=>new Promise(resolve=>{let n=0;const poll=()=>{const card=document.querySelector('#you-do .j277-code-first');if(card||n++>30)return resolve(card);setTimeout(poll,80)};poll()});
 const stages=['predict','write','test','iterate'];
 async function run(){
  const card=await wait();if(!card||card.dataset.cycleRollout)return;
  const data=await fetch('../code-first-master-20261021.json?v=20261025-stage-map1').then(r=>{if(!r.ok)throw Error('Missing master');return r.json()});
  const entry=data.lessons[id];if(!entry||!stages.includes(entry.focus_stage))return;
  card.dataset.cycleRollout='1';card.dataset.codeFocus=entry.focus_stage;
  const content=card.querySelector('.j277-code-tasks')||card.querySelector('.question-text')||card;
  let host=card.querySelector('.j277-code-cycle');
  if(!host){
    host=document.createElement('div');host.className='j277-code-cycle';
    card.append(host);
  }
  // Existing static pilot may already contain the cycle at the top: dock it below task and code.
  card.append(host);
  host.dataset.focus=entry.focus_stage;
  host.setAttribute('role','group');host.setAttribute('aria-label','Coding routine. Current focus: '+entry.focus_stage);
  // Inline the SVG so all four stages remain visible and the active stage can change.
  const response=await fetch(base+'code-first-cycle.svg?v=20261025-label-fit2');
  if(!response.ok)throw Error('Cycle unavailable');
  const doc=new DOMParser().parseFromString(await response.text(),'image/svg+xml');
  if(doc.querySelector('parsererror'))throw Error('Invalid SVG');
  const svg=document.importNode(doc.documentElement,true);
  svg.setAttribute('class','j277-code-cycle-graphic');svg.setAttribute('aria-hidden','true');
  svg.querySelectorAll('[data-cycle-step]').forEach(node=>node.classList.toggle('is-active',node.getAttribute('data-cycle-step')===entry.focus_stage));
  host.replaceChildren(svg);
  const tip=document.createElement('p');tip.className='j277-cycle-tip';
  const reasons={predict:'Think through what the code will do before you change it.',write:'Write a small amount of OCR ERL so you can check it carefully.',test:'Check the result with a useful input or a dry run.',iterate:'Use what you found to correct or improve the code.'};
  tip.textContent='TODAY: '+entry.focus_stage.toUpperCase()+' · '+reasons[entry.focus_stage];
  host.append(tip);
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
  const summary=document.createElement('summary');summary.textContent='TEST · Optional blank trace table';details.append(summary);
  const explain=document.createElement('p');explain.textContent='If it helps, trace the changing value of '+variable+' after each loop pass. Leave rows that do not execute empty.';details.append(explain);
  const scroll=document.createElement('div');scroll.className='j277-trace-scroll';
  const table=document.createElement('table');table.setAttribute('aria-label','Blank optional loop trace table');
  const head=document.createElement('thead');head.innerHTML='<tr><th scope="col">Pass</th><th scope="col">'+esc(variable)+'</th><th scope="col">Output / observation</th></tr>';table.append(head);
  const body=document.createElement('tbody');for(let i=0;i<5;i++){const row=document.createElement('tr');row.innerHTML='<td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>';body.append(row)}table.append(body);scroll.append(table);details.append(scroll);
  content.append(details);
  arrangeTrace();
 }
 run().catch(e=>console.warn('J277 Code First enhancement: existing task kept',e));
})();

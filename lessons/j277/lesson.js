const screens=[...document.querySelectorAll('.screen')];
let current=0;
const nav=document.getElementById('nav');
function show(i){
  current=Math.max(0,Math.min(i,screens.length-1));
  screens.forEach((s,k)=>s.classList.toggle('active',k===current));
  [...nav.children].forEach((b,k)=>b.classList.toggle('active',k===current));
  screens[current].scrollTop=0;
}
screens.forEach((s,i)=>{
  const b=document.createElement('button');
  b.textContent=s.dataset.label||`Screen ${i+1}`;
  b.addEventListener('click',e=>{e.stopPropagation();show(i)});
  nav.appendChild(b);
});
show(0);
document.addEventListener('keydown',e=>{
  if(e.key==='ArrowRight'||e.key==='PageDown'||e.key===' '){show(current+1)}
  if(e.key==='ArrowLeft'||e.key==='PageUp'){show(current-1)}
});
document.getElementById('deck').addEventListener('click',e=>{
  if(e.target.closest('button,.vocab-card')) return;
  show(current+1);
});
document.querySelectorAll('[data-reveal-group]').forEach(group=>{
  const steps=[...group.querySelectorAll('.step')];
  let idx=1;
  const btn=group.querySelector('.reveal-group-btn');
  if(btn) btn.addEventListener('click',e=>{
    e.stopPropagation();
    if(idx<steps.length){steps[idx].classList.add('shown');idx++}
    if(idx>=steps.length) btn.textContent='Continue →';
  });
});
document.querySelectorAll('.vocab-card').forEach(card=>{
  card.addEventListener('click',e=>{e.stopPropagation();card.classList.toggle('revealed')});
});
const objectives = window.LESSON_OBJECTIVES || [];
let oi=0;
const term=document.getElementById('objectiveTerm');
const def=document.getElementById('objectiveDefinition');
const ex=document.getElementById('objectiveExample');
const ctr=document.getElementById('objectiveCounter');
const next=document.getElementById('objectiveNext');
function renderObjective(){
  if(!term || !objectives.length) return;
  const o=objectives[oi];
  term.textContent=o.term;def.textContent=o.definition;ex.textContent=o.example;
  ctr.textContent=`${oi+1} of ${objectives.length}`;
  next.textContent=oi===objectives.length-1?'Start lesson →':'Next step →';
}
if(next){
  next.addEventListener('click',e=>{
    e.stopPropagation();
    if(oi<objectives.length-1){oi++;renderObjective()}else{show(current+1)}
  });
  renderObjective();
}
const order=['do-now','overview','new-learning','i-do','we-do','you-do','vocabulary','exit'];
const signalMap={
'do-now':['DoNow','SilentWorking','MWBs'],overview:['','Listening',''],
'new-learning':['','Listening','ColdCalling'],'i-do':['IDo','Listening',''],
'we-do':['WeDo','QuietWorking','Think-Pair-Share'],'you-do':['YouDo','SilentWorking','MWBs'],vocabulary:['Questionning','Listening','ColdCalling'],exit:['QuestionningEx','SilentWorking','']};
const labels={DoNow:'Do Now',SilentWorking:'Silent Working',ExerciseBook:'Exercise Book',Questionning:'Questioning',MWBs:'Mini whiteboards',Listening:'Listening',ColdCalling:'Cold Calling',IDo:'I Do',WeDo:'We Do',QuietWorking:'Quiet Working','Think-Pair-Share':'Think-Pair-Share',YouDo:'You Do',ChoralResponse:'Choral Response',QuestionningEx:'Exit Questioning'};
const pages=[...document.querySelectorAll('.page')],nav=[...document.querySelectorAll('[data-page]')],advance=document.getElementById('advance');
let current='do-now';
function updateControl(){const page=document.getElementById(current);let label='Continue →';
 if(current==='you-do')label='Open answers →';
 else if(current==='i-do'&&page.querySelector('.model-stage[hidden]'))label='Next worked example';
 else if(current==='vocabulary'&&page.querySelector('.vocab-card [data-answer][hidden]'))label='Reveal next answer';
 else if(page.querySelector('details.answers:not([open])'))label='Reveal answers';
 else if(current==='exit')label='Back to Do Now';
 advance.textContent=label;document.getElementById('previous').disabled=order.indexOf(current)===0;
 document.getElementById('page-count').textContent=(order.indexOf(current)+1)+' / '+order.length;
}
function showPage(id){if(!order.includes(id))id='do-now';current=id;
 pages.forEach(p=>p.classList.toggle('active',p.id===id));nav.forEach(b=>{b.classList.toggle('active',b.dataset.page===id);if(b.dataset.page===id)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');});
 document.querySelectorAll('details.answers').forEach(d=>d.open=false);
 document.querySelectorAll('.model-stage').forEach((s,i)=>s.hidden=i>0);
 document.querySelectorAll('.vocab-card').forEach((c,i)=>{const term=c.querySelector('dt'),definition=c.querySelector('dd'),blank=c.querySelector('.vocab-blank');term.hidden=false;definition.hidden=false;term.removeAttribute('data-answer');definition.removeAttribute('data-answer');const missing=i%2===0?definition:term;missing.hidden=true;missing.setAttribute('data-answer','');blank.hidden=false;blank.textContent=i%2===0?'Definition: __________':'Keyword: __________';c.insertBefore(blank,missing);});
 ['phase-logo','behaviour-logo','response-logo'].forEach((key,i)=>{const img=document.getElementById(key),name=signalMap[id][i];img.hidden=!name;if(name){img.src='assets/'+name+'_CodingIcon.png';img.alt=labels[name]||name;}});
 document.getElementById('exit-ticket-signal').hidden=id!=='exit';history.replaceState(null,'','#'+id);updateControl();window.scrollTo({top:0,behavior:'instant'});
}
function next(){const page=document.getElementById(current);
 if(current==='you-do'){location.href='answers.html';return;}
 if(current==='i-do'){const stage=page.querySelector('.model-stage[hidden]');if(stage){stage.hidden=false;updateControl();stage.scrollIntoView({block:'start'});return;}}
 if(current==='vocabulary'){const dd=page.querySelector('.vocab-card [data-answer][hidden]');if(dd){dd.hidden=false;dd.parentElement.querySelector('.vocab-blank').hidden=true;updateControl();return;}}
 const answers=[...page.querySelectorAll('details.answers:not([open])')];if(answers.length){answers.forEach(d=>d.open=true);updateControl();return;}
 showPage(order[(order.indexOf(current)+1)%order.length]);
}
nav.forEach(b=>b.addEventListener('click',()=>showPage(b.dataset.page)));
advance.addEventListener('click',next);document.getElementById('previous').addEventListener('click',()=>showPage(order[Math.max(0,order.indexOf(current)-1)]));
document.querySelectorAll('details.answers').forEach(d=>d.addEventListener('toggle',updateControl));
document.addEventListener('keydown',e=>{if(e.target.closest('button,a,input,textarea,select,summary')||e.altKey||e.ctrlKey||e.metaKey)return;if(e.key==='ArrowRight'){e.preventDefault();next();}if(e.key==='ArrowLeft'){e.preventDefault();showPage(order[Math.max(0,order.indexOf(current)-1)]);}});
showPage(location.hash.slice(1)||'do-now');

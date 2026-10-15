/* RHSC H446: shared optional Catch Up / Exam Practice teaching phases.
   A phase is registered only when its lesson-folder JSON contains usable material.
   JSON is the single source for classroom questions and printed worksheets. */
(()=>{
'use strict';
const bridge=window.H446OptionalBridge;
if(!bridge)return;
const match=location.pathname.match(/\/lessons\/h446\/lesson-(\d{3})(?:\/|\.html|$)/i);
if(!match)return;
const lesson=match[1];
const types=['catch-up','exam-practice'];
const state={};
const enc=v=>String(v??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const colour=value=>value==='blue'?'#2d78ad':'#bd7a27';
const phrase=(value,fallback='')=>typeof value==='string'?value:fallback;
function normalise(type,data){
 if(!data||typeof data!=='object')return null;
 const rows=type==='exam-practice'?data.questions:(data.items||data.resources||data.questions);
 if(!Array.isArray(rows))return null;
 const entries=rows.filter(item=>item&&typeof item==='object'&&(
   typeof item.prompt==='string'||typeof item.task==='string'||typeof item.description==='string'||typeof item.title==='string'
 )).map(item=>({
  ...item,prompt:phrase(item.prompt,phrase(item.task,phrase(item.description,phrase(item.title)))),
  title:phrase(item.title,type==='catch-up'?'Catch-up task':'Exam question'),
  answer:phrase(item.answer,phrase(item.modelAnswer,'')),
  steps:Array.isArray(item.steps)?item.steps.filter(x=>typeof x==='string'):[],
  marksBreak:Array.isArray(item.marksBreak)?item.marksBreak.filter(x=>typeof x==='string'):[],
  groups:Array.isArray(item.groups)?item.groups:[],
  url:phrase(item.url,phrase(item.link,'')),
 }));
 if(!entries.length)return null;
 return {title:phrase(data.topic,phrase(data.title,type==='catch-up'?'Catch Up':'Exam Practice')),intro:phrase(data.intro,''),entries};
}
function figure(q,grouped){
 if(!Array.isArray(q.values)||!Array.isArray(q.rows)||!Array.isArray(q.cols))return '';
 if(!q.rows.length||!q.cols.length||q.values.length!==q.rows.length||q.values.some(row=>!Array.isArray(row)||row.length!==q.cols.length))return '';
 const x=76,y=76,cw=67,rh=47,width=x+q.cols.length*cw+20,height=y+q.rows.length*rh+48;
 const text=(tx,ty,value,extra='')=>'<text x="'+tx+'" y="'+ty+'" text-anchor="middle" '+extra+'>'+enc(value)+'</text>';
 let html='<svg viewBox="0 0 '+width+' '+height+'" role="img" aria-label="'+(grouped?'Worked grouping':'Blank grouping')+' for Karnaugh map">';
 html+=text(x+q.cols.length*cw/2,19,phrase(q.colName,'Column')+' columns','font-family="Arial" font-size="15" font-weight="800" fill="#21573f"');
 html+=text(32,58,phrase(q.rowName,'Row')+' rows','font-family="Arial" font-size="13" font-weight="800" fill="#21573f"');
 q.cols.forEach((label,c)=>html+=text(x+cw*(c+.5),58,label,'font-family="Arial" font-size="17" font-weight="800" fill="#174831"'));
 q.rows.forEach((label,r)=>{
  html+=text(45,y+rh*(r+.62),label,'font-family="Arial" font-size="17" font-weight="800" fill="#174831"');
  q.values[r].forEach((bit,c)=>{
   const cx=x+c*cw,cy=y+r*rh;
   html+='<rect x="'+cx+'" y="'+cy+'" width="'+cw+'" height="'+rh+'" fill="'+(bit?'#e1f0e6':'#fff')+'" stroke="#83a492" stroke-width="1.5"/>';
   html+=text(cx+cw/2,cy+rh*.67,bit,'font-family="Consolas,monospace" font-size="27" font-weight="900" fill="#174831"');
  });
 });
 if(grouped)q.groups.forEach(g=>{
  if(!Array.isArray(g.boxes))return;
  g.boxes.forEach(b=>{
   if(!Array.isArray(b)||b.length!==4)return;
   const [r0,r1,c0,c1]=b;
   if(![r0,r1,c0,c1].every(Number.isInteger))return;
   html+='<rect x="'+(x+c0*cw+4)+'" y="'+(y+r0*rh+4)+'" width="'+((c1-c0+1)*cw-8)+'" height="'+((r1-r0+1)*rh-8)+'" rx="8" fill="none" stroke="'+colour(g.colour)+'" stroke-width="4.5"/>';
  });
 });
 if(grouped&&(q.id===2||q.id===4))html+=text(x+q.cols.length*cw/2,height-8,'SAME COLOUR = ONE WRAPAROUND GROUP','font-family="Arial" font-size="11" font-weight="800" fill="#a3621c"');
 return html+'</svg>';
}
function bullets(array,tag='ol'){return '<'+tag+'>'+array.map(x=>'<li>'+enc(x)+'</li>').join('')+'</'+tag+'>';}
function render(type,scroll=false){
 const info=state[type];
 if(!info)return;
 const q=info.entries[info.index];
 const panel=info.section;
 const prompt=panel.querySelector('.optional-question');
 const answer=panel.querySelector('.optional-answer');
 panel.querySelector('.optional-index').textContent='QUESTION '+(info.index+1)+' OF '+info.entries.length+(Number.isFinite(q.marks)?' · '+q.marks+' MARKS':'');
 panel.querySelector('.optional-title').textContent=q.title;
 panel.querySelector('.optional-prompt').textContent=q.prompt;
 const image=panel.querySelector('.optional-map');
 image.innerHTML=figure(q,false);
 image.hidden=!image.innerHTML;
 const hint=panel.querySelector('.optional-intro');
 hint.textContent=info.intro;
 hint.hidden=!info.intro;
 const out=panel.querySelector('.optional-answer-content');
 const label=panel.querySelector('.optional-answer-label');
 let display='';
 if(info.stage===0){
  label.textContent='MODEL ANSWER · HIDDEN';
  display='<div class="optional-answer-blank"><strong>Answer hidden</strong><p>Attempt the question first. Use Continue to reveal the worked solution.</p></div>';
 }else if(info.stage===1){
  label.textContent='REVEAL 1 · '+(q.groups.length?'GROUPINGS':'MODEL ANSWER');
  if(q.groups.length){
   display='<h2>Correct groupings</h2>'+figure(q,true)+q.groups.map(g=>'<p class="optional-group '+(g.colour==='blue'?'blue':'')+'"><strong>'+enc(g.label)+'</strong> '+enc(g.explanation)+'</p>').join('');
  }else{
   display='<h2>Model answer</h2>'+(q.answer?'<div class="optional-expression">'+enc(q.answer)+'</div>':'<p>No model answer supplied.</p>');
  }
 }
 if(info.stage===2){
  label.textContent='REVEAL 2 · WORKED EXPLANATION';
  display='<h2>Explain the method</h2>'+(q.answer?'<div class="optional-expression">'+enc(q.answer)+'</div>':'')+(q.steps.length?bullets(q.steps):'<p>Compare your solution with the model answer.</p>');
 }
 if(info.stage===3){
  label.textContent='REVEAL 3 · MARKING POINTS';
  display='<h2>Self-mark your work</h2>'+(q.answer?'<div class="optional-expression">'+enc(q.answer)+'</div>':'')+bullets(q.marksBreak,'ul');
 }
 if(q.url){
  const safe=/^(?:https:\/\/|http:\/\/|\.\/|\/|[A-Za-z0-9_-]+(?:\/|\.))/i.test(q.url) && !/^\/\//.test(q.url);
  if(safe)display+='<p><a class="optional-resource-link" href="'+enc(q.url)+'" target="_blank" rel="noopener">Open supporting resource ↗</a></p>';
 }
 out.innerHTML=display;
 panel.querySelector('.optional-step-status').textContent=info.stage===0?'Answer hidden':'Answer step '+info.stage+' of '+info.maxStage;
 if(scroll&&matchMedia('(max-width:700px)').matches){
  requestAnimationFrame(()=>{(info.stage===0?prompt:answer).scrollIntoView({block:'start',behavior:'instant'});});
 }
}
function maxStage(q){return q.marksBreak.length?3:q.steps.length?2:1;}
window.H446Optional={
 reset(type){const s=state[type];if(!s)return;s.index=0;s.stage=0;s.maxStage=maxStage(s.entries[0]);render(type);},
 showLast(type){const s=state[type];if(!s)return;s.index=s.entries.length-1;s.stage=maxStage(s.entries[s.index]);s.maxStage=s.stage;render(type);},
 step(type,direction){
  const s=state[type];
  if(!s)return false;
  if(direction>0){
   if(s.stage<s.maxStage)s.stage++;
   else if(s.index<s.entries.length-1){s.index++;s.stage=0;}
   else return false;
  }else{
   if(s.stage>0)s.stage--;
   else if(s.index>0){s.index--;s.stage=maxStage(s.entries[s.index]);}
   else return false;
  }
  s.maxStage=maxStage(s.entries[s.index]);render(type,true);return true;
 },
 nextLabel(type){
  const s=state[type];if(!s)return 'Continue →';
  if(s.stage===0)return s.entries[s.index].groups.length?'Reveal groupings →':'Reveal model answer →';
  if(s.stage===1&&s.maxStage>=2)return 'Reveal explanation →';
  if(s.stage===2&&s.maxStage>=3)return 'Reveal mark scheme →';
  if(s.index<s.entries.length-1)return 'Next question →';
  const order=['catch-up','exam-practice'];
  const next=type==='catch-up'&&state['exam-practice']?'Exam Practice':'Key Vocabulary';
  return 'Continue → '+next;
 }
};
function install(type,data){
 const info=normalise(type,data);
 if(!info)return;
 const section=document.createElement('section');
 section.className='page phase-optional';section.id=type;
 section.dataset.phaseTime='Optional · independent practice';
 section.innerHTML='<div class="optional-heading"><div><span class="phase-tag">L'+lesson+' · '+(type==='catch-up'?'CATCH UP':'EXAM PRACTICE')+'</span><h1>'+enc(info.title)+'</h1></div>'+
 '<a class="optional-print-link" href="../../../assets/h446-lesson/optional-worksheet.html?lesson='+lesson+'&type='+type+'" target="_blank" rel="noopener">Printable worksheet ↗</a></div>'+
 '<div class="optional-columns"><article class="optional-question"><span class="optional-index">QUESTION 1</span><h2 class="optional-title"></h2><p class="optional-prompt"></p><div class="optional-map"></div><p class="optional-intro"></p></article>'+
 '<article class="optional-answer"><span class="optional-answer-label">MODEL ANSWER · HIDDEN</span><div class="optional-answer-content"></div></article></div>'+
 '<div class="optional-foot"><span class="optional-step-status">Answer hidden</span><button type="button" class="optional-skip">Skip optional practice →</button></div>';
 const button=document.createElement('button');button.type='button';button.dataset.page=type;button.textContent=type==='catch-up'?'Catch Up':'Exam Practice';
 const prepared={...info,index:0,stage:0,maxStage:maxStage(info.entries[0]),section};
 if(!bridge.register(type,section,button))return;
 state[type]=prepared;
 section.querySelector('.optional-skip').addEventListener('click',()=>{
  const next=type==='catch-up'&&state['exam-practice']?'exam-practice':'vocabulary';
  bridge.go(next);
 });
 render(type);
 bridge.refresh();
}
function load(type){
 return fetch(type+'.json',{cache:'no-cache'}).then(res=>res.ok?res.json():null).then(data=>{if(data)install(type,data);}).catch(()=>{});
}
const link=document.createElement('link');link.rel='stylesheet';link.href='../../../assets/h446-lesson/optional-resources.css?v=20261015-optionalh4461';document.head.append(link);
Promise.all(types.map(load)).then(()=>{});
})();
(()=>{
'use strict';
const p=new URLSearchParams(location.search);
const lesson=p.get('lesson')||'';
const type=p.get('type')||'';
const root=document.getElementById('root');
const allowed=['catch-up','exam-practice'];
if(!/^\d{3}$/.test(lesson)||!allowed.includes(type)){root.innerHTML='<h1>Worksheet unavailable</h1><p>Please open the resource from the relevant lesson.</p>';return;}
const enc=v=>String(v??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const back='../../lessons/h446/lesson-'+lesson+'/index.html#'+type;
document.getElementById('backLesson').href=back;
document.getElementById('locationLabel').textContent='L'+lesson+' · '+(type==='exam-practice'?'Exam Practice':'Catch Up');
document.getElementById('printQuestions').addEventListener('click',()=>{document.body.classList.remove('print-answers');window.print();});
let shown=p.get('answers')==='1';
function diagram(item,grouped){
 if(!Array.isArray(item.values)||!Array.isArray(item.rows)||!Array.isArray(item.cols))return '';
 const x=65,y=62,cw=56,rh=41,w=x+item.cols.length*cw+16,h=y+item.rows.length*rh+33;
 const t=(xx,yy,txt)=>'<text x="'+xx+'" y="'+yy+'" font-family="Arial" font-size="14" font-weight="800" fill="#24543c" text-anchor="middle">'+enc(txt)+'</text>';
 let out='<svg viewBox="0 0 '+w+' '+h+'" role="img" aria-label="Karnaugh map '+(grouped?'worked grouping':'question')+'">';
 out+=t(24,49,item.rowName||'Row')+t(x+item.cols.length*cw/2,20,item.colName||'Columns');
 item.cols.forEach((n,c)=>out+=t(x+(c+.5)*cw,51,n));
 item.rows.forEach((n,r)=>{
  out+=t(45,y+(r+.64)*rh,n);
  item.values[r].forEach((bit,c)=>{
   out+='<rect x="'+(x+c*cw)+'" y="'+(y+r*rh)+'" width="'+cw+'" height="'+rh+'" fill="'+(bit?'#e5f3e9':'white')+'" stroke="#8daa99"/>';
   out+='<text x="'+(x+(c+.5)*cw)+'" y="'+(y+(r+.67)*rh)+'" text-anchor="middle" font-size="22" fill="#174b36" font-weight="900">'+enc(bit)+'</text>';
  });
 });
 if(grouped&&(item.groups||[]).length){
  item.groups.forEach(g=>(g.boxes||[]).forEach(b=>{
   const [r0,r1,c0,c1]=b;
   out+='<rect x="'+(x+c0*cw+4)+'" y="'+(y+r0*rh+4)+'" width="'+((c1-c0+1)*cw-8)+'" height="'+((r1-r0+1)*rh-8)+'" rx="7" fill="none" stroke="'+(g.colour==='blue'?'#2d78ad':'#b77725')+'" stroke-width="4"/>';
  }));
 }
 return out+'</svg>';
}
function entry(q,i,answers){
 const task=enc(q.prompt||q.task||q.description||q.title||'');
 const map=diagram(q,answers);
 const solution=answers?'<div class="answer-area">'+(q.answer?'<p class="expr">'+enc(q.answer)+'</p>':'')+
 (Array.isArray(q.steps)?'<ol>'+q.steps.map(x=>'<li>'+enc(x)+'</li>').join('')+'</ol>':'')+
 (Array.isArray(q.marksBreak)?'<p><strong>Marking points</strong></p><ul>'+q.marksBreak.map(x=>'<li>'+enc(x)+'</li>').join('')+'</ul>':'')+'</div>':
 '<div><strong>Show your working</strong><div class="working"></div></div>';
 return '<article class="paper-question"><div class="paper-meta"><span>QUESTION '+(i+1)+'</span><span>'+(q.marks||'')+(q.marks?' MARKS':'')+'</span></div><h2>'+enc(q.title||'Practice task')+'</h2><p>'+task+'</p>'+
 '<div class="paper-cols"><figure>'+map+'</figure>'+solution+'</div></article>';
}
fetch('../../lessons/h446/lesson-'+lesson+'/'+type+'.json',{cache:'no-cache'}).then(r=>{if(!r.ok)throw Error('Resource unavailable');return r.json()}).then(data=>{
 const qs=type==='exam-practice'?data.questions:(data.items||data.resources||data.questions);
 if(!Array.isArray(qs)||!qs.length)throw Error('No questions available');
 const clean=qs.filter(q=>q&&typeof q==='object'&&(q.prompt||q.task||q.description||q.title));
 if(!clean.length)throw Error('No practice material');
 const total=clean.reduce((sum,q)=>sum+(Number(q.marks)||0),0);
 document.title='L'+lesson+' · '+(type==='exam-practice'?'Exam Practice':'Catch Up')+' Worksheet';
 root.innerHTML='<div class="intro"><span class="kicker">OCR H446 · LESSON '+lesson+' · '+(type==='exam-practice'?'EXAM PRACTICE':'CATCH UP')+'</span><h1>'+enc(data.topic||data.title||'Independent Practice')+'</h1><p>'+enc(data.intro||'Complete each question before revealing the worked answers.')+'</p><p>Name: _________________________ &nbsp; Date: _______________ &nbsp; '+(total?total+' marks':'')+'</p></div>'+
 '<section class="questions">'+clean.map((q,i)=>entry(q,i,false)).join('')+'</section>'+
 '<div class="answer-toggle"><div><strong>Finished? Self-mark your answers</strong><p>Attempt all questions first.</p></div><button type="button" id="toggle">'+(shown?'Hide worked answers':'Reveal worked answers')+'</button></div>'+
 '<section class="model-section" id="models" '+(shown?'':'hidden')+'><h2>Worked answers</h2><button type="button" id="printAnswers">Print answer sheet</button>'+clean.map((q,i)=>entry(q,i,true)).join('')+'</section>';
 document.getElementById('toggle').addEventListener('click',()=>{
  shown=!shown;document.getElementById('models').hidden=!shown;
  document.getElementById('toggle').textContent=shown?'Hide worked answers':'Reveal worked answers';
 });
 document.getElementById('printAnswers').addEventListener('click',()=>{
  document.body.classList.add('print-answers');window.print();
 });
 window.addEventListener('afterprint',()=>document.body.classList.remove('print-answers'));
}).catch(()=>root.innerHTML='<h1>Worksheet unavailable</h1><p>There is no published worksheet for this lesson yet. <a href="'+enc(back)+'">Return to lesson</a>.</p>');
})();
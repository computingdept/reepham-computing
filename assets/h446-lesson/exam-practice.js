
(()=>{
 'use strict';
 const bank=window.RHSCExamPractice;
 if(!bank||!Array.isArray(bank.questions))throw Error('Exam practice questions were not loaded.');
 const esc=x=>String(x).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
 const view=new URLSearchParams(location.search).get('view')||'tv';
 const page=['tv','worksheet','answers'].includes(view)?view:'tv';
 let index=0,stage=0;
 const root=document.querySelector('#practice-root');
 const go=(name)=>'exam-practice.html?view='+name;
 const total=bank.questions.reduce((sum,q)=>sum+q.marks,0);
 const header=document.querySelector('#current-view');
 if(header)header.textContent=page==='tv'?'CLASSROOM TV':page==='worksheet'?'PRINTABLE WORKSHEET':'WORKED ANSWERS';
 document.title='Lesson '+bank.lesson+' · '+(page==='worksheet'?'K-map worksheet':page==='answers'?'K-map worked answers':'K-map exam practice');
 const colour=n=>n==='blue'?'#2d78ad':'#bd7a27';
 function mapSVG(q,showGroups){
   const x=76,y=76,cw=67,rh=47,w=x+q.cols.length*cw+20,h=y+q.rows.length*rh+54;
   const text=(tx,ty,value,extra='')=>'<text x="'+tx+'" y="'+ty+'" text-anchor="middle" '+extra+'>'+esc(value)+'</text>';
   let html='<svg viewBox="0 0 '+w+' '+h+'" role="img" aria-label="'+esc(q.rowName)+' rows and '+esc(q.colName)+' columns Karnaugh map for question '+q.id+'">';
   html+=text(x+q.cols.length*cw/2,20,q.colName+' columns','fill="#265b40" font-family="Arial" font-size="15" font-weight="800"');
   html+=text(31,59,q.rowName+' rows','fill="#265b40" font-family="Arial" font-size="13" font-weight="800"');
   q.cols.forEach((v,c)=>html+=text(x+cw*(c+.5),60,v,'fill="#1c4a36" font-family="Arial" font-size="17" font-weight="800"'));
   q.rows.forEach((v,r)=>{
     html+=text(45,y+rh*(r+.62),v,'fill="#1c4a36" font-family="Arial" font-size="17" font-weight="800"');
     q.values[r].forEach((bit,c)=>{
       const cx=x+c*cw,ry=y+r*rh;
       html+='<rect x="'+cx+'" y="'+ry+'" width="'+cw+'" height="'+rh+'" fill="'+(bit?'#e1f0e6':'#fff')+'" stroke="#83a492" stroke-width="1.5"/>';
       html+=text(cx+cw/2,ry+rh*.67,bit,'fill="#194633" font-family="Consolas,monospace" font-size="27" font-weight="900"');
     });
   });
   if(showGroups){
     q.groups.forEach(group=>{
       group.boxes.forEach(([r0,r1,c0,c1])=>{
         html+='<rect x="'+(x+c0*cw+4)+'" y="'+(y+r0*rh+4)+'" width="'+((c1-c0+1)*cw-8)+'" height="'+((r1-r0+1)*rh-8)+'" rx="8" fill="none" stroke="'+colour(group.colour)+'" stroke-width="4.5"/>';
       });
     });
     if(q.id===2||q.id===4)html+=text(x+q.cols.length*cw/2,h-12,'SAME COLOUR = ONE WRAPAROUND GROUP','fill="#a3621c" font-family="Arial" font-size="11" font-weight="850"');
   }
   return html+'</svg>';
 }
 function fig(q,grouped){return '<figure class="mapframe">'+mapSVG(q,grouped)+'<figcaption>'+(grouped?'Correct grouping outlined: each colour represents one group.':'Original map — circle your own groups.')+'</figcaption></figure>'}
 function steps(q){return '<ol>'+q.steps.map(t=>'<li>'+esc(t)+'</li>').join('')+'</ol>'}
 function marking(q){return '<ul>'+q.marksBreak.map(t=>'<li>'+esc(t)+'</li>').join('')+'</ul>'}
 function renderTV(){
   const q=bank.questions[index];
   let rhs='';
   if(stage===0)rhs='<h2>Your turn · work independently</h2><p>Start with the biggest valid groups. Circle each group, keep the unchanged inputs and write the expression.</p><p><strong>Answers stay hidden until the teacher reveals them.</strong></p><p class="note">Try it on your whiteboard or printed worksheet first.</p>';
   else if(stage===1)rhs='<h2>Reveal 1 · Correct group(s)</h2>'+q.groups.map(g=>'<p><strong style="color:'+colour(g.colour)+'">'+esc(g.label)+'</strong> — '+esc(g.explanation)+'</p>').join('');
   else if(stage===2)rhs='<h2>Reveal 2 · Simplify and explain</h2><div class="expression">'+esc(q.answer)+'</div>'+steps(q);
   else rhs='<h2>Reveal 3 · Mark scheme</h2><div class="expression">'+esc(q.answer)+'</div>'+marking(q);
   root.innerHTML='<div class="topline"><span class="eyebrow">LESSON '+bank.lesson+' · OPTIONAL EXAM PRACTICE</span><span class="progress">Question '+(index+1)+' / '+bank.questions.length+' · '+q.marks+' marks</span></div>'+
     '<h1>'+esc(q.title)+'</h1><nav class="question-selector" aria-label="Select a practice question">'+bank.questions.map((p,i)=>'<button type="button" data-q="'+i+'" aria-current="'+(i===index)+'">'+p.id+' · '+esc(p.level)+'</button>').join('')+'</nav>'+
     '<div class="tv-grid"><section class="tv-panel question"><span class="label">LEFT · QUESTION · '+esc(q.level)+'</span><p class="prompt">'+esc(q.prompt)+'</p>'+fig(q,stage>=1)+'</section>'+
     '<section class="tv-panel solution"><span class="label">RIGHT · '+(stage===0?'HIDDEN ANSWER':'MODEL ANSWER')+'</span><div class="solution-stage" aria-live="polite">'+rhs+'</div></section></div>'+
     '<div class="teacher-controls"><button type="button" id="previousStage" '+(index===0&&stage===0?'disabled':'')+'>← Back</button><span class="progress">Step '+stage+' / 3</span><button type="button" class="forward" id="nextStage">'+(stage<3?'Reveal next →':index<bank.questions.length-1?'Next question →':'Restart →')+'</button></div>';
   root.querySelectorAll('[data-q]').forEach(b=>b.addEventListener('click',()=>{index=Number(b.dataset.q);stage=0;renderTV()}));
   root.querySelector('#previousStage').addEventListener('click',previous);
   root.querySelector('#nextStage').addEventListener('click',next);
 }
 function questionHTML(q,answers){
   const right=answers?'<div class="worked-panel"><strong>Model answer</strong><div class="expression">'+esc(q.answer)+'</div>'+steps(q)+'<strong>Marking · '+q.marks+' marks</strong>'+marking(q)+'</div>':'<div><strong>Show your groupings and working:</strong><div class="answer-lines" aria-label="Space for working"></div><p>Q = _________________________________</p></div>';
   return '<article class="print-question"><div class="topline"><span class="label">QUESTION '+q.id+' · '+esc(q.level)+'</span><strong>'+q.marks+' marks</strong></div><h2>'+esc(q.title)+'</h2><p class="prompt">'+esc(q.prompt)+'</p><div class="question-flex"><div>'+fig(q,answers)+'</div>'+right+'</div></article>';
 }
 function renderPrint(answers){
   root.innerHTML='<div class="print-intro"><span class="eyebrow">OCR H446 · LESSON '+bank.lesson+' · '+(answers?'SELF-MARKING':'OPTIONAL PRACTICE')+'</span><h1>Karnaugh Maps — '+(answers?'Worked Answers':'Exam Practice Worksheet')+'</h1><p class="intro">'+(answers?'Compare the groups, reasoning and simplified expressions before awarding marks.':'Complete your lesson You Do first. Then choose questions to attempt. Circle your groups on each map and show all working.')+' <strong>'+total+' marks across four questions.</strong></p><p>Name: ___________________________  Date: ___________________</p></div>'+bank.questions.map(q=>questionHTML(q,answers)).join('');
 }
 function next(){if(stage<3)stage++;else if(index<bank.questions.length-1){index++;stage=0}else{index=0;stage=0}renderTV()}
 function previous(){if(stage>0)stage--;else if(index>0){index--;stage=3}renderTV()}
 if(page==='tv'){renderTV();document.addEventListener('keydown',e=>{
   if(e.altKey||e.ctrlKey||e.metaKey||e.target.closest('a,button,input,textarea,select'))return;
   if(e.key==='ArrowRight'){e.preventDefault();next()}
   if(e.key==='ArrowLeft'){e.preventDefault();previous()}
 });}
 else renderPrint(page==='answers');
 const print=document.querySelector('#printAction');
 if(print)print.addEventListener('click',()=>window.print());
 const worksheet=document.querySelector('#worksheetLink');
 if(worksheet)worksheet.setAttribute('href',go('worksheet'));
 const solutions=document.querySelector('#answersLink');
 if(solutions)solutions.setAttribute('href',go('answers'));
 const tv=document.querySelector('#tvLink');
 if(tv)tv.setAttribute('href',go('tv'));
})();

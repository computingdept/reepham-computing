
(()=>{
 'use strict';
 const bank=window.RHSCExamPractice;
 if(!bank||!Array.isArray(bank.questions)||!bank.questions.length)throw Error('Exam practice question bank not available.');
 const params=new URLSearchParams(location.search);
 const requested=params.get('view')||'tv';
 // Old answer links remain usable, but worked answers now live inside the worksheet.
 const page=requested==='answers'?'worksheet':requested==='worksheet'?'worksheet':'tv';
 const initiallyShowAnswers=requested==='answers'||params.get('answers')==='1';
 const root=document.querySelector('#practice-root');
 const total=bank.questions.reduce((s,q)=>s+q.marks,0);
 let questionIndex=0,revealStep=0;
 let showAnswers=initiallyShowAnswers;
 const enc=x=>String(x).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
 const colour=c=>c==='blue'?'#2d78ad':'#bd7a27';
 const modeHelp=document.querySelector('#modeHelp');
 if(modeHelp)modeHelp.textContent=page==='tv'?'Question on the left · reveal steps on the right':'Print a worksheet · self-mark when finished';
 document.querySelectorAll('[data-mode]').forEach(link=>link.setAttribute('aria-current',link.dataset.mode===page?'page':'false'));
 document.title='Lesson '+bank.lesson+' · '+(page==='tv'?'Classroom TV Exam Practice':'Student Exam Practice Worksheet');
 function mapSVG(q,grouped){
  const x=76,y=71,cw=67,rh=47,w=x+q.cols.length*cw+20,h=y+q.rows.length*rh+49;
  const txt=(tx,ty,val,extra='')=>'<text x="'+tx+'" y="'+ty+'" text-anchor="middle" '+extra+'>'+enc(val)+'</text>';
  let html='<svg viewBox="0 0 '+w+' '+h+'" role="img" aria-label="Karnaugh map question '+q.id+(grouped?' with correct groupings':' without groups')+'">';
  html+=txt(x+q.cols.length*cw/2,18,q.colName+' columns','fill="#265b40" font-family="Arial" font-size="15" font-weight="800"');
  html+=txt(35,56,q.rowName+' rows','fill="#265b40" font-family="Arial" font-size="13" font-weight="800"');
  q.cols.forEach((value,i)=>html+=txt(x+cw*(i+.5),57,value,'fill="#1c4a36" font-family="Arial" font-size="17" font-weight="800"'));
  q.rows.forEach((value,r)=>{
   html+=txt(46,y+rh*(r+.62),value,'fill="#1c4a36" font-family="Arial" font-size="17" font-weight="800"');
   q.values[r].forEach((bit,c)=>{
    const xx=x+c*cw,yy=y+r*rh;
    html+='<rect x="'+xx+'" y="'+yy+'" width="'+cw+'" height="'+rh+'" fill="'+(bit?'#e1f0e6':'#fff')+'" stroke="#83a492" stroke-width="1.5"/>';
    html+=txt(xx+cw/2,yy+rh*.67,bit,'fill="#194633" font-family="Consolas,monospace" font-size="27" font-weight="900"');
   });
  });
  if(grouped){
   q.groups.forEach(g=>g.boxes.forEach(([r0,r1,c0,c1])=>{
    html+='<rect x="'+(x+c0*cw+4)+'" y="'+(y+r0*rh+4)+'" width="'+((c1-c0+1)*cw-8)+'" height="'+((r1-r0+1)*rh-8)+'" rx="8" fill="none" stroke="'+colour(g.colour)+'" stroke-width="4.5"/>';
   }));
   if(q.id===2||q.id===4)html+=txt(x+q.cols.length*cw/2,h-10,'SAME COLOUR = ONE WRAPAROUND GROUP','fill="#986325" font-family="Arial" font-size="11" font-weight="850"');
  }
  return html+'</svg>';
 }
 const fig=(q,grouped)=>'<figure class="mapframe">'+mapSVG(q,grouped)+'<figcaption>'+(grouped?'Answer: correct group(s) outlined. Matching colours show one wraparound group.':'Question: draw your own groups on the map.')+'</figcaption></figure>';
 const steps=q=>'<ol>'+q.steps.map(x=>'<li>'+enc(x)+'</li>').join('')+'</ol>';
 const marks=q=>'<ul>'+q.marksBreak.map(x=>'<li>'+enc(x)+'</li>').join('')+'</ul>';
 function teacherSolution(q){
  if(revealStep===0)return '<div class="solution-blank" aria-label="Answer hidden"><svg width="49" height="49" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M3 3l18 18M10.6 5.1a10.7 10.7 0 0 1 1.4-.1c5 0 8.8 4 10 7a13.7 13.7 0 0 1-4 5.1M7.4 7.4A13.3 13.3 0 0 0 2 12c1.2 3 5 7 10 7a10 10 0 0 0 4.1-.8"/></svg><h2>Answer hidden</h2><p>Let pupils attempt the map before revealing the first step.</p></div>';
  let html='<div class="solution-inner"><h2>'+(revealStep===1?'Step 1 · Show groupings':revealStep===2?'Step 2 · Simplify':'Step 3 · Check marks')+'</h2>';
  if(revealStep===1){
   html+=fig(q,true)+q.groups.map(g=>'<p class="group-description'+(g.colour==='blue'?' blue':'')+'"><strong>'+enc(g.label)+':</strong> '+enc(g.explanation)+'</p>').join('');
  }else{
   html+='<div class="expression">'+enc(q.answer)+'</div>';
   if(revealStep===2)html+=steps(q);
   else html+='<p><strong>Marking points · '+q.marks+' marks</strong></p>'+marks(q);
  }
  return html+'</div>';
 }
 function renderTV(){
  const q=bank.questions[questionIndex];
  root.innerHTML='<div class="tv-head"><span class="eyebrow">LESSON '+enc(bank.lesson)+' · OPTIONAL EXAM PRACTICE</span><span class="counter">QUESTION '+(questionIndex+1)+' OF '+bank.questions.length+' · '+q.marks+' MARKS</span></div>'+
  '<h1>'+enc(q.title)+'</h1>'+
  '<div class="tv-layout"><section class="tv-panel question" aria-labelledby="questionTitle"><span class="panel-label">QUESTION · '+enc(q.level)+'</span><p class="prompt" id="questionTitle">'+enc(q.prompt)+'</p>'+fig(q,false)+'</section>'+
  '<section class="tv-panel solution" id="solutionPanel" aria-label="Teacher-controlled worked answer"><span class="panel-label">MODEL ANSWER · '+(revealStep===0?'HIDDEN':'REVEAL '+revealStep+' OF 3')+'</span>'+teacherSolution(q)+'</section></div>'+
  '<nav class="tv-controls" aria-label="Exam practice question controls"><button type="button" id="previousStep" '+(questionIndex===0&&revealStep===0?'disabled':'')+'>← Previous</button>'+
  '<span class="step-status">Step '+revealStep+' of 3</span>'+
  '<button type="button" class="next" id="nextStep">'+(revealStep===0?'Show groupings →':revealStep===1?'Show expression →':revealStep===2?'Show mark scheme →':questionIndex===bank.questions.length-1?'Start again ↺':'Next question →')+'</button></nav>';
  root.querySelector('#previousStep').addEventListener('click',()=>step(-1));
  root.querySelector('#nextStep').addEventListener('click',()=>step(1));
 }
 function step(direction){
  if(direction>0){
   if(revealStep<3)revealStep++;
   else if(questionIndex<bank.questions.length-1){questionIndex++;revealStep=0;}
   else{questionIndex=0;revealStep=0;}
  }else{
   if(revealStep>0)revealStep--;
   else if(questionIndex>0){questionIndex--;revealStep=3;}
  }
  renderTV();
  if(window.matchMedia('(max-width: 850px)').matches){
   const target=document.querySelector(revealStep>0?'#solutionPanel':'.tv-head');
   if(target)target.scrollIntoView({block:'start',behavior:'instant'});
  }
 }
 function questionHTML(q){
  return '<article class="sheet-question"><div class="question-meta"><span class="eyebrow">QUESTION '+q.id+' · '+enc(q.level)+'</span><strong>'+q.marks+' MARKS</strong></div>'+
   '<h2>'+enc(q.title)+'</h2><p class="prompt">'+enc(q.prompt)+'</p>'+
   '<div class="sheet-grid"><div>'+fig(q,false)+'</div><div><strong>Show your groupings and working</strong><div class="working-area" aria-label="Space for showing working"></div><p>Q = __________________________________</p></div></div></article>';
 }
 function answerHTML(q){
  return '<article class="sheet-question"><div class="question-meta"><span class="eyebrow">WORKED ANSWER · QUESTION '+q.id+'</span><strong>'+q.marks+' MARKS</strong></div><h2>'+enc(q.title)+'</h2>'+
   '<div class="sheet-grid"><div>'+fig(q,true)+'</div><div class="answer-worked"><div class="expression">'+enc(q.answer)+'</div>'+steps(q)+'<strong>Marking points</strong>'+marks(q)+'</div></div></article>';
 }
 function renderWorksheet(){
  root.innerHTML='<section class="worksheet-intro sheet-top"><div><span class="eyebrow">LESSON '+enc(bank.lesson)+' · OPTIONAL STUDENT PRACTICE</span><h1>Karnaugh Maps · Exam Practice</h1><p class="intro">Finish and check your You Do first. Circle the largest groups, write each simplified expression and explain your reasoning. <strong>'+total+' marks across '+bank.questions.length+' questions.</strong></p><p class="print-heading">Name: _________________________ &nbsp; Date: ______________</p></div>'+
   '<div class="sheet-actions"><button type="button" class="primary" id="printQuestions">Print worksheet</button></div></section>'+
   '<section class="worksheet-questions" aria-label="Exam practice questions">'+bank.questions.map(questionHTML).join('')+'</section>'+
   '<div class="answer-reveal-bar"><div><strong>Finished? Self-mark your answers</strong><p>Attempt the questions before opening the worked solutions and marking points.</p></div><button id="toggleAnswers" type="button" aria-controls="answerSections" aria-expanded="'+showAnswers+'">'+(showAnswers?'Hide worked answers':'Reveal worked answers')+'</button></div>'+
   '<section class="answer-sections" id="answerSections" aria-label="Worked model answers" '+(showAnswers?'':'hidden')+'><div class="sheet-top"><div><span class="eyebrow">MODEL ANSWERS</span><h2>Check your groupings and working</h2></div><div class="sheet-actions"><button type="button" id="printAnswers" class="primary">Print answer sheet</button></div></div>'+bank.questions.map(answerHTML).join('')+'</section>';
  root.querySelector('#toggleAnswers').addEventListener('click',()=>{
   showAnswers=!showAnswers;
   const area=root.querySelector('#answerSections'),btn=root.querySelector('#toggleAnswers');
   area.hidden=!showAnswers;
   btn.setAttribute('aria-expanded',String(showAnswers));
   btn.textContent=showAnswers?'Hide worked answers':'Reveal worked answers';
  });
  root.querySelector('#printQuestions').addEventListener('click',()=>printView(false));
  root.querySelector('#printAnswers').addEventListener('click',()=>printView(true));
 }
 function printView(answers){
  document.body.classList.toggle('print-answers',answers);
  window.print();
 }
 window.addEventListener('afterprint',()=>document.body.classList.remove('print-answers'));
 document.addEventListener('keydown',e=>{
  if(page!=='tv'||e.altKey||e.ctrlKey||e.metaKey||e.target.closest('a,button,input,textarea,select'))return;
  if(e.key==='ArrowRight'){e.preventDefault();step(1);}
  if(e.key==='ArrowLeft'){e.preventDefault();step(-1);}
 });
 if(page==='worksheet')renderWorksheet();else renderTV();
})();

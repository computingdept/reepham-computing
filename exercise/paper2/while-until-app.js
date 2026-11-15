/* Skill 09: one-screen WHILE / DO UNTIL practice using the shared Skills UI. */
(function () {
  'use strict';
  const engine=window.J277Paper2WhileUntil;
  const core=window.RHSCSkills;
  if(!engine||!core)throw new Error('WHILE / UNTIL skill scripts did not load.');
  const $=id=>document.getElementById(id);
  const STORAGE_KEY='rhs-j277-paper2-progress-v1';
  const SKILL='while-until';
  const LEVEL_TEXT={easy:'Compare WHILE with DO UNTIL',medium:'Trace the final printed number',hard:'Write condition-controlled loops in OCR ERL'};
  const state={level:'easy',index:0,seed:1,score:0,wrong:0,question:null,response:null,locked:false,modelShown:false};
  let traceTimer=null;
  function stopTrace(){if(traceTimer!==null){clearInterval(traceTimer);traceTimer=null;}}
  const printSvg='<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9V3h12v6"/><rect x="6" y="15" width="12" height="6" rx="1"/><path d="M6 17H3v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6h-3M17 12h.01"/></svg>';

  function readProgress(){
    const all=core.readProgress(STORAGE_KEY);
    const entry=all[SKILL]&&all[SKILL][state.level];
    return entry&&typeof entry==='object'?entry:{solved:0,best:0,sessions:0};
  }
  function updateProgress(key,value){
    const all=core.readProgress(STORAGE_KEY);
    if(!all[SKILL]||typeof all[SKILL]!=='object')all[SKILL]={};
    const old=readProgress();
    all[SKILL][state.level]={
      solved:Number.isSafeInteger(old.solved)&&old.solved>=0?old.solved:0,
      best:Number.isSafeInteger(old.best)&&old.best>=0?old.best:0,
      sessions:Number.isSafeInteger(old.sessions)&&old.sessions>=0?old.sessions:0,
      [key]:value
    };
    core.writeProgress(STORAGE_KEY,all);
  }
  function feedback(message,kind){
    const node=$('feedback');node.textContent=message;node.className='message '+kind;node.hidden=false;
  }
  function resetFeedback(){
    $('feedback').textContent='';$('feedback').hidden=true;
    $('hint-panel').replaceChildren();$('hint-panel').hidden=true;$('hint').textContent='Show hint';
  }
  function codePanel(lines){
    const panel=document.createElement('div');panel.className='code-panel';
    const label=document.createElement('span');label.className='code-label';label.textContent='OCR Exam Reference Language';
    const pre=document.createElement('pre');pre.className='erl loop-code';
    lines.forEach((line,index)=>{
      const row=document.createElement('span');row.className='loop-code-line';
      const number=document.createElement('span');number.className='loop-line-number';number.textContent=String(index+1).padStart(2,'0');number.setAttribute('aria-hidden','true');
      const source=document.createElement('span');source.className='loop-code-text';source.textContent=line;
      row.append(number,source);pre.append(row);
    });
    panel.append(label,pre);return panel;
  }
  function renderEasy(q,work){
    const layout=document.createElement('div');layout.className='for-grid';
    const choices=document.createElement('div');choices.className='for-choices';
    choices.setAttribute('role','group');choices.setAttribute('aria-label','Choose the number of iterations');
    const label=document.createElement('strong');label.className='for-label';label.textContent='How many iterations?';choices.append(label);
    q.options.forEach(option=>{
      const button=document.createElement('button');button.type='button';button.textContent=option;
      button.setAttribute('aria-pressed','false');
      button.addEventListener('click',()=>{
        if(state.locked)return;
        state.response=option;
        choices.querySelectorAll('button').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
      });
      choices.append(button);
    });
    layout.append(codePanel(q.code),choices);work.append(layout);
  }
  function renderMedium(q,work){
    const layout=document.createElement('div');layout.className='for-grid';
    const area=document.createElement('div');area.className='for-answer';
    const label=document.createElement('label');label.className='work-label';label.htmlFor='for-final';label.textContent='Final printed number';
    const input=document.createElement('input');input.className='number-entry';input.id='for-final';input.type='text';
    input.inputMode='numeric';input.autocomplete='off';input.placeholder='?';
    input.addEventListener('input',()=>{state.response=input.value;});
    input.addEventListener('keydown',event=>{if(event.key==='Enter')$('check').click();});
    const note=document.createElement('span');note.className='writer-note';
    note.textContent=q.mode==='while'?'WHILE checks the condition before each iteration.':'DO UNTIL checks the condition after each iteration.';
    area.append(label,input,note);layout.append(codePanel(q.code),area);work.append(layout);
  }
  function renderHard(_,work){
    const area=document.createElement('div');area.className='for-writer';
    const label=document.createElement('label');label.className='work-label';label.htmlFor='for-erl';label.textContent='Your OCR ERL algorithm';
    const input=document.createElement('textarea');input.id='for-erl';input.className='code-entry';input.rows=8;
    input.autocomplete='off';input.autocapitalize='off';input.spellcheck=false;
    input.addEventListener('input',()=>{state.response=input.value;});
    const note=document.createElement('span');note.className='writer-note';
    note.textContent='Use any variable names. Your loop will be checked with multiple inputs, including the boundaries.';
    area.append(label,input,note);work.append(area);
  }
  function renderQuestion(){
    stopTrace();
    state.question=engine.makeQuestion(state.level,state.index,state.seed);
    state.response=null;state.wrong=0;state.locked=false;state.modelShown=false;
    $('question-card').classList.remove('finished','loop-model-open');
    $('prompt').textContent=state.question.prompt;$('context').textContent=state.question.context;
    $('question-position').textContent='Question '+(state.index+1)+' of 10';
    $('meter').setAttribute('aria-valuenow',String(state.index));$('meter-fill').style.width=state.index*10+'%';
    ['check','clear','hint'].forEach(id=>{$(id).hidden=false;});
    $('show-answer').hidden=false;$('show-answer').title='Show the worked model. Revealing before a correct answer earns no mark.';$('next').hidden=true;
    $('next').textContent=state.index===9?'See results →':'Next question →';
    resetFeedback();
    const work=$('workspace');work.replaceChildren();work.classList.toggle('is-hard',state.level==='hard');
    if(state.level==='hard')renderHard(state.question,work);
    else if(state.level==='medium')renderMedium(state.question,work);
    else renderEasy(state.question,work);
  }
  function disableInputs(){
    $('workspace').querySelectorAll('button,input,textarea').forEach(el=>{el.disabled=true;});
    ['check','clear','hint'].forEach(id=>{$(id).hidden=true;});
    $('next').hidden=false;
  }
  function check(){
    if(state.locked)return;
    const result=engine.checkAnswer(state.question,state.response);
    if(!result.complete){
      feedback(state.level==='hard'?'Write the input and complete WHILE or DO UNTIL loop.':'Enter or choose an answer first.','neutral');
      return;
    }
    if(result.correct){
      state.locked=true;state.score++;
      updateProgress('solved',(Number(readProgress().solved)||0)+1);
      feedback('Correct! '+state.question.explanation,'good');disableInputs();return;
    }
    state.wrong++;
    feedback(state.level==='hard'?'Check the stopping condition, update the counter, and close the loop with ENDWHILE or UNTIL.':
      state.level==='medium'?'Trace the loop, remembering when the condition is checked.':'WHILE checks first; DO UNTIL runs before checking.','bad');
  }
  function showModel(){
    if(state.modelShown)return;
    const alreadyCorrect=state.locked;
    state.modelShown=true;
    if(!state.locked){state.locked=true;disableInputs();}
    $('show-answer').hidden=true;
    $('question-card').classList.add('loop-model-open');
    const resultMessage=alreadyCorrect?'Model shown. Your mark is kept.':'Model shown. No mark for this question.';
    if(state.question.trace){renderTrace(state.question);feedback(resultMessage,'neutral');return;}
    const panel=$('hint-panel');const label=document.createElement('strong');label.textContent='Model answer';
    const pre=document.createElement('pre');pre.className='erl';pre.textContent=state.question.model;
    panel.replaceChildren(label,pre);panel.hidden=false;
    feedback(resultMessage,'neutral');
  }
  function renderTrace(q){
    const trace=q.trace;
    const events=trace.events;
    const layout=$('workspace').querySelector('.for-grid');
    if(!layout)return;
    layout.classList.add('loop-reveal-grid');
    const original=layout.children[1];
    const board=document.createElement('section');board.className='loop-trace';board.setAttribute('aria-label','Animated model trace');
    const title=document.createElement('strong');title.className='loop-trace-title';title.textContent='Model trace · '+(trace.mode==='while'?'Check before':'Check after');
    const controls=document.createElement('div');controls.className='loop-trace-controls';
    const play=document.createElement('button'),step=document.createElement('button'),reset=document.createElement('button');
    for(const button of [play,step,reset])button.type='button';
    play.className='loop-trace-play';step.textContent='⏭ Step';reset.textContent='↺ Reset';
    controls.append(play,step,reset);
    const table=document.createElement('table');table.className='loop-trace-table';
    const head=document.createElement('thead');const header=document.createElement('tr');
    ['Line','i',trace.mode==='while'?'WHILE check':'UNTIL check',trace.operation==='ticks'?'Prints':'total'].forEach(label=>{
      const cell=document.createElement('th');cell.textContent=label;header.append(cell);
    });
    head.append(header);table.append(head);
    const body=document.createElement('tbody');table.append(body);
    const scroll=document.createElement('div');scroll.className='loop-trace-scroll';scroll.tabIndex=0;scroll.setAttribute('aria-label','Scroll the model trace table');scroll.append(table);
    const status=document.createElement('p');status.className='loop-trace-status';status.setAttribute('role','status');status.setAttribute('aria-live','polite');
    const output=document.createElement('div');output.className='loop-trace-output';
    const outputLabel=document.createElement('span');outputLabel.textContent=trace.operation==='ticks'?'Total prints':'Printed answer';
    const outputValue=document.createElement('strong');output.append(outputLabel,outputValue);
    board.append(title,controls,scroll,status,output);
    original.replaceWith(board);
    let index=0;
    function paint(){
      body.replaceChildren();
      events.slice(0,index).forEach((item,i)=>{
        const tr=document.createElement('tr');if(i===index-1)tr.classList.add('current');
        if(item.conditionResult===false&&trace.mode==='while'||item.conditionResult===true&&trace.mode==='do')tr.classList.add('stopped');
        for(const value of [String(item.line).padStart(2,'0'),item.i===null?'—':item.i,item.condition===null?'—':item.condition+' → '+(item.conditionResult?'True':'False'),item.total]){
          const cell=document.createElement('td');cell.textContent=String(value);tr.append(cell);
        }
        body.append(tr);
      });
      scroll.scrollTop=scroll.scrollHeight;
      const done=index===events.length;
      const current=events[index-1];
      if(!current)status.textContent='Ready. Play or Step through the code.';
      else status.textContent='Line '+String(current.line).padStart(2,'0')+' · '+current.action;
      outputValue.textContent=done?String(trace.final):'?';
      output.classList.toggle('is-revealed',done);
      step.disabled=done;
      play.textContent=traceTimer?'Ⅱ Pause':done?'▶ Replay':'▶ Play';
      const lines=layout.querySelectorAll('.loop-code-line');
      lines.forEach(line=>line.classList.remove('is-tracing'));
      if(current&&lines[current.line-1]){
        lines[current.line-1].classList.add('is-tracing');
        lines[current.line-1].setAttribute('aria-current','step');
      }
      lines.forEach((line,i)=>{if(!current||i!==current.line-1)line.removeAttribute('aria-current');});
    }
    function advance(){if(index<events.length)index++;if(index===events.length)stopTrace();paint();}
    play.addEventListener('click',()=>{
      if(traceTimer!==null){stopTrace();paint();return;}
      if(index===events.length)index=0;
      advance();
      if(index<events.length)traceTimer=setInterval(advance,750);
      paint();
    });
    step.addEventListener('click',()=>{stopTrace();advance();});
    reset.addEventListener('click',()=>{stopTrace();index=0;paint();});
    paint();
  }
  function clearAnswer(){
    if(state.locked)return;
    resetFeedback();const work=$('workspace');work.replaceChildren();state.response=null;
    if(state.level==='hard')renderHard(state.question,work);
    else if(state.level==='medium')renderMedium(state.question,work);
    else renderEasy(state.question,work);
    $('show-answer').hidden=false;
  }
  function finish(){
    stopTrace();
    const previous=readProgress();updateProgress('best',Math.max(Number(previous.best)||0,state.score));
    updateProgress('sessions',(Number(readProgress().sessions)||0)+1);
    $('question-position').textContent='Completed';$('meter').setAttribute('aria-valuenow','10');$('meter-fill').style.width='100%';
    $('question-card').classList.add('finished');$('prompt').textContent='';$('context').textContent='';
    resetFeedback();['check','clear','hint','show-answer','next'].forEach(id=>{$(id).hidden=true;});
    const board=$('workspace');board.replaceChildren();
    const result=document.createElement('div');result.className='results';
    const kicker=document.createElement('span');kicker.className='result-kicker';kicker.textContent='Skill 09 · '+state.level+' complete';
    const score=document.createElement('strong');score.textContent=state.score+' / 10';
    const heading=document.createElement('h2');heading.textContent=state.score===10?'Great work!':'Keep practising';
    const message=document.createElement('p');message.textContent='Best score on this device: '+readProgress().best+'/10. Replay this level or try another.';
    const actions=document.createElement('div');actions.className='results-actions';
    const replay=document.createElement('button');replay.type='button';replay.className='btn primary';replay.textContent='Practise again';
    replay.addEventListener('click',()=>chooseLevel(state.level));
    const home=document.createElement('a');home.href='/exercise/paper2/';home.className='btn';home.textContent='All skills';
    actions.append(replay,home);result.append(kicker,score,heading,message,actions);board.append(result);
  }
  function chooseLevel(level){
    state.level=core.validLevel(level);core.updateLevelUrl(state.level);
    state.index=0;state.seed=Math.floor(Math.random()*2147483647)+1;state.score=0;
    document.querySelectorAll('.level').forEach(button=>{
      const active=button.dataset.level===state.level;
      button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));
    });
    $('level-description').textContent=LEVEL_TEXT[state.level];renderQuestion();
  }
  document.querySelectorAll('.level').forEach(button=>button.addEventListener('click',()=>chooseLevel(button.dataset.level)));
  $('check').addEventListener('click',check);$('clear').addEventListener('click',clearAnswer);
  $('show-answer').addEventListener('click',showModel);
  $('next').addEventListener('click',()=>{
    if(!state.locked)return;
    if(state.index===9)finish();else{state.index++;renderQuestion();window.scrollTo(0,0);}
  });
  $('hint').addEventListener('click',()=>{
    const panel=$('hint-panel');panel.hidden=!panel.hidden;panel.textContent=state.question.hint;
    $('hint').textContent=panel.hidden?'Show hint':'Hide hint';
  });
  const print=$('print-skill');if(print){print.innerHTML=printSvg+'<span>Soon</span>';print.title='Printable worksheet coming soon';}
  window.RHSSkillsDemoProvider = () => window.J277SkillsGuidedExamples.make('while-until', state.question);
  chooseLevel(core.levelFromUrl());
})();

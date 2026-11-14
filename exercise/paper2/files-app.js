/* Skill 13: compact text-file practice; the shared Demo never changes learner answers. */
(function () {
  'use strict';
  const engine=window.J277Paper2Files, core=window.RHSCSkills;
  if(!engine||!core) throw new Error('File Handling scripts did not load.');
  const $=id=>document.getElementById(id), KEY='rhs-j277-paper2-progress-v1', SKILL='files';
  const LEVEL_TEXT={easy:'Choose the command',medium:'Trace the text file',hard:'Write OCR statements'};
  const state={level:'easy',index:0,seed:1,score:0,firstTry:0,wrong:0,question:null,response:null,locked:false};

  function progress() {
    const all=core.readProgress(KEY), entry=all[SKILL]&&all[SKILL][state.level];
    return entry&&typeof entry==='object'?entry:{solved:0,best:0,sessions:0};
  }
  function updateProgress(key,value) {
    const all=core.readProgress(KEY);
    if(!all[SKILL]||typeof all[SKILL]!=='object') all[SKILL]={};
    const current=progress();
    all[SKILL][state.level]={solved:Number(current.solved)||0,best:Number(current.best)||0,
      sessions:Number(current.sessions)||0,[key]:value};
    core.writeProgress(KEY,all);
  }
  function feedback(message,kind) {
    $('feedback').textContent=message; $('feedback').className='message '+kind; $('feedback').hidden=false;
  }
  function resetFeedback() {
    $('feedback').textContent=''; $('feedback').hidden=true;
    $('hint-panel').replaceChildren(); $('hint-panel').hidden=true; $('hint').textContent='Show hint';
  }
  function el(tag,className,content) {
    const node=document.createElement(tag); if(className) node.className=className;
    if(content!==undefined) node.textContent=content; return node;
  }
  function codePanel(code) {
    const panel=el('div','code-panel'), label=el('span','code-label','OCR Exam Reference Language');
    const pre=el('pre','erl',code.join('\n')); panel.append(label,pre); return panel;
  }
  function fileSheet(q) {
    const box=el('div','file-sheet');
    const heading=el('strong','file-sheet-title',q.filename+' · before running');
    const lines=el('div','file-sheet-lines');
    q.lines.forEach((line,index)=>{
      const row=el('div','file-sheet-row');
      row.append(el('span','file-line-num',String(index+1).padStart(2,'0')),el('span','file-line-value',line));
      lines.append(row);
    });
    box.append(heading,lines);return box;
  }
  function renderEasy(q,work) {
    const grid=el('div','file-choices');grid.setAttribute('role','group');grid.setAttribute('aria-label','Choose a file command');
    q.choices.forEach(choice=>{
      const button=el('button','file-choice');button.type='button';button.setAttribute('aria-pressed','false');
      button.setAttribute('aria-label',choice.label+', '+choice.code);
      button.append(el('strong','file-choice-name',choice.label),el('code','file-choice-code',choice.code));
      button.addEventListener('click',()=>{
        if(state.locked)return;
        state.response=choice.id;
        grid.querySelectorAll('button').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
      });grid.append(button);
    });work.append(grid);
  }
  function inputPanel(q,isHard) {
    const answer=el('div','file-answer'), label=el('label','work-label',isHard?'Your file-handling code':'Your answer');
    const input=el(isHard?'textarea':'input',isHard?'code-entry':'number-entry');
    input.id='file-answer'; label.htmlFor=input.id;
    if(isHard) {input.rows=4;input.spellcheck=false;input.autocapitalize='off';}
    else input.type='text';
    input.autocomplete='off';input.placeholder=isHard?'Type the OCR statements…':'?';
    input.addEventListener('input',()=>{state.response=input.value;});
    if(!isHard)input.addEventListener('keydown',event=>{if(event.key==='Enter')$('check').click();});
    const note=el('span','writer-note',isHard?'Use the OCR command names shown in the Demo.':'Read each command in order, then enter the result.');
    answer.append(label,input,note);return answer;
  }
  function renderMedium(q,work) {
    const layout=el('div','file-layout'), left=el('div','file-source');
    left.append(fileSheet(q),codePanel(q.code));layout.append(left,inputPanel(q,false));work.append(layout);
  }
  function renderHard(q,work) {
    const layout=el('div','file-layout file-hard-layout');
    const guide=el('div','file-guide');
    guide.append(el('strong','file-guide-title','OCR file commands'),
      el('p','', 'open() · readLine() · writeLine() · close() · endOfFile() · newFile()'));
    layout.append(guide,inputPanel(q,true));work.append(layout);
  }
  function renderQuestion() {
    const q=state.question=engine.makeQuestion(state.level,state.index,state.seed);
    state.response=null;state.wrong=0;state.locked=false;
    $('question-card').classList.remove('finished');
    $('prompt').textContent=q.prompt;$('context').textContent=q.context;
    $('question-position').textContent='Question '+(state.index+1)+' of 10';
    $('meter').setAttribute('aria-valuenow',String(state.index));$('meter-fill').style.width=state.index*10+'%';
    ['check','clear','hint'].forEach(id=>$(id).hidden=false);
    $('show-answer').hidden=true;$('next').hidden=true;
    $('next').textContent=state.index===9?'See results →':'Next question →';resetFeedback();
    const work=$('workspace');work.replaceChildren();
    if(state.level==='easy')renderEasy(q,work);else if(state.level==='medium')renderMedium(q,work);else renderHard(q,work);
  }
  function disableInputs() {
    $('workspace').querySelectorAll('button,input,textarea').forEach(node=>node.disabled=true);
    ['check','clear','hint','show-answer'].forEach(id=>$(id).hidden=true);$('next').hidden=false;
  }
  function check() {
    if(state.locked)return;
    const result=engine.checkAnswer(state.question,state.response);
    if(!result.complete){feedback('Choose a command or enter your answer first.','neutral');return;}
    if(result.correct){
      state.locked=true;state.score++;if(state.wrong===0)state.firstTry++;
      updateProgress('solved',(Number(progress().solved)||0)+1);
      feedback('Correct! '+state.question.explanation,'good');disableInputs();return;
    }
    state.wrong++;
    feedback(state.level==='easy'?'Read what each command does.':
      state.level==='medium'?'Track which lines are read or added as you go.':
      'Check the file variable, command and brackets.','bad');
    if(state.wrong>=2)$('show-answer').hidden=false;
  }
  function showModel() {
    if(state.locked||state.wrong<2)return;
    state.locked=true;disableInputs();
    const panel=$('hint-panel');
    panel.replaceChildren(el('strong','','Model answer'),el('pre','erl',state.question.model));panel.hidden=false;
    feedback('Compare with the model. No point was added.','neutral');
  }
  function clearAnswer() {
    if(state.locked)return;
    resetFeedback();state.response=null;
    const work=$('workspace');work.replaceChildren();
    if(state.level==='easy')renderEasy(state.question,work);
    else if(state.level==='medium')renderMedium(state.question,work);
    else renderHard(state.question,work);
    $('show-answer').hidden=state.wrong<2;
  }
  function finish() {
    core.reportCompletion(2,SKILL,state.level,state.firstTry,10);
    const before=progress();updateProgress('best',Math.max(Number(before.best)||0,state.score));
    updateProgress('sessions',(Number(progress().sessions)||0)+1);
    $('question-position').textContent='Completed';$('meter').setAttribute('aria-valuenow','10');
    $('meter-fill').style.width='100%';$('question-card').classList.add('finished');
    $('prompt').textContent='';$('context').textContent='';resetFeedback();
    ['check','clear','hint','show-answer','next'].forEach(id=>$(id).hidden=true);
    const work=$('workspace');work.replaceChildren();const result=el('div','results');
    const kicker=el('span','result-kicker','Skill 13 · '+state.level+' complete');
    const score=el('strong','',state.score+' / 10');
    const heading=el('h2','',state.score===10?'Great work!':'Keep practising');
    const message=el('p','','Best score on this device: '+progress().best+'/10. Replay or try another level.');
    const actions=el('div','results-actions'),replay=el('button','btn primary','Practise again');
    replay.type='button';replay.addEventListener('click',()=>chooseLevel(state.level));
    const hub=el('a','btn','All skills');hub.href='/exercise/paper2/';
    actions.append(replay,hub);result.append(kicker,score,heading,message,actions);work.append(result);
  }
  function chooseLevel(level) {
    state.level=core.validLevel(level);core.updateLevelUrl(state.level);
    state.index=0;state.seed=Math.floor(Math.random()*2147483647)+1;
    state.score=0;state.firstTry=0;
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
    if(state.index===9)finish();else {state.index++;renderQuestion();window.scrollTo(0,0);}
  });
  $('hint').addEventListener('click',()=>{
    const panel=$('hint-panel');panel.hidden=!panel.hidden;panel.textContent=state.question.hint;
    $('hint').textContent=panel.hidden?'Show hint':'Hide hint';
  });
  chooseLevel(core.levelFromUrl());
})();

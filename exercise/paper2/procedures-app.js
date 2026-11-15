/* Skill 16 · OCR ERL Procedures · three levels, separate worked demos. */
(function(){
  'use strict';
  const engine=window.J277Paper2Procedures,core=window.RHSCSkills;
  if(!engine||!core)throw Error('Procedures scripts did not load.');
  const $=id=>document.getElementById(id),KEY='rhs-j277-paper2-progress-v1',SKILL='procedures';
  const descriptions={easy:'Identify parameters and calls',medium:'Trace procedures with loops',hard:'Write complete procedures'};
  const state={level:'easy',index:0,seed:1,score:0,firstTry:0,wrong:0,question:null,response:null,locked:false};
  const node=(tag,style,text)=>{const e=document.createElement(tag);if(style)e.className=style;if(text!==undefined)e.textContent=text;return e;};
  function progress(){const p=core.readProgress(KEY),item=p[SKILL]&&p[SKILL][state.level];return item&&typeof item==='object'?item:{solved:0,best:0,sessions:0};}
  function updateProgress(field,value){const p=core.readProgress(KEY),before=progress();
    if(!p[SKILL]||typeof p[SKILL]!=='object')p[SKILL]={};
    p[SKILL][state.level]={solved:Number(before.solved)||0,best:Number(before.best)||0,sessions:Number(before.sessions)||0,[field]:value};
    core.writeProgress(KEY,p);
  }
  function codePanel(lines,label,program){const box=node('div','code-panel');
    const ending=lines.findIndex(line=>/^\s*endprocedure\s*$/i.test(line));
    const startLine=program?1:(ending>=0&&ending+1<lines.length?ending+2:null);
    box.append(node('span','code-label',label||'OCR Exam Reference Language'),core.numberedCode(lines,{startLine}));return box;}
  function resetMessages(){$('feedback').hidden=true;$('feedback').textContent='';$('hint-panel').replaceChildren();$('hint-panel').hidden=true;$('hint').textContent='Show hint';}
  function showFeedback(message,kind){const el=$('feedback');el.textContent=message;el.className='message '+kind;el.hidden=false;}
  function inputPanel(hard){const box=node('div','string-answer'+(hard?'':' procedure-trace'));
    const label=node('label','work-label',hard?'YOUR COMPLETE OCR ERL PROCEDURE':'OUTPUT · one result per line');label.htmlFor='procedure-answer';
    const entry=node('textarea','code-entry');entry.id='procedure-answer';entry.rows=hard?10:5;entry.spellcheck=false;entry.autocapitalize='off';entry.autocomplete='off';
    entry.placeholder=hard?'procedure name(parameters)\n    for i = ...\n        if ... then\n            ...\n        endif\n    next i\nendprocedure\nname(arguments)':'Type each printed value on a new line…';
    entry.addEventListener('input',()=>{state.response=entry.value;});
    const note=node('span','writer-note',hard?'Include PROCEDURE, FOR, IF, NEXT, ENDPROCEDURE and the procedure call.':'Write the results in the order they are printed. Do not include PRINT commands.');
    box.append(label,entry,note);return box;
  }
  function choices(q){const box=node('div','procedure-choice');box.append(node('strong','procedure-legend','Select one answer'));
    const buttons=node('div','pick-buttons');
    q.options.forEach(choice=>{const button=node('button','',choice);button.type='button';button.setAttribute('aria-pressed','false');
      button.addEventListener('click',()=>{if(state.locked)return;state.response=choice;
        buttons.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));});buttons.append(button);});
    box.append(buttons);return box;
  }
  function preview(q){const el=$('expected-preview');el.replaceChildren();el.hidden=q.type!=='program';
    $('question-text').classList.toggle('string-hard-task',q.type==='program');if(q.type!=='program')return;
    el.append(node('span','string-output-label','EXPECTED OUTPUT · example call'));
    const lines=node('div','string-output-lines');
    if(q.expectedLines.length)q.expectedLines.forEach(value=>lines.append(node('span','string-output-line',value)));
    else lines.append(node('span','string-output-line','(no output)'));
    el.append(lines);
  }
  function renderWorkspace(q){const board=$('workspace');board.replaceChildren();
    const layout=node('div','string-layout'),left=node('div','string-left');
    left.append(codePanel(q.code,q.type==='program'?'GIVEN EXAMPLE CALL':'OCR EXAM REFERENCE LANGUAGE',q.type==='program'));
    layout.append(left);
    if(q.type==='choose')layout.append(choices(q));
    else layout.append(inputPanel(q.type==='program'));
    board.append(layout);
  }
  function renderQuestion(){const q=state.question=engine.makeQuestion(state.level,state.index,state.seed);
    state.response=null;state.wrong=0;state.locked=false;resetMessages();
    $('question-card').classList.remove('finished');$('prompt').textContent=q.prompt;$('context').textContent=q.context;
    preview(q);renderWorkspace(q);
    $('question-position').textContent='Question '+(state.index+1)+' of 10';
    $('meter').setAttribute('aria-valuenow',String(state.index));$('meter-fill').style.width=state.index*10+'%';
    $('level-description').textContent=descriptions[state.level];
    ['check','clear','hint'].forEach(id=>$(id).hidden=false);
    $('show-answer').hidden=true;$('next').hidden=true;$('next').textContent=state.index===9?'See results →':'Next question →';
  }
  function disableInputs(){$('workspace').querySelectorAll('button,textarea').forEach(e=>e.disabled=true);
    ['check','clear','hint','show-answer'].forEach(id=>$(id).hidden=true);$('next').hidden=false;}
  function checkAnswer(){if(state.locked)return;
    const result=engine.checkAnswer(state.question,state.response);
    if(!result.complete){showFeedback('Choose an answer or write your code before checking.','neutral');return;}
    if(result.correct){state.locked=true;state.score++;if(!state.wrong)state.firstTry++;
      updateProgress('solved',(Number(progress().solved)||0)+1);
      showFeedback('Correct! '+state.question.explanation,'good');disableInputs();return;}
    state.wrong++;
    showFeedback(state.level==='easy'?'Look closely at the difference between a parameter and the argument in the call.':
      state.level==='medium'?'Trace every FOR iteration and record only what PRINT displays.':
      'Check your procedure heading, call, FOR loop and IF. Your code is tested with unseen values.','bad');
    if(state.wrong>=2)$('show-answer').hidden=false;
  }
  function showModel(){if(state.locked||state.wrong<2)return;state.locked=true;disableInputs();
    const box=$('hint-panel');box.replaceChildren(node('strong','','Worked answer'),node('pre','erl',state.question.model));box.hidden=false;
    showFeedback('Compare your work with the model. No point was awarded.','neutral');}
  function clearAnswer(){if(state.locked)return;state.response=null;resetMessages();renderWorkspace(state.question);$('show-answer').hidden=state.wrong<2;}
  function finish(){core.reportCompletion(2,SKILL,state.level,state.firstTry,10);
    updateProgress('best',Math.max(Number(progress().best)||0,state.score));updateProgress('sessions',(Number(progress().sessions)||0)+1);
    $('question-position').textContent='Completed';$('meter').setAttribute('aria-valuenow','10');$('meter-fill').style.width='100%';
    $('question-card').classList.add('finished');$('prompt').textContent='';$('context').textContent='';$('expected-preview').hidden=true;
    $('question-text').classList.remove('string-hard-task');resetMessages();
    ['check','clear','hint','show-answer','next'].forEach(id=>$(id).hidden=true);
    const board=$('workspace');board.replaceChildren();const result=node('div','results');
    const kicker=node('span','result-kicker','Skill 16 · '+state.level+' complete');
    const score=node('strong','',state.score+' / 10');const heading=node('h2','',state.score===10?'Great work!':'Keep practising');
    const message=node('p','','Best score on this device: '+progress().best+'/10. Replay or try another level.');
    const buttons=node('div','results-actions'),replay=node('button','btn primary','Practise again');replay.type='button';
    replay.addEventListener('click',()=>chooseLevel(state.level));const hub=node('a','btn','All skills');hub.href='/exercise/paper2/';
    buttons.append(replay,hub);result.append(kicker,score,heading,message,buttons);board.append(result);
  }
  function chooseLevel(level){state.level=core.validLevel(level);core.updateLevelUrl(state.level);state.index=0;
    state.seed=Math.floor(Math.random()*2147483647)+1;state.score=0;state.firstTry=0;
    document.querySelectorAll('.level').forEach(button=>{const chosen=button.dataset.level===state.level;
      button.classList.toggle('active',chosen);button.setAttribute('aria-pressed',String(chosen));});
    renderQuestion();}
  document.querySelectorAll('.level').forEach(b=>b.addEventListener('click',()=>chooseLevel(b.dataset.level)));
  $('check').addEventListener('click',checkAnswer);$('clear').addEventListener('click',clearAnswer);
  $('show-answer').addEventListener('click',showModel);
  $('next').addEventListener('click',()=>{if(!state.locked)return;if(state.index===9)finish();else{state.index++;renderQuestion();window.scrollTo(0,0);}});
  $('hint').addEventListener('click',()=>{const box=$('hint-panel');box.hidden=!box.hidden;
    box.textContent=state.question.hint;$('hint').textContent=box.hidden?'Show hint':'Hide hint';});
  window.RHSSkillsDemoProvider=()=>engine.makeDemo(state.question);
  chooseLevel(core.levelFromUrl());
})();

/* OCR J277 Random Numbers · shared Paper 2 skill layout and progress conventions. */
(function(){
  'use strict';
  const engine=window.J277Paper2Random,core=window.RHSCSkills;
  if(!engine||!core)throw Error('Random Numbers scripts did not load.');
  const $=id=>document.getElementById(id),KEY='rhs-j277-paper2-progress-v1',SKILL='random';
  const descriptions={easy:'Inclusive ranges and outcomes',medium:'Trace random selection and loops',hard:'Write complete random subprograms'};
  const state={level:'easy',index:0,seed:1,score:0,firstTry:0,wrong:0,question:null,response:null,locked:false};
  const node=(tag,style,text)=>{const e=document.createElement(tag);if(style)e.className=style;if(text!==undefined)e.textContent=text;return e;};
  function progress(){const p=core.readProgress(KEY),item=p[SKILL]&&p[SKILL][state.level];return item&&typeof item==='object'?item:{solved:0,best:0,sessions:0};}
  function updateProgress(field,value){const p=core.readProgress(KEY),before=progress();
    if(!p[SKILL]||typeof p[SKILL]!=='object')p[SKILL]={};
    p[SKILL][state.level]={solved:Number(before.solved)||0,best:Number(before.best)||0,sessions:Number(before.sessions)||0,[field]:value};
    core.writeProgress(KEY,p);
  }
  function codePanel(lines,label,program){const box=node('div','code-panel');
    const ending=lines.findIndex(line=>/^\s*end(?:function|procedure)\s*$/i.test(line));
    const startLine=program?1:(ending>=0&&ending+1<lines.length?ending+2:null);
    box.append(node('span','code-label',label||'OCR Exam Reference Language'),core.numberedCode(lines,{startLine}));return box;}
  function resetMessages(){$('feedback').hidden=true;$('feedback').textContent='';$('hint-panel').replaceChildren();$('hint-panel').hidden=true;$('hint').textContent='Show hint';}
  function showFeedback(message,kind){const el=$('feedback');el.textContent=message;el.className='message '+kind;el.hidden=false;}
  function inputPanel(hard,q){const box=node('div','string-answer'+(hard?'':' function-trace'));
    const label=node('label','work-label',hard?'YOUR COMPLETE OCR ERL SUBPROGRAM':'OUTPUT VALUE');label.htmlFor='random-answer';
    const entry=node('textarea','code-entry');entry.id='random-answer';entry.rows=hard?10:2;
    entry.spellcheck=false;entry.autocapitalize='off';entry.autocomplete='off';
    entry.placeholder=hard?q.kind+' '+q.name+'(rolls,sides)\n    ...\nend'+q.kind+'\n'+q.code[0]:'Enter the number printed…';
    entry.addEventListener('input',()=>{state.response=entry.value;});
    const guide=hard?node('span','structure-guide','Structure guide — disappears when you type'):null;
    const note=node('span','writer-note',hard?'Use RANDOM, FOR and IF inside a FUNCTION or PROCEDURE. Include the call.':'Use the given random results in order. Enter the final printed value.');
    box.append(label);if(guide)box.append(guide);box.append(entry,note);return box;
  }
  function choices(q){const box=node('div','function-choice');box.append(node('strong','function-legend','Select one answer'));
    const buttons=node('div','pick-buttons');q.options.forEach(choice=>{const button=node('button','',choice);button.type='button';button.setAttribute('aria-pressed','false');
      button.addEventListener('click',()=>{if(state.locked)return;state.response=choice;buttons.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));});buttons.append(button);});
    box.append(buttons);return box;
  }
  function preview(q){const el=$('expected-preview');el.replaceChildren();el.hidden=q.type!=='program';
    $('question-text').classList.toggle('string-hard-task',q.type==='program');if(q.type!=='program')return;
    el.append(node('span','string-output-label','WORKED TEST · known random values'));
    const lines=node('div','string-output-lines');lines.append(node('span','string-output-line',q.example));el.append(lines);
  }
  function renderWorkspace(q){const board=$('workspace');board.replaceChildren();
    const layout=node('div','string-layout'),left=node('div','string-left');
    left.append(codePanel(q.code,q.type==='program'?'GIVEN SUBPROGRAM CALL':'OCR EXAM REFERENCE LANGUAGE',q.type==='program'));
    layout.append(left);
    if(q.type==='choose')layout.append(choices(q));else layout.append(inputPanel(q.type==='program',q));
    board.append(layout);
  }
  function renderQuestion(){const q=state.question=engine.makeQuestion(state.level,state.index,state.seed);
    state.response=null;state.wrong=0;state.locked=false;resetMessages();
    $('question-card').classList.remove('finished');$('prompt').textContent=q.prompt;$('context').textContent=q.context;
    preview(q);renderWorkspace(q);
    $('question-position').textContent='Question '+(state.index+1)+' of 10';
    $('meter').setAttribute('aria-valuenow',String(state.index));$('meter-fill').style.width=state.index*10+'%';
    $('level-description').textContent=descriptions[state.level];
    ['check','clear','hint'].forEach(id=>$(id).hidden=false);$('show-answer').hidden=true;$('next').hidden=true;
    $('next').textContent=state.index===9?'See results →':'Next question →';
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
    showFeedback(state.level==='easy'?'Check the inclusive lower and upper bounds of RANDOM.':
      state.level==='medium'?'Use the supplied random values in order, then follow FOR and IF.':
      'Check RANDOM(1,sides) inside FOR, the IF test, the result and the subprogram call. Unseen rolls are tested.','bad');
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
    result.append(node('span','result-kicker','Skill 18 · '+state.level+' complete'),node('strong','',state.score+' / 10'),node('h2','',state.score===10?'Great work!':'Keep practising'),
      node('p','','Best score on this device: '+progress().best+'/10. Replay or try another level.'));
    const buttons=node('div','results-actions'),replay=node('button','btn primary','Practise again');replay.type='button';
    replay.addEventListener('click',()=>chooseLevel(state.level));const hub=node('a','btn','All skills');hub.href='/exercise/paper2/';
    buttons.append(replay,hub);result.append(buttons);board.append(result);
  }
  function chooseLevel(level){state.level=core.validLevel(level);core.updateLevelUrl(state.level);state.index=0;
    state.seed=Math.floor(Math.random()*2147483647)+1;state.score=0;state.firstTry=0;
    document.querySelectorAll('.level').forEach(button=>{const chosen=button.dataset.level===state.level;
      button.classList.toggle('active',chosen);button.setAttribute('aria-pressed',String(chosen));});renderQuestion();}
  document.querySelectorAll('.level').forEach(b=>b.addEventListener('click',()=>chooseLevel(b.dataset.level)));
  $('check').addEventListener('click',checkAnswer);$('clear').addEventListener('click',clearAnswer);
  $('show-answer').addEventListener('click',showModel);
  $('next').addEventListener('click',()=>{if(!state.locked)return;if(state.index===9)finish();else{state.index++;renderQuestion();window.scrollTo(0,0);}});
  $('hint').addEventListener('click',()=>{const box=$('hint-panel');box.hidden=!box.hidden;
    box.textContent=state.question.hint;$('hint').textContent=box.hidden?'Show hint':'Hide hint';});
  window.RHSSkillsDemoProvider=()=>engine.makeDemo(state.question);
  chooseLevel(core.levelFromUrl());
})();

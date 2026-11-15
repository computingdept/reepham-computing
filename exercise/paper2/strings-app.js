/* Skill 15: OCR ERL string handling practice. */
(function(){
  'use strict';
  const engine=window.J277Paper2Strings,core=window.RHSCSkills;
  if(!engine||!core)throw Error('String Handling scripts did not load.');
  const $=id=>document.getElementById(id),KEY='rhs-j277-paper2-progress-v1',SKILL='strings';
  const labels={easy:'Find a character',medium:'Trace string operations',hard:'Write OCR ERL expressions'};
  const state={level:'easy',index:0,seed:1,score:0,firstTry:0,wrong:0,question:null,response:null,locked:false};
  const el=(tag,className,text)=>{const node=document.createElement(tag);if(className)node.className=className;if(text!==undefined)node.textContent=text;return node;};
  const progress=()=>{const p=core.readProgress(KEY),entry=p[SKILL]&&p[SKILL][state.level];return entry&&typeof entry==='object'?entry:{solved:0,best:0,sessions:0};};
  function updateProgress(field,value){const p=core.readProgress(KEY),before=progress();
    if(!p[SKILL]||typeof p[SKILL]!=='object')p[SKILL]={};
    p[SKILL][state.level]={solved:Number(before.solved)||0,best:Number(before.best)||0,sessions:Number(before.sessions)||0,[field]:value};
    core.writeProgress(KEY,p);
  }
  function feedback(message,type){const node=$('feedback');node.textContent=message;node.className='message '+type;node.hidden=false;}
  function resetFeedback(){$('feedback').hidden=true;$('feedback').textContent='';$('hint-panel').replaceChildren();$('hint-panel').hidden=true;$('hint').textContent='Show hint';}
  function codePanel(lines){const box=el('div','code-panel');box.append(el('span','code-label','OCR Exam Reference Language'),core.numberedCode(lines));return box;}
  function letterStrip(word,interactive){
    const box=el('div','string-strip');
    box.append(el('strong','string-strip-title','Character positions · index 0 is the first letter'));
    const row=el('div','string-letters');row.setAttribute('role',interactive?'group':'list');
    row.setAttribute('aria-label','Characters and zero-based indexes');
    [...word].forEach((letter,index)=>{
      const cell=el(interactive?'button':'div','string-letter');
      if(interactive){cell.type='button';cell.setAttribute('aria-label','Character '+letter+', index '+index);cell.setAttribute('aria-pressed','false');
        cell.addEventListener('click',()=>{if(state.locked)return;state.response=String(index);
          row.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b===cell)));});}
      else cell.setAttribute('role','listitem');
      cell.append(el('span','string-letter-value',letter),el('span','string-letter-index',String(index)));row.append(cell);
    });
    box.append(row);return box;
  }
  function valuesPanel(env){const box=el('div','string-values');box.append(el('strong','','Given values'));
    Object.entries(env).forEach(([name,value])=>box.append(el('span','string-value-chip',name+' = "'+value+'"')));return box;}
  function inputPanel(hard){const box=el('div','string-answer'),label=el('label','work-label',hard?'Your OCR ERL expression':'Final printed value');
    label.htmlFor='string-entry';const input=el(hard?'textarea':'input',hard?'code-entry':'number-entry');
    input.id='string-entry';input.autocomplete='off';input.spellcheck=false;input.autocapitalize='off';
    if(hard){input.rows=3;input.placeholder='Write your expression…';}else{input.type='text';input.placeholder='?';}
    input.addEventListener('input',()=>{state.response=input.value;});
    if(!hard)input.addEventListener('keydown',event=>{if(event.key==='Enter')$('check').click();});
    const note=el('span','writer-note',hard?'Write only the expression. Use the variable names shown.':'Use the exact characters and capital letters printed by the code.');
    box.append(label,input,note);return box;
  }
  function renderQuestion(){const q=state.question=engine.makeQuestion(state.level,state.index,state.seed);
    state.wrong=0;state.response=null;state.locked=false;resetFeedback();
    $('question-card').classList.remove('finished');$('prompt').textContent=q.prompt;$('context').textContent=q.context;
    $('question-position').textContent='Question '+(state.index+1)+' of 10';$('meter').setAttribute('aria-valuenow',String(state.index));$('meter-fill').style.width=state.index*10+'%';
    ['check','clear','hint'].forEach(id=>$(id).hidden=false);$('show-answer').hidden=true;$('next').hidden=true;
    $('next').textContent=state.index===9?'See results →':'Next question →';
    const work=$('workspace');work.replaceChildren();
    const layout=el('div','string-layout'),left=el('div','string-left');
    if(q.word&&q.word.length<=12&&q.kind!=='join')left.append(letterStrip(q.word,state.level==='easy'));
    else if(q.env)left.append(valuesPanel(q.env));
    if(q.code.length)left.append(codePanel(q.code));
    layout.append(left);if(state.level!=='easy')layout.append(inputPanel(state.level==='hard'));work.append(layout);
  }
  function disableInputs(){$('workspace').querySelectorAll('button,input,textarea').forEach(node=>node.disabled=true);
    ['check','clear','hint','show-answer'].forEach(id=>$(id).hidden=true);$('next').hidden=false;}
  function check(){if(state.locked)return;const result=engine.checkAnswer(state.question,state.response);
    if(!result.complete){feedback('Choose a character or enter an answer first.','neutral');return;}
    if(result.correct){state.locked=true;state.score++;if(!state.wrong)state.firstTry++;
      updateProgress('solved',(Number(progress().solved)||0)+1);feedback('Correct! '+state.question.explanation,'good');disableInputs();return;}
    state.wrong++;feedback(state.level==='easy'?'Start counting at index 0.':
      state.level==='medium'?'Check the start position, character count and exact letter case.':
      'Use the correct string operation and variable names; substring takes start, then count.','bad');
    if(state.wrong>=2)$('show-answer').hidden=false;
  }
  function showModel(){if(state.locked||state.wrong<2)return;state.locked=true;disableInputs();
    const q=state.question,panel=$('hint-panel');panel.replaceChildren(el('strong','','Model answer'),el('pre','erl',q.model));panel.hidden=false;
    feedback('Compare with the model. No point was added.','neutral');}
  function clearAnswer(){if(state.locked)return;resetFeedback();state.response=null;
    const q=state.question,work=$('workspace');work.replaceChildren();
    const layout=el('div','string-layout'),left=el('div','string-left');
    if(q.word&&q.word.length<=12&&q.kind!=='join')left.append(letterStrip(q.word,state.level==='easy'));
    else if(q.env)left.append(valuesPanel(q.env));
    if(q.code.length)left.append(codePanel(q.code));layout.append(left);
    if(state.level!=='easy')layout.append(inputPanel(state.level==='hard'));work.append(layout);
    $('show-answer').hidden=state.wrong<2;
  }
  function finish(){core.reportCompletion(2,SKILL,state.level,state.firstTry,10);
    const before=progress();updateProgress('best',Math.max(Number(before.best)||0,state.score));
    updateProgress('sessions',(Number(progress().sessions)||0)+1);
    $('question-position').textContent='Completed';$('meter').setAttribute('aria-valuenow','10');$('meter-fill').style.width='100%';
    $('question-card').classList.add('finished');$('prompt').textContent='';$('context').textContent='';resetFeedback();
    ['check','clear','hint','show-answer','next'].forEach(id=>$(id).hidden=true);
    const work=$('workspace');work.replaceChildren();const result=el('div','results');
    const kicker=el('span','result-kicker','Skill 15 · '+state.level+' complete');
    const score=el('strong','',state.score+' / 10'),heading=el('h2','',state.score===10?'Great work!':'Keep practising');
    const message=el('p','','Best score on this device: '+progress().best+'/10. Replay or try another level.');
    const actions=el('div','results-actions'),replay=el('button','btn primary','Practise again');replay.type='button';
    replay.addEventListener('click',()=>chooseLevel(state.level));const hub=el('a','btn','All skills');hub.href='/exercise/paper2/';
    actions.append(replay,hub);result.append(kicker,score,heading,message,actions);work.append(result);
  }
  function chooseLevel(level){state.level=core.validLevel(level);core.updateLevelUrl(state.level);state.index=0;
    state.seed=Math.floor(Math.random()*2147483647)+1;state.score=0;state.firstTry=0;
    document.querySelectorAll('.level').forEach(button=>{const active=button.dataset.level===state.level;
      button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));});
    $('level-description').textContent=labels[state.level];renderQuestion();}
  document.querySelectorAll('.level').forEach(button=>button.addEventListener('click',()=>chooseLevel(button.dataset.level)));
  $('check').addEventListener('click',check);$('clear').addEventListener('click',clearAnswer);
  $('show-answer').addEventListener('click',showModel);
  $('next').addEventListener('click',()=>{if(!state.locked)return;if(state.index===9)finish();else{state.index++;renderQuestion();window.scrollTo(0,0);}});
  $('hint').addEventListener('click',()=>{const panel=$('hint-panel');panel.hidden=!panel.hidden;
    panel.textContent=state.question.hint;$('hint').textContent=panel.hidden?'Show hint':'Hide hint';});
  window.RHSSkillsDemoProvider=()=>engine.makeDemo(state.question);
  chooseLevel(core.levelFromUrl());
})();

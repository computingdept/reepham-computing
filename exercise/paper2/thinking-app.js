/* Skill 19 · computational thinking · shared Paper 2 progress and Demo hooks. */
(function(){
  'use strict';
  const engine=window.J277Paper2Thinking,core=window.RHSCSkills;
  if(!engine||!core)throw Error('Computational Thinking scripts did not load.');
  const $=id=>document.getElementById(id),KEY='rhs-j277-paper2-progress-v1',SKILL='thinking';
  const descriptions={easy:'Recognise three principles',medium:'Abstraction and decomposition',hard:'Design an ordered solution'};
  const state={level:'easy',index:0,seed:1,score:0,firstTry:0,wrong:0,question:null,response:null,locked:false};
  const node=(tag,klass,text)=>{const e=document.createElement(tag);if(klass)e.className=klass;if(text!==undefined)e.textContent=text;return e;};
  function progress(){const p=core.readProgress(KEY),item=p[SKILL]&&p[SKILL][state.level];return item&&typeof item==='object'?item:{solved:0,best:0,sessions:0};}
  function updateProgress(field,value){const p=core.readProgress(KEY),before=progress();
    if(!p[SKILL]||typeof p[SKILL]!=='object')p[SKILL]={};
    p[SKILL][state.level]={solved:Number(before.solved)||0,best:Number(before.best)||0,sessions:Number(before.sessions)||0,[field]:value};
    core.writeProgress(KEY,p);
  }
  function resetMessages(){$('feedback').hidden=true;$('feedback').textContent='';$('hint-panel').replaceChildren();$('hint-panel').hidden=true;$('hint').textContent='Show hint';}
  function showFeedback(message,kind){const el=$('feedback');el.textContent=message;el.className='message '+kind;el.hidden=false;}
  function renderChoices(q){
    const board=node('section','thinking-picks');
    board.append(node('strong','thinking-caption',q.type==='choose'?'Choose one answer':'Choose THREE useful details'));
    const list=node('div','thinking-pick-grid');
    q.options.forEach(option=>{
      const button=node('button','thinking-pick',option.label);button.type='button';
      const chosen=q.type==='choose'?state.response===option.label:Array.isArray(state.response)&&state.response.includes(option.id);
      button.setAttribute('aria-pressed',String(chosen));
      button.addEventListener('click',()=>{
        if(state.locked)return;
        if(q.type==='choose')state.response=option.label;
        else{
          const next=Array.isArray(state.response)?state.response.slice():[];
          if(next.includes(option.id))next.splice(next.indexOf(option.id),1);
          else if(next.length<3)next.push(option.id);
          state.response=next;
        }
        renderWorkspace(q);
      });
      list.append(button);
    });
    board.append(list);
    if(q.type==='multi')board.append(node('p','thinking-selection-count',(state.response?.length||0)+' of 3 chosen'));
    return board;
  }
  function renderOrder(q){
    const layout=node('div','thinking-order-layout'),picker=node('section','thinking-picks'),plan=node('section','thinking-plan');
    picker.append(node('strong','thinking-caption','Tap SIX steps in the order you would design them'));
    const choices=node('div','thinking-pick-grid');
    const selected=Array.isArray(state.response)?state.response:[];
    q.options.forEach(option=>{
      const used=selected.includes(option.id),button=node('button','thinking-pick'+(used?' is-used':''),option.label);
      button.type='button';button.disabled=used||selected.length>=6;
      if(used){button.setAttribute('aria-label','Already chosen: '+option.label);}
      button.addEventListener('click',()=>{
        if(state.locked||selected.includes(option.id)||selected.length>=6)return;
        state.response=selected.concat(option.id);renderWorkspace(q);
      });
      choices.append(button);
    });
    picker.append(choices);
    plan.append(node('strong','thinking-caption','YOUR PLAN · '+selected.length+' / 6'));
    const steps=node('ol','thinking-plan-list');
    for(let i=0;i<6;i++){
      const item=node('li','thinking-plan-step');
      const id=selected[i];
      if(id===undefined)item.append(node('span','thinking-empty','Step '+(i+1)));
      else{
        const label=q.options.find(x=>x.id===id)?.label||'';
        const remove=node('button','thinking-remove','×');remove.type='button';remove.setAttribute('aria-label','Remove step '+(i+1));
        remove.addEventListener('click',()=>{if(state.locked)return;state.response=selected.filter((_,j)=>j!==i);renderWorkspace(q);});
        item.append(node('span','',label),remove);
      }
      steps.append(item);
    }
    plan.append(steps);layout.append(picker,plan);return layout;
  }
  function renderWorkspace(q){
    const board=$('workspace');board.replaceChildren();
    board.append(q.type==='order'?renderOrder(q):renderChoices(q));
  }
  function renderQuestion(){
    const q=state.question=engine.makeQuestion(state.level,state.index,state.seed);
    state.response=q.type==='choose'?null:[];state.wrong=0;state.locked=false;resetMessages();
    $('question-card').classList.remove('finished');$('prompt').textContent=q.prompt;$('context').textContent=q.context;
    renderWorkspace(q);
    $('question-position').textContent='Question '+(state.index+1)+' of 10';
    $('meter').setAttribute('aria-valuenow',String(state.index));$('meter-fill').style.width=state.index*10+'%';
    $('level-description').textContent=descriptions[state.level];
    ['check','clear','hint'].forEach(id=>$(id).hidden=false);$('show-answer').hidden=true;$('next').hidden=true;
    $('next').textContent=state.index===9?'See results →':'Next question →';
  }
  function disableInputs(){
    $('workspace').querySelectorAll('button').forEach(b=>b.disabled=true);
    ['check','clear','hint','show-answer'].forEach(id=>$(id).hidden=true);$('next').hidden=false;
  }
  function checkAnswer(){
    if(state.locked)return;
    const result=engine.checkAnswer(state.question,state.response);
    if(!result.complete){showFeedback(state.level==='hard'?'Build all six steps before checking.':
      state.level==='medium'?'Choose three answers before checking.':'Choose one answer before checking.','neutral');return;}
    if(result.correct){
      state.locked=true;state.score++;if(!state.wrong)state.firstTry++;
      updateProgress('solved',(Number(progress().solved)||0)+1);
      showFeedback('Correct! '+state.question.explanation,'good');disableInputs();return;
    }
    state.wrong++;
    showFeedback(state.level==='easy'?'Check which principle this example shows.':
      state.level==='medium'?'Choose only information or subtasks that help solve the problem.':
      'Start with inputs, then split the problem, initialise, repeat, test and report. Two cards are unnecessary.','bad');
    if(state.wrong>=2)$('show-answer').hidden=false;
  }
  function showModel(){
    if(state.locked||state.wrong<2)return;state.locked=true;disableInputs();
    const panel=$('hint-panel');panel.replaceChildren(node('strong','','Worked plan'),node('pre','erl',state.question.model));panel.hidden=false;
    showFeedback('Compare your approach with the model. No point was awarded.','neutral');
  }
  function clearAnswer(){
    if(state.locked)return;state.response=state.question.type==='choose'?null:[];resetMessages();
    renderWorkspace(state.question);$('show-answer').hidden=state.wrong<2;
  }
  function finish(){
    core.reportCompletion(2,SKILL,state.level,state.firstTry,10);
    updateProgress('best',Math.max(Number(progress().best)||0,state.score));
    updateProgress('sessions',(Number(progress().sessions)||0)+1);
    $('question-position').textContent='Completed';$('meter').setAttribute('aria-valuenow','10');$('meter-fill').style.width='100%';
    $('question-card').classList.add('finished');$('prompt').textContent='';$('context').textContent='';resetMessages();
    ['check','clear','hint','show-answer','next'].forEach(id=>$(id).hidden=true);
    const board=$('workspace');board.replaceChildren();const result=node('div','results');
    result.append(node('span','result-kicker','Skill 19 · '+state.level+' complete'),node('strong','',state.score+' / 10'),
      node('h2','',state.score===10?'Great work!':'Keep practising'),
      node('p','','Best score on this device: '+progress().best+'/10. Replay or try another level.'));
    const actions=node('div','results-actions'),replay=node('button','btn primary','Practise again');replay.type='button';
    replay.addEventListener('click',()=>chooseLevel(state.level));
    const hub=node('a','btn','All skills');hub.href='/exercise/paper2/';
    actions.append(replay,hub);result.append(actions);board.append(result);
  }
  function chooseLevel(level){
    state.level=core.validLevel(level);core.updateLevelUrl(state.level);state.index=0;
    state.seed=Math.floor(Math.random()*2147483647)+1;state.score=0;state.firstTry=0;
    document.querySelectorAll('.level').forEach(button=>{const active=button.dataset.level===state.level;
      button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));});
    renderQuestion();
  }
  document.querySelectorAll('.level').forEach(b=>b.addEventListener('click',()=>chooseLevel(b.dataset.level)));
  $('check').addEventListener('click',checkAnswer);$('clear').addEventListener('click',clearAnswer);
  $('show-answer').addEventListener('click',showModel);
  $('next').addEventListener('click',()=>{if(!state.locked)return;if(state.index===9)finish();else{state.index++;renderQuestion();window.scrollTo(0,0);}});
  $('hint').addEventListener('click',()=>{const box=$('hint-panel');box.hidden=!box.hidden;
    box.textContent=state.question.hint;$('hint').textContent=box.hidden?'Show hint':'Hide hint';});
  window.RHSSkillsDemoProvider=()=>engine.makeDemo(state.question);
  chooseLevel(core.levelFromUrl());
})();

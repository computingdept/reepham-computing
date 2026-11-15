/* Skill 22: visual understanding → read OCR ERL and trace → write and trace. */
(function(){
  'use strict';
  const engine=window.J277LinearSearch,core=window.RHSCSkills;
  if(!engine||!core)throw Error('Linear Search scripts did not load.');
  const $=id=>document.getElementById(id),KEY='rhs-j277-paper2-progress-v1',SKILL='linear-search';
  const descriptions={easy:'Understand · check cells in order',medium:'Read code · complete a trace',hard:'Write ERL · complete a trace'};
  const state={level:'easy',index:0,score:0,firstTry:0,wrong:0,question:null,response:null,locked:false};
  const node=(tag,klass,label)=>{const x=document.createElement(tag);if(klass)x.className=klass;if(label!==undefined)x.textContent=label;return x;};
  function progress(){const all=core.readProgress(KEY),x=all[SKILL]?.[state.level];return x&&typeof x==='object'?x:{solved:0,best:0,sessions:0};}
  function update(field,value){const all=core.readProgress(KEY),before=progress();
    if(!all[SKILL]||typeof all[SKILL]!=='object')all[SKILL]={};
    all[SKILL][state.level]={solved:Number(before.solved)||0,best:Number(before.best)||0,sessions:Number(before.sessions)||0,[field]:value};
    core.writeProgress(KEY,all);
  }
  function feedback(message,kind){const x=$('feedback');x.textContent=message;x.className='message '+kind;x.hidden=false;}
  function hideMessages(){$('feedback').hidden=true;$('feedback').textContent='';$('hint-panel').hidden=true;$('hint-panel').replaceChildren();$('hint').textContent='Show hint';}
  function freshResponse(q){return q.level==='easy'?{visited:[],notFound:false}:{values:{},matches:Array(q.visits.length).fill(null),result:'',code:{}};}
  function success(){state.locked=true;state.score++;if(!state.wrong)state.firstTry++;
    update('solved',(Number(progress().solved)||0)+1);
    feedback('Correct! '+state.question.explanation,'good');freeze();}
  function freeze(){state.locked=true;$('workspace').querySelectorAll('input,button').forEach(b=>b.disabled=true);
    ['check','clear','hint','show-answer'].forEach(id=>$(id).hidden=true);$('next').hidden=false;}
  function mistake(message){state.wrong++;feedback(message,'bad');if(state.wrong>=2)$('show-answer').hidden=false;}
  function strip(q,interactive){
    const wrap=node('section','search-visual');
    wrap.append(node('div','search-caption','ARRAY · INDEX STARTS AT 0'));
    const cells=node('div','search-cells');cells.style.setProperty('--cell-count',String(q.values.length));
    q.values.forEach((value,i)=>{
      const cell=node(interactive?'button':'div','search-cell',String(value));
      const index=node('span','search-index',''+i);cell.prepend(index);
      const seen=interactive&&state.response.visited.includes(i);
      cell.classList.toggle('is-checked',!!seen);cell.classList.toggle('is-match',!!(seen&&i===q.found));
      if(interactive){cell.type='button';cell.disabled=state.locked||!!(state.response.visited.includes(q.found)&&q.found>=0);
        cell.setAttribute('aria-label','Check index '+i+', value '+value);
        cell.addEventListener('click',()=>visit(i));}
      cells.append(cell);
    });
    wrap.append(cells);return wrap;
  }
  function visit(i){
    if(state.locked)return;
    const q=state.question,next=state.response.visited.length;
    if(i!==next){mistake('Check index '+next+' next. Linear search moves from left to right without skipping.');return;}
    state.response.visited.push(i);
    if(i===q.found){success();renderWorkspace();return;}
    $('feedback').hidden=true;renderWorkspace();
  }
  function renderEasy(q,board){
    board.append(strip(q,true));
    const instructions=node('div','search-easy-instructions');
    instructions.append(node('p','',q.found<0?'Check every value. If '+q.target+' is missing, press Not found.':
      'Check the values one by one. Stop as soon as you find '+q.target+'.'));
    const count=state.response.visited.length;
    instructions.append(node('strong','search-progress','Checked '+count+' of '+q.values.length));
    const absent=node('button','search-absent','Not found');absent.type='button';absent.disabled=state.locked;
    absent.addEventListener('click',()=>{
      if(q.found>=0){mistake('This array contains '+q.target+'. Keep checking in order.');return;}
      if(state.response.visited.length!==q.values.length){mistake('Check every element before deciding that the value is absent.');return;}
      state.response.notFound=true;success();renderWorkspace();
    });
    instructions.append(absent);board.append(instructions);
  }
  function codePanel(q){
    const section=node('section','search-code');section.append(node('strong','search-caption',q.level==='hard'?'WRITE THE THREE MISSING ERL LINES':'READ THE OCR ERL CODE'));
    const lines=node('div','search-code-lines');
    q.code.forEach((line,i)=>{
      const row=node('div','search-code-row');row.append(node('span','search-code-number',String(i+1).padStart(2,'0')));
      if(q.gaps.includes(i+1)){
        const input=node('input','search-code-input');input.type='text';input.spellcheck=false;
        input.placeholder='Write line '+(i+1);input.value=state.response.code[i+1]||'';
        input.setAttribute('aria-label','OCR ERL line '+(i+1));input.addEventListener('input',()=>{state.response.code[i+1]=input.value;});
        input.disabled=state.locked;row.append(input);
      }else{
        row.append(node('code','search-code-text',line));
        if(i+1===q.entryLine){row.classList.add('is-entry');row.append(node('mark','rhsc-skill-start','START HERE'));}
      }
      lines.append(row);
    });
    section.append(lines);return section;
  }
  function tracePanel(q){
    const section=node('section','search-trace');section.append(node('strong','search-caption','COMPLETE THE TRACE TABLE'));
    const table=node('table','search-table');const head=node('thead'),headRow=node('tr');
    ['i','values[i]','Match?'].forEach(x=>headRow.append(node('th','',x)));head.append(headRow);table.append(head);
    const body=node('tbody');
    q.visits.forEach((i,j)=>{
      const row=node('tr');row.append(node('td','search-trace-index',String(i)));
      const value=node('td','');
      if(i%2===1){const input=node('input','search-value-input');input.type='text';input.inputMode='numeric';
        input.value=state.response.values[i]??'';input.placeholder='?';input.setAttribute('aria-label','Value at index '+i);
        input.disabled=state.locked;input.addEventListener('input',()=>{state.response.values[i]=input.value;});value.append(input);
      }else value.textContent=String(q.values[i]);
      row.append(value);
      const match=node('td','');const buttons=node('div','search-boolean');
      for(const answer of [true,false]){
        const button=node('button','search-bool',answer?'True':'False');button.type='button';button.disabled=state.locked;
        button.setAttribute('aria-pressed',String(state.response.matches[j]===answer));
        button.addEventListener('click',()=>{state.response.matches[j]=answer;renderWorkspace();});buttons.append(button);
      }
      match.append(buttons);row.append(match);body.append(row);
    });
    table.append(body);section.append(table);
    const result=node('label','search-return');result.append(node('strong','','Return index'));
    const input=node('input','search-result-input');input.type='text';input.inputMode='numeric';input.placeholder='index or -1';
    input.value=state.response.result;input.disabled=state.locked;input.setAttribute('aria-label','Returned index');
    input.addEventListener('input',()=>{state.response.result=input.value;});result.append(input);section.append(result);
    return section;
  }
  function renderWorkspace(){
    const q=state.question,board=$('workspace');board.replaceChildren();
    if(q.level==='easy')renderEasy(q,board);
    else{board.append(strip(q,false));const grid=node('div','search-work-grid');grid.append(codePanel(q),tracePanel(q));board.append(grid);}
  }
  function renderQuestion(){
    const q=state.question=engine.makeQuestion(state.level,state.index);
    state.response=freshResponse(q);state.wrong=0;state.locked=false;hideMessages();
    $('question-card').classList.remove('finished');
    $('prompt').textContent=state.level==='easy'?'Find '+q.target+' using Linear Search':
      state.level==='medium'?'Trace linearSearch(numbers, '+q.target+')':'Complete the function, then trace it';
    $('context').textContent=q.context;
    $('level-description').textContent=descriptions[state.level];
    $('question-position').textContent='Question '+(state.index+1)+' of 10';
    $('meter').setAttribute('aria-valuenow',String(state.index));$('meter-fill').style.width=state.index*10+'%';
    ['clear','hint'].forEach(id=>$(id).hidden=false);$('check').hidden=state.level==='easy';
    $('show-answer').hidden=true;$('next').hidden=true;
    $('next').textContent=state.index===9?'See results →':'Next question →';
    renderWorkspace();
  }
  function check(){
    if(state.locked)return;const outcome=engine.checkAnswer(state.question,state.response);
    if(!outcome.complete){feedback('Fill every trace-table gap, the return value'+(state.level==='hard'?' and the three code lines':'')+'.','neutral');return;}
    if(outcome.correct){success();renderWorkspace();return;}
    mistake('Check the values, each True/False comparison and the returned index.'+
      (state.level==='hard'?' Check the OCR ERL lines too.':''));
  }
  function showModel(){
    if(state.locked||state.wrong<2)return;const q=state.question,m=engine.model(q),box=$('hint-panel');
    box.replaceChildren(node('strong','','Worked model'));
    if(q.level==='hard')box.append(node('pre','erl',m.lines.join('\n')));
    box.append(node('pre','erl','i  value  match?\n'+m.rows.map(row=>row.join('    ')).join('\n')+'\nRETURN '+m.result));
    box.hidden=false;state.locked=true;freeze();feedback('Use this model to improve your next attempt. No point was awarded.','neutral');
  }
  function clear(){if(state.locked)return;state.response=freshResponse(state.question);hideMessages();$('show-answer').hidden=state.wrong<2;renderWorkspace();}
  function finish(){
    core.reportCompletion(2,SKILL,state.level,state.firstTry,10);
    update('best',Math.max(Number(progress().best)||0,state.score));
    update('sessions',(Number(progress().sessions)||0)+1);
    $('question-position').textContent='Completed';$('meter').setAttribute('aria-valuenow','10');$('meter-fill').style.width='100%';
    $('question-card').classList.add('finished');$('prompt').textContent='';$('context').textContent='';hideMessages();
    ['check','clear','hint','show-answer','next'].forEach(id=>$(id).hidden=true);
    const board=$('workspace');board.replaceChildren();const result=node('div','results');
    result.append(node('span','result-kicker','Skill 22 · '+state.level+' complete'),node('strong','',state.score+' / 10'),
      node('h2','',state.score===10?'Great work!':'Keep practising'),
      node('p','','Best score on this device: '+progress().best+'/10. Replay or try another level.'));
    const actions=node('div','results-actions'),again=node('button','btn primary','Practise again');again.type='button';
    again.addEventListener('click',()=>chooseLevel(state.level));const hub=node('a','btn','All skills');hub.href='/exercise/paper2/';
    actions.append(again,hub);result.append(actions);board.append(result);
  }
  function chooseLevel(level){
    state.level=core.validLevel(level);core.updateLevelUrl(state.level);state.index=0;state.score=0;state.firstTry=0;
    document.querySelectorAll('.level').forEach(button=>{const active=button.dataset.level===state.level;
      button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));});renderQuestion();
  }
  document.querySelectorAll('.level').forEach(b=>b.addEventListener('click',()=>chooseLevel(b.dataset.level)));
  $('check').addEventListener('click',check);$('clear').addEventListener('click',clear);$('show-answer').addEventListener('click',showModel);
  $('next').addEventListener('click',()=>{if(!state.locked)return;if(state.index===9)finish();else{state.index++;renderQuestion();window.scrollTo(0,0);}});
  $('hint').addEventListener('click',()=>{const box=$('hint-panel');box.hidden=!box.hidden;
    box.textContent=state.question.hint;$('hint').textContent=box.hidden?'Show hint':'Hide hint';});
  window.RHSSkillsDemoProvider=()=>engine.makeDemo();
  chooseLevel(core.levelFromUrl());
})();

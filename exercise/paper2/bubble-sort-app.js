/* Skill 24: choose swaps → trace a pass → complete code and the full sort. */
(function(){
  'use strict';
  const engine=window.J277BubbleSort,core=window.RHSCSkills;
  if(!engine||!core)throw Error('Bubble Sort scripts did not load.');
  const $=id=>document.getElementById(id),KEY='rhs-j277-paper2-progress-v1',SKILL='bubble-sort';
  const descriptions={easy:'Understand · compare and swap',medium:'Read code · trace one pass',hard:'Write code · trace the full sort'};
  const state={level:'easy',index:0,question:null,response:null,score:0,firstTry:0,wrong:0,locked:false};
  const node=(tag,cls,value)=>{const x=document.createElement(tag);if(cls)x.className=cls;if(value!==undefined)x.textContent=value;return x;};
  function progress(){const p=core.readProgress(KEY),x=p[SKILL]?.[state.level];return x&&typeof x==='object'?x:{solved:0,best:0,sessions:0};}
  function save(field,value){const p=core.readProgress(KEY),before=progress();if(!p[SKILL]||typeof p[SKILL]!=='object')p[SKILL]={};
    p[SKILL][state.level]={solved:Number(before.solved)||0,best:Number(before.best)||0,sessions:Number(before.sessions)||0,[field]:value};
    core.writeProgress(KEY,p);
  }
  function feedback(msg,kind){const x=$('feedback');x.textContent=msg;x.className='message '+kind;x.hidden=false;}
  function resetMessages(){$('feedback').hidden=true;$('feedback').textContent='';$('hint-panel').replaceChildren();$('hint-panel').hidden=true;$('hint').textContent='Show hint';}
  function fresh(q){return q.level==='easy'?{swaps:[]}:
    q.level==='medium'?{swaps:Array(q.firstPass.length).fill(null),result:''}:
    {passes:Array(q.passes.length).fill(''),code:{}};}
  function freeze(){state.locked=true;$('workspace').querySelectorAll('input,button').forEach(x=>x.disabled=true);
    ['check','clear','hint','show-answer'].forEach(id=>$(id).hidden=true);$('next').hidden=false;}
  function right(){if(!engine.checkAnswer(state.question,state.response).correct)return;
    state.score++;if(!state.wrong)state.firstTry++;save('solved',(Number(progress().solved)||0)+1);
    feedback('Correct! '+state.question.explanation,'good');freeze();renderWorkspace();}
  function wrong(message){state.wrong++;feedback(message,'bad');if(state.wrong>=2)$('show-answer').hidden=false;}
  function arrayDisplay(q,interactive){
    const board=node('section','bubble-array');
    const heading=node('div','bubble-array-heading');heading.append(node('strong','','SORT IN ASCENDING ORDER'),node('span','','5 values · indices 0–4'));board.append(heading);
    const index=state.response.swaps?.length||0,step=q.firstPass[index];
    const values=interactive?(step?.before||q.passes[0].after):q.values;
    const cells=node('div','bubble-cells');
    values.forEach((value,i)=>{
      const cell=node('div','bubble-cell',String(value));cell.prepend(node('span','bubble-index',String(i)));
      if(interactive&&step&&(i===step.i||i===step.i+1))cell.classList.add('is-comparing');
      if(interactive&&!step&&i===values.length-1)cell.classList.add('is-sorted');
      cells.append(cell);
    });board.append(cells);return board;
  }
  function chooseSwap(answer){
    if(state.locked)return;const q=state.question,step=q.firstPass[state.response.swaps.length];
    if(!step)return;
    if(step.swap!==answer){wrong('For ASCENDING order, swap only when the LEFT number is greater than the RIGHT.');return;}
    state.response.swaps.push(answer);$('feedback').hidden=true;
    if(state.response.swaps.length===q.firstPass.length)right();else renderWorkspace();
  }
  function renderEasy(q,board){
    board.append(arrayDisplay(q,true));const index=state.response.swaps.length,step=q.firstPass[index];
    const panel=node('section','bubble-task');
    if(step){
      panel.append(node('strong','','Compare '+step.left+' and '+step.right+' — what should happen?'));
      const actions=node('div','bubble-choices');
      for(const [answer,label] of [[true,'⇄ SWAP'],[false,'✓ KEEP']]){
        const button=node('button','bubble-choice',label);button.type='button';button.addEventListener('click',()=>chooseSwap(answer));actions.append(button);
      }
      panel.append(actions);
    }else panel.append(node('strong','','First pass complete — the largest value has moved to the end.'));
    panel.append(node('span','bubble-count','Comparison '+Math.min(index+1,q.firstPass.length)+' of '+q.firstPass.length));
    board.append(panel);
  }
  function codePanel(q){
    const box=node('section','bubble-code');box.append(node('strong','bubble-caption',q.level==='hard'?'WRITE THREE MISSING ERL LINES':'READ THE OCR ERL CODE'));
    const lines=node('div','bubble-code-lines');q.code.forEach((line,i)=>{
      const row=node('div','bubble-code-row');row.append(node('span','bubble-code-num',String(i+1).padStart(2,'0')));
      if(q.gaps.includes(i+1)){
        const input=node('input','bubble-code-input');input.type='text';input.spellcheck=false;
        input.placeholder='Write line '+(i+1);input.disabled=state.locked;input.value=state.response.code[i+1]||'';
        input.setAttribute('aria-label','OCR ERL line '+(i+1));input.addEventListener('input',()=>state.response.code[i+1]=input.value);
        row.append(input);
      }else{
        row.append(node('code','bubble-code-text',line));
        if(i+1===q.entryLine){row.classList.add('is-entry');row.append(node('mark','rhsc-skill-start','START HERE'));}
      }
      lines.append(row);
    });box.append(lines);return box;
  }
  function mediumTrace(q){
    const box=node('section','bubble-trace');box.append(node('strong','bubble-caption','TRACE THE FIRST PASS'));
    const table=node('table','bubble-table'),thead=node('thead'),heading=node('tr');
    ['i','Left','Right','SWAP?'].forEach(name=>heading.append(node('th','',name)));thead.append(heading);table.append(thead);
    const body=node('tbody');q.firstPass.forEach((step,i)=>{
      const row=node('tr');row.append(node('td','',String(i)),node('td','',String(step.left)),node('td','',String(step.right)));
      const choice=node('td',''),buttons=node('div','bubble-boolean');
      for(const [v,label] of [[true,'Yes'],[false,'No']]){
        const b=node('button','bubble-bool',label);b.type='button';b.disabled=state.locked;
        b.setAttribute('aria-pressed',String(state.response.swaps[i]===v));
        b.setAttribute('aria-label','Comparison '+(i+1)+': '+label);
        b.addEventListener('click',()=>{state.response.swaps[i]=v;renderWorkspace();});buttons.append(b);
      }
      choice.append(buttons);row.append(choice);body.append(row);
    });table.append(body);box.append(table);
    const result=node('label','bubble-output');result.append(node('strong','','Array after pass 1'));
    const input=node('input','bubble-array-input');input.type='text';input.placeholder='e.g. 2, 7, 3, 9, 5';
    input.value=state.response.result;input.disabled=state.locked;input.setAttribute('aria-label','Array after first pass');
    input.addEventListener('input',()=>state.response.result=input.value);result.append(input);box.append(result);
    return box;
  }
  function hardTrace(q){
    const box=node('section','bubble-trace');box.append(node('strong','bubble-caption','TRACE ALL FOUR PASSES'));
    box.append(node('p','bubble-guidance','After each pass, type the entire array (comma-separated).'));
    const table=node('table','bubble-table'),thead=node('thead'),heading=node('tr');
    ['Pass','Array after this pass'].forEach(x=>heading.append(node('th','',x)));thead.append(heading);table.append(thead);
    const body=node('tbody');q.passes.forEach((pass,i)=>{
      const row=node('tr');row.append(node('th','',String(i+1)));
      const td=node('td',''),input=node('input','bubble-pass-input');input.type='text';input.placeholder='five values';
      input.value=state.response.passes[i];input.disabled=state.locked;input.setAttribute('aria-label','Array after pass '+(i+1));
      input.addEventListener('input',()=>state.response.passes[i]=input.value);td.append(input);row.append(td);body.append(row);
    });table.append(body);box.append(table);return box;
  }
  function renderWorkspace(){
    const q=state.question,board=$('workspace');board.replaceChildren();
    if(q.level==='easy')renderEasy(q,board);
    else{board.append(arrayDisplay(q,false));const grid=node('div','bubble-grid');grid.append(codePanel(q),q.level==='medium'?mediumTrace(q):hardTrace(q));board.append(grid);}
  }
  function renderQuestion(){
    const q=state.question=engine.makeQuestion(state.level,state.index);state.response=fresh(q);state.locked=false;state.wrong=0;resetMessages();
    $('question-card').classList.remove('finished');
    $('prompt').textContent=state.level==='easy'?'Bubble up the largest value':
      state.level==='medium'?'Trace the FIRST pass of bubbleSort':'Complete bubbleSort, then trace ALL passes';
    $('context').textContent=state.level==='easy'?'Compare each pair. Swap to put the smaller value on the LEFT.':
      state.level==='medium'?'Read the nested-loop code. Record whether each adjacent pair swaps.':
      'Write the three missing code lines, then show the array after each pass.';
    $('level-description').textContent=descriptions[state.level];$('question-position').textContent='Question '+(state.index+1)+' of 10';
    $('meter').setAttribute('aria-valuenow',String(state.index));$('meter-fill').style.width=state.index*10+'%';
    $('check').hidden=state.level==='easy';['hint','clear'].forEach(x=>$(x).hidden=false);
    $('show-answer').hidden=true;$('next').hidden=true;$('next').textContent=state.index===9?'See results →':'Next question →';renderWorkspace();
  }
  function check(){if(state.locked)return;const outcome=engine.checkAnswer(state.question,state.response);
    if(!outcome.complete){feedback(state.level==='medium'?'Choose Yes/No for every comparison and enter the array after the pass.':
      'Write the missing ERL lines and all four arrays.','neutral');return;}
    if(outcome.correct){right();return;}wrong('Check the adjacent comparisons and how the array changes after each pass.'+
      (state.level==='hard'?' Check the missing ERL instructions too.':''));
  }
  function model(){if(state.locked||state.wrong<2)return;
    const q=state.question,m=engine.model(q),box=$('hint-panel');box.replaceChildren(node('strong','','Worked answer'));
    if(q.level==='hard')box.append(node('pre','erl',m.lines.join('\n')));
    box.append(node('pre','erl',q.level==='hard'?m.passes.map((r,i)=>'Pass '+(i+1)+': '+r.join(', ')).join('\n'):
      m.onePass.map((r,i)=>(i+1)+'. '+r[1]+' vs '+r[2]+' → '+(r[3]?'Swap':'Keep')).join('\n')+'\nAfter pass: '+q.passes[0].after.join(', ')));
    box.hidden=false;freeze();feedback('Compare with the model. No point was awarded.','neutral');
  }
  function clear(){if(state.locked)return;state.response=fresh(state.question);resetMessages();$('show-answer').hidden=state.wrong<2;renderWorkspace();}
  function finish(){core.reportCompletion(2,SKILL,state.level,state.firstTry,10);
    save('best',Math.max(Number(progress().best)||0,state.score));save('sessions',(Number(progress().sessions)||0)+1);
    $('question-position').textContent='Completed';$('meter').setAttribute('aria-valuenow','10');$('meter-fill').style.width='100%';
    $('question-card').classList.add('finished');$('prompt').textContent='';$('context').textContent='';resetMessages();
    ['check','clear','hint','show-answer','next'].forEach(x=>$(x).hidden=true);
    const board=$('workspace');board.replaceChildren();const result=node('div','results');
    result.append(node('span','result-kicker','Skill 24 · '+state.level+' complete'),node('strong','',state.score+' / 10'),
      node('h2','',state.score===10?'Great work!':'Keep practising'),node('p','','Best score on this device: '+progress().best+'/10.'));
    const actions=node('div','results-actions'),again=node('button','btn primary','Practise again');again.type='button';
    again.addEventListener('click',()=>chooseLevel(state.level));const hub=node('a','btn','All skills');hub.href='/exercise/paper2/';
    actions.append(again,hub);result.append(actions);board.append(result);
  }
  function chooseLevel(level){state.level=core.validLevel(level);core.updateLevelUrl(state.level);state.index=0;state.score=0;state.firstTry=0;
    document.querySelectorAll('.level').forEach(b=>{const chosen=b.dataset.level===state.level;
      b.classList.toggle('active',chosen);b.setAttribute('aria-pressed',String(chosen));});renderQuestion();}
  document.querySelectorAll('.level').forEach(b=>b.addEventListener('click',()=>chooseLevel(b.dataset.level)));
  $('check').addEventListener('click',check);$('clear').addEventListener('click',clear);$('show-answer').addEventListener('click',model);
  $('next').addEventListener('click',()=>{if(!state.locked)return;if(state.index===9)finish();else{state.index++;renderQuestion();window.scrollTo(0,0);}});
  $('hint').addEventListener('click',()=>{const box=$('hint-panel');box.hidden=!box.hidden;box.textContent=state.question.hint;
    $('hint').textContent=box.hidden?'Show hint':'Hide hint';});
  window.RHSSkillsDemoProvider=()=>engine.makeDemo();chooseLevel(core.levelFromUrl());
})();

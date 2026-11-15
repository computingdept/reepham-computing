/* Skill 23 · binary search: visual halving → code trace → code completion. */
(function(){
  'use strict';
  const engine=window.J277BinarySearch,core=window.RHSCSkills;
  if(!engine||!core)throw Error('Binary Search scripts did not load.');
  const $=id=>document.getElementById(id),KEY='rhs-j277-paper2-progress-v1',SKILL='binary-search';
  const descriptions={easy:'Understand · halve the search range',medium:'Read code · fill a trace table',hard:'Write code · explain each midpoint'};
  const state={level:'easy',index:0,question:null,response:null,phase:'middle',mid:null,score:0,firstTry:0,wrong:0,locked:false};
  const node=(tag,cls,value)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(value!==undefined)e.textContent=value;return e;};
  function progress(){const p=core.readProgress(KEY),item=p[SKILL]?.[state.level];return item&&typeof item==='object'?item:{solved:0,best:0,sessions:0};}
  function save(field,value){const p=core.readProgress(KEY),before=progress();if(!p[SKILL]||typeof p[SKILL]!=='object')p[SKILL]={};
    p[SKILL][state.level]={solved:Number(before.solved)||0,best:Number(before.best)||0,sessions:Number(before.sessions)||0,[field]:value};
    core.writeProgress(KEY,p);
  }
  function showFeedback(message,kind){const e=$('feedback');e.textContent=message;e.className='message '+kind;e.hidden=false;}
  function hideMessages(){$('feedback').hidden=true;$('feedback').textContent='';$('hint-panel').hidden=true;
    $('hint-panel').replaceChildren();$('hint').textContent='Show hint';}
  function freshResponse(q){return q.level==='easy'?{steps:[],notFound:false}:
    {mids:Array(q.rows.length).fill(''),values:Array(q.rows.length).fill(''),
      decisions:Array(q.rows.length).fill(null),result:'',code:{}};}
  function freeze(){state.locked=true;$('workspace').querySelectorAll('input,button').forEach(b=>b.disabled=true);
    ['check','clear','hint','show-answer'].forEach(id=>$(id).hidden=true);$('next').hidden=false;}
  function correct(){if(!engine.checkAnswer(state.question,state.response).correct)return;
    state.score++;if(!state.wrong)state.firstTry++;save('solved',(Number(progress().solved)||0)+1);
    showFeedback('Correct! '+state.question.explanation,'good');freeze();renderWorkspace();}
  function wrong(message){state.wrong++;showFeedback(message,'bad');if(state.wrong>=2)$('show-answer').hidden=false;}
  function strip(q,interactive){
    const box=node('section','binary-array');const heading=node('div','binary-strip-heading');
    heading.append(node('strong','','SORTED ARRAY · SMALL → LARGE'),node('span','','target = '+q.target));box.append(heading);
    const cells=node('div','binary-cells');cells.style.setProperty('--cell-count',String(q.values.length));
    const step=state.response.steps?.length||0,row=q.rows[step],currentRange=row||null;
    q.values.forEach((value,i)=>{
      const cell=node(interactive?'button':'div','binary-cell',String(value));cell.prepend(node('span','binary-index',String(i)));
      if(interactive){
        const excluded=!currentRange||i<currentRange.low||i>currentRange.high;
        const chosen=state.phase==='half'&&i===state.mid;
        cell.classList.toggle('is-excluded',excluded);cell.classList.toggle('is-mid',chosen);
        cell.type='button';cell.disabled=state.locked||state.phase!=='middle'||excluded;
        cell.setAttribute('aria-label','Check middle index '+i+', value '+value);
        cell.addEventListener('click',()=>chooseMiddle(i));
      }
      cells.append(cell);
    });box.append(cells);return box;
  }
  function chooseMiddle(index){
    if(state.locked||state.phase!=='middle')return;
    const q=state.question,expected=q.rows[state.response.steps.length];if(!expected)return;
    if(index!==expected.mid){wrong('Choose the middle index. Add low and high, divide by 2, then round DOWN.');return;}
    state.mid=index;$('feedback').hidden=true;
    if(expected.decision==='Found'){
      state.response.steps.push({mid:index,decision:'Found'});correct();return;
    }
    state.phase='half';renderWorkspace();
  }
  function chooseHalf(decision){
    const q=state.question,row=q.rows[state.response.steps.length];
    if(state.locked||state.phase!=='half'||!row)return;
    if(row.decision!==decision){wrong('Compare target '+q.target+' with '+row.value+'. Keep the half where the target could be.');return;}
    state.response.steps.push({mid:row.mid,decision});state.mid=null;
    state.phase=state.response.steps.length===q.rows.length?'absent':'middle';
    $('feedback').hidden=true;renderWorkspace();
  }
  function renderEasy(q,board){
    board.append(strip(q,true));const work=node('section','binary-choice');
    const step=state.response.steps.length,row=q.rows[step];
    if(state.phase==='middle'&&row){
      work.append(node('strong','binary-task','Tap the MIDDLE value of the active range.'));
      work.append(node('span','binary-range','low = '+row.low+'     high = '+row.high));
      work.append(node('p','','Look at the indices. Which cell is halfway between the boundaries?'));
    } else if(state.phase==='half'&&row){
      work.append(node('strong','binary-task','You checked '+row.value+'. Which HALF can still contain '+q.target+'?'));
      const buttons=node('div','binary-half-buttons');
      for(const [decision,label] of [['Left','← Keep LEFT'],['Right','Keep RIGHT →']]){
        const b=node('button','binary-half',label);b.type='button';b.addEventListener('click',()=>chooseHalf(decision));buttons.append(b);
      }
      work.append(buttons);
    } else if(state.phase==='absent'){
      work.append(node('strong','binary-task','low is now greater than high. No cells remain.'));
      const b=node('button','binary-half','Not found (return -1)');b.type='button';
      b.addEventListener('click',()=>{state.response.notFound=true;correct();});work.append(b);
    }
    work.append(node('span','binary-progress','Comparisons: '+state.response.steps.length+' of '+q.rows.length));
    board.append(work);
  }
  function codePanel(q){
    const box=node('section','binary-code');box.append(node('strong','binary-caption',q.level==='hard'?'WRITE THE THREE MISSING ERL LINES':'READ THE OCR ERL CODE'));
    const list=node('div','binary-code-list');
    q.code.forEach((line,i)=>{
      const lineRow=node('div','binary-code-row');lineRow.append(node('span','binary-code-num',String(i+1).padStart(2,'0')));
      if(q.gaps.includes(i+1)){
        const input=node('input','binary-code-input');input.type='text';input.spellcheck=false;input.placeholder='Write line '+(i+1);
        input.value=state.response.code[i+1]||'';input.disabled=state.locked;
        input.setAttribute('aria-label','OCR ERL line '+(i+1));input.addEventListener('input',()=>{state.response.code[i+1]=input.value;});
        lineRow.append(input);
      }else{
        lineRow.append(node('code','binary-code-text',line));
        if(i+1===q.entryLine){lineRow.classList.add('is-entry');lineRow.append(node('mark','rhsc-skill-start','START HERE'));}
      }
      list.append(lineRow);
    });box.append(list);return box;
  }
  function tracePanel(q){
    const box=node('section','binary-trace');box.append(node('strong','binary-caption','COMPLETE THE TRACE TABLE'));
    const table=node('table','binary-table'),thead=node('thead'),heads=node('tr');
    for(const h of ['low','high','mid','value','keep'])heads.append(node('th','',h));thead.append(heads);table.append(thead);
    const body=node('tbody');q.rows.forEach((row,i)=>{
      const tr=node('tr');tr.append(node('td','',String(row.low)),node('td','',String(row.high)));
      for(const [field,list] of [['mid','mids'],['value','values']]){
        const td=node('td',''),input=node('input','binary-trace-input');input.type='text';input.inputMode='numeric';
        input.value=state.response[list][i]??'';input.placeholder='?';input.disabled=state.locked;
        input.setAttribute('aria-label',field+' at comparison '+(i+1));
        input.addEventListener('input',()=>{state.response[list][i]=input.value;});td.append(input);tr.append(td);
      }
      const decision=node('td',''),buttons=node('div','binary-decisions');
      for(const value of ['Left','Right','Found']){
        const b=node('button','binary-decision',value==='Left'?'←':value==='Right'?'→':'✓');b.type='button';b.disabled=state.locked;
        b.setAttribute('aria-label','Comparison '+(i+1)+': '+value);b.setAttribute('aria-pressed',String(state.response.decisions[i]===value));
        b.title=value;b.addEventListener('click',()=>{state.response.decisions[i]=value;renderWorkspace();});buttons.append(b);
      }
      decision.append(buttons);tr.append(decision);body.append(tr);
    });table.append(body);box.append(table);
    const legend=node('p','binary-legend','← keep left   → keep right   ✓ found');box.append(legend);
    const end=node('label','binary-return');end.append(node('strong','','Return index'));
    const input=node('input','binary-result-input');input.type='text';input.inputMode='numeric';input.placeholder='index or -1';
    input.value=state.response.result;input.disabled=state.locked;input.setAttribute('aria-label','Returned index');
    input.addEventListener('input',()=>{state.response.result=input.value;});end.append(input);box.append(end);
    return box;
  }
  function renderWorkspace(){
    const q=state.question,board=$('workspace');board.replaceChildren();
    if(q.level==='easy')renderEasy(q,board);
    else{board.append(strip(q,false));const grid=node('div','binary-work-grid');grid.append(codePanel(q),tracePanel(q));board.append(grid);}
  }
  function renderQuestion(){
    const q=state.question=engine.makeQuestion(state.level,state.index);
    state.response=freshResponse(q);state.phase='middle';state.mid=null;state.wrong=0;state.locked=false;hideMessages();
    $('question-card').classList.remove('finished');
    $('prompt').textContent=state.level==='easy'?'Find '+q.target+' using Binary Search':
      state.level==='medium'?'Trace binarySearch(numbers, '+q.target+')':'Complete binarySearch, then trace it';
    $('context').textContent='Golden rule: the array must be SORTED before binary search. '+
      (q.found<0?'The target might not be present.':'Find the target index.');
    $('level-description').textContent=descriptions[state.level];$('question-position').textContent='Question '+(state.index+1)+' of 10';
    $('meter').setAttribute('aria-valuenow',String(state.index));$('meter-fill').style.width=state.index*10+'%';
    ['clear','hint'].forEach(id=>$(id).hidden=false);$('check').hidden=state.level==='easy';
    $('show-answer').hidden=true;$('next').hidden=true;$('next').textContent=state.index===9?'See results →':'Next question →';renderWorkspace();
  }
  function check(){if(state.locked)return;const result=engine.checkAnswer(state.question,state.response);
    if(!result.complete){showFeedback('Complete all midpoint, value and decision cells, plus the return index'+
      (state.level==='hard'?' and three ERL lines':'')+'.','neutral');return;}
    if(result.correct){correct();return;}
    wrong('Check each midpoint (round DOWN), value, half and return index.'+
      (state.level==='hard'?' Also check the missing code lines.':''));
  }
  function model(){if(state.locked||state.wrong<2)return;const q=state.question,m=engine.model(q),box=$('hint-panel');
    box.replaceChildren(node('strong','','Worked model'));
    if(q.level==='hard')box.append(node('pre','erl',m.lines.join('\n')));
    box.append(node('pre','erl','low  high  mid  value  keep\n'+m.rows.map(r=>r.join('    ')).join('\n')+'\nRETURN '+m.result));
    box.hidden=false;freeze();showFeedback('Compare with the model. No point was awarded.','neutral');
  }
  function clear(){if(state.locked)return;state.response=freshResponse(state.question);state.phase='middle';state.mid=null;
    hideMessages();$('show-answer').hidden=state.wrong<2;renderWorkspace();}
  function finish(){core.reportCompletion(2,SKILL,state.level,state.firstTry,10);
    save('best',Math.max(Number(progress().best)||0,state.score));save('sessions',(Number(progress().sessions)||0)+1);
    $('question-position').textContent='Completed';$('meter').setAttribute('aria-valuenow','10');$('meter-fill').style.width='100%';
    $('question-card').classList.add('finished');$('prompt').textContent='';$('context').textContent='';hideMessages();
    ['check','clear','hint','show-answer','next'].forEach(id=>$(id).hidden=true);
    const board=$('workspace');board.replaceChildren();const result=node('div','results');
    result.append(node('span','result-kicker','Skill 23 · '+state.level+' complete'),node('strong','',state.score+' / 10'),
      node('h2','',state.score===10?'Great work!':'Keep practising'),node('p','','Best score on this device: '+progress().best+'/10.'));
    const actions=node('div','results-actions'),again=node('button','btn primary','Practise again');again.type='button';
    again.addEventListener('click',()=>chooseLevel(state.level));const hub=node('a','btn','All skills');hub.href='/exercise/paper2/';
    actions.append(again,hub);result.append(actions);board.append(result);
  }
  function chooseLevel(level){state.level=core.validLevel(level);core.updateLevelUrl(state.level);state.index=0;state.score=0;state.firstTry=0;
    document.querySelectorAll('.level').forEach(b=>{const active=b.dataset.level===state.level;
      b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});renderQuestion();}
  document.querySelectorAll('.level').forEach(b=>b.addEventListener('click',()=>chooseLevel(b.dataset.level)));
  $('check').addEventListener('click',check);$('clear').addEventListener('click',clear);$('show-answer').addEventListener('click',model);
  $('next').addEventListener('click',()=>{if(!state.locked)return;if(state.index===9)finish();else{state.index++;renderQuestion();window.scrollTo(0,0);}});
  $('hint').addEventListener('click',()=>{const box=$('hint-panel');box.hidden=!box.hidden;box.textContent=state.question.hint;
    $('hint').textContent=box.hidden?'Show hint':'Hide hint';});
  window.RHSSkillsDemoProvider=()=>engine.makeDemo();
  chooseLevel(core.levelFromUrl());
})();

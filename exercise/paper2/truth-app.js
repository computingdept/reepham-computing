/* Truth Tables: shared Paper 2 practice shell and Logic Gates controls. */
(function(){
'use strict';
const engine=window.J277Truth,core=window.RHSCSkills;
if(!engine||!core)throw Error('Truth Tables scripts did not load.');
const SKILL='truth',KEY='rhs-j277-paper2-progress-v1',LEVELS={easy:'One gate · complete Q',medium:'Two gates · complete X and Q',hard:'Three gates · complete X, Y and Q'};
const $=id=>document.getElementById(id),node=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e;};
const state={level:'easy',index:0,q:null,r:{},wrong:0,locked:false,score:0,firstTry:0};
function progress(){return core.readProgress(KEY)[SKILL]?.[state.level]||{solved:0,best:0,sessions:0};}
function save(field,value){const p=core.readProgress(KEY),old=progress();if(!p[SKILL]||typeof p[SKILL]!=='object')p[SKILL]={};p[SKILL][state.level]={solved:Number(old.solved)||0,best:Number(old.best)||0,sessions:Number(old.sessions)||0,[field]:value};core.writeProgress(KEY,p);}
function feedback(text,kind){const x=$('feedback');x.textContent=text;x.className='message '+kind;x.hidden=false;}
function resetFeedback(){$('feedback').hidden=true;$('feedback').textContent='';$('hint-panel').replaceChildren();$('hint-panel').hidden=true;$('hint').textContent='Show hint';}
function freeze(){state.locked=true;$('workspace').querySelectorAll('button,input').forEach(b=>b.disabled=true);for(const id of ['check','clear','hint','show-answer'])$(id).hidden=true;$('next').hidden=false;}
function renderWorkspace(showModel=false){
 const q=state.q,board=$('workspace');board.replaceChildren();
 const panel=node('div','logic-panel');
 const expressions=node('div','logic-expressions truth-expressions');
 Object.entries(q.expressions).forEach(([k,v])=>expressions.append(node('div','logic-expression',k+' = '+v)));
 panel.append(expressions);
 const table=node('table','truth-table');table.setAttribute('aria-label','Truth table for '+Object.values(q.expressions).join(', '));
 const head=node('thead'),hr=node('tr');[...q.inputs,...q.columns].forEach(name=>{const th=node('th','',name);th.scope='col';hr.append(th);});head.append(hr);table.append(head);
 const body=node('tbody');
 q.rows.forEach((r,i)=>{
  const row=node('tr');q.inputs.forEach(k=>row.append(node('td','truth-given',String(r.inputs[k]))));
  q.columns.forEach(k=>{
   const cell=node('td','truth-output'),id=i+'-'+k;
   if(q.given.includes(i)||showModel){cell.append(node('span',showModel?'truth-model':'truth-given',String(r.outputs[k])));}
   else {
    const b=node('button','logic-bit truth-bit',state.r[id]??'?');b.type='button';b.disabled=state.locked;
    const describe=()=>b.setAttribute('aria-label','Row '+(i+1)+', '+k+', '+(state.r[id]??'not answered')+'. Tap to change between 0 and 1.');
    describe();b.setAttribute('data-chosen',String(Object.hasOwn(state.r,id)));
    b.addEventListener('click',()=>{if(state.locked)return;state.r[id]=state.r[id]==='0'?'1':'0';b.textContent=state.r[id];b.setAttribute('data-chosen','true');describe();});
    cell.append(b);
   }row.append(cell);
  });body.append(row);
 });table.append(body);panel.append(table);board.append(panel);
}
function renderQuestion(){state.q=engine.makeQuestion(state.level,state.index);state.r={};state.wrong=0;state.locked=false;resetFeedback();$('question-card').classList.remove('finished');$('prompt').textContent=state.q.prompt;$('context').textContent=state.q.context;$('question-position').textContent='Question '+(state.index+1)+' of 10';$('level-description').textContent=LEVELS[state.level];$('meter').setAttribute('aria-valuenow',String(state.index));$('meter-fill').style.width=state.index*10+'%';for(const id of ['check','clear','hint'])$(id).hidden=false;$('show-answer').hidden=true;$('next').hidden=true;$('next').textContent=state.index===9?'See results →':'Next question →';renderWorkspace();}
function check(){if(state.locked)return;const result=engine.checkAnswer(state.q,state.r);if(!result.complete){feedback('Complete every answer before checking.','neutral');return;}if(result.correct){state.score++;if(!state.wrong)state.firstTry++;save('solved',(Number(progress().solved)||0)+1);feedback('Correct! '+state.q.model,'good');freeze();}else{state.wrong++;feedback('Not yet. Check each row and calculate intermediate values first.','bad');if(state.wrong>=2)$('show-answer').hidden=false;}}
function model(){if(state.locked||state.wrong<2)return;const box=$('hint-panel');box.replaceChildren(node('strong','','Worked answer'),node('p','',state.q.model));box.hidden=false;freeze();renderWorkspace(true);feedback('Compare your work with the model. No point awarded.','neutral');}
function clear(){if(state.locked)return;state.r={};resetFeedback();$('show-answer').hidden=state.wrong<2;renderWorkspace();}
function finish(){core.reportCompletion(2,SKILL,state.level,state.firstTry,10);save('best',Math.max(Number(progress().best)||0,state.score));save('sessions',(Number(progress().sessions)||0)+1);$('question-position').textContent='Completed';$('meter').setAttribute('aria-valuenow','10');$('meter-fill').style.width='100%';$('question-card').classList.add('finished');$('prompt').textContent='';$('context').textContent='';resetFeedback();for(const id of ['check','clear','hint','show-answer','next'])$(id).hidden=true;const board=$('workspace');board.replaceChildren();const card=node('div','results');card.append(node('span','result-kicker','Skill 32 · '+state.level+' complete'),node('strong','',state.score+' / 10'),node('h2','',state.score===10?'Great work!':'Keep practising'),node('p','','First attempts correct: '+state.firstTry+' / 10'));const actions=node('div','results-actions'),again=node('button','btn primary','Practise again');again.type='button';again.addEventListener('click',()=>chooseLevel(state.level));const hub=node('a','btn','All skills');hub.href='/exercise/paper2/';actions.append(again,hub);card.append(actions);board.append(card);}
function chooseLevel(level){state.level=core.validLevel(level);core.updateLevelUrl(state.level);state.index=0;state.score=0;state.firstTry=0;document.querySelectorAll('.level').forEach(b=>{const active=b.dataset.level===state.level;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});renderQuestion();}
document.querySelectorAll('.level').forEach(b=>b.addEventListener('click',()=>chooseLevel(b.dataset.level)));$('check').addEventListener('click',check);$('clear').addEventListener('click',clear);$('show-answer').addEventListener('click',model);$('next').addEventListener('click',()=>{if(!state.locked)return;if(state.index===9)finish();else{state.index++;renderQuestion();window.scrollTo(0,0);}});$('hint').addEventListener('click',()=>{const box=$('hint-panel');box.hidden=!box.hidden;box.textContent=state.q.hint;$('hint').textContent=box.hidden?'Show hint':'Hide hint';});window.RHSSkillsDemoProvider=()=>engine.makeDemo();chooseLevel(core.levelFromUrl());
})();

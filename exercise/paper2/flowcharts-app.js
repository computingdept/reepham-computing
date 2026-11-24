/* Flowchart Builder: shared Paper 2 practice shell, local SVG workspace. */
(function(){
'use strict';
const engine=window.J277Flowcharts,core=window.RHSCSkills;
if(!engine||!core)throw Error('Flowchart Builder scripts did not load.');
const SKILL='flowcharts',KEY='rhs-j277-paper2-progress-v1',LEVELS={easy:'Sequence · recognise symbols',medium:'Selection · complete and trace',hard:'Iteration · complete and trace'};
const $=id=>document.getElementById(id),node=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e;};
const state={level:'easy',index:0,q:null,r:{},wrong:0,locked:false,score:0,firstTry:0};
function progress(){return core.readProgress(KEY)[SKILL]?.[state.level]||{solved:0,best:0,sessions:0};}
function save(field,value){const p=core.readProgress(KEY),old=progress();if(!p[SKILL]||typeof p[SKILL]!=='object')p[SKILL]={};p[SKILL][state.level]={solved:Number(old.solved)||0,best:Number(old.best)||0,sessions:Number(old.sessions)||0,[field]:value};core.writeProgress(KEY,p);}
function feedback(text,kind){const x=$('feedback');x.textContent=text;x.className='message '+kind;x.hidden=false;}
function resetFeedback(){$('feedback').hidden=true;$('feedback').textContent='';$('hint-panel').replaceChildren();$('hint-panel').hidden=true;$('hint').textContent='Show hint';}
function freeze(){state.locked=true;$('workspace').querySelectorAll('button,input').forEach(b=>b.disabled=true);for(const id of ['check','clear','hint','show-answer'])$(id).hidden=true;$('next').hidden=false;}
const NS='http://www.w3.org/2000/svg';
function svgEl(tag,attrs={},value){const e=document.createElementNS(NS,tag);Object.entries(attrs).forEach(([k,v])=>e.setAttribute(k,String(v)));if(value!==undefined)e.textContent=value;return e;}
function diagram(q,r){
 const view=q.kind==='symbol'?'0 0 420 170':q.kind==='selection'?'0 0 480 344':'0 0 480 365';
 const svg=svgEl('svg',{viewBox:view,role:'img','aria-label':q.kind==='symbol'?'Flowchart symbol for '+q.action:q.kind==='selection'?'Flowchart: input, decision, Yes and No output branches, Stop.':'Flowchart: initialise i, test condition, Yes outputs and updates i then returns to the condition, No stops.',class:'flow-svg'});
 const defs=svgEl('defs'),marker=svgEl('marker',{id:'flow-arrow',viewBox:'0 0 10 10',refX:9,refY:5,markerWidth:6,markerHeight:6,orient:'auto-start-reverse'});marker.append(svgEl('path',{d:'M 0 0 L 10 5 L 0 10 Z',fill:'#557568'}));defs.append(marker);svg.append(defs);
 const arrow=d=>svg.append(svgEl('path',{d,class:'flow-arrow','marker-end':'url(#flow-arrow)'}));
 const label=(x,y,t)=>svg.append(svgEl('text',{x,y,class:'flow-label','text-anchor':'middle','dominant-baseline':'middle'},t));
 function shape(type,x,y,w,h,t,missing=false){
  const attrs={class:'flow-shape'+(missing?' missing':'' )};let e;
  if(type==='Decision')e=svgEl('polygon',{...attrs,points:[x+','+(y-h/2),(x+w/2)+','+y,x+','+(y+h/2),(x-w/2)+','+y].join(' ')});
  else if(type==='Input/output')e=svgEl('polygon',{...attrs,points:[(x-w/2+14)+','+(y-h/2),(x+w/2)+','+(y-h/2),(x+w/2-14)+','+(y+h/2),(x-w/2)+','+(y+h/2)].join(' ')});
  else e=svgEl('rect',{...attrs,x:x-w/2,y:y-h/2,width:w,height:h,rx:type==='Terminator'?h/2:3});
  svg.append(e);label(x,y,t);
 }
 if(q.kind==='symbol'){shape(r.symbol||'Process',210,65,250,74,r.symbol||'?',!r.symbol);label(210,130,q.action);return svg;}
 if(q.kind==='selection'){
  arrow('M240 38 V54');arrow('M240 92 V105');arrow('M125 153 H110 V211');arrow('M355 153 H370 V211');arrow('M110 249 V278 H240 V303');arrow('M370 249 V278 H240 V303');
  shape('Terminator',240,22,94,32,'Start');shape('Input/output',240,73,166,38,'Input '+q.v);shape('Decision',240,153,230,96,r.condition||'?',!r.condition);label(87,182,'Yes');label(393,182,'No');
  shape('Input/output',110,230,190,38,'Output: '+q.yes);shape('Input/output',370,230,190,38,'Output: '+q.no);shape('Terminator',240,320,94,34,'Stop');return svg;
 }
 arrow('M190 39 V52');arrow('M190 90 V104');arrow('M190 184 V211');arrow('M190 249 V270');arrow('M190 308 V335 H42 V144 H80');arrow('M300 144 H394 V222');
 shape('Terminator',190,23,94,32,'Start');shape('Process',190,71,145,38,'i = '+q.start);shape('Decision',190,144,220,80,'i < '+q.limit);label(215,197,'Yes');label(349,129,'No');
 shape('Input/output',190,230,160,38,'Output i');shape('Process',190,289,165,38,r.update||'?',!r.update);shape('Terminator',394,240,94,36,'Stop');return svg;
}
function renderWorkspace(){
 const q=state.q,board=$('workspace');board.replaceChildren();
 const panel=node('div','logic-panel'),visual=node('div','logic-diagram flow-diagram');
 visual.append(diagram(q,state.r));panel.append(visual);
 function refreshDiagram(){visual.replaceChildren(diagram(q,state.r));}
 q.fields.forEach(f=>{
  const group=node('section','flow-field');group.append(node('p','logic-expression-heading',f.label));
  if(f.options){const picks=node('div','logic-expressions');f.options.forEach(value=>{const b=node('button','logic-expression',value);b.type='button';b.disabled=state.locked;b.setAttribute('aria-pressed',String(state.r[f.id]===value));b.addEventListener('click',()=>{if(state.locked)return;state.r[f.id]=value;picks.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));refreshDiagram();});picks.append(b);});group.append(picks);}
  else{const input=node('input','number-entry flow-entry');input.type='text';input.autocomplete='off';input.setAttribute('aria-label',f.label);input.placeholder=f.id==='output'?'e.g. 1, 2, 3':'?';input.value=state.r[f.id]||'';input.disabled=state.locked;input.addEventListener('input',()=>state.r[f.id]=input.value);input.addEventListener('keydown',e=>{if(e.key==='Enter')$('check').click();});group.append(input);}
  panel.append(group);
 });board.append(panel);
}
function renderQuestion(){state.q=engine.makeQuestion(state.level,state.index);state.r={};state.wrong=0;state.locked=false;resetFeedback();$('question-card').classList.remove('finished');$('prompt').textContent=state.q.prompt;$('context').textContent=state.q.context;$('question-position').textContent='Question '+(state.index+1)+' of 10';$('level-description').textContent=LEVELS[state.level];$('meter').setAttribute('aria-valuenow',String(state.index));$('meter-fill').style.width=state.index*10+'%';for(const id of ['check','clear','hint'])$(id).hidden=false;$('show-answer').hidden=true;$('next').hidden=true;$('next').textContent=state.index===9?'See results →':'Next question →';renderWorkspace();}
function check(){if(state.locked)return;const result=engine.checkAnswer(state.q,state.r);if(!result.complete){feedback('Complete every answer before checking.','neutral');return;}if(result.correct){state.score++;if(!state.wrong)state.firstTry++;save('solved',(Number(progress().solved)||0)+1);feedback('Correct! '+state.q.model,'good');freeze();}else{state.wrong++;feedback('Not yet. Follow the arrows and check each step.','bad');if(state.wrong>=2)$('show-answer').hidden=false;}}
function model(){if(state.locked||state.wrong<2)return;const box=$('hint-panel');box.replaceChildren(node('strong','','Worked answer'),node('p','',state.q.model));box.hidden=false;freeze();feedback('Compare your work with the model. No point awarded.','neutral');}
function clear(){if(state.locked)return;state.r={};resetFeedback();$('show-answer').hidden=state.wrong<2;renderWorkspace();}
function finish(){core.reportCompletion(2,SKILL,state.level,state.firstTry,10);save('best',Math.max(Number(progress().best)||0,state.score));save('sessions',(Number(progress().sessions)||0)+1);$('question-position').textContent='Completed';$('meter').setAttribute('aria-valuenow','10');$('meter-fill').style.width='100%';$('question-card').classList.add('finished');$('prompt').textContent='';$('context').textContent='';resetFeedback();for(const id of ['check','clear','hint','show-answer','next'])$(id).hidden=true;const board=$('workspace');board.replaceChildren();const card=node('div','results');card.append(node('span','result-kicker','Skill 20 · '+state.level+' complete'),node('strong','',state.score+' / 10'),node('h2','',state.score===10?'Great work!':'Keep practising'),node('p','','First attempts correct: '+state.firstTry+' / 10'));const actions=node('div','results-actions'),again=node('button','btn primary','Practise again');again.type='button';again.addEventListener('click',()=>chooseLevel(state.level));const hub=node('a','btn','All skills');hub.href='/exercise/paper2/';actions.append(again,hub);card.append(actions);board.append(card);}
function chooseLevel(level){state.level=core.validLevel(level);core.updateLevelUrl(state.level);state.index=0;state.score=0;state.firstTry=0;document.querySelectorAll('.level').forEach(b=>{const active=b.dataset.level===state.level;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});renderQuestion();}
document.querySelectorAll('.level').forEach(b=>b.addEventListener('click',()=>chooseLevel(b.dataset.level)));$('check').addEventListener('click',check);$('clear').addEventListener('click',clear);$('show-answer').addEventListener('click',model);$('next').addEventListener('click',()=>{if(!state.locked)return;if(state.index===9)finish();else{state.index++;renderQuestion();window.scrollTo(0,0);}});$('hint').addEventListener('click',()=>{const box=$('hint-panel');box.hidden=!box.hidden;box.textContent=state.q.hint;$('hint').textContent=box.hidden?'Show hint':'Hide hint';});window.RHSSkillsDemoProvider=()=>engine.makeDemo();chooseLevel(core.levelFromUrl());
})();

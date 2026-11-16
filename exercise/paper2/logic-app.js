/* Skill 31 · responsive logic-circuit practice using SVG gate symbols and shared scoring. */
(function(){
  'use strict';const engine=window.J277Logic,core=window.RHSCSkills;if(!engine||!core)throw Error('Logic Gates scripts did not load.');
  const SKILL='logic',KEY='rhs-j277-paper2-progress-v1',LEVELS={easy:'One gate · choose Q',medium:'Two gates · trace X then Q',hard:'Three gates · trace and describe'};
  const $=id=>document.getElementById(id),node=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;};
  const state={level:'easy',index:0,q:null,r:null,wrong:0,locked:false,score:0,firstTry:0};
  function progress(){return core.readProgress(KEY)[SKILL]?.[state.level]||{solved:0,best:0,sessions:0};}
  function save(field,value){const p=core.readProgress(KEY),old=progress();if(!p[SKILL]||typeof p[SKILL]!=='object')p[SKILL]={};p[SKILL][state.level]={solved:Number(old.solved)||0,best:Number(old.best)||0,sessions:Number(old.sessions)||0,[field]:value};core.writeProgress(KEY,p);}
  function feedback(text,kind){const x=$('feedback');x.textContent=text;x.className='message '+kind;x.hidden=false;}
  function resetFeedback(){$('feedback').hidden=true;$('feedback').textContent='';$('hint-panel').replaceChildren();$('hint-panel').hidden=true;$('hint').textContent='Show hint';}
  function freeze(){state.locked=true;$('workspace').querySelectorAll('button').forEach(b=>b.disabled=true);for(const id of ['check','clear','hint','show-answer'])$(id).hidden=true;$('next').hidden=false;}
  function correct(){if(!engine.checkAnswer(state.q,state.r).correct)return;state.score++;if(!state.wrong)state.firstTry++;save('solved',(Number(progress().solved)||0)+1);feedback('Correct! '+state.q.steps.join(' · '),'good');freeze();renderWorkspace();}
  function incorrect(){state.wrong++;feedback('Not yet. Trace the intermediate wire before the final output.','bad');if(state.wrong>=2)$('show-answer').hidden=false;}
  const SVG_NS='http://www.w3.org/2000/svg';
  function svgEl(tag,attrs={},value){const e=document.createElementNS(SVG_NS,tag);Object.entries(attrs).forEach(([k,v])=>e.setAttribute(k,String(v)));if(value!==undefined)e.textContent=value;return e;}
  function wire(svg,path){svg.append(svgEl('path',{d:path,class:'logic-wire'}));}
  function text(svg,x,y,value,cls,extra={}){svg.append(svgEl('text',{x,y,class:cls||'logic-svg-label',...extra},value));}
  function input(svg,label,value,y,x=18){const g=svgEl('g',{class:'logic-input'});g.append(svgEl('rect',{x,y:y-22,width:100,height:44,rx:11,class:'logic-input-pill '+(value?'is-one':'is-zero')}));g.append(svgEl('text',{x:x+50,y:y+7,'text-anchor':'middle',class:'logic-input-text'},label+' = '+value));svg.append(g);}
  function gate(svg,x,y,kind){const group=svgEl('g',{class:'logic-gate',transform:`translate(${x} ${y})`});let shape;
    if(kind==='AND')shape=svgEl('path',{d:'M -40 -34 H 0 A 34 34 0 0 1 0 34 H -40 Z'});
    else if(kind==='OR')shape=svgEl('path',{d:'M -40 -34 Q -13 0 -40 34 Q 10 35 40 0 Q 10 -35 -40 -34 Z'});
    else{shape=svgEl('path',{d:'M -40 -32 L 25 0 L -40 32 Z'});group.append(shape,svgEl('circle',{cx:33,cy:0,r:8,class:'logic-not-bubble'}));}
    if(kind!=='NOT')group.append(shape);
    group.append(svgEl('title',{},kind+' gate'));svg.append(group);return{xIn:x-40,xOut:x+(kind==='AND'?34:kind==='OR'?40:41),y};
  }
  function output(svg,name,x,y){const g=svgEl('g',{class:'logic-wire-value'});g.append(svgEl('rect',{x,y:y-23,width:94,height:46,rx:11,class:'logic-value-pill'}));g.append(svgEl('text',{x:x+47,y:y+7,'text-anchor':'middle',class:'logic-value-text','data-wire':name},name+' = '+(state.r[name]??'?')));svg.append(g);}
  function circuit(q){const svg=svgEl('svg',{viewBox:'0 0 800 270',role:'img','aria-label':`Circuit with ${q.level==='easy'?1:q.level==='medium'?2:3} gates, input values shown. Select the missing output values below.`,preserveAspectRatio:'xMidYMid meet',class:'logic-svg'});
    if(q.shape==='single'){
      input(svg,'A',q.A,105);if(q.g1!=='NOT')input(svg,'B',q.B,165);
      const g=gate(svg,355,135,q.g1);wire(svg,q.g1==='NOT'?`M 118 105 H 220 V 135 H ${g.xIn}`:`M 118 105 H 240 V 115 H ${g.xIn}`);if(q.g1!=='NOT')wire(svg,`M 118 165 H 270 V 155 H ${g.xIn}`);
      wire(svg,`M ${g.xOut} 135 H 675`);output(svg,'Q',685,135);return svg;
    }
    if(q.level==='medium'){
      if(q.shape==='pair'){
        input(svg,'A',q.A,46);input(svg,'B',q.B,112);input(svg,'C',q.C,218);
        const g1=gate(svg,315,83,q.g1),g2=gate(svg,570,143,q.g2);
        wire(svg,`M 118 46 H 205 V 63 H ${g1.xIn}`);wire(svg,`M 118 112 H 235 V 103 H ${g1.xIn}`);
        wire(svg,`M ${g1.xOut} 83 H 474 V 123 H ${g2.xIn}`);wire(svg,`M 118 218 H 485 V 163 H ${g2.xIn}`);
        text(svg,415,73,'X = '+(state.r.X??'?'),'logic-intermediate',{'data-wire':'X'});wire(svg,`M ${g2.xOut} 143 H 681`);output(svg,'Q',690,143);
      }else if(q.shape==='postnot'){
        input(svg,'A',q.A,96);input(svg,'B',q.B,166);
        const g1=gate(svg,315,135,q.g1),g2=gate(svg,565,135,'NOT');wire(svg,`M 118 96 H 205 V 115 H ${g1.xIn}`);wire(svg,`M 118 166 H 235 V 155 H ${g1.xIn}`);
        wire(svg,`M ${g1.xOut} 135 H ${g2.xIn}`);text(svg,432,120,'X = '+(state.r.X??'?'),'logic-intermediate',{'data-wire':'X'});wire(svg,`M ${g2.xOut} 135 H 685`);output(svg,'Q',690,135);
      }else{
        input(svg,'A',q.A,102);input(svg,'B',q.B,212);
        const g1=gate(svg,315,102,'NOT'),g2=gate(svg,570,140,q.g2);wire(svg,`M 118 102 H ${g1.xIn}`);wire(svg,`M ${g1.xOut} 102 H 463 V 120 H ${g2.xIn}`);
        text(svg,425,88,'X = '+(state.r.X??'?'),'logic-intermediate',{'data-wire':'X'});wire(svg,`M 118 212 H 478 V 160 H ${g2.xIn}`);wire(svg,`M ${g2.xOut} 140 H 685`);output(svg,'Q',690,140);
      }return svg;
    }
    const g1=gate(svg,315,77,q.g1),g2=gate(svg,315,204,q.g2),g3=gate(svg,595,142,q.g3);
    if(q.shape==='ab_notc'){
      input(svg,'A',q.A,42);input(svg,'B',q.B,108);input(svg,'C',q.C,204);
      wire(svg,`M 118 42 H 190 V 57 H ${g1.xIn}`);wire(svg,`M 118 108 H 225 V 97 H ${g1.xIn}`);wire(svg,`M 118 204 H ${g2.xIn}`);
    }else{
      input(svg,'A',q.A,77);input(svg,'B',q.B,178);input(svg,'C',q.C,239);
      wire(svg,`M 118 77 H ${g1.xIn}`);wire(svg,`M 118 178 H 190 V 184 H ${g2.xIn}`);wire(svg,`M 118 239 H 225 V 224 H ${g2.xIn}`);
    }
    wire(svg,`M ${g1.xOut} 77 H 471 V 122 H ${g3.xIn}`);wire(svg,`M ${g2.xOut} 204 H 496 V 162 H ${g3.xIn}`);
    text(svg,416,66,'X = '+(state.r.X??'?'),'logic-intermediate',{'data-wire':'X'});text(svg,435,222,'Y = '+(state.r.Y??'?'),'logic-intermediate',{'data-wire':'Y'});
    wire(svg,`M ${g3.xOut} 142 H 682`);output(svg,'Q',692,142);return svg;
  }
  function answer(label){const row=node('div','logic-answer');row.append(node('strong','logic-answer-name',label));for(const bit of ['0','1']){const b=node('button','logic-bit',bit);b.type='button';b.disabled=state.locked;b.setAttribute('data-answer',label);b.setAttribute('aria-label',label+' equals '+bit);b.setAttribute('aria-pressed',String(state.r[label]===bit));b.addEventListener('click',()=>{if(state.locked)return;state.r[label]=bit;$('workspace').querySelectorAll('[data-answer="'+label+'"]').forEach(x=>x.setAttribute('aria-pressed',String(x.textContent===bit)));$('workspace').querySelectorAll('[data-wire="'+label+'"]').forEach(x=>x.textContent=label+' = '+bit);if(state.level==='easy'){if(engine.checkAnswer(state.q,state.r).correct)correct();else incorrect();}});row.append(b);}return row;}
  function renderWorkspace(){const q=state.q,board=$('workspace');board.replaceChildren();const panel=node('div','logic-panel');panel.append(node('p','logic-task',q.level==='easy'?'Find Q. Tap 0 or 1.':q.level==='medium'?'Trace the first gate to find X, then find Q.':'Find X and Y from the two branches, then Q.'));const stage=node('div','logic-diagram');stage.append(circuit(q));panel.append(stage);
    const mobile=node('div','logic-mobile-legend');mobile.textContent=q.level==='easy'?`A=${q.A}${q.B===null?'':', B='+q.B} · ${q.g1} gate`:q.level==='medium'?`Input bits: A=${q.A}, B=${q.B}${q.C===undefined?'':', C='+q.C} · two gates`:`Input bits: A=${q.A}, B=${q.B}, C=${q.C} · three gates`;
    panel.append(mobile);const answers=node('div','logic-answers');(q.level==='easy'?['Q']:q.level==='medium'?['X','Q']:['X','Y','Q']).forEach(name=>answers.append(answer(name)));panel.append(answers);
    if(q.level==='hard'){panel.append(node('p','logic-expression-heading','Which Boolean expression matches the circuit?'));const expressions=node('div','logic-expressions');q.expressionChoices.forEach(value=>{const b=node('button','logic-expression',value);b.type='button';b.disabled=state.locked;b.setAttribute('aria-pressed',String(state.r.expression===value));b.addEventListener('click',()=>{state.r.expression=value;expressions.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));});expressions.append(b);});panel.append(expressions);}board.append(panel);}
  function renderQuestion(){state.q=engine.makeQuestion(state.level,state.index);state.r={X:null,Y:null,Q:null,expression:''};state.wrong=0;state.locked=false;resetFeedback();$('question-card').classList.remove('finished');$('prompt').textContent=state.level==='easy'?'What is the gate output?':state.level==='medium'?'Trace two connected gates':'Trace the complete circuit';$('context').textContent='1 means TRUE (on). 0 means FALSE (off). Follow the wires from left to right.';$('question-position').textContent='Question '+(state.index+1)+' of 10';$('level-description').textContent=LEVELS[state.level];$('meter').setAttribute('aria-valuenow',String(state.index));$('meter-fill').style.width=state.index*10+'%';$('check').hidden=state.level==='easy';$('clear').hidden=false;$('hint').hidden=false;$('show-answer').hidden=true;$('next').hidden=true;$('next').textContent=state.index===9?'See results →':'Next question →';renderWorkspace();}
  function check(){if(state.locked)return;const result=engine.checkAnswer(state.q,state.r);if(!result.complete){feedback('Choose 0 or 1 for every missing wire'+(state.level==='hard'?' and select an expression.':'.'),'neutral');return;}if(result.correct)correct();else incorrect();}
  function model(){if(state.locked||state.wrong<2)return;const m=engine.model(state.q),box=$('hint-panel');box.replaceChildren(node('strong','','Worked trace'));const lines=[...m.steps,'',m.expression?'Expression: '+m.expression:''];box.append(node('pre','erl',lines.join('\n')));box.hidden=false;freeze();feedback('Review the worked trace. No point awarded.','neutral');}
  function clear(){if(state.locked)return;state.r={X:null,Y:null,Q:null,expression:''};resetFeedback();$('show-answer').hidden=state.wrong<2;renderWorkspace();}
  function finish(){core.reportCompletion(2,SKILL,state.level,state.firstTry,10);save('best',Math.max(Number(progress().best)||0,state.score));save('sessions',(Number(progress().sessions)||0)+1);$('question-position').textContent='Completed';$('meter').setAttribute('aria-valuenow','10');$('meter-fill').style.width='100%';$('question-card').classList.add('finished');$('prompt').textContent='';$('context').textContent='';resetFeedback();for(const id of ['check','clear','hint','show-answer','next'])$(id).hidden=true;const board=$('workspace');board.replaceChildren();const card=node('div','results');card.append(node('span','result-kicker','Skill 31 · '+state.level+' complete'),node('strong','',state.score+' / 10'),node('h2','',state.score===10?'Great work!':'Keep practising'),node('p','','First attempts correct: '+state.firstTry+' / 10'));const actions=node('div','results-actions'),again=node('button','btn primary','Practise again');again.type='button';again.addEventListener('click',()=>chooseLevel(state.level));const hub=node('a','btn','All skills');hub.href='/exercise/paper2/';actions.append(again,hub);card.append(actions);board.append(card);}
  function chooseLevel(level){state.level=core.validLevel(level);core.updateLevelUrl(state.level);state.index=0;state.score=0;state.firstTry=0;document.querySelectorAll('.level').forEach(b=>{const active=b.dataset.level===state.level;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});renderQuestion();}
  document.querySelectorAll('.level').forEach(b=>b.addEventListener('click',()=>chooseLevel(b.dataset.level)));$('check').addEventListener('click',check);$('clear').addEventListener('click',clear);$('show-answer').addEventListener('click',model);$('next').addEventListener('click',()=>{if(!state.locked)return;if(state.index===9)finish();else{state.index++;renderQuestion();window.scrollTo(0,0);}});$('hint').addEventListener('click',()=>{const box=$('hint-panel');box.hidden=!box.hidden;box.textContent=state.q.hint;$('hint').textContent=box.hidden?'Show hint':'Hide hint';});window.RHSSkillsDemoProvider=()=>engine.makeDemo();chooseLevel(core.levelFromUrl());
})();

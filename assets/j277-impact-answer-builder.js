/* RHS Computing · OCR J277 1.6 Impact Answer Builder
   Original practice scenarios. Written answers are reviewed by the pupil,
   never auto-graded as an official OCR exam mark. */
(function(root){
'use strict';
const scenarios=[{"name":"Face recognition in school","topic":"Privacy · Legal · Ethical","situation":"A school is considering facial recognition to register pupils automatically.","prompt":"Discuss whether the school should introduce facial recognition for attendance.","weak":"Facial recognition is quick and useful. Some people might not like it. The school should decide.","parts":["Automatic registration could help staff identify missing pupils sooner.","This could improve attendance checks because staff can spend less lesson time taking a register.","However, storing face data creates privacy risks and the school must consider its data-protection responsibilities.","I would only support it with a clear justification, strong data protection and a fair alternative for pupils."]},{"name":"Replacing working smartphones","topic":"Environmental · Ethical · Cultural","situation":"Many people replace smartphones that still work because they want newer features.","prompt":"Discuss the wider impacts of frequently replacing working smartphones.","weak":"New phones are good, but they cause waste. People should think carefully.","parts":["New phones may provide security updates and accessibility features for their users.","These improvements can help people use services safely, especially if older models no longer receive support.","However, making more phones uses materials and energy, and discarded devices contribute to electronic waste.","People should balance genuine benefits against environmental costs and repair or retain working devices where practical."]},{"name":"AI selecting job applicants","topic":"Ethical · Privacy · Cultural","situation":"A company wants AI software to shortlist job applications.","prompt":"Discuss the impacts of using AI to shortlist applicants.","weak":"AI is fast but could be unfair, so companies should be careful.","parts":["Automated shortlisting could help recruiters assess large numbers of applications more quickly.","This could leave staff more time to interview applicants and consider their abilities.","However, biased training data may unfairly disadvantage some applicants and personal data needs appropriate protection.","I would use AI to support human review and check regularly for unfair decisions rather than trust it alone."]},{"name":"School software licences","topic":"Licensing · Cost · Support","situation":"A school needs library software. Staff want to customise it but have limited technical support.","prompt":"Recommend open-source or proprietary library software and justify your choice.","weak":"Open source is free and proprietary is not. The school should get the best.","parts":["Open-source software could let the school inspect and adapt the source code for its library.","That flexibility can be useful, but maintaining modifications requires technical expertise and may still have costs.","Proprietary software may include supplier support and a ready-to-use product, but source code is usually not available to change.","Given limited support staff, I would choose supported proprietary software if affordable, unless reliable open-source support can be secured."]},{"name":"Online-only appointments","topic":"Cultural · Ethical · Digital divide","situation":"A local service plans to stop phone bookings and make residents book appointments online.","prompt":"Discuss whether the service should offer online-only appointments.","weak":"Websites are easy but some people dislike them. Both sides are important.","parts":["Online booking could let residents make appointments whenever they have internet access.","It may also reduce staff time on calls and make available times easier to find.","However, people without devices, good connectivity or digital skills may be excluded from using the service.","I would offer online appointments alongside a phone option so efficiency does not prevent people receiving help."]},{"name":"Hospital records in the cloud","topic":"Privacy · Legal · Ethical","situation":"A hospital is thinking about storing patient records with a cloud provider.","prompt":"Discuss the benefits and risks of storing patient records in the cloud.","weak":"Cloud is useful, but it can be hacked. Hospitals should keep data safe.","parts":["Cloud storage could help authorised hospital staff access patient records across several sites.","This might speed up treatment when accurate information is available quickly.","However, records contain sensitive personal data, so access controls, security and the Data Protection Act 2018 matter.","I would support cloud storage with strong access controls, backup plans and clear responsibilities for protecting records."]},{"name":"Sharing digital artwork","topic":"Legal · Cultural · Ethical","situation":"A media club wants to reuse artwork found online in a public video without checking permission.","prompt":"Discuss the consequences of using digital artwork without permission.","weak":"It might be copyrighted and it is unfair. The club should be nice to artists.","parts":["Digital artwork could make the club’s video more engaging and help people discover artists.","But using protected artwork without permission can infringe rights under the Copyright, Designs and Patents Act 1988.","Creators may lose control over how their artwork is shared or credited, even if the club means no harm.","The club should check its licence, seek permission where needed or choose original or appropriately licensed artwork."]},{"name":"Monitoring remote workers","topic":"Privacy · Ethical · Cultural","situation":"A company wants to record all screen activity of staff working from home.","prompt":"Discuss the effects of monitoring remote workers in this way.","weak":"Managers may like monitoring, but staff might not. The company should be fair.","parts":["Monitoring might help managers investigate specific misuse or identify training needs.","Evidence of a clear problem could allow staff to receive support, although screen time alone does not measure good work.","However, constant monitoring can harm trust and raise privacy concerns if excessive personal information is collected.","I would favour transparent, limited monitoring for specific purposes rather than recording everything staff do."]}];
const stages=[
 ['POINT','Who is affected, and what happens?'],
 ['EXPLAIN','Why does that consequence matter?'],
 ['OTHER SIDE','What is another effect or viewpoint?'],
 ['JUDGE','What do you recommend, and why?']
];
const vague=[
 'It is a good thing and could help people.',
 'It makes a difference to everyone.',
 'There are some bad things as well.',
 'There are advantages and disadvantages.'
];
function make(level,index){
 if(!['easy','medium','hard'].includes(level))throw Error('Unknown difficulty');
 const item=scenarios[(index+(level==='medium'?2:level==='hard'?4:0))%scenarios.length];
 return {type:'impactbuilder',level,index,item,mode:level==='easy'?'build':level==='medium'?'improve':'independent',
 prompt:item.prompt,context:'OCR J277 1.6 · '+item.topic+' · Original practice question',
 hint:'Apply the impact to the situation, explain a consequence, consider another view, then justify your judgement.',
 why:'You selected the developed explanations for all four parts.',
 choices:stages.map((stage,i)=>{
  const choices=[{id:'developed',text:item.parts[i]},{id:'vague',text:vague[i]}];
  return (index+i)%2===0?choices:choices.reverse();
 })};
}
function el(type,cls,text){
 const n=document.createElement(type);if(cls)n.className=cls;
 if(text!==undefined)n.textContent=text;return n;
}
function field(placeholder,title,rows){
 const x=el('textarea','impact-textarea');x.placeholder=placeholder;x.rows=rows;
 x.setAttribute('aria-label',title);x.setAttribute('spellcheck','true');return x;
}
function render(p,host,isLocked,setReady){
 const state={phase:p.level==='easy'?'watch':'draft',
  selected:['','','',''],parts:['','',''],draft:'',revision:'',compared:false};
 const board=el('div','impact-board');board.setAttribute('role','group');
 board.setAttribute('aria-label','Impact Answer Builder');
 const scenario=el('div','impact-scenario');
 scenario.append(el('span','impact-topic',p.item.topic),el('p','',p.item.situation));
 board.append(scenario);
 if(p.level==='easy'){
  const watch=el('div','impact-watch'),head=el('strong','impact-heading','I DO · WATCH AN ANSWER GROW');
  const stage=el('div','impact-stage'),example=el('p','impact-example');
  example.setAttribute('aria-live','polite');
  const tip=el('p','impact-tip'),next=el('button','impact-primary','Next step →');next.type='button';
  watch.append(head,stage,example,tip,next);
  const build=el('div','impact-build');build.hidden=true;
  build.append(el('strong','impact-heading','YOU DO · CHOOSE THE BETTER EXPLANATION'),
   el('p','impact-help','The better sentence explains this situation, rather than just stating an opinion.'));
  const groups=el('div','impact-groups');build.append(groups);
  board.append(watch,build);
  let step=0;setReady(false);
  function reveal(){
   stage.textContent=(step+1)+' / 4 · '+stages[step][0];
   example.textContent=p.item.parts[step];tip.textContent=stages[step][1];
   next.textContent=step===3?'Now you try →':'Next step →';
  }
  function draw(){
   groups.replaceChildren();
   p.choices.forEach((options,i)=>{
    const group=el('div','impact-group');
    group.append(el('span','impact-mini',stages[i][0]));
    const row=el('div','impact-options');
    options.forEach(option=>{
     const btn=el('button','impact-option'+(state.selected[i]===option.id?' selected':''),option.text);
     btn.type='button';btn.disabled=!!isLocked();
     btn.setAttribute('aria-pressed',String(state.selected[i]===option.id));
     btn.addEventListener('click',()=>{if(isLocked())return;state.selected[i]=option.id;draw();});
     row.append(btn);
    });group.append(row);groups.append(group);
   });
  }
  reveal();
  next.addEventListener('click',()=>{
   if(isLocked())return;
   if(step<3){step++;reveal();}
   else{state.phase='build';watch.hidden=true;build.hidden=false;draw();setReady(true);}
  });
 }else{
  const writing=el('div','impact-writing');
  writing.append(el('strong','impact-heading',p.level==='medium'?
   'WE DO · IMPROVE THE WEAK ANSWER':'YOU DO · WRITE YOUR OWN ANSWER'));
  if(p.level==='medium'){
   const weak=el('div','impact-weak');
   weak.append(el('strong','','Weak answer:'),el('p','',p.item.weak));writing.append(weak);
   const labels=[
    ['1. Develop an impact','What happens, to whom, and why does it matter?'],
    ['2. Consider another side','Describe a different effect or viewpoint.'],
    ['3. Make a judgement','What would you recommend, and why?']
   ];
   labels.forEach(([title,placeholder],i)=>{
    const label=el('label','impact-label');
    label.append(el('span','impact-field-title',title));
    const t=field(placeholder,title,2);
    t.addEventListener('input',()=>{state.parts[i]=t.value;updateReady();});
    label.append(t);writing.append(label);
   });
  }else{
   writing.append(el('p','impact-help','Write an extended, balanced response independently before revealing a model.'));
   const label=el('label','impact-label');
   label.append(el('span','impact-field-title','Your independent answer · 8-mark-style practice'));
   const t=field('Write your answer. Give specific consequences, different perspectives and a reasoned conclusion.',
     'Your independent extended response',7);
   t.addEventListener('input',()=>{state.draft=t.value;updateReady();});
   label.append(t);writing.append(label);
  }
  const compare=el('button','impact-primary','Compare with a model →');compare.type='button';compare.disabled=true;
  const status=el('p','impact-help',p.level==='medium'?
   'Write in all three boxes before comparing.':'Write a short developed response before comparing.');
  writing.append(compare,status);
  const review=el('div','impact-review');review.hidden=true;
  review.append(el('strong','impact-heading','COMPARE · REVIEW · IMPROVE'));
  review.append(el('p','impact-help','This is one possible response. Other relevant, well-reasoned answers can also earn marks.'));
  const model=el('div','impact-model');
  p.item.parts.forEach((line,i)=>{
   const part=el('div','impact-model-part');
   part.append(el('span','impact-mini',stages[i][0]),el('p','',line));model.append(part);
  });
  review.append(model);
  const checklist=el('div','impact-checklist');
  checklist.append(el('strong','','Check your response:'));
  ['Did I refer to this situation?','Did I explain a consequence?',
   'Did I include another viewpoint?','Did I justify my judgement?']
   .forEach(t=>checklist.append(el('span','',t)));
  review.append(checklist);
  const revlabel=el('label','impact-label');
  revlabel.append(el('span','impact-field-title','Improve your answer: write one stronger sentence'));
  const rev=field('Rewrite a sentence to explain a consequence or justify a judgement.','One improved sentence',3);
  rev.addEventListener('input',()=>{
   state.revision=rev.value;
   setReady(!isLocked()&&state.phase==='review'&&rev.value.trim().length>=12);
  });
  revlabel.append(rev);review.append(revlabel);
  review.append(el('p','impact-disclaimer','Self-reviewed practice only — this is not an automatically awarded OCR exam mark.'));
  board.append(writing,review);
  function draftReady(){return p.level==='medium'?
   state.parts.every(s=>s.trim().length>=12):state.draft.trim().length>=70;}
  function updateReady(){
   const ok=draftReady();compare.disabled=!ok;
   status.textContent=ok?'Ready to compare with a model.':p.level==='medium'?
    'Write a developed sentence in each box.':'Write at least a short paragraph before comparing.';
  }
  compare.addEventListener('click',()=>{
   if(isLocked()||!draftReady())return;
   state.phase='review';state.compared=true;review.hidden=false;compare.hidden=true;status.hidden=true;
   setReady(state.revision.trim().length>=12);
  });
  setReady(false);
 }
 host.append(board);return state;
}
function isComplete(p,s){
 if(!s)return false;
 if(p.level==='easy')return s.phase==='build'&&s.selected.every(Boolean);
 if(p.level==='medium')return s.phase==='review'&&s.compared&&s.parts.every(x=>x.trim().length>=12)&&s.revision.trim().length>=12;
 return s.phase==='review'&&s.compared&&s.draft.trim().length>=70&&s.revision.trim().length>=12;
}
function isCorrect(p,s){
 if(!isComplete(p,s))return false;
 return p.level==='easy'?s.selected.every(x=>x==='developed'):true;
}
function feedback(p,s){
 if(!isComplete(p,s))return p.level==='easy'?
  s.phase==='watch'?'Watch the examples first, then build the answer.':'Choose one sentence for each part of the answer.':
  'Write your response, compare it with a model, then add an improved sentence.';
 if(p.level==='easy'){
  const names=s.selected.map((x,i)=>x==='developed'?null:stages[i][0]).filter(Boolean);
  return 'Improve '+names.join(', ')+'. Choose wording that links the impact to this situation and explains why it matters.';
 }
 return 'Model compared and improvement written. Your review is complete; this is not an exam mark.';
}
root.J277ImpactBuilder=Object.freeze({make,render,isComplete,isCorrect,feedback});
})(window);
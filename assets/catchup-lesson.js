/* Reusable five-stage catch-up lesson engine.
   Content and correct answers come from one lesson-specific JSON file.
   Mastery = >=80% AND every objective question attempted/checked.
   Unlimited retries; navigation never locked; no server-side student data. */
(function(){
  'use strict';
  const $=(tag,klass,text)=>{
    const node=document.createElement(tag);
    if(klass)node.className=klass;
    if(text!==undefined)node.textContent=String(text);
    return node;
  };
  // Exact blue phase-symbol artwork already used by the J277/H446
  // classroom lesson controls (assets/h446-lesson/lesson.js).
  // Use SVG rather than image files so all Catch Up lessons share one set.
  const phaseIconPaths=[
    '<path d="M4 5h16v14H4z"/><path d="M8 9h8M8 13h5"/>',
    '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
    '<circle cx="8" cy="7" r="3"/><circle cx="17" cy="8" r="2.5"/><path d="M2 21v-3a6 6 0 0 1 12 0v3M15 15a5 5 0 0 1 7 5v1"/>',
    '<path d="m4 20 4.5-1 11-11-3.5-3.5-11 11L4 20Z"/><path d="M14.5 6.5 18 10"/>',
    '<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>'
  ];
  const phaseIcon=index=>{
    const span=$('span','catchup-phase-icon');
    span.setAttribute('aria-hidden','true');
    span.innerHTML='<svg viewBox="0 0 24 24" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+phaseIconPaths[index]+'</svg>';
    return span;
  };
  const number=value=>{
    const v=String(value??'').trim().replace(/,/g,'').replace(/\s*(?:bits?|bytes?)\s*$/i,'');
    return /^\d+(?:\.\d+)?$/.test(v)?Number(v):NaN;
  };
  const normal=value=>String(value??'').trim().toLowerCase().replace(/\s+/g,' ');
  const read=(q,state)=>Object.prototype.hasOwnProperty.call(state.responses,q.id)
    ?state.responses[q.id]:(q.kind==='order'?q.items.slice():'');
  function attempted(q,value){
    if(q.kind==='order')return Object.prototype.hasOwnProperty.call(q._state.responses,q.id);
    if(q.kind==='match')return Array.isArray(value)&&value.length===q.pairs.length&&value.every(Boolean);
    return String(value??'').trim().length>0;
  }
  function correct(q,value){
    if(!attempted(q,value))return false;
    if(q.kind==='number')return Number.isFinite(number(value))&&number(value)===number(q.answer);
    if(q.kind==='match')return q.pairs.every((pair,i)=>normal(value[i])===normal(pair[1]));
    if(q.kind==='order')return q.answer.every((item,i)=>item===value[i]);
    return normal(value)===normal(q.answer);
  }
  const storageKey=id=>'rhsccs-catchup-'+id+'-v1';
  function load(id){
    try{
      const saved=JSON.parse(localStorage.getItem(storageKey(id))||'null');
      return saved&&typeof saved.responses==='object'&&saved.responses
        ?{responses:saved.responses,checked:saved.checked||{},writing:saved.writing||'',reviewed:!!saved.reviewed}
        :{responses:{},checked:{},writing:'',reviewed:false};
    }catch{return {responses:{},checked:{},writing:'',reviewed:false};}
  }
  function save(id,state){
    // Every Catch Up lesson keeps in-progress answers in memory only.
    // Reloading or reopening is a new, blank attempt for J277, H446, KS3.
    if(/^(?:j277|h446|ks3)-/.test(id))return;
    try{localStorage.setItem(storageKey(id),JSON.stringify(state));}catch{}
  }
  function saveCompletedSummary(id,result,reviewed){
    // A completion summary can persist without retaining question responses,
    // selected MCQs, question feedback, or written-answer text.
    if(result.checked!==result.total)return;
    const summary={
      scored:result.scored,total:result.total,percent:result.pct,
      mastered:result.mastered,reviewed:!!reviewed,
      completed_at:new Date().toISOString()
    };
    try{localStorage.setItem('rhsccs-catchup-'+id+'-summary-v1',JSON.stringify(summary));}catch{}
  }
  function blockUI(block){
    const section=$('section','catchup-block');
    if(block.title)section.append($('h3','',block.title));
    if(block.type==='paragraph'||block.type==='example'||block.type==='hint'||block.type==='prompt'){
      section.append($('p','',block.text));
    }else if(block.type==='model'){
      const details=$('details','catchup-model');
      details.append($('summary','',block.title||'Reveal model answer'));
      details.append($('p','',block.text));
      section.append(details);
    }else if(block.type==='facts'){
      const list=$('ul','catchup-facts');
      block.items.forEach(item=>list.append($('li','',item)));
      section.append(list);
    }else if(block.type==='mapping'){
      const grid=$('div','catchup-mapping');
      block.items.forEach(([character,code,binary])=>{
        const card=$('div','catchup-map-item');
        card.append($('strong','',character),$('span','',code+' → '+binary));
        grid.append(card);
      });
      section.append(grid,$('p','subtle',block.caption));
    }else if(block.type==='code'){
      const pre=$('pre','catchup-code',block.lines.join('\n'));
      section.append(pre,$('p','subtle',block.caption));
    }else if(block.type==='diagram'){
      // Shared accessible information diagram. Works for flows and comparisons.
      const group=$('div','catchup-diagram '+(block.layout==='cards'?'catchup-diagram-cards':'catchup-diagram-flow'));
      group.setAttribute('role','group');
      group.setAttribute('aria-label',block.title||'Learning diagram');
      (block.items||[]).forEach((item,i)=>{
        const part=$('div','catchup-diagram-part');
        part.append($('strong','',item[0]),$('span','',item[1]||''));
        group.append(part);
        if(block.layout!=='cards'&&i<block.items.length-1){
          const arrow=$('span','catchup-diagram-arrow','→');
          arrow.setAttribute('aria-hidden','true');
          group.append(arrow);
        }
      });
      section.append(group);
      if(block.caption)section.append($('p','subtle',block.caption));
    }else if(block.type==='nibbles'){
      // Shared bit-group visual: no custom graphics in individual lesson files.
      const bits=String(block.binary||'').replace(/[^01]/g,'');
      if(bits.length===8){
        const grid=$('div','catchup-nibbles');
        for(let offset=0;offset<8;offset+=4){
          const group=$('div','catchup-nibble');
          const nibble=bits.slice(offset,offset+4);
          const values=$('div','catchup-nibble-bits');
          nibble.split('').forEach((bit,i)=>{
            const cell=$('div','catchup-nibble-bit');
            cell.append($('span','',String([8,4,2,1][i])),$('strong','',bit));
            values.append(cell);
          });
          group.append(values,$('div','catchup-nibble-value',nibble+' → '+(offset===0?block.left:block.right)));
          grid.append(group);
        }
        section.append(grid);
      }
      if(block.caption)section.append($('p','subtle',block.caption));
    }else if(block.type==='pixelgrid'){
      // A tiny true pixel-grid diagram. Max 100 cells to keep DOM work bounded.
      const width=Math.min(10,Math.max(1,Number(block.width)||8));
      const height=Math.min(10,Math.max(1,Number(block.height)||8));
      const grid=$('div','catchup-pixel-grid');
      grid.style.gridTemplateColumns='repeat('+width+',minmax(0,1fr))';
      for(let i=0;i<width*height;i++){
        const pixel=$('span','catchup-pixel');
        pixel.classList.add('catchup-pixel-shade-'+((i%width+Math.floor(i/width))%4));
        pixel.setAttribute('aria-hidden','true');
        grid.append(pixel);
      }
      grid.setAttribute('role','img');
      grid.setAttribute('aria-label',width+' by '+height+' bitmap with '+(width*height)+' pixels and '+Number(block.colourDepth)+' bits per pixel');
      section.append(grid);
      if(block.caption)section.append($('p','subtle',block.caption));
    }
    return section;
  }
  // Shared compact Catch Up masthead: keep the real accessible lesson heading,
  // move it into the single header bar, and leave lesson/quiz data unchanged.
  function compactHeader(){
    const top=document.querySelector('.catchup-top-inner');
    const intro=document.getElementById('catchup-intro');
    if(!top||!intro||top.querySelector('.catchup-title-lockup'))return;
    const heading=intro.querySelector('h1');
    const eyebrow=intro.querySelector('.catchup-eyebrow');
    if(!heading||!eyebrow)return;
    const title=$('div','catchup-title-lockup');
    const lessonNumber=(location.pathname.match(/\/lesson-(\d{3})\//)||[])[1];
    if(lessonNumber)eyebrow.textContent='LESSON '+lessonNumber;
    title.append(eyebrow,heading);
    top.append(title);
  }
  async function init(){
    compactHeader();
    const app=document.getElementById('catchup-app');
    const configUrl=document.body.dataset.catchupConfig;
    if(!app||!configUrl)return;
    let cfg;
    try{
      if(configUrl==='auto'){
        if(!window.J277CatchupBuilder)throw Error('Catch Up lesson source unavailable');
        const match=location.pathname.match(/lesson-(\d{3})\//);
        if(!match)throw Error('Unknown J277 lesson number');
        cfg=await window.J277CatchupBuilder.build(match[1]);
      }else{
        const res=await fetch(configUrl,{cache:'no-store'});
        if(!res.ok)throw Error('Lesson content unavailable');
        cfg=await res.json();
      }
      if(!Array.isArray(cfg.stages)||cfg.stages.length!==5)throw Error('Invalid lesson stages');
      // The independent route and the classroom share their four Do Now stems.
      if(configUrl!=='auto'&&/^j277-/.test(cfg.id)){
        const bankRes=await fetch('../../../data/catchup/j277-donow-mcq-20261030.json',{cache:'no-store'});
        if(!bankRes.ok)throw Error('Do Now MCQ source missing');
        const bank=await bankRes.json();
        const lessonNo=(cfg.id.match(/-(\d{3})$/)||[])[1];
        const questions=bank.lessons[lessonNo];
        if(!questions||questions.length!==4)throw Error('Incomplete lesson-matched Do Now');
        cfg.stages[0].questions=questions;
      }
      ['Do Now','I Do','We Do','You Do','Review & Improve'].forEach((name,i)=>cfg.stages[i].label=name);
      const ids=cfg.stages.flatMap(s=>s.questions.map(q=>q.id));
      if(ids.length!==new Set(ids).size)throw Error('Duplicate question IDs');
    }catch(e){
      app.replaceChildren($('p','catchup-error','This catch-up lesson could not load. Please use the interactive classroom lesson or printable booklet instead.'));
      console.error(e);
      return;
    }
    // Do Now is retrieval and receives its own /4 score; mastery measures the
    // 13 objective questions in I Do, We Do, You Do and Review & Improve.
    const all=cfg.stages.slice(1).flatMap(stage=>stage.questions);
    const threshold=Math.ceil(all.length*Number(cfg.pass_percent)/100);
    // Shared Catch Up starts each fresh page visit without remembered
    // selections, including any stored by earlier versions of the lessons.
    // The same in-memory state still survives question and phase navigation.
    const focusPilot=/^(?:j277|h446|ks3)-/.test(cfg.id);
    if(focusPilot){
      try{localStorage.removeItem(storageKey(cfg.id));}catch{}
    }
    const state=focusPilot
      ?{responses:{},checked:{},writing:'',reviewed:false}
      :load(cfg.id);
    all.forEach(q=>q._state=state);
    let step=0;
    if(focusPilot)document.body.classList.add('catchup-focused-pilot');
    let questionPage=0,viewPane='learn';
    // Recalculate responsive question layout on rotation/resize,
    // without rebuilding input nodes or losing typed answers.
    let refreshCurrentLayout=()=>{};
    if(focusPilot)window.addEventListener('resize',()=>refreshCurrentLayout());

    const intro=document.getElementById('catchup-intro');
    // J277 Lesson 001 classroom title uses “&”, not the catch-up source's “and”.
    const classroomTitle=cfg.id==='j277-001'?'Binary & Denary':cfg.title;
    const heading=document.querySelector('.catchup-title-lockup h1');
    if(heading)heading.textContent=classroomTitle;
    document.title=(cfg.course==='h446'?'H446':cfg.course==='ks3'?'KS3':'J277')+' · Lesson '+cfg.id.slice(-3)+' · '+classroomTitle;
    intro.querySelector('.catchup-description').textContent=cfg.intro;
    intro.querySelector('.catchup-duration').textContent='About '+cfg.estimated_minutes+' minutes';
    intro.querySelector('.catchup-threshold').textContent=cfg.pass_percent+'% mastery · '+threshold+' of '+all.length+' correct';
    // Single compact top navigation below the shared site header.
    // Its five existing buttons retain their click handlers and current-step state.
    const purposeSteps=[
      ['Do Now','Recall previous learning'],
      ['I Do','Read new knowledge'],
      ['We Do','Practise with guidance'],
      ['You Do','Work independently'],
      ['Review & Improve','Check my understanding']
    ];
    const progress=document.getElementById('catchup-progress');
    progress.classList.add('catchup-progress-top');
    progress.setAttribute('aria-label','Choose a catch-up learning stage');
    const progressItems=cfg.stages.map((stage,i)=>{
      const button=$('button','');
      button.type='button';
      button.setAttribute('aria-label','Go to '+stage.label+': '+purposeSteps[i][1]);
      button.append(phaseIcon(i),$('span','catchup-step-name',i===4?'Review':stage.label));
      button.addEventListener('click',()=>go(i,true));
      progress.append(button);
      return button;
    });
    const stageMount=document.getElementById('catchup-stage');
    const nav=document.getElementById('catchup-nav');
    const previous=$('button','catchup-btn','← Previous');
    const next=$('button','catchup-btn primary','Next →');
    previous.type=next.type='button';
    nav.append(previous,next);
    // Pilot lessons navigate stages using the blue phase bar, not a second
    // Previous/Next row below the activity.
    if(focusPilot)nav.hidden=true;
    previous.addEventListener('click',()=>go(step-1,true));
    next.addEventListener('click',()=>{
      if(step===cfg.stages.length-1)window.location.assign('../../../'+(cfg.course==='ks3'?'ks3-computing.html':(cfg.course==='h446'?'h446-hub.html':'j277-hub.html'))+'?year='+cfg.year+'#lessons');
      else go(step+1,true);
    });
    function setResponse(id,value){
      state.responses[id]=value;
      delete state.checked[id];
      save(cfg.id,state);
    }
    function aggregate(){
      const answered=all.filter(q=>attempted(q,read(q,state))).length;
      const checked=all.filter(q=>state.checked[q.id]&&attempted(q,read(q,state))).length;
      const scored=all.filter(q=>state.checked[q.id]&&correct(q,read(q,state))).length;
      const mastered=answered===all.length&&checked===all.length&&scored>=threshold;
      return {answered,checked,scored,mastered,pct:Math.round(100*scored/all.length)};
    }
    function feedback(q){
      const current=read(q,state);
      if(!state.checked[q.id])return null;
      const did=attempted(q,current);
      const yes=correct(q,current);
      const panel=$('div','catchup-feedback '+(yes?'correct':'review'));
      if(focusPilot){
        panel.setAttribute('role','status');
        panel.setAttribute('aria-live','polite');
        panel.tabIndex=-1;
      }
      panel.append($('strong','',!did?'Answer needed':yes?'Correct — well done':'Review your answer'));
      if(!did)panel.append($('p','','Choose or enter an answer before checking.'));
      else{
        if(!yes&&(focusPilot||q.id.startsWith('dn')))
          panel.append($('p','catchup-correct-answer','Correct answer: '+(
            q.kind==='match'?q.pairs.map(p=>p[0]+' → '+p[1]).join('; '):
            q.kind==='order'?(q.answer||[]).join(' → '):
            String(q.answer??'See explanation below')
          )));
        panel.append($('p','catchup-feedback-explanation',q.feedback));
        if(focusPilot&&!yes)panel.append($('p','catchup-feedback-hint','Change your answer and check again, or move to the next question.'));
      }
      return panel;
    }
    function renderQuestion(q,index){
      const box=$('section','catchup-question');
      box.append($('h3','',(index+1)+'. '+q.prompt));
      const value=read(q,state);
      const answerMount=$('div','catchup-input');
      if(q.kind==='number'){
        const input=$('input','catchup-text');
        input.type='text';input.inputMode='numeric';input.autocomplete='off';
        input.setAttribute('aria-label','Answer for question '+(index+1));
        input.value=value;
        input.addEventListener('input',()=>{setResponse(q.id,input.value);resetFeedback();});
        answerMount.append(input);
      }else if(q.kind==='choice'||q.kind==='truefalse'){
        let options=q.kind==='truefalse'?['True','False']:q.options;
        // Stable, deterministic H446 option order: balanced correct
        // positions, unchanged answers, and no reshuffling on back/forward.
        if(focusPilot&&cfg.course==='h446'&&q.kind==='choice'&&options.length>1){
          const rotation=(index*2+step+1)%options.length;
          options=options.slice(rotation).concat(options.slice(0,rotation));
        }
        const choices=$('div','catchup-choices');
        options.forEach((option,i)=>{
          const label=$('label','catchup-choice');
          const input=$('input');
          input.type='radio';input.name=cfg.id+'-'+q.id;
          input.value=q.kind==='truefalse'?option.toLowerCase():option;
          // Fresh visits always begin blank; moving around within the
          // same attempt retains the answer until the page is reopened.
          input.checked=!!String(value??'').trim()&&normal(value)===normal(input.value);
          input.addEventListener('change',()=>{setResponse(q.id,input.value);resetFeedback();});
          label.append(input,document.createTextNode(option));
          choices.append(label);
        });
        answerMount.append(choices);
      }else if(q.kind==='match'){
        const used=Array.isArray(value)?value:[];
        const grid=$('div','catchup-match');
        const options=q.pairs.map(pair=>pair[1]).slice().reverse();
        q.pairs.forEach((pair,i)=>{
          const row=$('div','catchup-match-row');
          row.append($('strong','',pair[0]));
          const select=$('select');
          select.setAttribute('aria-label','Match '+pair[0]+' to a code number');
          const empty=$('option','','Choose code');empty.value='';select.append(empty);
          options.forEach(option=>{const opt=$('option','',option);opt.value=option;select.append(opt);});
          select.value=used[i]||'';
          select.addEventListener('change',()=>{
            const current=Array.isArray(read(q,state))?read(q,state).slice():q.pairs.map(()=>'');
            current[i]=select.value;setResponse(q.id,current);resetFeedback();
          });
          row.append(select);grid.append(row);
        });
        answerMount.append(grid);
      }else if(q.kind==='order'){
        const list=$('ol','catchup-order');
        const items=Array.isArray(value)&&value.length===q.items.length?value:q.items;
        const move=(from,to)=>{
          if(to<0||to>=items.length||from===to)return;
          const revised=items.slice();
          const [item]=revised.splice(from,1);revised.splice(to,0,item);
          setResponse(q.id,revised);renderStage();
          const focus=stageMount.querySelector('[data-order-id="'+q.id+'"][data-item-position="'+to+'"] button');
          if(focus)focus.focus({preventScroll:true});
        };
        items.forEach((item,i)=>{
          const li=$('li','');
          li.draggable=true;li.dataset.orderId=q.id;li.dataset.itemPosition=String(i);
          li.append($('span','catchup-order-position',String(i+1)));
          li.append($('span','catchup-order-label',item));
          const up=$('button','','↑');
          up.type='button';up.disabled=i===0;up.setAttribute('aria-label','Move '+item+' up');
          up.addEventListener('click',()=>move(i,i-1));
          const down=$('button','','↓');
          down.type='button';down.disabled=i===items.length-1;down.setAttribute('aria-label','Move '+item+' down');
          down.addEventListener('click',()=>move(i,i+1));
          li.append(up,down);
          li.addEventListener('dragstart',event=>{
            event.dataTransfer.setData('text/plain',String(i));
            event.dataTransfer.effectAllowed='move';
            li.classList.add('is-dragging');
          });
          li.addEventListener('dragend',()=>li.classList.remove('is-dragging'));
          li.addEventListener('dragover',event=>event.preventDefault());
          li.addEventListener('drop',event=>{
            event.preventDefault();
            const from=Number(event.dataTransfer.getData('text/plain'));
            if(Number.isInteger(from))move(from,i);
          });
          list.append(li);
        });
        answerMount.append($('p','catchup-hint','Drag items on desktop or use ↑ and ↓ buttons to change the order.'));
        answerMount.append(list);
      }
      box.append(answerMount);
      if(focusPilot){
        const checkOne=$('button','catchup-btn primary catchup-check-one','Check answer');
        checkOne.type='button';
        checkOne.disabled=!attempted(q,read(q,state));
        const updateCheck=()=>{checkOne.disabled=!attempted(q,read(q,state));};
        answerMount.addEventListener('input',updateCheck);
        answerMount.addEventListener('change',updateCheck);
        checkOne.addEventListener('click',()=>{
          if(!attempted(q,read(q,state)))return;
          state.checked[q.id]=true;save(cfg.id,state);resetFeedback();
          const explanation=box.querySelector('.catchup-feedback');
          if(explanation)explanation.focus({preventScroll:true});
        });
        box.append(checkOne);
      }
      const node=feedback(q);if(node)box.append(node);
      return box;
    }
    let resetFeedback=()=>{};
    function writingUI(writing){
      const section=$('section','catchup-block catchup-written');
      section.append($('h3','', 'One written exam-style answer'));
      section.append($('p','',writing.prompt));
      const input=$('textarea','');
      input.setAttribute('aria-label','Your written explanation');
      input.value=state.writing;
      input.addEventListener('input',()=>{
        state.writing=input.value;
        state.reviewed=false;
        reviewed.checked=false;
        save(cfg.id,state);
      });
      section.append(input);
      const details=$('details','');
      details.append($('summary','','Compare with the model answer'));
      const inside=$('div','');
      inside.append($('p','',writing.model));
      const list=$('ul','checklist');
      writing.checklist.forEach(item=>list.append($('li','',item)));
      details.append(inside,list);section.append(details);
      const label=$('label','catchup-review-label');
      const reviewed=$('input','');
      reviewed.type='checkbox';reviewed.checked=state.reviewed;
      reviewed.addEventListener('change',()=>{state.reviewed=reviewed.checked;save(cfg.id,state);});
      label.append(reviewed,document.createTextNode('I have compared my answer with the model and improved it where needed.'));
      section.append(label);
      return section;
    }
    function overall(){
      const result=aggregate();
      const panel=$('section','catchup-result');
      panel.append($('h3','', 'Your catch-up result'));
      panel.append($('strong','',result.scored+' / '+all.length+' · '+result.pct+'%'));
      const retrieval=cfg.stages[0].questions;
      const retrievalCorrect=retrieval.filter(q=>state.checked[q.id]&&correct(q,read(q,state))).length;
      panel.append($('p','', 'Do Now retrieval: '+retrievalCorrect+' / 4 (separate from the mastery score).'));
      let message;
      if(result.mastered)message='Mastery achieved: you reached at least '+cfg.pass_percent+'% and attempted and checked every question.';
      else if(result.checked<all.length)message='Attempt and check all '+all.length+' questions to finish. You can revisit any step.';
      else message='You have not reached '+cfg.pass_percent+'% yet. Review the feedback and retry any question. You can still move on.';
      panel.append($('p','',message));
      panel.append($('p','', 'Target: '+threshold+' correct out of '+all.length+'. All objective questions must be attempted and checked; there are unlimited retries.'));
      panel.append($('p','',state.reviewed?'Written answer: self-reviewed.':'Written answer: compare your response with the model on Apply.'));
      if(result.mastered&&!state.reviewed)panel.append($('p','', 'Your score meets the target. Complete the written self-review to finish the full learning activity.'));
      if(result.mastered&&state.reviewed){
        panel.append($('p','', 'Lesson complete. Well done — move on whenever you are ready.'));
      }
      const retry=$('button','catchup-btn','Review answers');
      retry.type='button';retry.addEventListener('click',()=>go(0,true));
      panel.append(retry);
      if(focusPilot){
        const finish=$('button','catchup-btn primary catchup-finish','Finish → Lessons');
        finish.type='button';
        finish.addEventListener('click',()=>{
          saveCompletedSummary(cfg.id,{...aggregate(),total:all.length},state.reviewed);
          window.location.assign('../../../'+(cfg.course==='ks3'?'ks3-computing.html':(cfg.course==='h446'?'h446-hub.html':'j277-hub.html'))+'?year='+cfg.year+'#lessons');
        });
        panel.append(finish);
      }
      return panel;
    }
    function renderStage(){
      const info=cfg.stages[step];
      stageMount.replaceChildren();
      // One clear stage heading with learning purpose and duration.
      const head=$('div','catchup-card-header');
      const title=$('div','catchup-stage-heading');
      const h=$('h2','',info.label+' · '+purposeSteps[step][1]);
      h.id='catchup-stage-title';
      title.append(h);
      const lead=String(info.lead||'').trim();
      if(lead&&lead.toLowerCase()!==info.label.toLowerCase()&&
         lead.toLowerCase()!==purposeSteps[step][1].toLowerCase())
        title.append($('p','catchup-stage-lead',lead));
      head.append(title,$('span','catchup-stage-minutes',info.minutes+' min'));
      stageMount.append(head);
      const stageBody=focusPilot?$('div','catchup-stage-columns'):stageMount;
      const learning=focusPilot&&info.blocks.length?$('section','catchup-learning-panel'):null;
      const activity=focusPilot?$('section','catchup-activity-panel'):stageMount;
      info.blocks.forEach(block=>(learning||stageMount).append(blockUI(block)));
      if(learning)stageBody.append(learning);
      activity.append($('h3','catchup-section-heading','Quick questions · '+info.questions.length));
      const questionCards=info.questions.map((q,i)=>renderQuestion(q,i));
      questionCards.forEach(card=>activity.append(card));
      const writingCard=info.writing?writingUI(info.writing):null;
      if(writingCard)activity.append(writingCard);
      let focusedRefresh=()=>{};
      if(focusPilot){
        const pager=$('nav','catchup-question-pager');
        pager.setAttribute('aria-label','Move between questions');
        const questionBack=$('button','catchup-pager-button catchup-pager-back');
        const questionNext=$('button','catchup-pager-button catchup-pager-next');
        questionBack.type=questionNext.type='button';
        questionBack.setAttribute('aria-label','Previous question');
        questionNext.setAttribute('aria-label','Next question');
        // Same accessible controls on desktop and mobile. On phones the
        // large labels become compact chevrons; buttons remain 44px targets.
        const chevron=direction=>{
          const span=$('span','catchup-pager-chevron');
          span.setAttribute('aria-hidden','true');
          span.innerHTML='<svg viewBox="0 0 24 24" focusable="false" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="'+(direction==='left'?'m15 18-6-6 6-6':'m9 18 6-6-6-6')+'"/></svg>';
          return span;
        };
        questionBack.append(chevron('left'),$('span','catchup-pager-label','Previous question'));
        questionNext.append($('span','catchup-pager-label','Next question'),chevron('right'));
        const questionCenter=$('div','catchup-pager-center');
        const questionCount=$('span','catchup-question-count');
        questionCount.setAttribute('role','status');
        questionCount.setAttribute('aria-live','polite');
        const questionDots=$('div','catchup-question-dots');
        questionDots.setAttribute('aria-hidden','true');
        const questionHint=$('span','catchup-swipe-hint','Swipe to move between questions');
        questionCenter.append(questionCount,questionDots,questionHint);
        pager.append(questionBack,questionCenter,questionNext);
        activity.append(pager);
        let studyNext=null,studyBack=null;
        if(learning){
          studyNext=$('button','catchup-btn primary catchup-study-next','Try questions →');
          studyNext.type='button';
          learning.append(studyNext);
          studyBack=$('button','catchup-revisit-learning','← Review learning');
          studyBack.type='button';
          activity.insertBefore(studyBack,activity.firstChild);
        }
        const totalPages=questionCards.length+(writingCard?1:0);
        const lastPage=totalPages-1;
        const dots=Array.from({length:totalPages},()=>{
          const dot=$('span','catchup-question-dot');
          questionDots.append(dot);
          return dot;
        });
        const mobile=()=>window.matchMedia&&window.matchMedia('(max-width:850px)').matches;
        const roomy=()=>window.matchMedia&&window.matchMedia('(min-width:1180px) and (min-height:880px)').matches&&
          !learning&&!writingCard;
        const focusQuestion=()=>{
          window.scrollTo({top:0,behavior:'instant'});
          const q=questionCards[questionPage];
          const heading=q?.querySelector('h3')||(writingCard&&writingCard.querySelector('h3'));
          if(heading){heading.tabIndex=-1;heading.focus({preventScroll:true});}
        };
        focusedRefresh=()=>{
          const split=!!learning&&mobile();
          const all=!!roomy();
          questionPage=Math.max(0,Math.min(lastPage,questionPage));
          if(learning){
            learning.hidden=split&&viewPane!=='learn';
            if(studyNext)studyNext.hidden=!split;
            if(studyBack)studyBack.hidden=!split;
          }
          activity.hidden=split&&viewPane==='learn';
          questionCards.forEach((card,i)=>{card.hidden=!all&&i!==questionPage;});
          if(writingCard)writingCard.hidden=questionPage!==questionCards.length;
          pager.hidden=all;
          // Place the compact controls above the question on phones, while
          // preserving the familiar bottom question controls on desktops.
          if(mobile())activity.insertBefore(pager,questionCards[0]);
          else activity.append(pager);
          questionBack.disabled=questionPage===0;
          questionNext.disabled=questionPage===lastPage;
          dots.forEach((dot,i)=>dot.classList.toggle('is-current',i===questionPage));
          questionCount.textContent=questionPage===questionCards.length?'Written answer':
            'Question '+(questionPage+1)+' of '+questionCards.length;
        };
        questionBack.addEventListener('click',()=>{questionPage=Math.max(0,questionPage-1);focusedRefresh();focusQuestion();});
        questionNext.addEventListener('click',()=>{questionPage=Math.min(lastPage,questionPage+1);focusedRefresh();focusQuestion();});
        if(studyNext)studyNext.addEventListener('click',()=>{viewPane='practice';focusedRefresh();focusQuestion();});
        if(studyBack)studyBack.addEventListener('click',()=>{viewPane='learn';focusedRefresh();window.scrollTo({top:0,behavior:'instant'});});
        // Touch-only, horizontal question navigation. Do not capture vertical
        // scroll or gestures starting on answer fields, text, buttons,
        // draggable ordering items, links, or selectable text.
        let swipeStart=null;
        activity.addEventListener('touchstart',event=>{
          if(!mobile()||event.touches.length!==1){swipeStart=null;return;}
          const target=event.target;
          if(target.closest('input,textarea,select,label,button,a,details,summary,[draggable="true"],.catchup-order,[contenteditable]')){
            swipeStart=null;return;
          }
          const touch=event.touches[0];
          swipeStart={x:touch.clientX,y:touch.clientY,time:Date.now()};
        },{passive:true});
        activity.addEventListener('touchcancel',()=>{swipeStart=null;},{passive:true});
        activity.addEventListener('touchend',event=>{
          if(!swipeStart||!mobile()||event.changedTouches.length!==1){swipeStart=null;return;}
          const start=swipeStart;swipeStart=null;
          const touch=event.changedTouches[0];
          const dx=touch.clientX-start.x,dy=touch.clientY-start.y;
          const selection=String(window.getSelection?.()?.toString()||'').trim();
          if(selection||Date.now()-start.time>900||Math.abs(dx)<75||
             Math.abs(dx)<Math.abs(dy)*1.6)return;
          if(dx<0&&questionPage<lastPage)questionPage++;
          else if(dx>0&&questionPage>0)questionPage--;
          else return;
          focusedRefresh();focusQuestion();
        },{passive:true});
        // Keep the existing Check Answers button tied to the final
        // question or writing page. Navigation does not mark anything.
        const originalRefresh=focusedRefresh;
        focusedRefresh=()=>{originalRefresh();syncFocusedActions();};
      }
      if(focusPilot){stageBody.append(activity);stageMount.append(stageBody);}
      const actions=$('div','catchup-actions');
      const check=$('button','catchup-btn primary','Check these answers');
      check.type='button';
      const status=$('div','catchup-stage-score');
      status.setAttribute('role','status');status.setAttribute('aria-live','polite');
      actions.append(check);activity.append(actions,status);
      const lastFocusedPage=questionCards.length+(writingCard?1:0)-1;
      const syncFocusedActions=()=>{
        if(!focusPilot)return;
        const all=!writingCard&&!learning&&window.matchMedia&&
          window.matchMedia('(min-width:1180px) and (min-height:880px)').matches;
        // Pilot questions are checked individually. Never allow the old
        // stage-wide button to reveal unchecked questions' answers.
        const lastQuestion=info.questions[info.questions.length-1];
        actions.hidden=true;
        status.hidden=!(questionPage===lastFocusedPage&&
          !!state.checked[lastQuestion.id]);
        const result=activity.querySelector('.catchup-result');
        if(result)result.hidden=!(step===cfg.stages.length-1&&
          questionPage===lastFocusedPage&&!!state.checked[lastQuestion.id]);
      };
      function stageStatus(){
        const marked=info.questions.filter(q=>state.checked[q.id]&&attempted(q,read(q,state))).length;
        const good=info.questions.filter(q=>state.checked[q.id]&&correct(q,read(q,state))).length;
        if(step===0)check.disabled=info.questions.some(q=>!attempted(q,read(q,state)));
        status.textContent=marked
          ?good+' / '+info.questions.length+' correct on '+(step===0?'Do Now':'this step')+' · '+marked+' attempted and checked.'+(step===0?' Retrieval is separate from the 80% mastery score.':'')
          :step===0?'Answer all four Do Now questions, then select Check these answers.'
          :'Answer the questions, then select Check these answers.';
      }
      resetFeedback=()=>{
        // Editing clears the old score for this question and any stale feedback.
        const feedbacks=stageMount.querySelectorAll('.catchup-question .catchup-feedback');
        feedbacks.forEach(node=>node.remove());
        info.questions.forEach((q,i)=>{
          const node=feedback(q);
          if(node)stageMount.querySelectorAll('.catchup-question')[i].append(node);
        });
        stageStatus();
        if(step===cfg.stages.length-1){
          const old=stageMount.querySelector('.catchup-result');if(old)old.replaceWith(overall());
        }
        syncFocusedActions();
      };
      check.addEventListener('click',()=>{
        info.questions.forEach(q=>state.checked[q.id]=true);
        save(cfg.id,state);
        resetFeedback();
        status.focus({preventScroll:true});
      });
      status.tabIndex=-1;
      stageStatus();
      if(step===cfg.stages.length-1)activity.append(overall());
      focusedRefresh();
      syncFocusedActions();
      if(focusPilot)refreshCurrentLayout=focusedRefresh;
      // Keep the top navigation in place and announce the active stage.
      progressItems.forEach((button,i)=>{
        if(i===step)button.setAttribute('aria-current','step');else button.removeAttribute('aria-current');
      });
      previous.disabled=step===0;
      next.textContent=step===cfg.stages.length-1?'Finish → Lessons':'Next →';
    }
    function go(index,focus){
      step=Math.max(0,Math.min(cfg.stages.length-1,index));
      questionPage=0;viewPane='learn';
      renderStage();
      if(focus){
        window.scrollTo({top:0,behavior:'instant'});
        const title=document.getElementById('catchup-stage-title');
        title.tabIndex=-1;title.focus({preventScroll:true});
      }
    }
    go(0,false);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();


/* One shared, presentation-only website navigation. Safe when other systems also load it. */
(function(){
  if(document.querySelector('script[data-rhsc-site-nav]'))return;
  const script=document.createElement('script');
  script.src='/assets/site-nav.js?v=20261103-audit3';
  script.dataset.rhscSiteNav='1';
  document.head.appendChild(script);
})();

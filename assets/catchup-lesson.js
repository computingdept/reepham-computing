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
    try{localStorage.setItem(storageKey(id),JSON.stringify(state));}catch{}
  }
  function blockUI(block){
    const section=$('section','catchup-block');
    if(block.title)section.append($('h3','',block.title));
    if(block.type==='paragraph'||block.type==='example'||block.type==='hint'||block.type==='prompt'){
      section.append($('p','',block.text));
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
    }
    return section;
  }
  async function init(){
    const app=document.getElementById('catchup-app');
    const configUrl=document.body.dataset.catchupConfig;
    if(!app||!configUrl)return;
    let cfg;
    try{
      const res=await fetch(configUrl,{cache:'no-store'});
      if(!res.ok)throw Error('Lesson content unavailable');
      cfg=await res.json();
      if(!Array.isArray(cfg.stages)||cfg.stages.length!==5)throw Error('Invalid lesson stages');
      const ids=cfg.stages.flatMap(s=>s.questions.map(q=>q.id));
      if(ids.length!==new Set(ids).size)throw Error('Duplicate question IDs');
    }catch(e){
      app.replaceChildren($('p','catchup-error','This catch-up lesson could not load. Please use the interactive classroom lesson or printable booklet instead.'));
      console.error(e);
      return;
    }
    const all=cfg.stages.flatMap(stage=>stage.questions);
    const threshold=Math.ceil(all.length*Number(cfg.pass_percent)/100);
    const state=load(cfg.id);
    all.forEach(q=>q._state=state);
    let step=0;
    const intro=document.getElementById('catchup-intro');
    intro.querySelector('h1').textContent=cfg.title;
    intro.querySelector('.catchup-description').textContent=cfg.intro;
    intro.querySelector('.catchup-duration').textContent='About '+cfg.estimated_minutes+' minutes';
    intro.querySelector('.catchup-threshold').textContent=cfg.pass_percent+'% mastery · '+threshold+' of '+all.length+' correct';
    const progress=document.getElementById('catchup-progress');
    const progressItems=cfg.stages.map((stage,i)=>{
      const button=$('button','');
      button.type='button';
      button.append($('span','step-index',String(i+1)+' of 5'),document.createTextNode(stage.label));
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
    previous.addEventListener('click',()=>go(step-1,true));
    next.addEventListener('click',()=>{
      if(step===cfg.stages.length-1)window.location.assign('index.html#do-now');
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
      panel.append($('strong','',!did?'Answer needed':yes?'Correct':'Check and try again'));
      panel.append($('p','',!did?'Choose or enter an answer, then check again.':q.feedback));
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
        const options=q.kind==='truefalse'?['True','False']:q.options;
        const choices=$('div','catchup-choices');
        options.forEach((option,i)=>{
          const label=$('label','catchup-choice');
          const input=$('input');
          input.type='radio';input.name=cfg.id+'-'+q.id;
          input.value=q.kind==='truefalse'?option.toLowerCase():option;
          input.checked=normal(value)===normal(input.value);
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
      return panel;
    }
    function renderStage(){
      const info=cfg.stages[step];
      stageMount.replaceChildren();
      const head=$('div','catchup-card-header');
      const title=$('div','');
      title.append($('span','catchup-eyebrow', 'Step '+(step+1)+' of 5 · '+info.minutes+' min'));
      const h=$('h2','',info.label);h.id='catchup-stage-title';
      title.append(h,$('p','',info.lead));
      head.append(title);
      if(info.sign){
        const icon=$('img','catchup-sign');
        icon.src='../../../lessons/h446/lesson-001/assets/'+info.sign;
        icon.alt=info.label+' classroom sign';
        head.append(icon);
      }
      stageMount.append(head);
      info.blocks.forEach(block=>stageMount.append(blockUI(block)));
      stageMount.append($('h3','catchup-section-heading','Quick questions · '+info.questions.length));
      info.questions.forEach((q,i)=>stageMount.append(renderQuestion(q,i)));
      if(info.writing)stageMount.append(writingUI(info.writing));
      const actions=$('div','catchup-actions');
      const check=$('button','catchup-btn primary','Check these answers');
      check.type='button';
      const status=$('div','catchup-stage-score');
      status.setAttribute('role','status');status.setAttribute('aria-live','polite');
      actions.append(check);stageMount.append(actions,status);
      function stageStatus(){
        const marked=info.questions.filter(q=>state.checked[q.id]&&attempted(q,read(q,state))).length;
        const good=info.questions.filter(q=>state.checked[q.id]&&correct(q,read(q,state))).length;
        status.textContent=marked
          ?good+' / '+info.questions.length+' correct on this step · '+marked+' attempted and checked.'
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
      };
      check.addEventListener('click',()=>{
        info.questions.forEach(q=>state.checked[q.id]=true);
        save(cfg.id,state);
        resetFeedback();
        status.focus({preventScroll:true});
      });
      status.tabIndex=-1;
      stageStatus();
      if(step===cfg.stages.length-1)stageMount.append(overall());
      progressItems.forEach((button,i)=>{
        if(i===step)button.setAttribute('aria-current','step');else button.removeAttribute('aria-current');
      });
      previous.disabled=step===0;
      next.textContent=step===cfg.stages.length-1?'Open teacher lesson':'Next →';
    }
    function go(index,focus){
      step=Math.max(0,Math.min(cfg.stages.length-1,index));
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

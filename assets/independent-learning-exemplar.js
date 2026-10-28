/* Shared independent lesson activities: progressively enhances source HTML.
   Printable content stays in the very same page markup; the printer uses
   the unchanged source pages, not online-only answer widgets. */
(function(){
  'use strict';
  function init(){
    const lesson=document.body.dataset.lesson;
    if(lesson!=='j277-003')return;
    const viewer=document.getElementById('viewer');
    if(!viewer)return;
    function el(tag,klass,text){
      const e=document.createElement(tag);
      if(klass)e.className=klass;
      if(text!==undefined)e.textContent=text;
      return e;
    }
    const answers=new Map();
    function reply(parent,id,label,multiline){
      if(!parent)return;
      const wrap=el('div','online-reply');
      const idFull='online-response-'+id;
      const prompt=el('label','',label);
      prompt.htmlFor=idFull;
      const box=el(multiline?'textarea':'input','');
      box.id=idFull;
      if(!multiline)box.type='text';
      else box.rows=2;
      box.autocomplete='off';
      box.spellcheck=false;
      if(!multiline)box.placeholder='Final answer';
      else box.placeholder='Write your response';
      wrap.append(prompt,box);
      parent.append(wrap);
      answers.set(id,box);
    }
    const start=viewer.querySelector('[data-page="1"]');
    [...(start?.querySelectorAll('.q')||[])].forEach((q,i)=>{
      reply(q,'retrieve-'+(i+1),'Your answer to retrieval question '+(i+1),true);
    });
    const learn=viewer.querySelector('[data-page="2"]');
    const guided=[...(learn?.querySelectorAll('.heading')||[])].find(x=>/We Do/i.test(x.textContent));
    if(guided){
      const last=[...guided.parentElement.children].findIndex(x=>x===guided);
      const following=[...guided.parentElement.children].slice(last+1).filter(x=>x.tagName==='P');
      if(following.length)reply(following[following.length-1],'guided','Your guided-practice answer',true);
    }
    const practise=viewer.querySelector('[data-page="3"]');
    if(practise){
      const headings=[...practise.querySelectorAll('.heading')];
      const codeHeading=headings.find(x=>/Code First/i.test(x.textContent));
      const nextHeading=headings.find(x=>/Practise/i.test(x.textContent));
      if(codeHeading&&nextHeading){
        let current=codeHeading.nextElementSibling;
        let n=0;
        while(current && current!==nextHeading){
          const subsequent=current.nextElementSibling;
          if(current.classList.contains('q'))reply(current,'code-'+(++n),'Your Code First answer',true);
          current=subsequent;
        }
      }
      if(nextHeading){
        let current=nextHeading.nextElementSibling;
        let n=0;
        while(current&&n<3){
          const subsequent=current.nextElementSibling;
          if(current.classList.contains('q')){
            n++;
            reply(current,'convert-'+n,'Final answer to conversion '+n,false);
          }
          current=subsequent;
        }
      }
      const apply=headings.find(x=>/Apply/i.test(x.textContent));
      const explain=headings.find(x=>/Explain/i.test(x.textContent));
      if(apply)reply(apply.nextElementSibling,'apply','Explain and correct the mistake',true);
      if(explain)reply(explain.nextElementSibling,'explain','Explain the advantage and storage',true);
    }
    // Keep all existing printed answers visible; only the screen viewer
    // gains a deliberate, accessible reveal before self-marking.
    const check=viewer.querySelector('[data-page="4"] > main');
    if(check){
      const head=[...check.querySelectorAll(':scope > .heading')];
      const first=head.find(x=>/Do Now.*Model answers/i.test(x.textContent));
      const last=head.find(x=>/Correct.*return/i.test(x.textContent));
      if(first&&last){
        const details=el('details','lesson-model-answers');
        details.append(el('summary','', 'Reveal model answers after attempting the questions'));
        const holder=el('div','info lesson-answer-key');
        while(first.parentNode===check&&check.contains(first)&&first!==last){
          const node=first; // move following siblings safely, preserving content
          let next=node.nextSibling;
          while(next&&next!==last){
            const keep=next.nextSibling;
            holder.append(next);
            next=keep;
          }
          holder.prepend(node);
          break;
        }
        details.append(holder);
        check.insertBefore(details,last);
      }
      const controls=el('div','lesson-check-controls');
      const btn=el('button','', 'Check my three conversions');
      btn.type='button';
      const status=el('div','lesson-check-result');
      status.setAttribute('role','status');
      status.setAttribute('aria-live','polite');
      const targets=[['convert-1','B0'],['convert-2','163'],['convert-3','62']];
      btn.addEventListener('click',()=>{
        status.replaceChildren();
        let correct=0,attempted=0;
        targets.forEach(([id,expected],i)=>{
          const value=(answers.get(id)?.value||'').trim().toUpperCase().replace(/^(?:0X)/,'').replace(/\s/g,'');
          const item=el('p',value===expected?'positive':'retry');
          if(value)attempted++;
          if(value===expected){
            correct++;
            item.textContent='Conversion '+(i+1)+': correct.';
          }else{
            item.textContent='Conversion '+(i+1)+': '+(value?'check your working against the model answer.':'not answered yet.');
          }
          status.append(item);
        });
        status.prepend(el('strong','',correct+' of 3 conversions correct ('+attempted+' attempted).'));
      });
      controls.append(btn,status);
      if(first&&last)check.insertBefore(controls,check.querySelector('.lesson-model-answers'));
      else check.prepend(controls);
    }
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();

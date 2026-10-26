'use strict';
/* RHSC shared revision UI enhancement.
   No quiz scoring or question-bank logic lives here: GCSE and A Level continue to
   own their examination content, routes and saved results. */
(function(){
  const grid=document.getElementById('topic-grid');
  const quiz=document.getElementById('quiz');
  if(!grid||!quiz)return;
  const script=document.currentScript;
  const storageKey=script?.getAttribute('data-progress-key')||'';
  document.documentElement.classList.add('rhsc-revision-ui');

  // A visual-preview URL is carried back to the course hub without applying
  // preview styling to any quiz, question, marking or revision guide.
  if(new URLSearchParams(location.search).get('theme')==='synergy'){
    const hubBack=document.querySelector('header.practice-nav a[href*="-hub.html"]');
    if(hubBack){
      const destination=new URL(hubBack.getAttribute('href'),location.href);
      destination.searchParams.set('theme','synergy');
      hubBack.href=destination.pathname+destination.search+destination.hash;
    }
  }


  // Keep the existing Next button and its event listeners. Only its presentation
  // container moves, so explanation precedes Next on desktop and on phones.
  const next=document.getElementById('next');
  const panel=quiz.querySelector('.feedback-panel');
  if(next&&panel&&!quiz.querySelector('.feedback-next')){
    const slot=document.createElement('div');
    slot.className='feedback-next';
    panel.after(slot);
    slot.append(next);
  }

  const section=document.getElementById('directory');
  const heading=section?.querySelector('.directory-heading');
  const summary=document.createElement('div');
  summary.className='rhsc-progress-summary';
  summary.setAttribute('aria-label','Skill mastery progress');
  summary.hidden=true;
  if(heading)heading.after(summary);

  function savedRecords(){
    if(!storageKey)return {};
    try{
      const value=JSON.parse(localStorage.getItem(storageKey)||'{}');
      return value&&typeof value==='object'&&!Array.isArray(value)?value:{};
    }catch{return {};}
  }
  function skillList(){
    try{return typeof SKILLS!=='undefined'&&Array.isArray(SKILLS)?SKILLS:[];}catch{return [];}
  }
  function specGroup(value){
    return String(value||'').match(/[12]\.\d+\.\d+/)?.[0]||String(value||'').trim();
  }
  let updating=false;
  function enhanceDirectory(){
    if(updating)return;
    const direct=[...grid.children].filter(x=>x.classList.contains('topic'));
    // A finished grouped directory requires no work until the quiz engine
    // re-renders the directory and places new topic cards into the grid.
    if(!direct.length)return;
    updating=true;
    observer.disconnect();
    try{
      const all=skillList();
      const saved=savedRecords();
      let mastered=0;
      const rows=[];
      for(const card of direct){
        const title=card.querySelector('h2')?.textContent?.trim()||'';
        const spec=card.querySelector('.spec')?.textContent?.trim()||'';
        const skill=all.find(s=>s.title===title&&s.spec===spec)||all.find(s=>s.title===title);
        const record=skill?saved[skill.id]:null;
        const latest=typeof record?.latest==='number'?record.latest:null;
        const best=typeof record?.best==='number'?record.best:latest;
        const isMastered=best!==null&&best>=80;
        if(isMastered)mastered++;
        const status=card.querySelector('.status');
        if(status&&record&&latest!==null){
          status.classList.toggle('reached',isMastered);
          status.classList.toggle('revisit',!isMastered);
          status.textContent=isMastered
            ?'Mastered · Best '+best+'% · Latest '+latest+'%'
            :'Revisit · Latest '+latest+'%';
        }
        rows.push({card,spec:specGroup(spec),mastered:isMastered});
      }
      if(heading){
        const first=rows.find(r=>!r.mastered);
        const copy=document.createElement('div');
        copy.className='rhsc-progress-copy';
        const count=document.createElement('strong');
        count.textContent=mastered+' of '+rows.length+' skills mastered';
        copy.append(count);
        const savedNote=document.createElement('span');
        savedNote.textContent='80% target · saved on this browser';
        copy.append(savedNote);
        summary.replaceChildren(copy);
        if(first){
          const button=document.createElement('button');
          button.type='button';
          button.textContent='Continue · '+first.card.querySelector('h2')?.textContent;
          button.setAttribute('aria-label','Continue revision with '+first.card.querySelector('h2')?.textContent);
          button.addEventListener('click',()=>first.card.querySelector('button')?.click());
          summary.append(button);
        }
        const bar=document.createElement('div');
        bar.className='rhsc-progress-track';
        bar.setAttribute('role','progressbar');
        bar.setAttribute('aria-label','Skills mastered');
        bar.setAttribute('aria-valuemin','0');
        bar.setAttribute('aria-valuemax',String(rows.length));
        bar.setAttribute('aria-valuenow',String(mastered));
        const fill=document.createElement('div');
        fill.className='rhsc-progress-fill';
        fill.style.width=(rows.length?100*mastered/rows.length:0)+'%';
        bar.append(fill);
        summary.append(bar);
        summary.hidden=false;
      }
      const groups=new Map();
      for(const row of rows){
        if(!groups.has(row.spec))groups.set(row.spec,[]);
        groups.get(row.spec).push(row.card);
      }
      grid.classList.toggle('rhsc-grouped',groups.size>1);
      if(groups.size>1){
        const frag=document.createDocumentFragment();
        for(const [name,cards] of groups){
          const group=document.createElement('section');
          group.className='rhsc-spec-group';
          group.setAttribute('aria-label','Specification '+name);
          const title=document.createElement('h2');
          title.className='rhsc-spec-group-title';
          title.append(document.createTextNode(name));
          const count=document.createElement('small');
          count.textContent=cards.length+' skill'+(cards.length===1?'':'s');
          title.append(count);
          const body=document.createElement('div');
          body.className='rhsc-spec-grid';
          body.append(...cards);
          group.append(title,body);
          frag.append(group);
        }
        grid.replaceChildren(frag);
      }
    }finally{
      observer.observe(grid,{childList:true});
      updating=false;
    }
  }
  const observer=new MutationObserver(()=>queueMicrotask(enhanceDirectory));
  observer.observe(grid,{childList:true});
  queueMicrotask(enhanceDirectory);
})();

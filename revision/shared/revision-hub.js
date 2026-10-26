'use strict';
/* One Paper 1 / Paper 2 filter for J277 and H446.
   Preserve course-specific destinations and OCR specification ordering. */
(function(){
  const hub=document.getElementById('revisionhub');
  if(!hub||hub.dataset.rhscPaperNav==='ready')return;
  const previous=[...hub.querySelectorAll('.rhsc-practice-group')];
  const tiles=[...hub.querySelectorAll('.rhsc-practice-group > .rhsc-practice-grid > .rhsc-practice-tile')];
  const subtopics=hub.querySelector('.rhsc-practice-subtopics');
  if(previous.length<2||tiles.length<2)return;

  const spec=t=>t.dataset.spec||(t.getAttribute('href')||'').split('#').pop();
  const number=t=>spec(t).split('.')[0];
  const sort=(a,b)=>{
    const aa=spec(a).split('.').map(Number),bb=spec(b).split('.').map(Number);
    for(let i=0;i<Math.max(aa.length,bb.length);i++){
      const delta=(aa[i]??-1)-(bb[i]??-1);
      if(delta)return delta;
    }
    return 0;
  };
  const parent=previous[0].parentElement;
  if(!parent||previous.some(x=>x.parentElement!==parent))return;
  const headings={1:'Computer Systems',2:'Algorithms and Programming'};
  for(const n of [1,2]){
    const old=previous.find(g=>g.querySelector('h3')?.textContent?.trim().startsWith('Paper '+n));
    headings[n]=old?.querySelector('h3 span')?.textContent?.trim()||headings[n];
  }

  // Gather tiles before changing the DOM so no original destination is lost.
  const byPaper={1:tiles.filter(t=>number(t)==='1').sort(sort),
                 2:tiles.filter(t=>number(t)==='2').sort(sort)};
  if(!byPaper[1].length||!byPaper[2].length||byPaper[1].length+byPaper[2].length!==tiles.length)return;

  const groups={};
  for(const n of [1,2]){
    const group=document.createElement('section');
    group.className='rhsc-practice-group rhsc-paper-panel';
    group.id='rhsc-revision-paper-'+n;
    group.setAttribute('role','tabpanel');
    group.setAttribute('aria-labelledby','rhsc-paper-tab-'+n);
    const title=document.createElement('h3');
    title.id='rhsc-revision-paper-heading-'+n;
    title.append(document.createTextNode('Paper '+n));
    const sub=document.createElement('span');
    sub.textContent=headings[n];
    title.append(sub);
    group.append(title);
    const grid=document.createElement('div');
    grid.className='rhsc-practice-grid';
    grid.append(...byPaper[n]);
    group.append(grid);

    if(n===1&&subtopics){
      // The H446 1.4 parent remains a normal grid tile. Its three legacy
      // destinations appear together below the grid only when requested.
      const branch=group.querySelector('.rhsc-practice-expand');
      if(branch){
        group.append(subtopics);
        branch.addEventListener('click',()=>{
          const expanded=branch.getAttribute('aria-expanded')==='true';
          branch.setAttribute('aria-expanded',String(!expanded));
          subtopics.hidden=expanded;
        });
      }
    }
    groups[n]=group;
  }

  const nav=document.createElement('div');
  nav.className='rhsc-paper-nav';
  nav.setAttribute('role','tablist');
  nav.setAttribute('aria-label','Choose a revision paper');
  const buttons={};
  function choose(n,focus=false){
    for(const paper of [1,2]){
      const selected=paper===n;
      groups[paper].hidden=!selected;
      buttons[paper].setAttribute('aria-selected',String(selected));
      buttons[paper].tabIndex=selected?0:-1;
    }
    hub.dataset.activePaper=String(n);
    if(focus)buttons[n].focus();
  }
  for(const n of [1,2]){
    const btn=document.createElement('button');
    btn.id='rhsc-paper-tab-'+n;
    btn.type='button';
    btn.className='rhsc-paper-nav-button';
    btn.setAttribute('role','tab');
    btn.setAttribute('aria-controls',groups[n].id);
    btn.textContent='Paper '+n;
    btn.addEventListener('click',()=>choose(n));
    btn.addEventListener('keydown',event=>{
      if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
      event.preventDefault();
      const next=event.key==='Home'?1:event.key==='End'?2:(n===1?2:1);
      choose(next,true);
    });
    nav.append(btn);
    buttons[n]=btn;
  }
  const intro=hub.querySelector('.rhsc-practice-intro')||hub.querySelector('.summary');
  if(intro)intro.after(nav);
  previous[0].before(groups[1],groups[2]);
  previous.forEach(g=>g.remove());
  choose(1);
  hub.dataset.rhscPaperNav='ready';
})();

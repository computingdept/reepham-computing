'use strict';
/* RHSC common revision-hub navigation for OCR J277 and H446.
   Both qualifications expose two paper groups, always in spec order.
   Buttons scroll to a paper; no paper is hidden and qualification links stay intact. */
(function(){
  const hub=document.querySelector('#revisionhub');
  if(!hub||hub.dataset.rhscPaperNav==='ready')return;
  const tiles=[...hub.querySelectorAll('a.rhsc-practice-tile')];
  const existing=[...hub.querySelectorAll('.rhsc-practice-group')];
  if(!tiles.length||existing.length<2)return;
  const paper=(link)=>{
    const anchor=(link.getAttribute('href')||'').split('#').pop();
    return /^([12])\./.test(anchor)?anchor[0]:null;
  };
  const code=(link)=>(link.getAttribute('href')||'').split('#').pop();
  const specSort=(left,right)=>{
    const a=code(left).split('.').map(Number),b=code(right).split('.').map(Number);
    for(let i=0;i<Math.max(a.length,b.length);i++){
      const delta=(a[i]??-1)-(b[i]??-1);
      if(delta)return delta;
    }
    return 0;
  };
  const parent=existing[0].parentElement;
  if(!parent||existing.some(g=>g.parentElement!==parent))return;
  const subtitles={1:'Computer Systems',2:'Algorithms and Programming'};
  for(const number of [1,2]){
    const g=existing.find(x=>x.querySelector('h3')?.textContent?.trim().startsWith('Paper '+number));
    const span=g?.querySelector('h3 span')?.textContent?.trim();
    if(span)subtitles[number]=span;
  }
  const groups=[];
  for(const number of [1,2]){
    const group=document.createElement('section');
    group.className='rhsc-practice-group';
    group.id='rhsc-revision-paper-'+number;
    const title=document.createElement('h3');
    title.id='rhsc-revision-paper-heading-'+number;
    title.append(document.createTextNode('Paper '+number));
    const subtitle=document.createElement('span');
    subtitle.textContent=subtitles[number];
    title.append(subtitle);
    group.setAttribute('aria-labelledby',title.id);
    const grid=document.createElement('div');
    grid.className='rhsc-practice-grid';
    const groupTiles=tiles.filter(t=>paper(t)===String(number)).sort(specSort);
    grid.append(...groupTiles);
    group.append(title,grid);
    groups.push(group);
  }
  if(groups.some(g=>!g.querySelector('.rhsc-practice-tile')))return;
  const controls=document.createElement('nav');
  controls.className='rhsc-paper-nav';
  controls.setAttribute('aria-label','Choose a revision paper');
  for(const number of [1,2]){
    const button=document.createElement('button');
    button.type='button';
    button.className='rhsc-paper-nav-button';
    button.textContent='Paper '+number;
    button.setAttribute('aria-controls',groups[number-1].id);
    button.addEventListener('click',()=>{
      const target=groups[number-1];
      target.scrollIntoView({block:'start',behavior:'instant'});
      const heading=target.querySelector('h3');
      heading.tabIndex=-1;
      heading.focus({preventScroll:true});
    });
    controls.append(button);
  }
  const intro=hub.querySelector('.rhsc-practice-intro');
  (intro||hub.querySelector('.summary'))?.after(controls);
  existing[0].before(...groups);
  for(const group of existing)group.remove();
  hub.dataset.rhscPaperNav='ready';
})();

/* Shared KS3 lesson navigation and previews for Year 7, 8 and 9.
   Lesson paths and short topic labels come from the individual year pages. */
(function () {
  'use strict';
  const config=window.KS3_HUB_CONFIG||{};
  const year=Number(document.body.dataset.year)||7;
  const pad=n=>String(n).padStart(3,'0');
  const terms=config.terms||[
    ['Autumn 1',1,7],['Autumn 2',8,14],
    ['Spring 1',15,19],['Spring 2',20,23],
    ['Summer 1',24,29],['Summer 2',30,35]
  ];

  // Years 7/9 generate lessons from their existing live maps.
  // Year 8 already has static term grids (and its own PDF reader).
  const holder=document.getElementById('terms');
  if(holder) {
    for(const [name,start,end] of terms){
      const section=document.createElement('section');
      section.className='term';
      const head=document.createElement('div');head.className='term-head';
      const strong=document.createElement('strong');strong.textContent=name;
      const range=document.createElement('span');range.textContent=pad(start)+'–'+pad(end);
      head.append(strong,range);
      const grid=document.createElement('nav');grid.className='lesson-grid';
      grid.setAttribute('aria-label','Year '+year+' '+name+' lessons');
      for(let n=start;n<=end;n++){
        const href=config.liveMap?.[n];
        const tile=document.createElement(href?'a':'span');
        tile.className=href?'lesson-live':'lesson-pending';
        if(href){
          tile.href=href;
          tile.append(document.createTextNode(pad(n)+' '));
          const tick=document.createElement('span');
          tick.className='live-tick';tick.setAttribute('aria-hidden','true');tick.textContent='✓';
          tile.append(tick);
        } else tile.textContent=pad(n);
        tile.setAttribute('aria-label',href?'Open lesson '+pad(n):'Lesson '+pad(n)+', coming soon');
        grid.append(tile);
      }
      section.append(head,grid);
      holder.append(section);
    }
  }

  // Use one consistent tab controller; a year may redirect to external revision.
  const tabs=[...document.querySelectorAll('.tabs [data-tab]')];
  const panels=[...document.querySelectorAll('.panel')];
  function showTab(name){
    if(name==='revision'&&config.revisionUrl){
      location.replace(config.revisionUrl);return;
    }
    if(!panels.some(p=>p.id===name)) name='lessons';
    tabs.forEach(button=>{
      const active=button.dataset.tab===name;
      button.classList.toggle('active',active);
      button.setAttribute('aria-selected',String(active));
    });
    panels.forEach(panel=>panel.classList.toggle('active',panel.id===name));
    if(location.hash!=='#'+name)history.replaceState(null,'','#'+name);
  }
  tabs.forEach(button=>button.addEventListener('click',()=>showTab(button.dataset.tab)));
  addEventListener('hashchange',()=>showTab(location.hash.slice(1)));
  showTab(location.hash.slice(1)||'lessons');

  const grids=[...document.querySelectorAll('#lessons .lesson-grid')];
  const details=[];
  const previews=config.previews||{};
  function closeAll(){
    for(const detail of details){detail.hidden=true;delete detail.dataset.lesson;}
    document.querySelectorAll('#lessons .lesson-info[aria-expanded="true"]')
      .forEach(button=>button.setAttribute('aria-expanded','false'));
  }
  function alignTips(){
    const columns=innerWidth<=600?4:innerWidth<=850?5:7;
    grids.forEach(grid=>{
      [...grid.querySelectorAll('.lesson-entry')].forEach((entry,index)=>{
        entry.classList.toggle('tip-right',index%columns>=columns-2);
      });
    });
  }
  grids.forEach((grid,index)=>{
    const detail=document.createElement('div');
    detail.className='lesson-detail';
    detail.id='ks3-preview-'+year+'-'+index;
    detail.hidden=true;
    details.push(detail);
    [...grid.children].forEach(tile=>{
      const number=tile.textContent.match(/\b\d{3}\b/)?.[0];
      if(!number)return;
      const isLive=tile.tagName==='A';
      const info=previews[number]||(isLive?['Lesson '+number,'Preview pending']:['Coming soon','Not published']);
      tile.setAttribute('aria-label',isLive?'Open lesson '+number+': '+info[0]:'Lesson '+number+': coming soon');
      const entry=document.createElement('div');entry.className='lesson-entry';
      const button=document.createElement('button');
      button.type='button';button.className='lesson-info';button.textContent='i';
      button.setAttribute('aria-label','Preview lesson '+number);
      button.setAttribute('aria-controls',detail.id);
      button.setAttribute('aria-expanded','false');
      const pop=document.createElement('div');pop.className='lesson-popup';pop.setAttribute('aria-hidden','true');
      const title=document.createElement('strong');title.textContent=info[0];
      const blurb=document.createElement('span');blurb.textContent=info[1];
      pop.append(title,blurb);
      button.addEventListener('click',event=>{
        event.preventDefault();event.stopPropagation();
        const open=detail.dataset.lesson===number&&!detail.hidden;
        closeAll();if(open)return;
        const heading=document.createElement('strong');heading.textContent=number+' · '+info[0];
        const summary=document.createElement('span');summary.textContent=info[1];
        detail.replaceChildren(heading,summary);
        detail.dataset.lesson=number;detail.hidden=false;
        button.setAttribute('aria-expanded','true');
      });
      entry.append(tile,button,pop);grid.append(entry);
    });
    grid.after(detail);
  });
  alignTips();
  addEventListener('resize',alignTips);
  document.addEventListener('keydown',event=>{if(event.key==='Escape')closeAll();});
})();

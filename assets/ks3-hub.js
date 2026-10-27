/* Shared KS3 lesson navigation and previews for Year 7, 8 and 9.
   Lesson paths and short topic labels come from the individual year pages. */
(function () {
  'use strict';

  /* KS3 course-hub view reuses the SAME course header, tabs, toolbar, lesson
     grid and shared hub.css used by J277 and H446. The older individual
     Year 7–9 pages still use the legacy renderer below. */
  if(document.body.classList.contains('ks3-unified')){
    const cfg=window.KS3_HUB_CONFIG||{};
    const terms=cfg.terms||[['Autumn 1',1,7],['Autumn 2',8,14],['Spring 1',15,19],['Spring 2',20,23],['Summer 1',24,29],['Summer 2',30,35]];
    const pad=n=>String(n).padStart(3,'0');
    const tabs=[...document.querySelectorAll('.course-nav .tab[data-tab]')];
    const panels=[...document.querySelectorAll('main>.panel')];
    const years=[...document.querySelectorAll('.year-switch [data-year]')];
    const termsNode=document.getElementById('terms');
    const lessonCount=document.getElementById('lessonCount');
    const booklet=document.getElementById('ks3Booklet');
    const revision=document.getElementById('ks3Revision');
    const allowed=['lessons','booklet','revisionhub'];
    let year=Number(new URLSearchParams(location.search).get('year'))||Number(cfg.initialYear)||7;
    if(![7,8,9].includes(year))year=7;
    let activeTab=allowed.includes(location.hash.slice(1))?location.hash.slice(1):'lessons';
    let detail=null, detailTrigger=null;
    function setUrl(){
      const url=new URL(location.href);
      url.searchParams.set('year',String(year));
      url.hash=activeTab;
      history.replaceState(null,'',url.pathname+url.search+url.hash);
    }
    function closeDetail(){
      if(detail){detail.remove();detail=null;}
      if(detailTrigger){detailTrigger.setAttribute('aria-expanded','false');detailTrigger=null;}
    }
    function changeTab(id){
      if(!allowed.includes(id))id='lessons';
      closeDetail();activeTab=id;
      tabs.forEach(t=>{
        const on=t.dataset.tab===id;
        t.setAttribute('aria-selected',String(on));t.tabIndex=on?0:-1;
      });
      panels.forEach(p=>p.classList.toggle('active',p.id===id));
      setUrl();
    }
    function resourceCard(title,copy,url,linkText){
      const wrap=document.createElement('article');
      wrap.className='ks3-resource-card';
      const h=document.createElement('h2');h.textContent=title;wrap.append(h);
      const p=document.createElement('p');p.textContent=copy;wrap.append(p);
      if(url){
        const a=document.createElement('a');a.href=url;a.className='ks3-resource-action';a.textContent=linkText;wrap.append(a);
      }else{
        const status=document.createElement('span');
        status.className='ks3-resource-pending';status.textContent='Not published yet';wrap.append(status);
      }
      return wrap;
    }
    function renderResources(){
      booklet.replaceChildren(resourceCard('Year '+year+' · Revision Booklet',
        year===8?'Open the existing Year 8 revision booklet, including the accessible PDF reader.':'The teacher-created Year '+year+' revision booklet has not been published here yet.',
        cfg.bookletLinks?.[year], 'Open Year 8 booklet →'));
      revision.replaceChildren(resourceCard('Year '+year+' · Revision Hub',
        year===8?'Practise with the existing Year 8 revision hub.':'Online revision practice for Year '+year+' will appear here when it is ready.',
        cfg.revisionLinks?.[year], 'Open Year 8 revision hub →'));
    }
    function openPreview(button,number,info,available){
      const wasOpen=detailTrigger===button;
      closeDetail();
      if(wasOpen)return;
      const container=button.closest('.lesson-entry');
      const grid=container.closest('.lesson-grid');
      const entries=[...grid.querySelectorAll('.lesson-entry')];
      const index=entries.indexOf(container);
      const columns=getComputedStyle(grid).gridTemplateColumns.trim().split(/\s+/).length||4;
      const next=Math.min(entries.length,Math.ceil((index+1)/columns)*columns);
      detail=document.createElement('div');detail.className='lesson-detail';
      detail.setAttribute('role','region');detail.setAttribute('aria-label','Lesson '+pad(number)+' preview');
      const heading=document.createElement('strong');heading.textContent='Lesson '+pad(number)+' · '+info[0];
      const summary=document.createElement('p');summary.textContent=info[1];
      const state=document.createElement('p');state.textContent=available?'Online lesson available':'This lesson is not published yet';
      detail.append(heading,summary,state);
      if(available){
        const link=document.createElement('a');link.href=available;link.className='ks3-preview-start';link.textContent='Start Lesson →';detail.append(link);
      }
      const close=document.createElement('button');close.type='button';close.className='lesson-detail-close';close.textContent='Close ×';
      close.addEventListener('click',()=>{
        closeDetail();button.focus({preventScroll:true});
      });
      detail.append(close);
      grid.insertBefore(detail,entries[next]||null);
      detailTrigger=button;button.setAttribute('aria-expanded','true');
      if(matchMedia('(max-width:700px)').matches)requestAnimationFrame(()=>detail?.scrollIntoView({block:'nearest',behavior:'smooth'}));
    }
    function renderLessons(){
      closeDetail();termsNode.replaceChildren();
      const links=cfg.liveMaps?.[year]||{};
      const previews=cfg.previews?.[year]||{};
      let published=0;
      terms.forEach(([name,start,end])=>{
        const sec=document.createElement('section');sec.className='term';
        const head=document.createElement('div');head.className='term-head';
        const strong=document.createElement('strong');strong.textContent=name;
        const range=document.createElement('span');range.textContent='Lessons '+pad(start)+'–'+pad(end);
        head.append(strong,range);
        const grid=document.createElement('nav');grid.className='lesson-grid';
        grid.setAttribute('aria-label','Year '+year+' '+name+' lessons');
        for(let n=start;n<=end;n++){
          const number=pad(n),href=links[n]||null;
          const info=previews[number]||['Lesson '+number,href?'Lesson details will be added':'Not yet published'];
          if(href)published++;
          const entry=document.createElement('div');entry.className='lesson-entry';
          const tile=document.createElement(href?'a':'span');
          tile.className='lesson spec-tile '+(href?'live':'planned');
          tile.textContent=number;
          tile.style.setProperty('--spec-colour',href?'#287852':'#b5c0b9');
          if(href)tile.href=href;
          tile.setAttribute('aria-label',href?'Open lesson '+number+': '+info[0]:'Lesson '+number+': planned');
          const infoButton=document.createElement('button');infoButton.type='button';infoButton.className='lesson-info';
          infoButton.textContent='i';infoButton.setAttribute('aria-label','Preview lesson '+number);
          infoButton.setAttribute('aria-expanded','false');
          infoButton.addEventListener('click',()=>openPreview(infoButton,n,info,href));
          const tooltip=document.createElement('div');tooltip.className='lesson-popup';tooltip.setAttribute('aria-hidden','true');
          const title=document.createElement('strong');title.textContent=info[0];
          const description=document.createElement('p');description.textContent=info[1];
          tooltip.append(title,description);
          entry.append(tile,infoButton,tooltip);
          grid.append(entry);
        }
        sec.append(head,grid);termsNode.append(sec);
      });
      lessonCount.textContent='35 planned lesson positions · '+published+' online';
      document.getElementById('lessonTitle').textContent='Year '+year+' Computing lessons';
    }
    function selectYear(n){
      if(![7,8,9].includes(n))return;
      year=n;document.body.dataset.year=String(year);
      years.forEach(btn=>btn.setAttribute('aria-pressed',String(Number(btn.dataset.year)===year)));
      renderLessons();renderResources();setUrl();
    }
    tabs.forEach(t=>t.addEventListener('click',()=>changeTab(t.dataset.tab)));
    years.forEach(btn=>btn.addEventListener('click',()=>selectYear(Number(btn.dataset.year))));
    document.addEventListener('keydown',e=>{
      if(e.key==='Escape'&&detail){closeDetail();return;}
      if((e.key==='ArrowRight'||e.key==='ArrowLeft')&&document.activeElement?.matches('.course-nav .tab')){
        e.preventDefault();const i=tabs.indexOf(document.activeElement),dir=e.key==='ArrowRight'?1:-1;
        const nxt=tabs[(i+dir+tabs.length)%tabs.length];nxt.focus();changeTab(nxt.dataset.tab);
      }
    });
    addEventListener('popstate',()=>{
      const requested=Number(new URLSearchParams(location.search).get('year'))||7;
      selectYear(requested);changeTab(location.hash.slice(1));
    });
    selectYear(year);changeTab(activeTab);
    return;
  }

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
  // Place expanded previews directly after their selected lesson row on all screens.
  function placeDetailAfterRow(grid,entry,detail){
    const entries=[...grid.querySelectorAll('.lesson-entry')];
    const index=entries.indexOf(entry);
    if(index<0)return;
    const columns=getComputedStyle(grid).gridTemplateColumns.trim().split(/\s+/).length||4;
    const nextRowIndex=Math.min(entries.length,Math.ceil((index+1)/columns)*columns);
    grid.insertBefore(detail,entries[nextRowIndex]||null);
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
        const dismiss=document.createElement('button');
        dismiss.type='button';dismiss.className='lesson-detail-close';
        dismiss.textContent='Close ×';
        dismiss.setAttribute('aria-label','Close preview for lesson '+number);
        dismiss.addEventListener('click',()=>{closeAll();button.focus({preventScroll:true});});
        detail.replaceChildren(heading,summary,dismiss);
        placeDetailAfterRow(grid,entry,detail);
        detail.dataset.lesson=number;detail.hidden=false;
        button.setAttribute('aria-expanded','true');
        if(matchMedia('(max-width: 600px)').matches){
          requestAnimationFrame(()=>detail.scrollIntoView({block:'nearest',behavior:'smooth'}));
        }
      });
      entry.append(tile,button,pop);grid.append(entry);
    });
    grid.append(detail);
  });
  alignTips();
  addEventListener('resize',alignTips);
  document.addEventListener('keydown',event=>{if(event.key==='Escape')closeAll();});
})();

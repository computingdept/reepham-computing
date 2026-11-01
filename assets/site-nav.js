/* RHSC site navigation — one unobtrusive return/Home pair across KS3, J277 and H446.
   Presentation and lesson phase controls remain owned by their existing modules. */
(function(){
  'use strict';
  if(window.RHSCSiteNavLoaded)return;
  window.RHSCSiteNavLoaded=true;
  const icon={
    back:'<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m14 18-6-6 6-6"/></svg>',
    home:'<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m3 10 9-7 9 7"/><path d="M5 9v12h14V9M9 21v-7h6v7"/></svg>'
  };
  const css='/assets/site-nav.css?v=20261101-compactbar1';
  if(!document.querySelector('link[data-rhsc-site-nav]')){
    const link=document.createElement('link');
    link.rel='stylesheet';link.href=css;link.dataset.rhscSiteNav='1';document.head.appendChild(link);
  }
  const route='/';
  function button(existing,kind,href,label){
    const el=existing||document.createElement('a');
    el.href=href;el.classList.add('rhsc-site-nav-button','rhsc-site-nav-'+kind);
    el.setAttribute('aria-label',label);el.setAttribute('title',label);
    el.innerHTML=icon[kind];
    return el;
  }
  function pair(existing,backHref,label){
    if(existing&&existing.closest('.rhsc-site-nav'))return;
    const group=document.createElement('span');
    group.className='rhsc-site-nav';group.setAttribute('role','group');
    group.setAttribute('aria-label','Website navigation');
    if(existing&&existing.parentNode)existing.before(group);
    group.append(
      button(existing,'back',backHref,'Back to '+label),
      button(null,'home',route,'Learning Hub home')
    );
    return group;
  }
  function yearFromLesson(course,number){
    return course==='j277'?(number>=100?11:10):(number>=181?13:12);
  }
  function hubHref(course,year,section){
    const name=course==='ks3'?'ks3-computing.html':course+'-hub.html';
    return '/'+name+'?year='+year+'#'+(section||'lessons');
  }
  function takeHubContext(course){
    // A student may browse Year 10/13 revision; retain their actual selection
    // ONLY when they arrived directly from the matching course hub.
    try{
      const ref=new URL(document.referrer);
      if(ref.origin!==location.origin||ref.pathname!=='/'+course+'-hub.html')return null;
      const raw=sessionStorage.getItem('rhsc-practice-origin-'+course);
      if(!raw)return null;
      const saved=JSON.parse(raw);
      return saved.path===location.pathname&&
        (course==='j277'?[10,11]:[12,13]).includes(saved.year)?saved.year:null;
    }catch(_){return null;}
  }
  function trackPracticeOrigin(course){
    document.addEventListener('click',function(event){
      const link=event.target.closest&&event.target.closest('a[href]');
      if(!link)return;
      const url=new URL(link.href,location.href);
      if(url.origin!==location.origin||!url.pathname.startsWith('/revision/'+course+'/section-'))return;
      const selected=document.querySelector('.year-switch .year-btn[aria-pressed="true"]');
      const year=Number(selected?.dataset.year||document.body.dataset.year||new URLSearchParams(location.search).get('year'));
      if(!(course==='j277'?[10,11]:[12,13]).includes(year))return;
      try{sessionStorage.setItem('rhsc-practice-origin-'+course,JSON.stringify({year:year,path:url.pathname}));}catch(_){}
    },true);
  }
  function init(){
    const path=location.pathname;
    const hub=path.match(/\/(ks3-computing|j277-hub|h446-hub)\.html$/);
    if(hub&&document.body.classList.contains('course-hub')){
      const top=document.querySelector('.course-hub .topbar');
      if(!top)return;
      const existing=top.querySelector('a.home');
      const home=button(existing,'home',route,'Learning Hub home');
      if(!existing)top.append(home);
      if(hub[1]==='j277-hub'||hub[1]==='h446-hub')
        trackPracticeOrigin(hub[1].slice(0,4));
      return;
    }
    const lesson=path.match(/\/lessons\/(j277|h446)\/lesson-(\d{3})\//);
    const welcome=/\/lessons\/j277\/J277Welcome\.html$/i.test(path);
    const ks3=path.match(/\/lessons\/year([789])\//);
    if(lesson||ks3||welcome){
      const course=welcome?'j277':lesson?lesson[1]:'ks3';
      const year=welcome?10:lesson?yearFromLesson(course,Number(lesson[2])):Number(ks3[1]);
      const link=hubHref(course,year,'lessons');
      const label='Year '+year+(course==='ks3'?' Computing lessons':' lessons');
      const existing=document.querySelector('.navwrap a.course-back, .lesson-header-links a.course-back');
      const mount=existing||document.querySelector('.navwrap,header.topbar');
      if(!mount)return;
      const group=pair(existing,link,label);
      if(!existing&&group)mount.insertBefore(group,mount.firstChild);
      return;
    }
    const practice=path.match(/\/revision\/(j277|h446)\/section-[^/]+\/index\.html$/);
    if(practice){
      const course=practice[1],fallback=course==='j277'?11:12;
      const year=takeHubContext(course)||fallback;
      const parent=document.querySelector('header.practice-nav');
      if(parent){
        const existing=parent.querySelector(':scope > a[href]');
        const back=new URL(hubHref(course,year,'revisionhub'),location.origin);
        if(new URLSearchParams(location.search).get('theme')==='synergy')back.searchParams.set('theme','synergy');
        const group=pair(existing,back.pathname+back.search+back.hash,course.toUpperCase()+' '+(course==='j277'?'Year '+year:'Year '+year)+' practice');
        if(!existing&&group)parent.insertBefore(group,parent.firstChild);
      }
      return;
    }
    const ks3Legacy=path.match(/\/year([789])-computing\.html$/);
    const oldRevision=path.endsWith('/year8-revision-ap3.html');
    if(ks3Legacy||oldRevision){
      const year=ks3Legacy?Number(ks3Legacy[1]):8;
      const section=oldRevision?'revisionhub':year===8?'booklet':'lessons';
      const existing=document.querySelector('a.back');
      if(existing)pair(existing,hubHref('ks3',year,section),'Year '+year+' '+(section==='booklet'?'booklet':section==='revisionhub'?'practice':'Computing lessons'));
      return;
    }
  }
  /* One central, visual-only website identity: Home on the left, the
     original Synergy Assist artwork on the right. Existing back links,
     teaching phases and question engines remain in place. */
  // The visible title belongs in the same compact bar as Home and the logo.
  // Existing page h1 headings remain in the DOM for accessibility.
  function addTopTitle(mount,label){
    if(!mount||mount.querySelector(':scope > .synergy-corner-title'))return;
    const el=document.createElement('span');
    el.className='synergy-corner-title';
    el.textContent=label;
    el.setAttribute('aria-hidden','true');
    mount.append(el);
  }
  function positionCorners(){
    const pathname=location.pathname;
    function logo(mount){
      if(!mount||mount.querySelector('.synergy-corner-mark'))return;
      const mark=document.createElement('span');
      mark.className='synergy-corner-mark';
      mark.setAttribute('role','img');
      mark.setAttribute('aria-label','Synergy Assist');
      mount.append(mark);
    }
    function firstHome(mount){
      if(!mount)return;
      let home=mount.querySelector(':scope > a.rhsc-site-nav-home, :scope > a.home.rhsc-site-nav-home');
      if(!home)home=button(null,'home',route,'Learning Hub home');
      mount.insertBefore(home,mount.firstChild);
      if(pathname==='/'||pathname==='/index.html')home.setAttribute('aria-current','page');
      mount.classList.add('synergy-corners');
    }
    const top=document.querySelector('body.course-hub > header.topbar');
    if(top){
      firstHome(top);
      const courseTitles={
        'ks3-computing':'KS3 Computing',
        'j277-hub':'GCSE Computer Science',
        'h446-hub':'A Level Computer Science'
      };
      const matched=pathname.match(/\/(ks3-computing|j277-hub|h446-hub)\.html$/);
      if(matched)addTopTitle(top,courseTitles[matched[1]]);
      top.classList.add('synergy-corners');
      return; // the existing Synergy logo + wordmark is already in the masthead
    }
    const homeTop=document.querySelector('body.learning-hub > header.top .top-inner');
    const chooser=document.querySelector('body.school-chooser > header.chooser-head .chooser-head-inner');
    const legacyTop=document.querySelector('body.central-legacy-hub > header.top .topin');
    if(homeTop||chooser||legacyTop){
      firstHome(homeTop||chooser||legacyTop);
      if(homeTop)addTopTitle(homeTop,'Learning Hub');
      return;
    }
    const lessonNav=document.querySelector('.navwrap');
    if(lessonNav){
      const pair=lessonNav.querySelector('.rhsc-site-nav');
      const home=pair&&pair.querySelector('.rhsc-site-nav-home');
      if(pair&&home)pair.insertBefore(home,pair.firstChild);
      logo(lessonNav);
      document.body.classList.add('synergy-corners-enabled');
      return;
    }
    const practice=document.querySelector('header.practice-nav');
    if(practice){
      const pair=practice.querySelector('.rhsc-site-nav');
      const home=pair&&pair.querySelector('.rhsc-site-nav-home');
      if(pair&&home)pair.insertBefore(home,pair.firstChild);
      logo(practice);
      practice.classList.add('synergy-corners');
      return;
    }
    const catchup=document.querySelector('.catchup-top-inner');
    if(catchup){
      const existing=catchup.querySelector('a[href*="-hub.html"]');
      if(existing&&!catchup.querySelector('.rhsc-site-nav')){
        const group=pair(existing,existing.getAttribute('href'),'course lessons');
        if(group){
          const home=group.querySelector('.rhsc-site-nav-home');
          if(home)group.insertBefore(home,group.firstChild);
          catchup.insertBefore(group,catchup.firstChild);
        }
      }
      const title=catchup.querySelector('strong');
      if(title&&/RHS Computing|RHSC Computing/i.test(title.textContent))title.textContent='Catch Up';
      logo(catchup);
      catchup.classList.add('synergy-corners');
      return;
    }
    const legacySlides=document.querySelector('body > aside.sidebar');
    if(legacySlides){
      const home=button(null,'home',route,'Learning Hub home');
      legacySlides.insertBefore(home,legacySlides.firstChild);
      logo(document.body);
      document.body.classList.add('synergy-legacy-corners');
      return;
    }
    const legacyRevision=document.querySelector('.synergy-inline-brand');
    if(legacyRevision){
      firstHome(legacyRevision);
      legacyRevision.classList.add('synergy-corners');
    }
  }
  function ready(){init();positionCorners();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready,{once:true});
  else ready();
})();
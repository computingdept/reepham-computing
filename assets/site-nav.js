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
  const css='/assets/site-nav.css?v=20261111-binary-clock1';
  if(!document.querySelector('link[data-rhsc-site-nav]')){
    const link=document.createElement('link');
    link.rel='stylesheet';link.href=css;link.dataset.rhscSiteNav='1';document.head.appendChild(link);
  }
  const route='/';
  const clockRoute='/binary-clock.html';
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
    return course==='j277'?(number>=96?11:10):(number>=181?13:12);
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
        // Option B: one labelled Topics control in the shared practice header.
        // The quiz engine still owns the hash routing and topic state.
        if(!parent.querySelector('.rhsc-practice-topics')){
          const topics=document.createElement('a');
          topics.className='rhsc-practice-topics';
          const match=path.match(/section-([\d-]+)/);
          const sectionCode=match?match[1].replace(/-/g,'.'):'';
          topics.href='#'+sectionCode;
          topics.textContent='Topics';
          topics.setAttribute('aria-label','Back to practice topics');
          parent.insertBefore(topics,group?.nextSibling||parent.firstChild);
        }
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
  /* One central classroom shortcut: clicking the SA artwork opens Binary Time
     in a new tab. Keep Home and all teaching navigation unchanged. */
  function brandClockLink(mount){
    if(!mount||mount.querySelector(':scope > .synergy-clock-shortcut'))return;
    const brand=mount.querySelector(':scope > .synergy-brand, :scope > .hubhome.synergy-brand');
    const original=brand&&brand.querySelector('.synergy-brand-icon');
    if(!brand||!original)return;
    const link=document.createElement('a');
    link.className='synergy-brand-icon synergy-clock-shortcut';
    link.href=clockRoute;
    link.target='_blank';
    link.rel='noopener';
    link.setAttribute('aria-label','Open Binary Clock in a new tab');
    link.title='Binary Clock · open in a new tab';
    original.remove();
    brand.after(link);
  }
  /* One central site identity: Home on the left and original Synergy
     artwork on the right. Lesson controls and course navigation stay put. */
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
      const mark=document.createElement('a');
      mark.className='synergy-corner-mark';
      mark.href=clockRoute;
      mark.target='_blank';
      mark.rel='noopener';
      mark.setAttribute('aria-label','Open Binary Clock in a new tab');
      mark.title='Binary Clock · open in a new tab';
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
      brandClockLink(top);
      return; // existing wordmark and Home stay linked to the hub
    }
    const homeTop=document.querySelector('body.learning-hub > header.top .top-inner');
    const chooser=document.querySelector('body.school-chooser > header.chooser-head .chooser-head-inner');
    const legacyTop=document.querySelector('body.central-legacy-hub > header.top .topin');
    if(homeTop||chooser||legacyTop){
      const masthead=homeTop||chooser||legacyTop;
      firstHome(masthead);
      if(homeTop)addTopTitle(homeTop,'Learning Hub');
      brandClockLink(masthead);
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
      // J277 Year 11 starts at 096 (not 100). Correct older catch-up
      // inline links centrally before adapting the back control.
      const lessonRoute=pathname.match(/\/lessons\/(j277|h446)\/lesson-(\d{3})\/learn\.html$/);
      if(existing&&lessonRoute){
        const year=yearFromLesson(lessonRoute[1],Number(lessonRoute[2]));
        existing.setAttribute('href',hubHref(lessonRoute[1],year,'lessons'));
      }
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
      brandClockLink(legacyRevision);
    }
  }
  /* Route existing student-facing PDF Print links into the one consistent
     viewer. Download and Read actions are intentionally left unchanged.
     Event delegation supports dynamically generated J277/H446/KS3 tiles. */
  function enablePdfPrintViewer(){
    document.addEventListener('click',function(event){
      if(event.defaultPrevented||event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
      const link=event.target.closest&&event.target.closest('a[href]');
      if(!link||link.hasAttribute('download')||link.dataset.printViewer==='off')return;
      const text=(link.textContent||'').trim();
      const title=(link.getAttribute('aria-label')||'').trim();
      const marked=link.matches('.lesson-action-print, .lesson-action-print-draft, .print')||
        /(?:^|\s|🖨)print(?:\s|$|[-:])/i.test(text)||/(?:^|\s)print(?:[-\s:]|$)/i.test(title);
      let target;
      try{target=new URL(link.href,location.href);}catch(_){return;}
      if(target.origin!==location.origin||!target.pathname.toLowerCase().endsWith('.pdf'))return;
      // Both main and individual unit revision guides use the shared viewer.
      // Downloads and print-ready editions continue using their established routes.
      const guide=location.pathname.match(/^\/(?:j277|h446)-hub\.html$/i) &&
        !!link.closest('#booklet') &&
        /^\/revision\/(?:j277|h446)\/guides\/(?:units\/)?[^/]+\.pdf$/i.test(target.pathname) &&
        (link.matches('.action,.j277-unit-link') || /\bread\b/i.test(title));
      if(!marked&&!guide)return;
      const lesson=link.closest('.lesson-entry');
      const lessonTitle=lesson?.querySelector('.lesson-tile-title')?.textContent?.trim();
      const lessonNumber=lesson?.querySelector('.lesson-tile-number')?.textContent?.trim();
      let label=lessonTitle?(lessonNumber&&/^\d+$/.test(lessonNumber)?'Lesson '+lessonNumber+' · ':'')+lessonTitle:
        title||text||'Printable resource';
      if(guide){
        const card=link.closest('.h446-guide-card,.j277-guide-column');
        const paper=card?.querySelector('.kicker')?.textContent?.trim();
        const topic=card?.querySelector('h3')?.textContent?.trim();
        label=link.matches('.j277-unit-link')?
          (title.replace(/^Read\s*/i,'').replace(/\s*PDF$/i,'').trim()||text.trim()):
          ((paper?paper+' · ':'')+(topic||'Revision guide'));
      }
      label=label.replace(/^(?:Open\s+)?(?:print[-\s]ready|print)(?:\s+the)?\s*/i,'').trim()||'Printable resource';
      const url=new URL('/print-viewer.html',location.origin);
      url.searchParams.set('file',target.pathname+target.search);
      url.searchParams.set('from',location.pathname+location.search+location.hash);
      url.searchParams.set('title',label.slice(0,110));
      event.preventDefault();
      location.assign(url.pathname+url.search);
    },true);
  }
  /* One shared Listen entry point across hubs, classroom lessons, Catch Up
     and revision pages; no individual lesson navigation needs modifying. */
  function enableSharedListening(){
    if(document.querySelector('script[data-synergy-voice]'))return;
    const css=document.createElement('link');
    css.rel='stylesheet';
    css.href='/assets/synergy-voice.css?v=20261108-classroom-compact1';
    css.dataset.synergyVoice='1';
    document.head.append(css);
    const script=document.createElement('script');
    script.src='/assets/synergy-voice.js?v=20261107-quickbar1';
    script.dataset.synergyVoice='1';
    document.head.append(script);
  }
  function ready(){init();positionCorners();enablePdfPrintViewer();enableSharedListening();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready,{once:true});
  else ready();
})();
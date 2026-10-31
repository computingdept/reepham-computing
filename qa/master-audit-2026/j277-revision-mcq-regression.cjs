'use strict';
const {chromium}=require('playwright');
const origin=process.env.QA_ORIGIN||'http://127.0.0.1:8765';
const sections=['1-1','1-2','1-3','1-4','1-5','1-6','2-1','2-2','2-3','2-4','2-5'];
const views=[['classroom TV',1920,1080],['phone',390,844]];
// Approved 27 October 2026 interface: Synergy palette by default;
// the classic option is explicitly selected with theme=classic.
let checks=0;
const failures=[];
function assert(ok,label,detail){checks++;if(!ok){const fail={label,detail};failures.push(fail);console.error('J277_MCQ_FAIL '+JSON.stringify(fail));}}
(async()=>{
 const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 try{
  for(const [view,width,height] of views){
   const context=await browser.newContext({viewport:{width,height},isMobile:view==='phone',hasTouch:view==='phone'});
   const page=await context.newPage();
   // J277 Revision Hub must use the same compact tiles and dark-green palette as H446.
   const hubUrl=origin+'/j277-hub.html?year=11#revisionhub';
   const hubErrors=[];
   const hubError=e=>hubErrors.push(String(e));
   page.on('pageerror',hubError);
   try{
    const hubResponse=await page.goto(hubUrl,{waitUntil:'networkidle',timeout:25000});
    assert(hubResponse?.status()===200,view+' J277 hub HTTP 200',hubResponse?.status());
    await page.waitForFunction(()=>document.querySelector('#revisionhub')?.classList.contains('active')&&document.querySelector('#revisionhub')?.dataset.rhscPaperNav==='ready');
    const headingJ277=await page.evaluate(()=>{
      const root=document.querySelector('#revisionhub');
      const heading=root.querySelector('.rhsc-revision-heading');
      const nav=root.querySelector('.rhsc-paper-nav');
      const meta=heading?.querySelector('.count');
      const m=meta?.getBoundingClientRect();
      const n=nav?.getBoundingClientRect();
      return {title:heading?.querySelector('h2')?.textContent?.trim(),
        meta:meta?.textContent?.trim(),
        introCount:root.querySelectorAll('.rhsc-practice-intro').length,
        metadataVisible:!!m&&m.width>0&&m.height>0&&getComputedStyle(meta).display!=='none',
        navigationBelow:!!m&&!!n&&n.top>=m.bottom-2,
        navButtons:nav?.querySelectorAll('[role="tab"]').length
      };
    });
    assert(headingJ277.title==='Revision Practice'&&headingJ277.meta==='5 questions per skill · 80% to master'&&headingJ277.introCount===0,
      view+' J277 consistent concise heading without instructions',headingJ277);
    assert(headingJ277.metadataVisible&&headingJ277.navigationBelow&&headingJ277.navButtons===2,
      view+' J277 responsive metadata above paper filters',headingJ277);
    const visual=await page.evaluate(()=>{
     const tiles=[...document.querySelectorAll('#revisionhub a.rhsc-practice-tile')];
     const groups=[...document.querySelectorAll('#revisionhub .rhsc-practice-group')];
     const fg=tiles.length?getComputedStyle(tiles[0]).color:null;
     const heading=groups.length?getComputedStyle(groups[0].querySelector('h3')).color:null;
     const rects=tiles.map(t=>t.getBoundingClientRect());
     return {tileCount:tiles.length,groupCount:groups.length,fg,heading,withinViewport:rects.every(r=>r.left>=-2&&r.right<=document.documentElement.clientWidth+2),urls:tiles.map(t=>t.getAttribute('href')),labels:tiles.every(t=>!!t.querySelector('.rhsc-practice-name')&&!!t.querySelector('.rhsc-practice-code'))};
    });
    assert(visual.tileCount===11&&visual.groupCount===2,view+' H446-style topic tiles and Paper groups',visual);
    const papers=await page.evaluate(()=>({
      ids:[...document.querySelectorAll('#revisionhub .rhsc-practice-group[id^="rhsc-revision-paper-"]')].map(g=>g.id),
      counts:[...document.querySelectorAll('#revisionhub .rhsc-practice-group[id^="rhsc-revision-paper-"]')].map(g=>g.querySelectorAll('.rhsc-practice-tile').length),
      jumps:[...document.querySelectorAll('#revisionhub .rhsc-paper-nav-button')].map(b=>b.textContent.trim()),
      codes:[...document.querySelectorAll('#revisionhub .rhsc-practice-tile')].map(t=>t.href.split('#').pop())
    }));
    assert(papers.ids.join(',')==='rhsc-revision-paper-1,rhsc-revision-paper-2'&&papers.counts.join(',')==='6,5',view+' J277 Paper 1 then Paper 2',papers);
    assert(papers.jumps.join(',')==='Paper 1,Paper 2'&&papers.codes.join(',')==='1.1,1.2,1.3,1.4,1.5,1.6,2.1,2.2,2.3,2.4,2.5',view+' J277 shared paper navigation and OCR order',papers);
    const first=await page.evaluate(()=>({
      paper1:!document.querySelector('#rhsc-revision-paper-1').hidden,
      paper2:document.querySelector('#rhsc-revision-paper-2').hidden,
      visibleCodes:[...document.querySelectorAll('#revisionhub .rhsc-practice-tile')].filter(e=>e.getClientRects().length).map(e=>e.href.split('#').pop()),
      tabs:[...document.querySelectorAll('#revisionhub [role="tab"]')].map(e=>e.getAttribute('aria-selected'))
    }));
    assert(first.paper1&&first.paper2&&first.visibleCodes.length===6&&first.visibleCodes.every(c=>c.startsWith('1.')),view+' J277 default shows ONLY Paper 1',first);
    assert(first.tabs.join(',')==='true,false',view+' J277 initial active filter',first.tabs);
    await page.locator('#revisionhub .rhsc-paper-nav-button').nth(1).click();
    const second=await page.evaluate(()=>({
      paper1:document.querySelector('#rhsc-revision-paper-1').hidden,
      paper2:!document.querySelector('#rhsc-revision-paper-2').hidden,
      visibleCodes:[...document.querySelectorAll('#revisionhub .rhsc-practice-tile')].filter(e=>e.getClientRects().length).map(e=>e.href.split('#').pop()),
      tabs:[...document.querySelectorAll('#revisionhub [role="tab"]')].map(e=>e.getAttribute('aria-selected'))
    }));
    assert(second.paper1&&second.paper2&&second.visibleCodes.length===5&&second.visibleCodes.every(c=>c.startsWith('2.')),view+' J277 clicking Paper 2 hides ALL Paper 1 topics',second);
    assert(second.tabs.join(',')==='false,true',view+' J277 Paper 2 active filter',second.tabs);
    await page.locator('#revisionhub .rhsc-paper-nav-button').first().click();
    const back=await page.evaluate(()=>({
      paper1:!document.querySelector('#rhsc-revision-paper-1').hidden,
      paper2:document.querySelector('#rhsc-revision-paper-2').hidden,
      visibleCodes:[...document.querySelectorAll('#revisionhub .rhsc-practice-tile')].filter(e=>e.getClientRects().length).map(e=>e.href.split('#').pop())
    }));
    assert(back.paper1&&back.paper2&&back.visibleCodes.length===6,view+' J277 Paper 1 filter switches back',back);
    // Keyboard users must have the same filter functionality.
    await page.locator('#revisionhub .rhsc-paper-nav-button').first().focus();
    await page.keyboard.press('ArrowRight');
    assert(await page.evaluate(()=>document.querySelector('#rhsc-revision-paper-1').hidden&&!document.querySelector('#rhsc-revision-paper-2').hidden),view+' J277 arrow key filter works');

    assert(visual.fg==='rgb(24, 52, 42)'&&visual.heading==='rgb(22, 70, 52)',view+' J277 approved Synergy ink palette',visual);
    assert(visual.withinViewport&&visual.labels,view+' readable responsive tiles',visual);
    assert(visual.urls.length===11&&visual.urls.every(u=>/^revision\/j277\/section-[12]-[1-6]\/index\.html#[12]\.[1-6]$/.test(u)),view+' preserves all 11 topic routes',visual.urls);
    assert(!hubErrors.length,view+' hub JavaScript errors',hubErrors);
    console.log('J277_HUB_SURVEY '+JSON.stringify({view,tiles:visual.tileCount,groups:visual.groupCount,colour:visual.fg,withinViewport:visual.withinViewport}));
    // CSS-only pilot is opt-in: baseline remains the current teaching hub.
    await page.goto(origin+'/j277-hub.html?year=11&theme=synergy#revisionhub',{waitUntil:'networkidle'});
    await page.waitForFunction(()=>document.querySelector('#revisionhub')?.dataset.rhscPaperNav==='ready');
    const jp=await page.evaluate(()=>{
      const root=document.querySelector('#revisionhub');
      const tiles=[...root.querySelectorAll('#rhsc-revision-paper-1 > .rhsc-practice-grid > .rhsc-practice-tile')];
      const style=getComputedStyle(tiles[0]);
      return {
        preview:document.documentElement.classList.contains('synergy-hub-preview'),
        enabled:document.getElementById('synergyHubPreviewCSS')?.media==='all',
        cards:tiles.length,
        visible:tiles.filter(t=>t.getClientRects().length).length,
        paper2Hidden:document.getElementById('rhsc-revision-paper-2').hidden,
        border:style.borderLeftWidth,
        rowFits:tiles.every(t=>{const r=t.getBoundingClientRect();return r.left>=-2&&r.right<=document.documentElement.clientWidth+2}),
        scrollOverflow:document.documentElement.scrollWidth-document.documentElement.clientWidth,
        topics:[...root.querySelectorAll('a.rhsc-practice-tile')].length
      };
    });
    assert(jp.preview&&jp.enabled&&jp.cards===6&&jp.visible===6&&jp.paper2Hidden&&jp.border==='4px',
      view+' J277 optional Synergy styling loads without hiding topics',jp);
    assert(jp.topics===11&&jp.rowFits&&jp.scrollOverflow<=5,view+' J277 optional Synergy styling fits viewport',jp);
    await page.locator('#revisionhub .rhsc-paper-nav-button').nth(1).click();
    assert(await page.evaluate(()=>document.getElementById('rhsc-revision-paper-1').hidden&&!document.getElementById('rhsc-revision-paper-2').hidden),
      view+' J277 preview Paper 2 switch retains behaviour');
    // The same CSS preview must survive an actual quiz visit and Hub back link.
    const jLink=await page.evaluate(()=>document.querySelector('#rhsc-revision-paper-2 a.rhsc-practice-tile')?.href);
    assert(jLink?.includes('theme=synergy'),view+' J277 preview carried into quiz destination',jLink);
    await page.goto(jLink,{waitUntil:'networkidle'});
    const jBack=await page.evaluate(()=>document.querySelector('header.practice-nav a.rhsc-site-nav-back')?.href);
    assert(jBack?.includes('theme=synergy'),view+' J277 quiz return preserves preview setting',jBack);
    await page.locator('header.practice-nav a.rhsc-site-nav-back').click();
    await page.waitForFunction(()=>document.querySelector('#revisionhub')?.dataset.rhscPaperNav==='ready');
    assert(await page.evaluate(()=>document.documentElement.classList.contains('synergy-hub-preview')),
      view+' J277 Synergy style retained after quiz return');
    await page.goto(origin+'/j277-hub.html?year=11&theme=classic#revisionhub',{waitUntil:'networkidle'});
    assert(await page.evaluate(()=>!document.documentElement.classList.contains('synergy-hub-preview')&&document.getElementById('synergyHubPreviewCSS')?.media==='not all'),
      view+' J277 classic style available on explicit classic query');

   }catch(e){assert(false,view+' J277 hub smoke test',String(e).slice(0,400))}
   finally{page.off('pageerror',hubError)}
   // The H446 hub shares the same practice tile styling; none of its routes change.
   try{
    const hresp=await page.goto(origin+'/h446-hub.html?year=12#revisionhub',{waitUntil:'networkidle',timeout:25000});
    assert(hresp?.status()===200,view+' H446 hub HTTP 200',hresp?.status());
    await page.waitForFunction(()=>document.querySelector('#revisionhub')?.classList.contains('active')&&document.querySelector('#revisionhub')?.dataset.rhscPaperNav==='ready');
    const headingH446=await page.evaluate(()=>{
      const root=document.querySelector('#revisionhub');
      const heading=root.querySelector('.rhsc-revision-heading');
      const nav=root.querySelector('.rhsc-paper-nav');
      const meta=heading?.querySelector('.count');
      const m=meta?.getBoundingClientRect();
      const n=nav?.getBoundingClientRect();
      return {title:heading?.querySelector('h2')?.textContent?.trim(),
        meta:meta?.textContent?.trim(),
        introCount:root.querySelectorAll('.rhsc-practice-intro').length,
        metadataVisible:!!m&&m.width>0&&m.height>0&&getComputedStyle(meta).display!=='none',
        navigationBelow:!!m&&!!n&&n.top>=m.bottom-2,
        navButtons:nav?.querySelectorAll('[role="tab"]').length
      };
    });
    assert(headingH446.title==='Revision Practice'&&headingH446.meta==='5 questions per skill · 80% to master'&&headingH446.introCount===0,
      view+' H446 consistent concise heading without instructions',headingH446);
    assert(headingH446.metadataVisible&&headingH446.navigationBelow&&headingH446.navButtons===2,
      view+' H446 responsive metadata above paper filters',headingH446);
    const hview=await page.evaluate(()=>{
      const tiles=[...document.querySelectorAll('#revisionhub a.rhsc-practice-tile')];
      return {count:tiles.length,colour:tiles[0]?getComputedStyle(tiles[0]).color:null,viewport:tiles.every(t=>{const r=t.getBoundingClientRect();return r.left>=-2&&r.right<=document.documentElement.clientWidth+2}),paths:tiles.map(t=>t.getAttribute('href'))};
    });
    assert(hview.count===9&&hview.colour==='rgb(24, 52, 42)'&&hview.viewport,view+' shared H446 tile styling',hview);
    const hierarchy=await page.evaluate(()=>{
      const one=document.querySelector('#rhsc-revision-paper-1');
      const two=document.querySelector('#rhsc-revision-paper-2');
      const items=[...one.querySelector(':scope > .rhsc-practice-grid').children];
      const top=items.map(el=>el.dataset.spec||(el.getAttribute('href')||'').split('#').pop());
      const link14=items[3]?.getAttribute('href')||'';
      return {
        top,topCount:items.length,paperTwoCount:two.querySelectorAll(':scope > .rhsc-practice-grid > a').length,
        groupCount:document.querySelectorAll('#revisionhub .rhsc-practice-group').length,
        direct14:link14.endsWith('/section-1-4/index.html#1.4.1'),
        legacyExpand:!!document.getElementById('rhsc-h446-14-toggle'),
        paper2Hidden:two.hidden,
        visible:items.filter(t=>t.getClientRects().length>0).length,
        overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth
      };
    });
    assert(hierarchy.top.join(',')==='1.1,1.2,1.3,1.4,1.5'&&hierarchy.topCount===5&&hierarchy.paperTwoCount===4,
      view+' H446 five equal Paper 1 topics in OCR order',hierarchy);
    assert(hierarchy.direct14&&!hierarchy.legacyExpand&&hierarchy.groupCount===2
      &&hierarchy.paper2Hidden&&hierarchy.visible===5&&hierarchy.overflow<=5,
      view+' H446 direct 1.4 topic and accessible five-card layout',hierarchy);
    const first=await page.evaluate(()=>({
      paper1:!document.querySelector('#rhsc-revision-paper-1').hidden,
      paper2:document.querySelector('#rhsc-revision-paper-2').hidden,
      tabs:[...document.querySelectorAll('#revisionhub [role="tab"]')].map(e=>e.getAttribute('aria-selected'))
    }));
    assert(first.paper1&&first.paper2&&first.tabs.join(',')==='true,false',view+' H446 Paper 1 is default filter',first);
    await page.locator('#revisionhub .rhsc-paper-nav-button').nth(1).click();
    const second=await page.evaluate(()=>({
      paper1:document.querySelector('#rhsc-revision-paper-1').hidden,
      paper2:!document.querySelector('#rhsc-revision-paper-2').hidden,
      shown:[...document.querySelectorAll('#revisionhub a.rhsc-practice-tile')].filter(e=>e.getClientRects().length).map(e=>e.getAttribute('href').split('#').pop()),
      tabs:[...document.querySelectorAll('#revisionhub [role="tab"]')].map(e=>e.getAttribute('aria-selected'))
    }));
    assert(second.paper1&&second.paper2&&second.shown.join(',')==='2.1,2.2.1,2.2.2,2.3'&&second.tabs.join(',')==='false,true',
      view+' H446 Paper 2 hides all Paper 1 content',second);
    await page.locator('#revisionhub .rhsc-paper-nav-button').first().click();
    assert(await page.evaluate(()=>!document.querySelector('#rhsc-revision-paper-1').hidden&&document.querySelector('#rhsc-revision-paper-2').hidden),
      view+' H446 Paper 1 filter switches back');
    await page.locator('#revisionhub .rhsc-paper-nav-button').first().focus();
    await page.keyboard.press('ArrowRight');
    assert(await page.evaluate(()=>document.querySelector('#rhsc-revision-paper-1').hidden&&!document.querySelector('#rhsc-revision-paper-2').hidden),
      view+' H446 arrow key filter works');
    // Check the three unchanged subskills still open the correct section directory.
    for(const subSpec of ['1.4.1','1.4.2','1.4.3']){
      const response=await page.goto(origin+'/revision/h446/section-1-4/index.html#'+subSpec,{waitUntil:'networkidle',timeout:25000});
      await page.waitForFunction(spec=>document.getElementById('section-select')?.value===spec,subSpec);
      // Switching only the URL hash is same-document navigation and Playwright
      // correctly returns a null network response. Judge the rendered section.
      const pageWorks=(response===null||response.status()===200)
        &&(await page.locator('#topic-grid .topic').count())>0
        &&(await page.locator('#section-title').innerText()).includes(subSpec);
      assert(pageWorks,view+' H446 '+subSpec+' original questions remain accessible');
    }
    await page.goto(origin+'/h446-hub.html?year=12#revisionhub',{waitUntil:'networkidle'});
    await page.waitForFunction(()=>document.querySelector('#revisionhub')?.dataset.rhscPaperNav==='ready');
    assert(hview.paths.every(p=>p.startsWith('revision/h446/')),view+' H446 topic routes preserved',hview.paths);
    await page.goto(origin+'/h446-hub.html?year=12&theme=synergy#revisionhub',{waitUntil:'networkidle'});
    await page.waitForFunction(()=>document.querySelector('#revisionhub')?.dataset.rhscPaperNav==='ready');
    const hp=await page.evaluate(()=>{
      const root=document.querySelector('#revisionhub');
      const tiles=[...root.querySelectorAll('#rhsc-revision-paper-1 > .rhsc-practice-grid > .rhsc-practice-tile')];
      const topic14=root.querySelector('#rhsc-revision-paper-1 a.rhsc-practice-tile[data-spec="1.4"]');
      return {
        preview:document.documentElement.classList.contains('synergy-hub-preview'),
        enabled:document.getElementById('synergyHubPreviewCSS')?.media==='all',
        topics:tiles.map(t=>t.dataset.spec||(t.getAttribute('href')||'').split('#').pop()),
        topic14Href:topic14?.getAttribute('href'),
        border:getComputedStyle(tiles[0]).borderLeftWidth,
        widthOverflow:document.documentElement.scrollWidth-document.documentElement.clientWidth
      };
    });
    assert(hp.preview&&hp.enabled&&hp.topics.join(',')==='1.1,1.2,1.3,1.4,1.5'&&hp.topic14Href?.endsWith('#1.4.1')&&hp.border==='4px',
      view+' H446 pilot five-topic hierarchy remains intact',hp);
    assert(hp.widthOverflow<=5,view+' H446 optional Synergy styling fits viewport',hp.widthOverflow);
    assert(hp.topic14Href&&new URL(hp.topic14Href,origin).pathname.endsWith('/section-1-4/index.html')
      &&new URL(hp.topic14Href,origin).hash==='#1.4.1',
      view+' H446 1.4 topic opens the original specification selector with theme query',hp.topic14Href);
    await page.locator('#revisionhub .rhsc-paper-nav-button').nth(1).click();
    assert(await page.evaluate(()=>document.getElementById('rhsc-revision-paper-1').hidden&&!document.getElementById('rhsc-revision-paper-2').hidden),
      view+' H446 preview Paper 2 switch retains behaviour');
    // H446's year links used to discard theme=synergy, unlike J277.
    const hLink=await page.evaluate(()=>document.querySelector('#rhsc-revision-paper-2 a.rhsc-practice-tile')?.href);
    assert(hLink?.includes('theme=synergy'),view+' H446 preview carried into quiz destination',hLink);
    await page.goto(hLink,{waitUntil:'networkidle'});
    const hBack=await page.evaluate(()=>document.querySelector('header.practice-nav a.rhsc-site-nav-back')?.href);
    assert(hBack?.includes('theme=synergy'),view+' H446 quiz return preserves preview setting',hBack);
    await page.locator('header.practice-nav a.rhsc-site-nav-back').click();
    await page.waitForFunction(()=>document.querySelector('#revisionhub')?.dataset.rhscPaperNav==='ready');
    assert(await page.evaluate(()=>document.documentElement.classList.contains('synergy-hub-preview')),
      view+' H446 Synergy style retained after quiz return');
    await page.locator('.course-nav [data-tab="lessons"]').click();
    await page.locator('.year-switch [data-year="13"]').click();
    const switched=await page.evaluate(()=>({
      search:location.search,
      year:document.body.dataset.year,
      theme:document.documentElement.classList.contains('synergy-hub-preview'),
      yearLink:document.querySelector('#otherYearLink')?.href
    }));
    assert(switched.search.includes('theme=synergy')&&switched.year==='13'&&switched.theme,
      view+' H446 Year 13 change preserves Synergy query and presentation',switched);
    assert(switched.yearLink?.includes('theme=synergy')&&switched.yearLink.includes('year=12'),
      view+' H446 return to Year 12 link preserves preview parameter',switched.yearLink);
    await page.reload({waitUntil:'networkidle'});
    assert(await page.evaluate(()=>document.documentElement.classList.contains('synergy-hub-preview')&&document.body.dataset.year==='13'),
      view+' H446 Year 13 reload retains preview');
    const other=await page.locator('#otherYearLink').getAttribute('href');
    await page.goto(new URL(other,page.url()).href,{waitUntil:'networkidle'});
    assert(await page.evaluate(()=>document.documentElement.classList.contains('synergy-hub-preview')&&document.body.dataset.year==='12'),
      view+' H446 Year 12 year-link round trip retains preview');

    await page.goto(origin+'/h446-hub.html?year=12&theme=classic#revisionhub',{waitUntil:'networkidle'});
    assert(await page.evaluate(()=>!document.documentElement.classList.contains('synergy-hub-preview')&&document.getElementById('synergyHubPreviewCSS')?.media==='not all'),
      view+' H446 classic style available on explicit classic query');

   }catch(e){assert(false,view+' H446 hub smoke test',String(e).slice(0,400))}
   for(const id of sections){
    const errors=[],onerror=e=>errors.push(String(e));page.on('pageerror',onerror);
    const url=origin+'/revision/j277/section-'+id+'/index.html';
    try{
     const resp=await page.goto(url,{waitUntil:'networkidle',timeout:25000});
     assert(resp?.status()===200,view+' '+id+' HTTP 200',resp?.status());
     const expectedCount={'1-1':5,'1-2':12,'1-3':7,'1-4':3,'1-5':3,'1-6':3,'2-1':9,'2-2':12,'2-3':3,'2-4':2,'2-5':2}[id];
     assert((await page.locator('#topic-grid .topic').count())===expectedCount,view+' '+id+' small skills');
     const bank=await page.evaluate(()=>({skills:SKILLS.map(s=>({id:s.id,title:s.title,count:s.questions.length,valid:s.questions.every(q=>q.options.length===4&&q.options.includes(q.answer)&&new Set(q.options).size===4)})),section:J277_SECTION.code,links:SKILLS.map(s=>({id:s.id,mapped:!!window.J277_RESOURCE_INDEX.skills[s.id],lessons:window.J277_RESOURCE_INDEX.skills[s.id]?.lessons||[],guide:window.J277_RESOURCE_INDEX.pageLabel(s.id)}))}));
     assert(bank.section===id.replace('-','.'),view+' '+id+' correct section',bank.section);
     assert(bank.skills.every(s=>s.count===10&&s.valid),view+' '+id+' original question bank',bank.skills);
     assert(bank.links.every(r=>r.mapped&&r.lessons.length&&r.guide.includes('page ')),view+' '+id+' central lesson and guide mapping',bank.links);
     // New shared directory: OCR sub-specification groups and mastered-score progress.
     await page.waitForFunction(()=>!!document.querySelector('.rhsc-progress-summary:not([hidden])'));
     const common=await page.evaluate(()=>({enhanced:document.documentElement.classList.contains('rhsc-revision-ui'),progress:document.querySelector('.rhsc-progress-summary')?.innerText,groups:document.querySelectorAll('#topic-grid > .topic.rhsc-spec-first').length,continuous:document.getElementById('topic-grid')?.classList.contains('rhsc-continuous'),assets:[...document.styleSheets].some(s=>s.href?.includes('/revision/shared/revision-ui.css')),next:document.querySelector('#next')?.parentElement?.className}));
     assert(common.enhanced&&common.assets&&common.next==='feedback-next',view+' '+id+' shared UI loaded',common);
     assert(common.progress?.includes('skills mastered'),view+' '+id+' progress summary',common);
     if(expectedCount>3)assert(common.groups>=2&&common.continuous,view+' '+id+' continuous grid with specification boundaries',common);
     const first=bank.skills[0].id;
     await page.locator('#topic-grid .topic button').first().click();
     await page.waitForFunction(()=>!document.getElementById('quiz').hidden);
     assert(await page.locator('#counter').innerText()==='Question 1 of 5',view+' '+id+' five-question attempt');
     const firstPrompts=[];
     for(let i=0;i<5;i++){
      const before=await page.evaluate(()=>({prompt:document.getElementById('prompt').textContent,answer:SKILLS.flatMap(s=>s.questions).find(q=>q.prompt===document.getElementById('prompt').textContent)?.answer,disabled:document.getElementById('check').disabled}));
      firstPrompts.push(before.prompt);
      assert(before.disabled,view+' '+id+' '+i+' no empty answers');
      await page.locator('input[name=answer]').evaluateAll((inputs,a)=>inputs.find(e=>e.value===a)?.closest('label')?.click(),before.answer);
      await page.locator('#check').click();
      assert(!(await page.locator('#feedback').isHidden()),view+' '+id+' '+i+' explanation revealed');
      if(i===0){
       const feedbackOrder=await page.evaluate(()=>{
        const f=document.getElementById('feedback').getBoundingClientRect();
        const n=document.getElementById('next').getBoundingClientRect();
        return {feedbackBottom:f.bottom,nextTop:n.top,below:n.top>=f.bottom-2};
       });
       if(view==='phone')assert(feedbackOrder.below,view+' '+id+' explanation before Next',feedbackOrder);
      }
      await page.locator('#next').click();
     }
     assert(await page.locator('#score').innerText()==='100%',view+' '+id+' perfect results');
     const persisted=await page.evaluate(()=>JSON.stringify(localStorage));
     assert(persisted.includes(first),view+' '+id+' saves local progress');
     await page.locator('#retry').click();
     const nextPrompt=await page.locator('#prompt').innerText();
     assert(!firstPrompts.includes(nextPrompt),view+' '+id+' retry changes question set',nextPrompt);
     const over=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
     assert(over<=5,view+' '+id+' fits viewport',over);
     await page.goto(url,{waitUntil:'networkidle'});
     const state=await page.locator('#topic-grid .topic .status').first().innerText();
     assert(state.includes('Mastered')&&state.includes('Best 100%'),view+' '+id+' best-score mastery after reload',state);
     // Verify low-score feedback: centralized lesson, model example and guide-page references.
     await page.locator('#topic-grid .topic button').first().click();
     await page.waitForFunction(()=>!document.getElementById('quiz').hidden&&document.getElementById('prompt').textContent.length>5);
     for(let i=0;i<5;i++){
      const target=await page.evaluate(()=>{
       const prompt=document.getElementById('prompt').textContent;
       const q=SKILLS.flatMap(s=>s.questions).find(q=>q.prompt===prompt);
       return q.options.find(v=>v!==q.answer);
      });
      await page.locator('input[name=answer]').evaluateAll((inputs,v)=>inputs.find(e=>e.value===v)?.closest('label')?.click(),target);
      await page.locator('#check').click();
      await page.locator('#next').click();
     }
     assert(await page.locator('#score').innerText()==='0%',view+' '+id+' below-mastery score');
     assert((await page.locator('#support a[href*="/lessons/j277/"]').count())>=2,view+' '+id+' targeted classroom and I Do links');
     const guideNote=await page.locator('#support').innerText();
     const pageMapped=await page.evaluate(()=>window.J277_RESOURCE_INDEX.pageLabel(SKILLS[0].id));
     assert(guideNote.includes(pageMapped),view+' '+id+' centrally mapped guide page',guideNote);
     const guideLinks=await page.locator('#support a[href*="/guides/"]').evaluateAll(anchors=>anchors.map(a=>a.getAttribute('href')));
     const exactGuide=await page.evaluate(()=>window.J277_RESOURCE_INDEX.guideLink(SKILLS[0].id));
     assert(guideLinks.length===1&&guideLinks[0]===exactGuide,
       view+' '+id+' published PDF link matches centralized page and edition',{guideLinks,exactGuide});
     const guideResponse=await page.request.head(new URL(exactGuide,origin).href);
     assert([200,206].includes(guideResponse.status())&&(guideResponse.headers()['content-type']||'').includes('pdf'),
       view+' '+id+' linked PDF responds as a PDF',{status:guideResponse.status(),type:guideResponse.headers()['content-type']});
     assert(!errors.length,view+' '+id+' no JavaScript errors',errors);
     console.log('J277_MCQ_SURVEY '+JSON.stringify({view,id,bankQuestions:bank.skills.reduce((n,x)=>n+x.count,0),screens:'directory quiz feedback results retry reload',mastery:state,overflow:over}));
    }catch(e){assert(false,view+' '+id+' browser exception',String(e).slice(0,400))}
    finally{page.off('pageerror',onerror);}
   }
   const h446Sections=['1-1','1-2','1-3','1-4','1-5','2-1','2-2-1','2-2-2','2-3'];
   for(const id of h446Sections){
    const errors=[],onerror=e=>errors.push(String(e));
    page.on('pageerror',onerror);
    const url=origin+'/revision/h446/section-'+id+'/index.html';
    try{
      const resp=await page.goto(url,{waitUntil:'networkidle',timeout:25000});
      assert(resp?.status()===200,view+' H446 '+id+' HTTP 200',resp?.status());
      await page.waitForFunction(()=>document.querySelector('.rhsc-progress-summary:not([hidden])'));
      const before=await page.evaluate(()=>({
        topics:document.querySelectorAll('#topic-grid .topic').length,
        shared:document.documentElement.classList.contains('rhsc-revision-ui'),
        assets:[...document.styleSheets].some(s=>s.href?.includes('/revision/shared/revision-ui.css')),
        nextSlot:document.getElementById('next')?.parentElement?.className,
        progress:document.querySelector('.rhsc-progress-summary')?.innerText
      }));
      assert(before.topics>0&&before.shared&&before.assets&&before.nextSlot==='feedback-next',view+' H446 '+id+' shared design intact',before);
      await page.locator('#topic-grid .topic button').first().click();
      await page.waitForFunction(()=>!document.getElementById('quiz').hidden);
      assert((await page.locator('#counter').innerText()).includes('Question 1'),view+' H446 '+id+' quiz entry');
      const radios=page.locator('input[name=answer]');
      if(await radios.count()){
        await radios.first().check();
        await page.locator('#check').click();
        assert(!(await page.locator('#feedback').isHidden()),view+' H446 '+id+' feedback works');
        if(view==='phone'){
         const seq=await page.evaluate(()=>{const f=document.getElementById('feedback').getBoundingClientRect(),n=document.getElementById('next').getBoundingClientRect();return {feedbackBottom:f.bottom,nextTop:n.top,ok:n.top>=f.bottom-2};});
         assert(seq.ok,view+' H446 '+id+' feedback before Next',seq);
        }
        await page.locator('#next').click();
        assert((await page.locator('#counter').innerText()).includes('Question 2'),view+' H446 '+id+' advances');
      }
      // Representative failed attempts for both A Level papers, independent of
      // the broader question-bank regression. Check the feedback actually points
      // to the original class lesson, worked example and stable mapped PDF page.
      if(id==='1-1'||id==='2-1'){
        await page.goto(url,{waitUntil:'networkidle'});
        await page.waitForFunction(()=>!!document.querySelector('.rhsc-progress-summary:not([hidden])'));
        await page.locator('#topic-grid .topic button').first().click();
        await page.waitForFunction(()=>!document.getElementById('quiz').hidden);
        for(let questionNumber=0;questionNumber<5;questionNumber++){
          const wrong=await page.evaluate(()=>{
            const prompt=document.getElementById('prompt').textContent;
            const question=SKILLS.flatMap(s=>s.questions).find(q=>q.prompt===prompt);
            if(!question)throw Error('Unmapped question: '+prompt);
            return question.options.find(v=>v!==question.answer);
          });
          await page.locator('input[name=answer]').evaluateAll((inputs,wrong)=>{
            const input=inputs.find(x=>x.value===wrong);
            if(!input)throw Error('Incorrect answer option missing');
            input.closest('label').click();
          },wrong);
          await page.locator('#check').click();
          await page.locator('#next').click();
        }
        assert((await page.locator('#score').innerText())==='0%',
          view+' H446 '+id+' unsuccessful attempt scored accurately');
        const support=await page.locator('#support a').evaluateAll(nodes=>nodes.map(n=>({label:n.textContent.trim(),href:n.getAttribute('href')})));
        assert(support.some(x=>x.href?.includes('/lessons/h446/')&&x.href?.includes('#new-learning'))&&
               support.some(x=>x.href?.includes('/lessons/h446/')&&x.href?.includes('#i-do')),
          view+' H446 '+id+' below-80% original lesson and worked example',support);
        const expected=await page.evaluate(()=>{
          const skill=SKILLS[0];
          return location.pathname.includes('/section-2-')?RHSC_GUIDE_LINKS.paper2(skill.page,skill.id):RHSC_GUIDE_LINKS.paper1(skill.page,skill.id);
        });
        const guide=support.find(x=>x.href?.includes('/guides/')&&x.href?.includes('.pdf'));
        assert(!!guide&&new URL(guide.href,origin).href===new URL(expected,origin).href,
          view+' H446 '+id+' exact stable PDF destination',{guide:guide?.href,expected});
        const pdfReply=guide?await page.request.head(new URL(guide.href,origin).href):null;
        assert(pdfReply?.status()===200&&(pdfReply.headers()['content-type']||'').includes('pdf'),
          view+' H446 '+id+' mapped PDF opens',{status:pdfReply?.status()});
        const stored=await page.evaluate(()=>JSON.stringify(localStorage));
        assert(stored.includes('11-components')||stored.includes('21-'),
          view+' H446 '+id+' saved its 0% attempt');
      }
      assert(!errors.length,view+' H446 '+id+' no JavaScript errors',errors);
      console.log('SHARED_H446_SURVEY '+JSON.stringify({view,id,topics:before.topics}));
    }catch(e){assert(false,view+' H446 '+id+' browser exception',String(e).slice(0,400))}
    finally{page.off('pageerror',onerror);}
   }
   await context.close();
  }
 }finally{await browser.close();}
 console.log('J277_MCQ_SUMMARY '+JSON.stringify({sections:sections.length,views:views.length,checks,failures:failures.length,details:failures}));
 if(failures.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1});

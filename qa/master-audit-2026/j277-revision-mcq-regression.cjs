'use strict';
const {chromium}=require('playwright');
const origin=process.env.QA_ORIGIN||'http://127.0.0.1:8765';
const sections=['1-1','1-2','1-3','1-4','1-5','1-6','2-1','2-2','2-3','2-4','2-5'];
const views=[['classroom TV',1920,1080],['phone',390,844]];
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
    await page.waitForFunction(()=>document.querySelector('#revisionhub')?.classList.contains('active'));
    const visual=await page.evaluate(()=>{
     const tiles=[...document.querySelectorAll('#revisionhub a.rhsc-practice-tile')];
     const groups=[...document.querySelectorAll('#revisionhub .rhsc-practice-group')];
     const fg=tiles.length?getComputedStyle(tiles[0]).color:null;
     const heading=groups.length?getComputedStyle(groups[0].querySelector('h3')).color:null;
     const rects=tiles.map(t=>t.getBoundingClientRect());
     return {tileCount:tiles.length,groupCount:groups.length,fg,heading,withinViewport:rects.every(r=>r.left>=-2&&r.right<=document.documentElement.clientWidth+2),urls:tiles.map(t=>t.getAttribute('href')),labels:tiles.every(t=>!!t.querySelector('.rhsc-practice-name')&&!!t.querySelector('.rhsc-practice-code'))};
    });
    assert(visual.tileCount===11&&visual.groupCount===2,view+' H446-style topic tiles and Paper groups',visual);
    assert(visual.fg==='rgb(0, 58, 49)'&&visual.heading==='rgb(0, 58, 49)',view+' H446 dark-green palette',visual);
    assert(visual.withinViewport&&visual.labels,view+' readable responsive tiles',visual);
    assert(visual.urls.length===11&&visual.urls.every(u=>/^revision\/j277\/section-[12]-[1-6]\/index\.html#[12]\.[1-6]$/.test(u)),view+' preserves all 11 topic routes',visual.urls);
    assert(!hubErrors.length,view+' hub JavaScript errors',hubErrors);
    console.log('J277_HUB_SURVEY '+JSON.stringify({view,tiles:visual.tileCount,groups:visual.groupCount,colour:visual.fg,withinViewport:visual.withinViewport}));
   }catch(e){assert(false,view+' J277 hub smoke test',String(e).slice(0,400))}
   finally{page.off('pageerror',hubError)}
   // The H446 hub shares the same practice tile styling; none of its routes change.
   try{
    const hresp=await page.goto(origin+'/h446-hub.html?year=12#revisionhub',{waitUntil:'networkidle',timeout:25000});
    assert(hresp?.status()===200,view+' H446 hub HTTP 200',hresp?.status());
    await page.waitForFunction(()=>document.querySelector('#revisionhub')?.classList.contains('active'));
    const hview=await page.evaluate(()=>{
      const tiles=[...document.querySelectorAll('#revisionhub a.rhsc-practice-tile')];
      return {count:tiles.length,colour:tiles[0]?getComputedStyle(tiles[0]).color:null,viewport:tiles.every(t=>{const r=t.getBoundingClientRect();return r.left>=-2&&r.right<=document.documentElement.clientWidth+2}),paths:tiles.map(t=>t.getAttribute('href'))};
    });
    assert(hview.count===11&&hview.colour==='rgb(0, 58, 49)'&&hview.viewport,view+' shared H446 tile styling',hview);
    assert(hview.paths.every(p=>p.startsWith('revision/h446/')),view+' H446 topic routes preserved',hview.paths);
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
     const common=await page.evaluate(()=>({enhanced:document.documentElement.classList.contains('rhsc-revision-ui'),progress:document.querySelector('.rhsc-progress-summary')?.innerText,groups:document.querySelectorAll('.rhsc-spec-group').length,assets:[...document.styleSheets].some(s=>s.href?.includes('/revision/shared/revision-ui.css')),next:document.querySelector('#next')?.parentElement?.className}));
     assert(common.enhanced&&common.assets&&common.next==='feedback-next',view+' '+id+' shared UI loaded',common);
     assert(common.progress?.includes('skills mastered'),view+' '+id+' progress summary',common);
     if(expectedCount>3)assert(common.groups>=2,view+' '+id+' specification groups visible',common);
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
     assert(!(await page.locator('#support a[href*="/guides/"]').count()),view+' '+id+' no broken unpublished PDF links');
     assert(!errors.length,view+' '+id+' no JavaScript errors',errors);
     console.log('J277_MCQ_SURVEY '+JSON.stringify({view,id,bankQuestions:bank.skills.reduce((n,x)=>n+x.count,0),screens:'directory quiz feedback results retry reload',mastery:state,overflow:over}));
    }catch(e){assert(false,view+' '+id+' browser exception',String(e).slice(0,400))}
    finally{page.off('pageerror',onerror);}
   }
   await context.close();
  }
 }finally{await browser.close();}
 console.log('J277_MCQ_SUMMARY '+JSON.stringify({sections:sections.length,views:views.length,checks,failures:failures.length,details:failures}));
 if(failures.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1});

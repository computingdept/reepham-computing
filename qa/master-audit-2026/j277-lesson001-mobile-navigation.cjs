"use strict";
// J277 Lesson 001 phone-only functional navigation regression.
const {chromium}=require("playwright");
const ORIGIN=process.env.QA_ORIGIN||"http://127.0.0.1:8765";
const PAGE=ORIGIN+"/lessons/j277/lesson-001/index.html";
(async()=>{
 const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
 const problems=[],results=[];
 const assert=(ok,label,detail="")=>{
   results.push({ok,label,detail});
   console.log((ok?"PASS ":"FAIL ")+label+(detail?" · "+detail:""));
   if(!ok)problems.push({label,detail});
 };
 const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
 const page=await context.newPage();
 const errors=[];
 page.on("pageerror",e=>errors.push(e.message));
 try{
  await page.goto(PAGE,{waitUntil:"domcontentloaded"});
  await page.waitForFunction(()=>location.hash==="#do-now"&&document.querySelector("#do-now.page.active")&&document.querySelector("#mobile-lesson-status"),null,{timeout:20000});
  const cdp=await context.newCDPSession(page);
  async function gesture(dir){
   const a=dir==="left"?300:dir==="right"?90:190;
   const b=dir==="left"?90:dir==="right"?300:190;
   const y=dir==="up"?610:420;
   const ty=dir==="up"?320:420;
   const touch=(x,y)=>({x:Math.round(x),y:Math.round(y)});
   await cdp.send("Input.dispatchTouchEvent",{type:"touchStart",touchPoints:[touch(a,y)]});
   await cdp.send("Input.dispatchTouchEvent",{type:"touchMove",touchPoints:[touch((a+b)/2,(y+ty)/2)]});
   await cdp.send("Input.dispatchTouchEvent",{type:"touchMove",touchPoints:[touch(b,ty)]});
   await cdp.send("Input.dispatchTouchEvent",{type:"touchEnd",touchPoints:[]});
   await page.waitForTimeout(90);
  }
  async function snapshot(){
   return await page.evaluate(()=>{
    const phase=document.querySelector("section.page.active");
    const visible=els=>[...els].findIndex(el=>!el.hidden);
    const status=document.querySelector(".mobile-phase-status");
    return {phase:phase?.id,hash:location.hash,
      doNow:visible(document.querySelectorAll("#do-now .donow-stage")),
      vocab:visible(document.querySelectorAll("#vocabulary .vocab-stage")),
      vocabAnswer:!!document.querySelector("#vocabulary .vocab-stage:not([hidden]) [data-vocab-answer]:not([hidden])"),
      phaseStatus:status?.textContent,
      advanceVisible:!!document.getElementById("advance")?.getClientRects().length,
      previousVisible:!!document.getElementById("previous")?.getClientRects().length,
      scrollY:window.scrollY
    };
   });
  }
  async function signalSnapshot(){
    return await page.evaluate(()=>{
      const status=document.getElementById('mobile-lesson-status');
      const group=document.getElementById('mobile-lesson-signals');
      const badges=[...group?.querySelectorAll('.mobile-signal-icon')||[]];
      const b=status?.getBoundingClientRect();
      const r=group?.getBoundingClientRect();
      const key=document.getElementById('mobile-lesson-key');
      const keys=[...key?.querySelectorAll('.mobile-key-item')||[]];
      const active=document.querySelector('section.page.active');
      const actual=[document.getElementById('phase-logo')?.textContent,
        document.getElementById('behaviour-logo')?.textContent,
        document.getElementById('response-logo')?.textContent];
      const labels=keys.map(el=>el.querySelector('.mobile-key-label')?.textContent);
      const sameIcons=badges.length===3 && keys.length===3 &&
        badges.every((el,i)=>el.querySelector('svg')?.outerHTML===
          keys[i]?.querySelector('svg')?.outerHTML);
      return {phase:badges[0]?.getAttribute('aria-label')||'',
        routine:badges[1]?.getAttribute('aria-label')||'',
        response:badges[2]?.getAttribute('aria-label')||'',
        count:badges.length,svgCount:badges.filter(x=>x.querySelector('svg')).length,
        iconWidths:badges.map(x=>Math.round(x.getBoundingClientRect().width)),
        right:Math.round(r?.right||0),headerRight:Math.round(b?.right||0),
        visible:!!r&&r.width>0&&r.height>0,
        legend:!!key&&getComputedStyle(key).display!=='none',
        keyBelow:!!key&&!!active&&key.getBoundingClientRect().top>=active.getBoundingClientRect().bottom-2,
        keyPosition:key?getComputedStyle(key).position:null,
        actual,labels,sameIcons,
        match:actual.every((text,i)=>text===labels[i])};
    });
  }
  let signals=await signalSnapshot();
  assert(signals.visible&&signals.count===3&&signals.svgCount===3,
    "All three classroom expectation icons appear in mobile title",JSON.stringify(signals));
  assert(signals.legend&&signals.match&&signals.sameIcons,
    "Bottom legend repeats the identical top icons and full Classroom TV labels",JSON.stringify(signals));
  assert(signals.keyBelow&&signals.keyPosition==='static',
    "Legend sits below scrollable lesson content, not fixed over questions",JSON.stringify(signals));
  assert(/Do Now/.test(signals.phase),
    "Blue phase icon describes the Do Now phase",JSON.stringify(signals));
  assert(signals.iconWidths.every(w=>w<=30)&&signals.right<=signals.headerRight+1,
    "Expectations stay small and at the right of the title",JSON.stringify(signals));
  assert(/Silent Working/.test(signals.routine)&&/MWBs/.test(signals.response),
    "J277 Do Now icons show Silent Working and MWBs",JSON.stringify(signals));
  let initial=await snapshot();
  assert(initial.phase==="do-now"&&initial.doNow===0,"Lesson opens on Do Now",JSON.stringify(initial));
  assert(!initial.advanceVisible&&!initial.previousVisible,"Mobile Previous/Next controls stay hidden");
  await gesture("left");
  let s=await snapshot();
  assert(s.phase==="do-now"&&s.doNow===1,"Swipe left reveals Do Now answer 1",JSON.stringify(s));
  await gesture("right");
  s=await snapshot();
  assert(s.phase==="do-now"&&s.doNow===0,"Swipe right returns to Do Now questions",JSON.stringify(s));
  await gesture("up");
  s=await snapshot();
  assert(s.phase==="do-now"&&s.doNow===0,"Vertical scroll does not advance lesson",JSON.stringify(s));
  for(let i=0;i<5;i++)await gesture("left");
  s=await snapshot();
  assert(s.phase==="overview","Swipes progress from Do Now to Objectives",JSON.stringify(s));
  signals=await signalSnapshot();
  assert(/Listening/.test(signals.routine)&&/Hands Up/.test(signals.response),
    "Icons update to Listening and Hands Up on Objectives",JSON.stringify(signals));
  assert(/Objectives/.test(signals.phase)&&signals.match&&signals.sameIcons,
    "Objectives updates all three identical legend icons and labels",JSON.stringify(signals));
  const tip=page.locator("#overview .vocab-tip").first();
  if(await tip.isVisible()){
    await tip.scrollIntoViewIfNeeded();
    const rect=await tip.boundingBox();
    await page.touchscreen.tap(rect.x+rect.width/2,rect.y+rect.height/2);
    const opened=await tip.evaluate(el=>el.classList.contains("is-definition-open")&&el.getAttribute("aria-expanded")==="true");
    assert(opened,"Tap opens vocabulary definition on Objectives");
    if(opened){
      await page.touchscreen.tap(rect.x+rect.width/2,rect.y+rect.height/2);
      const closed=await tip.evaluate(el=>!el.classList.contains("is-definition-open"));
      assert(closed,"Second tap closes vocabulary definition");
    }
  }else{
    assert(false,"Objectives vocabulary tips visible for tap");
  }
  await gesture("left");
  s=await snapshot();
  assert(s.phase==="new-learning","Swipe left moves Objectives to New Learning",JSON.stringify(s));
  // A same-document fragment navigation doesn't reload the lesson engine.
  // Reload the deep-linked URL as a pupil opening it in a new tab would do.
  await page.goto(PAGE+"#vocabulary",{waitUntil:"domcontentloaded"});
  await page.reload({waitUntil:"domcontentloaded"});
  await page.waitForFunction(()=>document.querySelector("#vocabulary.page.active")&&document.querySelector("#mobile-lesson-status"),null,{timeout:20000});
  s=await snapshot();
  assert(s.phase==="vocabulary"&&s.vocab===0&&!s.vocabAnswer,"Deep link opens Key Vocabulary term 1",JSON.stringify(s));
  await gesture("left");
  s=await snapshot();
  assert(s.phase==="vocabulary"&&s.vocab===0&&s.vocabAnswer,"Swipe reveals first Key Vocabulary answer",JSON.stringify(s));
  const visual=await page.evaluate(()=>{
    const header=document.querySelector(".navwrap")?.getBoundingClientRect();
    const answer=document.querySelector("#vocabulary .vocab-stage:not([hidden]) [data-vocab-answer]");
    const r=answer?.getBoundingClientRect();
    return {headerBottom:Math.round(header?.bottom||0),answerTop:Math.round(r?.top||0),answerBottom:Math.round(r?.bottom||0),viewportHeight:innerHeight};
  });
  assert(visual.answerTop>=visual.headerBottom-10&&visual.answerTop<visual.viewportHeight,
    "Revealed Key Vocabulary answer is within phone viewport",JSON.stringify(visual));
  await gesture("right");
  s=await snapshot();
  assert(s.phase==="vocabulary"&&s.vocab===0&&!s.vocabAnswer,"Swipe right conceals first answer",JSON.stringify(s));
  await gesture("left");await gesture("left");
  s=await snapshot();
  assert(s.phase==="vocabulary"&&s.vocab===1&&!s.vocabAnswer,"Next swipe reaches vocabulary term 2",JSON.stringify(s));
  let reachedExit=false;
  for(let i=0;i<14;i++){
    s=await snapshot();
    if(s.phase==="exit"){reachedExit=true;break;}
    await gesture("left");
  }
  s=await snapshot();
  assert(reachedExit||s.phase==="exit","Swipes complete all vocabulary terms and reach Exit Ticket",JSON.stringify(s));
  // The very same header must work in H446 without lesson-specific markup.
  await page.goto(ORIGIN+"/lessons/h446/lesson-001/index.html",{waitUntil:"domcontentloaded"});
  await page.waitForFunction(()=>document.querySelector("#do-now.page.active")&&
    document.querySelector(".mobile-signal-response svg"),null,{timeout:20000});
  signals=await signalSnapshot();
  assert(/Silent Working/.test(signals.routine)&&/MWBs/.test(signals.response),
    "H446 Lesson 001 shares compact Do Now icons",JSON.stringify(signals));
  await page.evaluate(()=>window.H446OptionalBridge.go('overview'));
  signals=await signalSnapshot();
  assert(/Listening/.test(signals.routine)&&/Hands Up/.test(signals.response),
    "H446 Objectives updates the same icons",JSON.stringify(signals));
  assert(/Objectives/.test(signals.phase)&&signals.match&&signals.sameIcons,
    "H446 legend reuses the three Classroom TV labels and header symbols",JSON.stringify(signals));
  // J277 002: the desktop authoring highlights are preserved on mobile
  // without reintroducing the verbose objectives or losing tap definitions.
  await page.goto(ORIGIN+"/lessons/j277/lesson-002/index.html#overview",{waitUntil:"domcontentloaded"});
  await page.reload({waitUntil:"domcontentloaded"});
  await page.waitForFunction(()=>!!document.querySelector("#overview.page.active")&&
    !!document.querySelector("#overview .objectives mark.rhsc-keyword"),null,{timeout:20000});
  const keywords=await page.evaluate(()=>{
    const objectives=document.querySelector('#overview .objectives');
    const terms=[...objectives.querySelectorAll('mark.rhsc-keyword')];
    const cards=[...document.querySelectorAll('#overview .vocab-intro-list .vocab-tip')];
    const visible=el=>{const rect=el.getBoundingClientRect();return rect.width>0&&rect.height>0&&getComputedStyle(el).display!=='none'};
    return {
      objectivesVisible:visible(objectives),
      terms:terms.map(el=>({text:el.textContent.trim(),visible:visible(el),
        color:getComputedStyle(el).backgroundColor,
        image:getComputedStyle(el).backgroundImage.slice(0,50)})),
      chipsVisible:cards.every(visible),
      width:document.documentElement.scrollWidth,
      viewport:document.documentElement.clientWidth
    };
  });
  assert(keywords.objectivesVisible&&keywords.terms.length>=4&&keywords.terms.every(x=>x.visible),
    "J277 002 yellow-highlighted objective keywords remain visible on mobile",JSON.stringify(keywords));
  assert(keywords.width<=keywords.viewport+4,
    "Mobile keyword strip fits without horizontal page overflow",JSON.stringify(keywords));
  assert(keywords.chipsVisible,
    "Mobile keyword chips with tap definitions remain visible",JSON.stringify(keywords));
  const secondTip=page.locator("#overview .vocab-tip").first();
  await secondTip.click();
  assert(await secondTip.evaluate(el=>el.classList.contains('is-definition-open')),
    "J277 002 keyword definitions still open by tapping");
    assert(errors.length===0,"No browser JavaScript errors",errors.join(" | "));
 }catch(error){
  assert(false,"Functional phone test completed",String(error));
 }finally{await browser.close();}
 console.log("MOBILE_NAV_SUMMARY "+JSON.stringify({passed:results.filter(x=>x.ok).length,failed:problems.length,problems}));
 if(problems.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1});
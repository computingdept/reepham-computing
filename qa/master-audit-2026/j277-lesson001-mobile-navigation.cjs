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
  assert(errors.length===0,"No browser JavaScript errors",errors.join(" | "));
 }catch(error){
  assert(false,"Functional phone test completed",String(error));
 }finally{await browser.close();}
 console.log("MOBILE_NAV_SUMMARY "+JSON.stringify({passed:results.filter(x=>x.ok).length,failed:problems.length,problems}));
 if(problems.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1});
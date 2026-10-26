"use strict";
// Behaviour / presentation only. Never edit or grade lesson content.
const {chromium}=require("playwright");
const fs=require("node:fs");
const VIEWPORTS=[
 {name:"TV",width:1920,height:1080,mobile:false},
 {name:"compact TV",width:1300,height:635,mobile:false},
 {name:"phone",width:390,height:844,mobile:true}
];
const TARGETS=[
 ["j277","001"],["j277","002"],["j277","051"],["j277","115"],
 ["h446","001"],["h446","008"],["h446","020"],["h446","029"],
 ["h446","068"],["h446","131"],["h446","181"]
];
const ORIGIN=process.env.QA_ORIGIN||"http://127.0.0.1:8765";
const problems=[],warnings=[],checks=[],summaries=[];
function assert(condition,location,name,detail=""){
 const item={...location,name,detail};checks.push({...item,ok:!!condition});
 if(!condition){problems.push(item);console.log("SELFMARK_FAIL "+JSON.stringify(item));}
}
function warn(location,name,detail=""){const item={...location,name,detail};warnings.push(item);console.log("SELFMARK_REVIEW "+JSON.stringify(item));}
async function audit(browser,course,id,viewport){
 const loc={course,id,view:viewport.name};
 const context=await browser.newContext({viewport:{width:viewport.width,height:viewport.height},isMobile:viewport.mobile,hasTouch:viewport.mobile});
 const page=await context.newPage();
 let browserErrors=[];page.on("pageerror",e=>browserErrors.push(e.message));
 try{
  await page.goto(ORIGIN+"/lessons/"+course+"/lesson-"+id+"/index.html#you-do",{waitUntil:"domcontentloaded",timeout:25000});
  await page.waitForFunction(()=>document.querySelector("#you-do.page.active") &&
    document.querySelector("#mobile-lesson-status") &&
    location.hash==="#you-do",null,{timeout:24000});
  if(course==="j277" && ["001","002"].includes(id)){
   await page.waitForFunction(()=>document.querySelector("#you-do.j277-sm-ready"),null,{timeout:20000});
  }
  if(course==="j277"&&id==="002"){
    const signal=await page.evaluate(()=>{
      const els=[...document.querySelectorAll('mark.rhsc-keyword,#overview .vocab-tip,#you-do mark.j277-sm-command')];
      return els.slice(0,30).map(el=>{
        const css=getComputedStyle(el),box=el.getBoundingClientRect();
        const parent=el.closest('#overview .objectives,#overview .vocab-intro,#new-learning,#i-do,#we-do,#you-do,#vocabulary');
        return {phase:parent?.id||parent?.className||'',label:el.textContent.trim().slice(0,50),
          cls:el.className,visible:box.width>0&&box.height>0&&!!el.getClientRects().length,
          bg:css.backgroundImage.slice(0,95),bgcolor:css.backgroundColor};
      });
    });
    console.log("KEYWORD_VISIBILITY "+JSON.stringify({viewport:viewport.name,signal}));
  }
  // Standalone assessment screens do not have a normal self-marking sequence.
  const assessment=await page.locator("#you-do").getAttribute("data-assessment-mode");
  if(assessment==="true"){
   warn(loc,"Timed assessment excluded from self-marking progression");
   return;
  }
  const seen=new Set(),states=[];
  for(let step=0;step<35;step++){
   const s=await page.evaluate(()=>{
     const host=document.getElementById("you-do");
     const visible=el=>{
       if(!el || el.closest("[hidden]"))return false;
       const css=getComputedStyle(el),r=el.getBoundingClientRect();
       return css.display!=="none"&&css.visibility!=="hidden"&&r.height>0&&r.width>0;
     };
     const active=document.querySelector("section.page.active")?.id;
     const questions=[...host.querySelectorAll(".youdo-question")].filter(visible);
     const reviews=[...host.querySelectorAll(
       ".youdo-solution,.j277-sm-review,.h446-rich-review,.h446-marking-screen,.h446-marking-body"
     )].filter(visible);
     const leaked=[...host.querySelectorAll(".youdo-solution")].filter(visible);
     const answerText=reviews.map(r=>r.textContent?.trim().slice(0,280)||"").join(" | ");
     const cardMetrics=questions.map(el=>{
       const cs=getComputedStyle(el),r=el.getBoundingClientRect();
       return {h:Math.round(r.height),scrollH:el.scrollHeight,clientH:el.clientHeight,
         overflowY:cs.overflowY,bottom:Math.round(r.bottom)};
     });
     return {active,mode:host.dataset.answerMode,richStep:host.dataset.richStepIndex,
       answerIndex:host.dataset.answerIndex,reviewStep:host.dataset.reviewStep,
       workMode:host.dataset.workMode,reviewStart:host.dataset.j277ReviewStart,
       separate:host.dataset.j277SeparateReview,rich:host.dataset.selfMarking,
       windowStart:host.dataset.windowStart,questionCount:questions.length,
       reviewCount:reviews.length,leakedCount:leaked.length,answerText,
       cardMetrics,documentWidth:document.documentElement.scrollWidth,
       viewportWidth:document.documentElement.clientWidth,
       caption:host.querySelector(".youdo-window-progress")?.textContent.trim()||""};
   });
   states.push(s);
   const stateKey=JSON.stringify({active:s.active,mode:s.mode,richStep:s.richStep,
     answerIndex:s.answerIndex,reviewStep:s.reviewStep,workMode:s.workMode,windowStart:s.windowStart,caption:s.caption,
     questionCount:s.questionCount,reviewCount:s.reviewCount,answer:s.answerText.slice(0,50)});
   if(s.active==="vocabulary")break;
   // The shared lesson engine may place optional Catch Up/Exam Practice
   // between self-marking and Key Vocabulary. Progress through them normally.
   if(s.active!=="you-do" && !["catch-up","exam-practice"].includes(s.active))break;
   if(s.active!=="you-do"){
     await page.locator("#advance").evaluate(e=>e.click());
     await page.waitForTimeout(25);
     continue;
   }
   if(seen.has(stateKey)){
     // Some independent-work prompts deliberately pause once to enter independent mode.
     // A second identical state is permitted, repeated repeats indicate stuck navigation.
     if(states.length>2&&states.at(-3)&&JSON.stringify(states.at(-3))===JSON.stringify(s)){
       warn(loc,"Repeated identical state while advancing",JSON.stringify({step,state:s}).slice(0,500));
     }
   }
   seen.add(stateKey);
   assert(s.documentWidth<=s.viewportWidth+4,loc,"No horizontal page overflow",JSON.stringify({step,doc:s.documentWidth,viewport:s.viewportWidth}));
   if(s.separate!=="true"&&s.mode!=="true"){
     assert(s.leakedCount===0,loc,"Independent questions do not reveal model answer",JSON.stringify({step,visible:s.leakedCount}));
   }
   if(s.separate==="true" && s.reviewStart && Number(s.windowStart)>=Number(s.reviewStart)){
     assert(s.questionCount===1,loc,"J277 separate review shows one marking screen",JSON.stringify({step,count:s.questionCount}));
   }
   if(s.mode==="true"||s.separate==="true"&&s.reviewStart&&Number(s.windowStart)>=Number(s.reviewStart)){
     if(s.reviewCount>0){
       assert(s.answerText.length>10,loc,"Marking screen contains readable model answer",JSON.stringify({step,text:s.answerText.slice(0,90)}));
     }
   }
   for(let i=0;i<s.cardMetrics.length;i++){
     const card=s.cardMetrics[i];
     if(card.scrollH>card.clientH+25 && card.overflowY==="hidden")
       warn(loc,"Question/marking screen may clip vertically",JSON.stringify({step,card}));
   }
   await page.locator("#advance").evaluate(e=>e.click());
   await page.waitForTimeout(25);
  }
  const finished=states.at(-1);
  assert(finished.active==="vocabulary",loc,"Can advance from You Do through marking to Key Vocabulary",
    JSON.stringify({last:finished,steps:states.length}).slice(0,700));
  const marks=states.filter(s=>s.reviewCount>0&&(s.mode==="true" ||
    s.separate==="true"&&s.reviewStart&&Number(s.windowStart)>=Number(s.reviewStart)));
  assert(marks.length>0,loc,"At least one genuine self-marking screen appears",JSON.stringify({markScreens:marks.length,steps:states.length}));
  assert(browserErrors.length===0,loc,"No JavaScript exceptions",browserErrors.join(" | "));
  summaries.push({...loc,steps:states.length,markScreens:marks.length,last:finished.active});
 }catch(e){assert(false,loc,"Test completed",String(e).slice(0,700));}
 finally{await context.close();}
}

/* Unnumbered Welcome follows the same class expectations but is intentionally
   omitted by lesson-### enumerators. Verify its complete answer-review path. */
async function auditWelcome(browser,viewport){
 const loc={course:"j277",id:"WELCOME",view:viewport.name};
 const context=await browser.newContext({viewport:{width:viewport.width,height:viewport.height},
   isMobile:viewport.mobile,hasTouch:viewport.mobile});
 const page=await context.newPage();
 const errors=[];page.on("pageerror",error=>errors.push(error.message));
 try{
  await page.goto(ORIGIN+"/lessons/j277/J277Welcome.html#you-do",
    {waitUntil:"domcontentloaded",timeout:25000});
  await page.waitForFunction(()=>document.querySelector("#you-do.page.active") &&
    document.querySelector("#mobile-lesson-status") && location.hash==="#you-do",
    null,{timeout:20000});
  const samples=[];
  for(let i=0;i<17;i++){
   const x=await page.evaluate(()=>{
    const root=document.querySelector("#you-do");
    const visible=el=>{
      if(!el||el.closest("[hidden]"))return false;
      const c=getComputedStyle(el),r=el.getBoundingClientRect();
      return c.display!=="none"&&c.visibility!=="hidden"&&r.width>0&&r.height>0;
    };
    const questions=[...root.querySelectorAll(".youdo-rolling>.youdo-question")];
    const cards=[...root.querySelectorAll(".welcome-review-card")];
    return {
      phase:document.querySelector("section.page.active")?.id,
      answerMode:root.dataset.answerMode,
      optin:root.dataset.welcomeGroupedReview,
      workMode:root.dataset.workMode,
      windowStart:Number(root.dataset.windowStart||0),
      reviewIndex:Number(root.dataset.reviewIndex||0),
      questionIndexes:questions.map((el,i)=>visible(el)?i:-1).filter(i=>i>=0),
      reviewIndexes:cards.map((el,i)=>visible(el)?i:-1).filter(i=>i>=0),
      leaked:root.querySelectorAll(".youdo-solution").length>0 &&
        [...root.querySelectorAll(".youdo-solution")].filter(visible).length,
      viewportWidth:document.documentElement.clientWidth,
      documentWidth:document.documentElement.scrollWidth,
      buttonLabel:document.querySelector("#advance")?.textContent.trim()
    };
   });
   samples.push(x);
   assert(x.documentWidth<=x.viewportWidth+4,loc,"Welcome page fits viewport",
     JSON.stringify({step:i,width:x.documentWidth,viewport:x.viewportWidth}));
   if(x.phase==="vocabulary")break;
   assert(x.phase==="you-do",loc,"Welcome advances within You Do",JSON.stringify({step:i,phase:x.phase}));
   assert(x.optin==="true",loc,"Welcome grouped review is enabled");
   if(x.answerMode!=="true"){
     assert(x.leaked===0,loc,"Welcome conceals model answers during questions",
       JSON.stringify({step:i,leaked:x.leaked}));
     assert(x.reviewIndexes.length===0,loc,"Welcome conceals marking cards during independent work");
   }
   await page.locator("#advance").evaluate(el=>el.click());
   await page.waitForTimeout(35);
  }
  const questions=samples.filter(x=>x.phase==="you-do"&&x.answerMode!=="true");
  const reviews=samples.filter(x=>x.phase==="you-do"&&x.answerMode==="true");
  const after=samples.at(-1);
  assert(questions.some(x=>x.questionIndexes.length===1&&x.questionIndexes[0]===0),
    loc,"Welcome starts with Code First alone");
  if(viewport.mobile){
    assert(questions.every(x=>x.questionIndexes.length===1),loc,
      "Welcome mobile shows only one independent question");
    assert(reviews.length===4 && reviews.every(x=>x.reviewIndexes.length===1),loc,
      "Welcome mobile reviews Code First and three answers separately",JSON.stringify(reviews.map(x=>x.reviewIndexes)));
  }else{
    assert(questions.some(x=>x.questionIndexes.join(",")==="1,2,3"),loc,
      "Welcome TV shows Q2–Q4 together");
    assert(reviews.length===2 &&
      reviews[0].reviewIndexes.join(",")==="0" &&
      reviews[1].reviewIndexes.join(",")==="1,2,3",loc,
      "Welcome TV reviews Code First then three marking cards together",
      JSON.stringify(reviews.map(x=>x.reviewIndexes)));
  }
  assert(after.phase==="vocabulary",loc,"Welcome reaches Key Vocabulary after marking",
    JSON.stringify({last:after.phase,steps:samples.length}));
  assert(errors.length===0,loc,"Welcome has no JavaScript errors",errors.join(" | "));
  // Test the same shared Exit Ticket's non-verbal response.
  await page.locator('.phase-nav [data-page="exit"]').evaluate(el=>el.click());
  const exit=await page.evaluate(()=>({
    active:document.querySelector("section.page.active")?.id,
    instruction:document.querySelector("#exit .exit-yn-instruction")?.textContent.trim()||"",
    label:document.querySelector("#response-logo")?.getAttribute("aria-label")||""
  }));
  assert(exit.active==="exit"&&/show thumbs up for YES or thumbs down for NO/i.test(exit.instruction),
    loc,"Exit Ticket instructs non-verbal thumbs response",JSON.stringify(exit));
  assert(/Thumbs Up\/Down/i.test(exit.label),loc,"Exit Ticket orange signal matches response",exit.label);
  summaries.push({...loc,steps:samples.length,markScreens:reviews.length,last:after.phase});
 }catch(error){assert(false,loc,"Welcome browser regression completed",String(error).slice(0,700));}
 finally{await context.close();}
}

(async()=>{
 const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
 try{
  for(const v of VIEWPORTS)for(const [course,id] of TARGETS)await audit(browser,course,id,v);
  for(const v of VIEWPORTS)await auditWelcome(browser,v);
 }finally{await browser.close();}
 const summary={screens:summaries.length,checksPassed:checks.filter(x=>x.ok).length,failed:problems.length,
   warnings:warnings.length,problems,warningsDetail:warnings,summaries};
 console.log("SELFMARK_SUMMARY "+JSON.stringify(summary));
 if(process.env.QA_REPORT){fs.mkdirSync("qa-output",{recursive:true});fs.writeFileSync(process.env.QA_REPORT,JSON.stringify(summary,null,2));}
 if(problems.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1});
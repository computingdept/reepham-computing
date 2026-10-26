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
     return {active,mode:host.dataset.answerMode,reviewStart:host.dataset.j277ReviewStart,
       separate:host.dataset.j277SeparateReview,rich:host.dataset.selfMarking,
       windowStart:host.dataset.windowStart,questionCount:questions.length,
       reviewCount:reviews.length,leakedCount:leaked.length,answerText,
       cardMetrics,documentWidth:document.documentElement.scrollWidth,
       viewportWidth:document.documentElement.clientWidth,
       caption:host.querySelector(".youdo-window-progress")?.textContent.trim()||""};
   });
   states.push(s);
   const stateKey=JSON.stringify({active:s.active,mode:s.mode,windowStart:s.windowStart,caption:s.caption,
     questionCount:s.questionCount,reviewCount:s.reviewCount,answer:s.answerText.slice(0,50)});
   if(s.active!=="you-do")break;
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
(async()=>{
 const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
 try{
  for(const v of VIEWPORTS)for(const [course,id] of TARGETS)await audit(browser,course,id,v);
 }finally{await browser.close();}
 const summary={screens:summaries.length,checksPassed:checks.filter(x=>x.ok).length,failed:problems.length,
   warnings:warnings.length,problems,warningsDetail:warnings,summaries};
 console.log("SELFMARK_SUMMARY "+JSON.stringify(summary));
 if(process.env.QA_REPORT){fs.mkdirSync("qa-output",{recursive:true});fs.writeFileSync(process.env.QA_REPORT,JSON.stringify(summary,null,2));}
 if(problems.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1});
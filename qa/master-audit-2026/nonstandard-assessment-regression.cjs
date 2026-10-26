"use strict";
const {chromium}=require("playwright");
const fs=require("node:fs");
const ORIGIN=process.env.QA_ORIGIN||"http://127.0.0.1:8765";
const views=[["TV",1920,1080],["compact TV",1300,635],["phone",390,844]];
const pages=[];
for(const id of ["035","050","094","120","143"]){
 pages.push({course:"j277",id,kind:"lesson",url:"j277/lesson-"+id+"/index.html"});
 pages.push({course:"j277",id,kind:"paper",url:"j277/lesson-"+id+"/assessment.html"});
 pages.push({course:"j277",id,kind:"answers",url:"j277/lesson-"+id+"/answers.html"});
}
pages.push({course:"j277",id:"094",kind:"scheme",url:"j277/lesson-094/assessment-mark-scheme.html"});
for(const id of ["120","143"]){
 pages.push({course:"j277",id,kind:"scheme",url:"j277/lesson-"+id+"/markscheme.html"});
}
for(const id of ["156","157"]){
 pages.push({course:"j277",id,kind:"practice",url:"j277/lesson-"+id+"/index.html"});
}
pages.push({course:"h446",id:"036",kind:"lesson",url:"h446/lesson-036/index.html"});
pages.push({course:"h446",id:"036",kind:"answers",url:"h446/lesson-036/answers.html"});
const failures=[],reviews=[],observations=[];
function fail(where,test,detail){const item={...where,test,detail};failures.push(item);console.log("ASSESS_FAIL "+JSON.stringify(item))}
(async()=>{
 const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
 try{
  for(const [name,width,height] of views){
   const context=await browser.newContext({viewport:{width,height},isMobile:name==="phone",hasTouch:name==="phone"});
   const page=await context.newPage();
   for(const spec of pages){
    const where={view:name,course:spec.course,id:spec.id,kind:spec.kind};
    const errors=[],handler=e=>errors.push(String(e));page.on("pageerror",handler);
    try{
     const response=await page.goto(ORIGIN+"/lessons/"+spec.url,{waitUntil:"domcontentloaded",timeout:25000});
     if(!response?.ok()){fail(where,"URL unavailable",response?.status());continue;}
     if(spec.kind==="answers"&&spec.course==="j277"&&spec.id==="094"){
      await page.waitForURL("**/assessment-mark-scheme.html",{timeout:10000});
     }
     if(spec.kind==="answers"&&spec.course==="j277"&&["035","050"].includes(spec.id)){
      await page.waitForFunction(()=>document.querySelector(".answer-stage"),null,{timeout:15000});
     }
     if(["lesson","practice"].includes(spec.kind)){
      await page.waitForFunction(()=>document.querySelector("#you-do")&&document.querySelector(".phase-nav [data-page='you-do']"),null,{timeout:18000});
      await page.locator(".phase-nav [data-page='you-do']").evaluate(el=>el.click());
      await page.waitForFunction(()=>document.querySelector("section.page.active")?.id==="you-do",null,{timeout:6000});
     }
     if((spec.kind==="paper"||spec.kind==="scheme")&&["120","143"].includes(spec.id)){
      await page.waitForFunction(()=>document.querySelector("#assessment-root .question,#assessment-root .scheme-question"),null,{timeout:12000});
     }
     const s=await page.evaluate(()=>{
      const visible=e=>{const r=e.getBoundingClientRect();return r.width>0&&r.height>0&&!e.closest("[hidden]")};
      const questions=document.querySelectorAll(".question,.exam-card,.scheme-question,.j277-assessment-panel,main section");
      const links=[...document.querySelectorAll('a[href$="assessment.html"]')].map(x=>x.getAttribute("href"));
      const schemes=[...document.querySelectorAll(".scheme-points,.scheme-question")].filter(visible);
      const svgs=[...document.querySelectorAll("svg")].filter(visible);
      const code=[...document.querySelectorAll("pre")].filter(visible);
      return {
       title:document.title,loadedQuestions:questions.length,
       viewportMeta:!!document.querySelector('meta[name="viewport"]'),
       links,schemes:schemes.length,
       paperLeaks:!!document.querySelector("#assessment-root .scheme-points"),
       assessed:!!document.querySelector('#you-do[data-assessment-mode="true"]'),
       width:document.documentElement.scrollWidth,viewWidth:document.documentElement.clientWidth,
       hasError:/Cannot load assessment/i.test(document.body.innerText),
       pageText:document.body.innerText.slice(0,130),
       codeOvers:code.filter(x=>x.scrollWidth>x.clientWidth+40).length,
       svgOvers:svgs.filter(x=>x.parentElement&&x.getBoundingClientRect().width>x.parentElement.getBoundingClientRect().width+25).length,
       visibleAnswers:[...document.querySelectorAll(".answer-stage")].filter(visible).length
      };
     });
     const entry={...where,...s};observations.push(entry);
     console.log("ASSESS_SURVEY "+JSON.stringify(entry));
     if(name==="phone"&&!s.viewportMeta)fail(where,"mobile viewport metadata absent");
     if(errors.length||s.hasError)fail(where,"assessment rendering error",{errors:errors.slice(0,2),message:s.pageText});
     if(s.width>s.viewWidth+5)fail(where,"horizontal viewport overflow",{page:s.width,viewport:s.viewWidth});
     if(["paper","scheme"].includes(spec.kind)&&!s.loadedQuestions&&!s.schemes)
       fail(where,"question or marking content absent",s);
     if(spec.kind==="paper"&&s.paperLeaks)fail(where,"pupil paper leaks mark scheme");
     if(spec.kind==="lesson"&&spec.course==="j277"&&(!s.assessed||s.links.length!==1))
       fail(where,"assessment launch missing",{assessmentMode:s.assessed,links:s.links});

     // These three teacher-answer interfaces have staged solutions.
     // Check that counters, Previous and Next reveal exactly one solution.
     if(spec.kind==="answers"&&
       (spec.course==="h446"&&spec.id==="036"||
        spec.course==="j277"&&["035","050"].includes(spec.id))){
      const stageState=async()=>page.evaluate(()=>{
       const stages=[...document.querySelectorAll(".answer-stage")];
       const visible=stages.filter(el=>!el.hidden&&getComputedStyle(el).display!=="none");
       return {total:stages.length,visible:visible.length,
        index:stages.findIndex(el=>!el.hidden),
        counter:document.getElementById("answer-counter")?.textContent?.trim()||"",
        previousDisabled:document.getElementById("previous-answer")?.disabled,
        nextLabel:document.getElementById("next-answer")?.textContent?.trim()||""};
      });
      const first=await stageState();
      if(first.total<2||first.visible!==1||first.index!==0||!first.previousDisabled||
         !first.counter.includes("1 of "+first.total))
       fail(where,"staged marking initial screen",first);
      for(let step=1;step<first.total;step++){
       await page.locator("#next-answer").click();
       const after=await stageState();
       if(after.visible!==1||after.index!==step||
          !after.counter.includes((step+1)+" of "+first.total))
        fail(where,"one-answer Next navigation",{step,after});
      }
      if(first.total>1){
       await page.locator("#previous-answer").click();
       const back=await stageState();
       if(back.visible!==1||back.index!==first.total-2||
          !back.counter.includes((first.total-1)+" of "+first.total))
        fail(where,"Previous restores prior marking screen",back);
      }
     }
     if(s.codeOvers)reviews.push({...where,issue:"horizontally scrolling code",count:s.codeOvers});
     if(s.svgOvers)reviews.push({...where,issue:"oversized SVG",count:s.svgOvers});
    }catch(e){fail(where,"browser survey exception",String(e).slice(0,350))}
    finally{page.off("pageerror",handler);}
   }
   await context.close();
  }
 }finally{await browser.close();}
 const summary={pages:pages.length,screens:observations.length,failures:failures.length,warnings:reviews.length,failed:failures,review:reviews,observations};
 console.log("ASSESSMENT_AUDIT_SUMMARY "+JSON.stringify({...summary,observations:undefined,failed:failures.slice(0,15),review:reviews.slice(0,15)}));
 if(process.env.QA_REPORT){fs.mkdirSync("qa-output",{recursive:true});fs.writeFileSync(process.env.QA_REPORT,JSON.stringify(summary,null,2));}
 if(failures.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1});

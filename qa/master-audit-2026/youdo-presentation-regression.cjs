"use strict";
// Formatting/behaviour QA ONLY. Does not assert question accuracy or change content.
const {chromium}=require("playwright");
const fs=require("node:fs");
const path=require("node:path");
const ORIGIN=process.env.QA_ORIGIN||"http://127.0.0.1:8765";
const SHARDS=+process.env.QA_SHARDS||1;
const SHARD=+process.env.QA_SHARD||0;
const VIEWS=[
  {name:"classroom TV",width:1920,height:1080},
  {name:"compact TV",width:1300,height:635},
  {name:"phone",width:390,height:844}
].filter(v=>!process.env.QA_VIEWS||process.env.QA_VIEWS.split(",").includes(v.name));
let lessons=Object.fromEntries(["j277","h446"].map(course=>[course,
 fs.readdirSync(path.join("lessons",course),{withFileTypes:true})
 .filter(x=>x.isDirectory()&&/^lesson-\d{3}$/.test(x.name))
 .map(x=>x.name.slice(-3))
 .filter(id=>fs.existsSync(path.join("lessons",course,"lesson-"+id,"index.html")))
 .filter(id=>!(course==="j277"&&id==="113")).sort()
]));
const filter=process.env.QA_LESSONS?.split(",").map(x=>x.trim())||null;
const targets=Object.entries(lessons).flatMap(([course,ids])=>ids
 .filter(id=>!filter||filter.includes(id)||filter.includes(course+":"+id))
 .map(id=>({course,id}))).filter((_,i)=>i%SHARDS===SHARD);
let passed=0,failed=[],warnings=[],metrics={loaded:0,withSvg:0,withAnswers:0,withQuestions:0};
function record(ok,type,where,details=""){
 if(ok){passed++;return;}
 const item={...where,type,details};
 failed.push(item);
 console.log("YOUDO_FAIL "+JSON.stringify(item));
}
function warn(type,where,details=""){
 const item={...where,type,details};warnings.push(item);
 console.log("YOUDO_WARN "+JSON.stringify(item));
}
async function test(browser,target,view){
 const {course,id}=target,where={course,lesson:id,view:view.name};
 const context=await browser.newContext({viewport:{width:view.width,height:view.height},
    isMobile:view.name==="phone",hasTouch:view.name==="phone"});
 const page=await context.newPage();
 const jsErrors=[];
 page.on("pageerror",e=>jsErrors.push(e.message));
 try{
  await page.goto(ORIGIN+"/lessons/"+course+"/lesson-"+id+"/index.html",
    {waitUntil:"domcontentloaded",timeout:25000});
  await page.waitForFunction(()=>!!document.getElementById("you-do") &&
    !!document.querySelector(".phase-nav [data-page='you-do']") &&
    !!document.getElementById("advance"),null,{timeout:20000});
  // Use phase selection only as a setup step; mobile phase buttons are intentionally hidden.
  await page.locator('.phase-nav [data-page="you-do"]').evaluate(el=>el.click());
  await page.waitForTimeout(20);
  metrics.loaded++;
  const first=await page.evaluate(()=>{
    const section=document.getElementById("you-do");
    const all=[...section.querySelectorAll(".youdo-question")];
    const isVisible=el=>{
      const r=el.getBoundingClientRect(),s=getComputedStyle(el);
      return r.width>0&&r.height>0&&s.display!=="none"&&s.visibility!=="hidden"
        &&!el.closest("[hidden]");
    };
    const visible=all.filter(isVisible);
    const svg=[...visible.flatMap(q=>[...q.querySelectorAll("svg")])].filter(isVisible);
    const diagrams=svg.map(s=>{
      const r=s.getBoundingClientRect();
      const card=s.closest(".youdo-question")?.getBoundingClientRect();
      const vb=s.viewBox.baseVal;
      const txt=[...s.querySelectorAll("text")];
      let collisions=0,checked=0;
      // Compare only siblings at almost the same vertical level, which helps flag
      // distinct-place-value labels that overlap after the SVG is scaled down.
      for(let i=0;i<txt.length;i++)for(let j=i+1;j<txt.length;j++){
        const a=txt[i].getBoundingClientRect(),b=txt[j].getBoundingClientRect();
        if(a.width<=0||b.width<=0||Math.abs((a.y+a.height/2)-(b.y+b.height/2))>Math.max(2,a.height*.4))continue;
        checked++;
        const overlap=Math.min(a.right,b.right)-Math.max(a.left,b.left);
        if(overlap>Math.min(a.width,b.width)*.28)collisions++;
      }
      return{w:Math.round(r.width),h:Math.round(r.height),cardW:Math.round(card?.width||0),
        vbW:vb.width,vbH:vb.height,textCount:txt.length,collisions,checked};
    });
    const answerElements=[...section.querySelectorAll(
      ".youdo-solution,.h446-marking-screen,.h446-rich-review,.h446-marking-body,.h446-rich-stage,.j277-selfmark,.selfmark-screen,[data-review-screen]"
    )];
    const leaked=answerElements.filter(isVisible).map(x=>x.className).slice(0,5);
    const clipped=visible.map((q,i)=>{
      const r=q.getBoundingClientRect(),cs=getComputedStyle(q);
      return{i,h:Math.round(r.height),scroll:q.scrollHeight,client:q.clientHeight,
        bottom:Math.round(r.bottom),parentBottom:Math.round(section.getBoundingClientRect().bottom),
        overflow:cs.overflowY,contents:Math.round(q.scrollHeight-q.clientHeight)};
    });
    const documentWidth=document.documentElement.scrollWidth,
      viewportWidth=document.documentElement.clientWidth;
    return{
      active:section.classList.contains("active"),mode:section.dataset.answerMode,
      all:all.length,visible:visible.length,hiddenVisible:all.filter(x=>x.hidden&&isVisible(x)).length,
      answers:answerElements.length,leaked,svg:diagrams,
      clipped,viewportWidth,documentWidth,windowSize:section.dataset.windowSize||null,
      codingFirst:section.dataset.codingFirst,questionContainer:!!section.querySelector(".youdo-deck"),
      qClasses:visible.map(x=>x.className).slice(0,4),
      cardTexts:visible.map(x=>x.textContent.trim().replace(/\s+/g," ").slice(0,95)).slice(0,4)
    };
  });
  if(first.svg.length)metrics.withSvg++;
  if(first.answers)metrics.withAnswers++;
  if(first.all)metrics.withQuestions++;
  record(first.active,"You Do phase visible",where,JSON.stringify({active:first.active}));
  if(!first.all&&!first.questionContainer)
    warn("Custom You Do assessment layout; separate structural review",where);
  else record(true,"Standard You Do question structure exists",where);
  record(first.hiddenVisible===0,"Hidden questions absent from layout",where,
    JSON.stringify({hiddenVisible:first.hiddenVisible}));
  record(first.leaked.length===0,"Model answers concealed in independent work",where,
    JSON.stringify({leaked:first.leaked,mode:first.mode}));
  record(first.documentWidth<=first.viewportWidth+4,"No horizontal page overflow",where,
    JSON.stringify({width:first.documentWidth,viewport:first.viewportWidth}));
  for(const diagram of first.svg){
    record(diagram.w>0&&diagram.h>0&&diagram.vbW>0,"Visible SVG has nonzero dimensions",where,
      JSON.stringify(diagram));
    record(diagram.w<=diagram.cardW+12,"SVG fits its question card",where,
      JSON.stringify(diagram));
    if(diagram.collisions)warn("SVG text-label collision",where,JSON.stringify(diagram));
    if(diagram.w<300 && diagram.textCount>=12)
      warn("Dense labelled diagram narrow on screen",where,JSON.stringify(diagram));
  }
  for(const clipped of first.clipped){
    if(clipped.contents>25 && clipped.overflow==="hidden")
       warn("You Do question content clipped inside card",where,JSON.stringify(clipped));
    if(clipped.bottom>clipped.parentBottom+24 && view.name!=="phone")
       warn("You Do question card exceeds phase height",where,JSON.stringify(clipped));
  }
  if(view.name==="phone"&&first.all)
    record(first.visible===1,"Phone shows exactly one You Do question",where,
      JSON.stringify({count:first.visible,windowSize:first.windowSize,cardTexts:first.cardTexts}));
  // Scan all remaining independent diagrams by exposing ONE question at a time
  // inside this disposable browser context. Do not change real lesson contents
  // or persist any authoring changes. This catches Q3 in J277 Lesson 001.
  const additional=await page.evaluate(()=>{
    const p=document.getElementById("you-do"),questions=[...p.querySelectorAll(".youdo-question")];
    const original=questions.map(q=>q.hidden),out=[];
    for(let i=0;i<questions.length;i++){
      questions.forEach((q,j)=>q.hidden=i!==j);
      const q=questions[i],card=q.getBoundingClientRect();
      for(const svg of q.querySelectorAll("svg")){
        const s=svg.getBoundingClientRect(),cs=getComputedStyle(svg);
        if(s.width===0||s.height===0||cs.display==="none"||svg.closest("[hidden]"))continue;
        const text=[...svg.querySelectorAll("text")];
        let overlap=0;
        for(let a=0;a<text.length;a++)for(let b=a+1;b<text.length;b++){
          const x=text[a].getBoundingClientRect(),y=text[b].getBoundingClientRect();
          if(Math.abs((x.top+x.height/2)-(y.top+y.height/2))>Math.max(2,x.height*.4))continue;
          const horizontal=Math.min(x.right,y.right)-Math.max(x.left,y.left);
          if(horizontal>Math.min(x.width,y.width)*.28)overlap++;
        }
        out.push({question:i+1,width:Math.round(s.width),height:Math.round(s.height),
          cardWidth:Math.round(card.width),textCount:text.length,overlaps:overlap,
          kind:svg.getAttribute("aria-label")?.slice(0,75)||""});
      }
    }
    questions.forEach((q,i)=>q.hidden=original[i]);
    return out;
  });
  for(const d of additional){
    record(d.width>0&&d.height>0,"Question SVG draws at nonzero dimensions",where,JSON.stringify(d));
    record(d.width<=d.cardWidth+12,"Question SVG stays inside its card",where,JSON.stringify(d));
    if(d.overlaps>0)warn("Question SVG text overlaps",where,JSON.stringify(d));
    if(d.width<300 && d.textCount>=12)warn("Dense question SVG needs legibility review",where,JSON.stringify(d));
  }
  // Confirm progression to independent questions does not unexpectedly expose answers.
  if(first.all>1){
    await page.locator("#advance").evaluate(el=>el.click());
    const later=await page.evaluate(()=>{
      const p=document.getElementById("you-do");
      const items=[...p.querySelectorAll(".youdo-question")];
      const visible=x=>x.getBoundingClientRect().height>0&&!x.closest("[hidden]");
      return{phase:document.querySelector("section.page.active")?.id,
        count:items.filter(visible).length,answerMode:p.dataset.answerMode,
        leaked:[...p.querySelectorAll(".youdo-solution,.h446-marking-screen,.h446-rich-review")].some(visible)};
    });
    record(later.phase==="you-do","Next stays in You Do during initial work",where,JSON.stringify(later));
    record(!later.leaked,"No early model-answer reveal after first advance",where,JSON.stringify(later));
  }
  record(jsErrors.length===0,"No uncaught browser errors",where,jsErrors.join("; "));
 }catch(e){record(false,"Browser test completed",where,String(e).slice(0,500))}
 finally{await context.close()}
}
(async()=>{
 const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
 try{for(const view of VIEWS)for(const target of targets)await test(browser,target,view)}
 finally{await browser.close()}
 const summary={shard:SHARD,shards:SHARDS,lessons:targets.length,viewports:VIEWS.map(x=>x.name),
  passed,failures:failed.length,warnings:warnings.length,metrics,failed,warningsDetail:warnings};
 console.log("YOUDO_AUDIT_SUMMARY "+JSON.stringify(summary));
 if(process.env.QA_REPORT){
  fs.mkdirSync(path.dirname(process.env.QA_REPORT),{recursive:true});
  fs.writeFileSync(process.env.QA_REPORT,JSON.stringify(summary,null,2)+"\n")
 }
 if(failed.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1});
"use strict";
const {chromium}=require("playwright");
const fs=require("node:fs");
const path=require("node:path");
const COURSES={
  j277:["001","002","019","024","035","050","059","080","096","109","131","141","164"],
  h446:["001","024","068","082","093","104","131","146","181","182","183","184","187","205","220","240","279","320"]
};
// In comprehensive mode enumerate existing pages directly from the checked-out
// repository, excluding 113: a documented standalone revision experience without
// the standard eight-phase lesson interface.
if(process.env.QA_FORMAT_ALL==="1"){
 for(const course of Object.keys(COURSES)){
   COURSES[course]=fs.readdirSync(path.join("lessons",course),{withFileTypes:true})
     .filter(x=>x.isDirectory()&&/^lesson-\d{3}$/.test(x.name))
     .map(x=>x.name.slice(-3))
     .filter(id=>fs.existsSync(path.join("lessons",course,"lesson-"+id,"index.html")))
     .filter(id=>!(course==="j277"&&id==="113"))
     .sort();
 }
}
const SHARD_COUNT=Number(process.env.QA_FORMAT_SHARDS||1);
const SHARD_INDEX=Number(process.env.QA_FORMAT_SHARD||0);
const VIEWPORTS=[
  {name:"TV 1080p",width:1920,height:1080},
  {name:"compact TV",width:1300,height:635},
  {name:"mobile",width:390,height:844}
];
const ORIGIN=process.env.QA_ORIGIN||"http://127.0.0.1:8765";
const FILTER=process.env.QA_FORMAT_IDS?.split(",").map(x=>x.trim()).filter(Boolean)||null;
const SIZES=process.env.QA_FORMAT_SIZES?.split(",").map(x=>x.trim()).filter(Boolean)||null;
const issues=[],watches=[];
let pass=0;
function result(ok,course,id,view,label,detail=""){
  const entry={course,lesson:id,view,label,detail};
  if(ok){pass++;return;}
  issues.push(entry);
  console.log("FAIL "+JSON.stringify(entry));
}
function watch(course,id,view,label,detail=""){
  const entry={course,lesson:id,view,label,detail};
  watches.push(entry);
  console.log("REVIEW "+JSON.stringify(entry));
}
async function auditPage(browser,course,id,view){
 const context=await browser.newContext({viewport:{width:view.width,height:view.height},isMobile:view.name==="mobile",hasTouch:view.name==="mobile"});
 const page=await context.newPage();
 let exceptions=[];
 page.on("pageerror",e=>exceptions.push(String(e)));
 try{
   await page.goto(ORIGIN+"/lessons/"+course+"/lesson-"+id+"/index.html",{waitUntil:"domcontentloaded",timeout:25000});
   await page.waitForFunction(()=>!!document.querySelector("#i-do")&&!!document.querySelector("#we-do")&&!!document.querySelector("#advance"),{},{timeout:20000});
   const initial=await page.evaluate(()=>({
     phases:[...document.querySelectorAll("section.page")].map(x=>x.id),
     engine:!!document.querySelector('script[src*="assets/h446-lesson/lesson.js"]')
   }));
   result(initial.phases.includes("i-do")&&initial.phases.includes("we-do"),course,id,view.name,"Phase sections exist");
   result(initial.engine,course,id,view.name,"Shared navigation engine loaded");
   for(const phase of ["i-do","we-do"]){
     await page.locator('.phase-nav [data-page="'+phase+'"]').evaluate(x=>x.click());
     const payload=await page.evaluate(phase=>{
       const sect=document.getElementById(phase);
       const flag=phase==="i-do"?"ido":"wedo";
       const elements=[...sect.querySelectorAll("."+flag+"-example")];
       const visible=e=>{const r=e.getBoundingClientRect();return r.width>0&&r.height>0&&!e.closest("[hidden]")&&getComputedStyle(e).display!=="none"};
       const stages=elements.length?[...elements[0].querySelectorAll("."+flag+"-step")]:[];
       const active=document.querySelector("section.page.active");
       const boxes=elements[0]?[...elements[0].querySelectorAll(".ido-reference,.ido-method,.wedo-reference,.wedo-practice,.model-card,.h446-panel,.algorithm-panel,.route-pane")].filter(x=>x.getBoundingClientRect().width>0):[];
       const rect=boxes.map(x=>({name:x.className,w:Math.round(x.getBoundingClientRect().width),h:Math.round(x.getBoundingClientRect().height),x:Math.round(x.getBoundingClientRect().x)}));
       const bounds=sect.getBoundingClientRect();
       const overflowing=[...sect.querySelectorAll("pre,svg,img")].filter(x=>visible(x)).filter(x=>{
         const r=x.getBoundingClientRect();
         const anc=x.parentElement?.getBoundingClientRect();
         return r.width>window.innerWidth+4||(anc&&r.width>anc.width+30);
       }).slice(0,5).map(x=>x.tagName+":"+Math.round(x.getBoundingClientRect().width));
       const current=[...elements].filter(visible);
       const hiddenVisible=elements.filter(x=>x.hidden&&visible(x)).length;
       const hiddenStagesVisible=stages.filter(x=>x.hidden&&visible(x)).length;
       return{
         active:active?.id,phaseVisible:visible(sect),count:elements.length,visibleCount:current.length,
         hiddenVisible,stepCount:stages.length,visibleStages:stages.filter(visible).length,hiddenStagesVisible,
         scrollWidth:document.documentElement.scrollWidth,viewport:document.documentElement.clientWidth,
         boxes:rect,overflowing,phaseHeight:Math.round(bounds.height),
         heightExcess:sect.scrollHeight-sect.clientHeight,
         phaseOverflow:getComputedStyle(sect).overflowY
       };
     },phase);
     // Targeted compact-TV diagram layouts must preserve every staged figure,
     // put them with the model on short screens, and restore the source position
     // on ordinary TV/mobile. A missing or misplaced diagram is a hard failure.
     const hasCompactScript=await page.locator('script[src*="compact-tv-model-layout.js"]').count()>0;
     if(hasCompactScript){
       const layout=await page.evaluate(phase=>{
         const section=document.getElementById(phase);
         const selected=section.querySelector(".ido-example,.wedo-example");
         const grid=selected?.querySelector(".h13-grid,.s-grid,.v13-grid,.p-grid,.p23-grid");
         const cards=grid?[...grid.children].filter(e=>e.matches(".h13-pane,.h13-panel,.s-panel,.v13-panel,.p-panel,.p23-panel")):[];
         const figures=[...section.querySelectorAll(".compact-tv-model-figure")];
         const staged=figures.filter(el=>el.hidden);
         return {pairs:cards.length,figures:figures.length,inRight:figures.length>0&&figures.every(x=>cards[1]?.contains(x)),hiddenCount:staged.length};
       },phase);
       const short=view.width>=901&&view.height<=700;
       result(short?layout.pairs===2&&layout.figures>=1&&layout.inRight:
         layout.figures===0,course,id,view.name,phase+" staged diagrams in expected panel",JSON.stringify(layout));
     }
     if(payload.count===0){
       watch(course,id,view.name,phase+" non-standard example layout","No ."+(phase==="i-do"?"ido":"wedo")+"-example found");
       continue;
     }
     result(payload.active===phase&&payload.phaseVisible,course,id,view.name,phase+" opens visibly",JSON.stringify(payload));
     result(payload.visibleCount===1,course,id,view.name,phase+" exactly one example rendered",JSON.stringify(payload));
     result(payload.hiddenVisible===0&&payload.hiddenStagesVisible===0,course,id,view.name,phase+" hidden elements absent from layout",JSON.stringify(payload));
     result(payload.scrollWidth<=payload.viewport+5,course,id,view.name,phase+" document has no horizontal overflow",JSON.stringify(payload));
     result(payload.overflowing.length===0,course,id,view.name,phase+" code and diagram width fits panel",JSON.stringify(payload));
     if(view.name!=="mobile"&&payload.boxes.length>=2){
       // Two visible cards under a 50/50 teaching layout must not each be squeezed
       // into approximately one quarter of the available width.
       const big=payload.boxes.filter(x=>x.w>0).slice(0,2);
       const min=Math.min(...big.map(x=>x.w));
       if(min<Math.min(330,view.width*.24))result(false,course,id,view.name,phase+" quarter-width teaching panel",JSON.stringify(big));
     }
     if(payload.heightExcess>40&&payload.phaseOverflow==="hidden"){
       watch(course,id,view.name,phase+" possible vertical clipping","excess "+payload.heightExcess+"px");
     }
     if(payload.stepCount){
       result(payload.visibleStages===0,course,id,view.name,phase+" starts with modelling answer concealed",JSON.stringify(payload));
       await page.locator("#advance").evaluate(x=>x.click());
       const after=await page.evaluate(phase=>{
         const p=document.getElementById(phase),key=phase==="i-do"?"ido":"wedo";
         const visible=[...p.querySelectorAll("."+key+"-example")].find(x=>!x.hidden);
         const stages=visible?[...visible.querySelectorAll("."+key+"-step")]:[];
         return {phase:document.querySelector("section.page.active")?.id,
           count:stages.filter(x=>!x.hidden&&x.getBoundingClientRect().height>0).length};
       },phase);
       result(after.phase===phase&&after.count===1,course,id,view.name,phase+" reveals only first model step",JSON.stringify(after));
       await page.locator("#previous").evaluate(x=>x.click());
       const back=await page.evaluate(phase=>{
         const p=document.getElementById(phase),key=phase==="i-do"?"ido":"wedo";
         return [...p.querySelectorAll("."+key+"-step")].every(x=>x.hidden);
       },phase);
       result(back,course,id,view.name,phase+" Previous conceals first model step");
     }
   }
   result(exceptions.length===0,course,id,view.name,"No uncaught browser errors",exceptions.join(" ; "));
 }catch(e){result(false,course,id,view.name,"Page test completed",String(e).slice(0,500));}
 finally{await context.close();}
}
(async()=>{
 const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
 try{
   const targets=Object.entries(COURSES).flatMap(([course,ids])=>ids
     .filter(id=>!FILTER||FILTER.includes(course+":"+id)||FILTER.includes(id))
     .map(id=>({course,id})));
   const work=targets.filter((_,idx)=>idx%SHARD_COUNT===SHARD_INDEX);
   for(const view of VIEWPORTS.filter(v=>!SIZES||SIZES.some(x=>v.name.includes(x))))
     for(const {course,id} of work) await auditPage(browser,course,id,view);
 }finally{await browser.close();}
 const summary={testedSamples:Object.entries(COURSES).flatMap(([course,a])=>a.filter(id=>!FILTER||FILTER.includes(course+":"+id)||FILTER.includes(id))).filter((_,idx)=>idx%SHARD_COUNT===SHARD_INDEX).length,
  viewports:VIEWPORTS.filter(v=>!SIZES||SIZES.some(x=>v.name.includes(x))).map(x=>x.name),
  mode:process.env.QA_FORMAT_ALL==="1"?"whole-course":"representative",shardIndex:SHARD_INDEX,shardCount:SHARD_COUNT,
  checksPassed:pass,failures:issues.length,reviewFlags:watches.length,issues,watches};
 if(process.env.QA_REPORT){fs.mkdirSync(path.dirname(process.env.QA_REPORT),{recursive:true});fs.writeFileSync(process.env.QA_REPORT,JSON.stringify(summary,null,2)+"\n")}
 console.log("FORMAT_AUDIT_SUMMARY "+JSON.stringify(summary));
 // Visible structural/navigation regression is a CI failure. Review flags alone
 // are triage evidence, not hard failure or proof of a defect.
 if(issues.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1});

"use strict";
const fs=require("node:fs");
const path=require("node:path");
const {chromium}=require("playwright");
const ROOT=process.env.QA_ORIGIN||"http://127.0.0.1:8765";
const VIEWS=[{name:"tv",width:1920,height:1080},{name:"compact",width:1300,height:635},{name:"mobile",width:390,height:844}];
const SHARDS=Number(process.env.QA_SHARDS||1),SHARD=Number(process.env.QA_SHARD||0);
const ONLY=process.env.QA_ONLY?.split(",").filter(Boolean)||null;
const COURSES=["j277","h446"];
const targets=COURSES.flatMap(course=>fs.readdirSync(path.join("lessons",course),{withFileTypes:true})
 .filter(x=>x.isDirectory()&&/^lesson-\d{3}$/.test(x.name))
 .map(x=>({course,id:x.name.slice(-3)}))
 .filter(x=>fs.existsSync(path.join("lessons",course,"lesson-"+x.id,"index.html")))
 .filter(x=>!(x.course==="j277"&&x.id==="113"))
).sort((a,b)=>a.course.localeCompare(b.course)||a.id.localeCompare(b.id));
const selected=targets.filter(x=>!ONLY||ONLY.includes(x.course+":"+x.id)||ONLY.includes(x.id))
 .filter((_,i)=>i%SHARDS===SHARD);
const fails=[],watch=[],stats={lessons:selected.length,views:VIEWS.length,checks:0,questions:0,svgs:0,nonstandard:0,variants:{}};
function check(cond,loc,tag,detail=""){
 if(cond){stats.checks++;return}
 const item={...loc,tag,detail};fails.push(item);console.log("FAIL "+JSON.stringify(item));
}
function flag(loc,tag,detail=""){
 const item={...loc,tag,detail};watch.push(item);console.log("REVIEW "+JSON.stringify(item));
}
async function audit(browser,{course,id},view){
 const context=await browser.newContext({viewport:{width:view.width,height:view.height},
  hasTouch:view.name==="mobile",isMobile:view.name==="mobile"});
 const page=await context.newPage();
 const loc={course,id,view:view.name};
 const errors=[];
 page.on("pageerror",e=>errors.push(String(e.message||e)));
 try{
  await page.goto(ROOT+"/lessons/"+course+"/lesson-"+id+"/index.html",{waitUntil:"domcontentloaded",timeout:24000});
  await page.waitForFunction(()=>!!document.querySelector("#you-do")&&!!document.querySelector("#advance"),null,{timeout:24000});
  await page.locator('.phase-nav [data-page="you-do"]').evaluate(e=>e.click());
  await page.waitForTimeout(40);
  const r=await page.evaluate(()=>{
   const phase=document.getElementById("you-do");
   const rect=x=>x.getBoundingClientRect();
   const visible=x=>{
     const b=rect(x),cs=getComputedStyle(x);
     return b.width>0&&b.height>0&&cs.display!=="none"&&cs.visibility!=="hidden"
       &&!x.closest("[hidden]");
   };
   const qs=[...phase.querySelectorAll(".youdo-question")];
   const seen=qs.filter(visible);
   const allSvg=[...phase.querySelectorAll("svg")];
   const svgVisual=allSvg.filter(visible);
   const results=[];
   for(const q of seen){
     const qbox=rect(q);
     const data={width:qbox.width,client:q.clientWidth,scroll:q.scrollWidth,
       h:qbox.height,scrollHeight:q.scrollHeight,clientHeight:q.clientHeight,
       text:!!q.querySelector(".question-text"),svgs:[],answers:[]};
     for(const svg of q.querySelectorAll("svg")){
       if(!visible(svg))continue;
       const b=rect(svg),p=svg.parentElement?rect(svg.parentElement):qbox;
       data.svgs.push({w:Math.round(b.width),h:Math.round(b.height),
         outer:Math.round(p.width),clip:b.right>p.right+9||b.left<p.left-9});
     }
     for(const x of q.querySelectorAll(".youdo-solution,[data-model-answer],.k29-model-answer")){
       if(visible(x))data.answers.push({cl:x.className,head:x.textContent.trim().slice(0,100)});
     }
     results.push(data);
   }
   return {phase:document.querySelector("section.page.active")?.id,total:qs.length,visible:seen.length,
     maxExpected:window.matchMedia("(max-width:700px)").matches?1:
       Math.max(1,Number(phase.dataset.windowSize||3)),
     firstIsCode:phase.dataset.codingFirst==="true",answerMode:phase.dataset.answerMode,
     selfMarking:phase.dataset.selfMarking,reviewMode:phase.dataset.j277SeparateReview,
     h446Rich:!!phase.querySelector(".h446-rich-review"),h446Grouped:!!phase.querySelector(".h446-marking-screen"),
     documentWidth:document.documentElement.scrollWidth,viewport:document.documentElement.clientWidth,
     phaseScrollH:phase.scrollHeight,phaseClientH:phase.clientHeight,phaseOverflow:getComputedStyle(phase).overflowY,
     svgTotal:allSvg.length,svgVisible:svgVisual.length,visibleAnswerNodes:results.flatMap(x=>x.answers),
     cardData:results,
     diagram154:(()=>{
       if(!location.pathname.includes("j277/lesson-001"))return null;
       const q=[...qs].find(x=>x.textContent.includes("154"));
       if(!q)return {exists:false};
       const svg=q.querySelector("svg"),texts=[...(svg?.querySelectorAll("text")||[])];
       const top=texts.slice(0,16).filter(x=>["128","64","32","16","8","4","2","1"].includes(x.textContent.trim()))
         .map(x=>({label:x.textContent.trim(),x:Number(x.getAttribute("x")),bbox:x.getBBox().width}));
       return {exists:!!svg,labels:top,svgWidth:svg?.getBoundingClientRect().width||0,
         zeroCount:texts.filter(x=>x.textContent.trim()==="0").length};
     })()
   };
  });
  stats.questions+=r.total;stats.svgs+=r.svgTotal;
  const variant=r.reviewMode==="true"?"j277-separate-review":r.h446Grouped?"h446-grouped":
    r.h446Rich?"h446-rich":r.firstIsCode?"code-first":
    r.total===0?"nonstandard":"regular";
  stats.variants[variant]=(stats.variants[variant]||0)+1;
  check(r.phase==="you-do",loc,"You Do phase opens visibly");
  check(r.documentWidth<=r.viewport+5,loc,"No document horizontal overflow",
    "document "+r.documentWidth+" viewport "+r.viewport);
  if(r.total===0){stats.nonstandard++;flag(loc,"No standard .youdo-question","Standalone/staged layout requires separate QA");return;}
  check(r.visible>=1&&r.visible<=r.maxExpected,loc,"Correct question window",
     "visible "+r.visible+" / requested "+r.maxExpected);
  if(view.name==="mobile")check(r.visible===1,loc,"Mobile shows exactly one question","visible "+r.visible);
  check(r.visibleAnswerNodes.length===0,loc,"No model answers exposed in independent questions",
   JSON.stringify(r.visibleAnswerNodes));
  for(const [idx,c] of r.cardData.entries()){
    check(c.width<=r.viewport+5,loc,"Visible Q"+(idx+1)+" card fits viewport",String(c.width));
    check(c.scroll<=c.client+8,loc,"Visible Q"+(idx+1)+" content fits card width",
      "scroll "+c.scroll+" client "+c.client);
    for(const [k,svg] of c.svgs.entries())
      check(!svg.clip,loc,"Q SVG "+idx+":"+k+" remains inside question column",JSON.stringify(svg));
    if(c.scrollHeight>c.clientHeight+40&&r.phaseOverflow==="hidden")
      flag(loc,"Potential clipped question card","scrollH "+c.scrollHeight+" clientH "+c.clientHeight);
  }
  if(r.phaseScrollH>r.phaseClientH+40&&r.phaseOverflow==="hidden")
    flag(loc,"Potential vertically clipped You Do phase",
      "overflow "+(r.phaseScrollH-r.phaseClientH)+"px; visible "+r.visible+" of "+r.total);
  check(errors.length===0,loc,"No browser script errors",errors.join(" | "));
  if(r.diagram154){
    const diag=r.diagram154;
    check(diag.exists&&diag.labels.length===8,loc,"Lesson 001 binary SVG has eight place-value labels",JSON.stringify(diag));
    const xs=diag.labels.map(x=>x.x);
    check(xs.every((x,i)=>i===0||x>xs[i-1]),loc,"Lesson 001 place values occupy distinct SVG columns",
      JSON.stringify(diag.labels));
    flag(loc,"Lesson 001 content consideration (not formatting failure)",
      "Q3 repeats 154 from New Learning and displays "+diag.zeroCount+" zero bit cells");
  }
  // Verify the NEXT question window genuinely advances, with a single question on mobile.
  if(r.total>r.maxExpected&&!r.h446Rich&&!r.h446Grouped){
    const prior=await page.locator("#you-do").getAttribute("data-window-start")||"0";
    await page.locator("#advance").evaluate(e=>e.click());
    await page.locator("#advance").evaluate(e=>e.click());
    const moved=await page.evaluate(()=>{
      const q=document.getElementById("you-do");
      return {active:document.querySelector("section.page.active")?.id,
       start:q.dataset.windowStart,answerMode:q.dataset.answerMode,
       shown:[...q.querySelectorAll(".youdo-question")].filter(x=>{
         let r=x.getBoundingClientRect();return r.width>0&&r.height>0;
       }).length};
    });
    if(moved.active==="you-do"&&moved.answerMode!=="true"){
      check(Number(moved.start)>Number(prior)||r.reviewMode==="true",loc,"You Do advances question window",
        JSON.stringify(moved));
      if(view.name==="mobile")check(moved.shown===1,loc,"Next mobile question remains one-per-screen",JSON.stringify(moved));
    }
  }
 }catch(e){check(false,loc,"Audit completed",String(e).slice(0,450))}
 finally{await context.close();}
}
(async()=>{
 const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
 try{for(const v of VIEWS)for(const item of selected)await audit(browser,item,v)}
 finally{await browser.close();}
 const summary={shard:SHARD,shards:SHARDS,...stats,hardFailures:fails.length,reviewFlags:watch.length,
   failures:fails,watch};
 const out=process.env.QA_REPORT;
 if(out){fs.mkdirSync(path.dirname(out),{recursive:true});fs.writeFileSync(out,JSON.stringify(summary,null,2)+"\n")}
 console.log("YOUDO_AUDIT_SUMMARY "+JSON.stringify(summary));
 if(fails.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1});

"use strict";
/* Shared yellow marker regression — read-only browser check, no lesson changes.
   Covers all standard J277/H446 lesson pages on classroom TV and phone. */
const {chromium}=require("playwright");
const fs=require("node:fs"),path=require("node:path");
const SHARDS=Number(process.env.QA_MARKER_SHARDS||4);
const SHARD=Number(process.env.QA_MARKER_SHARD||0);
const ORIGIN=process.env.QA_ORIGIN||"http://127.0.0.1:8765";
const lessons=[];
for(const course of ["j277","h446"]){
  const base=path.join("lessons",course);
  for(const dir of fs.readdirSync(base,{withFileTypes:true})){
    if(!dir.isDirectory()||!/^lesson-\d{3}$/.test(dir.name))continue;
    const id=dir.name.slice(-3);
    if(course==="j277"&&id==="113")continue; // separate standalone interface
    if(!fs.existsSync(path.join(base,dir.name,"index.html")))continue;
    lessons.push({course,id});
  }
}
lessons.sort((a,b)=>(a.course+a.id).localeCompare(b.course+b.id));
const assigned=lessons.filter((_,i)=>i%SHARDS===SHARD);
const views=[{name:"TV",width:1920,height:1080},{name:"phone",width:390,height:844}];
const failures=[],watches=[],totals={screens:0,withPreview:0,previewMarked:0,
  sharedKeywordMarks:0,sharedCommandMarks:0,authoredMarks:0};
function fail(course,id,view,check,detail){const item={course,id,view,check,detail};failures.push(item);console.log("MARKER_FAIL "+JSON.stringify(item))}
(async()=>{
 const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
 try{
  for(const view of views){
   const ctx=await browser.newContext({viewport:{width:view.width,height:view.height},isMobile:view.name==="phone",hasTouch:view.name==="phone"});
   const page=await ctx.newPage();
   for(const {course,id} of assigned){
    const errors=[];const onError=e=>errors.push(String(e));page.on("pageerror",onError);
    try{
     await page.goto(ORIGIN+"/lessons/"+course+"/lesson-"+id+"/index.html",
       {waitUntil:"domcontentloaded",timeout:25000});
     await page.waitForFunction(()=>document.documentElement.hasAttribute("data-rhsc-marker-ready")
       && !!document.querySelector('link[href*="keyword-highlighter.css"]'),null,{timeout:18000});
     await page.waitForFunction(()=>[...document.styleSheets].some(x=>x.href?.includes("keyword-highlighter.css")),null,{timeout:10000});
     const a=await page.evaluate(()=>{
      const inspect=nodes=>[...nodes].map(el=>({
       text:el.textContent.trim().slice(0,60),
       image:getComputedStyle(el).backgroundImage,
       fill:getComputedStyle(el).backgroundColor,
       width:Math.round(el.getBoundingClientRect().width)
      }));
      const overview=document.querySelector("#overview");
      const manual=!!overview?.querySelector("mark.rhsc-keyword");
      const preview=inspect(overview?.querySelectorAll(".rhsc-preview-term")||[]);
      const keywords=inspect(document.querySelectorAll("mark.rhsc-shared-keyword"));
      const commands=inspect(document.querySelectorAll("mark.rhsc-shared-command"));
      const authored=inspect(document.querySelectorAll("mark.rhsc-keyword"));
      return {ready:document.documentElement.getAttribute("data-rhsc-marker-ready"),
       preview,keywords,commands,authored,manual,
       width:document.documentElement.scrollWidth,viewport:document.documentElement.clientWidth};
     });
     totals.screens++;totals.withPreview+=+(a.preview.length>0);
     totals.previewMarked+=+(a.preview.some(m=>m.image!=="none"));
     totals.sharedKeywordMarks+=a.keywords.length;
     totals.sharedCommandMarks+=a.commands.length;
     totals.authoredMarks+=a.authored.length;
     const all=[...a.keywords,...a.commands];
     if(a.ready!=="20261026")fail(course,id,view.name,"shared marker module initialized",a.ready);
     if(all.some(m=>!m.image||m.image==="none"))
       fail(course,id,view.name,"shared highlights use pen stroke",all.filter(m=>m.image==="none").slice(0,3));
     if(all.some(m=>m.fill!=="rgba(0, 0, 0, 0)"&&m.fill!=="transparent"))
       fail(course,id,view.name,"no solid yellow rectangle",all.filter(m=>m.fill!=="rgba(0, 0, 0, 0)"&&m.fill!=="transparent").slice(0,3));
     if(a.preview.length&&!a.manual&&!a.preview.every(m=>m.image!=="none"))
       fail(course,id,view.name,"overview vocabulary chips have marker",a.preview.filter(m=>m.image==="none").slice(0,3));
     if(a.width>a.viewport+5)
       watches.push({course,id,view:view.name,check:"document overflow (possibly unrelated)",excess:a.width-a.viewport});
     if(errors.length)fail(course,id,view.name,"no browser JavaScript errors",errors.slice(0,3));
    }catch(e){fail(course,id,view.name,"audit completed",String(e).slice(0,350));}
    finally{page.off("pageerror",onError);}
   }
   await ctx.close();
  }
 }finally{await browser.close();}
 const summary={lessons:assigned.length,views:views.map(x=>x.name),...totals,
  failures:failures.length,warnings:watches.length,failed:failures,review:watches};
 console.log("MARKER_AUDIT_SUMMARY "+JSON.stringify({...summary,failed:failures.slice(0,15),review:watches.slice(0,10)}));
 if(process.env.QA_REPORT){fs.mkdirSync("qa-output",{recursive:true});
  fs.writeFileSync(process.env.QA_REPORT,JSON.stringify(summary,null,2));}
 if(failures.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1});
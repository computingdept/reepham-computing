"use strict";
const { chromium } = require("playwright");
const ids = ["020","083","125","192","255","262","197","191"];
const base = process.env.QA_ORIGIN || "http://127.0.0.1:8765";
const b = await chromium.launch({headless:true,args:["--no-sandbox"]});
let records=[];
try{
  for(const id of ids){
    const context=await b.newContext({viewport:{width:1300,height:635}});
    const page=await context.newPage();
    await page.goto(base+"/lessons/h446/lesson-"+id+"/index.html",{waitUntil:"domcontentloaded"});
    await page.waitForSelector("#advance");
    for(const phase of ["i-do","we-do"]){
      await page.locator('.phase-nav [data-page="'+phase+'"]').click();
      const result=await page.evaluate(phase=>{
        const section=document.getElementById(phase),sr=section.getBoundingClientRect();
        const rect=el=>{if(!el)return null;const r=el.getBoundingClientRect(),s=getComputedStyle(el);return {tag:el.tagName,cl:String(el.className).slice(0,65),text:(el.textContent||"").trim().replace(/\s+/g," ").slice(0,60),y:Math.round(r.y),height:Math.round(r.height),bottom:Math.round(r.bottom),width:Math.round(r.width),scrollH:el.scrollHeight,clientH:el.clientHeight,overflow:s.overflowY,visible:r.width>0&&r.height>0&&s.display!=="none"&&!el.closest("[hidden]")};};
        const root=section.querySelector(".ido-example,.wedo-example");
        const grid=root?.querySelector(":scope > .h13-grid,:scope > .s-grid,:scope > .v13-grid,:scope > .p-grid,:scope > .draft-grid,:scope > .guided-example,:scope > .h446-grid");
        const panes=grid?[...grid.children]:root?[...root.children]:[];
        const all=[...section.querySelectorAll("h2,h3,pre,svg,.h13-figure,.ido-step,.wedo-step,.ido-reference,.ido-method,.wedo-reference,.wedo-practice")];
        return {id:section.id,section:rect(section),grid:rect(grid),panes:panes.map(rect),visibleElements:all.map(rect).filter(x=>x.visible).slice(0,20),overrun:section.scrollHeight-section.clientHeight,screenBottom:sr.bottom};
      },phase);
      records.push({lesson:id,phase,result});
      console.log("COMPACT_DIAG "+JSON.stringify({lesson:id,phase,result}));
    }
    await context.close();
  }
}finally{await b.close();}
console.log("COMPACT_DIAG_SUMMARY "+JSON.stringify({count:records.length}));

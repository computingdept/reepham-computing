"use strict";
const { chromium } = require("playwright");
const ids = ["020","022","045","046","048","050","057","059","069","070","084","193","195","228","232","234","251","252","254","258","263"];
const base = process.env.QA_ORIGIN || "http://127.0.0.1:8765";
(async()=>{
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

      // EXPERIMENT ONLY: move the first model figure into the worked-steps
      // panel in browser memory. Do not commit this change to lesson content
      // unless phase fits and staged reveal behaviour remain intact.
      const experiment=await page.evaluate(phase=>{
        const sect=document.getElementById(phase);
        const grid=sect.querySelector(".h13-grid,.s-grid,.v13-grid,.draft-grid,.p-grid,.p23-grid,.lesson-grid13,.syn22-grid");
        const panels=grid?[...grid.children].filter(x=>/pane|panel/.test(String(x.className))):[];
        const left=panels[0],right=panels[1];
        const fig=left?.querySelector(":scope > .h13-figure,:scope > .concept-structure,:scope > .concept-step,:scope > .v13-svg,:scope > .v13-figure,:scope > .p-figure,:scope > .p23-figure,:scope > .file-svg,:scope > .draft-figure,:scope > .h13-diagram,:scope > .y13-structure,:scope > svg");
        if(!right||!fig)return {attempted:false,reason:!right?"no right panel":"no figure"};
        right.insertBefore(fig,right.firstChild);
        return {attempted:true,
          afterExcess:sect.scrollHeight-sect.clientHeight,
          leftH:Math.round(left.getBoundingClientRect().height),
          rightH:Math.round(right.getBoundingClientRect().height),
          figureH:Math.round(fig.getBoundingClientRect().height),
          screenH:Math.round(sect.getBoundingClientRect().height)};
      },phase);
      console.log("COMPACT_EXPERIMENT "+JSON.stringify({lesson:id,phase,experiment}));

    }
    await context.close();
  }
}finally{await b.close();}
console.log("COMPACT_DIAG_SUMMARY "+JSON.stringify({count:records.length}));

})().catch(e=>{console.error(e);process.exitCode=1});

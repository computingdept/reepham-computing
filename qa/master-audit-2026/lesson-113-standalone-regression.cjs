"use strict";
// J277 Lesson 113 is intentionally a standalone 47-screen two-hour presentation.
// Check layout/navigation without modifying or grading question content.
const {chromium}=require("playwright");
const fs=require("node:fs");
const ORIGIN=process.env.QA_ORIGIN||"http://127.0.0.1:8765";
const cases=[
 {name:"TV",width:1920,height:1080,mobile:false},
 {name:"compact TV",width:1300,height:635,mobile:false},
 {name:"portrait phone",width:390,height:844,mobile:true}
];
const failed=[],review=[],checks=[];
function check(ok,test,place,data){
 checks.push({ok:!!ok,test,place});
 if(!ok){const item={test,place,data};failed.push(item);console.log("L113_FAIL "+JSON.stringify(item));}
}
function warn(test,place,data){
 const item={test,place,data};review.push(item);console.log("L113_REVIEW "+JSON.stringify(item));
}
async function audit(browser,spec){
 const context=await browser.newContext({viewport:{width:spec.width,height:spec.height},
 isMobile:spec.mobile,hasTouch:spec.mobile});
 const page=await context.newPage();const exceptions=[];
 page.on("pageerror",e=>exceptions.push(e.message));
 try{
  await page.goto(ORIGIN+"/lessons/j277/lesson-113/index.html",
   {waitUntil:"domcontentloaded",timeout:25000});
  check(await page.locator(".scene").count()===47,"47 original revision screens exist",spec.name);
  check(await page.locator(".scene:not([hidden])").count()===1,
   "one visible screen on load",spec.name);
  check(await page.locator(".mind-page").count()===2,
   "both printable A3 maps exist",spec.name);
  const report=[];
  for(let index=0;index<47;index++){
   const state=await page.evaluate(()=>{
    const scene=document.querySelector(".scene:not([hidden])");
    const body=scene?.querySelector(".scene-body");
    const children=[...body?.children||[]].filter(e=>e.getClientRects().length);
    const left=scene?.querySelector(".lesson-frame");
    const pair=scene?.querySelector(".teaching-pair");
    const table=scene?.querySelector(".lesson-table");
    const wrap=body?.getBoundingClientRect();
    const box=scene?.getBoundingClientRect();
    const maxChild=children.reduce((n,el)=>Math.max(n,el.getBoundingClientRect().right),0);
    return {
      id:scene?.id,phase:scene?.dataset.phase,paper:scene?.dataset.paper,
      visible:document.querySelectorAll(".scene:not([hidden])").length,
      count:document.querySelector("#page-counter")?.textContent.trim(),
      docWidth:document.documentElement.scrollWidth,
      viewWidth:document.documentElement.clientWidth,
      bodyScrollHeight:body?.scrollHeight||0,bodyClientHeight:body?.clientHeight||0,
      bodyOverflow:body?getComputedStyle(body).overflowY:"",
      headerBottom:scene?.querySelector(".scene-heading")?.getBoundingClientRect().bottom||0,
      sceneTop:box?.top||0,sceneBottom:box?.bottom||0,
      contentWidth:Math.round(maxChild-(wrap?.left||0)),
      panelWidth:Math.round((wrap?.width||0)),
      tableWidth:Math.round(table?.getBoundingClientRect().width||0),
      pairCols:pair?getComputedStyle(pair).gridTemplateColumns:"",
      nextDisplay:getComputedStyle(document.getElementById("next")).display,
      prevDisplay:getComputedStyle(document.getElementById("prev")).display,
      viewport:window.innerWidth
    };
   });
   report.push(state);
   check(state.id==="scene-"+index,"screen order",spec.name+":"+index,state);
   check(state.visible===1,"only one slide displayed",spec.name+":"+index,{count:state.visible});
   check(state.docWidth<=state.viewWidth+5,"no horizontal document overflow",spec.name+":"+index,
     {width:state.docWidth,viewport:state.viewWidth});
   if(spec.mobile){
    check(state.bodyOverflow==="auto"||state.bodyOverflow==="scroll",
      "mobile slide content scrolls rather than being clipped",spec.name+":"+index,{overflow:state.bodyOverflow});
    if(state.tableWidth)check(state.tableWidth<=state.panelWidth+4,
      "mobile table fits screen",spec.name+":"+index,{table:state.tableWidth,panel:state.panelWidth});
    if(state.pairCols)check(!state.pairCols.trim().includes(" "),
      "mobile teaching pair stacks into one column",spec.name+":"+index,{columns:state.pairCols});
    if(state.bodyScrollHeight>state.bodyClientHeight+5){
      const scroll=await page.locator(".scene:not([hidden]) .scene-body").evaluate(el=>{
        el.scrollTop=el.scrollHeight;return {scrollTop:el.scrollTop,max:el.scrollHeight-el.clientHeight}
      });
      check(scroll.scrollTop>=scroll.max-8,"long mobile slide can reach its bottom",
        spec.name+":"+index,scroll);
    }
   }else if(state.bodyScrollHeight>state.bodyClientHeight+35&&state.bodyOverflow==="hidden")
    warn("desktop slide may clip vertically",spec.name+":"+index,
      {excess:state.bodyScrollHeight-state.bodyClientHeight});
   if(index<46){
    await page.locator("#next").click({force:true});
    check(await page.locator("#scene-"+(index+1)).evaluate(el=>!el.hidden),
     "Next advances",spec.name+":"+index);
   }
  }
  await page.locator("#prev").evaluate(el=>el.click());
  check(await page.locator("#scene-45").evaluate(el=>!el.hidden),
   "Previous works",spec.name);
  // Browser key presses navigate the standalone presentation.
  await page.keyboard.press("ArrowLeft");
  check(await page.locator("#scene-44").evaluate(el=>!el.hidden),
   "Left arrow returns",spec.name);
  await page.keyboard.press("ArrowRight");
  check(await page.locator("#scene-45").evaluate(el=>!el.hidden),
   "Right arrow advances",spec.name);
  if(spec.mobile){
    check(report.every(x=>x.prevDisplay==="none"&&x.nextDisplay!=="none"),
      "phone uses a single Next control",spec.name);
    await page.evaluate(()=>{
      const el=document.querySelector("#presentation");
      const send=(name,x,y)=>{
        const touch=new Touch({identifier:1,target:el,clientX:x,clientY:y});
        el.dispatchEvent(new TouchEvent(name,{bubbles:true,cancelable:true,
         touches:name==="touchstart"?[touch]:[],
         changedTouches:[touch],
         targetTouches:name==="touchstart"?[touch]:[]}));
      };
      send("touchstart",310,330);send("touchend",95,336);
    });
    check(await page.locator("#scene-46").evaluate(el=>!el.hidden),
     "swipe left advances",spec.name);
    await page.evaluate(()=>{
      const el=document.querySelector("#presentation");
      const send=(name,x,y)=>{
        const touch=new Touch({identifier:2,target:el,clientX:x,clientY:y});
        el.dispatchEvent(new TouchEvent(name,{bubbles:true,cancelable:true,
         touches:name==="touchstart"?[touch]:[],
         changedTouches:[touch],
         targetTouches:name==="touchstart"?[touch]:[]}));
      };
      send("touchstart",90,330);send("touchend",320,336);
    });
    check(await page.locator("#scene-45").evaluate(el=>!el.hidden),
     "swipe right returns",spec.name);
    await page.evaluate(()=>{
      const el=document.querySelector("#presentation");
      const send=(name,x,y)=>{
        const touch=new Touch({identifier:3,target:el,clientX:x,clientY:y});
        el.dispatchEvent(new TouchEvent(name,{bubbles:true,cancelable:true,
         touches:name==="touchstart"?[touch]:[],
         changedTouches:[touch],
         targetTouches:name==="touchstart"?[touch]:[]}));
      };
      send("touchstart",180,210);send("touchend",191,550);
    });
    check(await page.locator("#scene-45").evaluate(el=>!el.hidden),
     "vertical scrolling does not change slides",spec.name);
  }
  check(exceptions.length===0,"no JavaScript exceptions",spec.name,exceptions);
  const samples=report.filter(x=>[0,4,19,24,30,45,46].includes(Number(x.id.slice(6))));
  console.log("L113_LAYOUT "+JSON.stringify({view:spec.name,screens:report.length,samples}));
 }catch(e){check(false,"browser audit completed",spec.name,String(e).slice(0,800));}
 finally{await context.close();}
}
(async()=>{
 const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
 try{for(const view of cases)await audit(browser,view);}
 finally{await browser.close();}
 const summary={screens:47,views:cases.map(x=>x.name),passed:checks.filter(x=>x.ok).length,
 failures:failed.length,reviewFlags:review.length,failed,review};
 console.log("L113_AUDIT_SUMMARY "+JSON.stringify(summary));
 if(process.env.QA_REPORT){fs.mkdirSync("qa-output",{recursive:true});fs.writeFileSync(process.env.QA_REPORT,JSON.stringify(summary,null,2));}
 if(failed.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1});

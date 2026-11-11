"use strict";
const {chromium}=require("playwright");
const origin=process.env.QA_ORIGIN||"http://127.0.0.1:8765";
const viewports=[{label:"TV",width:1920,height:1080},{label:"compact TV",width:1300,height:635},{label:"mobile",width:390,height:844}];
let checked=0,failed=0;
function check(ok,label,details){
 checked++;
 if(!ok){failed++;console.error("QUICKSORT_FAIL "+JSON.stringify({label,details}));}
}
function numberList(text){
 const m=String(text).match(/\[([-\d,\s]+)\]/);
 if(!m)return null;
 return m[1].split(",").map(s=>Number(s.trim()));
}
async function nextVisible(page){return page.locator("#next").isVisible();}
async function assertLayout(page,view,label){
 const metrics=await page.evaluate(()=>{
  const root=document.documentElement;
  const b=document.getElementById("workspace").getBoundingClientRect();
  return {clientWidth:root.clientWidth,scrollWidth:root.scrollWidth,workWidth:b.width};
 });
 check(metrics.scrollWidth<=metrics.clientWidth+5,view.label+" "+label+" no horizontal overflow",metrics);
 check(metrics.workWidth>260,view.label+" "+label+" task visible",metrics);
}
async function drivePartition(page,view,id){
 let original=null,clicks=0;
 while(!(await nextVisible(page))&&clicks++<100){
  const notes=page.locator("#workspace p.status");
  const noteText=(await notes.allTextContents()).join(" ");
  if(original===null){original=numberList(noteText);}
  const pivotButtons=page.locator("#workspace button.num");
  if(await pivotButtons.count()){
   await pivotButtons.first().click();continue;
  }
  const choices=page.locator("#workspace .choice");
  if(await choices.count()){
   const pivotMatch=noteText.match(/Pivot:\s*(-?\d+)/);
   const active=page.locator("#workspace .num.current");
   if(!pivotMatch||!(await active.count())){check(false,view.label+" "+id+" active partition data",noteText);break;}
   const pivot=Number(pivotMatch[1]),value=Number(await active.textContent());
   await choices.nth(value<pivot?0:1).click();
   continue;
  }
  const input=page.locator("#sorted-input");
  if(await input.count()){
   if(!original){check(false,view.label+" "+id+" original sequence not found",noteText);break;}
   await input.fill(original.slice().sort((a,b)=>a-b).join(", "));
   await page.getByRole("button",{name:"Check final order"}).click();continue;
  }
  check(false,view.label+" "+id+" missing interactive control",await page.locator("#workspace").innerText());break;
 }
 check(clicks<100,view.label+" "+id+" completes within finite interactions",clicks);
 check(await nextVisible(page),view.label+" "+id+" becomes complete",await page.locator("#feedback").innerText());
}
async function driveCode(page,view){
 const nums=numberList(await page.locator("#workspace p.status").textContent());
 if(!nums){check(false,view.label+" code task input parsed");return;}
 const p=nums[0];
 await page.locator('input[name="pivot"]').fill(String(p));
 await page.locator('input[name="smaller"]').fill(nums.slice(1).filter(v=>v<p).join(", "));
 await page.locator('input[name="larger"]').fill(nums.slice(1).filter(v=>v>=p).join(", "));
 await page.locator('input[name="result"]').fill(nums.slice().sort((a,b)=>a-b).join(", "));
 await page.getByRole("button",{name:"Check pseudocode trace"}).click();
 check(await nextVisible(page),view.label+" pseudocode task marked complete");
}
async function scenario(browser,view){
 const context=await browser.newContext({viewport:{width:view.width,height:view.height},isMobile:view.label==="mobile",hasTouch:view.label==="mobile"});
 const page=await context.newPage(),errors=[];
 page.on("pageerror",e=>errors.push(String(e)));
 try{
  const response=await page.goto(origin+"/revision/h446/section-2-3/quicksort-lab.html",{waitUntil:"load",timeout:25000});
  check(response?.ok(),view.label+" loads skills lab",response?.status());
  await page.waitForSelector("#workspace .number-row");
  check((await page.title()).includes("Quicksort Skills Lab"),view.label+" title");
  await assertLayout(page,view,"start");
  await page.locator("#workspace button.num").first().click();
  check(await nextVisible(page),view.label+" pivot correct");
  await page.locator("#next").click();
  await drivePartition(page,view,"partition");
  await page.locator("#next").click();
  await drivePartition(page,view,"recursive");
  await page.locator("#next").click();
  await drivePartition(page,view,"full trace");
  await page.locator("#next").click();
  await driveCode(page,view);
  await assertLayout(page,view,"end");
  await page.locator("#next").click();
  check((await page.locator("#task-title").innerText()).includes("Mastery target reached"),view.label+" mastery result 5/5",await page.locator("#task-text").innerText());
  const local=await page.evaluate(()=>JSON.parse(localStorage.getItem("rhsc-h446-quicksort-skill-lab-v1")||"{}"));
  check(local.best===5&&local.last===5,view.label+" best score saved locally",local);
  await page.reload({waitUntil:"load"});
  check((await page.locator("#mastery").innerText()).includes("5/5"),view.label+" best score survives reload");
  await page.locator("#restart").click();
  const resetText=await page.locator("#level").innerText();
  check(/1 OF 5/i.test(resetText),view.label+" new set resets progress",JSON.stringify({level:resetText,round:await page.evaluate(()=>JSON.parse(localStorage.getItem("rhsc-h446-quicksort-skill-lab-v1")||"{}").round)}));
  check((await page.locator("#workspace button.num").count())===5,view.label+" second set has five values");
  check(errors.length===0,view.label+" no JS errors",errors);
  await assertLayout(page,view,"restart");
 }catch(e){check(false,view.label+" full workflow",String(e).slice(0,800));}
 finally{await context.close();}
}
async function links(browser){
 const ctx=await browser.newContext();
 const page=await ctx.newPage();
 try{
 await page.goto(origin+"/lessons/h446/lesson-216/index.html#overview",{waitUntil:"domcontentloaded"});
 check((await page.locator('a[href*="quicksort-lab.html"]').count())===1,"Lesson 216 links to one Skills Lab");
 await page.goto(origin+"/revision/h446/section-2-3/index.html",{waitUntil:"domcontentloaded"});
 check((await page.locator('.quicksort-lab-link a[href="./quicksort-lab.html"]').count())===1,"Algorithms practice links to lab");
 }catch(e){check(false,"Lesson and Skills links",String(e));}
 finally{await ctx.close();}
}
(async()=>{
 const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
 try{await links(browser);for(const view of viewports)await scenario(browser,view);}
 finally{await browser.close();}
 console.log("QUICKSORT_SUMMARY "+JSON.stringify({checks:checked,failures:failed,viewports:viewports.map(v=>v.label)}));
 if(failed)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1;});

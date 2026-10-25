"use strict";
const { chromium } = require("playwright");

const ORIGIN = process.env.QA_ORIGIN || "http://127.0.0.1:8765";
const LESSONS = ["051","052","053","054","055","056","057","058","060","068"];
const SIZES = [
  { name: "Classroom TV", width: 1920, height: 1080 },
  { name: "mobile", width: 390, height: 844 }
];
const failures = [];
let passed = 0;

function check(condition, lesson, viewport, label, detail = "") {
  const where = lesson + " " + viewport + " · " + label;
  if (!condition) {
    failures.push(where + (detail ? " — " + detail : ""));
    console.error("FAIL " + failures[failures.length - 1]);
  } else {
    passed++;
    console.log("PASS " + where);
  }
}
async function visible(locator) { return locator.isVisible(); }
async function verify(browser, id, size) {
  const context = await browser.newContext({ viewport: { width: size.width, height: size.height }, isMobile: size.name === "mobile", hasTouch: size.name === "mobile" });
  const page = await context.newPage();
  const runtimeErrors = [];
  page.on("pageerror", e => runtimeErrors.push(e.message));
  const location = ORIGIN + "/lessons/j277/lesson-" + id + "/index.html";
  try {
    await page.goto(location, { waitUntil: "domcontentloaded", timeout: 25000 });
    await page.waitForFunction(
      () => !!document.querySelector("#i-do .ido-example")
        && document.querySelectorAll("#we-do .wedo-example").length === 2
        && !!document.getElementById("advance"),
      null, { timeout: 25000 }
    );
    const idoNav = page.locator('.phase-nav [data-page="i-do"]');
    const wedoNav = page.locator('.phase-nav [data-page="we-do"]');
    const advance = page.locator("#advance");
    const previous = page.locator("#previous");
    // The desktop phase bar/buttons are intentionally hidden on phones.
    // On mobile, activate a phase for test setup and exercise real touch swipes
    // for all actual forward/back step navigation.
    async function phaseNav(locator) {
      if (size.name === "mobile") await locator.evaluate(el => el.click());
      else await locator.click();
    }
    async function touchSwipe(direction) {
      await page.evaluate(dir => {
        const target = document.querySelector("#main");
        const start = dir === "left" ? 300 : 90;
        const end = dir === "left" ? 90 : 300;
        const y = 310;
        const finger = x => new Touch({identifier:1,target,clientX:x,clientY:y});
        const dispatch=(name,touches,changedTouches)=>
          target.dispatchEvent(new TouchEvent(name,{bubbles:true,cancelable:true,
            touches,changedTouches,targetTouches:touches}));
        dispatch("touchstart",[finger(start)],[finger(start)]);
        dispatch("touchmove",[finger(end)],[finger(end)]);
        dispatch("touchend",[],[finger(end)]);
      },direction);
    }
    async function nextStage() {
      if (size.name === "mobile") await touchSwipe("left");
      else await advance.click();
    }
    async function previousStage() {
      if (size.name === "mobile") await touchSwipe("right");
      else await previous.click();
    }
    await phaseNav(idoNav);

    const model = page.locator("#i-do .ido-example");
    const modelSteps = model.locator(".ido-step");
    const modelCount = await modelSteps.count();
    check(modelCount >= 3, id, size.name, "I Do has progressive model steps");
    check(await visible(model), id, size.name, "I Do example visible");
    check(await visible(page.locator("#i-do .j277-model-starter")), id, size.name, "Starter code stays visible");
    check((await Promise.all(Array.from({length: modelCount}, (_,i)=>visible(modelSteps.nth(i))))).every(x=>!x),id,size.name,"I Do opens with no answer visible");
    await nextStage();
    check(await visible(modelSteps.nth(0)),id,size.name,"I Do reveals first step");
    await previousStage();
    check(!await visible(modelSteps.nth(0)),id,size.name,"Previous conceals first model step");

    await phaseNav(wedoNav);
    const examples = page.locator("#we-do .wedo-example");
    check(await examples.count()===2,id,size.name,"Two guided examples authored");
    check(await visible(examples.nth(0)) && !await visible(examples.nth(1)),id,size.name,"Exactly first We Do example visible");
    const firstSteps=examples.nth(0).locator(".wedo-step");
    const count = await firstSteps.count();
    check(count>=3,id,size.name,"Guided example contains progressive steps");
    const initially=await Promise.all(Array.from({length:count},(_,i)=>visible(firstSteps.nth(i))));
    check(initially.every(x=>!x),id,size.name,"Guided answers initially hidden");

    await nextStage();
    check(await visible(firstSteps.nth(0)),id,size.name,"We Do first reveal");
    await previousStage();
    check(!await visible(firstSteps.nth(0)),id,size.name,"We Do Previous conceals first stage");

    // From the problem-only state, reveal each stage and advance to the second example.
    for(let i=0;i<count+1;i++) await nextStage();
    check(!await visible(examples.nth(0)) && await visible(examples.nth(1)),
      id,size.name,"Only second We Do example visible after navigation");
    const secondSteps=examples.nth(1).locator(".wedo-step");
    const secondCount=await secondSteps.count();
    const secondInitially=await Promise.all(Array.from({length:secondCount},(_,i)=>visible(secondSteps.nth(i))));
    check(secondInitially.every(x=>!x),id,size.name,"Second guided example resets all answers");

    if(size.width >= 901) {
      const geometry=await page.evaluate(()=>{
        const first=document.querySelector("#we-do .wedo-example:not([hidden])");
        const a=first?.querySelector(".wedo-reference")?.getBoundingClientRect();
        const b=first?.querySelector(".wedo-practice")?.getBoundingClientRect();
        return {good:!!a&&!!b && a.width>320 && b.width>320 && b.x>a.x+a.width-8};
      });
      check(geometry.good,id,size.name,"Guided work occupies two readable columns");
    }
    const width=await page.evaluate(()=>({
      viewport:document.documentElement.clientWidth,
      document:document.documentElement.scrollWidth
    }));
    check(width.document<=width.viewport+3,id,size.name,"No document horizontal overflow",
      "scrollWidth "+width.document+" / "+width.viewport);
    check(runtimeErrors.length===0,id,size.name,"No uncaught browser errors",runtimeErrors.join("; "));
  } catch(e) {
    check(false,id,size.name,"Browser test completed",e.message);
  } finally {
    await context.close();
  }
}

(async()=>{
  const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
  try{
    for(const size of SIZES) for(const id of LESSONS) await verify(browser,id,size);
  }finally{await browser.close();}
  console.log("\nJ277 CODE MODELLING RESULT: "+passed+" passed; "+failures.length+" failed.");
  if(failures.length){
    console.error(failures.join("\n"));
    process.exitCode=1;
  }
})().catch(e=>{console.error(e);process.exitCode=1;});

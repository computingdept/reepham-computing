"use strict";
const assert=require("node:assert/strict");
const {chromium}=require("playwright");

const origin=process.env.QA_ORIGIN||"http://127.0.0.1:8765";
const prefix=origin+"/lessons/j277/lesson-096/";
const bankIds=["RHS-J277-026","RHS-J277-027","RHS-J277-141","RHS-J277-142"];
(async()=>{
  const browser=await chromium.launch({headless:true});
  try{
    const regular=await browser.newPage();
    await regular.goto(prefix+"#you-do",{waitUntil:"domcontentloaded"});
    await regular.locator("#you-do .rhs-y-stage").first().waitFor({timeout:30000});
    assert.equal(await regular.locator("#you-do .rhs-y-stage").count(),7);
    assert.equal(await regular.locator("#exam-practice").count(),0);
    assert.equal(await regular.locator("#you-do .rhs-bank-stage").count(),0);
    const original=await regular.locator("#you-do .rhs-y-stage").evaluateAll(
      elements=>elements.map(el=>el.innerHTML));
    await regular.close();

    for(const viewport of [
      {width:1920,height:1080,label:"desktop"},
      {width:1300,height:635,label:"compact"},
      {width:390,height:844,label:"mobile"}]){
      const page=await browser.newPage({viewport:{width:viewport.width,height:viewport.height}});
      const errors=[];
      page.on("pageerror",e=>errors.push(e.message));
      await page.goto(prefix+"?exam-bank-preview=1&exam-bank-start=1#you-do",
        {waitUntil:"domcontentloaded"});
      await page.locator("#you-do[data-rhs-bank-preview=true] .rhs-bank-card")
        .first().waitFor({timeout:30000});
      assert.equal(await page.locator("#exam-practice").count(),0,
        "The extra phase must NOT exist");
      assert.equal(await page.locator(".phase-nav [data-page=exam-practice]").count(),0,
        "The extra navigation tab must NOT exist");
      assert.equal(await page.locator("#you-do.active").count(),1);
      assert.equal(await page.locator("#you-do .rhs-y-stage").count(),12,
        "7 original screens + 1 additional questions + 4 additional marking answers");
      const firstSeven=await page.locator("#you-do .rhs-y-stage").evaluateAll(
        elements=>elements.slice(0,7).map(el=>el.innerHTML));
      assert.deepEqual(firstSeven,original,"Original seven You Do stages must remain unchanged");
      assert.equal(await page.locator("#you-do .rhs-bank-card").count(),4);
      assert.equal(await page.locator("#you-do .rhs-bank-question-stage:not([hidden])").count(),1);
      assert.equal(await page.locator("#you-do .rhs-bank-review-stage:not([hidden])").count(),0);
      assert.match(await page.locator("#you-do .rhs-bank-card").first().innerText(),/airport.*RAM.*ROM/is);
      assert.match(await page.locator("#you-do .rhs-bank-question-stage .rhs-bank-head").innerText(),/8 MARKS/i);
      assert.equal(await page.locator("#you-do").getAttribute("data-window-start"),"7");
      const before=await page.locator("#do-now").innerText();
      const clickControl=async id=>{
        const element=page.locator(id);
        if(viewport.label==="mobile")await element.evaluate(el=>el.click());
        else await element.click();
      };
      const font=await page.locator("#you-do .rhs-bank-prompt").first()
        .evaluate(el=>parseFloat(getComputedStyle(el).fontSize));
      assert(font>=19,"Question text too small");

      // The existing You Do arrows advance each one-screen model answer.
      for(let i=0;i<bankIds.length;i++){
        await clickControl("#advance");
        const stage=page.locator("#you-do .rhs-bank-review-stage:not([hidden])");
        assert.equal(await stage.count(),1);
        assert.match(await stage.locator(".rhs-bank-label").first().innerText(),
          new RegExp(bankIds[i]));
        assert((await stage.locator(".rhs-bank-answer-point").count())>=1);
        assert.match(await stage.locator(".rhs-bank-scoring").innerText(),/HOW TO AWARD MARKS/);
        assert.equal(await page.locator("#you-do").getAttribute("data-window-start"),String(8+i));
      }
      await clickControl("#advance");
      await page.locator("#vocabulary.active").waitFor();
      await clickControl("#previous");
      await page.locator("#you-do.active").waitFor();
      assert.match(await page.locator("#you-do .rhs-bank-review-stage:not([hidden])").innerText(),
        /RHS-J277-142/);
      // Back one more screen and forward again.
      await clickControl("#previous");
      assert.match(await page.locator("#you-do .rhs-bank-review-stage:not([hidden])").innerText(),
        /RHS-J277-141/);
      const after=await page.locator("#do-now").innerText();
      assert.equal(before,after,"Do Now must remain unchanged");
      assert.deepEqual(errors,[],"Unexpected browser JS errors in "+viewport.label);
      console.log("PASS "+viewport.label+
        ": 7 original You Do screens + 5 appended bank screens; no new phase; answers and navigation pass");
      await page.close();
    }

    // Normal navigation must reach the appended questions after the original
    // seven screens, without relying on the teacher-only direct jump.
    const seq=await browser.newPage({viewport:{width:1920,height:1080}});
    await seq.goto(prefix+"?exam-bank-preview=1#you-do",{waitUntil:"domcontentloaded"});
    await seq.locator("#you-do[data-rhs-bank-preview=true]").waitFor({timeout:30000});
    assert.equal(await seq.locator("#you-do").getAttribute("data-window-start"),"0");
    for(let i=0;i<7;i++)await seq.locator("#advance").click();
    assert.equal(await seq.locator("#you-do").getAttribute("data-window-start"),"7");
    assert.equal(await seq.locator("#you-do .rhs-bank-question-stage:not([hidden])").count(),1);
    console.log("PASS full You Do sequence: original seven, then four extra exam questions");
    await seq.close();
  }finally{await browser.close();}
})().catch(err=>{console.error(err);process.exitCode=1;});

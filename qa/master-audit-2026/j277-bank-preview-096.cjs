"use strict";
const assert=require("node:assert/strict");
const {chromium}=require("playwright");

const origin=process.env.QA_ORIGIN||"http://127.0.0.1:8765";
const prefix=origin+"/lessons/j277/lesson-096/";
(async()=>{
  const browser=await chromium.launch({headless:true});
  try{
    for(const viewport of [
      {width:1920,height:1080,label:"desktop"},
      {width:1300,height:635,label:"compact"},
      {width:390,height:844,label:"mobile"}]){
      const page=await browser.newPage({viewport:{width:viewport.width,height:viewport.height}});
      const errors=[];
      page.on("pageerror",e=>errors.push(e.message));
      await page.goto(prefix+"?exam-bank-preview=1#exam-practice",{waitUntil:"domcontentloaded"});
      await page.locator("#exam-practice.active .rhs-bank-card").first().waitFor({timeout:30000});
      assert.equal(await page.locator("#exam-practice .rhs-bank-stage").count(),5);
      assert.equal(await page.locator("#exam-practice .rhs-bank-card").count(),4);
      assert.equal(await page.locator("#exam-practice .rhs-bank-question-stage:not([hidden])").count(),1);
      assert.equal(await page.locator("#exam-practice .rhs-bank-review-stage:not([hidden])").count(),0);
      assert.match(await page.locator("#exam-practice .rhs-bank-card").first().innerText(),/airport.*RAM.*ROM/is);
      assert.match(await page.locator("#exam-practice .rhs-bank-head").first().innerText(),/8 MARKS/i);
      assert.equal(await page.locator("#you-do .rhs-y-stage").count(),7,
        "Existing You Do should still have its seven unchanged screens");
      const before=await page.locator("#do-now").innerText();
      // The standard desktop Continue button is intentionally hidden on phones.
      // On mobile, trigger its existing handler to validate sequence and state.
      const clickControl=async id=>{
        const element=page.locator(id);
        if(viewport.label==="mobile")await element.evaluate(el=>el.click());
        else await element.click();
      };
      const font=await page.locator("#exam-practice .rhs-bank-prompt").first().evaluate(el=>parseFloat(getComputedStyle(el).fontSize));
      assert(font>=19,"Exam practice question font is too small");
      // Navigate all four standalone answer screens with the existing controls.
      const ids=["RHS-J277-026","RHS-J277-027","RHS-J277-141","RHS-J277-142"];
      for(let i=0;i<4;i++){
        await clickControl("#advance");
        const stage=page.locator("#exam-practice .rhs-bank-review-stage:not([hidden])");
        assert.equal(await stage.count(),1);
        assert.match(await stage.locator(".rhs-bank-label").first().innerText(),new RegExp(ids[i]));
        assert((await stage.locator(".rhs-bank-answer-point").count())>=1,"Missing answer points");
        assert.match(await stage.locator(".rhs-bank-scoring").innerText(),/HOW TO AWARD MARKS/);
      }
      await clickControl("#advance");
      await page.locator("#vocabulary.active").waitFor();
      await clickControl("#previous");
      await page.locator("#exam-practice.active").waitFor();
      assert.match(await page.locator("#exam-practice .rhs-bank-review-stage:not([hidden])").innerText(),/RHS-J277-142/);
      const after=await page.locator("#do-now").innerText();
      assert.equal(before,after,"Do Now must be unchanged by preview navigation");
      assert.deepEqual(errors,[],"Browser JS errors in "+viewport.label);
      console.log("PASS "+viewport.label+" lesson 096: optional bank questions, separate answers, native navigation and unchanged Do Now");
      await page.close();
    }
    const regular=await browser.newPage();
    await regular.goto(prefix+"#you-do",{waitUntil:"domcontentloaded"});
    await regular.locator("#you-do .rhs-y-stage").first().waitFor({timeout:30000});
    assert.equal(await regular.locator("#you-do .rhs-y-stage").count(),7);
    assert.equal(await regular.locator("#exam-practice").count(),0,
      "New bank questions must not appear without explicit preview parameter");
    console.log("PASS default lesson 096 unchanged without preview query");
    await regular.close();
  }finally{await browser.close();}
})().catch(err=>{console.error(err);process.exitCode=1;});

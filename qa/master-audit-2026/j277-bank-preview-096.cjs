"use strict";
const assert=require("node:assert/strict");
const fs=require("node:fs");
const {chromium}=require("playwright");
const origin=process.env.QA_ORIGIN||"http://127.0.0.1:8765";
const prefix=origin+"/lessons/j277/lesson-096/";
const bankIds=["RHS-J277-026","RHS-J277-027","RHS-J277-141","RHS-J277-142"];

(async()=>{
  const originalArchive=JSON.parse(fs.readFileSync(
    "data/exam-questions/archive/j277-lesson-096-original-youdo-20261122.json","utf8"));
  const originalSource=JSON.parse(fs.readFileSync(
    "lessons/j277/autumn2-096.json","utf8"))["096"];
  assert.deepEqual(originalArchive.original_exam_questions,originalSource.e,
    "Original three exam questions and answers not fully preserved in archive");
  assert.deepEqual(originalArchive.previous_learning_exam,originalSource.priorExam,
    "Original prior exam question/answer not preserved");
  assert.deepEqual(originalArchive.code_first,originalSource.k,
    "Original Code First not preserved");
  const browser=await chromium.launch({headless:true});
  try{
    // Student/default URL stays untouched until teacher approval.
    const regular=await browser.newPage();
    await regular.goto(prefix+"#you-do",{waitUntil:"domcontentloaded"});
    await regular.locator("#you-do .rhs-y-stage").first().waitFor({timeout:30000});
    assert.equal(await regular.locator("#you-do .rhs-y-stage").count(),7);
    assert.equal(await regular.locator("#exam-practice").count(),0);
    assert.equal(await regular.locator("#you-do .rhs-bank-stage").count(),0);
    const donowDefault=await regular.locator("#do-now").innerText();
    const originalCodeScreens=await regular.locator("#you-do .rhs-y-stage").evaluateAll(
      elements=>elements.slice(0,2).map(element=>element.innerHTML));
    assert.equal(originalCodeScreens.length,2);
    await regular.close();

    for(const viewport of [
      {width:1920,height:1080,label:"desktop"},
      {width:1300,height:635,label:"compact"},
      {width:390,height:844,label:"mobile"}]){
      const page=await browser.newPage({viewport:{width:viewport.width,height:viewport.height}});
      const errors=[];
      page.on("pageerror",error=>errors.push(error.message));
      await page.goto(prefix+"?exam-bank-preview=1#you-do",
        {waitUntil:"domcontentloaded"});
      await page.locator("#you-do[data-rhs-bank-preview=true] .rhs-bank-card")
        .first().waitFor({timeout:30000});

      assert.equal(await page.locator("#exam-practice").count(),0,
        "Separate exam practice phase must not exist");
      assert.equal(await page.locator(".phase-nav [data-page=exam-practice]").count(),0,
        "Extra navigation tab must not exist");
      assert.equal(await page.locator(".phase-nav button").count(),8,
        "Normal eight phases only");
      assert.equal(await page.locator("#you-do.active").count(),1);
      assert.equal(await page.locator("#you-do .rhs-y-stage").count(),7,
        "You Do must contain original Code First+check, bank question overview and four marking screens");
      assert.equal(await page.locator("#you-do .rhs-y-code-first").count(),1);
      assert.equal(await page.locator("#you-do .rhs-y-code-check").count(),1);
      const codeScreens=await page.locator("#you-do .rhs-y-stage").evaluateAll(
        elements=>elements.slice(0,2).map(element=>element.innerHTML));
      assert.deepEqual(codeScreens,originalCodeScreens,
        "Code First task and answer must remain exactly unchanged");
      assert.equal(await page.locator("#you-do .rhs-y-challenge-stage").count(),0);
      assert.equal(await page.locator("#you-do .rhs-bank-card").count(),4);
      assert.equal(await page.locator("#you-do .rhs-bank-question-stage:not([hidden])").count(),0);
      assert.equal(await page.locator("#you-do .rhs-y-code-first:not([hidden])").count(),1);
      assert.equal(await page.locator("#you-do .rhs-bank-review-stage:not([hidden])").count(),0);
      assert.match(await page.locator("#you-do .rhs-bank-question-stage .rhs-bank-head").innerText(),
        /UNAPPROVED PREVIEW · ADDITIONAL EXAM PRACTICE/i);
      assert.match(await page.locator("#you-do .rhs-bank-question-stage .rhs-bank-head").innerText(),
        /8 MARKS/i);
      assert.match(await page.locator("#you-do .rhs-bank-card").first().innerText(),/airport.*RAM.*ROM/is);
      assert.equal(await page.locator("#you-do").getAttribute("data-window-start"),"0",
        "Code First must be the first You Do screen");
      const before=await page.locator("#do-now").innerText();
      assert.equal(before,donowDefault,"Do Now must match the ordinary lesson");
      const clickControl=async id=>{
        const element=page.locator(id);
        if(viewport.label==="mobile")await element.evaluate(el=>el.click());
        else await element.click();
      };
      const font=await page.locator("#you-do .rhs-bank-prompt").first()
        .evaluate(el=>parseFloat(getComputedStyle(el).fontSize));
      await clickControl("#advance");
      assert.equal(await page.locator("#you-do .rhs-y-code-check:not([hidden])").count(),1,
        "Code First marking answer must be second screen");
      assert.equal(await page.locator("#you-do").getAttribute("data-window-start"),"1");
      await clickControl("#advance");
      assert.equal(await page.locator("#you-do .rhs-bank-question-stage:not([hidden])").count(),1,
        "New exam questions must follow Code First answer");
      assert.equal(await page.locator("#you-do").getAttribute("data-window-start"),"2");
      assert(font>=19,"Question text too small");
      for(let i=0;i<bankIds.length;i++){
        await clickControl("#advance");
        const stage=page.locator("#you-do .rhs-bank-review-stage:not([hidden])");
        assert.equal(await stage.count(),1,"Exactly one answer visible");
        assert.match(await stage.locator(".rhs-bank-label").first().innerText(),
          new RegExp(bankIds[i]));
        assert((await stage.locator(".rhs-bank-answer-point").count())>=1);
        assert.match(await stage.locator(".rhs-bank-scoring").innerText(),/HOW TO AWARD MARKS/);
        assert.equal(await page.locator("#you-do").getAttribute("data-window-start"),String(3+i));
      }
      await clickControl("#advance");
      await page.locator("#vocabulary.active").waitFor();
      await clickControl("#previous");
      await page.locator("#you-do.active").waitFor();
      assert.match(await page.locator("#you-do .rhs-bank-review-stage:not([hidden])").innerText(),
        /RHS-J277-142/);
      await clickControl("#previous");
      assert.match(await page.locator("#you-do .rhs-bank-review-stage:not([hidden])").innerText(),
        /RHS-J277-141/);
      assert.equal(await page.locator("#do-now").innerText(),before);
      assert.deepEqual(errors,[],"Unexpected browser JS errors: "+viewport.label);
      console.log("PASS "+viewport.label+
        ": original Code First preserved, old exam questions replaced, 7 You Do screens, 8 phases");
      await page.close();
    }
  }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});

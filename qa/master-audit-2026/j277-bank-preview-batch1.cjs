"use strict";
const assert=require("node:assert/strict");
const fs=require("node:fs");
const {chromium}=require("playwright");
const origin=process.env.QA_ORIGIN||"http://127.0.0.1:8765";

const cases={
  "098":{ids:["RHS-J277-028","RHS-J277-029","RHS-J277-077","RHS-J277-133"],marks:12,first:/airport.*secondary storage/is},
  "099":{ids:["RHS-J277-058","RHS-J277-059","RHS-J277-135","RHS-J277-136"],marks:5,first:/media company.*backup/i}
};
(async()=>{
  const mapping=JSON.parse(fs.readFileSync(
    "data/exam-questions/j277-youdo-lesson-map.json","utf8"));
  const browser=await chromium.launch({headless:true});
  try{
    for(const [lesson,fixture] of Object.entries(cases)){
      const path=origin+"/lessons/j277/lesson-"+lesson+"/";
      const old=JSON.parse(fs.readFileSync(
        "lessons/j277/autumn2-"+lesson+".json","utf8"))[lesson];
      const archive=JSON.parse(fs.readFileSync(
        "data/exam-questions/archive/j277-lesson-"+lesson+"-original-youdo-20261122.json",
        "utf8"));
      assert.deepEqual(archive.code_first,old.k,"Original Code First not archived for "+lesson);
      assert.deepEqual(archive.previous_learning_exam,old.priorExam,"Prior question not archived");
      assert.deepEqual(archive.original_exam_questions,old.e,"Old exam questions not archived");
      const map=mapping.lessons.find(x=>x.lesson_id===lesson);
      assert.deepEqual(map.additional_exam_practice.map(x=>x.rhs_question_id),fixture.ids);
      assert.equal(map.teacher_approved,false);
      assert.equal(map.published_bank_override_enabled,false);
      assert(map.additional_exam_practice.every(x=>x.visual_decision==="no_visual_needed"),
        "Source visuals not ready: "+lesson);

      const regular=await browser.newPage();
      await regular.goto(path+"#you-do",{waitUntil:"domcontentloaded"});
      await regular.locator("#you-do .rhs-y-code-first").waitFor({timeout:30000});
      assert.equal(await regular.locator("#you-do .rhs-y-stage").count(),7);
      assert.equal(await regular.locator("#you-do .rhs-bank-stage").count(),0,
        "Unapproved bank questions must not show to ordinary students");
      const originalCode=await regular.locator("#you-do .rhs-y-stage").evaluateAll(
        screens=>screens.slice(0,2).map(screen=>screen.innerHTML));
      const originalDoNow=await regular.locator("#do-now").innerText();
      await regular.close();

      for(const viewport of [
        {label:"desktop",width:1920,height:1080},
        {label:"compact projector",width:1300,height:635},
        {label:"mobile",width:390,height:844}
      ]){
        const page=await browser.newPage({viewport:{width:viewport.width,height:viewport.height}});
        const errors=[];
        page.on("pageerror",err=>errors.push(err.message));
        await page.goto(path+"?exam-bank-preview=1#you-do",{waitUntil:"domcontentloaded"});
        await page.locator("#you-do[data-rhs-bank-preview=true] .rhs-bank-stage")
          .first().waitFor({state:"attached",timeout:30000});
        assert.equal(await page.locator("#you-do.active").count(),1);
        assert.equal(await page.locator(".phase-nav button").count(),8);
        assert.equal(await page.locator("#exam-practice, .phase-nav [data-page=exam-practice]").count(),0);
        assert.equal(await page.locator("#you-do .rhs-y-stage").count(),7);
        assert.equal(await page.locator("#you-do .rhs-y-code-first:not([hidden])").count(),1);
        assert.equal(await page.locator("#you-do .rhs-y-code-check").count(),1);
        assert.equal(await page.locator("#you-do .rhs-y-challenge-stage").count(),0);
        assert.deepEqual(await page.locator("#you-do .rhs-y-stage").evaluateAll(
          screens=>screens.slice(0,2).map(screen=>screen.innerHTML)),originalCode,
          "Code First and check must be exactly unchanged");
        assert.equal(await page.locator("#do-now").innerText(),originalDoNow);
        const click=async selector=>{
          const el=page.locator(selector);
          if(viewport.label==="mobile")await el.evaluate(node=>node.click());
          else await el.click();
        };
        await click("#advance");
        assert.equal(await page.locator("#you-do .rhs-y-code-check:not([hidden])").count(),1);
        await click("#advance");
        assert.equal(await page.locator("#you-do .rhs-bank-question-stage:not([hidden])").count(),1);
        assert.equal(await page.locator("#you-do .rhs-bank-card").count(),4);
        assert.match(await page.locator("#you-do .rhs-bank-card").first().innerText(),
          fixture.first,"Incorrect question set for "+lesson);
        const questionHeading=await page.locator(
          "#you-do .rhs-bank-question-stage .rhs-bank-head").innerText();
        assert.match(questionHeading,/UNAPPROVED PREVIEW.*EXAM PRACTICE/is);
        assert.match(questionHeading,new RegExp(fixture.marks+" MARKS"));
        const size=await page.locator("#you-do .rhs-bank-prompt").first().evaluate(
          el=>Number.parseFloat(getComputedStyle(el).fontSize));
        assert(size>=19,"Question text is too small");
        for(let i=0;i<fixture.ids.length;i++){
          await click("#advance");
          const answer=page.locator("#you-do .rhs-bank-review-stage:not([hidden])");
          assert.equal(await answer.count(),1);
          assert.match(await answer.locator(".rhs-bank-label").first().innerText(),
            new RegExp(fixture.ids[i]));
          assert((await answer.locator(".rhs-bank-answer-point").count())>0);
          assert.match(await answer.locator(".rhs-bank-scoring").innerText(),/HOW TO AWARD MARKS/);
        }
        await click("#advance");
        await page.locator("#vocabulary.active").waitFor();
        await click("#previous");
        assert.match(await page.locator(
          "#you-do .rhs-bank-review-stage:not([hidden])").innerText(),
          new RegExp(fixture.ids[3]));
        assert.deepEqual(errors,[],"JS browser errors on "+lesson+" "+viewport.label);
        console.log("PASS lesson "+lesson+" "+viewport.label+
          ": Code First unchanged, four new questions, four marking answers, no extra phase");
        await page.close();
      }
    }
  }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});

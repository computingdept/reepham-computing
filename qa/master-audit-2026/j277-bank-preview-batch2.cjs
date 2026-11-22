"use strict";
const assert=require("node:assert/strict");
const fs=require("node:fs");
const {chromium}=require("playwright");
const root=process.env.QA_ORIGIN||"http://127.0.0.1:8765";
const cases={
  "100":{ids:["RHS-J277-002","RHS-J277-005","RHS-J277-116","RHS-J277-117"],marks:10,visual:2,first:/music studio.*track identifier/is},
  "101":{ids:["RHS-J277-060","RHS-J277-061","RHS-J277-118","RHS-J277-191"],marks:7,visual:1,first:/digital camera.*binary counter/is},
  "102":{ids:["RHS-J277-003","RHS-J277-004","RHS-J277-119","RHS-J277-190"],marks:10,visual:1,first:/warehouse.*2F/is},
  "103":{ids:["RHS-J277-022","RHS-J277-023","RHS-J277-071","RHS-J277-172"],marks:8,visual:0,first:/publishing company.*ASCII/is},
  "104":{ids:["RHS-J277-019","RHS-J277-024","RHS-J277-025","RHS-J277-132"],marks:9,visual:0,first:/podcast producer.*microphone/is}
};
(async()=>{
  const map=JSON.parse(fs.readFileSync("data/exam-questions/j277-youdo-lesson-map.json","utf8"));
  const browser=await chromium.launch({headless:true});
  try{
    for(const [lesson,fixture] of Object.entries(cases)){
      const url=root+"/lessons/j277/lesson-"+lesson+"/";
      const source=JSON.parse(fs.readFileSync("lessons/j277/autumn2-"+lesson+".json","utf8"))[lesson];
      const archive=JSON.parse(fs.readFileSync(
        "data/exam-questions/archive/j277-lesson-"+lesson+"-original-youdo-20261122.json","utf8"));
      assert.deepEqual(archive.code_first,source.k,"Archived Code First mismatch L"+lesson);
      assert.deepEqual(archive.original_exam_questions,source.e,"Old exam questions missing from archive");
      assert.deepEqual(archive.previous_learning_exam,source.priorExam||null,
        "Original explicit retrieval exam question mismatch");
      const row=map.lessons.find(x=>x.lesson_id===lesson);
      assert(row,"Unmapped lesson "+lesson);
      assert.equal(row.teacher_approved,false);
      assert.equal(row.published_bank_override_enabled,false);
      assert.deepEqual(row.additional_exam_practice.map(x=>x.rhs_question_id),fixture.ids);
      assert.equal(row.additional_exam_practice.filter(x=>x.visual_decision==="requires_source_figure_review").length,fixture.visual);

      const student=await browser.newPage({viewport:{width:1280,height:720}});
      await student.goto(url+"#you-do",{waitUntil:"domcontentloaded"});
      await student.locator("#you-do .rhs-y-stage").first().waitFor({timeout:30000});
      assert.equal(await student.locator("#you-do .rhs-y-stage").count(),7);
      assert.equal(await student.locator("#you-do .rhs-bank-card").count(),0,
        "Unapproved RHS bank content leaked to ordinary lesson "+lesson);
      const originalCode=await student.locator("#you-do .rhs-y-stage").evaluateAll(
        screens=>screens.slice(0,2).map(el=>el.innerHTML));
      const doNow=await student.locator("#do-now").innerText();
      await student.close();

      for(const size of [
        {label:"desktop",width:1920,height:1080},
        {label:"compact projector",width:1300,height:635},
        {label:"mobile",width:390,height:844}
      ]){
        const page=await browser.newPage({viewport:{width:size.width,height:size.height}});
        const errors=[];page.on("pageerror",e=>errors.push(e.message));
        await page.goto(url+"?exam-bank-preview=1#you-do",{waitUntil:"domcontentloaded"});
        await page.locator("#you-do[data-rhs-bank-preview=true] .rhs-bank-stage").first()
          .waitFor({state:"attached",timeout:30000});
        assert.equal(await page.locator("#you-do .rhs-y-stage").count(),7,
          "Must retain 2 Code First and 5 bank exam stages");
        assert.equal(await page.locator("#exam-practice, .phase-nav [data-page=exam-practice]").count(),0);
        assert.equal(await page.locator(".phase-nav button").count(),8);
        assert.equal(await page.locator("#you-do .rhs-y-code-first:not([hidden])").count(),1);
        assert.equal(await page.locator("#you-do .rhs-y-code-check").count(),1);
        assert.deepEqual(await page.locator("#you-do .rhs-y-stage").evaluateAll(
          screens=>screens.slice(0,2).map(el=>el.innerHTML)),originalCode,
          "Code First and worked answer were altered in Lesson "+lesson);
        assert.equal(await page.locator("#do-now").innerText(),doNow);
        const advance=async()=>{
          const b=page.locator("#advance");
          if(size.label==="mobile")await b.evaluate(el=>el.click());
          else await b.click();
        };
        await advance();
        assert.equal(await page.locator("#you-do .rhs-y-code-check:not([hidden])").count(),1);
        await advance();
        assert.equal(await page.locator("#you-do .rhs-bank-question-stage:not([hidden])").count(),1);
        assert.equal(await page.locator("#you-do .rhs-bank-card").count(),4);
        assert.match(await page.locator("#you-do .rhs-bank-card").first().innerText(),fixture.first);
        const header=await page.locator("#you-do .rhs-bank-question-stage .rhs-bank-head").innerText();
        assert.match(header,/ADDITIONAL EXAM PRACTICE/is);
        assert.match(header,new RegExp(fixture.marks+" MARKS"));
        const visual=await page.locator("#you-do .rhs-bank-question-stage .rhs-bank-visual-qa").count();
        assert.equal(visual,0,"Teacher-review warnings must not appear on lesson "+lesson);
        const firstFont=await page.locator("#you-do .rhs-bank-prompt").first()
          .evaluate(e=>parseFloat(getComputedStyle(e).fontSize));
        assert(firstFont>=19,"Question font too small in "+lesson+" "+size.label);
        for(let i=0;i<4;i++){
          await advance();
          const answer=page.locator("#you-do .rhs-bank-review-stage:not([hidden])");
          assert.equal(await answer.count(),1);
          assert.match(await answer.locator(".rhs-bank-label").first().innerText(),
            new RegExp(fixture.ids[i]));
          assert((await answer.locator(".rhs-bank-answer-point").count())>0);
          assert.match(await answer.locator(".rhs-bank-scoring").innerText(),/HOW TO AWARD MARKS/);
          assert.equal(await answer.locator(".rhs-bank-visual-qa").count(),0,
            "Teacher-review warning must not appear in model answer "+fixture.ids[i]);
        }
        await advance();
        await page.locator("#vocabulary.active").waitFor();
        assert.deepEqual(errors,[],"Browser errors "+lesson+" "+size.label);
        console.log("PASS L"+lesson+" "+size.label+": Code First kept, four bank questions, four answers, visual metadata retained in GitHub");
        await page.close();
      }
    }
  }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

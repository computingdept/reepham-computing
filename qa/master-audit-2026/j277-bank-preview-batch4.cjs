"use strict";
const assert=require("node:assert/strict");
const fs=require("node:fs");
const {chromium}=require("playwright");
const origin=process.env.QA_ORIGIN||"http://127.0.0.1:8765";
const fixtures={
 "110":{ids:["RHS-J277-096","RHS-J277-097"],marks:4,figures:0,first:/music archive.*insertion sort.*bubble sort/is},
 "111":{ids:["RHS-J277-094","RHS-J277-095"],marks:4,figures:0,first:/visitor-centre.*insertion sort/is},
 "112":{ids:["RHS-J277-040","RHS-J277-150","RHS-J277-205"],marks:8,figures:1,first:/weather station.*eight readings/is},
 "114":{ids:["RHS-J277-107","RHS-J277-155","RHS-J277-156","RHS-J277-114"],marks:8,figures:2,first:/theatre alarm.*reset algorithm/is},
 "115":{ids:["RHS-J277-115","RHS-J277-161"],marks:9,figures:2,first:/warehouse.*seven sensor records/is}
};
(async()=>{
 const map=JSON.parse(fs.readFileSync("data/exam-questions/j277-youdo-lesson-map.json","utf8"));
 const browser=await chromium.launch({headless:true});
 try{
  for(const [lesson,fix] of Object.entries(fixtures)){
   const base=origin+"/lessons/j277/lesson-"+lesson+"/";
   const src=JSON.parse(fs.readFileSync("lessons/j277/autumn2-"+lesson+".json","utf8"))[lesson];
   const archive=JSON.parse(fs.readFileSync("data/exam-questions/archive/j277-lesson-"+lesson+"-original-youdo-20261122.json","utf8"));
   assert.deepEqual(archive.code_first,src.k,"Original Code First archive mismatch L"+lesson);
   assert.deepEqual(archive.original_exam_questions,src.e,"Original exam questions/answers archive mismatch L"+lesson);
   assert.deepEqual(archive.previous_learning_exam,src.priorExam||null);
   const row=map.lessons.find(x=>x.lesson_id===lesson);
   assert(row,"Missing lesson map L"+lesson);
   assert.equal(row.teacher_approved,false);
   assert.equal(row.published_bank_override_enabled,false);
   assert.equal(row.archive_source,"data/exam-questions/archive/j277-lesson-"+lesson+"-original-youdo-20261122.json");
   assert.deepEqual(row.additional_exam_practice.map(x=>x.rhs_question_id),fix.ids);
   assert.equal(row.additional_exam_practice.filter(x=>x.visual_decision==="requires_source_figure_review").length,fix.figures);
   const student=await browser.newPage();
   await student.goto(base+"#you-do",{waitUntil:"domcontentloaded"});
   await student.locator("#you-do .rhs-y-code-first").waitFor({timeout:30000});
   assert.equal(await student.locator("#you-do .rhs-y-stage").count(),7);
   assert.equal(await student.locator("#you-do .rhs-bank-card").count(),0,"Preview content leaked into default lesson");
   const originalCode=await student.locator("#you-do .rhs-y-stage").evaluateAll(stages=>stages.slice(0,2).map(s=>s.innerHTML));
   const doNow=await student.locator("#do-now").innerText();
   await student.close();
   for(const viewport of [
    {label:"desktop",width:1920,height:1080},
    {label:"projector",width:1300,height:635},
    {label:"mobile",width:390,height:844}
   ]){
    const page=await browser.newPage({viewport:{width:viewport.width,height:viewport.height}});
    const errors=[];page.on("pageerror",e=>errors.push(e.message));
    await page.goto(base+"?exam-bank-preview=1#you-do",{waitUntil:"domcontentloaded"});
    await page.locator("#you-do[data-rhs-bank-preview=true] .rhs-bank-stage").first().waitFor({state:"attached",timeout:30000});
    assert.equal(await page.locator(".phase-nav button").count(),8,"Must keep existing lesson phases");
    assert.equal(await page.locator("#exam-practice, .phase-nav [data-page=exam-practice]").count(),0,"Extra exam phase forbidden");
    const questionPages=await page.locator("#you-do .rhs-bank-question-stage").count();
    if(lesson==="114"){
     assert(questionPages>=2&&questionPages<=4,
       "Lesson 114 must use two questions per screen, or one on overflow");
    }else assert.equal(questionPages,1,"Other lessons retain their existing overview");
    assert.equal(await page.locator("#you-do .rhs-y-stage").count(),
      2+questionPages+fix.ids.length);
    assert.equal(await page.locator("#you-do .rhs-y-code-first:not([hidden])").count(),1);
    assert.equal(await page.locator("#you-do .rhs-y-code-check").count(),1);
    assert.deepEqual(await page.locator("#you-do .rhs-y-stage").evaluateAll(stages=>stages.slice(0,2).map(s=>s.innerHTML)),originalCode,"Code First and answer must remain identical");
    assert.equal(await page.locator("#do-now").innerText(),doNow);
    assert.equal(await page.locator("#you-do .rhs-bank-visual-qa").count(),0,"No visual QA banners on lesson");
    assert.doesNotMatch(await page.locator("#you-do").innerText(),/needs teacher review|Teacher QA|UNAPPROVED PREVIEW/i);
    const advance=async()=>{
     const btn=page.locator("#advance");
     if(viewport.label==="mobile")await btn.evaluate(el=>el.click());else await btn.click();
    };
    await advance();assert.equal(await page.locator("#you-do .rhs-y-code-check:not([hidden])").count(),1);
    await advance();assert.equal(await page.locator("#you-do .rhs-bank-question-stage:not([hidden])").count(),1);
    assert.equal(await page.locator("#you-do .rhs-bank-card").count(),fix.ids.length);
    assert.match(await page.locator("#you-do .rhs-bank-card").first().innerText(),fix.first);
    const heading=await page.locator("#you-do .rhs-bank-question-stage").first().locator(".rhs-bank-head").innerText();
    assert.match(heading,/ADDITIONAL EXAM PRACTICE/i);
    assert.match(heading,new RegExp(fix.marks+" MARKS"));
    const font=await page.locator("#you-do .rhs-bank-prompt").first().evaluate(el=>parseFloat(getComputedStyle(el).fontSize));
    assert(font>=19,"Question too small on "+viewport.label);
    for(let p=0;p<questionPages;p++){
     const current=page.locator("#you-do .rhs-bank-question-stage:not([hidden])");
     assert.equal(await current.count(),1,"Exactly one question screen visible");
     if(lesson==="114"){
      const cards=current.locator(".rhs-bank-card");
      const count=await cards.count();
      assert(count>=1&&count<=2,"Question count must be one or two per screen");
      if(viewport.label==="mobile")assert.equal(count,1,"Mobile shows one complete question");
      if(viewport.label!=="mobile"){
       const overflow=await current.evaluate(root=>{
        return [root,...root.querySelectorAll(".rhs-bank-grid,.rhs-bank-card")].some(el=>
          el.clientHeight>0 && el.scrollHeight>el.clientHeight+3);
       });
       assert.equal(overflow,false,"Projected exam questions should not need scrolling");
      }
     }
     if(p<questionPages-1)await advance();
    }
    for(let i=0;i<fix.ids.length;i++){
     await advance();
     const answer=page.locator("#you-do .rhs-bank-review-stage:not([hidden])");
     assert.equal(await answer.count(),1,"One answer per screen");
     assert.match(await answer.locator(".rhs-bank-label").first().innerText(),new RegExp(fix.ids[i]));
     assert((await answer.locator(".rhs-bank-answer-point").count())>=1);
     assert.match(await answer.locator(".rhs-bank-scoring").innerText(),/HOW TO AWARD MARKS/);
     assert.equal(await answer.locator(".rhs-bank-visual-qa").count(),0);
    }
    await advance();await page.locator("#vocabulary.active").waitFor();
    assert.deepEqual(errors,[],"Browser errors L"+lesson+" "+viewport.label);
    await page.close();
    console.log("PASS L"+lesson+" "+viewport.label+": Code First intact; "+fix.ids.length+" questions and answers; no teacher review flags");
   }
  }
  // Lesson 113 has no mapped bank questions and a protected You Do renderer.
  const excluded=map.lessons.find(x=>x.lesson_id==="113");
  assert.equal(excluded.mapping_status,"unmapped");
  const page=await browser.newPage();
  await page.goto(origin+"/lessons/j277/lesson-113/?exam-bank-preview=1#you-do",{waitUntil:"domcontentloaded"});
  assert.equal(await page.locator("#you-do .rhs-bank-card").count(),0,"Unmapped lesson 113 was accidentally modified");
  await page.close();
 }finally{await browser.close();}
})().catch(err=>{console.error(err);process.exitCode=1;});

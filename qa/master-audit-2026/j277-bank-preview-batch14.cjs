"use strict";
const assert=require("node:assert/strict");
const fs=require("node:fs");
const {chromium}=require("playwright");
const origin=process.env.QA_ORIGIN||"http://127.0.0.1:8765";
const fixtures={
 "161":{ids:["RHS-J277-057","RHS-J277-120","RHS-J277-173","RHS-J277-189","RHS-J277-001"],marks:12,figures:3,first:/gallery.*converting image reference numbers/is},
 "162":{ids:["RHS-J277-106","RHS-J277-202","RHS-J277-203","RHS-J277-215","RHS-J277-216","RHS-J277-214"],marks:20,figures:0,first:/museum alarm.*Boolean variables/is},
 "163":{ids:["RHS-J277-181","RHS-J277-123","RHS-J277-124","RHS-J277-182"],marks:14,figures:0,first:/airport.*mesh network.*star network/is},
 "164":{ids:["RHS-J277-068","RHS-J277-131","RHS-J277-171","RHS-J277-195","RHS-J277-056"],marks:6,figures:1,first:/wildlife photographer.*bitmap pictures.*metadata/is}

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
    assert(questionPages>=1&&questionPages<=fix.ids.length,
      "Bank questions must be paginated without duplication or omissions");
    if(["161","162"].includes(lesson))assert.equal(questionPages,fix.ids.length,
      "Calculations and unseen-code questions require their own pages");
    if(lesson==="163")assert(questionPages>=2&&questionPages<=4,
      "Short final revision questions may pair, splitting if needed");
    if(lesson==="164")assert(questionPages>=3&&questionPages<=5,
      "Mixed small consolidation questions remain legible");
    assert.equal(await page.locator("#you-do .rhs-bank-review-stage").count(),fix.ids.length,
      "Each bank question requires one complete matching marking screen");
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
     const cards=current.locator(".rhs-bank-card");
     const count=await cards.count();
     assert(count>=1&&count<=2,"Long-form/code questions must appear alone or in pairs");
     if(viewport.label==="mobile")assert.equal(count,1,"Mobile uses one complete question per screen");
     if(["161","162"].includes(lesson))assert.equal(count,1,
       "Each conversion, binary addition or unseen-code question gets its own full slide");
     assert(count>=1&&count<=2,"No more than two bank questions on a projected slide");
     if(viewport.label!=="mobile"){
      const overflow=await current.evaluate(root=>{
       return [root,...root.querySelectorAll(".rhs-bank-grid,.rhs-bank-card")].some(el=>
         el.clientHeight>0 && el.scrollHeight>el.clientHeight+3);
      });
      assert.equal(overflow,false,"Projected exam questions should not require scrolling");
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
  // There is no Lesson 165 in the current repository: never invent one.
  assert.equal(map.lessons.some(x=>x.lesson_id==="165"),false,
    "Lesson 165 unexpectedly exists; this batch needs a separate mapping review");
  // Timed Paper 1 and timed Paper 2 remain protected.
  for(const lesson of ["156","157"]){
   const excluded=map.lessons.find(x=>x.lesson_id===lesson);
   assert.equal(excluded.mapping_status,"unmapped");
   assert.equal(excluded.published_bank_override_enabled,false);
   const page=await browser.newPage();
   await page.goto(origin+"/lessons/j277/lesson-"+lesson+"/?exam-bank-preview=1#you-do",
     {waitUntil:"domcontentloaded"});
   assert.equal(await page.locator("#you-do .rhs-bank-card").count(),0,
     "Protected Lesson "+lesson+" must never receive bank questions");
   await page.close();
  }
 }finally{await browser.close();}
})().catch(err=>{console.error(err);process.exitCode=1;});

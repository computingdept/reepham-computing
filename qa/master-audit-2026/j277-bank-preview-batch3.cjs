"use strict";
const assert=require("node:assert/strict");
const fs=require("node:fs");
const {chromium}=require("playwright");
const origin=process.env.QA_ORIGIN||"http://127.0.0.1:8765";
const fixtures={
 "105":{ids:["RHS-J277-032","RHS-J277-167","RHS-J277-168","RHS-J277-213"],marks:7,figures:1,first:/travel-booking app.*smaller tasks/is},
 "106":{ids:["RHS-J277-036","RHS-J277-037","RHS-J277-145"],marks:11,figures:2,first:/aquarium caf[eé].*half-price/is},
 "107":{ids:["RHS-J277-039","RHS-J277-091","RHS-J277-163","RHS-J277-222"],marks:15,figures:4,first:/events venue.*employee IDs/is},
 "108":{ids:["RHS-J277-042","RHS-J277-162","RHS-J277-207","RHS-J277-208"],marks:8,figures:1,first:/pet shop.*animal IDs/is},
 "109":{ids:["RHS-J277-041","RHS-J277-148","RHS-J277-149"],marks:8,figures:0,first:/warehouse.*sorted list/is}
};
(async()=>{
 const map=JSON.parse(fs.readFileSync("data/exam-questions/j277-youdo-lesson-map.json","utf8"));
 const browser=await chromium.launch({headless:true});
 try{
  for(const [lesson,fix] of Object.entries(fixtures)){
   const base=origin+"/lessons/j277/lesson-"+lesson+"/";
   const source=JSON.parse(fs.readFileSync("lessons/j277/autumn2-"+lesson+".json","utf8"))[lesson];
   const archive=JSON.parse(fs.readFileSync("data/exam-questions/archive/j277-lesson-"+lesson+"-original-youdo-20261122.json","utf8"));
   assert.deepEqual(archive.code_first,source.k,"Code First source archive mismatch L"+lesson);
   assert.deepEqual(archive.original_exam_questions,source.e,"Original exam Q&A source archive mismatch L"+lesson);
   assert.deepEqual(archive.previous_learning_exam,source.priorExam||null,"Previous-learning Q&A archive mismatch");
   const row=map.lessons.find(x=>x.lesson_id===lesson);
   assert(row,"Missing lesson bank mapping");
   assert.equal(row.teacher_approved,false);
   assert.equal(row.published_bank_override_enabled,false);
   assert.equal(row.archive_source,"data/exam-questions/archive/j277-lesson-"+lesson+"-original-youdo-20261122.json");
   assert.deepEqual(row.additional_exam_practice.map(x=>x.rhs_question_id),fix.ids);
   assert.equal(row.additional_exam_practice.filter(x=>x.visual_decision==="requires_source_figure_review").length,fix.figures);
   const ordinary=await browser.newPage();
   await ordinary.goto(base+"#you-do",{waitUntil:"domcontentloaded"});
   await ordinary.locator("#you-do .rhs-y-code-first").waitFor({timeout:30000});
   assert.equal(await ordinary.locator("#you-do .rhs-y-stage").count(),7,"Default seven-stage layout changed");
   assert.equal(await ordinary.locator("#you-do .rhs-bank-card").count(),0,"Preview leaked to ordinary lesson");
   const originalCode=await ordinary.locator("#you-do .rhs-y-stage").evaluateAll(stages=>stages.slice(0,2).map(s=>s.innerHTML));
   const doNow=await ordinary.locator("#do-now").innerText();
   await ordinary.close();
   for(const size of [
    {label:"projector",width:1920,height:1080},
    {label:"compact",width:1300,height:635},
    {label:"mobile",width:390,height:844}
   ]){
    const page=await browser.newPage({viewport:{width:size.width,height:size.height}});
    const errors=[];page.on("pageerror",e=>errors.push(e.message));
    await page.goto(base+"?exam-bank-preview=1#you-do",{waitUntil:"domcontentloaded"});
    await page.locator("#you-do[data-rhs-bank-preview=true] .rhs-bank-stage").first().waitFor({state:"attached",timeout:30000});
    assert.equal(await page.locator(".phase-nav button").count(),8);
    assert.equal(await page.locator("#exam-practice, .phase-nav [data-page=exam-practice]").count(),0);
    assert.equal(await page.locator("#you-do .rhs-y-stage").count(),3+fix.ids.length);
    assert.equal(await page.locator("#you-do .rhs-y-code-first").count(),1);
    assert.equal(await page.locator("#you-do .rhs-y-code-check").count(),1);
    assert.deepEqual(await page.locator("#you-do .rhs-y-stage").evaluateAll(stages=>stages.slice(0,2).map(s=>s.innerHTML)),originalCode);
    assert.equal(await page.locator("#do-now").innerText(),doNow);
    const visibleText=await page.locator("#you-do").innerText();
    assert.doesNotMatch(visibleText,/needs teacher review|Teacher QA|UNAPPROVED PREVIEW/i,"Internal review label is on screen");
    assert.equal(await page.locator("#you-do .rhs-bank-visual-qa").count(),0);
    const advance=async()=>{
     const control=page.locator("#advance");
     if(size.label==="mobile")await control.evaluate(el=>el.click());else await control.click();
    };
    await advance();
    assert.equal(await page.locator("#you-do .rhs-y-code-check:not([hidden])").count(),1);
    await advance();
    assert.equal(await page.locator("#you-do .rhs-bank-question-stage:not([hidden])").count(),1);
    assert.equal(await page.locator("#you-do .rhs-bank-card").count(),fix.ids.length);
    assert.match(await page.locator("#you-do .rhs-bank-card").first().innerText(),fix.first);
    const title=await page.locator("#you-do .rhs-bank-question-stage .rhs-bank-head").innerText();
    assert.match(title,/ADDITIONAL EXAM PRACTICE/i);
    assert.match(title,new RegExp(fix.marks+" MARKS"));
    const font=await page.locator("#you-do .rhs-bank-prompt").first().evaluate(el=>parseFloat(getComputedStyle(el).fontSize));
    assert(font>=19,"Exam prompt too small");
    for(let i=0;i<fix.ids.length;i++){
     await advance();
     const answer=page.locator("#you-do .rhs-bank-review-stage:not([hidden])");
     assert.equal(await answer.count(),1,"Exactly one answer screen at a time");
     assert.match(await answer.locator(".rhs-bank-label").first().innerText(),new RegExp(fix.ids[i]));
     assert((await answer.locator(".rhs-bank-answer-point").count())>0);
     assert.match(await answer.locator(".rhs-bank-scoring").innerText(),/HOW TO AWARD MARKS/);
     assert.equal(await answer.locator(".rhs-bank-visual-qa").count(),0);
    }
    await advance();
    await page.locator("#vocabulary.active").waitFor();
    assert.deepEqual(errors,[],"Browser errors L"+lesson+" "+size.label);
    await page.close();
    console.log("PASS L"+lesson+" "+size.label+": Code First unchanged; "+fix.ids.length+" mapped questions/answers; QA flags off screen");
   }
  }
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

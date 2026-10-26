'use strict';
const {chromium}=require('playwright');
const origin=process.env.QA_ORIGIN||'http://127.0.0.1:8765';
const sections=['1-1','2-1'];
const views=[['classroom TV',1920,1080],['phone',390,844]];
let checks=0;
const failures=[];
function assert(ok,label,detail){checks++;if(!ok){const fail={label,detail};failures.push(fail);console.error('J277_MCQ_FAIL '+JSON.stringify(fail));}}
(async()=>{
 const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 try{
  for(const [view,width,height] of views){
   const context=await browser.newContext({viewport:{width,height},isMobile:view==='phone',hasTouch:view==='phone'});
   const page=await context.newPage();
   for(const id of sections){
    const errors=[],onerror=e=>errors.push(String(e));page.on('pageerror',onerror);
    const url=origin+'/revision/j277/section-'+id+'/index.html';
    try{
     const resp=await page.goto(url,{waitUntil:'networkidle',timeout:25000});
     assert(resp?.status()===200,view+' '+id+' HTTP 200',resp?.status());
     assert((await page.locator('#topic-grid .topic').count())===3,view+' '+id+' three skills');
     const bank=await page.evaluate(()=>({skills:SKILLS.map(s=>({id:s.id,title:s.title,count:s.questions.length,valid:s.questions.every(q=>q.options.length===4&&q.options.includes(q.answer)&&new Set(q.options).size===4)})),section:J277_SECTION.code}));
     assert(bank.section===id.replace('-','.'),view+' '+id+' correct section',bank.section);
     assert(bank.skills.every(s=>s.count===10&&s.valid),view+' '+id+' original question bank',bank.skills);
     const first=bank.skills[0].id;
     await page.locator('#topic-grid .topic button').first().click();
     await page.waitForFunction(()=>!document.getElementById('quiz').hidden);
     assert(await page.locator('#counter').innerText()==='Question 1 of 5',view+' '+id+' five-question attempt');
     const firstPrompts=[];
     for(let i=0;i<5;i++){
      const before=await page.evaluate(()=>({prompt:document.getElementById('prompt').textContent,answer:SKILLS.flatMap(s=>s.questions).find(q=>q.prompt===document.getElementById('prompt').textContent)?.answer,disabled:document.getElementById('check').disabled}));
      firstPrompts.push(before.prompt);
      assert(before.disabled,view+' '+id+' '+i+' no empty answers');
      await page.locator('input[name=answer]').evaluateAll((inputs,a)=>inputs.find(e=>e.value===a)?.closest('label')?.click(),before.answer);
      await page.locator('#check').click();
      assert(!(await page.locator('#feedback').isHidden()),view+' '+id+' '+i+' explanation revealed');
      await page.locator('#next').click();
     }
     assert(await page.locator('#score').innerText()==='100%',view+' '+id+' perfect results');
     const persisted=await page.evaluate(()=>JSON.stringify(localStorage));
     assert(persisted.includes(first),view+' '+id+' saves local progress');
     await page.locator('#retry').click();
     const nextPrompt=await page.locator('#prompt').innerText();
     assert(!firstPrompts.includes(nextPrompt),view+' '+id+' retry changes question set',nextPrompt);
     const over=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
     assert(over<=5,view+' '+id+' fits viewport',over);
     await page.goto(url,{waitUntil:'networkidle'});
     const state=await page.locator('#topic-grid .topic .status').first().innerText();
     assert(state.includes('80% reached'),view+' '+id+' stored mastery after reload',state);
     assert(!errors.length,view+' '+id+' no JavaScript errors',errors);
     console.log('J277_MCQ_SURVEY '+JSON.stringify({view,id,bankQuestions:bank.skills.reduce((n,x)=>n+x.count,0),screens:'directory quiz feedback results retry reload',mastery:state,overflow:over}));
    }catch(e){assert(false,view+' '+id+' browser exception',String(e).slice(0,400))}
    finally{page.off('pageerror',onerror);}
   }
   await context.close();
  }
 }finally{await browser.close();}
 console.log('J277_MCQ_SUMMARY '+JSON.stringify({sections:sections.length,views:views.length,checks,failures:failures.length,details:failures}));
 if(failures.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1});

/* Full J277 + H446 Catch Up functional audit. Executes every route in Chromium. */
'use strict';
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const {chromium}=require('playwright');
const ROOT=path.resolve(__dirname,'../..');
const pad=n=>String(n).padStart(3,'0');
const rel=p=>path.join(ROOT,p);
const load=p=>fs.readFileSync(rel(p),'utf8');
const json=p=>JSON.parse(load(p));
const ids=[
 ...Array.from({length:164},(_,i)=>['j277',i+1]),
 ...Array.from({length:160},(_,i)=>['h446',i+1]),
 ...Array.from({length:140},(_,i)=>['h446',i+181])
];
const src=load('assets/j277-catchup-builder.js');
const scope={window:{}};
scope.fetch=async url=>{
  const resolved=new URL(url,'http://127.0.0.1:8765/lessons/j277/lesson-031/learn.html');
  const location=decodeURIComponent(resolved.pathname).replace(/^\/+/,'');
  const filename=rel(location);
  return {ok:fs.existsSync(filename),json:async()=>json(location)};
};
vm.runInNewContext(src,scope,{filename:'assets/j277-catchup-builder.js'});
const failures=[];
const meta=[];
const expected=new Map();
function fail(course,n,reason){failures.push({lesson:course+'-'+pad(n),reason:String(reason)});}
function assert(ok,why){if(!ok)throw Error(why);}
function validate(cfg,course,n){
  const id=course+'-'+pad(n);
  assert(cfg && cfg.id===id,'incorrect config ID');
  assert(typeof cfg.title==='string' && cfg.title.trim(),'title missing');
  assert(cfg.year===(course==='j277'?(n>=100?11:10):(n>=181?13:12)),'wrong year');
  assert(Number(cfg.pass_percent)===80,'incorrect mastery threshold');
  assert(Array.isArray(cfg.stages) && cfg.stages.length===5,'not five stages');
  assert(cfg.stages.every(s=>Array.isArray(s.questions)),'questions missing');
  assert(cfg.stages[0].questions.length===4,'not four Do Now questions');
  const questions=cfg.stages.flatMap(s=>s.questions);
  assert(new Set(questions.map(q=>q.id)).size===questions.length,'duplicate question ID');
  for(const q of questions){
    assert(typeof q.id==='string'&&q.id,'question ID missing');
    assert(typeof q.prompt==='string'&&q.prompt.trim(),'question text missing');
    assert(q.answer!==undefined&&q.answer!==null,'question answer missing');
    assert(['number','choice','truefalse','match','order'].includes(q.kind),'unknown question type '+q.kind);
    if(q.kind==='choice'){
      assert(Array.isArray(q.options)&&q.options.length>=2,'empty choice options');
      assert(q.options.includes(q.answer),'correct answer not among choices');
    }
    if(q.kind==='match')assert(Array.isArray(q.pairs)&&q.pairs.length>0,'empty matching pairs');
    if(q.kind==='order')assert(Array.isArray(q.items)&&Array.isArray(q.answer),'invalid ordering');
  }
  return questions.length;
}
function norm(s){
  return String(s||'').replace(/&amp;/g,'&').replace(/<[^>]*>/g,'').replace(/&nbsp;/g,' ')
    .replace(/\s+/g,' ').trim().toLowerCase().replace(/\band\b/g,'&');
}
function classroomTitle(course,n){
  const html=load('lessons/'+course+'/lesson-'+pad(n)+'/index.html');
  let m=html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if(m)return m[1].replace(/<[^>]*>/g,'').replace(/&amp;/g,'&').trim();
  if(course==='j277'){
    const p='lessons/j277/autumn2-'+pad(n)+'.json';
    if(fs.existsSync(rel(p)))return json(p)[pad(n)]?.t||null;
  }
  return null;
}
async function main(){
  for(const [course,n] of ids){
    const p=pad(n);
    try{
      const entry='lessons/'+course+'/lesson-'+p+'/learn.html';
      const html=load(entry);
      assert(html.includes('assets/catchup-lesson.js'),'lesson engine missing');
      assert(html.includes('assets/catchup-lesson.css'),'CSS missing');
      let cfg;
      if(course==='j277'&&n>=31){
        assert(/data-catchup-config="auto"/.test(html),'generated J277 route not configured');
        cfg=await scope.window.J277CatchupBuilder.build(p);
      }else{
        const data='data/catchup/'+course+'-'+p+'.json';
        assert(html.includes('catchup/'+course+'-'+p+'.json'),'incorrect JSON route');
        cfg=json(data);
      }
      const q=validate(cfg,course,n);
      expected.set(course+'-'+p,course==='j277'&&n===1?'Binary & Denary':cfg.title);
      const original=classroomTitle(course,n);
      meta.push({course,n,title:cfg.title,questions:q,classroomTitle:original,
        titleMatch:!original||norm(original)===norm(cfg.title)});
    }catch(err){fail(course,n,'STATIC: '+err.message);}
  }
  console.log('Static audit: '+meta.length+'/'+ids.length+' lesson routes and configs passed');
  const titleMismatch=meta.filter(m=>!m.titleMatch);
  console.log('Classroom title mismatches: '+titleMismatch.length);
  for(const m of titleMismatch.slice(0,30))console.log('TITLE: '+m.course+'-'+pad(m.n)+' expected '+m.classroomTitle+' got '+m.title);
  if(failures.length)console.log('Static failures: '+JSON.stringify(failures.slice(0,30)));
  const browser=await chromium.launch({headless:true});
  const context=await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:1});
  let i=0,pass=0;
  async function worker(){
    const page=await context.newPage();
    while(true){
      const k=i++;
      if(k>=ids.length)break;
      const [course,n]=ids[k],id=course+'-'+pad(n);
      try{
        await page.goto('http://127.0.0.1:8765/lessons/'+course+'/lesson-'+pad(n)+'/learn.html',
          {waitUntil:'domcontentloaded',timeout:20000});
        await page.locator('#catchup-stage-title').waitFor({state:'visible',timeout:12000});
        const title=await page.locator('.catchup-title-lockup h1').textContent();
        assert(norm(title)===norm(expected.get(id)),'header title differs: '+title);
        assert(await page.locator('.catchup-question').count()===4,'Do Now question count wrong');
        assert(await page.locator('.catchup-progress button').count()===5,'progress steps not five');
        assert(await page.locator('#catchup-intro').isHidden(),'duplicate intro visible');
        assert(await page.locator('.catchup-top-inner a:not(.rhsc-site-nav-button)').filter({hasText:/^(Teach|Print|Lesson)$/i}).count()===0 ||
          await page.locator('.catchup-top-inner a:not(.rhsc-site-nav-button)').filter({hasText:/^(Teach|Print|Lesson)$/i}).first().isHidden(),
          'Teach/Print control still visible');
        await page.locator('.catchup-progress button').nth(3).click();
        assert(await page.locator('.catchup-question').count()>=2,'You Do did not render');
        pass++;
      }catch(err){fail(course,n,'BROWSER: '+err.message.split('\n')[0]);}
      if((k+1)%50===0)console.log('Browser audited '+(k+1)+'/'+ids.length);
    }
    await page.close();
  }
  await Promise.all(Array.from({length:8},worker));
  await context.close();
  await browser.close();
  const report={checked:ids.length,static_passed:meta.length,browser_passed:pass,
    title_mismatch:titleMismatch,failures};
  const reportPath=rel('qa/catchup/audit-result.json');
  fs.writeFileSync(reportPath,JSON.stringify(report,null,2)+'\n');
  console.log('FULL COURSE: '+pass+'/'+ids.length+' passed interactive browser checks; '+failures.length+' failures');
  for(const e of failures.slice(0,60))console.log('FAIL '+e.lesson+': '+e.reason);
  if(failures.length||pass!==ids.length)process.exitCode=1;
}
main().catch(e=>{console.error(e);process.exitCode=1;});

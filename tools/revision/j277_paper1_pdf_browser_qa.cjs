const {chromium}=require('playwright');
const http=require('node:http'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const base=path.resolve('review/j277-paper1-v3-20261028/verified'),file='J277_Paper_1_DIGITAL_STUDENT_REVIEW_V3_UNPUBLISHED.pdf';
const bytes=fs.statSync(path.join(base,file)).size;
const server=http.createServer((req,res)=>{
 const url=new URL(req.url,'http://127.0.0.1');
 if(url.pathname==='/pdf'){
  const p=path.join(base,file);res.setHeader('Content-Type','application/pdf');res.setHeader('Accept-Ranges','bytes');
  const range=req.headers.range;
  if(range){const m=/bytes=(\d+)-(\d*)/.exec(range);
   if(m){const from=+m[1],to=Math.min(m[2]?+m[2]:bytes-1,bytes-1);
    res.writeHead(206,{'Content-Length':to-from+1,'Content-Range':`bytes ${from}-${to}/${bytes}`});
    return fs.createReadStream(p,{start:from,end:to}).pipe(res)}}
  res.writeHead(200,{'Content-Length':bytes});return fs.createReadStream(p).pipe(res);
 }
 res.writeHead(200,{'Content-Type':'text/html'});res.end(`<!doctype html><meta name="viewport" content="width=device-width,initial-scale=1"><style>*{box-sizing:border-box}body{margin:0;background:white;font:16px Arial}main{height:100dvh;display:flex;flex-direction:column}header{padding:8px 12px;height:44px}iframe{width:100%;height:calc(100dvh - 44px);border:0}</style><main><header>J277 Paper 1 — V3 browser PDF review</header><iframe title="J277 Paper 1" src="/pdf#page=6"></iframe></main>`);
});
(async()=>{
 await new Promise(resolve=>server.listen(8767,'127.0.0.1',resolve));
 const browser=await chromium.launch({headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
 const logs=[];
 for(const [name,width,height] of [['mobile-portrait',390,844],['classroom-tv',1920,1080]]){
  const context=await browser.newContext({viewport:{width,height},deviceScaleFactor:1,isMobile:width===390,hasTouch:width===390});
  const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));const t=Date.now();
  try{
   await page.goto('http://127.0.0.1:8767/',{waitUntil:'domcontentloaded',timeout:30000});
   await page.waitForTimeout(5000);
   const info=await page.evaluate(()=>({iframe:document.querySelector('iframe')?.getBoundingClientRect().toJSON(),horizontalOverflow:document.documentElement.scrollWidth-innerWidth}));
   const pdfRes=await context.request.get('http://127.0.0.1:8767/pdf',{headers:{Range:'bytes=0-4095'},timeout:25000});
   assert.equal(pdfRes.status(),206);assert.match(pdfRes.headers()['content-type'],/pdf/);
   const png=`review/j277-paper1-v3-20261028/verified/browser-${name}.png`;
   await page.screenshot({path:png});
   logs.push({mode:name,viewport:[width,height],pdfBytes:bytes,servedPdfRange:true,iframeVisible:info.iframe.width>width*.8&&info.iframe.height>height*.7,noHorizontalOverflow:info.horizontalOverflow<=0,seconds:Math.round((Date.now()-t)/1000),pageErrors:errors,screenshotBytes:fs.statSync(png).size,nativePdfViewerActuallyRendered:'NOT_CONFIRMED_BY_DOM',browserTester:'Chromium headless Linux, not a physical smartphone'});
  }catch(e){logs.push({mode:name,error:String(e),browserTester:'Chromium headless Linux'})}
  await context.close();
 }
 await browser.close();server.close();
 fs.writeFileSync(path.join(base,'BROWSER_EMULATION_QA.json'),JSON.stringify(logs,null,2)+'\n');
 console.log(JSON.stringify(logs,null,2));
 if(logs.some(x=>x.error||!x.servedPdfRange||!x.iframeVisible||!x.noHorizontalOverflow))process.exitCode=1;
})();
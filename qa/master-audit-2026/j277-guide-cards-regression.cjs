/* Focused H446/J277 Revision Guides visual-contract regression.
   This intentionally excludes unrelated Revision Practice/quiz UI work. */
const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const { writeFileSync, mkdirSync } = require("node:fs");
const base="http://127.0.0.1:8765";
(async()=>{
  const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
  try{
    mkdirSync("/tmp/j277-guide-layout",{recursive:true});
    for(const viewport of [{width:1280,height:800,name:"tv"},{width:390,height:844,name:"phone"}]){
      const snapshots={};
      for(const course of ["h446","j277"]){
        const context=await browser.newContext({viewport:{width:viewport.width,height:viewport.height},deviceScaleFactor:1});
        const page=await context.newPage();
        await page.goto(base+"/"+course+"-hub.html#booklet",{waitUntil:"networkidle"});
        await page.locator('[data-tab="booklet"]').click();
        if(course==="j277"){
          const yearSwitch=page.locator(".year-switch");
          assert.equal(await yearSwitch.isVisible(),false,"J277 Guides must hide year selector");
          await page.locator('[data-tab="revisionhub"]').click();
          assert.equal(await yearSwitch.isVisible(),false,"J277 Practice must hide year selector");
          await page.locator('[data-tab="lessons"]').click();
          assert.equal(await yearSwitch.isVisible(),true,"J277 Lessons must retain year selector");
          await page.locator('[data-tab="booklet"]').click();
        }
        const result=await page.evaluate((course)=>{
          const panel=document.querySelector("#booklet");
          const cards=[...panel.querySelectorAll(".h446-guide-card")];
          function style(selector,props){
            const el=panel.querySelector(selector);
            assertPresent(el,selector);
            const css=getComputedStyle(el);
            return Object.fromEntries(props.map(k=>[k,css.getPropertyValue(k).trim()]));
          }
          function assertPresent(el,name){if(!el)throw Error("Missing element: "+name)}
          const grid=panel.querySelector(course==="j277"?".j277-guide-grid":".cards.h446-guides");
          assertPresent(grid,"two-column guide grid");
          return {
            panelVisible:getComputedStyle(panel).display!=="none",
            header:panel.querySelector(".summary h2")?.textContent.trim(),
            count:cards.length,
            unitLinks:[...panel.querySelectorAll(".j277-unit-link")].map(a=>({href:a.getAttribute("href"),blank:a.target==="_blank",label:a.textContent.trim()})),
            gridCols:getComputedStyle(grid).gridTemplateColumns.split(" ").length,
            unitGridCols:[...panel.querySelectorAll(".j277-unit-rows")].map(el=>getComputedStyle(el).gridTemplateColumns.split(" ").length),
            unitBounds:[...panel.querySelectorAll(".j277-unit-link")].map(el=>{const r=el.getBoundingClientRect();return {x:r.x,right:r.right,width:r.width,height:r.height,scrollWidth:el.scrollWidth,clientWidth:el.clientWidth}}),
            guideBottom:grid.getBoundingClientRect().bottom,
            viewportHeight:innerHeight,
            titles:cards.map(el=>el.querySelector("h3")?.textContent.trim()),
            accent:cards.map(el=>getComputedStyle(el).borderTopColor),
            cards:cards.map(el=>({
              css:{
                minHeight:getComputedStyle(el).minHeight,
                padding:getComputedStyle(el).padding,
                radius:getComputedStyle(el).borderTopLeftRadius,
                shadow:getComputedStyle(el).boxShadow
              },
              rect:{x:el.getBoundingClientRect().x,y:el.getBoundingClientRect().y,w:el.getBoundingClientRect().width,h:el.getBoundingClientRect().height},
              action:{
                font:getComputedStyle(el.querySelector("a.action")).fontSize,
                height:getComputedStyle(el.querySelector("a.action")).minHeight,
                radius:getComputedStyle(el.querySelector("a.action")).borderRadius,
                padding:getComputedStyle(el.querySelector("a.action")).padding,
                color:getComputedStyle(el.querySelector("a.action")).color,
                background:getComputedStyle(el.querySelector("a.action")).backgroundColor,
                downloadColor:getComputedStyle(el.querySelector(".h446-guide-download")).color
              },
              tag:{
                fill:getComputedStyle(el.querySelector(".kicker")).backgroundColor,
                color:getComputedStyle(el.querySelector(".kicker")).color
              },
              links:[...el.querySelectorAll(".h446-guide-actions a")].map(a=>({label:a.textContent.trim(),href:a.getAttribute("href"),download:a.hasAttribute("download"),blank:a.target==="_blank"})),
              icon:!!el.querySelector("svg.h446-guide-icon")
            })),
            screenWidth:document.documentElement.scrollWidth,
            viewportWidth:innerWidth
          };
        },course);
        assert.equal(result.panelVisible,true,course+" revision guide panel not visible");
        assert.equal(result.count,2,course+" expected two cards");
        assert.equal(result.gridCols,course==="j277"?(viewport.width<=980?1:2):(viewport.width<=700?1:2),course+" column count");
        assert.deepEqual(result.titles,["Computer Systems","Algorithms and Programming"]);
        assert.ok(result.cards.every(c=>c.icon),course+" missing guide icon");
        assert.ok(result.cards.every(c=>c.links.length===2&&c.links[0].blank),course+" wrong guide action count");
        if(course==="j277"){
          assert.ok(result.cards.every(c=>c.links[1].blank&&!c.links[1].download), "J277 Print must open the print-ready PDF in a new tab");
          assert.equal(result.unitLinks.length,11,"J277 must show 11 whole-tile unit links");
          assert.deepEqual(result.unitGridCols,viewport.width<=700?[1,1]:[2,2],"J277 responsive unit tile grid");
          assert.ok(result.unitBounds.every(b=>b.x>=0&&b.right<=viewport.width+1&&b.clientWidth>=b.scrollWidth-1),"J277 unit tile clipped or overflowing");
          if(viewport.width>=1200){
            assert.ok(result.cards.every(c=>c.rect.h<=130),"J277 paper headers should be compact");
            assert.ok(result.guideBottom<=result.viewportHeight+8,"J277 guides should fit typical desktop without vertical scrolling; bottom="+result.guideBottom);
          }
          assert.equal(new Set(result.unitLinks.map(x=>x.href)).size,11,"Unit PDF URLs must be unique");
          assert.ok(result.unitLinks.every(x=>x.blank&&x.href.endsWith(".pdf?v=V4-2026-10-28")||x.blank&&x.href.endsWith(".pdf?v=V3-2026-10-28")),"Unit PDFs must open in a new tab");
        }else{
          assert.ok(result.cards.every(c=>c.links[1].download),"H446 existing Download behaviour changed unexpectedly");
        }
        assert.equal(result.screenWidth<=result.viewportWidth,true,course+" horizontal screen overflow");
        for(const card of result.cards){
          assert.ok(card.rect.x>=0 && card.rect.x+card.rect.w<=viewport.width+1,course+" card clipped");
        }
        if(course==="j277"){
          const expectedFiles=[
            ["J277_Paper_1_Revision_Guide_AP1_Aligned.pdf","J277_Paper_1_Revision_Guide_Print_V4.pdf"],
            ["J277_Paper_2_Revision_Guide_V3.pdf","J277_Paper_2_Revision_Guide_Print_V3.pdf"]
          ];
          for(const [i,expected] of expectedFiles.entries()){
            const links=result.cards[i].links;
            for(const [j,filename] of expected.entries()){
              assert.ok(links[j].href.includes(filename),course+" PDF href mismatch for action "+j);
              const response=await context.request.head(base+"/revision/j277/guides/"+filename);
              assert.equal(response.status(),200,"PDF not available on site: "+filename);
              assert.match(response.headers()["content-type"],/application\/pdf/);
            }
          }
          for(const link of result.unitLinks){
            const relative=link.href.replace(/^revision\//,"/revision/");
            const response=await context.request.head(base+relative.split("?")[0]);
            assert.equal(response.status(),200,"Unit PDF not available: "+relative);
            assert.match(response.headers()["content-type"],/application\/pdf/);
          }
        }
        await page.screenshot({path:"/tmp/j277-guide-layout/"+course+"-"+viewport.name+".png",fullPage:false});
        snapshots[course]=result;
        await context.close();
      }
      console.log("PASS "+viewport.name+": J277 compact card layout, "+snapshots.j277.gridCols+" paper columns, "+snapshots.j277.unitGridCols.join("/")+" unit tile columns and all PDF links readable");
      writeFileSync("/tmp/j277-guide-layout/results-"+viewport.name+".json",JSON.stringify(snapshots,null,2));
    }
  } finally {await browser.close()}
})().catch(err=>{console.error("J277 GUIDE LAYOUT FAIL",err.stack||err);process.exitCode=1});

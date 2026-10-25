/* J277-only Code First patch for the two original static lesson pages.
 * Replaces only the first You Do task and matching first answer card.
 * Independent exam-practice cards, Do Now and diagrams are left unchanged. */
(async function(){
  const match=location.pathname.match(/lesson-(001|002)\/(?:index|answers)\.html$/);
  if(!match)return;
  const num=match[1],esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  try{
    const response=await fetch("../../../lessons/j277/code-first-master-20261021.json?v=20261025-stage-map1");
    if(!response.ok)throw Error("Code First bank unavailable");
    const item=(await response.json()).lessons[num];
    if(!item)throw Error("Code First task missing: "+num);
    const tasks=document.querySelector(".j277-code-first .j277-code-tasks");
    if(tasks){
      if(num==='002'){
        // Teacher-approved lesson 002 pilot: task-first, no duplicate binary panel.
        tasks.innerHTML='<h2 class="j277-code-prompt">'+esc(item.task)+'</h2>'+
          '<pre class="arithmetic">'+esc(item.starter)+'</pre>'+
          '<p class="j277-code-instruction">Work on your mini-whiteboard.</p>';
      }else{
        tasks.innerHTML='<p class="j277-code-start">One short task. Start on your mini-whiteboard.</p>'+
         '<p><strong>YOUR TASK:</strong> '+esc(item.task)+'</p>'+
         '<pre class="arithmetic">'+esc(item.starter)+'</pre>';
      }
    }
    // The cycle is a task-state indicator, not a fixed four-step instruction.
    // Prefer an authored focus_stage; otherwise classify the actual task wording.
    const focusFromTask=task=>{
      const t=String(task||"").trim().toLowerCase();
      if(/^(predict|trace|work out (?:what|the)|what (?:is|will|would).*(?:output|print)|state (?:the )?(?:output|final value)|determine (?:the )?output)/.test(t))return "predict";
      if(/^(test|run|try|check whether|choose .*(?:test|input)|select .*(?:test|input)|design .*test)/.test(t))return "test";
      if(/^(correct|debug|fix|improve|refine|repair|identify and fix|find and fix)/.test(t))return "iterate";
      return "write";
    };
    const cycle=document.querySelector(".j277-code-cycle");
    if(cycle){
      const permitted=new Set(["predict","write","test","iterate"]);
      const declared=String(item.focus_stage||"").trim().toLowerCase();
      const focus=permitted.has(declared)?declared:focusFromTask(item.task);
      const names={predict:"Predict",write:"Write",test:"Test",iterate:"Iterate"};
      cycle.dataset.focus=focus;
      cycle.setAttribute("aria-label","Code First routine: Predict, Write, Test, Iterate. Current task: "+names[focus]+".");
      cycle.querySelectorAll("[data-code-first-step]").forEach(el=>{
        el.classList.toggle("is-active",el.dataset.codeFirstStep===focus);
      });
      const illustration=cycle.querySelector("img.j277-code-cycle-graphic");
      if(illustration){
        try{
          const r=await fetch("../../../assets/j277/code-first-cycle.svg?v=20261025-task-focus1");
          if(!r.ok)throw Error("Code First vector unavailable");
          const documentSvg=new DOMParser().parseFromString(await r.text(),"image/svg+xml");
          if(documentSvg.querySelector("parsererror"))throw Error("Invalid cycle SVG");
          const imported=document.importNode(documentSvg.documentElement,true);
          imported.setAttribute("aria-hidden","true");
          imported.setAttribute("focusable","false");
          imported.querySelectorAll("[data-cycle-step]").forEach(el=>{
            el.classList.toggle("is-active",el.getAttribute("data-cycle-step")===focus);
          });
          illustration.replaceWith(imported);
        }catch(error){
          // Keep the accessible fallback graphic and compact mobile status.
          console.warn("Code First illustration fallback in use",error);
        }
      }
    }
    if(location.pathname.endsWith("/answers.html")){
      const card=document.querySelector("main .answer-stage .solution-card");
      if(card){
        card.innerHTML='<span class="phase-tag">CODE FIRST · WORKED ANSWER</span>'+
         '<h2>'+esc(item.title)+'</h2>'+
         '<p><strong>TASK:</strong> '+esc(item.task)+'</p>'+
         '<pre style="white-space:pre-wrap;line-height:1.5">'+esc(item.model)+'</pre>'+
         '<p><strong>EXPECTED RESULT:</strong> '+esc(item.expected)+'</p>';
      }
    }
  }catch(error){console.error("J277 static Code First: original material retained",error);}
})();

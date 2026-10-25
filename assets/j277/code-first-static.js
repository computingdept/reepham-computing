/* J277-only Code First patch for the two original static lesson pages.
 * Replaces only the first You Do task and matching first answer card.
 * Independent exam-practice cards, Do Now and diagrams are left unchanged. */
(async function(){
  const match=location.pathname.match(/lesson-(001|002)\/(?:index|answers)\.html$/);
  if(!match)return;
  const num=match[1],esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  try{
    const response=await fetch("../../../lessons/j277/code-first-master-20261021.json?v=20261021-release1");
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

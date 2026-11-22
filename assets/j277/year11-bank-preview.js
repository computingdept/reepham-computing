/* J277 Year 11 bank preview: extra screens appended INSIDE #you-do only.
 * Existing seven You Do screens remain first and unchanged. No new phase,
 * tab or navigation button. Enabled only by ?exam-bank-preview=1 on L096.
 * Question text/answers are read by ID from canonical GitHub bank + map.
 */
(function(){
  "use strict";
  if(!/^\/lessons\/j277\/lesson-096\/(?:index\.html)?$/.test(location.pathname) ||
     new URLSearchParams(location.search).get("exam-bank-preview")!=="1")return;

  var host=document.getElementById("you-do");
  var rolling=host&&host.querySelector(".youdo-rolling.rhs-y-rolling");
  if(!host || host.dataset.rhsYoudoTrial!=="true" || !rolling ||
     rolling.querySelectorAll(":scope > .rhs-y-stage").length!==7)return;
  function esc(s){
    return String(s==null?"":s).replace(/[&<>"']/g,function(c){
      return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];
    });
  }
  function parseCsv(s){
    var rows=[],row=[],cell="",inQuotes=false;
    for(var i=0;i<s.length;i++){
      var c=s[i];
      if(c==='"'){
        if(inQuotes && s[i+1]==='"'){cell+='"';i++;}
        else inQuotes=!inQuotes;
      }else if(c==="," && !inQuotes){row.push(cell);cell="";}
      else if((c==="\n" || c==="\r") && !inQuotes){
        if(c==="\r" && s[i+1]==="\n")i++;
        row.push(cell);
        if(row.some(function(x){return x!=="";}))rows.push(row);
        row=[];cell="";
      }else cell+=c;
    }
    if(inQuotes)throw new Error("Unclosed CSV quote");
    if(row.length||cell){row.push(cell);rows.push(row);}
    var headers=rows.shift();
    if(!headers || headers.indexOf("rhs_question_id")<0)throw new Error("Invalid bank CSV headers");
    return rows.map(function(values){
      var record={};
      headers.forEach(function(header,i){record[header]=values[i]||"";});
      return record;
    });
  }
  function originalQuestion(s){
    return String(s||"").replace(/\s*\[\d+(?:\s*marks?)?\]\s*$/i,"").trim();
  }
  function lineBreaks(s){return esc(s).replace(/\r\n?|\n/g,"<br>");}
  function answerParts(s){
    // Semicolons in the already-authored answer are presentation separators,
    // not automatically separate credited marks. The marking rule controls credit.
    var parts=String(s||"").split(/;\s*|\r?\n+/).map(function(x){return x.trim();}).filter(Boolean);
    return parts.map(function(text){
      return '<p class="rhs-bank-answer-point">'+esc(text)+'</p>';
    }).join("");
  }
  function header(name,detail){
    return '<div class="rhs-bank-head"><span>'+esc(name)+'</span><span>'+esc(detail)+'</span></div>';
  }
  function intro(items){
    var total=items.reduce(function(sum,q){return sum+q.marks;},0);
    return '<article class="exam-card youdo-question rhs-y-stage rhs-bank-stage rhs-bank-question-stage" hidden>'+
      header("UNAPPROVED PREVIEW · ADDITIONAL EXAM PRACTICE",
        items.length+" QUESTIONS · "+total+" MARKS")+
      '<p class="rhs-bank-instruction">Complete these additional OCR-based practice questions independently. Existing You Do questions are unchanged.</p>'+
      '<div class="rhs-bank-grid">'+items.map(function(q,i){
        return '<section class="rhs-bank-card">'+
          '<div class="rhs-bank-card-head"><span>Q'+(i+1)+'</span><span>'+q.marks+' MARK'+(q.marks===1?'':'S')+'</span></div>'+
          '<p class="rhs-bank-prompt">'+lineBreaks(originalQuestion(q.question))+'</p>'+
          '<span class="rhs-bank-source">'+esc(q.reference)+'</span></section>';
      }).join("")+'</div></article>';
  }
  function markScreen(q,index,total){
    return '<article class="exam-card youdo-question rhs-y-stage rhs-bank-stage rhs-bank-review-stage" hidden>'+
      header("PREVIEW · SELF-MARK · QUESTION "+(index+1)+" OF "+total,
        q.marks+" MARK"+(q.marks===1?'':'S'))+
      '<div class="rhs-bank-review-question">'+
      '<span class="rhs-bank-label">QUESTION · '+esc(q.id)+'</span>'+
      '<p>'+lineBreaks(originalQuestion(q.question))+'</p></div>'+
      '<div class="rhs-bank-answer-content">'+
      '<span class="rhs-bank-label">ACCEPTABLE ANSWER POINTS</span>'+
      '<div class="rhs-bank-answer-list">'+answerParts(q.answer)+'</div>'+
      '<div class="rhs-bank-scoring"><span class="rhs-bank-label">HOW TO AWARD MARKS</span>'+
      '<p>'+lineBreaks(q.rule)+'</p></div>'+
      '<div class="rhs-bank-source">'+esc(q.reference)+'</div>'+
      '</div></article>';
  }
  async function load(){
    var urls=[
      "/data/exam-questions/j277-youdo-lesson-map.json?v=20261122-y11-preview096-1",
      "/data/exam-questions/j277-rhs-practice-drafts.csv?v=20261122-y11-preview096-1"
    ];
    var results=await Promise.all(urls.map(function(url){
      return fetch(url,{cache:"no-store"}).then(function(response){
        if(!response.ok)throw new Error("Question source unavailable ("+response.status+")");
        return response.text();
      });
    }));
    var map=JSON.parse(results[0]);
    var row=(map.lessons||[]).find(function(v){return v.lesson_id==="096";});
    if(!row || row.teacher_approved!==false || row.published_bank_override_enabled!==false)
      throw new Error("Expected unpublished Lesson 096 candidate mapping");
    var assignment=row.additional_exam_practice||[];
    if(assignment.length!==4)throw new Error("Expected four mapped preview questions");
    var records=parseCsv(results[1]);
    var bank=new Map(records.map(function(item){return [item.rhs_question_id,item];}));
    var ids=new Set();
    return assignment.map(function(slot){
      var src=bank.get(slot.rhs_question_id);
      if(!src || ids.has(slot.rhs_question_id))throw new Error("Missing or duplicate mapped question");
      ids.add(slot.rhs_question_id);
      if(src.ocr_reference!==slot.ocr_reference ||
         Number(src.marks)!==slot.marks ||
         !src.rhs_question_text || !src.rhs_verified_answer_points ||
         !src.rhs_verified_marking_rule ||
         slot.editorial_status!=="candidate_pending_final_approval" ||
         slot.visual_decision!=="no_visual_needed")
        throw new Error("Question metadata needs additional review: "+slot.rhs_question_id);
      return {
        id:slot.rhs_question_id,marks:slot.marks,reference:src.ocr_reference,
        question:src.rhs_question_text,answer:src.rhs_verified_answer_points,
        rule:src.rhs_verified_marking_rule
      };
    });
  }
  function appendWithinYouDo(content,expectedCount){
    // The shared You Do controller already handles these .youdo-question
    // screens with its native Next/Previous buttons and touch navigation.
    // Never create a ninth lesson phase or alter existing seven screens.
    if(rolling.querySelectorAll(":scope > .rhs-y-stage").length!==7)
      throw new Error("Existing You Do stage count changed; preview not added");
    var source=document.createElement("div");
    source.innerHTML=content;
    var added=Array.from(source.children);
    if(added.length!==expectedCount ||
       added.some(function(s){return !s.matches(".rhs-bank-stage.youdo-question");}))
      throw new Error("Unexpected additional You Do screen structure");
    added.forEach(function(s){s.hidden=true;rolling.appendChild(s);});
    host.dataset.rhsBankPreview="true";
    host.dataset.rhsBankStart="7";
    host.dataset.rhsBankCount=String(added.length-1);
    // Teacher-only shortcut. The new screens STILL occur after existing
    // stage 7; this just opens directly on their question overview.
    if(new URLSearchParams(location.search).get("exam-bank-start")==="1"){
      rolling.querySelectorAll(":scope > .rhs-y-stage").forEach(function(stage,i){
        stage.hidden=i!==7;
      });
      host.dataset.windowStart="7";
      const progress=host.querySelector(".youdo-window-progress");
      if(progress)progress.textContent="ADDITIONAL EXAM QUESTIONS · "+host.dataset.rhsBankCount+" QUESTIONS";
    }
    window.H446OptionalBridge?.refresh?.();
  }
  load().then(function(questions){
    appendWithinYouDo(intro(questions)+questions.map(markScreen).join(""),1+questions.length);
  }).catch(function(err){
    console.error("J277 bank preview validation failed:",err);
    // Do not expose any unverified draft if bank/map validation fails.
    if(host.dataset.rhsBankPreview==="true")return;
    try{
      appendWithinYouDo('<article class="exam-card youdo-question rhs-y-stage rhs-bank-stage" hidden>'+
        header("YOU DO · BANK PREVIEW","SOURCE NOT VERIFIED")+
        '<p class="rhs-bank-error">The mapped questions could not be verified. The existing You Do questions are unchanged.</p></article>',1);
    }catch(error){console.error("J277 bank preview fallback unavailable:",error);}
  });
})();
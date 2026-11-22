/* J277 Year 11 exam-bank teacher preview: retain original Code First/check;
 * replace only archived older exam questions with mapped RHS bank Q&A.
 * Original seven You Do stages become Code First, one or more question pages,
 * and one marking screen per mapped question. Never add a lesson phase.
 */
(function(){
  "use strict";
  var match=location.pathname.match(/^\/lessons\/j277\/lesson-(\d{3})\/(?:index\.html)?$/);
  var lessonId=match&&match[1];
  var allowlist=["096","098","099","100","101","102","103","104","105","106","107","108","109","110","111","112","114","115","116","117","118","119"]; // Archive-backed batches 1–5; protected 113 and 120 excluded.
  if(!lessonId || allowlist.indexOf(lessonId)<0 ||
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
  // Projector-fit pages retain complete questions and their mark counts.
  // Long text uses pairs; large code/table/figure prompts use a whole screen.
  // Lesson 114 stays two-first; older preview batches are left untouched.
  var adaptiveLessons=["114","116","117","118","119"];
  function singleScreenQuestion(q){
    var text=originalQuestion(q.question);
    return !!q.figure || !!q.visualPending ||
      text.length>235 ||
      text.split(/\r?\n/).length>=6 ||
      /\n\s*(?:0[1-9]\s|SELECT\b|FROM\b|WHERE\b|while\b|for\b|if\b|endif\b|endwhile\b|myFile\s*=|____)/i.test(text);
  }
  function questionGroups(items){
    var adaptive=adaptiveLessons.includes(lessonId);
    var mobile=adaptive && matchMedia("(max-width:800px)").matches;
    var limit=lessonId==="114"?2:adaptive?4:items.length;
    if(mobile)limit=1;
    var groups=[],current=[],pairedLength=0;
    function flush(){if(current.length){groups.push(current);current=[];pairedLength=0;}}
    items.forEach(function(q){
      if((adaptive && singleScreenQuestion(q)) || q.figure){
        flush();groups.push([q]);return;
      }
      var textLength=originalQuestion(q.question).length;
      var longText=adaptive && (textLength>130 || pairedLength>130);
      if(current.length && (current.length>=limit || (longText && current.length>=2)))
        flush();
      current.push(q);
      pairedLength+=textLength;
      if(adaptive && current.length===2 && pairedLength>260)flush();
    });
    flush();
    return groups;
  }
  function intro(items,start,totalCount,totalMarks,pageIndex,pageCount){
    var last=start+items.length;
    var range="Q"+(start+1)+(items.length>1?"–"+last:"")+" OF "+totalCount;
    return '<article class="exam-card youdo-question rhs-y-stage rhs-bank-stage rhs-bank-question-stage" data-rhs-question-page="'+(pageIndex+1)+'" hidden>'+
      header("ADDITIONAL EXAM PRACTICE · "+range,
        totalCount+" QUESTIONS · "+totalMarks+" MARKS")+
      '<p class="rhs-bank-instruction">Complete the questions on this screen. '+(pageCount>1?"Continue for the remaining questions before self-marking.":"Mark your answers on the following screens.")+'</p>'+
      '<div class="rhs-bank-grid" data-count="'+items.length+'">'+items.map(function(q,i){
        return '<section class="rhs-bank-card">'+
          '<div class="rhs-bank-card-head"><span>Q'+(start+i+1)+'</span><span>'+q.marks+' MARK'+(q.marks===1?'':'S')+'</span></div>'+
          '<p class="rhs-bank-prompt">'+lineBreaks(originalQuestion(q.question))+'</p>'+
          (q.figure?'<img class="rhs-bank-question-figure" src="'+esc(q.figure)+'" alt="Question diagram">':"")+
          '<span class="rhs-bank-source">'+esc(q.reference)+'</span></section>';
      }).join("")+'</div></article>';
  }
  function questionPageMarkup(groups,questions){
    var start=0,totalMarks=questions.reduce(function(sum,q){return sum+q.marks;},0);
    return groups.map(function(group,i){
      var page=intro(group,start,questions.length,totalMarks,i,groups.length);
      start+=group.length;
      return page;
    }).join("");
  }
  function overflows(stage){
    // Measure while invisible but laid out; never expose a temporary question.
    stage.style.visibility="hidden";
    stage.hidden=false;
    var nodes=[stage].concat(Array.from(stage.querySelectorAll(".rhs-bank-grid,.rhs-bank-card")));
    var result=nodes.some(function(node){
      return node.clientHeight>0 && node.scrollHeight>node.clientHeight+3;
    });
    stage.hidden=true;
    stage.style.visibility="";
    return result;
  }
  function markScreen(q,index,total){
    return '<article class="exam-card youdo-question rhs-y-stage rhs-bank-stage rhs-bank-review-stage" hidden>'+
      header("SELF-MARK · QUESTION "+(index+1)+" OF "+total,
        q.marks+" MARK"+(q.marks===1?'':'S'))+
      '<div class="rhs-bank-review-question">'+
      '<span class="rhs-bank-label">QUESTION · '+esc(q.id)+'</span>'+
      '<p>'+lineBreaks(originalQuestion(q.question))+'</p>'+

      '</div>'+
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
      "/data/exam-questions/j277-youdo-lesson-map.json?v=20261122-y11-batch5-1",
      "/data/exam-questions/j277-rhs-practice-drafts.csv?v=20261122-y11-batch5-1"
    ];
    var results=await Promise.all(urls.map(function(url){
      return fetch(url,{cache:"no-store"}).then(function(response){
        if(!response.ok)throw new Error("Question source unavailable ("+response.status+")");
        return response.text();
      });
    }));
    var map=JSON.parse(results[0]);
    var row=(map.lessons||[]).find(function(v){return v.lesson_id===lessonId;});
    if(!row || row.teacher_approved!==false || row.published_bank_override_enabled!==false ||
       row.archive_source!=="data/exam-questions/archive/j277-lesson-"+lessonId+"-original-youdo-20261122.json" ||
       row.year11_preview_delivery_mode!=="retain_code_first_and_check_replace_archived_old_exam_questions_teacher_preview_only")
      throw new Error("Expected archive-backed, unpublished Lesson "+lessonId+" bank mapping");
    var assignment=row.additional_exam_practice||[];
    if(assignment.length<1 || assignment.length>5)throw new Error("Expected one to five mapped exam questions for lesson "+lessonId);
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
         !["no_visual_needed","requires_source_figure_review"].includes(slot.visual_decision) ||
         ((src.visual_status==="not_required") !== (slot.visual_decision==="no_visual_needed")))
        throw new Error("Question metadata needs additional review: "+slot.rhs_question_id);
      return {
        id:slot.rhs_question_id,marks:slot.marks,reference:src.ocr_reference,
        question:src.rhs_question_text,answer:src.rhs_verified_answer_points,
        rule:src.rhs_verified_marking_rule,
        // Only an explicitly approved visual is shown. Metadata flags never
        // become lesson labels or blank image placeholders.
        figure:src.rhs_visual_layout_status==="approved" &&
          /^\/assets\/j277\/exam-figures\/[\w-]+\.svg$/.test(src.rhs_visual_question_svg||"")
            ?src.rhs_visual_question_svg:"",
        visualPending:slot.visual_decision==="requires_source_figure_review"
      };
    });
  }
  function replaceArchivedYouDo(questions){
    // Preserve the original Code First stages verbatim and fail closed if the
    // expected seven-stage original is absent or the bank mapping is invalid.
    if(rolling.querySelectorAll(":scope > .rhs-y-stage").length!==7)
      throw new Error("Original seven You Do screens changed; preview not applied");
    var oldScreens=Array.from(rolling.querySelectorAll(":scope > .rhs-y-stage"));
    if(!oldScreens[0].classList.contains("rhs-y-code-first") ||
       !oldScreens[1].classList.contains("rhs-y-code-check"))
      throw new Error("Cannot verify original Code First/answer sequence");
    var codeScreens=oldScreens.slice(0,2);
    var groups=questionGroups(questions);
    host.dataset.rhsBankPreview="true";
    function render(){
      var source=document.createElement("div");
      source.innerHTML=questionPageMarkup(groups,questions)+
        questions.map(markScreen).join("");
      var slides=Array.from(source.children);
      if(slides.length!==groups.length+questions.length ||
         slides.some(function(node){return !node.matches(".rhs-bank-stage.youdo-question");}))
        throw new Error("Unexpected exam-bank screen structure");
      slides.forEach(function(node){node.hidden=true;});
      rolling.replaceChildren.apply(rolling,codeScreens.concat(slides));
      return slides;
    }
    var slides=render();
    // Apply overflow-driven splitting only to the newer adaptive batches.
    // Preserve earlier preview screen counts until separately audited.
    if(adaptiveLessons.includes(lessonId)){
      for(var pass=0;pass<4;pass++){
        var changed=false;
        for(var i=0;i<groups.length;i++){
          if(overflows(slides[i]) && groups[i].length>1){
            var singlePages=groups[i].map(function(q){return [q];});
            groups.splice.apply(groups,[i,1].concat(singlePages));
            slides=render();
            changed=true;
            break;
          }
        }
        if(!changed)break;
      }
    }
    codeScreens[0].hidden=false;
    codeScreens[1].hidden=true;
    host.dataset.rhsBankStart="2";
    host.dataset.rhsBankCount=String(questions.length);
    host.dataset.rhsBankQuestionPages=String(groups.length);
    host.dataset.j277ReviewStart=String(2+groups.length);
    host.dataset.windowStart="0";
    host.dataset.windowSize="1";
    host.dataset.workMode="independent";
    host.dataset.codingFirst="true";
    var progress=host.querySelector(".youdo-window-progress");
    if(progress)progress.textContent="CODE FIRST · PREDICT";
    window.H446OptionalBridge?.refresh?.();
  }
  load().then(function(questions){
    replaceArchivedYouDo(questions);
  }).catch(function(err){
    // Validation fails closed; never publish unmapped or unapproved wording.
    // The original lesson stays available.
    delete host.dataset.rhsBankPreview;
    console.error("J277 bank preview validation failed; original You Do retained:",err);
  });
})();
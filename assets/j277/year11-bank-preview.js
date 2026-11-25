/* J277 Year 11 mapped exam bank: retain original Code First/check;
 * replace only archived older exam questions with mapped RHS bank Q&A.
 * Original seven You Do stages become Code First, one or more question pages,
 * and one marking screen per mapped question. Never add a lesson phase.
 */
(function(){
  "use strict";
  var match=location.pathname.match(/^\/lessons\/j277\/lesson-(\d{3})\/(?:index\.html)?$/);
  var lessonId=match&&match[1];
  var allowlist=["096","097","098","099","100","101","102","103","104","105","106","107","108","109","110","111","112","114","115","116","117","118","119","122","123","124","125","126","127","128","129","130","131","132","133","134","135","136","137","138","139","140","141","142","145","146","147","148","149","150","151","152","153","154","155","158","159","160","161","162","163","164"]; // Mapped Year 11 lessons only; protected timed lessons unchanged.
  if(!lessonId || allowlist.indexOf(lessonId)<0)return;
  var h446Preview=["096","100","109","110","118","137"].includes(lessonId)&&new URLSearchParams(location.search).get("youdo-style")==="h446"&&!!window.RHSYouDoLayout;

  var sharedPresentation=!!window.RHSYouDoLayout;
  // Explicit four-card comparison is limited to L096; normal adaptive grouping remains unchanged.
  var fourPreview=h446Preview&&lessonId==="096"&&new URLSearchParams(location.search).get("youdo-layout")==="4";
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
  function questionLines(s){
    if(sharedPresentation&&window.RHSYouDoLayout?.commandRanges){
      var raw=String(s||""),out="",last=0;
      var ranges=window.RHSYouDoLayout.commandRanges(raw).sort(function(a,b){return a.start-b.start;});
      ranges.forEach(function(r){
        if(r.start<last)return;
        out+=esc(raw.slice(last,r.start))+'<mark class="rhs-j277-command h446-youdo-command">'+esc(raw.slice(r.start,r.start+r.length))+'</mark>';
        last=r.start+r.length;
      });
      return (out+esc(raw.slice(last))).replace(/\r\n?|\n/g,"<br>");
    }
    return (window.RHSYouDoTrial?.commandWords?.(s)||esc(s)).replace(/\r\n?|\n/g,"<br>");
  }
  // Distinguish an existing scenario paragraph from a command-led task.
  // Keep every word and only split where the authored paragraph boundary is explicit.
  function questionCardText(s){
    var raw=originalQuestion(s);
    if(sharedPresentation&&window.RHSYouDoLayout?.commandRanges){
      var first=window.RHSYouDoLayout.commandRanges(raw)[0];
      if(first&&first.start>0){
        var before=raw.slice(0,first.start);
        var boundary=before.match(/\r?\n[\t ]*\r?\n\s*$/);
        if(boundary&&before.slice(0,boundary.index).trim()){
          return '<span class="rhs-bank-context">'+questionLines(before.slice(0,boundary.index))+'</span>'+
            '<span class="rhs-bank-task">'+questionLines(raw.slice(first.start))+'</span>';
        }
      }
    }
    return questionLines(raw);
  }
  // Pilot only: the four authored trace questions in Lesson 107.
  function traceParts(q){
    if(lessonId!=="107" || !q.figure || !q.answerFigure ||
      !["RHS-J277-039","RHS-J277-091","RHS-J277-163","RHS-J277-222"].includes(q.id))return null;
    var lines=originalQuestion(q.question).split(/\r?\n/);
    var start=lines.findIndex(function(l){return /^\d{2}[ \t]/.test(l);});
    if(start<0)return null;
    var end=start;
    while(end<lines.length&&/^\d{2}[ \t]/.test(lines[end]))end++;
    if(end-start<2 || lines.slice(end).some(function(l){return /^\d{2}[ \t]/.test(l);}))return null;
    function prose(chunk,task){
      return chunk.join("\n").trim().split(/\n\s*\n/).filter(Boolean).map(function(p){
        var isTask=task||/^(Trace|Complete)\b/i.test(p);
        return '<p class="'+(isTask?'rhs-trace-task':'rhs-trace-prose')+'">'+questionLines(p)+'</p>';
      }).join("");
    }
    var code='<pre class="rhs-trace-code"><code>'+lines.slice(start,end).map(function(line){
      return '<span class="rhs-trace-code-line"><span class="rhs-trace-line-number">'+esc(line.slice(0,2))+'</span><span class="rhs-trace-code-text">'+esc(line.slice(3))+'</span></span>';
    }).join("")+'</code></pre>';
    return {before:prose(lines.slice(0,start),false),code:code,after:prose(lines.slice(end),true)};
  }
  // Use exactly the same geometry for the blank and worked trace table.
  function traceCard(q,trace,index,total,reveal){
    var image='<img class="rhs-trace-figure" src="'+esc(reveal?q.answerFigure:q.figure)+'" alt="'+esc(reveal?q.answer:"Blank trace table")+'" loading="eager">';
    return '<section class="rhs-bank-card rhs-bank-trace-pilot">'+
      '<div class="rhs-bank-card-head"><span>'+(reveal?'QUESTION '+(index+1)+' OF '+total:'Q'+(index+1))+'</span><span>'+q.marks+' MARK'+(q.marks===1?'':'S')+'</span></div>'+
      trace.before+'<div class="rhs-trace-body">'+trace.code+image+
      (reveal?'<div class="rhs-trace-fallback" hidden>'+lineBreaks(q.answer)+'</div>':"")+
      '</div>'+trace.after+
      (reveal?'<p class="rhs-trace-marking"><strong>Marking guidance:</strong> '+lineBreaks(q.rule)+'</p>':"")+
      '<span class="rhs-bank-source">'+esc(q.reference)+'</span></section>';
  }
  // Lesson 115: paired wide table/code artwork, using the tested flow-card geometry.
  function wideCard(q,index,total,reveal){
    if(lessonId!=="115" || !q.figure || !q.answerFigure ||
      !["RHS-J277-115","RHS-J277-161"].includes(q.id))return null;
    var raw=originalQuestion(q.question);
    var split=raw.match(/\n\s*\n(?=(?:Write|Choose)\b)/);
    var context=split?raw.slice(0,split.index):"";
    var task=split?raw.slice(split.index+split[0].length):raw;
    return '<section class="rhs-bank-card rhs-bank-flow-pilot">'+
      '<div class="rhs-bank-card-head"><span>'+(reveal?'QUESTION '+(index+1)+' OF '+total:'Q'+(index+1))+'</span><span>'+q.marks+' MARK'+(q.marks===1?'':'S')+'</span></div>'+
      '<div class="rhs-flow-body"><div class="rhs-flow-copy">'+
      (context?'<p class="rhs-flow-context">'+questionLines(context)+'</p>':"")+
      '<p class="rhs-flow-task">'+questionLines(task)+'</p>'+
      (reveal?'<p class="rhs-flow-marking"><strong>Marking guidance:</strong> '+lineBreaks(q.rule)+'</p>':"")+
      '</div><div class="rhs-flow-art">'+
      '<img class="rhs-flow-figure" src="'+esc(reveal?q.answerFigure:q.figure)+'" alt="'+esc(reveal?q.answer:"Question illustration")+'" loading="eager">'+
      (reveal?'<div class="rhs-flow-fallback" hidden>'+lineBreaks(q.answer)+'</div>':"")+
      '</div></div><span class="rhs-bank-source">'+esc(q.reference)+'</span></section>';
  }
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
  // Until the classroom screen is measurable, use safe single-question pages.
  // Once active, the shared fit check chooses 4, 3, 2 or 1 based only on
  // available space, never on question type, length or lesson number.
  function questionGroups(items){
    return items.map(function(q){return [q];});
  }
  function intro(items,start,totalCount,totalMarks,pageIndex,pageCount){
    var last=start+items.length;
    var range="Q"+(start+1)+(items.length>1?"–"+last:"")+" OF "+totalCount;
    return '<article class="exam-card youdo-question rhs-y-stage rhs-bank-stage rhs-bank-question-stage" data-rhs-question-page="'+(pageIndex+1)+'" hidden>'+
      header("ADDITIONAL EXAM PRACTICE · "+range,
        totalCount+" QUESTIONS · "+totalMarks+" MARKS")+
      '<div class="rhs-bank-grid" data-count="'+items.length+'">'+items.map(function(q,i){
        var wide=items.length===1?wideCard(q,start+i,totalCount,false):null;
        if(wide)return wide;
        var trace=items.length===1?traceParts(q):null;
        if(trace)return traceCard(q,trace,start+i,totalCount,false);
        return '<section class="rhs-bank-card">'+
          '<div class="rhs-bank-card-head"><span>Q'+(start+i+1)+'</span><span>'+q.marks+' MARK'+(q.marks===1?'':'S')+'</span></div>'+
          '<p class="rhs-bank-prompt">'+(h446Preview||items.length===4?questionCardText(q.question):questionLines(originalQuestion(q.question)))+'</p>'+
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
  // Only these two worked flowcharts need the tall-art answer layout.
  function flowScreen(q,index,total){
    if(lessonId!=="106" || q.figure || !q.answerFigure ||
      !["RHS-J277-036","RHS-J277-145"].includes(q.id))return null;
    var raw=originalQuestion(q.question);
    var split=raw.match(/\.\s+(?=(?:Design|Draw)\b)/);
    var context=split?raw.slice(0,split.index+1):"";
    var task=split?raw.slice(split.index+split[0].length):raw;
    return '<article class="exam-card youdo-question rhs-y-stage rhs-bank-stage rhs-bank-review-stage rhs-flow-review" hidden>'+
      '<div class="rhs-bank-grid" data-count="1"><section class="rhs-bank-card rhs-bank-flow-pilot">'+
      '<div class="rhs-bank-card-head"><span>QUESTION '+(index+1)+' OF '+total+'</span><span>'+q.marks+' MARK'+(q.marks===1?'':'S')+'</span></div>'+
      '<div class="rhs-flow-body"><div class="rhs-flow-copy">'+
      (context?'<p class="rhs-flow-context">'+questionLines(context)+'</p>':"")+
      '<p class="rhs-flow-task">'+questionLines(task)+'</p>'+
      '<p class="rhs-flow-marking"><strong>Marking guidance:</strong> '+lineBreaks(q.rule)+'</p>'+
      '</div><div class="rhs-flow-art">'+
      '<img class="rhs-flow-figure" src="'+esc(q.answerFigure)+'" alt="'+esc(q.answer)+'" loading="eager">'+
      '<div class="rhs-flow-fallback" hidden>'+lineBreaks(q.answer)+'</div></div></div>'+
      '<span class="rhs-bank-source">'+esc(q.reference)+'</span></section></div></article>';
  }
  function markScreen(q,index,total){
    var wide=wideCard(q,index,total,true);
    if(wide)return '<article class="exam-card youdo-question rhs-y-stage rhs-bank-stage rhs-bank-review-stage rhs-flow-review" hidden>'+
      '<div class="rhs-bank-grid" data-count="1">'+wide+'</div></article>';
    var flow=flowScreen(q,index,total);
    if(flow)return flow;
    var trace=traceParts(q);
    if(trace)return '<article class="exam-card youdo-question rhs-y-stage rhs-bank-stage rhs-bank-review-stage rhs-trace-review" hidden>'+
      '<div class="rhs-bank-grid" data-count="1">'+traceCard(q,trace,index,total,true)+'</div></article>';
    return '<article class="exam-card youdo-question rhs-y-stage rhs-bank-stage rhs-bank-review-stage" hidden>'+
      header((sharedPresentation?"QUESTION ":"SELF-MARK · QUESTION ")+(index+1)+" OF "+total,
        q.marks+" MARK"+(q.marks===1?'':'S'))+
      '<div class="rhs-j277-answer-layout"><div class="rhs-bank-review-question">'+
      (sharedPresentation?'':'<span class="rhs-bank-label">QUESTION · '+esc(q.id)+'</span>')+
      '<p>'+(sharedPresentation?questionCardText(q.question):questionLines(originalQuestion(q.question)))+'</p>'+
      (q.figure?'<img class="rhs-bank-question-figure" src="'+esc(q.figure)+'" alt="Question diagram">':"")+
      '</div>'+
      '<div class="rhs-bank-answer-area'+(q.answerFigure?' rhs-bank-answer-area--with-figure':'')+'">'+
      (q.answerFigure?'<figure class="rhs-bank-answer-figure"><img src="'+esc(q.answerFigure)+'" alt="Worked answer diagram" loading="eager"></figure>':"")+
      '<div class="rhs-bank-answer-content">'+
      '<span class="rhs-bank-label">ACCEPTABLE ANSWER POINTS</span>'+
      '<div class="rhs-bank-answer-list">'+answerParts(q.answer)+'</div>'+
      '<div class="rhs-bank-scoring"><span class="rhs-bank-label">HOW TO AWARD MARKS</span>'+
      '<p>'+lineBreaks(q.rule)+'</p></div>'+
      '<div class="rhs-bank-source">'+esc(q.reference)+'</div>'+
      '</div></div></div></article>';
  }
  async function load(){
    var urls=[
      "/data/exam-questions/j277-youdo-lesson-map.json?v=20261122-y11-artwork-b2",
      "/data/exam-questions/j277-rhs-practice-drafts.csv?v=20261122-y11-artwork-b2"
    ];
    var results=await Promise.all(urls.map(function(url){
      return fetch(url,{cache:"no-store"}).then(function(response){
        if(!response.ok)throw new Error("Question source unavailable ("+response.status+")");
        return response.text();
      });
    }));
    var map=JSON.parse(results[0]);
    var row=(map.lessons||[]).find(function(v){return v.lesson_id===lessonId;});
    if(!row || !Array.isArray(row.additional_exam_practice))
      throw new Error("Expected mapped Year 11 questions for lesson "+lessonId);
    var assignment=row.additional_exam_practice||[];
    if(assignment.length<1 || assignment.length>6)throw new Error("Expected one to six mapped exam questions for lesson "+lessonId);
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
        // Question and worked-answer SVGs remain separate.
        // Internal review statuses never appear on lesson screens.
        figure:/^\/assets\/j277\/exam-figures\/[\w-]+\.svg$/.test(src.rhs_visual_question_svg||"")
          ?src.rhs_visual_question_svg:"",
        answerFigure:/^\/assets\/j277\/exam-figures\/[\w-]+\.svg$/.test(src.rhs_visual_answer_svg||"")
          ?src.rhs_visual_answer_svg:"",
        visualPending:slot.visual_decision==="requires_source_figure_review"
      };
    });
  }
  function replaceArchivedYouDo(questions){
    // Preserve the original Code First stages verbatim and fail closed if the
    // expected seven-stage original is absent or the bank mapping is invalid.
    if(rolling.querySelectorAll(":scope > .rhs-y-stage").length!==7)
      throw new Error("Original seven You Do screens changed; bank questions not applied");
    var oldScreens=Array.from(rolling.querySelectorAll(":scope > .rhs-y-stage"));
    if(!oldScreens[0].classList.contains("rhs-y-code-first") ||
       !oldScreens[1].classList.contains("rhs-y-code-check"))
      throw new Error("Cannot verify original Code First/answer sequence");
    var codeScreens=oldScreens.slice(0,2);
    // Before the You Do phase is visible, use a safe initial arrangement.
    // The actual screen is measured before students leave Code First.
    var groups=fourPreview&&questions.length===4&&!matchMedia("(max-width:900px)").matches?[questions]:questionGroups(questions);
    host.dataset.rhsBankPreview="true";
    if(h446Preview)host.dataset.rhsH446Preview="true";
    if(sharedPresentation)host.dataset.rhsBankShared="true";
    function render(){
      var source=document.createElement("div");
      source.innerHTML=questionPageMarkup(groups,questions)+
        questions.map(function(q,i){return markScreen(q,i,questions.length);}).join("");
      var slides=Array.from(source.children);
      if(slides.length!==groups.length+questions.length ||
         slides.some(function(node){return !node.matches(".rhs-bank-stage.youdo-question");}))
        throw new Error("Unexpected exam-bank screen structure");
      slides.forEach(function(node){node.hidden=true;});
      rolling.replaceChildren.apply(rolling,codeScreens.concat(slides));
      // Keep the verified answer text available if a worked SVG fails to load.
      rolling.querySelectorAll(".rhs-trace-review .rhs-trace-figure,.rhs-flow-review .rhs-flow-figure").forEach(function(img){
        function fallback(){
          var text=img.parentElement.querySelector(".rhs-trace-fallback,.rhs-flow-fallback");
          if(text){img.hidden=true;text.hidden=false;}
        }
        img.addEventListener("error",fallback,{once:true});
        if(img.complete&&!img.naturalWidth)fallback();
      });
      return slides;
    }
    var slides=render();
    // New bank stages are not the original renderer's observed nodes.
    // Reset scroll when a new marking slide becomes visible, without altering navigation.
    if(sharedPresentation){
      var lastVisible=null;
      var resetReviewScroll=function(){
        var visible=rolling.querySelector(":scope > .rhs-bank-review-stage:not([hidden])");
        if(visible===lastVisible)return;
        lastVisible=visible;
        if(!visible)return;
        host.scrollTop=0;rolling.scrollTop=0;visible.scrollTop=0;
        visible.querySelectorAll(".rhs-bank-review-question,.rhs-bank-answer-area,.rhs-bank-trace-pilot,.rhs-bank-flow-pilot").forEach(function(panel){panel.scrollTop=0;});
      };
      var reviewObserver=new MutationObserver(resetReviewScroll);
      reviewObserver.observe(rolling,{subtree:true,attributes:true,attributeFilter:["hidden"],childList:true});
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
    var shared=window.RHSYouDoTrial;
    if(shared?.onExamLayoutReady && shared?.selectExamGroups && shared?.measureExamStage){
      shared.onExamLayoutReady(host,rolling,function(){
        try{
          var totalMarks=questions.reduce(function(sum,q){return sum+q.marks;},0);
          function fits(part,start){
            if(part.length>1&&part.some(function(q){return !!traceParts(q)||!!wideCard(q,0,questions.length,false);}))return false;
            var tmp=document.createElement("div");
            tmp.innerHTML=intro(part,start,questions.length,totalMarks,0,2);
            var stage=tmp.firstElementChild;
            // Until a diagram has loaded, use the safe full-screen fallback.
            if(sharedPresentation&&Array.from(stage.querySelectorAll("img")).some(function(img){return !img.complete||!img.naturalWidth;}))return false;
            return shared.measureExamStage(host,rolling,stage);
          }
          var narrow=matchMedia("(max-width:900px)").matches;
          var chosen=fourPreview&&questions.length===4&&!narrow?[questions]:sharedPresentation
            ?window.RHSYouDoLayout.selectGroups(questions.length,function(start,size){return fits(questions.slice(start,start+size),start);},narrow).map(function(g){return questions.slice(g.start,g.end);})
            :shared.selectExamGroups(questions,fits,narrow);
          // Only replace question pages. Both code nodes and all marking
          // pages survive unchanged, including their SVGs.
          var newPages=document.createElement("div");
          newPages.innerHTML=questionPageMarkup(chosen,questions);
          var newSlides=Array.from(newPages.children);
          if(newSlides.length!==chosen.length)throw Error("Invalid grouped question pages");
          var oldPages=Array.from(rolling.querySelectorAll(":scope > .rhs-bank-question-stage"));
          oldPages[0].replaceWith.apply(oldPages[0],newSlides);
          oldPages.slice(1).forEach(function(node){node.remove();});
          host.dataset.rhsBankQuestionPages=String(chosen.length);
          host.dataset.j277ReviewStart=String(2+chosen.length);
          if(typeof updateControl==="function")updateControl();
        }catch(error){console.warn("J277 bank layout fallback: original pages retained",error);}
      });
    }
  }
  load().then(function(questions){
    replaceArchivedYouDo(questions);
  }).catch(function(err){
    // Invalid mappings fail closed; the original lesson stays available.
    delete host.dataset.rhsBankPreview;
    delete host.dataset.rhsH446Preview;
    delete host.dataset.rhsBankShared;
    console.error("J277 bank loading failed; original You Do retained:",err);
  });
})();
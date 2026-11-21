/* RHS Computing J277 Lesson 134: isolated teacher opt-in one-page-per-question review.
 * Runs after exam-classroom.js only when exam-pilot=2 is active.
 * Does not write to Cloudflare, localStorage, cookies, assignment data or scores.
 * Do not adapt globally without the classroom review. */
(function(){
  "use strict";
  var book=window.J277RHSExamPilot134;
  var host=document.getElementById("you-do");
  var deck=host&&host.querySelector(".youdo-rolling");
  if(!book||book.lesson!=="134"||!deck||host.dataset.rhsExamPilot!=="true")return;
  var questions=book.youDo;
  var existing=[].slice.call(deck.querySelectorAll(".youdo-question"));
  // Preserve the two existing Code First stages and the independent 10-mark task.
  if(existing.length<7||!existing[0].classList.contains("j277-ec-code")||
     !existing[1].classList.contains("j277-ec-code-answer")||
     !existing[2].classList.contains("j277-rhs-question-stage"))return;
  var parts=function(q){
    return (q.displayRubric||[]).filter(function(p){
      return !/^Award up to \d+ marks/i.test(p)&&!/^Other valid independent/i.test(p);
    });
  };
  if(!Array.isArray(questions)||questions.length!==4||
     questions.reduce(function(s,q){return s+Number(q.marks);},0)!==10||
     questions.some(function(q){return parts(q).length!==Number(q.marks);})) {
    console.error("RHS one-screen marking: invalid point count; original opt-in display retained.");
    return;
  }
  function esc(x){
    return String(x==null?"":x).replace(/[&<>"']/g,function(c){
      return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];
    });
  }
  function diagram(q){
    var url=String(q.answerSvg||"");
    if(!/^\/assets\/j277\/exam-figures\/[a-z0-9-]+\.svg$/.test(url))return "";
    return '<figure class="j277-rhs-figure"><img src="'+esc(url)+'" loading="lazy"'+
      ' alt="Worked network diagram for '+esc(q.topic)+'">'+
      '<figcaption>Worked diagram — compare the labels and links with your answer.</figcaption></figure>';
  }
  function card(q,i){
    var pic=diagram(q);
    var criteria=parts(q).map(function(item,j){
      var point=item.replace(/^1 mark\s*[—–-]\s*/i,"");
      return '<label class="rhs-one-criterion"><input type="checkbox" data-rhs-one-mark="'+i+
        '" aria-label="Question '+(i+1)+' mark '+(j+1)+'">'+
        '<span><b>1 MARK</b> '+esc(point)+'</span></label>';
    }).join("");
    var other=q.displayRubric.filter(function(p){
      return /^Other valid independent/i.test(p);
    }).join(" ");
    var tip=q.examinerInsight||"Award credit for distinct correct functions; do not award the same point twice.";
    var head='<div class="j277-ec-intro rhs-one-head"><div>'+
      '<span class="j277-ec-kicker">YOU DO · SELF-MARK</span>'+
      '<h2>Question '+(i+1)+' of 4 · '+esc(q.topic)+'</h2></div>'+
      '<div class="j277-ec-time">'+q.marks+' MARK'+(q.marks===1?'':'S')+'</div></div>';
    var prompt='<div class="rhs-one-prompt"><b>RHS PRACTICE QUESTION</b>'+
      '<p>'+esc(q.question)+'</p></div>';
    var answer='<section class="rhs-one-answer"><h3>Tick one mark for each correct point</h3>'+
      '<div class="rhs-one-criteria">'+criteria+'</div>'+
      (other?'<p class="rhs-one-other">'+esc(other)+'</p>':"")+
      '<p class="rhs-one-accepted"><strong>Accepted answers:</strong> '+esc(q.answerPoints)+'</p>'+
      '<p class="rhs-one-tip"><b>'+(q.examinerInsight?'Examiner insight':'Marking reminder')+
      ':</b> '+esc(tip)+'</p></section>';
    var scoring='<div class="rhs-one-scoring"><span>Your original mark: '+
      '<output data-rhs-one-score="'+i+'" aria-live="polite">0 / '+q.marks+'</output></span>'+
      '<span>Total: <output data-rhs-one-total aria-live="polite">0 / 10</output></span>'+
      '<span class="rhs-one-improve">Improve your answer in another colour; do not change your original mark.</span></div>';
    var provenance='<p class="rhs-one-source">'+esc(q.ocrReference)+
      ' · RHS-written practice · Teacher-authored mark guidance · '+
      '<a href="'+esc(q.source)+'" target="_blank" rel="noopener noreferrer">OCR source mark scheme</a>'+
      ' · Trial scores are not saved</p>';
    var el=document.createElement("article");
    el.className="exam-card youdo-question j277-exam-stage j277-ec-marking j277-rhs-mark-stage rhs-one-card";
    el.hidden=true;
    el.innerHTML=head+prompt+
      '<div class="rhs-one-layout '+(pic?'has-diagram':'text-only')+'">'+pic+answer+'</div>'+
      scoring+provenance;
    return el;
  }
  var stages=existing.slice(0,3).concat(questions.map(card));
  deck.replaceChildren.apply(deck,stages);
  stages.forEach(function(s,i){s.hidden=i!==0;});
  host.dataset.windowSize="1";
  host.dataset.j277SeparateReview="true";
  host.dataset.j277ReviewStart="3";
  host.dataset.rhsExamPilot="true";
  function updateMarks(){
    var total=0;
    questions.forEach(function(q,i){
      var awarded=deck.querySelectorAll('input[data-rhs-one-mark="'+i+'"]:checked').length;
      total+=awarded;
      var out=deck.querySelector('[data-rhs-one-score="'+i+'"]');
      if(out)out.textContent=awarded+" / "+q.marks;
    });
    deck.querySelectorAll("[data-rhs-one-total]").forEach(function(el){
      el.textContent=total+" / 10";
    });
  }
  deck.addEventListener("change",function(event){
    if(event.target.matches("input[data-rhs-one-mark]"))updateMarks();
  });
  updateMarks();
})();

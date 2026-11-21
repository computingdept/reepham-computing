/* J277 reusable classroom exam practice. Opt-in lesson configuration only.
 * Do not reproduce OCR past-paper material in public: show source references
 * and authoritative OCR links until access-restricted delivery is configured.
 * Uses existing shared lesson phase/next/previous controller unchanged.
 */
(function(){
  "use strict";
  function esc(x){return String(x==null?"":x).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];});}
  function allowedUrl(u){return /^https:\/\/www\.ocr\.org\.uk\/Images\/[0-9]+-[a-z0-9-]+\.pdf$/i.test(String(u||""))?u:"";}
  function sourceLink(u,label){var href=allowedUrl(u);return href?'<a target="_blank" rel="noopener noreferrer" href="'+esc(href)+'">'+esc(label)+' ↗</a>':"";}
  function stage(html,name){
    var el=document.createElement("article");
    el.className="exam-card youdo-question j277-exam-stage "+(name||"");
    el.hidden=true;el.innerHTML=html;return el;
  }
  function source(q){
    return 'OCR J277/01 · '+esc(q.series)+' '+esc(q.year)+' · Q'+esc(q.ref);
  }
  function scoreGrid(qs){
    return '<div class="j277-ec-scores"><strong>Original marks</strong><div class="j277-ec-score-grid">'+qs.map(function(q,i){
      return '<span><b>Q'+(i+1)+'</b><strong>___/'+esc(q.marks)+'</strong></span>';
    }).join("")+'</div><strong>Total ___ / 10</strong></div>';
  }
  function install(payload){
    if(payload&&payload.rhsPilot){installRhs(payload);return;}
    var conf=payload&&payload.config,code=payload&&payload.code;
    var host=document.getElementById("you-do"),w=document.getElementById("we-do");
    var deck=host&&host.querySelector(".youdo-rolling");
    if(!conf||!code||!w||!host||!deck)return;
    var qs=conf.questions||[];
    var sum=qs.reduce(function(total,q){return total+Number(q.marks||0);},0);
    if(qs.length!==4||sum!==10||qs.some(function(q){return !allowedUrl(q.paper)||!allowedUrl(q.scheme);})) {
      console.error("J277 exam classroom: invalid lesson configuration; current lesson left unchanged.");return;
    }
    // We Do source is a real OCR paper; discussions and explanations are
    // teacher-authored and explicitly distinguished from OCR wording.
    if(conf.weDo&&allowedUrl(conf.weDo.paper)){
      var wd=conf.weDo;
      var steps=[
        ["Think","Identify one specific benefit of a star network compared with a mesh."],
        ["Build","Explain one drawback of a central switch in a star topology."],
        ["Check","Check for a distinct benefit and drawback against the original OCR mark scheme."]
      ];
      w.innerHTML='<div class="wedo-focus-deck"><article class="wedo-example">'+
        '<div class="wedo-reference"><span class="phase-tag">WE DO · GENUINE OCR PAST PAPER</span>'+
        '<h2>'+esc(wd.topic)+'</h2><p class="j277-ec-source">'+source(wd)+'</p>'+
        '<p class="j277-ec-disclaimer">Read the original question in the OCR paper. Classroom discussion prompts are shown opposite.</p>'+
        '<p>'+sourceLink(wd.paper,"Open original OCR question paper")+'</p></div>'+
        '<div class="wedo-practice">'+steps.map(function(st,i){return '<div class="wedo-step"'+(i?' hidden':'')+'>'+
          '<span class="wedo-step-label">GUIDED · STEP '+(i+1)+' OF 3</span><h2>'+st[0]+'</h2><p>'+st[1]+'</p>'+
          (i===2?'<p>'+sourceLink(wd.scheme,"Official OCR marking scheme")+'</p>':'')+'</div>';}).join("")+
        '</div></article></div>';
      w.dataset.guidedSteps="true";
    }
    var existingCode=deck.querySelector(".j277-code-first");
    if(!existingCode){console.error("J277 exam classroom: Code First not found.");return;}
    var codeStage=existingCode.cloneNode(true);
    codeStage.classList.add("j277-exam-stage","j277-ec-code");
    codeStage.querySelectorAll(".youdo-solution").forEach(function(x){x.remove();});
    var answer=stage(
      '<div class="j277-ec-kicker">CODE FIRST · CHECK & IMPROVE</div>'+
      '<h2>Check your mesh calculation</h2>'+
      '<pre class="j277-ec-code">'+esc(code.code)+'</pre>'+
      '<p class="j277-ec-answer">'+esc(code.a)+'</p>'+
      '<p>Correct your prediction before starting the timed questions.</p>',
      "j277-ec-code-answer");
    var qCards=qs.map(function(q,i){
      return '<article class="j277-ec-question"><div class="j277-ec-q-top"><strong>QUESTION '+(i+1)+'</strong>'+
        '<strong>'+esc(q.marks)+' '+(q.marks===1?"MARK":"MARKS")+'</strong></div>'+
        '<p class="j277-ec-source">'+source(q)+'</p>'+
        '<h3>'+esc(q.topic)+'</h3>'+
        '<p class="j277-ec-source-note">Use the original OCR paper for the complete wording'+(q.hasFigure?" and figure":"")+'.</p>'+
        '<p>'+sourceLink(q.paper,"Original paper")+'</p></article>';
    }).join("");
    var questionStage=stage(
      '<div class="j277-ec-intro"><div><span class="j277-ec-kicker">YOU DO · EXAM PRACTICE</span>'+
      '<h2>Independent exam challenge</h2></div><div class="j277-ec-time">10 MINUTES <small>10 MARKS</small></div></div>'+
      '<div class="j277-ec-grid">'+qCards+'</div>'+
      '<p class="j277-ec-disclaimer">The full, unaltered questions are linked to OCR. This public pilot shows references, not copies of the question text.</p>',
      "j277-ec-questions");
    var nodes=[codeStage,answer,questionStage];
    qs.forEach(function(q,i){
      var head='<div class="j277-ec-intro"><div><span class="j277-ec-kicker">YOU DO · MARK & IMPROVE</span>'+
        '<h2>Question '+(i+1)+' of 4</h2></div><div class="j277-ec-time">'+esc(q.marks)+' MARK'+(q.marks===1?"":"S")+'</div></div>'+
        '<p class="j277-ec-source">'+source(q)+'</p><h3 class="j277-ec-topic">'+esc(q.topic)+'</h3>';
      var links='<p class="j277-ec-links">'+sourceLink(q.paper,"Original question")+' · '+sourceLink(q.scheme,"Official mark scheme")+
        (q.report?(' · '+sourceLink(q.report,"Examiner report")):"")+'</p>';
      var points='<div class="j277-ec-points">'+(q.teachingPoints||[]).map(function(p){
        return '<div><span class="j277-ec-tick">✓</span><p>'+esc(p)+'</p></div>';
      }).join("")+'</div>';
      var grid=scoreGrid(qs);
      nodes.push(stage(head+'<p class="j277-ec-step">MARK SCHEME · TEACHER SUMMARY</p>'+points+
        '<p class="j277-ec-disclaimer">Use the linked OCR mark scheme for exact allowable answers and allocation of marks.</p>'+links+grid,
        "j277-ec-marking"));
      if(q.examiner){
        nodes.push(stage(head+'<p class="j277-ec-step">EXAMINER COMMENTS · TEACHING SUMMARY</p>'+
          '<div class="j277-ec-note">'+esc(q.examiner)+'</div>'+
          '<p class="j277-ec-disclaimer">Summary, not a verbatim examiner quotation.</p>'+links+grid,
          "j277-ec-marking"));
      }
      nodes.push(stage(head+'<p class="j277-ec-step">TEACHER EXPLANATION</p>'+
        '<div class="j277-ec-note">'+esc(q.explanation||"")+'</div>'+
        '<p class="j277-ec-improve">Improve: add a missing point in a different colour and preserve your original mark.</p>'+links+grid,
        "j277-ec-marking"));
    });
    deck.replaceChildren.apply(deck,nodes);
    host.dataset.j277SeparateReview="true";
    host.dataset.j277ReviewStart="3";
    host.dataset.windowSize="1";
    host.dataset.codingFirst="true";
    host.dataset.examClassroom="true";
    host.dataset.workMode="independent";
    host.classList.add("j277-ec-active");
    nodes.forEach(function(item,i){item.hidden=i!==0;});
    var counter=host.querySelector(".youdo-window-progress");
    if(counter)counter.textContent="CODE FIRST → EXAM PRACTICE → SELF-MARK";
  }

  // Separate opt-in RHS-written question preview, using the source-linked
  // snapshot generated from the canonical J277 RHS CSV. The existing
  // exam-pilot=1 source-link display remains untouched.
  function installRhs(payload){
    var book=window.J277RHSExamPilot134;
    var conf=payload&&payload.config;
    var host=document.getElementById("you-do"),guided=document.getElementById("we-do");
    var deck=host&&host.querySelector(".youdo-rolling");
    if(!book||book.lesson!=="134"||!conf||!payload.code||!deck||!guided){
      console.error("J277 RHS pilot: missing bank or lesson context. Existing lesson retained.");return;
    }
    var questions=book.youDo;
    var qs=conf.questions||[];
    if(!Array.isArray(questions)||questions.length!==4||qs.length!==4||
       book.weDo.marks!==2||
       questions.reduce(function(s,q){return s+Number(q.marks);},0)!==10||
       !deck.querySelector(".j277-code-first")||
       questions.some(function(q,i){
         return Number(q.marks)!==Number(qs[i].marks) ||
                q.ocrReference.indexOf("June "+qs[i].year+" · Q"+qs[i].ref)<0 ||
                !q.question||!q.answerPoints||!q.markRule;
       })){
      console.error("J277 RHS pilot: bank/questions do not match the 10-mark Lesson 134 sequence.");return;
    }
    // Retain the existing Code First and navigation stage semantics.
    install({config:conf,code:payload.code});
    if(host.dataset.examClassroom!=="true")return;
    var codeStage=deck.children[0],codeAnswer=deck.children[1];
    if(!codeStage||!codeAnswer)return;
    function sourceCaption(q){
      return '<p class="j277-ec-source">'+esc(q.ocrReference)+
        ' · <span class="j277-rhs-author">RHS-written exam practice</span></p>';
    }
    function rubric(q){
      return '<div class="j277-rhs-rubric">'+q.displayRubric.map(function(p){
        return '<p>'+esc(p)+'</p>';
      }).join("")+'</div>';
    }
    function svg(q){
      var url=String(q.answerSvg||"");
      if(!/^\/assets\/j277\/exam-figures\/[a-z0-9-]+\.svg$/.test(url))return "";
      return '<figure class="j277-rhs-figure"><img loading="lazy" src="'+esc(url)+
        '" alt="RHS Computing completed worked diagram for '+esc(q.topic)+'">'+
        '<figcaption>Worked diagram — show only after pupils have attempted the question.</figcaption></figure>';
    }
    function heading(q,i,type){
      return '<div class="j277-ec-intro"><div><span class="j277-ec-kicker">'+
        esc(type)+'</span><h2>Question '+(i+1)+' of 4</h2></div>'+
        '<div class="j277-ec-time">'+esc(q.marks)+' MARK'+(q.marks===1?'':'S')+'</div></div>'+
        sourceCaption(q)+'<h3 class="j277-ec-topic">'+esc(q.topic)+'</h3>';
    }
    // The RHS question is displayed in full, while the two marking points
    // appear only in the third We Do step.
    var wd=book.weDo;
    guided.innerHTML='<div class="wedo-focus-deck"><article class="wedo-example">'+
      '<div class="wedo-reference"><span class="phase-tag">WE DO · RHS EXAM PRACTICE</span>'+
      '<h2>'+esc(wd.topic)+'</h2>'+sourceCaption(wd)+
      '<p class="j277-rhs-question-text">'+esc(wd.question)+'</p></div>'+
      '<div class="wedo-practice">'+
      '<div class="wedo-step"><span class="wedo-step-label">GUIDED · STEP 1 OF 3</span>'+
      '<h2>Try</h2><p>Write one benefit and one drawback. Keep the two points distinct.</p></div>'+
      '<div class="wedo-step" hidden><span class="wedo-step-label">GUIDED · STEP 2 OF 3</span>'+
      '<h2>Discuss</h2><p>Which point describes easier expansion? What happens if the central switch fails?</p></div>'+
      '<div class="wedo-step" hidden><span class="wedo-step-label">GUIDED · STEP 3 OF 3</span>'+
      '<h2>Mark and improve</h2>'+rubric(wd)+
      '<p class="j277-rhs-guidance">'+esc(wd.markRule)+'</p></div>'+
      '</div></article></div>';
    guided.dataset.guidedSteps="true";
    var questionCards=questions.map(function(q,i){
      return '<article class="j277-ec-question j277-rhs-question-card">'+
        '<div class="j277-ec-q-top"><strong>QUESTION '+(i+1)+'</strong>'+
        '<strong>'+esc(q.marks)+' MARK'+(q.marks===1?'':'S')+'</strong></div>'+
        sourceCaption(q)+'<p class="j277-rhs-question-text">'+esc(q.question)+'</p>'+
        '</article>';
    }).join("");
    var questionsStage=stage(
      '<div class="j277-ec-intro"><div><span class="j277-ec-kicker">YOU DO · RHS EXAM PRACTICE</span>'+
      '<h2>Independent exam challenge</h2></div>'+
      '<div class="j277-ec-time">10 MINUTES <small>10 MARKS</small></div></div>'+
      '<div class="j277-ec-grid">'+questionCards+'</div>'+
      '<p class="j277-ec-disclaimer">All question wording is RHS-authored practice. Draw diagrams on paper or a mini-whiteboard; worked solutions will appear during marking.</p>',
      "j277-ec-questions j277-rhs-question-stage");
    function parts(q){
      return (q.displayRubric||[]).filter(function(p){
        return !/^Award up to \d+ marks/i.test(p)&&!/^Other valid independent/i.test(p);
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

    // Four answer cards only; no separate Examiner / Improve screens.
    var stages=[codeStage,codeAnswer,questionsStage].concat(questions.map(card));
    deck.replaceChildren.apply(deck,stages);
    stages.forEach(function(x,i){x.hidden=i!==0;});
    host.dataset.rhsExamPilot="true";
    host.dataset.j277ReviewStart="3";
    host.dataset.j277SeparateReview="true";
    host.dataset.windowSize="1";
    host.dataset.workMode="independent";
    host.dataset.examClassroom="true";
    // Self-marking is transient screen state only. No Cloudflare or storage calls.
    function updateRhsMarks(){
      var total=0;
      questions.forEach(function(q,i){
        var awarded=deck.querySelectorAll('input[data-rhs-one-mark="'+i+'"]:checked').length;
        total+=awarded;
        var out=deck.querySelector('[data-rhs-one-score="'+i+'"]');
        if(out)out.textContent=awarded+" / "+q.marks;
      });
      deck.querySelectorAll("[data-rhs-one-total]").forEach(function(out){
        out.textContent=total+" / 10";
      });
    }
    deck.addEventListener("change",function(event){
      if(event.target.matches("input[data-rhs-one-mark]"))updateRhsMarks();
    });
    updateRhsMarks();
  }

  window.J277ExamClassroom={install:install};
})();
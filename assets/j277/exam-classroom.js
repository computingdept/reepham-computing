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
  window.J277ExamClassroom={install:install};
})();
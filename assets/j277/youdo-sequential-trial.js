/* J277 Lesson 021 only: opt-in sequential You Do trial.
 * Existing shared helpers retained for visual consistency. This file is loaded
 * only with ?youdo-trial=2 and modifies #you-do, never other lesson phases.
 * Read-only, no Cloudflare or score storage. */
(function(global){
  "use strict";
  var active=false,restoreFn=null;
  function escapeHtml(v){
    return String(v==null?"":v).replace(/[&<>"']/g,function(c){
      return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];
    });
  }
  function makeStage(markup,className){
    var el=document.createElement("article");
    el.className="exam-card youdo-question rhs-y-stage "+className;
    el.hidden=true;
    el.innerHTML=markup;
    return el;
  }
  function shortLabel(title){return '<span class="rhs-y-label">'+title+'</span>';}
  function header(name,ordinal,total,mark){
    return '<div class="rhs-y-head"><span>'+escapeHtml(name)+' · '+ordinal+' OF '+total+
      '</span><span>'+escapeHtml(mark||"")+'</span></div>';
  }
  function codeLines(code){
    var token=/"[^"\n]*"|'[^'\n]*'|\b(?:DIV|MOD|AND|OR|NOT|IF|THEN|ELSE|ENDIF|FOR|NEXT|WHILE|DO|UNTIL|FUNCTION|ENDFUNCTION|RETURN|TRUE|FALSE)\b|\b(?:print|input)\b|\b\d+(?:\.\d+)?\b/gi;
    function colour(line){
      var out="",end=0,match;
      while((match=token.exec(line))!==null){
        out+=escapeHtml(line.slice(end,match.index));
        var x=match[0],kind=/^["']/.test(x)?"str":/^\d/.test(x)?"num":
          /^(print|input)$/i.test(x)?"call":"keyword";
        out+='<span class="rhs-y-'+kind+'">'+escapeHtml(x)+'</span>';
        end=token.lastIndex;
      }
      return out+escapeHtml(line.slice(end));
    }
    var lines=String(code||"").replace(/\r\n?/g,"\n").replace(/\n+$/,"").split("\n");
    return '<div class="rhs-y-editor" role="group" aria-label="Numbered OCR Exam Reference Language code">'+
      '<div class="rhs-y-editor-head">OCR ERL <small>READ · TRACE · PREDICT</small></div>'+
      '<pre class="rhs-y-code"><code>'+lines.map(function(line,i){
        return '<span class="rhs-y-line"><span class="rhs-y-line-num" aria-hidden="true">'+(i+1)+
          '</span><span class="rhs-y-line-text">'+(colour(line)||'&#8203;')+'</span></span>';
      }).join("")+'</code></pre></div>';
  }
  function questionText(text){
    var parts=String(text||"").split(/\n\s*\nSource:\s*/i);
    return '<div class="rhs-y-question"><p>'+escapeHtml(parts[0]).replace(/\n/g,"<br />")+
      '</p>'+(parts[1]?'<small>'+escapeHtml("Source: "+parts.slice(1).join(" Source: "))+'</small>':"")+'</div>';
  }
  function markFromText(text){
    var s=String(text||"");
    // Existing [1], [2] or [4] tokens are part of the authored mark scheme.
    // Divide only for presentation; never change the text or its credit.
    var matches=s.match(/(?:[\s\S]*?\[\d+\])(?:\s+|$)|[\s\S]+$/g)||[s];
    var points=matches.filter(function(v){return v.trim();});
    if(points.length<=1)return '<div class="rhs-y-answer-text">'+escapeHtml(s)+'</div>';
    return '<div class="rhs-y-answer-points">'+points.map(function(v,i){
      return '<div class="rhs-y-mark"><span>'+String(i+1).padStart(2,"0")+'</span><p>'+
        escapeHtml(v.trim())+'</p></div>';
    }).join("")+'</div>';
  }
  function prepareHost(host,container,stages,reviewAt){
    if(!host||!container||stages.length<2||active)return false;
    var original=Array.from(container.childNodes).map(function(n){return n.cloneNode(true);});
    var originalClass=container.className, attrs={
      "data-window-size":host.getAttribute("data-window-size"),
      "data-j277-separate-review":host.getAttribute("data-j277-separate-review"),
      "data-j277-review-start":host.getAttribute("data-j277-review-start"),
      "data-work-mode":host.getAttribute("data-work-mode"),
      "data-coding-first":host.getAttribute("data-coding-first")
    };
    try{
      container.className="youdo-rolling rhs-y-rolling";
      container.replaceChildren.apply(container,stages);
      stages.forEach(function(s,i){s.hidden=i!==0;});
      host.dataset.rhsYoudoTrial="true";
      host.dataset.windowSize="1";
      host.dataset.j277SeparateReview="true";
      host.dataset.j277ReviewStart=String(reviewAt);
      host.dataset.workMode="independent";
      host.dataset.windowStart="0";
      if(stages[0].classList.contains("rhs-y-code-first"))host.dataset.codingFirst="true";
      active=true;
      restoreFn=function(){
        container.className=originalClass;
        container.replaceChildren.apply(container,original.map(function(n){return n.cloneNode(true);}));
        Object.keys(attrs).forEach(function(key){
          if(attrs[key]===null)host.removeAttribute(key);else host.setAttribute(key,attrs[key]);
        });
        delete host.dataset.rhsYoudoTrial;
        active=false;restoreFn=null;
      };
      // Each step is a complete projector screen; the previous card's
      // scroll position must never carry over to the next question.
      var observer=new MutationObserver(function(){
        if(!host.classList.contains("active"))return;
        host.scrollTop=0;container.scrollTop=0;
        var visible=stages.find(function(s){return !s.hidden;});
        if(visible)visible.scrollTop=0;
      });
      stages.forEach(function(s){observer.observe(s,{attributes:true,attributeFilter:["hidden"]});});
      return true;
    }catch(err){
      container.className=originalClass;
      container.replaceChildren.apply(container,original);
      console.error("RHS You Do trial could not initialise; original You Do restored.",err);
      return false;
    }
  }
  function codeModelAnswer(answer,originalCode){
    var text=String(answer||"");
    var parsed=text.match(/^MODEL\s+[^\n]+\n([\s\S]*?)\n\s*EXPECTED RESULT\s*\n([\s\S]*)$/i);
    if(!parsed)return '<div class="rhs-y-answer-text">'+escapeHtml(text)+'</div>';
    var sameCode=parsed[1].trim()===String(originalCode||"").trim();
    return '<div class="rhs-y-expected">'+shortLabel("EXPECTED RESULT")+
      '<strong>'+escapeHtml(parsed[2].trim())+'</strong></div>'+
      (sameCode?"":'<div class="rhs-y-alternative">'+shortLabel("MODEL OCR ERL")+
         codeLines(parsed[1])+'</div>');
  }

  function installJ277(data){
    if(active || !/\/lessons\/j277\/lesson-021\//.test(location.pathname) ||
       new URLSearchParams(location.search).get("youdo-trial")!=="2")return false;
    var host=document.getElementById("you-do"),container=host&&host.querySelector(".youdo-rolling");
    if(!host||!container||host.dataset.assessmentMode==="true"||!data||
       data.lesson!=="021"||!data.code||!data.priorExam||
       !Array.isArray(data.questions)||data.questions.length!==3)return false;

    var questions=[{
      question:data.priorExam.q,answer:data.priorExam.a,
      label:"PREVIOUS LEARNING · LESSON "+data.priorExam.from,visual:""
    }].concat(data.questions.map(function(item,i){
      return {question:item[0],answer:item[1],label:"EXAM QUESTION "+(i+1),
        visual:(data.visuals||[])[i]||""};
    }));
    if(questions.some(function(q){
      return typeof q.question!=="string"||!q.question.trim()||
             typeof q.answer!=="string"||!q.answer.trim();
    }))return false;

    function marksOf(s){
      var found=String(s||"").match(/\[(\d+)\s*marks?\]/i);
      return found?Number(found[1]):0;
    }
    function stageQuestion(q,i){
      return makeStage(
        header(q.label,i+1,questions.length,marksOf(q.question)+" MARKS")+
        '<div class="rhs-y-review-body'+(q.visual?' rhs-y-with-visual':'')+'">'+
        (q.visual?'<div class="rhs-y-visual">'+q.visual+'</div>':"")+
        '<div>'+shortLabel("WRITE YOUR ANSWER · MINI-WHITEBOARD OR PAPER")+
          questionText(q.question)+'</div></div>',
        "rhs-y-exam-question"
      );
    }
    var stages=[],code=data.code;
    stages.push(makeStage(header("CODE FIRST",1,1,"PREDICT · WRITE · TEST · IMPROVE")+
      '<div class="rhs-y-question">'+shortLabel("START HERE · MINI-WHITEBOARD")+
      '<p>'+escapeHtml(code.q)+'</p>'+
      (Array.isArray(code.p)&&code.p.length?'<small>'+code.p.map(escapeHtml).join(" · ")+'</small>':"")+
      '</div>'+codeLines(code.code),"rhs-y-code-first"));
    questions.forEach(function(q,i){stages.push(stageQuestion(q,i));});
    // Crucial: show *all* question cards before displaying *any* model answer.
    stages.push(makeStage(header("SELF-MARK · CODE FIRST",1,questions.length+1,"")+
      '<div class="rhs-y-question">'+shortLabel("YOUR ORIGINAL PREDICTION")+
      '<p>'+escapeHtml(code.q)+'</p></div>'+
      '<div class="rhs-y-model">'+shortLabel("MODEL ANSWER")+
      codeModelAnswer(code.a,code.code)+'</div>',"rhs-y-mark-stage"));
    questions.forEach(function(q,i){
      stages.push(makeStage(header("SELF-MARK",i+2,questions.length+1,
        marksOf(q.question)+" MARKS")+
        questionText(q.question)+
        '<div class="rhs-y-review-body'+(q.visual?' rhs-y-with-visual':'')+'">'+
        (q.visual?'<div class="rhs-y-visual">'+q.visual+'</div>':"")+
        '<div class="rhs-y-model">'+shortLabel("MODEL ANSWER · MARKING POINTS")+
           markFromText(q.answer)+'</div></div>',
        "rhs-y-mark-stage"));
    });
    var ok=prepareHost(host,container,stages,questions.length+1);
    if(ok)host.dataset.j277Pilot="sequential-021";
    return ok;
  }
  global.RHSYouDoSequential={installJ277:installJ277};
})(window);

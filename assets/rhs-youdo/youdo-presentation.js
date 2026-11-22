/* RHS Computing shared You Do presentation — opt-in J277/H446 trial.
 * ONLY #you-do is modified. No lesson phase engine, Cloudflare, login,
 * marking persistence or external network calls. Do not enable globally
 * before teacher sign-off and browser regression tests. */
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
    var parsed=text.match(/^MODEL\\s+[^\\n]+\\n([\\s\\S]*?)\\n\\s*EXPECTED RESULT\\s*\\n([\\s\\S]*)$/i);
    if(!parsed)return '<div class="rhs-y-answer-text">'+escapeHtml(text)+'</div>';
    var original=String(originalCode||"").replace(/\\r\\n?/g,"\\n").trim().split("\\n");
    var model=parsed[1].replace(/\\r\\n?/g,"\\n").trim().split("\\n");
    // Display only the changed instruction(s). The complete original source
    // is already visible above; repeating the full model requires scrolling.
    var changed=[];
    for(var i=0;i<Math.max(original.length,model.length);i++){
      if((original[i]||"")!==(model[i]||"") && model[i]!==undefined)
        changed.push({number:i+1,text:model[i]});
    }
    var changes=changed.length?
      '<div class="rhs-y-change">'+shortLabel("COMPLETE / CHANGE THE CODE")+
      '<pre class="rhs-y-changed-lines">'+changed.map(function(line){
        return '<span class="rhs-y-change-line"><span class="rhs-y-change-number">LINE '+
          line.number+'</span><code>'+escapeHtml(line.text.trim())+'</code></span>';
      }).join("")+'</pre></div>':
      '';
    return changes+
      '<div class="rhs-y-expected">'+shortLabel("EXPECTED RESULT")+
      '<strong>'+escapeHtml(parsed[2].trim())+'</strong></div>';
  }
  function installJ277(data){
    // One shared renderer for any ordinary J277 lesson with four available
    // existing preview questions. No approved-question status is implied.
    // Normal lesson display is enabled explicitly for 040 and 062.
    // Every other J277 lesson still requires the opt-in preview parameter.
    if(active || !/^\/lessons\/j277\/lesson-\d{3}\//.test(location.pathname) ||
       (new URLSearchParams(location.search).get("youdo-trial")!=="1" &&
        !(data && data.preview===false && ["040","062"].includes(data.lesson))))return false;
    var host=document.getElementById("you-do"),container=host&&host.querySelector(".youdo-rolling");
    if(!host||!container||host.dataset.assessmentMode==="true"||!data||!data.code||
       !Array.isArray(data.questions)||data.questions.length<3||
       data.questions.length>4||(!data.priorExam&&data.questions.length!==4))return false;
    var questions=(data.questions.length===4?[]:[{
      question:data.priorExam.q,answer:data.priorExam.a,label:"Previous learning",
      visual:""
    }]).concat(data.questions.map(function(item,i){
      return {question:item[0],answer:item[1],visual:(data.visuals||[])[i]||"",
        label:"Exam practice"};
    }));
    if(questions.length!==4 || questions.some(function(q){
      return !q.question||!q.answer;
    }))return false;
    var stages=[];
    var code=data.code;
    var prompt='<div class="rhs-y-question">'+shortLabel("PREDICT · MINI-WHITEBOARD")+
      '<p>'+escapeHtml(code.q)+'</p>'+
      (code.p&&code.p.length?'<small>'+code.p.map(escapeHtml).join(" · ")+'</small>':"")+'</div>';
    stages.push(makeStage(header("CODE FIRST",1,2,"")+prompt+codeLines(code.code),
      "rhs-y-code-first"));
    stages.push(makeStage(header("CODE FIRST",2,2,"CHECK & IMPROVE")+prompt+
      codeLines(code.code)+'<div class="rhs-y-model">'+shortLabel("MODEL ANSWER")+
      codeModelAnswer(code.a,code.code)+'</div>',
      "rhs-y-code-check"));
    // The independent challenge is a 2×2 classroom-paper question grid;
    // sources stay in the lesson data but do not crowd the projected prompts.
    // The question wording and the mark allocation remain unmodified.
    var totalMarks=questions.reduce(function(total,q){
      var found=String(q.question||"").match(/\[(\d+)\s*marks?\]/i);
      return total+(found?Number(found[1]):0);
    },0);
    var challenge='<div class="rhs-y-head"><span>'+(data.preview?"UNAPPROVED LESSON PREVIEW · 4 EXAM QUESTIONS":"INDEPENDENT EXAM CHALLENGE")+'</span>'+
      '<span>'+questions.length+' QUESTIONS · '+totalMarks+' MARKS</span></div><div class="rhs-y-challenge">'+
      questions.map(function(q,i){
        var text=String(q.question||"").split(/\n\s*\nSource:\s*/i)[0].trim();
        var found=text.match(/\[(\d+)\s*marks?\]/i);
        var marks=found?Number(found[1]):0;
        // Marks are already clear at the top right of each card.
        text=text.replace(/\s*\[\d+\s*marks?\]\s*$/i,"").trim();
        return '<section class="rhs-y-challenge-card">'+
          '<div class="rhs-y-challenge-card-head"><span>Q'+(i+1)+'</span>'+
          '<span>'+marks+' MARK'+(marks===1?'':'S')+'</span></div>'+
          '<p>'+escapeHtml(text)+'</p></section>';
      }).join("")+'</div>';
    stages.push(makeStage(challenge,"rhs-y-challenge-stage"));
    questions.forEach(function(q,i){
      var marks=String(q.question).match(/\[(\d+)\s*marks?\]/i);
      var label=marks?marks[1]+" MARKS":"";
      stages.push(makeStage(header(data.preview?"PREVIEW · SELF-MARK":"SELF-MARK",i+1,questions.length,label)+
        questionText(q.question)+'<div class="rhs-y-review-body'+(q.visual?' rhs-y-with-visual':'')+'">'+
        (q.visual?'<div class="rhs-y-visual">'+q.visual+'</div>':"")+
        '<div class="rhs-y-model">'+shortLabel("MODEL ANSWER · MARKING POINTS")+
        markFromText(q.answer)+'</div></div>',
        "rhs-y-mark-stage"));
    });
    return prepareHost(host,container,stages,3);
  }
  function installH446(){
    if(active||location.pathname.indexOf("/lessons/h446/lesson-220/")<0||
       new URLSearchParams(location.search).get("youdo-trial")!=="1")return false;
    var host=document.getElementById("you-do");
    var container=host&&host.querySelector(".youdo-questions");
    var original=container&&Array.from(container.querySelectorAll(":scope > .youdo-question"));
    if(!host||!container||!original||original.length!==5||
      original.some(function(q){return !q.querySelector(".youdo-question-prompt")||
                                     !q.querySelector(".youdo-solution");}))return false;
    // The original first item is the separate Skills Lab invitation.
    // Teacher models and students practise A* in the existing We Do phase.
    // In this opt-in view, You Do contains only the four independent
    // exam questions, followed by those same four original mark schemes.
    // Nothing is moved into, or altered within, We Do.
    var skillHeading=original[0].querySelector(".phase-tag")?.textContent||"";
    if(!/PART 1\s*·\s*INDEPENDENT GRAPH SKILLS/i.test(skillHeading) ||
       !/graph practice/i.test(original[0].textContent))return false;
    var examQuestions=original.slice(1);
    if(examQuestions.length!==4)return false;
    var stages=[];
    examQuestions.forEach(function(q,i){
      var prompt=q.querySelector(".youdo-question-prompt").cloneNode(true);
      stages.push(makeStage(header("INDEPENDENT EXAM",i+1,examQuestions.length,
        q.querySelector(".phase-tag")?.textContent||"")+
        '<div class="rhs-y-original-prompt">'+prompt.innerHTML+'</div>',
        "rhs-y-h446-question"));
    });
    examQuestions.forEach(function(q,i){
      var prompt=q.querySelector(".youdo-question-prompt").cloneNode(true);
      var solution=q.querySelector(".youdo-solution").cloneNode(true);
      solution.hidden=false;
      stages.push(makeStage(header("SELF-MARK",i+1,examQuestions.length,
        q.querySelector(".phase-tag")?.textContent||"")+
        '<div class="rhs-y-review-body rhs-y-h446-answer">'+
        '<section class="rhs-y-original-prompt">'+prompt.innerHTML+'</section>'+
        '<section class="rhs-y-model">'+shortLabel("MODEL ANSWER · MARKING POINTS")+
        solution.innerHTML+'</section></div>',
        "rhs-y-mark-stage rhs-y-h446-mark"));
    });
    return prepareHost(host,container,stages,examQuestions.length);
  }
  global.RHSYouDoTrial={
    installJ277:installJ277,
    installH446:installH446,
    restore:function(){if(restoreFn)restoreFn();}
  };
})(window);

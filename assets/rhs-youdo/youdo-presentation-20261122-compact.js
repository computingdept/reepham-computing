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

  // J277 uses the H446 order: four, three, two, one. No question is split.
  function selectExamGroups(items, fits, narrow){
    var groups=[];
    for(var i=0;i<items.length;){
      var size=1;
      if(!narrow){
        for(var n=4;n>=2;n--){
          var part=items.slice(i,i+n);
          if(part.length===n && fits(part,i)){
            size=n;break;
          }
        }
      }
      groups.push(items.slice(i,i+size));
      i+=size;
    }
    return groups;
  }
  function measureExamStage(host,rolling,stage){
    if(!host.classList.contains("active") || !rolling.clientWidth || !rolling.clientHeight)return false;
    var shown=Array.from(rolling.children).filter(function(x){return !x.hidden;});
    try{
      shown.forEach(function(x){x.hidden=true;});
      stage.style.visibility="hidden";stage.hidden=false;
      rolling.appendChild(stage);
      var boxes=[stage].concat(Array.from(stage.querySelectorAll(".rhs-y-challenge,.rhs-y-challenge-card,.rhs-bank-grid,.rhs-bank-card")));
      return boxes.every(function(x){
        return x.clientHeight>0 && x.clientWidth>0 &&
          x.scrollHeight<=x.clientHeight+4 && x.scrollWidth<=x.clientWidth+4;
      });
    }finally{
      stage.remove();shown.forEach(function(x){x.hidden=false;});
    }
  }
  function onExamLayoutReady(host,rolling,callback){
    var done=false,scheduled=false;
    function attempt(){
      scheduled=false;
      if(done || !host.classList.contains("active") || !rolling.clientWidth || !rolling.clientHeight)return;
      if(Number(host.dataset.windowStart||0)>1){done=true;observer.disconnect();return;}
      done=true;observer.disconnect();
      callback();
    }
    function queue(){
      if(done||scheduled)return;
      scheduled=true;requestAnimationFrame(attempt);
    }
    var observer=new MutationObserver(queue);
    observer.observe(host,{attributes:true,attributeFilter:["class","data-window-start"]});
    queue();
  }
  function commandWords(value){
    if(global.RHSYouDoLayout?.commandRanges){
      var raw=String(value||""),out="",last=0;
      global.RHSYouDoLayout.commandRanges(raw).sort(function(a,b){return a.start-b.start;}).forEach(function(r){if(r.start<last)return;out+=escapeHtml(raw.slice(last,r.start))+'<mark class="rhs-j277-command h446-youdo-command">'+escapeHtml(raw.slice(r.start,r.start+r.length))+'</mark>';last=r.start+r.length;});
      return out+escapeHtml(raw.slice(last));
    }
    var s=String(value||""),re=/(^|[.!?;]\\s+|\\n\\s*|\\([a-zivx0-9]+\\)\\s*)(Analyse|Annotate|Assess|Calculate|Compare|Complete|Construct|Convert|Define|Describe|Design|Determine|Discuss|Draw|Evaluate|Explain|Give|Identify|Justify|Label|List|Name|Outline|Predict|Recommend|Show|Simplify|Sketch|State|Suggest|Trace|Write|Select|Tick|Order|Solve|Add|Modify|Correct|Use)\\b/gi;
    var out="",last=0,m;
    while((m=re.exec(s))){
      var start=m.index+m[1].length;
      out+=escapeHtml(s.slice(last,start))+'<mark class="rhs-j277-command">'+escapeHtml(m[2])+'</mark>';
      last=start+m[2].length;
    }
    return out+escapeHtml(s.slice(last));
  }
  function examTaskText(text){
    var raw=String(text||""),first=global.RHSYouDoLayout?.commandRanges(raw)?.[0];
    if(first&&first.start>0){
      var before=raw.slice(0,first.start),boundary=before.match(/\r?\n[\t ]*\r?\n\s*$/);
      if(boundary&&before.slice(0,boundary.index).trim())return '<span class="rhs-y-context">'+commandWords(before.slice(0,boundary.index))+'</span><span class="rhs-y-task">'+commandWords(raw.slice(first.start))+'</span>';
    }
    return commandWords(raw);
  }
  function questionText(text){
    var parts=String(text||"").split(/\n\s*\nSource:\s*/i);
    return '<div class="rhs-y-question"><p>'+examTaskText(parts[0]).replace(/\n/g,"<br />")+
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
    var original=String(originalCode||"").replace(/\r\n?/g,"\n").trim().split("\n");
    var model=parsed[1].replace(/\r\n?/g,"\n").trim().split("\n");
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
    // Shared presentation for eligible ordinary J277 lessons. Source
    // question sets are assembled by the relevant autumn renderer. Neither
    // question approval flags nor the draft RHS bank are changed here.
    if(active || !/^\/lessons\/j277\/lesson-\d{3}\//.test(location.pathname) ||
       (new URLSearchParams(location.search).get("youdo-trial")!=="1" &&
        !(data && data.preview===false)))return false;
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
    // Source questions use both [4 marks] and [4]. Never turn an
    // unmarked prompt into a fictional "0 MARKS" classroom label.
    function questionMarks(value){
      var text=String(value||"");
      var explicit=text.match(/\[(\d+)\s*marks?\]/i);
      var bare=text.match(/(?:^|[\s.!?])\[(\d+)\](?=\s|$)/);
      var found=explicit||bare;
      return found?Number(found[1]):null;
    }
    function challengeStage(group,start){
      var fullyMarked=group.every(function(q){return questionMarks(q.question)!==null;});
      var totalMarks=group.reduce(function(total,q){return total+(questionMarks(q.question)||0);},0);
      var challenge='<div class="rhs-y-head"><span>'+(data.preview?"UNAPPROVED LESSON PREVIEW · EXAM QUESTIONS":"INDEPENDENT EXAM CHALLENGE")+'</span>'+
        '<span>'+group.length+' QUESTIONS'+(fullyMarked?' · '+totalMarks+' MARKS':'')+'</span></div><div class="rhs-y-challenge" data-count="'+group.length+'">'+
        group.map(function(q,i){
          var text=String(q.question||"").split(/\n\s*\nSource:\s*/i)[0].trim();
          var marks=questionMarks(text);
          text=text.replace(/\s*\[\d+(?:\s*marks?)?\]\s*$/i,"").trim();
          return '<section class="rhs-y-challenge-card">'+
            '<div class="rhs-y-challenge-card-head"><span>Q'+(start+i+1)+'</span>'+
            '<span>'+(marks===null?'EXAM PRACTICE':marks+' MARK'+(marks===1?'':'S'))+'</span></div>'+
            '<p>'+(group.length===4?examTaskText(text):commandWords(text))+'</p></section>';
        }).join("")+'</div>';
      return makeStage(challenge,"rhs-y-challenge-stage");
    }
    stages.push(challengeStage(questions,0));
    questions.forEach(function(q,i){
      var marks=questionMarks(q.question);
      var label=marks===null?"":marks+" MARKS";
      stages.push(makeStage(header(data.preview?"PREVIEW · SELF-MARK":"SELF-MARK",i+1,questions.length,label)+
        '<div class="rhs-j277-answer-layout">'+questionText(q.question)+'<div class="rhs-y-review-body'+(q.visual?' rhs-y-with-visual':'')+'">'+
        (q.visual?'<div class="rhs-y-visual">'+q.visual+'</div>':"")+
        '<div class="rhs-y-model">'+shortLabel("MODEL ANSWER · MARKING POINTS")+
        markFromText(q.answer)+'</div></div></div>',
        "rhs-y-mark-stage"));
    });
    var installed=prepareHost(host,container,stages,3);
    if(!installed)return false;
    host.dataset.rhsJ277Adaptive="true";
    // Mapped Year 11 lessons must retain the original seven stages until the
    // bank adapter has validated its mapping and taken ownership.
    var mapped=["096","097","098","099","100","101","102","103","104","105","106","107","108","109","110","111","112","114","115","116","117","118","119","122","123","124","125","126","127","128","129","130","131","132","133","134","135","136","137","138","139","140","141","142","145","146","147","148","149","150","151","152","153","154","155","158","159","160","161","162","163","164"];
    if(!mapped.includes(String(data.lesson))){
      onExamLayoutReady(host,container,function(){
        try{
          var groups=selectExamGroups(questions,function(part,start){
            return measureExamStage(host,container,challengeStage(part,start));
          },matchMedia("(max-width:900px)").matches);
          var at=0,pages=groups.map(function(group){
            var stage=challengeStage(group,at);at+=group.length;return stage;
          });
          var old=stages[2];
          old.replaceWith.apply(old,pages);
          host.dataset.j277ReviewStart=String(2+pages.length);
          // Keep both Code First nodes and every individual answer unchanged.
          if(typeof updateControl==="function")updateControl();
        }catch(error){console.warn("J277 layout fallback: original question sheet retained",error);}
      });
    }
    return true;
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
    selectExamGroups:selectExamGroups,
    measureExamStage:measureExamStage,
    onExamLayoutReady:onExamLayoutReady,
    commandWords:commandWords,
    installH446:installH446,
    restore:function(){if(restoreFn)restoreFn();}
  };
})(window);

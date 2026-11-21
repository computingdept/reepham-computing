/* RHS J277 You Do unified sequence, static lesson adapter.
 * J277-only shared presentation, static/adapter/renderer inputs. Scope: #you-do.
 * Uses the lesson's authored question SVGs and its answers.html mark schemes.
 * No H446 logic, Cloudflare, assessment changes, persistence or network writes.
 */
(function(){
  "use strict";
  const found=location.pathname.match(/\/lessons\/j277\/lesson-(\d{3})\/(?:index\.html)?$/);
  if(!found)return;
  const number=found[1];
  const host=document.getElementById("you-do");
  const deck=host && host.querySelector(".youdo-rolling");
  if(!host || !deck || host.dataset.assessmentMode==="true")return;
  const esc=value=>String(value??"").replace(/[&<>"']/g,c=>({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
  }[c]));
  const sourceCards=Array.from(deck.querySelectorAll(":scope > .youdo-question"));
  if(sourceCards.length<3 || !sourceCards[0].classList.contains("j277-code-first"))return;
  const newCard=(kind,html)=>{
    const el=document.createElement("article");
    el.className="exam-card youdo-question j277-u-stage "+kind;
    el.hidden=true;
    el.innerHTML=html;
    return el;
  };
  const head=(label,count)=>'<div class="j277-u-head"><strong>'+esc(label)+
    '</strong><span>'+esc(count)+'</span></div>';
  const css=document.createElement("link");
  css.rel="stylesheet";
  css.href="../../../assets/j277/youdo-unified.css?v=20261121-001-v1";

  const injected=window.RHSJ277YouDoData;
  const hasInjected=!!injected && injected.lesson===number &&
    Array.isArray(injected.answers);
  if(!hasInjected && !["001","002"].includes(number))return;
  const answersPromise=hasInjected
    ?Promise.resolve({list:injected.answers})
    :fetch("answers.html",{cache:"no-store"}).then(r=>{
      if(!r.ok)throw Error("answers unavailable");
      return r.text();
    });
  const masterPromise=fetch("../code-first-master-20261021.json",{cache:"no-store"}).then(r=>{
    if(!r.ok)throw Error("Code First bank unavailable");
    return r.json();
  });
  Promise.all([answersPromise,masterPromise]).then(([markup,master])=>{
    let stages;
    if(hasInjected){
      if(markup.list.length!==sourceCards.length ||
         markup.list.some(a=>typeof a!=="string"||!a.trim()))
        throw Error("Injected model answers do not align to source questions");
      // Retain the exact author-written marking text; no model inference.
      stages=markup.list.map(a=>({
        querySelector:sel=>sel===".solution-card"
          ?{innerHTML:'<div class="j277-u-original-marking"><pre>'+
              esc(a)+'</pre></div>'}:null
      }));
    }else{
      const doc=new DOMParser().parseFromString(markup,"text/html");
      stages=Array.from(doc.querySelectorAll("main .answer-stage"));
    }
    const code=master?.lessons?.[number];
    if(stages.length!==sourceCards.length||!code||!code.task||!code.starter||
      !code.model||!code.expected)throw Error("You Do question/answer alignment failed");
    if(stages.some(s=>!s.querySelector(".solution-card")))throw Error("Missing original mark scheme");


    // Lesson 001's approved classroom journey is FOUR screens:
    // Code First -> immediate check -> all four exam prompts -> all four mark schemes.
    // Every other J277 lesson retains its current implementation until explicitly reviewed.
    if(number==="001"){
      if(sourceCards.length!==5)throw Error("Lesson 001 must have Code First + four exam questions");
      const questionPanels=sourceCards.slice(1).map((source,i)=>{
        const prompt=source.querySelector(".question-text");
        if(!prompt)throw Error("Missing exam question "+(i+1));
        const question=prompt.cloneNode(true);
        const visuals=Array.from(source.querySelectorAll("svg,img"));
        question.querySelectorAll("svg,img").forEach(node=>node.remove());
        const title=source.querySelector("h3")?.textContent?.trim()||"Exam question";
        return '<article class="j277-u-batch-card">'+
          '<div class="j277-u-batch-card-header"><strong>Q'+(i+1)+'</strong>'+
          '<span>'+esc(title)+'</span></div>'+
          '<div class="j277-u-batch-prompt">'+question.innerHTML+'</div>'+
          (visuals.length?'<div class="j277-u-batch-visual">'+
            visuals.map(v=>v.outerHTML).join("")+'</div>':"")+'</article>';
      });
      const answerPanels=stages.slice(1).map((answer,i)=>{
        const source=answer.querySelector(".solution-card");
        if(!source)throw Error("Missing model answer for Q"+(i+1));
        const answerText=source.cloneNode(true);
        answerText.querySelectorAll("svg,img,figure,.phase-tag").forEach(el=>el.remove());
        return '<article class="j277-u-batch-card j277-u-batch-answer">'+
          '<div class="j277-u-batch-card-header"><strong>Q'+(i+1)+'</strong>'+
          '<span>MODEL ANSWER</span></div>'+
          '<div class="j277-u-batch-marking">'+answerText.innerHTML+'</div></article>';
      });
      const output=[
        newCard("j277-code-first",head("CODE FIRST","PREDICT · WRITE · TEST · IMPROVE")+
          '<div class="j277-u-body"><div class="j277-u-eyebrow">START HERE · MINI-WHITEBOARD</div>'+
          '<h2>'+esc(code.task)+'</h2>'+
          '<div class="j277-u-editor"><div class="j277-u-editor-label">OCR ERL · TRACE THE OUTPUT</div>'+
          '<pre>'+esc(code.starter)+'</pre></div>'+
          '<div class="j277-u-steps"><span>01 Predict</span><span>02 Write</span>'+
          '<span>03 Test</span><span>04 Improve</span></div></div>'),
        newCard("j277-u-code-check",head("CODE FIRST","CHECK YOUR ANSWER")+
          '<div class="j277-u-body"><div class="j277-u-eyebrow">CHECK · EXPLAIN · IMPROVE</div>'+
          '<h2>'+esc(code.task)+'</h2>'+
          '<div class="j277-u-editor"><div class="j277-u-editor-label">MODEL OCR ERL</div>'+
          '<pre>'+esc(code.model)+'</pre></div>'+
          '<div class="j277-u-result"><span>EXPECTED OUTPUT</span><strong>'+
          esc(code.expected)+'</strong><p>8 + 2 + 1 = 11</p></div></div>'),
        newCard("j277-u-batch j277-u-batch-questions",
          head("INDEPENDENT EXAM PRACTICE","FOUR QUESTIONS · ONE SCREEN")+
          '<div class="j277-u-batch-grid">'+questionPanels.join("")+'</div>'),
        newCard("j277-u-batch j277-u-batch-answers",
          head("SELF-MARK · EXAM PRACTICE","FOUR MODEL ANSWERS")+
          '<div class="j277-u-batch-grid">'+answerPanels.join("")+'</div>')
      ];
      output.forEach((item,i)=>item.hidden=i!==0);
      deck.replaceChildren(...output);
      Object.assign(host.dataset,{
        j277Unified:"true",j277FourStage:"true",
        windowSize:"1",j277SeparateReview:"true",
        j277ReviewStart:"3",codingFirst:"true",
        workMode:"independent",windowStart:"0"
      });
      css.href="../../../assets/j277/youdo-unified.css?v=20261121-001-four-stage-v1";
      document.head.appendChild(css);
      // Keep the existing shared navigation, but give its four stages the
      // correct labels. The observer runs after the shared controller updates.
      const labels=[
        "Check Code First →","Begin exam questions →",
        "Show four model answers →","Continue → Key Vocabulary"
      ];
      const progressLabels=[
        "CODE FIRST · PREDICT","CODE FIRST · CHECK",
        "EXAM PRACTICE · 4 QUESTIONS","SELF-MARK · 4 ANSWERS"
      ];
      function syncProgress(){
        if(!host.classList.contains("active"))return;
        const i=output.findIndex(el=>!el.hidden);
        if(i<0)return;
        const advance=document.getElementById("advance");
        if(advance)advance.textContent=labels[i];
        const progress=host.querySelector(".youdo-window-progress");
        if(progress)progress.textContent=progressLabels[i];
      }
      const observer=new MutationObserver(syncProgress);
      output.forEach(stage=>observer.observe(stage,{attributes:true,attributeFilter:["hidden"]}));
      observer.observe(host,{attributes:true,attributeFilter:["class"]});
      syncProgress();
      return;
    }

    const output=[];
    const codeStage=newCard("j277-code-first",
      head("CODE FIRST","PREDICT · WRITE · TEST · IMPROVE")+
      '<div class="j277-u-body"><div class="j277-u-eyebrow">START HERE · MINI-WHITEBOARD</div>'+
      '<h2>'+esc(code.task)+'</h2>'+
      '<div class="j277-u-editor"><div class="j277-u-editor-label">OCR ERL · TRACE THE OUTPUT</div>'+
      '<pre>'+esc(code.starter)+'</pre></div>'+
      '<div class="j277-u-steps"><span>01 Predict</span><span>02 Write</span>'+
      '<span>03 Test</span><span>04 Improve</span></div></div>');
    output.push(codeStage);

    // Clone only: preserve each authored question and SVG without editing the source.
    sourceCards.slice(1).forEach((source,i)=>{
      const question=source.querySelector(".question-text");
      if(!question)throw Error("Missing source question "+(i+2));
      const copy=question.cloneNode(true);
      // A diagram may precede the question-text block in generated lessons.
      // Pull all authored SVGs from the *cloned* question card; never edit source.
      const visuals=Array.from(source.querySelectorAll("svg,img"));
      copy.querySelectorAll("svg,img").forEach(svg=>svg.remove());
      const figure=visuals.length
        ?'<div class="j277-u-figure">'+visuals.map(v=>v.outerHTML).join("")+'</div>'
        :"";
      const label=source.querySelector(".phase-tag")?.textContent?.trim()||"EXAM PRACTICE";
      const title=source.querySelector("h3")?.textContent?.trim()||"Question";
      output.push(newCard("j277-u-question",
        head("EXAM QUESTION "+(i+1)+" OF "+(sourceCards.length-1),label)+
        '<div class="j277-u-question-grid'+(figure?' has-figure':'')+'">'+figure+
        '<div class="j277-u-question-content"><h2>'+esc(title)+'</h2>'+
        '<div class="j277-u-prompt">'+copy.innerHTML+'</div></div></div>'));
    });

    // All question screens precede any answer reveal.
    output.push(newCard("j277-u-review",
      head("SELF-MARK · CODE FIRST","ANSWER 1 OF "+sourceCards.length)+
      '<div class="j277-u-body"><div class="j277-u-eyebrow">MODEL OCR ERL</div>'+
      '<div class="j277-u-editor"><div class="j277-u-editor-label">WORKED ANSWER</div>'+
      '<pre>'+esc(code.model)+'</pre></div><div class="j277-u-result">'+
      '<span>EXPECTED OUTPUT</span><strong>'+esc(code.expected)+'</strong></div></div>'));
    stages.slice(1).forEach((answer,i)=>{
      const authored=answer.querySelector(".solution-card");
      output.push(newCard("j277-u-review",
        head("SELF-MARK · EXAM QUESTION "+(i+1),
          "ANSWER "+(i+2)+" OF "+sourceCards.length)+
        '<div class="j277-u-mark-scheme">'+authored.innerHTML+'</div>'));
    });

    if(output.length!==sourceCards.length*2)throw Error("Incorrect sequence length");
    const attrMap={
      j277Unified:"true",windowSize:"1",j277SeparateReview:"true",
      j277ReviewStart:String(sourceCards.length),codingFirst:"true",
      workMode:"independent",windowStart:"0"
    };
    // Apply only after all data has been verified; failure leaves old lesson intact.
    output.forEach((stage,i)=>{stage.hidden=i!==0;});
    deck.replaceChildren(...output);
    Object.assign(host.dataset,attrMap);
    document.head.appendChild(css);
    const progress=host.querySelector(".youdo-window-progress");
    if(progress)progress.textContent="CODE FIRST · THEN EXAM PRACTICE";
  }).catch(error=>{
    console.error("J277 static You Do: original content retained.",error);
  });
})();
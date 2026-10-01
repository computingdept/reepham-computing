(() => {
  const script = document.currentScript;
  const mode = script?.dataset?.mode || "lesson";
  const m = location.pathname.match(/lesson-(\d{3})\//);
  const n = m ? m[1] : "002";
  const sourceUrl = "../lesson-" + n + ".html";

  const answerMap = {
    "002":["01001110 = 78 denary = 4E hexadecimal.","38 = 00100110 binary = 26 hexadecimal.","D7 = (13 × 16) + 7 = 215."],
    "003":["A pixel is the smallest individual element of a bitmap image.","240 colours need 8 bits because 2^7 = 128 but 2^8 = 256.","640 × 480 × 8 = 2,457,600 bits = 307,200 bytes."],
    "004":["Sampling is measuring the amplitude of an analogue sound wave at regular intervals.","44 kHz means 44,000 samples are taken each second.","Increasing bit depth increases the number of possible amplitude values and increases file size."],
    "005":["Optical storage uses a laser to read or write data on a disc.","Solid-state is fast, portable and durable because it has no moving parts.","Solid-state is suitable for moving files because it is portable, fast and more resistant to physical damage than optical media."],
    "006":["The CPU processes instructions and data to run programs.","The ALU performs arithmetic operations and logical operations.","Cache stores frequently used data and instructions close to the CPU for fast access."],
    "007":["MAR stores the address of the memory location being accessed.","MDR stores data or an instruction being transferred.","Accumulator: stores the results of calculations performed by the ALU."],
    "008":["Higher clock speed means more CPU cycles per second, so more instructions may be processed in a given time.","More cores allow more instructions or tasks to be processed at the same time.","A larger cache can hold more frequently used data and instructions close to the CPU, reducing slower memory accesses."],
    "009":["Abstraction removes unnecessary detail from a problem.","For a car-rating system, keep age and mileage but ignore unrelated details such as colour.","Decomposition makes a problem easier to solve by splitting it into smaller manageable parts."],
    "010":["miles = input(\"Enter miles\")","age = input(\"Enter age\")","print(\"valid\")"],
    "011":["if score >= 50 then\\n    print(\"pass\")\\nelse\\n    print(\"not pass\")\\nendif","for is iteration.","while is iteration."],
    "012":["An array has a fixed number of elements or positions once declared.","An index is the position used to access an array element.","Arrays store a sequence of related values that a search can examine one item at a time."],
    "013":["Linear search.","Stop when the target is found.","Stop when the end of the list or array is reached without finding the target."],
    "014":["Bubble sort swaps adjacent values when they are in the incorrect order.","Insertion sort works with a sorted part and an unsorted part.","Bubble compares and swaps adjacent pairs repeatedly; insertion takes the next unsorted item and inserts it into the correct place in the sorted part."],
    "015":["Authentication checks a user's identity, for example with a password.","Validation checks input data against rules before it is processed.","Example: miles must be >= 0 and < 10000; age must be >= 0 and <= 5."],
    "016":["Example normal data: 5000 miles, age 3.","Example erroneous data: text such as \"five thousand\" for miles.","Iterative testing is carried out during development as code is built, tested, fixed and retested."],
    "017":["Image size = width × height × colour depth, then convert bits to bytes or kilobytes as required.","A suitable solid-state justification links speed, portability and durability to moving the files.","MAR = address; MDR = data or instruction; PC = address of next instruction; accumulator = calculation result."],
    "018":["Linear search stops when a match is found or the end of the list is reached.","Insertion sort uses sorted and unsorted sections; bubble sort compares adjacent pairs and swaps if wrong.","Validation uses comparisons joined with AND; test it with normal, boundary and erroneous data."]
  };

  const esc = s => String(s ?? "").replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
  const text = el => el ? [...el.childNodes].map(x => x.textContent).join("").trim() : "";
  const html = el => el ? el.innerHTML : "";

  fetch(sourceUrl, {cache:"no-store"}).then(r => {
    if (!r.ok) throw new Error("Source lesson unavailable");
    return r.text();
  }).then(src => {
    const d = new DOMParser().parseFromString(src,"text/html");
    const titleRaw = d.title?.textContent || ("J277 Lesson "+n);
    const title = (titleRaw.split("—")[1] || titleRaw).trim();
    const start = d.querySelector(".title-screen");
    const spec = text(start?.querySelector(".eyebrow")).replace("OCR GCSE Computer Science · ","");
    const subtitle = text(start?.querySelector(".subtitle"));

    const doNow = [...d.querySelectorAll('[data-label="Do Now"] .question-grid article p')].map(x=>x.innerHTML);
    const doAns = [...d.querySelectorAll('[data-label="Do Now answers"] .answer-list strong')].map(x=>x.textContent.trim());

    let objectives=[];
    for (const s of [...d.scripts]) {
      const mm=s.textContent.match(/LESSON_OBJECTIVES=(\[.*?\]);/s);
      if(mm){try{objectives=JSON.parse(mm[1])}catch(e){}}
    }

    const nl=d.querySelector('[data-label="New Learning"]');
    const nlTitle=text(nl?.querySelector("h2"));
    let nlParts=[...nl?.querySelectorAll(".callouts div")||[]].map(c=>({
      a:text(c.querySelector("strong")), b:text(c.querySelector("span"))
    }));
    if(!nlParts.length && nl){
      nlParts=[...nl.querySelectorAll("p,pre")].map(e=>({a:text(e),b:""})).filter(x=>x.a);
    }

    const ido=d.querySelector('[data-label="I Do"]');
    const idoQ=html(ido?.querySelector(".problem p"));
    const idoSteps=[...ido?.querySelectorAll(".working .step")||[]].map(x=>x.innerHTML.trim());

    const wd=d.querySelector('[data-label="We Do"]');
    const wdQ=html(wd?.querySelector(".problem p"));
    const wdSteps=[...wd?.querySelectorAll(".working .step")||[]].map(x=>x.innerHTML.trim());
    const turnTalk=html(d.querySelector('[data-label="Turn & Talk"] .prompt-card p'));

    const youDo=[...d.querySelectorAll('[data-label="You Do"] .youdo-grid article p')].map(x=>x.innerHTML);
    const exam=d.querySelector('[data-label="Exam"]');
    const examQ=html(exam?.querySelector(".exam-card > p"));
    let examA=text(exam?.querySelector(".working .step:nth-of-type(2)")).replace(/^Answer guidance:\s*/,"");

    const vocab=[...d.querySelectorAll('[data-label="Key Vocabulary"] .vocab-card')].map(card=>{
      const ds=[...card.children];
      return {definition:text(ds[0]),term:text(ds[1])};
    });
    const exit=d.querySelector('[data-label="Exit Ticket"]');
    const exitQ=html(exit?.querySelector(".card p"));

    if(mode==="answers"){
      const qs=[...youDo,examQ];
      const ans=[...(answerMap[n]||[]),examA];
      document.open();
      document.write(`<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Lesson ${n} · You Do Answers</title>
<link rel="stylesheet" href="../../../assets/h446-lesson/lesson-base.css?v=20260929-1815">
<link rel="stylesheet" href="../../../assets/h446-lesson/lesson-classroom.css?v=20260930-objectives7">
<style>
body.answer-page{height:100vh;overflow:hidden;background:var(--paper)}
.answer-toolbar{height:56px;position:fixed;left:0;right:0;top:0;z-index:30;padding:0 3vw;display:flex;align-items:center;gap:18px;background:#fff;border-bottom:1px solid var(--line)}
.answer-toolbar a{font-weight:900;text-decoration:none}.answer-toolbar .answer-title{font-weight:900;color:var(--green-dark)}.answer-toolbar .answer-counter{margin-left:auto;color:var(--muted);font-size:14px;font-weight:800}
main.answer-stage-wrap{height:100vh;margin:0;max-width:none;padding:72px 3vw 76px}.answer-stage{height:100%;display:flex;gap:12px;align-items:stretch}.answer-stage[hidden]{display:none!important}
.answer-controls{position:fixed;left:0;right:0;bottom:0;z-index:30;height:60px;padding:8px 3vw;display:flex;align-items:center;gap:10px;background:#fff;border-top:1px solid var(--line)}
.answer-controls button,.answer-controls a{border:1px solid var(--line);border-radius:9px;padding:10px 16px;background:#fff;color:var(--ink);font:inherit;font-weight:900;text-decoration:none;cursor:pointer}.answer-controls #next-answer{margin-left:auto;background:var(--green);border-color:var(--green);color:#fff}.answer-controls button:disabled{opacity:.35}
@media(max-width:900px){body.answer-page{height:auto;overflow:auto}.answer-toolbar{position:sticky;height:auto;min-height:52px;flex-wrap:wrap;padding:10px 14px}main.answer-stage-wrap{height:auto;padding:16px 14px 84px}.answer-stage{height:auto;display:grid;grid-template-columns:1fr}}
</style></head><body class="answer-page">
<header class="answer-toolbar"><a href="index.html#you-do">← Return to You Do</a><span class="answer-title">YOU DO · ANSWERS</span><span class="answer-counter" id="answer-counter">Answer 1 of ${qs.length}</span></header>
<main class="answer-stage-wrap">${qs.map((q,i)=>`<section class="answer-stage"${i?' hidden':''}><article class="solution-card"><span class="phase-tag">QUESTION ${i+1}</span><h2>${esc(title)}</h2><div class="question-text">${q}</div><div class="answer-heading">ANSWER</div><pre class="solution-code">${esc(ans[i]||"Review the worked method and mark scheme.")}</pre></article></section>`).join("")}</main>
<div class="answer-controls"><button type="button" id="previous-answer" disabled>← Previous answer</button><a href="index.html#you-do">Return to You Do</a><button type="button" id="next-answer">Next answer →</button></div>
<script>
const stages=[...document.querySelectorAll('.answer-stage')],previous=document.getElementById('previous-answer'),next=document.getElementById('next-answer'),counter=document.getElementById('answer-counter');let current=0;
function showAnswer(index){current=Math.max(0,Math.min(index,stages.length-1));stages.forEach((stage,i)=>stage.hidden=i!==current);previous.disabled=current===0;next.textContent=current===stages.length-1?'Return to You Do →':'Next answer →';counter.textContent='Answer '+(current+1)+' of '+stages.length}
function goNext(){if(current<stages.length-1)showAnswer(current+1);else location.href='index.html#you-do'} function goPrevious(){if(current>0)showAnswer(current-1)}
next.addEventListener('click',goNext);previous.addEventListener('click',goPrevious);document.addEventListener('keydown',e=>{if(e.target.closest('a,button,input,textarea,select')||e.altKey||e.ctrlKey||e.metaKey)return;if(e.key==='ArrowRight'){e.preventDefault();goNext()}if(e.key==='ArrowLeft'){e.preventDefault();goPrevious()}});showAnswer(0);
<\/script></body></html>`);
      document.close();
      return;
    }

    const objIntro=objectives.map(o=>`<span class="vocab-tip" tabindex="0" data-definition="${esc(o.definition)}">${esc(o.term)}</span>`).join("");
    const objStages=objectives.map((o,i)=>`<article class="objective-vocab-stage"${i?' hidden':''} data-support="${esc(o.example||"")}"><span class="objective-vocab-count">TERM ${i+1} OF ${objectives.length}</span><h2>${esc(o.term)}</h2><div class="objective-vocab-definition" data-objective-vocab-definition hidden><span>DEFINITION</span><p>${esc(o.definition)}</p></div></article>`).join("");

    const refLines=nlParts.slice(0,4).map(x=>x.a+(x.b?" — "+x.b:"")).join("\\n");
    const nlStages=(nlParts.length?nlParts.slice(0,4):[{a:"Apply the key knowledge",b:"Use the reference on the left throughout the lesson."}]).map((x,i,arr)=>`<div class="nl-stage"${i?' hidden':''}><span class="nl-stage-label">STEP ${i+1} OF ${arr.length}</span><h2>${esc(x.a)}</h2><p>${esc(x.b||"Use this idea in the worked examples and exam practice.")}</p><span class="nl-stage-count">${i+1} of ${arr.length}</span></div>`).join("");

    const idoHtml=idoSteps.map((s,i)=>`<div class="ido-step"${i?' hidden':''}><span class="ido-step-label">STEP ${i+1}</span><h2>${s}</h2></div>`).join("");
    const wdHtml=wdSteps.map((s,i)=>`<div class="wedo-step"${i?' hidden':''}><span class="wedo-step-label">${i===0?'YOUR TURN':'CHECK'}</span><h2>${s}</h2></div>`).join("");

    const qs=[...youDo,examQ];
    const qCards=qs.map((q,i)=>`<article class="exam-card youdo-question"${i>=2?' hidden':''}><span class="phase-tag">QUESTION ${i+1} · ${i===3?'ASSESSMENT PRACTICE':'INDEPENDENT PRACTICE'}</span><h3>${esc(title)}</h3><div class="question-text">${q}</div></article>`).join("");

    const vocabStages=vocab.map((v,i)=>`<article class="vocab-stage"${i?' hidden':''}><div class="vocab-prompt"><span class="vocab-test-label">DEFINITION ${i+1} OF ${vocab.length}</span><h2>What is the term?</h2><p class="vocab-question">${esc(v.definition)}</p><span class="vocab-stage-count">${i+1} of ${vocab.length}</span></div><div class="vocab-answer" data-vocab-answer hidden><span class="vocab-test-label">TERM</span><div class="vocab-answer-value">${esc(v.term)}</div></div></article>`).join("");

    const doQuestions=doNow.map((q,i)=>`<article class="donow-question"><strong>${i+1} · ${i===3?'CHALLENGE':'RETRIEVAL'}</strong><p>${q}</p></article>`).join("");
    const doReviews=doNow.map((q,i)=>`<div class="donow-stage" hidden><div class="donow-review"><article class="donow-review-question"><span class="review-number">QUESTION ${i+1} OF 4</span><h2>${esc(title)}</h2><p class="review-question">${q}</p></article><article class="donow-review-answer"><span class="review-label">ANSWER</span><p class="review-answer"><strong>${esc(doAns[i]||"")}</strong></p></article></div></div>`).join("");

    document.open();
    document.write(`<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Lesson ${n} · ${esc(title)}</title><meta name="description" content="OCR J277 Lesson ${n}: ${esc(subtitle)}">
<link rel="stylesheet" href="../../../assets/h446-lesson/lesson-base.css?v=20260929-1815">
<link rel="stylesheet" href="../../../assets/h446-lesson/lesson-classroom.css?v=20260930-objectives7">
<link rel="stylesheet" href="../../../assets/h446-lesson/lesson-print.css?v=20260929-1815"></head><body>
<a class="skip" href="#main">Skip to lesson</a>
<div class="navwrap"><a class="course-back" href="../../../j277-hub.html?year=10">← Year 10 lessons</a><nav class="phase-nav" aria-label="Lesson phases"><button type="button" data-page="do-now">Do Now</button><button type="button" data-page="overview">Objectives</button><button type="button" data-page="new-learning">New Learning</button><button type="button" data-page="i-do">I Do</button><button type="button" data-page="we-do">We Do</button><button type="button" data-page="you-do">You Do</button><button type="button" data-page="vocabulary">Key Vocabulary</button><button type="button" data-page="exit">Exit Ticket</button></nav><div class="nav-tools"><button id="advance" class="control-btn">Continue →</button><button id="previous" class="back-btn">← Previous</button><p id="page-count"></p></div></div>
<div class="signal-wrap"><div class="signals" aria-label="Classroom routine"><span id="phase-logo" class="signal-tile signal-phase"></span><span id="behaviour-logo" class="signal-tile signal-routine"></span><span id="response-logo" class="signal-tile signal-response"></span></div><div class="signal-meta"><span id="phase-time" class="signal-phase-time"></span><span class="lesson-label">OCR J277 · Lesson ${n}<br>${esc(title)}</span></div></div>
<main id="main">
<section id="do-now" class="page phase-donow" data-phase-time="5 minutes"><div class="donow-deck"><div class="donow-stage"><div class="donow-questions">${doQuestions}</div></div>${doReviews}</div></section>
<section id="overview" class="page" data-phase-time="6 minutes" data-objectives-vocab="true"><div class="objectives-vocab-layout"><article class="objectives-vocab-left"><h1>${esc(title)}</h1><div class="objectives"><strong>By the end, you can…</strong><ul><li>${esc(subtitle)}</li><li>apply the key knowledge to OCR-style questions;</li><li>use precise J277 terminology in your answers.</li></ul></div><div class="vocab-intro"><strong>Key vocabulary for today</strong><div class="vocab-intro-list">${objIntro}</div></div></article><div class="objectives-vocab-right" aria-live="polite">${objStages}</div></div></section>
<section id="new-learning" class="page phase-focus" data-phase-time="8 minutes"><div class="nl-focus"><article class="nl-reference"><span class="phase-tag">QUICK REFERENCE · ${esc(spec)}</span><h2>${esc(nlTitle)}</h2><pre class="arithmetic">${esc(refLines)}</pre><div class="nl-reference-note"><strong>Keep this idea:</strong> use the exact terminology when explaining your answer.</div></article><article class="nl-explanation">${nlStages}</article></div></section>
<section id="i-do" class="page phase-ido" data-phase-time="7 minutes"><div class="ido-focus-deck"><article class="ido-example"><div class="ido-reference"><span class="phase-tag">ONE COMPLETE WORKED EXAMPLE</span><h2>${esc(title)}</h2><p>${idoQ}</p><span class="ido-example-count">Worked example</span></div><div class="ido-method">${idoHtml}</div></article></div></section>
<section id="we-do" class="page phase-wedo" data-phase-time="10 minutes"><div class="wedo-focus-deck"><article class="wedo-example"><div class="wedo-reference"><span class="phase-tag">GUIDED PRACTICE</span><h2>${esc(title)}</h2><p>${wdQ}</p><div class="nl-reference-note"><strong>Turn &amp; Talk:</strong> ${turnTalk}</div><span class="wedo-example-count">Guided example</span></div><div class="wedo-practice">${wdHtml}</div></article></div></section>
<section id="you-do" class="page phase-youdo" data-phase-time="25 minutes · OCR exam practice" data-window-size="2"><div class="youdo-deck"><div class="youdo-rolling">${qCards}</div><div class="youdo-window-progress">Questions 1–2 of ${qs.length}</div></div></section>
<section id="vocabulary" class="page phase-vocab" data-phase-time="4 minutes" data-vocab-flow="retrieval"><div class="vocab-deck">${vocabStages}</div></section>
<section id="exit" class="page phase-exit" data-phase-time="2 minutes"><div class="exit-compact"><div class="exit-check-card"><div class="exit-check-kicker">CHECK LEARNING · TRUE OR FALSE?</div><p class="exit-check-question">${exitQ}</p><div class="exit-check-response"><span class="exit-key-item">👍 <span>Thumb up = True</span></span><span class="exit-key-item">👎 <span>Thumb down = False</span></span></div></div><div class="exit-reflection-strip"><div class="exit-confidence-title"><strong>How did the lesson go?</strong><span>Show one response.</span></div><div class="exit-confidence-choice"><div><strong>👍 Thumb up</strong><span>I can apply this independently.</span></div></div><div class="exit-confidence-choice"><div><strong>↔ Thumb sideways</strong><span>I understand most of it but need more practice.</span></div></div><div class="exit-confidence-choice"><div><strong>👎 Thumb down</strong><span>I need help with this topic.</span></div></div></div></div></section>
</main><div class="lesson-footer">Lesson ${n} · ${esc(title)} <span>Year 10 · OCR J277</span></div>
<script src="../../../assets/h446-lesson/lesson.js?v=20260930-objectives5"><\/script></body></html>`);
    document.close();
  }).catch(err => {
    document.body.innerHTML='<p style="font-family:sans-serif;padding:2rem">Lesson failed to load: '+esc(err.message)+'</p>';
  });
})();
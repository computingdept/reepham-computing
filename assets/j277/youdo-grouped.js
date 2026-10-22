
/* J277 GCSE You Do: standalone Q1, Q2–Q4 on one TV screen, grouped mark schemes.
 * Run only in J277 lessons. No H446 content, no shared CSS/JS edits.
 * Five reviewed lessons use approved mark schemes; other lessons preserve their current wording.
 */
(function(){
"use strict";
var numMatch=location.pathname.match(/\/lesson-(\d{3})\//),n=numMatch&&numMatch[1];
if(!n||/\/answers\.html$/.test(location.pathname))return;
var excluded=new Set(["018","035","050","078","094","113","120","143","156","157"]);
if(excluded.has(n))return;
var host=document.querySelector("#you-do:not(.j277-assessment)"),deck=host&&host.querySelector(".youdo-rolling");
if(!host||!deck||!deck.querySelector(".j277-code-first"))return;
var css=document.createElement("link");css.rel="stylesheet";css.href="../../../assets/j277/youdo-grouped.css?v=20261022-5";document.head.appendChild(css);
var esc=function(x){return String(x==null?"":x).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})};
var commands=/\b(Analyse|Calculate|Compare|Complete|Convert|Define|Describe|Design|Discuss|Draw|Evaluate|Explain|Give|Identify|Justify|Label|List|Outline|Refine|Show|State|Trace|Write)\b/gi;
function emphasized(s,keywords){
 var text=String(s||""),start=0,out="",first=false;
 var allowed=Array.isArray(keywords)?new Set(keywords.map(function(x){return x.toLowerCase()})):null;
 for(const m of text.matchAll(commands)){
   out+=esc(text.slice(start,m.index));
   var ok=allowed?allowed.has(m[0].toLowerCase()):!first;
   out+=ok?'<mark class="j277-sm-command">'+esc(m[0])+'</mark>':esc(m[0]);
   first=first||ok;start=m.index+m[0].length;
 }
 return out+esc(text.slice(start));
}
function clean(s){return String(s||"").replace(/\n\s*Source:\s*[\s\S]*$/i,"").trim()}
function getMarks(s){var all=[...String(s||"").matchAll(/\[(\d+)(?:\s*marks?)?\]/gi)];return all.length?Number(all[all.length-1][1]):null}
function oneQuestion(q,i,visual){
 var pilot=!!q.number,body=clean(pilot?q.text:q[0]),marks=pilot?q.marks:getMarks(body);
 var style=pilot?q.kind:"OCR J277 examination practice";
 return {name:"Q"+(i+2),marks:marks,command:pilot?q.command:null,body:body,style:style,scheme:pilot?q.scheme:null,answer:pilot?"":String(q[1]||""),model_code:pilot?q.model_code:null,indicative:pilot?q.indicative:null,note:pilot?q.note:null,visual:visual||""};
}
function head(q){
 return '<div class="j277-sm-card-head"><strong>'+q.name+'</strong><span class="j277-sm-marks">'+(q.marks!=null?q.marks+' MARKS':'EXAM PRACTICE')+'</span></div>';
}
function questionCard(q){
 return '<section class="j277-sm-card">'+head(q)+'<div class="j277-sm-kind">'+esc(q.style)+'</div><div class="j277-sm-question">'+emphasized(q.body,q.command)+'</div>'+(q.visual?'<div class="j277-sm-visual">'+q.visual+'</div>':'')+'</section>';
}
function markCard(q,i){
 var content="",levels=q.scheme&&q.marks===8;
 if(q.scheme&&levels){
    content='<div class="j277-sm-answer-list">'+q.scheme.map(function(m){return '<div class="j277-sm-level"><strong>'+esc(m.marks)+' marks</strong><div>'+esc(m.point)+'</div></div>'}).join("")+'</div>';
 }else if(q.scheme){
    content='<ul class="j277-sm-answer-list">'+q.scheme.map(function(m){return '<li><span class="j277-sm-point">✓ '+esc(m.marks)+'</span><span>'+esc(m.point)+'</span></li>'}).join("")+'</ul>';
 }else{
    content='<div class="j277-sm-model">'+esc(q.answer)+'</div>';
 }
 if(q.model_code)content+='<div class="j277-sm-kind">One valid model · OCR ERL</div><pre class="j277-sm-code">'+esc(q.model_code)+'</pre>';
 if(q.indicative)content+='<div class="j277-sm-level"><strong>Indicative content</strong><ul>'+q.indicative.map(function(x){return '<li>'+esc(x)+'</li>'}).join("")+'</ul></div>';
 return '<section class="j277-sm-card j277-sm-answer-card'+(i===0?' j277-sm-mobile-active':'')+'" data-j277-answer="'+i+'">'+head(q)+content+'<div class="j277-sm-note">'+esc(q.note||"Mark your own work against this guidance. Credit equivalent correct answers.")+'</div><div class="j277-sm-score">My mark: _____ / '+esc(q.marks!=null?q.marks:"?")+'</div></section>';
}
function phoneNav(questions){
 return '<div class="j277-sm-phone"><button type="button" data-j277-prev disabled>← Previous</button><strong data-j277-counter>1 of '+questions.length+' answers</strong><button type="button" data-j277-next '+(questions.length===1?'disabled':'')+'>Next →</button></div>';
}
function group(qs,extra,extended){
 var classes=qs.length===1?" one":qs.length===2?" two":"";
 var question='<div class="j277-sm-toolbar">'+(extended?"Q4 · 8-mark extended response":"YOU DO · Q2–Q4")+'</div><div class="j277-sm-grid'+classes+'">'+qs.map(questionCard).join("")+'</div>';
 if(extra&&extra.priorExam){question+='<details class="j277-sm-extra"><summary>Optional retrieval · earlier learning</summary><p>'+esc(clean(extra.priorExam.q))+'</p></details>'}
 if(extra&&extra.challenge){question+='<details class="j277-sm-extra"><summary>Optional stretch and mastery</summary><p>'+esc(extra.challenge.stretch&&extra.challenge.stretch.task||"")+'</p><p>'+esc(extra.challenge.mastery&&extra.challenge.mastery.task||"")+'</p></details>'}
 var answers='<div class="j277-sm-toolbar">'+(extended?"Q4 · levels of response":"SELF-MARK · "+qs.map(function(q){return q.name}).join(" · "))+'</div><div class="j277-sm-grid j277-sm-answers'+classes+'">'+qs.map(markCard).join("")+'</div>'+phoneNav(qs);
 answers+='<div class="j277-sm-total">Self-mark: '+qs.map(function(q){return q.name+" ___/"+(q.marks||"?")}).join(" · ")+(qs.every(function(q){return Number.isInteger(q.marks)})?" · Total ___/"+qs.reduce(function(v,q){return v+q.marks},0):"")+'</div>';
 var article=document.createElement("article");
 article.className="exam-card youdo-question j277-sm-group";article.hidden=true;
 article.innerHTML=question+'<div class="youdo-solution" hidden>'+answers+'</div>';
 return article;
}
function installFromData(original,pilot,master){
 var code=deck.querySelector(".j277-code-first");if(!code)return;
 var lesson=original||{},p=pilot&&pilot.lessons&&pilot.lessons[n];
 var qs=(p&&p.questions)||lesson.e;
 if(!Array.isArray(qs)||qs.length<3){console.warn("J277 self-mark: fewer than 3 authored questions for",n);return}
 var existing=[...deck.querySelectorAll(".youdo-question")].filter(function(el){return !el.classList.contains("j277-code-first")&&!el.classList.contains("j277-prior-exam")&&!el.querySelector(".y11-challenge-hint")});
 var questions=qs.slice(0,3).map(function(q,i){var fig=existing[i]&&existing[i].querySelector("svg");return oneQuestion(q,i,fig?fig.outerHTML:"")});
 var entry=master&&master.lessons&&master.lessons[n];
 if(!entry){console.warn("J277 self-mark: Code First missing for",n);return}
 // Authoritative reviewed Code First answer comes from the J277-only task bank.
 var model=code.querySelector(".youdo-solution");
 if(!model){model=document.createElement("div");model.className="youdo-solution";model.hidden=true;code.appendChild(model)}
 model.innerHTML='<div class="j277-sm-toolbar">CODE FIRST · MODEL OCR ERL</div><pre class="j277-sm-code">'+esc(entry.model)+'</pre><div class="j277-sm-total">Expected result: '+esc(entry.expected)+'</div>';
 var nodes=[code];
 var extended=p&&questions[2].marks===8;
 if(extended){nodes.push(group(questions.slice(0,2),lesson,false));nodes.push(group(questions.slice(2),null,true))}
 else nodes.push(group(questions,lesson,false));
 // Build after the current shared lesson script has established its navigation.
 // The two or three outer .youdo-question elements are the original JS's navigation units.
 deck.replaceChildren.apply(deck,nodes);
 host.dataset.windowSize="1";host.dataset.codingFirst="true";
 delete host.dataset.answerMode;delete host.dataset.answerIndex;
 host.dataset.windowStart="0";host.classList.add("j277-sm-ready");
 nodes.forEach(function(el,i){el.hidden=i!==0});
 var progress=host.querySelector(".youdo-window-progress");
 if(progress)progress.textContent="CODE FIRST · THEN EXAM PRACTICE";
 // On phones, show exactly one marking scheme at a time; on the TV all are shown.
 host.addEventListener("click",function(ev){
   var control=ev.target.closest("[data-j277-prev],[data-j277-next]");
   if(!control)return;
   ev.preventDefault();ev.stopPropagation();
   var solution=control.closest(".youdo-solution"),cards=[...solution.querySelectorAll("[data-j277-answer]")];
   var current=cards.findIndex(function(c){return c.classList.contains("j277-sm-mobile-active")});
   var next=Math.min(cards.length-1,Math.max(0,current+(control.hasAttribute("data-j277-next")?1:-1)));
   cards.forEach(function(el,i){el.classList.toggle("j277-sm-mobile-active",i===next)});
   var label=solution.querySelector("[data-j277-counter]");
   if(label)label.textContent=(next+1)+" of "+cards.length+" answers";
   var back=solution.querySelector("[data-j277-prev]"),forward=solution.querySelector("[data-j277-next]");
   if(back)back.disabled=next===0;
   if(forward)forward.disabled=next===cards.length-1;
 });
}
function json(path){return fetch(path,{cache:"no-store"}).then(function(r){if(!r.ok)throw Error(path+" HTTP "+r.status);return r.json()})}
var dataPath;
if(Number(n)>=19)dataPath="../autumn2-"+n+".json";
else if(Number(n)>=4)dataPath="../autumn1-"+(Number(n)<=8?"004-008":Number(n)<=13?"009-013":"014-018")+".json";
else dataPath=null;
if(!dataPath){
  // 001–003 use older lesson formats. Keep their original questions and marking guidance.
  var oldCards=[...deck.querySelectorAll(".youdo-question")].slice(1,4);
  if(oldCards.length!==3)return;
  function getOriginalAnswers(){
    if(n==="003")return Promise.resolve([
      "10110000 binary is B0 hexadecimal.",
      "A3 hexadecimal is 163 denary.",
      "98 denary is 62 hexadecimal."
    ]);
    return fetch("answers.html",{cache:"no-store"}).then(function(r){if(!r.ok)throw Error("Older answers unavailable");return r.text()}).then(function(text){
      var doc=new DOMParser().parseFromString(text,"text/html");
      var stages=[...doc.querySelectorAll(".answer-stage")].slice(1,4);
      if(stages.length!==3)throw Error("Expected three exam marking stages");
      return stages.map(function(x){return (x.querySelector(".solution-card")||x).textContent.trim()});
    });
  }
  Promise.all([getOriginalAnswers(),json("../code-first-master-20261021.json")]).then(function(v){
    var e=oldCards.map(function(card,i){
      var question=card.querySelector(".question-text")||card;
      return [question.textContent.trim(),v[0][i]]
    });
    installFromData({e:e},null,v[1]);
  }).catch(function(e){console.error("J277 older You Do grouped layout unavailable; original retained",e)});
  return;
}
Promise.all([json(dataPath),json("../code-first-master-20261021.json"),json("../youdo-five-reviewed-20261022.json").catch(function(){return {lessons:{}}})])
.then(function(results){installFromData(results[0][n],results[2],results[1])})
.catch(function(e){console.error("J277 grouped You Do unavailable; existing lesson retained",e)});
})();

"use strict";

// Lesson 217's Lomuto-style, last-element-pivot implementation is the ONE
// convention used for all worked examples, traces, fixes and reference code.
const $ = id => document.getElementById(id);
// v4 scores Hard's exam-style recursive calls/returns + C# debugging.
const STORAGE_KEY = "rhsc.h446.quicksortCodeLab.best.v4";
const QUESTIONS = {
  easy: [
    [5, 1, 3], [8, 2, 6, 4], [7, 3, 1, 5], [6, 2, 4, 1], [9, 4, 7, 2]
  ],
  medium: [
    [9, 4, 7, 2, 4, 8, 1, 6], [12, 3, 9, 3, 10, 5, 7, 5, 11],
    [6, 6, 2, 9, 1, 6, 8, 4], [10, 1, 10, 5, 3, 3, 8, 7, 2, 9],
    [14, 2, 11, 5, 11, 1, 9, 3, 6, 12, 7, 4]
  ],
  hard: [
    [13, 5, 8, 1, 11, 3, 8, 6, 2, 14, 4],
    [12, 3, 9, 3, 10, 5, 7, 5, 11, 2, 8, 6],
    [6, 6, 2, 9, 1, 6, 8, 4, 11, 3, 7, 5, 10],
    [10, 1, 10, 5, 3, 3, 8, 7, 2, 9, 4, 11, 6, 12],
    [14, 2, 11, 5, 11, 1, 9, 3, 6, 12, 7, 4, 10, 8, 13]
  ]
};

// Correct code is kept in one canonical list: every fault replaces a line
// in this list and the same implementation is used in the runnable C# demo.
const CODE = [
  "static void QuickSort(int[] a, int low, int high) {",
  "    if (low >= high) return;",
  "    int p = Partition(a, low, high);",
  "    QuickSort(a, low, p - 1);",
  "    QuickSort(a, p + 1, high);",
  "}",
  "static int Partition(int[] a, int low, int high) {",
  "    int pivot = a[high];",
  "    int i = low - 1;",
  "    for (int j = low; j < high; j++) {",
  "        if (a[j] <= pivot) {",
  "            i++;",
  "            Swap(a, i, j);",
  "        }",
  "    }",
  "    Swap(a, i + 1, high);",
  "    return i + 1;",
  "}"
];
const FAULTS = {
  base: {line:2, bad:"    if (low <= high) return;", hint:"A range with zero or one element must stop. When is low greater than or equal to high?"},
  left: {line:4, bad:"    QuickSort(a, low, p);", hint:"The pivot is already in its final position; do not include it in the left recursive call."},
  right: {line:5, bad:"    QuickSort(a, p, high);", hint:"The right side starts immediately AFTER the pivot."},
  pivot: {line:8, bad:"    int pivot = a[low];", hint:"This version uses the LAST value, found at index high."},
  index: {line:9, bad:"    int i = low + 1;", hint:"Before the first value ≤ pivot is found, the left partition must be empty."},
  loop: {line:10, bad:"    for (int j = low; j <= high; j++) {", hint:"The last value is the pivot. The loop must stop before that index."},
  condition: {line:11, bad:"        if (a[j] >= pivot) {", hint:"Smaller or equal values belong on the LEFT of the pivot."},
  increment: {line:12, bad:"            i--;", hint:"Every value ≤ pivot extends the left section by one place, not backwards."},
  inner: {line:13, bad:"            Swap(a, i, high);", hint:"During the loop, swap the current value at j with the next left-side position at i. The pivot stays at high until the end."},
  swap: {line:16, bad:"    Swap(a, i, high);", hint:"The pivot belongs immediately after the final smaller-or-equal value."},
  return: {line:17, bad:"    return i;", hint:"Return the position where the pivot was placed, not the last smaller-value index."}
};
const FAULT_SETS = {
  easy: [["base"],["pivot"],["left"],["swap"],["return"]],
  medium: [["pivot","loop","return"],["base","left","right"],["index","condition","swap"],["pivot","right","swap"],["loop","left","return"]],
  hard: [
    ["base","left","pivot","loop","condition","swap"],
    ["right","index","increment","inner","swap","return"],
    ["base","left","right","pivot","inner"],
    ["left","pivot","loop","increment","swap","return"],
    ["base","right","index","condition","inner","return"]
  ]
};
const DEMO_INPUT = [5, 1, 7, 3];
// Five distinct recursive algorithms rotate through the Hard questions.
// The OCR June 2017 calculate(4,10) task is modelled in the worked demo;
// the scored problems use different inputs and other function patterns.
const RECURSION_TYPES = ["calculate","sumTo","factorial","power","digitSum"];
const RECURSION_CODE = {
  calculate:`function calculate(a, b)\n    if a == b then\n        return a\n    elseif a > b then\n        return calculate(a - b, b)\n    else\n        return calculate(a, b - a)\n    endif\nendfunction`,
  sumTo:`function sumTo(n)\n    if n <= 1 then\n        return n\n    endif\n    return n + sumTo(n - 1)\nendfunction`,
  factorial:`function factorial(n)\n    if n <= 1 then\n        return 1\n    endif\n    return n * factorial(n - 1)\nendfunction`,
  power:`function power(base, exponent)\n    if exponent == 0 then\n        return 1\n    endif\n    return base * power(base, exponent - 1)\nendfunction`,
  digitSum:`function digitSum(n)\n    if n < 10 then\n        return n\n    endif\n    return (n MOD 10) + digitSum(n DIV 10)\nendfunction`
};
const CALCULATE_PAIRS = [[6,14],[4,14],[6,16],[8,18],[8,22]];

function makeRecursionExercise(kind,randomize=false){
  const calls=[],returns=[];
  if(kind==="calculate"){
    let [a,b]=CALCULATE_PAIRS[randomize?Math.floor(Math.random()*CALCULATE_PAIRS.length):0];
    while(true){
      calls.push(`calculate(${a},${b})`);
      if(a===b)break;
      if(a>b)a-=b;else b-=a;
    }
    for(let i=0;i<calls.length;i++)returns.push(a);
  }else if(kind==="sumTo"){
    const n=randomize?4+Math.floor(Math.random()*3):5;
    for(let k=n;k>=1;k--){calls.push(`sumTo(${k})`);returns.push(k*(k+1)/2);}
  }else if(kind==="factorial"){
    const n=randomize?4+Math.floor(Math.random()*2):5;
    let product=1;
    const factorials=[1];for(let k=1;k<=n;k++){product*=k;factorials[k]=product;}
    for(let k=n;k>=1;k--){calls.push(`factorial(${k})`);returns.push(factorials[k]);}
  }else if(kind==="power"){
    const base=randomize?2+Math.floor(Math.random()*3):3;
    const exponent=randomize?3+Math.floor(Math.random()*3):4;
    for(let e=exponent;e>=0;e--){calls.push(`power(${base},${e})`);returns.push(base**e);}
  }else if(kind==="digitSum"){
    let n=randomize?23456+Math.floor(Math.random()*70000):47382;
    function sumDigits(value){return String(value).split("").reduce((sum,ch)=>sum+Number(ch),0);}
    while(true){calls.push(`digitSum(${n})`);returns.push(sumDigits(n));if(n<10)break;n=Math.floor(n/10);}
  }
  return {kind,code:RECURSION_CODE[kind],calls,returns,result:returns[0],start:`print(${calls[0]})`};
}

let level = "easy", question = 0, traceStep = 0, recursionPhase = "calls", offset = 0;
let scores = [null,null,null,null,null];
let traceFirstTry = true, recursionFirstTry = true, fixFirstTry = true;
let currentSteps = [], recursionExercise = null, demoIndex = 0;
let activeQuestions = QUESTIONS.easy.map(a=>a.slice());
let activeRecursions = RECURSION_TYPES.map(kind=>makeRecursionExercise(kind));
let best = {};
try { best = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); } catch (_) { best = {}; }

// An independent JavaScript model computes expected traces; it does NOT run
// students' C#. Learners compile the C# itself using the linked .NET Fiddle.
function traceQuickSort(input) {
  const a = input.slice(), steps = [];
  function partition(low,high) {
    const before = a.slice(), pivot = a[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      if (a[j] <= pivot) {
        i++;
        [a[i], a[j]] = [a[j], a[i]];
      }
    }
    [a[i+1],a[high]] = [a[high],a[i+1]];
    const p = i+1;
    steps.push({low,high,before,after:a.slice(),pivot,p,left:`${low}..${p-1}`,right:`${p+1}..${high}`});
    return p;
  }
  function sort(low,high) {
    if (low >= high) return;
    const p = partition(low,high);
    sort(low,p-1);
    sort(p+1,high);
  }
  sort(0,a.length-1);
  return {steps, sorted:a};
}

// Model the actual call stack, INCLUDING zero/one-element base-case calls.
// Every event is a real PUSH on entry or POP on return, so the exercises
// ask what happens next at four different points in the execution.
function traceRecursionStack(input) {
  const partitions = new Map(traceQuickSort(input).steps.map(s=>[`${s.low}:${s.high}`,s]));
  const stack = [], events = [];
  const snapshot = (action,kind,context) => events.push({
    action,kind,context,stack:stack.map(f=>({...f}))
  });
  function sort(low,high,from) {
    const p = partitions.get(`${low}:${high}`)?.p;
    stack.push({low,high});
    if(low>=high){
      snapshot("push","base",`QuickSort(a, ${low}, ${high}) just started. The base case low >= high is TRUE, so this call must return.`);
    }else{
      snapshot("push","partition",`QuickSort(a, ${low}, ${high}) has just partitioned the range. Pivot index p = ${p}. The NEXT line calls QuickSort(a, ${low}, ${p-1}) on the left.`);
      sort(low,p-1,"left");
      sort(p+1,high,"right");
    }
    stack.pop();
    if(stack.length){
      const parent=stack[stack.length-1];
      const parentPivot=partitions.get(`${parent.low}:${parent.high}`).p;
      if(from==="left")snapshot("pop","left-return",`The LEFT call QuickSort(a, ${low}, ${high}) has returned. Its parent QuickSort(a, ${parent.low}, ${parent.high}) resumes; pivot p = ${parentPivot}. The NEXT line calls the RIGHT side, QuickSort(a, ${parentPivot+1}, ${parent.high}).`);
      else snapshot("pop","right-return",`The RIGHT call QuickSort(a, ${low}, ${high}) has returned. Both sides of parent QuickSort(a, ${parent.low}, ${parent.high}) are finished, so its NEXT action is to return.`);
    }else snapshot("pop","finished","The original call has returned. Quicksort is finished.");
  }
  sort(0,input.length-1,"root");
  return events;
}

function chooseStackCheckpoints(input){
  const events=traceRecursionStack(input);
  const kinds=["partition","base","left-return","right-return"];
  const picked=kinds.map(kind=>{
    const candidates=events.map((event,i)=>({event,i})).filter(v=>v.event.kind===kind&&v.i<events.length-1);
    // Prefer the deepest useful example; ties use the earliest occurrence.
    candidates.sort((a,b)=>b.event.stack.length-a.event.stack.length||a.i-b.i);
    return candidates[0];
  }).filter(Boolean).sort((a,b)=>a.i-b.i);
  return picked.map(({event,i})=>({
    ...event,
    nextAction:events[i+1].action,
    nextTop:events[i+1].stack.at(-1)||null,
    nextStack:events[i+1].stack
  }));
}

function arrayForQuestion() {
  return activeQuestions[question].slice();
}
function selectedFaults() {
  return FAULT_SETS[level][(question+offset)%5].map(key=>({key,...FAULTS[key],correct:CODE[FAULTS[key].line-1]}));
}
function visibleSteps() {
  const all = traceQuickSort(arrayForQuestion()).steps;
  return level === "easy" ? all.slice(0,1) : all;
}
function tidyList(s) {
  const items = s.trim().replace(/[\[\]]/g,"").split(/[\s,;]+/).filter(Boolean);
  if (!items.length || !items.every(v=>/^-?\d+$/.test(v))) return null;
  return items.map(Number);
}
function sameArray(a,b) {return !!a && a.length===b.length && a.every((v,i)=>v===b[i]);}
function sameLine(a,b) {return a.replace(/\s+/g,"").trim()===b.replace(/\s+/g,"").trim();}
function sameRange(a,b) {return a.replace(/[\s−–—]/g,"").replace(/:/g,"..")==b.replace(/\s+/g,"");}

function feedback(text,ok) {
  const el=$("feedback");el.hidden=false;el.textContent=text;el.className="feedback"+(ok?" good":"");
}
function clearFeedback(){ $("feedback").hidden=true; }
function shown(id){for(const name of ["trace-stage","recursion-stage","fix-stage","complete-stage"])$(name).hidden=name!==id;}
function scoreMax(){return 10;}
function earned(s){return s?s.trace+s.fix+(s.recursion||0):0;}
function header() {
  const complete=scores.filter(v=>v!==null).length;
  const points=scores.reduce((sum,v)=>sum+earned(v),0);
  $("progress-label").textContent=`Challenge ${question+1} of 5`;
  $("progress").value=complete;
  $("points").textContent=`${points} / ${scoreMax()}`;
  $("mastery").textContent=best[level]===undefined?"Best: not attempted":`Best: ${best[level]} / ${scoreMax()}`;
  document.querySelectorAll("[data-level]").forEach(btn=>btn.setAttribute("aria-pressed",String(btn.dataset.level===level)));
  $("scores").replaceChildren();
  scores.forEach((v,i)=>{
    const el=document.createElement("span");el.className="score-pill"+(i===question?" current":"")+(v?" done":"");
    el.textContent=`${i+1} · ${v===null?"—":earned(v)+"/2"}`;
    $("scores").append(el);
  });
}
function startQuestion() {
  currentSteps=level==="hard"?[]:visibleSteps();
  recursionExercise=level==="hard"?activeRecursions[question]:null;
  traceStep=0;recursionPhase="calls";
  traceFirstTry=true;recursionFirstTry=true;fixFirstTry=true;
  $("rule-text").textContent=level==="hard"
    ?"Trace the calls down to the base case. Then follow their return values back up."
    :"Last element = pivot · values ≤ pivot move left · partition in place. Indices start at 0.";
  header();
  if(level==="hard")renderRecursion();
  else renderTrace();
}
function renderArray(values,low,high,pivotAt,container){
  container.replaceChildren();
  container.classList.toggle("long-array",values.length>=10);
  container.style.setProperty("--cell-count",String(values.length));
  values.forEach((value,i)=>{
    const el=document.createElement("div");el.className="cell"+(i===pivotAt?" pivot":"")+(i<low||i>high?" inactive":"");
    const n=document.createElement("strong");n.textContent=value;
    const at=document.createElement("small");at.textContent=i===pivotAt?`PIVOT · ${i}`:`[${i}]`;
    el.append(n,at);container.append(el);
  });
}
function renderTrace(){
  shown("trace-stage");clearFeedback();
  const s=currentSteps[traceStep];
  $("stage").textContent="1 · TRACE";
  $("step-count").textContent=`Partition ${traceStep+1} of ${currentSteps.length}`;
  $("task-title").textContent=level==="easy"?"Trace the first partition":"Trace the full quicksort";
  $("task-intro").textContent="Work out the pivot's final position and the whole array after this partition.";
  $("array-label").textContent=`Before partition ${traceStep+1}`;
  renderArray(s.before,s.low,s.high,s.high,$("array"));
  $("range-note").textContent=`Active range: low=${s.low}, high=${s.high}. Values outside this range must stay unchanged.`;
  for(const id of ["pivot-answer","position-answer","array-answer","left-answer","right-answer"])$(id).value="";
  const showCalls=level!=="easy"&&traceStep===0;
  $("left-field").hidden=!showCalls;$("right-field").hidden=!showCalls;
  $("check-trace").textContent=traceStep===currentSteps.length-1?"Check trace → Fix code":"Check trace → Next partition";
}
function checkTrace(){
  const s=currentSteps[traceStep], pivot=Number($("pivot-answer").value),position=Number($("position-answer").value);
  const pivotEntered=$("pivot-answer").value.trim(),posEntered=$("position-answer").value.trim();
  const values=tidyList($("array-answer").value);
  const calls=level==="easy"||traceStep!==0||
    (sameRange($("left-answer").value,s.left)&&sameRange($("right-answer").value,s.right));
  const correct=pivotEntered!==""&&posEntered!==""&&pivot===s.pivot&&position===s.p&&sameArray(values,s.after)&&calls;
  if(!correct){
    traceFirstTry=false;
    if(pivotEntered===""||pivot!==s.pivot)feedback("Check the pivot. This method always selects the last value of the active range.",false);
    else if(!values||!sameArray(values,s.after))feedback("The array after partitioning is not quite right. Move values ≤ pivot left, then swap the pivot into place. Check values outside the active range too.",false);
    else if(posEntered===""||position!==s.p)feedback("Check the pivot's final index. Indices start at zero.",false);
    else feedback("Check the two recursive call ranges. The pivot itself must be excluded from both.",false);
    return;
  }
  traceStep++;
  if(traceStep<currentSteps.length){renderTrace();feedback("Correct. Follow the next recursive partition.",true);}
  else {renderFix();feedback("Trace complete. Now repair the C# implementation.",true);}
}

function renderRecursion(){
  shown("recursion-stage");clearFeedback();
  const exercise=recursionExercise;
  $("stage").textContent="1 · TRACE RECURSION";
  $("step-count").textContent=recursionPhase==="calls"?"Step 1 of 2 · Calls":"Step 2 of 2 · Returns";
  $("task-title").textContent="Trace the calls and final result";
  $("recursion-code").textContent=exercise.code;
  $("recursion-start").textContent=exercise.start;
  $("recursion-intro").textContent=recursionPhase==="calls"
    ?"Write every recursive call in order, starting from the instruction shown. The first call is provided."
    :"You have reached the base case. Work back up the calls to find the value returned to print.";
  $("recursion-calls-phase").hidden=recursionPhase!=="calls";
  $("recursion-returns-phase").hidden=recursionPhase!=="returns";
  if(recursionPhase==="calls"){
    $("recursion-call-fields").replaceChildren();
    exercise.calls.forEach((call,i)=>{
      const row=document.createElement("div"),number=document.createElement("span");
      row.className="recursion-row";number.className="number";number.textContent=String(i+1);
      if(i===0){const given=document.createElement("span");given.className="given";given.textContent=call;row.append(number,given);}
      else{
        const input=document.createElement("input");input.id=`recursion-call-${i}`;
        input.setAttribute("aria-label",`Recursive call ${i+1}`);input.placeholder="Write next function call";
        input.autocomplete="off";input.spellcheck=false;row.append(number,input);
      }
      $("recursion-call-fields").append(row);
    });
    $("check-recursion").textContent="Check calls → Return values";
  }else{
    $("recursion-return-fields").replaceChildren();
    exercise.calls.forEach((call,i)=>{
      const row=document.createElement("div"),label=document.createElement("label"),input=document.createElement("input");
      row.className="recursion-row return-row";label.className="call-label";label.htmlFor=`recursion-return-${i}`;label.textContent=call;
      input.id=`recursion-return-${i}`;input.inputMode="numeric";input.autocomplete="off";
      input.setAttribute("aria-label",`Return value of ${call}`);input.placeholder="value";
      row.append(label,input);$("recursion-return-fields").append(row);
    });
    $("check-recursion").textContent="Check returns → Debug C#";
  }
}

function sameCall(answer,expected){return answer.replace(/\s+/g,"").toLowerCase()===expected.toLowerCase();}
function checkRecursion(){
  const exercise=recursionExercise;
  if(recursionPhase==="calls"){
    const incorrect=exercise.calls.findIndex((call,i)=>i>0&&!sameCall($(`recursion-call-${i}`).value,call));
    if(incorrect!==-1){
      recursionFirstTry=false;
      feedback(`Check call ${incorrect+1}. Substitute the current values into the recursive call shown in the function.`,false);
      return;
    }
    recursionPhase="returns";renderRecursion();
    feedback("All calls correct. Now start at the base case and trace the return values back upwards.",true);
    return;
  }
  const incorrect=exercise.returns.findIndex((value,i)=>{
    const answer=$(`recursion-return-${i}`).value.trim();
    return answer===""||!/^[-]?\d+$/.test(answer)||Number(answer)!==value;
  });
  if(incorrect!==-1){
    recursionFirstTry=false;
    feedback(`Check the return value for ${exercise.calls[incorrect]}. Start with the final (base-case) call, then work backwards.`,false);
    return;
  }
  renderFix();feedback("Recursion trace complete. Now correct the C# quicksort errors.",true);
}
function renderFix(){
  shown("fix-stage");clearFeedback();
  if(level==="hard")$("rule-text").textContent="Base case: low ≥ high · last element is pivot · recursive calls exclude the pivot.";
  $("stage").textContent="2 · DEBUG CODE";$("step-count").textContent=`${selectedFaults().length} faulty line(s)`;
  $("task-title").textContent="Debug the C# quicksort";
  const faults=selectedFaults(), faultyByLine=new Map(faults.map(f=>[f.line,f]));
  $("mistake-count").textContent=`${faults.length} incorrect ${faults.length===1?"line":"lines"}`;
  $("faulty-code").replaceChildren();
  // Keep the code and answer fields in the same viewport where possible.
  // Show the method headers and each faulty line with its nearest context.
  const visible=new Set([1,7]);
  faults.forEach(f=>{for(let n=f.line-1;n<=f.line+1;n++)if(n>=1&&n<=CODE.length)visible.add(n);});
  let previous=0;
  CODE.forEach((line,i)=>{
    if(!visible.has(i+1))return;
    if(previous && i+1>previous+1){const ellipsis=document.createElement("div");ellipsis.className="code-line";ellipsis.textContent="   ⋯";$("faulty-code").append(ellipsis);}
    const row=document.createElement("div"),number=document.createElement("span"),txt=document.createElement("span"),fault=faultyByLine.get(i+1);
    row.className="code-line"+(fault?" bad":"");number.className="number";number.textContent=String(i+1).padStart(2,"0");
    txt.textContent=fault?fault.bad:line;row.append(number,txt);$("faulty-code").append(row);
    previous=i+1;
  });
  $("fix-fields").replaceChildren();
  faults.forEach(f=>{
    const div=document.createElement("div"),label=document.createElement("label"),input=document.createElement("input"),hint=document.createElement("small");
    div.className="fix-field";label.htmlFor=`fix-${f.key}`;label.textContent=`Replace line ${f.line}`;
    input.id=`fix-${f.key}`;input.autocomplete="off";input.spellcheck=false;input.placeholder="Type the complete corrected C# line";
    hint.textContent=`Faulty: ${f.bad.trim()}`;div.append(label,input,hint);$("fix-fields").append(div);
  });
}
function checkFix(){
  const faults=selectedFaults();
  const wrong=faults.find(f=>!sameLine($(`fix-${f.key}`).value,f.correct));
  if(wrong){fixFirstTry=false;feedback(`Line ${wrong.line} still needs correcting. ${wrong.hint}`,false);return;}
  scores[question]={trace:level==="hard"?0:Number(traceFirstTry),recursion:level==="hard"?Number(recursionFirstTry):0,fix:Number(fixFirstTry)};
  if(scores.every(s=>s!==null)){
    const total=scores.reduce((n,s)=>n+earned(s),0);
    if(best[level]===undefined||total>best[level]){best[level]=total;try{localStorage.setItem(STORAGE_KEY,JSON.stringify(best));}catch(_){}}
  }
  header();showComplete();
}
function showComplete(){
  shown("complete-stage");clearFeedback();
  $("stage").textContent="3 · TEST";$("step-count").textContent="Challenge complete";
  $("task-title").textContent="Your repairs match the reference code";
  const mark=earned(scores[question]);
  const last=question===4;
  $("result-heading").textContent=`${mark}/2 first-attempt marks`;
  $("result-text").textContent="The corrected lines match this lesson's reference implementation. This check does not compile C#. Copy the working program and run it in .NET Fiddle to verify the output or change the input."+
    (last?` Level total: ${scores.reduce((n,s)=>n+earned(s),0)}/${scoreMax()}; target ${Math.ceil(scoreMax()*.8)}/${scoreMax()}.`:"");
  $("next-challenge").textContent=last?"New practice set ↻":"Next challenge →";
}
function randomArray(){
  const size=level==="easy"?3+Math.floor(Math.random()*2):level==="medium"?8+Math.floor(Math.random()*5):10+Math.floor(Math.random()*6);
  const values=[];
  while(values.length<size){
    const n=1+Math.floor(Math.random()*(level==="easy"?9:level==="medium"?20:26));
    if(level!=="easy"&&values.length===Math.floor(size/2)){values.push(values[1]);continue;}
    if(level==="easy"&&values.includes(n))continue;
    values.push(n);
  }
  return values;
}
function newSet(){
  offset=(offset+1)%5;question=0;activeQuestions=Array.from({length:5},randomArray);
  if(level==="hard")activeRecursions=RECURSION_TYPES.map(kind=>makeRecursionExercise(kind,true));
  scores=[null,null,null,null,null];startQuestion();
}
function chooseLevel(next){
  if(!QUESTIONS[next])return;
  level=next;question=0;offset=0;activeQuestions=QUESTIONS[next].map(a=>a.slice());
  if(level==="hard")activeRecursions=RECURSION_TYPES.map(kind=>makeRecursionExercise(kind));
  scores=[null,null,null,null,null];startQuestion();
}

// This is a genuine compilable C# console program, not code executed by JS.
function csharpSource(values){
  return `using System;

public class Program
{
    public static void Main()
    {
        // Change these numbers and press Run in .NET Fiddle.
        int[] numbers = { ${values.join(", ")} };
        Console.WriteLine("Start: " + string.Join(", ", numbers));
        QuickSort(numbers, 0, numbers.Length - 1);
        Console.WriteLine("Sorted: " + string.Join(", ", numbers));
    }

    // Recursively sort the elements between low and high (inclusive).
    static void QuickSort(int[] a, int low, int high)
    {
        // BASE CASE: 0 or 1 element is already sorted.
        if (low >= high) return;

        // PARTITION: choose the LAST element as pivot, in place.
        int p = Partition(a, low, high);

        // The pivot at p is finished. Recursively sort either side.
        QuickSort(a, low, p - 1);
        QuickSort(a, p + 1, high);
    }

    static int Partition(int[] a, int low, int high)
    {
        int pivot = a[high];   // LAST element of current range
        int i = low - 1;       // End of the smaller-or-equal section

        for (int j = low; j < high; j++)
        {
            if (a[j] <= pivot)
            {
                i++;
                Swap(a, i, j); // Move smaller value to the left
            }
        }

        // Move pivot to its FINAL sorted index.
        Swap(a, i + 1, high);
        int p = i + 1;
        Console.WriteLine("Pivot " + pivot + " at index " + p
            + ": " + string.Join(", ", a));
        return p;
    }

    static void Swap(int[] a, int x, int y)
    {
        int temp = a[x];
        a[x] = a[y];
        a[y] = temp;
    }
}`;
}

async function copyWorkingCode(button){
  const source=csharpSource(arrayForQuestion());
  try{
    await navigator.clipboard.writeText(source);
    const old=button.textContent;button.textContent="Copied ✓";
    setTimeout(()=>{button.textContent=old;},1800);
  }catch(_){
    $("reference-code").textContent=source;
    $("reference-dialog").showModal();
    $("reference-code").focus();
    feedback("Copy was blocked by the browser. Select and copy the C# in the reference window.",false);
  }
}

const demo=traceQuickSort(DEMO_INPUT);
const demoStack=chooseStackCheckpoints(DEMO_INPUT);
const DEMO_RECURSIVE_CALLS=["calculate(4,10)","calculate(4,6)","calculate(4,2)","calculate(2,2)"];
const DEMO_RECURSION_DESCRIPTIONS=[
  "Begin with print(calculate(4,10)). The first call is now running. Look at the conditions before you follow the next call.",
  "4 is smaller than 10, so the function calls calculate(4,10-4) = calculate(4,6). That new call is PUSHED onto the stack.",
  "4 is smaller than 6, so the next call is calculate(4,6-4) = calculate(4,2). The earlier calls wait for a result.",
  "4 is greater than 2, so the next call is calculate(4-2,2) = calculate(2,2). Here a == b, so the BASE CASE returns 2.",
  "Now unwind the recursion: calculate(2,2) returns 2; each waiting call returns that same 2; print outputs 2. Each return POPS a call off the stack."
];
function renderDemo(){
  const hard=level==="hard", examSteps=DEMO_RECURSION_DESCRIPTIONS.length;
  const examTrace=hard&&demoIndex<examSteps;
  const onStack=hard?demoIndex>=examSteps:demoIndex>=demo.steps.length;
  $("demo-array").hidden=hard||onStack;
  $("demo-stack").hidden=!(hard||onStack);
  $("demo-code").hidden=!examTrace;
  if(examTrace){
    $("demo-code").textContent=RECURSION_CODE.calculate;
    $("demo-count").textContent=`OCR-STYLE RECURSION TRACE · STEP ${demoIndex+1} OF ${examSteps}`;
    $("demo-description").textContent=DEMO_RECURSION_DESCRIPTIONS[demoIndex];
    $("demo-stack").replaceChildren();
    [...DEMO_RECURSIVE_CALLS.slice(0,Math.min(demoIndex+1,4))].reverse().forEach((call,i)=>{
      const el=document.createElement("div");el.className="stack-frame"+(i===0?" stack-top stack-updated":"");
      el.textContent=demoIndex===4?`${call} · returns 2`:`${i===0?"TOP · ":"WAITING · "}${call}`;
      $("demo-stack").append(el);
    });
  }else if(onStack){
    const stackIndex=hard?demoIndex-examSteps:demoIndex-demo.steps.length;
    const s=demoStack[stackIndex];
    $("demo-count").textContent=`QUICKSORT STACK · PUSH/POP EXAMPLE ${stackIndex+1} OF ${demoStack.length}`;
    const top=s.nextTop?`QuickSort(a, ${s.nextTop.low}, ${s.nextTop.high})`:"empty";
    $("demo-description").textContent=`Quicksort modifies its array rather than returning a number. ${s.context} NEXT: ${s.nextAction.toUpperCase()}. New top of stack: ${top}.`;
    $("demo-stack").replaceChildren();
    [...s.stack].reverse().forEach((f,i)=>{
      const el=document.createElement("div");el.className="stack-frame"+(i===0?" stack-top":"");
      el.textContent=`${i===0?"TOP · ":"WAITING · "}QuickSort(a, ${f.low}, ${f.high})`;
      $("demo-stack").append(el);
    });
  }else{
    const s=demo.steps[demoIndex],first=demoIndex===0;
    $("demo-count").textContent=`PARTITION ${demoIndex+1} OF ${demo.steps.length}`;
    $("demo-description").textContent=`${first?"Start with":"Continue on"} low=${s.low}, high=${s.high}. Pivot = ${s.pivot} (last element). After partition: [${s.after.join(", ")}]. Pivot ${s.pivot} is fixed at index ${s.p}. Next ranges: ${s.left} and ${s.right}.`;
    $("demo-array").replaceChildren();
    s.after.forEach((n,i)=>{
      const el=document.createElement("span");el.className="demo-cell"+(i===s.p?" pivot":"");el.textContent=String(n);$("demo-array").append(el);
    });
  }
  $("demo-prev").disabled=demoIndex===0;
  const count=hard?examSteps+demoStack.length:demo.steps.length+demoStack.length;
  $("demo-next").textContent=demoIndex===count-1?"Start again ↻":"Next step →";
}

document.querySelectorAll("[data-level]").forEach(b=>b.addEventListener("click",()=>chooseLevel(b.dataset.level)));
$("check-trace").addEventListener("click",checkTrace);
$("check-recursion").addEventListener("click",checkRecursion);
$("check-fix").addEventListener("click",checkFix);
$("show-hint").addEventListener("click",()=>feedback("Follow the exact loop: examine j from low to high-1; swap each value ≤ pivot into the left section; finally swap the pivot into index i+1.",false));
$("show-recursion-hint").addEventListener("click",()=>feedback(recursionPhase==="calls"
  ?"Substitute the current arguments into the recursive call. Repeat until the base-case condition becomes true."
  :"Work from the last row upwards. The base case gives the first return value; use it to evaluate each waiting call.",false));
$("show-fix-hint").addEventListener("click",()=>feedback(selectedFaults().map(f=>`Line ${f.line}: ${f.hint}`).join("  "),false));
$("next-challenge").addEventListener("click",()=>{if(question===4)newSet();else{question++;startQuestion();}});
$("new-set").addEventListener("click",newSet);
$("open-demo").addEventListener("click",()=>{
  demoIndex=0;
  $("demo-copy").textContent=level==="hard"
    ?"First, an OCR-style worked trace of calculate(4,10), adapted from the June 2017 paper. Then see how the QuickSort call stack PUSHES and POPS."
    :"A different example from the scored tasks. Follow each partition, then optionally explore the recursion stack.";
  renderDemo();$("demo-dialog").showModal();
});
$("demo-next").addEventListener("click",()=>{
  const count=level==="hard"?DEMO_RECURSION_DESCRIPTIONS.length+demoStack.length:demo.steps.length+demoStack.length;
  demoIndex=demoIndex===count-1?0:demoIndex+1;
  renderDemo();
});
$("demo-prev").addEventListener("click",()=>{demoIndex=Math.max(0,demoIndex-1);renderDemo();});
$("open-reference").addEventListener("click",()=>{$("reference-code").textContent=csharpSource(arrayForQuestion());$("reference-dialog").showModal();});
$("copy-reference").addEventListener("click",()=>copyWorkingCode($("copy-reference")));
$("copy-code").addEventListener("click",()=>copyWorkingCode($("copy-code")));
document.querySelectorAll("[data-close]").forEach(b=>b.addEventListener("click",()=>$(b.dataset.close).close()));
startQuestion();

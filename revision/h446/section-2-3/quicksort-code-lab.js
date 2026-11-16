"use strict";

// Lesson 217's Lomuto-style, last-element-pivot implementation is the ONE
// convention used for all worked examples, traces, fixes and reference code.
const $ = id => document.getElementById(id);
const STORAGE_KEY = "rhsc.h446.quicksortCodeLab.best.v1";
const QUESTIONS = {
  easy: [
    [5, 1, 3], [8, 2, 6, 4], [7, 3, 1, 5], [6, 2, 4, 1], [9, 4, 7, 2]
  ],
  medium: [
    [8, 3, 7, 2, 5], [5, 1, 7, 3, 6], [9, 4, 6, 2, 8, 1],
    [10, 3, 8, 4, 7, 6], [7, 2, 9, 3, 6, 4, 5]
  ],
  hard: [
    [9, 4, 7, 2, 4, 8, 1, 6], [12, 3, 9, 3, 10, 5, 7, 5, 11],
    [6, 6, 2, 9, 1, 6, 8, 4], [10, 1, 10, 5, 3, 3, 8, 7, 2, 9],
    [14, 2, 11, 5, 11, 1, 9, 3, 6, 12, 7, 4]
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
  swap: {line:16, bad:"    Swap(a, i, high);", hint:"The pivot belongs immediately after the final smaller-or-equal value."},
  return: {line:17, bad:"    return i;", hint:"Return the position where the pivot was placed, not the last smaller-value index."}
};
const FAULT_SETS = {
  easy: [["base"],["pivot"],["left"],["swap"],["return"]],
  medium: [["left","right"],["pivot","loop"],["index","swap"],["base","condition"],["right","return"]],
  hard: [["pivot","loop","return"],["base","left","right"],["index","condition","swap"],["pivot","right","swap"],["loop","left","return"]]
};
const DEMO_INPUT = [5, 1, 7, 3];
let level = "easy", question = 0, traceStep = 0, offset = 0;
let scores = [null,null,null,null,null];
let traceFirstTry = true, fixFirstTry = true;
let currentSteps = [], demoIndex = 0;
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

function arrayForQuestion() {
  return QUESTIONS[level][(question+offset)%5].slice();
}
function selectedFaults() {
  return FAULT_SETS[level][(question+offset)%5].map(key=>({key,...FAULTS[key],correct:CODE[FAULTS[key].line-1]}));
}
function visibleSteps() {
  const all = traceQuickSort(arrayForQuestion()).steps;
  return level === "easy" ? all.slice(0,1) : level === "medium" ? all.slice(0,2) : all;
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
function shown(id){for(const name of ["trace-stage","fix-stage","complete-stage"])$(name).hidden=name!==id;}
function header() {
  const complete=scores.filter(v=>v!==null).length;
  const points=scores.reduce((sum,v)=>sum+(v===null?0:v.trace+v.fix),0);
  $("progress-label").textContent=`Challenge ${question+1} of 5`;
  $("progress").value=complete;
  $("points").textContent=`${points} / 10`;
  $("mastery").textContent=best[level]===undefined?"Best: not attempted":`Best: ${best[level]} / 10`;
  document.querySelectorAll("[data-level]").forEach(btn=>btn.setAttribute("aria-pressed",String(btn.dataset.level===level)));
  $("scores").replaceChildren();
  scores.forEach((v,i)=>{
    const el=document.createElement("span");el.className="score-pill"+(i===question?" current":"")+(v?" done":"");
    el.textContent=`${i+1} · ${v===null?"—":(v.trace+v.fix)+"/2"}`;
    $("scores").append(el);
  });
}
function startQuestion() {
  currentSteps=visibleSteps(); traceStep=0;traceFirstTry=true;fixFirstTry=true;
  header(); renderTrace();
}
function renderArray(values,low,high,pivotAt,container){
  container.replaceChildren();
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
  $("task-title").textContent=level==="hard"?"Trace the full recursive quicksort":level==="medium"?"Trace the first two partitions":"Trace the first partition";
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
function renderFix(){
  shown("fix-stage");clearFeedback();
  $("stage").textContent="2 · FIX CODE";$("step-count").textContent=`${selectedFaults().length} faulty line(s)`;
  $("task-title").textContent="Debug the C# quicksort";
  const faults=selectedFaults(), faultyByLine=new Map(faults.map(f=>[f.line,f]));
  $("mistake-count").textContent=`${faults.length} incorrect ${faults.length===1?"line":"lines"}`;
  $("faulty-code").replaceChildren();
  CODE.forEach((line,i)=>{
    const row=document.createElement("div"),number=document.createElement("span"),txt=document.createElement("span"),fault=faultyByLine.get(i+1);
    row.className="code-line"+(fault?" bad":"");number.className="number";number.textContent=String(i+1).padStart(2,"0");
    txt.textContent=fault?fault.bad:line;row.append(number,txt);$("faulty-code").append(row);
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
  scores[question]={trace:Number(traceFirstTry),fix:Number(fixFirstTry)};
  if(scores.every(s=>s!==null)){
    const total=scores.reduce((n,s)=>n+s.trace+s.fix,0);
    if(best[level]===undefined||total>best[level]){best[level]=total;try{localStorage.setItem(STORAGE_KEY,JSON.stringify(best));}catch(_){}}
  }
  header();showComplete();
}
function showComplete(){
  shown("complete-stage");clearFeedback();
  $("stage").textContent="3 · TEST";$("step-count").textContent="Challenge complete";
  $("task-title").textContent="Your repairs match the reference code";
  const mark=scores[question].trace+scores[question].fix;
  const last=question===4;
  $("result-heading").textContent=`${mark}/2 first-attempt marks`;
  $("result-text").textContent="The corrected lines match this lesson's reference implementation. This check does not compile C#. Copy the working program and run it in .NET Fiddle to verify the output or change the input."+
    (last?` Level total: ${scores.reduce((n,s)=>n+s.trace+s.fix,0)}/10; target 8/10.`:"");
  $("next-challenge").textContent=last?"New practice set ↻":"Next challenge →";
}
function newSet(){offset=(offset+1)%5;question=0;scores=[null,null,null,null,null];startQuestion();}
function chooseLevel(next){if(!QUESTIONS[next])return;level=next;question=0;offset=0;scores=[null,null,null,null,null];startQuestion();}

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
function renderDemo(){
  const s=demo.steps[demoIndex],first=demoIndex===0;
  $("demo-count").textContent=`PARTITION ${demoIndex+1} OF ${demo.steps.length}`;
  $("demo-description").textContent=`${first?"Start with":"Continue on"} low=${s.low}, high=${s.high}. Pivot = ${s.pivot} (last element). After partition: [${s.after.join(", ")}]. Pivot ${s.pivot} is fixed at index ${s.p}. Next ranges: ${s.left} and ${s.right}.`;
  $("demo-array").replaceChildren();
  s.after.forEach((n,i)=>{
    const el=document.createElement("span");el.className="demo-cell"+(i===s.p?" pivot":"");el.textContent=String(n);$("demo-array").append(el);
  });
  $("demo-prev").disabled=demoIndex===0;
  $("demo-next").textContent=demoIndex===demo.steps.length-1?"Start again ↻":"Next step →";
}

document.querySelectorAll("[data-level]").forEach(b=>b.addEventListener("click",()=>chooseLevel(b.dataset.level)));
$("check-trace").addEventListener("click",checkTrace);
$("check-fix").addEventListener("click",checkFix);
$("show-hint").addEventListener("click",()=>feedback("Follow the exact loop: examine j from low to high-1; swap each value ≤ pivot into the left section; finally swap the pivot into index i+1.",false));
$("show-fix-hint").addEventListener("click",()=>feedback(selectedFaults().map(f=>`Line ${f.line}: ${f.hint}`).join("  "),false));
$("next-challenge").addEventListener("click",()=>{if(question===4)newSet();else{question++;startQuestion();}});
$("new-set").addEventListener("click",newSet);
$("open-demo").addEventListener("click",()=>{demoIndex=0;renderDemo();$("demo-dialog").showModal();});
$("demo-next").addEventListener("click",()=>{demoIndex=(demoIndex+1)%demo.steps.length;renderDemo();});
$("demo-prev").addEventListener("click",()=>{demoIndex=Math.max(0,demoIndex-1);renderDemo();});
$("open-reference").addEventListener("click",()=>{$("reference-code").textContent=csharpSource(arrayForQuestion());$("reference-dialog").showModal();});
$("copy-reference").addEventListener("click",()=>copyWorkingCode($("copy-reference")));
$("copy-code").addEventListener("click",()=>copyWorkingCode($("copy-code")));
document.querySelectorAll("[data-close]").forEach(b=>b.addEventListener("click",()=>$(b.dataset.close).close()));
startQuestion();

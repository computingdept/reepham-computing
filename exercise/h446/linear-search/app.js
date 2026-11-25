'use strict';
function make(focus,level,n){
 const binary=typeof J277BinarySearch!=="undefined",engine=binary?J277BinarySearch:J277LinearSearch,l=["easy","medium","hard"].indexOf(level),idx=n%engine.cases.length,q=engine.makeQuestion(level,idx),labels=[],answers=[],options=[],steps=[];
 const add=(k,v,o)=>{labels.push(k);answers.push(String(v));options.push(o);},ex=(a,b,c)=>steps.push([a,b,c]);
 let prompt,code=`Array: [${q.values.join(", ")}]\nTarget: ${q.target}\nIndices start at 0.`;
 const visits=binary?q.rows.map(x=>x.mid):q.visits;
 if(focus==="trace"){
 prompt="Trace the search and return the matching index or -1.";
 if(binary&&l>=1){q.rows.forEach((r,i)=>{add(`Comparison ${i+1}: low, high, mid`,[r.low,r.high,r.mid].join(", "));});}
 else add("Indices visited (comma-separated)",visits.join(", "));
 add("Return value",q.found);if(l===2)add("Number of comparisons with array elements",visits.length);
 }else if(focus==="code"){
 const lines=binary?["static int Search(int[] a, int target) {","    int low = 0, high = a.Length - 1;","    while (low <= high) {","        int mid = (low + high) / 2;","        if (a[mid] == target) return mid;","        if (a[mid] < target) low = mid + 1;","        else high = mid - 1;","    }","    return -1;","}"]:["static int Search(int[] a, int target) {","    for (int i = 0; i < a.Length; i++) {","        if (a[i] == target) return i;","    }","    return -1;","}"];
 const gaps=binary?[[3,["    while (low <= high) {","    while (low < high) {","    while (low >= high) {"]],[6,["        if (a[mid] < target) low = mid + 1;","        if (a[mid] < target) low = mid;","        if (a[mid] < target) high = mid - 1;"]],[7,["        else high = mid - 1;","        else high = mid;","        else low = mid + 1;"]]]:[[2,["    for (int i = 0; i < a.Length; i++) {","    for (int i = 1; i < a.Length; i++) {","    for (int i = 0; i <= a.Length; i++) {"]],[3,["        if (a[i] == target) return i;","        if (a[i] != target) return i;","        if (a[i] == target) return a[i];"]],[5,["    return -1;","    return 0;","    return target;"]]];
 const chosen=gaps.slice(0,l+1);prompt="Complete the C# search method, then trace it.";
 code+="\n\n"+lines.map((s,i)=>String(i+1).padStart(2,"0")+"  "+(chosen.some(([line])=>line===i+1)?"________":s)).join("\n");
 chosen.forEach(([line,opts])=>{let a=opts.map(x=>x.trim());a.push(...a.splice(0,n%3));add(`Line ${line}`,lines[line-1].trim(),a);ex(`Repair line ${line}`,lines[line-1].trim(),binary?"Maintain inclusive bounds and discard the checked midpoint on each non-match.":"Start at index zero, stop at the first match and return -1 only when absent.");});
 add("Returned index",q.found);
 }else{
 prompt="Compare search costs (one comparison per inspected element).";
 const size=2**(3+l+n%4);
 code=`Array length n = ${size}\n${binary?"Sorted ascending; use inclusive low/high and floor midpoint.":"Unsorted; stop at first match."}\nCount comparisons with array elements, not loop-condition checks.`;
 const worst=binary?Math.floor(Math.log2(size))+1:size;
 add("Best-case comparisons",1);add("Worst-case comparisons",worst);if(l>=1)add("Worst-case time complexity",binary?"O(log n)":"O(n)",["O(1)","O(n)","O(log n)","O(n²)"]);if(l===2)add("Worst-case comparisons when n doubles",binary?worst+1:size*2);
 ex("Best case","1","The first inspected item is the target.");ex("Worst case",String(worst),binary?"Halve the remaining range until it is empty; at most floor(log2(n)) + 1 comparisons.":"The target is absent or at the last position.");ex("Growth",binary?"O(log n)":"O(n)",binary?"Doubling the length adds at most one comparison to the worst case.":"Doubling the length doubles the worst-case comparison count.");
 return {prompt,code,labels,answers,options,steps,hint:"Count how many array elements the algorithm can inspect, not the number of loop tests.",model:steps.map(x=>x.join("\n")).join("\n\n")};
 }
 if(binary)q.rows.forEach((r,i)=>ex("Comparison "+(i+1),`low=${r.low}, high=${r.high}, mid=${r.mid}, value=${r.value}`,r.decision==="Found"?"Match: return mid.":r.decision==="Right"?"Middle too small: low = mid + 1.":"Middle too large: high = mid − 1."));
 else q.visits.forEach(i=>ex("Compare index "+i,`${q.values[i]} vs ${q.target}`,q.values[i]===q.target?"Match: return this index.":"Not equal: continue to next index."));
 ex("Result",`${q.found} after ${visits.length} comparisons`,q.found===-1?"No matching item.":"Stop when found.");
 return {prompt,code,labels,answers,options,steps,hint:binary?"Use sorted data; mid = floor((low + high) / 2). Exclude mid when updating the range.":"Start at index 0 and advance one position; stop at first match.",model:steps.map(x=>x.join("\n")).join("\n\n")};
}
function mount(){
 const $=id=>document.getElementById(id),el=(tag,cls,t)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(t!==undefined)e.textContent=t;return e;};
 const topics={"trace":"Trace search","code":"Complete C# code","cost":"Search complexity"};
 const params=new URLSearchParams(location.search);let focus=Object.hasOwn(topics,params.get("focus"))?params.get("focus"):"trace",level=["easy","medium","hard"].includes(params.get("level"))?params.get("level"):"easy",n=0,question,step=0,example;
 const select=$("focus");Object.entries(topics).forEach(([v,t])=>{let o=el("option","",t);o.value=v;select.append(o);});select.value=focus;
 const levels=[...document.querySelectorAll("[data-level]")],normal=v=>String(v).trim().replace(/\s+/g," ").replace(/\s*([,=;])\s*/g,"$1");
 function table(rows,headers){const t=el("table","trace-table"),head=el("tr");headers.forEach(s=>head.append(el("th","",s)));t.append(head);rows.forEach(r=>{const tr=el("tr");r.forEach(s=>tr.append(el("td","",s)));t.append(tr);});return t;}
 function render(){question=make(focus,level,n);$("question-number").textContent="Question "+(n+1);$("prompt").textContent=question.prompt;$("instruction").textContent="Trace the algorithm before checking."; $("visual").replaceChildren(el("div","data-label","GIVEN EXAMPLE"),el("pre","review-code",question.code));if(question.rows)$("visual").append(table(question.rows,question.headers));$("entry").replaceChildren();question.labels.forEach((t,i)=>{let w=el("label","review-field"),opts=question.options?.[i],input=el(opts?"select":"input");if(opts){let blank=el("option","","Choose…");blank.value="";input.append(blank);opts.forEach(s=>input.append(el("option","",s)));}else{input.type="text";input.autocomplete="off";input.spellcheck=false;}w.append(el("span","",t),input);$("entry").append(w);});$("feedback").textContent="";$("explainer").hidden=true;$("hint").textContent="Show hint";levels.forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.level===level)));}
 function openDemo(){example=make(focus,level,n+1,true);step=0;$("activity").hidden=true;$("demo").hidden=false;$("demo-title").textContent=topics[focus]+" · Demo";$("demo-prompt").textContent="Worked example · "+example.prompt;$("demo-code").textContent=example.code;$("demo-table").replaceChildren();if(example.rows)$("demo-table").append(table(example.rows,example.headers));draw();}
 function draw(){if(example.rows)$("demo-table").replaceChildren(table(step>=example.steps.length&&example.resultRows?example.resultRows:example.rows,example.headers));$("demo-steps").replaceChildren();example.steps.forEach((s,i)=>{let item=el("li",i<step?"shown":"pending");item.append(el("span","num",String(i+1).padStart(2,"0")),el("strong","",i<step?s[0]:"Step "+(i+1)));if(i<step)item.append(el("code","",s[1]),el("p","",s[2]));$("demo-steps").append(item);});$("demo-step").disabled=step>=example.steps.length;$("demo-step").textContent=$("demo-step").disabled?"✓ Example complete":"⏭ Next step";}
 function back(){$("demo").hidden=true;$("activity").hidden=false;}
 function reset(){back();n=0;render();}
 select.onchange=()=>{focus=select.value;reset();};levels.forEach(b=>b.onclick=()=>{level=b.dataset.level;reset();});
 $("check").onclick=()=>{let inputs=[...$("entry").querySelectorAll("input,select")],correct=inputs.map((e,i)=>(question.labels[i].includes("letters only")?e.value.replace(/[\s,]/g,"").toUpperCase()===question.answers[i]:normal(e.value)===normal(question.answers[i])));inputs.forEach((e,i)=>{e.style.borderColor=correct[i]?"#23754c":"#ad5949";});$("feedback").className="feedback "+(correct.every(Boolean)?"good":"bad");$("feedback").textContent=correct.every(Boolean)?"Correct — well done.":`${correct.filter(Boolean).length} of ${correct.length} correct. Check the highlighted answers.`;};
 $("hint").onclick=()=>{$("explainer").hidden=false;$("explainer").textContent=question.hint;};
 $("model").onclick=()=>{$("explainer").hidden=false;$("explainer").textContent=question.model;};
 $("next").onclick=()=>{n++;render();};$("demo-launch").onclick=openDemo;$("demo-back").onclick=back;$("demo-step").onclick=()=>{step++;draw();};$("demo-reset").onclick=()=>{step=0;draw();};render();
}
if(typeof module==='object'&&module.exports){module.exports={make};}else{mount();}

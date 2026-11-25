'use strict';
function make(focus,level,n){
 const l=["easy","medium","hard"].indexOf(level),size=2**(3+n%5),labels=[],answers=[],options=[],steps=[],choices=["O(1)","O(log n)","O(n)","O(n log n)","O(n²)","O(2^n)"],add=(k,v,o)=>{labels.push(k);answers.push(String(v));options.push(o);},ex=(a,b,c)=>steps.push([a,b,c]);let prompt,code;
 const cases=[
 ["int x = a[0];","O(1)","O(1)","One indexed access; fixed scalar storage."],
 ["for (int i=0; i<n; i++) total += a[i];","O(n)","O(1)","One constant-work iteration per input; only scalar variables."],
 ["for (int i=1; i<n; i*=2) count++;","O(log n)","O(1)","The counter doubles each iteration."],
 ["int[] b = new int[n];\nfor (int i=0; i<n; i++) b[i]=a[i];","O(n)","O(n)","Copy n items and allocate an n-element auxiliary array."],
 ["for (int i=0; i<n; i++)\n  for (int j=0; j<n; j++) count++;","O(n²)","O(1)","n × n iterations, with constant auxiliary storage."],
 ["for (int i=0; i<n; i++)\n  for (int j=1; j<n; j*=2) count++;","O(n log n)","O(1)","n outer iterations and logarithmically many inner iterations."],
 ["void F(int k) {\n  if (k<=0) return;\n  F(k-1); F(k-1);\n}\nF(n);","O(2^n)","O(n)","Binary recursion tree has exponentially many calls, but only linear maximum call depth."]
 ];
 if(focus==="code"){
 const pool=l===0?cases.slice(0,3):l===1?cases.slice(1,6):cases, c=pool[n%pool.length];prompt="Analyse time and auxiliary-space complexity.";code=`n is input length (or initial recursion depth). Assume constant-time scalar operations, sufficiently large integer types, and no compiler optimisation of the shown operations. Ignore input storage.\n\n${c[0]}`;
 add("Tight worst-case time complexity",c[1],choices);add("Tight auxiliary-space complexity",c[2],choices);ex("Count work",c[1],c[3]);ex("Count additional storage",c[2],"Include additional arrays and maximum live recursion depth, but not the original input.");
 }else if(focus==="growth"){
 const growth=[["Constant",x=>1,"O(1)"],["Logarithmic",x=>Math.log2(x),"O(log n)"],["Linear",x=>x,"O(n)"],["Linearithmic",x=>x*Math.log2(x),"O(n log n)"],["Quadratic",x=>x*x,"O(n²)"]],g=growth[n%(l===0?3:5)];
 prompt="Calculate operation counts from an explicit growth model.";code=`Model: ${["1","log₂(n)","n","n × log₂(n)","n²"][growth.indexOf(g)]} operations.\nInput size n = ${size}. This is an idealised operation count, not a runtime measurement.`;
 add("Operations at n",g[1](size));add("Operations at 2n",g[1](2*size));ex("Original size",String(g[1](size)),"Substitute the given input size into the model.");ex("Double input",String(g[1](2*size)),"Substitute twice the input size.");
 if(l>=1)add("Growth class",g[2],choices);if(l===2){add("Operations at 4n",g[1](4*size));ex("Quadruple input",String(g[1](4*size)),"Evaluate the model again; not all growth classes scale linearly.");}
 }else if(focus==="space"){
 const c=[["Iterative linear search using a scalar index","O(n)","O(1)"],["Iterative binary search on sorted indexed data","O(log n)","O(1)"],["Recursive binary search passing index bounds, no copied arrays","O(log n)","O(log n)"],["Copy n elements into a new array","O(n)","O(n)"],["Conventional recursive merge sort using a reusable n-element buffer","O(n log n)","O(n)"]][n%5];prompt="Compare running time and auxiliary memory.";code=c[0]+".\nUse worst-case tight growth, including live call-stack frames but excluding original input storage. Assume ordinary constant-size stack frames.";
 add("Time complexity",c[1],choices);add("Auxiliary-space complexity",c[2],choices);ex("Time",c[1],"Count the dominant amount of work.");ex("Space",c[2],"Count maximum additional memory at any instant.");
 if(l>=1){add("Does time complexity always equal space complexity?","No",["Yes","No"]);ex("Separate measures","Time ≠ space in general","An algorithm may perform many operations using very few additional variables.");}
 if(l===2)add("Iterative binary search auxiliary space","O(1)",choices);
 }else if(focus==="choice"){
 const scenarios=[["Repeated lookup in sorted random-access array","Binary search","O(log n)","Sorted order enables halving."],["One lookup in unsorted array; cannot sort or build an index","Linear search","O(n)","Search without a sorting prerequisite."],["Stable comparison sort with guaranteed O(n log n) worst-case time; extra memory allowed","Merge sort","O(n log n)","Standard merge sort is stable when equal keys are taken left-first."],["Sort a small nearly sorted array in place using an adaptive simple sort","Insertion sort","O(n²)","Few shifts on nearly sorted data; worst case remains quadratic."]];
 const c=scenarios[n%scenarios.length];prompt="Select an algorithm suited to the stated constraints.";code=c[0]+".";
 add("Algorithm",c[1],scenarios.map(x=>x[1]));ex("Select",c[1],c[3]);if(l>=1){add("Worst-case time",c[2],choices);ex("Worst case",c[2],"State the complexity independently of the particular example.");}
 if(l===2){add("Does Big O specify exact execution time in seconds?","No",["Yes","No"]);ex("Interpretation","Asymptotic growth","Hardware, constants and data characteristics affect measured time.");}
 }else throw Error("Focus");
 return {prompt,code,labels,answers,options,steps,hint:"Count dominant operations for time. Count maximum extra live storage for auxiliary space. Ignore constants and lower-order terms when giving the tight growth class.",model:steps.map(s=>s.join("\n")).join("\n\n")};
}
function mount(){
 const $=id=>document.getElementById(id),el=(tag,cls,t)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(t!==undefined)e.textContent=t;return e;};
 const topics={"code":"Analyse code","growth":"Calculate growth","space":"Time & auxiliary space","choice":"Select algorithms"};
 const params=new URLSearchParams(location.search);let focus=Object.hasOwn(topics,params.get("focus"))?params.get("focus"):"code",level=["easy","medium","hard"].includes(params.get("level"))?params.get("level"):"easy",n=0,question,step=0,example;
 const select=$("focus");Object.entries(topics).forEach(([v,t])=>{let o=el("option","",t);o.value=v;select.append(o);});select.value=focus;
 const levels=[...document.querySelectorAll("[data-level]")],normal=v=>String(v).trim().replace(/\s+/g," ").replace(/\s*([,=;])\s*/g,"$1");
 function table(rows,headers){const t=el("table","trace-table"),head=el("tr");headers.forEach(s=>head.append(el("th","",s)));t.append(head);rows.forEach(r=>{const tr=el("tr");r.forEach(s=>tr.append(el("td","",s)));t.append(tr);});return t;}
 function render(){question=make(focus,level,n);$("question-number").textContent="Question "+(n+1);$("prompt").textContent=question.prompt;$("instruction").textContent="Work through the example before checking."; $("visual").replaceChildren(el("div","data-label","GIVEN EXAMPLE"),el("pre","review-code",question.code));if(question.rows)$("visual").append(table(question.rows,question.headers));$("entry").replaceChildren();question.labels.forEach((t,i)=>{let w=el("label","review-field"),opts=question.options?.[i],input=el(opts?"select":"input");if(opts){let blank=el("option","","Choose…");blank.value="";input.append(blank);opts.forEach(s=>input.append(el("option","",s)));}else{input.type="text";input.autocomplete="off";input.spellcheck=false;}w.append(el("span","",t),input);$("entry").append(w);});$("feedback").textContent="";$("explainer").hidden=true;$("hint").textContent="Show hint";levels.forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.level===level)));}
 function openDemo(){example=make(focus,level,n+1,true);step=0;$("activity").hidden=true;$("demo").hidden=false;$("demo-title").textContent=topics[focus]+" · Demo";$("demo-prompt").textContent="Worked example · "+example.prompt;$("demo-code").textContent=example.code;$("demo-table").replaceChildren();if(example.rows)$("demo-table").append(table(example.rows,example.headers));draw();}
 function draw(){if(example.rows)$("demo-table").replaceChildren(table(step>=example.steps.length&&example.resultRows?example.resultRows:example.rows,example.headers));$("demo-steps").replaceChildren();example.steps.forEach((s,i)=>{let item=el("li",i<step?"shown":"pending");item.append(el("span","num",String(i+1).padStart(2,"0")),el("strong","",i<step?s[0]:"Step "+(i+1)));if(i<step)item.append(el("code","",s[1]),el("p","",s[2]));$("demo-steps").append(item);});$("demo-step").disabled=step>=example.steps.length;$("demo-step").textContent=$("demo-step").disabled?"✓ Example complete":"⏭ Next step";}
 function back(){$("demo").hidden=true;$("activity").hidden=false;}
 function reset(){back();n=0;render();}
 select.onchange=()=>{focus=select.value;reset();};levels.forEach(b=>b.onclick=()=>{level=b.dataset.level;reset();});
 $("check").onclick=()=>{let inputs=[...$("entry").querySelectorAll("input,select")],correct=inputs.map((e,i)=>(question.labels[i].includes("bits)")?e.value.replace(/\s/g,"")===question.answers[i]:normal(e.value).toLowerCase()===normal(question.answers[i]).toLowerCase()));inputs.forEach((e,i)=>{e.style.borderColor=correct[i]?"#23754c":"#ad5949";});$("feedback").className="feedback "+(correct.every(Boolean)?"good":"bad");$("feedback").textContent=correct.every(Boolean)?"Correct — well done.":`${correct.filter(Boolean).length} of ${correct.length} correct. Check the highlighted answers.`;};
 $("hint").onclick=()=>{$("explainer").hidden=false;$("explainer").textContent=question.hint;};
 $("model").onclick=()=>{$("explainer").hidden=false;$("explainer").textContent=question.model;};
 $("next").onclick=()=>{n++;render();};$("demo-launch").onclick=openDemo;$("demo-back").onclick=back;$("demo-step").onclick=()=>{step++;draw();};$("demo-reset").onclick=()=>{step=0;draw();};render();
}
if(typeof module==='object'&&module.exports){module.exports={make};}else{mount();}

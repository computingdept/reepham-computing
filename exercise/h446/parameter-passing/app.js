'use strict';
function make(focus,level,n){
 const l=["easy","medium","hard"].indexOf(level),a=2+n%7,b=5+n%5,k=2+n%4,labels=[],answers=[],steps=[],options=[],add=(t,v,o)=>{labels.push(t);answers.push(String(v));options.push(o);},ex=(a,b,c)=>steps.push([a,b,c]);
 let code,prompt="Trace the C# code and predict the output.";
 if(focus==="value"||focus==="reference"){
 const ref=focus==="reference",r=ref?"ref ":"",fn=l===2?"Mix":"Change";
 const lines=l===2?[`static void Mix(${r}int x, int y) {`,`    x += y;`,`    y *= 2;`,`    Console.WriteLine(x);`,`    Console.WriteLine(y);`,`}`,`int a = ${a}, b = ${b};`,`Mix(${r}a, b);`,`Console.WriteLine(a);`,`Console.WriteLine(b);`]:[`static void Change(${r}int x) {`,`    x += ${k};`,...(l===1?["    x *= 2;"]:[]),`    Console.WriteLine(x);`,`}`,`int a = ${a};`,`Change(${r}a);`,`Console.WriteLine(a);`];
 code=lines.join("\n");const inside=l===2?a+b:l===1?(a+k)*2:a+k;
 add("First output (inside method)",inside);if(l===2)add("Second output (inside method)",b*2);add("Output of caller's a",ref?inside:a);if(l===2)add("Output of caller's b",b);
 ex("Pass argument",`a = ${a}`,ref?"ref aliases the caller's variable.":"The int value is copied into local parameter x.");
 ex("Execute method",`x = ${inside}${l===2?"; y = "+b*2:""}`,"Assignments update the parameter; y is passed by value when present.");
 ex("Return to caller",`a = ${ref?inside:a}${l===2?"; b = "+b:""}`,ref?"The original a changed through ref.":"The original a is unchanged.");
 }else if(focus==="return"){
 code=l===0?`static int Double(int x) {\n    return x * 2;\n}\nint a = ${a};\nConsole.WriteLine(Double(a));`:l===1?`static int Total(int x, int y) {\n    return x * y + ${k};\n}\nint a = ${a}, b = ${b};\nint result = Total(a, b);\nConsole.WriteLine(result);`:`static int Add(int x, int y) {\n    return x + y;\n}\nstatic int Double(int x) {\n    return x * 2;\n}\nint a = ${a}, b = ${b};\nint result = Double(Add(a, b));\nConsole.WriteLine(result);`;
 const result=l===0?a*2:l===1?a*b+k:(a+b)*2;
 if(l===2)add("Value returned by Add",a+b);add("Printed value",result);if(l>=1)add("Final value of a",a);
 ex("Bind arguments",`a=${a}${l?" and b="+b:""}`,"Arguments supply values to the named parameters.");
 if(l===2)ex("Inner function",`Add(${a}, ${b}) = ${a+b}`,"The returned value becomes the argument to Double.");
 ex("Return value",String(result),"The result goes to the caller; by-value integers are not changed.");
 }else if(focus==="scope"){
 code=l===0?`class Program {\n    static int total = ${a};\n    static void Change() {\n        int total = ${b};\n        total += ${k};\n        Console.WriteLine(total);\n    }\n    static void Main() {\n        Change();\n        Console.WriteLine(total);\n    }\n}`:l===1?`class Program {\n    static int total = ${a};\n    static void Change() {\n        total += ${k};\n        int local = total * 2;\n        Console.WriteLine(local);\n    }\n    static void Main() {\n        Change();\n        Console.WriteLine(total);\n    }\n}`:`class Program {\n    static int total = ${a};\n    static void Change(int total) {\n        total += ${k};\n        Program.total += total;\n        Console.WriteLine(total);\n    }\n    static void Main() {\n        Change(${b});\n        Console.WriteLine(total);\n    }\n}`;
 const local=l===0?b+k:l===1?(a+k)*2:b+k,global=l===0?a:l===1?a+k:a+b+k;
 add("First output",local);add("Second output",global);
 ex("Resolve the identifier","total",l===0?"The local variable hides the static field.":l===1?"There is no local total, so the field is used.":"The parameter hides the field; Program.total explicitly refers to the field.");
 ex("Trace method",`First output = ${local}`,"Apply each assignment in order.");
 ex("Caller",`Second output = ${global}`,"Main reads the static field.");
 }else throw Error("Unknown focus");
 return {prompt,code:code.split("\n").map((v,i)=>String(i+1).padStart(2,"0")+"  "+v).join("\n"),labels,answers,options,steps,hint:"Distinguish the local parameter or variable from the caller's storage. A ref int aliases the caller; an ordinary int parameter copies its value.",model:steps.map(x=>x.join("\n")).join("\n\n")};
}
function mount(){
 const $=id=>document.getElementById(id),el=(tag,cls,t)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(t!==undefined)e.textContent=t;return e;};
 const topics={"value":"By value","reference":"By reference","return":"Functions & returns","scope":"Local & global scope"};
 const params=new URLSearchParams(location.search);let focus=Object.hasOwn(topics,params.get("focus"))?params.get("focus"):"value",level=["easy","medium","hard"].includes(params.get("level"))?params.get("level"):"easy",n=0,question,step=0,example;
 const select=$("focus");Object.entries(topics).forEach(([v,t])=>{let o=el("option","",t);o.value=v;select.append(o);});select.value=focus;
 const levels=[...document.querySelectorAll("[data-level]")],normal=v=>String(v).trim().replace(/\s+/g," ").replace(/\s*([,=;])\s*/g,"$1");
 function table(rows,headers){const t=el("table","trace-table"),head=el("tr");headers.forEach(s=>head.append(el("th","",s)));t.append(head);rows.forEach(r=>{const tr=el("tr");r.forEach(s=>tr.append(el("td","",s)));t.append(tr);});return t;}
 function render(){question=make(focus,level,n);$("question-number").textContent="Question "+(n+1);$("prompt").textContent=question.prompt;$("instruction").textContent="Work through the example before checking."; $("visual").replaceChildren(el("div","data-label","GIVEN EXAMPLE"),el("pre","review-code",question.code));if(question.rows)$("visual").append(table(question.rows,question.headers));$("entry").replaceChildren();question.labels.forEach((t,i)=>{let w=el("label","review-field"),opts=question.options?.[i],input=el(opts?"select":"input");if(opts){let blank=el("option","","Choose…");blank.value="";input.append(blank);opts.forEach(s=>input.append(el("option","",s)));}else{input.type="text";input.autocomplete="off";input.spellcheck=false;}w.append(el("span","",t),input);$("entry").append(w);});$("feedback").textContent="";$("explainer").hidden=true;$("hint").textContent="Show hint";levels.forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.level===level)));}
 function openDemo(){example=make(focus,level,n+1,true);step=0;$("activity").hidden=true;$("demo").hidden=false;$("demo-title").textContent=topics[focus]+" · Demo";$("demo-prompt").textContent="Worked example · "+example.prompt;$("demo-code").textContent=example.code;$("demo-table").replaceChildren();if(example.rows)$("demo-table").append(table(example.rows,example.headers));draw();}
 function draw(){if(example.rows)$("demo-table").replaceChildren(table(step>=example.steps.length&&example.resultRows?example.resultRows:example.rows,example.headers));$("demo-steps").replaceChildren();example.steps.forEach((s,i)=>{let item=el("li",i<step?"shown":"pending");item.append(el("span","num",String(i+1).padStart(2,"0")),el("strong","",i<step?s[0]:"Step "+(i+1)));if(i<step)item.append(el("code","",s[1]),el("p","",s[2]));$("demo-steps").append(item);});$("demo-step").disabled=step>=example.steps.length;$("demo-step").textContent=$("demo-step").disabled?"✓ Example complete":"⏭ Next step";}
 function back(){$("demo").hidden=true;$("activity").hidden=false;}
 function reset(){back();n=0;render();}
 select.onchange=()=>{focus=select.value;reset();};levels.forEach(b=>b.onclick=()=>{level=b.dataset.level;reset();});
 $("check").onclick=()=>{let inputs=[...$("entry").querySelectorAll("input,select")],correct=inputs.map((e,i)=>normal(e.value)===normal(question.answers[i]));inputs.forEach((e,i)=>{e.style.borderColor=correct[i]?"#23754c":"#ad5949";});$("feedback").className="feedback "+(correct.every(Boolean)?"good":"bad");$("feedback").textContent=correct.every(Boolean)?"Correct — well done.":`${correct.filter(Boolean).length} of ${correct.length} correct. Check the highlighted answers.`;};
 $("hint").onclick=()=>{$("explainer").hidden=false;$("explainer").textContent=question.hint;};
 $("model").onclick=()=>{$("explainer").hidden=false;$("explainer").textContent=question.model;};
 $("next").onclick=()=>{n++;render();};$("demo-launch").onclick=openDemo;$("demo-back").onclick=back;$("demo-step").onclick=()=>{step++;draw();};$("demo-reset").onclick=()=>{step=0;draw();};render();
}
if(typeof module==='object'&&module.exports){module.exports={make};}else{mount();}

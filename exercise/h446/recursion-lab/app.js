'use strict';
function make(focus,level,n){
 const l=["easy","medium","hard"].indexOf(level),i=n%5,start=3+i,format=lines=>lines.map((s,j)=>String(j+1).padStart(2,"0")+"  "+s).join("\n");
 const q=(prompt,lines,labels,answers,hint,steps,options)=>({prompt,code:format(lines),labels,answers:answers.map(String),hint,steps,options,model:steps.map(s=>s[0]+"\n"+s[1]+"\n"+s[2]).join("\n\n")});
 if(focus==="base"||focus==="stack"){
  const product=focus==="base"&&l!==2,step=l===2?2:1,base=product?1:0,initial=l===2?start+2:start, name=product?"Fact":"Sum";
  const args=[];for(let x=initial;;x-=step){args.push(x);if(x<=0)break;}
  const values=[];let result=base;
  for(const x of [...args].reverse()){if(x>0)result=product?x*result:x+result;values.push(result);}
  const lines=[`static int ${name}(int n) {`,`    if (n <= 0) return ${base};`,`    return n ${product?"*":"+"} ${name}(n - ${step});`,"}",`Console.WriteLine(${name}(${initial}));`];
  const steps=[["Find the stopping condition",`n <= 0 → ${base}`,"At this point no further recursive call occurs."],...args.slice(1).map((x,j)=>["Push a call",args.slice(0,j+2).map(v=>`${name}(${v})`).join(" → "),"The rightmost frame is on top of the stack."]),...values.map((v,j)=>["Return from "+name+"("+[...args].reverse()[j]+")",`${name}(${[...args].reverse()[j]}) = ${v}`,j===0?"The base case returns first.":"Use the returned value of the smaller call; pop the completed frame."])];
  if(focus==="base"){
   if(l===0)return q("Identify the base case and recursive call.",lines,["Base-case line number","Recursive-call line number","Base-case return value"],[2,3,base],"Find the condition that returns without another call.",steps);
   if(l===1)return q("Predict the base-case argument and final return.",lines,["Argument at the base case","Value returned by the first call"],[args.at(-1),values.at(-1)],"Work down to the base case, then multiply as calls return.",steps);
   return q("Trace a recursive function with a step of two.",lines,["Argument at the base case","Number of active frames at the base case","Final output"],[args.at(-1),args.length,values.at(-1)],"Stop as soon as n <= 0. Include the original and base-case frames.",steps);
  }
  if(l===0)return q("Trace the call stack before the first return.",lines,["Arguments from bottom to top (comma-separated)","Top argument","Number of frames"],[args.join(", "),args.at(-1),args.length],"Push each new call onto the top; no calls have returned yet.",steps);
  return q("Complete the return values in unwinding order.",lines,[...args.slice().reverse().map(v=>`${name}(${v}) returns`),...(l===2?["Maximum active stack frames"]:[])],[...values,...(l===2?[args.length]:[])],"Start at the base case and work back towards the original call.",steps);
 }
 if(focus==="debug"){
  const x=1000+i*111+27;
  if(l===0){
   const lines=["static int Sum(int n) {","    if (n == 0) return 0;","    return n + Sum(n + 1);","}",`Console.WriteLine(Sum(${start}));`];
   return q("Repair the recursive step.",lines,["Replacement for line 03","Output after repair"],["return n + Sum(n - 1);",start*(start+1)/2],"Each call must move closer to zero.",[["Spot the error","n + 1","The argument grows instead of approaching zero."],["Repair","return n + Sum(n - 1);","Each call decreases the argument by one."],["Trace",`${start} + ... + 1 = ${start*(start+1)/2}`,"The base case contributes zero."]],[["return n + Sum(n - 1);","return n + Sum(n);","return n + Sum(n + 1);"],null]);
  }
  if(l===1){
   const lines=["static int Digits(int n) {","    // missing base case","    return 1 + Digits(n / 10);","}",`Console.WriteLine(Digits(${x}));`];
   return q("Complete the stopping condition for a positive integer.",lines,["Replacement for line 02","Output"],["if (n < 10) return 1;",String(x).length],"Integer division by 10 removes the last digit. Stop at one digit.",[["Base case","if (n < 10) return 1;","One positive digit contributes one."],["Call chain",`${x} → ${Math.floor(x/10)} → ${Math.floor(x/100)} → ${Math.floor(x/1000)}`,"Each recursive call removes a digit."],["Return","1 → 2 → 3 → 4","Add one as each call returns."]],[["if (n < 10) return 1;","if (n > 10) return 1;","if (n < 10) return 0;"],null]);
  }
  const lines=["static int Power(int n, int k) {","    if (k == 0) return 1;","    // complete recursive return","}",`Console.WriteLine(Power(${2+i%2}, ${start}));`];
  return q("Complete the recursive function to calculate n to the power k.",lines,["Recursive return statement","Output"],["return n * Power(n, k - 1);",(2+i%2)**start],"Keep the base n unchanged and reduce the exponent k.",[["Base case","Power(n, 0) = 1","Any nonzero base raised to zero is one."],["Recursive step","return n * Power(n, k - 1);","Multiply by n once per call."],["Unwind",`${2+i%2} ^ ${start} = ${(2+i%2)**start}`,"Multiply on each return."]],[["return n * Power(n, k - 1);","return k * Power(n - 1, k);","return n * Power(n, k);"],null]);
 }
 if(focus==="output"){
  const before=l!==1,after=l!==0;
  const lines=["static void Count(int n) {","    if (n == 0) return;",...(before?['    Console.Write(n);']:[]),"    Count(n - 1);",...(after?['    Console.Write(n);']:[]),"}",`Count(${start});`];
  const down=Array.from({length:start},(_,j)=>start-j).join(""),up=Array.from({length:start},(_,j)=>j+1).join("");
  return q("Predict the exact output (no spaces).",lines,["Output"],[(before?down:"")+(after?up:"")],"A print before the call executes on the way down; a print after executes on the way back.",[["Calls",`${start} → ... → 0`,before?"Print each positive n before making its recursive call.":"No output during descent."],["Base case","n = 0","Return immediately."],["Unwind",after?up:"No output",after?"Print after each recursive call returns.":"No print statement follows the recursive call."],["Final output",(before?down:"")+(after?up:""),"Concatenate in execution order without spaces."]]);
 }
 throw Error("Unknown focus");
}
function mount(){
 const $=id=>document.getElementById(id),el=(tag,cls,t)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(t!==undefined)e.textContent=t;return e;};
 const topics={base:"Base cases & returns",stack:"Call stack & unwinding",debug:"Write & debug",output:"Output order"};
 const params=new URLSearchParams(location.search);let focus=Object.hasOwn(topics,params.get("focus"))?params.get("focus"):"base",level=["easy","medium","hard"].includes(params.get("level"))?params.get("level"):"easy",n=0,question,step=0,example;
 const select=$("focus");Object.entries(topics).forEach(([v,t])=>{let o=el("option","",t);o.value=v;select.append(o);});select.value=focus;
 const levels=[...document.querySelectorAll("[data-level]")],normal=v=>String(v).trim().replace(/\s+/g," ").replace(/\s*([,=;])\s*/g,"$1");
 function render(){question=make(focus,level,n);$("question-number").textContent="Question "+(n+1);$("prompt").textContent=question.prompt;$("instruction").textContent="Trace the numbered C# code before checking."; $("visual").replaceChildren(el("div","data-label","C# · GIVEN CODE"),el("pre","review-code",question.code));$("entry").replaceChildren();question.labels.forEach((t,i)=>{let w=el("label","review-field"),opts=question.options?.[i],input=el(opts?"select":"input");if(opts){let blank=el("option","","Choose…");blank.value="";input.append(blank);opts.forEach(s=>input.append(el("option","",s)));}else{input.type="text";input.autocomplete="off";input.spellcheck=false;}w.append(el("span","",t),input);$("entry").append(w);});$("feedback").textContent="";$("explainer").hidden=true;$("hint").textContent="Show hint";levels.forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.level===level)));}
 function openDemo(){example=make(focus,level,n+1,true);step=0;$("activity").hidden=true;$("demo").hidden=false;$("demo-title").textContent=topics[focus]+" · Demo";$("demo-prompt").textContent="Worked example · "+example.prompt;$("demo-code").textContent=example.code;draw();}
 function draw(){$("demo-steps").replaceChildren();example.steps.forEach((s,i)=>{let item=el("li",i<step?"shown":"pending");item.append(el("span","num",String(i+1).padStart(2,"0")),el("strong","",i<step?s[0]:"Step "+(i+1)));if(i<step)item.append(el("code","",s[1]),el("p","",s[2]));$("demo-steps").append(item);});$("demo-step").disabled=step>=example.steps.length;$("demo-step").textContent=$("demo-step").disabled?"✓ Example complete":"⏭ Next step";}
 function back(){$("demo").hidden=true;$("activity").hidden=false;}
 function reset(){back();n=0;render();}
 select.onchange=()=>{focus=select.value;reset();};levels.forEach(b=>b.onclick=()=>{level=b.dataset.level;reset();});
 $("check").onclick=()=>{let inputs=[...$("entry").querySelectorAll("input,select")],correct=inputs.map((e,i)=>normal(e.value)===normal(question.answers[i]));inputs.forEach((e,i)=>{e.style.borderColor=correct[i]?"#23754c":"#ad5949";});$("feedback").className="feedback "+(correct.every(Boolean)?"good":"bad");$("feedback").textContent=correct.every(Boolean)?"Correct — well done.":`${correct.filter(Boolean).length} of ${correct.length} correct. Check the highlighted answers.`;};
 $("hint").onclick=()=>{$("explainer").hidden=false;$("explainer").textContent=question.hint;};
 $("model").onclick=()=>{$("explainer").hidden=false;$("explainer").textContent=question.model;};
 $("next").onclick=()=>{n++;render();};$("demo-launch").onclick=openDemo;$("demo-back").onclick=back;$("demo-step").onclick=()=>{step++;draw();};$("demo-reset").onclick=()=>{step=0;draw();};render();
}
if(typeof module==='object'&&module.exports){module.exports={make};}else{mount();}

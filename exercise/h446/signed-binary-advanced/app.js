'use strict';
function make(focus,level,n){
 const l=["easy","medium","hard"].indexOf(level),w=[4,8,8+(n%2)*4][l],lim=2**(w-1),mod=2**w,bin=v=>((v%mod+mod)%mod).toString(2).padStart(w,"0"),decode=v=>v>=lim?v-mod:v,labels=[],answers=[],options=[],steps=[],add=(k,v,o)=>{labels.push(k);answers.push(String(v));options.push(o);},ex=(a,b,c)=>steps.push([a,b,c]);let prompt,code;
 if(focus==="convert"){
 const v=(n%2?-1:1)*(1+(n*13)%(lim-1)),signmag=(v<0?"1":"0")+Math.abs(v).toString(2).padStart(w-1,"0");
 prompt="Represent a signed integer in two different formats.";code=`Denary value = ${v}\nWord length = ${w} bits.\nSign and magnitude: leading sign bit (1 negative), then magnitude.\nTwo's complement: leading bit has negative place value.`;
 add(`Two's complement (${w} bits)`,bin(v));add(`Sign and magnitude (${w} bits)`,signmag);
 ex("Magnitude",Math.abs(v).toString(2),"Convert the magnitude to unsigned binary.");ex("Sign and magnitude",signmag,"Use the sign bit and unchanged magnitude.");ex("Two's complement",bin(v),v<0?"Invert the positive word and add one.":"Positive values use ordinary binary with leading zero.");
 if(l>=1){add("Decode two's-complement word as unsigned",parseInt(bin(v),2));ex("Interpretation",String(parseInt(bin(v),2)),"Identical bits can represent different numbers under different conventions.");}
 if(l===2){add("Most negative two's-complement integer",-lim);add("Most negative sign-and-magnitude integer",1-lim);ex("Compare ranges",`${-lim} vs ${1-lim}`,"Sign and magnitude has two zero patterns; two's complement has only one.");}
 }else if(focus==="decode"){
 const raw=n%5===0?lim: n%5===1?lim-1:(n*37+11)%mod,word=bin(raw),sm=raw>=lim?-(raw-lim):raw;
 prompt="Interpret the same binary word in two signed formats.";code=`Word: ${word}\n${w} bits, MSB first.\nUse 0 for either sign-and-magnitude zero pattern.`;
 add("Two's complement (denary)",decode(raw));add("Sign and magnitude (denary)",sm);ex("Two's complement",String(decode(raw)),raw>=lim?`Subtract ${mod} from the unsigned value.`:"Leading zero means non-negative.");ex("Sign and magnitude",String(sm),"Use the leading bit for sign only; remaining bits give magnitude.");
 if(l>=1)add("Unsigned denary value",raw);if(l===2){add("Maximum signed two's-complement value",lim-1);ex("Range",`${-lim} to ${lim-1}`,"The negative bound has one extra magnitude.");}
 }else if(focus==="overflow"){
 const cases=[[lim-2,3],[-lim+1,-3],[lim-2,-3],[-lim+2,3],[lim-1,1],[-lim,-1]], [a,b]=cases[n%cases.length],sub=l===2&&n%2===1,actual=sub?a-b:a+b,raw=(actual%mod+mod)%mod,overflow=actual< -lim||actual>lim-1;
 prompt="Calculate the result and detect signed overflow.";code=`${w}-bit two's-complement arithmetic, discard bits beyond ${w}.\n  ${bin(a)} (${a})\n${sub?"−":"+"} ${bin(b)} (${b})\nRepresentable range: ${-lim} to ${lim-1}.`;
 add(`Stored result (${w} bits)`,bin(raw));add("Stored signed value",decode(raw));add("Signed overflow?",overflow?"Yes":"No",["Yes","No"]);
 ex("Exact calculation",`${a} ${sub?"−":"+"} ${b} = ${actual}`,"Compare exact result with signed range.");ex("Fixed-width word",bin(raw),"Only the low word bits remain.");ex("Interpret stored value",String(decode(raw)),overflow?"The mathematical result cannot fit; signed overflow occurs.":"The mathematical result fits.");
 if(l>=1)add("Exact mathematical result",actual);if(l===2)add("Does a carry-out alone prove signed overflow?","No",["Yes","No"]);
 }else if(focus==="range"){
 prompt="Calculate the representable integer ranges.";code=`Word length: ${w} bits, including sign bit for signed formats.`;
 add("Minimum two's complement",-lim);add("Maximum two's complement",lim-1);add("Maximum unsigned",mod-1);ex("Signed range",`${-lim} to ${lim-1}`,"−2^(w−1) through 2^(w−1)−1.");ex("Unsigned range",`0 to ${mod-1}`,"All bits contribute non-negative weights.");
 if(l>=1){add("Minimum sign and magnitude",1-lim);add("Distinct sign-and-magnitude integer values",mod-1);ex("Sign and magnitude",`${1-lim} to ${lim-1}`,"Positive and negative zero share the same numeric value.");}
 if(l===2){add("Minimum two's-complement value with one extra bit",-2*lim);ex("Extra bit",`${-2*lim} to ${2*lim-1}`,"The representable range doubles in number of patterns.");}
 }else throw Error("Focus");
 return {prompt,code,labels,answers,options,steps,hint:"Treat the MSB as a negative weight in two's complement, but as a separate sign in sign and magnitude. Compare exact arithmetic to the signed range.",model:steps.map(s=>s.join("\n")).join("\n\n")};
}
function mount(){
 const $=id=>document.getElementById(id),el=(tag,cls,t)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(t!==undefined)e.textContent=t;return e;};
 const topics={"convert":"Encode signed integers","decode":"Decode signed words","overflow":"Signed arithmetic & overflow","range":"Representable ranges"};
 const params=new URLSearchParams(location.search);let focus=Object.hasOwn(topics,params.get("focus"))?params.get("focus"):"convert",level=["easy","medium","hard"].includes(params.get("level"))?params.get("level"):"easy",n=0,question,step=0,example;
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

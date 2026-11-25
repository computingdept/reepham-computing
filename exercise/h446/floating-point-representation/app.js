'use strict';
function make(focus,level,n){
 const l=["easy","medium","hard"].indexOf(level),bits=8,ebits=4,scale=2**(bits-1),sign=l===0?1:n%2?-1:1,expo=l===0?1+n%4:-3+n%10;
 const mag=sign>0?64+n%60:65+n%63,m=sign*mag,tc=(v,b)=>((v+2**b)%2**b).toString(2).padStart(b,"0"),value=(v,e)=>v/scale*2**e,fmt=x=>String(x),labels=[],answers=[],options=[],steps=[],add=(k,v,o)=>{labels.push(k);answers.push(String(v));options.push(o);},ex=(a,b,c)=>steps.push([a,b,c]);
 let prompt,code;const convention="8-bit two's-complement mantissa (binary point after sign bit); 4-bit two's-complement exponent.\nValue = mantissa × 2^exponent. Use exact values.";
 if(focus==="decode"){
 prompt="Convert the representation to denary.";code=`Mantissa: ${tc(m,bits)}\nExponent: ${tc(expo,ebits)}\n${convention}`;
 add("Mantissa as denary fraction",fmt(m/scale));add("Exponent as signed denary",expo);add("Final denary value",fmt(value(m,expo)));
 ex("Decode mantissa",`${tc(m,bits)} = ${m}/128 = ${m/scale}`,"The sign bit has weight −1; remaining bits have positive fractional weights.");ex("Decode exponent",`${tc(expo,ebits)} = ${expo}`,"Exponent is signed two's complement.");ex("Scale",`${m/scale} × 2^${expo} = ${value(m,expo)}`,"Multiply by the signed power of two.");
 }else if(focus==="encode"){
 prompt="Represent the denary value in normalised floating point.";code=`Denary: ${value(m,expo)}\n${convention}\nNormalised nonzero mantissas start 01 (positive) or 10 (negative).`;
 add("Mantissa (8 bits)",tc(m,bits));add("Exponent (4 bits)",tc(expo,ebits));if(l===2)add("Signed exponent in denary",expo);
 ex("Scale to normalised range",`${value(m,expo)} = ${m/scale} × 2^${expo}`,"Choose a mantissa with leading bits 01 or 10.");ex("Encode mantissa",`${m} / 128 → ${tc(m,bits)}`,"Encode the scaled signed integer in 8-bit two's complement.");ex("Encode exponent",tc(expo,ebits),"Encode the signed integer exponent in four bits.");
 }else if(focus==="normalise"){
 const k=1+l,base=l===0?16*(2+n%2):l===1?16*(1+n%2):8*(1+n%2),positive=64+base%64;
 // Start with a deliberately non-normalised, exactly representable mantissa.
 const target=sign>0?positive:-96,initial=target/(2**k),e=expo>4?4:expo,initialExp=e+k;
 prompt="Normalise without changing the represented value.";code=`Mantissa: ${tc(initial,bits)}\nExponent: ${tc(initialExp,ebits)}\n${convention}\nShift left until the first two bits differ.`;
 add("Number of left shifts",k);add("Normalised mantissa (8 bits)",tc(target,bits));add("Adjusted exponent (4 bits)",tc(e,ebits));
 for(let i=1;i<=k;i++)ex("Shift "+i,`${tc(initial*2**i,bits)} ${tc(initialExp-i,ebits)}`,"A left shift doubles the mantissa; decrement exponent to preserve value.");
 ex("Check",fmt(value(target,e)),"Both representations have the same denary value.");
 if(!Number.isInteger(initial)||value(initial,initialExp)!==value(target,e))throw Error("Invalid normalisation");
 }else if(focus==="precision"){
 const mantBits=l===0?6:8,exponent=l===0?2+n%3:-2+n%5,unit=2**(exponent-(mantBits-1));
 prompt="Calculate spacing and representational precision.";code=`${mantBits}-bit two's-complement fractional mantissa, exponent = ${exponent}.\nThe binary point follows the sign bit. Consider adjacent representable mantissas at this fixed exponent.`;
 add("Difference between adjacent values",fmt(unit));ex("Least significant mantissa bit",`2^−${mantBits-1}`,"Each successive bit halves in weight.");ex("Scale",`2^${exponent} × 2^−${mantBits-1} = ${unit}`,"The spacing depends on mantissa width and exponent.");
 if(l>=1){add("Spacing with one extra mantissa bit (same exponent)",fmt(unit/2));ex("Extra mantissa bit",fmt(unit/2),"More mantissa bits improve precision.");}
 if(l===2){add("More exponent bits primarily increase","Range",["Range","Precision at a fixed exponent","Number of sign bits"]);ex("Range","Exponent width","Larger exponent range allows much larger and smaller magnitudes.");}
 }else throw Error("Focus");
 return {prompt,code,labels,answers,options,steps,hint:"Decode the signed mantissa and exponent separately. For normalisation, shift the mantissa left and decrement the exponent until the sign and next bit differ.",model:steps.map(s=>s.join("\n")).join("\n\n")};
}
function mount(){
 const $=id=>document.getElementById(id),el=(tag,cls,t)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(t!==undefined)e.textContent=t;return e;};
 const topics={"decode":"Floating point to denary","encode":"Denary to floating point","normalise":"Normalisation","precision":"Precision & range"};
 const params=new URLSearchParams(location.search);let focus=Object.hasOwn(topics,params.get("focus"))?params.get("focus"):"decode",level=["easy","medium","hard"].includes(params.get("level"))?params.get("level"):"easy",n=0,question,step=0,example;
 const select=$("focus");Object.entries(topics).forEach(([v,t])=>{let o=el("option","",t);o.value=v;select.append(o);});select.value=focus;
 const levels=[...document.querySelectorAll("[data-level]")],normal=v=>String(v).trim().replace(/\s+/g," ").replace(/\s*([,=;])\s*/g,"$1");
 function table(rows,headers){const t=el("table","trace-table"),head=el("tr");headers.forEach(s=>head.append(el("th","",s)));t.append(head);rows.forEach(r=>{const tr=el("tr");r.forEach(s=>tr.append(el("td","",s)));t.append(tr);});return t;}
 function render(){question=make(focus,level,n);$("question-number").textContent="Question "+(n+1);$("prompt").textContent=question.prompt;$("instruction").textContent="Trace the given example before checking."; $("visual").replaceChildren(el("div","data-label","GIVEN EXAMPLE"),el("pre","review-code",question.code));if(question.rows)$("visual").append(table(question.rows,question.headers));$("entry").replaceChildren();question.labels.forEach((t,i)=>{let w=el("label","review-field"),opts=question.options?.[i],input=el(opts?"select":"input");if(opts){let blank=el("option","","Choose…");blank.value="";input.append(blank);opts.forEach(s=>input.append(el("option","",s)));}else{input.type="text";input.autocomplete="off";input.spellcheck=false;}w.append(el("span","",t),input);$("entry").append(w);});$("feedback").textContent="";$("explainer").hidden=true;$("hint").textContent="Show hint";levels.forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.level===level)));}
 function openDemo(){example=make(focus,level,n+1,true);step=0;$("activity").hidden=true;$("demo").hidden=false;$("demo-title").textContent=topics[focus]+" · Demo";$("demo-prompt").textContent="Worked example · "+example.prompt;$("demo-code").textContent=example.code;$("demo-table").replaceChildren();if(example.rows)$("demo-table").append(table(example.rows,example.headers));draw();}
 function draw(){if(example.rows)$("demo-table").replaceChildren(table(step>=example.steps.length&&example.resultRows?example.resultRows:example.rows,example.headers));$("demo-steps").replaceChildren();example.steps.forEach((s,i)=>{let item=el("li",i<step?"shown":"pending");item.append(el("span","num",String(i+1).padStart(2,"0")),el("strong","",i<step?s[0]:"Step "+(i+1)));if(i<step)item.append(el("code","",s[1]),el("p","",s[2]));$("demo-steps").append(item);});$("demo-step").disabled=step>=example.steps.length;$("demo-step").textContent=$("demo-step").disabled?"✓ Example complete":"⏭ Next step";}
 function back(){$("demo").hidden=true;$("activity").hidden=false;}
 function reset(){back();n=0;render();}
 select.onchange=()=>{focus=select.value;reset();};levels.forEach(b=>b.onclick=()=>{level=b.dataset.level;reset();});
 $("check").onclick=()=>{let inputs=[...$("entry").querySelectorAll("input,select")],correct=inputs.map((e,i)=>(question.labels[i].includes("bits)")?e.value.replace(/\s/g,"")===question.answers[i]:question.options?.[i]?normal(e.value)===normal(question.answers[i]):e.value.trim()!==""&&Number.isFinite(Number(e.value))&&Math.abs(Number(e.value)-Number(question.answers[i]))<=1e-12*Math.max(1,Math.abs(Number(question.answers[i])))));inputs.forEach((e,i)=>{e.style.borderColor=correct[i]?"#23754c":"#ad5949";});$("feedback").className="feedback "+(correct.every(Boolean)?"good":"bad");$("feedback").textContent=correct.every(Boolean)?"Correct — well done.":`${correct.filter(Boolean).length} of ${correct.length} correct. Check the highlighted answers.`;};
 $("hint").onclick=()=>{$("explainer").hidden=false;$("explainer").textContent=question.hint;};
 $("model").onclick=()=>{$("explainer").hidden=false;$("explainer").textContent=question.model;};
 $("next").onclick=()=>{n++;render();};$("demo-launch").onclick=openDemo;$("demo-back").onclick=back;$("demo-step").onclick=()=>{step++;draw();};$("demo-reset").onclick=()=>{step=0;draw();};render();
}
if(typeof module==='object'&&module.exports){module.exports={make};}else{mount();}

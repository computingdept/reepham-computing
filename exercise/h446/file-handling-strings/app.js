'use strict';
function make(focus,level,n){
 const l=["easy","medium","hard"].indexOf(level),labels=[],answers=[],options=[],steps=[],add=(k,v,o)=>{labels.push(k);answers.push(String(v));options.push(o);},ex=(a,b,c)=>steps.push([a,b,c]);let prompt,code,headers,rows;
 const cities=["York","Bath","Norwich","Leeds","Exeter"],data=Array.from({length:2+l},(_,i)=>cities[(n+i)%5]);
 if(focus==="read"){
 prompt="Trace the file-reading loop in OCR pseudocode.";const filter=l===2?data[1][0]:null,output=filter?data.filter(x=>x[0]===filter):data;
 code=`cities.txt contains one city per line:\n${data.join("\n")}\n\nf = openRead("cities.txt")\nwhile NOT f.endOfFile()\n    city = f.readLine()\n${filter?`    if city.left(1) == "${filter}" then\n        print(city)\n    endif`:"    print(city)"}\nendwhile\nf.close()`;
 add("Number of readLine calls",data.length);add("Printed cities (comma-separated)",output.join(", "));data.forEach((v,i)=>ex("Read line "+(i+1),v,output.includes(v)?"Print the current line.":"Filter excludes this line."));ex("End of file","Stop and close","EOF is checked before each read.");if(l>=1)add("Number of EOF checks",data.length+1);if(l===2)add("Number of printed lines",output.length);
 }else if(focus==="write"){
 const append=l>=1&&n%2===1,old=["Start","Ready"],newLines=["Event "+(n%9+1),"Complete"],final=append?old.concat(newLines):newLines;
 prompt="Predict the file contents after writing.";code=`Existing events.txt:\n${old.join("\n")}\n\n${append?'log = openAppend("events.txt")':'log = openWrite("events.txt")'}\nlog.writeLine("${newLines[0]}")\nlog.writeLine("${newLines[1]}")\nlog.close()\nFor this task, openWrite truncates the file and openAppend preserves existing lines.`;
 add("Final lines (separate with commas)",final.join(", "));add("Number of lines",final.length);ex("Open",append?"Append mode":"Write mode",append?"Existing content remains.":"Existing content is discarded.");ex("Write",final.join(" | "),"Each writeLine adds a line.");if(l>=1)add("Does original first line survive?",append?"Yes":"No",["Yes","No"]);if(l===2)add("Purpose of close","Release the file and finish buffered writes",["Release the file and finish buffered writes","Delete the file","Reset all stored values"]);
 }else if(focus==="strings"){
 const word=["COMPUTING","ALGORITHM","DATABASE","NETWORKING"][n%4],start=1+n%3,len=2+n%3,part=word.substring(start,start+len);
 prompt="Trace C# string operations.";code=`string s = "${word}";\nstring part = s.Substring(${start}, ${len});\nConsole.WriteLine(part);`;
 add("Printed substring",part);ex("Substring",part,`Start at zero-based index ${start}; take ${len} characters.`);
 if(l>=1){code+="\nConsole.WriteLine(s.Length);\nConsole.WriteLine(part.ToLower());";add("s.Length",word.length);add("Lowercase output",part.toLowerCase());ex("Length and case",`${word.length}; ${part.toLowerCase()}`,"Length counts characters; ToLower returns a new string.");}
 if(l===2){code+="\nConsole.WriteLine(s);";add("Final s",word);ex("Original string",word,"C# strings are immutable; substring and case conversion do not alter s.");}
 }else if(focus==="csv"){
 const vals=Array.from({length:3+l},(_,i)=>20+(n*7+i*13)%70),threshold=50,records=vals.map((v,i)=>[cities[(n+i)%5],v]),selected=records.filter(r=>r[1]>=threshold);
 prompt="Trace CSV parsing and filtering in C#.";headers=["Line","File contents"];rows=records.map((r,i)=>[String(i+1),r.join(",")]);
 code=`// Each line contains city,score; no header or quoted commas.\nint total = 0, count = 0;\nforeach (string line in File.ReadLines("scores.txt")) {\n    string[] fields = line.Split(',');\n    int score = int.Parse(fields[1]);\n    if (score >= ${threshold}) {\n        count++;\n        total += score;\n    }\n}`;
 add("Final count",selected.length);add("Final total",selected.reduce((a,r)=>a+r[1],0));let c=0,t=0;records.forEach(r=>{if(r[1]>=threshold){c++;t+=r[1];}ex("Parse "+r.join(","),`count=${c}; total=${t}`,r[1]>=threshold?"Score meets threshold.":"Score is excluded.");});
 if(l>=1)add("Field index containing score",1);if(l===2){add("Safer method if scores may contain non-numeric text","int.TryParse",["int.TryParse","int.Parse","string.Join"]);ex("Defensive parsing","int.TryParse","Check conversion before using the value; field count also needs validation.");}
 }else throw Error("Focus");
 return {prompt,code,headers,rows,labels,answers,options,steps,hint:"Trace each read or write in order. Distinguish file modes and remember that C# string indices start at zero.",model:steps.map(s=>s.join("\n")).join("\n\n")};
}
function mount(){
 const $=id=>document.getElementById(id),el=(tag,cls,t)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(t!==undefined)e.textContent=t;return e;};
 const topics={"read":"Read files & EOF","write":"Write & append","strings":"String manipulation","csv":"Parse file records"};
 const params=new URLSearchParams(location.search);let focus=Object.hasOwn(topics,params.get("focus"))?params.get("focus"):"read",level=["easy","medium","hard"].includes(params.get("level"))?params.get("level"):"easy",n=0,question,step=0,example;
 const select=$("focus");Object.entries(topics).forEach(([v,t])=>{let o=el("option","",t);o.value=v;select.append(o);});select.value=focus;
 const levels=[...document.querySelectorAll("[data-level]")],normal=v=>String(v).trim().replace(/\s+/g," ").replace(/\s*([,=;])\s*/g,"$1");
 function table(rows,headers){const t=el("table","trace-table"),head=el("tr");headers.forEach(s=>head.append(el("th","",s)));t.append(head);rows.forEach(r=>{const tr=el("tr");r.forEach(s=>tr.append(el("td","",s)));t.append(tr);});return t;}
 function render(){question=make(focus,level,n);$("question-number").textContent="Question "+(n+1);$("prompt").textContent=question.prompt;$("instruction").textContent="Work through the given example before checking."; $("visual").replaceChildren(el("div","data-label","GIVEN EXAMPLE"),el("pre","review-code",question.code));if(question.rows)$("visual").append(table(question.rows,question.headers));$("entry").replaceChildren();question.labels.forEach((t,i)=>{let w=el("label","review-field"),opts=question.options?.[i],input=el(opts?"select":"input");if(opts){let blank=el("option","","Choose…");blank.value="";input.append(blank);opts.forEach(s=>input.append(el("option","",s)));}else{input.type="text";input.autocomplete="off";input.spellcheck=false;}w.append(el("span","",t),input);$("entry").append(w);});$("feedback").textContent="";$("explainer").hidden=true;$("hint").textContent="Show hint";levels.forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.level===level)));}
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

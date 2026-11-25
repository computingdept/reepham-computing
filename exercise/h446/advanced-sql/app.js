'use strict';
function make(focus,level,n){
 const l=["easy","medium","hard"].indexOf(level),p=J277Paper2SQL.TABLES.Pupils,people=p.rows.map((r,i)=>[i+1,r[0],r[1]]),marks=[[1,60+n%21],[1,85],[2,55+n%16],[4,75+n%16]],labels=[],answers=[],options=[],steps=[];
 const add=(k,v,o)=>{labels.push(k);answers.push(String(v));options.push(o);},ex=(a,b,c)=>steps.push([a,b,c]);
 let prompt,code,threshold=65+n%16;const schema="Pupil(ID, Name, House)\nResult(PupilID, Mark)\nPupil.ID is unique; Result.PupilID references it.\nPupil:\n"+people.map(r=>r.join(" | ")).join("\n")+"\nResult:\n"+marks.map(r=>r.join(" | ")).join("\n");
 const list=x=>x.join(", ")||"none";
 if(focus==="join"){
 prompt="Trace the INNER JOIN. Predict the result.";let filtered=l===0?marks:marks.filter(r=>r[1]>=threshold),result=filtered.slice().sort((a,b)=>a[0]-b[0]||a[1]-b[1]);
 code=schema+"\n\nSELECT Pupil.Name, Result.Mark\nFROM Pupil INNER JOIN Result\nON Pupil.ID = Result.PupilID"+(l>=1?`\nWHERE Result.Mark >= ${threshold}`:"")+"\nORDER BY Pupil.ID, Result.Mark;";
 add("Names returned in order (comma-separated; none if empty)",list(result.map(r=>people.find(x=>x[0]===r[0])[1])));if(l>=1)add("Marks in order (comma-separated; none if empty)",list(result.map(r=>r[1])));if(l===2)add("Join condition","Pupil.ID = Result.PupilID",["Pupil.ID = Result.PupilID","Pupil.ID = Result.Mark","Pupil.Name = Result.PupilID"]);
 ex("Match keys","Pupil.ID = Result.PupilID","An INNER JOIN retains matching pairs only.");ex("Filter and sort",list(result.map(r=>people.find(x=>x[0]===r[0])[1]+" "+r[1])),"Apply the WHERE condition when present, then order the selected rows. Duplicate names may occur.");
 }else if(focus==="nested"){
 prompt="Trace a nested SELECT.";let ids=[...new Set(marks.filter(r=>r[1]>=threshold).map(r=>r[0]))].sort((a,b)=>a-b),names=people.filter(r=>ids.includes(r[0])).map(r=>r[1]);
 code=schema+`\n\nSELECT Name FROM Pupil\nWHERE ID IN (SELECT PupilID FROM Result\n             WHERE Mark >= ${threshold})\nORDER BY ID;`;
 add("Distinct IDs from subquery (ascending, comma-separated)",list(ids));add("Names returned in order (comma-separated)",list(names));if(l===2)add("Outer filter keyword","IN",["IN","ORDER BY","DROP"]);
 ex("Evaluate inner query",list(ids),"Find PupilID values whose marks meet the threshold; repeated IDs do not multiply outer rows.");ex("Outer query",list(names),"Keep pupils with an ID in the inner result.");
 }else if(focus==="filter"){
 prompt="Select the correct filtering and sorting query.";const prefix=people[n%4][1][0],right=`SELECT Name FROM Pupil WHERE Name LIKE '${prefix}%' ORDER BY Name;`;
 code=schema+`\n\nReturn only names beginning with ${prefix}, alphabetically.`;
 add("SQL statement",right,[right,`SELECT Name FROM Pupil WHERE Name = '${prefix}%' ORDER BY Name;`,`SELECT * FROM Pupil WHERE Name LIKE '%${prefix}';`]);if(l>=1)add("Matching names",list(people.filter(r=>r[1].startsWith(prefix)).map(r=>r[1]).sort()));if(l===2)add("Wildcard for zero or more characters","%",["_","%","*"]);
 ex("Filter",`LIKE '${prefix}%'`,"Percent matches zero or more characters.");ex("Projection and order",right,"SELECT Name returns only the requested field; ORDER BY sorts ascending by default.");
 }else if(focus==="modify"){
 const id=5+n%5,newName="Kai",cmd=l===0?`INSERT INTO Pupil (ID, Name, House) VALUES (${id}, 'Kai', 'Red');`:l===1?`UPDATE Pupil SET House = 'Red' WHERE ID = 2;`:n%2?`DELETE FROM Result WHERE PupilID = 1;`:"DROP TABLE Result;";
 prompt=l===0?"Insert one new pupil.":l===1?"Change only pupil 2's house to Red.":n%2?"Remove all results for pupil 1, but retain the table.":"Remove the Result table and its definition.";
 code=schema+`\n\n${l===0?`New pupil: ${id}, ${newName}, Red.`:"All constraints remain enforced."}`;
 const wrong=l===0?[`INSERT INTO Pupil VALUES ('Kai', ${id}, 'Red');`,`UPDATE Pupil SET Name = 'Kai';`]:l===1?["UPDATE Pupil SET House = 'Red';","DELETE FROM Pupil WHERE ID = 2;"]:n%2?["DELETE FROM Result;","DROP TABLE Result;"]:["DELETE FROM Result;","DELETE FROM Result WHERE PupilID = 1;"];
 const opts=[cmd,...wrong];opts.push(...opts.splice(0,n%3));add("Correct SQL statement",cmd,opts);if(l===2)add("Does Result table still exist?",n%2?"Yes":"No",["Yes","No"]);ex("Choose statement",cmd,"INSERT adds a row, UPDATE changes selected rows, DELETE removes rows and DROP removes a table definition.");
 }else throw Error("Focus");
 return {prompt,code,labels,answers,options,steps,hint:"Read SELECT, FROM, JOIN and WHERE carefully. For updates or deletes, check which rows the WHERE clause selects.",model:steps.map(x=>x.join("\n")).join("\n\n")};
}
function mount(){
 const $=id=>document.getElementById(id),el=(tag,cls,t)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(t!==undefined)e.textContent=t;return e;};
 const topics={"join":"INNER JOIN","nested":"Nested SELECT","filter":"LIKE & ORDER BY","modify":"Data manipulation"};
 const params=new URLSearchParams(location.search);let focus=Object.hasOwn(topics,params.get("focus"))?params.get("focus"):"join",level=["easy","medium","hard"].includes(params.get("level"))?params.get("level"):"easy",n=0,question,step=0,example;
 const select=$("focus");Object.entries(topics).forEach(([v,t])=>{let o=el("option","",t);o.value=v;select.append(o);});select.value=focus;
 const levels=[...document.querySelectorAll("[data-level]")],normal=v=>String(v).trim().replace(/\s+/g," ").replace(/\s*([,=;])\s*/g,"$1");
 function table(rows,headers){const t=el("table","trace-table"),head=el("tr");headers.forEach(s=>head.append(el("th","",s)));t.append(head);rows.forEach(r=>{const tr=el("tr");r.forEach(s=>tr.append(el("td","",s)));t.append(tr);});return t;}
 function render(){question=make(focus,level,n);$("question-number").textContent="Question "+(n+1);$("prompt").textContent=question.prompt;$("instruction").textContent="Work through the given example before checking."; $("visual").replaceChildren(el("div","data-label","GIVEN EXAMPLE"),el("pre","review-code",question.code));if(question.rows)$("visual").append(table(question.rows,question.headers));$("entry").replaceChildren();question.labels.forEach((t,i)=>{let w=el("label","review-field"),opts=question.options?.[i],input=el(opts?"select":"input");if(opts){let blank=el("option","","Choose…");blank.value="";input.append(blank);opts.forEach(s=>input.append(el("option","",s)));}else{input.type="text";input.autocomplete="off";input.spellcheck=false;}w.append(el("span","",t),input);$("entry").append(w);});$("feedback").textContent="";$("explainer").hidden=true;$("hint").textContent="Show hint";levels.forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.level===level)));}
 function openDemo(){example=make(focus,level,n+1,true);step=0;$("activity").hidden=true;$("demo").hidden=false;$("demo-title").textContent=topics[focus]+" · Demo";$("demo-prompt").textContent="Worked example · "+example.prompt;$("demo-code").textContent=example.code;$("demo-table").replaceChildren();if(example.rows)$("demo-table").append(table(example.rows,example.headers));draw();}
 function draw(){if(example.rows)$("demo-table").replaceChildren(table(step>=example.steps.length&&example.resultRows?example.resultRows:example.rows,example.headers));$("demo-steps").replaceChildren();example.steps.forEach((s,i)=>{let item=el("li",i<step?"shown":"pending");item.append(el("span","num",String(i+1).padStart(2,"0")),el("strong","",i<step?s[0]:"Step "+(i+1)));if(i<step)item.append(el("code","",s[1]),el("p","",s[2]));$("demo-steps").append(item);});$("demo-step").disabled=step>=example.steps.length;$("demo-step").textContent=$("demo-step").disabled?"✓ Example complete":"⏭ Next step";}
 function back(){$("demo").hidden=true;$("activity").hidden=false;}
 function reset(){back();n=0;render();}
 select.onchange=()=>{focus=select.value;reset();};levels.forEach(b=>b.onclick=()=>{level=b.dataset.level;reset();});
 $("check").onclick=()=>{let inputs=[...$("entry").querySelectorAll("input,select")],correct=inputs.map((e,i)=>normal(e.value).toLowerCase()===normal(question.answers[i]).toLowerCase());inputs.forEach((e,i)=>{e.style.borderColor=correct[i]?"#23754c":"#ad5949";});$("feedback").className="feedback "+(correct.every(Boolean)?"good":"bad");$("feedback").textContent=correct.every(Boolean)?"Correct — well done.":`${correct.filter(Boolean).length} of ${correct.length} correct. Check the highlighted answers.`;};
 $("hint").onclick=()=>{$("explainer").hidden=false;$("explainer").textContent=question.hint;};
 $("model").onclick=()=>{$("explainer").hidden=false;$("explainer").textContent=question.model;};
 $("next").onclick=()=>{n++;render();};$("demo-launch").onclick=openDemo;$("demo-back").onclick=back;$("demo-step").onclick=()=>{step++;draw();};$("demo-reset").onclick=()=>{step=0;draw();};render();
}
if(typeof module==='object'&&module.exports){module.exports={make};}else{mount();}

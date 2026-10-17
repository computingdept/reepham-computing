(function(){
"use strict";
const root=document.getElementById("assessment-root");if(!root)return;
const id=root.dataset.paper,scheme=root.dataset.mode==="scheme";
const e=(tag,cls,txt)=>{const x=document.createElement(tag);if(cls)x.className=cls;if(txt!==undefined)x.textContent=String(txt);return x};
const add=(parent,tag,cls,txt)=>{const x=e(tag,cls,txt);parent.append(x);return x};
const svg=(content,alt)=>'<svg viewBox="0 0 640 270" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="'+alt+'"><rect x="1" y="1" width="638" height="268" rx="14" fill="#f9fcf9" stroke="#bcd5c6" stroke-width="2"/>'+content+'</svg>';
const rect=(x,y,w,h,fill="#e9f3ec")=>'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="8" fill="'+fill+'" stroke="#8cb7a1" stroke-width="2"/>';
const txt=(x,y,s,size=17)=>'<text x="'+x+'" y="'+y+'" font-family="Arial,sans-serif" font-size="'+size+'" font-weight="750" text-anchor="middle" fill="#1d5540">'+String(s).replace(/[<>&]/g,"")+'</text>';
const cell=(x,y,w,h,v,color="#eaf4ec")=>rect(x,y,w,h,color)+txt(x+w/2,y+h/2+6,v,19);
const arrow=(x,y,x2,y2)=>'<path d="M'+x+' '+y+'L'+x2+' '+y2+' M'+(x2-9)+' '+(y2-7)+'L'+x2+' '+y2+'L'+(x2-9)+' '+(y2+7)+'" fill="none" stroke="#3d8b63" stroke-width="3.5"/>';
function illustration(type,paperId){
let s="";
if(type==="cpu"){
s+=cell(34,90,144,74,"PC")+arrow(180,126,245,126)+cell(246,90,145,74,"MAR")+arrow(395,126,458,126)+cell(460,90,144,74,"MEMORY");
s+=cell(246,193,145,43,"MDR","#e8f0fa")+txt(326,44,"FETCH: IDENTIFY THE ROLES OF THE REGISTERS",18);
}else if(type==="binary"){
const weights=[128,64,32,16,8,4,2,1],bits=paperId==="120"?[1,0,1,1,0,1,1,0]:[1,1,0,0,1,0,1,0];s+=txt(320,45,"UNSIGNED EIGHT-BIT PLACE VALUES",19);
weights.forEach((v,i)=>{let x=25+i*76;s+=cell(x,75,68,57,v,"#e7f1fa")+cell(x,139,68,57,bits[i],"#f7f0dc");});
txt(320,238,"Add the weights that correspond to 1 bits",16);
}else if(type==="image"){
for(let r=0;r<5;r++)for(let c=0;c<8;c++){s+='<rect x="'+(29+c*49)+'" y="'+(60+r*36)+'" width="47" height="34" fill="'+(((r+c)%2)?"#d5eadb":"#a8d2c1")+'" stroke="#fff" stroke-width="2"/>';}
s+=txt(516,96,"Width × Height",18)+txt(516,139,"× Colour depth",18)+txt(516,186,"= Size in bits",18);
}else if(type==="search"||type==="algorithms"){
const a=type==="search"?[4,6,9,2]:[5,2,4,1],width=138;
a.forEach((v,i)=>{let x=20+i*154;s+=cell(x,96,width,88,v,i===2?"#fbefcf":"#e9f3ec")+txt(x+width/2,86,"index "+i,15)});
txt(320,232,type==="search"?"Follow each comparison using zero-based indexes":"Compare adjacent items left to right",17);
}else if(type==="table"){
const columns=["ID","Name","Mark"],rows=[["101","Ada","72"],["102","Ben","43"],["103","Mia","81"]];
columns.forEach((x,i)=>s+=cell(72+i*168,38,158,43,x,"#dae9f5"));
rows.forEach((r,j)=>r.forEach((v,i)=>s+=cell(72+i*168,89+j*49,158,44,v)));
}else if(type==="trace"||type==="code"){
const top=paperId==="120"?["i","i × 2","total","output"]:["index","input","total","count"];
top.forEach((v,i)=>s+=cell(27+i*151,49,140,41,v,"#e0ecf7"));
for(let r=0;r<3;r++)for(let c=0;c<4;c++)s+=cell(27+c*151,99+r*50,140,43,c===0?(paperId==="120"?r+1:r):c===1?(paperId==="120"?(r+1)*2:[3,6,2][r]):"?","#fff");
}else if(type==="validation"){
s+=cell(29,106,156,78,"INPUT")+arrow(188,144,254,144);
s+='<path d="M367 61 L497 144 L367 225 L242 144Z" fill="#fbefce" stroke="#b68b38" stroke-width="3"/>'+txt(367,149,"VALID?",22);
s+=arrow(503,142,601,142)+txt(548,118,"YES",14)+txt(367,255,"NO → TRY AGAIN",15);
}else if(type==="network"){
const vals=["LAPTOP","SWITCH","ROUTER","SERVER"];
vals.forEach((v,i)=>{const x=17+i*156;s+=cell(x,95,146,82,v,"#e5eff9");if(i<3)s+=arrow(x+147,135,x+156,135);});
txt(320,228,"Identify which device forwards between networks",17);
}else if(type==="storage"){
s+=cell(40,82,244,111,"SSD","#e9f5ed")+cell(350,82,244,111,"HDD","#e4eff9");
txt(320,235,"Compare storage options for the scenario",17);
}else if(type==="systems"){
s+=cell(222,27,194,60,"OPERATING SYSTEM","#fbeed0");
[["FILES",32,154],["MEMORY",232,154],["PROCESSES",432,154]].forEach(x=>s+=cell(x[1],x[2],172,75,x[0]));
}else if(type==="essay"){
s+=cell(22,86,185,95,"BENEFIT","#e6f3e9")+cell(228,86,185,95,"RISK","#fff0e3")+cell(434,86,185,95,"PRECAUTION","#e4eff9");txt(320,233,"Construct a balanced judgement linked to the scenario",16);
}
return s?svg(s,"Question source diagram — "+type):"";
}
function addTable(container,d){const outer=add(container,"div","table-shell");const table=add(outer,"table");const header=add(table,"thead"),tr=add(header,"tr");d.columns.forEach(x=>add(tr,"th","",x));const tbody=add(table,"tbody");d.rows.forEach(r=>{let row=add(tbody,"tr");r.forEach(v=>add(row,"td","",v))});}
function header(p){
document.title=(scheme?"Mark scheme · ":"Question paper · ")+p.title+" · Year 11 J277";
const top=add(root,"div","toolbar");add(top,"strong","",scheme?"TEACHER MARK SCHEME":"STUDENT QUESTION PAPER");
const back=add(top,"a","","← Lesson "+id);back.href="index.html";
const print=add(top,"button","","Print / save as PDF");print.type="button";print.onclick=()=>window.print();
const page=add(root,"main","page");add(page,"div","eyebrow","RHSC · Year 11 · OCR J277 · Original school assessment");
add(page,"h1","",scheme?p.title+" · Mark scheme":p.title);
add(page,"p","subtitle",p.subtitle);
const metas=add(page,"div","paper-meta");add(metas,"span","chip",p.minutes+" minutes");add(metas,"span","chip",p.marks+" marks");add(metas,"span","chip",scheme?"Teacher copy":"Answer every question");
if(scheme){
 add(page,"p","scheme-lead","Award marks only for accurate, relevant content. Alternative valid responses may earn credit where equivalent. For the 8-mark extended response, use the level descriptors and indicative points together.");
}else{
 const labels=add(page,"div","student-box");add(labels,"div","","Candidate name: __________________");add(labels,"div","","Class: __________________");
 const ins=add(page,"div","instructions");add(ins,"strong","","Instructions");const ul=add(ins,"ul");p.instructions.forEach(x=>add(ul,"li","",x));
}
add(page,"p","warning",p.notes);
return page;
}
function makeQuestionPaper(page,p){
let datasetShown=false;
for(const sec of p.sections){
 const hd=add(page,"div","section-title");add(hd,"h2","",sec.title);add(hd,"span","section-marks",sec.marks+" marks");
 for(const q of sec.questions){
  const wrap=add(page,"section","question");const head=add(wrap,"div","q-heading"),label=add(head,"div");add(label,"h3","","Question "+q.id);add(label,"div","topic",q.topic);
  add(head,"span","q-total",q.parts.reduce((a,b)=>a+b.marks,0)+" marks");
  if(q.visual&&["cpu","binary","image","search","table","trace","validation","network","algorithms"].includes(q.visual)){
   // Show source data, but never reveal an answer.
   if(q.visual==="table"&&p.dataset){addTable(wrap,p.dataset);datasetShown=true;}
   else{const d=add(wrap,"div","diagram");d.innerHTML=illustration(q.visual,p.id);}
  }
  for(const part of q.parts){
   const card=add(wrap,"div","subq"),top=add(card,"div","subq-head");
   add(top,"b","",part.label);add(top,"div","",part.prompt);add(top,"span","marks","["+part.marks+"]");
   if(part.code)add(card,"pre","",part.code);
   const lines=add(card,"div","answer-lines");
   const count=part.marks>=8?11:part.marks>=4?Math.max(5,part.marks+1):Math.max(3,part.marks+1);
   for(let i=0;i<count;i++)add(lines,"div","answer-line");
  }
 }
}
if(!datasetShown&&p.dataset){
 // Nothing else is required here; the paper's schema still contains only questions and source data.
}
add(page,"p","footer","End of question paper · Check your answers and working.");
}
function makeScheme(page,p){
 for(const sec of p.sections){
  const hd=add(page,"div","section-title");add(hd,"h2","",sec.title);add(hd,"span","section-marks",sec.marks+" marks");
  for(const q of sec.questions){
   const wrap=add(page,"section","scheme-question");add(wrap,"h3","","Question "+q.id+" · "+q.topic);
   for(const part of q.parts){
    const card=add(wrap,"div","scheme-sub");add(card,"b","",part.label+" · "+part.marks+" marks");
    add(card,"p","",part.prompt);if(part.code)add(card,"pre","",part.code);
    const table=add(card,"table","scheme-points"),h=add(table,"thead"),tr=add(h,"tr");add(tr,"th","","Acceptable point / working");add(tr,"th","","Marks");
    const body=add(table,"tbody");for(const mp of part.markPoints){const row=add(body,"tr");add(row,"td","",mp.text);add(row,"td","",mp.marks);}
    if(part.marks===8&&p.essayLevels){const l=add(card,"table","scheme-points essay-grid");
      for(const band of p.essayLevels){const row=add(l,"tr");add(row,"td","",band.range);add(row,"td","",band.descriptor);}
      add(card,"p","warning","Extended-response points are indicative; use the holistic level descriptors rather than mechanically awarding one mark for each bullet.");
    }
   }
  }
 }
 add(page,"p","footer","Teacher mark scheme · Separate from the pupil question paper.");
}
fetch("../assessment-"+id+(scheme?"-scheme":"")+".json",{cache:"no-store"}).then(r=>{if(!r.ok)throw Error("Assessment not found");return r.json()}).then(p=>{
  const page=header(p);if(scheme)makeScheme(page,p);else makeQuestionPaper(page,p);
}).catch(err=>{root.replaceChildren();add(root,"p","warning","Cannot load assessment: "+err.message)});
})();
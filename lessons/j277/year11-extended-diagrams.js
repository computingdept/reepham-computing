(function(){
"use strict";
/* Year 11 J277: diagrams derived from the lesson problem, never Do Now. */
const earlier=window.J277Y11Diagram;
const E=v=>String(v??"").replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
const K={dark:"#184a3c",blue:"#2c78ab",mint:"#e1f3e7",sky:"#e4f0fb",amber:"#fcebc7",red:"#ffe5e0",light:"#f6faf7",grey:"#e8edeb",line:"#8cb7a1"};
const box=(x,y,w,h,fill=K.light,border=K.line)=>'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="9" stroke="'+border+'" stroke-width="2" fill="'+fill+'"/>';
const text=(x,y,v,z=18,anchor="middle",col=K.dark,weight=700)=>'<text x="'+x+'" y="'+y+'" fill="'+col+'" font-family="Arial, sans-serif" font-size="'+z+'" font-weight="'+weight+'" text-anchor="'+anchor+'">'+E(v)+'</text>';
const arrow=(a,b,x,y,color=K.blue)=>'<path d="M'+a+' '+b+' L'+x+' '+y+' M'+(x-8)+' '+(y-7)+' L'+x+' '+y+' L'+(x-8)+' '+(y+7)+'" stroke="'+color+'" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>';
function label(x,y,w,h,value,fill=K.sky,size=18){return box(x,y,w,h,fill)+text(x+w/2,y+h/2+size*.33,value,size)}
function small(x,y,value){return text(x,y,value,15,"start","#59786a",700)}
function lines(x,y,arr,font=17,color=K.dark){return arr.map((l,i)=>text(x,y+i*30,l,font,"start",color)).join("")}
function table(stage,scenario,asQuery=false){
 const rows=[["101","Ada","72"],["102","Ben","43"],["103","Mia","81"]],heads=["ID","Name","Mark"];
 const selectedRow=scenario==="guided"?2:0,selectedCol=1;
 let h=small(23,71,"PUPILS · FIELD INDEX")+small(20,105,"Row");
 const posX=[130,290,450],colW=154;
 for(let c=0;c<3;c++){
   let fill=stage>=2&&selectedCol===c&&!asQuery?K.amber:K.sky;
   h+=label(posX[c],80,colW,46,heads[c],fill,19);
   h+=text(posX[c]+77,143,"col "+c,13,"middle","#62796e");
 }
 rows.forEach((r,i)=>{
  const y=151+i*57;h+=label(21,y,98,50,"row "+i,stage>=1&&!asQuery&&selectedRow===i?K.amber:K.grey,15);
  for(let j=0;j<3;j++){
   const isSelected=!asQuery&&stage>=3&&selectedRow===i&&selectedCol===j;
   const match=asQuery&&(scenario==="guided"?Number(r[2])<50:Number(r[2])>=50);
   const color=isSelected?K.amber:asQuery&&stage>=2&&match?K.mint:asQuery&&stage>=2&&!match?K.grey:stage>=2&&j===selectedCol&&!asQuery?K.mint:K.light;
   h+=label(posX[j],y,colW,50,r[j],color,21);
  }
 });
 if(asQuery){
  const field=scenario==="guided"?"ID":"Name",limit=scenario==="guided"?"Mark < 50":"Mark >= 50";
  const parts=["SELECT "+field,"FROM Pupils","WHERE "+limit];
  for(let k=0;k<3;k++)h+=label(31+k*205,318,190,44,parts[k],k<=Math.min(stage,2)?K.mint:K.grey,k===2?16:17);if(stage===3)h+=text(320,378,"Query result: "+(scenario==="guided"?"102":"Ada, Mia"),17,"middle",K.dark,850);
 }else if(stage>=3){h+=label(152,337,345,37,scenario==="guided"?'pupils[2,1] = "Mia"':'pupils[0,1] = "Ada"',K.mint,17);}
 return h;
}
function file(stage,mode,phase){
 const header="ID,Name,Mark",entries=["101,Ada,72","102,Ben,43","103,Mia,81"];
 let h=label(25,73,218,49,mode==="guided"?"results.txt":"pupils.csv",K.sky,21);
 if(mode==="guided"){
   h+=small(29,146,"WRITE MODE");
   h+=label(32,167,233,48,'writeLine("Ada,72")',stage>=1?K.mint:K.grey,17);
   h+=label(32,230,233,48,'writeLine("Mia,81")',stage>=2?K.mint:K.grey,17);
   h+=label(32,294,233,46,"close()",stage>=3?K.amber:K.grey);
   h+=arrow(280,209,325,209);
   h+=label(333,149,269,48,"Ada,72",stage>=1?K.mint:K.grey);
   h+=label(333,212,269,48,"Mia,81",stage>=2?K.mint:K.grey);
   return h;
 }
 const rows=[header,...entries];
 h+=small(29,148,"FILE CONTENTS");
 for(let i=0;i<4;i++){
   const y=166+i*49,active=stage===1&&i===0||stage===2&&i===1||stage===3&&i===2;
   h+=label(25,y,301,43,rows[i],active?K.amber:i<=stage?K.mint:K.light,18);
   h+=small(331,y+27,"line "+(i+1));
 }
 h+=arrow(383,234,410,234);
 h+=label(418,159,186,55,stage===0?"open file":stage===1?"read header":stage===2?"read first":phase==="i-do"?"close()":"read next",K.sky,19);
 h+=label(418,229,186,72,stage===1?header:stage>=2?(phase==="i-do"?entries[0]:stage===3?entries[1]:entries[0]):"file handle",K.amber,stage<2?16:15);
 return h;
}
function equivalent(stage,mode){
 const condition=mode==="guided"?"Mark < 60":"Mark >= 50",keep=mode==="guided"?["Ben"]:["Ada","Mia"];
 let h=label(22,80,278,53,"SQL · SELECT Name",K.sky,19)+label(335,80,278,53,"CODE · print(names[i])",K.sky,18);
 h+=small(24,163,"WHERE "+condition)+small(338,163,"IF marks[i] "+(mode==="guided"?"< 60":">= 50"));
 ["Ada · 72","Ben · 43","Mia · 81"].forEach((r,i)=>{
   const name=r.split(" · ")[0],passed=keep.includes(name);
   const fill=stage>=2?(passed?K.mint:K.grey):K.light;
   h+=label(24,185+i*49,275,43,r,fill);
   h+=label(339,185+i*49,275,43,stage>=2?(passed?"PRINT "+name:"SKIP"):"test marks["+i+"]",fill,16);
 });
 if(stage>=3){h+=label(132,341,377,40,"Result: "+keep.join(", "),K.amber,17);}
 return h;
}

/* Subject-specific diagrams for high-value OCR J277 visual reasoning. */
function subjectScene(spec,stage){
 const title=String(spec.topic||""),mode=String(spec.scenario||"model"),learn=String(spec.phase||"").includes("new-learning");
 if(/Boolean Logic: AND, OR and NOT/.test(title)){
  const gate=learn?(stage===1?"OR":stage===2?"NOT":"AND"):(mode==="guided"?"OR":"AND");
  let h=small(24,78,"LOGIC GATE · "+gate+" · evaluate each input pair");
  h+=label(24,138,85,46,"A",K.sky,21)+arrow(109,161,271,161);
  if(gate!=="NOT"){h+=label(24,222,85,46,"B",K.sky,21)+arrow(109,245,271,245);}
  if(gate==="AND"){
   h+='<path d="M270 130 H328 A73 73 0 0 1 328 276 H270Z" fill="'+K.amber+'" stroke="#b18738" stroke-width="3"/>';
  }else if(gate==="OR"){
   h+='<path d="M270 130 Q332 202 270 276 Q362 284 421 203 Q362 122 270 130Z" fill="'+K.amber+'" stroke="#b18738" stroke-width="3"/>';
  }else{
   h+='<path d="M279 140 L409 203 L279 266Z" fill="'+K.amber+'" stroke="#b18738" stroke-width="3"/><circle cx="421" cy="203" r="11" fill="white" stroke="#b18738" stroke-width="3"/>';
  }
  h+=arrow(435,203,485,203);
  h+=label(491,171,119,67,stage>=3?(gate==="AND"?"0":gate==="OR"?"1":"0"):"?",stage>=3?K.mint:K.grey,25);
  h+=small(53,319,gate==="NOT"?"Input example: A = 1":"Input example: A = 1, B = 0");
  h+=small(53,349,gate==="NOT"?"NOT acts on one input; output is inverted":gate==="AND"?"AND only gives 1 when both inputs are 1":"OR gives 1 when one or both inputs are 1");
  return h;
 }
 if(/Truth Tables and Combined Logic/.test(title)){
  const guided=mode==="guided",formula=guided?"(A OR B) AND C":"(A AND B) OR C";
  let h=small(29,74,"Q = "+formula);
  const cols=[["A",40],["B",129],["C",218],["X",341],["Q",482]];
  cols.forEach(([name,x])=>{h+=label(x,84,name==="Q"?115:96,32,name,K.sky,17)});
  for(let i=0;i<8;i++){
   const a=(i>>2)&1,b=(i>>1)&1,c=i&1,x=guided?(a||b)?1:0:(a&&b)?1:0,q=guided?(x&&c)?1:0:(x||c)?1:0;
   const y=121+i*31;
   const values=[a,b,c,stage>=1?x:"?",stage>=3||stage===2&&i<4?q:"?"];
   values.forEach((v,j)=>{const pos=cols[j][1],ww=j===4?115:96;h+=label(pos,y,ww,28,v,j===3&&stage>=1?K.amber:j===4&&v!=="?"?K.mint:K.light,16)});
  }
  return h;
 }
 if(/Network Hardware and Topologies/.test(title)){
  let h=small(23,81,"STAR · one central connection point")+small(334,81,"MESH · multiple connections");
  const pts=[[91,139],[207,139],[90,276],[208,276]];
  pts.forEach(([x,y],i)=>{h+='<circle cx="'+x+'" cy="'+y+'" r="26" fill="'+K.sky+'" stroke="'+K.blue+'" stroke-width="3"/>'+text(x,y+7,"PC"+(i+1),14);});
  h+=label(122,181,56,55,"SW",K.mint,16);
  const c=[150,208];pts.forEach(p=>{h+='<path d="M'+c[0]+' '+c[1]+'L'+p[0]+' '+p[1]+'" stroke="'+K.blue+'" stroke-width="3"/>';});
  const mp=[[383,143],[541,143],[383,277],[541,277]];
  const edges=[[0,1],[1,3],[3,2],[2,0],[0,3],[1,2]];
  edges.forEach(([i,j],idx)=>{if(stage>=1||idx<4){h+='<path d="M'+mp[i][0]+' '+mp[i][1]+'L'+mp[j][0]+' '+mp[j][1]+'" stroke="'+(idx>=4?K.blue:K.line)+'" stroke-width="3"/>';}});
  mp.forEach((p,i)=>{h+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="27" fill="'+K.mint+'" stroke="'+K.blue+'" stroke-width="3"/>'+text(p[0],p[1]+6,String(i+1),20)});
  h+=small(30,348,"Star: central device failure matters")+small(337,348,"Mesh: alternative paths; more links");
  return h;
 }
 if(/LANs, WANs and Network Models/.test(title)){
  let h=small(26,84,"LOCAL NETWORK · OFFICE 1")+small(389,84,"LOCAL NETWORK · OFFICE 2");
  h+=label(25,111,227,183,"LAN A",K.sky,28)+label(386,111,227,183,"LAN B",K.sky,28);
  [65,135,203].forEach((x,i)=>{h+=label(x,216,54,42,"PC",K.mint,14);h+=label(420+i*64,216,54,42,"PC",K.mint,14);});
  h+=label(261,162,115,70,"WAN",stage>=1?K.amber:K.grey,22);
  h+=arrow(255,195,261,195)+arrow(376,195,389,195);
  h+=small(67,329,"LAN = limited area")+small(385,329,"WAN links distant LANs");
  return h;
 }
 if(/Network Protocols and Layers/.test(title)){
  const vals=["DOMAIN NAME","DNS LOOKUP","IP ADDRESS","WEB SERVER"];
  let h=small(24,83,"BROWSER REQUEST · HOW A WEB ADDRESS IS RESOLVED");
  vals.forEach((w,i)=>{h+=label(17+i*157,150,147,91,w,i===stage?K.amber:i<stage?K.mint:K.sky,w.length>10?15:19);if(i<3)h+=arrow(163+i*157,195,173+i*157,195);});
  h+=small(47,287,"DNS converts a domain name to an IP address");
  h+=small(47,318,"HTTPS governs encrypted web communication");
  return h;
 }
 if(/Network Performance/.test(title)){
  const sz=mode==="guided"?60:24,rate=mode==="guided"?12:8,time=sz/rate;
  let h=label(24,102,178,82,sz+" Mb",K.sky,29)+arrow(209,148,266,148)+label(267,102,179,82,rate+" Mb/s",K.mint,24)+arrow(452,148,493,148)+label(493,102,126,82,stage>=3?time+" s":"?",K.amber,29);
  h+=small(46,239,"time = file size ÷ data rate");
  if(stage>=2)h+=label(139,266,361,70,sz+" ÷ "+rate+" = "+(stage===3?time+" seconds":"?"),stage===3?K.mint:K.grey,24);
  h+=small(48,367,"Idealised transfer: protocol overhead and latency not included");
  return h;
 }
 if(/Network Threats|Preventing Network Attacks/.test(title)){
  const defense=/Preventing/.test(title);
  const w=defense?["REQUEST","FIREWALL","AUTH + MFA","RESOURCE"]:["PHISHING","USER","PASSWORD","ACCOUNT"];
  let h=small(22,89,defense?"DEFENCE IN DEPTH · protect each boundary":"ATTACK PATH · locate where controls could help");
  w.forEach((v,i)=>{h+=label(20+i*154,155,139,91,v,i===stage?K.amber:i<stage?K.mint:K.sky,v.length>10?16:20);if(i<3)h+=arrow(160+i*154,198,174+i*154,198);});
  h+=small(32,314,defense?"Encryption protects confidentiality; backups protect recovery":"A suspicious message may try to steal credentials");
  return h;
 }
 if(/Operating Systems/.test(title)){
  let h=label(230,110,175,79,"OS",K.amber,35);
  const labs=[["PROCESS",24,84],["MEMORY",442,84],["FILES",24,262],["DEVICES",442,262]];
  labs.forEach(([name,x,y],i)=>{h+=label(x,y,167,60,name,i===stage?K.amber:K.sky,21);h+='<path d="M'+(x<200?x+167:x)+' '+(y+30)+'L'+(x<200?232:403)+' '+(y<180?139:159)+'" stroke="'+K.blue+'" stroke-width="3" fill="none"/>';});
  h+=small(190,356,"Scheduling · Allocation · Access · Interfaces");
  return h;
 }
 if(/Utility Software/.test(title)){
  let h=small(31,90,"FRAGMENTED HDD FILE · FILE BLOCKS SPREAD OUT");
  const seq=["A","B","A","C","B","A","C","B"];
  seq.forEach((v,i)=>h+=label(28+i*75,122,67,55,v,v==="A"?K.amber:K.sky,24));
  h+=arrow(317,191,317,241);
  const sorted=["A","A","A","B","B","B","C","C"];
  sorted.forEach((v,i)=>h+=label(28+i*75,261,67,55,stage>=2?v:seq[i],stage>=2?K.mint:K.grey,24));
  h+=small(56,354,"Defragmentation is for spinning HDDs; avoid routine SSD defragmentation.");
  return h;
 }
 if(/CPU Performance and Embedded Systems/.test(title)){
  let h=small(25,83,"CPU PERFORMANCE · HOW HARDWARE CAN AFFECT EXECUTION");
  const vals=[["CLOCK SPEED","3 GHz vs 2 GHz"],["CORES","4 vs 2"],["CACHE","faster access"],["EMBEDDED","dedicated task"]];
  vals.forEach(([head,detail],i)=>{const x=20+i*156;h+=label(x,133,144,71,head,i===stage?K.amber:K.sky,18);h+=label(x,210,144,69,detail,i===stage?K.mint:K.grey,detail.length>13?15:18);});
  h+=small(41,332,"Comparisons depend on workload; embedded computers serve a specific purpose.");
  return h;
 }
 if(/Paper 1: Data Representation/.test(title)){
  let h=small(27,85,"REPRESENTATION · KEEP VALUE AND UNIT VISIBLE");
  const bits=["128","64","32","16","8","4","2","1"];
  bits.forEach((bit,i)=>{h+=label(18+i*77,123,70,69,bit,i<=stage?K.amber:K.sky,20);});
  h+=label(28,230,276,61,"1011   0110 → B6",stage>=2?K.mint:K.grey,20);
  h+=label(326,230,280,61,"pixels × bits/pixel",stage>=2?K.mint:K.grey,18);
  h+=small(38,336,"Binary place values, hexadecimal groups and image-size units are distinct steps.");
  return h;
 }
 if(/Paper 1: Calculations and Extended Answers/.test(title)){
  const vals=mode==="guided"?["8000 Hz","5 s","8 bits","320,000 bits"]:["120 px","80 px","4 bpp","38,400 bits"];
  let h=small(26,90,"SET UP THE RIGHT FORMULA AND SHOW UNITS");
  vals.forEach((t,i)=>{h+=label(23+i*154,163,145,87,i<=stage?t:"?",i===stage?K.amber:i<stage?K.mint:K.sky,t.length>12?17:20);if(i<3)h+=arrow(169+i*154,205,177+i*154,205);});
  h+=small(40,328,"Size in bytes requires dividing the calculated bits by eight.");
  return h;
 }
  if(/Programming Languages and Translators/.test(title)){
  let h=small(29,85,"SOURCE CODE · TWO TRANSLATION APPROACHES");
  h+=label(31,148,160,78,"SOURCE",K.sky,23)+arrow(191,185,241,185);
  h+=label(241,101,169,66,"COMPILER",stage>=1?K.amber:K.grey,20);
  h+=label(241,217,169,66,"INTERPRETER",stage>=2?K.amber:K.grey,19);
  h+=arrow(413,136,461,136)+arrow(413,250,461,250);
  h+=label(465,103,145,64,"OUTPUT",K.mint,18)+label(465,217,145,64,"EXECUTE",K.mint,18);
  h+=small(47,350,"The CPU ultimately executes machine instructions.");
  return h;
 }
 if(/Integrated Development Environments/.test(title)){
  let h=box(25,85,592,276,K.light,K.line)+label(29,88,585,39,"EDITOR  •  DEBUGGER  •  OUTPUT",K.sky,17);
  const source=["counter = 3","counter = counter + 2","print(counter)"];
  source.forEach((v,i)=>h+=label(42,145+i*53,340,45,(i+1)+": "+v,i===stage-1?K.amber:K.grey,16));
  h+=label(404,145,194,46,"WATCH",K.mint,18);
  h+=label(404,200,194,48,"counter = "+(stage>=2?"5":"3"),K.amber,18);
  h+=label(404,265,194,46,stage>=3?"OUTPUT: 5":"OUTPUT: ?",K.light,17);
  return h;
 }
 return "";
}


function matchedLessonScene(spec,stage){
 const title=String(spec.topic||""),mode=String(spec.scenario||"model"),guided=mode==="guided";
 const info=(heading,rows)=>{let h=small(25,78,heading.toUpperCase());rows.forEach((r,i)=>{const y=109+i*57,highlight=i===stage,visible=i<=stage;h+=label(27,y,183,48,r[0],highlight?K.amber:K.sky,17);h+=label(217,y,393,48,visible?r[1]:"Think: what comes next?",visible?K.mint:K.grey,r[1].length>36?15:18);});return h;};
 const trace=(heading,values,answers)=>{let h=small(25,76,heading.toUpperCase());values.forEach((v,i)=>{let x=23+i*(587/values.length),width=587/values.length-8;h+=label(x,116,width,77,String(v),i===stage?K.amber:K.sky,24);h+=label(x,215,width,55,i<=stage?String(answers[i]):"?",i===stage?K.mint:K.grey,20);});h+=small(41,321,"Top: input / index     Bottom: calculated or traced state");return h;};
 if(title==="Random Numbers and Combined Constructs")return info(guided?"DICE ROLL = 3 · WIN ONLY ON 6":"DICE ROLL = 6 · WIN IF ≥ 5",[
 ["INPUT",guided?"roll = 3":"roll = 6"],["CONDITION",guided?"3 == 6 ?":"6 >= 5 ?"],["BRANCH","TRUE → WIN    |    FALSE → TRY AGAIN"],["OUTPUT",guided?"Try again":"Win"]]);
 if(title==="Assessment Feedback and Corrections")return info(guided?"MISSING PREREQUISITE IN SEARCH ANSWER":"REPAIR THE VIRTUAL MEMORY EXPLANATION",[
 ["PUPIL ANSWER",guided?"Binary search is quicker":"Virtual memory makes RAM faster"],
 ["MISSING",guided?"List must be sorted":"Backing is secondary storage"],
 ["WHY IT MATTERS",guided?"Midpoint safely discards half":"Storage access is slower than RAM"],
 ["IMPROVED",guided?"Sorted array + halving range":"Paging can make computer slower"]]);
 if(title==="Defensive Design")return info(guided?"UNSAFE SQL TEXT INPUT":"LOGIN PROTECTION · DEFENSIVE DESIGN",[
 ["RISK",guided?"Raw user input in query":"Unlimited attempts + reveals password"],
 ["CONTROL 1",guided?"Use parameterised SQL":"Limit failed attempts"],
 ["CONTROL 2",guided?"Validate expected input":"Never display password"],
 ["TEST",guided?"Malicious input fails safely":"3 failures lock account"]]);
 if(title==="Debugging Syntax and Logic Errors")return info(guided?"OR MAKES AN INVALID MARK PASS":"SUM ALGORITHM · IDENTIFY THE FAULT",[
 ["EXPECTED",guided?"0 ≤ mark ≤ 100":"Accumulate each value"],
 ["FAULT",guided?"OR between comparisons":"total = total - value"],
 ["CORRECT",guided?"Use AND":"total = total + value"],
 ["TEST",guided?"-1 reject; 0 and 100 accept":"Input 2,4,6 → total = 12"]]);
 if(title==="Programming: Subprograms and Parameters")return info(guided?"PROCEDURE · PRINT GREETING":"FUNCTION · CUBE(3)",[
 ["CALL",guided?'printGreeting("Mia")':"cube(3)"],
 ["PARAMETER",guided?'name = "Mia"':"n = 3"],
 ["ACTION",guided?'print("Hello " + name)':"return 3 × 3 × 3"],
 ["OUTPUT",guided?"Hello Mia":"27"]]);
 if(title==="Programming: Unseen Problems and Debugging")return info(guided?"COUNT 1–5 · WRONG END BOUND":"TOTAL PRICE · INCORRECT OUTPUT",[
 ["INPUT",guided?"i starts at 1; expected end 5":"quantity=3 · unitPrice=4"],
 ["FAULT",guided?"Loop stops at 4":"print(unitPrice)"],
 ["CORRECTION",guided?"Include 5 in loop bound":"print(total)"],
 ["CHECK",guided?"1,2,3,4,5 all included":"3 × 4 = 12 printed"]]);
 if(title==="Mixed Paper 1 and Paper 2 Retrieval")return info(guided?"MONO SOUND FILE CALCULATION":"BITMAP FILE-SIZE CALCULATION",[
 ["DATA",guided?"8000 samples/s · 5s · 8-bit":"100 × 50 pixels · 1-bit"],
 ["QUANTITY",guided?"8000 × 5 = 40,000 samples":"100 × 50 = 5000 pixels"],
 ["BITS",guided?"40,000 × 8 = 320,000":"5000 × 1 = 5000"],
 ["BYTES",guided?"320,000 ÷ 8 = 40,000":"5000 ÷ 8 = 625"]]);
 if(title==="Ethical, Cultural and Environmental Impacts")return info(guided?"REPLACING PAPER LETTERS WITH APP":"PUPIL LOCATION-TRACKING APP",[
 ["BENEFIT",guided?"Faster distribution + less paper":"Safety when genuinely necessary"],
 ["RISK",guided?"Families without digital access":"Privacy and intrusive monitoring"],
 ["MITIGATION",guided?"Keep paper/phone alternative":"Limit access and retention"],
 ["JUDGEMENT",guided?"Accessible mixed methods":"Proportionate, transparent use"]]);
 if(title==="Legislation and Copyright")return info(guided?"UNAUTHORISED ACCOUNT ACCESS":"PAID SOFTWARE COPIED WITHOUT PERMISSION",[
 ["ACTION",guided?"Access someone else's account":"Install unlicensed copies"],
 ["LEGAL AREA",guided?"Computer Misuse Act":"Copyright + licence conditions"],
 ["KEY RULE",guided?"Permission is required":"Permission / valid licence needed"],
 ["RESPONSE",guided?"Deny access; follow policies":"Obtain appropriate licences"]]);
 if(title==="Assessment Feedback and Target Setting")return info(guided?"CORRECTING NETWORK ROUTER CLAIM":"CACHE EXPLANATION · MISSING MARKS",[
 ["WEAK ANSWER",guided?"Router sends all data everywhere":"Cache makes CPU faster"],
 ["NAME",guided?"Router connects networks":"Cache stores frequent data/instructions"],
 ["MECHANISM",guided?"Forwards packets by routes":"Faster access than RAM"],
 ["IMPROVE",guided?"Packet routed toward destination":"CPU spends less time waiting"]]);
 if(title==="Paper 1: Software, Impacts and Legislation")return info(guided?"UPLOADING COPYRIGHTED MEDIA":"SCHOOL CLOUD BACKUP",[
 ["SCENARIO",guided?"Distribution without permission":"Off-site records + restoration"],
 ["BENEFIT / RISK",guided?"Rights of creator affected":"Recovery benefit / dependency risk"],
 ["LEGAL / SECURITY",guided?"Check licence or exception":"Protect pupil data/access"],
 ["JUDGEMENT",guided?"Get licence / permission":"Encrypted, tested backups"]]);
 if(title==="Paper 1: Weakest Topics")return info(guided?"WAN IS NOT DEFINED AS WIRELESS":"CORRECT IMAGE-SIZE UNITS",[
 ["CLAIM",guided?"WAN always uses Wi-Fi":"10 × 20 at 8 bits/pixel"],
 ["WHAT IS WRONG",guided?"WAN describes geographic scope":"Bits mistaken for bytes"],
 ["CORRECT",guided?"Can use wired or wireless":"200 × 8 = 1600 bits"],
 ["FINAL",guided?"Wide-area network connects LANs":"1600 ÷ 8 = 200 bytes"]]);
 if(title==="Final Targeted Revision")return info(guided?"CORRECT RAM / ROM MISCONCEPTION":"RETEACH TWO MISSING CONCEPTS",[
 ["ERROR",guided?"ROM volatile; holds apps":"Virtual memory speeds RAM"],
 ["FIX 1",guided?"RAM volatile, runs apps":"Secondary storage backs pages"],
 ["FIX 2",guided?"ROM non-volatile firmware":"Paging slower than physical RAM"],
 ["TRANSFER",guided?"Test with shutdown scenario":"Binary search needs sorted data"]]);
 if(title==="Paper 1: CPU, Memory and Storage")return info(guided?"SSD FOR TRAVELLING WORKER":"CACHE AND REPEATED PROGRAM USE",[
 ["NEED",guided?"Portable, impact-resistant drive":"Frequently accessed instructions"],
 ["FEATURE",guided?"SSD has no moving parts":"Small fast CPU cache"],
 ["BENEFIT",guided?"Better shock resistance":"Fewer slower RAM fetches"],
 ["TRADE-OFF",guided?"Higher cost per GB possible":"Not every access hits cache"]]);
 if(title==="Paper 1: Networks and Security")return info(guided?"WI-FI SLOWER THAN WIRED":"PHISHING EMAIL TO SCHOOL STAFF",[
 ["OBSERVATION",guided?"Wired OK, Wi-Fi slow":"Unknown login link asks for password"],
 ["POSSIBLE CAUSE",guided?"Signal/interference/distance":"Attempt to steal credentials"],
 ["CHECK / DEFEND",guided?"Compare signal and congestion":"Verify through official channel"],
 ["CONCLUSION",guided?"Wireless interference may matter":"Training + MFA reduce risk"]]);
 if(title==="Timed Paper 1 Practice")return info(guided?"COMPARE SSD AND HDD FOR TRAVEL":"80 × 50 BITMAP · 8 BITS/PIXEL",[
 ["DATA / NEED",guided?"Portable drive used while travelling":"80 × 50 = 4000 pixels"],
 ["METHOD",guided?"Compare durability + access":"4000 × 8 = 32,000 bits"],
 ["TRADE-OFF",guided?"SSD: no moving parts; costs more":"÷ 8 to convert bits"],
 ["ANSWER",guided?"Justify SSD vs HDD":"4000 bytes (4 kB decimal)"]]);
 if(title==="Timed Paper 2 Practice")return info(guided?"REPAIR OR VALIDATION CONDITION":"TRACE EVEN-COUNT LOOP",[
 ["INITIAL",guided?"Valid mark = 0 to 100":"count = 0; i = 1 to 5"],
 ["TEST",guided?"OR incorrectly accepts out-of-range":"i MOD 2 == 0"],
 ["UPDATE",guided?"Replace OR with AND":"Increment for i = 2,4"],
 ["RESULT",guided?"-1 fails; 0 and 100 pass":"count = 2"]]);
 if(title==="Paper 2: Unseen Code and Debugging")return info(guided?"FAILED ATTEMPTS · BOUNDARY ERROR":"SUM [2,4,6] · WRONG INITIAL VALUE",[
 ["START",guided?"3 failed login attempts":"total starts at 1"],
 ["FAULT",guided?"attempts > 3":"1+2+4+6 = 13"],
 ["FIX",guided?"attempts >= 3":"initialise total=0"],
 ["EXPECTED",guided?"3 attempts → Locked":"2+4+6 = 12"]]);
 if(title==="Paper 2: Programming Fundamentals")return info(guided?"COUNT PASSES IN FIVE MARKS":"FIND MINIMUM OF FOUR VALUES",[
 ["START",guided?"passCount = 0":"minimum = first input"],
 ["LOOP",guided?"Read five marks":"Read three more values"],
 ["TEST",guided?"mark >= 50":"value < minimum"],
 ["UPDATE",guided?"Increase passCount if true":"Replace minimum if smaller"]]);
 if(title==="Paper 2: Writing Code from a Scenario")return info(guided?"COUNT MARKS ≥ 50":"SUM THREE INPUT INTEGERS",[
 ["INITIALISE",guided?"passCount = 0":"total = 0"],
 ["ITERATE",guided?"Repeat 5 times":"Repeat 3 times"],
 ["OPERATE",guided?"If mark≥50, increment":"total = total + value"],
 ["OUTPUT",guided?"Print passCount after loop":"Print total after loop"]]);
 if(title==="Paper 1: Calculations and Extended Answers")return info(guided?"MONO SOUND · COMPUTE BITS":"IMAGE 120 × 80 · 4 BITS/PIXEL",[
 ["DATA",guided?"8000 Hz · 5 sec · 8-bit":"120 × 80 = 9600 pixels"],
 ["FORMULA",guided?"rate × time × depth":"pixels × bit depth"],
 ["BITS",guided?"8000 × 5 × 8 = 320,000":"9600 × 4 = 38,400"],
 ["BYTES",guided?"40,000 (if asked)":"4800"]]);
 if(title==="Final GCSE Computer Science Consolidation"){
  if(guided){return info("BINARY SEARCH FOR 18 IN [2,6,10,14,18]",[
   ["RANGE","low=0, high=4"],["MIDPOINT","mid=2 → 10 < 18"],["NEXT","low=3; mid=3 → 14 < 18"],["MATCH","low=4; mid=4 → 18 found"]]);}
  return info("20×20 BITMAP AT 8 BITS/PIXEL",[
   ["PIXELS","20×20 = 400 pixels"],["BITS","400×8 = 3200 bits"],["BYTES","3200÷8 = 400 bytes"],["NETWORK FACTOR","Bandwidth or latency affects upload"]]);
 }
 if(title==="Algorithms: Examination Techniques"){
  if(guided)return trace("BINARY SEARCH TARGET 14 IN SORTED [2,6,10,14,18,22,26]",["2","6","10","14","18","22","26"],["0","1","2","MID 14","4","5","6"]);
  return trace("LINEAR SEARCH FOR 9 IN [4,6,9,2]",[4,6,9,2],["miss","miss","FOUND","stop"]);
 }
 if(title==="Paper 2: Searching and Sorting"){
  if(guided){let h=small(29,75,"BINARY SEARCH · TARGET 17");const nums=[3,7,11,17,23];nums.forEach((v,i)=>{h+=label(25+i*124,139,115,80,v,stage>=2&&i===3?K.amber:stage===1&&i===2?K.mint:K.sky,29);h+=text(83+i*124,124,"index "+i,14)});h+=label(103,263,436,66,stage>=3?"Found: index 3":stage>=2?"low=3, mid=3":stage>=1?"mid=2 → value 11, go right":"low=0 high=4",K.mint,17);return h;}
  const vals=[6,1,4,2];for(let i=0;i<Math.min(stage,3);i++){if(vals[i]>vals[i+1]){let tmp=vals[i];vals[i]=vals[i+1];vals[i+1]=tmp;}}let h=small(27,76,"BUBBLE SORT · FIRST PASS [6,1,4,2]");vals.forEach((v,i)=>{h+=label(30+i*153,150,139,85,v,i===stage?K.amber:K.sky,27);h+=text(97+i*153,138,"index "+i,15)});h+=small(44,317,"Compare neighbouring elements, then swap when left > right");return h;
 }
 if(title==="Paper 2: Validation, Testing and Debugging")return info(guided?"FIX RANGE VALIDATION FOR 1–20":"TEST PLAN FOR 1–20 INCLUSIVE",[
 ["BOUNDARY",guided?"1 and 20 accepted":"1 and 20 accepted"],["INVALID",guided?"0 and 21 rejected":"0 and 21 rejected"],["ERROREOUS",guided?"Wrong type handled":"Text 'many' rejected"],["METHOD",guided?"Use >= 1 AND <= 20":"Normal 10 accepted"]]);
 return "";
}

function layout(spec,stage){
 const exact=matchedLessonScene(spec,stage);if(exact)return exact;
 const special=subjectScene(spec,stage);if(special)return special;
 const kind=String(spec.y11),scenario=String(spec.scenario||"model"),mode=String(spec.phase||"learning");
 if(kind==="table")return table(stage,scenario,false);
 if(kind==="sql")return table(stage,scenario,true);
 if(kind==="file")return file(stage,scenario,mode);
 if(kind==="filter")return equivalent(stage,scenario);
 if(kind==="arrays"){
  const values=scenario==="guided"?[2,7,9,4]:[3,5,2,4];let total=0;
  let h=small(31,81,"ARRAY VALUES · ZERO-BASED INDEX");
  values.forEach((v,i)=>{const fill=i<=stage?K.mint:K.sky;h+=label(35+i*147,128,132,84,v,fill,27);h+=text(100+i*147,115,"index "+i,14)});
  for(let i=0;i<=Math.min(stage,3);i++)total+=values[i];
  h+=label(140,264,365,66,"Running total = "+total,K.amber,22);
  h+=small(57,359,"Follow the loop: one element each pass");
  return h;
 }
 if(kind==="string"){
  const a=scenario==="guided"?["BK","204"]:["Sam",".","Lee"];
  let h=small(25,88,"STRING VALUES");
  a.forEach((v,i)=>{h+=label(26+i*206,118,185,74,v,i<=stage?K.mint:K.sky,27);if(i<2)h+=text(219+i*206,164,"+",29);});
  h+=arrow(320,203,320,248);
  if(stage>=3)h+=label(137,256,360,75,a.join(""),K.amber,28);
  else h+=label(137,256,360,75,"Join the characters",K.grey,21);
  return h;
 }
 if(kind==="function"){
  let inp=scenario==="guided"?"9":"7",func=scenario==="guided"?"addTax(price)":"double(x)",out=scenario==="guided"?"11":"14";
  let h=label(18,139,151,82,inp,K.sky,27)+arrow(169,180,207,180)+label(210,120,218,121,func,K.mint,20)+arrow(428,180,471,180);
  h+=label(474,139,142,82,stage>=3?out:"?",stage>=3?K.amber:K.grey,27);
  h+=small(220,267,scenario==="guided"?"return price + 2":"return x * 2");
  return h;
 }
 if(kind==="condition"){
  const input=scenario==="guided"?"age = 13":"mark = 101",test=scenario==="guided"?"13 ≤ age ≤ 18":"0 ≤ mark ≤ 100";
  let h=label(27,87,189,69,input,K.sky,21)+arrow(218,121,258,121);
  h+='<path d="M381 73 L505 149 L381 224 L258 149Z" stroke="#c29643" stroke-width="3" fill="'+K.amber+'"/>'+text(380,150,"Valid?",22);
  h+=small(345,247,test);
  if(stage>=2){h+=arrow(506,150,556,150)+text(560,127,"YES",14);h+=arrow(380,226,380,287)+text(408,278,"NO",14);}
  if(stage>=3)h+=label(252,299,251,52,scenario==="guided"?"Accept age":"Try again",K.mint,19);
  return h;
 }
 if(kind==="test"){
  const cols=[["Type","Input","Expected"],["Normal","50","Accept"],["Boundary","0 / 100","Accept"],["Invalid","101","Reject"],["Erroneous","cat","Reject"]];
  let h="";
  cols.forEach((row,i)=>{const yy=77+i*58;row.forEach((v,j)=>{const xx=19+j*204;h+=label(xx,yy,198,51,stage>=i-1&&i>0?v:j===2&&i>stage+1?"?":v,i===0?K.sky:i===stage+1?K.amber:i<=stage+1?K.mint:K.grey,j===1?16:18);});});
  return h;
 }
 if(kind==="cpu"){
  let h=label(33,151,133,84,"PC",K.sky,27)+arrow(166,195,210,195)+label(212,151,127,84,"MAR",K.amber,24)+arrow(339,195,378,195)+label(381,151,227,84,stage>=2?"MDR / instruction":"MEMORY",K.mint,19);
  h+=small(45,101,"Address of next instruction");
  h+=small(215,272,"Address sent to memory");h+=small(389,290,"Data/instruction returned");
  return h;
 }
 if(kind==="network"){
  let h=label(21,153,161,87,"PC + NIC",K.sky,23)+arrow(184,197,228,197)+label(231,153,163,87,["SWITCH","SERVER","ROUTER","DNS"][Math.min(stage,3)],K.mint,22)+arrow(396,197,438,197)+label(440,153,178,87,"Destination",K.sky,19);
  h+=small(31,102,"Follow the selected connection / device role");return h;
 }
 if(kind==="boolean"){
  let h=label(30,125,135,61,"A",K.sky,26)+label(30,212,135,61,"B",K.sky,26);
  h+=arrow(168,154,273,175)+arrow(168,242,273,205);
  h+=label(272,155,156,91,stage%2===0?"AND":"OR",K.amber,28);
  h+=arrow(428,197,487,197)+label(490,163,116,72,stage>=3?"Q":"?",K.mint,28);
  return h;
 }
 if(kind==="storage"){
  let h=label(30,126,178,102,"SSD",K.sky,28)+label(231,126,178,102,"HDD",K.mint,28)+label(430,126,178,102,"Optical",K.amber,23);
  h+=small(38,275,"Compare speed, cost, capacity and portability");return h;
 }
 if(kind==="sorting"){
  const values=(scenario==="guided"?[4,1,3,2]:[6,1,4,2]).slice();
  for(let i=0;i<Math.min(stage,3);i++){if(values[i]>values[i+1]){const t=values[i];values[i]=values[i+1];values[i+1]=t;}}
  let h=small(27,111,"ADJACENT COMPARISONS · ONE PASS");
  values.forEach((v,i)=>{h+=label(38+i*146,155,127,87,v,i===stage||i===stage+1?K.amber:K.mint,30);h+=text(101+i*146,143,"index "+i,14);});
  h+=small(40,283,"The largest value moves to the right across a full pass");return h;
 }
 const captions={
  selection:["INPUT","CONDITION","BRANCH","OUTPUT"],pipeline:["INPUT","PROCESS","CHECK","OUTPUT"],counter:["START 0","ITERATE","UPDATE","RESULT"],security:["THREAT","CONTROL","TEST","OUTCOME"],impact:["STAKEHOLDER","BENEFIT","RISK","JUDGEMENT"],calculation:["GIVEN","FORMULA","SUBSTITUTE","ANSWER"]
 };
 const words=captions[kind]||captions.pipeline,parts=spec.values?.slice(0,4)||[];
 let h=small(29,106,"FOLLOW THE METHOD · "+(spec.topic||"KEY STEPS").toUpperCase().slice(0,44));
 for(let i=0;i<4;i++){h+=label(23+i*154,154,142,92,words[i],i===stage?K.amber:i<stage?K.mint:K.sky,17);if(i<3)h+=arrow(165+i*154,201,177+i*154,201);}
 if(parts.length)h+=small(34,301,parts.join(" · ").slice(0,72));
 return h;
}
window.J277Y11Diagram=function(spec){
 if(!spec||!spec.y11||!(spec.year11Extension||spec.y11Version===2))return earlier?earlier(spec):"";
 const stage=Math.max(0,Math.min(3,Number(spec.focus)||0));
 const header=String(spec.title||spec.topic||"J277 VISUAL MODEL"),body=layout(spec,stage);
 const labelText=String(spec.caption||"Model the question, then reveal the method");
 return '<figure class="a1-scene y11-scene" role="group" aria-label="'+E(header)+'"><svg viewBox="0 0 640 404" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="'+E(header)+'">'+box(1,1,638,402,"#fcfefc","#c7d9cc")+text(23,38,header.slice(0,52),21,"start")+text(615,39,stage===3?"CHECK":("STEP "+(stage+1)),14,"end","#247552")+body+text(320,394,labelText.slice(0,84),14,"middle","#537268")+'</svg></figure>';
};
})();
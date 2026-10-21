(function buildAutumn1Module(){
 "use strict";
 const PMT={
  qp12:"https://pmt.physicsandmathstutor.com/download/Computer-Science/GCSE/Topic-Qs/OCR/1-Computer-systems/Set-A/1.2%20Memory%20and%20Storage%20QP.pdf",
  ms12:"https://pmt.physicsandmathstutor.com/download/Computer-Science/GCSE/Topic-Qs/OCR/1-Computer-systems/Set-A/1.2%20Memory%20and%20Storage%20MS.pdf",
  qp11:"https://pmt.physicsandmathstutor.com/download/Computer-Science/GCSE/Topic-Qs/OCR/1-Computer-systems/Set-A/1.1%20Systems%20Architecture%20QP.pdf",
  ms11:"https://pmt.physicsandmathstutor.com/download/Computer-Science/GCSE/Topic-Qs/OCR/1-Computer-systems/Set-A/1.1%20Systems%20Architecture%20MS.pdf"
 };
 const escape=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
 function svgScene(label,contents){
  return `<figure class="a1-scene"><svg viewBox="0 0 560 232" role="img" aria-label="${escape(label)}" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="554" height="226" rx="14" fill="#f7fbf8" stroke="#bfd5c7" stroke-width="2"/>${contents}</svg></figure>`;
 }
 const pill=(x,y,w,h,label,color="#e6f3eb",font=17)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="${color}" stroke="#92b4a0"/><text x="${x+w/2}" y="${y+h/2+font/3}" fill="#1c573e" font-size="${font}" font-weight="800" text-anchor="middle" font-family="Arial,sans-serif">${escape(label)}</text>`;
 const note=(x,y,label,size=16)=>`<text x="${x}" y="${y}" fill="#254a3a" font-size="${size}" font-weight="700" font-family="Arial,sans-serif">${escape(label)}</text>`;
 const line=(x1,y1,x2,y2)=>`<path d="M${x1} ${y1} L${x2} ${y2}" stroke="#428063" stroke-width="3" fill="none" stroke-linecap="round"/>`;
 
 function guideMatchedDiagram(kind,phase){
  const card=(x,y,w,h,label,fill="#e4f2e9",font=18)=>pill(x,y,w,h,label,fill,font);
  const bar=(label,expression,result)=>{
   return svgScene(label,
    note(23,35,label,20)+
    card(22,58,515,48,expression,"#e0eef9",17)+
    '<path d="M280 107 V143 M272 134 L280 143 L288 134" fill="none" stroke="#337a65" stroke-width="3"/>'+
    card(85,152,390,55,result,"#e4f2e9",22));
  };
  if(kind==="chars"){
    const rows=phase==="model"?[["B","66","01000010"],["C","67","01000011"],["NEXT","+1","ONE CODE ON"]]:
      phase==="guided"?[["H","72","01001000"],["I","73","01001001"],["NEXT","+1","ONE CODE ON"]]:
      [["A","65","01000001"],["B","66","01000010"],["C","67","01000011"]];
    return svgScene("ASCII capital letters: consecutive codes shown in eight-bit form",
      note(31,30,"CAPITAL",16)+note(202,30,"DENARY",16)+note(390,30,"8-BIT FORM",16)+
      rows.map((r,i)=>card(19,45+i*54,129,43,r[0],"#e4f0e8",19)+card(168,45+i*54,148,43,r[1],"#e0eef9",18)+card(329,45+i*54,211,43,r[2],"#fff0d1",r[2].length>12?14:19)).join(""));
  }
  if(kind==="pixels"&&phase==="model"){
    const cells=Array.from({length:64},(_,i)=>{const x=29+(i%8)*26,y=50+Math.floor(i/8)*21;return '<rect x="'+x+'" y="'+y+'" width="23" height="18" rx="2" fill="'+(["#b1d9c8","#90bce0","#f3d38c","#d5c5e8"][i%4])+'" stroke="#739482" stroke-width="1"/>';}).join("");
    return svgScene("8 by 8 bitmap, 2-bit colour depth, 128 bits or 16 bytes",
      note(30,34,"8 × 8 BITMAP",19)+cells+note(276,80,"64 pixels",20)+note(276,122,"2 bits per pixel",17)+note(276,161,"128 bits",20)+note(276,201,"16 bytes",20));
  }
  if(kind==="pixels"&&phase==="guided"){
    return bar("WE DO · BITMAP DATA","10 × 6 pixels × 4 bits per pixel","How many bits and bytes?");
  }
  if(kind==="image-size"){
    if(phase==="model")return bar("I DO · RAW IMAGE SIZE","200 × 100 pixels × 8 bits/pixel","160,000 bits = 20,000 bytes");
    if(phase==="guided")return bar("WE DO · RAW IMAGE SIZE","40 × 20 pixels × 4 bits/pixel","3,200 bits = 400 bytes");
    return bar("BOOKLET METHOD · IMAGE SIZE","8 × 8 pixels × 2 bits/pixel","128 bits = 16 bytes");
  }
  if(kind==="audio-size"){
    if(phase==="model")return bar("I DO · MONO SOUND SIZE","1,000 samples/s × 3 s × 8 bits","24,000 bits = 3,000 bytes");
    if(phase==="guided")return bar("WE DO · MONO SOUND SIZE","2,000 samples/s × 2 s × 4 bits","16,000 bits = 2,000 bytes");
    return bar("BOOKLET METHOD · MONO SOUND","20 samples/s × 100 s × 8 bits","16,000 bits = 2,000 bytes");
  }
  if(kind==="cpu-performance"){
    return svgScene("CPU performance is affected by clock speed, cache and cores",
      note(26,37,"CPU PERFORMANCE",20)+
      pill(20,63,163,79,"CLOCK SPEED","#e0eef9",18)+
      pill(198,63,163,79,"CACHE","#e4f2e9",21)+
      pill(376,63,163,79,"CORES","#fff0d1",21)+
      note(36,176,"Cycles per second",15)+note(206,176,"Fast local data",15)+note(385,176,"Parallel tasks",15)+
      note(74,217,"Also consider software and architecture",18));
  }
  if(kind==="computational"){
    return svgScene("An algorithm transforms essential inputs through a process into outputs",
      note(20,34,"KEEP THE ESSENTIAL DETAILS",18)+
      pill(20,64,145,76,"INPUT","#e0eef9",21)+
      pill(209,64,145,76,"PROCESS","#fff0d1",19)+
      pill(398,64,142,76,"OUTPUT","#e4f2e9",20)+
      line(168,103,208,103)+line(356,103,397,103)+
      note(phase==="guided"?28:32,174,phase==="guided"?"Quantity, price":"Distance, speed",16)+note(phase==="guided"?220:235,174,phase==="guided"?"Multiply":"Divide",17)+note(phase==="guided"?419:421,174,phase==="guided"?"Cost":"Hours",18)+
      note(phase==="guided"?88:80,211,phase==="guided"?"Ignore the plate colour":"Ignore the car colour",17));
  }
  if(kind==="flowchart"){
    return svgScene("Input leads to a decision diamond and distinct true and false branches",
      pill(18,93,122,63,"INPUT","#e0eef9",21)+
      '<path d="M230 58 L308 125 L230 192 L152 125 Z" stroke="#926424" fill="#fff0d1" stroke-width="2.5"/>'+
      '<text x="230" y="130" text-anchor="middle" fill="#234d3d" font-size="17" font-weight="700">CONDITION</text>'+
      pill(380,28,158,62,"TRUE output","#e4f2e9",18)+
      pill(380,158,158,62,"FALSE output","#f5e6e1",18)+
      '<path d="M140 125 H152 M308 107 L380 60 M308 143 L380 188" stroke="#28775d" fill="none" stroke-width="3"/>'+
      note(320,62,"Yes",15)+note(320,184,"No",15));
  }
  if(kind==="linear-search"){
    const values=phase==="guided"?[7,2,6,4]:[3,9,1,8,5],target=phase==="guided"?6:8,match=phase==="guided"?-1:3;
    const start=values.length===4?83:27,width=values.length===4?96:92,gap=10;
    return svgScene("Linear search: compare each item with the target and identify its zero-based index",
      note(26,34,"FIND "+target+" · SCAN LEFT TO RIGHT",20)+
      values.map((n,i)=>pill(start+i*(width+gap),76,width,81,String(n),i===match?"#f9e3a6":"#e0eef9",25)).join("")+
      values.map((n,i)=>note(start+29+i*(width+gap),65,"i="+i,16)).join("")+
      note(phase==="guided"?99:130,205,phase==="guided"?"COMPARE IN ORDER · FIND INDEX":"MATCH AT INDEX "+match+" · ZERO-BASED",19));
  }
  if(kind==="sorting"){
    const original=phase==="guided"?"4    2    3":"5    1    4    2";
    const after=phase==="guided"?"?    ?    ?":"1    4    2    5";
    return svgScene("One full bubble-sort pass swaps out-of-order neighbouring values",
      note(22,31,"BUBBLE SORT · ONE PASS",19)+
      pill(32,54,496,52,original,"#e0eef9",24)+
      '<path d="M280 108 V143 M272 134 L280 143 L288 134" fill="none" stroke="#337a65" stroke-width="3"/>'+
      pill(32,150,496,51,after,"#e4f2e9",25)+
      note(phase==="guided"?108:164,224,phase==="guided"?"Predict the result after one pass":"Largest value moves right",16));
  }
  if(kind==="programming"){
    const nums=phase==="guided"?[6,3,8]:[4,7,9];
    return svgScene("One-dimensional array has zero-based indexes",
      note(27,32,"ONE-DIMENSIONAL ARRAY",20)+
      nums.map((n,i)=>pill(32+i*171,80,157,70,String(n),i===0?"#fff0d1":"#e0eef9",25)).join("")+
      nums.map((n,i)=>note(82+i*171,67,"index "+i,16)).join("")+
      note(78,204,"First item is at index 0, not 1",18));
  }
  if(kind==="testing"){
    return svgScene("Validation example: boundary values 0 and 100 accepted, 101 rejected",
      note(25,33,"VALIDATION · 0 TO 100",20)+
      pill(22,66,158,86,"0","#e4f2e9",29)+
      pill(200,66,158,86,"100","#e4f2e9",29)+
      pill(378,66,158,86,"101","#f5e6e1",29)+
      note(58,180,"Boundary",17)+note(233,180,"Boundary",17)+note(426,180,"Invalid",17)+
      note(72,214,"Normal: 56 · Erroneous: hello",16));
  }
  if(kind==="shift"&&phase==="guided"){
    const bits="00101000";
    return svgScene("8-bit right shift: 00101000 becomes 00010100",
      note(25,33,"8-BIT SHIFT · RIGHT 1",20)+
      [128,64,32,16,8,4,2,1].map((v,i)=>card(20+i*65,55,60,43,bits[i],"#e0eef9",22)).join("")+
      '<path d="M280 106 V141 M271 132 L280 142 L289 132" stroke="#b37f3d" stroke-width="4" fill="none"/>'+
      note(83,175,"00101000  →  00010100",21)+note(152,210,"40 ÷ 2 = 20",19));
  }
  return null;
 }
 function diagram(kind,phase="reference"){
  const aligned=guideMatchedDiagram(kind,phase);if(aligned)return aligned;

  if(kind==="shift"){
   let positions=[128,64,32,16,8,4,2,1],bits="00010110";
   return svgScene("Eight-bit logical left shift: 00010110 becomes 01011000 after shifting left two places",note(26,37,"8-bit value: 00010110",19)+positions.map((v,i)=>pill(20+i*65,57,60,48,`${bits[i]}`,"#eaf3ee",23)).join("")+`<path d="M280 109 V149 L269 137 M280 149 L291 137" stroke="#be8632" fill="none" stroke-width="4"/>`+note(35,169,"LEFT 2 PLACES · fill zeros on right",17)+note(115,209,"01011000  =  88",23));
  }
  if(kind==="chars"){
   return svgScene("Character set: three characters mapped to numbers and binary codes",note(28,34,"CHARACTER",17)+note(208,34,"DENARY CODE",17)+note(380,34,"BINARY",17)+[["A","65","01000001"],["B","66","01000010"],["a","97","01100001"]].map((row,i)=>pill(20,49+i*54,110,43,row[0],"#e4f0e8",22)+pill(168,49+i*54,135,43,row[1]) +pill(335,49+i*54,200,43,row[2],"#fdf2df",19)).join(""));
  }
  if(kind==="pixels"||kind==="image-size"){
   const cells=Array.from({length:24},(_,i)=>{const x=35+(i%6)*53,y=48+Math.floor(i/6)*39;const colors=["#d3e9dc","#a5ceb5","#f2dca7","#c5d7ed"];return `<rect x="${x}" y="${y}" width="49" height="35" rx="3" fill="${colors[(i+Math.floor(i/6))%4]}" stroke="#41765b" stroke-width="1.3"/>`;}).join("");
   return svgScene("Bitmap image drawn as a six by four grid of pixels",note(35,31,"6 pixels wide",17)+cells+note(387,84,"24 pixels",19)+note(387,126,"8 bits/pixel",18)+note(387,173,"192 bits",20)+note(35,223,"raw size = width × height × colour depth",16));
  }
  if(kind==="wave"||kind==="audio-size"){
   const points=Array.from({length:150},(_,i)=>{let x=20+i*3.35,y=120-55*Math.sin(i*.15)-8*Math.sin(i*.44);return `${i?'L':'M'}${x.toFixed(1)} ${y.toFixed(1)}`;}).join(" ");
   return svgScene("Sound sampling: measured amplitude at equally spaced points along an analogue waveform",note(24,29,"Analogue sound wave",19)+`<path d="${points}" stroke="#287d6d" stroke-width="3.5" fill="none"/>`+[0,1,2,3,4,5,6,7,8,9].map(i=>{let j=i*15,x=20+j*3.35,y=120-55*Math.sin(j*.15)-8*Math.sin(j*.44);return `<line x1="${x}" x2="${x}" y1="42" y2="195" stroke="#cf9650" stroke-dasharray="4 5" stroke-width="1.7"/><circle cx="${x}" cy="${y}" r="5.5" fill="#c57422" stroke="white" stroke-width="2"/>`;}).join("")+note(215,219,"Samples taken at regular intervals",16));
  }
  if(kind==="compression"){
   return svgScene("Lossless compression can restore an original text file exactly, whereas lossy compression reduces size by permanently discarding some image detail.",
    pill(22,23,155,49,"TEXT FILE","#e3f1e9",20)+
    pill(202,23,155,49,"LOSSLESS","#e3f1e9",20)+
    pill(382,23,155,49,"RESTORED","#e3f1e9",20)+
    line(177,47,201,47)+line(357,47,381,47)+
    note(37,94,"Original text",15)+note(219,94,"Smaller file",15)+note(386,94,"Exact copy",15)+
    pill(22,123,155,49,"PHOTO","#faecce",20)+
    pill(202,123,155,49,"LOSSY","#faecce",20)+
    pill(382,123,155,49,"RESULT","#faecce",20)+
    line(177,147,201,147)+line(357,147,381,147)+
    note(31,195,"Original detail",15)+note(209,195,"Smaller file",15)+note(383,195,"Some detail lost",15));
  }
  if(kind==="memory"){
   return svgScene("The CPU accesses cache and RAM for working data. ROM holds non-volatile firmware; SSD stores saved files long-term.",
    pill(175,14,215,48,"CPU","#e5f2e8",22)+
    pill(212,79,140,40,"CACHE","#faebcc",19)+
    line(282,62,282,79)+
    pill(42,160,145,43,"RAM","#e2eff9",21)+
    pill(209,160,145,43,"ROM","#e2eff9",21)+
    pill(375,160,145,43,"SSD / HDD","#e8e8ee",19)+
    line(282,119,114,160)+
    note(27,218,"RAM: working",15)+note(205,218,"ROM: firmware",15)+note(379,218,"SSD: saved files",15));
  }
  if(kind==="virtual"){
   return svgScene("Virtual memory sends less-used pages from limited RAM to slower secondary storage",pill(20,58,190,120,"RAM   4 GB","#e1eff8",22)+pill(360,58,176,120,"SSD / HDD","#f8edda",21)+`<path d="M216 89 C285 45 297 45 350 89 M342 83 L351 90 L348 73" fill="none" stroke="#be772e" stroke-width="4"/><path d="M350 145 C280 184 270 184 216 145 M222 137 L216 145 L229 150" fill="none" stroke="#28779a" stroke-width="4"/>`+note(241,55,"swap out",16)+note(238,192,"swap in",16));
  }
  if(kind==="storage"||kind==="choice"){
   return svgScene("Three secondary storage technologies: magnetic hard disk, optical disc and solid-state SSD",pill(17,42,166,122,"MAGNETIC HDD","#e5f1ec",19)+pill(195,42,166,122,"OPTICAL DISC","#ecf1f8",18)+pill(373,42,166,122,"SOLID STATE","#faedda",19)+note(33,190,"capacity / cost",16)+note(211,190,"removable media",16)+note(393,190,"speed / durability",16));
  }
  if(kind==="units"){
   return svgScene("Data unit ladder: bit to nibble to byte to KB to MB to GB",["1 bit","4 bits = nibble","8 bits = byte","1,000 bytes = KB","1,000 KB = MB","1,000 MB = GB"].map((t,i)=>pill(30+(i%3)*178,44+Math.floor(i/3)*86,161,56,t,i<3?"#e4f2e8":"#f6edda",i>=3?15:18)).join(""));
  }
  if(kind==="cpu"){
   return svgScene("Inside the CPU, the control unit coordinates operations, the ALU performs calculations, and the cache provides fast access to frequently used data.",
    `<rect x="39" y="25" width="482" height="187" rx="18" fill="#e5f2e8" stroke="#669e79" stroke-width="3"/>`+
    note(64,57,"CENTRAL PROCESSING UNIT",20)+
    pill(65,79,201,69,"CONTROL UNIT","#ffffff",20)+
    pill(290,79,204,69,"ALU","#ffffff",24)+
    pill(165,164,230,35,"FAST CACHE","#f7e9c5",17));
  }
  if(kind==="fde"){
   return svgScene("Fetch decode execute cycle with three arrows",pill(27,75,151,82,"FETCH","#e5f3e7",21)+pill(207,75,151,82,"DECODE","#e1eff9",21)+pill(386,75,150,82,"EXECUTE","#fbebcd",20)+`<path d="M178 116 H204 M198 109 L205 116 L198 123 M358 116 H383 M377 109 L384 116 L377 123 M462 166 Q291 220 102 165" fill="none" stroke="#337959" stroke-width="3.5"/>`+note(224,216,"repeat",17));
  }
  if(kind==="review") return ""; // Synoptic lesson: omit decorative topic tiles.

  return svgScene("A diagram reinforcing the new learning",pill(60,70,180,78,"INPUT")+pill(317,70,180,78,"OUTPUT")+line(241,109,316,109));
 }
 const a=(n)=>(n<10?"00":"0")+n;
 const arr=(items,fn)=>items.map(fn).join("");
 function objectives(lesson){
  const terms=lesson.v.map(([term,definition],i)=>`<article class="objective-vocab-stage"${i?' hidden':''}><span class="objective-vocab-count">KEY TERM ${i+1} OF ${lesson.v.length}</span><h2>${escape(term)}</h2><div class="objective-vocab-definition" data-objective-vocab-definition hidden><span>DEFINITION</span><p>${escape(definition)}</p></div></article>`).join("");
  const hovers=lesson.v.map(([term,def])=>`<span class="vocab-tip" tabindex="0" data-definition="${escape(def)}">${escape(term)}</span>`).join("");
  return `<section id="overview" class="page" data-objectives-vocab="true" data-phase-time="Objectives and vocabulary"><div class="objectives-vocab-layout"><article class="objectives-vocab-left"><span class="phase-tag">OCR J277 · ${escape(lesson.s)}</span><h1>${escape(lesson.t)}</h1><div class="objectives"><strong>By the end, you can…</strong><ul>${arr(lesson.o,p=>`<li>${escape(p)}</li>`)}</ul></div><div class="vocab-intro"><strong>Key vocabulary</strong><div class="vocab-intro-list">${hovers}</div></div></article><div class="objectives-vocab-right">${terms}</div></div></section>`;
 }

 let j277RetrievalPromise;
 async function applyJ277Retrieval(data,number){
  j277RetrievalPromise ||= fetch("../donow-bank-20261020.json?v=20261020-simpleq2").then(r=>{if(!r.ok)throw Error("Do Now bank unavailable");return r.json()});
  const bank=await j277RetrievalPromise, entry=bank.lessons[String(number).padStart(3,"0")];
  if(!entry||entry.questions.length!==4)throw Error("Incomplete Do Now bank");
  data.doNowItems=entry.questions;
  data.r=entry.questions.map(q=>[q.question+(q.options.length?"\n"+q.options.map((o,i)=>"ABCD"[i]+") "+o).join("\n"):""),q.explanation]);
  data.refs=entry.questions.map(q=>q.source_lesson);
  data.c=[...data.c,...(entry.teachingAdditions||[])];
  data.teachingVisuals=entry.teachingVisuals||{};
 }
 function j277Question(lesson,i){
  const item=lesson.doNowItems?.[i];
  if(!item)return '<p>'+escape(lesson.r[i][0])+'</p>';
  return '<p>'+escape(item.question)+'</p>'+(item.options.length?'<ol class="j277-mcq" type="A">'+item.options.map(o=>'<li>'+escape(o)+'</li>').join("")+'</ol>':"");
 }
 function doNow(lesson){
  const labels=["LAST LESSON","EARLIER LEARNING · MCQ","EARLIER LEARNING","HIGH CHALLENGE"];
  const qs=arr(lesson.r,([q],i)=>`<article class="donow-question"><strong>${i+1} · ${labels[i]}${lesson.refs?" · "+escape(lesson.refs[i]):""}</strong>${j277Question(lesson,i)}</article>`);
  const answers=arr(lesson.r,([q,answer],i)=>`<div class="donow-stage" hidden><div class="donow-review"><article class="donow-review-question"><span class="review-number">QUESTION ${i+1} OF 4 · ${labels[i]}${lesson.refs?" · "+escape(lesson.refs[i]):""}</span><h2>Recall earlier learning</h2><div class="review-question">${j277Question(lesson,i)}</div></article><article class="donow-review-answer"><span class="review-label">ANSWER · EXPLAIN</span><p class="review-answer">${escape(lesson.doNowItems?.[i]?.answer||answer)}</p>${lesson.doNowItems?.[i]?.correct_option?'<p>'+escape(lesson.doNowItems[i].explanation)+'</p>':""}</article></div></div>`);
  return `<section id="do-now" class="page phase-donow" data-phase-time="Retrieval from earlier lessons"><style>#do-now .j277-mcq{padding-left:1.5em;margin:.45em 0 0;font-size:clamp(17px,1.15vw,22px);line-height:1.25}#do-now .j277-mcq li{padding-left:.15em;margin:.18em 0}#do-now .donow-question p{font-size:clamp(19px,1.35vw,25px);line-height:1.27}</style><div class="donow-deck"><div class="donow-stage"><div class="donow-questions">${qs}</div></div>${answers}</div></section>`;
 }
 function newLearning(lesson){
  const stages=arr(lesson.c,([title,body],i)=>`<div class="nl-stage"${i?' hidden':''}><span class="nl-stage-label">STEP ${i+1} OF ${lesson.c.length}</span><h2>${escape(title)}</h2>${lesson.teachingVisuals?.[title]||""}<p>${escape(body)}</p><span class="nl-stage-count">${i+1} of ${lesson.c.length}</span></div>`);
  return `<section id="new-learning" class="page phase-focus" data-phase-time="New learning"><div class="nl-focus"><article class="nl-reference"><span class="phase-tag">VISUAL REFERENCE · ${escape(lesson.s)}</span><h2>${escape(lesson.t)}</h2>${diagram(lesson.vis,"reference")}<div class="nl-reference-note"><strong>Keep in mind:</strong> Use the vocabulary and method shown in the example.</div></article><article class="nl-explanation">${stages}</article></div></section>`;
 }
 function iDo(lesson){
  const steps=arr(lesson.m.st,(step,i)=>`<div class="ido-step"${i?' hidden':''}><span class="ido-step-label">STEP ${i+1} OF ${lesson.m.st.length}</span><h2>${escape(step)}</h2></div>`);
  return `<section id="i-do" class="page phase-ido" data-phase-time="Teacher models"><div class="ido-focus-deck"><article class="ido-example"><div class="ido-reference"><span class="phase-tag">I DO · ONE COMPLETE MODEL</span><h2>${escape(lesson.m.q)}</h2>${diagram(lesson.vis,"model")}</div><div class="ido-method">${steps}</div></article></div></section>`;
 }
 function weDo(lesson){
  const cases=arr(lesson.w,([q,answer],i)=>`<article class="wedo-example"${i?' hidden':''}><div class="wedo-reference"><span class="phase-tag">WE DO ${i+1} OF ${lesson.w.length} · MINI-WHITEBOARDS</span><h2>Work it out together</h2><p>${escape(q)}</p>${i===0?diagram(lesson.vis,"guided"):`<p class="a1-we-hint">Use the same method as the I Do. Explain your first step before revealing.</p>`}</div><div class="wedo-practice"><div class="wedo-step"><span class="wedo-step-label">YOUR TURN · THINK AND WRITE</span><h2>Explain your method</h2><p>Work on your mini-whiteboard. Be ready to justify your answer.</p></div><div class="wedo-step" hidden><span class="wedo-step-label">CHECK · MODEL ANSWER</span><h2>${escape(answer)}</h2></div></div></article>`);
  return `<section id="we-do" class="page phase-wedo" data-phase-time="Guided practice"><div class="wedo-focus-deck">${cases}</div></section>`;
 }
 function youDo(lesson,number){
  const codeFirst=`<article class="exam-card youdo-question j277-code-first">
   <h3 class="j277-code-first-title"><img class="j277-code-first-logo" src="../../../assets/j277/code-first.svg" width="440" height="92" alt="CODE FIRST"></h3><p class="j277-code-topic">${escape(lesson.t)}</p>
   <div class="question-text"><div class="j277-code-content"><div class="j277-code-tasks">
   <p class="j277-code-start">One short task: begin on your mini-whiteboard, then test when appropriate.</p>
   <p><strong>YOUR TASK:</strong> ${escape(lesson.k.q)}</p>
   <pre class="arithmetic">${escape(lesson.k.code)}</pre>
   ${arr(lesson.k.p,(p,i)=>`<p><strong>${i===0?"Check":i===1?"Change":"Extend"}:</strong> ${escape(p)}</p>`)}
   ${number==="004"?'<p><a href="https://www.examreferencelanguage.co.uk/" target="_blank" rel="noopener">After whiteboards: open the OCR ERL editor →</a></p>':''}
   </div><aside class="j277-code-reference"><strong>Code First · MWB</strong>
   <p>Write and check the logic before using a computer.</p><span>${escape(lesson.t)}</span></aside></div></div></article>`;
  const paper=lesson.s.startsWith("1.1")?["qp11","ms11"]:lesson.s.startsWith("1.2")?["qp12","ms12"]:null;
  const exams=arr(lesson.e,([question],i)=>`<article class="exam-card youdo-question" hidden><span class="phase-tag">QUESTION ${i+2} · OCR J277 STYLE</span><h3>Exam practice</h3><div class="question-text"><p>${escape(question)}</p>${i===0?`<p class="source-note">Original OCR J277-style teaching question; not an official past-paper original. ${paper?`<a href="${PMT[paper[0]]}" target="_blank" rel="noopener">Related Paper 1 practice ↗</a> · <a href="${PMT[paper[1]]}" target="_blank" rel="noopener">related marking guidance ↗</a>`:""}</p>`:""}</div></article>`);
  return `<section id="you-do" class="page phase-youdo" data-phase-time="Code first · then exam practice" data-window-size="3" data-coding-first="true"><div class="youdo-deck"><div class="youdo-rolling">${codeFirst}${exams}</div><div class="youdo-window-progress">CODE FIRST · THEN EXAM PRACTICE</div></div></section>`;
 }
 function vocabulary(lesson){
  const cards=arr(lesson.v,([term,def],i)=>`<article class="vocab-stage"${i?' hidden':''}><div class="vocab-prompt"><span class="vocab-test-label">DEFINITION ${i+1} OF ${lesson.v.length}</span><h2>What is the term?</h2><p class="vocab-question">${escape(def)}</p><span class="vocab-stage-count">${i+1} of ${lesson.v.length}</span></div><div class="vocab-answer" data-vocab-answer hidden><span class="vocab-test-label">TERM</span><div class="vocab-answer-value">${escape(term)}</div></div></article>`);
  return `<section id="vocabulary" class="page phase-vocab" data-phase-time="Key vocabulary" data-vocab-flow="retrieval"><div class="vocab-deck">${cards}</div></section>`;
 }
 function exit(lesson){
  return `<section id="exit" class="page phase-exit" data-phase-time="Exit ticket"><div class="exit-compact"><div class="exit-check-card"><div class="exit-check-kicker">TRUE OR FALSE?</div><p class="exit-check-question">${escape(lesson.x[0])}</p><div class="exit-check-response"><span class="exit-key-item">👍 True</span><span class="exit-key-item">👎 False</span></div></div><div class="exit-reflection-strip"><div class="exit-confidence-title"><strong>How confident are you?</strong></div><div class="exit-confidence-choice"><div><strong>👍 Confident</strong><span>I can explain today’s ideas.</span></div></div><div class="exit-confidence-choice"><div><strong>↔ Nearly there</strong><span>I need another example.</span></div></div><div class="exit-confidence-choice"><div><strong>👎 Help needed</strong><span>I need extra support.</span></div></div></div></div></section>`;
 }
 const lessonStyles=`
 <style>
 .a1-scene{margin:9px auto;max-width:min(100%,540px);background:#f7fbf8;border-radius:12px}
 .a1-scene svg{display:block;width:100%;height:auto;max-height:min(35vh,220px)}
 .a1-we-hint{padding:15px;background:#eaf4ed;border-left:5px solid #3b8b5a;border-radius:7px;font-weight:700}
 .a1-scene text{font-family:Arial,Helvetica,sans-serif}
 .a1-source{font-size:14px}
 #you-do .source-note{font-size:clamp(12px,.9vw,15px);line-height:1.3}
 #i-do .ido-reference .a1-scene{max-width:490px}
 #we-do .wedo-reference .a1-scene{max-width:460px}
 #new-learning .nl-reference .a1-scene{max-width:460px}
 #we-do .wedo-practice .wedo-step h2{font-size:clamp(19px,1.6vw,27px);line-height:1.35}
 #i-do .ido-method .ido-step h2{font-size:clamp(21px,1.75vw,30px);line-height:1.35}
 @media(max-height:740px) and (min-width:901px){.a1-scene svg{max-height:150px}#i-do .ido-reference .a1-scene{max-width:390px}}
 @media(max-width:900px){.a1-scene svg{max-height:none}#you-do .source-note{font-size:14px}}
 </style>`;
 const sharedHead=(number,title)=>`<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Lesson ${number} · ${escape(title)}</title><meta name="description" content="OCR J277 Year 10 lesson ${number}: ${escape(title)}.">
 <link rel="stylesheet" href="../../../assets/h446-lesson/lesson-base.css?v=20260929-1815">
 <link rel="stylesheet" href="../../../assets/h446-lesson/lesson-classroom.css?v=20261014-j277retrievalrefs1">
 <link rel="stylesheet" href="../../../assets/h446-lesson/lesson-print.css?v=20260929-1815">
 <link rel="stylesheet" href="../../../assets/j277/code-first.css?v=20261013-logo1">${lessonStyles}</head>`;
 function renderLesson(number,lesson){
  const nav=["do-now","overview","new-learning","i-do","we-do","you-do","vocabulary","exit"];
  const names=["Do Now","Objectives","New Learning","I Do","We Do","You Do","Key Vocabulary","Exit Ticket"];
  const parts=[doNow(lesson),objectives(lesson),newLearning(lesson),iDo(lesson),weDo(lesson),youDo(lesson,number),vocabulary(lesson),exit(lesson)];
  const html=sharedHead(number,lesson.t)+`<body><a class="skip" href="#main">Skip to lesson</a><div class="navwrap">
   <a class="course-back" href="../../../j277-hub.html?year=10#lessons">← Year 10 lessons</a>
   <nav class="phase-nav" aria-label="Lesson phases">${arr(nav,(id,i)=>`<button type="button" data-page="${id}">${names[i]}</button>`)}</nav>
   <div class="nav-tools"><button id="advance" class="control-btn">Continue →</button><button id="previous" class="back-btn">← Previous</button><p id="page-count"></p></div></div>
   <div class="signal-wrap"><div class="signals" aria-label="Classroom routine"><span id="phase-logo" class="signal-tile signal-phase"></span><span id="behaviour-logo" class="signal-tile signal-routine"></span><span id="response-logo" class="signal-tile signal-response"></span></div><div class="signal-meta"><span id="phase-time" class="signal-phase-time"></span><span class="lesson-label">OCR J277 · Lesson ${number}<br>${escape(lesson.t)}</span></div></div>
   <main id="main">${parts.join("")}</main><div class="lesson-footer">Lesson ${number} · ${escape(lesson.t)} <span>Year 10 · OCR J277 · Original exam-style questions</span></div>
   <script src="../../../assets/h446-lesson/lesson.js?v=20261014-j277retrievalrefs1"></script></body></html>`;
  document.open();document.write(html);document.close();
 }
 function renderAnswers(number,lesson){
  const questions=[lesson.k.q,...lesson.e.map(a=>a[0])];
  const answers=[lesson.k.a,...lesson.e.map(a=>a[1])];
  const sections=arr(questions,(q,i)=>`<section class="answer-stage"${i?' hidden':''}><article class="solution-card"><span class="phase-tag">${i===0?"CODE FIRST · WORKED ANSWER":`QUESTION ${i+1} · EXAM-STYLE MODEL`}</span><h2>${i===0?"Code First · "+escape(lesson.t):"Answer and working"}</h2><p><strong>QUESTION:</strong> ${escape(q)}</p>${i===0?`<pre class="solution-code">${escape(lesson.k.code)}</pre>`:""}<div class="answer-heading">MODEL ANSWER</div><pre class="solution-code">${escape(answers[i])}</pre></article></section>`);
  const html=`<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Lesson ${number} · Worked answers</title>
   <link rel="stylesheet" href="../../../assets/h446-lesson/lesson-base.css?v=20260929-1815"><link rel="stylesheet" href="../../../assets/h446-lesson/lesson-classroom.css?v=20261014-j277retrievalrefs1">
   <style>body.answer-page{height:100vh;overflow:hidden;background:var(--paper)}.answer-toolbar{height:56px;position:fixed;left:0;right:0;top:0;z-index:30;padding:0 3vw;display:flex;align-items:center;gap:18px;background:#fff;border-bottom:1px solid var(--line)}.answer-toolbar a{font-weight:850;text-decoration:none}.answer-counter{margin-left:auto;font-size:15px}.answer-stage[hidden]{display:none!important}main.answer-stage-wrap{height:100vh;margin:0;max-width:none;padding:72px 3vw 76px}.answer-stage{height:100%;display:flex;gap:14px}.solution-card{min-width:0;max-width:100%;overflow:auto;flex:1;border:1px solid var(--line);background:white;border-radius:12px;padding:20px}.solution-code{white-space:pre-wrap;line-height:1.5}.answer-controls{position:fixed;left:0;right:0;bottom:0;height:62px;padding:8px 3vw;display:flex;align-items:center;gap:12px;background:white;border-top:1px solid var(--line)}.answer-controls button,.answer-controls a{font:inherit;font-weight:800;border:1px solid var(--line);border-radius:9px;padding:9px 14px;background:white;cursor:pointer;text-decoration:none}.answer-controls #next-answer{margin-left:auto;background:var(--green);color:white}@media(max-width:900px){body.answer-page{height:auto;overflow:auto}.answer-toolbar{position:sticky;height:auto;min-height:56px;padding:10px 14px;flex-wrap:wrap}main.answer-stage-wrap{height:auto;padding:16px 12px 80px}.answer-stage{height:auto}.solution-card{overflow:visible}.answer-controls{position:sticky;bottom:0}}</style></head>
   <body class="answer-page"><header class="answer-toolbar"><a href="index.html#you-do">← Back to You Do</a><strong>LESSON ${number} · WORKED ANSWERS</strong><span class="answer-counter" id="answer-counter">Answer 1 of ${questions.length}</span></header>
   <main class="answer-stage-wrap">${sections}</main><div class="answer-controls"><button type="button" id="previous-answer" disabled>← Previous</button><a href="index.html#you-do">Return to lesson</a><button type="button" id="next-answer">Next answer →</button></div>
   <script>const stages=[...document.querySelectorAll('.answer-stage')],previous=document.getElementById('previous-answer'),next=document.getElementById('next-answer'),counter=document.getElementById('answer-counter');let current=0;function showAnswer(i){current=Math.max(0,Math.min(i,stages.length-1));stages.forEach((stage,k)=>stage.hidden=k!==current);previous.disabled=current===0;next.textContent=current===stages.length-1?'Return to lesson →':'Next answer →';counter.textContent='Answer '+(current+1)+' of '+stages.length}next.onclick=()=>current<stages.length-1?showAnswer(current+1):location.assign('index.html#you-do');previous.onclick=()=>showAnswer(current-1);document.addEventListener('keydown',e=>{if(e.key==='ArrowRight')next.click();if(e.key==='ArrowLeft')previous.click()});showAnswer(0);<\/script></body></html>`;
  document.open();document.write(html);document.close();
 }

 // J277-only Code First master: one task, with a model answer on the existing answers page.
 // Any lesson not in the bank is a reserved exception and retains its current content.
 async function applyCodeFirstMaster(lesson,number){
   try{
     const response=await fetch("../code-first-master-20261021.json?v=20261021-release1");
     if(!response.ok)throw Error("Code First bank unavailable");
     const entry=(await response.json()).lessons[String(number)];
     if(!entry)return;
     const paper=String(lesson.s||"").startsWith("2.")?String(entry.paper1||"").match(/^(1\.\d+(?:\.\d+)?)(?:\s+(.+))?$/):null;
     lesson.k={...lesson.k,q:entry.task,code:entry.starter,p:[],a:"MODEL "+entry.language+"\n"+entry.model+"\n\nEXPECTED RESULT\n"+entry.expected};
     if(paper){lesson.k.paper1Ref=paper[1];lesson.k.paper1Topic=paper[2]||"";}
     else{delete lesson.k.paper1Ref;delete lesson.k.paper1Topic;}
   }catch(error){console.error("J277 Code First: bank could not load; original task retained.",error);}
 }
 function load(number,mode){
  const n=Number(number),from=n<=8?"004-008":n<=13?"009-013":"014-018";
  fetch("../autumn1-"+from+".json?v=20261014-donow1",{cache:"no-store"}).then(r=>{if(!r.ok)throw Error("Cannot load lesson data");return r.json()}).then(async all=>{
   const data=all[String(number)];if(!data)throw Error("Missing lesson "+number);
   await applyJ277Retrieval(data,number);
   await applyCodeFirstMaster(data,number);
   if(!Array.isArray(data.r)||data.r.length!==4||!Array.isArray(data.v)||data.v.length<3||!Array.isArray(data.e)||data.e.length<3)throw Error("Incomplete lesson "+number);
   if(mode==="answers")renderAnswers(number,data);else renderLesson(number,data);
  }).catch(e=>{document.body.innerHTML='<p style="padding:24px;font:700 18px Arial,sans-serif">Lesson could not load: '+escape(e.message)+'</p>';});
 }
 window.J277Autumn1={render:load};
})();

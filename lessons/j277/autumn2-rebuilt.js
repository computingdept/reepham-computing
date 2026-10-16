(function buildAutumn1Module(){
 "use strict";
 const PMT={
  qp12:"https://pmt.physicsandmathstutor.com/download/Computer-Science/GCSE/Topic-Qs/OCR/1-Computer-systems/Set-A/1.2%20Memory%20and%20Storage%20QP.pdf",
  ms12:"https://pmt.physicsandmathstutor.com/download/Computer-Science/GCSE/Topic-Qs/OCR/1-Computer-systems/Set-A/1.2%20Memory%20and%20Storage%20MS.pdf",
  qp11:"https://pmt.physicsandmathstutor.com/download/Computer-Science/GCSE/Topic-Qs/OCR/1-Computer-systems/Set-A/1.1%20Systems%20Architecture%20QP.pdf",
  ms11:"https://pmt.physicsandmathstutor.com/download/Computer-Science/GCSE/Topic-Qs/OCR/1-Computer-systems/Set-A/1.1%20Systems%20Architecture%20MS.pdf"
 };
 const escape=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
 // OCR J277: selectively emphasise exam command words and specification terms.
 // Work on plain source text, escape all spans, and never mark code or SVG labels.
 function examWords(lesson,source,limit=4){
   const value=String(source??"");
   if(Array.isArray(lesson.highlights)&&lesson.highlights.length){
     const labels=[...lesson.highlights,"explain","describe","identify","state","compare","justify","calculate","evaluate","name"].map(String).filter(Boolean).sort((a,b)=>b.length-a.length);
     const escaped=labels.map(v=>v.split("").map(ch=>".*+?^{}()|[]\\".includes(ch)?"\\"+ch:ch).join("")).join("|");
     const rx=new RegExp("\\b("+escaped+")\\b","gi");
     let html="",position=0,count=0;const seen=new Set();
     for(const m of value.matchAll(rx)){
       if(count>=limit)break;
       const w=m[0],key=w.toLowerCase();
       if(seen.has(key))continue;
       seen.add(key);
       html+=escape(value.slice(position,m.index))+'<mark class="j277-exam-word">'+escape(w)+'</mark>';
       position=m.index+w.length;count++;
     }
     return html+escape(value.slice(position));
   }
   const terms=lesson.vis==="embedded-systems"
     ? /\b(embedded systems?|dedicated (?:function|purpose)|specific (?:function|purpose)|real-time|low power|limited user interface|sensor|input|output|ROM|RAM|actuator|explain|describe|identify|state|compare|justify|calculate)\b/gi
     : lesson.vis==="cpu-performance"
     ? /\b(clock speed|cache size|number of cores|CPU cores|parallel processing|cache|cores|explain|describe|identify|state|compare|justify|calculate)\b/gi
     : null;
   if(!terms)return escape(value);
   let html="",position=0,count=0;const seen=new Set();
   for(const match of value.matchAll(terms)){
     const word=match[0], key=word.toLowerCase();
     if(seen.has(key))continue;
     if(count>=limit)break;
     seen.add(key);
     html+=escape(value.slice(position,match.index));
     html+='<mark class="j277-exam-word">'+escape(word)+'</mark>';
     position=match.index+word.length;
     count++;
   }
   return html+escape(value.slice(position));
 }
 function svgScene(label,contents){
  return `<figure class="a1-scene"><svg viewBox="0 0 560 232" role="img" aria-label="${escape(label)}" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="554" height="226" rx="14" fill="#f7fbf8" stroke="#bfd5c7" stroke-width="2"/>${contents}</svg></figure>`;
 }
 const pill=(x,y,w,h,label,color="#e6f3eb",font=17)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="${color}" stroke="#92b4a0"/><text x="${x+w/2}" y="${y+h/2+font/3}" fill="#1c573e" font-size="${font}" font-weight="800" text-anchor="middle" font-family="Arial,sans-serif">${escape(label)}</text>`;
 const note=(x,y,label,size=16)=>`<text x="${x}" y="${y}" fill="#254a3a" font-size="${size}" font-weight="700" font-family="Arial,sans-serif">${escape(label)}</text>`;
 const line=(x1,y1,x2,y2)=>`<path d="M${x1} ${y1} L${x2} ${y2}" stroke="#428063" stroke-width="3" fill="none" stroke-linecap="round"/>`;

 // Topic-specific visual explanations, rather than decorative labelled boxes.
 // Only opt-in J277 networking scenes use these illustrations.

 function j277NetworkExpansion(spec){
   const kind=String(spec.layout||"");
   const supported=["star-failure","mesh-failure","copper","fibre","wireless","media-compare","address-format","address-route","web-secure","email","transport","protocol-roles","standard"];
   if(!supported.includes(kind))return null;
   const title=String(spec.title||"Computer Science Diagram");
   const labels=Array.isArray(spec.boxes)?spec.boxes.map(String):[];
   const ink="#214b3a",green="#39816a",blue="#4c83ad",red="#c04e4e";
   const text=(x,y,value,size=18,weight=750,colour=ink)=>'<text x="'+x+'" y="'+y+'" font-family="Arial,sans-serif" text-anchor="middle" font-size="'+size+'" font-weight="'+weight+'" fill="'+colour+'">'+escape(String(value))+'</text>';
   const line=(x,y,x2,y2,colour=green,w=4,dash=false)=>'<path d="M'+x+' '+y+' L'+x2+' '+y2+'" stroke="'+colour+'" stroke-width="'+w+'" fill="none" stroke-linecap="round"'+(dash?' stroke-dasharray="10 8"':'')+'/>';
   const arrow=(x,y,x2,y2,colour=green)=>{const a=Math.atan2(y2-y,x2-x),p=Math.PI/6,l=12;return line(x,y,x2,y2,colour,4)+line(x2-Math.cos(a-p)*l,y2-Math.sin(a-p)*l,x2,y2,colour,3)+line(x2-Math.cos(a+p)*l,y2-Math.sin(a+p)*l,x2,y2,colour,3);};
   const box=(x,y,w,h,fill="#e4f2e9")=>'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="15" fill="'+fill+'" stroke="#81b19e" stroke-width="2.5"/>';
   const wrapped=(x,y,name,max=14,size=18)=>{
      const words=String(name||"?").split(/\s+/),lines=[];let current="";
      for(const word of words){if(current&&(current+" "+word).length>max){lines.push(current);current=word;}else current+=(current?" ":"")+word;}
      if(current)lines.push(current);
      const limited=lines.slice(0,3),top=y-(limited.length-1)*12;
      return limited.map((line,i)=>text(x,top+i*24,line,size)).join("");
   };
   const card=(x,y,w,h,label,colour="#e5f2e9",font=18)=>{
      return box(x,y,w,h,colour)+wrapped(x+w/2,y+h/2+6,label,w>170?20:14,font);
   };
   const dot=(x,y,r=26,c="#e0eefb")=>'<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="'+c+'" stroke="'+blue+'" stroke-width="3"/>';
   const foot=String(spec.foot||"").slice(0,72);
   const render=(parts)=>'<figure class="a1-scene j277-rich-scene"><svg viewBox="0 0 560 340" role="img" aria-label="'+escape(title)+': '+escape(labels.join(", "))+'" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="554" height="334" rx="15" fill="#f8fbf9" stroke="#bfd5c7" stroke-width="2"/>'+text(280,36,title.slice(0,42),title.length>33?19:22,850)+parts+(foot?text(280,325,foot,foot.length>51?14:16,700):"")+'</svg></figure>';
   let a="";
   if(kind==="star-failure"||kind==="mesh-failure"){
      const pts=[[280,164],[92,104],[468,104],[105,255],[455,255]];
      const edges=kind==="star-failure"?[[0,1],[0,2],[0,3],[0,4]]:[[0,1],[0,2],[0,3],[0,4],[1,2],[1,3],[2,4],[3,4]];
      const failure=kind==="star-failure" && /fail|stop/i.test(title+" "+foot);
      for(const e of edges){
        const p=pts[e[0]],q=pts[e[1]],failed=kind==="mesh-failure"&&e[0]===1&&e[1]===3;
        a+=line(p[0],p[1],q[0],q[1],failed?red:green,failed?5:4,failed);
        if(failed)a+=text(79,189,"X",22,900,red);
      }
      pts.forEach((p,i)=>{
        let label=labels[i]||"NODE "+i;
        a+=dot(p[0],p[1],i===0?47:37,i===0?"#daeee3":"#e2eefb");
        if(kind==="star-failure"&&i===0)label=labels[0]||"SWITCH";
        a+=wrapped(p[0],p[1]+6,label,10,i===0?16:15);
      });
      if(failure)a+='<circle cx="280" cy="164" r="47" fill="#fff1ee" fill-opacity=".8" stroke="'+red+'" stroke-width="5"/>'+text(280,175,"X",39,900,red)+text(280,227,"CENTRE FAILS",16,800,red);
      if(kind==="mesh-failure")a+=text(280,292,"Alternative routes remain",17,780);
      return render(a);
   }
   if(kind==="copper"||kind==="fibre"||kind==="wireless"){
      a+=card(22,110,127,111,labels[0]||"DEVICE A","#e1effb",17);
      a+=card(411,110,127,111,labels[2]||"DEVICE B","#e2f1e7",17);
      if(kind==="copper"){
        a+=line(149,167,411,167,"#9c6a33",14);
        a+=line(149,167,411,167,"#f4cf73",5);
        for(let x=187;x<=377;x+=47)a+='<path d="M'+(x-13)+' 167 l9 -14 l9 28 l9 -14" fill="none" stroke="#634c2b" stroke-width="3"/>';
        a+=text(280,106,"ELECTRICAL SIGNAL",18,850);
      }else if(kind==="fibre"){
        a+=line(149,168,411,168,"#468aa6",17);
        a+=line(149,168,411,168,"#d7ecfa",9);
        for(let x=174;x<=398;x+=45)a+='<circle cx="'+x+'" cy="168" r="7" fill="#f9ce4c" stroke="#e9a932" stroke-width="2"/>';
        a+=text(280,108,"LIGHT PULSES",19,850);
      }else{
        a+='<path d="M163 166 Q190 90 216 166 T269 166 T322 166 T373 166 T405 166" fill="none" stroke="#397eaf" stroke-width="6"/>';
        for(let x=203;x<=356;x+=72)a+='<path d="M'+(x-21)+' 128 q21 -22 42 0 M'+(x-11)+' 136 q11 -11 22 0" fill="none" stroke="#4187b4" stroke-width="3"/>';
        a+=text(280,92,"RADIO WAVES",19,850);
      }
      a+=text(280,264,kind==="copper"?"COPPER CABLE":kind==="fibre"?"OPTICAL FIBRE":"WIRELESS CONNECTION",18,850);
      return render(a);
   }
   if(kind==="media-compare"){
     const rows=[["COPPER","Electrical","copper"],["FIBRE","Light","fibre"],["WI-FI","Radio","wireless"]];
     rows.forEach((r,i)=>{const y=86+i*75;
       a+=card(23,y,122,53,r[0],i===0?"#f7ead7":i===1?"#e4f2fa":"#e5f3e9",18);
       a+=line(162,y+26,369,y+26,i===0?"#b58445":i===1?"#5198b7":"#4eaf91",i===2?4:8,i===2);
       a+=card(390,y,142,53,r[1],"#f1f6f2",19);
     });
     return render(a);
   }
   if(kind==="address-format"){
      a+=card(26,87,508,87,labels[0]||"192.0.2.10","#e6f0f9",20);
      a+=card(26,191,508,87,labels[1]||"AA:BB:CC:DD:EE:FF","#e1f3e7",19);
      a+=text(280,181,"COMPARE THE TWO ADDRESS FORMATS",15,850);
      return render(a);
   }
   if(kind==="address-route"){
      const entries=[labels[0]||"PC / NIC","LAN SWITCH","ROUTER","REMOTE WEB"];
      const xs=[18,159,300,441],w=101;
      for(let i=0;i<4;i++){
         a+=card(xs[i],126,w,91,entries[i],i%2?"#e1f2e6":"#e3eef9",15);
         if(i<3)a+=arrow(xs[i]+w+2,172,xs[i+1]-4,172);
      }
      a+=text(142,101,"LOCAL MAC",18,850);
      a+=text(422,101,"NETWORK IP",18,850);
      a+=text(280,265,"SWITCH INSIDE LAN · ROUTER BETWEEN LANs",16,850);
      return render(a);
   }
   if(kind==="web-secure"){
      a+=card(27,91,226,122,"HTTP · WEB TRANSFER","#e3eff9",21);
      a+=card(307,91,226,122,"HTTPS · ENCRYPTED","#e2f3e9",19);
      a+='<rect x="391" y="222" width="61" height="50" rx="9" fill="#d4eadb" stroke="#3b8160" stroke-width="4"/>'+
         '<path d="M405 221 v-12 a17 17 0 0 1 34 0 v12" fill="none" stroke="#3b8160" stroke-width="5"/>';
      a+=text(280,287,"THE SECURE CONNECTION PROTECTS DATA IN TRANSIT",15,850);
      return render(a);
   }
   if(kind==="email"){
      a+=card(18,93,148,80,labels[0]||"SENDER","#e2eef9",17);
      a+=card(209,93,143,80,labels[1]||"MAIL SERVER","#e3f2e8",18);
      a+=card(395,93,146,80,labels[2]||"RECEIVER","#e7eef8",17);
      a+=arrow(169,134,205,134);
      a+=arrow(355,134,392,134);
      a+=text(280,233,"SMTP → SEND MAIL",20,850);
      a+=text(280,275,"IMAP / POP → ACCESS MAIL",18,850);
      return render(a);
   }
   if(kind==="transport"){
      const names=[labels[0]||"WEB REQUEST",labels[1]||"TCP",labels[2]||"IP"];
      names.forEach((v,i)=>{const x=22+i*181;a+=card(x,104,155,112,v,i===0?"#e1eefc":i===1?"#def3e6":"#f6ead6",19);if(i<2)a+=arrow(x+158,160,x+178,160);});
      a+=text(101,254,"APPLICATION",15,800)+text(280,254,"RELIABLE DELIVERY",15,800)+text(459,254,"ROUTING",15,800);
      return render(a);
   }
   if(kind==="protocol-roles"){
      const names=[["WEB","HTTP(S)"],["EMAIL","SMTP / IMAP"],["FILES","FTP"],["NETWORK","TCP / IP"]];
      names.forEach((pair,i)=>{const x=i%2?293:25,y=i>=2?191:83;
        a+=box(x,y,242,92,i===0?"#e0eefb":i===1?"#e0f3e8":i===2?"#f9ead5":"#e4eaf7");
        a+=text(x+121,y+34,pair[0],19,850)+text(x+121,y+66,pair[1],19,850);
      });
      return render(a);
   }
   if(kind==="standard"){
      a+=card(25,112,145,126,labels[0]||"MAKER A","#e2eefb",18);
      a+=card(208,117,145,116,labels[1]||"SHARED RULES","#f7ecd4",18);
      a+=card(390,112,145,126,labels[2]||"MAKER B","#e0f2e7",18);
      a+=arrow(173,172,205,172)+arrow(356,172,388,172);
      a+=text(280,276,"INTEROPERABILITY THROUGH AGREED RULES",16,850);
      return render(a);
   }
   return null;
 }
 function networkScene(spec){
   const esc=escape;
   const title=String(spec.title||"Network diagram");
   const svg=(parts)=>'<figure class="a1-scene j277-network-scene"><svg viewBox="0 0 560 340" role="img" aria-label="'+esc(title)+'" xmlns="http://www.w3.org/2000/svg">'+
     '<rect x="3" y="3" width="554" height="334" rx="15" fill="#f7fbf8" stroke="#c0d8c9" stroke-width="2"/>'+
     '<text x="280" y="36" text-anchor="middle" font-family="Arial,sans-serif" font-size="22" font-weight="850" fill="#173f31">'+esc(title.slice(0,38))+'</text>'+parts+'</svg></figure>';
   const rounded=(x,y,w,h,fill="#e5f0fb")=>'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="13" fill="'+fill+'" stroke="#7da795" stroke-width="2.5"/>';
   const txt=(x,y,t,size=18,weight=800)=>'<text x="'+x+'" y="'+y+'" text-anchor="middle" font-family="Arial,sans-serif" font-size="'+size+'" font-weight="'+weight+'" fill="#1e523e">'+esc(t)+'</text>';
   const connector=(x1,y1,x2,y2,dash=false)=>'<path d="M'+x1+' '+y1+' L'+x2+' '+y2+'" stroke="#477c79" stroke-width="4" stroke-linecap="round" fill="none"'+(dash?' stroke-dasharray="9 7"':'')+'/>';
   const arrow=(x1,y1,x2,y2)=>connector(x1,y1,x2,y2)+'<path d="M'+(x2-10)+' '+(y2-8)+' L'+x2+' '+y2+' L'+(x2-10)+' '+(y2+8)+'" fill="none" stroke="#477c79" stroke-width="3" stroke-linejoin="round"/>';
   const node=(x,y,title)=>rounded(x-67,y-32,134,64,"#e1effa")+txt(x,y+7,title,16);
   const foot=(t)=>txt(280,321,t,16,750);
   const kind=String(spec.layout);
   let a="";
   if(kind==="lanwan"){
     a+=rounded(19,61,239,232,"#e8f2fb")+rounded(302,61,239,232,"#e4f3e8");
     a+=txt(138,88,"LAN · ONE SITE",20)+txt(421,88,"WAN · MANY SITES",19);
     [[69,134],[198,134],[138,240]].forEach(p=>a+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="23" fill="#d3e9fa" stroke="#4881a6" stroke-width="3"/>');
     a+=connector(69,156,138,216)+connector(198,156,138,216);
     a+=txt(69,140,"PC",15)+txt(198,140,"PC",15)+txt(138,246,"SW",14);
     a+=rounded(321,126,94,69,"#eaf8ef")+rounded(431,217,94,68,"#eaf8ef");
     a+=txt(368,154,"SCHOOL",15)+txt(368,175,"A",18)+txt(478,244,"SCHOOL",15)+txt(478,265,"B",18);
     a+=connector(402,191,445,228)+txt(437,209,"LONG LINK",12);
     a+=txt(138,281,"Local connections",15)+txt(421,112,"Across towns",16);
     return svg(a);
   }
   if(kind==="bandwidth"){
     a+=txt(112,79,"CONNECTED USERS",18);
     [120,174,229].forEach((y,i)=>{a+=rounded(36,y-20,107,42,i%2?"#e5f2fb":"#e4f2ec");a+=txt(89,y+8,"USER "+(i+1),14);a+=connector(143,y,227,174);});
     a+=rounded(227,109,110,131,"#f4eccc")+txt(282,144,"SHARED",18)+txt(282,171,"LINK",21)+txt(282,206,"Mb/s",20);
     a+=arrow(340,174,392,174)+rounded(393,117,130,115,"#e0f2e7")+txt(458,153,"NETWORK",19)+txt(458,181,"SERVICE",19);
     a+=foot("More users may share the same capacity.");
     return svg(a);
   }
   if(kind==="clientserver"){
     a+=rounded(219,106,122,156,"#dff1e4")+txt(280,153,"SERVER",22);
     [185,207,229].forEach(y=>a+=connector(243,y,317,y));
     [[91,118],[94,255],[466,161]].forEach((p,i)=>{a+=node(p[0],p[1],"CLIENT "+(i+1));a+=connector(p[0]<200?158:399,p[1],p[0]<200?219:341,178);});
     a+=txt(280,287,"Clients request · server provides",17);
     return svg(a);
   }
   if(kind==="peer"){
     const pts=[[280,95],[116,237],[446,237]];
     [[0,1],[0,2],[1,2]].forEach(e=>{const p=pts[e[0]],q=pts[e[1]];a+=connector(p[0],p[1],q[0],q[1]);});
     pts.forEach((p,i)=>a+=node(p[0],p[1],"PEER "+(i+1)));
     a+=txt(280,304,"Each device can send and receive",17);
     return svg(a);
   }
   if(kind==="switch"){
     const pts=[[279,174],[94,111],[464,111],[94,260],[464,260]];
     for(let i=1;i<5;i++)a+=connector(pts[0][0],pts[0][1],pts[i][0],pts[i][1]);
     a+=rounded(202,131,154,86,"#def1e4")+txt(279,165,"LAN SWITCH",18)+txt(279,191,"MAC",19);
     ["PC A","PC B","PRINTER","SERVER"].forEach((name,i)=>a+=node(pts[i+1][0],pts[i+1][1],name));
     a+=txt(280,313,"Forwards traffic inside the LAN",16);
     return svg(a);
   }
   if(kind==="router"){
     a+=rounded(21,87,187,180,"#e8f3fc")+rounded(351,87,187,180,"#e4f2e9");
     a+=txt(114,125,"SCHOOL LAN",18)+txt(445,125,"OTHER NETWORK",17);
     a+=node(114,190,"PC")+node(445,190,"SERVER");
     a+=rounded(231,148,98,85,"#f7eccf")+txt(280,182,"ROUTER",18)+txt(280,204,"IP",17);
     a+=arrow(184,190,231,190)+arrow(329,190,376,190);
     a+=txt(280,307,"IP helps route between networks",17);
     return svg(a);
   }
   if(kind==="dns"){
     a+=rounded(23,93,155,92,"#e4eef9")+rounded(204,93,154,92,"#e1f2e7")+rounded(384,93,154,92,"#f8ecd4");
     a+=txt(100,130,"BROWSER",19)+txt(100,156,"Domain name",14);
     a+=txt(281,130,"DNS",21)+txt(281,156,"Lookup service",14);
     a+=txt(461,130,"WEB SERVER",18)+txt(461,156,"IP destination",14);
     a+=arrow(178,113,202,113);
     a+=connector(204,179,178,179)+txt(190,218,"IP back",14);
     a+=connector(99,185,99,253)+arrow(101,254,460,254)+connector(460,254,460,185);
     a+=txt(280,242,"BROWSER USES IP TO CONTACT SERVER",16);
     a+=foot("Name → DNS lookup → IP → web request");
     return svg(a);
   }
   if(kind==="cloud"){
     a+=node(91,218,"LAPTOP")+node(471,218,"TABLET");
     a+=connector(158,218,198,163)+connector(362,163,404,218);
     a+=rounded(197,91,165,161,"#e2f3e9");
     a+='<path d="M235 110 C231 86 277 72 291 100 C315 65 365 98 342 125" fill="none" stroke="#609f8a" stroke-width="5"/>';
     a+=txt(280,169,"CLOUD",25)+txt(280,200,"REMOTE FILES",18);
     a+=foot("Data is held on remote servers");
     return svg(a);
   }
   return null;
 }

 function j277SecurityScene(spec){
   const kind=String(spec.layout||"");
   const names=["attack-flow","malware-types","phishing","email-warning","ransomware","attack-patterns","brute","dos","intercept","database","security-cycle","firewall","antimalware","access","security-layers","login","lockout","encryption","pentest","feedback","error-types","assessment","command-words","mark-explain"];
   if(!names.includes(kind))return null;
   const title=String(spec.title||"J277 Diagram"),labels=Array.isArray(spec.boxes)?spec.boxes.map(String):[];
   const ink="#204c3d",green="#3b8c6b",blue="#367dab",red="#c55c5c",orange="#dfac47";
   const esc=escape;
   const text=(x,y,v,size=18,w=800,c=ink)=>'<text x="'+x+'" y="'+y+'" font-family="Arial,sans-serif" text-anchor="middle" font-size="'+size+'" font-weight="'+w+'" fill="'+c+'">'+esc(String(v))+'</text>';
   const line=(x,y,x2,y2,color=green,width=4,dashed=false)=>'<path d="M'+x+' '+y+' L'+x2+' '+y2+'" stroke="'+color+'" stroke-width="'+width+'" stroke-linecap="round" fill="none"'+(dashed?' stroke-dasharray="9 6"':'')+'/>';
   const arrow=(x,y,x2,y2,color=green)=>{const a=Math.atan2(y2-y,x2-x),q=Math.PI/6,l=11;return line(x,y,x2,y2,color,4)+line(x2-Math.cos(a-q)*l,y2-Math.sin(a-q)*l,x2,y2,color,3)+line(x2-Math.cos(a+q)*l,y2-Math.sin(a+q)*l,x2,y2,color,3);};
   const rect=(x,y,w,h,colour="#e5f1eb",stroke="#8ab5a3")=>'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="14" fill="'+colour+'" stroke="'+stroke+'" stroke-width="2.5"/>';
   const split=(raw,max)=>{const words=String(raw||"?").split(/\s+/),out=[];let current="";for(const w of words){if(current && (current+" "+w).length>max){out.push(current);current=w;}else current+=(current?" ":"")+w;}if(current)out.push(current);return out.slice(0,3);};
   const label=(x,y,raw,font=18,max=14)=>{const lines=split(raw,max);return lines.map((word,i)=>text(x,y-(lines.length-1)*13+i*26,word,font)).join("");};
   const card=(x,y,w,h,name,colour="#e6f2ea")=>rect(x,y,w,h,colour)+label(x+w/2,y+h/2+7,name,w>=210?19:17,w>=210?20:14);
   const icon=(type,cx,cy,col=green)=>{
     if(type==="mail")return '<rect x="'+(cx-34)+'" y="'+(cy-22)+'" width="68" height="45" rx="5" fill="#f0f7fb" stroke="'+col+'" stroke-width="4"/>'+
       '<path d="M'+(cx-34)+' '+(cy-20)+' L'+cx+' '+(cy+5)+' L'+(cx+34)+' '+(cy-20)+'" fill="none" stroke="'+col+'" stroke-width="3"/>';
     if(type==="lock")return '<rect x="'+(cx-28)+'" y="'+(cy-3)+'" width="56" height="47" rx="8" fill="#e9f2e9" stroke="'+col+'" stroke-width="4"/>'+
       '<path d="M'+(cx-19)+' '+(cy-3)+' v-12 a19 19 0 0 1 38 0 v12" fill="none" stroke="'+col+'" stroke-width="5"/>'+
       '<circle cx="'+cx+'" cy="'+(cy+18)+'" r="4" fill="'+col+'"/>';
     if(type==="shield")return '<path d="M'+cx+' '+(cy-43)+' l39 16 v29 c0 26 -23 40 -39 49 c-16 -9 -39 -23 -39 -49 v-29z" fill="#e0f2e7" stroke="'+col+'" stroke-width="4"/>';
     if(type==="server")return '<rect x="'+(cx-39)+'" y="'+(cy-48)+'" width="78" height="93" rx="10" fill="#e5eef9" stroke="'+col+'" stroke-width="4"/>'+
       [0,1,2].map(i=>'<path d="M'+(cx-28)+' '+(cy-31+i*27)+' h56" stroke="'+col+'" stroke-width="5"/><circle cx="'+(cx-20)+'" cy="'+(cy-23+i*27)+'" r="4" fill="'+col+'"/>').join("");
     if(type==="document")return '<path d="M'+(cx-32)+' '+(cy-40)+' h46 l18 20 v62 h-64z" fill="#eff6f9" stroke="'+col+'" stroke-width="4"/>'+
       '<path d="M'+(cx+14)+' '+(cy-40)+' v20 h18 M'+(cx-22)+' '+(cy-1)+' h43 M'+(cx-22)+' '+(cy+14)+' h38" fill="none" stroke="'+col+'" stroke-width="3"/>';
     if(type==="person")return '<circle cx="'+cx+'" cy="'+(cy-18)+'" r="19" fill="#e4eef7" stroke="'+col+'" stroke-width="3"/>'+
       '<path d="M'+(cx-35)+' '+(cy+40)+' q0 -40 35 -40 q35 0 35 40" fill="#e4eef7" stroke="'+col+'" stroke-width="3"/>';
     if(type==="database")return '<ellipse cx="'+cx+'" cy="'+(cy-32)+'" rx="36" ry="14" fill="#e7f3ef" stroke="'+col+'" stroke-width="3"/>'+
       '<path d="M'+(cx-36)+' '+(cy-32)+' v63 q36 26 72 0 v-63 M'+(cx-36)+' '+(cy+10)+' q36 22 72 0" fill="#e7f3ef" stroke="'+col+'" stroke-width="3"/>';
     if(type==="magnify")return '<circle cx="'+(cx-10)+'" cy="'+(cy-13)+'" r="31" fill="#eff6fa" stroke="'+col+'" stroke-width="5"/>'+
       '<path d="M'+(cx+12)+' '+(cy+10)+' l32 32" fill="none" stroke="'+col+'" stroke-width="7"/>';
     return '<circle cx="'+cx+'" cy="'+cy+'" r="34" fill="#e8f3ef" stroke="'+col+'" stroke-width="4"/>';
   };
   const foot=String(spec.foot||"").slice(0,72);
   const render=(body)=>'<figure class="a1-scene j277-security-scene"><svg viewBox="0 0 560 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="'+esc(title)+': '+esc(labels.join(", "))+'"><rect x="3" y="3" width="554" height="334" rx="15" fill="#f8fbf9" stroke="#bfd5c7" stroke-width="2"/>'+text(280,39,title.slice(0,43),title.length>33?18:22,850)+body+(foot?text(280,326,foot,foot.length>54?13:16,700):"")+'</svg></figure>';
   const name=(i,fallback)=>labels[i]||fallback;
   let a="";
   if(["phishing","email-warning"].includes(kind)){
     a+=rect(24,74,283,209,"#e8f1fb");
     a+=text(160,106,"INBOX · UNEXPECTED MESSAGE",15,850);
     a+=icon("mail",72,154,red);
     a+=text(191,152,"SENDER: ?",20,850,red);
     a+=line(122,171,272,171,red,3);
     a+=text(174,201,"URGENT · CLICK LINK",16,850,red);
     a+=card(122,218,171,49,name(0,"SUSPICIOUS LINK"),"#fbe9e5");
     a+=arrow(309,173,362,173,red);
     a+=icon("lock",443,156,red);
     a+=text(441,239,"ACCOUNT RISK",19,850,red);
     return render(a);
   }
   if(kind==="ransomware"){
     a+=icon("document",90,161,blue)+icon("lock",280,149,red)+icon("document",467,161,red);
     a+=arrow(145,158,224,158,red)+arrow(337,158,408,158,red);
     a+=text(90,243,name(0,"FILES"),18)+text(280,243,name(1,"LOCKED"),18,850,red)+text(467,243,name(2,"UNAVAILABLE"),18,850,red);
     a+=text(280,280,"ACCESS TO DATA IS DISRUPTED",18,800,red);
     return render(a);
   }
   if(kind==="dos"){
     a+=icon("server",320,166,red);
     for(let i=0;i<6;i++){const y=88+i*30; a+='<circle cx="48" cy="'+y+'" r="12" fill="#e4effb" stroke="'+blue+'" stroke-width="2"/>';
       a+=arrow(65,y,259,145+(y-160)*.23,red);}
     a+=text(137,70,"EXCESSIVE REQUESTS",17,850,red);
     a+=text(321,252,"OVERLOADED",19,850,red);
     a+=icon("person",472,154,blue)+text(473,260,"WAITING USER",16);
     a+=line(380,167,417,167,red,5)+text(405,149,"X",25,850,red);
     return render(a);
   }
   if(kind==="intercept"){
     a+=icon("person",86,191,blue)+icon("person",475,191,blue);
     a+=arrow(146,194,423,194,blue);
     a+=icon("magnify",279,108,red);
     a+=line(279,143,279,184,red,4,true);
     a+=text(280,68,"POSSIBLE EAVESDROPPER",16,850,red);
     a+=text(88,269,name(0,"SENDER"),18)+text(473,269,name(2,"RECEIVER"),18);
     a+=text(280,230,"TRANSMITTED DATA",16,800);
     return render(a);
   }
   if(kind==="firewall"){
     a+=icon("shield",280,164,green);
     a+=text(280,180,"RULES",18,850);
     a+=arrow(51,128,227,151,green)+arrow(332,147,492,128,green);
     a+=arrow(51,225,218,183,red);
     a+=text(123,101,"ALLOWED REQUEST",17)+text(122,258,"BLOCKED REQUEST",17,850,red);
     a+=text(453,103,"SCHOOL LAN",17);
     a+=text(346,237,"X",33,900,red);
     return render(a);
   }
   if(kind==="encryption"){
     a+=card(20,118,145,112,name(0,"PLAINTEXT"),"#e2eefb");
     a+=icon("lock",281,151,green);
     a+=arrow(168,174,241,174)+arrow(327,174,395,174);
     a+=card(398,118,142,112,name(2,"CIPHERTEXT"),"#e1f2e6");
     a+=text(91,260,"READABLE",17)+text(281,260,"KEY",17)+text(469,260,"SCRAMBLED",17);
     return render(a);
   }
   if(kind==="lockout"||kind==="brute"||kind==="login"){
     const top=kind==="login"?"SECOND FACTOR":"REPEATED GUESSES";
     a+=text(124,83,top,17,850,kind==="login"?green:red);
     for(let i=0;i<3;i++){
       a+=card(23+i*83,113,70,62,kind==="login"?["ID","PASS","APP"][i]:"TRY "+(i+1),kind==="login"?"#e4effb":"#fbede7");
     }
     a+=arrow(286,144,354,144,kind==="login"?green:red);
     a+=icon("lock",421,146,kind==="login"?green:red);
     a+=text(421,246,kind==="login"?"SECOND CHECK":"LIMIT / LOCKOUT",18,850);
     a+=text(280,283,kind==="brute"?"An attack tries many passwords":kind==="lockout"?"Blocking attempts reduces guesses":"Two independent checks reduce risk",17);
     return render(a);
   }
   if(kind==="database"){
     a+=icon("document",88,169,blue)+a;
     a+=arrow(146,169,232,169,red)+icon("database",282,169,red)+arrow(339,169,422,169,red)+icon("document",466,169,red);
     a+=text(89,262,name(0,"INPUT"),16)+text(282,262,"DATABASE QUERY",17)+text(465,262,"RECORDS",17);
     a+=text(280,93,"UNTRUSTED INPUT MUST BE HANDLED SAFELY",16,850,red);
     return render(a);
   }
   if(kind==="antimalware"||kind==="attack-flow"){
     a+=icon("document",91,161,kind==="attack-flow"?red:blue);
     a+=arrow(151,162,229,162,kind==="attack-flow"?red:green);
     a+=icon("shield",281,164,kind==="attack-flow"?red:green);
     a+=arrow(338,162,407,162,kind==="attack-flow"?red:green);
     a+=icon("document",467,161,kind==="attack-flow"?red:green);
     a+=text(91,264,name(0,"FILE"),17)+text(281,264,name(1,kind==="attack-flow"?"MALWARE":"SCAN"),17)+text(467,264,name(2,"RESULT"),17);
     return render(a);
   }
   if(kind==="access"){
     a+=icon("person",93,165,blue)+icon("lock",278,151,green)+icon("database",464,166,green);
     a+=arrow(149,166,231,166,blue)+arrow(325,166,413,166,green);
     a+=text(92,263,name(0,"USER"),17)+text(280,263,name(1,"PERMISSIONS"),17)+text(466,263,name(2,"PRIVATE FILES"),17);
     return render(a);
   }
   if(kind==="security-layers"){
     a+=rect(21,77,518,231,"#e2eef9");
     a+=rect(73,119,415,158,"#e0f2e7");
     a+=rect(149,156,262,89,"#faf0db");
     a+=text(280,106,name(0,"FIREWALL"),19,850);
     a+=text(280,145,name(1,"ANTI-MALWARE"),18,850);
     a+=text(280,192,name(2,"PERMISSIONS"),19,850);
     a+=text(280,221,"PROTECTED RESOURCES",15,850);
     return render(a);
   }
   if(kind==="malware-types"||kind==="attack-patterns"||kind==="error-types"||kind==="command-words"){
     const words=kind==="malware-types"?["TROJAN","WORM","RANSOMWARE"]:kind==="command-words"?["STATE","DESCRIBE","EXPLAIN","COMPARE"]:labels.slice(0,kind==="error-types"?3:3);
     const n=words.length,wide=(512-14*(n-1))/n;
     words.forEach((w,i)=>{const x=24+i*(wide+14);
       a+=rect(x,91,wide,194,i%2?"#e7f4ec":"#e8effa");
       const ico=kind==="malware-types"?(i===2?"lock":i===1?"document":"shield"):kind==="attack-patterns"?(i===0?"mail":i===1?"document":"server"):kind==="error-types"?"document":"magnify";
       a+=icon(ico,x+wide/2,159,kind==="attack-patterns"||kind==="malware-types"?red:green);
       a+=label(x+wide/2,253,w,n===4?16:18,n===4?10:12);
     });
     return render(a);
   }
   if(kind==="pentest"||kind==="security-cycle"||kind==="feedback"||kind==="assessment"||kind==="mark-explain"){
     const types=kind==="pentest"?["document","magnify","document"]:kind==="feedback"?["document","magnify","document"]:kind==="assessment"?["document","magnify","document"]:kind==="mark-explain"?["document","magnify","shield"]:["magnify","document","shield"];
     for(let i=0;i<3;i++){
       const x=103+i*173;
       a+=rect(x-75,96,150,164,i===1?"#eff5dc":"#e4f1ed");
       a+=icon(types[i],x,152,green);
       a+=label(x,230,name(i,["STEP 1","STEP 2","STEP 3"][i]),16,15);
       if(i<2)a+=arrow(x+76,168,x+96,168);
     }
     return render(a);
   }
   return null;
 }
 function topicVisual(spec){
  const richer=j277NetworkExpansion(spec);if(richer)return richer;
  const security=j277SecurityScene(spec);if(security)return security;
  const advanced=networkScene(spec);if(advanced)return advanced;
  const values=(Array.isArray(spec.boxes)?spec.boxes:[]).map(v=>String(v).slice(0,21));
  const title=String(spec.title||"OCR J277").slice(0,35),foot=String(spec.foot||"").slice(0,69);
  const frame=(label,body)=>svgScene(label,body).replace('viewBox="0 0 560 232"','viewBox="0 0 560 340"').replace('width="554" height="226"','width="554" height="334"');
  const arrow=(x1,y1,x2,y2)=>'<path d="M'+x1+' '+y1+' L'+x2+' '+y2+'" fill="none" stroke="#44876b" stroke-width="5"/>';
  let content=note(24,38,title,22);
  const mode=String(spec.layout||"flow");
  if(mode==="flow"){
    const n=Math.max(2,Math.min(4,values.length)),gap=16,w=(520-gap*(n-1))/n;
    for(let i=0;i<n;i++){const x=20+i*(w+gap);content+=pill(x,115,w,120,values[i]||"STEP "+(i+1),["#e0eef9","#def3e6","#fae9d4","#e5eafb"][i],n>3?15:18);if(i<n-1)content+=arrow(x+w+2,173,x+w+gap-2,173);}
  }else if(mode==="compare"){
    content+=pill(20,93,252,171,values[0]||"OPTION A","#e0effb",20)+pill(290,93,250,171,values[1]||"OPTION B","#e0f2e7",20);
    if(values[2])content+=note(32,294,values[2],17);
  }else if(mode==="star"||mode==="mesh"){
    const pts=[[280,100],[115,182],[445,182],[185,279],[378,279]];
    const lines=mode==="star"?[[0,1],[0,2],[0,3],[0,4]]:[[0,1],[0,2],[0,3],[0,4],[1,3],[2,4],[3,4]];
    for(const pair of lines){const a=pts[pair[0]],b=pts[pair[1]];content+=arrow(a[0],a[1],b[0],b[1]);}
    pts.forEach((p,i)=>{content+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="34" fill="#e3f2eb" stroke="#62987b" stroke-width="3"/>';content+='<text x="'+p[0]+'" y="'+(p[1]+5)+'" text-anchor="middle" font-size="15" font-family="Arial,sans-serif" fill="#254a3a" font-weight="800">'+escape(values[i]||"NODE "+(i+1))+'</text>';});
  }else if(mode==="layers"){
    for(let i=0;i<Math.min(4,values.length);i++)content+=pill(41,71+i*55,477,48,values[i],["#e0edf8","#e0f0e6","#f8ebd9","#e9eefa"][i],20);
  }else{
    for(let i=0;i<Math.min(4,values.length);i++)content+=pill(23+(i%2)*264,81+Math.floor(i/2)*112,248,96,values[i],["#e0edf8","#e0f0e6","#f8ebd9","#e9eefa"][i],18);
  }
  if(foot)content+=note(22,327,foot,foot.length>55?14:17);
  return frame(title+": "+values.join(", "),content);
 }

 // Compact, meaningful scenario prompts for Years 10 021-024.
 // Deliberately show relationships without supplying the exam answer.
 function visualPrompt(spec){
   const boxes=Array.isArray(spec.boxes)?spec.boxes.slice(0,5).map(v=>String(v).slice(0,30)):[];
   const title=String(spec.title||"Use the diagram").slice(0,85);
   const kind=String(spec.layout||"flow"),esc=escape,green="#368463",red="#c35a56",blue="#477ca8";
   const rect=(x,y,w,h,c="#e4f2e9")=>'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="12" fill="'+c+'" stroke="#83ad9b" stroke-width="2.5"/>';
   const txt=(x,y,v,size=18,color="#194f3b")=>'<text x="'+x+'" y="'+y+'" text-anchor="middle" font-family="Arial,sans-serif" font-weight="800" font-size="'+size+'" fill="'+color+'">'+esc(String(v))+'</text>';
   const wrapped=(x,y,v,width=13,size=17)=>{
      const words=String(v||"?").split(/\s+/),out=[];let part="";
      for(const word of words){if(part&&(part+" "+word).length>width){out.push(part);part=word;}else part+=(part?" ":"")+word;}
      if(part)out.push(part);
      const lines=out.slice(0,3),start=y-(lines.length-1)*10;
      return lines.map((line,i)=>txt(x,start+i*21,line,size)).join("");
   };
   const segment=(x,y,x2,y2,c=green,w=4,dash=false)=>'<path d="M'+x+' '+y+' L'+x2+' '+y2+'" fill="none" stroke="'+c+'" stroke-width="'+w+'" stroke-linecap="round"'+(dash?' stroke-dasharray="9 6"':'')+'/>';
   const arrow=(x,y,x2,y2,c=green)=>segment(x,y,x2,y2,c)+segment(x2-9,y2-7,x2,y2,c,3)+segment(x2-9,y2+7,x2,y2,c,3);
   const card=(x,y,w,h,v,c)=>rect(x,y,w,h,c)+wrapped(x+w/2,y+h/2+6,v,w>225?23:14,w>225?18:16);
   const node=(x,y,v)=>'<circle cx="'+x+'" cy="'+y+'" r="26" fill="#e3effa" stroke="'+blue+'" stroke-width="3"/>'+wrapped(x,y+5,v,7,13);
   let content="";
   if(["star","star-failure","mesh-failure"].includes(kind)){
     const pts=[[280,84],[111,51],[449,51],[111,132],[449,132]];
     const edges=kind==="mesh-failure"?[[0,1],[0,2],[0,3],[0,4],[1,2],[1,3],[2,4],[3,4]]:[[0,1],[0,2],[0,3],[0,4]];
     edges.forEach(e=>{const p=pts[e[0]],q=pts[e[1]],broken=kind==="mesh-failure"&&e[0]===1&&e[1]===3;content+=segment(p[0],p[1],q[0],q[1],broken?red:green,broken?5:3,broken);});
     pts.forEach((p,i)=>{content+=node(p[0],p[1],boxes[i]||"N"+i);});
   }else if(kind==="lanwan"){
     content+=rect(16,19,246,122,"#e6f0fb")+rect(299,19,246,122,"#e3f2e9");
     content+=txt(139,42,"ONE SITE",18)+txt(422,42,"SEPARATE SITES",18);
     content+=node(90,95,"PC")+node(187,95,"PC")+segment(117,95,160,95);
     content+=card(314,68,98,59,boxes[1]||"Site A","#e9f5ef")+card(437,68,98,59,boxes[2]||"Site B","#e9f5ef");
     content+=segment(412,100,437,100,blue,4,true);
   }else if(kind==="encryption"){
     content+=card(17,34,155,102,boxes[0]||"Readable data","#e1eefb");
     content+=card(211,36,136,98,"KEY","#e3f3e7");
     content+=card(386,34,156,102,boxes[2]||"Ciphertext","#f8eedb");
     content+='<path d="M253 65 v-11 a26 26 0 0 1 52 0 v11" stroke="'+green+'" stroke-width="5" fill="none"/>';
     content+=arrow(175,84,208,84)+arrow(351,84,382,84);
   }else if(["phishing","email-warning"].includes(kind)){
     content+=rect(21,27,212,115,"#e5effb");
     content+='<path d="M42 55 h62 v47 h-62z M42 55 l31 25 l31 -25" fill="none" stroke="'+red+'" stroke-width="4"/>';
     content+=txt(165,57,"URGENT!",21,red)+txt(164,103,"FAKE LINK",18,red);
     content+=arrow(237,84,304,84,red)+card(309,34,228,102,boxes[2]||"Password risk","#fbe9e5");
   }else if(["brute","lockout","login"].includes(kind)){
     const names=kind==="login"?["PASSWORD","SECOND FACTOR","ACCOUNT"]:["TRY 1","TRY 2","TRY 3"];
     names.forEach((v,i)=>{const x=19+i*182;content+=card(x,39,145,93,v,i===2?"#e2f2e7":"#e4effb");if(i<2)content+=arrow(x+148,86,x+179,86,kind==="login"?green:red);});
     content+=txt(481,151,kind==="login"?"CHECK":"LIMIT",16,kind==="login"?green:red);
   }else if(kind==="dos"){
     for(let i=0;i<4;i++){const y=36+i*33;content+='<circle cx="54" cy="'+y+'" r="13" fill="#e4effb" stroke="'+blue+'" stroke-width="2"/>'+segment(68,y,275,84+(y-85)*.14,red,3);}
     content+=card(277,45,145,86,boxes[1]||"Service busy","#fbe6e3");
     content+=card(448,52,96,72,"USERS","#e5f2e9");
     content+=txt(440,34,"X",24,red);
   }else if(kind==="intercept"){
     content+=card(17,68,139,68,boxes[0]||"Sender","#e3effb");
     content+=card(403,68,139,68,boxes[2]||"Receiver","#e3f1e9");
     content+=arrow(158,102,400,102,blue);
     content+='<circle cx="279" cy="32" r="27" fill="#f9ebe8" stroke="'+red+'" stroke-width="3"/>'+txt(279,40,"?",27,red)+segment(279,59,279,94,red,3,true);
   }else if(kind==="firewall"){
     content+=card(17,54,144,73,boxes[0]||"Traffic","#e3effb");
     content+='<path d="M282 31 l55 21 v40 c0 39 -33 56 -55 68 c-22 -12 -55 -29 -55 -68 v-40z" fill="#e2f3e8" stroke="'+green+'" stroke-width="4"/>';
     content+=txt(282,88,"RULES",20);
     content+=arrow(164,85,222,85,green);
     content+=arrow(343,85,401,85,green);
     content+=card(403,54,141,73,boxes[2]||"LAN","#e4f2e8");
     content+=txt(380,35,"ALLOW / BLOCK",15);
   }else if(kind==="ransomware"){
     content+=card(19,49,145,85,boxes[0]||"Files","#e4eef9");
     content+=card(209,49,145,85,"LOCKED","#f9e6e4");
     content+=card(398,49,145,85,boxes[2]||"Unavailable","#f6e9e3");
     content+=arrow(167,91,204,91,red)+arrow(357,91,394,91,red);
   }else if(kind==="wireless"){
     content+=card(20,41,153,94,boxes[0]||"Tablet","#e2eefb");
     content+=card(389,41,153,94,boxes[2]||"LAN","#e2f2e7");
     for(let i=0;i<3;i++){const radius=23+i*19;content+='<path d="M'+(280-radius)+' '+(75+radius*.18)+' Q280 '+(28-i*13)+' '+(280+radius)+' '+(75+radius*.18)+'" stroke="'+blue+'" stroke-width="3" fill="none"/>';}
     content+=segment(175,91,231,91,blue,4,true)+segment(331,91,386,91,blue,4,true);
   }else if(kind==="standard"){
     content+=card(17,43,160,92,boxes[0]||"Device A","#e3eefb");
     content+=card(201,43,160,92,boxes[1]||"Common rules","#f7ead2");
     content+=card(386,43,157,92,boxes[2]||"Device B","#e3f3e9");
     content+=arrow(180,88,197,88)+arrow(364,88,382,88);
   }else if(kind==="attack-patterns"){
     const x=[17,201,385];for(let i=0;i<3;i++){content+=card(x[i],38,160,100,boxes[i]||"THREAT",i===1?"#f7eedc":i===2?"#f8e8e8":"#e7eefb");}
   }else if(kind==="email"){
     content+=card(17,39,160,97,boxes[0]||"Sender","#e3eefb");
     content+=card(201,39,160,97,boxes[1]||"Mail server","#f4edda");
     content+=card(385,39,160,97,boxes[2]||"Receiver","#e5f3e9");
     content+=arrow(180,86,197,86)+arrow(363,86,382,86);
     content+=txt(281,157,"SEND / ACCESS EMAIL",15);
   }else if(kind==="compare"){
     content+=card(16,21,250,118,boxes[0]||"First","#e4effc");
     content+=card(294,21,250,118,boxes[1]||"Second","#e4f2e8");
   }else{
     const w=158,gap=37;
     for(let i=0;i<3;i++){
       const x=14+i*(w+gap);
       content+=card(x,34,w,100,boxes[i]||"?",["#e4effc","#e0f2e8","#f7eacf"][i]);
       if(i!==2)content+=arrow(x+w+2,84,x+w+gap-3,84);
     }
   }
   return '<figure class="j277-prompt-diagram"><svg viewBox="0 0 560 165" role="img" aria-label="'+esc(title)+'" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="558" height="163" rx="15" fill="#f6faf7" stroke="#b8d5c5" stroke-width="2"/>'+content+'</svg></figure>';
 }
 function diagram(kind){
  if(kind&&typeof kind==="object")return topicVisual(kind);
  if(["cpu-performance","cpu-speed","cpu-cache","cpu-cores","cpu-summary","cpu-we-compare"].includes(kind)){
    // GCSE J277 1.1.2 only. Taller, classroom-size drawings (not miniature badges).
    const frame=(label,contents)=>svgScene(label,contents)
      .replace('viewBox="0 0 560 232"','viewBox="0 0 560 340"')
      .replace('width="554" height="226"','width="554" height="334"');
    const speed=()=>frame("Comparing clock speeds: three GHz has more clock cycles each second than two GHz.",
      note(21,39,"CLOCK SPEED · cycles each second",24)+
      note(22,105,"2 GHz",25)+note(22,226,"3 GHz",25)+
      '<path d="M155 150 V96 H245 V150 H335 V96 H425 V150 H517" fill="none" stroke="#277959" stroke-width="6" stroke-linejoin="round"/>'+
      '<path d="M155 280 V225 H217 V280 H279 V225 H341 V280 H403 V225 H465 V280 H517" fill="none" stroke="#287caa" stroke-width="6" stroke-linejoin="round"/>'+
      note(158,176,"Same time period (schematic)",17)+
      note(22,319,"More cycles per second → faster processing",19));
    const cache=()=>frame("A CPU can find frequently used data and instructions faster in cache than by accessing main memory RAM.",
      note(22,38,"CACHE · fast access to stored data",24)+
      pill(20,96,148,110,"CPU","#e1effd",28)+
      pill(207,96,148,110,"CACHE","#ddf3e4",26)+
      pill(394,96,148,110,"RAM","#fae9d4",27)+
      '<path d="M170 150 H204 M197 143 L205 150 L197 157 M356 150 H391 M384 143 L392 150 L384 157" stroke="#317c5d" stroke-width="5" fill="none"/>'+
      note(22,252,"Cache holds frequently used instructions",19)+
      note(22,283,"and data close to the CPU.",19)+
      note(22,324,"Larger cache → fewer slower RAM accesses",18));
    const cores=()=>frame("A processor with four cores can work on more independent tasks at once than a processor with two cores.",
      note(22,39,"NUMBER OF CORES · tasks at once",24)+
      note(22,112,"2 CORES",21)+
      pill(162,76,164,78,"Task A","#e2edff",22)+
      pill(349,76,164,78,"Task B","#e2edff",22)+
      note(22,230,"4 CORES",21)+
      [0,1,2,3].map(i=>pill(98+i*114,194,103,78,"Task "+String.fromCharCode(65+i),"#def3e6",18)).join("")+
      note(22,321,"More cores → improved multitasking",19));
    const compare=()=>frame("CPU comparison. CPU A 3.2 GHz two cores and four MB cache; CPU B 2.8 GHz four cores and eight MB cache.",
      note(23,39,"COMPARE TWO CPUs · use all three factors",23)+
      pill(169,56,170,50,"CPU A","#e0edfc",23)+pill(364,56,170,50,"CPU B","#e3f3e7",23)+
      note(21,145,"CLOCK",19)+pill(174,115,158,46,"3.2 GHz","#e0edfc",21)+pill(369,115,158,46,"2.8 GHz","#e3f3e7",21)+
      note(21,215,"CORES",19)+pill(174,185,158,46,"2 cores","#e0edfc",21)+pill(369,185,158,46,"4 cores","#e3f3e7",21)+
      note(21,285,"CACHE",19)+pill(174,255,158,46,"4 MB","#e0edfc",21)+pill(369,255,158,46,"8 MB","#e3f3e7",21)+
      note(23,329,"Best CPU depends on the task.",19));
    const weCompare=()=>frame("We Do comparison: CPU C has 3.6 GHz, two cores and 4 MB cache; CPU D has 3.0 GHz, six cores and 12 MB cache.",
      note(23,39,"COMPARE TWO CPUs · RUNNING SEVERAL PROGRAMS",18)+
      pill(169,56,170,50,"CPU C","#e0edfc",23)+pill(364,56,170,50,"CPU D","#e3f3e7",23)+
      note(21,145,"CLOCK",19)+pill(174,115,158,46,"3.6 GHz","#e0edfc",21)+pill(369,115,158,46,"3.0 GHz","#e3f3e7",21)+
      note(21,215,"CORES",19)+pill(174,185,158,46,"2 cores","#e0edfc",21)+pill(369,185,158,46,"6 cores","#e3f3e7",21)+
      note(21,285,"CACHE",19)+pill(174,255,158,46,"4 MB","#e0edfc",21)+pill(369,255,158,46,"12 MB","#e3f3e7",21)+
      note(23,329,"Which features help when many programs are open?",17));
    return kind==="cpu-speed"?speed():kind==="cpu-cache"?cache():kind==="cpu-cores"?cores():kind==="cpu-we-compare"?weCompare():compare();
  }

  if(["embedded-systems","embedded-purpose","embedded-ipo","embedded-memory","embedded-features","embedded-washer","embedded-thermostat","embedded-crossing","embedded-tracker"].includes(kind)){
    // Purpose-built GCSE J277 1.1.3 diagrams. Labels fit a 560 by 340 viewbox.
    const frame=(label,content)=>svgScene(label,content)
      .replace('viewBox="0 0 560 232"','viewBox="0 0 560 340"')
      .replace('width="554" height="226"','width="554" height="334"');
    const arrow=(x1,y,x2,color="#347c5f")=>'<path d="M'+x1+' '+y+' H'+x2+' M'+(x2-12)+' '+(y-8)+' L'+x2+' '+y+' L'+(x2-12)+' '+(y+8)+'" fill="none" stroke="'+color+'" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>';
    if(kind==="embedded-systems"||kind==="embedded-purpose"){
      return frame("An embedded controller is a computer performing one specific task inside a larger device.",
        note(22,37,"EMBEDDED SYSTEM · ONE SPECIFIC JOB",22)+
        '<rect x="30" y="63" width="500" height="232" rx="21" fill="#ebf5ef" stroke="#589b76" stroke-width="4"/>'+
        note(53,98,"LARGER DEVICE",22)+
        pill(58,138,185,90,"SENSOR / INPUT","#e1effc",20)+
        pill(307,138,190,90,"CONTROLLER","#e0f3e6",20)+
        arrow(244,184,304)+
        note(60,269,"Computer built into a larger device",18));
    }
    if(kind==="embedded-ipo"){
      return frame("Input from a sensor is processed by the embedded controller, which directs an output.",
        note(24,38,"INPUT → PROCESS → OUTPUT",24)+
        pill(22,108,145,110,"SENSOR","#e2effb",25)+
        pill(207,108,145,110,"PROCESSOR","#dcefe2",21)+
        pill(391,108,145,110,"OUTPUT","#f6e9d5",23)+
        arrow(168,162,204)+arrow(353,162,389)+
        note(32,267,"Measure",20)+note(217,267,"Decide",20)+note(409,267,"Act",20)+
        note(22,316,"Example: temperature → decision → heater",18));
    }
    if(kind==="embedded-memory"){
      return frame("Embedded systems store a dedicated control program in non-volatile memory, with temporary data in RAM.",
        note(22,40,"STORED PROGRAM · WORKING DATA",22)+
        pill(30,83,234,132,"ROM / FLASH","#e0ecf8",24)+
        pill(296,83,234,132,"RAM","#e3f3e6",26)+
        note(59,257,"Program stays stored",19)+
        note(311,257,"Temporary values",19)+
        note(31,314,"Non-volatile",19)+note(312,314,"Volatile",19));
    }
    if(kind==="embedded-features"){
      return frame("Embedded systems often have specific purposes, simple interfaces and low-power requirements; some need real-time response.",
        note(24,40,"TYPICAL CHARACTERISTICS",24)+
        pill(24,67,244,94,"SPECIFIC JOB","#e1f1e9",22)+
        pill(292,67,244,94,"SIMPLE INTERFACE","#e4edf9",20)+
        pill(24,184,244,94,"LOW POWER","#f7ecd7",23)+
        pill(292,184,244,94,"TIMELY RESPONSE","#e9eefb",20)+
        note(31,318,"Often, not always: features depend on the device.",17));
    }
    if(kind==="embedded-washer"){
      return frame("A washing machine contains a dedicated controller, water-level sensor and motor output.",
        note(22,39,"I DO · WASHING MACHINE",24)+
        '<rect x="20" y="58" width="520" height="247" rx="19" fill="#edf5fa" stroke="#7ca1bb" stroke-width="3"/>'+
        '<circle cx="139" cy="188" r="86" fill="#daeaf4" stroke="#287a9a" stroke-width="6"/>'+
        '<circle cx="139" cy="188" r="55" fill="#f8fcff" stroke="#83adc4" stroke-width="4"/>'+
        '<path d="M104 183 Q145 163 174 189 Q145 220 104 183" stroke="#5c98b7" fill="none" stroke-width="5"/>'+
        pill(268,95,234,50,"WATER SENSOR","#e0effc",19)+
        pill(268,162,234,50,"CONTROLLER","#e1f5e8",19)+
        pill(268,229,234,50,"DRUM MOTOR","#f8e9d3",19)+
        '<path d="M382 145 V160 M382 213 V227" stroke="#2e7e61" stroke-width="5"/>'+
        note(26,330,"INPUT → PROCESS → OUTPUT",19));
    }
    if(kind==="embedded-thermostat"){
      return frame("A smart thermostat reads a temperature sensor and switches heating on or off.",
        note(22,37,"WE DO · SMART THERMOSTAT",22)+
        pill(22,103,152,119,"TEMPERATURE","#e0effc",19)+
        pill(203,103,152,119,"CONTROLLER","#def4e7",18)+
        pill(384,103,153,119,"HEATING","#f8e7d0",19)+
        arrow(175,160,201)+arrow(356,160,381)+
        note(41,266,"Sensor input",18)+note(214,266,"Decision",18)+note(395,266,"On / off",18)+
        note(25,316,"Dedicated job: monitor and control temperature",18));
    }
    if(kind==="embedded-crossing"){
      return frame("A pedestrian crossing receives a push-button input, processes the request and changes signal lights.",
        note(22,39,"WE DO · PEDESTRIAN CROSSING",21)+
        pill(24,99,148,112,"PUSH BUTTON","#e2effc",19)+
        pill(206,99,149,112,"CONTROLLER","#def3e6",18)+
        '<rect x="402" y="90" width="116" height="140" rx="20" fill="#eff3f6" stroke="#627c8e" stroke-width="4"/>'+
        '<circle cx="460" cy="129" r="24" fill="#ec5551"/><circle cx="460" cy="194" r="24" fill="#52b76c"/>'+
        arrow(175,154,203)+arrow(356,154,396)+
        note(24,270,"Input",20)+note(221,270,"Process",20)+note(420,270,"Lights",20)+
        note(24,317,"Dedicated job: control crossing signals",18));
    }
    if(kind==="embedded-tracker"){
      return frame("A fitness tracker uses a sensor and a simple display, often with low-power operation.",
        note(22,37,"WE DO · FITNESS TRACKER",22)+
        '<rect x="26" y="73" width="200" height="219" rx="35" fill="#e5f0f9" stroke="#718fa7" stroke-width="5"/>'+
        '<rect x="53" y="124" width="144" height="117" rx="15" fill="#d8f2e7" stroke="#6d9e83" stroke-width="3"/>'+
        note(81,182,"3 200",30)+note(81,216,"STEPS",17)+
        pill(272,79,257,67,"MOTION SENSOR","#dfedf9",18)+
        pill(272,164,257,67,"SMALL DISPLAY","#e1f2e8",19)+
        note(273,278,"Low power → longer battery life",18)+
        note(273,312,"Simple controls suit the job",18));
    }
  }
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
 function doNow(lesson){
  const qs=arr(lesson.r,([q],i)=>`<article class="donow-question"><strong>${i+1} · ${["LAST LESSON","EARLIER LEARNING","EARLIER LEARNING","HIGH CHALLENGE"][i]}${lesson.refs?" · "+escape(lesson.refs[i]):""}</strong>${lesson.retrievalVisuals&&lesson.retrievalVisuals[i]?visualPrompt(lesson.retrievalVisuals[i]):""}<p>${escape(q)}</p></article>`);
  const answers=arr(lesson.r,([q,answer],i)=>`<div class="donow-stage" hidden><div class="donow-review"><article class="donow-review-question"><span class="review-number">QUESTION ${i+1} OF 4 · ${["LAST LESSON","EARLIER LEARNING","EARLIER LEARNING","HIGH CHALLENGE"][i]}${lesson.refs?" · "+escape(lesson.refs[i]):""}</span><h2>Recall earlier learning</h2><p class="review-question">${escape(q)}</p></article><article class="donow-review-answer"><span class="review-label">ANSWER · EXPLAIN</span><p class="review-answer">${escape(answer)}</p></article></div></div>`);
  return `<section id="do-now" class="page phase-donow" data-phase-time="Retrieval from earlier lessons"><div class="donow-deck"><div class="donow-stage"><div class="donow-questions">${qs}</div></div>${answers}</div></section>`;
 }
 function newLearning(lesson){
  const stages=arr(lesson.c,([title,body],i)=>`<div class="nl-stage"${i?' hidden':''}><span class="nl-stage-label">STEP ${i+1} OF ${lesson.c.length}</span><h2>${escape(title)}</h2><p>${examWords(lesson,body)}</p><span class="nl-stage-count">${i+1} of ${lesson.c.length}</span></div>`);
  const visualKinds=lesson.vis==="cpu-performance"?["cpu-speed","cpu-cache","cpu-cores","cpu-summary"]:Array.isArray(lesson.visuals)?lesson.visuals:null;
  const visuals=visualKinds?visualKinds.map((type,i)=>`<div class="j277-cpu-visual" data-cpu-step="${i}"${i?" hidden":""}>${diagram(type)}</div>`).join(""):diagram(lesson.vis);
  return `<section id="new-learning" class="page phase-focus" data-phase-time="New learning"><div class="nl-focus"><article class="nl-reference"><span class="phase-tag">VISUAL REFERENCE · ${escape(lesson.s)}</span><h2>${escape(lesson.t)}</h2>${visuals}<div class="nl-reference-note"><strong>Remember:</strong> ${escape(lesson.memoryCue||(lesson.vis==="embedded-systems"?"Dedicated purpose → sensor/input → controller → output.":"Name the factor and explain its effect on performance."))}</div></article><article class="nl-explanation">${stages}</article></div></section>`;
 }

 function iDo(lesson){
  const isCpu=["cpu-performance","embedded-systems","diagram-spec"].includes(lesson.vis);
  const headings=lesson.m.headings||["Read the comparison","Explain cache size","Explain number of cores","Check all four marks"];
  const steps=arr(lesson.m.st,(step,i)=>`<div class="ido-step"${i?' hidden':''}><span class="ido-step-label">STEP ${i+1} OF ${lesson.m.st.length}</span>${isCpu?`<h2>${escape(headings[i]||"Explain the method")}</h2><p>${examWords(lesson,step)}</p>`:`<h2>${escape(step)}</h2>`}</div>`);
  const reference=isCpu
    ?`<h2>${escape(lesson.m.title||"Compare CPU specifications")}</h2>${diagram(lesson.idoVisual||lesson.vis)}<p class="j277-cpu-question">${examWords(lesson,lesson.m.q)}</p>`
    :`<h2>${escape(lesson.m.q)}</h2>${diagram(lesson.vis)}`;
  return `<section id="i-do" class="page phase-ido" data-phase-time="Teacher models"><div class="ido-focus-deck"><article class="ido-example"><div class="ido-reference"><span class="phase-tag">I DO · ONE COMPLETE MODEL</span>${reference}</div><div class="ido-method">${steps}</div></article></div></section>`;
 }
 function weDo(lesson){
  const isCpu=["cpu-performance","embedded-systems","diagram-spec"].includes(lesson.vis);
  const topics=lesson.wTitles||["Compare the processors","Clock speed","Cache size"];
  const views=lesson.wVisuals||["cpu-we-compare","cpu-speed","cpu-cache"];
  const cases=arr(lesson.w,(entry,i)=>{
    const [q,answer]=entry.length===3?[entry[1],entry[2]]:entry;
    const guided=isCpu&&Array.isArray(lesson.wSteps)&&Array.isArray(lesson.wSteps[i]);
    const stages=guided?arr(lesson.wSteps[i],([title,explanation],j)=>`<div class="wedo-step j277-cpu-guided-step"${j?' hidden':''}><span class="wedo-step-label">GUIDED PRACTICE · STEP ${j+1} OF ${lesson.wSteps[i].length}</span><h2>${escape(title)}</h2><p>${examWords(lesson,explanation)}</p></div>`):
      `<div class="wedo-step"><span class="wedo-step-label">YOUR TURN · THINK AND WRITE</span><h2>Explain your method</h2><p>Work on your mini-whiteboard. Be ready to justify your answer.</p></div><div class="wedo-step" hidden><span class="wedo-step-label">CHECK · MODEL ANSWER</span>${isCpu?`<h2>Model answer</h2><p>${examWords(lesson,answer)}</p>`:`<h2>${escape(answer)}</h2>`}</div>`;
    return `<article class="wedo-example"${i?' hidden':''}><div class="wedo-reference"><span class="phase-tag">WE DO ${i+1} OF ${lesson.w.length} · MINI-WHITEBOARDS</span><h2>${isCpu?escape(topics[i]||"CPU performance"):"Work it out together"}</h2>${isCpu?diagram(views[i]||"cpu-summary"):""}<p class="${isCpu?"j277-cpu-question":""}">${examWords(lesson,q)}</p>${!isCpu?(i===0?diagram(lesson.vis):`<p class="a1-we-hint">Use the same method as the I Do. Explain your first step before revealing.</p>`):""}</div><div class="wedo-practice">${stages}</div></article>`;
  });
  return `<section id="we-do" class="page phase-wedo" data-phase-time="Guided practice"${isCpu&&lesson.wSteps?' data-guided-steps="true"':''}><div class="wedo-focus-deck">${cases}</div></section>`;
 }
 function youDo(lesson,number){
  if(lesson.isAssessment){
    return `<section id="you-do" class="page phase-youdo j277-assessment" data-assessment-mode="true" data-phase-time="Independent assessment"><article class="j277-assessment-panel"><span class="phase-tag">45 MINUTES · 45 MARKS · INDEPENDENT</span><h2>Autumn 2 Assessment</h2><p>Open the question paper. Answer every question independently, showing working and linking explanations to the marks available. Do not view model answers during the assessment.</p><a class="j277-assessment-open" href="assessment.html" target="_blank" rel="noopener">Open the 45-mark assessment paper →</a><p class="j277-assessment-note">Teacher: release the separate worked answers only after the assessment has finished.</p></article></section>`;
  }
  const codeFirst=`<article class="exam-card youdo-question j277-code-first">
   <h3 class="j277-code-first-title"><img class="j277-code-first-logo" src="../../../assets/j277/code-first.svg" width="440" height="92" alt="CODE FIRST"></h3><p class="j277-code-topic">${escape(lesson.t)}</p>
   <div class="question-text"><div class="j277-code-content"><div class="j277-code-tasks">
   <p class="j277-code-start">Use your mini-whiteboard first. Predict, change, then extend.</p>
   <p><strong>1 · Predict:</strong> ${escape(lesson.k.q)}</p>
   <pre class="arithmetic">${escape(lesson.k.code)}</pre>
   ${arr(lesson.k.p,(p,i)=>`<p><strong>${i===0?"Check":i===1?"Change":"Extend"}:</strong> ${escape(p)}</p>`)}
   ${(Number(number)>=19||String(number)==="004")&&!lesson.isAssessment?'<p><a href="https://www.examreferencelanguage.co.uk/" target="_blank" rel="noopener">After whiteboards: open the OCR ERL editor →</a></p>':''}
   </div><aside class="j277-code-reference"><strong>Code First · MWB</strong>
   <p>Write and check the logic before using a computer.</p><span>${escape(lesson.t)}</span></aside></div></div></article>`;
  const paper=lesson.s.startsWith("1.1")?["qp11","ms11"]:lesson.s.startsWith("1.2")?["qp12","ms12"]:null;
  const exams=arr(lesson.e,([question],i)=>`<article class="exam-card youdo-question" hidden><span class="phase-tag">QUESTION ${i+2} · OCR J277 STYLE</span><h3>Exam practice</h3>${lesson.examVisuals&&lesson.examVisuals[i]?visualPrompt(lesson.examVisuals[i]):""}<div class="question-text"><p>${examWords(lesson,question)}</p>${i===0?`<p class="source-note">Practice question · source shown above. ${paper?`<a href="${PMT[paper[0]]}" target="_blank" rel="noopener">Related topic practice ↗</a> · <a href="${PMT[paper[1]]}" target="_blank" rel="noopener">related answers ↗</a>`:""}</p>`:""}</div></article>`);
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
 #you-do .question-text p{white-space:pre-line;line-height:1.5}
 #you-do .answer-card-pair{display:grid;grid-template-columns:1fr 1.1fr;gap:12px}
 #you-do .question-pane,#you-do .answer-pane{padding:14px;border:1px solid #c8dace;border-radius:12px}
 #you-do .question-pane{background:#eff8f3}
 #you-do .answer-pane{background:#fff}
 @media(max-width:900px){#you-do .answer-card-pair{grid-template-columns:1fr}}
 #new-learning .nl-stage .a1-scene{width:100%;max-width:560px;margin:.7rem auto}
 #new-learning .nl-stage .a1-scene svg{max-height:min(30vh,255px)}
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

 /* Lesson 019: larger visuals, balanced two-panel classroom layout.
    Scoped to J277 CPU; shared H446 classroom CSS stays untouched. */
 @media(min-width:901px){
  .j277-visual-lesson #new-learning .nl-focus{grid-template-columns:minmax(0,1.25fr) minmax(0,.75fr);gap:14px}
  .j277-visual-lesson #new-learning .nl-reference,
  .j277-visual-lesson #new-learning .nl-explanation{padding:clamp(12px,1.3vw,19px)}
 }
 .j277-visual-lesson #new-learning .nl-reference h2{font-size:clamp(23px,1.6vw,30px);line-height:1.2;margin:0 0 9px}
 .j277-visual-lesson #new-learning .nl-explanation h2{font-size:clamp(22px,1.55vw,29px);line-height:1.23;margin:0 0 13px}
 .j277-visual-lesson #new-learning .nl-stage p{font-size:clamp(17px,1.12vw,21px);line-height:1.35}
 .j277-visual-lesson #new-learning .nl-reference-note{font-size:clamp(14px,1vw,17px);padding:9px 12px}
 .j277-visual-lesson #new-learning .j277-cpu-visual{flex:1;min-height:0;display:flex;align-items:center;justify-content:center}
 .j277-visual-lesson #new-learning .j277-cpu-visual[hidden]{display:none!important}
 .j277-visual-lesson #new-learning .nl-reference .j277-cpu-visual .a1-scene{width:100%;max-width:none;margin:0;display:block}
 .j277-visual-lesson #new-learning .nl-reference .j277-cpu-visual svg{
   width:100%;height:auto;max-height:min(68vh,610px);display:block
 }
 .j277-visual-lesson #i-do .ido-reference h2,
 .j277-visual-lesson #we-do .wedo-reference h2{font-size:clamp(21px,1.4vw,27px);line-height:1.24}
 .j277-visual-lesson #i-do .ido-method .ido-step h2,
 .j277-visual-lesson #we-do .wedo-practice .wedo-step h2{font-size:clamp(20px,1.32vw,25px);line-height:1.28}
 .j277-visual-lesson #i-do .ido-reference .a1-scene,
 .j277-visual-lesson #we-do .wedo-reference .a1-scene{max-width:none;width:100%}
 .j277-visual-lesson #i-do .ido-reference .a1-scene svg,
 .j277-visual-lesson #we-do .wedo-reference .a1-scene svg{max-height:min(45vh,460px);width:100%;height:auto}
 .j277-visual-lesson #i-do .ido-reference p,
 .j277-visual-lesson #we-do .wedo-reference p{font-size:clamp(17px,1.1vw,21px);line-height:1.35}
 @media(max-width:900px){
  .j277-visual-lesson #new-learning .nl-focus{grid-template-columns:1fr}
  .j277-visual-lesson #new-learning .j277-cpu-visual{flex:none}
  .j277-visual-lesson #new-learning .nl-reference .j277-cpu-visual svg{max-height:none}
  .j277-visual-lesson #i-do .ido-reference .a1-scene svg,
  .j277-visual-lesson #we-do .wedo-reference .a1-scene svg{max-height:none}
 }

 .j277-visual-lesson #we-do .j277-cpu-guided-step h2{
   font-size:clamp(21px,1.55vw,28px);
   line-height:1.23;
   margin:0 0 13px;
 }
 .j277-visual-lesson #we-do .j277-cpu-guided-step p{
   font-size:clamp(19px,1.3vw,24px);
   font-weight:550;
   line-height:1.45;
   overflow-wrap:anywhere;
 }
 .j277-visual-lesson #we-do .j277-cpu-guided-step{
   min-height:230px;
   justify-content:flex-start;
 }
 .j277-visual-lesson .j277-assessment-panel{
   margin:0 auto;max-width:960px;height:100%;overflow:auto;
   border:1px solid var(--line);border-top:7px solid var(--green);
   background:white;border-radius:14px;padding:clamp(20px,3vw,42px);
   display:flex;flex-direction:column;gap:18px;
 }
 .j277-visual-lesson .j277-assessment-panel h2{font-size:clamp(27px,2.2vw,42px);line-height:1.2;margin:0}
 .j277-visual-lesson .j277-assessment-panel p{font-size:clamp(19px,1.5vw,25px);line-height:1.4;margin:0}
 .j277-visual-lesson .j277-assessment-open{
   padding:17px 23px;display:inline-block;align-self:flex-start;
   text-decoration:none;background:#28694c;color:#fff;
   font-size:clamp(18px,1.35vw,23px);font-weight:850;border-radius:10px;
 }
 .j277-visual-lesson .j277-assessment-note{font-size:clamp(15px,1.1vw,18px);color:#445448}
 .j277-assessment-lesson .youdo-solutions-link{display:none!important}

 /* Extra diagram-led teaching for Year 10, opt-in lessons only. */
 .j277-dense-visual #do-now .donow-question{
   padding:clamp(10px,1vw,15px);
 }
 .j277-dense-visual #do-now .donow-question > strong{
   margin-bottom:6px;
   font-size:clamp(11px,.88vw,13px);
 }
 .j277-dense-visual #do-now .donow-question p{
   font-size:clamp(17px,1.34vw,23px);
   line-height:1.25;
   overflow-wrap:anywhere;
 }
 .j277-dense-visual .j277-prompt-diagram{
   width:100%;margin:6px auto 8px;
   flex:none;
 }
 .j277-dense-visual .j277-prompt-diagram svg{
   display:block;
   width:100%;
   height:auto;
   max-height:158px;
 }
 .j277-dense-visual #you-do .exam-card > .j277-prompt-diagram{
   margin:3px auto 12px;
   max-width:640px;
 }
 .j277-dense-visual #you-do .exam-card > .j277-prompt-diagram svg{
   max-height:170px;
 }
 .j277-dense-visual #you-do .exam-card .question-text{
   font-size:clamp(17px,1.2vw,20px);
   line-height:1.35;
   overflow-wrap:anywhere;
   overflow-y:auto;
 }
 .j277-dense-visual #you-do .exam-card .source-note{
   font-size:clamp(11px,.85vw,13px);
   line-height:1.22;
 }
 @media(max-height:775px) and (min-width:901px){
   .j277-dense-visual #do-now .j277-prompt-diagram svg{max-height:115px}
   .j277-dense-visual #you-do .exam-card > .j277-prompt-diagram svg{max-height:125px}
   .j277-dense-visual #do-now .donow-question p{font-size:18px}
 }
 @media(max-width:900px){
   .j277-dense-visual #do-now .j277-prompt-diagram svg{max-height:none}
   .j277-dense-visual #you-do .exam-card > .j277-prompt-diagram svg{max-height:none}
 }
 /* Selective yellow highlighter for OCR exam wording (keeps diagrams and code unmarked). */
 .j277-visual-lesson mark.j277-exam-word{
   color:#29230b;
   background:#ffe477;
   font-weight:800;
   padding:0 .12em;
   border-radius:3px;
   box-decoration-break:clone;
   -webkit-box-decoration-break:clone;
 }
 /* Consistent readable typography; the SVG leads, then the question/explanation. */
 .j277-visual-lesson{
   --j277-cpu-title:clamp(24px,1.75vw,30px);
   --j277-cpu-copy:clamp(19px,1.24vw,22px);
 }
 .j277-visual-lesson #new-learning .nl-reference h2,
 .j277-visual-lesson #new-learning .nl-explanation h2,
 .j277-visual-lesson #i-do .ido-reference h2,
 .j277-visual-lesson #i-do .ido-method .ido-step h2,
 .j277-visual-lesson #we-do .wedo-reference h2,
 .j277-visual-lesson #we-do .wedo-practice .wedo-step h2{
   font-size:var(--j277-cpu-title);
   line-height:1.22;
   margin:0 0 12px;
 }
 .j277-visual-lesson #new-learning .nl-stage p,
 .j277-visual-lesson #i-do .ido-reference .j277-cpu-question,
 .j277-visual-lesson #i-do .ido-method .ido-step p,
 .j277-visual-lesson #we-do .wedo-reference .j277-cpu-question,
 .j277-visual-lesson #we-do .wedo-practice .wedo-step p{
   font-size:var(--j277-cpu-copy);
   line-height:1.42;
   font-weight:500;
   margin:8px 0 12px;
   overflow-wrap:break-word;
 }
 .j277-visual-lesson #i-do .ido-reference .j277-cpu-question,
 .j277-visual-lesson #we-do .wedo-reference .j277-cpu-question{
   padding:12px 15px;
   border-left:5px solid var(--green);
   background:var(--green-soft);
   border-radius:0 9px 9px 0;
 }
 .j277-visual-lesson #new-learning .nl-reference,
 .j277-visual-lesson #new-learning .nl-explanation,
 .j277-visual-lesson #i-do .ido-reference,
 .j277-visual-lesson #i-do .ido-method,
 .j277-visual-lesson #we-do .wedo-reference,
 .j277-visual-lesson #we-do .wedo-practice{
   min-width:0;
 }
 .j277-visual-lesson #new-learning .nl-reference .j277-cpu-visual{
   flex:1;display:flex;align-items:center;justify-content:center;min-height:0;
 }
 .j277-visual-lesson #new-learning .nl-reference .j277-cpu-visual .a1-scene{
   display:block;
   width:100%;
   max-width:none;
   margin:0 auto;
 }
 .j277-visual-lesson #new-learning .nl-reference .j277-cpu-visual svg{
   display:block;
   width:100%;
   height:auto;
   max-height:min(67vh,570px);
 }
 .j277-visual-lesson #i-do .ido-reference .a1-scene,
 .j277-visual-lesson #we-do .wedo-reference .a1-scene{
   width:100%;
   max-width:none;
   margin:5px 0 12px;
 }
 .j277-visual-lesson #i-do .ido-reference .a1-scene svg,
 .j277-visual-lesson #we-do .wedo-reference .a1-scene svg{
   display:block;
   width:100%;
   height:auto;
   max-height:min(42vh,370px);
 }
 .j277-visual-lesson #i-do .ido-example-count,
 .j277-visual-lesson #we-do .wedo-example-count{
   font-size:12px;
   margin-top:4px;
 }
 @media(min-width:901px){
   .j277-visual-lesson #new-learning .nl-focus{
     grid-template-columns:minmax(0,1.18fr) minmax(0,.82fr);
     gap:16px;
   }
   .j277-visual-lesson #i-do .ido-example,
   .j277-visual-lesson #we-do .wedo-example{
     grid-template-columns:minmax(0,1.08fr) minmax(0,1fr);
     gap:16px;
   }
 }
 @media(max-width:900px){
   .j277-visual-lesson #new-learning .nl-reference .j277-cpu-visual svg,
   .j277-visual-lesson #i-do .ido-reference .a1-scene svg,
   .j277-visual-lesson #we-do .wedo-reference .a1-scene svg{
     max-height:none;
   }
 }
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
   const cpuSync=["cpu-performance","embedded-systems","diagram-spec"].includes(lesson.vis)?'<script>(function(){const root=document.getElementById("new-learning");if(!root)return;const stages=[...root.querySelectorAll(".nl-stage")];const figures=[...root.querySelectorAll("[data-cpu-step]")];function sync(){const active=Math.max(0,stages.findIndex(s=>!s.hidden));figures.forEach((f,i)=>{f.hidden=i!==active;});}const obs=new MutationObserver(sync);stages.forEach(s=>obs.observe(s,{attributes:true,attributeFilter:["hidden"]}));sync();})();<\/script>':"";
 const html=sharedHead(number,lesson.t)+`<body class="${(["cpu-performance","embedded-systems","diagram-spec"].includes(lesson.vis)?"j277-visual-lesson":"")+(lesson.isAssessment?" j277-assessment-lesson":"")+(lesson.visualAuditV2?" j277-dense-visual":"")}"><a class="skip" href="#main">Skip to lesson</a><div class="navwrap">
   <a class="course-back" href="../../../j277-hub.html?year=10#lessons">← Year 10 lessons</a>
   <nav class="phase-nav" aria-label="Lesson phases">${arr(nav,(id,i)=>`<button type="button" data-page="${id}">${names[i]}</button>`)}</nav>
   <div class="nav-tools"><button id="advance" class="control-btn">Continue →</button><button id="previous" class="back-btn">← Previous</button><p id="page-count"></p></div></div>
   <div class="signal-wrap"><div class="signals" aria-label="Classroom routine"><span id="phase-logo" class="signal-tile signal-phase"></span><span id="behaviour-logo" class="signal-tile signal-routine"></span><span id="response-logo" class="signal-tile signal-response"></span></div><div class="signal-meta"><span id="phase-time" class="signal-phase-time"></span><span class="lesson-label">OCR J277 · Lesson ${number}<br>${escape(lesson.t)}</span></div></div>
   <main id="main">${parts.join("")}</main><div class="lesson-footer">Lesson ${number} · ${escape(lesson.t)} <span>Year 10 · OCR J277 · Original exam-style questions</span></div>
   <script src="../../../assets/h446-lesson/lesson.js?v=${["cpu-performance","embedded-systems","diagram-spec"].includes(lesson.vis)?"20261016-j277guided1":"20261014-j277retrievalrefs1"}"></script>${cpuSync}</body></html>`;
  document.open();document.write(html);document.close();
 }
 function renderAnswers(number,lesson){
  const questions=[lesson.k.q,...lesson.e.map(a=>a[0])];
  const answers=[lesson.k.a,...lesson.e.map(a=>a[1])];
  const sections=arr(questions,(q,i)=>`<section class="answer-stage"${i?' hidden':''}><article class="solution-card"><div class="answer-card-pair"><div class="question-pane"><span class="phase-tag">${i===0?"CODE FIRST · OCR ERL":"EXAM QUESTION "+i+" OF "+lesson.e.length}</span><h2>${i===0?"Coding task · "+escape(lesson.t):"Question"}</h2><p>${escape(q)}</p>${i===0?`<pre class="solution-code">${escape(lesson.k.code)}</pre>`:""}</div><div class="answer-pane"><span class="phase-tag">MODEL ANSWER · MARKING POINTS</span><h2>Worked answer ${i+1} of ${questions.length}</h2><pre class="solution-code">${escape(answers[i])}</pre></div></div></article></section>`);
  const html=`<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Lesson ${number} · Worked answers</title>
   <link rel="stylesheet" href="../../../assets/h446-lesson/lesson-base.css?v=20260929-1815"><link rel="stylesheet" href="../../../assets/h446-lesson/lesson-classroom.css?v=20261014-j277retrievalrefs1">
   <style>body.answer-page{height:100vh;overflow:hidden;background:var(--paper)}.answer-toolbar{height:56px;position:fixed;left:0;right:0;top:0;z-index:30;padding:0 3vw;display:flex;align-items:center;gap:18px;background:#fff;border-bottom:1px solid var(--line)}.answer-toolbar a{font-weight:850;text-decoration:none}.answer-counter{margin-left:auto;font-size:15px}.answer-stage[hidden]{display:none!important}main.answer-stage-wrap{height:100vh;margin:0;max-width:none;padding:72px 3vw 76px}.answer-stage{height:100%;display:flex;gap:14px}.solution-card{min-width:0;max-width:100%;overflow:auto;flex:1;border:1px solid var(--line);background:white;border-radius:12px;padding:20px}.solution-code{white-space:pre-wrap;line-height:1.5}.answer-card-pair{display:grid;grid-template-columns:minmax(280px,1fr) minmax(300px,1.25fr);gap:18px}.question-pane,.answer-pane{padding:16px;border-radius:12px}.question-pane{background:#f0f8f4;border:1px solid #c8dace}.answer-pane{background:#fff;border:1px solid #c8dace}.question-pane p{white-space:pre-wrap;line-height:1.55}.answer-controls{position:fixed;left:0;right:0;bottom:0;height:62px;padding:8px 3vw;display:flex;align-items:center;gap:12px;background:white;border-top:1px solid var(--line)}.answer-controls button,.answer-controls a{font:inherit;font-weight:800;border:1px solid var(--line);border-radius:9px;padding:9px 14px;background:white;cursor:pointer;text-decoration:none}.answer-controls #next-answer{margin-left:auto;background:var(--green);color:white}@media(max-width:900px){.answer-card-pair{grid-template-columns:1fr}body.answer-page{height:auto;overflow:auto}.answer-toolbar{position:sticky;height:auto;min-height:56px;padding:10px 14px;flex-wrap:wrap}main.answer-stage-wrap{height:auto;padding:16px 12px 80px}.answer-stage{height:auto}.solution-card{overflow:visible}.answer-controls{position:sticky;bottom:0}}</style></head>
   <body class="answer-page"><header class="answer-toolbar"><a href="index.html#you-do">← Back to You Do</a><strong>LESSON ${number} · WORKED ANSWERS</strong><span class="answer-counter" id="answer-counter">Answer 1 of ${questions.length}</span></header>
   <main class="answer-stage-wrap">${sections}</main><div class="answer-controls"><button type="button" id="previous-answer" disabled>← Previous</button><a href="index.html#you-do">Return to lesson</a><button type="button" id="next-answer">Next answer →</button></div>
   <script>const stages=[...document.querySelectorAll('.answer-stage')],previous=document.getElementById('previous-answer'),next=document.getElementById('next-answer'),counter=document.getElementById('answer-counter');let current=0;function showAnswer(i){current=Math.max(0,Math.min(i,stages.length-1));stages.forEach((stage,k)=>stage.hidden=k!==current);previous.disabled=current===0;next.textContent=current===stages.length-1?'Return to lesson →':'Next answer →';counter.textContent='Answer '+(current+1)+' of '+stages.length}next.onclick=()=>current<stages.length-1?showAnswer(current+1):location.assign('index.html#you-do');previous.onclick=()=>showAnswer(current-1);document.addEventListener('keydown',e=>{if(e.key==='ArrowRight')next.click();if(e.key==='ArrowLeft')previous.click()});showAnswer(0);<\/script></body></html>`;
  document.open();document.write(html);document.close();
 }
 function load(number,mode){
  const n=Number(number),from=String(number);
  fetch("../autumn2-"+from+".json?v=20261016-j277autumn2a",{cache:"no-store"}).then(r=>{if(!r.ok)throw Error("Cannot load lesson data");return r.json()}).then(all=>{
   const data=all[String(number)];if(!data)throw Error("Missing lesson "+number);
   if(!Array.isArray(data.r)||data.r.length!==4||!Array.isArray(data.v)||data.v.length<3||!Array.isArray(data.e)||data.e.length<3)throw Error("Incomplete lesson "+number);
   if(mode==="answers")renderAnswers(number,data);else renderLesson(number,data);
  }).catch(e=>{document.body.innerHTML='<p style="padding:24px;font:700 18px Arial,sans-serif">Lesson could not load: '+escape(e.message)+'</p>';});
 }
 window.J277Autumn2={render:load};
})();

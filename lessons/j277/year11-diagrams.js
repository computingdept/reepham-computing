(function(){
"use strict";
const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const C={ink:"#183c34",muted:"#527063",blue:"#4b82ac",light:"#e3effa",green:"#28795a",mint:"#e0f1e8",gold:"#bf8a31",cream:"#f9e9cd",pink:"#f6deda",grey:"#edf0ef"};
function R(x,y,w,h,fill=C.light,stroke="#a4c2b1",rad=12){return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="'+rad+'" fill="'+fill+'" stroke="'+stroke+'" stroke-width="2"/>'}
function T(x,y,v,size=18,colour=C.ink,anchor="middle",weight=750){return '<text x="'+x+'" y="'+y+'" font-family="Arial,Helvetica,sans-serif" font-weight="'+weight+'" font-size="'+size+'" fill="'+colour+'" text-anchor="'+anchor+'">'+esc(v)+'</text>'}
function L(x,y,x2,y2,color=C.green,head=true){return '<path d="M'+x+' '+y+'L'+x2+' '+y2+(head?' M'+(x2-9)+' '+(y2-7)+'L'+x2+' '+y2+'L'+(x2-9)+' '+(y2+7):'')+'" fill="none" stroke="'+color+'" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>'}
function box(x,y,w,h,v,fill=C.light,font=17){return R(x,y,w,h,fill)+T(x+w/2,y+h/2+6,String(v).slice(0,29),font)}
function indexed(items,opt={}){
 const a=items.slice(0,10),w=Math.min(74,(570-(a.length-1)*6)/a.length),x0=(640-a.length*w-(a.length-1)*6)/2;
 return a.map((v,i)=>{
   const active=opt.active===i,excluded=opt.excluded?.includes(i),done=opt.done?.includes(i);
   const fill=active?C.cream:excluded?C.grey:done?C.mint:C.light;
   return R(x0+i*(w+6),145,w,74,fill,active?C.gold:"#9fbdae",8)+T(x0+i*(w+6)+w/2,190,v,21,excluded?"#9aa5a0":C.ink)+T(x0+i*(w+6)+w/2,136,i,12,C.muted);
 }).join("");
}
function binaryBits(s,focus=0,hide=false){
 const v=String(s||"00000000").padStart(8,"0").slice(-8),width=62,gap=6,x=51;
 return [...v].map((b,i)=>R(x+i*(width+gap),113,width,77,focus===i?C.cream:b==="1"?C.mint:C.light,focus===i?C.gold:"#9cbdab",7)+T(x+i*(width+gap)+width/2,143,2**(7-i),14,C.muted)+T(x+i*(width+gap)+width/2,174,b,28)).join("");
}
function wave(focus){
 let p="";for(let i=0;i<560;i+=4){let y=180-76*Math.sin((i/560)*Math.PI*4);p+=(i===0?"M":"L")+(40+i)+" "+y+" ";}
 let out='<path d="'+p+'" fill="none" stroke="'+C.blue+'" stroke-width="4"/>'+L(40,180,610,180,C.muted,false);
 for(let i=0;i<12;i++){let x=58+i*46,y=180-76*Math.sin(((x-40)/560)*Math.PI*4);out+='<path d="M'+x+' 85V277" stroke="#d0dcd4" stroke-dasharray="5 5"/>';if(i<=focus*3+2)out+='<circle cx="'+x+'" cy="'+y+'" r="6" fill="'+C.gold+'" stroke="'+C.ink+'"/>';}
 return out+T(320,307,"Sample points measure amplitude at regular intervals",17);
}
function draw(spec){
 const type=String(spec.y11||"generic"),a=Array.isArray(spec.values)?spec.values.map(String):[],n=Math.max(0,Math.min(3,Number(spec.focus)||0));
 const title=String(spec.title||"VISUAL MODEL"),label=String(spec.note||"").slice(0,92),target=String(spec.target??"");
 let h=T(28,46,title.slice(0,47),21,C.ink,"start",850)+T(609,46,"STEP "+(n+1),13,C.green,"end",850);
 if(type==="memory"){
  h+=box(25,114,125,90,"CPU",C.light,26)+box(213,114,140,90,"CACHE",n>=1?C.cream:C.mint,24)+box(417,114,180,90,"RAM",n>=2?C.cream:C.mint,25);
  h+=L(153,157,207,157)+L(359,157,411,157)+box(213,242,140,52,"ROM",C.grey,19)+T(424,271,"Startup instructions",16,C.muted,"start");
 }else if(type==="virtual"){
  h+=T(36,98,"PHYSICAL RAM",17,C.muted,"start")+T(365,98,"SECONDARY STORAGE",17,C.muted,"start");
  for(let i=0;i<4;i++)h+=R(40+i*62,125,56,82,i===3?C.cream:C.mint);
  for(let i=0;i<4;i++)h+=R(367+i*57,125,50,82,i<n?C.cream:C.grey);
  h+=L(298,168,350,168)+T(320,239,"Pages may be moved between RAM and storage",16);
  h+=T(320,275,"Secondary storage is slower than RAM",18,C.gold);
 }else if(type==="storage"){
  const names=["MAGNETIC","OPTICAL","SOLID STATE"],descs=["Magnetised surface","Laser reads pits/lands","Flash memory cells"];
  for(let i=0;i<3;i++){const x=22+i*205;h+=R(x,95,188,208,i===n%3?C.cream:i===2?C.mint:C.light)+T(x+94,138,names[i],18)+T(x+94,270,descs[i],13);if(i===0){h+='<circle cx="'+(x+94)+'" cy="198" r="43" fill="#b8cedd" stroke="'+C.blue+'" stroke-width="7"/><circle cx="'+(x+94)+'" cy="198" r="12" fill="#fff"/>';}else if(i===1){h+='<circle cx="'+(x+94)+'" cy="198" r="43" fill="#eff2f0" stroke="'+C.green+'" stroke-width="7"/><circle cx="'+(x+94)+'" cy="198" r="9" fill="'+C.grey+'" stroke="'+C.green+'"/>';}else{h+=R(x+58,163,72,70,C.mint,C.green)+T(x+94,204,"FLASH",14);}}
 }else if(type==="units"){
  const names=["bit","byte","kB","MB","GB"];for(let i=0;i<5;i++){h+=box(12+i*127,126,112,87,names[i],i===n?C.cream:C.light,24);if(i<4)h+=T(132+i*127,177,i===0?"÷8":"÷1000",14,C.muted);}
  h+=T(320,263,"Going to larger units: divide | Going to smaller units: multiply",18);
 }else if(type==="binary"){
  h+=binaryBits(a[0]||"10110100",n,!!spec.hide);h+=T(320,244,"128     64      32      16       8        4         2         1",13,C.muted);h+=T(320,295,"Read place values from left (MSB) to right (LSB)",17);
 }else if(type==="addition"){
  const A=(a[0]||"00010110").padStart(8,"0").slice(-8),B=(a[1]||"00001101").padStart(8,"0").slice(-8),result=((parseInt(A,2)+parseInt(B,2))%256).toString(2).padStart(8,"0");
  h+=T(70,113,"A",20,C.muted)+T(70,164,"B",20,C.muted)+T(70,224,"SUM",18,C.green);
  for(let j=0;j<8;j++){const x=130+j*57,col=7-j,active=col===n;h+=R(x,77,50,172,active?C.cream:C.light);h+=T(x+25,115,A[j],22)+T(x+25,164,B[j],22)+T(x+25,227,!spec.hide&&(n===3||col<=n)?result[j]:"?",22,C.green);}
  h+=T(320,285,"Work from the right-hand bit; carry 1 into the next column if needed.",17);
 }else if(type==="hex"){
  const v=(a[0]||"10101111").replace(/[^01]/g,"").padStart(8,"0").slice(-8);
  h+=binaryBits(v,n,!!spec.hide);
  h+=R(49,225,265,55,C.mint)+R(322,225,265,55,C.cream);
  h+=T(182,258,"High nibble: "+(spec.hide?"?":parseInt(v.slice(0,4),2).toString(16).toUpperCase()),17);
  h+=T(455,258,"Low nibble: "+(spec.hide?"?":parseInt(v.slice(4),2).toString(16).toUpperCase()),17);
 }else if(type==="pixels"){
  for(let r=0;r<6;r++)for(let c=0;c<8;c++){const colours=["#447ba8","#82bc9b","#f0c474","#d17e6b"];h+=R(106+c*50,86+r*38,48,36,colours[(r+c+n)%4],"#fff",1);}
  h+=T(320,343,"8 × 6 = 48 pixels in this schematic bitmap",16);
 }else if(type==="sound"){h+=wave(n);}
 else if(type==="decomp"){
  h+=box(196,78,248,62,a[0]||"Problem",C.cream,21);
  for(let i=0;i<3;i++){const x=24+i*204;h+=L(320,145,x+94,225,C.green,false)+box(x,225,190,74,a[i+1]||"Subproblem",i===n-1?C.cream:C.mint,16);}
 }else if(type==="flowchart"){
  h+=box(240,67,160,39,"START",C.light)+L(320,109,320,133);
  h+=box(221,136,197,56,a[0]||"Input value",C.mint,18)+L(320,197,320,218);
  h+='<path d="M320 220 L419 261 L320 307 L221 261 Z" fill="'+C.cream+'" stroke="'+C.gold+'" stroke-width="3"/>'+T(320,265,a[1]||"Valid?",16);
  h+=L(423,263,565,263)+T(483,248,"YES",13);h+=box(544,232,81,53,"NEXT",C.mint,16);
  h+='<path d="M217 260H120V164H217" stroke="'+C.green+'" stroke-width="3.5" fill="none"/>'+T(144,244,"NO",13);
 }else if(type==="trace"){
  const rows=a.length?a:["1,1","2,3","3,6","4,10"];
  const X=135,Y=86,w=370;h+=R(X,Y,w,48,C.light)+T(X+94,Y+31,"iteration",17)+T(X+275,Y+31,"total",17);
  for(let i=0;i<Math.min(4,rows.length);i++){let pair=rows[i].split(",");h+=R(X,Y+52+i*53,w,50,i===n?C.cream:i<n?C.mint:C.grey)+T(X+94,Y+86+i*53,pair[0]||i+1,20)+T(X+275,Y+86+i*53,i<=n&&!spec.hide?(pair[1]||"?"):"?",20);}
 }else if(type==="linear"){
  const values=a.length?a:["6","12","9","20","14","3","11"];h+=indexed(values,{active:spec.hide?-1:n});
  h+=T(320,266,"Target "+(target||"?")+" · inspect one element at a time",19);
 }else if(type==="binarysearch"){
  const values=a.length?a:["3","7","11","15","19","23","27","31"];let low=0,high=values.length-1,mid=0;let discarded=[];
  for(let i=0;i<=n;i++){mid=Math.floor((low+high)/2);const num=Number(values[mid]);if(String(values[mid])===target||i===n)break;if(num<Number(target))low=mid+1;else high=mid-1;if(low>high)break;}
  for(let j=0;j<values.length;j++)if(j<low||j>high)discarded.push(j);
  h+=indexed(values,{active:spec.hide?-1:mid,excluded:discarded});h+=T(320,261,"LOW "+low+"     MID "+mid+"     HIGH "+high,20)+T(320,300,"Sorted data required; discard the half that cannot contain the target",16);
 }else if(type==="bubble"||type==="insertion"){
  let ar=(a.length?a:["5","2","8","1","4"]).map(Number),focus=n;
  if(type==="bubble"){if(!spec.hide)for(let i=0;i<=focus;i++){let j=i%Math.max(1,ar.length-1);if(ar[j]>ar[j+1]){let t=ar[j];ar[j]=ar[j+1];ar[j+1]=t;}}
    h+=indexed(ar.map(String),{active:focus%Math.max(1,ar.length-1)});h+=T(320,265,"Compare neighbouring values; swap when the left value is larger",18);
  }else{if(!spec.hide)for(let i=1;i<=Math.min(focus+1,ar.length-1);i++){let key=ar[i],j=i-1;while(j>=0&&ar[j]>key){ar[j+1]=ar[j];j--;}ar[j+1]=key;}
    h+=indexed(ar.map(String),{active:Math.min(focus+1,ar.length-1),done:[...Array(Math.min(focus+2,ar.length)).keys()]});h+=T(320,264,"Keep a sorted prefix; insert the next value in its correct position",17);
  }
 }else if(type==="merge"){
  const vals=a.length?a:["8","3","5","1","7","2","6","4"],half=Math.ceil(vals.length/2);
  h+=box(90,76,460,42,vals.join("  "),C.light,18);
  if(n>=1){
    h+=L(320,121,168,142)+L(320,121,469,142);
    h+=box(20,147,285,43,vals.slice(0,half).join("  "),C.cream,17);
    h+=box(335,147,285,43,vals.slice(half).join("  "),C.cream,17);
    const chunks=[];for(let i=0;i<vals.length;i+=Math.ceil(vals.length/4)){chunks.push(vals.slice(i,i+Math.ceil(vals.length/4)))}
    chunks.slice(0,4).forEach((chunk,i)=>{h+=box(13+i*158,207,141,41,chunk.join("  "),C.light,17)});
  }
  if(n>=2){
    let pairs=[];for(let i=0;i<vals.length;i+=2)pairs.push(vals.slice(i,i+2).map(Number).sort((x,y)=>x-y).join(" "));
    pairs.slice(0,4).forEach((pair,i)=>{h+=box(13+i*158,265,141,35,pair,C.mint,17)});
  }
  if(n>=3)h+=box(95,311,450,38,vals.map(Number).sort((x,y)=>x-y).join("  "),C.mint,19);
 }else if(type==="compare"){
  h+=box(25,116,280,120,"LINEAR SEARCH",C.light,23)+box(335,116,280,120,"BINARY SEARCH",C.mint,23);
  h+=T(165,276,"Works on unsorted lists",17)+T(480,276,"Requires sorted data",17);
 }else{
  h+=box(22,130,180,92,a[0]||"INPUT",C.light)+L(206,174,228,174)+box(233,130,175,92,a[1]||"PROCESS",C.mint)+L(412,174,433,174)+box(440,130,175,92,a[2]||"OUTPUT",C.cream);
 }
 if(label)h+=T(320,337,label,14,C.muted);
 return '<figure class="a1-scene y11-scene" aria-label="'+esc(title)+'"><svg viewBox="0 0 640 360" role="img" aria-label="'+esc(title)+'" xmlns="http://www.w3.org/2000/svg">'+R(1,1,638,358,"#fbfdfc","#bfd4c7",16)+h+'</svg></figure>';
}
window.J277Y11Diagram=draw;
})();
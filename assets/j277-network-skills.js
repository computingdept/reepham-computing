/* RHS Computing · OCR J277 Networks practice.
   Three independent skills: address formats, network hardware, star/mesh topology.
   Client-side only; no real network traffic. The host owns Check / Clear / Next. */
(function(root){
'use strict';
const devices=['Switch','Router','Firewall','NIC','WAP'];
const addressExamples=[
 ['IPv4','192.168.1.25'],['MAC','00:1A:2B:3C:4D:5E'],['IPv6','2001:0db8:0000:0000:0000:0000:0000:0001'],
 ['IPv4','10.0.0.8'],['IPv6','2001:db8::1'],['MAC','A4-C3-F0-02-1B-9E'],
 ['IPv4','172.16.20.4'],['IPv6','fe80::1'],['MAC','AA:BB:CC:DD:EE:FF'],['IPv4','203.0.113.40']
];
const validSets=[
 {family:'IPv4',options:['192.168.1.25','192.168.300.5','192.168.1'],right:0},
 {family:'MAC',options:['AB:2G:CC:DD:EE:FF','AB:2C:CC:DD:EE:FF','AB:2C:CC:DD:EE'],right:1},
 {family:'IPv6',options:['2001:db8::1','2001:db8::GG','2001:db8:1:2:3:4:5:6:7'],right:0},
 {family:'IPv4',options:['10.0.0.256','10.0.0.1','10.0.0.-1'],right:1},
 {family:'MAC',options:['11:22:33:44:55:66:77','11:22:33:44:55:6Z','11:22:33:44:55:66'],right:2},
 {family:'IPv6',options:['fd00:1:2:3:4:5:6:7','fd00:1:2:3:4:5:6:GG','fd00:1:2:3:4:5:6:7:8'],right:0},
 {family:'IPv4',options:['172.16.0.15','172.16.0.15.9','172.16.0.999'],right:0},
 {family:'MAC',options:['DE-AD-BE-EF-00-01','DE-AD-BE-EF-00','DE-AD-BE-EF-00-GG'],right:0},
 {family:'IPv6',options:['2001:db8:0:0:0:0:0:1','2001:db8:0:0:0:0:0:1:2','2001:db8:0:0:0:0:0:XYZ'],right:0},
 {family:'IPv4',options:['203.0.113.5','203.0.113.500','203.0.113.5.2'],right:0}
];
const repairSets=[
 ['IPv4','192.168.300.15',2],['MAC','AA:BB:CC:GG:EE:FF',3],
 ['IPv6','2001:0db8:0000:ZZZZ:0000:0000:0000:0001',3],
 ['IPv4','10.260.5.4',1],['MAC','11:22:33:44:5X:66',4],
 ['IPv6','fe80:0000:0000:0000:0000:GGGG:0000:0001',5],
 ['IPv4','172.16.999.20',2],['MAC','D0:EA:45:67:8Z:00',4],
 ['IPv6','2001:db8:0:0:0:0:ZZ:1',6],['IPv4','203.0.113.400',3]
];
const hardwareCases=[
 ['A computer needs to connect to an Ethernet network. Which component provides its network interface?','NIC','A network interface controller lets the device connect to a network.'],
 ['Several wired classroom computers need to communicate on the same LAN.','Switch','A switch connects devices on a LAN and forwards frames using MAC addresses.'],
 ['The school LAN needs to connect to the internet, a different network.','Router','A router connects networks and forwards packets according to IP addresses.'],
 ['Wireless tablets need to join the school’s existing LAN.','WAP','A wireless access point allows wireless devices to join the network.'],
 ['Traffic should be checked against rules and unwanted connections blocked.','Firewall','A firewall filters network traffic against security rules.'],
 ['Two printers and five PCs need wired connections within one room.','Switch','A switch connects wired devices within the local network.'],
 ['A laptop needs hardware to send and receive data over a network.','NIC','The NIC provides the device’s connection to the network.'],
 ['A building links its separate LAN to another network.','Router','A router forwards traffic between different networks.'],
 ['The school wants Wi-Fi connectivity for phones and tablets.','WAP','A WAP provides wireless access to the LAN.'],
 ['A school needs to filter incoming and outgoing network connections.','Firewall','Firewall rules determine which traffic is permitted or blocked.']
];
const hardwareWhy={
 'NIC':['Provides an interface for a device to connect to a network','Chooses the best route between different networks','Filters traffic using security rules'],
 'Switch':['Forwards frames between devices on the same LAN using MAC addresses','Connects different networks using IP addresses','Automatically blocks all viruses'],
 'Router':['Forwards packets between different networks using IP addresses','Connects only wireless devices','Stores webpages for DNS'],
 'WAP':['Lets wireless devices connect to a wired LAN','Translates website names into IP addresses','Replaces all network interface controllers'],
 'Firewall':['Uses security rules to allow or block traffic','Connects devices by their MAC addresses','Turns an IPv4 address into a MAC address']
};
const firewallCases=[
 ['Allow outbound HTTPS on port 443; block other outbound ports.','Outgoing','TCP',443,'Allow','It matches the permitted HTTPS port 443.'],
 ['Allow outbound HTTPS on port 443; block other outbound ports.','Outgoing','TCP',80,'Block','Port 80 is not the allowed HTTPS port.'],
 ['Block all unsolicited incoming connections.','Incoming','TCP',23,'Block','The rule blocks unsolicited incoming traffic.'],
 ['Allow outgoing DNS queries on UDP port 53; block other UDP ports.','Outgoing','UDP',53,'Allow','It matches the permitted DNS query rule.'],
 ['Allow outgoing DNS queries on UDP port 53; block other UDP ports.','Outgoing','UDP',161,'Block','UDP port 161 does not match the allowed DNS port.'],
 ['Allow inbound HTTPS on TCP port 443; block other inbound ports.','Incoming','TCP',443,'Allow','Incoming TCP port 443 matches the permitted rule.'],
 ['Allow inbound HTTPS on TCP port 443; block other inbound ports.','Incoming','TCP',25,'Block','Incoming port 25 is not allowed by this rule.'],
 ['Block incoming TCP port 3389; allow other incoming TCP ports.','Incoming','TCP',3389,'Block','Incoming TCP port 3389 is specifically blocked.'],
 ['Block incoming TCP port 3389; allow other incoming TCP ports.','Incoming','TCP',443,'Allow','Port 443 is not the blocked TCP port.'],
 ['Allow outbound HTTPS on port 443; block other outbound ports.','Outgoing','TCP',22,'Block','Port 22 does not match the permitted rule.']
];
const topologyCases=[
 ['A class needs five PCs and two printers connected cheaply through a central switch.','Star','Uses a central switch with fewer cables than a full mesh.'],
 ['A network needs alternative direct routes if one cable between devices fails.','Full mesh','Other connections can provide another path when a link fails.'],
 ['A school computer room wants easy addition of new wired computers.','Star','Each new device can have its own connection to the switch.'],
 ['A small critical network prioritises multiple redundant links over cost.','Full mesh','Multiple direct links provide resilience at greater cable cost.'],
 ['The technician wants a central device to manage classroom connections.','Star','The central switch is the connecting point for the devices.'],
 ['A network must avoid relying on a single central switch.','Full mesh','The devices have multiple direct links rather than one central switch.'],
 ['A classroom has a limited budget and needs seven wired devices.','Star','A star usually needs much less cabling than a full mesh.'],
 ['A network can afford many links and needs to survive one cable failure.','Full mesh','A full mesh has other connections if one cable fails.'],
 ['A small office wants simple installation and fault isolation for individual device cables.','Star','A device cable failure need not stop the other switch links.'],
 ['A critical network accepts greater installation complexity for redundancy.','Full mesh','A full mesh provides multiple routes, but is more expensive and complex.']
];
const topologyReasons=[
 'Uses a central switch with fewer cables than a full mesh.',
 'Other connections can provide another path when a link fails.',
 'Each new device can have its own connection to the switch.',
 'Multiple direct links provide resilience at greater cable cost.',
 'The central switch is the connecting point for the devices.',
 'The devices have multiple direct links rather than one central switch.',
 'A star usually needs much less cabling than a full mesh.',
 'A full mesh has other connections if one cable fails.',
 'A device cable failure need not stop the other switch links.',
 'A full mesh provides multiple routes, but is more expensive and complex.'
];
const breaks=[
 ['Star','switch','The central switch stops working.','All devices lose their connections through that switch.'],
 ['Star','link','The cable between one PC and the switch breaks.','Only the connected PC loses its link; the other PCs remain connected.'],
 ['Full mesh','link','One cable between two PCs breaks.','The PCs can still communicate through other connected devices.'],
 ['Star','link','A computer’s cable to the central switch breaks.','That computer loses its network link; other devices can still communicate.'],
 ['Full mesh','link','A single direct connection between two devices breaks.','Other routes still exist between the devices.'],
 ['Star','switch','The only central switch loses power.','The whole star loses connectivity via its central point.'],
 ['Full mesh','link','One of the many device-to-device links is damaged.','Remaining links provide an alternative path.'],
 ['Star','link','One computer is unplugged from its switch port.','Other devices on the working switch can still communicate.'],
 ['Full mesh','link','A single connection between two mesh nodes fails.','The nodes can use alternative routes through other nodes.'],
 ['Star','switch','The central switch has a complete hardware failure.','All connected devices lose the network connection through it.']
];
function el(t,cls,txt){const x=document.createElement(t);if(cls)x.className=cls;if(txt!==undefined)x.textContent=txt;return x;}
function ns(t){return document.createElementNS('http://www.w3.org/2000/svg',t);}
function svgEl(tag,attrs,txt){const e=ns(tag);for(const k in attrs)e.setAttribute(k,String(attrs[k]));if(txt!==undefined)e.textContent=txt;return e;}
function choiceGroup(host,options,get,set,lock,cls){
 const box=el('div','net-choices'+(cls?' '+cls:''));
 options.forEach(value=>{
  const b=el('button','net-choice',value);b.type='button';
  const update=()=>{b.classList.toggle('selected',get()===value);b.setAttribute('aria-pressed',String(get()===value));};
  b.addEventListener('click',()=>{if(lock())return;set(value);[...box.children].forEach(x=>{x.classList.toggle('selected',x.textContent===get());x.setAttribute('aria-pressed',String(x.textContent===get()));});});
  update();box.append(b);
 });host.append(box);return box;
}
function validIPv4(s){const parts=s.split('.');return parts.length===4&&parts.every(a=>/^(0|[1-9][0-9]{0,2})$/.test(a)&&Number(a)<=255);}
function validMac(s){return /^(?:[0-9A-F]{2}:){5}[0-9A-F]{2}$/i.test(s)||/^(?:[0-9A-F]{2}-){5}[0-9A-F]{2}$/i.test(s);}
function validIPv6(s){
 if(!/^[0-9a-f:]+$/i.test(s)||s.includes(':::'))return false;
 const xs=s.split('::');if(xs.length>2)return false;
 const full=part=>part===''?[]:part.split(':');
 const left=full(xs[0]),right=xs.length===2?full(xs[1]):[];
 const all=left.concat(right);
 if(!all.every(g=>/^[0-9a-f]{1,4}$/i.test(g)))return false;
 return xs.length===2?all.length<8:all.length===8;
}
function isValidAddress(f,s){return f==='IPv4'?validIPv4(s):f==='MAC'?validMac(s):validIPv6(s);}
function explainFormat(f){return f==='IPv4'?'Four denary values from 0 to 255, separated by dots.':f==='MAC'?'Six pairs of hexadecimal digits (0–9, A–F), usually separated by colons or hyphens.':'Eight groups of hexadecimal in the full form (128 bits); :: can shorten consecutive zero groups.';}
function make(kind,level,index){
 if(!['address','hardware','topology'].includes(kind)||!['easy','medium','hard'].includes(level))throw new Error('Unknown network practice');
 const p={type:'networkskill',kind,level,index,context:'OCR J277 · '+(kind==='hardware'?'1.3.1 / 1.4.2':'1.3.1')+' · Simulated practice'};
 if(kind==='address'){
  if(level==='easy'){const a=addressExamples[index%addressExamples.length];Object.assign(p,{mode:'identify',example:a[1],expected:a[0],prompt:'Which type of network address is shown?',hint:'Look at the separators: dots, pairs of hex digits, or groups of hex digits.',why:explainFormat(a[0])});}
  else if(level==='medium'){const a=validSets[index%validSets.length];Object.assign(p,{mode:'choose-valid',family:a.family,options:a.options,expected:a.options[a.right],prompt:'Choose the valid '+a.family+' address.',hint:explainFormat(a.family),why:explainFormat(a.family)});}
  else{const a=repairSets[index%repairSets.length];Object.assign(p,{mode:'repair',family:a[0],example:a[1],badIndex:a[2],prompt:'Repair this invalid '+a[0]+' address. Change only the invalid group.',hint:explainFormat(a[0]),why:'A corrected '+a[0]+' address has valid groups while all other groups stay unchanged.'});}
 }else if(kind==='hardware'){
  if(level!=='hard'){const a=hardwareCases[index%hardwareCases.length];Object.assign(p,{mode:level==='easy'?'identify':'explain',scenario:a[0],expected:a[1],reason:a[2],prompt:level==='easy'?'Which network component is needed?':'Choose the device AND explain its job.',hint:'Switch = same LAN; Router = different networks; Firewall = filter traffic; NIC = device interface; WAP = Wi-Fi.',why:a[2]});}
  else{const a=firewallCases[index%firewallCases.length];Object.assign(p,{mode:'firewall',rule:a[0],direction:a[1],protocol:a[2],port:a[3],expected:a[4],reason:a[5],prompt:'Apply the firewall rule: should this traffic be allowed or blocked?',hint:'Compare direction, protocol and port against the exact rule.',why:a[5]});}
 }else{
  if(level==='easy'){const mesh=index%2===1;Object.assign(p,{mode:'build',shape:mesh?'Full mesh':'Star',prompt:mesh?'Build a full mesh: connect every pair of PCs.':'Build a star: connect each PC to the central switch.',hint:mesh?'A full mesh has a direct cable between every pair of nodes.':'For a star, every PC has one cable to the switch; no PC-to-PC cables.',why:mesh?'Four fully meshed devices need six direct links.':'Four PCs connected to one switch need four cables.'});}
  else if(level==='medium'){const a=breaks[index%breaks.length];Object.assign(p,{mode:'failure',shape:a[0],failure:a[1],scenario:a[2],expected:a[3],prompt:'Predict the effect of this network failure.',hint:'In a star, the switch is central. In a full mesh, alternative links can exist.',why:a[3]});}
  else{const a=topologyCases[index%topologyCases.length];Object.assign(p,{mode:'decide',scenario:a[0],expected:a[1],reason:a[2],prompt:'Choose the best topology AND justify your choice.',hint:'Star uses a central switch and less cabling; full mesh offers multiple direct links but costs more.',why:a[2]});}
 }
 return p;
}
const coords={S:[250,128],A:[65,34],B:[435,34],C:[65,219],D:[435,219]};
const starEdges=['SA','SB','SC','SD'];
const meshEdges=['AB','AC','AD','BC','BD','CD'];
function topologyDiagram(host,shape,selected,failed){
 const svg=svgEl('svg',{viewBox:'0 0 500 254',role:'img','aria-label':shape+' network diagram showing selected cables'});
 svg.classList.add('net-topology-svg');
 const isStar=shape==='Star',active=isStar?starEdges:meshEdges;
 const edges=[...new Set(active.concat(selected||[]))];
 edges.forEach((id,i)=>{
  const start=coords[id[0]],end=coords[id[1]],picked=(selected||active).includes(id);
  const line=svgEl('line',{x1:start[0],y1:start[1],x2:end[0],y2:end[1],stroke:picked?'#13794c':'#cbd6d0','stroke-width':picked?4:2,'stroke-dasharray':picked?'none':'5 5'});
  if(failed==='link'&&id===active[0]){line.setAttribute('stroke','#be3c35');line.setAttribute('stroke-dasharray','7 4');}
  svg.append(line);
 });
 for(const id of (isStar?['S','A','B','C','D']:['A','B','C','D'])){
  const [x,y]=coords[id];const central=id==='S';
  const broken=central&&failed==='switch';
  svg.append(svgEl(central?'rect':'circle',central?{x:x-37,y:y-20,width:74,height:40,rx:8,fill:broken?'#ffe4e2':'#185b45',stroke:broken?'#ba342e':'#185b45','stroke-width':2}:{cx:x,cy:y,r:22,fill:'#e7f3ed',stroke:'#42836a','stroke-width':2}));
  svg.append(svgEl('text',{x,y:y+5,'text-anchor':'middle',fill:central&&!broken?'#fff':'#163d2e','font-size':central?13:16,'font-weight':'700'},central?'Switch':id));
 }
 host.append(svg);
}
function hardwareDiagram(host){
 const view=el('div','net-hardware-map');
 view.innerHTML='<svg viewBox="0 0 600 126" role="img" aria-label="A wired PC with NIC connects to a switch. Wireless devices use a WAP. The switch connects to a router and firewall towards the internet." xmlns="http://www.w3.org/2000/svg"><path d="M82 64H145M226 64H278M360 64H404M485 64H531M185 92V112H94" fill="none" stroke="#78a594" stroke-width="3"/><rect x="5" y="43" width="77" height="43" rx="8" fill="#ecf4f1" stroke="#619580"/><rect x="145" y="43" width="81" height="43" rx="8" fill="#e3f1e9" stroke="#609784"/><rect x="278" y="43" width="82" height="43" rx="8" fill="#e3f1e9" stroke="#609784"/><rect x="404" y="43" width="81" height="43" rx="8" fill="#f5f0e0" stroke="#b7a66a"/><rect x="531" y="43" width="65" height="43" rx="8" fill="#f2f5f5" stroke="#8a9e9c"/><rect x="50" y="101" width="82" height="22" rx="7" fill="#e3f1e9" stroke="#609784"/><g fill="#163d2e" font-family="system-ui" font-size="12" text-anchor="middle" font-weight="700"><text x="44" y="60">PC</text><text x="44" y="74" font-size="10">NIC</text><text x="185" y="67">Switch</text><text x="319" y="67">Router</text><text x="444" y="67">Firewall</text><text x="565" y="68">Internet</text><text x="91" y="117">Wi-Fi / WAP</text></g></svg>';
 host.append(view);
}
function render(p,target,isLocked,setReady){
 const board=el('div','net-board'); const state={selected:'',reason:'',entry:'',edges:[]};
 const note=el('p','net-info');
 const heading=el('div','net-heading');
 const section=el('div','net-section');
 board.append(heading,section,note);target.append(board);
 if(p.kind==='address'){
  heading.textContent=p.mode==='identify'?'READ THE ADDRESS':p.mode==='repair'?'REPAIR THE ADDRESS':'FIND THE VALID ADDRESS';
  if(p.example)section.append(el('div','net-address-sample',p.example));
  if(p.mode==='identify'){
   choiceGroup(section,['IPv4','IPv6','MAC'],()=>state.selected,v=>state.selected=v,isLocked);
  }else if(p.mode==='choose-valid'){
   section.append(el('p','net-subtitle','Exactly one of these is correctly formatted.'));
   choiceGroup(section,p.options,()=>state.selected,v=>state.selected=v,isLocked,'net-address-options');
  }else{
   const field=el('input','net-address-input');
   field.type='text';field.autocomplete='off';field.spellcheck=false;field.value='';
   field.setAttribute('aria-label','Corrected '+p.family+' address');field.placeholder='Type the complete corrected address';
   field.addEventListener('input',()=>{if(!isLocked())state.entry=field.value.trim();});
   section.append(field);
   note.textContent='Keep every valid group as shown. Change only the group containing the error.';
  }
  if(p.mode!=='repair')note.textContent=p.mode==='identify'?'Select the address type, then check.':'Look carefully at every group and separator.';
 }else if(p.kind==='hardware'){
  heading.textContent=p.mode==='firewall'?'FIREWALL · ALLOW OR BLOCK?':'NETWORK HARDWARE';
  hardwareDiagram(section);
  if(p.mode==='firewall'){
   section.append(el('div','net-rule','RULE: '+p.rule));
   section.append(el('div','net-traffic','TRAFFIC: '+p.direction+' · '+p.protocol+' · Port '+p.port));
   choiceGroup(section,['Allow','Block'],()=>state.selected,v=>state.selected=v,isLocked);
   note.textContent='A firewall applies its stated rules. It does not automatically block all traffic.';
  }else{
   section.append(el('p','net-scenario',p.scenario));
   choiceGroup(section,devices,()=>state.selected,v=>state.selected=v,isLocked);
   if(p.mode==='explain'){
    section.append(el('div','net-heading net-gap','WHY IS THIS DEVICE CORRECT?'));
    const original=hardwareWhy[p.expected],turn=p.index%original.length;
    const opts=original.slice(turn).concat(original.slice(0,turn));
    choiceGroup(section,opts,()=>state.reason,v=>state.reason=v,isLocked,'net-reasons');
   }
   note.textContent='Choose the specific device for the job, not simply something found on the internet.';
  }
 }else{
  heading.textContent=p.mode==='build'?'CONNECT THE CABLES':p.mode==='failure'?'WHAT HAPPENS WHEN IT FAILS?':'CHOOSE AND JUSTIFY';
  if(p.mode==='build'){
   section.append(el('div','net-topology-name',p.shape+' topology'));
   const graphic=el('div','net-graphic');section.append(graphic);
   const keys=p.shape==='Star'?starEdges.concat(meshEdges):meshEdges;
   const box=el('div','net-edges');
   function draw(){
    graphic.replaceChildren();topologyDiagram(graphic,p.shape,state.edges,null);
    box.replaceChildren();
    keys.forEach(id=>{
     const label=id[0]==='S'?'Switch ↔ PC '+id[1]:'PC '+id[0]+' ↔ PC '+id[1];
     const b=el('button','net-edge'+(state.edges.includes(id)?' selected':''),label);
     b.type='button';b.setAttribute('aria-pressed',String(state.edges.includes(id)));
     b.addEventListener('click',()=>{if(isLocked())return;state.edges=state.edges.includes(id)?state.edges.filter(x=>x!==id):state.edges.concat(id);draw();});
     box.append(b);
    });
    note.textContent=state.edges.length+' cable'+(state.edges.length===1?'':'s')+' selected. '+(p.shape==='Star'?'Connect each PC only to the switch.':'Connect each different pair of PCs.');
   }
   section.append(box);draw();
  }else if(p.mode==='failure'){
   section.append(el('div','net-topology-name',p.shape+' · network failure'));
   topologyDiagram(section,p.shape,null,p.failure);
   section.append(el('p','net-scenario',p.scenario));
   const outcomes=[breaks[0][3],breaks[1][3],breaks[2][3]];
   // Use three distinct outcomes, including the scenario's correct concept.
   choiceGroup(section,outcomes,()=>state.selected,v=>state.selected=v,isLocked,'net-outcomes');
   note.textContent='Think about the remaining paths, not just the broken component.';
  }else{
   section.append(el('p','net-scenario',p.scenario));
   choiceGroup(section,['Star','Full mesh'],()=>state.selected,v=>state.selected=v,isLocked);
   section.append(el('div','net-heading net-gap','SELECT THE BEST JUSTIFICATION'));
   let correct=p.reason;
   const other=topologyReasons.filter(x=>x!==correct && (p.expected==='Star'?/mesh|alternative|redundancy|resilience|other connections|other routes/i:/central switch|less cable|new device|fewer cables|star usually|switch links/i).test(x)).slice(0,2);
   // Always offer three reasons, including one defensible match for this scenario.
   while(other.length<2){const item=topologyReasons.find(x=>x!==correct&&!other.includes(x));if(!item)break;other.push(item);}
   const opts=p.index%3===0?[correct,other[0],other[1]]:p.index%3===1?[other[0],correct,other[1]]:[other[0],other[1],correct];
   choiceGroup(section,opts,()=>state.reason,v=>state.reason=v,isLocked,'net-reasons');
   note.textContent='In an exam, link your justification to the exact requirements of the scenario.';
  }
 }
 if(setReady)setReady(true);
 return state;
}
function isComplete(p,s){
 if(!s)return false;
 if(p.mode==='repair')return !!s.entry;
 if(p.mode==='build')return s.edges.length>0;
 if(p.mode==='explain'||p.mode==='decide')return !!s.selected&&!!s.reason;
 return !!s.selected;
}
function isCorrect(p,s){
 if(!isComplete(p,s))return false;
 if(p.mode==='repair'){
  const original=p.example,splitter=p.family==='IPv4'?'.':p.family==='MAC'?(original.includes('-')?'-':':'):':';
  const a=original.split(splitter),b=s.entry.split(splitter);
  if(a.length!==b.length||!isValidAddress(p.family,s.entry))return false;
  return b.every((v,i)=>i===p.badIndex?v.toUpperCase()!==a[i].toUpperCase():v.toUpperCase()===a[i].toUpperCase());
 }
 if(p.mode==='build'){
  const expected=p.shape==='Star'?starEdges:meshEdges;
  return s.edges.length===expected.length&&s.edges.every(x=>expected.includes(x));
 }
 if(p.mode==='explain'||p.mode==='decide')return s.selected===p.expected&&s.reason===(p.mode==='explain'?hardwareWhy[p.expected][0]:p.reason);
 if(p.mode==='failure'){
  // Compare by effect rather than sentence wording because scenarios can describe the same kind of failure.
  const wanted=p.failure==='switch'?breaks[0][3]:p.shape==='Star'?breaks[1][3]:breaks[2][3];
  return s.selected===wanted;
 }
 return s.selected===p.expected;
}
function feedback(p,s){
 if(!isComplete(p,s))return p.mode==='build'?'Select the cables to complete your network.':'Complete every choice or address box before checking.';
 if(p.mode==='build')return p.shape==='Star'?'Only the four switch-to-PC cables are required.':'In a full mesh of four PCs, there are six direct PC-to-PC links.';
 if(p.mode==='repair')return 'Check the address format and leave every other group unchanged. '+explainFormat(p.family);
 if(p.mode==='failure')return 'Think about whether the failure removes one path, every switch connection, or a mesh link with alternatives.';
 return p.kind==='hardware'?'Compare the job with the role of each device and check the stated firewall rules.':p.kind==='address'?explainFormat(p.expected||p.family):'Choose the design and the justification that actually meets the scenario.';
}
root.J277NetworkSkills=Object.freeze({make,render,isComplete,isCorrect,feedback,validIPv4,validMac,validIPv6});
})(window);

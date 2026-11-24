/* J277 reusable systems Skills. No lesson or assignment logic. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.J277SystemsSkill=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
const labels={memory:['RAM','ROM','Cache','Virtual memory'],storage:['Magnetic HDD','Solid-state SSD','Optical disc','USB flash drive'],cpu:['Clock speed','Number of cores','Cache size','Not enough information']};
// Each row contains three separate scenarios and a worked reason, followed by two misconceptions.
// Security curriculum candidates: Y10 030–034; Y11 137–138. OCR 1.4.1–1.4.2.
const securityBank=[
 [
  [
   "Phishing",
   "Denial of service",
   "Brute-force attack",
   "Data interception"
  ],
  "A fake email asks you to enter your password. Identify the threat.",
  "A message pretending to be from IT asks a teacher to sign in using a link. Identify the threat.",
  "A convincing fake school email asks staff to submit their account details. Identify the attack and explain how it works.",
  "Phishing uses deceptive messages to trick people into revealing information or taking unsafe actions. Staff training and checking requests independently help reduce the risk.",
  "The attacker overwhelms the server with requests.",
  "The attacker tries many possible passwords automatically."
 ],
 [
  [
   "Malware",
   "Phishing",
   "Data interception",
   "Denial of service"
  ],
  "A downloaded game contains harmful software. Identify the threat.",
  "A file secretly installs a program that damages other files. Identify the threat.",
  "A school computer runs a downloaded program that encrypts its files and demands payment. Identify the type of threat.",
  "Malware is malicious software. Ransomware can encrypt files; anti-malware, updates and safe downloads help reduce the risk, and backups can aid recovery.",
  "Every encrypted file is evidence of phishing.",
  "The threat is simply too many legitimate users visiting a website."
 ],
 [
  [
   "Brute-force attack",
   "Phishing",
   "SQL injection",
   "Denial of service"
  ],
  "An attacker repeatedly guesses passwords. Identify the attack.",
  "An account receives thousands of automated failed login attempts. Identify the attack.",
  "A login is targeted by repeated automated attempts using different passwords. Identify the attack and explain the protection needed.",
  "Brute-force attacks try many possible passwords. Strong passwords and limits on login attempts reduce risk; additional authentication can protect accounts.",
  "The attack relies only on copying data in transit.",
  "The attacker must send a convincing email to every user."
 ],
 [
  [
   "Denial of service",
   "Data interception",
   "SQL injection",
   "Phishing"
  ],
  "A website is flooded with requests and stops responding. Identify the attack.",
  "A server cannot respond to genuine users because of an overwhelming volume of unwanted traffic. Identify the attack.",
  "A booking service becomes unavailable when traffic deliberately consumes its available resources. Identify the attack and its effect.",
  "A denial-of-service attack overwhelms resources so legitimate users cannot access a service. Traffic filtering and rate limiting can help reduce the impact.",
  "The attack always changes database records.",
  "The attacker has to obtain a user's password first."
 ],
 [
  [
   "Data interception",
   "Malware",
   "Brute-force attack",
   "Denial of service"
  ],
  "An unauthorised person reads data travelling over a network. Identify the threat.",
  "Unencrypted information is captured while it travels between devices. Identify the threat.",
  "A company discovers that private messages sent over a network were captured by an unauthorised party. Identify the threat and a suitable protection.",
  "Data interception captures communications in transit. Encryption helps prevent captured content being understood without the appropriate key.",
  "Encrypting the data prevents anyone from capturing network traffic at all.",
  "The threat is caused by a server receiving too many requests."
 ],
 [
  [
   "SQL injection",
   "Phishing",
   "Data interception",
   "Brute-force attack"
  ],
  "An attacker tries to make a website database run unintended commands through an input field. Identify the attack.",
  "A poorly protected search form allows input to alter a database query. Identify the attack.",
  "An online database returns unauthorised records because unsafe input changes the intended query. Identify the threat and explain a defensive measure.",
  "SQL injection occurs when untrusted input alters a database query. Parameterised queries help keep input separate from commands; appropriate input validation is also useful.",
  "The attack is only possible by guessing a user's password.",
  "Increasing the network bandwidth prevents database query manipulation."
 ],
 [
  [
   "Firewall",
   "Anti-malware software",
   "Encryption",
   "Access levels"
  ],
  "Which control filters network traffic according to rules?",
  "A school wants to restrict unwanted inbound network traffic. Choose the most appropriate control.",
  "A network administrator needs to allow legitimate connections while blocking traffic that violates network rules. Recommend the control.",
  "A firewall monitors and filters network traffic using rules about allowed connections; it does not guarantee that all allowed traffic is safe.",
  "A firewall removes every infected file already stored on a computer.",
  "Encryption automatically decides which network connections may enter."
 ],
 [
  [
   "Anti-malware software",
   "Firewall",
   "Penetration testing",
   "Encryption"
  ],
  "Which software scans for malicious programs?",
  "A laptop may contain harmful downloaded files. Choose a tool to detect and quarantine them.",
  "A school wants to detect known malicious files on its computers and prevent some infections. Recommend software and explain why updating it helps.",
  "Anti-malware software detects and blocks or quarantines malicious files; updates improve recognition of new threats. It cannot detect every threat.",
  "A firewall guarantees removal of all malicious files already on the disk.",
  "Encryption detects every malicious program."
 ],
 [
  [
   "User access levels",
   "Encryption",
   "Penetration testing",
   "Firewall"
  ],
  "Which control gives different users different permissions?",
  "Students must read shared files but only teachers may change them. Choose the control.",
  "An organisation wants staff to access only the files needed for their roles, even after successful login. Recommend the control.",
  "User access levels restrict what authenticated users can see or change. Passwords authenticate users; permissions then limit their access.",
  "A strong password automatically grants only the permissions a user needs.",
  "Encryption alone decides which authenticated users may edit each file."
 ],
 [
  [
   "Penetration testing",
   "Encryption",
   "User access levels",
   "Anti-malware software"
  ],
  "Which authorised activity tests systems for weaknesses?",
  "A company hires an authorised specialist to check its website for vulnerabilities. Identify the activity.",
  "Before launching a new service, a school wants an authorised security specialist to find exploitable weaknesses so they can be fixed. Recommend the method.",
  "Penetration testing is authorised security testing to identify weaknesses so they can be fixed. The scope and permission must be agreed.",
  "A backup automatically identifies every security weakness.",
  "Testing someone else's systems without permission is acceptable if nothing is changed."
 ]
];
const bank={
cpu:[
 [
  0,
  "Which factor is measured in GHz?",
  "Two otherwise identical CPUs run at 2 GHz and 3 GHz. Which specification differs?",
  "A school compares two CPUs of the same design with equal cores and cache. One runs at 3 GHz rather than 2 GHz. Which factor could explain faster execution?",
  "Clock speed measures cycles per second. With the same CPU design and workload, a higher clock speed can allow more instructions to be processed per second.",
  "Clock speed measures how many cores a CPU contains.",
  "GHz measures the amount of data held in cache."
 ],
 [
  1,
  "Which CPU specification counts independent processing cores?",
  "Two otherwise identical CPUs have two and four cores. Which feature differs?",
  "A video renderer can divide its work into independent tasks. Both CPUs have the same design, clock speed and cache per core. One has twice as many cores. Identify the useful difference.",
  "More cores can process more tasks simultaneously when software can divide its work between them.",
  "Extra cores always double the speed of every individual instruction.",
  "More cores increase the clock frequency of each core automatically."
 ],
 [
  2,
  "Which CPU specification describes the capacity of its small, fast local memory?",
  "Two otherwise identical CPUs have 4 MB and 8 MB of cache. Which factor differs?",
  "An application repeatedly accesses data that no longer fits in a small cache. A larger cache may hold more of the working set. Identify the relevant specification.",
  "A larger cache may hold more frequently used data and instructions, reducing slower RAM accesses.",
  "Cache permanently stores all the user's files.",
  "Larger cache always doubles the number of cores."
 ],
 [
  3,
  "One CPU has a higher clock speed but fewer cores than another. Can the faster CPU always be identified from these facts alone?",
  "CPU A has 3 GHz and two cores; CPU B has 2 GHz and four cores. No workload is given. Can we know which finishes first?",
  "A buyer compares two processors of different designs. Only clock speeds are known. Can they reliably predict which completes every program faster?",
  "Performance depends on the workload and other CPU characteristics. These facts alone do not determine which CPU completes a particular program faster.",
  "The larger GHz figure always guarantees better performance in every program.",
  "The CPU with more cores always finishes every program first."
 ],
 [
  0,
  "Which factor describes the number of clock cycles per second?",
  "A CPU with the same design runs at a higher frequency while the core count stays fixed. What has changed?",
  "A task cannot be divided across cores. Two otherwise identical CPUs with identical cache differ only in operating frequency. Which factor may reduce its execution time?",
  "Higher clock speed means more clock cycles each second; for an otherwise identical CPU it can improve performance even on a single-core task.",
  "Clock speed is the amount of permanent storage.",
  "A higher frequency means the software must use more cores."
 ],
 [
  1,
  "Which specification may help a computer run independent tasks in parallel?",
  "A computer renders multiple independent images concurrently. Which CPU specification can provide more simultaneous execution resources?",
  "A teacher runs several demanding independent applications at once. With otherwise similar CPU designs and frequency, which upgrade may improve simultaneous processing?",
  "Additional cores provide more execution resources for independent tasks and parallel programs, where software and other resources allow.",
  "Additional cores remove the need for RAM.",
  "Extra cores force every program to run twice as fast."
 ],
 [
  2,
  "Which specification can reduce trips from the CPU to RAM by holding more local data?",
  "A processor often reuses a small lookup table. Which CPU feature can reduce repeated retrieval from RAM?",
  "A program frequently reuses data that could fit in a larger cache but not a smaller one. Which specification could reduce cache misses?",
  "A larger cache can reduce cache misses when more of the frequently accessed data fits, avoiding slower RAM retrieval.",
  "Cache size measures the CPU clock frequency.",
  "A larger cache guarantees no access to RAM is ever needed."
 ],
 [
  3,
  "A CPU has a larger cache but a lower clock speed than another. Is the fastest CPU always obvious?",
  "CPU A has more cache; CPU B has a higher clock speed. The program is unknown. What can be concluded about the winner?",
  "One processor has more cores, another more cache, and no relevant benchmark or workload is supplied. Can we guarantee either will finish first?",
  "Different programs benefit from different resources. The listed differences are not enough to guarantee a winner for an unspecified workload.",
  "A larger cache guarantees that every task is faster.",
  "Core count alone determines execution time."
 ],
 [
  0,
  "Which specification changes when a CPU runs at 2.4 rather than 2.8 GHz?",
  "A CPU has the same cores and cache as before but operates at a higher frequency. Identify the change.",
  "Two otherwise identical CPUs perform a calculation using the same number of clock cycles. One completes more clock cycles each second. Which factor explains the difference?",
  "The clock speed is the rate of clock cycles; more cycles per second can reduce the time for the same number of cycles.",
  "The cache is the number of cycles per second.",
  "A CPU's core count equals its clock frequency."
 ],
 [
  1,
  "Which factor describes whether a CPU has four or eight processing cores?",
  "A program divides a workload across multiple cores. Which CPU specification could let it process more independent parts at once?",
  "A simulation can run six independent calculations in parallel. Two otherwise similar processors have two and six available cores. Which factor may allow more calculations to proceed together?",
  "More available cores allow more independent parts of a parallel workload to be processed at the same time, subject to software and resource limits.",
  "Adding cores automatically increases the speed of all sequential tasks.",
  "More cores increase the size of every cache by definition."
 ]
],
memory:[
[0,'Where are the instructions and data for an open word processor normally held?','A pupil edits a spreadsheet. Which main memory holds its working data?','An unsaved document is lost when power fails. Which memory held the unsaved work?','RAM holds currently used instructions and data; it is volatile.','ROM is the temporary working area for open programs.','Virtual memory permanently saves every document.'],
[1,'Which memory can hold firmware needed to start a computer?','A controller needs its boot instructions after power is restored. Which memory fits?','An embedded device must retain fixed start-up instructions when unplugged. Choose the memory.','ROM is non-volatile and can hold firmware or start-up instructions.','RAM retains its contents without power.','Cache keeps boot instructions permanently.'],
[2,'Which small, fast memory holds frequently used data near the CPU?','A CPU repeatedly uses instructions in a loop. Which memory can reduce retrieval time?','Two processors differ in the size of their fast memory for recently used instructions. Identify that memory.','Cache is fast memory near or within the CPU; a cache hit avoids a slower access to RAM.','A hard drive becomes faster than RAM when files repeat.','ROM is rewritten whenever an instruction is reused.'],
[3,'Which technique uses secondary storage when RAM is insufficient?','Several applications need more memory than the available RAM. Which technique can help?','A laptop becomes slow while moving memory pages between its SSD and RAM. Identify the technique.','Virtual memory uses secondary storage to extend available memory; accessing it is slower than accessing RAM.','Virtual memory makes physical RAM chips larger.','Cache makes the whole SSD as fast as RAM.'],
[0,'Which volatile main memory is normally much larger than CPU cache?','A video editor needs space for frames currently being edited. Which main memory holds them?','A technician wants to fit more working data in physical memory and reduce transfers to disk. Which component should be increased?','More RAM allows more working data to fit in physical memory, reducing reliance on virtual memory.','Increasing ROM adds working space for open applications.','A larger disk always increases physical RAM.'],
[1,'Which memory normally retains fixed instructions when power is off?','A washing machine retains its firmware between uses. Which memory category fits?','A manufacturer needs non-volatile memory for fixed firmware, rather than live sensor readings. Choose the category.','ROM retains instructions without power; RAM holds changing working data.','RAM retains data indefinitely when power is off.','Cache is intended for permanent firmware storage.'],
[2,'Which is usually fastest for the CPU to access: RAM, ROM, cache or virtual memory?','A CPU checks small local memory before fetching an instruction from RAM. Name the local memory.','A program repeatedly accesses a small set of values. Which memory makes repeated access faster when those values are present?','Cache stores frequently or recently used values for faster access than RAM.','Virtual memory is faster because it uses a larger disk.','ROM automatically stores recently accessed variables.'],
[3,'Which technique can move inactive memory pages to an SSD or HDD?','RAM is almost full and the OS moves less-used pages to disk. Identify the technique.','A computer keeps applications open but frequently pauses to swap pages between RAM and disk. Identify the technique.','Virtual memory uses secondary storage for pages; frequent transfers can reduce performance.','Cache permanently stores all inactive applications.','ROM expands with the number of running programs.'],
[0,'Where is a game’s changing score normally held while it runs?','A program updates an array of customer orders. Which main memory contains the active array?','A logger saves data every minute but power is lost before the latest readings are saved. Which memory held those lost readings?','RAM holds live program data but loses its contents without power; saving to storage is separate.','ROM is the normal location for rapidly changing variables.','Cache guarantees unsaved values survive a power cut.'],
[1,'Which memory can retain fixed instructions while a device has no power?','A device reads firmware at start-up and loads working data elsewhere. Which memory contains the firmware?','A design has a non-volatile firmware area and a separate volatile working area. Identify the firmware area.','ROM is non-volatile and can hold persistent instructions; RAM holds changing data.','Virtual memory is a fixed firmware chip.','Cache is permanent storage for firmware.']
],
storage:[
[0,'Which device stores data on spinning magnetic platters?','A desktop needs 4 TB. The quoted HDD is cheaper than the equivalent SSD and speed is not critical. Choose storage.','A stationary school archive needs high capacity at low cost. Access is infrequent and the HDD quote is cheapest per GB. Recommend a device.','An HDD can offer high capacity at low cost per GB; moving parts make it less shock-resistant.','An HDD has no moving parts.','Optical discs always offer the highest capacity per device.'],
[1,'Which internal drive stores data electronically with no moving parts?','A laptop is carried between rooms. The internal drive must withstand movement and load programs quickly. Choose storage.','A travelling photographer needs fast random access and shock resistance. The quoted SSD meets the capacity and budget. Recommend an internal drive.','An SSD has no moving parts, usually offers fast access and resists shock, but can cost more per GB.','An SSD reads data with a laser.','An HDD cannot be damaged by movement while operating.'],
[2,'Which storage medium is read using a laser?','A DVD player needs a physical copy of a film. Choose compatible media.','A museum has a DVD kiosk with no USB input. Video must be supplied on compatible read-only media. Choose storage.','Optical media are read using a laser; a compatible drive can play a DVD. Capacity and compatibility are limitations.','A magnetic HDD is read with a laser.','USB flash drives fit directly in DVD trays.'],
[3,'Which small removable device commonly plugs directly into a USB port?','A pupil carries a small presentation between offline computers with USB ports. Choose the convenient option.','A technician transfers small files between offline devices using a pocket-sized drive and USB ports. Choose storage.','A USB flash drive is compact, removable, non-volatile storage; it is convenient but can be lost.','USB flash drives lose all data when unplugged.','An internal desktop HDD is normally the smallest direct USB plug-in device.'],
[0,'Which storage uses rotating disks and moving read/write heads?','A stationary home server needs several TB. The HDD meets the budget but an equivalent SSD does not. Choose storage.','A business retains a large local collection of completed recordings. Access is occasional and the HDD quote offers the lowest cost per GB. Recommend storage.','An HDD can be economical for stationary collections; slower access and moving parts may be acceptable.','HDDs are always faster than SSDs.','Every optical disc holds several terabytes.'],
[1,'Which internal drive uses flash memory rather than platters?','A computer needs faster booting and application loading. A replacement SSD meets the capacity and budget. Choose storage.','A school can replace a slow HDD with an equal-capacity SSD. Faster loading of many small files is the priority. Choose the drive.','SSDs usually have faster random access than HDDs because no mechanical head movement is needed.','SSDs are faster because their platters spin faster.','DVDs are fast writable system storage in every computer.'],
[2,'Which storage includes CDs, DVDs and Blu-ray discs?','A club distributes a recording for existing Blu-ray players. Choose media.','An audience needs fixed video content on compatible physical discs for players without network or USB access. Choose technology.','Optical discs suit compatible disc players and fixed content; capacity depends on format.','A USB port is required to read every optical disc.','An HDD fits directly in a Blu-ray tray.'],
[3,'Which removable flash device is designed to be carried in a pocket?','A teacher transfers a worksheet to an offline printer that accepts USB sticks. Choose storage.','An engineer transfers small diagnostic reports through a USB port. A separate encrypted backup exists. Which portable device fits?','USB flash storage is portable and works without a network; a backup and encryption can mitigate loss.','A USB flash drive is a backup that cannot fail.','Optical discs plug directly into USB ports.'],
[0,'Which device is magnetic secondary storage rather than optical or solid state?','A workstation needs a large inexpensive second internal drive for rarely used files. The HDD quote is cheaper per GB. Choose storage.','A studio already edits on SSDs. It needs a stationary local drive for completed footage; an HDD meets capacity at lower cost. Choose the device.','An HDD is a suitable low-cost capacity choice if slower access and mechanical limitations are acceptable.','Magnetic HDDs are volatile working memory.','A small USB stick always offers the cheapest multi-TB capacity.'],
[1,'Which non-volatile internal drive has no mechanical head or platter?','A handheld computer needs an internal drive that tolerates movement and vibration. Both quoted drives meet the capacity. Choose storage.','An internal drive for a vehicle must withstand vibration. Both quoted drives meet capacity and budget; shock resistance is the deciding factor. Choose storage.','SSDs have no moving parts and are generally more shock-resistant than mechanical HDDs.','SSDs cannot lose data or fail.','HDDs resist shock better because they have moving parts.']
]};
function rotate(a,n){const i=n%a.length;return a.slice(i).concat(a.slice(0,i));}
function make(id,level,index){
 if((!bank[id]&&id!=='security')||!['easy','medium','hard'].includes(level)||!Number.isInteger(index)||index<0)throw Error('Invalid systems Skill request');
 if(id==='security'){
  const l=['easy','medium','hard'].indexOf(level),r=securityBank[index%10],a=0;
  return {type:'systemsbuilder',skill:id,level,index,prompt:r[l+1],context:'OCR J277 · '+(index%10<6?'1.4.1 · Threats':'1.4.2 · Prevention'),a,choices:rotate(r[0].map((v,i)=>({v,i})),index+l),reasons:l?rotate(r.slice(4).map((v,i)=>({v,i})),index+l*2):null,why:r[4],hint:'Identify what happens in the scenario, then choose a threat or a control that fits.'};
 }
 const l=['easy','medium','hard'].indexOf(level),r=bank[id][index%10];
 return {type:'systemsbuilder',skill:id,level,index,prompt:r[l+1],context:'OCR J277 · '+(id==='memory'?'1.2.1 · Primary memory':id==='storage'?'1.2.2 · Secondary storage':'1.1.2 · CPU performance'),a:r[0],choices:rotate(labels[id].map((v,i)=>({v,i})),index+l),reasons:l?rotate(r.slice(4).map((v,i)=>({v,i})),index+l*2):null,why:r[4],hint:id==='memory'?'Think about volatility, speed and what the memory holds.':id==='storage'?'Think about capacity, speed, cost, portability and compatibility.':'Compare clock cycles, parallel work and access to frequently used data. Consider whether the information is sufficient.'};
}
function isComplete(p,s){return !!s&&s.a>=0&&(!p.reasons||s.b>=0);}
function isCorrect(p,s){return isComplete(p,s)&&s.a===p.a&&(!p.reasons||s.b===0);}
function feedback(p,s){if(!isComplete(p,s))return 'Complete every step before checking.';return s.a!==p.a?'Read the scenario again. Which requirement matters most?':'Check which reason supports your choice.';}
function el(tag,cls,txt){const n=document.createElement(tag);if(cls)n.className=cls;if(txt!==undefined)n.textContent=txt;return n;}
function render(p,host,isLocked,setReady){
 const board=el('div','sys-skill-board'),s={a:-1,b:-1};
 function options(title,list,key){board.append(el('h3','sys-skill-label',title));const group=el('div','sys-skill-options');
  list.forEach(item=>{const b=el('button','sys-skill-option',item.v);b.type='button';b.setAttribute('aria-pressed','false');b.addEventListener('click',()=>{if(isLocked())return;s[key]=item.i;group.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));setReady(isComplete(p,s));});group.append(b);});board.append(group);}
 options('STEP 1 · '+(p.skill==='memory'?'Choose the memory':p.skill==='storage'?'Choose the storage':p.skill==='security'?'Identify the threat or choose the control':'Identify the factor or decide if the evidence is sufficient'),p.choices,'a');
 if(p.reasons){if(p.level==='hard')board.append(el('p','sys-skill-write','Write your answer and reason in your book before selecting the best explanation.'));options('STEP 2 · '+(p.level==='hard'?'Justify your choice':'Explain your choice'),p.reasons,'b');}
 host.append(board);setReady(false);return s;
}
function reveal(p,s,host){const board=host.querySelector('.sys-skill-board'),model=el('section','sys-skill-model');model.append(el('strong','','MODEL ANSWER'),el('h3','',p.choices.find(x=>x.i===p.a).v),el('p','',p.why));if(p.level==='hard')model.append(el('small','','Compare your written answer with the model. The digital score checks your selections, not your written exam marks.'));board.append(model);board.querySelectorAll('button').forEach(b=>b.disabled=true);}
return {make,isComplete,isCorrect,feedback,render,reveal};
});

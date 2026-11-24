/* One shared, independent step-by-step Demo for each of the 16 J277 Paper 1
   practice Skills. Demos do not call mark(), check(), next() or alter progress. */
(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  else root.RHSCPaper1GuidedDemo=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const examples={
    convert:{title:'Denary, binary and hexadecimal',task:'Convert 26 into 8-bit binary and hexadecimal.',steps:[
      ['Place values','128 64 32 16 8 4 2 1','16 + 8 + 2 = 26. Put a 1 below each place value used.'],
      ['Eight bits','00011010','Keep all eight positions, including the leading zeroes.'],
      ['Split into nibbles','0001 | 1010','The left group is 1 and the right group is 10.'],
      ['Write hex','1A','In hexadecimal, 10 is A, so the two digits are 1 and A.']]},
    add:{title:'Binary addition',task:'Add 13 and 6 using eight bits.',steps:[
      ['Write both numbers','00001101 + 00000110','Align their rightmost bits in the same column.'],
      ['Add from the right','Carry where two 1s meet','Binary 1 + 1 is 10: write 0 and carry 1.'],
      ['Write the result','00010011','This is 19 in denary (13 + 6).'],
      ['Check overflow','No overflow','All significant bits fit into eight columns.']]},
    shift:{title:'Bit shifting',task:'Shift 00001010 one place to the left.',steps:[
      ['Original','00001010','Write all eight bits in order.'],
      ['Move every bit left','0001010_','Discard any bit that leaves the eight-bit boundary.'],
      ['Fill the gap','00010100','Fill the rightmost empty position with zero for a logical left shift.'],
      ['Check','10 becomes 20','This left shift doubles the unsigned denary value.']]},
    count:{title:'Bits and values',task:'Work out the range of five unsigned bits.',steps:[
      ['Patterns','2⁵ = 32','Each of five positions can be either 0 or 1.'],
      ['Smallest','00000 = 0','All zeroes give zero.'],
      ['Largest','11111 = 31','Add 16 + 8 + 4 + 2 + 1, or subtract 1 from 32.'],
      ['Remember','Patterns 32 · Maximum 31','Number of patterns and largest possible value differ by one.']]},
    units:{title:'Data units',task:'Convert 3 MB into KB using decimal units.',steps:[
      ['Find the direction','MB → KB','Moving one unit down the scale multiplies by 1,000.'],
      ['Calculate','3 × 1,000','Keep the number and unit together.'],
      ['Answer','3,000 KB','This site uses decimal 1,000-based units for these questions.']]},
    text:{title:'Text file sizes',task:'Calculate a 2,000-character file at 8 bits per character.',steps:[
      ['Bits','2,000 × 8 = 16,000 bits','Characters × bits per character.'],
      ['Bytes','16,000 ÷ 8 = 2,000 bytes','Cancel the matching ×8 and ÷8.'],
      ['Kilobytes','2,000 ÷ 1,000 = 2 KB','Convert only once, at the end.']]},
    ascii:{title:'ASCII codes',task:'Convert a different letter, A, using its decimal ASCII value 65.',steps:[
      ['Start','A → 65','A has denary ASCII code 65.'],
      ['Binary weights','64 + 1 = 65','Find which powers of two make 65.'],
      ['Eight bits','01000001','Write the unused positions as zero, including the first.'],
      ['Check','A ↔ 65 ↔ 01000001','All three representations identify the same character.']]},
    image:{title:'Image file sizes',task:'An image is 10 × 8 pixels and uses four possible colours.',steps:[
      ['Pixels','10 × 8 = 80','Multiply width by height.'],
      ['Colour depth','4 colours need 2 bits','2² = 4 possible colour codes.'],
      ['Bits','80 × 2 = 160 bits','Total pixels × colour depth.'],
      ['Bytes','160 ÷ 8 = 20 bytes','Convert bits to bytes if the question asks.']]},
    sound:{title:'Sound file sizes',task:'A sound uses 2,000 samples/s for 3 seconds at 8 bits/sample.',steps:[
      ['Samples','2,000 × 3 = 6,000','Sample rate × duration.'],
      ['Bits','6,000 × 8 = 48,000','Multiply by bit depth.'],
      ['Bytes','48,000 ÷ 8 = 6,000','The ×8 and ÷8 cancel.'],
      ['Kilobytes','6,000 ÷ 1,000 = 6 KB','Convert only when required.']]},
    pixels:{title:'Pixel builder',task:'Encode a simple two-colour 2 × 2 image.',steps:[
      ['Palette','0 = white · 1 = black','Two colours need just one bit per pixel.'],
      ['Example rows','0 1 / 1 0','Build each row from left to right.'],
      ['Size','4 pixels × 1 bit = 4 bits','Count pixels, then multiply by colour depth.']]},
    address:{title:'Address detective',task:'Identify three different network address forms.',steps:[
      ['MAC','A4:5E:60:12:CD:09','A MAC address identifies a network interface; it is shown using hexadecimal.'],
      ['IPv4','192.168.1.20','Four decimal numbers separated by dots identify an IPv4 address.'],
      ['IPv6','2001:db8::1','Hexadecimal groups and colons are characteristic of IPv6.'],
      ['Decision','Choose the address asked for','MAC and IP addresses have different jobs.']]},
    hardware:{title:'Network hardware',task:'Follow a request from a laptop to another network.',steps:[
      ['Network interface','NIC connects the device','The computer uses a wired or wireless network interface.'],
      ['Local traffic','Switch forwards inside a LAN','A switch uses MAC addresses to direct frames locally.'],
      ['Other networks','Router connects networks','A router forwards IP packets towards other networks.'],
      ['Protection','Firewall checks allowed traffic','A firewall filters traffic according to rules.']]},
    topology:{title:'Network topology',task:'Compare a star network with a partial mesh.',steps:[
      ['Star','All devices connect to one central switch','Adding a device is straightforward, but the switch is a single point of failure.'],
      ['Mesh','Some devices have alternative paths','More links can provide resilience when one fails.'],
      ['Judge','Consider cost and reliability','A mesh needs more connections; a star is simpler.']]},
    dns:{title:'DNS and web requests',task:'Trace a different website request, for example library.example.',steps:[
      ['URL','The browser knows the website name','A name alone is not an IP address.'],
      ['DNS lookup','Find the server IP address','A cached answer can avoid another DNS query.'],
      ['Request','The browser requests the webpage','HTTP or HTTPS carries the web request.'],
      ['Response','The server returns data','The browser processes the response and displays the page.']]},
    protocol:{title:'Protocol paths',task:'Choose protocols for a secure webpage.',steps:[
      ['Find the address','DNS resolves the domain','DNS helps find the appropriate server.'],
      ['Reliable transport','TCP manages ordered delivery','Segments can be acknowledged and resent if needed.'],
      ['Web content','HTTPS protects the connection','HTTPS is HTTP carried over an encrypted connection.'],
      ['Route','IP addresses packets','Routers use IP information to forward packets.']]},
    cpu:{title:'CPU Performance',task:'Compare computer specifications for a single calculation, parallel image processing and repeated memory access.',steps:[
      ['Clock speed','2 GHz → 3 GHz','For otherwise identical CPUs, more cycles per second can shorten a task that takes the same number of cycles.'],
      ['Number of cores','2 cores → 4 cores','Independent tasks can run on more cores when the software supports parallel processing.'],
      ['Cache size','Small cache → larger cache','More frequently used data may fit in cache, reducing slower accesses to main memory.'],
      ['Make a judgement','Match the feature to the workload','A higher specification in one area does not guarantee a faster computer for every workload.']]},
    os:{title:'Operating Systems',task:'Follow the OS while a teacher signs in, opens two applications, saves a document and prints it.',steps:[
      ['Sign in and interact','User management → user interface','Accounts and permissions control access; a graphical or command-line interface lets the user interact with the system.'],
      ['Open applications','Memory management','The OS allocates RAM to running programs and releases it when no longer required.'],
      ['Work simultaneously','Multitasking','The OS shares processor time so competing tasks can make progress.'],
      ['Save the document','File management','The OS organises files and directories and supports storing and retrieving documents.'],
      ['Print the document','Peripheral management','The OS communicates with devices through drivers and can queue jobs until a printer is ready.']]},
    utility:{title:'Utility Software',task:'A club needs to protect member records, send a smaller archive and maintain a fragmented magnetic drive.',steps:[
      ['Protect records','Encryption','Encryption turns readable data into ciphertext, helping protect confidentiality without the appropriate key.'],
      ['Reduce file size','Compression','Lossless compression can restore the original exactly; lossy compression discards information to reduce size.'],
      ['Maintain a magnetic HDD','Defragmentation','Reorganising file fragments may reduce mechanical seeking. SSDs do not require routine traditional defragmentation.'],
      ['Choose and justify','Requirement → utility → reason','Match each utility to the actual problem and explain the effect rather than simply naming a tool.']]},
    security:{title:'Cybersecurity Investigator',task:'A school receives a suspicious message asking for login details, then notices unusual network traffic.',steps:[
      ['Identify the threat','Fake message → phishing','The message tries to trick users into revealing information or clicking a dangerous link.'],
      ['Protect the account','Training · strong passwords · authentication','Verify requests independently and use strong passwords and additional authentication where appropriate.'],
      ['Protect the network','Firewall · anti-malware · encryption','These controls address different risks: traffic filtering, malicious software and confidentiality of data.'],
      ['Limit the damage','Access levels · authorised security testing','Restrict permissions to what each user needs and identify weaknesses through authorised tests.'],
      ['Justify the decision','Threat → control → reason','Explain how the chosen control reduces the specific risk, rather than listing unrelated security measures.']]},
    legislation:{title:'Legislation and Licences',task:'A school builds an app and plans to store user details, test its network, use artwork and share code.',steps:[
      ['Personal data','Data Protection Act 2018 and UK GDPR','Collect only necessary personal information and process it lawfully and securely.'],
      ['Permission to access','Computer Misuse Act 1990','Obtain authorisation before accessing or testing systems; permission is limited to the agreed scope.'],
      ['Original artwork','Copyright, Designs and Patents Act 1988','Check permission or an applicable exception before copying or sharing protected work.'],
      ['Software licences','Open source or proprietary','Check the licence conditions for use, modification and redistribution; open source does not mean no conditions.']]},
    memory:{title:'Memory Explorer',task:'A student starts a computer, opens a drawing program and runs out of working memory.',steps:[
      ['Start-up','ROM → boot instructions','Firmware is retained without power; start-up instructions can be stored in ROM.'],
      ['Working data','RAM → active drawing','RAM holds currently used instructions and data; unsaved changes are volatile.'],
      ['Repeated access','Cache → frequently used values','A small fast cache reduces the time needed to access commonly used instructions or data.'],
      ['When RAM fills','Virtual memory → secondary storage','The operating system can move pages to secondary storage, but accessing them is slower than RAM.']]},
    storage:{title:'Storage Selector',task:'Choose storage for a school archive, a portable laptop and a compatible disc player.',steps:[
      ['Requirements','Capacity · speed · portability · cost','Identify what the device must do before selecting the storage technology.'],
      ['Stationary archive','Magnetic HDD','An HDD may provide good capacity per pound, although it has mechanical parts.'],
      ['Portable laptop','Solid-state SSD','An SSD has no moving parts and can offer quick access and good shock resistance.'],
      ['Compatible disc player','Optical disc','A DVD is read by a laser and suits equipment designed to play that disc format.'],
      ['Small file transfer','USB flash drive','A removable solid-state drive is compact; protect important data against loss.']]},
    impact:{title:'Impact answer builder',task:'Discuss a school using an online learning platform.',steps:[
      ['Identify an impact','Pupils can learn remotely','Say what changes for a named group.'],
      ['Develop the reason','Work is available after absence','Explain how the impact arises.'],
      ['Balance','There may be access and privacy concerns','Consider a drawback, not just a benefit.'],
      ['Evaluate','Judge when it is worthwhile','Support your conclusion with a reason.']]}
  };
  function get(id){return examples[id]||null;}
  function mount(doc,win){
    const practice=doc.getElementById('practice');
    const title=practice&&practice.querySelector('.skill-top');
    if(!title)return null;
    const make=(tag,cls,text)=>{const x=doc.createElement(tag);if(cls)x.className=cls;if(text!==undefined)x.textContent=text;return x;};
    const launch=make('button','p1-guide-launch','▶ Demo');launch.type='button';
    launch.title='Watch a separate worked example without changing your answer or score.';
    title.append(launch);
    const panel=make('section','p1-guide-panel');panel.hidden=true;panel.setAttribute('aria-label','Separate worked example');
    const back=make('button','p1-guide-back','← Back to practice');back.type='button';
    const heading=make('h2','p1-guide-title','Demo');
    const subtitle=make('p','p1-guide-subtitle','Follow a different example. Your score is unchanged.');
    const stepList=make('div','p1-guide-steps');
    const actions=make('div','p1-guide-actions');
    const step=make('button','p1-guide-step','⏭ Next step');step.type='button';
    const reset=make('button','p1-guide-reset','↺ Start again');reset.type='button';
    actions.append(step,reset);panel.append(back,heading,subtitle,stepList,actions);
    practice.after(panel);
    let active=null,index=0,scroll=0;
    function draw(){
      stepList.replaceChildren();
      for(let i=0;i<(active?.steps.length||0);i++){
        const item=active.steps[i];const card=make('div','p1-guide-card'+(i===index-1?' current':''));
        const number=make('span','p1-guide-number',String(i+1).padStart(2,'0'));
        const title=make('strong','',i<index?item[0]:'Step '+(i+1));
        card.append(number,title);
        if(i<index){card.append(make('code','p1-guide-work',item[1]),make('p','p1-guide-why',item[2]));}
        else card.classList.add('upcoming');
        stepList.append(card);
      }
      step.disabled=!active||index>=active.steps.length;
      step.textContent=step.disabled?'✓ Example complete':'⏭ Next step';
    }
    function open(){
      const ctx=typeof win.RHSCPaper1DemoContext==='function'?win.RHSCPaper1DemoContext():null;
      active=get(ctx?.skill);if(!active)return;
      heading.textContent=active.title+' · Demo';
      subtitle.textContent='Similar example: '+active.task+' Follow one step at a time. Your marks are unchanged.';
      scroll=win.scrollY;index=0;practice.classList.add('p1-guide-off');panel.hidden=false;
      draw();win.scrollTo(0,0);back.focus({preventScroll:true});
    }
    function close(){panel.hidden=true;practice.classList.remove('p1-guide-off');launch.focus({preventScroll:true});win.scrollTo(0,scroll);}
    launch.addEventListener('click',open);back.addEventListener('click',close);
    step.addEventListener('click',()=>{if(active&&index<active.steps.length){index++;draw();}});
    reset.addEventListener('click',()=>{index=0;draw();});
    doc.addEventListener('keydown',e=>{if(e.key==='Escape'&&!panel.hidden)close();});
    return {launch,panel,open,close};
  }
  if(typeof document!=='undefined'&&typeof window!=='undefined')mount(document,window);
  return {get,mount,skills:Object.keys(examples)};
});

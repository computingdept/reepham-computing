/* Dedicated H446 A3 revision presentation for Lessons 036 and 037.
   Teacher-controlled reveal, student mini-whiteboards, one growing mind map.
   All teaching questions and examples here are original; no assessment paper is embedded. */
(() => {
"use strict";
const lesson=document.body.dataset.lesson==="37"?37:36;
const $=q=>document.querySelector(q);
const escapeHtml=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const question=(label,text,answer)=>({label,text,answer});
const D36=[
 question("Q1 · LAST LESSON · L035","Why is showing the method useful when working with a binary number?","It makes each step checkable, and the method may be credited even if a final result is wrong."),
 question("Q2 · EARLIER · L016","In a one-dimensional array, what does the index tell you?","The index identifies the position of an element; the element's value is what is stored there."),
 question("Q3 · EARLIER · L020","What does LIFO mean for a stack?","Last In, First Out — the most recently pushed item is popped first."),
 question("Q4 · CHALLENGE · L024","Why is a binary search not appropriate for an unsorted list?","The algorithm discards half of the search area based on ordering. Without ordering, it can discard the target.")
];
const D37=[
 question("Q1 · LAST LESSON · L036","Name the four things you added to make a useful mind-map micro-branch.","A precise definition, a small method or example, a misconception, and a labelled connection."),
 question("Q2 · EARLIER · L030","What two output values does a full adder produce?","A Sum bit and a Carry-out bit."),
 question("Q3 · EARLIER · L011","What is the difference between a parameter and an argument?","A parameter is defined in a subroutine's header; an argument is the value passed when it is called."),
 question("Q4 · CHALLENGE · L026","Why can adjacent 1s be grouped on a Karnaugh map?","They represent combinations differing by one input, allowing changing variables to be eliminated.")
];
function doNow(){return {type:"questions",phase:"DO NOW",routine:"Silent working",response:"MWBs",mins:5,title:"Do Now · Retrieval",sub:"Four questions from lessons you have already studied",items:lesson===36?D36:D37};}
function answers(){return {type:"answers",phase:"DO NOW",routine:"Listening",response:"Cold calling",mins:2,title:"Do Now · Answers",sub:"Green pen: improve the explanation, not just the final word",items:lesson===36?D36:D37};}
function mapStage(title,sub,level,mins=2,focus="",caption="This is a starting model, not a completed set of notes."){return {type:"map",phase:"OBJECTIVES",routine:"Listening",response:"MWBs",mins,title,sub,level,focus,caption};}
function model(title,sub,lead,steps,mins=3,example=""){return {type:"model",phase:"I DO",routine:"Listening",response:"Cold calling",mins,title,sub,lead,steps,example};}
function board(title,sub,prompt,answer,mins=2,explain=""){return {type:"board",phase:"WE DO",routine:"Quiet working",response:"MWBs",mins,title,sub,prompt,answer,explain};}
function write(title,sub,prompts,checks,level,focus,mins=6){return {type:"write",phase:"YOU DO",routine:"Silence",response:"A3 mind map",mins,title,sub,prompts,checks,level,focus};}
function exit(title,statement,correct,explanation){return {type:"exit",phase:"EXIT",routine:"Silence",response:"Thumbs",mins:2,title,sub:"One statement · decide before the answer is revealed",statement,correct,explanation};}
const slides36=[
 doNow(),answers(),
 mapStage("Start one A3 mind map","Landscape · One sheet across Lessons 036 and 037",0,3,"","Copy the five branch headings only. Leave plenty of space to grow each branch."),
 model("I Do · 1.4.1 Start with Data Types","Watch a number-systems branch grow one idea at a time.","Our first branch follows OCR 1.4.1 — not Data Structures.",[
  ["HEADING + BASES","From 1.4.1 Data Types, write Number systems. Binary is base 2; denary is base 10."],
  ["HEX","Hexadecimal is base 16, using digits 0–9 and A–F."],
  ["EXAMPLE","13₁₀ = 1101₂ = D₁₆. Check with 8 + 4 + 1 = 13."],
  ["LINK + WARNING","Link binary to hex using four-bit groups. Pad with leading zeroes if necessary."]
 ],4,"numbers-map"),
 model("I Do · Number systems","A small worked example belongs on the branch.","Use place values to explain an original conversion, not a memorised answer.",[
  ["PLACE VALUES","For 26 in denary: 16 + 8 + 2."],
  ["BINARY","Write 11010₂ and show which powers of two you used."],
  ["HEX","Group as 0001 1010₂ → 1A₁₆."],
  ["MISTAKE TO AVOID","Do not read 11010₂ as a denary number."]
 ],3,"numbers"),
 board("We Do · Your whiteboard","Write and hold up your answer before I reveal it.","Represent denary 45 in 8-bit binary and then in hexadecimal.","00101101₂ = 2D₁₆.",2,"32 + 8 + 4 + 1 = 45; group 0010 1101."),
 model("I Do · Signed and floating point","Add a method, not just vocabulary.","Two different ways to represent values need different notes.",[
  ["SIGNED INTEGERS","Two's complement uses a negative most significant place value."],
  ["SMALL EXAMPLE","In 5 bits, −3 is 11101₂. Check: −16 + 8 + 4 + 1 = −3."],
  ["FLOATING POINT","A signed mantissa stores significant bits; an exponent scales it by a power of two."],
  ["OPERATION WARNING","For floating-point addition or subtraction, align exponents before combining mantissas."]
 ],4,"signed"),
 board("We Do · Your whiteboard","Explain using two short steps.","Why must exponents be aligned before adding two floating-point binary values?","The binary points must refer to the same place value; shift/align the mantissas first, then carry out the arithmetic and check normalisation.",2,"Use the analogy of lining up matching place-value columns."),
 write("You Do · Build branch 1.4.1","Turn & Talk for 30 seconds → count-in to silence → A3 independent writing.",[
  "BINARY ↔ DENARY ↔ HEX: give each base and one original conversion.",
  "SIGNED INTEGER: sign-and-magnitude versus two's complement.",
  "FLOATING POINT: mantissa, exponent, normalisation and an operation warning.",
  "BITWISE + TEXT: shifts, masks, AND/OR/XOR, ASCII and Unicode."
 ],["A precise definition","A small worked method","One misconception","One labelled link"],0,"data",7),
 mapStage("Now compare your beginnings","You should have a growing 1.4.1 branch, not a completed textbook page",1,2,"data","This is an example of what might appear on your page. Add missing detail in green pen."),
 model("I Do · Organising data","Look at how two structures behave differently.","Choose a structure because of its operations and purpose.",[
  ["ARRAY","Indexed elements; an index identifies a position, not a pointer."],
  ["STACK","push / pop; last in, first out."],
  ["QUEUE","enqueue / dequeue; first in, first out."],
  ["LINK","All three structures require a program to define how data is added, found or removed."]
 ],3,"structures"),
 board("We Do · Your whiteboard","Choose and justify an appropriate structure.","A browser's Back button returns to the most recently visited page. Stack or queue?","A stack. The latest visited page is the first one returned to (LIFO).",2,"Do not answer with just the structure name: explain the ordering."),
 model("I Do · Trees and pointers","Sketch a tiny example; focus on relationships.","Do not confuse the item in a node with the link to another node.",[
  ["NODE","Draw an original binary search tree: 40 at the root, 18 left and 62 right."],
  ["ORDERING","Values smaller than a node are on its left; larger values are on its right."],
  ["POINTER","A left/right pointer identifies the linked child. A null pointer means no child on that link."],
  ["OPERATIONS","Connect tree traversal to searching and to using a suitable data structure."]
 ],3,"tree"),
 board("We Do · Your whiteboard","Be precise about what an empty link means.","A node in a tree has no right child. What does its right pointer represent?","It represents an absent or null right link — no node is connected on that branch.",2,"An absent right child does not automatically mean the whole node is a leaf."),
 write("You Do · Build branch 1.4.2","Turn & Talk for 30 seconds → count-in to silence → A3 independent writing.",[
  "Arrays (1D–3D), records, tuples and lists: what distinguishes them?",
  "Stack versus queue: labels, operations and a tiny sketch.",
  "Tree / binary search tree: root, child, pointer and traversal.",
  "Linked list, directed/undirected graph, hash table: one key feature each."
 ],["State a useful operation","Draw an original diagram","Explain an empty link","Link structures to algorithms"],1,"structures",7),
 mapStage("End of Lesson 036 · Your map so far","Two branches completed; three left as placeholders",2,3,"","Bring this SAME A3 sheet to Lesson 037. Check in green pen and circle your weakest subtopic."),
 exit("Exit · True or false?","A queue always removes the newest item first.",false,"False. A standard queue follows FIFO; the oldest waiting element is removed first.")
];
const slides37=[
 doNow(),answers(),
 mapStage("Pick up your existing A3 map","We continue the same map — do not start a new sheet",2,2,"","Keep your two completed branches visible. Today you develop logic, programming and algorithms."),
 model("I Do · Boolean logic","A method belongs in the branch alongside key terms.","Connect expressions, truth tables and Karnaugh maps.",[
  ["EXPRESSION","A ∧ B is true only when both inputs are true."],
  ["TRUTH TABLE","List all input combinations to check the output."],
  ["K-MAP","Transfer the outputs and group adjacent 1s in powers of two."],
  ["SIMPLIFY","Remove variables that change within a valid group; retain equivalence."]
 ],3,"logic"),
 board("We Do · Your whiteboard","Decide before the model is displayed.","Find ¬A ∨ B when A = 1 and B = 0.","¬1 ∨ 0 = 0 ∨ 0 = 0 (False).",2,"NOT acts before OR in this expression."),
 model("I Do · Logic circuits and state","Make a tiny original circuit sketch and label its purpose.","What is the difference between combining input bits and storing a bit?",[
  ["HALF ADDER","Adds two input bits: Sum and Carry."],
  ["FULL ADDER","Adds two bits plus a carry-in; produces Sum and Carry-out."],
  ["D-TYPE FLIP-FLOP","Stores one bit of state at a clock event, with output Q."],
  ["LINK","Connect logic gates to binary arithmetic and to data representation."]
 ],3,"circuits"),
 board("We Do · Your whiteboard","State both outputs.","Add A = 0, B = 1 and carry-in = 1. What are Sum and Carry-out?","0 + 1 + 1 = 10₂, so Sum = 0 and Carry-out = 1.",2,"This is a fresh practice combination, not an assessment question."),
 write("You Do · Add Boolean logic","Turn & Talk for 30 seconds → count-in to silence → A3 independent writing.",[
  "AND, OR, NOT and XOR: what do they output?",
  "One Boolean expression → truth table → simplification method.",
  "Karnaugh maps and De Morgan's laws: short, accurate rules.",
  "Half adder, full adder and D-type flip-flop: purpose and output(s)."
 ],["An original mini circuit","A checked equivalence","A common mistake","A link to binary"],2,"logic",6),
 mapStage("Your map grows · Boolean algebra","Compare the amber branch with your own notes",3,2,"logic","Use the example to check coverage, not as a paragraph to copy."),
 model("I Do · Programming decisions","Use a small code sketch to show what a parameter means.","A code example earns its place on the map when you can explain it.",[
  ["SCOPE","A local variable can be accessed within its declaring block or subroutine."],
  ["BY VALUE","A copied argument value can be used without directly updating the caller's variable."],
  ["BY REFERENCE","A subroutine can update the caller's variable through the reference."],
  ["CONNECTION","Link parameters to modularity, procedures and functions."]
 ],3,"programming"),
 board("We Do · Your whiteboard","Explain the choice, not only the definition.","A game subroutine changes the player's score. Why might score be passed by reference?","Because the change to score must still be visible to the caller after the subroutine ends.",2,"An extra amount read but not changed could be passed by value."),
 write("You Do · Add programming","Turn & Talk for 30 seconds → count-in to silence → A3 independent writing.",[
  "Sequence, selection and iteration: one short example each.",
  "Function vs procedure: return values and purpose.",
  "Scope, parameters by value/reference, and modularity.",
  "Recursion, debugging and IDE: a concise connection or reminder."
 ],["Original pseudocode","One scope decision","One parameter rationale","One link to data structures"],3,"programming",6),
 mapStage("Your map grows · Programming","Four of the five main branches are now represented",4,2,"programming","Keep examples short enough to prompt memory rather than replace it."),
 model("I Do · Search algorithms","Explain how the data affects the method.","An algorithm choice needs a condition and a justification.",[
  ["LINEAR SEARCH","Checks elements in turn; can be used on unordered data."],
  ["BINARY SEARCH","Compares a middle element and repeatedly narrows the search range."],
  ["PRECONDITION","Binary search requires appropriately ordered data."],
  ["EFFICIENCY","Typical worst-case time: linear O(n), binary O(log n) on suitable ordered data."]
 ],3,"search"),
 board("We Do · Your whiteboard","State the method and its prerequisite.","A catalogue has 60 entries already sorted alphabetically. Which standard search is suitable, and why?","Binary search is suitable because the records are sorted and half of the remaining positions can be eliminated at each comparison.",2,"If the list were not sorted, the choice and preparation cost would change."),
 write("You Do · Add algorithms","Turn & Talk for 30 seconds → count-in to silence → A3 independent writing.",[
  "Show the steps of linear and binary search.",
  "Write the sorted-data precondition beside binary search.",
  "Compare typical time growth using O(n) and O(log n).",
  "Include one context-specific choice with a justified trade-off."
 ],["Both methods compared","Precondition identified","Original scenario","Reasoned conclusion"],4,"search",6),
 mapStage("Five branches · One connected map","Your A3 page is almost finished",5,2,"","Your own page may look different. The goal is an explainable memory aid."),
 model("I Do · Make the connections","Arrows are useful when they state a relationship.","Now join ideas from different branches — not just boxes of keywords.",[
  ["REPRESENTATION → LOGIC","Binary representation links to logic circuits and adders."],
  ["STRUCTURES → PROGRAMMING","Operations on data structures are implemented using subroutines and algorithms."],
  ["STRUCTURES → SEARCH","Ordered data makes binary search possible."],
  ["FINAL CHECK","Circle one weak subtopic. In green pen, add one missing step or example."]
 ],4,"links"),
 exit("Exit · True or false?","Binary search can work reliably on any unsorted collection without preparing the data.",false,"False. Binary search relies on ordering to justify discarding half of the collection."),
 {type:"complete",phase:"REVIEW",routine:"Listening",response:"A3 mind map",mins:3,title:"Our completed H446 mind map",sub:"A model to compare with your own work — not a page to copy. Check it and add one missing link."}
];
const slides=lesson===36?slides36:slides37;
let index=lesson===37&&location.hash==="#complete"?slides37.length-1:0,shownSteps=0,answerVisible=false;
const branches=[
 {name:"DATA TYPES",spec:"1.4.1",x:22,y:31,w:352,h:162,color:"#3574a5",fill:"#e8f3fc",lines:["Binary · denary · hex","2's complement · float","bitwise · ASCII / Unicode"]},
 {name:"DATA STRUCTURES",spec:"1.4.2",x:795,y:31,w:352,h:162,color:"#278671",fill:"#e8f7f0",lines:["Arrays · records · lists","stack / queue · tree / graph","linked list · hash · pointers"]},
 {name:"BOOLEAN LOGIC",spec:"1.4.3",x:22,y:467,w:352,h:166,color:"#b47736",fill:"#fff4e5",lines:["Truth tables · expressions","K-maps · De Morgan's","adders · D-type flip-flop"]},
 {name:"PROGRAMMING",spec:"2.2.1",x:795,y:467,w:352,h:166,color:"#7d60aa",fill:"#f3ebfc",lines:["Sequence · selection · loops","local scope · byVal / byRef","functions · modularity"]},
 {name:"ALGORITHMS",spec:"2.3.1",x:399,y:492,w:369,h:147,color:"#507e8a",fill:"#e9f5f6",lines:["Linear vs binary search","sorted data precondition","O(n) vs O(log n)"]}
];
function mapSVG(level=0,focus=""){
 const paths=[
  '<path d="M510 292 Q382 175 236 155" stroke="#3574a5"/>',
  '<path d="M661 294 Q791 175 969 155" stroke="#278671"/>',
  '<path d="M507 358 Q368 456 236 515" stroke="#b47736"/>',
  '<path d="M664 359 Q794 454 964 519" stroke="#7d60aa"/>',
  '<path d="M584 371 Q585 439 581 510" stroke="#507e8a"/>'
 ].join('');
 const cards=branches.map((b,i)=>{
   const active=i<level; const isFocused=focus===["data","structures","logic","programming","search"][i];
   const shade=active?b.fill:"#f3f5f4",edge=active?b.color:"#c3d1c9",txt=active?b.color:"#667a71";
   const subtitle=active?b.lines.map((s,j)=>'<text x="'+(b.x+b.w/2)+'" y="'+(b.y+82+j*23)+'" text-anchor="middle" font-weight="700" font-size="20" fill="#244438">'+escapeHtml(s)+'</text>').join(''):
   '<text x="'+(b.x+b.w/2)+'" y="'+(b.y+102)+'" text-anchor="middle" font-weight="800" font-size="24" fill="#a6b3ac">Add ideas here…</text>';
   return '<g><rect x="'+b.x+'" y="'+b.y+'" width="'+b.w+'" height="'+b.h+'" rx="18" fill="'+shade+'" stroke="'+edge+'" stroke-width="'+(isFocused?7:3)+'"/><text x="'+(b.x+b.w/2)+'" y="'+(b.y+37)+'" text-anchor="middle" font-size="23" font-weight="900" fill="'+txt+'">'+b.name+'</text><text x="'+(b.x+b.w/2)+'" y="'+(b.y+60)+'" text-anchor="middle" font-size="18" font-weight="700" fill="'+txt+'">'+b.spec+'</text>'+subtitle+'</g>';
 }).join('');
 return '<svg class="bigmap" viewBox="0 0 1170 660" role="img" aria-label="Growing revision mind map with five branches. Coloured branches show model ideas added so far." xmlns="http://www.w3.org/2000/svg"><rect width="1170" height="660" rx="15" fill="#fff"/><g fill="none" stroke-width="7" stroke-linecap="round">'+paths+'</g><rect x="467" y="275" width="240" height="100" rx="20" fill="#193f33"/><text x="587" y="315" text-anchor="middle" font-weight="900" font-size="30" fill="white">H446</text><text x="587" y="348" text-anchor="middle" font-weight="800" font-size="25" fill="white">A3 revision map</text>'+cards+'</svg>';
}
function microSVG(title,steps){
 /* This is a genuinely growing student-example branch, not a diagram
    of generic tasks. Content remains hidden until each teacher reveal. */
 const nodes=[
  {title:"1 · BASES",lines:["Binary: base 2","Denary: base 10"]},
  {title:"2 · HEX",lines:["Hexadecimal: base 16","Digits: 0–9 and A–F"]},
  {title:"3 · EXAMPLE",lines:["13₁₀ = 1101₂","1101₂ = D₁₆"]},
  {title:"4 · LINK + WARNING",lines:["1 hex digit ↔ 4 bits","Pad on the left if needed"]}
 ];
 const positions=[[20,29],[550,29],[20,280],[550,280]];
 const lines='<g fill="none" stroke="#5ba187" stroke-width="6" stroke-linecap="round"><path d="M420 186 Q260 115 165 104"/><path d="M430 185 Q565 116 694 104"/><path d="M420 217 Q260 311 165 326"/><path d="M430 218 Q574 310 694 328"/></g>';
 const cards=nodes.map((node,i)=>{
  const p=positions[i],visible=i<steps;
  const background=visible?"#e5f4eb":"#f5f7f5",border=visible?"#2f8d65":"#b9c9bf";
  const heading=visible?node.title:"IDEA "+(i+1)+" · TO REVEAL";
  const details=visible?node.lines.map((line,j)=>'<text x="'+(p[0]+142)+'" y="'+(p[1]+54+j*22)+'" font-size="18" font-weight="700" text-anchor="middle" fill="#24473a">'+escapeHtml(line)+'</text>').join(""):"";
  return '<g><rect x="'+p[0]+'" y="'+p[1]+'" width="285" height="98" rx="13" stroke="'+border+'" stroke-width="3" fill="'+background+'"/><text x="'+(p[0]+142)+'" y="'+(p[1]+27)+'" font-size="18" font-weight="900" text-anchor="middle" fill="'+(visible?"#205b42":"#98a99f")+'">'+heading+'</text>'+details+'</g>';
 }).join("");
 return '<svg class="micro-svg" viewBox="0 0 850 405" role="img" aria-label="Example mind map of H446 1.4.1 Number Systems that grows as four pieces of information are revealed"><rect width="850" height="405" rx="16" fill="white"/>'+lines+'<rect x="310" y="171" width="230" height="72" rx="17" fill="#205b42"/><text x="425" y="199" text-anchor="middle" font-size="21" font-weight="900" fill="white">1.4.1</text><text x="425" y="224" text-anchor="middle" font-size="21" font-weight="900" fill="white">NUMBER SYSTEMS</text>'+cards+'</svg>';
}
/* Final teaching aid: a complete *example* built from the topics already
   taught. It contains no source assessment questions, diagrams or mark scheme. */
function completedMapSVG(){
 const topics=[
  {spec:"1.4.1",name:"DATA TYPES",x:22,y:25,w:395,h:207,color:"#326a99",fill:"#e9f3fc",
   lines:["Binary (2) · denary (10) · hex (16)","Signed numbers: two's complement","Float: signed mantissa × 2^exponent","Bit shifts / masks; ASCII and Unicode"],
   example:"Example: 13₁₀ = 1101₂ = D₁₆"},
  {spec:"1.4.2",name:"DATA STRUCTURES",x:903,y:25,w:395,h:207,color:"#237a61",fill:"#e7f5ef",
   lines:["Array: index · record: named fields","Stack push/pop = LIFO","Queue enqueue/dequeue = FIFO","Tree / linked list / graph / hash table"],
   example:"Link: pointer → another node"},
  {spec:"1.4.3",name:"BOOLEAN ALGEBRA",x:22,y:488,w:395,h:217,color:"#a76c2d",fill:"#fff2e0",
   lines:["AND · OR · NOT · XOR / truth tables","K-maps: group adjacent 1s (2, 4, 8…)","Half adder: A + B → Sum, Carry","Full adder adds Cin; D-type stores 1 bit"],
   example:"Binary values → gates and circuits"},
  {spec:"2.2.1",name:"PROGRAMMING",x:903,y:488,w:395,h:217,color:"#7953a5",fill:"#f2eafb",
   lines:["Sequence · selection · iteration","Functions return; procedures perform","Local scope; by-value / by-reference","Modularity, tracing and debugging"],
   example:"byRef can update caller data"},
  {spec:"2.3.1",name:"ALGORITHMS",x:459,y:523,w:401,h:182,color:"#497c88",fill:"#e7f3f6",
   lines:["Linear: inspect in turn — O(n)","Binary: halve sorted data — O(log n)","Compare sorting cost and repeated use"],
   example:"Precondition: appropriately ordered"}
 ];
 const links='<g fill="none" stroke-width="7" stroke-linecap="round" opacity=".9">'+
  '<path d="M540 308 Q422 233 222 219" stroke="#326a99"/>'+
  '<path d="M777 308 Q881 232 1098 219" stroke="#237a61"/>'+
  '<path d="M534 390 Q423 478 218 513" stroke="#a76c2d"/>'+
  '<path d="M784 390 Q882 478 1102 513" stroke="#7953a5"/>'+
  '<path d="M660 397 Q660 462 660 530" stroke="#497c88"/>'+
  '</g>';
 const safe=t=>escapeHtml(t);
 const cards=topics.map(t=>{
  const cx=t.x+t.w/2;
  const body=t.lines.map((l,i)=>'<text x="'+cx+'" y="'+(t.y+91+i*24)+'" text-anchor="middle" font-size="22" font-weight="650" fill="#25443c">'+safe(l)+'</text>').join("");
  return '<g><rect x="'+t.x+'" y="'+t.y+'" width="'+t.w+'" height="'+t.h+'" rx="17" fill="'+t.fill+'" stroke="'+t.color+'" stroke-width="3"/>'+
  '<text x="'+cx+'" y="'+(t.y+32)+'" text-anchor="middle" font-size="28" font-weight="900" fill="'+t.color+'">'+safe(t.name)+'</text>'+
  '<text x="'+cx+'" y="'+(t.y+58)+'" text-anchor="middle" font-size="22" font-weight="800" fill="'+t.color+'">'+t.spec+'</text>'+
  body+'<text x="'+cx+'" y="'+(t.y+t.h-14)+'" text-anchor="middle" font-size="18" font-weight="800" fill="'+t.color+'">'+safe(t.example)+'</text></g>';
 }).join("");
 const labels='<g font-family="Arial,Helvetica,sans-serif" font-size="18" font-weight="900" text-anchor="middle">'+
  '<rect x="23" y="333" width="290" height="36" rx="17" fill="#fff6dc" stroke="#d6b26d"/><text x="168" y="357" fill="#7f5523">Binary → Boolean gates</text>'+
  '<rect x="1002" y="333" width="291" height="36" rx="17" fill="#e3f4e9" stroke="#83ba9c"/><text x="1147" y="357" fill="#235e43">Structures → Program code</text>'+
  '<rect x="505" y="451" width="310" height="36" rx="17" fill="#e2eff3" stroke="#92b9c5"/><text x="660" y="475" fill="#285465">Ordered data → binary search</text></g>';
 return '<svg class="bigmap completed-svg" viewBox="0 0 1320 728" role="img" aria-label="Completed H446 knowledge mind map: 1.4.1 data types, 1.4.2 data structures, 1.4.3 Boolean algebra, 2.2.1 programming, 2.3.1 algorithms, with connections between binary and logic, structures and programming, and ordered data and search." xmlns="http://www.w3.org/2000/svg">'+
  '<rect x="1" y="1" width="1318" height="726" rx="18" fill="#fff" stroke="#d6e4dd" stroke-width="2"/>'+
  links+'<rect x="524" y="298" width="272" height="111" rx="21" fill="#194834" stroke="#123b2e" stroke-width="3"/>'+
  '<text x="660" y="342" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="32" font-weight="900" fill="#fff">H446 Year 12</text>'+
  '<text x="660" y="375" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="24" font-weight="850" fill="#fff">Revision mind map</text>'+
  cards+labels+'</svg>';
}

function printSheet(){
 return '<div class="printonly printonly-blank"><h1>OCR H446 · One A3 revision map</h1><p class="student-line">Name: _______________________ &nbsp;&nbsp; Class: __________ &nbsp;&nbsp; Date: __________</p>'+mapSVG(0)+'</div>'+'<div class="printonly printonly-complete"><h1>OCR H446 · Completed revision mind-map example</h1>'+completedMapSVG()+'</div>';
}
const simpleList=items=>'<ul>'+items.map(x=>'<li>'+escapeHtml(x)+'</li>').join('')+'</ul>';
function slideBody(s){
 if(s.type==="questions"||s.type==="answers") return '<div class="do-now-grid">'+s.items.map((q,i)=>'<article class="q-card '+(s.type==="answers"?"answer":"")+'"><div class="num">'+escapeHtml(q.label)+'</div><p>'+(s.type==="answers"?escapeHtml(q.answer):escapeHtml(q.text))+'</p></article>').join("")+'</div>';
 if(s.type==="map")return '<div class="map-stage"><div class="map-panel">'+mapSVG(s.level,s.focus)+'</div><div class="map-caption"><span>ONE A3 LANDSCAPE SHEET · '+(lesson===36?"BUILD THE FIRST TWO BRANCHES":"CONTINUE THE SAME SHEET")+'</span><strong>'+escapeHtml(s.caption)+'</strong></div></div>';
 if(s.type==="model"){
  const currentStep=shownSteps>0?s.steps[shownSteps-1]:null;
  const milestones=s.steps.map((p,i)=>{
    const state=i<shownSteps?(i===shownSteps-1?"is-current":"is-complete"):"is-pending";
    return '<span class="model-milestone '+state+'"><b>'+(i+1)+'</b>'+escapeHtml(p[0])+'</span>';
  }).join("");
  const focus=currentStep?
    '<div class="model-current"><span class="label">STEP '+shownSteps+' · MODEL THIS NOW</span><h2>'+escapeHtml(currentStep[0])+'</h2><p>'+escapeHtml(currentStep[1])+'</p></div>':
    '<div class="model-current"><span class="label">BEFORE THE FIRST REVEAL</span><h2>Start with the topic</h2><p>'+escapeHtml(s.lead)+'</p></div>';
  const left=s.example==="numbers-map"?
    '<div class="micro-panel"><div class="label">OCR 1.4.1 · SAMPLE BRANCH · ONE IDEA PER REVEAL</div>'+microSVG("NUMBER SYSTEMS",shownSteps)+'</div>':
    s.example==="links"?'<div class="map-panel">'+mapSVG(5)+'</div>':
    '<div class="card visual"><div class="stack"><h2>'+escapeHtml(s.lead)+'</h2><div class="focus-note">Watch → explain → put a shorter version on your map.</div><div class="word-chips"><span>Definition</span><span>Method</span><span>Misconception</span><span>Link</span></div></div></div>';
  return '<div class="split model-layout">'+left+'<article class="card model-explanation"><div class="label">TEACHER MODELS · '+shownSteps+' OF '+s.steps.length+' STEPS</div><div class="model-milestones" aria-label="Teaching steps">'+milestones+'</div>'+focus+'<p class="model-footnote">Your example on the left keeps growing. The next reveal shows only the next explanation.</p></article></div>';
 }
 if(s.type==="board")return '<div class="split"><article class="card board-prompt"><span class="board-label">WRITE → HOLD UP → EXPLAIN</span><p>'+escapeHtml(s.prompt)+'</p><div class="focus-note">Use your mini-whiteboard. The answer is hidden until the teacher reveals it.</div></article><div class="stack"><div class="board-wait" '+(answerVisible?'hidden':'')+'>Show your whiteboard before checking</div><div class="board-answer" '+(answerVisible?'':'hidden')+'><span class="label">MODEL ANSWER</span><div>'+escapeHtml(s.answer)+'</div>'+(s.explain?'<p class="note">'+escapeHtml(s.explain)+'</p>':'')+'</div></div></div>';
 if(s.type==="write")return '<div class="split"><article class="card"><div class="label">YOUR A3 SHEET · '+(s.focus==="data"?"1.4.1":s.focus==="structures"?"1.4.2":s.focus==="logic"?"1.4.3":s.focus==="programming"?"2.2.1":"2.3.1")+'</div><div class="text-block">'+simpleList(s.prompts)+'</div></article><div class="write-side"><h2>Check your own branch</h2><div class="checks">'+s.checks.map(x=>'<span>□ '+escapeHtml(x)+'</span>').join("")+'</div><p>First from memory in black pen. Then check using your guide and improve in green pen.</p><p><strong>The full model is not on this slide.</strong></p></div></div>';
 if(s.type==="complete")return '<div class="map-stage final-map-stage"><div class="map-panel final-map-panel">'+completedMapSVG()+'</div><div class="map-caption"><span>MODEL EXAMPLE · FIVE BRANCHES · THREE LABELLED CONNECTIONS</span><button type="button" id="print-complete" class="complete-print">Print this finished A3 example</button></div></div>';
 if(s.type==="exit")return '<div class="split"><article class="card board-prompt"><span class="board-label">TRUE OR FALSE? · THUMBS UP / DOWN</span><p>'+escapeHtml(s.statement)+'</p><div class="confidence"><span>👍 True</span><span>👎 False</span><span>↔ Unsure</span></div></article><article class="card"><div class="label">REVEAL AFTER RESPONSE</div>'+(answerVisible?'<div class="board-answer"><strong>'+(s.correct?"TRUE":"FALSE")+'</strong><p>'+escapeHtml(s.explanation)+'</p></div>':'<div class="board-wait">Show your answer first</div>')+'<p class="note">Finish by circling the one part of your map you still need to practise.</p></article></div>';
 return '<div class="card">Continue to the next step.</div>';
}
function signalName(phase){
 const m={"DO NOW":"Do Now","OBJECTIVES":"Objectives","I DO":"I Do","WE DO":"We Do","YOU DO":"You Do","EXIT":"Exit Questioning"};
 return m[phase]||phase;
}
function render(){
 const s=slides[index];document.body.classList.toggle("show-complete-map",s.type==="complete");document.title="Lesson "+(lesson===36?"036":"037")+" · "+s.title+" · H446";
 $("#lesson-number").textContent="L"+(lesson===36?"036":"037");
 $("#top-title").textContent="A3 Mind Map · Part "+(lesson===36?"1":"2");
 $("#slide-title").textContent=s.title;$("#subtitle").textContent=s.sub||"";
 $("#phase-tag").textContent=signalName(s.phase);
 $("#routine-tag").textContent=s.routine;
 $("#response-tag").textContent=s.response;
 $("#time").textContent=s.mins+" min";
 $("#stage").innerHTML=slideBody(s);
 const finishedPrint=$("#print-complete");
 if(finishedPrint)finishedPrint.addEventListener("click",()=>{document.body.classList.add("print-complete");window.print();});
 $("#count").textContent=(index+1)+" / "+slides.length;
 $("#back").disabled=index===0&&shownSteps===0&&!answerVisible;
 $("#next").textContent=s.type==="complete"?"Completed ✓":(s.type==="model"&&shownSteps<s.steps.length)?"Reveal next step →":((s.type==="board"||s.type==="exit")&&!answerVisible)?"Reveal answer →":"Next →";
 $("#next").disabled=s.type==="complete";
 $("#progress").innerHTML=slides.map((_,i)=>'<span class="'+(i<=index?"active":"")+'"></span>').join("");
 $("#stage").scrollTop=0;
 const main=$("#main");if(main)main.scrollTop=0;
}
function next(){
 const s=slides[index];
 if(s.type==="model"&&shownSteps<s.steps.length){shownSteps++;render();return;}
 if((s.type==="board"||s.type==="exit")&&!answerVisible){answerVisible=true;render();return;}
 if(index<slides.length-1){index++;shownSteps=0;answerVisible=false;render();}
}
function back(){
 if((slides[index].type==="board"||slides[index].type==="exit")&&answerVisible){answerVisible=false;render();return;}
 if(slides[index].type==="model"&&shownSteps>0){shownSteps--;render();return;}
 if(index>0){index--;shownSteps=slides[index].type==="model"?slides[index].steps.length:0;answerVisible=slides[index].type==="board"||slides[index].type==="exit";render();}
}
function start(){
 $("#app").innerHTML='<header class="top"><div class="top-left"><a class="home" href="../../../h446-hub.html?year=12#lessons" aria-label="Back to Year 12 hub">⌂ Home</a><span class="lesson-tag" id="lesson-number"></span><div><div class="top-title" id="top-title"></div><div class="top-note">Teacher-led revision · One growing A3 sheet</div></div></div><div class="top-right"><button type="button" id="print" title="Print a blank A3 outline">Print blank A3</button><button type="button" id="fullscreen">Full screen ⛶</button></div></header><main class="scene-shell" id="main"><div class="scene-head"><div class="tags"><span class="tag tag-phase" id="phase-tag"></span><span class="tag tag-routine" id="routine-tag"></span><span class="tag tag-response" id="response-tag"></span></div><span class="time" id="time"></span></div><h1 id="slide-title"></h1><p class="subtitle" id="subtitle"></p><section class="scene-body" id="stage" aria-live="polite"></section></main><footer class="footer"><span class="progress" id="progress" aria-hidden="true"></span><div class="count" id="count"></div><div class="controls"><button type="button" id="back">← Back</button><button type="button" id="next" class="primary">Next →</button></div></footer>';
 $("#print").addEventListener("click",()=>{document.body.classList.remove("print-complete");window.print();});
 window.addEventListener("afterprint",()=>document.body.classList.remove("print-complete"));
 $("#fullscreen").addEventListener("click",()=>{if(!document.fullscreenElement){document.documentElement.requestFullscreen?.();}else{document.exitFullscreen?.();}});
 $("#back").addEventListener("click",back);$("#next").addEventListener("click",next);
 document.addEventListener("keydown",e=>{if(e.target instanceof HTMLElement&&["INPUT","TEXTAREA","BUTTON"].includes(e.target.tagName))return;if(e.key==="ArrowRight"||e.key===" "){e.preventDefault();next();}if(e.key==="ArrowLeft"){e.preventDefault();back();}});
 let x=0,y=0;const app=$("#app");app.addEventListener("touchstart",e=>{x=e.changedTouches[0].screenX;y=e.changedTouches[0].screenY;},{passive:true});
 app.addEventListener("touchend",e=>{const dx=e.changedTouches[0].screenX-x,dy=e.changedTouches[0].screenY-y;if(Math.abs(dx)>85&&Math.abs(dy)<70){if(dx<0)next();else back();}},{passive:true});
 document.body.insertAdjacentHTML("beforeend",printSheet());
 render();
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start);else start();
})();
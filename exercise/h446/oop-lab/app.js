'use strict';
function make(focus,level,n,demo=false){
 const l=["easy","medium","hard"].indexOf(level),i=n%5,a=4+i,b=9+i,k=2+i, suffix=demo?"Demo":"";
 const q=(prompt,code,labels,answers,hint,steps,options)=>({prompt,code,labels,answers:answers.map(String),hint,steps,options,model:steps.map(x=>x[1]+"\n"+x[2]).join("\n\n")});
 const out=(name,code,answers,steps,hint="Trace each statement in order.")=>q(name,code,answers.map((_,j)=>"Output line "+(j+1)),answers,hint,steps);
 if(focus==="objects"){
  const code=`class Counter {\n    public int Value = 0;\n}\nCounter x = new Counter();\nCounter y = ${l===2?"x":"new Counter()"};\nx.Value = ${a};\ny.Value ${l===2?"+=":"="} ${b};\nx.Value += ${k};\nConsole.WriteLine(x.Value);\nConsole.WriteLine(y.Value);`;
  const x=l===2?a+b+k:a+k,y=l===2?x:b;
  if(l===0)return q("Identify the class and object references.",code,["Class name","First reference name","Second reference name"],["Counter","x","y"],"A class defines a type. A variable can refer to an object.",[["Class","Counter","The class defines Value."],["Instances","x and y","Each new Counter() creates a separate object."]]);
  return out("Predict the output.",code,[x,y],[["Create objects",l===2?"y = x":"Two calls to new",l===2?"Both references point to the same object.":"Each object has its own Value."],["Update state",`x.Value = ${x}; y.Value = ${y}`,"Follow the assignments and addition in order."],["Output",`${x}\n${y}`,"Print the current values."]]);
 }
 if(focus==="state"){
  const code=`class Player {\n    public int Score;\n    public void Add(int n) { Score += n; }\n}\nPlayer p = new Player();\nPlayer r = new Player();\np.Score = ${a};\nr.Score = ${b};\np.Add(${k});${l===2?`\nr.Add(p.Score);`:""}\nConsole.WriteLine(p.Score);\nConsole.WriteLine(r.Score);`;
  if(l===0)return q("Identify the attribute and method.",code,["Attribute","Method name"],["Score","Add"],"An attribute stores state; a method performs an operation.",[["Attribute","Score","Stores each player's score."],["Method","Add","Changes the score of the object receiving the call."]]);
  const x=a+k,y=l===2?b+x:b;return out("Trace both objects' state.",code,[x,y],[["Initial state",`p: ${a}; r: ${b}`,"Separate instances."],["Method calls",`p: ${x}; r: ${y}`,"Add changes the receiving object only."],["Output",`${x}\n${y}`,"Read the final scores."]]);
 }
 if(focus==="constructors"){
  const code=`class Ticket {\n    public int Seats;\n    public Ticket(int count) {\n        ${l===2?"// missing assignment":"Seats = count;"}\n    }\n}\nTicket t = new Ticket(${a});\nTicket u = new Ticket(${b});\nConsole.WriteLine(t.Seats);\nConsole.WriteLine(u.Seats);`;
  if(l===2)return q("Complete the constructor and predict the output.",code,["Missing assignment","Output line 1","Output line 2"],["Seats = count;",a,b],"Assign the parameter to the attribute.",[["Initialise","Seats = count;","The parameter becomes the instance's stored state."],["Create two tickets",`${a}, ${b}`,"Each constructor receives a different argument."],["Output",`${a}\n${b}`,"Read each stored value."]]);
  return out("Predict the constructor's effect.",code,[a,b],[["First call",`new Ticket(${a})`,`count is ${a}; Seats becomes ${a}.`],["Second call",`new Ticket(${b})`,`count is ${b}; Seats becomes ${b}.`],["Output",`${a}\n${b}`,"Each ticket stores its own value."]]);
 }
 if(focus==="encapsulation"){
  const code=`class Wallet {\n    private int coins = ${b};\n    public bool Spend(int n) {\n        ${l===2?"// missing guard":"if (n <= 0 || n > coins) return false;"}\n        coins -= n;\n        return true;\n    }\n    public int GetCoins() { return coins; }\n}\nWallet w = new Wallet();\nw.Spend(${a});\nw.Spend(-2);\nw.Spend(${b+1});\nConsole.WriteLine(w.GetCoins());`;
  const steps=[["Control access","private int coins","Outside code must use public methods."],["Guard","if (n <= 0 || n > coins) return false;","Reject invalid or unaffordable amounts before updating."],["Trace",`${b} - ${a} = ${b-a}`,"Only the first spend succeeds."]];
  if(l===0)return q("Which access modifier protects the stored state?",code,["Access modifier","Accessor method name"],["private","GetCoins"],"Look at the field and the method that returns it.",steps);
  if(l===2)return q("Choose the correct guard and predict the final balance.",code,["Guard","Final output"],["if (n <= 0 || n > coins) return false;",b-a],"Reject invalid values before subtraction.",steps,[["if (n <= 0 || n > coins) return false;","if (n <= 0 && n > coins) return false;","if (n > 0) return false;"],null]);
  return out("Trace the validated updates.",code,[b-a],steps);
 }
 if(focus==="inheritance"||focus==="polymorphism"||focus==="design"){
  if(focus==="design"){
   return q("Select an appropriate class model.",`A library stores Book objects and Member objects.\nA Member borrows a Book.\nEach Book has a title and an on-loan flag.${l===2?"\nA loan must not succeed if the book is already on loan.":""}`,["Class storing the title","Relationship between Member and Book",...(l===2?["Correct loan guard"]:[])],["Book","Association",...(l===2?["if (onLoan) return false;"]:[])],"Use inheritance only for an is-a relationship.",[["Identify classes","Book; Member","Each represents a different entity."],["Relationship","Association","A member borrows a book; a member is not a type of book."],["Protect state","if (onLoan) return false;","Reject an already borrowed book before changing its state."]],[["Member","Book"],["Inheritance","Association"],["if (onLoan) return false;","if (!onLoan) return false;"]]);
  }
  const poly=focus==="polymorphism",code=poly?`class Animal {\n    public virtual string Speak() { return "Animal"; }\n}\nclass Dog : Animal {\n    public override string Speak() { return "Woof"; }\n}\nclass Cat : Animal {\n    public override string Speak() { return "Meow"; }\n}\nAnimal pet = new ${i%2?"Cat":"Dog"}();\nConsole.WriteLine(pet.Speak());${l===2?"\npet = new Animal();\nConsole.WriteLine(pet.Speak());":""}`:`class Device {\n    public string Status() { return "Ready"; }\n}\nclass Tablet : Device {\n    public string Label() { return "T${i+1}"; }\n}\nTablet t = new Tablet();\nConsole.WriteLine(t.Status());\nConsole.WriteLine(t.Label());`;
  const word=i%2?"Meow":"Woof";
  const steps=poly?[["Declared type","Animal","The reference can hold an Animal or derived object."],["Runtime type",i%2?"Cat":"Dog","The override is selected at runtime."],["Output",l===2?`${word}\nAnimal`:word,"A new Animal uses the base implementation."]]:[["Base class","Device","Defines Status()."],["Derived class","Tablet","Inherits accessible members and adds Label()."],["Output",`Ready\nT${i+1}`,"The inherited and specialised methods both work."]];
  if(l===0)return q("Identify the classes.",code,["Base class","Derived class used in the first object creation"],poly?["Animal",i%2?"Cat":"Dog"]:["Device","Tablet"],"Read the class declarations and new expression.",steps);
  return out(poly?"Predict the virtual method output.":"Predict the inherited and specialised method output.",code,poly?(l===2?[word,"Animal"]:[word]):["Ready",`T${i+1}`],steps);
 }
 throw Error("Unknown focus");
}
function mount(){
 const $=id=>document.getElementById(id),el=(tag,cls,t)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(t!==undefined)e.textContent=t;return e;};
 const topics={objects:"Classes & objects",state:"Attributes & methods",constructors:"Constructors",encapsulation:"Encapsulation",inheritance:"Inheritance",polymorphism:"Polymorphism",design:"Class design"};
 const params=new URLSearchParams(location.search);let focus=Object.hasOwn(topics,params.get("focus"))?params.get("focus"):"objects",level=["easy","medium","hard"].includes(params.get("level"))?params.get("level"):"easy",n=0,question,step=0,example;
 const select=$("focus");Object.entries(topics).forEach(([v,t])=>{let o=el("option","",t);o.value=v;select.append(o);});select.value=focus;
 const levels=[...document.querySelectorAll("[data-level]")],normal=v=>String(v).trim().replace(/\s+/g," ").replace(/\s*([=;])\s*/g,"$1");
 function render(){question=make(focus,level,n);$("question-number").textContent="Question "+(n+1);$("prompt").textContent=question.prompt;$("instruction").textContent="Predict or complete the C# example before checking."; $("visual").replaceChildren(el("div","data-label","C# · GIVEN CODE / SCENARIO"),el("pre","review-code",question.code));$("entry").replaceChildren();question.labels.forEach((t,i)=>{let w=el("label","review-field"),opts=question.options?.[i],input=el(opts?"select":"input");if(opts){let blank=el("option","","Choose…");blank.value="";input.append(blank);opts.forEach(s=>input.append(el("option","",s)));}else{input.type="text";input.autocomplete="off";input.spellcheck=false;}w.append(el("span","",t),input);$("entry").append(w);});$("feedback").textContent="";$("explainer").hidden=true;$("hint").textContent="Show hint";levels.forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.level===level)));}
 function openDemo(){example=make(focus,level,n+1,true);step=0;$("activity").hidden=true;$("demo").hidden=false;$("demo-title").textContent=topics[focus]+" · Demo";$("demo-prompt").textContent="Worked example · "+example.prompt;$("demo-code").textContent=example.code;draw();}
 function draw(){$("demo-steps").replaceChildren();example.steps.forEach((s,i)=>{let item=el("li",i<step?"shown":"pending");item.append(el("span","num",String(i+1).padStart(2,"0")),el("strong","",i<step?s[0]:"Step "+(i+1)));if(i<step)item.append(el("code","",s[1]),el("p","",s[2]));$("demo-steps").append(item);});$("demo-step").disabled=step>=example.steps.length;$("demo-step").textContent=$("demo-step").disabled?"✓ Example complete":"⏭ Next step";}
 function back(){$("demo").hidden=true;$("activity").hidden=false;}
 function reset(){back();n=0;render();}
 select.onchange=()=>{focus=select.value;reset();};levels.forEach(b=>b.onclick=()=>{level=b.dataset.level;reset();});
 $("check").onclick=()=>{let inputs=[...$("entry").querySelectorAll("input,select")],correct=inputs.map((e,i)=>normal(e.value)===normal(question.answers[i]));inputs.forEach((e,i)=>{e.style.borderColor=correct[i]?"#23754c":"#ad5949";});$("feedback").className="feedback "+(correct.every(Boolean)?"good":"bad");$("feedback").textContent=correct.every(Boolean)?"Correct — well done.":`${correct.filter(Boolean).length} of ${correct.length} correct. Check the highlighted answers.`;};
 $("hint").onclick=()=>{$("explainer").hidden=false;$("explainer").textContent=question.hint;};
 $("model").onclick=()=>{$("explainer").hidden=false;$("explainer").textContent=question.model;};
 $("next").onclick=()=>{n++;render();};$("demo-launch").onclick=openDemo;$("demo-back").onclick=back;$("demo-step").onclick=()=>{step++;draw();};$("demo-reset").onclick=()=>{step=0;draw();};render();
}
if(typeof module==='object'&&module.exports){module.exports={make};}else{mount();}

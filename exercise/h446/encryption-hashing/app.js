'use strict';
function make(focus,level,n){
 const l=["easy","medium","hard"].indexOf(level),labels=[],answers=[],options=[],steps=[],add=(k,v,o)=>{labels.push(k);answers.push(String(v));options.push(o);},ex=(a,b,c)=>steps.push([a,b,c]);let prompt,code;
 if(focus==="symmetric"){
 const p=(33+n*17)%256,k=(101+n*11)%256,c=p^k,bits=x=>x.toString(2).padStart(8,"0");
 prompt="Trace a teaching-only XOR example.";code=`Plaintext byte: ${bits(p)}\nShared secret byte: ${bits(k)}\nToy transformation: ciphertext = plaintext XOR key.\nThis illustrates reversibility only; repeated XOR is not secure encryption.`;
 add("Ciphertext (8 bits)",bits(c));ex("Encrypt",`${bits(p)} XOR ${bits(k)} = ${bits(c)}`,"A bit becomes 1 exactly when the input bits differ.");
 if(l>=1){add("Decrypted plaintext (8 bits)",bits(c^k));ex("Decrypt",`${bits(c)} XOR ${bits(k)} = ${bits(p)}`,"Applying XOR with the same byte reverses this toy operation.");}
 if(l===2){add("Main symmetric-key distribution requirement","Share the key securely",["Share the key securely","Publish the secret key","Store passwords using reversible encryption"]);ex("Key management","Shared secret","Secure symmetric schemes require protected keys; the XOR example is not a real cipher.");}
 }else if(focus==="public"){
 const [sender,recipient]=n%2?["Alice","Bob"]:["Bob","Alice"];
 const sign=l===2&&n%2===0;prompt=sign?"Identify the keys used in a digital signature.":"Identify the keys used for public-key confidentiality.";
 code=sign?`${sender} signs a software update. ${recipient} verifies its signature using an authenticated key.`:`${sender} sends a confidential message to ${recipient}. Assume the public encryption key is authenticated and the scheme is suitable for encryption.`;
 const keys=[sender+" public key",sender+" private key",recipient+" public key",recipient+" private key"];
 if(sign){add("Key used to sign",sender+" private key",keys);add("Key used to verify",sender+" public key",keys);add("Does a signature alone provide secrecy?","No",["Yes","No"]);ex("Sign",sender+" private key","The signing key stays private.");ex("Verify",sender+" public key","Verification supports integrity and authenticity, not secrecy.");}
 else{add("Key used to encrypt",recipient+" public key",keys);add("Key used to decrypt",recipient+" private key",keys);ex("Encrypt",recipient+" public key","Use the intended recipient's authenticated public key.");ex("Decrypt",recipient+" private key","The recipient keeps this key secret.");if(l>=1)add("May the recipient publish the private key?","No",["Yes","No"]);if(l===2)add("Reason to authenticate the public key","Prevent key substitution",["Prevent key substitution","Make encryption unnecessary","Allow anyone to decrypt"]);}
 }else if(focus==="hybrid"){
 prompt="Choose the correct stage in a hybrid secure connection.";code="A client and server establish a secure session and transfer a large file. Assume a modern authenticated key-establishment protocol.";
 add("Approach for authenticated session-key establishment","Asymmetric cryptography",["Asymmetric cryptography","Plaintext password storage","Lossy compression"]);add("Approach for bulk encrypted data","Symmetric encryption",["Symmetric encryption","Public hash alone","Lossless compression"]);
 ex("Establish keys","Authenticated key establishment","Public-key techniques help establish shared session secrets and authenticate peers.");ex("Protect traffic","Symmetric session encryption","Efficient authenticated symmetric encryption protects bulk traffic.");
 if(l>=1)add("Does an encrypted connection prove the site operator is trustworthy?","No",["Yes","No"]);if(l===2){add("Should the session key be published?","No",["Yes","No"]);ex("Trust and secrecy","Check identity; keep session keys secret","Transport security does not guarantee the operator's intentions.");}
 }else if(focus==="hash"){
 const cases=[["Verify a downloaded file against a trusted expected digest","Cryptographic hash"],["Store a password verifier","Salted password KDF"],["Recover a confidential archived report later","Encryption"],["Authenticate a signed software update","Digital signature"]],item=cases[n%cases.length];
 prompt="Choose the correct protection method.";code=item[0]+".";
 add("Method",item[1],cases.map(c=>c[1]));ex("Match purpose",item[1],"Hashing is one-way; encryption is intended to be reversible with the appropriate key; signatures support authenticity.");
 if(l>=1){add("Can two distinct inputs have the same fixed-length digest?","Yes",["Yes","No"]);ex("Collision","Possible","A finite digest space cannot uniquely represent every possible input.");}
 if(l===2){add("Password verification: what is stored alongside the derived verifier?","Unique random salt",["Unique random salt","Plaintext password","Private decryption key"]);add("Password verification method","Recompute using stored salt and compare",["Recompute using stored salt and compare","Decrypt the stored hash","Compare plaintext passwords"]);ex("Password storage","Salt + suitable password KDF","A slow password-hashing function reduces guessing efficiency; never store plaintext passwords.");}
 }else throw Error("Focus");
 return {prompt,code,labels,answers,options,steps,hint:"Match the method to confidentiality, integrity, authenticity or password verification. A hash is not reversible encryption.",model:steps.map(s=>s.join("\n")).join("\n\n")};
}
function mount(){
 const $=id=>document.getElementById(id),el=(tag,cls,t)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(t!==undefined)e.textContent=t;return e;};
 const topics={"symmetric":"Symmetric encryption","public":"Public-key encryption & signatures","hybrid":"Hybrid encryption","hash":"Hashing & password verification"};
 const params=new URLSearchParams(location.search);let focus=Object.hasOwn(topics,params.get("focus"))?params.get("focus"):"symmetric",level=["easy","medium","hard"].includes(params.get("level"))?params.get("level"):"easy",n=0,question,step=0,example;
 const select=$("focus");Object.entries(topics).forEach(([v,t])=>{let o=el("option","",t);o.value=v;select.append(o);});select.value=focus;
 const levels=[...document.querySelectorAll("[data-level]")],normal=v=>String(v).trim().replace(/\s+/g," ").replace(/\s*([,=;])\s*/g,"$1");
 function table(rows,headers){const t=el("table","trace-table"),head=el("tr");headers.forEach(s=>head.append(el("th","",s)));t.append(head);rows.forEach(r=>{const tr=el("tr");r.forEach(s=>tr.append(el("td","",s)));t.append(tr);});return t;}
 function render(){question=make(focus,level,n);$("question-number").textContent="Question "+(n+1);$("prompt").textContent=question.prompt;$("instruction").textContent="Work through the scenario before checking."; $("visual").replaceChildren(el("div","data-label","GIVEN EXAMPLE"),el("pre","review-code",question.code));if(question.rows)$("visual").append(table(question.rows,question.headers));$("entry").replaceChildren();question.labels.forEach((t,i)=>{let w=el("label","review-field"),opts=question.options?.[i],input=el(opts?"select":"input");if(opts){let blank=el("option","","Choose…");blank.value="";input.append(blank);opts.forEach(s=>input.append(el("option","",s)));}else{input.type="text";input.autocomplete="off";input.spellcheck=false;}w.append(el("span","",t),input);$("entry").append(w);});$("feedback").textContent="";$("explainer").hidden=true;$("hint").textContent="Show hint";levels.forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.level===level)));}
 function openDemo(){example=make(focus,level,n+1,true);step=0;$("activity").hidden=true;$("demo").hidden=false;$("demo-title").textContent=topics[focus]+" · Demo";$("demo-prompt").textContent="Worked example · "+example.prompt;$("demo-code").textContent=example.code;$("demo-table").replaceChildren();if(example.rows)$("demo-table").append(table(example.rows,example.headers));draw();}
 function draw(){if(example.rows)$("demo-table").replaceChildren(table(step>=example.steps.length&&example.resultRows?example.resultRows:example.rows,example.headers));$("demo-steps").replaceChildren();example.steps.forEach((s,i)=>{let item=el("li",i<step?"shown":"pending");item.append(el("span","num",String(i+1).padStart(2,"0")),el("strong","",i<step?s[0]:"Step "+(i+1)));if(i<step)item.append(el("code","",s[1]),el("p","",s[2]));$("demo-steps").append(item);});$("demo-step").disabled=step>=example.steps.length;$("demo-step").textContent=$("demo-step").disabled?"✓ Example complete":"⏭ Next step";}
 function back(){$("demo").hidden=true;$("activity").hidden=false;}
 function reset(){back();n=0;render();}
 select.onchange=()=>{focus=select.value;reset();};levels.forEach(b=>b.onclick=()=>{level=b.dataset.level;reset();});
 $("check").onclick=()=>{let inputs=[...$("entry").querySelectorAll("input,select")],correct=inputs.map((e,i)=>(question.labels[i].includes("bits")?e.value.replace(/[\s,]/g,"")===question.answers[i]:normal(e.value).toLowerCase()===normal(question.answers[i]).toLowerCase()));inputs.forEach((e,i)=>{e.style.borderColor=correct[i]?"#23754c":"#ad5949";});$("feedback").className="feedback "+(correct.every(Boolean)?"good":"bad");$("feedback").textContent=correct.every(Boolean)?"Correct — well done.":`${correct.filter(Boolean).length} of ${correct.length} correct. Check the highlighted answers.`;};
 $("hint").onclick=()=>{$("explainer").hidden=false;$("explainer").textContent=question.hint;};
 $("model").onclick=()=>{$("explainer").hidden=false;$("explainer").textContent=question.model;};
 $("next").onclick=()=>{n++;render();};$("demo-launch").onclick=openDemo;$("demo-back").onclick=back;$("demo-step").onclick=()=>{step++;draw();};$("demo-reset").onclick=()=>{step=0;draw();};render();
}
if(typeof module==='object'&&module.exports){module.exports={make};}else{mount();}

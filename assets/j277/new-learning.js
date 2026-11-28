/* J277 New Learning: synchronize scenes with the shared reveal controller.
   Opt-in SVG motion runs once per entry to its reveal, and resets on exit. */
(function(){
 const root=document.getElementById("new-learning");if(!root)return;
 const stages=[...root.querySelectorAll(".nl-stage")];
 const figures=[...root.querySelectorAll("[data-cpu-step]")];
 let previous=-1;
 function sync(){
  const active=Math.max(0,stages.findIndex(s=>!s.hidden));
  figures.forEach((f,i)=>{
   f.hidden=i!==active;
   if(active!==previous)f.querySelectorAll("[data-nl-animation]").forEach(svg=>svg.classList.toggle("nl-playing",i===active));
  });
  previous=active;
 }
 const obs=new MutationObserver(sync);
 stages.forEach(s=>obs.observe(s,{attributes:true,attributeFilter:["hidden"]}));
 sync();

 // Teacher-only adaptation of the Skills Lab's eight-bit shift workspace.
 // One board, place values, left/right actions and current value; no assessment.
 root.querySelectorAll("[data-nl-shift-board]").forEach(board=>{
  const start=Number(board.dataset.nlShiftBoard),svg=board.querySelector("svg");
  const tiles=[...svg.querySelectorAll("[data-shift-digit]")];
  const moving=svg.querySelector("[data-shift-moving]");
  const valueText=board.querySelector("[data-shift-value]");
  const controls=[...board.querySelectorAll("[data-shift-action]")];
  let value=start, motion=null, generation=0;
  const binary=n=>n.toString(2).padStart(8,"0");
  function draw(){
   binary(value).split("").forEach((digit,i)=>{
    tiles[i].textContent=digit;
    tiles[i].parentNode.classList.toggle("nl-bit-on",digit==="1");
   });
   valueText.textContent=String(value);
  }
  function reset(){
   generation++;if(motion)motion.cancel();motion=null;
   moving.replaceChildren();value=start;draw();
   controls.forEach(b=>b.disabled=false);
  }
  function shift(direction){
   if(motion)return;
   const target=direction==="left"?((value<<1)&255):value>>>1;
   const delta=direction==="left"?-59:59;
   const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
   if(reduced||typeof moving.animate!=="function"){value=target;draw();return}
   const token=++generation;
   controls.filter(b=>b.dataset.shiftAction!=="reset").forEach(b=>b.disabled=true);
   // Clone actual digits, move them by one column; clip the bit that leaves.
   tiles.forEach(t=>moving.append(t.cloneNode(true)));
   const incoming=tiles[direction==="left"?7:0].cloneNode(true);
   incoming.textContent="0";incoming.setAttribute("x",String(Number(incoming.getAttribute("x"))-delta));
   moving.append(incoming);
   svg.classList.add("nl-shifting");
   motion=moving.animate([{transform:"translateX(0px)"},{transform:"translateX("+delta+"px)"}],{duration:520,easing:"ease-in-out"});
   motion.finished.then(()=>{
    if(token!==generation)return;
    value=target;draw();moving.replaceChildren();svg.classList.remove("nl-shifting");
    motion=null;controls.forEach(b=>b.disabled=false);
   }).catch(()=>{});
  }
  controls.forEach(b=>b.addEventListener("click",()=>{
   if(b.dataset.shiftAction==="reset"){svg.classList.remove("nl-shifting");reset()}
   else shift(b.dataset.shiftAction);
  }));
  const scene=board.closest("[data-cpu-step]");
  if(scene)new MutationObserver(()=>{if(scene.hidden){svg.classList.remove("nl-shifting");reset()}}).observe(scene,{attributes:true,attributeFilter:["hidden"]});
  draw();
 });
})();

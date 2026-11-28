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
})();

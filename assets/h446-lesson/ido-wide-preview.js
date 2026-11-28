/* Shared J277/H446 opt-in preview: preserve existing content and reveal structure. */
(function(){
  "use strict";
  const eligible=/\/lessons\/(h446|j277)\/lesson-(\d{3})\//.exec(location.pathname);
  const approved={h446:["023","030","218"],j277:["109","112","146"]};
  const controls={h446:["024","025","027"],j277:[]};
  const q=new URLSearchParams(location.search);
  const mode=q.get("ido-layout");
  if(!eligible||q.get("ido-header")!=="compact")return;
  if(!approved[eligible[1]].includes(eligible[2])&&
    !(mode==="auto"&&controls[eligible[1]].includes(eligible[2])))return;
  if(eligible[1]==="h446"&&mode!=="wide"&&mode!=="auto")return;

  // Content-based decision; no lesson numbers participate in classification.
  // Count hidden stages too. Avoid widening if the method needs the space.
  function chooseWide(section,reference,method){
    if(section.querySelectorAll(".ido-example").length!==1)return false;
    const svgs=[...reference.querySelectorAll(":scope > svg,:scope > .adder-ido-diagram > svg,.j277-ido-visual-frame .y11-scene svg")];
    const substantial=svgs.some(svg=>{
      const v=(svg.getAttribute("viewBox")||"").trim().split(/[\s,]+/).map(Number);
      const ratio=v.length===4&&v[2]>0&&v[3]>0?v[2]/v[3]:0;
      const labels=svg.querySelectorAll("text").length;
      const shapes=svg.querySelectorAll("rect,path,line,circle,polygon,polyline,ellipse").length;
      return ratio>=1.2&&labels>=7&&shapes>=6;
    });
    if(!substantial||method.querySelector("svg,table,canvas,img"))return false;
    const length=node=>(node.textContent||"").replace(/\s+/g," ").trim().length;
    const steps=[...method.querySelectorAll(".ido-step")];
    if(!steps.length||steps.some(step=>length(step)>260))return false;
    if(section.dataset.idoReveal==="cumulative"&&steps.reduce((sum,step)=>sum+length(step),0)>650)return false;
    const codeTooLarge=(root,maxLines)=>[...root.querySelectorAll("pre")].some(pre=>{
      const lines=(pre.textContent||"").trim().split("\n");
      return lines.length>maxLines||lines.some(line=>line.trim().length>45);
    });
    return !codeTooLarge(method,5)&&!codeTooLarge(reference,7);
  }
  const desktop=matchMedia("screen and (min-width:901px)");
  function setup(){
    const panel=document.querySelector("#i-do .ido-focus-deck > .ido-example > .ido-reference");
    const tag=panel?.querySelector(":scope > .phase-tag");
    const title=panel?.querySelector(":scope > h2");
    if(!tag||!title||tag.nextElementSibling!==title)return;
    const section=document.getElementById("i-do");
    const method=panel.parentElement.querySelector(":scope > .ido-method");
    if(!section||!method)return;
    const wide=mode==="wide"||(mode==="auto"&&chooseWide(section,panel,method));
    const original=tag.textContent;
    let header=null;
    function sync(){
      if(desktop.matches&&!header){
        header=document.createElement("div");
        header.className="rhs-ido-compact-header";
        panel.insertBefore(header,tag);
        header.append(tag,title);
        tag.textContent="EXAMPLE";
        document.documentElement.classList.add("rhs-ido-compact-preview");
        document.documentElement.classList.toggle("rhs-ido-wide-preview",wide);
      }else if(!desktop.matches&&header){
        tag.textContent=original;
        header.before(tag,title);
        header.remove();
        header=null;
        document.documentElement.classList.remove("rhs-ido-wide-preview","rhs-ido-compact-preview");
      }
    }
    sync();
    desktop.addEventListener?.("change",sync);
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",setup,{once:true});
  else setup();
})();

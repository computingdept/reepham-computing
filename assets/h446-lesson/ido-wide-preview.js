/* Shared J277/H446 automatic I Do layout. Preserve existing content and reveal structure. */
(function(){
  "use strict";
  // Numbered classroom lesson routes only; exclude print/answer pages and NEA.
  const eligible=/^\/lessons\/(h446|j277)\/lesson-(\d{3})(?:\/index\.html|\/|\.html)?$/i.exec(location.pathname);
  if(!eligible)return;
  if(eligible[1].toLowerCase()==="h446"&&Number(eligible[2])>=161&&Number(eligible[2])<=180)return;
  const q=new URLSearchParams(location.search);
  const mode=q.get("ido-layout")||"auto";
  if(mode==="off")return;

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
    const root=document.documentElement;
    if(root.dataset.rhsIdoLayoutReady||document.body?.classList.contains("answer-page"))return;
    const section=document.getElementById("i-do");
    // Preserve specialist/code-modelling and compact-TV relocation layouts.
    if(!section||section.matches(".j277-code-model-phase")||
       section.querySelectorAll(".ido-example").length!==1||
       document.querySelector('script[src*="compact-tv-model-layout.js"]'))return;
    const panel=section.querySelector(".ido-focus-deck > .ido-example > .ido-reference");
    const tag=panel?.querySelector(":scope > .phase-tag");
    const title=panel?.querySelector(":scope > h2");
    if(!tag||!title||tag.nextElementSibling!==title||tag.children.length)return;
    const method=panel.parentElement.querySelector(":scope > .ido-method");
    if(!method||panel.parentElement.children.length!==2)return;
    // Only compact generic example labels; retain meaningful specialist teaching cues.
    if(!/^(?:EXAMPLE|WORKED EXAMPLE|I DO|I DO\s*·\s*(?:MODEL|COMPLETE MODEL|ONE COMPLETE MODEL|MODEL EXAMPLE|WATCH THE FULL METHOD)|ONE COMPLETE WORKED EXAMPLE|ONE WORKING SOLUTION FIRST)$/i.test(tag.textContent.trim()))return;
    const wide=mode==="wide"||(mode==="auto"&&chooseWide(section,panel,method));
    // One controller even if a legacy pilot script tag also loads this file.
    root.dataset.rhsIdoLayoutReady="1";
    if(!document.querySelector('link[rel="stylesheet"][href*="/ido-wide-preview.css"]')){
      const css=document.createElement("link");
      css.rel="stylesheet";
      css.href="/assets/h446-lesson/ido-wide-preview.css?v=20261128-shared1";
      document.head.appendChild(css);
    }
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

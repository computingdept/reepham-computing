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
    const svgs=[...reference.querySelectorAll(":scope > svg,:scope > .adder-ido-diagram > svg,.j277-ido-visual-frame .y11-scene svg,:scope > .route-figure > svg,:scope > .h-figure > svg,:scope > .draft-figure > svg,:scope > .p23-figure > svg,:scope > .h13-figure > svg")];
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
    let panel=section.querySelector(".ido-focus-deck > .ido-example > .ido-reference");
    let method=panel?.parentElement.querySelector(":scope > .ido-method");
    let specialist=false;
    let routePilot=false;
    let draftPilot=false;
    let teachingPilot=false;
    // Approved nested algorithm-grid family; classify by structure, not lesson number.
    if(!panel&&eligible[1].toLowerCase()==="h446"){
      const grid=section.querySelector(".ido-focus-deck > .ido-example > .algorithm-grid");
      if(grid?.children.length===2&&[...grid.children].every(node=>node.matches(".algorithm-panel"))){
        [panel,method]=grid.children;
        specialist=true;
      }
    }
    // Compatible pathfinding grids: require the matching staged figure structure.
    if(!panel&&eligible[1].toLowerCase()==="h446"){
      const grid=section.querySelector(".ido-focus-deck > .ido-example > :is(.route-grid,.h-grid)");
      const routeFamily=grid?.matches(".route-grid");
      if(grid?.children.length===2&&[...grid.children].every(node=>node.matches(routeFamily?".route-pane":".h-panel"))&&
         grid.children[0].querySelector(routeFamily?":scope > .route-figure > svg":":scope > .h-figure > svg")){
        [panel,method]=grid.children;
        routePilot=true;
      }
    }
    // Approved staged linked-list and OOP grid family; use content-based checks.
    if(!panel&&eligible[1].toLowerCase()==="h446"){
      const grid=section.querySelector(".ido-focus-deck > .ido-example > .draft-grid");
      if(grid?.children.length===2&&[...grid.children].every(node=>node.matches(".draft-panel"))&&
         grid.children[0].querySelector(":scope > .draft-figure > svg")){
        [panel,method]=grid.children;
        specialist=true;
        draftPilot=true;
      }
    }
    // Preview two reviewed examples before extending the remaining teaching families.
    if(!panel&&eligible[1].toLowerCase()==="h446"&&["231","235"].includes(eligible[2])&&q.get("ido-teaching")==="1"){
      const grid=section.querySelector(".ido-focus-deck > .ido-example > :is(.p23-grid,.h13-grid)");
      const parameters=grid?.matches(".p23-grid");
      if(grid?.children.length===2&&[...grid.children].every(node=>node.matches(parameters?".p23-panel":".h13-pane"))&&
         grid.children[0].querySelector(parameters?":scope > .p23-figure > svg":":scope > .h13-figure > svg")){
        [panel,method]=grid.children;
        specialist=true;
        teachingPilot=true;
      }
    }
    const tag=panel?.querySelector(":scope > .phase-tag");
    const title=panel?.querySelector(":scope > h2");
    if(!tag||!title||tag.nextElementSibling!==title||tag.children.length)return;
    if(!method||panel.parentElement.children.length!==2)return;
    // Only compact generic example labels; retain meaningful specialist teaching cues.
    const genericLabel=/^(?:EXAMPLE|WORKED EXAMPLE|I DO|I DO\s*·\s*(?:MODEL|COMPLETE MODEL|ONE COMPLETE MODEL|MODEL EXAMPLE|WATCH THE FULL METHOD)|ONE COMPLETE WORKED EXAMPLE|ONE WORKING SOLUTION FIRST)$/i.test(tag.textContent.trim());
    const draftLabel=(draftPilot||teachingPilot)&&tag.textContent.trim()==="I DO · TEACHER MODEL";
    if(!genericLabel&&!draftLabel&&!(routePilot&&tag.textContent.trim()==="I DO · SAFE HEURISTIC"))return;
    const wide=mode==="wide"||(mode==="auto"&&chooseWide(section,panel,method));
    // Unqualified specialist layouts retain their original presentation in full.
    if((specialist||routePilot)&&!wide)return;
    // One controller even if a legacy pilot script tag also loads this file.
    root.dataset.rhsIdoLayoutReady="1";
    if(!document.querySelector('link[rel="stylesheet"][href*="/ido-wide-preview.css"]')||specialist||routePilot){
      const css=document.createElement("link");
      css.rel="stylesheet";
      css.href="/assets/h446-lesson/ido-wide-preview.css?v="+(teachingPilot?"20261128-teaching1":draftPilot?"20261128-draft1":routePilot?"20261128-route1":specialist?"20261128-specialist1":"20261128-shared1");
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
        tag.textContent=genericLabel||draftLabel?"EXAMPLE":original;
        document.documentElement.classList.add("rhs-ido-compact-preview");
        document.documentElement.classList.toggle("rhs-ido-specialist-preview",specialist);
        document.documentElement.classList.toggle("rhs-ido-route-preview",routePilot);
        document.documentElement.classList.toggle("rhs-ido-wide-preview",wide);
      }else if(!desktop.matches&&header){
        tag.textContent=original;
        header.before(tag,title);
        header.remove();
        header=null;
        document.documentElement.classList.remove("rhs-ido-wide-preview","rhs-ido-compact-preview","rhs-ido-specialist-preview","rhs-ido-route-preview");
      }
    }
    sync();
    desktop.addEventListener?.("change",sync);
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",setup,{once:true});
  else setup();
})();

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
  function chooseWide(section,reference,method,protectedModel=false){
    if(section.querySelectorAll(".ido-example").length!==1)return false;
    const svgs=[...reference.querySelectorAll(":scope > svg,:scope > .adder-ido-diagram > svg,.j277-ido-visual-frame .y11-scene svg,:scope > .route-figure > svg,:scope > .h-figure > svg,:scope > .draft-figure > svg,:scope > .p23-figure > svg,:scope > .h13-figure > svg,:scope > .n13-figure > svg")];
    // Recognise staged GCSE figures without changing the existing H446 classifier.
    const j277Staged=eligible[1].toLowerCase()==="j277"&&!protectedModel
      ? [...reference.querySelectorAll(":scope > .j277-ido-visual-frame > .j277-learning-scene > svg")]:[];
    const substantial=[...svgs,...j277Staged].some(svg=>{
      const v=(svg.getAttribute("viewBox")||"").trim().split(/[\s,]+/).map(Number);
      const ratio=v.length===4&&v[2]>0&&v[3]>0?v[2]/v[3]:0;
      const labels=svg.querySelectorAll("text").length;
      const shapes=svg.querySelectorAll("rect,path,line,circle,polygon,polyline,ellipse").length;
      // Small indexed arrays are still meaningful algorithm models.
      const algorithm=j277Staged.includes(svg)&&/;\s*(?:search|sort|merge);\s*model$/i.test(svg.getAttribute("aria-label")||"");
      return ratio>=1.2&&labels>=7&&(shapes>=6||(algorithm&&shapes>=4));
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
    let network=false;
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
    // Approved teaching grids. Preserve mock and assessment presentation.
    if(!panel&&eligible[1].toLowerCase()==="h446"&&!/\b(?:mock|assessment)\b/i.test(document.title||"")){
      const grid=section.querySelector(".ido-focus-deck > .ido-example > :is(.p23-grid,.h13-grid)");
      const parameters=grid?.matches(".p23-grid");
      if(grid?.children.length===2&&[...grid.children].every(node=>node.matches(parameters?".p23-panel":".h13-pane"))&&
         grid.children[0].querySelector(parameters?":scope > .p23-figure > svg":":scope > .h13-figure > svg")){
        [panel,method]=grid.children;
        specialist=true;
        teachingPilot=true;
      }
    }
    // Networking examples share the same staged specialist layout.
    if(!panel&&eligible[1].toLowerCase()==="h446"&&!/\b(?:mock|assessment)\b/i.test(document.title||"")){
      const grid=section.querySelector(".ido-focus-deck > .ido-example > .n13-grid");
      if(grid?.children.length===2&&[...grid.children].every(node=>node.matches(".n13-panel"))&&
         grid.children[0].querySelector(":scope > .n13-figure > svg")){
        [panel,method]=grid.children;
        specialist=true;
        network=true;
      }
    }
    const tag=panel?.querySelector(":scope > .phase-tag");
    const title=panel?.querySelector(":scope > h2");
    if(!tag||!title||tag.nextElementSibling!==title||tag.children.length)return;
    if(!method||panel.parentElement.children.length!==2)return;
    // Normalise legacy generic model headings independently of the width decision.
    // Never relabel timed, mock, assessment or NEA examples through this rule.
    const legacyModelLabel=/^I DO\s*·\s*(?:UNMARKED EXAMPLE|UNMARKED MODEL|FULL MODEL|WORKED MODEL)$/i.test(tag.textContent.trim());
    const timedH446=eligible[1].toLowerCase()==="h446"&&[212,213,214,222,243,247,250,280,305,306,308].includes(Number(eligible[2]));
    const protectedModel=timedH446||/\b(?:mock|assessment)\b/i.test(document.title||"")||section.dataset.assessmentMode==="true"||/\b(?:timed|mock|assessment|closed.book)\b/i.test(section.dataset.phaseTime||"")||/\btimed\b/i.test(document.title||"");
    if(legacyModelLabel&&!protectedModel)tag.textContent="EXAMPLE";

    // Only compact generic example labels; retain meaningful specialist teaching cues.
    const genericLabel=/^(?:EXAMPLE|WORKED EXAMPLE|I DO|I DO\s*·\s*(?:MODEL|COMPLETE MODEL|ONE COMPLETE MODEL|MODEL EXAMPLE|WATCH THE FULL METHOD)|ONE COMPLETE WORKED EXAMPLE|ONE WORKING SOLUTION FIRST)$/i.test(tag.textContent.trim());
    const draftLabel=((draftPilot||teachingPilot)&&tag.textContent.trim()==="I DO · TEACHER MODEL")||(network&&tag.textContent.trim()==="I DO · WORKED EXAMPLE");
    if(!genericLabel&&!draftLabel&&!(routePilot&&tag.textContent.trim()==="I DO · SAFE HEURISTIC"))return;
    const wide=mode==="wide"||(mode==="auto"&&chooseWide(section,panel,method,protectedModel));
    // Unqualified specialist layouts retain their original presentation in full.
    if((specialist||routePilot)&&!wide)return;
    // One controller even if a legacy pilot script tag also loads this file.
    root.dataset.rhsIdoLayoutReady="1";
    if(!document.querySelector('link[rel="stylesheet"][href*="/ido-wide-preview.css"]')||specialist||routePilot){
      const css=document.createElement("link");
      css.rel="stylesheet";
      css.href="/assets/h446-lesson/ido-wide-preview.css?v="+(network?"20261128-network1":teachingPilot?"20261128-teaching1":draftPilot?"20261128-draft1":routePilot?"20261128-route1":specialist?"20261128-specialist1":"20261128-j277staged1");
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

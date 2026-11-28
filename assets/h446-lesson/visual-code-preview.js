/* Opt-in Lesson 220 New Learning visual/code layout. Move original nodes only;
   retain the existing navigator and SVG/step MutationObserver. */
(function(){
  "use strict";
  if(!/^\/lessons\/h446\/lesson-220(?:\/index\.html|\/)?$/.test(location.pathname))return;
  if(new URLSearchParams(location.search).get("visual-code")!=="right")return;
  function setup(){
    const section=document.getElementById("new-learning");
    const grid=section?.querySelector(":scope > .route-grid");
    if(!grid||grid.children.length!==2)return;
    const [left,right]=grid.children;
    const tag=left.querySelector(":scope > .phase-tag");
    const title=left.querySelector(":scope > h2");
    const code=left.querySelector(":scope > pre.route-code");
    const steps=[...right.querySelectorAll(":scope > .nl-stage")];
    const figs=[...left.querySelectorAll(":scope > .route-new-fig")];
    if(!tag||!title||!code||steps.length!==5||!figs.length)return;
    const media=matchMedia("screen and (min-width:901px)");
    const originalTag=tag.textContent;
    let mounted=null;
    function apply(){
      if(media.matches&&!mounted){
        const codeAnchor=document.createComment("algorithm original position");
        code.before(codeAnchor);
        const stepsAnchor=document.createComment("steps original position");
        steps[0].before(stepsAnchor);
        const header=document.createElement("div");
        header.className="rhs-visual-code-heading";
        left.insertBefore(header,tag);
        header.append(tag,title);
        tag.textContent="EXAMPLE";
        const stepGroup=document.createElement("div");
        stepGroup.className="rhs-visual-code-steps";
        stepGroup.append(...steps);
        left.append(stepGroup);
        const algorithmLabel=document.createElement("span");
        algorithmLabel.className="phase-tag";
        algorithmLabel.textContent=originalTag;
        right.append(algorithmLabel,code);
        right.classList.add("rhs-visual-code-algorithm");
        section.classList.add("rhs-visual-code-preview");
        mounted={codeAnchor,stepsAnchor,header,stepGroup,algorithmLabel};
      }else if(!media.matches&&mounted){
        const {codeAnchor,stepsAnchor,header,stepGroup,algorithmLabel}=mounted;
        codeAnchor.before(code);codeAnchor.remove();
        stepsAnchor.before(...steps);stepsAnchor.remove();
        header.before(tag,title);header.remove();
        tag.textContent=originalTag;
        stepGroup.remove();algorithmLabel.remove();
        right.classList.remove("rhs-visual-code-algorithm");
        section.classList.remove("rhs-visual-code-preview");
        mounted=null;
      }
    }
    apply();
    media.addEventListener?.("change",apply);
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",setup,{once:true});
  else setup();
})();

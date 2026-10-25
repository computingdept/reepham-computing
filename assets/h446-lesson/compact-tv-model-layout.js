/* Compact-TV-only presentation adjustment for audited H446 modelling lessons.
   Keep the question and code on the left, move staged SVG reference figures beside
   worked steps on the right. Never modify text, solution timing or figure hidden state.
   Restores the original DOM position whenever the viewport no longer matches. */
(function(){
  "use strict";
  if(!/\/lessons\/h446\/lesson-\d{3}\//.test(location.pathname))return;
  const compact=window.matchMedia("(min-width:901px) and (max-height:700px)");
  const pairs=[];
  const figureSelector=":scope > .h13-figure,:scope > .concept-step,:scope > .concept-structure,:scope > .model-visual13,:scope > .h13-diagram,:scope > .h13-svg,:scope > .y13-structure,:scope > svg";
  function bootstrap(){
    for(const phase of ["i-do","we-do"]){
      const section=document.getElementById(phase);
      if(!section)continue;
      const model=section.querySelector(".ido-example,.wedo-example");
      const grid=model?.querySelector(".h13-grid,.s-grid");
      if(!grid)continue;
      const panels=[...grid.children].filter(el=>el.matches(".h13-pane,.h13-panel,.s-panel"));
      if(panels.length!==2)continue;
      const [reference,worked]=panels;
      const figures=[...reference.children].filter(el=>el.matches(figureSelector.replaceAll(":scope > ","")));
      if(!figures.length)continue;
      const items=figures.map(node=>{
        const placeholder=document.createComment("compact TV diagram original position");
        node.before(placeholder);
        return {node,placeholder};
      });
      pairs.push({reference,worked,items});
    }
    function apply(){
      for(const {worked,items} of pairs){
        if(compact.matches){
          // Keep all staged diagrams in their original order in the worked panel.
          const anchor=worked.firstChild;
          items.forEach(({node})=>{
            worked.insertBefore(node,anchor);
            node.classList.add("compact-tv-model-figure");
          });
        }else{
          items.forEach(({node,placeholder})=>{
            placeholder.parentNode?.insertBefore(node,placeholder);
            node.classList.remove("compact-tv-model-figure");
          });
        }
      }
    }
    apply();
    compact.addEventListener?.("change",apply);
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",bootstrap,{once:true});
  else bootstrap();
})();
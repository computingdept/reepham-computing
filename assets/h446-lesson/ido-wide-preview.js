/* Opt-in H446 preview: preserve existing content and reveal structure. */
(function(){
  "use strict";
  if(!/\/lessons\/h446\/lesson-(023|030|218)\//.test(location.pathname))return;
  const q=new URLSearchParams(location.search);
  if(q.get("ido-header")!=="compact"||q.get("ido-layout")!=="wide")return;
  const desktop=matchMedia("screen and (min-width:901px)");
  function setup(){
    const panel=document.querySelector("#i-do .ido-focus-deck > .ido-example > .ido-reference");
    const tag=panel?.querySelector(":scope > .phase-tag");
    const title=panel?.querySelector(":scope > h2");
    if(!tag||!title||tag.nextElementSibling!==title)return;
    const original=tag.textContent;
    let header=null;
    function sync(){
      if(desktop.matches&&!header){
        header=document.createElement("div");
        header.className="rhs-ido-compact-header";
        panel.insertBefore(header,tag);
        header.append(tag,title);
        tag.textContent="EXAMPLE";
        document.documentElement.classList.add("rhs-ido-wide-preview");
      }else if(!desktop.matches&&header){
        tag.textContent=original;
        header.before(tag,title);
        header.remove();
        header=null;
        document.documentElement.classList.remove("rhs-ido-wide-preview");
      }
    }
    sync();
    desktop.addEventListener?.("change",sync);
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",setup,{once:true});
  else setup();
})();

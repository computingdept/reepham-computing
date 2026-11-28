/* Shared J277/H446 opt-in preview: preserve existing content and reveal structure. */
(function(){
  "use strict";
  // Explicit approved pilot list; unlisted lessons retain their existing layout.
  const eligible=/\/lessons\/(h446|j277)\/lesson-(\d{3})\//.exec(location.pathname);
  const approved={h446:["023","030","218"],j277:["109","112","146"]};
  if(!eligible||!approved[eligible[1]].includes(eligible[2]))return;
  const q=new URLSearchParams(location.search);
  if(q.get("ido-header")!=="compact")return;
  const wide=q.get("ido-layout")==="wide";
  if(eligible[1]==="h446"&&!wide)return;
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

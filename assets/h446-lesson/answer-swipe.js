(() => {
  if(!window.matchMedia('(max-width: 700px)').matches)return;

  let startX=0;
  let startY=0;
  let tracking=false;

  const interactiveSelector='a,button,input,textarea,select,summary,[contenteditable="true"]';

  function visibleIndex(){
    const stages=[...document.querySelectorAll('.answer-stage')];
    return Math.max(0,stages.findIndex(stage=>!stage.hidden));
  }

  function stageCount(){
    return document.querySelectorAll('.answer-stage').length;
  }

  document.addEventListener('touchstart',event=>{
    if(event.touches.length!==1)return;
    const target=event.target instanceof Element?event.target:null;
    if(target?.closest(interactiveSelector)){
      tracking=false;
      return;
    }
    startX=event.touches[0].clientX;
    startY=event.touches[0].clientY;
    tracking=true;
  },{passive:true});

  document.addEventListener('touchend',event=>{
    if(!tracking||event.changedTouches.length!==1)return;
    tracking=false;

    const dx=event.changedTouches[0].clientX-startX;
    const dy=event.changedTouches[0].clientY-startY;
    if(Math.abs(dx)<60||Math.abs(dx)<=Math.abs(dy)*1.25)return;

    const index=visibleIndex();
    const count=stageCount();

    if(dx<0){
      if(index<count-1&&typeof window.goNext==='function')window.goNext();
      else location.href='index.html#vocabulary';
    }else{
      if(index>0&&typeof window.goPrevious==='function')window.goPrevious();
      else location.href='index.html#you-do';
    }

    window.requestAnimationFrame(()=>window.scrollTo({top:0,behavior:'instant'}));
  },{passive:true});

  document.addEventListener('touchcancel',()=>{tracking=false;},{passive:true});
})();

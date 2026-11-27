/* New Learning phase presentation: retain the teaching step heading,
   remove only redundant numeric footer counts from the same step. */
export function prepareNewLearningLabels(){
  if(!/^\/lessons\/(?:h446|j277)\/lesson-\d{3}(?:\/|\.html|$)/i.test(location.pathname))return;
  document.querySelectorAll('#new-learning .nl-stage').forEach(stage=>{
    const heading=stage.querySelector('.nl-stage-label');
    if(!heading||!/^STEP\s+\d+\s+OF\s+\d+$/i.test(heading.textContent.trim()))return;
    stage.querySelectorAll('.nl-stage-count').forEach(count=>{
      if(count.children.length===0&&/^\d+\s+of\s+\d+$/i.test(count.textContent.trim()))count.remove();
    });
  });
}

export function createNewLearningNavigation(createStageNavigator){
  return createStageNavigator('.nl-stage',{first:'Next step →',next:'Next step →',last:'Continue → I Do',empty:'Continue →'});
}

/* Approved SVG/code pairs only. No automatic code generation or extra controls. */
export function prepareFlowchartCode(){
  const root=document.getElementById('new-learning');
  if(!root)return;
  root.querySelectorAll('figure[data-flowchart-code]').forEach(figure=>{
    if(figure.dataset.flowchartReady)return;
    const svg=figure.querySelector(':scope > svg');
    const code=figure.querySelector(':scope > pre.flowchart-code');
    if(!svg||!code)return;
    figure.dataset.flowchartReady='true';
    function toggle(){
      const showCode=code.hidden;
      code.hidden=!showCode;
      svg.toggleAttribute('hidden',showCode);
      figure.setAttribute('aria-pressed',String(showCode));
      figure.setAttribute('aria-label',showCode?'Show flowchart':'Show equivalent code');
    }
    figure.addEventListener('click',toggle);
    figure.addEventListener('keydown',event=>{
      if(event.key!=='Enter'&&event.key!==' ')return;
      event.preventDefault();event.stopPropagation();toggle();
    });
  });
}

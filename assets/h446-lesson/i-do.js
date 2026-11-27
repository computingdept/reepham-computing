/* I Do presentation labels: use one clear example heading and remove only
   the redundant question-visibility caption. Preserve actual example counts,
   teaching cues, specialist content and every reveal stage. */
export function prepareIdoLabels(){
  if(!/^\/lessons\/(?:h446|j277)\/lesson-\d{3}(?:\/|\.html|$)/i.test(location.pathname))return;
  document.querySelectorAll('#i-do .ido-reference > .phase-tag').forEach(label=>{
    if(label.children.length===0 && /^(?:EXAMPLE|I DO\s*·\s*(?:COMPLETE MODEL|ONE COMPLETE MODEL|MODEL EXAMPLE|WATCH THE FULL METHOD|BUILD THE ERL PROGRAM)|ONE COMPLETE WORKED EXAMPLE|ONE WORKING SOLUTION FIRST)$/i.test(label.textContent.trim())){
      label.textContent='EXAMPLE';
    }
  });
  document.querySelectorAll('#i-do .ido-reference .ido-example-count').forEach(label=>{
    if(/^(?:Question stays visible|Worked example)[.!]?$/i.test(label.textContent.trim()))label.remove();
  });
}

export function createIdoNavigation(createModelNavigator){
  return createModelNavigator({example:'.ido-example',step:'.ido-step',legacy:'.model-stage',cumulative:page=>page?.dataset.idoReveal==='cumulative',labels:{first:'Reveal Step 1 →',next:'Reveal next step →',example:'Next example →',last:'Continue → We Do',legacyNext:'Next worked example →',legacyLast:'Continue →'}});
}

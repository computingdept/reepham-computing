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

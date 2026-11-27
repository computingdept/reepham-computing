/* We Do phase presentation: remove redundant captions, preserve teaching cues. */
export function prepareWedoLabels(){
  if(!/^\/lessons\/(?:h446|j277)\/lesson-\d{3}(?:\/|\.html|$)/i.test(location.pathname))return;
  document.querySelectorAll('#we-do .wedo-reference .wedo-example-count').forEach(label=>{
    if(/^Keep the question on the left[.!]?$/i.test(label.textContent.trim()))label.remove();
  });
  document.querySelectorAll('#we-do .wedo-reference > .phase-tag').forEach(label=>{
    if(label.children.length===0&&/^WE DO\s+\d+\s+OF\s+\d+$/i.test(label.textContent.trim())){
      label.textContent=label.textContent.trim().replace(/^WE DO/i,'EXAMPLE');
    }
  });
}

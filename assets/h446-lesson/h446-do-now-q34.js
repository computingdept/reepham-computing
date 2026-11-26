/* Shared H446 Do Now Q3/Q4 replacement contract.
   Text replacements own the entire prompt and answer, including working.
   Media-rich authored cards remain intact until a compatible replacement
   is explicitly reviewed. No layout, navigation or other phase changes. */
export function validReplacement(source) {
  const r=source?.replacement;
  return r&&typeof r.question==='string'&&r.question.trim()
    &&typeof r.answer==='string'&&r.answer.trim()?r:null;
}

export function replaceDoNowText(card,review,answerPanel,replacement,headingText) {
  const prompts=[...card.querySelectorAll(':scope > p')];
  const reviewPrompt=review.querySelector('.review-question');
  const reviewAnswer=answerPanel.querySelector('.review-answer');
  const label=answerPanel.querySelector('.review-label');
  if(!prompts.length||!reviewPrompt||!reviewAnswer)return false;

  // Text-only bank records cannot safely replace diagrams, tables or
  // separately formatted working. Keep the authored content in those cases.
  const media='svg,img,figure,table,pre,canvas,video,audio,iframe,object,embed,math';
  if([card,review,answerPanel].some(node=>node.querySelector(media)))return false;

  prompts[0].textContent=replacement.question;
  for(const extra of prompts.slice(1))extra.remove();
  reviewPrompt.textContent=replacement.question;
  const title=review.querySelector(':scope > h2');
  if(title)title.textContent=headingText==='RETRIEVAL'?'Retrieval':'Challenge';
  reviewAnswer.textContent=replacement.answer;
  // The bank answer is complete: do not retain an explanation for the
  // superseded question. Preserve the existing label and answer elements.
  answerPanel.replaceChildren(...(label?[label]:[]),reviewAnswer);
  return true;
}

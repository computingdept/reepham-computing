/* Vocabulary phase contract. Existing shared prompt/response mechanics own the reveal sequence.
   Preserve retrieval and term-definition variants. Legacy cards remain in the shared controller. */
export function createVocabularyNavigation(createDefinitionNavigator){
  return {
  retrieval:createDefinitionNavigator({
    stage:'.vocab-stage',response:'[data-vocab-answer]',active:()=>true,skip:()=>false,
    labels:{inactive:'Continue →',reveal:'Reveal term →',next:'Next definition →',last:'Continue → Exit Ticket'}
  }),
  term:createDefinitionNavigator({
    stage:'.vocab-stage',response:'[data-vocab-answer]',active:()=>true,skip:()=>false,
    labels:{inactive:'Continue →',reveal:'Reveal definition →',next:'Next term →',last:'Continue → Exit Ticket'}
  })
};
}

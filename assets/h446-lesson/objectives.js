/* Objectives phase contract. The shared controller owns navigation mechanics. */
export function createObjectivesNavigation(createDefinitionNavigator){
  return createDefinitionNavigator({
  stage:'.objective-vocab-stage',response:'[data-objective-vocab-definition]',
  active:page=>page.dataset.objectivesVocab==='true',
  skip:page=>page.dataset.ks3VocabIntro!=='true'&&window.matchMedia('(max-width:700px)').matches,
  labels:{inactive:'Next step →',reveal:'Reveal definition →',next:'Next term →',last:'Continue →'}
});
}

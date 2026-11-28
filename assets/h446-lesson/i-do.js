/* Shared automatic I Do layout; one controller for both courses. */
import('./ido-wide-preview.js?v=20261128-network1')
  .catch(error=>console.warn('Automatic I Do layout unavailable; original layout retained:',error));

/* I Do presentation labels: use one clear example heading and remove only
   the redundant question-visibility caption. Preserve actual example counts,
   teaching cues, specialist content and every reveal stage. */
export function prepareIdoLabels(){
  prepareH446CodeModels();
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

/* H446 code-led I Do. Explicitly marked examples only; preserve trace SVGs. */
export function csharpTokens(source){
  const keywords=new Set("abstract as base bool break byte case catch char checked class const continue decimal default delegate do double else enum event explicit extern false finally fixed float for foreach get goto if implicit in int interface internal is lock long namespace new null object operator out override params private protected public readonly ref return sbyte sealed set short sizeof stackalloc static string struct switch this throw true try typeof uint ulong unchecked unsafe ushort using var virtual void volatile while yield async await record init".split(" "));
  const tokens=String(source).match(/\/\/[^\n]*|\/\*[\s\S]*?\*\/|@"(?:""|[^"])*"|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|[A-Za-z_]\w*|\s+|./gs)||[];
  return tokens.map(value=>({value,kind:value.startsWith("//")||value.startsWith("/*")?"comment":/^(?:@"|["'])/.test(value)?"string":keywords.has(value)?"keyword":""}));
}
export function h446CodeSize(sources){
  const lines=sources.map(source=>String(source).split('\n'));
  const rows=Math.max(0,...lines.map(program=>program.length));
  const width=Math.max(0,...lines.flatMap(program=>program.map(line=>line.replace(/\t/g,'    ').length)));
  return rows<=8&&width<=44?'large':rows<=12&&width<=56?'medium':'standard';
}
export function prepareH446CodeModels(){
  if(!/^\/lessons\/h446\/lesson-\d{3}(?:\/|\.html|$)/i.test(location.pathname))return;
  document.querySelectorAll('#i-do .ido-example.h446-code-model').forEach(example=>{
    const label=example.querySelector('.ido-reference > .phase-tag');
    if(label&&label.children.length===0)label.textContent='EXAMPLE';
    const sources=[...example.querySelectorAll('pre.h446-model-source > code')].map(code=>code.textContent);
    if(sources.length)example.dataset.codeSize=h446CodeSize(sources);
    // A persistent listing belongs at the top, even before the first reveal.
    const persistent=example.querySelector('.ido-method > pre.h446-model-source > code');
    if(persistent)example.classList.add('h446-persistent-code');
    if(example.dataset.codeModelReady)return;
    const code=example.querySelector('pre.h446-model-source > code');
    const stages=[...example.querySelectorAll('.ido-step')];
    if(!code||!stages.length)return;
    const source=code.textContent,lines=source.split('\n');
    const addressed=code.parentElement.dataset.addressedCode==='true';
    const rows=lines.map((line,i)=>{
      const row=document.createElement('span');
      row.className='h446-code-line';row.dataset.line=addressed?'':String(i+1);
      return row;
    });
    // Tokenise the entire program so block comments retain their colour across lines.
    let rowIndex=0;
    for(const token of addressed?[{value:source,kind:''}]:csharpTokens(source)){
      const parts=token.value.split('\n');
      parts.forEach((part,i)=>{
        if(i)rowIndex++;
        if(!part)return;
        const span=document.createElement('span');
        if(token.kind)span.className='h446-cs-'+token.kind;
        span.textContent=part;rows[rowIndex].append(span);
      });
    }
    code.replaceChildren(...rows.flatMap((row,i)=>i?[document.createTextNode('\n'),row]:[row]));
    function sync(){
      const stage=stages.find(s=>!s.hidden);
      const active=new Set((stage?.dataset.highlightLines||'').split(',').filter(Boolean).map(Number));
      rows.forEach((row,i)=>row.classList.toggle('h446-code-line-active',active.has(i+1)));
    }
    const observer=new MutationObserver(sync);
    stages.forEach(stage=>observer.observe(stage,{attributes:true,attributeFilter:['hidden']}));
    example.dataset.codeModelReady='1';sync();
  });
}

/* Shared opt-in Today / Next pilot; no lesson-local layout or scripts.
   Today's recap is read from the existing objectives, not a duplicate bank.
   Next topics come from existing curriculum data and authored lesson content. */
// Read existing literal curriculum data without executing hub scripts.
function curriculumFromHub(html,course){
  const programmes=html.match(/\bconst programmes=(\{[\s\S]*?\});/)?.[1];
  const live=html.match(/\bconst liveMap=(\{[^\r\n]*?\});/)?.[1];
  if(!programmes||!live)return null;
  const years=[];
  for(const match of programmes.matchAll(/(\d+)\s*:\s*\{\s*start\s*:\s*(\d+)\s*,\s*terms\s*:\s*\[([\s\S]*?)\]\s*\}/g)){
    const counts=[...match[3].matchAll(/\bcount\s*:\s*(\d+)/g)].map(x=>Number(x[1]));
    if(!counts.length)return null;
    const start=Number(match[2]);
    years.push({year:Number(match[1]),start,end:start+counts.reduce((sum,n)=>sum+n,0)-1});
  }
  if(years.length!==2)return null;
  const routes=new Map();
  for(const entry of live.slice(1,-1).split(',')){
    const match=entry.trim().match(/^["']?(\d+)["']?\s*:\s*["'](lessons\/(j277|h446)\/lesson-(\d{3})\/(?:index|guided)\.html)["']$/);
    if(!match||match[3]!==course||Number(match[1])!==Number(match[4])||routes.has(Number(match[1])))return null;
    routes.set(Number(match[1]),match[2]);
  }
  let info=null;
  if(course==='j277'){
    const literal=html.match(/\bconst j277Info=(\{[^\r\n]*?\});/)?.[1];
    if(!literal)return null;
    info=JSON.parse(literal);
  }
  return {years,routes,info};
}
function nextInYear(curriculum,id){
  if(!curriculum||!curriculum.routes.has(id))return null;
  const year=curriculum.years.find(y=>id>=y.start&&id<=y.end);
  if(!year)return null;
  const next=id+1;
  // Do not guess across gaps, year boundaries or protected lessons.
  if(next>year.end||!curriculum.routes.has(next))return null;
  return {id:next,route:curriculum.routes.get(next)};
}
function matchesRetrieval(bank,current,next){
  const record=bank?.lessons?.[String(next).padStart(3,'0')];
  const ref='L'+String(current).padStart(3,'0');
  return !!record&&(Object.hasOwn(record,'previousTaughtLesson')?record.previousTaughtLesson===ref:record.sourceRefs?.length===1&&record.sourceRefs[0]===ref);
}
async function getText(url){
  const response=await fetch(url,{cache:'no-cache'});
  if(!response.ok)throw new Error('Curriculum source unavailable: '+url);
  return response.text();
}
async function nextLessonContent(course,id){
  const root=new URL('../../',import.meta.url);
  const [hub,bankText]=await Promise.all([
    getText(new URL(course+'-hub.html',root)),
    getText(new URL('data/do-now/q1-published/'+course+'.json',root))
  ]);
  const curriculum=curriculumFromHub(hub,course);
  const next=nextInYear(curriculum,id);
  if(!next||!matchesRetrieval(JSON.parse(bankText),id,next.id))return null;
  if(course==='j277'){
    const info=curriculum.info[String(next.id)];
    if(!Array.isArray(info)||!info[0]?.trim()||!info[2]?.trim())return null;
    return {next:info[0].trim(),detail:info[2].trim()};
  }
  // Use the next authored lesson rather than the generic H446 spec label.
  const doc=new DOMParser().parseFromString(await getText(new URL(next.route,root)),'text/html');
  const title=doc.querySelector('#overview h1')?.textContent.trim().replace(/^Lesson\s+\d{3}\s*[·:–—-]\s*/i,'');
  const objective=readObjectives(doc.getElementById('overview'))[0];
  if(!title||!objective||title.length>110||objective.length>240)return null;
  return {next:title,detail:objective};
}
// Older H446 pages use a plain list under the explicitly labelled objectives.
function readObjectives(overview){
  if(!overview)return [];
  let items=[...overview.querySelectorAll('.objectives li')];
  if(!items.length){
    const heading=[...overview.querySelectorAll('strong,h2,h3')].find(el=>/^by the end(?: of (?:this|the) lesson)?[,\s]+you can/i.test(el.textContent.trim()));
    const list=heading?.nextElementSibling;
    if(list?.matches('ul,ol'))items=[...list.querySelectorAll(':scope > li')];
  }
  return items.map(li=>li.textContent.trim()).filter(Boolean);
}
function eligibleLesson(course,id,doc){
  const you=doc.getElementById('you-do');
  if(!you||you.dataset.assessmentMode==='true'||doc.body.classList.contains('j277-assessment-lesson'))return false;
  if(course==='h446'&&id>=161&&id<=180)return false;
  const label=[doc.title,doc.querySelector('#overview h1')?.textContent,you.dataset.phaseTime].join(' ');
  if(/\b(?:mock|timed|assessment|closed.book|NEA)\b/i.test(label))return false;
  return true;
}
export async function prepareExitSummary(){
  const match=location.pathname.match(/\/lessons\/(j277|h446)\/lesson-(\d{3})\/(?:index\.html)?$/i);
  const page=document.getElementById('exit');
  const overview=document.getElementById('overview');
  if(!match||!page||!overview||page.dataset.exitSummary==='true')return false;
  const course=match[1].toLowerCase(),id=Number(match[2]);
  if(!eligibleLesson(course,id,document))return false;
  const objectives=readObjectives(overview).map(value=>{
    const text=value.replace(/[;.]$/,'');
    return text?text[0].toUpperCase()+text.slice(1):'';
  }).filter(Boolean);
  // Keep the recap punchy; don't compress or rewrite unusually long objectives.
  if(objectives.length<1||objectives.length>5||objectives.some(x=>x.length>180)||objectives.join(' ').length>500)return false;
  const content=await nextLessonContent(match[1].toLowerCase(),Number(match[2]));
  if(!content)return false;
  const make=(tag,cls,text)=>{
    const node=document.createElement(tag);
    if(cls)node.className=cls;
    if(text!==undefined)node.textContent=text;
    return node;
  };
  const panel=make('article','exit-summary-panel');
  const today=make('div','exit-summary-today');
  today.append(make('h2','','Today we learned…'));
  const list=make('ul','exit-summary-objectives');
  objectives.forEach(objective=>list.append(make('li','',objective+'.')));
  today.append(list);
  const next=make('div','exit-summary-next');
  const nextTitle=make('h3');
  nextTitle.append(make('mark','rhsc-shared-keyword',content.next));
  next.append(make('h2','','Next lesson…'),nextTitle,make('p','',content.detail));
  panel.append(today,next);
  // Load styling before replacing the legacy ticket. A failed request leaves it intact.
  const style=make('link');
  style.rel='stylesheet';
  style.href=new URL('./exit-summary.css?v=20261127-pilot1',import.meta.url).href;
  return new Promise(resolve=>{
    style.onload=()=>{
      page.replaceChildren(panel);
      page.classList.remove('exit-yesno','exit-yesno-generated');
      page.dataset.exitSummary='true';
      page.dataset.phaseTime='1 minute';
      resolve(true);
    };
    style.onerror=()=>{style.remove();resolve(false);};
    document.head.append(style);
  });
}

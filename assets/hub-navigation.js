/* Central Learning Hub lesson navigation: shared across KS3, J277 and H446.
   Course pages provide lesson numbers, titles, routes and specification colours.
   Full lesson / Catch up / Print are direct links, without print-format menus.
   The title and number open the full lesson; a one-resource card needs no duplicate footer. */
(function(){
  'use strict';
  // Public compatibility: hub renderers call closeAll() before replacing lesson cards.
  // With direct navigation there are no menus to close.
  function closeAll(){}

  /* Local stroke icons for hub navigation only: no fonts, network or lesson assets. */
  function navIcon(name){
    if(name==='Catch up draft')name='Catch up';
    const shapes={
      'Full lesson':'<path d="M12 7c-2.3-1.8-5.3-2.2-9-1v13c3.7-1.1 6.7-.8 9 1 2.3-1.8 5.3-2.1 9-1V6c-3.7-1.2-6.7-.8-9 1Z"/><path d="M12 7v13"/>',
      Learn:'<rect x="4" y="3" width="16" height="13" rx="2"/><path d="M2 20h20M7 16l-1 4M17 16l1 4"/>',
      'Catch up':'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
      Print:'<path d="M6 9V3h12v6"/><rect x="6" y="15" width="12" height="6" rx="1"/><path d="M6 17H3v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6h-3M17 12h.01"/>'
    };
    const shape=shapes[name];
    return shape?'<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+shape+'</svg>':'';
  }
  /* Specification-point identification: blue family for Paper 1,
     warm brown for Paper 2, grey for synoptic and muted green for NEA. */
  function specMarker(code,raw){
    const original=String(code||'').trim();
    if(!original)return null;
    if(/^(mixed|assessment|synoptic)$/i.test(original)){
      return {label:'Synoptic',colour:'#969696',full:'Synoptic / assessment'};
    }
    if(/^nea$/i.test(original)){
      return {label:'NEA',colour:'#788a7b',full:'NEA'};
    }
    const match=original.match(/^([12])\.(\d+)(?:\.(\d+))?/);
    if(!match)return null;
    const canonical=match[0];
    const source=String(raw||original);
    const references=[...new Set(source.match(/[12]\.\d+(?:\.\d+)?/g)||[])];
    const multiple=references.some(ref=>ref!==canonical);
    const variants=match[1]==='1'
      ? ['#55758f','#69879e','#7894a6','#607f96']
      : ['#997553','#ad8968','#bc9979','#a27d5c'];
    const index=([Number(match[2]),Number(match[3]||0)].reduce((a,v)=>a*7+v,0))%variants.length;
    return {label:canonical+(multiple?' +':''),colour:variants[index],full:source};
  }

  /* One-click lesson actions: Full lesson, Catch up, and Print. Any legacy
     secondary print routes supplied by course hubs are intentionally ignored. */
  function createTile(options){
    const o=options||{};
    const number=String(o.number||'');
    const title=String(o.title||'');
    const teach=typeof o.openHref==='string'&&o.openHref.trim()?o.openHref:null;
    const catchup=typeof o.learnHref==='string'&&o.learnHref.trim()?o.learnHref:null;
    const print=typeof o.printHref==='string'&&o.printHref.trim()?o.printHref:null;
    // Limit copy to the two approved labels, including for older hub data.
    const learnLabel=/(?:^|\s)draft\b/i.test(String(o.learnLabel||''))?'Catch up draft':'Catch up';
    const printLabel=typeof o.printLabel==='string'&&o.printLabel.trim()?o.printLabel:'Print';
    const primaryOnly=Boolean(teach&&!catchup&&!print);
    const entry=document.createElement('article');
    entry.className='lesson-entry lesson-choice central-lesson'+(teach?'':' is-planned')+(primaryOnly?' lesson-primary-only':'');
    if(number.toLowerCase()==='welcome')entry.classList.add('lesson-choice-welcome');
    entry.dataset.menuOpen='false';
    entry.dataset.hasTeach=String(Boolean(teach));
    entry.dataset.hasLearn=String(Boolean(catchup));
    entry.dataset.learnStatus=catchup&&learnLabel==='Catch up draft'?'draft':'ready';
    entry.dataset.hasPrint=String(Boolean(print));
    if(o.color)entry.style.setProperty('--spec-colour',o.color);
    const spec=specMarker(o.specPoint,o.specRaw);
    if(spec){
      entry.classList.add('has-spec-point');
      entry.style.setProperty('--spec-mark-colour',spec.colour);
    }
    // Main lesson card always opens the full lesson, across all three hubs.
    const tile=document.createElement(teach?'a':'div');
    tile.className='lesson-tile-open'+(teach?'':' lesson-tile-unavailable');
    if(teach){
      tile.href=teach;
      tile.setAttribute('aria-label','Open full lesson '+number+(title?': '+title:''));
    }else{
      tile.title='Not yet published';
    }
    const num=document.createElement('span');
    num.className='lesson-tile-number';
    num.textContent=number;
    const shortTitle=document.createElement('span');
    shortTitle.className='lesson-tile-title';
    shortTitle.textContent=title;
    shortTitle.title=title;
    tile.append(num,shortTitle);
    if(primaryOnly){
      const hint=document.createElement('span');
      hint.className='lesson-primary-hint';
      hint.textContent='Open full lesson ↗';
      tile.append(hint);
    }
    entry.append(tile);
    if(spec){
      const code=document.createElement('span');
      code.className='lesson-spec-code';
      code.textContent=spec.label;
      code.title=spec.full;
      entry.append(code);
      const line=document.createElement('div');
      line.className='lesson-spec-line';
      line.setAttribute('aria-hidden','true');
      entry.append(line);
    }
    // H446/KS3 full-lesson-only cards use the entire top area as the action.
    // Do not show an extra Full lesson footer linking to the same destination.
    if(primaryOnly)return entry;
    const count=Number(Boolean(catchup))+Number(Boolean(print));
    if(!count){
      const status=document.createElement('div');
      status.className='lesson-action-status';
      status.textContent='Not yet published';
      entry.append(status);
      return entry;
    }
    const actions=document.createElement('div');
    actions.className='lesson-direct-actions';
    actions.style.setProperty('--lesson-action-count',String(count));
    actions.setAttribute('role','group');
    actions.setAttribute('aria-label','Resources for lesson '+number);
    function makeAction(label,icon,href){
      const el=document.createElement(href?'a':'button');
      el.className='lesson-direct-action lesson-action-'+label.toLowerCase().replace(/\s+/g,'-');
      if(href)el.href=href;
      else el.type='button';
      el.setAttribute('aria-label',label+' · '+number+' · '+title);
      const graphic=document.createElement('span');
      graphic.className='lesson-direct-icon';
      graphic.innerHTML=navIcon(icon);
      graphic.setAttribute('aria-hidden','true');
      const copy=document.createElement('span');
      copy.className='lesson-direct-label';
      copy.textContent=label;
      el.append(graphic,copy);
      return el;
    }
    // Main card already opens the full lesson; never repeat its link below.
    if(catchup)actions.append(makeAction(learnLabel,'Catch up',catchup));
    if(print)actions.append(makeAction(printLabel,'Print',print));
    entry.append(actions);
    return entry;
  }
  /* Resource key is injected once per hub and rebuilt when year changes.
     A Full-lesson-only course does not advertise unavailable Catch up or Print. */
  function syncUsageKey(terms){
    const lessons=terms.closest('#lessons');
    if(!lessons)return;
    const entries=Array.from(terms.querySelectorAll('.central-lesson'));
    const teach=entries.some(entry=>entry.dataset.hasTeach==='true');
    const learn=entries.some(entry=>entry.dataset.hasLearn==='true'&&entry.dataset.learnStatus!=='draft');
    const learnDraft=entries.some(entry=>entry.dataset.hasLearn==='true'&&entry.dataset.learnStatus==='draft');
    const print=entries.some(entry=>entry.dataset.hasPrint==='true');
    let key=lessons.querySelector('.lesson-usage-key');
    if(!learn&&!learnDraft&&!print){
      if(key)key.remove();
      return;
    }
    if(!key){
      key=document.createElement('details');
      key.className='lesson-usage-key';
      key.open=false;
      const summary=document.createElement('summary');
      summary.textContent='How to use a lesson';
      const items=document.createElement('div');
      items.className='lesson-usage-items';
      key.append(summary,items);
      terms.before(key);
    }
    const items=key.querySelector('.lesson-usage-items');
    items.replaceChildren();
    const options=[
      [teach,'▣','Full lesson','Full teacher-led lesson, also available to revisit'],
      [learn,'◇','Catch up','Short interactive lesson · self-marking'],
      [learnDraft,'◇','Catch up draft','Independent booklet · draft, not yet approved'],
      [print,'▤','Print','Open the printable lesson resource']
    ];
    options.forEach(function(option){
      if(!option[0])return;
      const item=document.createElement('div');
      item.className='lesson-usage-item';
      const symbol=document.createElement('span');
      symbol.className='lesson-usage-icon';
      symbol.innerHTML=navIcon(option[2]);
      symbol.setAttribute('aria-hidden','true');
      const text=document.createElement('span');
      const name=document.createElement('strong');
      name.textContent=option[2];
      const description=document.createElement('small');
      description.textContent=option[3];
      text.append(name,description);
      item.append(symbol,text);
      items.append(item);
    });
  }
  function watchUsageKey(terms){
    if(terms.dataset.usageKeyObserved)return;
    terms.dataset.usageKeyObserved='true';
    const observer=new MutationObserver(function(){syncUsageKey(terms);});
    observer.observe(terms,{childList:true});
    syncUsageKey(terms);
  }

  /* Legacy KS3 year pages still have their own booklet/revision tabs.
     Replace only their generated/static lesson tiles with the same shared UI. */
  function enhanceLegacy(root){
    if(!root)return;
    root.querySelectorAll('.preview-help').forEach(function(hint){hint.remove();});
    const previews=window.KS3_HUB_CONFIG?.previews||{};
    root.querySelectorAll('.lesson-grid').forEach(function(grid){
      if(grid.dataset.centralNav==='true')return;
      [...grid.children].forEach(function(existing){
        if(existing.classList.contains('central-lesson'))return;
        const inner=existing.matches('a,span')?existing:
          existing.querySelector(':scope > a,:scope > span');
        if(!inner)return;
        const number=(inner.textContent||'').match(/\d{3}/)?.[0];
        if(!number)return;
        const liveHref=inner.tagName==='A'?inner.getAttribute('href'):null;
        const details=previews[number]||[];
        const heading=existing.querySelector('.lesson-popup strong')?.textContent||
          details[0]||'Lesson '+number;
        grid.replaceChild(createTile({
          number:number,
          title:heading,
          openHref:liveHref,
          color:liveHref?'#287852':'#b5c0b9'
        }),existing);
      });
      grid.dataset.centralNav='true';
    });
    if(!root.querySelector('.course-key')){
      const heading=root.querySelector('.sectionhead');
      if(heading){
        const key=document.createElement('details');
        key.className='course-key central-legacy-key';
        const toggle=document.createElement('summary');
        toggle.textContent='Colour key';
        const content=document.createElement('div');
        content.className='ks3-colour-key';
        [['Online lesson','#287852'],['Not yet published','#b5c0b9']].forEach(function(item){
          const legend=document.createElement('span');
          legend.className='central-legacy-key-item';
          const marker=document.createElement('i');
          marker.className='central-legacy-key-line';
          marker.style.backgroundColor=item[1];
          marker.setAttribute('aria-hidden','true');
          legend.append(marker,document.createTextNode(item[0]));
          content.append(legend);
        });
        key.append(toggle,content);
        heading.after(key);
      }
    }
  }

  /* True DOM relocation, not CSS-only positioning. On desktop the year
     selector lives in the course heading and the key follows all lessons.
     Below 701px both controls return to their original positions. */
  function activateCourseLayout(){
    const body=document.body;
    if(!body||!body.matches('.course-hub.course-inline-nav'))return;
    const topline=document.querySelector('main > .course-topline');
    const resources=topline?.querySelector(':scope > .course-nav');
    const lessons=document.getElementById('lessons');
    const year=lessons?.querySelector('.year-toolbar .year-switch');
    const key=lessons?.querySelector('.year-tools > .course-key');
    const terms=lessons?.querySelector('#terms');
    if(!topline||!resources||!year||!key||!terms)return;
    watchUsageKey(terms);
    const yearAnchor=document.createComment('Original year selector position');
    const keyAnchor=document.createComment('Original colour key position');
    year.before(yearAnchor);
    key.before(keyAnchor);
    const footer=document.createElement('footer');
    footer.className='lesson-footer';
    footer.setAttribute('aria-label','Lesson colour key');
    const desktop=window.matchMedia('(min-width: 701px)');
    function arrange(){
      if(desktop.matches){
        topline.insertBefore(year,resources);
        footer.append(key);
        terms.after(footer);
        body.classList.add('desktop-nav-merged');
      }else{
        yearAnchor.after(year);
        keyAnchor.after(key);
        footer.remove();
        body.classList.remove('desktop-nav-merged');
      }
    }
    arrange();
    if(desktop.addEventListener)desktop.addEventListener('change',arrange);
    else if(desktop.addListener)desktop.addListener(arrange);
  }
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',activateCourseLayout,{once:true});
  }else{
    activateCourseLayout();
  }

  window.LearningHubNavigation={createTile:createTile,closeAll:closeAll,enhanceLegacy:enhanceLegacy};
})();

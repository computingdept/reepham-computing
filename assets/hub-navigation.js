/* Central Learning Hub lesson navigation: shared across KS3, J277 and H446.
   Course pages provide lesson numbers, titles, routes and specification colours.
   This file owns Options, hover/tap, keyboard dismissal and viewport placement. */
(function(){
  'use strict';
  const selector='.central-lesson[data-menu-open="true"]';
  let mobileDialog=null;
  let mobileTrigger=null;
  function isMobile(){return window.matchMedia('(max-width:700px), (pointer:coarse)').matches;}
  function hideMobile(restoreFocus){
    if(!mobileDialog||mobileDialog.hidden)return;
    mobileDialog.hidden=true;
    document.body.classList.remove('lesson-mobile-open');
    const previous=mobileTrigger;
    mobileTrigger=null;
    if(previous){
      previous.setAttribute('aria-expanded','false');
      if(previous.dataset.desktopMenuId)previous.setAttribute('aria-controls',previous.dataset.desktopMenuId);
      if(restoreFocus&&previous.isConnected)previous.focus({preventScroll:true});
    }
  }
  function closeAll(except){
    if(mobileTrigger&&(!except||!except.contains(mobileTrigger)))hideMobile(false);
    document.querySelectorAll(selector).forEach(function(entry){
      if(entry===except)return;
      entry.dataset.menuOpen='false';
      const button=entry.querySelector('.lesson-options-toggle');
      if(button)button.setAttribute('aria-expanded','false');
    });
  }
  function position(entry){
    if(entry.dataset.menuOpen!=='true')return;
    const menu=entry.querySelector('.lesson-scenarios');
    if(!menu)return;
    menu.style.left='0px';
    menu.style.top='100%';
    menu.style.bottom='auto';
    const anchor=entry.getBoundingClientRect();
    const rect=menu.getBoundingClientRect();
    const x=Math.max(12,Math.min(anchor.left,window.innerWidth-12-rect.width));
    menu.style.left=Math.round(x-anchor.left)+'px';
    if(window.innerHeight-anchor.bottom<rect.height+12 && anchor.top>rect.height+12){
      menu.style.top='auto';
      menu.style.bottom='100%';
    }
  }
  function action(label,icon,href){
    const link=document.createElement('a');
    link.className='lesson-scenario-action';
    link.href=href;
    const symbol=document.createElement('span');
    symbol.className='scenario-symbol';
    symbol.setAttribute('aria-hidden','true');
    symbol.textContent=icon;
    const name=document.createElement('span');
    name.className='scenario-copy';
    name.textContent=label;
    link.append(symbol,name);
    return link;
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

  /* Short menu heading from existing lesson metadata, never an extra topic list.
     Prefer a clear one- or two-word subject over a clipped full objective. */
  function conciseTopic(title){
    const full=String(title||'').replace(/\s+/g,' ').trim();
    if(!full)return 'Lesson';
    const main=full.split(/\s*[:–—]\s*|\s+-\s+/)[0].trim();
    const words=main.split(/\s+/).filter(Boolean);
    if(words.length<=2)return main;
    if(/^year\s+\d+$/i.test(words.slice(0,2).join(' ')))return 'Lesson';
    if(/^(and|or|of|to|the|in|on|for|with|&)$/i.test(words[1]))return words[0].replace(/[,;]$/,'');
    return words.slice(0,2).join(' ').replace(/[,;]$/,'');
  }
  function createTile(options){
    const o=options||{};
    const number=String(o.number||'');
    const title=String(o.title||'');
    const routes=[
      ['Teach lesson','▣',o.openHref],
      ['Learn independently','◇',o.learnHref],
      ['Print lesson','▤',o.printHref]
    ].filter(function(item){return typeof item[2]==='string' && item[2].trim().length>0;});
    const entry=document.createElement('article');
    entry.className='lesson-entry lesson-choice central-lesson'+(o.openHref?'':' is-planned');
    entry.dataset.menuOpen='false';
    entry.dataset.hasTeach=String(Boolean(o.openHref));
    entry.dataset.hasLearn=String(Boolean(o.learnHref));
    entry.dataset.hasPrint=String(Boolean(o.printHref));
    if(o.color)entry.style.setProperty('--spec-colour',o.color);
    const spec=specMarker(o.specPoint,o.specRaw);
    if(spec){
      entry.classList.add('has-spec-point');
      entry.style.setProperty('--spec-mark-colour',spec.colour);
    }
    const tile=document.createElement(o.openHref?'a':'div');
    tile.className='lesson-tile-open'+(o.openHref?'':' lesson-tile-unavailable');
    if(o.openHref)tile.href=o.openHref;
    tile.setAttribute('aria-label',(o.openHref?'Open lesson ':'Lesson ')+number+(title?': '+title:'')+(o.openHref?'':' — not published'));
    const num=document.createElement('span');
    num.className='lesson-tile-number';
    num.textContent=number;
    const shortTitle=document.createElement('span');
    shortTitle.className='lesson-tile-title';
    shortTitle.textContent=title;
    shortTitle.title=title;
    tile.append(num,shortTitle);
    entry.append(tile);
    if(spec){
      // Keep the exact specification reference outside the clipped lesson-link
      // box. The fixed-size card must never crop the reference.
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
    if(!routes.length)return entry;
    const button=document.createElement('button');
    button.type='button';
    button.className='lesson-options-toggle';
    button.textContent='Options';
    button.setAttribute('aria-expanded','false');
    button.setAttribute('aria-label','Options for lesson '+number);
    const menu=document.createElement('div');
    menu.className='lesson-scenarios';
    menu.setAttribute('role','group');
    menu.setAttribute('aria-label','Ways to use lesson '+number);
    const menuId='hub-options-'+Math.random().toString(36).slice(2,10);
    menu.id=menuId;
    button.setAttribute('aria-controls',menuId);
    button.dataset.desktopMenuId=menuId;
    const heading=document.createElement('div');
    heading.className='lesson-popup-heading';
    heading.setAttribute('role','heading');
    heading.setAttribute('aria-level','3');
    heading.textContent=number+' · '+conciseTopic(title);
    heading.title=title;
    menu.append(heading);
    routes.forEach(function(item){
      if(item[0]==='Print lesson'&&/(?:[?&])version=bw(?:&|$)/.test(item[2])){
        const group=document.createElement('div');
        group.className='lesson-print-group';
        const label=document.createElement('div');
        label.className='lesson-print-heading';
        label.textContent='▤  Print lesson';
        const variants=document.createElement('div');
        variants.className='lesson-print-variants';
        variants.append(action('Black & white','',item[2]));
        variants.append(action('Colour','',item[2].replace(/([?&])version=bw(?=&|$)/,'$1version=colour')));
        group.append(label,variants);
        menu.append(group);
      }else{
        menu.append(action(item[0],item[1],item[2]));
      }
    });
    function setOpen(state){
      if(state)closeAll(entry);
      entry.dataset.menuOpen=String(state);
      button.setAttribute('aria-expanded',String(state));
      if(state)requestAnimationFrame(function(){position(entry);});
    }
    button.addEventListener('click',function(event){
      event.stopPropagation();
      setOpen(entry.dataset.menuOpen!=='true');
    });
    button.addEventListener('pointerenter',function(event){
      if(event.pointerType==='mouse'&&!isMobile())setOpen(true);
    });
    entry.addEventListener('pointerleave',function(event){
      if(event.pointerType==='mouse'&&!isMobile())setOpen(false);
    });
    entry.addEventListener('focusout',function(event){
      if(!isMobile()&&!entry.contains(event.relatedTarget))setOpen(false);
    });
    entry.append(button,menu);
    return entry;
  }
  document.addEventListener('pointerdown',function(event){
    if(!event.target.closest('.central-lesson'))closeAll();
  });
  document.addEventListener('keydown',function(event){
    if(event.key==='Escape'){
      const current=document.querySelector(selector);
      if(current){
        const button=current.querySelector('.lesson-options-toggle');
        closeAll();
        if(button)button.focus({preventScroll:true});
      }
    }
  });
  window.addEventListener('resize',function(){
    document.querySelectorAll(selector).forEach(position);
  });


  /* The same central actions become a bottom panel on touch/small screens.
     No second resource map or separate lesson page is needed. */
  function ensureMobileDialog(){
    if(mobileDialog)return mobileDialog;
    const shade=document.createElement('div');
    shade.className='lesson-mobile-overlay';
    shade.hidden=true;
    const panel=document.createElement('section');
    panel.className='lesson-mobile-panel';
    panel.id='lesson-mobile-panel';
    panel.setAttribute('role','dialog');
    panel.setAttribute('aria-modal','true');
    panel.setAttribute('aria-label','Lesson options');
    panel.setAttribute('tabindex','-1');
    const toolbar=document.createElement('div');
    toolbar.className='lesson-mobile-toolbar';
    const label=document.createElement('strong');
    label.textContent='Choose a lesson resource';
    const close=document.createElement('button');
    close.type='button';
    close.className='lesson-mobile-close';
    close.setAttribute('aria-label','Close lesson options');
    close.textContent='×';
    close.addEventListener('click',function(){hideMobile(true);});
    toolbar.append(label,close);
    const content=document.createElement('div');
    content.className='lesson-mobile-options';
    panel.append(toolbar,content);
    shade.append(panel);
    shade.addEventListener('click',function(event){
      if(event.target===shade)hideMobile(true);
    });
    document.body.append(shade);
    mobileDialog=shade;
    return shade;
  }
  document.addEventListener('click',function(event){
    const button=event.target.closest('.central-lesson > .lesson-options-toggle');
    if(!button||!isMobile())return;
    event.preventDefault();
    event.stopImmediatePropagation();
    const dialog=ensureMobileDialog();
    if(mobileTrigger===button&&!dialog.hidden){hideMobile(true);return;}
    closeAll();
    const entry=button.closest('.central-lesson');
    const menu=entry&&entry.querySelector('.lesson-scenarios');
    if(!menu)return;
    const content=dialog.querySelector('.lesson-mobile-options');
    content.replaceChildren(...Array.from(menu.children,child=>child.cloneNode(true)));
    mobileTrigger=button;
    button.setAttribute('aria-expanded','true');
    button.setAttribute('aria-controls','lesson-mobile-panel');
    dialog.hidden=false;
    document.body.classList.add('lesson-mobile-open');
    const focusTarget=content.querySelector('a')||dialog.querySelector('.lesson-mobile-close');
    focusTarget.focus({preventScroll:true});
  },true);
  document.addEventListener('keydown',function(event){
    if(!mobileDialog||mobileDialog.hidden)return;
    if(event.key==='Escape'){
      event.preventDefault();
      event.stopImmediatePropagation();
      hideMobile(true);
    }else if(event.key==='Tab'){
      const focusables=Array.from(mobileDialog.querySelectorAll('button,a[href]'));
      if(!focusables.length)return;
      const first=focusables[0],last=focusables[focusables.length-1];
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
    }
  },true);
  window.addEventListener('resize',function(){
    if(mobileTrigger&&!isMobile())hideMobile(false);
  });

  /* Resource key is injected once per hub and rebuilt when year changes.
     A Teach-only course does not misleadingly advertise Learn or Print. */
  function syncUsageKey(terms){
    const lessons=terms.closest('#lessons');
    if(!lessons)return;
    const entries=Array.from(terms.querySelectorAll('.central-lesson'));
    const teach=entries.some(entry=>entry.dataset.hasTeach==='true');
    const learn=entries.some(entry=>entry.dataset.hasLearn==='true');
    const print=entries.some(entry=>entry.dataset.hasPrint==='true');
    let key=lessons.querySelector('.lesson-usage-key');
    if(!learn&&!print){
      if(key)key.remove();
      return;
    }
    if(!key){
      key=document.createElement('details');
      key.className='lesson-usage-key';
      key.open=true;
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
      [teach,'▣','Teach','Full classroom lesson'],
      [learn,'◇','Learn','Short self-marking lesson'],
      [print,'▤','Print','Paper worksheet · B&W or colour']
    ];
    options.forEach(function(option){
      if(!option[0])return;
      const item=document.createElement('div');
      item.className='lesson-usage-item';
      const symbol=document.createElement('span');
      symbol.className='lesson-usage-icon';
      symbol.textContent=option[1];
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

/* Reusable preview for published, same-origin PDF documents only.
   The original PDF is embedded unchanged. No changes to lesson or guide files. */
(function(){
  'use strict';
  const params=new URLSearchParams(location.search);
  const frame=document.getElementById('viewerFrame');
  const error=document.getElementById('viewerError');
  const title=document.getElementById('viewerTitle');
  const back=document.getElementById('viewerBack');
  const print=document.getElementById('viewerPrint');
  const open=document.getElementById('viewerOpen');
  const fallback=document.getElementById('viewerFallback');
  function localUrl(raw,ext){
    if(typeof raw!=='string'||!raw.startsWith('/')||raw.startsWith('//')||raw.length>1400)return null;
    try{
      const url=new URL(raw,location.origin);
      if(url.origin!==location.origin||url.username||url.password)return null;
      if(ext&&!url.pathname.toLowerCase().endsWith(ext))return null;
      return url;
    }catch(_){return null;}
  }
  const file=localUrl(params.get('file'),'.pdf');
  const from=localUrl(params.get('from'),null);
  if(from&&from.pathname!=='/print-viewer.html')back.href=from.pathname+from.search+from.hash;
  else back.href='/';
  let label=(params.get('title')||'Printable resource').trim().slice(0,110);
  if(!label)label='Printable resource';
  title.textContent=label;
  document.title=label+' · Synergy Assist';
  if(!file){
    error.textContent='This print link is invalid. Please return to the lesson or resource hub and open its Print link again.';
    error.hidden=false;
    return;
  }
  const pdf=file.pathname+file.search;
  frame.src=pdf;
  frame.hidden=false;
  open.href=pdf;
  fallback.hidden=false;
  print.disabled=false;
  // The embedded PDF viewer can offer its own Print button; our explicit
  // control requests the original document instead of printing the HTML shell.
  print.addEventListener('click',function(){
    try{
      if(frame.contentWindow&&typeof frame.contentWindow.print==='function'){
        frame.contentWindow.focus();
        frame.contentWindow.print();
        return;
      }
    }catch(_){}
    window.open(pdf,'_blank','noopener');
  });
})();

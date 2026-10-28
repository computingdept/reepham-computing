/* Shared independent booklet setup: B&W/colour mode, A3 imposition and print option.
   Kept in exactly the original execution order before independent-navigation.js. */

(function(){
  var params=new URLSearchParams(location.search);
  var mode=params.get('version')==='colour'?'colour':'bw';
  document.body.dataset.mode=mode;
  document.getElementById('bw-option').setAttribute('aria-current',mode==='bw'?'page':'false');
  document.getElementById('colour-option').setAttribute('aria-current',mode==='colour'?'page':'false');
  var pages=Array.from(document.querySelectorAll('#viewer .page'));
  var spreads=document.getElementById('spreads');
  [[3,0],[1,2]].forEach(function(pair){
    var spread=document.createElement('div');spread.className='spread';
    pair.forEach(function(i){spread.appendChild(pages[i].cloneNode(true));});
    spreads.appendChild(spread);
  });
  // Print lesson is a direct action. Keep the normal Print button as a fallback.
  if(params.get('print')==='1'){
    window.addEventListener('load',function(){
      window.requestAnimationFrame(function(){window.print();});
    },{once:true});
  }
})();

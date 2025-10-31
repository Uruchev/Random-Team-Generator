// Simple SW registration tuned for GitHub Pages (no modules required)
// Add ?no-sw=1 to URL to bypass SW during Chrome debugging
(function(){
  if(!('serviceWorker' in navigator)) return;
  try{
    var params = new URLSearchParams(location.search);
    if(params.get('no-sw') === '1') return;
    // Build sw.js URL relative to current path so it works under /<repo>/
    var path = location.pathname;
    var base = path.endsWith('/') ? path : path.slice(0, path.lastIndexOf('/')+1);
    var swUrl = base + 'sw.js';
    window.addEventListener('load', function(){
      navigator.serviceWorker.register(swUrl).catch(function(){});
    });
  }catch(e){ /* swallow */ }
})();
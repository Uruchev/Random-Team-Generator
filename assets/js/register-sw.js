// Simple SW registration tuned for GitHub Pages
// Skip registration if ?no-sw=1 is present (handy for Chrome testing)
const swUrl = new URL('../../sw.js', import.meta.url).pathname.replace(/\\/g,'/');

const params = new URLSearchParams(location.search);
const skip = params.get('no-sw') === '1';

if('serviceWorker' in navigator && !skip){
  window.addEventListener('load', ()=>{
    navigator.serviceWorker.register(swUrl, { scope: './' }).catch(()=>{});
  });
}
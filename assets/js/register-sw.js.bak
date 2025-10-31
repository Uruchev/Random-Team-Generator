// Simple SW registration tuned for GitHub Pages
const swUrl = new URL('../../sw.js', import.meta.url).pathname.replace(/\\/g,'/');

if('serviceWorker' in navigator){
  window.addEventListener('load', ()=>{
    navigator.serviceWorker.register(swUrl, { scope: './' }).catch(()=>{});
  });
}
// Service Worker – Precache app shell + runtime cache for CDNs
const VERSION = 'v1.2.0';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './assets/css/styles.css',
  './assets/js/app.js',
  './assets/js/register-sw.js',
  './assets/icons/icon-192.png',
  './assets/icons/icon-256.png',
  './assets/icons/icon-384.png',
  './assets/icons/icon-512.png',
  './assets/icons/maskable-512.png',
  './assets/icons/apple-touch-icon-180.png',
];

self.addEventListener('install', (e)=>{
  e.waitUntil((async()=>{
    const cache = await caches.open('rtg:'+VERSION);
    await cache.addAll(APP_SHELL);
    self.skipWaiting();
  })());
});

self.addEventListener('activate', (e)=>{
  e.waitUntil((async()=>{
    const keys = await caches.keys();
    await Promise.all(keys.filter(k=>!k.endsWith(VERSION)).map(k=>caches.delete(k)));
    self.clients.claim();
  })());
});

// Runtime cache for CDN assets with stale-while-revalidate
self.addEventListener('fetch', (e)=>{
  const url = new URL(e.request.url);
  const isCDN = /cdn\.tailwindcss\.com|cdnjs\.cloudflare\.com/.test(url.hostname);
  if(isCDN){
    e.respondWith((async()=>{
      const cache = await caches.open('rtg:cdn:'+VERSION);
      const cached = await cache.match(e.request);
      const fetchPromise = fetch(e.request).then(resp=>{
        cache.put(e.request, resp.clone());
        return resp;
      }).catch(()=>cached);
      return cached || fetchPromise;
    })());
    return;
  }

  // Default: cache-first for app shell
  if(APP_SHELL.some(p=>url.pathname.endsWith(p.replace('./','/')))){
    e.respondWith(caches.match(e.request).then(r=> r || fetch(e.request)));
  }
});

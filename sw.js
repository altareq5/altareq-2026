// نسخة البرنامج بتتجاب من النت كل مرة (من غير كاش) لو النت شغال، ولو مفيش نت بتفتح آخر نسخة محفوظة
const C='altareq-v2';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(['./','./manifest.webmanifest','./icon-192.png','./icon-512.png'])).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const req=e.request,u=new URL(req.url);if(req.method!=='GET'||u.origin!==location.origin)return;
 const fresh=new URL(u);fresh.searchParams.set('_',Date.now());
 e.respondWith(fetch(fresh.href,{cache:'no-store'}).then(r=>{if(r.ok){const cp=r.clone();caches.open(C).then(c=>c.put(req,cp))}return r}).catch(()=>caches.match(req).then(r=>r||caches.match('./'))))});

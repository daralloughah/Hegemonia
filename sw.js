const V="heg-v9";
const CORE=["./","index.html","style.css","config.js","game.js","lib/d3-delaunay.min.js","assets/units/jet.webp","assets/units/jet_top.webp","assets/units/jet_34.webp","assets/units/jet_side.webp","assets/units/jet_front.webp"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()));});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{const u=e.request.url;if(e.request.method!=="GET")return;
  // fichiers du jeu : réseau d'abord (pour recevoir les mises à jour), cache si hors ligne
  if(u.startsWith(self.location.origin)){e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(V).then(x=>x.put(e.request,c));return r;}).catch(()=>caches.match(e.request)));return;}
  // carte du monde, polices : cache d'abord (ne changent jamais)
  if(/jsdelivr|unpkg|gstatic|googleapis|cdnjs/.test(u))e.respondWith(caches.match(e.request).then(m=>m||fetch(e.request).then(r=>{const c=r.clone();caches.open(V).then(x=>x.put(e.request,c));return r;})));});

/* Offline cache for GiGi's Way Home. Relative URLs keep GitHub project pages working.
   Navigations (the game itself) are network-first so an iPad home-screen copy
   picks up a new index.html. Icons and the manifest stay cache-first. */
const CACHE = 'gigi-way-home-v3';
const ASSETS = [
  './index.html',
  './manifest.json',
  './apple-touch-icon.png',
  './icon-192.png',
  './icon-512.png'
];
const NAV_TIMEOUT = 2500;

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(
    keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))
  )));
  self.clients.claim();
});

function isDocument(req, url) {
  if (req.mode === 'navigate' || req.destination === 'document') return true;
  const accept = req.headers.get('accept') || '';
  if (accept.indexOf('text/html') !== -1) return true;
  const path = url.pathname;
  return path.endsWith('/') || path.endsWith('/index.html');
}

function fetchWithTimeout(req, ms) {
  if (typeof AbortController !== 'function') {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('timeout')), ms);
      fetch(req).then((res) => {
        clearTimeout(timer);
        resolve(res);
      }, (err) => {
        clearTimeout(timer);
        reject(err);
      });
    });
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  return fetch(req, { signal: controller.signal }).then((res) => {
    clearTimeout(timer);
    return res;
  }, (err) => {
    clearTimeout(timer);
    throw err;
  });
}

async function networkFirst(req, cache) {
  try {
    const res = await fetchWithTimeout(req, NAV_TIMEOUT);
    if (res && res.ok && (res.type === 'basic' || res.type === 'default')) {
      await cache.put(req, res.clone());
      await cache.put('./index.html', res.clone());
    }
    return res;
  } catch (err) {
    const cached = (await cache.match(req)) || (await cache.match('./index.html'));
    if (cached) return cached;
    throw err;
  }
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.endsWith('/sw.js')) return;
  if (isDocument(req, url)) {
    event.respondWith(caches.open(CACHE).then((cache) => networkFirst(req, cache)));
    return;
  }
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const cached = await cache.match(req);
    if (cached) return cached;
    const res = await fetch(req);
    if (res && res.ok && res.type === 'basic') cache.put(req, res.clone());
    return res;
  })());
});

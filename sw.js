// Task Force Fraud Service Worker - Basic offline support
const CACHE_NAME = 'tf-fraud-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/foia-toolkit.html',
  '/explorer/federal-risk-explorer.html',
  '/state-local-data.html',
  '/assets/css/output.css',
  '/assets/tff-shield-logo.svg',
  '/manifest.json',
  '/assets/leaflet/leaflet.css',
  '/assets/leaflet/leaflet.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Only cache same-origin navigation and basic asset requests.
  // Completely ignore everything else to avoid interfering with CDNs or triggering CSP issues.
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) {
    return; // Let browser handle all external requests (CDNs, APIs, etc.)
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;

      return fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return networkResponse;
      }).catch(() => {
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
      });
    })
  );
});
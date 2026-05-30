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
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request).then((fetchResponse) => {
          // Optionally cache new requests
          return fetchResponse;
        });
      })
      .catch(() => {
        // Offline fallback - could return a custom offline page
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
      })
  );
});
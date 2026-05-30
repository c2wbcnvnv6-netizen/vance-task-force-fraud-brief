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
  const url = new URL(event.request.url);

  // Only handle same-origin requests for caching.
  // Let all cross-origin requests (CDNs, APIs, etc.) pass through normally.
  // This prevents CSP blocks from causing SW errors and "Failed to convert value to Response".
  if (url.origin !== self.location.origin) {
    return; // Do not call event.respondWith — let the browser handle it
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }

        return fetch(event.request).then((fetchResponse) => {
          // Optionally cache successful same-origin responses
          if (fetchResponse && fetchResponse.status === 200) {
            const responseToCache = fetchResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return fetchResponse;
        });
      })
      .catch(() => {
        // Offline fallback for navigation requests
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
      })
  );
});
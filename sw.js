self.addEventListener('install', event => {
  console.log('[Service Worker] Installing Service Worker ...', event);
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', event => {
  console.log('[Service Worker] Activating Service Worker ...', event);
  return self.clients.claim();
});

self.addEventListener('fetch', event => {
  console.log('[Service Worker] Fetching something ....', event);

  event.respondWith(
      caches.match(event.request)
          .then(response => {
              if (response) {
                  console.log('fetch request from CACHE: ', event.request);
                  console.log('fetch response from CACHE: ', response);
                  return response;
              }

              return fetch(event.request);
          })
  );
});

const CACHE_STATIC_NAME = 'static';
const URLS_TO_PRECACHE = [
  '/',
  'index.html',
  'app.js',
  'images/app-icon-256.png'
];

self.addEventListener('install', event => {
  console.log('[Service Worker] Installing Service Worker ...', event);
  event.waitUntil(
      caches.open(CACHE_STATIC_NAME)
          .then(cache => {
              console.log('[Service Worker] Precaching App Shell');
              cache.addAll(URLS_TO_PRECACHE);
          })
          .then(() => {
              console.log('[ServiceWorker] Skip waiting on install');
              return self.skipWaiting();
          })
  );
});

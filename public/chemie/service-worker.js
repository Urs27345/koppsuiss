const CACHE_NAME = 'aqua-quest-v2-effects';
const FILES = [
  './','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png',
  "./assets/page-01.jpg",
  "./assets/page-02.jpg",
  "./assets/page-03.jpg",
  "./assets/page-04.jpg",
  "./assets/page-05.jpg",
  "./assets/page-06.jpg",
  "./assets/page-07.jpg",
  "./assets/page-08.jpg",
  "./assets/page-09.jpg",
  "./assets/page-10.jpg",
  "./assets/page-11.jpg",
  "./assets/page-12.jpg",
  "./assets/page-13.jpg"
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(FILES)));
  self.skipWaiting();
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request).then(resp => resp || fetch(event.request)));
});

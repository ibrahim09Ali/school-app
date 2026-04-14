const cacheName = 'school-app-v1.1';
const assets = [
  './',
  './index.html',
  './data.json',
  './manifest.json'
];

// تثبيت ملفات التطبيق في الذاكرة المؤقتة
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// تشغيل التطبيق من الذاكرة حتى لو لا يوجد إنترنت
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});

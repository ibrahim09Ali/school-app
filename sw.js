const cacheName = 'school-app-v11.2'; // غير هذا الرقم مع كل تحديث قادم
const assets = [
  './',
  './index.html',
  './data.json',
  './manifest.json',
  './icon.png'
];

// 1. التثبيت (تحميل الملفات الجديدة)
self.addEventListener('install', e => {
  // إجبار التحديث الجديد على تخطي طابور الانتظار
  self.skipWaiting(); 
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// 2. التفعيل (عامل النظافة: مسح أي إصدار قديم من الذاكرة)
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== cacheName)
        .map(key => caches.delete(key)) // حذف الذاكرة القديمة
      );
    })
  );
});

// 3. التشغيل (جلب الملفات من الذاكرة أو الإنترنت)
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});

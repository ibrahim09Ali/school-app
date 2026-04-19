// قم بتغيير هذا الرقم الآن لكي نجرب
const cacheName = 'school-app-v305'; 

// وضعنا هنا الملفات الموجودة فعلاً فقط لكي لا يفشل التحديث
const assets = [
  '/school-app/',
  '/school-app/index.html'
];

// 1. التثبيت
self.addEventListener('install', e => {
  self.skipWaiting(); 
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      // إذا فشل تحميل أي ملف هنا، سيفشل التحديث بالكامل!
      return cache.addAll(assets);
    }).catch(err => console.error("فشل في تحميل الملفات للذاكرة", err))
  );
});

// 2. التفعيل (مسح الذاكرة القديمة والسيطرة فوراً)
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== cacheName)
        .map(key => caches.delete(key)) 
      );
    }).then(() => {
      // هذا السطر السحري يجبر المحرك الجديد على العمل وتغيير الرقم فوراً
      return self.clients.claim();
    })
  );
});

// 3. التشغيل (الأوفلاين)
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});

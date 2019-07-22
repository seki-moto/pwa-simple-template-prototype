// service-worker.js
const CACHE_NAME = 'cache-v1';  // キャッシュ名

// インストール状態
self.addEventListener('install', function(event) {
  console.log('[ServiceWorker] Install', event);

  event.waitUntil(

    caches.open(CACHE_NAME)
    .then(function(cache) {

        // リソースのパスを配列で指定
        const RESOURCE = array();
        return cache.addAll(RESOURCE);

    })

  );
});

// 有効化状態
self.addEventListener('activate', function(event) {
  console.log('[ServiceWorker] Activate', event);

  event.waitUntil(

    // キャッシュを最新状態のみにする
    caches.keys().then(function(cache) {
      cache.map(function(name) {
        if(CACHE_NAME !== name) caches.delete(name);
      })
    })

  );
});

// リクエスト取得状態
self.addEventListener('fetch', function(event) {
console.log('[Service Worker] Fetch initiated', event);

  event.respondWith(

    caches.match(event.request).then(function(res) {
        if(res) return res;

        return fetch(event.request);
    })

  );
});
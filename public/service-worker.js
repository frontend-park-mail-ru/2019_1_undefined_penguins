const CACHE_NAME = 'penguins-sw-cache'

const cacheUrls = [...global.serviceWorkerOption.assets.map( asset => '.' + asset), '/index.html'];	// кэшируемые файлы



self.addEventListener('install', (event) => {
    event.waitUntil(
        global.caches.open(CACHE_NAME)
            .then((cache) =>{
                return cache.addAll(cacheUrls);
            })
    );
});

self.addEventListener('fetch', (event) => {
    console.log(event);
    event.respondWith(
        global.caches.match(event.request)
            .then((cachedResponse) => {
                // return cacheedResponse || fetch(event.request).then(function(response) {
				// 	const cloning = response.clone();
				// 	global.caches.open(CACHE_KEY).then(function(cache) {    // если получили новые данные - кэшируем
				// 		cache.put(event.request, cloning);
				// 	});
				// 	return response;
				// });
                if (!navigator.onLine && cachedResponse) {
                    return cachedResponse;
                }
                return fetch(event.request);
            })
            .catch(function() {
				return global.caches.match('/index.html');
			})
    )
})
const CACHE_NAME = 'penguins-sw-cache';

const cacheUrls = [...global.serviceWorkerOption.assets, 
    './', 
    'images/home.svg',
    'images/game1.svg',
    'images/space.jpg',
    'images/fish-3.png',
    'images/tap.jpg',
    'images/win.png',
    'images/lost.png',
    'images/penguin-2.png',
    'images/prev.svg',
    'images/refresh.svg',
    'images/menu-picture.png',
    'images/cloud.png',
    'images/background-main.jpg',
    'images/next.svg',
    'images/snow-1.png',
    'images/default.png',
    'images/x.svg',
    'favicon.ico',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then((cache) => {
                cache.addAll(cacheUrls);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches
            .match(event.request)
            .then((cachedResponse) => {
                if (!navigator.onLine && cachedResponse) {
                    return cachedResponse;
                } 
                return fetch(event.request);
            })
    );
});

/* eslint no-use-before-define: 0 */

const CACHE_NAME = 'penguins-sw-cache';

const cacheUrls = [...global.serviceWorkerOption.assets, 
    './', 
    'images/home.svg',
    'images/game1.svg',
    'images/space.jpg',
    'images/fish-3.png',
    'images/tap.jpg',
    'images/win.webp',
    'images/lost.webp',
    'images/penguin-2.png',
    'images/prev.svg',
    'images/refresh.svg',
    'images/menu-picture.webp',
    'images/cloud.png',
    'images/background-main.jpg',
    'images/next.svg',
    'images/snow-1.png',
    'images/default.png',
    'images/x.svg',
    'images/default.webp',
    'favicon.ico',
    'images/penguin.webp',
    'images/snow-.webp',
    'images/cloud.webp ',
    'images/fish.webp ',
    'images/penguin-gun.webp',
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

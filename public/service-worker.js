const CACHE_NAME = 'penguins-sw-cache'

// const cacheUrls = [...global.serviceWorkerOption.assets.map( asset => '.' + asset), '/index.html'];	// кэшируемые файлы

const Urls = [
    '/',
    'index.html',
    'fonts/IndieFlower.ttf',
    'images/background-main.jpg',
    'images/default.png',
    'images/game1.svg',
    'images/home.png',
    'images/menu-picture.png',
    'images/next.svg',
    'images/prev.svg',
    'images/space.jpg',
    'images/tap.png',
    'utils/constants.js',
    'utils/safe.js',
    'html/menu.html',
    'main.css',
    'main.js',
    'components/Board/Board.tmpl.js',
    'components/Board/Board.js',
    'components/Board/Board.tmpl.xml',
    'components/Board/Board.css',
    'components/SignUp/SignUp.tmpl.xml',
    'components/SignUp/SignUp.js',
    'components/SignUp/SignUp.tmpl.js',
    'components/SignUp/SignUp.css',
    'components/About/About.js',
    'components/About/About.tmpl.js',
    'components/About/About.css',
    'components/About/About.tmpl.xml',
    'components/SignIn/SignIn.tmpl.js',
    'components/SignIn/SignIn.js',
    'components/SignIn/SignIn.css',
    'components/SignIn/SignIn.tmpl.xml',
    'components/Profile/Profile.js',
    'components/Profile/Profile.tmpl.js',
    'components/Profile/Profile.tmpl.xml',
    'components/Profile/Profile.css',
    'components/Menu/Menu.tmpl.js',
    'components/Menu/Menu.tmpl.xml',
    'components/Menu/Menu.js',
    'components/Menu/Menu.css',
    'scripts/EventController.js',
    'scripts/EventBus.js',
    'scripts/Router.js',
    'modules/UserModel.js',
    'modules/ajax.js',
    'modules/Validate.js',
    'views/SignUpView.js',
    'views/ProfileView.js',
    'views/AboutView.js',
    'views/SignInView.js',
    'views/MenuView.js',
    'views/BaseView.js',
    'views/ScoreboardView.js',
]

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) =>{
                return cache.addAll(Urls);
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
            // .catch(function() {
			// 	return global.caches.match('/index.html');
			// })
    )
})
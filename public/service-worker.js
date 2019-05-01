const CACHE_NAME = "penguins-sw-cache";

const cacheUrls = [...global.serviceWorkerOption.assets, 
    "./", 
    "images/home.svg",
    "images/game1.svg",
    "images/space.jpg",
    "images/fish-3.png",
    "images/tap.jpg",
    "images/win.png",
    "images/lost.png",
    "images/penguin-2.png",
    "images/prev.svg",
    "images/refresh.svg",
    "images/menu-picture.png",
    "images/cloud.png",
    "images/background-main.jpg",
    "images/next.svg",
    "images/snow-1.png",
    "images/default.png"
];
// const cacheUrls = [
//     "/",
//     "index.html",
//     "images/home.svg",
//     "images/game1.svg",
//     "images/space.jpg",
//     "images/fish-3.png",
//     "images/tap.jpg",
//     "images/win.png",
//     "images/lost.png",
//     "images/penguin-2.png",
//     "images/prev.svg",
//     "images/refresh.svg",
//     "images/menu-picture.png",
//     "images/cloud.png",
//     "images/background-main.jpg",
//     "images/next.svg",
//     "images/snow-1.png",
//     "images/default.png",
//     "utils/constants.js",
//     "utils/safe.js",
//     "main.css",
//     "game/Game.js",
//     "main.js",
//     "components/Board/Board.tmpl.js",
//     "components/Board/Board.js",
//     "components/Board/Board.tmpl.xml",
//     "components/Board/Board.css",
//     "components/Lost/Lost.css",
//     "components/Lost/Lost.tmpl.xml",
//     "components/Lost/Lost.tmpl.js",
//     "components/Win/Win.css",
//     "components/Win/Win.tmpl.js",
//     "components/Win/Win.tmpl.xml",
//     "components/SignUp/SignUp.tmpl.xml",
//     "components/SignUp/SignUp.js",
//     "components/SignUp/SignUp.tmpl.js",
//     "components/SignUp/SignUp.css",
//     "components/About/About.js",
//     "components/About/About.tmpl.js",
//     "components/About/About.css",
//     "components/About/About.tmpl.xml",
//     "components/SignIn/SignIn.tmpl.js",
//     "components/SignIn/SignIn.js",
//     "components/SignIn/SignIn.css",
//     "components/SignIn/SignIn.tmpl.xml",
//     "components/Profile/Profile.js",
//     "components/Profile/Profile.tmpl.js",
//     "components/Profile/Profile.tmpl.xml",
//     "components/Profile/Profile.css",
//     "components/Menu/Menu.tmpl.js",
//     "components/Menu/Menu.tmpl.xml",
//     "components/Menu/Menu.js",
//     "components/Menu/Menu.css",
//     "scripts/EventController.js",
//     "scripts/EventBus.js",
//     "scripts/Router.js",
//     "error.css",
//     "modules/UserModel.js",
//     "modules/ajax.js",
//     "modules/Validate.js",
//     "fonts/Roboto-Regular.ttf",
//     "fonts/IndieFlower.ttf",
//     "fonts/Roboto-Bold.ttf",
//     "views/SignUpView.js",
//     "views/MultiplayerView.js",
//     "views/SingleplayerView.js",
//     "views/ProfileView.js",
//     "views/LostView.js",
//     "views/AboutView.js",
//     "views/SignInView.js",
//     "views/WinView.js",
//     "views/MenuView.js",
//     "views/SignOutView.js",
//     "views/BaseView.js",
//     "views/ScoreboardView.js",
// ];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then((cache) => {
                cache.addAll(cacheUrls);
            })
    );
});

self.addEventListener("fetch", (event) => {
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

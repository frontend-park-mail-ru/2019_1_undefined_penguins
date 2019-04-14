var serviceWorkerOption = {
  "assets": [
    "/bundle.js"
  ]
};
        
        /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./public/service-worker.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var g;\n\n// This works in non-strict mode\ng = (function() {\n\treturn this;\n})();\n\ntry {\n\t// This works if eval is allowed (see CSP)\n\tg = g || new Function(\"return this\")();\n} catch (e) {\n\t// This works if the window reference is available\n\tif (typeof window === \"object\") g = window;\n}\n\n// g can still be undefined, but nothing to do about it...\n// We return undefined, instead of nothing here, so it's\n// easier to handle this case. if(!global) { ...}\n\nmodule.exports = g;\n\n\n//# sourceURL=webpack:///(webpack)/buildin/global.js?");

/***/ }),

/***/ "./public/service-worker.js":
/*!**********************************!*\
  !*** ./public/service-worker.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(global) {function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance\"); }\n\nfunction _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === \"[object Arguments]\") return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }\n\nvar CACHE_NAME = 'sw-cache';\nvar cacheUrls = [].concat(_toConsumableArray(global.serviceWorkerOption.assets.map(function (asset) {\n  return '.' + asset;\n})), ['/index.html']); // кэшируемые файлы\n// const Urls = [\n//     'index.html',\n//     '.DS_Store',\n//     'images/user.svg',\n//     'images/multi-penguin.png',\n//     'images/game1.svg',\n//     'images/home.png',\n//     'images/leader-penguin.jpg',\n//     'images/temp-fon.jpg',\n//     'images/fon-penguin1.png',\n//     'images/fon2.jpg',\n//     'images/fon-penguin2.png',\n//     'images/fon.jpg',\n//     'images/about-penguin.jpg',\n//     'images/single-penguin.png',\n//     'images/about-penguin.png',\n//     'utils/constants.js',\n//     'utils/safe.js',\n//     'html/menu.html',\n//     'main.css',\n//     'main.js',\n//     'components/Board/Board.tmpl.js',\n//     'components/Board/Board.js',\n//     'components/Board/Board.tmpl.xml',\n//     'components/Board/Board.css',\n//     'components/SignUp/SignUp.tmpl.xml',\n//     'components/SignUp/SignUp.js',\n//     'components/SignUp/SignUp.tmpl.js',\n//     'components/SignUp/SignUp.css',\n//     'components/About/About.js',\n//     'components/About/About.tmpl.js',\n//     'components/About/About.css',\n//     'components/About/About.tmpl.xml',\n//     'components/SignIn/SignIn.tmpl.js',\n//     'components/SignIn/SignIn.js',\n//     'components/SignIn/SignIn.css',\n//     'components/SignIn/SignIn.tmpl.xml',\n//     'components/Profile/Profile.js',\n//     'components/Profile/Profile.tmpl.js',\n//     'components/Profile/Profile.tmpl.xml',\n//     'components/Profile/Profile.css',\n//     'components/Menu/Menu.tmpl.js',\n//     'components/Menu/Menu.tmpl.xml',\n//     'components/Menu/Menu.js',\n//     'components/Menu/Menu.css',\n//     'scripts/EventController.js',\n//     'scripts/EventBus.js',\n//     'scripts/Router.js',\n//     'backup/.DS_Store',\n//     'modules/UserModel.js',\n//     'modules/ajax.js',\n//     'modules/Validate.js',\n//     'views/SignUpView.js',\n//     'views/ProfileView.js',\n//     'views/AboutView.js',\n//     'views/SignInView.js',\n//     'views/MenuView.js',\n//     'views/BaseView.js',\n//     'views/ScoreboardView.js',\n//     'sw.js',\n// ]\n// this.addEventListener('install', (event) => {\n//     event.waitUntil(\n//         caches\n//             .open(CACHE_NAME)\n//             .then((cache) => {\n//                 return cache.addAll(Urls);\n//             })\n//     );\n// });\n\nself.addEventListener('install', function (event) {\n  event.waitUntil(global.caches.open(CACHE_NAME).then(function (cache) {\n    return cache.addAll(cacheUrls);\n  }));\n});\nself.addEventListener('fetch', function (event) {\n  event.respondWith( // получение нужного ресурса\n  global.caches.match(event.request).then(function (cachedResponse) {\n    return cacheedResponse || fetch(event.request).then(function (response) {\n      var cloning = response.clone();\n      global.caches.open(CACHE_KEY).then(function (cache) {\n        // если получили новые данные - кэшируем\n        cache.put(event.request, cloning);\n      });\n      return response;\n    }); // if (!navigator.onLine && cachedResponse) {\n    //     return cachedResponse;\n    // }\n    // return fetch(event.request);\n  })[\"catch\"](function () {\n    return global.caches.match('/index.html');\n  }));\n});\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack:///./public/service-worker.js?");

/***/ })

/******/ });
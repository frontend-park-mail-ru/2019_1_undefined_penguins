(function() {
	const noop = () => null;
	const nowSh = 'https://penguins-corsairs.now.sh';
	const home = 'http://localhost:3000';

	/** Класс модуля для работы с Ajax. */
	class AjaxModule {
		/**
         * Послать ajax запрос.
         * @param [callback = noop] указание на callback
         * @param [method = 'GET'] метод запроса
         * @param [path = '/'] адрес запроса
         * @param [body = {}] тело запроса
         */
		_ajax({
			callback = noop,
			method = 'GET',
			path = '/',
			body = {},
		} = {}) {
			const xhr = new XMLHttpRequest();
			xhr.open(method, home + path, true);
			xhr.withCredentials = true;

			if (body) {
				xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
			}

			xhr.onreadystatechange = function () {
				if (xhr.readyState !== 4) {
					return;
				}

				callback(xhr);
			};

			if (body) {
				xhr.send(JSON.stringify(body));
			} else {
				xhr.send();
			}
		}
		/**
         * Послать ajax GET-запрос.
         * @param [callback = noop] указание на callback
         * @param [path = '/'] адрес запроса
         */
		doGet({
			callback = noop,
			path = '/',
			
		} = {}) {
			this._ajax({
				callback,
				path,
				body: null,
				method: 'GET',
			});
		}
		/**
         * Послать ajax POST-запрос.
         * @param [callback = noop] указание на callback
         * @param [path = '/'] адрес запроса
         * @param [body = {}] тело запроса
         */
		doPost({
			callback = noop,
			path = '/',
			body = {},
		} = {}) {
			this._ajax({
				callback,
				path,
				body,
				method: 'POST',
			});
		}
		/**
         * Послать ajax POST-запрос c помощью Promise.
         * @param [path = '/'] адрес запроса
         * @param [body = {}] тело запроса
         */
		doPromisePost({
			path = '/',
			body = {},
		} = {}) {
			// return fetch(nowSh + path, {
			return fetch(home + path, {
				method: 'POST',
				mode: 'cors',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
				},
				body: JSON.stringify(body)
			})
		}
		/**
         * Послать ajax GET-запрос c помощью Promise.
         * @param [path = '/'] адрес запроса
         */
		doPromiseGet({
			path = '/',
		} = {}) {
			// return fetch(nowSh + path, {
			return fetch(home + path, {
				method: 'GET',
				mode: 'cors',
				credentials: 'include',
				body: null,
			});
		}
	}

	window.AjaxModule = new AjaxModule();
})();
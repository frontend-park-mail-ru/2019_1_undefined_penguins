(function () {
  const noop = () => null;
  const home = 'http://localhost:8080';

  /** Класс модуля для работы с Ajax. */
  class AjaxModule {
    /**
         * Послать ajax POST-запрос c помощью Promise.
         * @param [path = '/'] адрес запроса
         * @param [body = {}] тело запроса
         */
    doPromisePost({
      path = '/',
      body = {},
    } = {}) {
      return fetch(home + path, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(body),
      });
    }

    /**
         * Послать ajax GET-запрос c помощью Promise.
         * @param [path = '/'] адрес запроса
         */
		doPromiseGet({
			path = '/',
		} = {}) {
			return fetch(home + path, {
				method: 'GET',
				mode: 'cors',
				credentials: 'include',
				body: null,
			});
		}
		/**
         * Послать ajax Put-запрос c помощью Promise.
         * @param [path = '/'] адрес запроса
         * @param [body = {}] тело запроса
         */
		doPromisePut({
			path = '/',
			body = {},
		} = {}) {
			return fetch(home + path, {
				method: 'PUT',
				mode: 'cors',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
				},
				body: JSON.stringify(body)
			});
		}
	}

  window.AjaxModule = new AjaxModule();
}());

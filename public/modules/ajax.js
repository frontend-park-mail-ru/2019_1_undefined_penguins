(function() {
	const noop = () => null;
	const nowSh = 'http://penguins-corsairs.now.sh';
	const home = 'https://localhost:3000';
	
	class AjaxModule {
		_ajax({
			callback = noop,
			method = 'GET',
			path = '/',
			body = {},
		} = {}) {
			const xhr = new XMLHttpRequest();
			xhr.open(method, path, true);
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

		doGet({
			callback = noop,
			path = '/',
			body = {},
		} = {}) {
			this._ajax({
				callback,
				path,
				body,
				method: 'GET',
			});
		}
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

		doPromisePost({
			path = '/',
			body = {},
		} = {}) {
			return fetch(nowSh + path, {
				method: 'POST',
				mode: 'cors',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
				},
				body: JSON.stringify(body)
			})
		}

		doPromiseGet({
			path = '/',
		} = {}) {
			return fetch(nowSh + path, {
				method: 'GET',
				mode: 'cors',
				credentials: 'include',
				body: null,
			});
		}
	}

	window.AjaxModule = new AjaxModule();
})();
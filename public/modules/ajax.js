// use it if you run backend on localhost
const home = 'http://localhost';

// use it if you run backend on deploy
// const home = 'https://penguin-wars.sytes.pro';

/** Класс модуля для работы с Ajax. */
class AjaxModule {
    /**
         * Послать ajax POST-запрос c помощью Promise.
         * @param [path = '/'] адрес запроса
         * @param [body = {}] тело запроса
         */
    doPromisePost({
        path = '/',
        contentType = null,
        body
    } = {}) {
        const options = {
            method: 'POST',
            mode: 'cors',
            credentials: 'include'
        };

        if (body) {
            if (contentType === null) {
                options.headers = { 'Content-Type': 'application/json; charset=utf-8' };
                options.body = JSON.stringify(body);
            } else {
                // options.headers = { 'Content-Type': 'multipart/form-data' };
                options.body = body;
            }
        }

        return fetch(`${home}${path}`, options);
    }

    /**
         * Послать ajax GET-запрос c помощью Promise.
         * @param [path = '/'] адрес запроса
         */
    doPromiseGet({
        path = '/'
    } = {}) {
        return fetch(`${home}${path}`, {
            method: 'GET',
            // mode: 'cors',
            credentials: 'include',
            body: null
        });
    }

    /**
         * Послать ajax Put-запрос c помощью Promise.
         * @param [path = '/'] адрес запроса
         * @param [body = {}] тело запроса
         */
    doPromisePut({
        path = '/',
        body = {}
    } = {}) {
        return fetch(`${home}${path}`, {
            method: 'PUT',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(body)
        });
    }
}

export default new AjaxModule();

import Bus from '../scripts/EventBus.js';
import SignInService from '../services/SignInService.js';

export default class SignInController {
    constructor() {
        this._fetchLogin();
    }

    _fetchLogin(){
        Bus.on('fetch-sign-in', (form) => {
            //TODO: делаем запрос на сервер и в случае успеха эмитим открытие меню
            const response = SignInService.FetchLogin(form);
            Bus.emit('open-menu');
        })
    }
}
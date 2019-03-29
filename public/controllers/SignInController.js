import Bus from '../scripts/EventBus.js';
import SignInService from '../services/SignInService.js';

export default class SignInController {
    constructor() {
        this._fetchLogin();
    }

    _fetchLogin(){
        Bus.on('fetch-sign-in', (form) => {
            //TODO: делаем запрос на сервер и в случае успеха эмитим открытие профиля
            const response = SignInService.FetchLogin(form);
            console.log(response);
            Bus.emit('open-profile');
        })
    }
}
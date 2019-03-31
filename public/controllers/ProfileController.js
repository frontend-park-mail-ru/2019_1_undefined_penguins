import Bus from '../scripts/EventBus.js';
import ProfileService from '../services/ProfileService.js';

export default class ProfileController {
    static FetchGetUser(){
        Bus.on('fetch-get-user', () => {
            //TODO: делаем запрос на сервер и в случае успеха эмитим открытие профиля
            const response = ProfileService.FetchGetUser();
            // if (response === 200) {
                Bus.emit('logged-in');
            // }
        })
    }
}
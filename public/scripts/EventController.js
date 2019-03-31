import Bus from './EventBus.js';
import UserModel from '../modules/UserModel.js';
import MenuView from '../views/MenuView.js';

export default class EventController {
    static Init(){
        Bus.on('check-autorized', () => {
                const response = AjaxModule
                .doPromisePost({
                    path: '/logged'
                })
                .then(function (res) {
                    res.status;
                }); 

                if (response == 200) {
                    UserModel.setUser();
                }
        });

        Bus.on('select-menu-header', MenuView.RenderHeader(UserModel.IsAutorised));
    }
}

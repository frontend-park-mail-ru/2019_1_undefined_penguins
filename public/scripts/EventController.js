import Bus from './EventBus.js';
import UserModel from '../modules/UserModel.js';

export default class EventController {
    static Init(){
        Bus.on('check-autorized', () => {
                const response = AjaxModule
                .doPromisePost({
                    path: '/logged'
                })
                .then(function (res) {
                    return res.status
                })
                .then((status) => {
                    if (status == 200) {
                        UserModel.setUser();
                    }
                }) 
        });

        Bus.on('select-menu-header', (menu) => {
            menu.RenderHeader(UserModel.IsAutorised())
        });
    }
}

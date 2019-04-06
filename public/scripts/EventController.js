import Bus from './EventBus.js';
import UserModel from '../modules/UserModel.js';
import Router from './Router.js';

export default class EventController {
    static Init(){
        Bus.on('check-autorized', () => {
            UserModel.CheckAuthorized()
        });

        Bus.on('select-menu-header', (menu) => {
            menu.RenderHeader(UserModel.IsAutorised());
        });

        Bus.on('sign-in', (form) => {
            UserModel.SignIn(form);
        })

        Bus.on('open-menu', () => {
            Router.open('/');
        })
    }
}

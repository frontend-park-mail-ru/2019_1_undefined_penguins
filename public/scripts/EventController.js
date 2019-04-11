import Bus from './EventBus.js';
import UserModel from '../modules/UserModel.js';
import Router from './Router.js';

export default class EventController {
    static Init(){
        Bus.on('check-autorized', () => {
            UserModel.CheckAuthorized()
        });

        // Bus.on('autorization-checked', () => {
        //     UserModel.SetAutorised();
        // });

        Bus.on('select-menu-header', (menu) => {
            menu.RenderHeader(UserModel.IsAutorised());
        });

        Bus.on('sign-in', (form) => {
            UserModel.SignIn(form);
        });

        Bus.on('sign-up', (form) => {
            UserModel.SignUp(form);
        });

        Bus.on('sign-out', () => {
            UserModel.SignOut();
        })

        Bus.on('open-menu', () => {
            console.log("Пришел эмит на open menu");
            Router.open('/');
        });

        Bus.on('get-current-user', (profileView) => {
            profileView.SetUser(UserModel.GetUser());
        });
        
        Bus.on('open-profile', () => {
            Router.open('/me');
        });

        Bus.on('get-users', (leadersView) => {
            UserModel.Leaders(leadersView, 0);
        });

        Bus.on('previous-page', (leadersView) => {
            UserModel.Leaders(leadersView, -1);
            //TODO: делаем запрос на получение юзеров на предыдущей странице и отрисовываем
        });

        Bus.on('next-page', (leadersView) => {
            UserModel.Leaders(leadersView, 1);
            //TODO: делаем запрос на получение юзеров на следующей странице и отрисовываем
        });

        // Bus.on('open-sign-up', () => {
        //     Router.open('/signUp');
        // });

        Bus.on('open-sign-in', () => {
            Router.open('/signIn');
        });

        // Bus.on('open-about', () => {
        //     Router.open('/about');
        // });

    }
}

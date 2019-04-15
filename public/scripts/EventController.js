import Bus from './EventBus.js';
import UserModel from '../modules/UserModel.js';
import Router from './Router.js';

export default class EventController {
  static Init() {
    Bus.on('check-autorized', () => {
      UserModel.CheckAuthorized();
    });

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
    });

    Bus.on('open-menu', () => {
      console.log('Пришел эмит на open menu');
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
    });

    Bus.on('next-page', (leadersView) => {
      UserModel.Leaders(leadersView, 1);
    });

    Bus.on('open-sign-in', () => {
      Router.open('/signIn');
    });

    Bus.on('change-profile', (view) => {
      Bus.on('redraw-profile', () => {
        view.SetUser(UserModel.GetUser());
      });
      const form = view.el.getElementsByTagName('form')[0];
      UserModel.ChangeProfile(form);
    });
  }
}

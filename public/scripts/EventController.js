import Bus from './EventBus.js';
import UserModel from '../modules/UserModel.js';
import Router from './Router.js';

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

export default class EventController {
  static Init() {
    Bus.on('check-autorized', () => {
      UserModel.CheckAuthorized();
    });

    Bus.on('select-menu-header', (menu) => {
      menu.RenderHeader(UserModel.IsAutorised());
    });

    Bus.on('sign-in', (el) => {
      UserModel.SignIn(el);
    });

    Bus.on('sign-up', (el) => {
      UserModel.SignUp(el);
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

    Bus.on('error-404', (el) => {
        let error = el.getElementsByClassName('error')[0];
        error.innerText = "Неверный email или пароль!"; 
        error.classList.remove("error__hidden");
    });

    Bus.on('error-409', (el) => {
        let error = el.getElementsByClassName('error')[0];
        error.innerText = "Такой пользователь уже существует!"; 
        error.classList.remove("error__hidden");
    });

    Bus.on('error-5xx', (el) => {
      let error = el.getElementsByClassName('error')[0];
      error.innerText = "Ошибка сервера!"; 
      error.classList.remove("error__hidden");
  });

    Bus.on('error-email', (el) => {
        let error = el.getElementsByClassName('error')[0];
        error.innerText = "Некорректный email!"; 
        error.classList.remove("error__hidden");
    });

    Bus.on('error-password', (el) => {
        let error = el.getElementsByClassName('error')[0];
        // error.innerText = "Некорректный пароль!"; 
        error.innerText = "Длина пароля должна быть от 4 до 20 символов!";  
        error.classList.remove("error__hidden");
    });

    Bus.on('error-empty', (el) => {
        let error = el.getElementsByClassName('error')[0];
        error.innerText = "Все поля должны быть заполнены!"; 
        error.classList.remove("error__hidden");
    });

    Bus.on('error-login', (el) => {
      let error = el.getElementsByClassName('error')[0];
      //error.innerText = "Некорректный логин!"; 
      error.innerText = "Длина логина должна быть от 4 до 14 символов!";
      error.classList.remove("error__hidden");
    });

    Bus.on('error-equal-password', (el) => {
        let error = el.getElementsByClassName('error')[0];
        error.innerText = "Пароли должны совпадать!"; 
        error.classList.remove("error__hidden");
    });

    Bus.on('change-profile', async (view) => {
        Bus.on('redraw-profile', () => {
            view.SetUser(UserModel.GetUser());
        })
        //const form = view.el.getElementsByTagName('form')[0];
        UserModel.ChangeProfile(view.el);
    })

    Bus.on('open-win-view', () => {
      Router.open('/game/win');
    })

    Bus.on('open-lost-view', () => {
      Router.open('/game/lost');
    })
  }
}

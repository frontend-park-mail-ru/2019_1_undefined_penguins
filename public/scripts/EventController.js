import Bus from './EventBus.js'
import UserModel from '../modules/UserModel.js'
import Router from './Router.js'

function insertAfter (newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling)
}

export default class EventController {
  static Init () {
    Bus.on('check-autorized', () => {
      UserModel.CheckAuthorized()
    })

    Bus.on('select-menu-header', (menu) => {
      menu.RenderHeader(UserModel.IsAutorised())
    })

    Bus.on('sign-in', (form) => {
      UserModel.SignIn(form)
    })

    Bus.on('sign-up', (form) => {
      UserModel.SignUp(form)
    })

    Bus.on('sign-out', () => {
      UserModel.SignOut()
    })

    Bus.on('open-menu', () => {
      console.log('Пришел эмит на open menu')
      Router.open('/')
    })

    Bus.on('get-current-user', (profileView) => {
      profileView.SetUser(UserModel.GetUser())
    })

    Bus.on('open-profile', () => {
      Router.open('/me')
    })

    Bus.on('get-users', (leadersView) => {
      UserModel.Leaders(leadersView, 0)
    })

    Bus.on('previous-page', (leadersView) => {
      UserModel.Leaders(leadersView, -1)
    })

    Bus.on('next-page', (leadersView) => {
      UserModel.Leaders(leadersView, 1)
    })

    Bus.on('open-sign-in', () => {
      Router.open('/signIn')
    })

    Bus.on('error-404', () => {
      // let form = param.param1;
      // let elem = param.param2;
      // form.elements.email.style.border = '3px solid red';
      // form.elements.password.style.border = '3px solid red';
      // let error = document.createElement('span');
      // insertAfter(error, elem);
      let error = document.getElementsByClassName('error')[0]
      error.innerText = 'Неверный email или пароль!'
      error.classList.remove('error__hidden')
    })

    Bus.on('error-409', () => {
      // let form = param.param1;
      // let elem = param.param2;
      // form.elements.email.style.border = '3px solid red';
      // form.elements.password.style.border = '3px solid red';
      // let error = document.createElement('span');
      // insertAfter(error, elem);
      let error = document.getElementsByClassName('error')[0]
      error.innerText = 'Такой пользователь уже существует!'
      error.classList.remove('error__hidden')
    })

    Bus.on('error-email', (param) => {
      let error = document.getElementsByClassName('error')[0]
      error.innerText = 'Некорректный email!'
      error.classList.remove('error__hidden')
    })

    Bus.on('error-password', (param) => {
      let error = document.getElementsByClassName('error')[0]
      error.innerText = 'Некорректный пароль!'
      error.classList.remove('error__hidden')
    })

    Bus.on('error-empty', (param) => {
      let error = document.getElementsByClassName('error')[0]
      error.innerText = 'Все поля должны быть заполнены!'
      error.classList.remove('error__hidden')
    })

    Bus.on('error-equal-password', (param) => {
      let error = document.getElementsByClassName('error')[0]
      error.innerText = 'Пароли должны совпадать!'
      error.classList.remove('error__hidden')
    })

    Bus.on('change-profile', (view) => {
      Bus.on('redraw-profile', () => {
        view.SetUser(UserModel.GetUser())
      })
      const form = view.el.getElementsByTagName('form')[0]
      UserModel.ChangeProfile(form)
    })

    Bus.on('open-win-view', (score) => {
      UserModel.setUserScore(score)
      Router.open('/game/win')
    })

    Bus.on('open-lost-view', (score) => {
      UserModel.setUserScore(score)
      Router.open('/game/lost')
    })

    Bus.on('open-single', () => {
      Router.open('/singlePlayer')
    })
  }
}

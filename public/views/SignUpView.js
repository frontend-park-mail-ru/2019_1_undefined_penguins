import BaseView from './BaseView.js'
import Bus from '../scripts/EventBus.js'

import Validate from '../modules/Validate.js'
import SignUpTmpl from '../components/SignUp/SignUp.tmpl.xml';

// const templateFunc = window.fest['components/SignUp/SignUp.tmpl']

export default class SignUpView extends BaseView {
    constructor (el) {
        super(el);
    }

    show () {
        super.show();
    }

    render () {
        this.el.innerHTML = ''
        this.el.innerHTML = SignUpTmpl();

      const form = this.el.getElementsByTagName('form')[0]

      form.addEventListener('submit', (event) => {
        event.preventDefault()
        //
        // TODO rewrite with norm condition
        if (!Validate.ValidateEmpty(form)) {
          Bus.emit('error-empty', form.elements.email)
        } else {
          if (!Validate.ValidateEmail(form.elements.email.value)) {
            Bus.emit('error-email', form.elements.email)
          } else {
            if (!Validate.ValidatePassword(form.elements.password.value)) {
              Bus.emit('error-password', form.elements.password)
            } else {
              if (!Validate.ValidateEqualPassword(form.elements.password.value, form.elements.password_repeat.value)) {
                Bus.emit('error-equal-password', form)
              } else {
                Bus.emit('sign-up', form)
              }
            }
          }
        }
      }
      )
      //
      //   Bus.emit('sign-up', form);
      // });

      const home = this.el.getElementsByClassName('js-header__home-button')[0]
      if (home !== undefined) {
        home.addEventListener('click', (event) => {
          event.preventDefault()
          Bus.emit('open-menu')
        })
      }
    }
}

import BaseView from './BaseView.js';
import Bus from '../scripts/EventBus.js';

import Validate from '../modules/Validate.js';
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
        this.el.innerHTML = '';
        this.el.innerHTML = SignUpTmpl();

        const form = this.el.getElementsByTagName('form')[0];
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            if (!Validate.ValidateEmpty(form)) {
                Bus.emit('error-empty', this.el);     
                return;           
            }
            if (!Validate.ValidateEmail(form.elements.email.value)) {
                Bus.emit('error-email', this.el);   
                return;  
            } 
            if (!Validate.ValidateLogin(form.elements.login.value)) {
                Bus.emit('error-login', this.el);   
                return;  
            }
            if (!Validate.ValidatePassword(form.elements.password.value)) {
                Bus.emit('error-password', this.el);   
                return;  
            }
            if (!Validate.ValidateEqualPassword(form.elements.password.value, form.elements.password_repeat.value)) {
                Bus.emit('error-equal-password', this.el);   
                return;  
            }
            Bus.emit('sign-up', this.el);
        }
        );
  
        const home = this.el.getElementsByClassName('js-header__home-button')[0];
        if (home !== undefined) {
            home.addEventListener('click', (event) => {
                event.preventDefault();
                Bus.emit('open-menu');
            });
        }
    }
}

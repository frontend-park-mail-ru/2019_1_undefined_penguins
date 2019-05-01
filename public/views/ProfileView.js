import BaseView from './BaseView.js';
import Bus from '../scripts/EventBus.js';
import Validate from '../modules/Validate.js';

const templateFunc = window.fest['components/Profile/Profile.tmpl'];

export default class ProfileView extends BaseView {
  constructor(el) {
    super(el);
    this.user = null;
  }

  show() {
    Bus.emit('get-current-user', this);
  }

  SetUser(user) {
    this.user = user;
    super.show();
  }

  render() {
    this.el.innerHTML = '';
    this.renderProfile();
  }

  renderProfile() {
    
    this.el.innerHTML = templateFunc(this.user);

    const home = this.el.getElementsByClassName('js-header__home-button')[0];
    if (home !== undefined) {
      home.addEventListener('click', (event) => {
        event.preventDefault();
        Bus.emit('open-menu');
      });
    }

    const form = this.el.getElementsByTagName('form')[0];

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!Validate.ValidateEmpty(form)) {
        Bus.emit('error-empty', this.el);           
      } else {
          if (!Validate.ValidateLogin(form.elements.login.value)) {
            Bus.emit('error-login', this.el);
          } else {
            if (!Validate.ValidateEmail(form.elements.email.value)) {
              Bus.emit('error-email', this.el);
            } else {
              {
                Bus.emit('change-profile', this);
              }
            }
          }
        }
    });
  }
}

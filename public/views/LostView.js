import BaseView from './BaseView.js';
import Bus from '../scripts/EventBus.js';
import UserModel from '../modules/UserModel.js';
import LostTmpl from '../components/Lost/Lost.tmpl.xml';
// const templateFunc = window.fest['components/Lost/Lost.tmpl']

export default class LostView extends BaseView {
    constructor (el) {
        super(el);
        this.score = null;
        this.user = null;
        this.el.classList.add('lost-section');
    }

    show () {
        this.setUser(UserModel.GetUser());
        super.show();
    }

    setUser (user) {
        this.user = user;
        super.show();
    }

    render () {
        this.el.innerHTML = '';

        this._renderLost();
    }

    _renderLost () {
        this.el.innerHTML = LostTmpl(this.user);

        const repeat = this.el.getElementsByClassName('js-button__repeat-button')[0];
        if (repeat !== undefined) {
            repeat.addEventListener('click', (event) => {
                event.preventDefault();
                Bus.emit('open-single');
            });
        }

        const home = this.el.getElementsByClassName('js-header__home-button')[0];
        if (home !== undefined) {
            home.addEventListener('click', (event) => {
                event.preventDefault();
                Bus.emit('open-menu');
            });
        }
    }
}

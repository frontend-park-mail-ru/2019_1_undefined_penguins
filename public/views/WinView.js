import BaseView from './BaseView.js';
import Bus from '../scripts/EventBus.js';
import UserModel from '../modules/UserModel.js';
import WinTmpl from '../components/Win/Win.tmpl.xml';
// const templateFunc = window.fest['components/Win/Win.tmpl']

export default class WinView extends BaseView {
    constructor (el) {
        super(el);
        this.score = null;
        this.user = null;
        this.el.classList.add('win-section');
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

        this._renderWin();
    }

    _renderWin () {
        this.el.innerHTML = WinTmpl(this.user);

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

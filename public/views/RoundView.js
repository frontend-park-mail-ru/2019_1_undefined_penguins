import BaseView from './BaseView.js';
import Bus from '../scripts/EventBus.js';
import RoundTmpl from '../components/Round/Round.tmpl.xml';
import UserModel from '../modules/UserModel.js';

export default class RoundView extends BaseView {
    constructor (el) {
        super(el);
        this.data = null;
        this.el.classList.add('round-section');
    }

    show () {
        super.show();
    }

    setData (data) {
        this.data = data;
    }

    render () {
        this.setData(UserModel.getGameResult());
        console.error(this.data);
        
        this.el.innerHTML = '';

        this.el.innerHTML = RoundTmpl(this.data);

        const home = this.el.getElementsByClassName('js-header__home-button')[0];
        if (home !== undefined) {
            home.addEventListener('click', (event) => {
                event.preventDefault();
                Bus.emit('open-menu');
            });
        }
        
    }
}

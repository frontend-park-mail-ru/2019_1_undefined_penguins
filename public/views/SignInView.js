import BaseView from './BaseView.js';
import Bus from '../scripts/EventBus.js';
// import SignInTemplate from '../components/SignIn/SignIn.tmpl.xml';

const templateFunc = window.fest['components/SignIn/SignIn.tmpl'];

export default class SignInView extends BaseView {
    constructor(el) {
        super(el);
    }

    show() {
        super.show();
    }

    render() {
        this.el.innerHTML = '';
        this.el.innerHTML = templateFunc();

        const form = this.el.getElementsByTagName('form')[0];

        form.addEventListener('submit', (event) => {
            // const err = this.el.getElementsByTagName('span')[0];
            // err.innerText = '';
            event.preventDefault();
            Bus.emit('sign-in', form);
        });

        const home = this.el.getElementsByClassName('js-header__home-button')[0];
		if (home !== undefined) {
			home.addEventListener('click', (event) => {
				// const err = this.el.getElementsByTagName('span')[0];
				// err.innerText = '';
				event.preventDefault();
				Bus.emit('open-menu');
			});
		}
    }
}
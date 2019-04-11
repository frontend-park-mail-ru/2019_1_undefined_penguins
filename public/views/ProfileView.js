import BaseView from './BaseView.js';
import Bus from '../scripts/EventBus.js';

const templateFunc = window.fest[ 'components/Profile/Profile.tmpl' ];

export default class ProfileView extends BaseView {
    constructor (el) {
		super(el);
		this.user = null;
	}

	show () {
		Bus.emit('get-current-user', this);
	}
	
	SetUser(user) {
		this.user = user;
		super.show();
	}

	render () {
		this.el.innerHTML = '';
		this.renderProfile();
	}

	renderProfile () {
		console.log(this.user)
		this.el.innerHTML = templateFunc(this.user);

		const home = this.el.getElementsByClassName('js-header__home-button')[0];
		if (home !== undefined) {
			home.addEventListener('click', (event) => {
				event.preventDefault();
				Bus.emit('open-menu');
			});
		}
	}
}
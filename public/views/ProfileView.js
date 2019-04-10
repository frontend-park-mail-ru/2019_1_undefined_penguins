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
		super.show();
	}

	SetUser(user) {
		this.user = user;
	}

	render () {
		Bus.emit('get-current-user');
		this.el.innerHTML = '';
		this.renderProfile();
	}

	renderProfile () {
		this.el.innerHTML = templateFunc(this.user);
	}
}
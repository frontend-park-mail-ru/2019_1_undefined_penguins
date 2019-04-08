import BaseView from './BaseView.js';
import Bus from '../scripts/EventBus.js';

const templateFunc = window.fest[ 'components/Profile/Profile.tmpl' ];

export default class ProfileView extends BaseView {
    constructor (el) {
		super(el);
	}

	show () {
		super.show();
	}

	render () {
		Bus.emit('get-current-user');
		this.el.innerHTML = '';
		this.renderScoreboard();
	}

	renderScoreboard () {
		this.el.innerHTML = templateFunc();
	}
}
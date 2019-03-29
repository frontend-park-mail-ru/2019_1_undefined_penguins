import BaseView from './BaseView.js';

const templateFunc = window.fest[ 'components/Profile/Profile.tmpl' ];

export default class ProfileView extends BaseView {
    constructor (el) {
		super(el);
	}

	show () {
		super.show();
	}

	render () {
		this.el.innerHTML = '';
		this.renderScoreboard();
	}

	renderScoreboard () {
		this.el.innerHTML = templateFunc();
	}
}
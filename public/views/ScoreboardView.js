import BaseView from './BaseView.js';
import Bus from '../scripts/EventBus.js';

const templateFunc = window.fest[ 'components/Board/Board.tmpl' ];


export default class ScoreboardView extends BaseView {
	constructor (el) {
		super(el);
		this.users = null;
		// bus.on('users-loaded', this.setUsers.bind(this));
	}

	show () {
		Bus.emit('get-users', this);
		super.show();
		// this.fetchUsers();
	}

	// fetchUsers () {
	// 	bus.emit('fetch-users');
	// }

	SetUsers (users) {
		const u = users.then((users) => {
			return users;
		})
		this.users = u;
	}

	render () {
		this.el.innerHTML = '';

		if (!this.users) {
			this.renderLoading();
		} else {
			this.renderScoreboard();
		}
	}

	renderLoading () {
		const loading = document.createElement('strong');
		loading.textContent = 'Loading';
		this.el.appendChild(loading);
	}

	renderScoreboard () {
		this.el.innerHTML = templateFunc(this.users);
	}
}
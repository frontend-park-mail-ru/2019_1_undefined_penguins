import BaseView from './BaseView.js';
import Bus from '../scripts/EventBus.js';

export default class MenuView extends BaseView {
	constructor (el) {
		super(el);
		this.logged = false;
		Bus.on('logged-in', this.setUser.bind(this));
	}

	show () {
		super.show();
	}

	fetchUser () {
		Bus.emit('fetch-user');
	}

	setUser () {
		console.log("SET USER");
		this.logged = true;
		// this.render();
	}

	render () {
		this.el.innerHTML = '';
		const headerSection = document.createElement('section');
		headerSection.dataset.sectionName = 'header';
		headerSection.classList.add("menu_header");

		const logo = document.createElement('div');
		logo.id = 'logo';
		const logoHeader = document.createElement('h1');
		logoHeader.textContent = "Penguins Wars";
		logo.appendChild(logoHeader);

		const auth = document.createElement('div');
		auth.id = 'auth';

		let authTitles = (!this.logged) ? this._headersUnauthorized() : this._headersAuthorized();

		Object.entries(authTitles).forEach((entry) => {
			const href = entry[0];
			const title = entry[1];

			const a = document.createElement('a');
			a.textContent = title;
			a.href = href;
			a.dataset.href = href;
			a.classList.add('auth-button');

			auth.appendChild(a);
		});

		headerSection.appendChild(logo);
		headerSection.appendChild(auth);
		this.el.appendChild(headerSection);

		const mainSection = document.createElement('section');
		mainSection.dataset.sectionName = 'main';

		const menu = document.createElement('div');
		menu.id = 'menu';
		const picture = document.createElement('div');
		picture.id = 'pictures';

		const buttons = {
		singlePlayer: {
			header: 'Singleplayer',
		},
		multiPlayer: {
			header: 'Multiplayer',
		},
		leaders: {
			header: 'Leaders',
		},
		about: {
			header: 'About',
		},
		};

		Object.entries(buttons).forEach((entry) => {
			const href = entry[0];
			const { header } = entry[1];

			const buttonDiv = document.createElement('div');
			buttonDiv.classList = 'buttons';

			const a = document.createElement('a');

			a.textContent = header;
			a.href = href;
			a.dataset.href = href;

			buttonDiv.appendChild(a);

			menu.appendChild(buttonDiv);
		});

		mainSection.appendChild(menu);

		this.el.appendChild(mainSection);
	}

	_headersAuthorized() {
		return {
			me: 'Profile',
			signout: 'Sign Out',
		};
	}

	_headersUnauthorized() {
		return {
			signIn: 'Sing In',
			signUp: 'Sign Up',
		};
	}
}

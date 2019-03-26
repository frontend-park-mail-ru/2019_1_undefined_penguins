import BaseView from './BaseView.js';

export default class MenuView extends BaseView {
	constructor (el) {
		super(el);
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

		const authTitles = {
			signIn: 'Sing In',
			signUp: 'Sign Up',
			me: 'Profile',
			signout: 'Sign Out',
		};

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
}

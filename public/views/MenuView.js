import BaseView from './BaseView.js';
import Bus from '../scripts/EventBus.js';

export default class MenuView extends BaseView {
	constructor (el) {
		super(el);
		// this.logged = false;
		this.el.classList.add("menu-section");
		// Bus.emit('check-autorized');
	}

	show () {
		super.show();
	}

	// fetchUser () {
	// 	Bus.emit('fetch-user');
	// }

	// setUser () {
	// 	console.log("SET USER");
	// 	this.logged = true;
	// 	// this.render();
	// }

	render () {
		this.el.innerHTML = '';

		Bus.emit('select-menu-header', this);

		const mainSection = document.createElement('section');
		mainSection.dataset.sectionName = 'menu';
		mainSection.classList.add('menu');

		const buttons = {
			singlePlayer: {
				header: 'ОДИНОЧНАЯ ИГРА',
				style: 'menu__button js-singleplayer-button',
			},
			multiPlayer: {
				header: 'ИГРА С ДРУГОМ',
				style: 'menu__button js-multiplayer-button menu__button__disabled',
			},
			leaders: {
				header: 'ТАБЛИЦА ЛИДЕРОВ',
				style: 'menu__button js-leaders-button',
			},
			about: {
				header: 'ОБ ИГРЕ',
				style: 'menu__button js-about-button',
			},
		};

		const buttonsDiv = document.createElement('div');
		buttonsDiv.classList.add('menu__buttons');
		
		Object.entries(buttons).forEach((entry) => {
			const href = entry[0];
			const header = entry[1].header;
			const classStyle = entry[1].style;
			
			const a = document.createElement('a');
			a.textContent = header;
			a.href = href;
			a.dataset.href = href;
			a.classList = classStyle;
			
			buttonsDiv.appendChild(a);
		});
		mainSection.appendChild(buttonsDiv);

		const pictureDiv = document.createElement('div');
		pictureDiv.classList.add('menu__picture');
		const pictureImg = document.createElement('img');
		pictureImg.src = '../../images/menu-picture.png';
		pictureImg.classList.add('menu-picture__img');
		pictureDiv.appendChild(pictureImg);
		mainSection.appendChild(pictureDiv);

		this.el.appendChild(mainSection);
	}

	RenderHeader(isAutorized) {
		const headerSection = document.createElement('section');
		headerSection.dataset.sectionName = 'header';
		headerSection.classList.add('header');

		const logo = document.createElement('div');
		logo.classList.add('header__logo');
		const logoHeader = document.createElement('h1');
		logoHeader.textContent = "Penguins Wars";
		logoHeader.classList.add('header__title');
		logo.appendChild(logoHeader);
		const auth = document.createElement('div');
		auth.classList.add('header__buttons');

		let authTitles = (!isAutorized) ? this._headersUnauthorized() : this._headersAuthorized();

		Object.entries(authTitles).forEach((entry) => {
			const href = entry[0];
			const title = entry[1].title;
			const classStyle = entry[1].style;

			const a = document.createElement('a');
			a.textContent = title;
			a.href = href;
			a.dataset.href = href;
			a.classList = classStyle;

			auth.appendChild(a);
		});

		headerSection.appendChild(logo);
		headerSection.appendChild(auth);
		this.el.appendChild(headerSection);
	}

	_headersAuthorized() {
		return {
			me: {
				title: 'ПРОФИЛЬ',
				style: 'header__profile header__button js-profile-button',
			},
			signout: {
				title: 'ВЫЙТИ',
				style: 'header__sign-out header__button js-sign-out-button',
			}
		};
	}

	_headersUnauthorized() {
		return {
			signUp: {
				title: 'ЗАРЕГИСТРИРОВАТЬСЯ',
				style: 'header__sign-up header__button js-sign-up-button',
			},
			signIn: {
				title: 'ВОЙТИ',
				style: 'header__sign-in header__button js-sign-in-button',
			},				
		};
	}
}

import BaseView from './BaseView.js';
import Bus from '../scripts/EventBus.js';

export default class MenuView extends BaseView {
    constructor (el) {
        super(el);
        this.el.classList.add('menu-section');
    }

    show () {
        super.show();
    }

    render () {
        this.el.innerHTML = '';

        Bus.emit('select-menu-header', this);

        const mainSection = document.createElement('section');
        mainSection.dataset.sectionName = 'menu';
        mainSection.classList.add('menu');

        const buttons = {
            single: {
                header: 'ОДИНОЧНАЯ ИГРА',
                style: 'menu__button js-singleplayer-button'
            },
            multi: {
                header: 'ИГРА С ДРУГОМ',
                style: 'menu__button js-multiplayer-button'
            },
            leaders: {
                header: 'ТАБЛИЦА ЛИДЕРОВ',
                style: 'menu__button js-leaders-button'
            },
            about: {
                header: 'ОБ ИГРЕ',
                style: 'menu__button js-about-button'
            }
        };

        const buttonsDiv = document.createElement('div');
        buttonsDiv.classList.add('menu__buttons');

        Object.entries(buttons).forEach((entry) => {
            const href = entry[0];
            const { header } = entry[1];
            const classStyle = entry[1].style;

            const a = document.createElement('a');
            a.textContent = header;
            a.href = href;
            a.dataset.href = href;
            a.classList = classStyle;

            buttonsDiv.appendChild(a);
        });
        mainSection.appendChild(buttonsDiv);
        this.el.appendChild(mainSection);

        const pictureSection = document.createElement('section');
        pictureSection.classList.add('menu-picture');
        const pictureImg = document.createElement('img');
        pictureImg.src = '/images/menu-picture.png';
        pictureImg.classList.add('menu-picture__img');
        pictureSection.appendChild(pictureImg);
        this.el.appendChild(pictureSection);
    }

    RenderHeader (isAutorized) {
        const headerSection = document.createElement('section');
        headerSection.dataset.sectionName = 'menu-header';
        headerSection.classList.add('menu-header');

        const logo = document.createElement('div');
        logo.classList.add('menu-header__logo');
        const logoHeader = document.createElement('h1');
        logoHeader.textContent = 'Penguins Wars';
        logoHeader.classList.add('menu-header__title');
        logo.appendChild(logoHeader);
        const auth = document.createElement('div');
        auth.classList.add('menu-header__buttons');

        const authTitles = (!isAutorized) ? this._headersUnauthorized() : this._headersAuthorized();
        // const authTitles = this._headersUnauthorized();

        Object.entries(authTitles).forEach((entry) => {
            const href = entry[0];
            const { title } = entry[1];
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

    _headersAuthorized () {
        return {
            me: {
                title: 'ПРОФИЛЬ',
                style: 'menu-header__profile menu-header__button js-profile-button'
            },
            signout: {
                title: 'ВЫЙТИ',
                style: 'menu-header__sign-out menu-header__button js-sign-out-button'
            }
        };
    }

    _headersUnauthorized () {
        return {
            signIn: {
                title: 'ВОЙТИ',
                style: 'menu-header__sign-in menu-header__button js-sign-in-button'
            },
            signUp: {
                title: 'ЗАРЕГИСТРИРОВАТЬСЯ',
                style: 'menu-header__sign-up menu-header__button js-sign-up-button'
            }
        };
    }
}

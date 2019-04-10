import { RENDER_TYPES } from '../../utils/constants.js';
/** Класс компонента меню. */
export class MenuComponent {
  /**
     * Конструктор компонента Menu.
     * @param el - Тело документа
     */

  constructor({
    el = document.body,
    type = RENDER_TYPES.DOM,
  } = {}) {
    this._el = el;
    this._type = type;
  }

  /**
			 * Возврат значения header.
			 * @return  Значение header
			 */
  get header() {
    return this._header;
  }

  /**
         * Установка значения header.
         * @param [data = ""] Значение, устанавливающееся в header
         */
  set header(data = '') {
    this._header = data;
  }

  /**
         * Рендеринг header.
         * @return   headerSection

         */
  _renderHeader() {
    const headerSection = document.createElement('section');
    headerSection.dataset.sectionName = 'menu-header';

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

    return headerSection;
  }

  /**
         * Рендеринг тела.
         * @return   mainSection

         */
  _renderBody() {
    const mainSection = document.createElement('section');
    mainSection.dataset.sectionName = 'main';

    const menu = document.createElement('div');
    menu.id = 'menu';
    const picture = document.createElement('div');
    picture.id = 'pictures';

    const buttons = {
      singlePlayer: {
        header: 'Singleplayer',
        text: 'reheh',
      },
      multiPlayer: {
        header: 'Multiplayer',
        text: 'wjrwy',
      },
      leaders: {
        header: 'Leaders',
        text: 'srtaa',
      },
      about: {
        header: 'About',
        text: 'etjaae',
      },
    };

    Object.entries(buttons).forEach((entry) => {
      const href = entry[0];
      const { header } = entry[1];
      const { text } = entry[1];

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

    return mainSection;
  }

  _renderTmpl() {
    this._el.innerHTML = window.fest['components/Menu/Menu.tmpl']();
  }

  /**
         * Рендеринг страницы.
         */
  render() {
    switch (this._type) {
      case RENDER_TYPES.DOM:
        const head = this._renderHeader();
        const body = this._renderBody();
        this._el.appendChild(head);
        this._el.appendChild(body);
            	break;
      case RENDER_TYPES.TMPL:
        this._renderTmpl();
            	break;
    }
  }
}

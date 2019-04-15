import { RENDER_TYPES } from '../../utils/constants.js';

/** Класс компонента авторизации */

export class SignInComponent {
  /**
     * Конструктор компонента авторизации.
     * @param el - Тело документа
     */

  constructor({
    el = document.body,
    type = RENDER_TYPES.DOM,
  } = {}) {
    this._el = el;
    this._type = type;
    this._status = 200;
  }

  /**
         * Рендеринг header.
         * @return   headerSection

         */
  _renderHeader() {
    const headerSection = document.createElement('section');
    headerSection.dataset.sectionName = 'header';

    const goBack = document.createElement('div');
    goBack.id = 'goBack';

    const img = document.createElement('img');
    img.src = '../../images/home.png';
    goBack.appendChild(img);

    const title = document.createElement('div');
    title.id = 'title';
    const text = document.createElement('h2');
    text.textContent = 'Войти';
    title.appendChild(text);


    headerSection.appendChild(goBack);
    headerSection.appendChild(title);

    return headerSection;
  }

  /**
         * Рендеринг тела.
         * @return   mainSection

         */
  _renderBody() {
    const mainSection = document.createElement('section');
    mainSection.dataset.sectionName = 'main';
    const err = document.createElement('span');
    err.classList.add('errorLabel');
    err.id = 'error';
    const form = document.createElement('form');

    const inputs = [
      {
        name: 'email',
        placeholder: 'Email',
      },
      {
        name: 'password',
        type: 'password',
        placeholder: 'Password',
      },
      {
        name: 'submit',
        type: 'submit',
      },
    ];

    inputs.forEach((item) => {
      const input = document.createElement('input');

      input.name = item.name;
      input.type = item.type;

      input.placeholder = item.placeholder;

      form.appendChild(input);
      form.appendChild(document.createElement('br'));
    });
    mainSection.appendChild(form);
    mainSection.appendChild(err);
    form.addEventListener('submit', (event) => {
      err.innerText = '';
      event.preventDefault();

      const email = form.elements.email.value;
      const password = form.elements.password.value;
      form.elements.email.classList.remove('errorInput');
      form.elements.password.classList.remove('errorInput');
      const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (reg.test(email) == false) {
        alert('Введите корректный e-mail');
        return false;
      }
      if (
        email.length === 0
        || password.length === 0
      ) {
        let errorString = 'Вы не ввели следующие поля:\n';
        if (email.length === 0) {
          errorString = `${errorString}email\n`;
          form.elements.email.classList.add('errorInput');
        }
        if (password.length === 0) {
          errorString = `${errorString}пароль\n`;
          form.elements.password.classList.add('errorInput');
        }
        err.innerText = errorString;
        this._status = 300;
      }
    });
    return mainSection;
  }

  /**
         * Установка значения status.
         * @param status Значение, устанавливающееся в status
         */
  set status(status) {
    this._status = status;
  }

  /**
			 * Возврат значения status.
			 * @return  Значение status
			 */
  get status() {
    return this._status;
  }

  _renderTmpl() {
    this._el.innerHTML = window.fest['components/SignIn/SignIn.tmpl'](this._data);
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
        const form = this._el.getElementsByTagName('form')[0];

        form.addEventListener('submit', (event) => {
          const err = this._el.getElementsByTagName('span')[0];
          err.innerText = '';
          event.preventDefault();

          console.log('hello');

          const email = form.elements.email.value;
          const password = form.elements.password.value;
          form.elements.email.classList.remove('errorInput');
          form.elements.password.classList.remove('errorInput');
          if (
            email.length === 0
                        || password.length === 0
          ) {
            let errorString = 'Вы не ввели следующие поля:\n';
            if (email.length === 0) {
              errorString = `${errorString}email\n`;
              form.elements.email.classList.add('errorInput');
            }
            if (password.length === 0) {
              errorString = `${errorString}пароль\n`;
              form.elements.password.classList.add('errorInput');
            }
            err.innerText = errorString;
            this._status = 300;
          }
        });
            	break;
    }
  }
}

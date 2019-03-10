export class SignUpComponent {
  constructor({
    el = document.body,
  } = {}) {
    this._el = el;
    this._status = 200;
  }

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
    text.textContent = 'Зарегистрироваться';
    title.appendChild(text);


    headerSection.appendChild(goBack);
    headerSection.appendChild(title);

    return headerSection;
  }

  _renderBody() {
    const mainSection = document.createElement('section');
    mainSection.dataset.sectionName = 'main';

    const form = document.createElement('form');

    const inputs = [
      {
        name: 'email',
        type: 'email',
        placeholder: 'Email',
      },
      {
        name: 'password',
        type: 'password',
        placeholder: 'Password',
      },
      {
        name: 'password_repeat',
        type: 'password',
        placeholder: 'Repeat Password',
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
    const status = 200;
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const email = form.elements.email.value;
      const password = form.elements.password.value;
      const password_repeat = form.elements.password_repeat.value;


      let errorString;
      if (password !== password_repeat) {
        alert('Пароли не совпадают');
        this._status = 300;
        return;
      }
      if (
        email.localeCompare('') === 0
                || password.localeCompare('') === 0
      ) {
        errorString = 'Вы не ввели следующие поля:\n';
        if (email.localeCompare('') === 0) {
          errorString += 'email\n';
        }
        if (password.localeCompare('') === 0) {
          errorString += 'пароль\n';
        }
        alert(errorString);
        this._status = 300;
        return;
      }

      if (
        !password.match(/^\S{4,}$/)
      ) {
        errorString = 'Вы неверно ввели следующие поля:\n';
        if (!password.match(/^\S{4,}$/)) {
          errorString += 'пароль\n';
        }
        alert(errorString);
        this._status = 300;
      }
    });
    return mainSection;
  }

  set status(status) {
    this._status = status;
  }

  get status() {
    return this._status;
  }

  render() {
    const head = this._renderHeader();
    const body = this._renderBody();

    this._el.appendChild(head);
    this._el.appendChild(body);
  }
}

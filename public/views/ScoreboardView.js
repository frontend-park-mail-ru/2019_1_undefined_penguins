import BaseView from './BaseView.js';
import Bus from '../scripts/EventBus.js';
// import ScoreboardTemplate from '../components/Board/Board.tmpl.xml';

const templateFunc = window.fest['components/Board/Board.tmpl'];

export default class ScoreboardView extends BaseView {
  constructor(el) {
    super(el);
    this.users = null;
    this.page = 1;
    this.el.classList.add('leaders-section');
    // bus.on('users-loaded', this.setUsers.bind(this));
  }

  show() {
    Bus.emit('get-users', this);
    super.show();
    // this.fetchUsers();
  }

  // fetchUsers () {
  // 	bus.emit('fetch-users');
  // }

  SetUsers(users) {
    this.users = users;
    super.show();
  }

  GetPage() {
    return this.page;
  }

  PlusPage() {
    this.page++;
  }

  MinusPage() {
    if (this.page > 1) {
      this.page--;
    }
  }

  render() {
    this.el.innerHTML = '';

    if (!this.users) {
      this.renderLoading();
    } else {
      this.renderScoreboard();
    }
  }

  renderLoading() {
    const loading = document.createElement('strong');
    loading.textContent = 'Loading';
    this.el.appendChild(loading);
  }

  renderScoreboard() {
    this.users.map((obj) => {
      obj.Page = this.page;
      return obj;
    });
    this.el.innerHTML = templateFunc(this.users);


    const prevButton = this.el.getElementsByClassName('js-button-prev')[0];
    const nextButton = this.el.getElementsByClassName('js-button-next')[0];

    prevButton.addEventListener('click', (event) => {
      event.preventDefault();
      Bus.emit('previous-page', this);
    });

    nextButton.addEventListener('click', (event) => {
      event.preventDefault();
      Bus.emit('next-page', this);
    });

    const home = this.el.getElementsByClassName('js-header__home-button')[0];
    if (home !== undefined) {
      home.addEventListener('click', (event) => {
        // const err = this.el.getElementsByTagName('span')[0];
        // err.innerText = '';
        event.preventDefault();
        Bus.emit('open-menu');
      });
    }
  }
}

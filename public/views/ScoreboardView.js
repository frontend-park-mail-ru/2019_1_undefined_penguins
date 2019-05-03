import BaseView from './BaseView.js';
import Bus from '../scripts/EventBus.js';
import BoardTmpl from '../components/Board/Board.tmpl.xml';

// const templateFunc = window.fest['components/Board/Board.tmpl']

export default class ScoreboardView extends BaseView {
    constructor(el) {
        super(el);
        this.users = null;
        this.page = 1;
        this.el.classList.add('leaders-section');
        this.usersOnPage = 3;
    }

    show () {
        Bus.emit('get-users', this);
        super.show();
    }

    SetCountOfUsers(info){
        console.log(info);
        this.count = info.count;
        this.usersOnPage = info.usersOnPage;
    }

    SetUsers(users) {
        this.users = users;
        super.show();
    }

    GetPage () {
        return this.page;
    }

    PlusPage () {
        this.page++;
    }


    MinusPage() {
        this.page--;
    }

    StartPage() {
        this.page=1;
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


    renderScoreboard() {
        this.users[0].Page = this.page;
        if (this.page <= this.usersOnPage/3) {
            this.users[0].Right = true;
        } else {
            this.users[0].Right = false;
        }
    
        this.el.innerHTML = BoardTmpl(this.users);

        const prevButton = this.el.getElementsByClassName('js-button-prev')[0];
        const nextButton = this.el.getElementsByClassName('js-button-next')[0];

        if (this.page > 1) {
            prevButton.addEventListener('click', (event) => {
                event.preventDefault();
                this.MinusPage();
                Bus.emit('new-page', this);
            });
        }

        if (this.page <= this.usersOnPage/3) {
            nextButton.addEventListener('click', (event) => {
                event.preventDefault();
                this.PlusPage();
                Bus.emit('new-page', this);
            });
        }
    
        const home = this.el.getElementsByClassName('js-header__home-button')[0];
        if (home !== undefined) {
            home.addEventListener('click', (event) => {
                event.preventDefault();
                Bus.emit('open-menu');
            });
        }
    }
}

import BaseView from './BaseView.js';
import Bus from '../scripts/EventBus.js';
import BoardTmpl from '../components/Board/Board.tmpl.xml';

// const templateFunc = window.fest['components/Board/Board.tmpl']

export default class ScoreboardView extends BaseView {
    constructor(el) {
        super(el);
        this.users = null;
        this.page = new URLSearchParams(document.location.search).get('page');
        if (this.page === null) {
            this.page = 1;
        }
        this.el.classList.add('leaders-section');
        this.usersOnPage = 6;

    }

    show () {
        Bus.emit('get-users', this);
        super.show();
    }

    SetCountOfUsers(info){
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
        if (this.page <= (this.count - 1)/this.usersOnPage) {
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
                window.history.pushState(
                    null,
                    '',
                    `/leaders?page=${this.page}`
                );
            });
        }

        if (this.page <= (this.count - 1)/this.usersOnPage){
            nextButton.addEventListener('click', (event) => {
                event.preventDefault();
                this.PlusPage();
                Bus.emit('new-page', this);
                window.history.pushState(
                    null,
                    '',
                    `/leaders?page=${this.page}`
                );
            });
        }
    
        const home = this.el.getElementsByClassName('board__header__home-button')[0];
        if (home !== undefined) {
            home.addEventListener('click', (event) => {
                event.preventDefault();
                Bus.emit('open-menu');
            });
        }
    }
}

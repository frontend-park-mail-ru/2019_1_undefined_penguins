import BaseView from './BaseView.js';
import Bus from '../scripts/EventBus.js';
import BoardTmpl from '../components/Board/Board.tmpl.xml';

// const templateFunc = window.fest['components/Board/Board.tmpl']

export default class ScoreboardView extends BaseView {
    constructor(el) {
        super(el);
        this.users = null;
        this.page = new URLSearchParams(document.location.search).get('page');
        if (this.page === null || this.page < 0) {
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
        if (Math.ceil(this.count/this.usersOnPage) < this.page) {
            this.page = Math.ceil(this.count/this.usersOnPage);
            Bus.emit('new-page', this);
            window.history.pushState(
                null,
                '',
                `/leaders?page=${this.page}`
            );
        }
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
        if (this.count === undefined) {
            Bus.emit('get-users', this);
        }
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
                console.log(this.GetPage());
                if (this.GetPage() === 1) {
                    this.uri = 'leaders';
                } else {
                    this.uri = `/leaders?page=${this.page}`;
                }
                window.history.pushState(
                    null,
                    '',
                    // `/leaders?page=${this.page}`,
                    this.uri,
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
                this.page = 1;
                event.preventDefault();
                Bus.emit('open-menu');
            });
        }
    }
}

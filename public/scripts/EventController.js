import Bus from './EventBus.js';
import UserModel from '../modules/UserModel.js';
import Router from './Router.js';
import Game from '../game/Game.js';
import { STRATEGIES } from '../utils/strategies.js';
import { EVENTS } from '../utils/events.js';

export default class EventController {
    static Init () {
        Bus.on('check-autorized', () => {
            UserModel.CheckAuthorized();
        });

        Bus.on('select-menu-header', (menu) => {
            menu.RenderHeader(UserModel.IsAutorised());
        });

        Bus.on('sign-in', (el) => {
            UserModel.SignIn(el);
        });

        Bus.on('sign-up', (el) => {
            UserModel.SignUp(el);
        });

        Bus.on('sign-out', () => {
            UserModel.SignOut();
        });

        Bus.on('open-menu', () => {
            Router.open('/');
        });

        Bus.on('open-wait', () => {
            Router.open('/game/wait');
        });

        Bus.on('get-current-user', (profileView) => {
            profileView.SetUser(UserModel.GetUser());
        });

        Bus.on('open-profile', () => {
            Router.open('/me');
        });

        Bus.on('get-users', (leadersView) => {
            UserModel.Leaders(leadersView);
        });

        Bus.on('new-page', (leadersView) => {
            UserModel.LeadersPage(leadersView);
        });

        Bus.on('open-sign-in', () => {
            Router.open('/signIn');
        });

        Bus.on('open-sign-up', () => {
            Router.open('/signUp');
        });

        Bus.on('error-404', (el) => {
            let error = el.getElementsByClassName('error')[0];
            error.innerText = 'Неверный email или пароль!'; 
            error.classList.remove('error__hidden');
        });

        Bus.on('error-409', (el) => {
            let error = el.getElementsByClassName('error')[0];
            error.innerText = 'Такой пользователь уже существует!'; 
            error.classList.remove('error__hidden');
        });

        Bus.on('error-403', (el) => {
            let error = el.getElementsByClassName('error')[0];
            error.innerText = 'Неверный email или пароль!'; 
            error.classList.remove('error__hidden');
        });

        Bus.on('error-401', (el) => {
            let error = el.getElementsByClassName('error')[0];
            error.innerText = 'Вы не зарегистрированы!'; 
            error.classList.remove('error__hidden');
        });

        Bus.on('error-5xx', (el) => {
            let error = el.getElementsByClassName('error')[0];
            error.innerText = 'Ошибка сервера!'; 
            error.classList.remove('error__hidden');
        });

        Bus.on('error-email', (el) => {
            let error = el.getElementsByClassName('error')[0];
            error.innerText = 'Некорректный email!'; 
            error.classList.remove('error__hidden');
        });

        Bus.on('error-password', (el) => {
            let error = el.getElementsByClassName('error')[0];
            // error.innerText = "Некорректный пароль!"; 
            error.innerText = 'Длина пароля должна быть от 4 до 20 символов!';  
            error.classList.remove('error__hidden');
        });

        Bus.on('error-empty', (el) => {
            let error = el.getElementsByClassName('error')[0];
            error.innerText = 'Все поля должны быть заполнены!'; 
            error.classList.remove('error__hidden');
        });

        Bus.on('error-login', (el) => {
            let error = el.getElementsByClassName('error')[0];
            //error.innerText = "Некорректный логин!"; 
            error.innerText = 'Длина логина должна быть от 4 до 14 символов!';
            error.classList.remove('error__hidden');
        });

        Bus.on('error-equal-password', (el) => {
            let error = el.getElementsByClassName('error')[0];
            error.innerText = 'Пароли должны совпадать!'; 
            error.classList.remove('error__hidden');
        });

        Bus.on('change-profile', (view) => {
            Bus.on('redraw-profile', () => {
                view.SetUser(UserModel.GetUser());
            });
            //const form = view.el.getElementsByTagName('form')[0];
            UserModel.ChangeProfile(view.el);
        });

        Bus.on('open-win-view', (payload) => {
            UserModel.setUserScore(payload.score);
            Router.open('/game/win');
            const repeat = document.getElementsByClassName('win-main__repeat-button')[0];
            if (repeat !== undefined) {
                repeat.addEventListener('click', (event) => {
                    event.preventDefault();
                    Bus.emit(`open-${payload.mode}`);
                });
            }
        });

        Bus.on('open-lost-view', (payload) => {
            UserModel.setUserScore(payload.score);
            Router.open('/game/lost');
            const repeat = document.getElementsByClassName('lost-main__repeat-button')[0];
            if (repeat !== undefined) {
                repeat.addEventListener('click', (event) => {
                    event.preventDefault();
                    Bus.emit(`open-${payload.mode}`);
                });
            }
        });

        Bus.on('open-single', () => {
            Router.open('/single');
        });

        Bus.on('open-multi', () => {
            Router.open('/multi');
        });

        Bus.on('open-prestart-modal', (data) => {
            // Router.modal.setPayload(`Ваша роль в этой игре: ${data.role}`);
            Router.modal.setPayload(data);
            Router.modal.show('ROLE');
            const okBitton = document.getElementsByClassName('ok-button')[0];
            if (okBitton) {
                okBitton.addEventListener('click', (event) => {
                    event.preventDefault();
                    const username = data.name;
                    Bus.emit(EVENTS.NEW_ROUND, {username});
                });
            }
        });

        Bus.on(EVENTS.OPEN_GAME_VIEW, (mode) => {
            if (mode === 'MULTI') {
                Router.open('/multi');
            }
        });

        Bus.on('start-game', (view) => {
            let Strategy, login;
            if (navigator.onLine) {
                Strategy = STRATEGIES[view.getMode()];
                login = UserModel.GetUser().login;
            } else {
                Strategy = STRATEGIES['OFFLINE'];
                view.setMode('OFFLINE');
                login = 'Anonymous';
            }
            const gameCanvases = view.getCanvases();
            Bus.on('get-game-mode', (manager) => {
                manager.setMode(view.getMode());
            });
            const game = new Game(Strategy, login, gameCanvases);
            view.setGame(game);
            // Bus.off('start-game');
        });


        // TODO: Выпилить
        Bus.on(EVENTS.OPEN_FINISH_VIEW, () => {
            // console.log('finishGame', payload);
            // TODO: Открывать вью в зависимости от результата. Сделать if
            Router.open('/game/win');
            // TODO: Удалять game во вью
            
            // view.game.destroy();
            // delete view.game;

        });

        Bus.on(EVENTS.OPEN_ROUND_VIEW, (payload) => {
            // console.log('roundGame', payload);
            UserModel.setGameResult(payload);
            setTimeout(() => {
                Bus.emit(EVENTS.READY_TO_NEW_ROUND);
            }, 4500);
            Router.open('/game/newRound');
        });

        Bus.on('checkWS', (mode) => {
            UserModel.checkWS(mode);
        });
    }
}

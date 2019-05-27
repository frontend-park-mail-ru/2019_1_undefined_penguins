import Bus from '../scripts/EventBus.js';
import AjaxModule from './ajax.js';

class UserModel {
    constructor() {
        this.isAutorised = null;
        this.login = '';
        this.email = '';
        this.score = 0;
        this.avatarUrl = '';
        this.count = 0;
        this.gameResult = null;
    }

    // TODO: get user in SetUser
    SetUser(data) {
        this.isAutorised = true;
        this.email = data.email;
        this.login = data.login;
        this.score = data.score;
        if (data.avatarUrl === undefined) {
            this.avatarUrl = '/images/default.png';
        } else {
            this.avatarUrl = data.avatarUrl;
        }
        this.count = data.count;
    }

    SetUserDefault() {
        this.isAutorised = null;
        this.login = '';
        this.email = '';
        this.score = 0;
        this.avatarUrl = '';
        this.count = 0;
    }

    setUserScore(score) {
        this.score = score;
        this.count++;
    }

    GetUser() {
        return {
            email: this.email,
            login: this.login,
            score: this.score,
            avatarUrl: this.avatarUrl,
            count: this.count
        };
    }

    IsAutorised() {
        return this.isAutorised;
    }

    CheckAuthorized() {
        AjaxModule.doPromiseGet({
            path: '/me'
        })
            .then((response) => {
                // console.log(`Response status: ${response.status}`);
                if (response.status < 400) {
                    return response.json();
                }
                throw 'Bad status';
            })
            .then((data) => {
                this.SetUser(data);
                Bus.emit('authorization-checked');
            })
            .catch(() => {
                this.isAutorised = false;
                Bus.emit('authorization-checked');
            });
    }

    SignIn(el) {
        const form = el.getElementsByTagName('form')[0];

        const email = form.elements.email.value;
        const password = form.elements.password.value;

        AjaxModule.doPromisePost({
            path: '/login',
            body: {
                email,
                password,
            },
        })
            .then((data) => {
                if (data.status > 300) { 
                    throw data;
                }                
                data.json().then((data) => {
                    this.SetUser(data);
                    Bus.emit('open-menu');
                });
            })
            .catch((data) => {
                switch (data.status) {
                case 404:
                    Bus.emit('error-404', el);
                    break;
                case 500:
                    Bus.emit('error-5xx', el);
                    break;
                default:
                    // console.error;
                }
            });
    }
      
  
    SignUp(el) {
        const form = el.getElementsByTagName('form')[0];

        const email = form.elements.email.value;
        const password = form.elements.password.value;
        const login = form.elements.login.value;
      
        AjaxModule.doPromisePost({
            path: '/signup',
            body: {
                email,
                password,
                login,
            },
        })
            .then((data) => {
                if (data.status > 300) {
                    throw data;
                }
                return data.json();
            })
            .then((data) => {
                this.SetUser(data);
                Bus.emit('open-menu');
            })
            .catch((data) => {
                switch (data.status) {
                case 409:
                    Bus.emit('error-409', el);
                    break;
                case 500:
                    Bus.emit('error-5xx', el);
                    break;
                default:
                    // console.error;
                }
            });
    }

    Leaders(view) {
        AjaxModule.doPromiseGet({
            path: '/leaders/info',
        })
            .then((response)=>{
                return response.json();
            })
            .then((data)=>{
                view.SetCountOfUsers(data);
            })
            .catch(()=>{
                // console.error('Can\'t get leaders info!');
                view.StartPage();
                Bus.emit('open-menu');
                return;
            });
        this.LeadersPage(view);
    }

    LeadersPage(view){
        AjaxModule.doPromiseGet({
            path: `${'/leaders' + '/'}${view.GetPage()}`,
        })
            .then((response) => {
                // console.log(`Response status: ${response.status}`);
                return response.json();
            })
            .then((data) => {
                view.SetUsers(data);
            })
            .catch(() => {
                Bus.emit('open-menu');
                view.StartPage();
                // console.error('Can\'t get leaders!');
            });
    }
  
    SignOut() {
        AjaxModule.doPromiseGet({
            path: '/signout'
        })
            .then((response) => {
                // console.log(`Response status: ${response.status}`);
                if (response.status === 200) {
                    this.SetUserDefault();
                    Bus.emit('open-sign-in');
                }
            })
            .catch(() => {
                // console.error('Can\'t sign out!');
            });
    }

    ChangeProfile(el) {
        const form = el.getElementsByTagName('form')[0];

        const email = form.email.value;
        const login = form.login.value;
        const image = form.inputAvatar;

        if (image.value !== '') {
            const avatarData = new FormData();
            avatarData.append('avatar', image.files[0], image.value);

            const responseAvatar = this.UpdateAvatar(avatarData);

            if (responseAvatar.status !== 200) {
                // console.error('Unable to load avatar');
                // return data;
            }

            this.SetAvatar();
        }

        if ((email === this.email) && (login === this.login)) {
            // TODO: данные не обновлялись!
            return;
        }

        AjaxModule.doPromisePut({
            path: '/me',
            body: {
                email,
                login,
            },
        })
            .then((res) => {
                if (res.status > 300) {
                    throw res;
                }
                res.json().then((res) => {
                    this.SetUser(res);
                    Bus.emit('redraw-profile');
                });
            })
            .catch((data) => {
                switch (data.status) {
                case 409:
                    Bus.emit('error-409', el);
                    break;
                case 500:
                    Bus.emit('error-5xx', el);
                    break;
                default:
                    // console.error;
                }
            });
    }

    UpdateAvatar(body) {
        return AjaxModule.doPromisePost({
            path: '/upload',
            contentType: 'multipart/form-data',
            body
        });
    }

    setGameResult(data) {
        this.gameResult = data;
    }

    getGameResult() {
        return this.gameResult;
    }
}
  
export default new UserModel();

import Bus from '../scripts/EventBus.js';
import AjaxModule from './ajax.js';
import Validate from "./Validate.js";

export class UserModel {
  constructor() {
    this.isAutorised = null;
    this.login = '';
    this.email = '';
    this.score = 0;
    this.avatarUrl = '';
    this.count = 0;
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

  GetUser() {
    return {
      email: this.email,
      login: this.login,
      score: this.score,
      avatarUrl: this.avatarUrl,
      count: this.count,
    };
  }

  IsAutorised() {
    return this.isAutorised;
  }

  CheckAuthorized() {
    AjaxModule.doPromiseGet({
      path: '/me',
    })
      .then((response) => {
        console.log(`Response status: ${response.status}`);
        if (response.status === 200) {
          response.json().then((data) => {
            this.SetUser(data);
            Bus.emit('authorization-checked');
          });
        } else if (response.status === 401) {
          this.isAutorised = false;
          Bus.emit('authorization-checked');
        } else {
          // TODO: отрисовать кастомно ошибульку (страница не рендерится!)
          throw 'Unknown response';
        }
      })
      .catch(() => {
        // TODO: рендер ошибки
        console.log('Profile promise fall down :(');
      });
  }

  SignIn(el) {
    const form = el.getElementsByTagName('form')[0];

    const email = form.elements.email.value;
    const password = form.elements.password.value;

    //const viewForm = document.getElementsByClassName('signin-content')[0];

    AjaxModule.doPromisePost({
            path: '/login',
            body: {
                email,
                password,
            },
            })
            .then((data) => {
              console.log(`Response status: ${data.status}`);
                if (data.status > 300) { 
                    throw data;
                }                
                data.json().then((data) => {
                  this.SetUser(data);
                  Bus.emit('open-menu');
                })
            })
            .catch(() => {
              switch (data.status) {
                case 404:
                  Bus.emit('error-404', el);
                  break;
                case 500:
                  Bus.emit('error-5xx', el);
                  break;
                default:
                  console.error;
              }
          });
}
      
  
  SignUp(el) {
      const form = el.getElementsByTagName('form')[0];

      const email = form.elements.email.value;
      const password = form.elements.password.value;
      const login = form.elements.login.value;

      //const viewForm = document.getElementsByClassName('sign-up-content')[0];
      
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
              },
            )
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
                    console.error;
                }
          });
  }

  Leaders(view, page) {
    if (page > 0) {
      view.PlusPage();
    } else if (page < 0) {
      view.MinusPage();
    }
    AjaxModule.doPromiseGet({
      path: `${'/leaders' + '/'}${view.GetPage()}`,
    })
      .then((response) => {
        console.log(`Response status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        view.SetUsers(data);
      })
      .catch(() => {
        console.error("Can't get leaders!");
      });
  }

  SignOut() {
    AjaxModule.doPromiseGet({
      path: '/signout',
    })
      .then((response) => {
        console.log(`Response status: ${response.status}`);
        if (response.status === 200) {
          this.SetUserDefault();
          Bus.emit('open-sign-in');
        }
      })
      .catch(() => {
        console.error("Can't sign put!");
      });
  }

  ChangeProfile(el) {
    const form = el.getElementsByTagName('form')[0];

    const email = form.email.value;
    const login = form.login.value;
    const image = form.inputAvatar;

    //const viewForm = document.getElementsByClassName('profile-content')[0];

    if (image.value !== '') {
      console.log(image.files[0]);
      const avatarData = new FormData();
      avatarData.append('avatar', image.files[0], image.value);

      const responseAvatar = this.UpdateAvatar(avatarData);

      if (responseAvatar.status !== 200) {
        console.error('Unable to load avatar');
        // return data;
      }
    }

    AjaxModule.doPromisePut({
      path: '/change_profile',
      body: {
        email,
        login,
      },
    })
      .then((res) => {
        console.log(res);
        if (data.status > 300) {
          throw data;
        }
        res.json().then((res) => {
          this.SetUser(res);
          Bus.emit('redraw-profile');
        });
      })
      .catch(() => {
        switch (data.status) {
          case 409:
            Bus.emit('error-409', el);
            break;
          case 500:
            Bus.emit('error-5xx', el);
            break;
          default:
            console.error;
        }
      });
  }

  UpdateAvatar(body) {
    return AjaxModule.doPromisePost({
      path: '/upload',
      contentType: 'multipart/form-data',
      body,
    });
  }
}

export default new UserModel();

import Bus from "../scripts/EventBus.js";

export class UserModel {
    constructor() {
        this.isAutorised = null;
        this.name = "";
        this.login = "";
        this.score = 0;
    }

    // TODO: get user in SetUser
    SetUser(data){
        this.isAutorised = true;
        this.name = data.name;
        this.login = data.login;
        this.score = data.score;
    }

    IsAutorised() {
        return this.isAutorised;
    }

    CheckAuthorized() {
        AjaxModule
        .doPromisePost({
            path: '/logged'
        })
        .then(function (res) {
            return res.status
        })
        .then((status) => {
            if (status == 200) {
                // TODO: другой способ сказать, что юзер есть
                this.isAutorised = true;
            }
        }) 
    }

    SignIn(form) {
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
                    throw new Error('Network response was not ok.');
                }
                return data.json();
            })
            .then((data) => {
                this.SetUser(data);
                Bus.emit('open-menu');
            })
            .catch(() => {
                // TODO: написать, что такого юзера нетю
                console.log('SignIn promise fall down :(');
            });
    }
    
    SignUp(form) {
        const email = form.elements.email.value;
        const password = form.elements.password.value;

        AjaxModule.doPromisePost({
            path: '/signup',
            body: {
              email,
              password,
            },
          })
            .then((data) => {
                if (data.status > 300) {
                  throw new Error('Network response was not ok.');
                }
                return data.json();
              },
            )
            .then((data) => {
                this.SetUser(data);
                Bus.emit('open-menu');
            })
            .catch(() => {
                // TODO: написать, что есть ошибки в регистрации
                console.error;
            });
    }

    Profile() {
       //TODO: чекнуть check-autorized
            AjaxModule.doPromiseGet({
                path: '/me',
              })
                .then((response) => {
                  console.log(`Response status: ${response.status}`);
                  return response.json();
                })
                .then((user) => {
                  console.log(user);
                  this.SetUser(user);
                  Bus.emit('open-profile');
                })
                .catch(() => {
                  // TODO: написать, что такого юзера нетю
                    console.log('Profile promise fall down :(');
                });
    }
}

export default new UserModel;
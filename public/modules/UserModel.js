import Bus from "../scripts/EventBus.js";
export class UserModel {
   constructor() {
      this.isAutorised = null;
      this.login = "";
      this.email = "";
      this.score = 0;
      this.avatarUrl = "";
      this.count = 0;
  }

  // TODO: get user in SetUser
  SetUser(data){
      this.isAutorised = true;
      this.email = data.email;
      this.login = data.login;
      this.score = data.score;
      if (data.avatarUrl === undefined) {
        this.avatarUrl = "/images/default.png";
      }
      this.avatarUrl = data.avatarUrl;
      this.count = 0;
  }

  SetUserDefault() {
      this.isAutorised = null;
      this.login = "";
      this.email = "";
      this.score = 0;
      this.avatarUrl = "";
      this.count = 0;

  }

  GetUser(){
    return {
      email: this.email,
      login: this.login,
      score: this.score,
      avatarUrl: this.avatarUrl,
      count: this.count,
    }
}

  IsAutorised() {
        return this.isAutorised;
    }

  // SetAutorised() {
  //     this.isAutorised = true;
  // }

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
            })
          } else if (response.status === 401) {
            this.isAutorised = false;      
            Bus.emit('authorization-checked');
          } else {
            //TODO: отрисовать кастомно ошибульку (страница не рендерится!)
            throw "Unknown response"; 
          }
      })
      .catch(() => {
          //TODO: рендер ошибки
          console.log('Profile promise fall down :(');
      });
      // AjaxModule
      // .doPromisePost({
      //     path: '/logged'
      // })
      // .then(function (res) {
      //     return res.status
      // })
      // .then((status) => {
      //     if (status == 200) {
      //         // TODO: другой способ сказать, что юзер есть
      //         this.isAutorised = true;
      //     }
      // }) 
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
              console.log(`Response status: ${data.status}`);
                if (data.status > 300) {
                    // TODO: написать, что такого юзера нетю
                    throw new Error('Network response was not ok.');
                }
                
                // data.text().then((data) => {
                //   console.log(data);
                // })
                this.SetUser(data);
                Bus.emit('open-menu');
            })
            .catch(() => {
                console.log('SignIn promise fall down :(');
          });
  }
      
  
  SignUp(form) {
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
    // console.log(this);
      // //TODO: чекнуть check-autorized
      //     AjaxModule.doPromiseGet({
      //         path: '/me',
      //       })
      //         .then((response) => {
      //           console.log(`Response status: ${response.status}`);
      //           return response.json();
      //         })
      //         .then((user) => {
      //           console.log(user);
      //             this.SetUser(user);
      //           Bus.emit('open-profile');
      //         })
      //         .catch(() => {
      //             // TODO: написать, что такого юзера нетю
      //             console.log('Profile promise fall down :(');
      //         });
      // Bus.emit('open-profile');
  }


  Leaders(view, page) {
    if (page > 0) {
      view.PlusPage()
    } else if (page < 0) {
      view.MinusPage()
    }
    AjaxModule.doPromiseGet({
      path: '/leaders' + '/' + view.GetPage(),
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
}

export default new UserModel;
import BaseView from './BaseView.js';
import Bus from '../scripts/EventBus.js';

const templateFunc = window.fest['components/SignIn/SignIn.tmpl'];


export default class SignInView extends BaseView {
    constructor(el) {
        super(el);
    }

    show() {
        super.show();
    }

    render() {
        this.el.innerHTML = '';
        this.el.innerHTML = templateFunc();



        const form = this.el.getElementsByTagName('form')[0];

        form.addEventListener('submit', (event) => {
            const err = this.el.getElementsByTagName('span')[0];
            err.innerText = '';
            event.preventDefault();

            console.log('hello');

            const email = form.elements.email.value;
            const password = form.elements.password.value;


            AjaxModule.doPromisePost({
                path: '/login',
                body: {
                    email,
                    password,
                },
                })
                .then(
                    (data) => {
                        console.log(JSON.stringify(data));
                        if (data.status > 300) {
                            throw new Error('Network response was not ok.');
                        }
                        return data;
                    },
                )
                .then(() => {
                    application.innerHTML = '';
                    console.log("beeeeee");
                    Bus.emit('fetch-user');
                })
                .catch(() => {
                    const err = document.getElementsByTagName('span')[0];
                    err.classList.add('errorLabel');
                    err.innerText = "Такого пользователя не существует!";
                });
        
            });
	}
}
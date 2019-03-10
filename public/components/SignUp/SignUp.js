/** Класс компонента регистрации */

export class SignUpComponent{

     /**
     * Конструктор компонента регистрации.
     * @param el - Тело документа
     */
    constructor({
        el = document.body,
    } = {}) {
        this._el = el;
        this._status = 200;
    }
        /**
         * Рендеринг header.
         * @return   headerSection

            */
    _renderHeader() {        	
        const headerSection = document.createElement('section');
        headerSection.dataset.sectionName = 'header';

        const goBack = document.createElement('div');
        goBack.id = 'goBack';

        const img = document.createElement('img');
        img.src = '../../images/home.png';
        goBack.appendChild(img);

        const title = document.createElement('div');
        title.id = 'title';
        const text = document.createElement('h2');
        text.textContent = 'Зарегистрироваться';
        title.appendChild(text);
        

        headerSection.appendChild(goBack);
        headerSection.appendChild(title);

        return headerSection;
    }
       /**
         * Рендеринг тела.
         * @return   mainSection

         */
    _renderBody(){
        const mainSection = document.createElement('section');
        mainSection.dataset.sectionName = 'main';
        const form = document.createElement('form');
        const err = document.createElement('span');
        err.classList.add('errorLabel');
        const inputs = [
            {
                name: 'email',
                type: 'email',
                placeholder: 'Email'
            },
            {
                name: 'password',
                type: 'password',
                placeholder: 'Password'
            },
            {
                name: 'password_repeat',
                type: 'password',
                placeholder: 'Repeat Password'
            },
            {
                name: 'submit',
                type: 'submit'
            }
        ];

        inputs.forEach(function (item) {
            const input = document.createElement('input');

            input.name = item.name;
            input.type = item.type;

            input.placeholder = item.placeholder;

            form.appendChild(input);
            form.appendChild(document.createElement('br'));
        });

        
        mainSection.appendChild(form);
        mainSection.appendChild(err);

        let status = 200;
        form.addEventListener('submit', function (event) {
            err.innerText = '';
            event.preventDefault();
    
            const email = form.elements[ 'email' ].value;
            const password = form.elements[ 'password' ].value;
            const password_repeat = form.elements[ 'password_repeat' ].value;
            form.elements[ 'email' ].classList.remove('errorInput');
            form.elements[ 'password' ].classList.remove('errorInput');
            form.elements[ 'password_repeat' ].classList.remove('errorInput');
            
            let errorString;
            
            if(
                email.localeCompare("") === 0 || 
                password.localeCompare("") === 0 ||
                password !== password_repeat
            ){
                errorString = 'Вы не ввели следующие поля:\n'
                if (email.localeCompare("") === 0) {
                    errorString = `${errorString}email\n`;
                    form.elements[ 'email' ].classList.add('errorInput');
                }
                if (password.localeCompare("") === 0 || !password.match(/^\S{4,}$/)) {
                    errorString = `${errorString}пароль\n`;
                    form.elements[ 'password' ].classList.add('errorInput');
                    form.elements[ 'password_repeat' ].classList.add('errorInput');

                }
                if (password !== password_repeat) {
                    errorString = `${errorString}Пароли не совпадают\n`;
                    form.elements[ 'password' ].classList.add('errorInput');
                    form.elements[ 'password_repeat' ].classList.add('errorInput');
    
                    this._status = 300;
                    return;
                }
                err.innerText = errorString;
                this._status = 300;
                return;
            }
    
            
        
        }.bind(this));
        return mainSection;    
    }
    /**
         * Установка значения status.
         * @param status Значение, устанавливающееся в status
         */
    set status(status) {
        this._status = status;
    }
	/**
			 * Возврат значения status.
			 * @return  Значение status
			 */
    get status() {
        return this._status;
    }
       /**
         * Рендеринг страницы.
         */
    render(){
        const head = this._renderHeader();
        const body = this._renderBody();

        this._el.appendChild(head);
        this._el.appendChild(body);
    }
}

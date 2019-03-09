


export class SignInComponent{
    constructor({
        el = document.body,
    } = {}) {
        this._el = el;
        this._status = 200;
    }

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
        text.textContent = 'Войти';
        title.appendChild(text);
        

        headerSection.appendChild(goBack);
        headerSection.appendChild(title);

        return headerSection;
    }

    _renderBody(){
        const mainSection = document.createElement('section');
        mainSection.dataset.sectionName = 'main';

        const form = document.createElement('form');

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
        form.addEventListener('submit', function (event) {
            event.preventDefault();
    
            const email = form.elements[ 'email' ].value;
            const password = form.elements[ 'password' ].value;
            if(
                email.localeCompare("") === 0 || 
                password.localeCompare("") === 0
            ){
                var errorString = 'Вы не ввели следующие поля:\n'
                if (email.localeCompare("") === 0) {
                    errorString += 'email\n'
                }
                if (password.localeCompare("") === 0) {
                    errorString += 'пароль\n'
                }
                alert(errorString);
                this._status = 300;
                return;
            }
        }.bind(this));
        return mainSection
        
    }


    set status(status) {
        this._status = status;
    }

    get status() {
        return this._status;
    }

    render(){
        const head = this._renderHeader();
        const body = this._renderBody();

        this._el.appendChild(head);
        this._el.appendChild(body);
    }
}

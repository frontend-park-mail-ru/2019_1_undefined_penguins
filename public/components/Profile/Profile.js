import {RENDER_TYPES} from '../../utils/constants.js';
export class ProfileComponent {
    constructor({
        el = document.body,
        type = RENDER_TYPES.DOM,
    } = {}) {
        this._el = el;
        this._type = type;
        this._avatarName = "";
        this._avatarBlob = "";
    }
	/**
     * Возврат значения data.
     * @return  Значение data
     */
    get data() {
		return this._data;
	}
    /**
     * Установка значения data.
     * @param d - Входные данные
     */
	set data(d = []) {
		this._data = d;
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
        // goBack.classList = '.go-back';

        //todo
        const img = document.createElement('img');
        img.src = '../../images/home.png';
        goBack.appendChild(img);
        //end todo

        const title = document.createElement('div');
        title.id = 'title';
        // title.classList = '.title';
        const text = document.createElement('h2');
        text.textContent = 'Профиль игрока';
        title.appendChild(text);
        

        headerSection.appendChild(goBack);
        headerSection.appendChild(title);

        return headerSection;
    }
  
    /**
     * Рендеринг тела.
     * @return   mainSection
     */
    _renderBody() {
        const mainSection = document.createElement('section');
        mainSection.dataset.sectionName = 'main_profile';

        const form = document.createElement('form');
        form.classList = 'profile_form';
        form.enctype = "multipart/form-data";

        const dataInline = document.createElement('div');
        dataInline.classList = 'data_inline';

        const avatar = document.createElement('img');
        avatar.classList = 'avatar';
        avatar.src = this._data.avatarBlob;

        const data = document.createElement('div');
        data.classList = 'data';

        const inputs = [
            {
                name: 'login',
                type: 'text',
                title: 'Логин: ',
                value: this._data.login
            },
            {
                name: 'name',
                type: 'text',
                title: 'Имя: ',
                value: this._data.name
            },
            {
                name: 'email',
                type: 'email',
                title: 'Email: ',
                value: this._data.email
            }
        ];

        inputs.forEach(function (item) {
            const inputString = document.createElement('div');
            const label = document.createElement('label');
            label.textContent = item.title;

            const input = document.createElement('input');
            input.name = item.name;
            input.type = item.type;
            input.value = item.value;

            inputString.appendChild(label);
            inputString.appendChild(input);
            data.appendChild(inputString);
        });

        dataInline.appendChild(avatar);
        dataInline.appendChild(data);

        const infoInline = document.createElement('div');
        infoInline.classList = 'data_inline info';

        const info = [
            {
                name: 'Лучший результат:',
                data: this._data.score
            },
            {
                name: 'Последняя игра:',
                data: this._data.lastVisit
            }
        ];

        info.forEach(function (item) {
            const div = document.createElement('div');
            div.classList = 'info_block';

            const labelTitle = document.createElement('label');
            labelTitle.textContent = item.name;

            const labelInfo = document.createElement('label');
            labelInfo.textContent = item.data;

            div.appendChild(labelTitle);
            div.appendChild(labelInfo);
            infoInline.appendChild(div);
        });
        form.appendChild(dataInline);

        const button = document.createElement('input');
        button.name = 'save';
        button.type = 'submit';
        button.value = 'Сохранить';
        
        const inputAvatar = document.createElement('input');
        inputAvatar.name = 'inputAvatar';
        inputAvatar.type = 'file';
        inputAvatar.accept = 'image/*';
        inputAvatar.classList = "inputAvatar";

        inputAvatar.addEventListener('change', (event) => {
            event.preventDefault();

            let reader = new FileReader();
            let file = event.target.files[0];

            reader.onloadend = () => {
                this._avatarName = file.name;
                this._avatarBlob = reader.result;
            };
            reader.readAsDataURL(file);
        }, false)

        form.appendChild(inputAvatar);
        form.appendChild(button);
        form.appendChild(infoInline);

        form.addEventListener('submit', function (event) {
            event.preventDefault();
    
            const userAvatar = document.getElementsByClassName('inputAvatar')[0].files[0];
            const email = form.elements[ 'email' ].value;
            const login = form.elements[ 'login' ].value;
            const name = form.elements[ 'name' ].value;

            if (
                    email.localeCompare("") === 0 || 
                    login.localeCompare("") === 0 ||
                    name.localeCompare("") === 0
                ) {
                    let errorString = 'Вы не ввели следующие поля:\n';
                    if (email.localeCompare("") === 0) {
                        errorString = `${errorString}email\n`;
                        form.elements[ 'email' ].classList.add('errorInput');
                    }
                    if (login.localeCompare("") === 0) {
                        errorString = `${errorString}логин\n`;
                        form.elements[ 'login' ].classList.add('errorInput');
                    }
                    if (name.localeCompare("") === 0) {
                        errorString = `${errorString}имя\n`;
                        form.elements[ 'name' ].classList.add('errorInput');
                    }
                    
                    err.innerText = errorString;
                    return;
                }

            if (userAvatar.size > 70000) {
                alert('photo is very large (70Кб)!!');
                return;
            }
          
            const avatarName = this._avatarName;
            const avatarBlob = this._avatarBlob;

            AjaxModule.doPromisePost({
                path: '/change_profile',
                body: {
                    email: email,
                    login: login,
                    name: name,
                    avatarName: avatarName,
                    avatarBlob: avatarBlob
                },	
            })
            .then (
                (res) => {
                    console.log(res);
                    if(res.status > 400) {
                        throw new Error('Network response was not ok.'); 
                    }
                    return res.json(); 
                })
            .then( (res) => {
                avatar.src = res.result;
            })
            .catch( () => {
                console.error;
                application.innerHTML = '';
                alert('ERROR');
            }); 
        }.bind(this));

        mainSection.appendChild(form);

        return mainSection;
    }   
    /**
     * Рендеринг страницы.
     */
    render() {
        switch(this._type) {
            case RENDER_TYPES.DOM:
                const head = this._renderHeader();
                const body = this._renderBody();
                this._el.appendChild(head);
                this._el.appendChild(body);
            	break;
            case RENDER_TYPES.TMPL:
                this._renderTmpl();

                let inputAvatar = this._el.getElementsByClassName('inputAvatar')[0];
                inputAvatar.addEventListener('change', (event) => {
                    event.preventDefault();
        
                    let reader = new FileReader();
                    let file = event.target.files[0];
        
                    reader.onloadend = () => {
                        this._avatarName = file.name;
                        this._avatarBlob = reader.result;
                    };
                    reader.readAsDataURL(file);
                }, false)

                let form = this._el.getElementsByTagName('form')[0];

                form.addEventListener('submit', function (event) {
                    event.preventDefault();
            
                    const userAvatar = document.getElementsByClassName('inputAvatar')[0].files[0];
                    const email = form.elements[ 'email' ].value;
                    const login = form.elements[ 'login' ].value;
                    const name = form.elements[ 'name' ].value;
        
                    if (
                            email.localeCompare("") === 0 || 
                            login.localeCompare("") === 0 ||
                            name.localeCompare("") === 0
                        ) {
                            let errorString = 'Вы не ввели следующие поля:\n';
                            if (email.localeCompare("") === 0) {
                                errorString = `${errorString}email\n`;
                                form.elements[ 'email' ].classList.add('errorInput');
                            }
                            if (login.localeCompare("") === 0) {
                                errorString = `${errorString}логин\n`;
                                form.elements[ 'login' ].classList.add('errorInput');
                            }
                            if (name.localeCompare("") === 0) {
                                errorString = `${errorString}имя\n`;
                                form.elements[ 'name' ].classList.add('errorInput');
                            }
                            
                            err.innerText = errorString;
                            return;
                        }

        
                    const avatarName = this._avatarName;
                    const avatarBlob = this._avatarBlob;
        
                    AjaxModule.doPromisePost({
                        path: '/change_profile',
                        body: {
                            email: email,
                            login: login,
                            name: name,
                            avatarName: avatarName,
                            avatarBlob: avatarBlob
                        },	
                    })
                    .then (
                        (res) => {
                            // console.log(JSON.stringify(res));
                            console.log(res);
                            if(res.status > 400) {
                                throw new Error('Network response was not ok.'); 
                            }
                            return res.json(); 
                        })
                    .then( (res) => {
                        let avatar = this._el.getElementsByClassName('avatar')[0];
                        avatar.src = res.result;
                    })
                    .catch( () => {
                        console.error;
                        application.innerHTML = '';
                        alert('ERROR');
                    }); 
                }.bind(this));
                
            	break;
        }
    }
}
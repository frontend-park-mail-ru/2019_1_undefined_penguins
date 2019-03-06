export class ProfileComponent {
    constructor({
        el = document.body,
    } = {}) {
        this._el = el;
    }

    get data() {
		return this._data;
	}

	set data(d = []) {
		this._data = d;
    }
    
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

    _renderBody() {
        const mainSection = document.createElement('section');
        mainSection.dataset.sectionName = 'main_profile';

        const form = document.createElement('form');
        form.classList = 'profile_form';

        const dataInline = document.createElement('div');
        dataInline.classList = 'data_inline';

        const avatar = document.createElement('img');
        avatar.classList = 'avatar';
        avatar.src = '././images/user.svg';

        const data = document.createElement('div');
        data.classList = 'data';

        const inputs = [
            {
                name: 'login',
                type: 'text',
                title: 'Логин: ',
                value: 'Peguin'
            },
            {
                name: 'name',
                type: 'text',
                title: 'Имя: ',
                value: 'Петя'
            },
            {
                name: 'email',
                type: 'email',
                title: 'Email: ',
                value: 'ex@mail.ru'
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
            // data.appendChild(document.createElement('br'));
        });

        dataInline.appendChild(avatar);
        dataInline.appendChild(data);

        const infoInline = document.createElement('div');
        infoInline.classList = 'data_inline info';

        const info = [
            {
                name: 'Лучший результат:',
                data: '257'
            },
            {
                name: 'Последняя игра:',
                data: '25.01'
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

        const button = document.createElement('input');
        button.name = 'save';
        button.type = 'submit';
        button.value = 'Сохранить'; form.appendChild(dataInline);

        form.appendChild(button);
        form.appendChild(infoInline);

        mainSection.appendChild(form);

        return mainSection;
    }   

    render() {
        const head = this._renderHeader();
        const body = this._renderBody();

        this._el.appendChild(head);
        this._el.appendChild(body);
    }

}
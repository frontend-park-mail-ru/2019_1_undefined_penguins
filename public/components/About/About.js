import {RENDER_TYPES} from '../../utils/constants.js';
export class AboutComponent {
    constructor({
        el = document.body,
        type = RENDER_TYPES.TMPL,
    } = {}) {
        this._el = el;
        this._type = type;
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
        text.textContent = 'Об игре';
        title.appendChild(text);
        

        headerSection.appendChild(goBack);
        headerSection.appendChild(title);

        return headerSection;
    }

    _createTextBlock(el, content) {
        const _title = document.createElement('h3');
        const _content =  document.createElement('div');

        _title.textContent = content.title;
        _content.textContent = content.text;

        el.appendChild(_title);
        el.appendChild(_content);
    }

    _createBlock(el, content) {
        const _title = document.createElement('h3');
        const _content =  document.createElement(content.el);

        _title.textContent = content.title;
        _content.setAttribute(content.attr, content.value);

        el.appendChild(_title);
        el.appendChild(_content);
    }
    
    _renderBody() {
        const mainSection = document.createElement('section');
        mainSection.dataset.sectionName = 'main';
    
        const idea = document.createElement('div');
        idea.id = 'idea';
        idea.classList = 'text-area';

        const ideaText = {
            title: 'Идея',
            text: 'Abusus non tollit usum. Accepto damno. Accessio cedit principali. Actio bonae fidei. Actio in factum concepta. Actio in ius concepta.  Actio in personam. Actio in rem. Actio noxalis. Actio poenalis. Alibi. A potiori. Argumenta ponderantur, non numerantur. Argumentum ad oculos.'
        } 
        this._createTextBlock(idea, ideaText);

    
        const howPlay = document.createElement('div');
        howPlay.id = 'howPlay';
        howPlay.classList = 'text-area';

        const playText = {
            title: 'Как играть',
            text: 'Abusus non tollit usum. Accepto damno. Accessio cedit principali. Actio bonae fidei. Actio in factum concepta. Actio in ius concepta.  Actio in personam. Actio in rem. Actio noxalis. Actio poenalis. Alibi. A potiori. Argumenta ponderantur, non numerantur. Argumentum ad oculos.'
        } 
        this._createTextBlock(howPlay, playText);


        const tutorial = document.createElement('div');
        tutorial.id = 'tutorial';

        const tutorialDesktop = document.createElement('div');
        tutorialDesktop.id = 'desktop';
        const tutorialMobile = document.createElement('div');
        tutorialMobile.id = 'mobile';

        const tutorialContentDesktop = {
            title: 'Desktop',
            el: 'img',
            attr: 'src', 
            value: '../../images/game1.svg'
        } 
        const tutorialContentMobile = {
            title: 'Mobile',
            el: 'img',
            attr: 'src', 
            value: '../../images/game1.svg'
        }
        this._createBlock(tutorialDesktop, tutorialContentDesktop);        
        this._createBlock(tutorialMobile, tutorialContentMobile);
        
        tutorial.appendChild(tutorialDesktop);
        tutorial.appendChild(tutorialMobile);
        howPlay.appendChild(tutorial);
        
        mainSection.appendChild(idea);
        mainSection.appendChild(howPlay);
    
        return mainSection;
    }

    _renderTmpl() {
		this._el.innerHTML = window.fest['components/About/About.tmpl']();
	}

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
            	break;
        }
    }
}

export class MenuComponent {
    constructor({
        el = document.body,
    } = {}) {
        this._el = el;
    }

    get header() {
        return this._header;
    }

    set header(data = "") {
        this._header = data; 
    }


    ////////////////////////////////////

    // createMenuLink() {
    //     const menuLink = document.createElement('a');
    //     menuLink.href = menuLink.dataset.href = 'menu';
    
    //     menuLink.textContent = 'Back to main menu';
    
    //     return menuLink;
    // }
    
    // createMenuButton(header, text, href) {
    //     const buttonDiv = document.createElement('div');
    //     buttonDiv.classList = 'buttons';
        
    //     const a = document.createElement('a');
    
    //     a.textContent = header;
    //     a.href = href;
    //     a.dataset.href = href;
    
    //     buttonDiv.appendChild(a);
    
    //     return buttonDiv;
    // }

    // ////////////////////////////////////////

    _renderHeader() {
        const headerSection = document.createElement('section');
        headerSection.dataset.sectionName = 'header';

        const logo = document.createElement('div');
        logo.id = 'logo';
        const logoHeader = document.createElement('h1');
        logoHeader.textContent = this._header;
        logo.appendChild(logoHeader);
    
        const auth = document.createElement('div');
        auth.id = 'auth';
    
        const authTitles = {
            signIn: 'Sing In',
            signUp: 'Sign Up'
        };
    
        Object.entries(authTitles).forEach(function (entry) {
            const href = entry[0];
            const title = entry[1];
    
            const a = document.createElement('a');
            a.textContent = title;
            a.href = href;
            a.dataset.href = href;
            a.classList.add('auth-button');
    
            auth.appendChild(a);
        });	
    
        headerSection.appendChild(logo);
        headerSection.appendChild(auth);

        return headerSection;
    }
    
    _renderBody() {
        const mainSection = document.createElement('section');
        mainSection.dataset.sectionName = 'main';
    
        const menu = document.createElement('div');
        menu.id = 'menu';
        const picture = document.createElement('div');
        picture.id = 'pictures';
        
        const buttons = {
            singlePlayer: { 
                header: 'Singleplayer', 
                text: 'reheh'
            },
            multiPlayer: { 
                header: 'Multiplayer', 
                text: 'wjrwy'
            },
            leaders: { 
                header: 'Leaders', 
                text: 'srtaa'
            },
            about: {  
                header: 'About', 
                text: 'etjaae'
            },
        };
    
        Object.entries(buttons).forEach(function (entry) {
            const href = entry[0];
            const header =  entry[1].header;
            const text =  entry[1].text;

            // todo

            const buttonDiv = document.createElement('div');
            buttonDiv.classList = 'buttons';
            
            const a = document.createElement('a');
        
            a.textContent = header;
            a.href = href;
            a.dataset.href = href;
        
            buttonDiv.appendChild(a);
            
            // end_todo

            menu.appendChild(buttonDiv);
        });
        
        mainSection.appendChild(menu);
        
        return mainSection;
    }

    render() {
        const head = this._renderHeader();
        const body = this._renderBody();

        this._el.appendChild(head);
        this._el.appendChild(body);
    }
}

	


export default class ChatComponent {
    constructor(el) {
        this.el = el;
        this.width = 400;
        this.height = 400;
        this.chat = null;
    }

    show() {
        // TODO: make modificator class 
        this.chat.style = "display: block";
    }

    hide() {
        // TODO: make modificator class 
        this.chat.style = "display: none";
    }

    render() {
        this.el.innerHTML = '';

        this.chat = document.createElement('div');
        this.chat.className = 'chat-block';

        this.hide();

        const chatHead = document.createElement('div');
        chatHead.className = 'chat-block__head';

        const chatTitle = document.createElement('div');
        chatTitle.innerText = "Penguins Chat";
        chatTitle.className = 'chat-block__title';
        chatHead.appendChild(chatTitle);

        const chatClose = document.createElement('img');
        chatClose.src = "/images/cancel.svg";
        chatClose.className = 'chat-block__close js-button';
        chatHead.appendChild(chatClose);

        this.chat.appendChild(chatHead);

        const iframeDiv = document.createElement('div');
        iframeDiv.className = 'chat-block__iframe-block';
        
        const iframe = document.createElement('iframe');
        iframe.setAttribute('width', '380');
        iframe.setAttribute('height', '380');
        iframe.setAttribute('src', '/chat/chat.html');
        iframe.className = 'iframe-block__iframe';
        iframeDiv.appendChild(iframe);
        this.chat.appendChild(iframeDiv);

        this.el.appendChild(this.chat);
    }
}

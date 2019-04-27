export default class ChatComponent {
    constructor(el) {
        this.el = el;
        this.width = 400;
        this.height = 400;
        this.chat = null;
    }

    show() {
        console.log("SHOW CHAT");
        this.chat.hidden = false;
    }

    hide() {
        this.chat.hidden = true;
    }

    render() {
        this.el.innerHTML = '';

        this.chat = document.createElement('div');
        this.chat.className = 'chat-block';

        // TODO: hide before push a button
        // this.hide();

        const chatHead = document.createElement('div');
        chatHead.className = 'chat-block__head';
        chatHead.innerText = "Penguins Chat";
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

import BaseView from './BaseView.js';
import WS from '../chat/ChatWebSocket.js';
import Bus from '../scripts/EventBus.js';

export default class ChatView extends BaseView {
  constructor(el) {
    super(el);
  }

  show() {
    super.show();
  }

  render() {
    this.el.innerHTML = '';
    const mainSection = document.createElement('div');
    mainSection.id = 'chat';

    const messages = document.createElement('div');
    messages.classList.add('chat__messages-block');
    mainSection.appendChild(messages);

    const form = document.createElement('form');
    form.classList.add('chat__form');

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Напишите сообщение...';
    input.classList.add('chat_input-message');
    form.appendChild(input);

    const button = document.createElement('input');
    button.type = 'submit';
    button.classList.add('chat_input-submit');
    button.value = 'Отправить';
    form.appendChild(button);

    mainSection.appendChild(form);
    this.el.appendChild(mainSection);
    this.start();
  }

  appendMessages(item) {
    const messages = document.getElementsByClassName('chat__messages-block')[0];
    var doScroll = messages.scrollTop > messages.scrollHeight - messages.clientHeight - 1;
    messages.appendChild(item);
    if (doScroll) {
        messages.scrollTop = messages.scrollHeight - messages.clientHeight;
    }
  }
  start() {
    const newMessage = document.getElementsByClassName('chat_input-message')[0];
    const form = document.getElementsByClassName('chat__form')[0];

    const ws = new WS('chat');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        if (!ws) {
            return;
        }

        if (!newMessage.value) {
            return;
        }

        // TODO: chech valid user
        // console.log('MESSAGE:', newMessage.value);

        ws.send(newMessage.value);
        newMessage.value = "";
        return;
    });

    Bus.on('chat:handle-message', (msg) => {
        const item = document.createElement("div");
        item.classList.add('chat__message');

        const login = document.createElement('span');
        login.classList.add('message__login');
        login.textContent = msg.login + ': ';
        item.appendChild(login);

        const text = document.createElement('span');
        text.classList.add('message__text');
        text.textContent = msg.message;
        item.appendChild(text);

        this.appendMessages(item);

    });
  }
}
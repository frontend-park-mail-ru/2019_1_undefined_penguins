import BaseView from './BaseView.js';
import WS from '../chat/ChatWebSocket.js';
import Bus from '../scripts/EventBus.js';
import UserModel from '../modules/UserModel.js';

export default class ChatView extends BaseView {
  constructor(el) {
    super(el);
    this.chat = null;
    // const minichat = document.getElementsByClassName('chat-open-close')[0];
    // minichat.classList.add('button__hidden');
  }

  show() {
    super.show();
  }

  render() {
    this.el.innerHTML = '';

    this.chat = document.createElement('div');
    this.chat.className = 'main-chat-block';

    const chatHead = document.createElement('div');
    chatHead.className = 'chat-block__head';
    chatHead.innerText = "Penguins Chat";
    this.chat.appendChild(chatHead);

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
    this.chat.appendChild(mainSection);
    this.el.appendChild(this.chat);
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

    Bus.on('recieved-messages', (msg) => {
      console.log(msg);
      if (msg) {
          const data = msg.reverse();
          data.forEach(elem => {
              Bus.emit('chat:handle-message', elem);
          });
      }
    });
    UserModel.getMessages();

    const ws = new WS('chat');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        if (!ws) {
            return;
        }

        if (!newMessage.value) {
            return;
        }

        ws.send(newMessage.value);
        newMessage.value = "";
        return;
    });
  }
}
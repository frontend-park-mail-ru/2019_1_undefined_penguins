import WS from './ChatWebSocket.js';
import Bus from '../scripts/EventBus.js';
import UserModel from "../modules/UserModel.js";

const root = (() => {
    const root = document.getElementById('chat');
    const messages = document.createElement('div');
    messages.classList.add('chat__messages-block');
    root.appendChild(messages);

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

    root.appendChild(form);

    return root;
})();

function appendMessages(item) {
    const messages = document.getElementsByClassName('chat__messages-block')[0];
    var doScroll = messages.scrollTop > messages.scrollHeight - messages.clientHeight - 1;
    messages.appendChild(item);
    if (doScroll) {
        messages.scrollTop = messages.scrollHeight - messages.clientHeight;
    }
}

function start() {
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

        appendMessages(item);

    });

    Bus.on('recieved-messages', (msg) => {
        console.log(msg);
        if (msg) {
            const data = msg.reverse();
            data.forEach(elem => {
                Bus.emit('chat:handle-message', elem);
            });
        }
    })
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

start();
import Router from './scripts/Router.js';
import ScoreboardView from './views/ScoreboardView.js';
import MenuView from './views/MenuView.js';
import SignInView from './views/SignInView.js';
import SignUpView from './views/SignUpView.js';
import AboutView from './views/AboutView.js';
import ProfileView from './views/ProfileView.js';
import SignOutView from './views/SignOutView.js';
import SingleplayerView from './views/SingleplayerView.js';
import MultiplayerView from './views/MultiplayerView.js';
import WinView from './views/WinView.js';
import LostView from './views/LostView.js';
import ChatView from './views/ChatView.js';
import EventController from './scripts/EventController.js';
import ChatComponent from './chat/ChatComponent.js';

EventController.Init();

const root = document.getElementById('application');
const chat = new ChatComponent(root);
chat.render();

const chatButton = document.createElement('input');
chatButton.type = 'submit';
chatButton.value = "Чатик :)";
chatButton.classList.add('chat-open-button');
chatButton.addEventListener('click', () => {
  event.preventDefault();
  chat.show();
  chatButton.classList.add('button_hidden');
});
root.appendChild(chatButton);


const chatClose = document.getElementsByClassName('chat-block__close')[0];

chatClose.addEventListener('click', () => {
    event.preventDefault();
    chat.hide();
    chatButton.classList.remove('button_hidden');
});


Router
  .register('/', MenuView)
  .register('/leaders', ScoreboardView)
  .register('/signIn', SignInView)
  .register('/signUp', SignUpView)
  .register('/about', AboutView)
  .register('/me', ProfileView)
  .register('/signout', SignOutView)
  .register('/singlePlayer', SingleplayerView)
  .register('/multiPlayer', MultiplayerView)
  .register('/game/win', WinView)
  .register('/messanger', ChatView)
  .register('/game/lost', LostView);

Router.start();

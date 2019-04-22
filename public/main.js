import Router from './scripts/Router.js';
import ScoreboardView from './views/ScoreboardView.js';
import MenuView from './views/MenuView.js';
import SignInView from './views/SignInView.js';
import SignUpView from './views/SignUpView.js';
import AboutView from './views/AboutView.js';
import ProfileView from './views/ProfileView.js';
import SignOutView from './views/SignOutView.js';
import GameView from './views/GameView.js';
// import MultiplayerView from './views/MultiplayerView.js';
import EventController from './scripts/EventController.js';
import WS from './modules/WebSocket.js';
import Bus from './scripts/EventBus.js';

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('sw.js')
//     .then((registration) => {
//       console.log('ServiceWorker registration', registration);
//     })
//     .catch((error) => {
//       throw new Error(`ServiceWorker error: ${error}`);
//     });
// }

EventController.Init();

Bus.on('ws:connected', (ws) => {
  ws.send("playerFRONT", "BUGAGA");
});

const ws = new WS('game');

Router
  .register('/', MenuView)
  .register('/leaders', ScoreboardView)
  .register('/signIn', SignInView)
  .register('/signUp', SignUpView)
  .register('/about', AboutView)
  .register('/me', ProfileView)
  .register('/signout', SignOutView)
  .register('/game', GameView);
  // .register('/multiPlayer', MultiplayerView);

Router.start();

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
import EventController from './scripts/EventController.js';

import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import './main.css';

EventController.Init();

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
    .register('/game/lost', LostView);

Router.start();

if ('serviceWorker' in navigator) {
    runtime.register();
}
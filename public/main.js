import Router from './scripts/Router.js';
import ScoreboardView from './views/ScoreboardView.js'
import MenuView from './views/MenuView.js';
import SignInView from './views/SignInView.js';
import SignUpView from './views/SignUpView.js';
import AboutView from './views/AboutView.js';
import ProfileView from './views/ProfileView.js';
import SignOutView from './views/SignOutView.js';
import SingleplayerView from './views/SingleplayerView.js';
import MultiplayerView from './views/MultiplayerView.js';

import EventController from './scripts/EventController.js'

if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('sw.js')
		.then((reg) => {
			console.log('registred', reg)
		})
		.catch((err) => {
			console.error('error', err)
		})
}

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
	.register('/multiPlayer', MultiplayerView);

Router.start();

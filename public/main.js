'use strict';

import {BoardComponent} from './components/Board/Board.js';
import {RENDER_TYPES} from './utils/constants.js';
import {MenuComponent} from "./components/Menu/Menu.js";
import {AboutComponent} from "./components/About/About.js";
import {ProfileComponent} from "./components/Profile/Profile.js";

const {AjaxModule} = window; 
const application = document.getElementById('application');


function createMenuLink () {
	const menuLink = document.createElement('a');
	menuLink.href = menuLink.dataset.href = 'menu';

	menuLink.textContent = 'Back to main menu';

	return menuLink;
}


function createMenu () {	
	const menuSection = document.createElement('section');
	menuSection.dataset.sectionName = 'menu';

	const menu = new MenuComponent({el: menuSection});
	menu.header = 'Penguin\'s Wars';
	menu.render();

	application.appendChild(menuSection);

}

function createSignIn () {
	const signInSection = document.createElement('section');
	signInSection.dataset.sectionName = 'sign_in';

	const header = document.createElement('h1');
	header.textContent = 'Sign In';


	const form = document.createElement('form');

	const inputs = [
		{
			name: 'email',
			type: 'email',
			placeholder: 'Email'
		},
		{
			name: 'password',
			type: 'password',
			placeholder: 'Password'
		},
		{
			name: 'submit',
			type: 'submit'
		}
	];

	inputs.forEach(function (item) {
		const input = document.createElement('input');

		input.name = item.name;
		input.type = item.type;

		input.placeholder = item.placeholder;

		form.appendChild(input);
		form.appendChild(document.createElement('br'));
	});

	signInSection.appendChild(header);
	signInSection.appendChild(form);
	signInSection.appendChild(createMenuLink());

	form.addEventListener('submit', function (event) {
		event.preventDefault();

		const email = form.elements[ 'email' ].value;
		const password = form.elements[ 'password' ].value;

		AjaxModule.doPost({
			callback() {
				application.innerHTML = '';
				createProfile();
			},
			path: '/login',
			body: {
				email: email,
				password: password,
			},
		});
});

	application.appendChild(signInSection);
}

function createSignUp () {
	const signUpSection = document.createElement('section');
	signUpSection.dataset.sectionName = 'sign_up';

	const header = document.createElement('h1');
	header.textContent = 'Sign Up';


	const form = document.createElement('form');

	const inputs = [
		{
			name: 'email',
			type: 'email',
			placeholder: 'Email'
		},
		{
			name: 'age',
			type: 'number',
			placeholder: 'Your Age'
		},
		{
			name: 'password',
			type: 'password',
			placeholder: 'Password'
		},
		{
			name: 'password_repeat',
			type: 'password',
			placeholder: 'Repeat Password'
		},
		{
			name: 'submit',
			type: 'submit'
		}
	];

	inputs.forEach(function (item) {
		const input = document.createElement('input');

		input.name = item.name;
		input.type = item.type;

		input.placeholder = item.placeholder;

		form.appendChild(input);
		form.appendChild(document.createElement('br'));
	});

	signUpSection.appendChild(header);
	signUpSection.appendChild(form);
	signUpSection.appendChild(createMenuLink());

	form.addEventListener('submit', function (event) {
		event.preventDefault();

		const email = form.elements[ 'email' ].value;
		const age = parseInt(form.elements[ 'age' ].value);
		const password = form.elements[ 'password' ].value;
		const password_repeat = form.elements[ 'password_repeat' ].value;

		if (password !== password_repeat) {
			alert('Passwords is not equals');

			return;
		}

	
		AjaxModule.doPost({
			callback() {
				application.innerHTML = '';
				createProfile();
			},
			path: '/signup',
			body: {
				email: email,
				age: age,
				password: password,
			},
		});
});

	application.appendChild(signUpSection);
}

function createLeaderboard (users) {
	const leaderboardSection = document.createElement('section');
	leaderboardSection.dataset.sectionName = 'leaders';

	const header = document.createElement('h1');
	header.textContent = 'Leaders';

	const boardWrapper = document.createElement('div');

	leaderboardSection.appendChild(header);
	leaderboardSection.appendChild(createMenuLink());
	leaderboardSection.appendChild(document.createElement('br'));
	leaderboardSection.appendChild(boardWrapper);

	if (users) {
		const board = new BoardComponent({
			el: boardWrapper,
			type: RENDER_TYPES.DOM,
		});
		board.data = JSON.parse(JSON.stringify(users));
		board.render();
	} else {
		const em = document.createElement('em');
		em.textContent = 'Loading';
		leaderboardSection.appendChild(em);

		AjaxModule.doGet({
			callback(xhr) {
				const users = JSON.parse(xhr.responseText);
				application.innerHTML = '';
				createLeaderboard(users);
			},
			path: '/users',
		});
	}

	application.appendChild(leaderboardSection);
}
function createProfile (me) {
	const profileSection = document.createElement('section');
	profileSection.dataset.sectionName = 'profile';

	if (me) {
		const profile = new ProfileComponent({
			el: profileSection,
		});
		profile.data = JSON.parse(JSON.stringify(me));
		profile.render();
	} else {
		AjaxModule.doGet({
			callback(xhr) {
				if (!xhr.responseText) {
					alert('Unauthorized');
					application.innerHTML = '';
					createMenu();
					return;
				}
				const user = JSON.parse(xhr.responseText);
				application.innerHTML = '';
				createProfile(user);
			},
			path: '/me',
		});
	}

	application.appendChild(profileSection);
}

function createAbout() {
	const aboutSection = document.createElement('section');
	aboutSection.dataset.sectionName = 'about';

	const about = new AboutComponent({
		el: aboutSection
	});
	about.render();
	application.appendChild(aboutSection);
	application.appendChild(createMenuLink());
}

const pages = {
	menu: createMenu,
	signIn: createSignIn,
	signUp: createSignUp,
	leaders: createLeaderboard,
	me: createProfile,
	about: createAbout
};

createMenu();

application.addEventListener('click', function (event) {
	if (!(event.target instanceof HTMLAnchorElement)) {
		return;
	}

	event.preventDefault();
	const link = event.target;

	console.log({
		href: link.href,
		dataHref: link.dataset.href
	});

	application.innerHTML = '';

	pages[ link.dataset.href ]();
});
'use strict';

import {BoardComponent} from './components/Board/Board.js';
import {RENDER_TYPES} from './utils/constants.js';
import {MenuComponent} from "./components/Menu/Menu.js";
import {AboutComponent} from "./components/About/About.js";
import {ProfileComponent} from "./components/Profile/Profile.js";
import { SignInComponent } from './components/SignIn/SignIn.js';
import { SignUpComponent } from './components/SignUp/SignUp.js';


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
	signInSection.dataset.sectionName = "sign_in"

	const signIn = new SignInComponent({
		el: signInSection
	})

	signIn.render();
  

	application.appendChild(signInSection);
  
  form.addEventListener('submit', function (event) {
		event.preventDefault();

		const email = form.elements[ 'email' ].value;
		const password = form.elements[ 'password' ].value;


		AjaxModule.doPromisePost({
			path: '/login',
			body: {
				email: email,
				password: password,
			},
		})	
		.then(
			res => {
				return res.json();
			}
		)
		.then (
			(data) => {
				console.log(JSON.stringify(data));
			})
		.then( () => {
			application.innerHTML = '';
	
				createProfile();
			})
			.catch(console.error);

		// AjaxModule.doPost({
		// 	callback() {
		// 		application.innerHTML = '';
		// 		createProfile();
		// 	},
		// 	path: '/login',
		// 	body: {
		// 		email: email,
		// 		password: password,
		// 	},
		// });
});
	application.appendChild(createMenuLink());
}

function createSignUp () {
	const signUpSection = document.createElement('section');
	signUpSection.dataset.sectionName = 'sign_up';

  const signUp = new SignUpComponent({
		el: signUpSection
	})

	signUp.render();
	application.appendChild(signUpSection);

  if (password !== password_repeat) {
			alert('Passwords is not equals');

			return;
		}

		AjaxModule.doPromisePost({
			path: '/signup',
			body: {
				email: email,
				age: age,
				password: password,
			},	
		})
			.then(
				res => {
					return res.json();
				}
			)
			.then (
				(data) => {
					console.log(JSON.stringify(data));
				})
			.then( () => {
				application.innerHTML = '';
				createProfile();
			})
			.catch( console.error);
		
		// AjaxModule.doPost({
		// 	callback() {
		// 		application.innerHTML = '';
		// 		createProfile();
		// 	},
		// 	path: '/signup',
		// 	body: {
		// 		email: email,
		// 		age: age,
		// 		password: password,
		// 	},
		// });
});
	
	application.appendChild(createMenuLink());
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
			type: RENDER_TYPES.STRING,
		});
		board.data = JSON.parse(JSON.stringify(users));
		board.render();
	} else {
		const em = document.createElement('em');
		em.textContent = 'Loading';
		leaderboardSection.appendChild(em);

		AjaxModule.doPromiseGet({
			path: '/leaders',	
		})
			.then( response => {
				console.log('Response status: ' + response.status);

				return response.json();
			})
			.then( users => {
				console.log(users);
				application.innerHTML = '';
				createLeaderboard(users);
			})
			.catch( console.error);
		
		// AjaxModule.doGet({
		// 	callback(xhr) {
		// 		console.log(xhr.responseText);
		// 		const users = JSON.parse(xhr.responseText);
		// 		console.log(xhr.responseText);
		// 		application.innerHTML = '';
		// 		createLeaderboard(users);
		// 	},
		// 	path: '/leaders',
		// });
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
		AjaxModule.doPromiseGet({
			path: '/me',	
		})
			.then( response => {
				console.log('Response status: ' + response.status);

				return response.json();
			})
			.then( user => {
				console.log(user);
				application.innerHTML = '';
				createProfile(user);
			})
			// .catch( () => {
			// 	alert('Unauthorized');
			// 	application.innerHTML = '';
			// 	createMenu();
			// 	return;
			// });

// 		AjaxModule.doGet({
// 			callback(xhr) {
// 				if (!xhr.responseText) {
// 					alert('Unauthorized');
// 					application.innerHTML = '';
// 					createMenu();
// 					return;
// 				}

// 				const user = JSON.parse(xhr.responseText);
// 				application.innerHTML = '';
// 				createProfile(user);
// 			},
// 			path: '/me',
// });

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
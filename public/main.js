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

	const menu = new MenuComponent({
		el: menuSection,
		type: RENDER_TYPES.DOM,
	});
	menu.header = 'Penguin\'s Wars';
	menu.render();

	application.appendChild(menuSection);

}

function createSignIn () {
	const signInSection = document.createElement('section');
	signInSection.dataset.sectionName = "sign_in"

	const signIn = new SignInComponent({
		el: signInSection,
		type: RENDER_TYPES.TMPL,
	})

	signIn.render();  
	application.appendChild(signInSection);

	const form = document.getElementsByTagName('form')[0];
	form.addEventListener('submit', function (event) {
		event.preventDefault();

		let email = form.elements[ 'email' ].value;
		let password = form.elements[ 'password' ].value;
            
		if (signIn.status !== 200) {
			email = '';
			password = '';	
			signIn.status = 200;	
		}
		else {
		AjaxModule.doPromisePost({
			path: '/login',
			body: {
				email: email,
				password: password,
			},
		})
		.then (
			(data) => {
				console.log(JSON.stringify(data));
				if(data.status > 300) {
					throw new Error('Network response was not ok.'); 
				}
				return data;  
			})
		.then( () => {
			application.innerHTML = '';
			createProfile();
		})
		.catch( () => {
			console.error;
			application.innerHTML = '';
			createMenu();
		});
	}
	});
	application.appendChild(createMenuLink());
}

function createSignUp () {
	const signUpSection = document.createElement('section');
	signUpSection.dataset.sectionName = 'sign_up';

  const signUp = new SignUpComponent({
		el: signUpSection,
		type: RENDER_TYPES.TMPL,
	})

	signUp.render();

	application.appendChild(signUpSection);	

	const form = document.getElementsByTagName('form')[0];

	form.addEventListener('submit', function (event) {
		event.preventDefault();

	let email = form.elements[ 'email' ].value;
	let password = form.elements[ 'password' ].value;

	if (signUp.status !== 200) {
		email = '';
		password = '';
		signUp.status = 200;
	}
	else {
		AjaxModule.doPromisePost({
			path: '/signup',
			body: {
				email: email,
				password: password
			},	
		})
		.then (
			(data) => {
				console.log(JSON.stringify(data));
				if(data.status > 300) {
					throw new Error('Network response was not ok.'); 
				}
				return data; 
			})
		.then( () => {
			application.innerHTML = '';
			createProfile();
		})
		.catch( () => {
			console.error;
			application.innerHTML = '';
			createMenu();
		});          
	}
	})

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



	


	const next = document.createElement('input');
	next.value = "Следующая страница"
	next.type = "button"
	next.addEventListener("click", function(){
		AjaxModule.doPromisePost({
			path: '/leaders',
			body: {
				page: pageNumber + 1,
				items: itemsNumber,
			},

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
			.catch( () => {
				alert('Unauthorized');
				application.innerHTML = '';
				createMenu();
				return;
			});

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
	application.appendChild(createMenuLink());
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

function signOut() {
	AjaxModule.doPromiseGet({
		path: '/signout',	
	})
		.then( response => {
			console.log('Response status: ' + response.status);

			return response.json();
		})
		.then( status => {
			console.log(status);
			application.innerHTML = '';
			createMenu();
		})
		.catch( () => {
			alert('Unauthorized');
			application.innerHTML = '';
			createMenu();
			return;
		});
	
}

const pages = {
	menu: createMenu,
	signIn: createSignIn,
	signUp: createSignUp,
	leaders: createLeaderboard,
	me: createProfile,
	about: createAbout,
	signout: signOut
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
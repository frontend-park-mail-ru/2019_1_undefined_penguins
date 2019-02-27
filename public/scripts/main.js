'use strict';

const application = document.getElementById('application');


function ajax (callback, method, path, body) {
	const xhr = new XMLHttpRequest();
	xhr.open(method, path, true);
	xhr.withCredentials = true;

	if (body) {
		xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
	}

	xhr.onreadystatechange = function () {
		if (xhr.readyState !== 4) {
			return;
		}

		callback(xhr);
	};

	if (body) {
		xhr.send(JSON.stringify(body));
	} else {
		xhr.send();
	}
}

function createMenuLink () {
	const menuLink = document.createElement('a');
	menuLink.href = menuLink.dataset.href = 'menu';

	menuLink.textContent = 'Back to main menu';

	return menuLink;
}

function createMenuButton(img, header, text) {
	const buttonDiv = document.createElement('div');
	buttonDiv.classList = 'buttons';
	
	const image = document.createElement('img');
	const contentDiv = document.createElement('div');
	contentDiv.classList = 'content';
	const caption = document.createElement('div');
	const hint = document.createElement('span');

	caption.classList = 'tooltip';
	hint.classList = 'tooltiptext tooltip-bottom';

	image.src = img;
	caption.textContent = header;
	hint.textContent = text;

	buttonDiv.appendChild(image);
	caption.appendChild(hint);
	contentDiv.appendChild(caption);
	buttonDiv.appendChild(contentDiv);

	return buttonDiv;
}


function createMenu () {
	const headerSection = document.createElement('section');
	headerSection.dataset.sectionName = 'header';

	const logo = document.createElement('div');
	logo.id = 'logo';
	const logoHeader = document.createElement('h1');
	logoHeader.textContent = 'Penguin\'s Wars';
	logo.appendChild(logoHeader);


    const auth = document.createElement('div');
	auth.id = 'auth';

	const authTitles = {
        signIn: 'Sing In',
        signUp: 'Sign Up'
	};

	Object.entries(authTitles).forEach(function (entry) {
		const title = entry[ 1 ];

		const button = document.createElement('button');
		button.textContent = title;
		button.classList.add('auth-button');

		auth.appendChild(button);
	});	

	headerSection.appendChild(logo);
	headerSection.appendChild(auth);

	
	const menuSection = document.createElement('section');
	menuSection.dataset.sectionName = 'menu';


    const menu = document.createElement('div');
    menu.id = 'menu';
	const picture = document.createElement('div');
	picture.id = 'pictures';
	
	const buttons = {
		singlePlayer: { 
			image: '../images/single-penguin.png', 
			header: 'Singleplayer', 
			text: 'reheh'
		},
        multiPlayer: { 
			image: '../images/multi-penguin.png', 
			header: 'Multiplayer', 
			text: 'wjrwy'
		},
        leaders: { 
			image: '../images/leader-penguin.jpg', 
			header: 'Leaders', 
			text: 'srtaa'
		},
		about: { 
			image: '../images/about-penguin.png', 
			header: 'About', 
			text: 'etjaae'
		},
	};

	Object.entries(buttons).forEach(function (entry) {
		const img =  entry[1].image;
		const header =  entry[1].header;
		const text =  entry[1].text;
		menu.appendChild(createMenuButton(img, header, text));
	});
	
	const pictures = {
		first: { 
			src: '../images/fon-penguin1.png', 
			id: 'fon-penguin1'
		},
        second: { 
			src: '../images/fon-penguin2.png', 
			id: 'fon-penguin2'
		}
	};

	Object.entries(pictures).forEach(function (entry) {
		const src =  entry[1].src;
		const id =  entry[1].id;

		const image = document.createElement('img');
		image.src = src;
		image.id = id;
		image.classList = 'fon-images';
		picture.appendChild(image);
    });
    
	menuSection.appendChild(menu);
	menuSection.appendChild(picture);

	application.appendChild(headerSection);
	application.appendChild(menuSection);
}

// function createSignIn () {
// 	const signInSection = document.createElement('section');
// 	signInSection.dataset.sectionName = 'sign_in';

// 	const header = document.createElement('h1');
// 	header.textContent = 'Sign In';


// 	const form = document.createElement('form');

// 	const inputs = [
// 		{
// 			name: 'email',
// 			type: 'email',
// 			placeholder: 'Email'
// 		},
// 		{
// 			name: 'password',
// 			type: 'password',
// 			placeholder: 'Password'
// 		},
// 		{
// 			name: 'submit',
// 			type: 'submit'
// 		}
// 	];

// 	inputs.forEach(function (item) {
// 		const input = document.createElement('input');

// 		input.name = item.name;
// 		input.type = item.type;

// 		input.placeholder = item.placeholder;

// 		form.appendChild(input);
// 		form.appendChild(document.createElement('br'));
// 	});

// 	signInSection.appendChild(header);
// 	signInSection.appendChild(form);
// 	signInSection.appendChild(createMenuLink());

// 	form.addEventListener('submit', function (event) {
// 		event.preventDefault();

// 		const email = form.elements[ 'email' ].value;
// 		const password = form.elements[ 'password' ].value;

// 		ajax(function (xhr) {
// 			application.innerHTML = '';
// 			createProfile();
// 		}, 'POST', '/login', {
// 			email: email,
// 			password: password
// 		});
// 	});

// 	application.appendChild(signInSection);
// }

// function createSignUp () {
// 	const signUpSection = document.createElement('section');
// 	signUpSection.dataset.sectionName = 'sign_in';

// 	const header = document.createElement('h1');
// 	header.textContent = 'Sign Up';


// 	const form = document.createElement('form');

// 	const inputs = [
// 		{
// 			name: 'email',
// 			type: 'email',
// 			placeholder: 'Email'
// 		},
// 		{
// 			name: 'age',
// 			type: 'number',
// 			placeholder: 'Your Age'
// 		},
// 		{
// 			name: 'password',
// 			type: 'password',
// 			placeholder: 'Password'
// 		},
// 		{
// 			name: 'password_repeat',
// 			type: 'password',
// 			placeholder: 'Repeat Password'
// 		},
// 		{
// 			name: 'submit',
// 			type: 'submit'
// 		}
// 	];

// 	inputs.forEach(function (item) {
// 		const input = document.createElement('input');

// 		input.name = item.name;
// 		input.type = item.type;

// 		input.placeholder = item.placeholder;

// 		form.appendChild(input);
// 		form.appendChild(document.createElement('br'));
// 	});

// 	signUpSection.appendChild(header);
// 	signUpSection.appendChild(form);
// 	signUpSection.appendChild(createMenuLink());

// 	form.addEventListener('submit', function (event) {
// 		event.preventDefault();

// 		const email = form.elements[ 'email' ].value;
// 		const age = parseInt(form.elements[ 'age' ].value);
// 		const password = form.elements[ 'password' ].value;
// 		const password_repeat = form.elements[ 'password_repeat' ].value;

// 		if (password !== password_repeat) {
// 			alert('Passwords is not equals');

// 			return;
// 		}

// 		ajax(function (xhr) {
// 			application.innerHTML = '';
// 			createProfile();
// 		}, 'POST', '/signup', {
// 			email: email,
// 			age: age,
// 			password: password
// 		});
// 	});

// 	application.appendChild(signUpSection);
// }

// function createLeaderboard (users) {
// 	const leaderboardSection = document.createElement('section');
// 	leaderboardSection.dataset.sectionName = 'leaderboard';

// 	const header = document.createElement('h1');
// 	header.textContent = 'Leaders';

// 	leaderboardSection.appendChild(header);
// 	leaderboardSection.appendChild(createMenuLink());
// 	leaderboardSection.appendChild(document.createElement('br'));

// 	if (users) {
// 		const table = document.createElement('table');
// 		const thead = document.createElement('thead');
// 		thead.innerHTML = `
// 		<tr>
// 			<th>Email</th>
// 			<th>Age</th>
// 			<th>Score</th>
// 		</th>
// 		`;
// 		const tbody = document.createElement('tbody');

// 		table.appendChild(thead);
// 		table.appendChild(tbody);
// 		table.border = 1;
// 		table.cellSpacing = table.cellPadding = 0;

// 		users.forEach(function (user) {
// 			const email = user.email;
// 			const age = user.age;
// 			const score = user.score;

// 			const tr = document.createElement('tr');
// 			const tdEmail = document.createElement('td');
// 			const tdAge = document.createElement('td');
// 			const tdScore = document.createElement('td');

// 			tdEmail.textContent = email;
// 			tdAge.textContent = age;
// 			tdScore.textContent = score;

// 			tr.appendChild(tdEmail);
// 			tr.appendChild(tdAge);
// 			tr.appendChild(tdScore);

// 			tbody.appendChild(tr);

// 			leaderboardSection.appendChild(table);
// 		});
// 	} else {
// 		const em = document.createElement('em');
// 		em.textContent = 'Loading';
// 		leaderboardSection.appendChild(em);

// 		ajax(function (xhr) {
// 			const users = JSON.parse(xhr.responseText);
// 			application.innerHTML = '';
// 			createLeaderboard(users);
// 		}, 'GET', '/users');
// 	}

// 	application.appendChild(leaderboardSection);
// }

// function createProfile (me) {
// 	const profileSection = document.createElement('section');
// 	profileSection.dataset.sectionName = 'profile';

// 	const header = document.createElement('h1');
// 	header.textContent = 'Profile';

// 	profileSection.appendChild(header);
// 	profileSection.appendChild(createMenuLink());

// 	if (me) {
// 		const p = document.createElement('p');

// 		const div1 = document.createElement('div');
// 		div1.textContent = `Email ${me.email}`;
// 		const div2 = document.createElement('div');
// 		div2.textContent = `Age ${me.age}`;
// 		const div3 = document.createElement('div');
// 		div3.textContent = `Score ${me.score}`;

// 		p.appendChild(div1);
// 		p.appendChild(div3);
// 		p.appendChild(div3);

// 		profileSection.appendChild(p);
// 	} else {
// 		ajax(function (xhr) {
// 			if (!xhr.responseText) {
// 				alert('Unauthorized');
// 				application.innerHTML = '';
// 				createMenu();
// 				return;
// 			}

// 			const user = JSON.parse(xhr.responseText);
// 			application.innerHTML = '';
// 			createProfile(user);
// 		}, 'GET', '/me');
// 	}

// 	application.appendChild(profileSection);
// }

const pages = {
	menu: createMenu,
	// sign_in: createSignIn,
	// sign_up: createSignUp,
	// leaders: createLeaderboard,
	// me: createProfile
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
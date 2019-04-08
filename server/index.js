'use strict';

const fallback = require('express-history-api-fallback');
const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const uuid = require('uuid/v4');
const path = require('path');

const app = express();

const rootDir = path.resolve(__dirname, '..', 'public');
app.use(morgan('dev'));
app.use(express.static(rootDir));
app.use(body.json());
app.use(cookie());
app.use(fallback('index.html', {root: rootDir}));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});


const users = {
  'a.penguin1@corp.mail.ru': {
    login: 'Penguin1',
    email: 'a.penguin1@corp.mail.ru',
    password: 'password',
    name: 'Пингвин Северного Полюса',
    lastVisit: '25.02.2019',
    score: 0,
    avatarName: 'default1.png',
    avatarBlob: './images/user.svg',
  },
  'b.penguin2@corp.mail.ru': {
    login: 'Penguin2',
    email: 'b.penguin2@corp.mail.ru',
    password: 'password',
    name: 'Пингвин Южного Полюса',
    lastVisit: '26.02.2019',
    score: 100500,
    avatarName: 'default2.png',
    avatarBlob: './images/user.svg',
  },
  'c.penguin3@corp.mail.ru': {
    login: 'Penguin3',
    email: 'c.pengin3@corp.mail.ru',
    password: 'password',
    name: 'Залетный Пингвин',
    lastVisit: '14.02.2019',
    score: 172,
    avatarName: 'default3.png',
    avatarBlob: './images/user.svg',
  },
  'd.penguin4@corp.mail.ru': {
    login: 'Penguin4',
    email: 'd.penguin4@corp.mail.ru',
    password: 'password',
    name: 'Рядовой Пингвин',
    lastVisit: '15.02.2019',
    score: 72,
    avatarName: 'default4.png',
    avatarBlob: './images/user.svg',
  },
};

const ids = {};

app.get('/users', function (req, res) {
  // console.log(res);
  const scorelist = Object.values(users)
    .sort((l, r) => r.score - l.score)
    .map(user => {
      return {
        email: user.email,
        age: user.age,
        score: user.score
      };
    });
  // console.log(JSON.stringify(scorelist));
  res.json(scorelist);
});

app.post('/logged', (req, res) => {
  const id = req.cookies.sessionid;
  const email = ids[id];
  if (!email || !users[email]) {
    return res.status(401).end();
	}
	return res.status(200).end();
});

app.post('/login', (req, res) => {
  const { password } = req.body;
  const { email } = req.body;
  if (!password || !email) {
    return res.status(400).json({ error: 'Не указан E-Mail или пароль' });
  }
  if (!users[email] || users[email].password !== password) {
    return res.status(400).json({ error: 'Неверный E-Mail и/или пароль' });
  }

  const id = uuid();
  ids[id] = email;

  res.cookie('sessionid', id, { expires: new Date(Date.now() + 1000 * 60 * 10) });
  console.log('User is: ', users[email]);
  res.status(200).json(users[email]);
});

app.post('/signup', (req, res) => {
  const { password } = req.body;
  const { email } = req.body;
  if (
    !password || !email
		|| !password.match(/^\S{4,}$/)
		|| !email.match(/@/)
  ) {
    return res.status(400).json({ error: 'Невалидные данные пользователя' });
  }
  if (users[email]) {
    return res.status(400).json({ error: 'Пользователь уже существует' });
  }

  const id = uuid();
  const user = {
    login: '-не указан-',
    email,
    password,
    name: '-не указано-',
    lastVisit: 'today',
    score: 0,
    avatarName: 'default.png',
    avatarBlob: './images/user.svg',
  };
  ids[id] = email;
  users[email] = user;

  res.cookie('sessionid', id, { expires: new Date(Date.now() + 1000 * 60 * 10) });
  //TODO: вернуть данные зарегистрированнго пользователя без пароля
  res.status(201).json(user);
});

app.get('/me', (req, res) => {
  const id = req.cookies.sessionid;
  const email = ids[id];
  if (!email || !users[email]) {
    return res.status(401).end();
  }

  res.json(users[email]);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening port ${port}`);
});

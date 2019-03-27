

const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const uuid = require('uuid/v4');
const path = require('path');

const app = express();


app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(body.json());
app.use(cookie());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});


const users = {
	'a.ostapenko@corp.mail.ru': {
		email: 'a.ostapenko@corp.mail.ru',
		password: 'password',
		age: 21,
		score: 72
	},
	'd.dorofeev@corp.mail.ru': {
		email: 'd.dorofeev@corp.mail.ru',
		password: 'password',
		age: 21,
		score: 100500
	},
	's.volodin@corp.mail.ru': {
		email: 'marina.titova@corp.mail.ru',
		password: 'password',
		age: 21,
		score: 72
	},
	'a.tyuldyukov@corp.mail.ru': {
		email: 'a.tyuldyukov@corp.mail.ru',
		password: 'password',
		age: 21,
		score: 72
	}
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

app.get('/logged', (req, res) => {
  const id = req.cookies.sessionid;
  const email = ids[id];
  if (!email || !users[email]) {
		console.log(res.status(401).end());
    return res.status(401).end();
	}
	console.log(res.status(200).end());
	return res.status(200).end();
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening port ${port}`);
});

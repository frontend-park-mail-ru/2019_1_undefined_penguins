const fallback = require('express-history-api-fallback');
const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');

const app = express();

const rootDir = path.resolve(__dirname, '..', 'public');
app.use(morgan('dev'));
app.use(express.static(rootDir));
app.use(body.json());
app.use(cookie());
app.use(fallback('index.html', { root: rootDir }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
    // console.log(`Server listening port ${port}`);
});

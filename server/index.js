const express = require('express');

const app = express();

app.use(express.static('./public'));

/* sets main page */
app.get("/", function(req, res) {
    res.sendfile('./public/menu.html')
 });

app.listen(8081);
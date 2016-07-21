var express = require('express');
var mysql = require('mysql');
var routes = require('./routes');
var app = express();

app.use(express.static('views'));
app.set('view engine', 'ejs');

app.get('/', routes.home);

app.listen(3000, function() {
    console.log('Listening on port 3000...');
});
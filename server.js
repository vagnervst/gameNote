var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var routes = require('./routes');
var app = express();

app.use(express.static('views'));
app.use(bodyParser.urlencoded({
    extended: true    
}));

app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', routes.home);
app.get('/game/:gameId', routes.gamePage);
app.post('/addNote/:gameId', routes.addNote);
app.get('/removeNote/:gameId/:noteId', routes.rmNote);
app.get('/addGame', routes.addGame);
app.post('/addGame', routes.addGame);

app.listen(3000, function() {
    console.log('Listening on port 3000...');
});
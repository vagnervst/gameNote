var mysql = require('mysql');
var fs = require('fs');
var url = require('url');

var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'gameNote'
});

conn.connect(function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log('db connected...');
    }    
});

function createJSON() {
    conn.query('SELECT * FROM games', function(err, games, fields) {
        //Create a json file with all games stored on database        
        var json = games;    
        fs.writeFileSync('views/js/data.json', JSON.stringify(json, null, 4));
    });
}

function getNotes(gameId, callback) {
    conn.query('SELECT id, content FROM notes WHERE gameId = ' + gameId, function(err, rows, fields) {
        callback(rows);
    });
    
}

exports.home = function(req, res) {        
    createJSON();
    res.render('index');
};

exports.gamePage = function(req, res) {
    var gameId = req.params.gameId;
    var notes = getNotes( gameId, function(result) {
        console.log(result);
        var jsonData = require('../views/js/data.json');
        res.render('gamePage', {
            gameId: gameId,
            jsonData: jsonData,
            notes: result
        }); 
    });    
};

exports.addNote = function(req, res) {
    var gameId = req.params.gameId;
    var noteContent = req.body.content;
    
    var query = 'INSERT INTO notes(content, gameId) VALUES(\'' + noteContent + '\', ' + gameId + ')';        
    conn.query(query, function(err, rows, fields) {
        res.redirect('/game/' + gameId);
    });        
};

exports.rmNote = function(req, res) {
    var gameId = req.params.gameId;
    var noteId = req.params.noteId;
    
    var query = 'DELETE FROM notes WHERE id = ' + noteId;
    conn.query(query, function(err, rows, fields){
        res.redirect('/game/' + gameId);
    });
};

exports.addGame = function(req, res) {
    if( typeof(req.body.submit) !== 'undefined' ) {
        var gameTitle = req.body.gameTitle;
        var gameDescr = req.body.gameDescription;
        
        console.log('body: ' + req.files);
        
        var query = 'INSERT INTO games(title, description) VALUES(\'' + gameTitle + '\', \'' + gameDescr + '\')';
        //console.log(query);
        /*conn.query(query, function(err, rows, fields) {
            res.render('addGame');
        });*/        
    } else {
        res.render('addGame');
    }
};
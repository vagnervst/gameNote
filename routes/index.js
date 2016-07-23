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
        
        conn.query('SELECT * FROM notes', function(err, notes, fields) {
            
            var json = []; //Vector of game objects
            
            games.forEach(function(game, index) {
                //Pass through each game, adding the notes that corresponds to them
                var tempObj = { //Temporary object representing the current game
                    id: game.id,
                    title: game.title,
                    shortname: game.shortname,
                    description: game.description,
                    notes: new Array()
                };
                
                for(var i = 0; i < notes.length; ++i) {
                    if( notes[i].gameId === tempObj.id ) {
                        tempObj.notes.push(notes[i].content); //Add just the note's content
                    }
                }
                
                json.push(tempObj); //Add temporary object to the vector
            });
            
            fs.writeFileSync('views/js/data.json', JSON.stringify(json, null, 4));
        });                
    });
}

exports.home = function(req, res) {        
    createJSON();
    res.render('index');
};

exports.gamePage = function(req, res) {
    createJSON();
    var jsonData = require('../views/js/data.json');
    res.render('gamePage', {
        gameId: req.params.gameId,
        jsonData : jsonData
    });
};

exports.addNote = function(req, res) {
    var gameId = req.params.gameId;
    var noteContent = req.body.content;
    
    var query = 'INSERT INTO notes(content, gameId) VALUES(\'' + noteContent + '\', ' + gameId + ')';        
    conn.query(query, function(err, rows, fields) {
        res.redirect('/');
    });        
};
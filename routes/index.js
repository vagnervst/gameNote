var mysql = require('mysql');
var fs = require('fs');

var conn = mysql.createConnection({
    host: 'localhost',
    user: '*',
    password: '*',
    database: 'gameNote'
});

conn.connect(function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log('db connected...');
    }    
});

exports.home = function(req, res) {        
    conn.query('SELECT * FROM games', function(err, games, fields) {
        //Create a json file with all games stored on database
        
        conn.query('SELECT * FROM notes', function(err, notes, fields) {
            
            var json = [];
            
            games.forEach(function(game, index) {
                var tempObj = {
                    id: game.id,
                    title: game.title,
                    shortname: game.shortname,
                    description: game.description,
                    notes: new Array()
                };
                
                for(var i = 0; i < notes.length; ++i) {
                    if( notes[i].gameId === tempObj.id ) {
                        tempObj.notes.push(notes[i].content);
                    }
                }
                
                json.push(tempObj);
            });
                        
            fs.writeFileSync('views/js/data.json', JSON.stringify(json, null, 4));
        });                
    });
    
    console.log('home request');
    res.render('index');
};
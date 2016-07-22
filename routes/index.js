var mysql = require('mysql');
var fs = require('fs');

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

exports.home = function(req, res) {        
    conn.query('SELECT * FROM games', function(err, rows, fields) {
        //Create a json file with all games stored on database
        fs.writeFileSync('views/js/data.json', JSON.stringify(rows));
    });
    
    console.log('home request');
    res.render('index');
};
var mysql = require('mysql');

var dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crossfit'
});

var query = "SELECT * FROM hexad";

dbConnection.query(query, [], function(err, res) {
    if(err) throw err;
    console.log(res);
});
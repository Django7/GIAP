var mysql = require('mysql');
var fs = require('fs');
var propertiesReader = require('properties-reader');
var properties = propertiesReader('dbconnect.properties');

var dbConnection = mysql.createConnection({
    host: properties.get('db.host'),
    user: properties.get('db.user'),
    password: properties.get('db.pw'),
    database: properties.get('db.database')
});

var sql =
    "SELECT\n" +
    "  image_log.uid,\n" +
    "  gid,\n" +
    "  iid,\n" +
    "  TIME_TO_SEC(timediff(end_time, start_time)) AS 'time'\n" +
    "FROM \n" +
    "\timage_log\n" +
    "    LEFT JOIN\n" +
    "    users_groups\n" +
    "    ON(image_log.uid = users_groups.uid)\n" +
    "WHERE iid > 3\n" +
    "ORDER BY uid, iid;";

dbConnection.connect(function(err) {
    if (err) {
        return console.log('error when connecting to db:', err);
    } else {
        console.log("DB Connected!");
        createTimingsCSV();
    }
});

function createTimingsCSV() {
    dbConnection.query(sql, [], function (err, results) {
        if(err) throw err;

        var csvString = "user_id;condition;timings;image_id\n";
        results.forEach(function(row) {
            csvString += cropDBEntry(row.uid, 0)+ ";";
            csvString += cropDBEntry(row.gid, 0) + ";";
            csvString += cropDBEntry(row.time, 0) + ";";
            csvString += cropDBEntry(row.iid, 0) + "\n";
        });

        fs.unlink('CSV/timings.csv', function(err) {
            fs.appendFile('CSV/timings.csv', csvString, function(err) {
                if (err) throw err;
                console.log('finished!');
                dbConnection.destroy();
                process.exit(0);
            });
        });
    });
}

function cropDBEntry(entry, floatLength = 2) {
    if(entry == "") return "";
    return parseFloat(entry).toFixed(floatLength).toString().replace(".", ",");
}
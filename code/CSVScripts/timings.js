var mysql = require('mysql');
var fs = require('fs');

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

var dbConnection = mysql.createConnection({
//    host: 'm.schubhan.de',
    host: 'localhost',
    user: '',
    password: '',
    database: 'gms'
});

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
        console.log(results);

        var csvString = "user_id;condition;timings;image_id\n";
        results.forEach(function(row) {
            csvString += cropDBEntry(row.uid, 0)+ ";";
            csvString += cropDBEntry(row.gid, 0) + ";";
            csvString += cropDBEntry(row.time, 0) + ";";
            csvString += cropDBEntry(row.iid, 0) + "\n";
        });

        fs.unlink('timings.csv', function(err) {
            fs.appendFile('timings.csv', csvString, function(err) {
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
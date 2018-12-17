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
    "SELECT uid, iid, tag, COALESCE(rating, \"\") AS rating_1, COALESCE(rating_2, \"\") AS rating_2\n" +
    "FROM image_tags \n" +
    "ORDER BY uid, iid, tag";

var sql2 =
    "SELECT iid, tag, COALESCE(rating, \"\") AS rating_1, COALESCE(rating_2, \"\") AS rating_2\n" +
    "FROM image_tags\n" +
    "GROUP BY iid, tag\n" +
    "ORDER BY iid, tag";

var sql3 =
    "SELECT image.uid, groupTable.gid, TIME_TO_SEC(TIMEDIFF(image.end_time, image.start_time)) AS timeNeeded, image.iid \n" +
    "FROM (image_log AS image\n" +
    "\n" +
    "LEFT JOIN\n" +
    "\n" +
    "(SELECT uid, gid \n" +
    "FROM users_groups) AS groupTable\n" +
    "\n" +
    "ON image.uid = groupTable.uid)\n" +
    "\n" +
    "ORDER BY uid, iid";

dbConnection.connect(function(err) {
    if (err) {
        return console.log('error when connecting to db:', err);
    } else {
        console.log("DB Connected!");
        createMainRatingsPerTagCSV();
    }
});


function createMainRatingsPerTagCSV() {
    dbConnection.query(sql, [], function (err, results) {
        if(err) throw err;

        var csvString = "user_id;image_id;tag;rate_1;rate_2\n";

        results.forEach(function(row) {
            csvString += row.uid + ";";
            csvString += row.iid + ";";
            csvString += row.tag + ";";
            csvString += row.rating_1 + ";";
            csvString += row.rating_2 + "\n";
        });

        fs.unlink('CSV/ratings_per_tag.csv', function(err) {
            fs.appendFile('CSV/ratings_per_tag.csv', csvString, function(err) {
                if (err) throw err;
                console.log('finished ratings_per_tag!');
                createMainRatingsGrouped();
            });
        });
    });
}

function createMainRatingsGrouped() {
    dbConnection.query(sql2, [], function (err, results) {
        if (err) throw err;

        var csvString = "image_id;tag;rate_1;rate_2\n";

        results.forEach(function (row) {
            csvString += row.iid + ";";
            csvString += row.tag + ";";
            csvString += row.rating_1 + ";";
            csvString += row.rating_2 + "\n";
        });

        fs.unlink('CSV/ratings_grouped.csv', function (err) {
            fs.appendFile('CSV/ratings_grouped.csv', csvString, function (err) {
                if (err) throw err;
                console.log('finished ratings_grouped!');
                createTagTimings();
            });
        });
    });
}

function createTagTimings() {
    dbConnection.query(sql3, [], function (err, results) {
        if (err) throw err;

        var csvString = "user_id;condition;timing;image_id\n";

        results.forEach(function (row) {
            csvString += row.uid + ";";
            csvString += row.gid + ";";
            csvString += row.timeNeeded + ";";
            csvString += row.iid + "\n";
        });

        fs.unlink('CSV/alltimings.csv', function (err) {
            fs.appendFile('CSV/alltimings.csv', csvString, function (err) {
                if (err) throw err;
                console.log('finished alltimings!');
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
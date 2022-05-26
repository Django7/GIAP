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


//Django; holt sich die Tags aus der DB

var sql =
    "SELECT uid, iid, tag, rating, rating_2\n" +
    "FROM image_tags\n" +
    "WHERE uid < 6410 AND uid > 20\n" +
  //  "WHERE NOT (uid = 531 OR uid = 3751 OR uid = 4251) AND uid = 21 AND uid = 31 AND uid = 61 AND uid = 81 AND uid = 181 AND uid = 191 AND uid = 241 AND uid = 261 AND uid = 311 AND uid = 421 AND uid = 431 AND uid = 461 AND uid = 471 AND uid = 501 AND uid = 541 AND uid = 551 AND uid = 751 AND uid = 1661 AND uid = 1671 AND uid = 1781 AND uid = 1801 AND uid = 2251 AND uid = 2381 AND uid = 2451 AND uid = 2461 AND uid = 2511 AND uid = 2681 AND uid = 2781 AND uid = 2801 AND uid = 2871 AND uid = 2881 AND uid = 2921 AND uid = 2931 AND uid = 2981 AND uid = 3081 AND uid = 3111 AND uid = 3151 AND uid = 3211 AND uid = 3271 AND uid = 3491 AND uid = 3581 AND uid = 3671 AND uid = 3701 AND uid = 3721 AND uid = 3761 AND uid = 3831 AND uid = 3841 AND uid = 3961 AND uid = 3971 AND uid = 4041 AND uid = 4051 AND uid = 4061 AND uid = 4101 AND uid = 4211 AND uid = 4221 AND uid = 4351 AND uid = 4431 AND uid = 4561 AND uid = 4601 AND uid = 4781 AND uid = 4841 AND uid = 4851 AND uid = 4901 AND uid = 4921 AND uid = 4931 AND uid = 5031 AND uid = 5141 AND uid = 5191 AND uid = 5201 AND uid = 5241 AND uid = 5251 AND uid = 5261 AND uid = 5311 AND uid = 5461 AND uid = 5511 AND uid = 5691 AND uid = 5701 AND uid = 5721 AND uid = 5731 AND uid = 5741 AND uid = 5751 AND uid = 5891 AND uid = 6101 AND uid = 6111 AND uid = 6131 AND uid = 6141 AND uid = 6161 AND uid = 6171 \n" +
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

        var csvString = "uid;iid;tag;rating1;rating2\n";
        results.forEach(function(row) {
            if(row.tag!=''){
            csvString += row.uid + ";";
            csvString += row.iid + ";";
            csvString += row.tag + ";";
            csvString += row.rating + ";";
            csvString += row.rating_2 + "\n";
            }
        });

        fs.unlink('CSVDjango/tags.csv', function(err) {
            fs.appendFile('CSVDjango/tags.csv', csvString, function(err) {
                if (err) throw err;
                console.log('finished!');
                dbConnection.destroy();
                process.exit(0);
            });
        });
    });
}

function cropDBEntry(entry, floatLength = 2) { //gibt NaN zurück wenn auf "nicht-zahlen" verwendet!
    if(entry === "") return "";
    return parseFloat(entry).toFixed(floatLength).toString().replace(".", ",");
}
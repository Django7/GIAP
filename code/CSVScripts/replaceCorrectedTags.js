var mysql = require('mysql');
var propertiesReader = require('properties-reader');
var properties = propertiesReader('dbconnect.properties');

var dbConnection = mysql.createConnection({
    host: properties.get('db.host'),
    user: properties.get('db.user'),
    password: properties.get('db.pw'),
    database: properties.get('db.database')
});

dbConnection.connect(function(err) {
    if (err) {
        return console.log('error when connecting to db:', err);
    } else {
        console.log("DB Connected!");
        replaceCorrectedTags();
    }
});

function replaceCorrectedTags() {
    var lineReader = require('readline').createInterface({
        input: require('fs').createReadStream('tags_gms.csv')
    });

    var numLines = 0;

    lineReader.on('line', function (line) {
        var tag = line.split(';');
        dbConnection.query(
            "INSERT INTO image_tags (uid, iid, tag) VALUES (" + tag[0] + ", " + tag[1] + ", '" + tag[2] + "');",
            [],
            function (err) {
                if(err) throw err;
                numLines++;
                console.log(numLines);
                if(numLines === 1328) {
                    console.log('finished!');
                    dbConnection.destroy();
                    process.exit(0);
                }
            });
    });
}
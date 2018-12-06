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
        updateTagRatings();
    }
});

function updateTagRatings() {
    var lineReader = require('readline').createInterface({
        input: require('fs').createReadStream('main_ratings_per_tag_base.csv')
    });

    var numLines = 0;

    lineReader.on('line', function (line) {
        var variables = line.split(";");

        var uid = variables[0];
        var iid = variables[1];
        var tag = variables[2];
        var rating1 = variables[3];
        var rating2 = variables[4];

        if(uid == "user_id") return;

        numLines++;

        dbConnection.query(
                "INSERT INTO image_tags VALUES(" + uid + ", " + iid + ", " + "'" + tag + "'" + ", " + rating1 + ", " + rating2 + ")",
                [],
                function (err, results) {
                if(err) throw err;
                numLines--;
                if(numLines === 0) {
                    console.log("Finished!");
                    dbConnection.destroy();
                    process.exit(0);
                }
        });
    });
}
var mysql = require('mysql');
var propertiesReader = require('properties-reader');
var properties = propertiesReader('dbconnect.properties');


// Fügt ratings in die DB ein
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
        input: require('fs').createReadStream('tags_marc_test.csvmerged.csv', 'utf8')
    });
    var utf8 = require('utf8');

    var numLines = 0;

    lineReader.on('line', function (line) {
        var variables = line.split(",");

        var iconv = require('iconv-lite');

        var buff   = new Buffer(variables[2], 'utf8');

        var iid = variables[0];
        var freq = variables[1];
        var tag = iconv.decode(iconv.decode(buff, 'ISO-8859-1'), 'UTF-8');
        var rating1 = variables[3];
        var rating2 = variables[4];

        numLines++;

        dbConnection.query(
            "UPDATE image_tags SET rating = " + rating1 + ", rating_2 = " + rating2 + " WHERE iid = " + iid + " AND tag = '" + tag + "'",
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
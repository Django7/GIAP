var mysql = require('mysql');

var dbConnection = mysql.createConnection({
//    host: 'm.schubhan.de',
    host: 'localhost',
    user: 'root',
    password: 'fp_project',
    database: 'gms'
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
        input: require('fs').createReadStream('main_ratings_per_tag.csv')
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
                "UPDATE image_tags SET rating = " + rating1 + ", rating_2 =" + rating2 + " WHERE uid = " + uid + " AND iid = " + iid + " AND tag LIKE '" + tag + "'",
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
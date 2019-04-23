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
        assumeTagRatings();
    }
});

var tags = [];

function assumeTagRatings() {
    dbConnection.query(
        "SELECT iid, tag FROM image_tags WHERE rating IS NULL", [], function (err, results) {
            if(err) throw err;
            tags = results;
            updateTag(0);
        });
}

function updateTag(idx) {
    if(idx === tags.length) {
        console.log('finished!');
        dbConnection.destroy();
        process.exit(0);
    }
    dbConnection.query(
        "SELECT rating, rating_2 FROM image_tags WHERE iid = " + tags[idx].iid + " AND tag = '" + tags[idx].tag + "' LIMIT 1;", [], function(err, results) {
            if(err) throw err;
            if(results[0].rating == null) {
                idx++;
                updateTag(idx);
                return;
            }
            dbConnection.query(
                "UPDATE image_tags SET rating = " + results[0].rating + ", rating_2 = " + results[0].rating_2 + " WHERE iid = " + tags[idx].iid + " AND  tag = '" + tags[idx].tag + "';", [], function(err) {
                    if(err) throw err;
                    console.log("Updated tag " + tags[idx].tag + " with rating = " + results[0].rating);
                    idx++;
                    updateTag(idx);
                }
            );
        }
    );
}
var mysql = require('mysql');
var fs = require('fs');
var propertiesReader = require('properties-reader');
var properties = propertiesReader('dbconnect.properties');


// gibt durchschnittliche zeiten für die bilder an
var dbConnection = mysql.createConnection({
    host: properties.get('db.host'),
    user: properties.get('db.user'),
    password: properties.get('db.pw'),
    database: properties.get('db.database')
});

var sql =
    "SELECT \tbothTimes.uid AS user_id,\n" +
    "        bothTimes.group_list AS 'condition',\n" +
    "        bothTimes.timediff AS avg_time_img_basic_bonus,\n" +
    "        basicTimes.timediff AS avg_time_img_basic,\n" +
    "        COALESCE(bonusTimes.timediff, \"\") AS avg_time_img_bonus,\n" +
    "        numTagsTutorial.numTutorial AS tags_tutorial,\n" +
    "        numTagsBasic.numBasic AS tags_basic,\n" +
    "        COALESCE(numTagsExtra.numExtra, \"\") AS tags_bonus,\n" +
    "        COALESCE(numExtraRounds.num_of_extra_rounds_solved, 0) AS extra_rounds\n" +
    "FROM (((((\n" +
    "    # Get average duration for image for each user (basic images  + bonus)\n" +
    "    (SELECT\n" +
    "            image_log.uid,\n" +
    "            GROUP_CONCAT(DISTINCT gid)                       AS group_list,\n" +
    "            avg(time_to_sec(timediff(end_time, start_time))) AS timediff\n" +
    "     FROM image_log\n" +
    "            INNER JOIN users_groups ON image_log.uid = users_groups.uid\n" +
    "     WHERE iid > 3\n" +
    "     GROUP BY uid) AS bothTimes\n" +
    "\n" +
    "        LEFT JOIN\n" +
    "\n" +
    "        # Get average duration for image for each user (basic images)\n" +
    "        (SELECT\n" +
    "                image_log.uid,\n" +
    "                avg(time_to_sec(timediff(end_time, start_time))) AS timediff\n" +
    "         FROM image_log\n" +
    "                INNER JOIN users_groups ON image_log.uid = users_groups.uid\n" +
    "         WHERE iid > 3 AND iid <= 18\n" +
    "         GROUP BY uid) AS basicTimes\n" +
    "\n" +
    "        ON bothTimes.uid = basicTimes.uid)\n" +
    "\n" +
    "    LEFT JOIN\n" +
    "\n" +
    "    # Get average duration for image for each user (bonus images)\n" +
    "    (SELECT\n" +
    "            image_log.uid,\n" +
    "         #GROUP_CONCAT(DISTINCT gid)                       AS group_list2,\n" +
    "            avg(time_to_sec(timediff(end_time, start_time))) AS timediff\n" +
    "     FROM image_log\n" +
    "            INNER JOIN users_groups ON image_log.uid = users_groups.uid\n" +
    "     WHERE iid > 18\n" +
    "     GROUP BY uid) AS bonusTimes\n" +
    "\n" +
    "    ON bothTimes.uid = bonusTimes.uid)\n" +
    "\n" +
    "    LEFT JOIN\n" +
    "\n" +
    "    # get total number of tags (tutorial) for each user\n" +
    "    (SELECT\n" +
    "            uid,\n" +
    "            count(tag) AS numTutorial\n" +
    "     FROM image_tags\n" +
    "     WHERE length(tag) > 0 AND iid <= 3\n" +
    "     GROUP BY uid) AS numTagsTutorial\n" +
    "\n" +
    "    ON bothTimes.uid = numTagsTutorial.uid)\n" +
    "\n" +
    "    LEFT JOIN\n" +
    "\n" +
    "    # get total number of tags (basic) for each user\n" +
    "    (SELECT\n" +
    "            uid,\n" +
    "            count(tag) AS numBasic\n" +
    "     FROM image_tags\n" +
    "     WHERE length(tag) > 0 AND iid > 3 AND iid <= 18\n" +
    "     GROUP BY uid) AS numTagsBasic\n" +
    "\n" +
    "    ON bothTimes.uid = numTagsBasic.uid)\n" +
    "\n" +
    "    LEFT JOIN\n" +
    "\n" +
    "    # get total number of tags (extra) for each user\n" +
    "    (SELECT\n" +
    "            uid,\n" +
    "            count(tag) AS numExtra\n" +
    "     FROM image_tags\n" +
    "     WHERE length(tag) > 0 AND iid > 18\n" +
    "     GROUP BY uid) AS numTagsExtra\n" +
    "\n" +
    "    ON bothTimes.uid = numTagsExtra.uid)\n" +
    "\n" +
    "       LEFT JOIN\n" +
    "\n" +
    "         (SELECT\n" +
    "                 image_log.uid,\n" +
    "                 Floor(count(iid) / 5) AS num_of_extra_rounds_solved\n" +
    "          FROM image_log\n" +
    "          WHERE iid > 18\n" +
    "          GROUP BY uid) AS numExtraRounds\n" +
    "\n" +
    "         ON bothTimes.uid = numExtraRounds.uid";

dbConnection.connect(function(err) {
    if (err) {
        return console.log('error when connecting to db:', err);
    } else {
        console.log("DB Connected!");
        createAggregationCSV();
    }
});

function createAggregationCSV() {
    dbConnection.query(sql, [], function (err, results) {
        if(err) throw err;

        var csvString = "user_id;condition;avg_time_img_basic_bonus;avg_time_img_basic;avg_time_img_bonus;tags_tutorial;tags_basic;tags_bonus;extra_rounds\n";
        results.forEach(function(row) {
            csvString += cropDBEntry(row.user_id)+ ";";
            csvString += cropDBEntry(row.condition) + ";";
            csvString += cropDBEntry(row.avg_time_img_basic_bonus) + ";";
            csvString += cropDBEntry(row.avg_time_img_basic) + ";";
            csvString += cropDBEntry(row.avg_time_img_bonus) + ";";
            csvString += cropDBEntry(row.tags_tutorial) + ";";
            csvString += cropDBEntry(row.tags_basic) + ";";
            csvString += cropDBEntry(row.tags_bonus) + ";";
            csvString += cropDBEntry(row.extra_rounds) + "\n";
        });

        fs.unlink('CSV/aggregations.csv', function(err) {
            fs.appendFile('CSV/aggregations.csv', csvString, function(err) {
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
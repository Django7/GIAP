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
"SELECT\n" +
    "    img_1.uid,\n" +
    "    img_1.numTags AS img_1_tags,\n" +
    "    img_2.numTags AS img_2_tags,\n" +
    "    img_3.numTags AS img_3_tags,\n" +
    "    img_4.numTags AS img_4_tags,\n" +
    "    img_5.numTags AS img_5_tags,\n" +
    "    img_6.numTags AS img_6_tags,\n" +
    "    img_7.numTags AS img_7_tags,\n" +
    "    img_8.numTags AS img_8_tags,\n" +
    "    img_9.numTags AS img_9_tags,\n" +
    "    img_10.numTags AS img_10_tags,\n" +
    "    img_11.numTags AS img_11_tags,\n" +
    "    img_12.numTags AS img_12_tags,\n" +
    "    img_13.numTags AS img_13_tags,\n" +
    "    img_14.numTags AS img_14_tags,\n" +
    "    img_15.numTags AS img_15_tags\n" +

    "FROM (((((((((((((((((((\n" +  // (((((

    "SELECT uid, count(iid) as tags_img_1\n" +
    "FROM image_tags\n" +
    "WHERE iid = 4 AND (uid = 21 OR uid = 31 OR  uid = 61 OR uid = 81 OR uid = 181 OR uid = 191 OR uid = 241 OR uid = 261 OR uid = 311 OR uid = 421 OR uid = 461 OR uid = 471 OR uid = 501 OR uid = 541 OR uid = 751 OR uid = 1661 OR uid = 1781 OR uid = 2381 OR uid = 2451 OR uid = 2461 OR uid = 2511 OR uid = 2681 OR uid = 2781 OR uid = 2801 OR uid = 2871 OR uid = 2881 OR uid = 2921 OR uid = 2981 OR uid = 3081 OR uid = 3111 OR uid = 3151 OR uid = 3211 OR uid = 3271 OR uid = 3491 OR uid = 3581 OR uid = 3671 OR uid = 3701 OR uid = 3721 OR uid = 3761 OR uid = 3831 OR uid = 3841 OR uid = 3961 OR uid = 3971 OR uid = 4041 OR uid = 4051 OR uid = 4061 OR uid = 4101 OR uid = 4211 OR uid = 4221 OR uid = 4351 OR uid = 4431 OR uid = 4601 OR uid = 4781 OR uid = 4841 OR uid = 4851 OR uid = 4901 OR uid = 4921 OR uid = 4931 OR uid = 5031 OR uid = 5141 OR uid = 5201 OR uid = 5241 OR uid = 5251 OR uid = 5261 OR uid = 5311 OR uid = 5461 OR uid = 5511 OR uid = 5691 OR uid = 5701 OR uid = 5711 OR uid = 5721 OR uid = 5741 OR uid = 5751 OR uid = 6101 OR uid = 6111 OR uid = 6171 OR uid = 6201)\n" +
    "GROUP BY uid\n" +
    "ORDER BY uid";

// 21 OR uid = 31 AND uid = 61 AND uid = 81 AND uid = 181 AND uid = 191 AND uid = 241 AND uid = 261 AND uid = 311 AND uid = 421 AND uid = 461 AND uid = 471 AND uid = 501 AND uid = 541 AND uid = 751 AND uid = 1661 AND uid = 1781 AND uid = 2381 AND uid = 2451 AND uid = 2461 AND uid = 2511 AND uid = 2681 AND uid = 2781 AND uid = 2801 AND uid = 2871 AND uid = 2881 AND uid = 2921 AND uid = 2981 AND uid = 3081 AND uid = 3111 AND uid = 3151 AND uid = 3211 AND uid = 3271 AND uid = 3491 AND uid = 3581 AND uid = 3671 AND uid = 3701 AND uid = 3721 AND uid = 3761 AND uid = 3831 AND uid = 3841 AND uid = 3961 AND uid = 3971 AND uid = 4041 AND uid = 4051 AND uid = 4061 AND uid = 4101 AND uid = 4211 AND uid = 4221 AND uid = 4351 AND uid = 4431 AND uid = 4601 AND uid = 4781 AND uid = 4841 AND uid = 4851 AND uid = 4901 AND uid = 4921 AND uid = 4931 AND uid = 5031 AND uid = 5141 AND uid = 5201 AND uid = 5241 AND uid = 5251 AND uid = 5261 AND uid = 5311 AND uid = 5461 AND uid = 5511 AND uid = 5691 AND uid = 5701 AND uid = 5711 AND uid = 5721 AND uid = 5741 AND uid = 5751 AND uid = 6101 AND uid = 6111 AND uid = 6171 AND uid = 6201


var sql =
    "SELECT\n" +
    "    kim_enjoyment_choice1.uid,\n" +
    "    cond.gid,\n" +
    "    normTags4.numTags AS normTags4,\n" +
    "    normTags5.numTags AS normTags5,\n" +
    "    normTags6.numTags AS normTags6,\n" +
    "    normTags7.numTags AS normTags7,\n" +
    "    normTags8.numTags AS normTags8,\n" +
    "    normTags9.numTags AS normTags9,\n" +
    "    normTags10.numTags AS normTags10,\n" +
    "    normTags11.numTags AS normTags11,\n" +
    "    normTags12.numTags AS normTags12,\n" +
    "    normTags13.numTags AS normTags13,\n" +
    "    normTags14.numTags AS normTags14,\n" +
    "    normTags15.numTags AS normTags15,\n" +
    "    normTags16.numTags AS normTags16,\n" +
    "    normTags17.numTags AS normTags17,\n" +
    "    normTags18.numTags AS normTags18,\n" +

    "    kim_enjoyment_choice1.json_answer AS kim_enjoyment_choice1,\n" + //qid4

    "    final_control.json_answer AS final_control,\n" + //qid23
    "    final_abs.json_answer AS final_abs,\n" +  //qid24
    "    final_rel.json_answer AS final_rel,\n" +  //qid25
    "    final_C_abs.json_answer AS final_C_abs,\n" +  //qid26
    "    final_C_rel.json_answer AS final_C_rel\n" +  //qid27


    "FROM (((((((((((((((((((((\n" +  // (((((



"\t(SELECT uid, json_answer\n" +
    "    FROM questionnaires_users\n" +
    "    WHERE qid = 4 AND NOT (uid = 531 OR uid = 3751 OR uid = 4251 OR uid = 5731 OR uid = 1671 OR uid = 1801 OR uid = 4561 OR uid = 5191 OR uid = 5891 OR uid = 6131 OR uid = 6141 OR uid = 6161 OR uid = 2931 OR uid = 551 OR uid = 2251 OR uid = 431 OR uid = 6271 OR uid = 6321)) AS kim_enjoyment_choice1\n" + 
    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" +

    "    (SELECT uid, count(uid) AS numTags\n" +
    "\tFROM image_tags\n" +
    "\tWHERE iid = 4\n" + 
    "\tGROUP BY uid) AS normTags4\n" +
    "    \n" +
    "    ON kim_enjoyment_choice1.uid = normTags4.uid)\n" +
    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" +

    "    (SELECT uid, count(uid) AS numTags\n" +
    "\tFROM image_tags\n" +
    "\tWHERE iid = 5\n" + 
    "\tGROUP BY uid) AS normTags5\n" +
    "    \n" +
    "    ON kim_enjoyment_choice1.uid = normTags5.uid)\n" +
    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" +

    "    (SELECT uid, count(uid) AS numTags\n" +
    "\tFROM image_tags\n" +
    "\tWHERE iid = 6\n" + 
    "\tGROUP BY uid) AS normTags6\n" +
    "    \n" +
    "    ON kim_enjoyment_choice1.uid = normTags6.uid)\n" +
    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" +

    "    (SELECT uid, count(uid) AS numTags\n" +
    "\tFROM image_tags\n" +
    "\tWHERE iid = 7\n" + 
    "\tGROUP BY uid) AS normTags7\n" +
    "    \n" +
    "    ON kim_enjoyment_choice1.uid = normTags7.uid)\n" +
    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" +

    "    (SELECT uid, count(uid) AS numTags\n" +
    "\tFROM image_tags\n" +
    "\tWHERE iid = 8\n" + 
    "\tGROUP BY uid) AS normTags8\n" +
    "    \n" +
    "    ON kim_enjoyment_choice1.uid = normTags8.uid)\n" +
    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" +

    "    (SELECT uid, count(uid) AS numTags\n" +
    "\tFROM image_tags\n" +
    "\tWHERE iid = 9\n" + 
    "\tGROUP BY uid) AS normTags9\n" +
    "    \n" +
    "    ON kim_enjoyment_choice1.uid = normTags9.uid)\n" +
    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" +

    "    (SELECT uid, count(uid) AS numTags\n" +
    "\tFROM image_tags\n" +
    "\tWHERE iid = 10\n" + 
    "\tGROUP BY uid) AS normTags10\n" +
    "    \n" +
    "    ON kim_enjoyment_choice1.uid = normTags10.uid)\n" +
    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" +

    "    (SELECT uid, count(uid) AS numTags\n" +
    "\tFROM image_tags\n" +
    "\tWHERE iid = 11\n" + 
    "\tGROUP BY uid) AS normTags11\n" +
    "    \n" +
    "    ON kim_enjoyment_choice1.uid = normTags11.uid)\n" +
    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" +

    "    (SELECT uid, count(uid) AS numTags\n" +
    "\tFROM image_tags\n" +
    "\tWHERE iid = 12\n" + 
    "\tGROUP BY uid) AS normTags12\n" +
    "    \n" +
    "    ON kim_enjoyment_choice1.uid = normTags12.uid)\n" +
    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" +

    "    (SELECT uid, count(uid) AS numTags\n" +
    "\tFROM image_tags\n" +
    "\tWHERE iid = 13\n" + 
    "\tGROUP BY uid) AS normTags13\n" +
    "    \n" +
    "    ON kim_enjoyment_choice1.uid = normTags13.uid)\n" +
    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" +

    "    (SELECT uid, count(uid) AS numTags\n" +
    "\tFROM image_tags\n" +
    "\tWHERE iid = 14\n" + 
    "\tGROUP BY uid) AS normTags14\n" +
    "    \n" +
    "    ON kim_enjoyment_choice1.uid = normTags14.uid)\n" +
    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" +

    "    (SELECT uid, count(uid) AS numTags\n" +
    "\tFROM image_tags\n" +
    "\tWHERE iid = 15\n" + 
    "\tGROUP BY uid) AS normTags15\n" +
    "    \n" +
    "    ON kim_enjoyment_choice1.uid = normTags15.uid)\n" +
    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" +

    "    (SELECT uid, count(uid) AS numTags\n" +
    "\tFROM image_tags\n" +
    "\tWHERE iid = 16\n" + 
    "\tGROUP BY uid) AS normTags16\n" +
    "    \n" +
    "    ON kim_enjoyment_choice1.uid = normTags16.uid)\n" +
    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" +

    "    (SELECT uid, count(uid) AS numTags\n" +
    "\tFROM image_tags\n" +
    "\tWHERE iid = 17\n" + 
    "\tGROUP BY uid) AS normTags17\n" +
    "    \n" +
    "    ON kim_enjoyment_choice1.uid = normTags17.uid)\n" +
    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" +

    "    (SELECT uid, count(uid) AS numTags\n" +
    "\tFROM image_tags\n" +
    "\tWHERE iid = 18\n" + 
    "\tGROUP BY uid) AS normTags18\n" +
    "    \n" +
    "    ON kim_enjoyment_choice1.uid = normTags18.uid)\n" +
    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" +

    "    (SELECT uid, gid\n" + 
    "    FROM users_groups) AS cond\n" +
    "    \n" +
    "    ON kim_enjoyment_choice1.uid = cond.uid)\n" +
    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" +

    "    (SELECT uid, json_answer\n" +
    "    FROM questionnaires_users\n" +
    "    WHERE qid = 23) AS final_control\n" +
    "    \n" +
    "    ON kim_enjoyment_choice1.uid = final_control.uid)\n" +
    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" +    
    "    (SELECT uid, json_answer\n" +
    "    FROM questionnaires_users\n" +
    "    WHERE qid = 24) AS final_abs\n" +
    "    \n" +
    "    ON kim_enjoyment_choice1.uid = final_abs.uid)\n" +
    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" +  
    "    (SELECT uid, json_answer\n" +
    "    FROM questionnaires_users\n" +
    "    WHERE qid = 25) AS final_rel\n" +
    "    \n" +
    "    ON kim_enjoyment_choice1.uid = final_rel.uid)\n" +
    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" +  
    "    (SELECT uid, json_answer\n" +
    "    FROM questionnaires_users\n" +
    "    WHERE qid = 26) AS final_C_abs\n" +
    "    \n" +
    "    ON kim_enjoyment_choice1.uid = final_C_abs.uid)\n" +
    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" +  
    "    (SELECT uid, json_answer\n" +
    "    FROM questionnaires_users\n" +
    "    WHERE qid = 27) AS final_C_rel\n" +
    "    \n" +
    "    ON kim_enjoyment_choice1.uid = final_C_rel.uid)\n" +

    "ORDER BY uid"; //end

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

        var csvString = "user_id;condition;tags_img_1;tags_img_2;tags_img_3;tags_img_4;tags_img_5;tags_img_6;tags_img_7;tags_img_8;tags_img_9;tags_img_10;tags_img_11;tags_img_12;tags_img_13;tags_img_14;tags_img_15\n";
        results.forEach(function(row) {
            
           var kim_enjoyment_choice1 = JSON.parse(JSON.parse(row.kim_enjoyment_choice1));

            var final_control = JSON.parse(JSON.parse(row.final_control));
            var final_abs = JSON.parse(JSON.parse(row.final_abs));
            var final_rel = JSON.parse(JSON.parse(row.final_rel));
            var final_C_abs = JSON.parse(JSON.parse(row.final_C_abs));
            var final_C_rel = JSON.parse(JSON.parse(row.final_C_rel));

            if(!(final_control == null && final_abs == null && final_rel == null && final_C_abs == null && final_C_rel == null)){

            csvString += row.uid + ";";

            if(final_C_rel != null){csvString += "7" + ";";}
            else{csvString += cropDBEntry(row.gid, 0)+ ";";}
            csvString += row.normTags4 !== null ? cropDBEntry(row.normTags4) +";" : "0" + ";";
            csvString += row.normTags5 !== null ? cropDBEntry(row.normTags5) +";" : "0" + ";";
            csvString += row.normTags6 !== null ? cropDBEntry(row.normTags6) +";" : "0" + ";";
            csvString += row.normTags7 !== null ? cropDBEntry(row.normTags7) +";" : "0" + ";";
            csvString += row.normTags8 !== null ? cropDBEntry(row.normTags8) +";" : "0" + ";";
            csvString += row.normTags9 !== null ? cropDBEntry(row.normTags9) +";" : "0" + ";";
            csvString += row.normTags10 !== null ? cropDBEntry(row.normTags10) +";" : "0" + ";";
            csvString += row.normTags11 !== null ? cropDBEntry(row.normTags11) +";" : "0" + ";";
            csvString += row.normTags12 !== null ? cropDBEntry(row.normTags12) +";" : "0" + ";";
            csvString += row.normTags13 !== null ? cropDBEntry(row.normTags13) +";" : "0" + ";";
            csvString += row.normTags14 !== null ? cropDBEntry(row.normTags14) +";" : "0" + ";";
            csvString += row.normTags15 !== null ? cropDBEntry(row.normTags15) +";" : "0" + ";";
            csvString += row.normTags16 !== null ? cropDBEntry(row.normTags16) +";" : "0" + ";";
            csvString += row.normTags17 !== null ? cropDBEntry(row.normTags17) +";" : "0" + ";";
            csvString += row.normTags18 !== null ? cropDBEntry(row.normTags18) +"\n" : "0" + "\n";
            

            row.normTags !== undefined ? cropDBEntry(row.normTags) +";" : "0" + ";";
            }
            
        });

        fs.unlink('CSVDjango/tags_per_img.csv', function(err) {
            fs.appendFile('CSVDjango/tags_per_img.csv', csvString, function(err) {
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
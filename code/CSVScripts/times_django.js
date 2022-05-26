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
    "SELECT users.uid, users.first_login, \n" +
    "    first_pic.start_time AS first_pic,\n" + //qid28
    "    debrief_control.submit_time AS debrief_control,\n" + //qid28
    "    debrief_abs.submit_time AS debrief_abs,\n" +  //qid29
    "    debrief_rel.submit_time AS debrief_rel,\n" +  //qid30
    "    debrief_C_abs.submit_time AS debrief_C_abs,\n" +  //qid31
    "    kim_enjoyment_choice1.submit_time AS kim_enjoyment_choice1\n" + //qid4
    "FROM ((((((\n"+ 
    "\t(SELECT uid, first_login\n" +
    "FROM users\n" +
    "WHERE uid > 20 AND NOT (uid = 531 OR uid = 3751 OR uid = 4251 OR uid = 5731 OR uid = 1671 OR uid = 1801 OR uid = 4561 OR uid = 5191 OR uid = 5891 OR uid = 6131 OR uid = 6141 OR uid = 6161 OR uid = 2931 OR uid = 551 OR uid = 2251)) AS users\n" +
    "\n"+
    "LEFT JOIN" +
    "\n" +
    "    (SELECT uid, submit_time\n" +
    "    FROM questionnaires_users\n" +
    "    WHERE qid = 28) AS debrief_control\n" +
    "    \n" +
    "    ON users.uid = debrief_control.uid)\n" +
    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" +  
    "    (SELECT uid, submit_time\n" +
    "    FROM questionnaires_users\n" +
    "    WHERE qid = 29) AS debrief_abs\n" +
    "    \n" +
    "    ON users.uid = debrief_abs.uid)\n" +
    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" +  
    "    (SELECT uid, submit_time\n" +
    "    FROM questionnaires_users\n" +
    "    WHERE qid = 30) AS debrief_rel\n" +
    "    \n" +
    "    ON users.uid = debrief_rel.uid)\n" +
    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" + 
    "    (SELECT uid, submit_time\n" +
    "    FROM questionnaires_users\n" +
    "    WHERE qid = 31) AS debrief_C_abs\n" +
    "    \n" +
    "    ON users.uid = debrief_C_abs.uid)\n" +

    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" + 
    "    (SELECT uid, submit_time\n" +
    "    FROM questionnaires_users\n" +
    "    WHERE qid = 4) AS kim_enjoyment_choice1\n" +
    "    \n" +
    "    ON users.uid = kim_enjoyment_choice1.uid)\n" +

    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" + 
    "    (SELECT uid, start_time\n" +
    "    FROM image_log\n" +
    "    WHERE iid = 1) AS first_pic\n" +
    "    \n" +
    "    ON users.uid = first_pic.uid)\n" +

    "ORDER BY uid;";



dbConnection.connect(function(err) {
    if (err) {
        return console.log('error when connecting to db:', err);
    } else {
        console.log("DB Connected!");
        createTimesCSV();
    }
});

function createTimesCSV() {
    dbConnection.query(sql, [], function (err, results) {
        if(err) throw err;

        
     //   if(final_C_rel == null) {final_C_rel ={}; } else {condition=7;}

        var csvString = "user_id;start_time;first_pic_start;time_first_pic_end;kim_enjoyment_submitted;time_kim_enjoy_to_end;end_time;overall_time_in_sec\n";
        results.forEach(function(row) {

            var condition = 0;

            if(row.debrief_control == null) {} else {condition=1;}
            if(row.debrief_abs == null) {} else {condition=4;}
            if(row.debrief_rel == null) {}  else {condition=5;}
            if(row.debrief_C_abs == null) {} else {condition=6;}


            if(row.first_login!='' && (row.debrief_control!=null || row.debrief_abs!=null || row.debrief_rel!=null || row.debrief_C_abs!=null)){
            csvString += row.uid + ";";
            csvString += row.first_login + ";";
           
            
         //   csvString += row.submit_time + ";";

            switch(condition){
                case(1): //control 
                csvString += row.first_pic + ";";
                csvString += ((row.debrief_control.getTime()-row.first_pic.getTime()) / 1000) + ";";
                csvString += row.kim_enjoyment_choice1+ ";";
                csvString += ((row.debrief_control.getTime()-row.kim_enjoyment_choice1.getTime()) / 1000) + ";";
                csvString += row.debrief_control + ";";
                csvString += ((row.debrief_control.getTime()-row.first_login.getTime()) / 1000) + "\n";
                break;
                case(4): //absolute 
                csvString += row.first_pic + ";";
                csvString += ((row.debrief_abs.getTime()-row.first_pic.getTime()) / 1000) + ";";
                csvString += row.kim_enjoyment_choice1+ ";";
                csvString += ((row.debrief_abs.getTime()-row.kim_enjoyment_choice1.getTime()) / 1000) + ";";
                csvString += row.debrief_abs + ";";
                csvString += ((row.debrief_abs.getTime()-row.first_login.getTime()) / 1000) + "\n";
                break;
                case(5): //relative 
                csvString += row.first_pic + ";";
                csvString += ((row.debrief_rel.getTime()-row.first_pic.getTime()) / 1000) + ";";
                csvString += row.kim_enjoyment_choice1+ ";";
                csvString += ((row.debrief_rel.getTime()-row.kim_enjoyment_choice1.getTime()) / 1000) + ";";
                csvString += row.debrief_rel + ";";
                csvString += ((row.debrief_rel.getTime()-row.first_login.getTime()) / 1000) + "\n";
                break;
                case(6): //choice_absolute 
                csvString += row.first_pic + ";";
                csvString += ((row.debrief_C_abs.getTime()-row.first_pic.getTime()) / 1000) + ";";
                csvString += row.kim_enjoyment_choice1+ ";";
                csvString += ((row.debrief_C_abs.getTime()-row.kim_enjoyment_choice1.getTime()) / 1000) + ";";
                csvString += row.debrief_C_abs + ";";
                csvString += ((row.debrief_C_abs.getTime()-row.first_login.getTime()) / 1000) + "\n";
                break;
}
            
            }
        });

        fs.unlink('CSVDjango/start_end_times.csv', function(err) {
            fs.appendFile('CSVDjango/start_end_times.csv', csvString, function(err) {
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
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
    "SELECT\n" +
    "    kim_enjoyment_choice1.uid,\n" +
    "    cond.gid,\n" +
    "    tutTags.numTags AS tutTags,\n" +
    "    normTags.numTags AS normTags,\n" +
    "\ttutorialRatings.rating_1 AS tut_rating_1,\n" +
    "\ttutorialRatings.rating_2 AS tut_rating_2,\n" +
    "\ttutorialRatings.rating_avg AS tut_rating_avg,\n" +
    "\tbasicRatings.rating_1 AS base_rating_1,\n" +
    "\tbasicRatings.rating_2 AS base_rating_2,\n" +
    "\tbasicRatings.rating_avg AS base_rating_avg,\n" +

    "    kim_enjoyment_choice1.json_answer AS kim_enjoyment_choice1,\n" + //qid4
    "    kim_enjoyment_choice2.json_answer AS kim_enjoyment_choice2,\n" + //qid5


    "    final_control.json_answer AS final_control,\n" + //qid23
    "    final_abs.json_answer AS final_abs,\n" +  //qid24
    "    final_rel.json_answer AS final_rel,\n" +  //qid25
    "    final_C_abs.json_answer AS final_C_abs,\n" +  //qid26
    "    final_C_rel.json_answer AS final_C_rel,\n" +  //qid27

    "    debrief_control.json_answer AS debrief_control,\n" + //qid28
    "    debrief_abs.json_answer AS debrief_abs,\n" +  //qid29
    "    debrief_rel.json_answer AS debrief_rel,\n" +  //qid30
    "    debrief_C_abs.json_answer AS debrief_C_abs,\n" +  //qid31
    "    debrief_C_rel.json_answer AS debrief_C_rel\n" +  //qid32*/

    "FROM ((((((((((((((((\n" +  // (((((


//joined hier eigtl die questionnaires miteinander...kann ich ja nicht...warum ist das in der datenbank ganz anders?

//questionnaires werden hier nach schema kim1+(kim2)+jeweiliges end_ gejoined
//kim1 wird immer beantwortet, daher als erstes
"\t(SELECT uid, json_answer\n" +
    "    FROM questionnaires_users\n" +
    "    WHERE qid = 4 AND uid < 6400 ) AS kim_enjoyment_choice1\n" + 
    //"    WHERE qid = 4 AND uid < 6400 AND NOT (uid = 531 OR uid = 3751 OR uid = 4251 OR uid = 5731 OR uid = 1671 OR uid = 1801 OR uid = 4561 OR uid = 5191 OR uid = 5891 OR uid = 6131 OR uid = 6141 OR uid = 6161 OR uid = 2931 OR uid = 551 OR uid = 2251 OR uid = 241 OR uid = 3841 OR uid = 5141)) AS kim_enjoyment_choice1\n" + 
    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" +
    "    (SELECT uid, json_answer\n" +
    "    FROM questionnaires_users\n" +
    "    WHERE qid = 5) AS kim_enjoyment_choice2\n" +
    "    \n" +
    "    ON kim_enjoyment_choice1.uid = kim_enjoyment_choice2.uid)\n" +
    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" +

//bis hierhin tutorial imis

 

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
    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" +  





    //bis hierhin finals

    "    (SELECT uid, json_answer\n" +
    "    FROM questionnaires_users\n" +
    "    WHERE qid = 28) AS debrief_control\n" +
    "    \n" +
    "    ON kim_enjoyment_choice1.uid = debrief_control.uid)\n" +
    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" +  
    "    (SELECT uid, json_answer\n" +
    "    FROM questionnaires_users\n" +
    "    WHERE qid = 29) AS debrief_abs\n" +
    "    \n" +
    "    ON kim_enjoyment_choice1.uid = debrief_abs.uid)\n" +
    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" +  
    "    (SELECT uid, json_answer\n" +
    "    FROM questionnaires_users\n" +
    "    WHERE qid = 30) AS debrief_rel\n" +
    "    \n" +
    "    ON kim_enjoyment_choice1.uid = debrief_rel.uid)\n" +
    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" + 
    "    (SELECT uid, json_answer\n" +
    "    FROM questionnaires_users\n" +
    "    WHERE qid = 31) AS debrief_C_abs\n" +
    "    \n" +
    "    ON kim_enjoyment_choice1.uid = debrief_C_abs.uid)\n" +
    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" + 
    "    (SELECT uid, json_answer\n" +
    "    FROM questionnaires_users\n" +
    "    WHERE qid = 32) AS debrief_C_rel\n" +
    "    \n" +
    "    ON kim_enjoyment_choice1.uid = debrief_C_rel.uid)\n" +
    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" + 

    //bis hierhin debrief

    "    (SELECT uid, gid\n" + 
    "    FROM users_groups) AS cond\n" +
    "    \n" +
    "    ON kim_enjoyment_choice1.uid = cond.uid)\n" +
    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" +




    //ab hier werden die Tags (die Anzahl der Tags dazu gejoined)
    "    (SELECT uid, count(uid) AS numTags \n" +
    "\tFROM image_tags\n" +
    "\tWHERE iid <= 2\n" + //iid <=3 sind die tutorial bilder  //von 3auf 2 runter
    "\tGROUP BY uid) AS tutTags\n" +
    "    \n" +
    "    ON kim_enjoyment_choice1.uid = tutTags.uid)\n" +
    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" +




    "    (SELECT uid, count(uid) AS numTags\n" +
    "\tFROM image_tags\n" +
    "\tWHERE iid > 3 AND iid < 19\n" + //iid >3 & iid <19 sind die hauptaufgaben (15 stück) bilder (es gäbe noch >= 19, was die bonus bilder wären, aber die wurden für diese studie entfernt)
    "\tGROUP BY uid) AS normTags\n" +
    "    \n" +
    "    ON kim_enjoyment_choice1.uid = normTags.uid)\n" +
    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" +


// hier werden die gerateten tags aus der db gezogen
    "    (SELECT uid, AVG(rating) AS rating_1, AVG(rating_2) AS rating_2, ((AVG(rating) + AVG(rating_2)) / 2) AS rating_avg\n" +
    "\tFROM image_tags\n" +
    "\tWHERE iid <= 2\n" + //von 3auf 2 runter
    "\tGROUP BY uid) AS tutorialRatings\n" +
    "    \n" +
    "    ON kim_enjoyment_choice1.uid = tutorialRatings.uid)\n" +
    "\t\n" +
    "\tLEFT JOIN\n" +
    "\t\n" +
    "\t(SELECT uid, AVG(rating) AS rating_1, AVG(rating_2) AS rating_2, ((AVG(rating) + AVG(rating_2)) / 2) AS rating_avg\n" +
    "\tFROM image_tags\n" +
    "\tWHERE iid > 3 AND iid < 19\n" +
    "\tGROUP BY uid) AS basicRatings\n" +
    "\t\n" +
    "\tON kim_enjoyment_choice1.uid = basicRatings.uid)\n" +



    "ORDER BY uid"; //end

dbConnection.connect(function(err) {
    if (err) {
        return console.log('error when connecting to db:', err);
    } else {
        console.log("DB Connected!");
        createAuswertungCSV();
    }
});

function createAuswertungCSV() {
    dbConnection.query(sql, [], function (err, results) {
        if(err) throw err;

        var csvString = "user_id;condition;chosen_group;tags_tutorial;tags_basic;rating_tutorial_1;rating_tutorial_2;rating_tutorial_mean;rating_basic_1;rating_basic_2;rating_basic_mean;cc_usable;cc_comments;end_usable\n";
        results.forEach(function(row, idx) {

            var condition = 0; //4=absolute, 5=relative, 1=control, 6=choice absolute, 7=choice relative

            csvString += cropDBEntry(row.uid, 0)+ ";";
            csvString += cropDBEntry(row.gid, 0)+ ";";
            //the questionnaires
            var kim_enjoyment_choice1 = JSON.parse(JSON.parse(row.kim_enjoyment_choice1));
            var kim_enjoyment_choice2 = JSON.parse(JSON.parse(row.kim_enjoyment_choice2));



            var final_control = JSON.parse(JSON.parse(row.final_control));
            var final_abs = JSON.parse(JSON.parse(row.final_abs));
            var final_rel = JSON.parse(JSON.parse(row.final_rel));
            var final_C_abs = JSON.parse(JSON.parse(row.final_C_abs));
            var final_C_rel = JSON.parse(JSON.parse(row.final_C_rel));

           var debrief_control = JSON.parse(JSON.parse(row.debrief_control));
             var debrief_abs = JSON.parse(JSON.parse(row.debrief_abs));
            var debrief_rel = JSON.parse(JSON.parse(row.debrief_rel));
            var debrief_C_abs = JSON.parse(JSON.parse(row.debrief_C_abs));
            var debrief_C_rel = JSON.parse(JSON.parse(row.debrief_C_rel));

            //var demographic = JSON.parse(JSON.parse(row.demographic));
            //var imi = JSON.parse(JSON.parse(row.imi));
            
            if(kim_enjoyment_choice1 == null) kim_enjoyment_choice1 ={};
            if(kim_enjoyment_choice2 == null) kim_enjoyment_choice2 ={}; 

           
            
            if(final_control == null) {final_control ={}; } 
            if(final_abs == null) {final_abs ={}; } 
            if(final_rel == null) {final_rel ={}; }  
            if(final_C_abs == null) {final_C_abs ={}; } {condition=6;}
            if(final_C_rel == null) {final_C_rel ={}; } {condition=7;} 

            // immer nur eins der folgenden kann in den else Fall kommen
           if(debrief_control == null) {debrief_control ={}; } else {condition=1;}
            if(debrief_abs == null) {debrief_abs ={}; } else {condition=4;}
            if(debrief_rel == null) {debrief_rel ={}; } else {condition=5;}
            if(debrief_C_abs == null) {debrief_C_abs ={}; } 
            if(debrief_C_rel == null) {debrief_C_rel ={}; } 

            //chosen_group anhand der questionnaires prüfen. 0 = nicht in der choice gruppe, 1=absolute gewählt, 2=relative gewählt

            switch(condition){
                case(1):
                csvString += "0" + ";" //immer in control
                break;
                case(4):
                csvString += "0" + ";" //immer in absolute
                break;
                case(5):
                csvString += "0" + ";" //immer in relative
                break;
                case(6):
                csvString += "1" + ";"; //immer in choice absolute
                break;
                case(7):
                csvString += "2" + ";"; //immer in choice relative
                break;
                default:
                csvString += "never finisihed" + ";";
                break;
            }



//zum kopieren
/*            switch(condition){
                case(1): //control
    
                break;
                case(4): //absolute

                break;
                case(5): //relative
    
                break;
                case(6): //choice_absolute
    
                break;
                case(7): //choice_relative
    
                break;
}*/


          

            //Done ^

            //time fürs erste nicht relevant
            /*csvString += checkJSONValue(concept.design_playtime) + ";";*/

            csvString += checkJSONValue(row.tutTags) + ";";
            csvString += checkJSONValue(row.normTags) + ";";

            csvString += cropDBEntry(row.tut_rating_1, 4) + ";";
            csvString += cropDBEntry(row.tut_rating_2, 4) + ";";
            csvString += cropDBEntry(row.tut_rating_avg, 4) + ";";
            csvString += cropDBEntry(row.base_rating_1, 4) + ";";
            csvString += cropDBEntry(row.base_rating_2, 4) + ";";
            csvString += cropDBEntry(row.base_rating_avg, 4) + ";";

            /*    if(demographic.speed_test_value !== undefined) {
                csvString += parseInt(checkJSONValue(implementation.design_implementation.imp_motiv_design_process)) <= 3 ? 0 : 1;
                csvString += ";";
                csvString += parseInt(checkJSONValue(implementation.design_implementation.imp_motiv_design)) <= 3 ? 0 : 1;
                csvString += ";";
            } else {
                csvString += "" + ";" + "" + ";";
            } */






//kim



switch(condition){
    case(1): //control
    csvString += getYesNo(checkJSONValue(final_control.cc_usable)) + ";";
    csvString += checkJSONValue(final_control.comments).replace(/\n/g, "").replace(/;/g, "") + ";";
    //csvString += getYesNo(checkJSONValue(final_control.end_usable));
    break;
    case(4): //absolute
    csvString += getYesNo(checkJSONValue(final_abs.cc_usable)) + ";";
    csvString += checkJSONValue(final_abs.comments).replace(/\n/g, "").replace(/;/g, "") + ";";
    //csvString += getYesNo(checkJSONValue(final_abs.end_usable));
    break;
    case(5): //relative
    csvString += getYesNo(checkJSONValue(final_rel.cc_usable)) + ";";
    csvString += checkJSONValue(final_rel.comments).replace(/\n/g, "").replace(/;/g, "") + ";";
    //csvString += getYesNo(checkJSONValue(final_rel.end_usable));
    break;
    case(6): //choice_absolute
    csvString += getYesNo(checkJSONValue(final_C_abs.cc_usable)) + ";";
    csvString += checkJSONValue(final_C_abs.comments).replace(/\n/g, "").replace(/;/g, "") + ";";
    //csvString += getYesNo(checkJSONValue(final_C_abs.end_usable));
    break;
    case(7): //choice_relative
    csvString += getYesNo(checkJSONValue(final_C_rel.cc_usable)) + ";";
    csvString += checkJSONValue(final_C_rel.comments).replace(/\n/g, "").replace(/;/g, "") + ";";
    //csvString += getYesNo(checkJSONValue(final_C_rel.end_usable));
    break;
}



switch(condition){
    case(1): //control
    csvString += getYesNo(checkJSONValue(debrief_control.end_usable));
    break;
    case(4): //absolute
    csvString += getYesNo(checkJSONValue(debrief_abs.end_usable));
    break;
    case(5): //relative
    csvString += getYesNo(checkJSONValue(debrief_rel.end_usable));
    break;
    case(6): //choice_absolute
    csvString += getYesNo(checkJSONValue(debrief_C_abs.end_usable));
    break;
    case(7): //choice_relative
    csvString += getYesNo(checkJSONValue(debrief_C_abs.end_usable));
    break;
}


csvString += "\n";


           
        });

        fs.unlink('CSVDjango/auswertung_django_care_comments.csv', function(err) {
            fs.appendFile('CSVDjango/auswertung_django_care_comments.csv', csvString, function(err) {
                if (err) throw err;
                console.log('finished!');
                dbConnection.destroy();
                process.exit(0);
            });
        });
    });
}





//Hilfsfunktionen
function cropDBEntry(entry, floatLength = 2) {
    if(entry == "") return "";
    return parseFloat(entry).toFixed(floatLength).toString().replace(".", ",");
}

function checkJSONValue(json) {
    return json == undefined ? "" : json;
}

function getMoreTagsTendency(string) {
    if(string == "") return string;
    if(string.includes("WENIGER")) return "0";
    if(string.includes("GLEICH")) return "1";
    if(string.includes("MEHR")) return "2";
    return -1;
}

/*function getDesignFeasibility(string) {
    if(string == "") return string;
    if(string.toLowerCase().includes("einschätz")) return 0;
    if(string.toLowerCase().includes("leicht")) return 1;
    if(string.toLowerCase().includes("schwer")) return 2;
    if(string.toLowerCase().includes("umsetzbar")) return 3;
    return -1;
}*/

function getYesNo(string) {
    if(string == "") return string;
    if(string.toLowerCase() == "nein") return 0;
    if(string.toLowerCase() == "ja") return 1;
    return -1;
}

function getLinksRechts(string) {
    if(string == "") return string;
    if(string.toLowerCase() == "linke version") return 0;  //relativ
    if(string.toLowerCase() == "rechte version") return 1;
    return -1;
}

function getAge(string) {
    if(string == "") return string;
    if(string =="Unter 18") return 1;
    if(string =="18-24") return 2;
    if(string =="25-31") return 3;
    if(string =="32-38") return 4;
    if(string =="39-45") return 5;
    if(string =="46-52") return 6;
    if(string =="53-59") return 7;
    if(string.includes("60")) return 8;
    if(string.includes("nicht beantworten")) return 0;
    return -1;
}

function getGender(string) {
    if(string == "") return string;
    if(string == "Weiblich") return 1;
    if(string == "Männlich") return 2;
    if(string == "Mann-zu-Frau-transsexuell/transident") return 3;
    if(string == "Frau-zu-Mann-transsexuell/transident") return 4;
    if(string == "intersexuell/zwischengeschlechtlich") return 5;
    if(string.includes("Möchte ich nicht") || string.toLowerCase() == "keine angabe") return 0;
    return 6;
}


//Erst nach der Studie?
function getNationality(string) {
    if(string.toLowerCase().includes("deutsch")) return 0;
    if(string.toLowerCase().includes("bosnisch")) return 1;
    if(string.toLowerCase().includes("chinesisch")) return 2;
    if(string.toLowerCase().includes("türkisch")) return 3;
    if(string.toLowerCase().includes("indisch")) return 4;
    if(string.toLowerCase().includes("österreich")) return 5;
    if(string.toLowerCase().includes("schweizerisch")) return 6;
    if(string.toLowerCase().includes("algerisch") || string.toLowerCase().includes("dz")) return 7;
    if(string.toLowerCase().includes("lux")) return 8;
    return string;
}

function getWhereFrom(string) {
    if(string == "") return string;
    if(string.toLowerCase().includes("arbeitsplatz")) return 0;
    if(string.toLowerCase().includes("freunde")) return 1;
    if(string.toLowerCase().includes("facebook")) return 2;
    if(string.toLowerCase().includes("twitch")) return 3;
    if(string.toLowerCase().includes("other")) return 4;
    return string;
}

function reverseBF(num) {
    if(num == 1) return 5;
    if(num == 2) return 4;
    if(num == 3) return 3;
    if(num == 4) return 2;
    if(num == 5) return 1;
}
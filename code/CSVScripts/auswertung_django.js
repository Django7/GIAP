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
    "    kim_enjoyment_choice1.json_answer AS kim_enjoyment_choice1,\n" +
    "    kim_enjoyment_choice2.json_answer AS kim_enjoyment_choice2,\n" +
    "    end_absolute.json_answer AS end_absolute,\n" +
    "    end_relative.json_answer AS end_relative,\n" +
    "    end_control.json_answer AS end_control,\n" +
    "    end_choice_absolute.json_answer AS end_choice_absolute,\n" +
    "    end_choice_relative.json_answer AS end_choice_relative\n" +
    "FROM (((((((((((\n" +


//joined hier eigtl die questionnaires miteinander...kann ich ja nicht...warm ist das in der datenbank ganz anders?

//questionnaires werden hier nach schema kim1+(kim2)+jeweiliges end_ gejoined
//kim1 wird immer beantwortet, daher als erstes
"\t(SELECT uid, json_answer\n" +
    "    FROM questionnaires_users\n" +
    "    WHERE qid = 11) AS kim_enjoyment_choice1\n" + 
    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" +
    "    (SELECT uid, json_answer\n" +
    "    FROM questionnaires_users\n" +
    "    WHERE qid = 12) AS kim_enjoyment_choice2\n" +
    "    \n" +
    "    ON kim_enjoyment_choice1.uid = kim_enjoyment_choice2.uid)\n" +
    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" +
    "    (SELECT uid, json_answer\n" +
    "    FROM questionnaires_users\n" +
    "    WHERE qid = 4) AS end_absolute\n" +
    "    \n" +
    "    ON kim_enjoyment_choice1.uid = end_absolute.uid)\n" +
    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" +
    "    (SELECT uid, json_answer\n" +
    "    FROM questionnaires_users\n" +
    "    WHERE qid = 5) AS end_relative\n" +
    "    \n" +
    "    ON kim_enjoyment_choice1.uid = end_relative.uid)\n" +
    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" +
    "    (SELECT uid, json_answer\n" +
    "    FROM questionnaires_users\n" +
    "    WHERE qid = 6) AS end_control\n" +
    "    \n" +
    "    ON kim_enjoyment_choice1.uid = end_control.uid)\n" +
    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" +
    "    (SELECT uid, json_answer\n" +
    "    FROM questionnaires_users\n" +
    "    WHERE qid = 7) AS end_choice_absolute\n" +
    "    \n" +
    "    ON kim_enjoyment_choice1.uid = end_choice_absolute.uid)\n" +
    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" +
    "    (SELECT uid, json_answer\n" +
    "    FROM questionnaires_users\n" +
    "    WHERE qid = 8) AS end_choice_relative\n" +
    "    \n" +
    "    ON kim_enjoyment_choice1.uid = end_choice_relative.uid)\n" +
    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" +    
//bis hierhin joinen der questionnaires

    "    (SELECT uid, gid\n" +  //joined user mit gruppe
    "    FROM users_groups) AS cond\n" +
    "    \n" +
    "    ON kim_enjoyment_choice1.uid = cond.uid)\n" +
    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" +




    //ab hier werden die Tags (die Anzahl der Tags dazu gejoined)
    "    (SELECT uid, count(uid) AS numTags \n" +
    "\tFROM image_tags\n" +
    "\tWHERE iid <= 3\n" + //iid <=3 sind die tutorial bilder
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
    "\tWHERE iid <= 3\n" +
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

        var csvString = "user_id;condition;chosen_group;age;sex;sex[freetext];nationality;nationality[freetext];url_where_from;tags_tutorial;tags_basic;rating_tutorial_1;rating_tutorial_2;rating_tutorial_mean;rating_basic_1;rating_basic_2;rating_basic_mean;KIM_enjoyment_1; KIM_enjoyment_2;IMI_interest_enjoyment;IMI_perceived_competence;IMI_perceived_choice;IMI_pressure_tension;tp_boring;tp_important;lbg_1_leaderboard;lbg_2_motivated;lbg_3_motivating_in_general;lbg_4_distracted;lbg_5_design;lbs_absoluted;lbs_relative;lbs_absolute_chosen_explain;lbs_relative_chosen_explain;choice_tutorial;choice_overstained;choice_satisfied;choice_liked;choice_motivated;choice_more_options;choice_ideas;choice_none_extra_elements;choice_abs_first_options;choice_prefered_absolute;choice_rel_first_options;choice_prefered_relative;choice_none_options;choice_none_decide;choice_none_explain;basics_gaming_time;basics_gamification_experience;basics_gami_exp_except_study;basics_gami_used;basics_gami_good;basics_gami_general_liking;basics_game_affinity;basics_video_game_frequency;basics_video_game_passion;basics_board_game_frequency;basics_board_game_passion;basics_game_performance;cc_usable;cc_comments;end_usable\n";
        results.forEach(function(row, idx) {

            var condition = 0; //4=absolute, 5=relative, 1=control, 6=choice absolute, 7=choice relative

            csvString += cropDBEntry(row.uid, 0)+ ";";
            csvString += cropDBEntry(row.gid, 0)+ ";";
            //the questionnaires
            var kim_enjoyment_choice1 = JSON.parse(JSON.parse(row.kim_enjoyment_choice1));
            var kim_enjoyment_choice2 = JSON.parse(JSON.parse(row.kim_enjoyment_choice2));
            var end_absolute = JSON.parse(JSON.parse(row.end_absolute));
            var end_relative = JSON.parse(JSON.parse(row.end_relative));
            var end_control = JSON.parse(JSON.parse(row.end_control));
            var end_choice_absolute = JSON.parse(JSON.parse(row.end_choice_absolute));
            var end_choice_relative = JSON.parse(JSON.parse(row.end_choice_relative));

            //var demographic = JSON.parse(JSON.parse(row.demographic));
            //var imi = JSON.parse(JSON.parse(row.imi));
            
            if(kim_enjoyment_choice1 == null) kim_enjoyment_choice1 ={};
            if(kim_enjoyment_choice2 == null) kim_enjoyment_choice2 ={}; 
            // immer nur eins der folgenden kann in den else Fall kommen
            if(end_absolute == null) {end_absolute ={}; } else {condition=4;}
            if(end_relative == null) {end_relative ={}; } else {condition=5;}
            if(end_control == null) {end_control ={}; } else {condition=1;}
            if(end_choice_absolute == null) {end_choice_absolute ={}; } else {condition=6;}
            if(end_choice_relative == null) {end_choice_relative ={}; } else {condition=7;}

            //chosen_group anhand der questionnaires prüfen. 0 = nicht in der choice gruppe, 1=absolute gewählt, 2=relative gewählt

            switch(condition){
                case(1):
                csvString += "0" + ";"
                break;
                case(4):
                csvString += "0" + ";"
                break;
                case(5):
                csvString += "0" + ";"
                break;
                case(6):
                csvString += "1" + ";";
                break;
                case(7):
                csvString += "2" + ";";
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


            switch(condition){
                case(1):
                csvString += getAge(checkJSONValue(end_control.age)) + ";";
                csvString += getGender(checkJSONValue(end_control.gender)) + ";";
                csvString += checkJSONValue(end_control.gender) + ";";
                csvString += getNationality(checkJSONValue(end_control.nationality)) + ";";
                csvString += checkJSONValue(end_control.nationality) + ";";
                csvString += getWhereFrom(checkJSONValue(end_control.url_where_from)) + ";";
                break;
                case(4):
                csvString += getAge(checkJSONValue(end_absolute.age)) + ";";
                csvString += getGender(checkJSONValue(end_absolute.gender)) + ";";
                csvString += checkJSONValue(end_absolute.gender) + ";";
                csvString += getNationality(checkJSONValue(end_absolute.nationality)) + ";";
                csvString += checkJSONValue(end_absolute.nationality) + ";";
                csvString += getWhereFrom(checkJSONValue(end_absolute.url_where_from)) + ";";
                break;
                case(5):
                csvString += getAge(checkJSONValue(end_relative.age)) + ";";
                csvString += getGender(checkJSONValue(end_relative.gender)) + ";";
                csvString += checkJSONValue(end_relative.gender) + ";";
                csvString += getNationality(checkJSONValue(end_relative.nationality)) + ";";
                csvString += checkJSONValue(end_relative.nationality) + ";";
                csvString += getWhereFrom(checkJSONValue(end_relative.url_where_from)) + ";";
                break;
                case(6):
                csvString += getAge(checkJSONValue(end_choice_absolute.age)) + ";";
                csvString += getGender(checkJSONValue(end_choice_absolute.gender)) + ";";
                csvString += checkJSONValue(end_choice_absolute.gender) + ";";
                csvString += getNationality(checkJSONValue(end_choice_absolute.nationality)) + ";";
                csvString += checkJSONValue(end_choice_absolute.nationality) + ";";
                csvString += getWhereFrom(checkJSONValue(end_choice_absolute.url_where_from)) + ";";
                break;
                case(7):
                csvString += getAge(checkJSONValue(end_choice_relative.age)) + ";";
                csvString += getGender(checkJSONValue(end_choice_relative.gender)) + ";";
                csvString += checkJSONValue(end_choice_relative.gender) + ";";
                csvString += getNationality(checkJSONValue(end_choice_relative.nationality)) + ";";
                csvString += checkJSONValue(end_choice_relative.nationality) + ";";
                csvString += getWhereFrom(checkJSONValue(end_choice_relative.url_where_from)) + ";";
                break;
            }

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


//kim enjoyment1
csvString += (
    parseInt(checkJSONValue(kim_enjoyment_choice1.kim_enjoyment_choice1.tagging_fun_1)) +
    parseInt(checkJSONValue(kim_enjoyment_choice1.kim_enjoyment_choice1.tagging_interesting_1)) +
    parseInt(checkJSONValue(kim_enjoyment_choice1.kim_enjoyment_choice1.tagging_entertaining_1))) - 3 + ";";

//kim enjoyment2
            switch(condition){
                case(1): //control
                csvString += "" + ";";
                break;
                case(4): //absolute
                csvString += "" + ";";
                break;
                case(5): //relative
                csvString += "" + ";";
                break;
                case(6): //choice_absolute
                csvString += (
                    parseInt(checkJSONValue(kim_enjoyment_choice2.kim_enjoyment_choice2.tagging_fun_2)) +
                    parseInt(checkJSONValue(kim_enjoyment_choice2.kim_enjoyment_choice2.tagging_interesting_2)) +
                    parseInt(checkJSONValue(kim_enjoyment_choice2.kim_enjoyment_choice2.tagging_entertaining_2))) - 3 + ";";
                break;
                case(7): //choice_relative
                csvString += (
                    parseInt(checkJSONValue(kim_enjoyment_choice2.kim_enjoyment_choice2.tagging_fun_2)) +
                    parseInt(checkJSONValue(kim_enjoyment_choice2.kim_enjoyment_choice2.tagging_interesting_2)) +
                    parseInt(checkJSONValue(kim_enjoyment_choice2.kim_enjoyment_choice2.tagging_entertaining_2))) - 3 + ";";
                break;
}

//kim

switch(condition){
    case(1): //control
    csvString += (
        parseInt(checkJSONValue(end_control.imi_interest_enjoyment.tagging_fun_imi)) +
        parseInt(checkJSONValue(end_control.imi_interest_enjoyment.tagging_interesting_imi)) +
        parseInt(checkJSONValue(end_control.imi_interest_enjoyment.tagging_entertaining_imi))) - 3 + ";";
    
    csvString += (
        parseInt(checkJSONValue(end_control.imi_interest_enjoyment.tagging_performance_imi)) +
        parseInt(checkJSONValue(end_control.imi_interest_enjoyment.tagging_competence_imi)) +
        parseInt(checkJSONValue(end_control.imi_interest_enjoyment.tagging_success_imi))) - 3 + ";";
    
    csvString += (
        parseInt(checkJSONValue(end_control.imi_interest_enjoyment.tagging_choice_steering_imi)) +
        parseInt(checkJSONValue(end_control.imi_interest_enjoyment.tagging_choice_self_imi)) +
        parseInt(checkJSONValue(end_control.imi_interest_enjoyment.tagging_choice_generic_imi))) - 3 + ";";
    
    csvString += (
        parseInt(checkJSONValue(end_control.imi_interest_enjoyment.tagging_pressure_imi)) +
        parseInt(checkJSONValue(end_control.imi_interest_enjoyment.tagging_tension_imi)) +
        parseInt(checkJSONValue(end_control.imi_interest_enjoyment.tagging_concerns_imi))) - 3 + ";";
    
    break;
    case(4): //absolute
    csvString += (
        parseInt(checkJSONValue(end_absolute.imi_interest_enjoyment.tagging_fun_imi)) +
        parseInt(checkJSONValue(end_absolute.imi_interest_enjoyment.tagging_interesting_imi)) +
        parseInt(checkJSONValue(end_absolute.imi_interest_enjoyment.tagging_entertaining_imi))) - 3 + ";";
    
    csvString += (
        parseInt(checkJSONValue(end_absolute.imi_interest_enjoyment.tagging_performance_imi)) +
        parseInt(checkJSONValue(end_absolute.imi_interest_enjoyment.tagging_competence_imi)) +
        parseInt(checkJSONValue(end_absolute.imi_interest_enjoyment.tagging_success_imi))) - 3 + ";";
    
    csvString += (
        parseInt(checkJSONValue(end_absolute.imi_interest_enjoyment.tagging_choice_steering_imi)) +
        parseInt(checkJSONValue(end_absolute.imi_interest_enjoyment.tagging_choice_self_imi)) +
        parseInt(checkJSONValue(end_absolute.imi_interest_enjoyment.tagging_choice_generic_imi))) - 3 + ";";
    
    csvString += (
        parseInt(checkJSONValue(end_absolute.imi_interest_enjoyment.tagging_pressure_imi)) +
        parseInt(checkJSONValue(end_absolute.imi_interest_enjoyment.tagging_tension_imi)) +
        parseInt(checkJSONValue(end_absolute.imi_interest_enjoyment.tagging_concerns_imi))) - 3 + ";";
    break;
    case(5): //relative
    csvString += (
        parseInt(checkJSONValue(end_relative.imi_interest_enjoyment.tagging_fun_imi)) +
        parseInt(checkJSONValue(end_relative.imi_interest_enjoyment.tagging_interesting_imi)) +
        parseInt(checkJSONValue(end_relative.imi_interest_enjoyment.tagging_entertaining_imi))) - 3 + ";";
    
    csvString += (
        parseInt(checkJSONValue(end_relative.imi_interest_enjoyment.tagging_performance_imi)) +
        parseInt(checkJSONValue(end_relative.imi_interest_enjoyment.tagging_competence_imi)) +
        parseInt(checkJSONValue(end_relative.imi_interest_enjoyment.tagging_success_imi))) - 3 + ";";
    
    csvString += (
        parseInt(checkJSONValue(end_relative.imi_interest_enjoyment.tagging_choice_steering_imi)) +
        parseInt(checkJSONValue(end_relative.imi_interest_enjoyment.tagging_choice_self_imi)) +
        parseInt(checkJSONValue(end_relative.imi_interest_enjoyment.tagging_choice_generic_imi))) - 3 + ";";
    
    csvString += (
        parseInt(checkJSONValue(end_relative.imi_interest_enjoyment.tagging_pressure_imi)) +
        parseInt(checkJSONValue(end_relative.imi_interest_enjoyment.tagging_tension_imi)) +
        parseInt(checkJSONValue(end_relative.imi_interest_enjoyment.tagging_concerns_imi))) - 3 + ";";
    break;
    case(6): //choice_absolute
    csvString += (
        parseInt(checkJSONValue(end_choice_absolute.imi_interest_enjoyment.tagging_fun_imi)) +
        parseInt(checkJSONValue(end_choice_absolute.imi_interest_enjoyment.tagging_interesting_imi)) +
        parseInt(checkJSONValue(end_choice_absolute.imi_interest_enjoyment.tagging_entertaining_imi))) - 3 + ";";
    
    csvString += (
        parseInt(checkJSONValue(end_choice_absolute.imi_interest_enjoyment.tagging_performance_imi)) +
        parseInt(checkJSONValue(end_choice_absolute.imi_interest_enjoyment.tagging_competence_imi)) +
        parseInt(checkJSONValue(end_choice_absolute.imi_interest_enjoyment.tagging_success_imi))) - 3 + ";";
    
    csvString += (
        parseInt(checkJSONValue(end_choice_absolute.imi_interest_enjoyment.tagging_choice_steering_imi)) +
        parseInt(checkJSONValue(end_choice_absolute.imi_interest_enjoyment.tagging_choice_self_imi)) +
        parseInt(checkJSONValue(end_choice_absolute.imi_interest_enjoyment.tagging_choice_generic_imi))) - 3 + ";";
    
    csvString += (
        parseInt(checkJSONValue(end_choice_absolute.imi_interest_enjoyment.tagging_pressure_imi)) +
        parseInt(checkJSONValue(end_choice_absolute.imi_interest_enjoyment.tagging_tension_imi)) +
        parseInt(checkJSONValue(end_choice_absolute.imi_interest_enjoyment.tagging_concerns_imi))) - 3 + ";";
    break;
    case(7): //choice_relative
    csvString += (
        parseInt(checkJSONValue(end_choice_relative.imi_interest_enjoyment.tagging_fun_imi)) +
        parseInt(checkJSONValue(end_choice_relative.imi_interest_enjoyment.tagging_interesting_imi)) +
        parseInt(checkJSONValue(end_choice_relative.imi_interest_enjoyment.tagging_entertaining_imi))) - 3 + ";";
    
    csvString += (
        parseInt(checkJSONValue(end_choice_relative.imi_interest_enjoyment.tagging_performance_imi)) +
        parseInt(checkJSONValue(end_choice_relative.imi_interest_enjoyment.tagging_competence_imi)) +
        parseInt(checkJSONValue(end_choice_relative.imi_interest_enjoyment.tagging_success_imi))) - 3 + ";";
    
    csvString += (
        parseInt(checkJSONValue(end_choice_relative.imi_interest_enjoyment.tagging_choice_steering_imi)) +
        parseInt(checkJSONValue(end_choice_relative.imi_interest_enjoyment.tagging_choice_self_imi)) +
        parseInt(checkJSONValue(end_choice_relative.imi_interest_enjoyment.tagging_choice_generic_imi))) - 3 + ";";
    
    csvString += (
        parseInt(checkJSONValue(end_choice_relative.imi_interest_enjoyment.tagging_pressure_imi)) +
        parseInt(checkJSONValue(end_choice_relative.imi_interest_enjoyment.tagging_tension_imi)) +
        parseInt(checkJSONValue(end_choice_relative.imi_interest_enjoyment.tagging_concerns_imi))) - 3 + ";";
    break;
}

//task perception
switch(condition){
    case(1): //control
    csvString += checkJSONValue(end_control.task_perception.tp_boring) +";";
    csvString += checkJSONValue(end_control.task_perception.tp_important) +";";
    break;
    case(4): //absolute
    csvString += checkJSONValue(end_absolute.task_perception.tp_boring) +";";
    csvString += checkJSONValue(end_absolute.task_perception.tp_important) +";";
    break;
    case(5): //relative
    csvString += checkJSONValue(end_relative.task_perception.tp_boring) +";";
    csvString += checkJSONValue(end_relative.task_perception.tp_important) +";";
    break;
    case(6): //choice_absolute
    csvString += checkJSONValue(end_choice_absolute.task_perception.tp_boring) +";";
    csvString += checkJSONValue(end_choice_absolute.task_perception.tp_important) +";";
    break;
    case(7): //choice_relative
    csvString += checkJSONValue(end_choice_relative.task_perception.tp_boring) +";";
    csvString += checkJSONValue(end_choice_relative.task_perception.tp_important) +";";
    break;
}


//general_leaderboard

switch(condition){
    case(1): //control
    csvString += "" + ";";
    csvString += "" + ";";
    csvString += "" + ";";
    csvString += "" + ";";
    csvString += "" + ";";
    break;
    case(4): //absolute
    csvString += checkJSONValue(end_absolute.general_leaderboard.lbg_1_leaderboard) + ";";
    csvString += checkJSONValue(end_absolute.general_leaderboard.lbg_2_motivated) + ";";
    csvString += checkJSONValue(end_absolute.general_leaderboard.lbg_3_motivating_in_general) + ";";
    csvString += checkJSONValue(end_absolute.general_leaderboard.lbg_4_distracted) + ";";
    csvString += checkJSONValue(end_absolute.general_leaderboard.lbg_5_design) + ";";
    break;
    case(5): //relative
    csvString += checkJSONValue(end_relative.general_leaderboard.lbg_1_leaderboard) + ";";
    csvString += checkJSONValue(end_relative.general_leaderboard.lbg_2_motivated) + ";";
    csvString += checkJSONValue(end_relative.general_leaderboard.lbg_3_motivating_in_general) + ";";
    csvString += checkJSONValue(end_relative.general_leaderboard.lbg_4_distracted) + ";";
    csvString += checkJSONValue(end_relative.general_leaderboard.lbg_5_design) + ";";
    break;
    case(6): //choice_absolute
    csvString += checkJSONValue(end_choice_absolute.general_leaderboard.lbg_1_leaderboard) + ";";
    csvString += checkJSONValue(end_choice_absolute.general_leaderboard.lbg_2_motivated) + ";";
    csvString += checkJSONValue(end_choice_absolute.general_leaderboard.lbg_3_motivating_in_general) + ";";
    csvString += checkJSONValue(end_choice_absolute.general_leaderboard.lbg_4_distracted) + ";";
    csvString += checkJSONValue(end_choice_absolute.general_leaderboard.lbg_5_design) + ";";
    break;
    case(7): //choice_relative
    csvString += checkJSONValue(end_choice_relative.general_leaderboard.lbg_1_leaderboard) + ";";
    csvString += checkJSONValue(end_choice_relative.general_leaderboard.lbg_2_motivated) + ";";
    csvString += checkJSONValue(end_choice_relative.general_leaderboard.lbg_3_motivating_in_general) + ";";
    csvString += checkJSONValue(end_choice_relative.general_leaderboard.lbg_4_distracted) + ";";
    csvString += checkJSONValue(end_choice_relative.general_leaderboard.lbg_5_design) + ";";
    break;
}

//specific leaderboard

switch(condition){
    case(1): //control
    csvString += "" + ";";
    csvString += "" + ";";
    csvString += "" + ";";
    csvString += "" + ";";
    break;
    case(4): //absolute
    csvString += checkJSONValue(end_absolute.lbs_absolute.lbs_absolute) + ";";
    csvString += "" + ";";
    csvString += "" + ";";
    csvString += "" + ";";
    break;
    case(5): //relative
    csvString += "" + ";";
    csvString += checkJSONValue(end_relative.lbs_relative.lbs_relative) + ";";
    csvString += "" + ";";
    csvString += "" + ";";
    break;
    case(6): //choice_absolute
    csvString += checkJSONValue(end_choice_absolute.lbs_absolute.lbs_absolute) + ";";
    csvString += "" + ";";
    csvString += checkJSONValue(end_choice_absolute.lbs_absolute_chosen_explain).replace(/\n/g, "").replace(/;/g, "") + ";";
    csvString += "" + ";";
    break;
    case(7): //choice_relative
    csvString += "" + ";";
    csvString += checkJSONValue(end_choice_relative.lbs_relative.lbs_relative) + ";";
    csvString += "" + ";";
    csvString += checkJSONValue(end_choice_relative.lbs_relative_chosen_explain).replace(/\n/g, "").replace(/;/g, "") + ";";
    break;
}



//choice

switch(condition){
    case(1): //control
    csvString += "" + ";";
    csvString += "" + ";";
    csvString += "" + ";";
    csvString += "" + ";";
    csvString += "" + ";";
    csvString += "" + ";";
    csvString += "" + ";";
    csvString += checkJSONValue(end_control.choice_specific_2.choice_none_extra_elements) + ";";
    csvString += "" + ";";
    csvString += "" + ";";
    csvString += "" + ";";
    csvString += "" + ";";
    csvString += checkJSONValue(end_control.choice_specific_5.choice_none_options) + ";";
    csvString += getLinksRechts(checkJSONValue(end_control.choice_specific_5_1.choice_none_decide)) + ";";
    csvString += checkJSONValue(end_control.choice_none_explain).replace(/\n/g, "").replace(/;/g, "") + ";";
    break;
    case(4): //absolute
    csvString += "" + ";";
    csvString += "" + ";";
    csvString += "" + ";";
    csvString += "" + ";";
    csvString += "" + ";";
    csvString += "" + ";";
    csvString += "" + ";";
    csvString += "" + ";";
    csvString += "" + ";";
    csvString += "" + ";";
    csvString += checkJSONValue(end_absolute.choice_rel_first_options.choice_rel_first_options) + ";";
    csvString += getYesNo(checkJSONValue(end_absolute.choice_prefered_relative.choice_prefered_relative)) + ";";
    csvString += "" + ";";
    csvString += "" + ";";
    csvString += "" + ";";
    break;
    case(5): //relative
    csvString += "" + ";";
    csvString += "" + ";";
    csvString += "" + ";";
    csvString += "" + ";";
    csvString += "" + ";";
    csvString += "" + ";";
    csvString += "" + ";";
    csvString += "" + ";";
    csvString += checkJSONValue(end_relative.choice_abs_first_options.choice_abs_first_options) + ";";
    csvString += getYesNo(checkJSONValue(end_absolute.choice_prefered_absolute.choice_prefered_absolute)) + ";";
    csvString += "" + ";";
    csvString += "" + ";";
    csvString += "" + ";";
    csvString += "" + ";";
    csvString += "" + ";";
    break;
    case(6): //choice_absolute
    csvString += checkJSONValue(end_choice_absolute.choice_specific_1.choice_tutorial) + ";";
    csvString += checkJSONValue(end_choice_absolute.choice_specific_1.choice_overstained) + ";";
    csvString += checkJSONValue(end_choice_absolute.choice_specific_1.choice_satisfied) + ";";
    csvString += checkJSONValue(end_choice_absolute.choice_specific_1.choice_liked) + ";";
    csvString += checkJSONValue(end_choice_absolute.choice_specific_1.choice_motivated) + ";";
    csvString += checkJSONValue(end_choice_absolute.choice_specific_1.choice_more_options) + ";";
    csvString += checkJSONValue(end_choice_absolute.choice_specific_1_1).replace(/\n/g, "").replace(/;/g, "") + ";";
    csvString += "" + ";";
    csvString += "" + ";";
    csvString += "" + ";";
    csvString += "" + ";";
    csvString += "" + ";";
    csvString += "" + ";";
    csvString += "" + ";";
    csvString += "" + ";";
    break;
    case(7): //choice_relative
    csvString += checkJSONValue(end_choice_relative.choice_specific_1.choice_tutorial) + ";";
    csvString += checkJSONValue(end_choice_relative.choice_specific_1.choice_overstained) + ";";
    csvString += checkJSONValue(end_choice_relative.choice_specific_1.choice_satisfied) + ";";
    csvString += checkJSONValue(end_choice_relative.choice_specific_1.choice_liked) + ";";
    csvString += checkJSONValue(end_choice_relative.choice_specific_1.choice_motivated) + ";";
    csvString += checkJSONValue(end_choice_relative.choice_specific_1.choice_more_options) + ";";
    csvString += checkJSONValue(end_choice_absolute.choice_specific_1_1).replace(/\n/g, "").replace(/;/g, "") + ";";
    csvString += "" + ";";
    csvString += "" + ";";
    csvString += "" + ";";
    csvString += "" + ";";
    csvString += "" + ";";
    csvString += "" + ";";
    csvString += "" + ";";
    csvString += "" + ";";
    break;
}

//Basics
switch(condition){
    case(1): //control
    csvString += checkJSONValue(end_control.gaming_time) + ";";
    csvString += getYesNo(checkJSONValue(end_control.basics_gamification_experience)) + ";";
    csvString += "" + ";";
    csvString += checkJSONValue(end_control.basics_gami_used.basics_gami_used) + ";";
    csvString += "" + ";";
    csvString += end_control.basics_gami_general_liking.lbs_5 !== undefined ? checkJSONValue(end_control.basics_gami_general_liking.lbs_5) +";" : "" + ";";
    csvString += checkJSONValue(end_control.basic_7.basics_game_affinity) + ";";
    csvString += checkJSONValue(end_control.basic_7.basics_video_game_frequency) + ";";
    csvString += checkJSONValue(end_control.basic_7.basics_video_game_passion) + ";";
    csvString += checkJSONValue(end_control.basic_7.basics_board_game_frequency) + ";";
    csvString += checkJSONValue(end_control.basic_7.basics_board_game_passion) + ";";
    csvString += checkJSONValue(end_control.basic_7.basics_game_performance) + ";";
    break;
    case(4): //absolute
    csvString += checkJSONValue(end_absolute.gaming_time) + ";";
    csvString += "" + ";";
    csvString += getYesNo(checkJSONValue(end_absolute.basics_gami_exp_except_study)) + ";";
    csvString += "" + ";";
    csvString += checkJSONValue(end_absolute.basics_gami_good.basics_gami_good) + ";";
    csvString += end_absolute.basics_gami_general_liking.lbs_5 !== undefined ? checkJSONValue(end_absolute.basics_gami_general_liking.lbs_5) +";" : "" + ";";
    csvString += checkJSONValue(end_absolute.basic_7.basics_game_affinity) + ";";
    csvString += checkJSONValue(end_absolute.basic_7.basics_video_game_frequency) + ";";
    csvString += checkJSONValue(end_absolute.basic_7.basics_video_game_passion) + ";";
    csvString += checkJSONValue(end_absolute.basic_7.basics_board_game_frequency) + ";";
    csvString += checkJSONValue(end_absolute.basic_7.basics_board_game_passion) + ";";
    csvString += checkJSONValue(end_absolute.basic_7.basics_game_performance) + ";";
    break;
    case(5): //relative
    csvString += checkJSONValue(end_relative.gaming_time) + ";";
    csvString += "" + ";";
    csvString += getYesNo(checkJSONValue(end_relative.basics_gami_exp_except_study)) + ";";
    csvString += "" + ";";
    csvString += checkJSONValue(end_relative.basics_gami_good.basics_gami_good) + ";";
    csvString += end_relative.basics_gami_general_liking.lbs_5 !== undefined ? checkJSONValue(end_relative.basics_gami_general_liking.lbs_5) +";" : "" + ";";
    csvString += checkJSONValue(end_relative.basic_7.basics_game_affinity) + ";";
    csvString += checkJSONValue(end_relative.basic_7.basics_video_game_frequency) + ";";
    csvString += checkJSONValue(end_relative.basic_7.basics_video_game_passion) + ";";
    csvString += checkJSONValue(end_relative.basic_7.basics_board_game_frequency) + ";";
    csvString += checkJSONValue(end_relative.basic_7.basics_board_game_passion) + ";";
    csvString += checkJSONValue(end_relative.basic_7.basics_game_performance) + ";";
    break;
    case(6): //choice_absolute
    csvString += checkJSONValue(end_choice_absolute.gaming_time) + ";";
    csvString += "" + ";";
    csvString += getYesNo(checkJSONValue(end_choice_absolute.basics_gami_exp_except_study)) + ";";
    csvString += "" + ";";
    csvString += checkJSONValue(end_choice_absolute.basics_gami_good.basics_gami_good) + ";";
    csvString += end_choice_absolute.basics_gami_general_liking.lbs_5 !== undefined ? checkJSONValue(end_choice_absolute.basics_gami_general_liking.lbs_5) +";" : "" + ";";
    csvString += checkJSONValue(end_choice_absolute.basic_7.basics_game_affinity) + ";";
    csvString += checkJSONValue(end_choice_absolute.basic_7.basics_video_game_frequency) + ";";
    csvString += checkJSONValue(end_choice_absolute.basic_7.basics_video_game_passion) + ";";
    csvString += checkJSONValue(end_choice_absolute.basic_7.basics_board_game_frequency) + ";";
    csvString += checkJSONValue(end_choice_absolute.basic_7.basics_board_game_passion) + ";";
    csvString += checkJSONValue(end_choice_absolute.basic_7.basics_game_performance) + ";";
    break;
    case(7): //choice_relative
    csvString += checkJSONValue(end_choice_relative.gaming_time) + ";";
    csvString += "" + ";";
    csvString += getYesNo(checkJSONValue(end_choice_relative.basics_gami_exp_except_study)) + ";";
    csvString += "" + ";";
    csvString += checkJSONValue(end_choice_relative.basics_gami_good.basics_gami_good) + ";";
    csvString += end_choice_relative.basics_gami_general_liking.lbs_5 !== undefined ? checkJSONValue(end_choice_relative.basics_gami_general_liking.lbs_5) +";" : "" + ";";
    csvString += checkJSONValue(end_choice_relative.basic_7.basics_game_affinity) + ";";
    csvString += checkJSONValue(end_choice_relative.basic_7.basics_video_game_frequency) + ";";
    csvString += checkJSONValue(end_choice_relative.basic_7.basics_video_game_passion) + ";";
    csvString += checkJSONValue(end_choice_relative.basic_7.basics_board_game_frequency) + ";";
    csvString += checkJSONValue(end_choice_relative.basic_7.basics_board_game_passion) + ";";
    csvString += checkJSONValue(end_choice_relative.basic_7.basics_game_performance) + ";";
    break;
}

switch(condition){
    case(1): //control
    csvString += getYesNo(checkJSONValue(end_control.cc_usable)) + ";";
    csvString += checkJSONValue(end_control.cc_comments).replace(/\n/g, "").replace(/;/g, "") + ";";
    csvString += getYesNo(checkJSONValue(end_control.end_usable));
    break;
    case(4): //absolute
    csvString += getYesNo(checkJSONValue(end_absolute.cc_usable)) + ";";
    csvString += checkJSONValue(end_absolute.cc_comments).replace(/\n/g, "").replace(/;/g, "") + ";";
    csvString += getYesNo(checkJSONValue(end_absolute.end_usable));
    break;
    case(5): //relative
    csvString += getYesNo(checkJSONValue(end_relative.cc_usable)) + ";";
    csvString += checkJSONValue(end_relative.cc_comments).replace(/\n/g, "").replace(/;/g, "") + ";";
    csvString += getYesNo(checkJSONValue(end_relative.end_usable));
    break;
    case(6): //choice_absolute
    csvString += getYesNo(checkJSONValue(end_choice_absolute.cc_usable)) + ";";
    csvString += checkJSONValue(end_choice_absolute.cc_comments).replace(/\n/g, "").replace(/;/g, "") + ";";
    csvString += getYesNo(checkJSONValue(end_choice_absolute.end_usable));
    break;
    case(7): //choice_relative
    csvString += getYesNo(checkJSONValue(end_choice_relative.cc_usable)) + ";";
    csvString += checkJSONValue(end_choice_relative.cc_comments).replace(/\n/g, "").replace(/;/g, "") + ";";
    csvString += getYesNo(checkJSONValue(end_choice_relative.end_usable));
    break;
}


csvString += "\n";


           
        });

        fs.unlink('CSVDjango/auswertung_django.csv', function(err) {
            fs.appendFile('CSVDjango/auswertung_django.csv', csvString, function(err) {
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
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
    "    demographic.uid,\n" +
    "    cond.gid,\n" +
    "    picTime.time AS basicTime,\n" +
    "    tutPicTime.time AS bonusTime,\n" +
    "    overallPicTime.time AS overallTime,\n" +
    "    tutTags.numTags AS tutTags,\n" +
    "    normTags.numTags AS normTags,\n" +
    "    COALESCE(bonusTags.numTags, \"\") AS bonusTags,\n" +
    "\tnormalAndBonusTags.numTags AS normAndBonusTags,\n" +
    "\ttutorialRatings.rating_1 AS tut_rating_1,\n" +
    "\ttutorialRatings.rating_2 AS tut_rating_2,\n" +
    "\ttutorialRatings.rating_avg AS tut_rating_avg,\n" +
    "\tbasicRatings.rating_1 AS base_rating_1,\n" +
    "\tbasicRatings.rating_2 AS base_rating_2,\n" +
    "\tbasicRatings.rating_avg AS base_rating_avg,\n" +
    "\tCOALESCE(bonusRatings.rating_1, \"\") AS bonus_rating_1,\n" +
    "\tCOALESCE(bonusRatings.rating_2, \"\") AS bonus_rating_2,\n" +
    "\tCOALESCE(bonusRatings.rating_avg, \"\") AS bonus_rating_avg,\n" +
    "\tCOALESCE(numExtraRounds.extraRounds, \"\") AS extraRounds,\n" +
    "    demographic.json_answer AS demographic,\n" +
    "    concept.json_answer AS concept,\n" +
    "    imi.json_answer AS imi,\n" +
    "    implementation.json_answer AS implementation,\n" +
    "    bigFive.json_answer AS bigFive\n" +
    "FROM ((((((((((((((((\n" +
    "\t(SELECT uid, json_answer\n" +
    "    FROM questionnaires_users\n" +
    "    WHERE qid = 4) AS demographic\n" +
    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" +
    "    (SELECT uid, json_answer\n" +
    "    FROM questionnaires_users\n" +
    "    WHERE qid = 2) AS imi\n" +
    "    \n" +
    "    ON demographic.uid = imi.uid)\n" +
    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" +
    "    (SELECT uid, json_answer\n" +
    "    FROM questionnaires_users\n" +
    "    WHERE qid = 1) AS concept\n" +
    "    \n" +
    "    ON demographic.uid = concept.uid)\n" +
    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" +
    "    (SELECT uid, json_answer\n" +
    "    FROM questionnaires_users\n" +
    "    WHERE qid = 3) AS implementation\n" +
    "    \n" +
    "    ON demographic.uid = implementation.uid)\n" +
    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" +
    "    (SELECT uid, json_answer\n" +
    "    FROM questionnaires_users\n" +
    "    WHERE qid = 5) AS bigFive\n" +
    "    \n" +
    "    ON demographic.uid = bigFive.uid)\n" +
    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" +
    "    (SELECT uid, gid\n" +
    "    FROM users_groups) AS cond\n" +
    "    \n" +
    "    ON demographic.uid = cond.uid)\n" +
    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" +
    "    (SELECT image_log.uid, AVG(TIME_TO_SEC(timediff(end_time, start_time))) AS 'time'\n" +
    "\tFROM image_log\n" +
    "\tWHERE iid > 3 AND iid < 19\n" +
    "\tGROUP BY uid) AS picTime\n" +
    "    \n" +
    "    ON demographic.uid = picTime.uid)\n" +
    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" +
    "    (SELECT image_log.uid, AVG(TIME_TO_SEC(timediff(end_time, start_time))) AS 'time'\n" +
    "\tFROM image_log\n" +
    "\tWHERE iid >= 19\n" +
    "\tGROUP BY uid) AS tutPicTime\n" +
    "    \n" +
    "    ON demographic.uid = tutPicTime.uid)\n" +
    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" +
    "    (SELECT image_log.uid, AVG(TIME_TO_SEC(timediff(end_time, start_time))) AS 'time'\n" +
    "\tFROM image_log\n" +
    "\tWHERE iid > 3\n" +
    "\tGROUP BY uid) AS overallPicTime\n" +
    "    \n" +
    "    ON demographic.uid = overallPicTime.uid)\n" +
    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" +
    "    (SELECT uid, count(uid) AS numTags \n" +
    "\tFROM image_tags\n" +
    "\tWHERE iid <= 3\n" +
    "\tGROUP BY uid) AS tutTags\n" +
    "    \n" +
    "    ON demographic.uid = tutTags.uid)\n" +
    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" +
    "    (SELECT uid, count(uid) AS numTags\n" +
    "\tFROM image_tags\n" +
    "\tWHERE iid > 3 AND iid < 19\n" +
    "\tGROUP BY uid) AS normTags\n" +
    "    \n" +
    "    ON demographic.uid = normTags.uid)\n" +
    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" +
    "    (SELECT uid, count(uid) AS numTags\n" +
    "\tFROM image_tags\n" +
    "\tWHERE iid >= 19\n" +
    "\tGROUP BY uid) AS bonusTags\n" +
    "    \n" +
    "    ON demographic.uid = bonusTags.uid)\n" +
    "    \n" +
    "\tLEFT JOIN\n" +
    "    \n" +
    "    (SELECT uid, count(uid) AS numTags\n" +
    "\tFROM image_tags\n" +
    "\tWHERE iid > 3\n" +
    "\tGROUP BY uid) AS normalAndBonusTags\n" +
    "    \n" +
    "    ON demographic.uid = normalAndBonusTags.uid)\n" +
    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" +
    "    (SELECT uid, AVG(rating) AS rating_1, AVG(rating_2) AS rating_2, ((AVG(rating) + AVG(rating_2)) / 2) AS rating_avg\n" +
    "\tFROM image_tags\n" +
    "\tWHERE iid <= 3\n" +
    "\tGROUP BY uid) AS tutorialRatings\n" +
    "    \n" +
    "    ON demographic.uid = tutorialRatings.uid)\n" +
    "\t\n" +
    "\tLEFT JOIN\n" +
    "\t\n" +
    "\t(SELECT uid, AVG(rating) AS rating_1, AVG(rating_2) AS rating_2, ((AVG(rating) + AVG(rating_2)) / 2) AS rating_avg\n" +
    "\tFROM image_tags\n" +
    "\tWHERE iid > 3 AND iid < 19\n" +
    "\tGROUP BY uid) AS basicRatings\n" +
    "\t\n" +
    "\tON demographic.uid = basicRatings.uid)\n" +
    "\t\n" +
    "\tLEFT JOIN\n" +
    "\t\n" +
    "\t(SELECT uid, AVG(rating) AS rating_1, AVG(rating_2) AS rating_2, ((AVG(rating) + AVG(rating_2)) / 2) AS rating_avg\n" +
    "\tFROM image_tags\n" +
    "\tWHERE iid >= 19\n" +
    "\tGROUP BY uid) AS bonusRatings\n" +
    "\t\n" +
    "\tON demographic.uid = bonusRatings.uid)\n" +
    "\t\n" +
    "\tLEFT JOIN\n" +
    "\t\n" +
    "(SELECT \n" +
    "\tuid, CEIL(COUNT(uid) / 5) AS extraRounds\n" +
    "FROM\n" +
    "\t(SELECT uid FROM image_tags WHERE iid >= 19 GROUP BY uid, iid) AS tagsPerImage\n" +
    "GROUP BY uid) AS numExtraRounds" +
    "\t\n" +
    "\tON demographic.uid = numExtraRounds.uid)\n" +
    "    ORDER BY uid";

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

        var csvString = "user_id;condition;age;sex;sex[freetext];nationality;nationality[freetext];url_where_from;typing_speed;gaming_time;avg_time_img_basic_bonus;avg_time_img_basic;avg_time_img_bonus;tags_tutorial;tags_basic;tags_bonus;tags_basic_and_bonus;extra_rounds;rating_tutorial_1;rating_tutorial_2;rating_tutorial_mean;rating_basic_1;rating_basic_2;rating_basic_mean;rating_extra_1;rating_extra_2;rating_extra_mean;dga_game_affinity;dga_video_game_frequency;dga_video_game_passion;dga_board_game_frequency;dga_board_game_passion;game_affinity;cs_satsified;cs_easiness;cs_motivation_for_others;cs_motivation_for_me;cs_relevance_of_setting;cs_already_motivated;imp_satisfied_with_concept;imp_satisfied_opt;imp_all_aspects_implemented;imp_satisfied_general;imp_motiv_design;imp_motiv_design_process;imp_optical_comment;imp_aspects_comment;satisfaction_with_implementation;more_or_less_tags_without_concept;feasibility;change_something_with_concept;changes;already_game_designed;tagging_already_known;BF_extraversion;BF_neuroticism;BF_openness_to_experience;BF_conscientiousness;BF_aggreeableness;IMI_interest_enjoyment;IMI_perceived_competence;IMI_perceived_choice;IMI_pressure_tension;SUS;comments\n";
        results.forEach(function(row, idx) {
            csvString += cropDBEntry(row.uid, 0)+ ";";
            csvString += cropDBEntry(row.gid, 0)+ ";";

            var demographic = JSON.parse(JSON.parse(row.demographic));
            var concept = JSON.parse(JSON.parse(row.concept));
            var imi = JSON.parse(JSON.parse(row.imi));
            var implementation = JSON.parse(JSON.parse(row.implementation));
            var bigFive = JSON.parse(JSON.parse(row.bigFive));

            if(demographic == null) demographic = {};
            if(concept == null) concept = {concept_satisfaction : {}};
            if(imi == null) imi = {design_game_affinity : {}};
            if(implementation == null) implementation = {design_implementation : {}};
            if(bigFive == null) bigFive = {};

         /*   console.log(demographic);
            console.log(concept);
            console.log(imi);
            console.log(implementation);
            console.log(bigFive);
*/
            csvString += getAge(checkJSONValue(demographic.age)) + ";";
            csvString += getGender(checkJSONValue(demographic.gender)) + ";";
            csvString += checkJSONValue(demographic.gender) + ";";
            csvString += getNationality(checkJSONValue(demographic.nationality)) + ";";
            csvString += checkJSONValue(demographic.nationality) + ";";
            csvString += getWhereFrom(checkJSONValue(demographic.url_where_from)) + ";";
            csvString += checkJSONValue(demographic.speed_test_value).split(" ")[0] + ";";

            csvString += checkJSONValue(concept.design_playtime) + ";";
            if(!row.bonusTime == "0") {
                csvString += cropDBEntry(row.overallTime, 4) + ";";
                csvString += cropDBEntry(checkJSONValue(row.basicTime), 4) + ";";
                csvString += cropDBEntry(checkJSONValue(row.bonusTime), 4) + ";";
            } else {
                csvString += cropDBEntry(checkJSONValue(row.basicTime), 4) + ";";
                csvString += cropDBEntry(checkJSONValue(row.basicTime), 4) + ";";
                csvString += "" + ";";
            }

            csvString += checkJSONValue(row.tutTags) + ";";
            csvString += checkJSONValue(row.normTags) + ";";
            csvString += checkJSONValue(row.bonusTags) + ";";
            csvString += checkJSONValue(row.normAndBonusTags) + ";";
            csvString += checkJSONValue(row.extraRounds) + ";";

            csvString += cropDBEntry(row.tut_rating_1, 4) + ";";
            csvString += cropDBEntry(row.tut_rating_2, 4) + ";";
            csvString += cropDBEntry(row.tut_rating_avg, 4) + ";";
            csvString += cropDBEntry(row.base_rating_1, 4) + ";";
            csvString += cropDBEntry(row.base_rating_2, 4) + ";";
            csvString += cropDBEntry(row.base_rating_avg, 4) + ";";
            csvString += cropDBEntry(row.bonus_rating_1, 4) + ";";
            csvString += cropDBEntry(row.bonus_rating_2, 4) + ";";
            csvString += cropDBEntry(row.bonus_rating_avg, 4) + ";";

            /*    if(demographic.speed_test_value !== undefined) {
                csvString += parseInt(checkJSONValue(implementation.design_implementation.imp_motiv_design_process)) <= 3 ? 0 : 1;
                csvString += ";";
                csvString += parseInt(checkJSONValue(implementation.design_implementation.imp_motiv_design)) <= 3 ? 0 : 1;
                csvString += ";";
            } else {
                csvString += "" + ";" + "" + ";";
            } */

            if(imi.design_game_affinity.game_affinity !== undefined) {
                csvString += checkJSONValue(imi.design_game_affinity.game_affinity) + ";";
                csvString += checkJSONValue(imi.design_game_affinity.video_game_frequency) + ";";
                csvString += checkJSONValue(imi.design_game_affinity.video_game_passion) + ";";
                csvString += checkJSONValue(imi.design_game_affinity.board_game_frequency) + ";";
                csvString += checkJSONValue(imi.design_game_affinity.board_game_passion) + ";";
                csvString += cropDBEntry((
                    parseInt(imi.design_game_affinity.game_affinity) +
                    parseInt(imi.design_game_affinity.video_game_frequency) +
                    parseInt(imi.design_game_affinity.video_game_passion) +
                    parseInt(imi.design_game_affinity.board_game_frequency) +
                    parseInt(imi.design_game_affinity.board_game_passion)) / 5) + ";";
            } else {
                csvString += checkJSONValue(concept.design_game_affinity.game_affinity) + ";";
                csvString += checkJSONValue(concept.design_game_affinity.video_game_frequency) + ";";
                csvString += checkJSONValue(concept.design_game_affinity.video_game_passion) + ";";
                csvString += checkJSONValue(concept.design_game_affinity.board_game_frequency) + ";";
                csvString += checkJSONValue(concept.design_game_affinity.board_game_passion) + ";";
                csvString += cropDBEntry((
                    parseInt(concept.design_game_affinity.game_affinity) +
                    parseInt(concept.design_game_affinity.video_game_frequency) +
                    parseInt(concept.design_game_affinity.video_game_passion) +
                    parseInt(concept.design_game_affinity.board_game_frequency) +
                    parseInt(concept.design_game_affinity.board_game_passion)) / 5) + ";";
            }


            csvString += checkJSONValue(concept.concept_satisfaction.satisfied) + ";";
            csvString += checkJSONValue(concept.concept_satisfaction.easiness) + ";";
            csvString += checkJSONValue(concept.concept_satisfaction.motivation_for_others) + ";";
            csvString += checkJSONValue(concept.concept_satisfaction.motivation_for_me) + ";";
            csvString += checkJSONValue(concept.concept_satisfaction.relevance_of_setting) + ";";
            csvString += checkJSONValue(concept.concept_satisfaction.already_motivated) + ";";

            csvString += checkJSONValue(implementation.design_implementation.imp_satisfied_with_concept) + ";";
            csvString += checkJSONValue(implementation.design_implementation.imp_satisfied_opt) + ";";
            csvString += checkJSONValue(implementation.design_implementation.imp_all_aspects_implemented) + ";";
            csvString += checkJSONValue(implementation.design_implementation.imp_satisfied_general) + ";";
            csvString += checkJSONValue(implementation.design_implementation.imp_motiv_design) + ";";
            csvString += checkJSONValue(implementation.design_implementation.imp_motiv_design_process) + ";";
            csvString += checkJSONValue(implementation.imp_optical_comment).replace(/\n/g, "").replace(/;/g, "") + ";";
            csvString += checkJSONValue(implementation.imp_aspects_comment).replace(/\n/g, "").replace(/;/g, "") + ";";
            if(implementation.design_implementation.imp_satisfied_with_concept !== undefined) {
                csvString += cropDBEntry((
                    parseInt(implementation.design_implementation.imp_satisfied_with_concept) +
                    parseInt(implementation.design_implementation.imp_satisfied_opt) +
                    parseInt(implementation.design_implementation.imp_all_aspects_implemented) +
                    parseInt(implementation.design_implementation.imp_satisfied_general) +
                    parseInt(implementation.design_implementation.imp_motiv_design) +
                    parseInt(implementation.design_implementation.imp_motiv_design_process)) / 6, 9) + ";";
            } else csvString += "" + ";";
            csvString += getMoreTagsTendency(checkJSONValue(implementation.self_design_more_tags)) + ";";

            csvString += getDesignFeasibility(checkJSONValue(concept.design_feasibility)) + ";";
            csvString += getYesNo(checkJSONValue(implementation.change_something)) + ";";
            csvString += '"' + checkJSONValue(implementation.changes).replace(/\n/g, "").replace(/"/g, "\"\"") + '";';
            csvString += getYesNo(checkJSONValue(concept.design_game_already_designed)) + ";";
            csvString += getYesNo(checkJSONValue(concept.image_tagging_known_before)) + ";";

            if(bigFive.big_five_matrix !== undefined) {
                csvString += cropDBEntry((reverseBF(bigFive.big_five_matrix.bf_reserved) + parseInt(bigFive.big_five_matrix.bf_social)) / 2, 1) + ";";
                csvString += cropDBEntry((reverseBF(bigFive.big_five_matrix.bf_relaxed_stress) + parseInt(bigFive.big_five_matrix.bf_fast_nervous)) / 2, 1) + ";";
                csvString += cropDBEntry((reverseBF(bigFive.big_five_matrix.bf_art_interest) + parseInt(bigFive.big_five_matrix.bf_fantasy)) / 2, 1) + ";";
                csvString += cropDBEntry((reverseBF(bigFive.big_five_matrix.bf_convenient) + parseInt(bigFive.big_five_matrix.bf_task_properly)) / 2, 1) + ";";
                csvString += cropDBEntry((parseInt(bigFive.big_five_matrix.bf_trust) + reverseBF(bigFive.big_five_matrix.bf_criticize)) / 2, 1) + ";";
            } else if(demographic.big_five_matrix !== undefined) {
                csvString += cropDBEntry((reverseBF(demographic.big_five_matrix.bf_reserved) + parseInt(demographic.big_five_matrix.bf_social)) / 2, 1) + ";";
                csvString += cropDBEntry((reverseBF(demographic.big_five_matrix.bf_relaxed_stress) + parseInt(demographic.big_five_matrix.bf_fast_nervous)) / 2, 1) + ";";
                csvString += cropDBEntry((reverseBF(demographic.big_five_matrix.bf_art_interest) + parseInt(demographic.big_five_matrix.bf_fantasy)) / 2, 1) + ";";
                csvString += cropDBEntry((reverseBF(demographic.big_five_matrix.bf_convenient) + parseInt(demographic.big_five_matrix.bf_task_properly)) / 2, 1) + ";";
                csvString += cropDBEntry((parseInt(demographic.big_five_matrix.bf_trust) + reverseBF(demographic.big_five_matrix.bf_criticize)) / 2, 1) + ";";
            } else {
                    console.log(demographic);
                    console.log(concept);
                    console.log(imi);
                    console.log(implementation);
                    console.log(bigFive);
            }

            if(imi.imi_interest_enjoyment !== undefined) {
                csvString += (
                    parseInt(checkJSONValue(imi.imi_interest_enjoyment.tagging_fun)) +
                    parseInt(checkJSONValue(imi.imi_interest_enjoyment.tagging_interesting)) +
                    parseInt(checkJSONValue(imi.imi_interest_enjoyment.tagging_entertaining))) - 3 + ";";

                csvString += (
                    parseInt(checkJSONValue(imi.imi_interest_enjoyment.tagging_performance)) +
                    parseInt(checkJSONValue(imi.imi_interest_enjoyment.tagging_competence)) +
                    parseInt(checkJSONValue(imi.imi_interest_enjoyment.tagging_success))) - 3 + ";";

                csvString += (
                    parseInt(checkJSONValue(imi.imi_interest_enjoyment.tagging_choice_steering)) +
                    parseInt(checkJSONValue(imi.imi_interest_enjoyment.tagging_choice_self)) +
                    parseInt(checkJSONValue(imi.imi_interest_enjoyment.tagging_choice_generic))) - 3 + ";";

                csvString += (
                    parseInt(checkJSONValue(imi.imi_interest_enjoyment.tagging_pressure)) +
                    parseInt(checkJSONValue(imi.imi_interest_enjoyment.tagging_tension)) +
                    parseInt(checkJSONValue(imi.imi_interest_enjoyment.tagging_concerns))) - 3 + ";";
            } else {
                csvString += (
                    parseInt(checkJSONValue(implementation.imi_interest_enjoyment.tagging_fun)) +
                    parseInt(checkJSONValue(implementation.imi_interest_enjoyment.tagging_interesting)) +
                    parseInt(checkJSONValue(implementation.imi_interest_enjoyment.tagging_entertaining))) - 3 + ";";

                csvString += (
                    parseInt(checkJSONValue(implementation.imi_interest_enjoyment.tagging_performance)) +
                    parseInt(checkJSONValue(implementation.imi_interest_enjoyment.tagging_competence)) +
                    parseInt(checkJSONValue(implementation.imi_interest_enjoyment.tagging_success))) - 3 + ";";

                csvString += (
                    parseInt(checkJSONValue(implementation.imi_interest_enjoyment.tagging_choice_steering)) +
                    parseInt(checkJSONValue(implementation.imi_interest_enjoyment.tagging_choice_self)) +
                    parseInt(checkJSONValue(implementation.imi_interest_enjoyment.tagging_choice_generic))) - 3 + ";";

                csvString += (
                    parseInt(checkJSONValue(implementation.imi_interest_enjoyment.tagging_pressure)) +
                    parseInt(checkJSONValue(implementation.imi_interest_enjoyment.tagging_tension)) +
                    parseInt(checkJSONValue(implementation.imi_interest_enjoyment.tagging_concerns))) - 3 + ";";
            }

            if(implementation.sus_matrix !== undefined) {
                csvString += ((
                    (parseInt(checkJSONValue(implementation.sus_matrix.sus_frequently)) - 1) +
                    (5 - parseInt(checkJSONValue(implementation.sus_matrix.sus_unnecessary_complex))) +
                    (parseInt(checkJSONValue(implementation.sus_matrix.sus_easiness_to_use)) - 1) +
                    (5 - parseInt(checkJSONValue(implementation.sus_matrix.sus_technical_experienced))) +
                    (parseInt(checkJSONValue(implementation.sus_matrix.sus_functions_well_integrated)) - 1) +
                    (5 - parseInt(checkJSONValue(implementation.sus_matrix.sus_too_inconsistent))) +
                    (parseInt(checkJSONValue(implementation.sus_matrix.sus_fast_learnable)) - 1) +
                    (5 - parseInt(checkJSONValue(implementation.sus_matrix['sus_inconvenient ']))) +
                    (parseInt(checkJSONValue(implementation.sus_matrix.sus_safety_while_using)) - 1) +
                    (5 - parseInt(checkJSONValue(implementation.sus_matrix.sus_lot_to_learn_before)))) * 2.5).toString().replace(".", ",") + ";";
            } else {
                csvString += ((
                    (parseInt(checkJSONValue(imi.sus_matrix.sus_frequently)) - 1) +
                    (5 - parseInt(checkJSONValue(imi.sus_matrix.sus_unnecessary_complex))) +
                    (parseInt(checkJSONValue(imi.sus_matrix.sus_easiness_to_use)) - 1) +
                    (5 - parseInt(checkJSONValue(imi.sus_matrix.sus_technical_experienced))) +
                    (parseInt(checkJSONValue(imi.sus_matrix.sus_functions_well_integrated)) - 1) +
                    (5 - parseInt(checkJSONValue(imi.sus_matrix.sus_too_inconsistent))) +
                    (parseInt(checkJSONValue(imi.sus_matrix.sus_fast_learnable)) - 1) +
                    (5 - parseInt(checkJSONValue(imi.sus_matrix['sus_inconvenient ']))) +
                    (parseInt(checkJSONValue(imi.sus_matrix.sus_safety_while_using)) - 1) +
                    (5 - parseInt(checkJSONValue(imi.sus_matrix.sus_lot_to_learn_before)))) * 2.5).toString().replace(".", ",") + ";";
            }

            csvString += imi.comments !== undefined ? checkJSONValue(imi.comments).replace(/\n/g, "").replace(/;/g, "") : checkJSONValue(implementation.comments).replace(/\n/g, "").replace(/;/g, "");
            csvString += "\n";
        });

        fs.unlink('CSV/auswertung.csv', function(err) {
            fs.appendFile('CSV/auswertung.csv', csvString, function(err) {
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

function getDesignFeasibility(string) {
    if(string == "") return string;
    if(string.toLowerCase().includes("einschätz")) return 0;
    if(string.toLowerCase().includes("leicht")) return 1;
    if(string.toLowerCase().includes("schwer")) return 2;
    if(string.toLowerCase().includes("umsetzbar")) return 3;
    return -1;
}

function getYesNo(string) {
    if(string == "") return string;
    if(string.toLowerCase() == "nein") return 0;
    if(string.toLowerCase() == "ja") return 1;
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
    if(string == "Männlich") return 2;
    if(string == "Weiblich") return 1;
    if(string.includes("Möchte ich nicht") || string.toLowerCase() == "keine angabe") return 0;
    return 3;
}

function getNationality(string) {
    if(string.toLowerCase().includes("deutsch")) return 0;
    if(string.toLowerCase().includes("bosnisch")) return 1;
    if(string.toLowerCase().includes("chinesisch")) return 2;
    if(string.toLowerCase().includes("türkisch")) return 3;
    if(string.toLowerCase().includes("indisch")) return 4;
    if(string.toLowerCase().includes("österreich")) return 5;
    if(string.toLowerCase().includes("schweizerisch")) return 6;
    if(string.toLowerCase().includes("algerisch") || string.toLowerCase().includes("dz")) return 7;
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
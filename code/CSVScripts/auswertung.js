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
    "SELECT \n" +
    "\tdemographic.uid,\n" +
    "    cond.gid,\n" +
    "    demographic.json_answer AS demographic,\n" +
    "    concept.json_answer AS concept,\n" +
    "    imi.json_answer AS imi,\n" +
    "    implementation.json_answer AS implementation,\n" +
    "    bigFive.json_answer AS bigFive\n" +
    "FROM (((((\n" +
    "\t(SELECT uid, json_answer\n" +
    "    FROM questionnaires_users\n" +
    "    WHERE qid = 4) AS demographic\n" +
    "\t\n" +
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
    "\n" +
    "\tLEFT JOIN\n" +
    "    \n" +
    "    (SELECT uid, gid\n" +
    "    FROM users_groups) AS cond\n" +
    "    \n" +
    "    ON demographic.uid = cond.uid)\n" +
    "ORDER BY uid";

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

        var csvString = "user_id;condition;age;sex;nationality;url_where_from;typing_speed;gaming_time;motiv_part_design;motiv_part_game;dga_game_affinity;dga_video_game_frequency;dga_video_game_passion;dga_board_game_frequency;dga_board_game_passion;cs_satisfied;cs_easiness;cs_motivation_for_others;cs_motivation_for_me;cs_relevance_of_setting;cs_already_motivated;imp_satisfied_with_concept;imp_satisfied_opt;imp_all_aspects_implemented;imp_satisfied_general;imp_motiv_design;imp_motiv_design_process;imp_optical_comment;imp_aspects_comment;more_or_less_tags_without_concept;feasibility;change_something_with_concept;changes;already_game_designed;tagging_already_known;BF_extraversion;BF_neuroticism;BF_openness_to_experience;BF_conscientiousness;BF_agreeableness;IMI_interest_enjoyment;IMI_perceived_competence;IMI_perceived_choice;IMI_pressure_tension;SUS;comments\n";
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

            csvString += getAge(checkJSONValue(demographic.age)) + ";";
            csvString += getGender(checkJSONValue(demographic.gender)) + ";";
            csvString += getNationality(checkJSONValue(demographic.nationality)) + ";";
            csvString += getWhereFrom(checkJSONValue(demographic.url_where_from)) + ";";
            csvString += checkJSONValue(demographic.speed_test_value).split(" ")[0] + ";";

            csvString += checkJSONValue(concept.design_playtime) + ";";
            if(demographic.speed_test_value !== undefined) {
                csvString += parseInt(checkJSONValue(implementation.design_implementation.imp_motiv_design_process)) <= 3 ? 0 : 1;
                csvString += ";";
                csvString += parseInt(checkJSONValue(implementation.design_implementation.imp_motiv_design)) <= 3 ? 0 : 1;
                csvString += ";";
            } else {
                csvString += "" + ";" + "" + ";";
            }


            csvString += checkJSONValue(imi.design_game_affinity.game_affinity) + ";";
            csvString += checkJSONValue(imi.design_game_affinity.video_game_frequency) + ";";
            csvString += checkJSONValue(imi.design_game_affinity.video_game_passion) + ";";
            csvString += checkJSONValue(imi.design_game_affinity.board_game_frequency) + ";";
            csvString += checkJSONValue(imi.design_game_affinity.board_game_passion) + ";";

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
            csvString += getMoreTagsTendency(checkJSONValue(implementation.self_design_more_tags)) + ";";

            csvString += getDesignFeasibility(checkJSONValue(concept.design_feasibility)) + ";";
            csvString += getYesNo(checkJSONValue(implementation.change_something)) + ";";
            csvString += checkJSONValue(implementation.changes).replace(/\n/g, "").replace(/;/g, "") + ";";
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
    return "";
}

function getDesignFeasibility(string) {
    if(string == "") return string;
    if(string.toLowerCase().includes("einschätzbar")) return 0;
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
    return 0;
}

function getGender(string) {
    if(string == "") return string;
    if(string == "Männlich") return 2;
    if(string == "Weiblich") return 1;
    if(string.includes("Möchte ich nicht") || string.toLowerCase() == "keine angabe") return 0;
    return string;
}

function getNationality(string) {
    if(string.toLowerCase().includes("deutsch")) return 0;
    if(string.toLowerCase().includes("bosnisch")) return 1;
    if(string.toLowerCase().includes("chinesisch")) return 2;
    if(string.toLowerCase().includes("türkisch")) return 3;
    if(string.toLowerCase().includes("indisch")) return 4;
    if(string.toLowerCase().includes("österreich")) return 5;
    if(string.toLowerCase().includes("schweizerisch")) return 6;
    if(string.toLowerCase().includes("algerisch")) return 7;
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
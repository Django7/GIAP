var mysql = require('mysql');
var fs = require('fs');

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

            var demographic = JSON.parse(JSON.parse(row.demographic)) || {};
            var concept = JSON.parse(JSON.parse(row.concept)) || {concept_satisfaction : {}};
            var imi = JSON.parse(JSON.parse(row.imi)) || {design_game_affinity : {}};
            var implementation = JSON.parse(JSON.parse(row.implementation)) || {design_implementation : {}};
            var bigFive = JSON.parse(JSON.parse(row.bigFive)) || {};
            console.log(demographic);
            console.log(concept);
            console.log(imi);
            console.log(implementation);
            console.log(bigFive);

            csvString += getAge(checkJSONValue(demographic.age)) + ";";
            csvString += getGender(checkJSONValue(demographic.gender)) + ";";
            csvString += getNationality(checkJSONValue(demographic.nationality)) + ";";
            csvString += getWhereFrom(checkJSONValue(demographic.url_where_from)) + ";";
            csvString += checkJSONValue(demographic.speed_test_value).split(" ")[0] + ";";

            csvString += checkJSONValue(concept.design_playtime) + ";";
            csvString += /*checkJSONValue(concept.motiv_part_design) + */ ";";
            csvString += /*checkJSONValue(concept.motiv_part_game) + */ ";";

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
            csvString += checkJSONValue(implementation.imp_optical_comment).replace(/\n/g, "") + ";";
            csvString += checkJSONValue(implementation.imp_aspects_comment).replace(/\n/g, "") + ";";
            csvString += getMoreTagsTendency(checkJSONValue(implementation.self_design_more_tags)) + ";";

            csvString += getDesignFeasibility(checkJSONValue(concept.design_feasibility)) + ";";
            csvString += getDesignFeasibility(checkJSONValue(concept.design_feasibility)) + ";";
            csvString += getYesNo(checkJSONValue(implementation.change_something)) + ";";
            csvString += checkJSONValue(implementation.changes).replace(/\n/g, "") + ";";
            if(checkJSONValue(implementation.changes).includes("Die Verteilung")) {
                console.log("Here!");
            }
            csvString += getYesNo(checkJSONValue(implementation.design_game_already_designed)) + ";";
            csvString += getYesNo(checkJSONValue(implementation.image_tagging_known_before)) + "\n";
        });

        fs.unlink('auswertung.csv', function(err) {
            fs.appendFile('auswertung.csv', csvString, function(err) {
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
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
    "      tut.tutorial,\n" +
    "    tutTags.numTags AS tutTags,\n" +
    "\ttutorialRatings.rating_1 AS tut_rating_1,\n" +
    "\ttutorialRatings.rating_2 AS tut_rating_2,\n" +
    "\ttutorialRatings.rating_avg AS tut_rating_avg,\n" +

    "    kim_enjoyment_choice1.json_answer AS kim_enjoyment_choice1,\n" + //qid4
    "    kim_enjoyment_choice2.json_answer AS kim_enjoyment_choice2,\n" + //qid5



    "    lbs_C_abs.json_answer AS lbs_C_abs,\n" +  //qid12
    "    lbs_C_rel.json_answer AS lbs_C_rel,\n" +  //qid13


    "    demographic_gami.json_answer AS demographic_gami,\n" +  //qid20

    "    basics_gami.json_answer AS basics_gami,\n" + //qid22

    "    debrief_C_abs.json_answer AS debrief_C_abs\n" +

    "FROM ((((((((((\n" +  // (((((


//joined hier eigtl die questionnaires miteinander...kann ich ja nicht...warum ist das in der datenbank ganz anders?

//questionnaires werden hier nach schema kim1+(kim2)+jeweiliges end_ gejoined
//kim1 wird immer beantwortet, daher als erstes
"\t(SELECT uid, json_answer\n" +
    "    FROM questionnaires_users\n" + //first 3 because they dont want to be included //5731 because of random gender // rest because do not think their data should be used //2931 because of technical problem //551 no tags //2251 nur wunderschön // danach wegen times analyse (431)
    "    WHERE qid = 4 AND uid > 6500 AND NOT uid = 7161 AND NOT uid = 9801 AND NOT uid = 8321) AS kim_enjoyment_choice1\n" + 
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
    "    WHERE qid = 12) AS lbs_C_abs\n" +
    "    \n" +
    "    ON kim_enjoyment_choice1.uid = lbs_C_abs.uid)\n" +
    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" +  
    "    (SELECT uid, json_answer\n" +
    "    FROM questionnaires_users\n" +
    "    WHERE qid = 13) AS lbs_C_rel\n" +
    "    \n" +
    "    ON kim_enjoyment_choice1.uid = lbs_C_rel.uid)\n" +
    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" +  



    //bis hierhin leaderboard fragen


    //bis hierhin leaderboard fragen


    "    (SELECT uid, json_answer\n" +
    "    FROM questionnaires_users\n" +
    "    WHERE qid = 20) AS demographic_gami\n" +
    "    \n" +
    "    ON kim_enjoyment_choice1.uid = demographic_gami.uid)\n" +
    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" +  

    //bis hierhin demographic


    "    (SELECT uid, json_answer\n" +
    "    FROM questionnaires_users\n" +
    "    WHERE qid = 22) AS basics_gami\n" +
    "    \n" +
    "    ON kim_enjoyment_choice1.uid = basics_gami.uid)\n" +
    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" +  

    //bis hierhin basics


    "    (SELECT uid, json_answer\n" +
    "    FROM questionnaires_users\n" +
    "    WHERE qid = 31) AS debrief_C_abs\n" +
    "    \n" +
    "    ON kim_enjoyment_choice1.uid = debrief_C_abs.uid)\n" +
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

    "    (SELECT uid, tutorial\n" + 
    "    FROM choice) AS tut\n" +
    "    \n" +
    "    ON kim_enjoyment_choice1.uid = tut.uid)\n" +
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







// hier werden die gerateten tags aus der db gezogen
    "    (SELECT uid, AVG(rating) AS rating_1, AVG(rating_2) AS rating_2, ((AVG(rating) + AVG(rating_2)) / 2) AS rating_avg\n" +
    "\tFROM image_tags\n" +
    "\tWHERE iid <= 2\n" + //von 3auf 2 runter
    "\tGROUP BY uid) AS tutorialRatings\n" +
    "    \n" +
    "    ON kim_enjoyment_choice1.uid = tutorialRatings.uid)\n" +




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

        //var csvString = "user_id;condition;chosen_group;age;sex;sex[freetext];nationality;nationality[freetext];url_where_from;url_where_from[freetext];tags_tutorial;tags_basic;rating_tutorial_1;rating_tutorial_2;rating_tutorial_mean;rating_basic_1;rating_basic_2;rating_basic_mean;KIM_enjoyment_1; KIM_enjoyment_2;IMI_interest_enjoyment;IMI_perceived_competence;IMI_perceived_choice;IMI_pressure_tension;tp_boring;tp_important;lbg_1_leaderboard;lbg_2_motivated;lbg_3_motivating_in_general;lbg_4_distracted;lbg_5_design;lbs_absoluted;lbs_relative;lbs_rel_more_less;lbs_absolute_chosen_explain;lbs_relative_chosen_explain;choice_tutorial;choice_overstained;choice_satisfied;choice_liked;choice_motivated;choice_more_options;choice_ideas;choice_none_extra_elements;choice_abs_first_options;choice_rel_first_options;choice_none_options;choice_none_decide;choice_none_explain;basics_gaming_time;basics_gamification_experience;basics_gami_exp_except_study;basics_gami_used;basics_gami_good;basics_gami_general_liking;basics_game_affinity;basics_video_game_frequency;basics_video_game_passion;basics_board_game_frequency;basics_board_game_passion;basics_game_performance;cc_usable;cc_comments\n";
        
        var csvString = "user_id;condition;chosen_group;tutorial;age;sex;sex[freetext];nationality;nationality[freetext];url_where_from;url_where_from[freetext];";
        
        
        var tagsString = "tags_tutorial.Anzahl Tags im Tutorial;rating_tutorial_1. Rating der Tutorial Tags Dennis;rating_tutorial_2. Rating der Tutorial Tags Luis;rating_tutorial_mean. Rating der Tutorial Tags Durchschnitt;";
          
        var LBGString = "KIM_enjoyment_1. Gesamtrating KIM enjoyment nach Tutorial_1; KIM_enjoyment_2. Gesamtrating KIM enjoyment nach Tutorial_2;lbg_1_leaderboard. Ich mochte es, mich mit anderen auf einer Bestenliste zu vergleichen. [Stimme nicht zu, Stimme eher nicht zu, Weder noch, Stimme eher zu, Stimme zu];lbg_2_motivated. Mich mit anderen auf einer Bestenliste vergleichen zu können, hat mich motiviert, mehr Tags zu erstellen. [Stimme nicht zu, Stimme eher nicht zu, Weder noch, Stimme eher zu, Stimme zu];lbg_3_motivating_in_general. Ich finde den Vergleich mit anderen auf einer Bestenliste allgemein motivierend. [Stimme nicht zu, Stimme eher nicht zu, Weder noch, Stimme eher zu, Stimme zu];lbg_4_distracted. Ich fühlte mich durch die Bestenliste abgelenkt. [Stimme nicht zu, Stimme eher nicht zu, Weder noch, Stimme eher zu, Stimme zu];lbg_5_design. Mir hat das Aussehen der Bestenliste gefallen. [Stimme nicht zu, Stimme eher nicht zu, Weder noch, Stimme eher zu, Stimme zu];";
        
        var ChoiceString_1 = "choice_tutorial. Das Tutorial half mir, meine Wahlmöglichkeiten zu verstehen. [Stimme nicht zu, Stimme eher nicht zu, Weder noch, Stimme eher zu, Stimme zu];choice_overstained. Ich fühlte mich überfordert zu entscheiden, welche Version der Bestenliste ich verwenden möchte. [Stimme nicht zu, Stimme eher nicht zu, Weder noch, Stimme eher zu, Stimme zu];choice_liked. Ich finde es gut, dass ich entscheiden konnte welche Version der Bestenliste verwendet wurde. [Stimme nicht zu, Stimme eher nicht zu, Weder noch, Stimme eher zu, Stimme zu];";
        
        var ChoiceString_2 = "choice_scroll. Ist dir aufgefallen, dass du auf der Bestenliste, welche alle Spieler*innen gleichzeitig angezeigt hat, hoch und runter scrollen kannst? [Ja/Nein];choice_scroll_perception. Ich finde es gut, dass ich auf der Bestenliste scrollen muss, um alle Spieler*innen zu sehen. [Stimme nicht zu, Stimme eher nicht zu, Weder noch, Stimme eher zu, Stimme zu];";

        var LBSString = "lbs_absolute_chosen_explain. Warum hast du die Bestenliste ausgewählt, welche alle Spieler gleichzeitig angezeigt hat, anstatt der Bestenliste, welche nur die Spieler angezeigt hat welche direkt über und unter du platziert waren? [Freitext];lbs_relative_chosen_explain. Warum hast du die Bestenliste ausgewählt, welche nur die Spieler angezeigt hat welche direkt über und unter Ihnen platziert waren, anstatt der Bestenliste welche alle Spieler gleichzeitig angezeigt hat? [Freitext];";
        
        var LBSChoiceString = "lbs_choice_count. Hier siehst du Bilder, welche die Bestenlisten mit nur 7 anstatt 100 Teilnehmern zeigen. Hättest du dich anders entschieden, wenn im Tutorial diese Bestenlisten präsentiert worden wären?[Ja/Nein];lbs_choice_explain. Warum hättest du dich anders entschieden?[Freitext];lbs_choice_count_2. Hier siehst du Bilder, welche die Bestenlisten mit nur 1000 anstatt 100 Teilnehmern zeigen. Hättest du dich anders entschieden, wenn im Tutorial diese Bestenlisten präsentiert worden wären?[Ja/Nein];lbs_choice_explain_2. Warum hättest du dich anders entschieden?[Freitext];";

        var BasicsString = "basics_gaming_time. Wie viele Stunden pro Woche spielst du im Schnitt Spiele (egal ob analog oder digital)? [keine, weniger als 1, 1-3, 4-10, 11-15, 16-20, 21-25, mehr als 26, Möchte ich nicht beantworten];basics_gami_exp_except_study. Unter \"Gamification\" versteht man den Einsatz spieltypischer Elemente (z.B. Punk- te/Bestenlisten) in spielfremden Umgebungen zur Verhaltensänderung und zur Steigerung der Motivation (z.B. Vergabe von Punkten in Fitnessapps). Hast du, abgesehen von der Gamifizierung, die in dieser Studie angeboten bzw. genutzt wurde, in der Vergangenheit Erfahrungen mit gamifizierten Systemen gemacht? [No/Yes];basics_gami_good. Ich fand die in dieser Studie angebotene Gamification gut [Stimme nicht zu, Stimme eher nicht zu, Weder noch, Stimme eher zu, Stimme zu];basics_gami_general_liking. Ich verwende gerne gamifizierte Systeme. [Stimme nicht zu, Stimme eher nicht zu, Weder noch, Stimme eher zu, Stimme zu];basics_game_affinity. Ich halte mich selbst für spielaffin. [Stimme nicht zu, Stimme eher nicht zu, Weder noch, Stimme eher zu, Stimme zu];basics_video_game_frequency. Ich spiele häufig Videospiele. [Stimme nicht zu, Stimme eher nicht zu, Weder noch, Stimme eher zu, Stimme zu];basics_video_game_passion. Ich habe eine Leidenschaft für Videospiele. [Stimme nicht zu, Stimme eher nicht zu, Weder noch, Stimme eher zu, Stimme zu];basics_board_game_frequency. Ich spiele häufig Brettspiele. [Stimme nicht zu, Stimme eher nicht zu, Weder noch, Stimme eher zu, Stimme zu];basics_board_game_passion. Ich habe eine Leidenschaft für Brettspiele. [Stimme nicht zu, Stimme eher nicht zu, Weder noch, Stimme eher zu, Stimme zu];basics_game_performance. Es ist mir in Spielen allgemein wichtig, gute Leistungen zu bringen. [Stimme nicht zu, Stimme eher nicht zu, Weder noch, Stimme eher zu, Stimme zu];";
        
        var CCString = "cc_usable;cc_comments;end_usable;\n";
        

        csvString += tagsString + LBGString + ChoiceString_1 + ChoiceString_2 + LBSString + LBSChoiceString + BasicsString + CCString;
        //csvString += questionDemString + questionKIMTPString + questionLBString + choiceString + basicsString + endString;
        results.forEach(function(row, idx) {
            
            
            var condition = 0; //same as lb chosen 1 = absolute, 2 = relative
            
            //the questionnaires
            var kim_enjoyment_choice1 = JSON.parse(JSON.parse(row.kim_enjoyment_choice1));
            var kim_enjoyment_choice2 = JSON.parse(JSON.parse(row.kim_enjoyment_choice2));


            var lbs_C_abs = JSON.parse(JSON.parse(row.lbs_C_abs));
            var lbs_C_rel = JSON.parse(JSON.parse(row.lbs_C_rel));


            var demographic_gami = JSON.parse(JSON.parse(row.demographic_gami));

            var basics_gami = JSON.parse(JSON.parse(row.basics_gami));

            var debrief_C_abs = JSON.parse(JSON.parse(row.debrief_C_abs));

            if(!(debrief_C_abs == null) && checkJSONValue(row.tutTags) != null ){
            //var demographic = JSON.parse(JSON.parse(row.demographic));
            //var imi = JSON.parse(JSON.parse(row.imi));
            csvString += cropDBEntry(row.uid, 0)+ ";";
            csvString += cropDBEntry(row.gid, 0)+ ";"; //sollte immer 6 sein, da jetzt alle in choice sind
            
            if(kim_enjoyment_choice1 == null) kim_enjoyment_choice1 ={};
            if(kim_enjoyment_choice2 == null) kim_enjoyment_choice2 ={}; 


            if(lbs_C_abs == null) {lbs_C_abs ={};} else {condition=1;}   //condition auf 1 oder 2 (siehe oben) setzen
            if(lbs_C_rel == null) {lbs_C_rel ={};}   else {condition=2;}

            if(demographic_gami == null) demographic_gami ={}; 

            if(basics_gami == null) basics_gami ={}; 
            
            if(debrief_C_abs == null) debrief_C_abs ={};

            // immer nur eins der folgenden kann in den else Fall kommen


            //chosen_group anhand der questionnaires prüfen. 0 = nicht in der choice gruppe, 1=absolute gewählt, 2=relative gewählt

            switch(condition){
                case(1):
                csvString += "1" + ";"; //immer in choice absolute
                csvString += checkJSONValue(row.tutorial) + ";"
                break;
                case(2):
                csvString += "2" + ";"; //immer in choice relative
                csvString += checkJSONValue(row.tutorial) + ";"
                break;
            }



//zum kopieren
/*            switch(condition){

                case(1): //choice_absolute
    
                break;
                case(2): //choice_relative
    
                break;
}*/


            switch(condition){
                case(1):
                csvString += getAge(checkJSONValue(demographic_gami.age)) + ";";
                csvString += getGender(checkJSONValue(demographic_gami.gender)) + ";";
                csvString += demographic_gami.gender_Comment !== undefined ? checkJSONValue(demographic_gami.gender_Comment).replace(/\n/g, "").replace(/;/g, "") +";" : "" + ";";
                csvString += getNationality(checkJSONValue(demographic_gami.nationality)) + ";";
                csvString += checkJSONValue(demographic_gami.nationality).replace(/\n/g, "").replace(/;/g, "") + ";";
                csvString += getWhereFrom(checkJSONValue(demographic_gami.url_where_from)) + ";";
                csvString += demographic_gami.url_where_from_Comment !== undefined ? checkJSONValue(demographic_gami.url_where_from_Comment).replace(/\n/g, "").replace(/;/g, "") +";" : "" + ";";
                break;
                case(2):
                csvString += getAge(checkJSONValue(demographic_gami.age)) + ";";
                csvString += getGender(checkJSONValue(demographic_gami.gender)) + ";";
                csvString += demographic_gami.gender_Comment !== undefined ? checkJSONValue(demographic_gami.gender_Comment).replace(/\n/g, "").replace(/;/g, "") +";" : "" + ";";
                csvString += getNationality(checkJSONValue(demographic_gami.nationality)) + ";";
                csvString += checkJSONValue(demographic_gami.nationality).replace(/\n/g, "").replace(/;/g, "") + ";";
                csvString += getWhereFrom(checkJSONValue(demographic_gami.url_where_from)) + ";";
                csvString += demographic_gami.url_where_from_Comment !== undefined ? checkJSONValue(demographic_gami.url_where_from_Comment).replace(/\n/g, "").replace(/;/g, "") +";" : "" + ";";
                break;
                default:
            }

            //Done ^

            //time fürs erste nicht relevant
            /*csvString += checkJSONValue(concept.design_playtime) + ";";*/

            csvString += checkJSONValue(row.tutTags) + ";";

            csvString += cropDBEntry(row.tut_rating_1, 4) + ";";
            csvString += cropDBEntry(row.tut_rating_2, 4) + ";";
            csvString += cropDBEntry(row.tut_rating_avg, 4) + ";";

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
    parseInt(checkJSONValue(kim_enjoyment_choice1.kim_enjoyment_choice1.tagging_entertaining_1))) + ";";

//kim enjoyment2
            switch(condition){
                case(1): //choice_absolute
                csvString += (
                    parseInt(checkJSONValue(kim_enjoyment_choice2.kim_enjoyment_choice2.tagging_fun_2)) +
                    parseInt(checkJSONValue(kim_enjoyment_choice2.kim_enjoyment_choice2.tagging_interesting_2)) +
                    parseInt(checkJSONValue(kim_enjoyment_choice2.kim_enjoyment_choice2.tagging_entertaining_2))) + ";";
                break;
                case(2): //choice_relative
                csvString += (
                    parseInt(checkJSONValue(kim_enjoyment_choice2.kim_enjoyment_choice2.tagging_fun_2)) +
                    parseInt(checkJSONValue(kim_enjoyment_choice2.kim_enjoyment_choice2.tagging_interesting_2)) +
                    parseInt(checkJSONValue(kim_enjoyment_choice2.kim_enjoyment_choice2.tagging_entertaining_2))) + ";";
                break;
}






//leaderboard+choice

switch(condition){
    case(1): //choice_absolute
    csvString += checkJSONValue(lbs_C_abs.general_leaderboard.lbg_1_leaderboard) + ";";
    csvString += checkJSONValue(lbs_C_abs.general_leaderboard.lbg_2_motivated) + ";";
    csvString += checkJSONValue(lbs_C_abs.general_leaderboard.lbg_3_motivating_in_general) + ";";
    csvString += checkJSONValue(lbs_C_abs.general_leaderboard.lbg_4_distracted) + ";";
    csvString += checkJSONValue(lbs_C_abs.general_leaderboard.lbg_5_design) + ";";
    csvString += checkJSONValue(lbs_C_abs.general_leaderboard.choice_tutorial) + ";";
    csvString += checkJSONValue(lbs_C_abs.general_leaderboard.choice_overstained) + ";";
    csvString += checkJSONValue(lbs_C_abs.general_leaderboard.choice_liked) + ";";
    csvString += getYesNo(checkJSONValue(lbs_C_abs.choice_scroll)) + ";";
    csvString += lbs_C_abs.choice_scroll_perception !== undefined ? checkJSONValue(lbs_C_abs.choice_scroll_perception.choice_scroll_perception_1) + ";" : "" + ";";
    csvString += checkJSONValue(lbs_C_abs.lbs_absolute_chosen_explain).replace(/\n/g, "").replace(/;/g, "") + ";";
    csvString += "" + ";";
    csvString += getYesNo(checkJSONValue(lbs_C_abs.lbs_choice_count)) + ";";
    csvString += lbs_C_abs.lbs_choice_explain !== undefined ? checkJSONValue(lbs_C_abs.lbs_choice_explain).replace(/\n/g, "").replace(/;/g, "") + ";" : "" + ";";
    csvString += getYesNo(checkJSONValue(lbs_C_abs.lbs_choice_count_2)) + ";";
    csvString += lbs_C_abs.lbs_choice_explain_2 !== undefined ? checkJSONValue(lbs_C_abs.lbs_choice_explain_2).replace(/\n/g, "").replace(/;/g, "") + ";" : "" + ";";


    demographic_gami.gender_Comment !== undefined ? checkJSONValue(demographic_gami.gender_Comment).replace(/\n/g, "").replace(/;/g, "") +";" : "" + ";";


    break;
    case(2): //choice_relative
    csvString += checkJSONValue(lbs_C_rel.general_leaderboard.lbg_1_leaderboard) + ";";
    csvString += checkJSONValue(lbs_C_rel.general_leaderboard.lbg_2_motivated) + ";";
    csvString += checkJSONValue(lbs_C_rel.general_leaderboard.lbg_3_motivating_in_general) + ";";
    csvString += checkJSONValue(lbs_C_rel.general_leaderboard.lbg_4_distracted) + ";";
    csvString += checkJSONValue(lbs_C_rel.general_leaderboard.lbg_5_design) + ";";
    csvString += checkJSONValue(lbs_C_rel.general_leaderboard.choice_tutorial) + ";";
    csvString += checkJSONValue(lbs_C_rel.general_leaderboard.choice_overstained) + ";";
    csvString += checkJSONValue(lbs_C_rel.general_leaderboard.choice_liked) + ";";
    csvString += getYesNo(checkJSONValue(lbs_C_rel.choice_scroll)) + ";";
    csvString += lbs_C_rel.choice_scroll_perception !== undefined ? checkJSONValue(lbs_C_rel.choice_scroll_perception.choice_scroll_perception_1) + ";" : "" + ";";
    csvString += "" + ";";
    csvString += checkJSONValue(lbs_C_rel.lbs_relative_chosen_explain).replace(/\n/g, "").replace(/;/g, "") + ";";
    csvString += getYesNo(checkJSONValue(lbs_C_rel.lbs_choice_count)) + ";";
    csvString += lbs_C_rel.lbs_choice_explain !== undefined ? checkJSONValue(lbs_C_rel.lbs_choice_explain).replace(/\n/g, "").replace(/;/g, "") + ";" : "" + ";";
    csvString += getYesNo(checkJSONValue(lbs_C_rel.lbs_choice_count_2)) + ";";
    csvString += lbs_C_rel.lbs_choice_explain_2 !== undefined ? checkJSONValue(lbs_C_rel.lbs_choice_explain_2).replace(/\n/g, "").replace(/;/g, "") + ";" : "" + ";";
    break;
}





//Basics
switch(condition){
    case(1): //choice_absolute
    csvString += getGamingTime(checkJSONValue(basics_gami.gaming_time)) + ";";
    csvString += getYesNo(checkJSONValue(basics_gami.basics_gami_exp_except_study)) + ";";
    csvString += checkJSONValue(basics_gami.basics_gami_good.basics_gami_good) + ";";
    csvString += basics_gami.basics_gami_general_liking !== undefined ? checkJSONValue(basics_gami.basics_gami_general_liking.lbs_5) +";" : "" + ";";
    csvString += checkJSONValue(basics_gami.basic_7.basics_game_affinity) + ";";
    csvString += checkJSONValue(basics_gami.basic_7.basics_video_game_frequency) + ";";
    csvString += checkJSONValue(basics_gami.basic_7.basics_video_game_passion) + ";";
    csvString += checkJSONValue(basics_gami.basic_7.basics_board_game_frequency) + ";";
    csvString += checkJSONValue(basics_gami.basic_7.basics_board_game_passion) + ";";
    csvString += checkJSONValue(basics_gami.basic_7.basics_game_performance) + ";";
    csvString += getYesNo(checkJSONValue(basics_gami.cc_usable)) + ";";
    break;
    case(2): //choice_relative
    csvString += getGamingTime(checkJSONValue(basics_gami.gaming_time)) + ";";
    csvString += getYesNo(checkJSONValue(basics_gami.basics_gami_exp_except_study)) + ";";
    csvString += checkJSONValue(basics_gami.basics_gami_good.basics_gami_good) + ";";
    csvString += basics_gami.basics_gami_general_liking !== undefined ? checkJSONValue(basics_gami.basics_gami_general_liking.lbs_5) +";" : "" + ";";
    csvString += checkJSONValue(basics_gami.basic_7.basics_game_affinity) + ";";
    csvString += checkJSONValue(basics_gami.basic_7.basics_video_game_frequency) + ";";
    csvString += checkJSONValue(basics_gami.basic_7.basics_video_game_passion) + ";";
    csvString += checkJSONValue(basics_gami.basic_7.basics_board_game_frequency) + ";";
    csvString += checkJSONValue(basics_gami.basic_7.basics_board_game_passion) + ";";
    csvString += checkJSONValue(basics_gami.basic_7.basics_game_performance) + ";";
    csvString += getYesNo(checkJSONValue(basics_gami.cc_usable)) + ";";
    break;
}

switch(condition){
    case(1): //choice absolute
    csvString += checkJSONValue(debrief_C_abs.comments).replace(/\n/g, "").replace(/;/g, "") + ";";
    csvString += getYesNo(checkJSONValue(debrief_C_abs.end_usable));
    break;
    case(2): //choice relative
    csvString += checkJSONValue(debrief_C_abs.comments).replace(/\n/g, "").replace(/;/g, "") + ";";
    csvString += getYesNo(checkJSONValue(debrief_C_abs.end_usable));
    break;
}






csvString += "\n";


}
        });

        fs.unlink('CSVDjango/post_study_auswertung_django.csv', function(err) {
            fs.appendFile('CSVDjango/post_study_auswertung_django.csv', csvString, function(err) {
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
    if(string =="unter 18") return 1;
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
    if(string == "nicht-binär") return 3;
    if(string == "Möchte ich nicht beantworten") return 4;
    return string;
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

function getGamingTime(string){
    if(string.toLowerCase() == "keine") return 0;  
    if(string.toLowerCase() == "weniger als 1") return 1;
    if(string.toLowerCase() == "1-3") return 2;
    if(string.toLowerCase() == "4-10") return 3;
    if(string.toLowerCase() == "11-15") return 4;
    if(string.toLowerCase() == "16-20") return 5;
    if(string.toLowerCase() == "21-25") return 6;
    if(string.toLowerCase() == "mehr als 26") return 7;
    if(string.toLowerCase() == "Möchte ich nicht beantworten") return 8;
    return string;
}
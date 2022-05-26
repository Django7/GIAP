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

    "    imi.json_answer AS imi,\n" +  //qid6
    "    imi_control.json_answer AS imi_control,\n" +  //qid7

    "    task_perception.json_answer AS task_perception,\n" +  //qid8
    "    task_perception_control.json_answer AS task_perception_control,\n" +  //qid9

    "    lbs_abs.json_answer AS lbs_abs,\n" + //qid10
    "    lbs_rel.json_answer AS lbs_rel,\n" +  //qid11
    "    lbs_C_abs.json_answer AS lbs_C_abs,\n" +  //qid12
    "    lbs_C_rel.json_answer AS lbs_C_rel,\n" +  //qid13

    "    choice_control.json_answer AS choice_control,\n" +  //qid14
    "    choice_abs.json_answer AS choice_abs,\n" +  //qid15
    "    choice_rel.json_answer AS choice_rel,\n" +  //qid16
    "    choice_C_abs.json_answer AS choice_C_abs,\n" +  //qid17
    "    choice_C_rel.json_answer AS choice_C_rel,\n" +  //qid18

    "    demographic_control.json_answer AS demographic_control,\n" +  //qid19
    "    demographic_gami.json_answer AS demographic_gami,\n" +  //qid20

    "    basics_control.json_answer AS basics_control,\n" +  //qid21
    "    basics_gami.json_answer AS basics_gami,\n" + //qid22

    "    final_control.json_answer AS final_control,\n" + //qid23
    "    final_abs.json_answer AS final_abs,\n" +  //qid24
    "    final_rel.json_answer AS final_rel,\n" +  //qid25
    "    final_C_abs.json_answer AS final_C_abs,\n" +  //qid26
    "    final_C_rel.json_answer AS final_C_rel\n" +  //qid27


    "FROM ((((((((((((((((((((((((((((\n" +  // (((((


//joined hier eigtl die questionnaires miteinander...kann ich ja nicht...warum ist das in der datenbank ganz anders?

//questionnaires werden hier nach schema kim1+(kim2)+jeweiliges end_ gejoined
//kim1 wird immer beantwortet, daher als erstes
"\t(SELECT uid, json_answer\n" +
    "    FROM questionnaires_users\n" +
    "    WHERE qid = 4) AS kim_enjoyment_choice1\n" + 
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
    "    WHERE qid = 6) AS imi\n" +
    "    \n" +
    "    ON kim_enjoyment_choice1.uid = imi.uid)\n" +
    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" +
    "    (SELECT uid, json_answer\n" +
    "    FROM questionnaires_users\n" +
    "    WHERE qid = 7) AS imi_control\n" +
    "    \n" +
    "    ON kim_enjoyment_choice1.uid = imi_control.uid)\n" +
    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" +

    //bis hierhin imis

    "    (SELECT uid, json_answer\n" +
    "    FROM questionnaires_users\n" +
    "    WHERE qid = 8) AS task_perception\n" +
    "    \n" +
    "    ON kim_enjoyment_choice1.uid = task_perception.uid)\n" +
    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" +
    "    (SELECT uid, json_answer\n" +
    "    FROM questionnaires_users\n" +
    "    WHERE qid = 9) AS task_perception_control\n" +
    "    \n" +
    "    ON kim_enjoyment_choice1.uid = task_perception_control.uid)\n" +
    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" +

    //bis hierhin task_perception

    "    (SELECT uid, json_answer\n" +
    "    FROM questionnaires_users\n" +
    "    WHERE qid = 10) AS lbs_abs\n" +
    "    \n" +
    "    ON kim_enjoyment_choice1.uid = lbs_abs.uid)\n" +
    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" +    
    "    (SELECT uid, json_answer\n" +
    "    FROM questionnaires_users\n" +
    "    WHERE qid = 11) AS lbs_rel\n" +
    "    \n" +
    "    ON kim_enjoyment_choice1.uid = lbs_rel.uid)\n" +
    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" +  
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
    "    (SELECT uid, json_answer\n" +
    "    FROM questionnaires_users\n" +
    "    WHERE qid = 14) AS choice_control\n" +
    "    \n" +
    "    ON kim_enjoyment_choice1.uid = choice_control.uid)\n" +
    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" +    
    "    (SELECT uid, json_answer\n" +
    "    FROM questionnaires_users\n" +
    "    WHERE qid = 15) AS choice_abs\n" +
    "    \n" +
    "    ON kim_enjoyment_choice1.uid = choice_abs.uid)\n" +
    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" +  
    "    (SELECT uid, json_answer\n" +
    "    FROM questionnaires_users\n" +
    "    WHERE qid = 16) AS choice_rel\n" +
    "    \n" +
    "    ON kim_enjoyment_choice1.uid = choice_rel.uid)\n" +
    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" +  
    "    (SELECT uid, json_answer\n" +
    "    FROM questionnaires_users\n" +
    "    WHERE qid = 17) AS choice_C_abs\n" +
    "    \n" +
    "    ON kim_enjoyment_choice1.uid = choice_C_abs.uid)\n" +
    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" +  
    "    (SELECT uid, json_answer\n" +
    "    FROM questionnaires_users\n" +
    "    WHERE qid = 18) AS choice_C_rel\n" +
    "    \n" +
    "    ON kim_enjoyment_choice1.uid = choice_C_rel.uid)\n" +
    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" +  

    //bis hierhin leaderboard fragen

    "    (SELECT uid, json_answer\n" +
    "    FROM questionnaires_users\n" +
    "    WHERE qid = 19) AS demographic_control\n" +
    "    \n" +
    "    ON kim_enjoyment_choice1.uid = demographic_control.uid)\n" +
    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" +  
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
    "    WHERE qid = 21) AS basics_control\n" +
    "    \n" +
    "    ON kim_enjoyment_choice1.uid = basics_control.uid)\n" +
    "    \n" +
    "    LEFT JOIN\n" +
    "    \n" +  
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

        //var csvString = "user_id;condition;chosen_group;age;sex;sex[freetext];nationality;nationality[freetext];url_where_from;url_where_from[freetext];tags_tutorial;tags_basic;rating_tutorial_1;rating_tutorial_2;rating_tutorial_mean;rating_basic_1;rating_basic_2;rating_basic_mean;KIM_enjoyment_1; KIM_enjoyment_2;IMI_interest_enjoyment;IMI_perceived_competence;IMI_perceived_choice;IMI_pressure_tension;tp_boring;tp_important;lbg_1_leaderboard;lbg_2_motivated;lbg_3_motivating_in_general;lbg_4_distracted;lbg_5_design;lbs_absoluted;lbs_relative;lbs_rel_more_less;lbs_absolute_chosen_explain;lbs_relative_chosen_explain;choice_tutorial;choice_overstained;choice_satisfied;choice_liked;choice_motivated;choice_more_options;choice_ideas;choice_none_extra_elements;choice_abs_first_options;choice_rel_first_options;choice_none_options;choice_none_decide;choice_none_explain;basics_gaming_time;basics_gamification_experience;basics_gami_exp_except_study;basics_gami_used;basics_gami_good;basics_gami_general_liking;basics_game_affinity;basics_video_game_frequency;basics_video_game_passion;basics_board_game_frequency;basics_board_game_passion;basics_game_performance;cc_usable;cc_comments\n";
        
        var csvString = "user_id;condition;chosen_group;age;sex;sex[freetext];nationality;nationality[freetext];url_where_from;url_where_from[freetext];";
        
        
        var tagsString = "tags_tutorial.Anzahl Tags im Tutorial;tags_basic.Anzahl Tags in Main Task;rating_tutorial_1. Rating der Tutorial Tags Dennis;rating_tutorial_2. Rating der Tutorial Tags Luis;rating_tutorial_mean. Rating der Tutorial Tags Durchschnitt;rating_basic_1. Rating der Main Task Tags Dennis;rating_basic_2. Rating der Main Task Tags Luis;rating_basic_mean. Rating der Main Task Tags Durchschnitt;";
        
        var IMIString = "KIM_enjoyment_1. Gesamtrating KIM enjoyment nach Tutorial_1 -3; KIM_enjoyment_2. Gesamtrating KIM enjoyment nach Tutorial_2 -3;IMI_interest_enjoyment. Gesamtrating KIM enjoyment nach Main Task -3;IMI_perceived_competence. Gesamtrating KIM competence nach Main Task -3;IMI_perceived_choice. Gesamtrating KIM choice nach Main Task -3;IMI_pressure_tension. Gesamtrating KIM pressure nach Main Task -3;";
        
        var TPString = "tp_boring. Ich fand die Aufgabe langweilig. [Stimme nicht zu, Stimme eher nicht zu, Weder noch, Stimme eher zu, Stimme zu];tp_important. Es war wichtig für mich, so viele Tags wie möglich zu erstellen. [Stimme nicht zu, Stimme eher nicht zu, Weder noch, Stimme eher zu, Stimme zu];";
        
        var LBGString = "lbg_1_leaderboard. Ich mochte es, mich mit anderen auf einer Bestenliste zu vergleichen. [Stimme nicht zu, Stimme eher nicht zu, Weder noch, Stimme eher zu, Stimme zu];lbg_2_motivated. Mich mit anderen auf einer Bestenliste vergleichen zu können, hat mich motiviert, mehr Tags zu erstellen. [Stimme nicht zu, Stimme eher nicht zu, Weder noch, Stimme eher zu, Stimme zu];lbg_3_motivating_in_general. Ich finde den Vergleich mit anderen auf einer Bestenliste allgemein motivierend. [Stimme nicht zu, Stimme eher nicht zu, Weder noch, Stimme eher zu, Stimme zu];lbg_4_distracted. Ich fühlte mich durch die Bestenliste abgelenkt. [Stimme nicht zu, Stimme eher nicht zu, Weder noch, Stimme eher zu, Stimme zu];lbg_5_design. Mir hat das Aussehen der Bestenliste gefallen. [Stimme nicht zu, Stimme eher nicht zu, Weder noch, Stimme eher zu, Stimme zu];";
        
        var LBSString = "lbs_absolute. Ich mochte es, dass auf der Bestenliste alle Spieler gleichzeitig angezeigt wurden. [Stimme nicht zu, Stimme eher nicht zu, Weder noch, Stimme eher zu, Stimme zu];lbs_relative. Ich mochte es, dass auf der Bestenliste nur die Spieler angezeigt wurden, welche direkt über und unter mir platziert waren. [Stimme nicht zu, Stimme eher nicht zu, Weder noch, Stimme eher zu, Stimme zu];lbs_rel_more_less. Hätte ich gewusst, wie weit Platz 1 entfernt ist, hätte ich mich ... angestrengt. [Weniger, Etwas weniger, Weder mehr noch weniger, Etwas mehr, Mehr];lbs_absolute_chosen_explain. Warum hast du die Bestenliste ausgewählt, welche alle Spieler gleichzeitig angezeigt hat, anstatt der Bestenliste, welche nur die Spieler angezeigt hat welche direkt über und unter du platziert waren? [Freitext];lbs_relative_chosen_explain. Warum hast du die Bestenliste ausgewählt, welche nur die Spieler angezeigt hat welche direkt über und unter Ihnen platziert waren, anstatt der Bestenliste welche alle Spieler gleichzeitig angezeigt hat? [Freitext];";
        
        var ChoiceString_1 = "choice_tutorial. Das Tutorial half mir, meine Wahlmöglichkeiten zu verstehen. [Stimme nicht zu, Stimme eher nicht zu, Weder noch, Stimme eher zu, Stimme zu];choice_overstained. Ich fühlte mich überfordert zu entscheiden, welche Version der Bestenliste ich verwenden möchte. [Stimme nicht zu, Stimme eher nicht zu, Weder noch, Stimme eher zu, Stimme zu];choice_satisfied. Ich war mit der getroffenen Wahl, bezüglich der verschiedenen Versionen der Bestenliste zufrieden. [Stimme nicht zu, Stimme eher nicht zu, Weder noch, Stimme eher zu, Stimme zu];choice_liked. Ich finde es gut, dass ich entscheiden konnte welche Version der Bestenliste verwendet wurde. [Stimme nicht zu, Stimme eher nicht zu, Weder noch, Stimme eher zu, Stimme zu];choice_motivated. Ich fühlte mich durch die Wahlmöglichkeit, welche Version der Bestenliste ich verwenden möchte, motiviert, die Aufgabe gut zu erfüllen. [Stimme nicht zu, Stimme eher nicht zu, Weder noch, Stimme eher zu, Stimme zu];choice_more_options. Ich hätte gerne noch weitere Entscheidungsmöglichkeiten gehabt. [Stimme nicht zu, Stimme eher nicht zu, Weder noch, Stimme eher zu, Stimme zu];choice_ideas. Welche weiteren Entscheidungsmöglichkeiten hätten Sie gerne gehabt? [Freitext];choice_none_extra_elements. Ich hätte es gut gefunden, wenn die Aufgabe zusätzliche Elemente gehabt hätte (z. B. Punkte für jeden Tag erhalten, oder eine Bestenliste um meine Leistung mit anderen Spielern zu vergleichen). [Stimme nicht zu, Stimme eher nicht zu, Weder noch, Stimme eher zu, Stimme zu];";
        
        var ChoiceString_2 = "choice_abs_first_options. Hier siehst du eine Bestenliste, welche alle Spieler anzeigt, und die Bestenliste, welche du verwendet hast. Hättest du gerne die Option gehabt zwischen diesen Bestenlisten zu wählen? [Stimme nicht zu, Stimme eher nicht zu, Weder noch, Stimme eher zu, Stimme zu];choice_rel_first_options. Hier siehst du eine Bestenliste, welche nur die Spieler anzeigt, welche direkt über und unter dir platziert sind, und die Bestenliste, welche du verwendet hast. Hättest du gerne die Option gehabt zwischen diesen Bestenlisten zu wählen? [Stimme nicht zu, Stimme eher nicht zu, Weder noch, Stimme eher zu, Stimme zu];choice_none_options. Hier siehst du zwei verschiedene Bestenlisten. Hättest du gerne die Option gehabt zwischen diesen Bestenlisten zu wählen? [Stimme nicht zu, Stimme eher nicht zu, Weder noch, Stimme eher zu, Stimme zu];choice_none_decide. Angenommen, du hättest diese Auswahl gehabt, welche der Bestenlisten hättest du gewählt? [Links(Relativ)/Rechts(Absolut)];choice_none_explain. Warum hättest du diese Version der Bestenliste gewählt [Freitext];";

        var BasicsString = "basics_gaming_time. Wie viele Stunden pro Woche spielst du im Schnitt Spiele (egal ob analog oder digital)? [keine, weniger als 1, 1-3, 4-10, 11-15, 16-20, 21-25, mehr als 26, Möchte ich nicht beantworten];basics_gamification_experience. Unter \"Gamification\" versteht man den Einsatz spieltypischer Elemente (z.B. Punk- te/Bestenlisten) in spielfremden Umgebungen zur Verhaltensänderung und zur Steigerung der Motivation (z.B. Vergabe von Punkten in Fitnessapps). Hast du in der Vergangenheit Erfahrungen mit gamifizierten Systemen gemacht? [No/Yes];basics_gami_exp_except_study. Unter \"Gamification\" versteht man den Einsatz spieltypischer Elemente (z.B. Punk- te/Bestenlisten) in spielfremden Umgebungen zur Verhaltensänderung und zur Steigerung der Motivation (z.B. Vergabe von Punkten in Fitnessapps). Hast du, abgesehen von der Gamifizierung, die in dieser Studie angeboten bzw. genutzt wurde, in der Vergangenheit Erfahrungen mit gamifizierten Systemen gemacht? [No/Yes];basics_gami_used. Ich hätte es bei der Aufgabe in dieser Studie gut gefunden, wenn Gamification verwendet worden wäre. [Stimme nicht zu, Stimme eher nicht zu, Weder noch, Stimme eher zu, Stimme zu];basics_gami_good. Ich fand die in dieser Studie angebotene Gamification gut [Stimme nicht zu, Stimme eher nicht zu, Weder noch, Stimme eher zu, Stimme zu];basics_gami_general_liking. Ich verwende gerne gamifizierte Systeme. [Stimme nicht zu, Stimme eher nicht zu, Weder noch, Stimme eher zu, Stimme zu];basics_game_affinity. Ich halte mich selbst für spielaffin. [Stimme nicht zu, Stimme eher nicht zu, Weder noch, Stimme eher zu, Stimme zu];basics_video_game_frequency. Ich spiele häufig Videospiele. [Stimme nicht zu, Stimme eher nicht zu, Weder noch, Stimme eher zu, Stimme zu];basics_video_game_passion. Ich habe eine Leidenschaft für Videospiele. [Stimme nicht zu, Stimme eher nicht zu, Weder noch, Stimme eher zu, Stimme zu];basics_board_game_frequency. Ich spiele häufig Brettspiele. [Stimme nicht zu, Stimme eher nicht zu, Weder noch, Stimme eher zu, Stimme zu];basics_board_game_passion. Ich habe eine Leidenschaft für Brettspiele. [Stimme nicht zu, Stimme eher nicht zu, Weder noch, Stimme eher zu, Stimme zu];basics_game_performance. Es ist mir in Spielen allgemein wichtig, gute Leistungen zu bringen. [Stimme nicht zu, Stimme eher nicht zu, Weder noch, Stimme eher zu, Stimme zu];";
        
        var CCString = "cc_usable;cc_comments\n";
        
        var questionDemString = ";1=Control,4=Absolute,5=Relative,6=Choice;1=Absolutes Leaderboard in Choice gewaehlt,2=Relatives Leaderboard in Choice gewaehlt, sonst.=nicht beendet oder nicht in Choice;;;;;;;Anzahl der Tags im Tutorial;Anzahl der Tags in der Main Task;;;;;;;;";
        var questionKIMTPString = "Gesamtergebnis KIM Enjoyment 1;Gesamtergebnis KIM Enjoyment 2(Nur Choice);Gesamtergebnis KIM Enjoyment nach MainTask;Gesamtergebnis KIM Competence nach MainTask;Gesamtergebnis KIM Choice nach MainTask;Gesamtergebnis KIM Pressure nach MainTask;Aufgabe langweilig;Wichtig viele Tags zu erstellen;";
        var questionLBString = "Mochte es auf Leaderboard zu Vergleichen(1-5 Scale);Leaderboard hat motiviert mehr tags zu erstellen(1-5 Scale);Leaderboard allgemein motivierend(1-5 Scale);Abgelenkt durch Leaderboard(1-5 Scale);Aussehen der Leaderboard(1-5 Scale);Mochte Absolutes Leaderboard(1-5 Scale);Mochte Relatives Leaderboard;Einschaetzung zu Entfernung bis zum 1. Platz bei Relativem LEaderboard (1-5 Scale(weniger - mehr));Warum Absolute(Freitext);Warum Relative(Freitext);";
        var choiceString = "Tutorial half bei Auswahl(1-5 Scale);Ueberfordert durch Auswahl(1-5 Scale);Zufrieden mit der Wahl(1-5 Scale);Fand die Moeglichkeit zu Waehlen gut(1-5 Scale);War durch Wahl motiviert(1-5 Scale);Haette gerne weitere Entscheidungmoeglichkeiten gehabt(1-5 Scale);Welche weiteren Entscheidungsmoeglichkeiten(Freitext);Haette Leaderboard/Punkte gut gefunden(1-5 Scale);Haette gerne Wahlmoeglichkeit gehabt(Absolute)(1-5 Scale);Haette gerne Wahlmoeglichkeit gehabt(Relative)(1-5 Scale);Haette gerne Wahlmoeglichkeit gehabt(Control)(1-5 Scale);Welche Wahl haette user getroffen(0=Relative,1=Absolute);Warum diese Wahl getroffen(Freitext);";
        var basicsString = "Woechentliche Spielzeit(0=keine, 1=weniger als 1, 2=1-3, 3=4-10, 4=11-15, 5=16-20, 6=21-25, 7=mehr als 26, 8=moechte nicht beantworten);Erfahrung mit gami. Systemen(Control)(0=nein,1=ja);Erfahrung mit gami. Systemen(nicht-Control)(0=nein,1=ja);Haette Gami. gut gefunden(Control);Fand Gami. gut(nicht-Control);Verwendet gerne gamifizierte Systeme;Affinitaet zu Spielen(1-5 Scale);Haeufig Videospiele(1-5 Scale);Leidenschaft Videospiele(1-5 Scale);Haeufig Brettspiele(1-5 Scale);Leidenschaft Brettspiele(1-5 Scale);Performance in Spielen allgemein wichtig(1-5 Scale);";
        var endString = "Verwendbar vor Debrief(0=nein, 1=ja);;Verwendbar nach Debrief(0=nein, 1=ja)\n";

        csvString += tagsString + IMIString + TPString + LBGString + LBSString + ChoiceString_1 + ChoiceString_2 + BasicsString + CCString;
        //csvString += questionDemString + questionKIMTPString + questionLBString + choiceString + basicsString + endString;
        results.forEach(function(row, idx) {
            
            
            var condition = 0; //4=absolute, 5=relative, 1=control, 6=choice absolute, 7=choice relative, 0=not finished

            
            //the questionnaires
            var kim_enjoyment_choice1 = JSON.parse(JSON.parse(row.kim_enjoyment_choice1));
            var kim_enjoyment_choice2 = JSON.parse(JSON.parse(row.kim_enjoyment_choice2));

            var imi = JSON.parse(JSON.parse(row.imi));
            var imi_control = JSON.parse(JSON.parse(row.imi_control));

            var task_perception = JSON.parse(JSON.parse(row.task_perception));
            var task_perception_control = JSON.parse(JSON.parse(row.task_perception_control));

            var lbs_abs = JSON.parse(JSON.parse(row.lbs_abs));
            var lbs_rel = JSON.parse(JSON.parse(row.lbs_rel));
            var lbs_C_abs = JSON.parse(JSON.parse(row.lbs_C_abs));
            var lbs_C_rel = JSON.parse(JSON.parse(row.lbs_C_rel));

            var choice_control = JSON.parse(JSON.parse(row.choice_control));
            var choice_abs = JSON.parse(JSON.parse(row.choice_abs));
            var choice_rel = JSON.parse(JSON.parse(row.choice_rel));
            var choice_C_abs = JSON.parse(JSON.parse(row.choice_C_abs));
            var choice_C_rel = JSON.parse(JSON.parse(row.choice_C_rel));

            var demographic_control = JSON.parse(JSON.parse(row.demographic_control));
            var demographic_gami = JSON.parse(JSON.parse(row.demographic_gami));

            var basics_control = JSON.parse(JSON.parse(row.basics_control));
            var basics_gami = JSON.parse(JSON.parse(row.basics_gami));

            var final_control = JSON.parse(JSON.parse(row.final_control));
            var final_abs = JSON.parse(JSON.parse(row.final_abs));
            var final_rel = JSON.parse(JSON.parse(row.final_rel));
            var final_C_abs = JSON.parse(JSON.parse(row.final_C_abs));
            var final_C_rel = JSON.parse(JSON.parse(row.final_C_rel));

            if(!(final_control == null && final_abs == null && final_rel == null && final_C_abs == null && final_C_rel == null)){
            //var demographic = JSON.parse(JSON.parse(row.demographic));
            //var imi = JSON.parse(JSON.parse(row.imi));
            csvString += cropDBEntry(row.uid, 0)+ ";";
            csvString += cropDBEntry(row.gid, 0)+ ";";
            
            if(kim_enjoyment_choice1 == null) kim_enjoyment_choice1 ={};
            if(kim_enjoyment_choice2 == null) kim_enjoyment_choice2 ={}; 

            if(imi == null) imi ={};
            if(imi_control == null) imi_control ={}; 

            if(task_perception == null) task_perception ={};
            if(task_perception_control == null) task_perception_control ={}; 

            if(lbs_abs == null) lbs_abs ={};
            if(lbs_rel == null) lbs_rel ={}; 
            if(lbs_C_abs == null) lbs_C_abs ={};
            if(lbs_C_rel == null) lbs_C_rel ={}; 

            if(choice_control == null) choice_control ={};
            if(choice_abs == null) choice_abs ={}; 
            if(choice_rel == null) choice_rel ={};
            if(choice_C_abs == null) choice_C_abs ={}; 
            if(choice_C_rel == null) choice_C_rel ={}; 

            if(demographic_control == null) demographic_control ={};
            if(demographic_gami == null) demographic_gami ={}; 

            if(basics_control == null) basics_control ={};
            if(basics_gami == null) basics_gami ={}; 
            
            if(final_control == null) {final_control ={}; } else {condition=1;}
            if(final_abs == null) {final_abs ={}; } else {condition=4;}
            if(final_rel == null) {final_rel ={}; }  else {condition=5;}
            if(final_C_abs == null) {final_C_abs ={}; } else {condition=6;}
            if(final_C_rel == null) {final_C_rel ={}; } else {condition=7;}

            // immer nur eins der folgenden kann in den else Fall kommen


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
                csvString += getAge(checkJSONValue(demographic_control.age)) + ";";
                csvString += getGender(checkJSONValue(demographic_control.gender)) + ";";
                csvString += demographic_control.gender_Comment !== undefined ? checkJSONValue(demographic_control.gender_Comment).replace(/\n/g, "").replace(/;/g, "") +";" : "" + ";";
                csvString += getNationality(checkJSONValue(demographic_control.nationality)) + ";";
                csvString += checkJSONValue(demographic_control.nationality).replace(/\n/g, "").replace(/;/g, "") + ";";
                csvString += getWhereFrom(checkJSONValue(demographic_control.url_where_from)) + ";";
                csvString += demographic_control.url_where_from_Comment !== undefined ? checkJSONValue(demographic_control.url_where_from_Comment).replace(/\n/g, "").replace(/;/g, "") +";" : "" + ";";
                break;
                case(4):
                csvString += getAge(checkJSONValue(demographic_gami.age)) + ";";
                csvString += getGender(checkJSONValue(demographic_gami.gender)) + ";";
                csvString += demographic_gami.gender_Comment !== undefined ? checkJSONValue(demographic_gami.gender_Comment).replace(/\n/g, "").replace(/;/g, "") +";" : "" + ";";
                csvString += getNationality(checkJSONValue(demographic_gami.nationality)) + ";";
                csvString += checkJSONValue(demographic_gami.nationality).replace(/\n/g, "").replace(/;/g, "") + ";";
                csvString += getWhereFrom(checkJSONValue(demographic_gami.url_where_from)) + ";";
                csvString += demographic_gami.url_where_from_Comment !== undefined ? checkJSONValue(demographic_gami.url_where_from_Comment).replace(/\n/g, "").replace(/;/g, "") +";" : "" + ";";
                break;
                case(5):
                csvString += getAge(checkJSONValue(demographic_gami.age)) + ";";
                csvString += getGender(checkJSONValue(demographic_gami.gender)) + ";";
                csvString += demographic_gami.gender_Comment !== undefined ? checkJSONValue(demographic_gami.gender_Comment).replace(/\n/g, "").replace(/;/g, "") +";" : "" + ";";
                csvString += getNationality(checkJSONValue(demographic_gami.nationality)) + ";";
                csvString += checkJSONValue(demographic_gami.nationality).replace(/\n/g, "").replace(/;/g, "") + ";";
                csvString += getWhereFrom(checkJSONValue(demographic_gami.url_where_from)) + ";";
                csvString += demographic_gami.url_where_from_Comment !== undefined ? checkJSONValue(demographic_gami.url_where_from_Comment).replace(/\n/g, "").replace(/;/g, "") +";" : "" + ";";
                break;
                case(6):
                csvString += getAge(checkJSONValue(demographic_gami.age)) + ";";
                csvString += getGender(checkJSONValue(demographic_gami.gender)) + ";";
                csvString += demographic_gami.gender_Comment !== undefined ? checkJSONValue(demographic_gami.gender_Comment).replace(/\n/g, "").replace(/;/g, "") +";" : "" + ";";
                csvString += getNationality(checkJSONValue(demographic_gami.nationality)) + ";";
                csvString += checkJSONValue(demographic_gami.nationality).replace(/\n/g, "").replace(/;/g, "") + ";";
                csvString += getWhereFrom(checkJSONValue(demographic_gami.url_where_from)) + ";";
                csvString += demographic_gami.url_where_from_Comment !== undefined ? checkJSONValue(demographic_gami.url_where_from_Comment).replace(/\n/g, "").replace(/;/g, "") +";" : "" + ";";
                break;
                case(7):
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
        parseInt(checkJSONValue(imi_control.imi_interest_enjoyment.tagging_fun_imi)) +
        parseInt(checkJSONValue(imi_control.imi_interest_enjoyment.tagging_interesting_imi)) +
        parseInt(checkJSONValue(imi_control.imi_interest_enjoyment.tagging_entertaining_imi))) - 3 + ";";
    
    csvString += (
        parseInt(checkJSONValue(imi_control.imi_interest_enjoyment.tagging_performance_imi)) +
        parseInt(checkJSONValue(imi_control.imi_interest_enjoyment.tagging_competence_imi)) +
        parseInt(checkJSONValue(imi_control.imi_interest_enjoyment.tagging_success_imi))) - 3 + ";";
    
    csvString += (
        parseInt(checkJSONValue(imi_control.imi_interest_enjoyment.tagging_choice_steering_imi)) +
        parseInt(checkJSONValue(imi_control.imi_interest_enjoyment.tagging_choice_self_imi)) +
        parseInt(checkJSONValue(imi_control.imi_interest_enjoyment.tagging_choice_generic_imi))) - 3 + ";";
    
    csvString += (
        parseInt(checkJSONValue(imi_control.imi_interest_enjoyment.tagging_pressure_imi)) +
        parseInt(checkJSONValue(imi_control.imi_interest_enjoyment.tagging_tension_imi)) +
        parseInt(checkJSONValue(imi_control.imi_interest_enjoyment.tagging_concerns_imi))) - 3 + ";";
    
    break;
    case(4): //absolute
    csvString += (
        parseInt(checkJSONValue(imi.imi_interest_enjoyment.tagging_fun_imi)) +
        parseInt(checkJSONValue(imi.imi_interest_enjoyment.tagging_interesting_imi)) +
        parseInt(checkJSONValue(imi.imi_interest_enjoyment.tagging_entertaining_imi))) - 3 + ";";
    
    csvString += (
        parseInt(checkJSONValue(imi.imi_interest_enjoyment.tagging_performance_imi)) +
        parseInt(checkJSONValue(imi.imi_interest_enjoyment.tagging_competence_imi)) +
        parseInt(checkJSONValue(imi.imi_interest_enjoyment.tagging_success_imi))) - 3 + ";";
    
    csvString += (
        parseInt(checkJSONValue(imi.imi_interest_enjoyment.tagging_choice_steering_imi)) +
        parseInt(checkJSONValue(imi.imi_interest_enjoyment.tagging_choice_self_imi)) +
        parseInt(checkJSONValue(imi.imi_interest_enjoyment.tagging_choice_generic_imi))) - 3 + ";";
    
    csvString += (
        parseInt(checkJSONValue(imi.imi_interest_enjoyment.tagging_pressure_imi)) +
        parseInt(checkJSONValue(imi.imi_interest_enjoyment.tagging_tension_imi)) +
        parseInt(checkJSONValue(imi.imi_interest_enjoyment.tagging_concerns_imi))) - 3 + ";";
    break;
    case(5): //relative
    csvString += (
        parseInt(checkJSONValue(imi.imi_interest_enjoyment.tagging_fun_imi)) +
        parseInt(checkJSONValue(imi.imi_interest_enjoyment.tagging_interesting_imi)) +
        parseInt(checkJSONValue(imi.imi_interest_enjoyment.tagging_entertaining_imi))) - 3 + ";";
    
    csvString += (
        parseInt(checkJSONValue(imi.imi_interest_enjoyment.tagging_performance_imi)) +
        parseInt(checkJSONValue(imi.imi_interest_enjoyment.tagging_competence_imi)) +
        parseInt(checkJSONValue(imi.imi_interest_enjoyment.tagging_success_imi))) - 3 + ";";
    
    csvString += (
        parseInt(checkJSONValue(imi.imi_interest_enjoyment.tagging_choice_steering_imi)) +
        parseInt(checkJSONValue(imi.imi_interest_enjoyment.tagging_choice_self_imi)) +
        parseInt(checkJSONValue(imi.imi_interest_enjoyment.tagging_choice_generic_imi))) - 3 + ";";
    
    csvString += (
        parseInt(checkJSONValue(imi.imi_interest_enjoyment.tagging_pressure_imi)) +
        parseInt(checkJSONValue(imi.imi_interest_enjoyment.tagging_tension_imi)) +
        parseInt(checkJSONValue(imi.imi_interest_enjoyment.tagging_concerns_imi))) - 3 + ";";
    break;
    case(6): //choice_absolute
    csvString += (
        parseInt(checkJSONValue(imi.imi_interest_enjoyment.tagging_fun_imi)) +
        parseInt(checkJSONValue(imi.imi_interest_enjoyment.tagging_interesting_imi)) +
        parseInt(checkJSONValue(imi.imi_interest_enjoyment.tagging_entertaining_imi))) - 3 + ";";
    
    csvString += (
        parseInt(checkJSONValue(imi.imi_interest_enjoyment.tagging_performance_imi)) +
        parseInt(checkJSONValue(imi.imi_interest_enjoyment.tagging_competence_imi)) +
        parseInt(checkJSONValue(imi.imi_interest_enjoyment.tagging_success_imi))) - 3 + ";";
    
    csvString += (
        parseInt(checkJSONValue(imi.imi_interest_enjoyment.tagging_choice_steering_imi)) +
        parseInt(checkJSONValue(imi.imi_interest_enjoyment.tagging_choice_self_imi)) +
        parseInt(checkJSONValue(imi.imi_interest_enjoyment.tagging_choice_generic_imi))) - 3 + ";";
    
    csvString += (
        parseInt(checkJSONValue(imi.imi_interest_enjoyment.tagging_pressure_imi)) +
        parseInt(checkJSONValue(imi.imi_interest_enjoyment.tagging_tension_imi)) +
        parseInt(checkJSONValue(imi.imi_interest_enjoyment.tagging_concerns_imi))) - 3 + ";";
    break;
    case(7): //choice_relative
    csvString += (
        parseInt(checkJSONValue(imi.imi_interest_enjoyment.tagging_fun_imi)) +
        parseInt(checkJSONValue(imi.imi_interest_enjoyment.tagging_interesting_imi)) +
        parseInt(checkJSONValue(imi.imi_interest_enjoyment.tagging_entertaining_imi))) - 3 + ";";
    
    csvString += (
        parseInt(checkJSONValue(imi.imi_interest_enjoyment.tagging_performance_imi)) +
        parseInt(checkJSONValue(imi.imi_interest_enjoyment.tagging_competence_imi)) +
        parseInt(checkJSONValue(imi.imi_interest_enjoyment.tagging_success_imi))) - 3 + ";";
    
    csvString += (
        parseInt(checkJSONValue(imi.imi_interest_enjoyment.tagging_choice_steering_imi)) +
        parseInt(checkJSONValue(imi.imi_interest_enjoyment.tagging_choice_self_imi)) +
        parseInt(checkJSONValue(imi.imi_interest_enjoyment.tagging_choice_generic_imi))) - 3 + ";";
    
    csvString += (
        parseInt(checkJSONValue(imi.imi_interest_enjoyment.tagging_pressure_imi)) +
        parseInt(checkJSONValue(imi.imi_interest_enjoyment.tagging_tension_imi)) +
        parseInt(checkJSONValue(imi.imi_interest_enjoyment.tagging_concerns_imi))) - 3 + ";";
    break;
}

//task perception
switch(condition){
    case(1): //control
    csvString += checkJSONValue(task_perception_control.task_perception.tp_boring) +";";
    csvString += checkJSONValue(task_perception_control.task_perception.tp_important) +";";
    break;
    case(4): //absolute
    csvString += checkJSONValue(task_perception.task_perception.tp_boring) +";";
    csvString += checkJSONValue(task_perception.task_perception.tp_important) +";";
    break;
    case(5): //relative
    csvString += checkJSONValue(task_perception.task_perception.tp_boring) +";";
    csvString += checkJSONValue(task_perception.task_perception.tp_important) +";";
    break;
    case(6): //choice_absolute
    csvString += checkJSONValue(task_perception.task_perception.tp_boring) +";";
    csvString += checkJSONValue(task_perception.task_perception.tp_important) +";";
    break;
    case(7): //choice_relative
    csvString += checkJSONValue(task_perception.task_perception.tp_boring) +";";
    csvString += checkJSONValue(task_perception.task_perception.tp_important) +";";
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
    csvString += checkJSONValue(lbs_abs.leaderboard_abs.lbg_1_leaderboard) + ";";
    csvString += checkJSONValue(lbs_abs.leaderboard_abs.lbg_2_motivated) + ";";
    csvString += checkJSONValue(lbs_abs.leaderboard_abs.lbg_3_motivating_in_general) + ";";
    csvString += checkJSONValue(lbs_abs.leaderboard_abs.lbg_4_distracted) + ";";
    csvString += checkJSONValue(lbs_abs.leaderboard_abs.lbg_5_design) + ";";
    break;
    case(5): //relative
    csvString += checkJSONValue(lbs_rel.leaderboard_rel.lbg_1_leaderboard) + ";";
    csvString += checkJSONValue(lbs_rel.leaderboard_rel.lbg_2_motivated) + ";";
    csvString += checkJSONValue(lbs_rel.leaderboard_rel.lbg_3_motivating_in_general) + ";";
    csvString += checkJSONValue(lbs_rel.leaderboard_rel.lbg_4_distracted) + ";";
    csvString += checkJSONValue(lbs_rel.leaderboard_rel.lbg_5_design) + ";";
    break;
    case(6): //choice_absolute
    csvString += checkJSONValue(lbs_C_abs.leaderboard_abs.lbg_1_leaderboard) + ";";
    csvString += checkJSONValue(lbs_C_abs.leaderboard_abs.lbg_2_motivated) + ";";
    csvString += checkJSONValue(lbs_C_abs.leaderboard_abs.lbg_3_motivating_in_general) + ";";
    csvString += checkJSONValue(lbs_C_abs.leaderboard_abs.lbg_4_distracted) + ";";
    csvString += checkJSONValue(lbs_C_abs.leaderboard_abs.lbg_5_design) + ";";
    break;
    case(7): //choice_relative
    csvString += checkJSONValue(lbs_C_rel.leaderboard_rel.lbg_1_leaderboard) + ";";
    csvString += checkJSONValue(lbs_C_rel.leaderboard_rel.lbg_2_motivated) + ";";
    csvString += checkJSONValue(lbs_C_rel.leaderboard_rel.lbg_3_motivating_in_general) + ";";
    csvString += checkJSONValue(lbs_C_rel.leaderboard_rel.lbg_4_distracted) + ";";
    csvString += checkJSONValue(lbs_C_rel.leaderboard_rel.lbg_5_design) + ";";
    break;
}

//specific leaderboard

switch(condition){
    case(1): //control
    csvString += "" + ";";
    csvString += "" + ";";
    csvString += "" + ";";
    csvString += "" + ";";
    csvString += "" + ";";
    break;
    case(4): //absolute
    csvString += checkJSONValue(lbs_abs.leaderboard_abs.lbs_absolute) + ";";
    csvString += "" + ";";
    csvString += "" + ";";
    csvString += "" + ";";
    csvString += "" + ";";
    break;
    case(5): //relative
    csvString += "" + ";";
    csvString += checkJSONValue(lbs_rel.leaderboard_rel.lbs_relative) + ";";
    csvString += checkJSONValue(lbs_rel.lbs_rel_more_less.lbs_rel_more_less) + ";";
    csvString += "" + ";";
    csvString += "" + ";";
    break;
    case(6): //choice_absolute
    csvString += checkJSONValue(lbs_C_abs.leaderboard_abs.lbs_absolute) + ";";
    csvString += "" + ";";
    csvString += "" + ";";
    csvString += checkJSONValue(lbs_C_abs.lbs_absolute_chosen_explain).replace(/\n/g, "").replace(/;/g, "") + ";";
    csvString += "" + ";";
    break;
    case(7): //choice_relative
    csvString += "" + ";";
    csvString += checkJSONValue(lbs_C_rel.leaderboard_rel.lbs_relative) + ";";
    csvString += checkJSONValue(lbs_C_rel.lbs_rel_more_less.lbs_rel_more_less) + ";";
    csvString += "" + ";";
    csvString += checkJSONValue(lbs_C_rel.lbs_relative_chosen_explain).replace(/\n/g, "").replace(/;/g, "") + ";";
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
    csvString += checkJSONValue(choice_control.choice_none_extra_elements.choice_none_extra_elements) + ";";
    csvString += "" + ";";
    csvString += "" + ";";
    csvString += checkJSONValue(choice_control.choice_specific_5.choice_none_options) + ";";
    csvString += getLinksRechts(checkJSONValue(choice_control.choice_none_decide)) + ";";
    csvString += checkJSONValue(choice_control.choice_none_explain).replace(/\n/g, "").replace(/;/g, "") + ";";
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
    //csvString += "" + ";";
    csvString += checkJSONValue(choice_abs.choice_rel_first_options.choice_rel_first_options) + ";";
    //csvString += checkJSONValue(choice_abs.choice_prefered_relative.choice_prefered_relative) + ";";
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
    csvString += checkJSONValue(choice_rel.choice_abs_first_options.choice_abs_first_options) + ";";
    //csvString += checkJSONValue(choice_rel.choice_prefered_absolute.choice_prefered_absolute) + ";";
    //csvString += "" + ";";
    csvString += "" + ";";
    csvString += "" + ";";
    csvString += "" + ";";
    csvString += "" + ";";
    break;
    case(6): //choice_absolute
    csvString += checkJSONValue(choice_C_abs.choice_specific_1.choice_tutorial) + ";";
    csvString += checkJSONValue(choice_C_abs.choice_specific_1.choice_overstained) + ";";
    csvString += checkJSONValue(choice_C_abs.choice_specific_1.choice_satisfied) + ";";
    csvString += checkJSONValue(choice_C_abs.choice_specific_1.choice_liked) + ";";
    csvString += checkJSONValue(choice_C_abs.choice_specific_1.choice_motivated) + ";";
    csvString += checkJSONValue(choice_C_abs.choice_specific_1.choice_more_options) + ";";
    csvString += choice_C_abs.choice_ideas !== undefined ? checkJSONValue(choice_C_abs.choice_ideas).replace(/\n/g, "").replace(/;/g, "") + ";" : "" + ";";
    csvString += "" + ";";
    //csvString += "" + ";";
    //csvString += "" + ";";
    csvString += "" + ";";
    csvString += "" + ";";
    csvString += "" + ";";
    csvString += "" + ";";
    csvString += "" + ";";
    break;
    case(7): //choice_relative
    csvString += checkJSONValue(choice_C_rel.choice_specific_1.choice_tutorial) + ";";
    csvString += checkJSONValue(choice_C_rel.choice_specific_1.choice_overstained) + ";";
    csvString += checkJSONValue(choice_C_rel.choice_specific_1.choice_satisfied) + ";";
    csvString += checkJSONValue(choice_C_rel.choice_specific_1.choice_liked) + ";";
    csvString += checkJSONValue(choice_C_rel.choice_specific_1.choice_motivated) + ";";
    csvString += checkJSONValue(choice_C_rel.choice_specific_1.choice_more_options) + ";";
    csvString += choice_C_rel.choice_ideas !== undefined ? checkJSONValue(choice_C_rel.choice_ideas).replace(/\n/g, "").replace(/;/g, "") + ";" : "" + ";";
    csvString += "" + ";";
    //csvString += "" + ";";
    //csvString += "" + ";";
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
    csvString += getGamingTime(checkJSONValue(basics_control.gaming_time)) + ";";
    csvString += getYesNo(checkJSONValue(basics_control.basics_gamification_experience)) + ";";
    csvString += "" + ";";
    csvString += checkJSONValue(basics_control.basics_gami_used.basics_gami_used) + ";";
    csvString += "" + ";";
    csvString += basics_control.basics_gami_general_liking !== undefined ? checkJSONValue(basics_control.basics_gami_general_liking.lbs_5) +";" : "" + ";";
    csvString += checkJSONValue(basics_control.basic_7.basics_game_affinity) + ";";
    csvString += checkJSONValue(basics_control.basic_7.basics_video_game_frequency) + ";";
    csvString += checkJSONValue(basics_control.basic_7.basics_video_game_passion) + ";";
    csvString += checkJSONValue(basics_control.basic_7.basics_board_game_frequency) + ";";
    csvString += checkJSONValue(basics_control.basic_7.basics_board_game_passion) + ";";
    csvString += checkJSONValue(basics_control.basic_7.basics_game_performance) + ";";
    break;
    case(4): //absolute
    csvString += getGamingTime(checkJSONValue(basics_gami.gaming_time)) + ";";
    csvString += "" + ";";
    csvString += getYesNo(checkJSONValue(basics_gami.basics_gami_exp_except_study)) + ";";
    csvString += "" + ";";
    csvString += checkJSONValue(basics_gami.basics_gami_good.basics_gami_good) + ";";
    csvString += basics_gami.basics_gami_general_liking !== undefined ? checkJSONValue(basics_gami.basics_gami_general_liking.lbs_5) +";" : "" + ";";
    csvString += checkJSONValue(basics_gami.basic_7.basics_game_affinity) + ";";
    csvString += checkJSONValue(basics_gami.basic_7.basics_video_game_frequency) + ";";
    csvString += checkJSONValue(basics_gami.basic_7.basics_video_game_passion) + ";";
    csvString += checkJSONValue(basics_gami.basic_7.basics_board_game_frequency) + ";";
    csvString += checkJSONValue(basics_gami.basic_7.basics_board_game_passion) + ";";
    csvString += checkJSONValue(basics_gami.basic_7.basics_game_performance) + ";";
    break;
    case(5): //relative
    csvString += getGamingTime(checkJSONValue(basics_gami.gaming_time)) + ";";
    csvString += "" + ";";
    csvString += getYesNo(checkJSONValue(basics_gami.basics_gami_exp_except_study)) + ";";
    csvString += "" + ";";
    csvString += checkJSONValue(basics_gami.basics_gami_good.basics_gami_good) + ";";
    //if (basics_gami.basics_gami_general_liking===undefined){console.log("kp")}
    csvString += basics_gami.basics_gami_general_liking !== undefined ? checkJSONValue(basics_gami.basics_gami_general_liking.lbs_5) +";" : "" + ";";
    csvString += checkJSONValue(basics_gami.basic_7.basics_game_affinity) + ";";
    csvString += checkJSONValue(basics_gami.basic_7.basics_video_game_frequency) + ";";
    csvString += checkJSONValue(basics_gami.basic_7.basics_video_game_passion) + ";";
    csvString += checkJSONValue(basics_gami.basic_7.basics_board_game_frequency) + ";";
    csvString += checkJSONValue(basics_gami.basic_7.basics_board_game_passion) + ";";
    csvString += checkJSONValue(basics_gami.basic_7.basics_game_performance) + ";";
    break;
    case(6): //choice_absolute
    csvString += getGamingTime(checkJSONValue(basics_gami.gaming_time)) + ";";
    csvString += "" + ";";
    csvString += getYesNo(checkJSONValue(basics_gami.basics_gami_exp_except_study)) + ";";
    csvString += "" + ";";
    csvString += checkJSONValue(basics_gami.basics_gami_good.basics_gami_good) + ";";
    csvString += basics_gami.basics_gami_general_liking !== undefined ? checkJSONValue(basics_gami.basics_gami_general_liking.lbs_5) +";" : "" + ";";
    csvString += checkJSONValue(basics_gami.basic_7.basics_game_affinity) + ";";
    csvString += checkJSONValue(basics_gami.basic_7.basics_video_game_frequency) + ";";
    csvString += checkJSONValue(basics_gami.basic_7.basics_video_game_passion) + ";";
    csvString += checkJSONValue(basics_gami.basic_7.basics_board_game_frequency) + ";";
    csvString += checkJSONValue(basics_gami.basic_7.basics_board_game_passion) + ";";
    csvString += checkJSONValue(basics_gami.basic_7.basics_game_performance) + ";";
    break;
    case(7): //choice_relative
    csvString += getGamingTime(checkJSONValue(basics_gami.gaming_time)) + ";";
    csvString += "" + ";";
    csvString += getYesNo(checkJSONValue(basics_gami.basics_gami_exp_except_study)) + ";";
    csvString += "" + ";";
    csvString += checkJSONValue(basics_gami.basics_gami_good.basics_gami_good) + ";";
    csvString += basics_gami.basics_gami_general_liking !== undefined ? checkJSONValue(basics_gami.basics_gami_general_liking.lbs_5) +";" : "" + ";";
    csvString += checkJSONValue(basics_gami.basic_7.basics_game_affinity) + ";";
    csvString += checkJSONValue(basics_gami.basic_7.basics_video_game_frequency) + ";";
    csvString += checkJSONValue(basics_gami.basic_7.basics_video_game_passion) + ";";
    csvString += checkJSONValue(basics_gami.basic_7.basics_board_game_frequency) + ";";
    csvString += checkJSONValue(basics_gami.basic_7.basics_board_game_passion) + ";";
    csvString += checkJSONValue(basics_gami.basic_7.basics_game_performance) + ";";
    break;
}

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






csvString += "\n";


}
        });

        fs.unlink('CSVDjango/auswertung_django_filtered.csv', function(err) {
            fs.appendFile('CSVDjango/auswertung_django_wout_filtered.csv', csvString, function(err) {
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
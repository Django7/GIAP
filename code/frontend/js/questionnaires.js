/* ---------------------- COLUMNS, CHOICES for questionnaires ---------------- */
var COLUMNS_5_AGGREE = [
    {value: 1, text: "Stimme nicht zu"},
    {value: 2, text: "Stimme eher nicht zu"},
    {value: 3, text: "Weder noch"},
    {value: 4, text: "Stimme eher zu"},
    {value: 5, text: "Stimme zu"}
];

var COLUMNS_5_TRUE = [
    {value: 0, text: "Stimmt gar nicht"},
    {value: 1, text: "Stimmt wenig"},
    {value: 2, text: "Stimmt ziemlich"},
    {value: 3, text: "Stimmt teils-teils"},
    {value: 4, text: "Stimmt völlig"}
];

var COLUMNS_9_APPLY = [
    {value: 1, text: "Trifft nicht zu"},
    {value: 2, text: ""},
    {value: 3, text: "Trifft eher nicht zu"},
    {value: 4, text: ""},
    {value: 5, text: "Trifft teils-teils zu"},
    {value: 6, text: ""},
    {value: 7, text: "Trifft eher zu"},
    {value: 8, text: ""},
    {value: 9, text: "Trifft zu"}
];

var COLUMNS_5_APPLY = [
    {value: 1, text: "Trifft nicht zu"},
    {value: 2, text: "Trifft eher nicht zu"},
    {value: 3, text: "Trifft teils-teils zu"},
    {value: 4, text: "Trifft eher zu"},
    {value: 5, text: "Trifft zu"}
];

var CHOICES_YES_NO = ["Ja", "Nein"];

/* -------------------------- QUESTIONNAIRES ------------------------ */

// Holding if the respective questionnaires were finished or not
var QUESTS = {'demographics': false, 'design': false, 'end_normal': false, 'end_design': false};

/**
 * Parts of questionnaires to use instead of hard-copying them
 * @type {{demographics: *[], imi: {type: string, name: string, title: string, isAllRowRequired: boolean, isRequired: boolean, columns: *[], rows: *[]}, additional_comments_study: {type: string, name: string, title: string, rows: number}, big_five: {type: string, name: string, title: string, isAllRowRequired: boolean, isRequired: boolean, columns: *[], rows: *[]}, sus: {type: string, name: string, title: string, isAllRowRequired: boolean, isRequired: boolean, columns: *[], rows: *[]}, game_affinity: {type: string, name: string, title: string, isAllRowRequired: boolean, isRequired: boolean, columns: *[], rows: *[]}}}
 */


var PART_QUESTS = {


    KIM_enjoyment_choice1: [{
        type: "matrix",
        name: "kim_enjoyment_choice1",
        title: "Inwiefern treffen die folgenden Aussagen auf dich zu?",
        isAllRowRequired: true,
        isRequired: true,
        columns: COLUMNS_5_AGGREE,
        rows: shuffleArray([{
            value: "tagging_fun_1",
            text: "Das Bilder-Taggen hat mir Spaß gemacht."
        }, {
            value: "tagging_interesting_1",
            text: "Ich fand das Bilder-Taggen sehr interessant."
        }, {
            value: "tagging_entertaining_1",
            text: "Das Bilder-Taggen war unterhaltsam."
        }])
    }],

    KIM_enjoyment_choice2: [{
        type: "matrix",
        name: "kim_enjoyment_choice2",
        title: "Inwiefern treffen die folgenden Aussagen auf dich zu?",
        isAllRowRequired: true,
        isRequired: true,
        columns: COLUMNS_5_AGGREE,
        rows: shuffleArray([{
            value: "tagging_fun_2",
            text: "Das Bilder-Taggen hat mir Spaß gemacht."
        }, {
            value: "tagging_interesting_2",
            text: "Ich fand das Bilder-Taggen sehr interessant."
        }, {
            value: "tagging_entertaining_2",
            text: "Das Bilder-Taggen war unterhaltsam."
        }])
    }],

    

    demographics: [{
        type: "dropdown",
        name: "age",
        title: "Wie alt bist du?",
        isRequired: true,
        choices: ["unter 18", "18-24", "25-31", "32-38", "39-45", "46-52", "53-59", "60 und älter", "Möchte ich nicht beantworten"]
    }, {
        type: "dropdown",
        name: "gender",
        title: "Dein Geschlecht?",
        isRequired: true,
        hasOther: true,
        otherText: "Anderes, und zwar (bitte angeben):",
        choices: ["Weiblich", "Männlich", "Möchte ich nicht beantworten"]
    }, {
        type: "text",
        name: "nationality",
        title: "Deine Nationalität?",
        isRequired: true
    }, {
        type: "dropdown",
        name: "url_where_from",
        isRequired: true,
        hasOther: true,
        otherText: "Anderes (bitte angeben):",
        title: "Woher hast du von dieser Studie gehört?",
        choices: ["Über meinen Arbeitsplatz", "Von Freunden","Von Familie", "Über Instagram"]
    }],
    imi: {
        type: "matrix",
        name: "imi_interest_enjoyment",
        title: "Inwiefern treffen die folgenden Aussagen auf dich zu?",
        isAllRowRequired: true,
        isRequired: true,
        columns: COLUMNS_5_AGGREE,
        rows: shuffleArray([{
            value: "tagging_fun_imi",
            text: "Das Bilder-Taggen hat mir Spaß gemacht."
        }, {
            value: "tagging_interesting_imi",
            text: "Ich fand das Bilder-Taggen sehr interessant."
        }, {
            value: "tagging_entertaining_imi",
            text: "Das Bilder-Taggen war unterhaltsam."
        }, {
            value: "tagging_performance_imi",
            text: "Mit meiner Leistung beim Bilder-Taggen bin ich zufrieden."
        }, {
            value: "tagging_competence_imi",
            text: "Beim Bilder-Taggen stelle ich mich geschickt an."
        }, {
            value: "tagging_success_imi",
            text: "Ich glaube, ich war beim Bilder-Taggen ziemlich gut."
        }, {
            value: "tagging_choice_self_imi",
            text: "Ich konnte das Bilder-Taggen selbst steuern."
        }, {
            value: "tagging_choice_generic_imi",
            text: "Beim Bilder-Taggen konnte ich wählen, wie ich es mache."
        }, {
            value: "tagging_choice_steering_imi",
            text: "Beim Bilder-Taggen konnte ich so vorgehen, wie ich es wollte."
        }, {
            value: "tagging_pressure_imi",
            text: "Beim Bilder-Taggen fühlte ich mich unter Druck."
        }, {
            value: "tagging_tension_imi",
            text: "Beim Bilder-Taggen fühlte ich mich angespannt."
        }, {
            value: "tagging_concerns_imi",
            text: "Ich hatte Bedenken, ob ich das Bilder-Taggen gut hinbekomme."
        }])
    },

    
    maximization_scale: [{
        type: "matrix",
        name: "maximization_scale",
        title: "Inwiefern treffen die folgenden Aussagen auf dich zu?",
        isAllRowRequired: true,
        isRequired: true,
        columns: COLUMNS_9_APPLY,
        rows: shuffleArray([{
            value: "maxi_1_alternative",
            text: "Wenn ich fernsehe, zappe ich durch die Programme und überfliege oft die zur Verfügung stehenden Alternativen, sogar wenn ich eigentlich eine bestimmte Sendung sehen möchte."
        }, {
            value: "maxi_2_better",
            text: "Wenn ich im Auto Radio höre, prüfe ich oft die anderen Radiosender daraufhin, ob etwas Besseres gespielt wird, sogar wenn ich relativ zufrieden mit dem bin, was ich gerade höre."
        }, {
            value: "maxi_3_try",
            text: "Mit Beziehungen ist es wie mit Kleidungsstücken: Ich gehe davon aus, dass ich viele ausprobieren muss, bevor ich die perfekte Passung finde."
        }, {
            value: "maxi_4_job",
            text: "Egal wie zufrieden ich mit meinem Beruf bin, es ist immer sinnvoll, nach besseren Optionen Ausschau zu halten."
        }, {
            value: "maxi_5_fantasize",
            text: "Ich fantasiere oft darüber, ein Leben zu leben, das sich sehr von meinem jetzigen unterscheidet."
        }, {
            value: "maxi_6_leaderboard",
            text: "Ich bin ein großer Freund von Ranglisten (die besten Filme, die besten Sänger, die besten Sportler, die besten Bücher, etc.)."
        }, {
            value: "maxi_7_present",
            text: "Es fällt mir häufig schwer, ein Geschenk für einen Freund zu kaufen."
        }, {
            value: "maxi_8_shopping",
            text: "Wenn ich einkaufen gehe, fällt es mir schwer, Kleidungsstücke zu finden, die ich richtig gut finde."
        }, {
            value: "maxi_9_videos",
            text: "Videos auszuleihen ist sehr schwierig. Ich mühe mich stets damit ab, das Beste auszusuchen."
        }, {
            value: "maxi_10_writing",
            text: "Ich finde Schreiben schwierig, sogar wenn es nur darum geht, einem Freund einen Brief zu schreiben. Es ist so schwer, die richtigen Worte zu finden. Auch von einfachen Sachen mache ich oft mehrere Entwürfe."
        }, {
            value: "maxi_11_highest_standard",
            text: "Egal was ich tue: Ich messe mich am höchsten Standard."
        }, {
            value: "maxi_12_second_best",
            text: "Ich gebe mich nie mit dem Zweitbesten zufrieden."
        }, {
            value: "maxi_13_other_possibilites",
            text: "Wenn ich eine Entscheidung treffen soll, versuche ich mir alle anderen Möglichkeiten vorzustellen, sogar die, die momentan gar nicht zur Verfügung stehen."
        }])
    }],
    regret_scale: [{
        type: "matrix",
        name: "regret_scale",
        title: "Inwiefern treffen die folgenden Aussagen auf dich zu?",
        isAllRowRequired: true,
        isRequired: true,
        columns: COLUMNS_9_APPLY,
        rows: shuffleArray([{
            value: "regret_1_other_decision",
            text: "Nach jeder Entscheidung, die ich getroffen habe, frage ich mich, was passiert wäre, wenn ich mich anders entschieden hätte."
        }, {
            value: "regret_2_other_better",
            text: "Wenn ich eine Entscheidung treffe, versuche ich hinterher herauszufinden, zu welchem Ergebnis die anderen Alternativen geführt hätten."
        }, {
            value: "regret_3_other_outcomes",
            text: "Selbst eine gute Entscheidung empfinde ich als Misserfolg, wenn sich herausstellt, dass eine andere Möglichkeit besser gewesen wäre."
        }, {
            value: "regret_4_missed_chances",
            text: "Wenn ich über mein Leben nachdenke, kommen mir oft verpasste Chancen in den Sinn."
        }, {
            value: "regret_5_not_questioning",
            text: "Wenn ich mich einmal entschieden habe, hinterfrage ich diese Entscheidung nicht."
        }])
    }],
    additional_comments_study: {
        type: "comment",
        name: "comments",
        title: "Hast du weitere Kommentare oder Feedback zur Studie, das du uns mitteilen möchtest? (optional)",
        rows: 4
    },
    task_perception: {
        type: "matrix",
        name: "task_perception",
        title: "Inwiefern treffen die folgenden Aussagen auf dich zu?",
        isAllRowRequired: true,
        isRequired: true,
        columns: COLUMNS_5_AGGREE,
        rows: [{
            value: "tp_boring",
            text: "Ich fand die Aufgabe langweilig."
        }, {
            value: "tp_important",
            text: "Es war wichtig für mich, so viele Tags wie möglich zu erstellen."
        }]
    },
    perception_points: {
        type: "matrix",
        name: "perception_points",
        title: "Inwiefern treffen die folgenden Aussagen auf dich zu?",
        isAllRowRequired: true,
        isRequired: true,
        columns: COLUMNS_5_AGGREE,
        rows: [{
            value: "pp_1_points",
            text: "Ich mochte es Punkte für das eingeben von Tags zu erhalten."
        }, {
            value: "pp_2_motivated",
            text: "Punkte für das Bilder-Taggen zu erhalten hat mich motiviert mehr Tags zu erstellen."
        }, {
            value: "pp_3_motivating_in_general",
            text: "Ich finde Punkte allgemein motivierend."
        }, {
            value: "pp_4_distracted",
            text: "Ich fühlte mich durch das Erhalten von Punkten abgelenkt."
        }]
    },
    general_leaderboard: {
        type: "matrix",
        name: "general_leaderboard",
        title: "Inwiefern treffen die folgenden Aussagen auf dich zu?",
        isAllRowRequired: true,
        isRequired: true,
        columns: COLUMNS_5_AGGREE,
        rows: [{
            value: "lbg_1_leaderboard",
            text: "Ich mochte es mich mit anderen auf einer Bestenliste zu vergleichen."
        }, {
            value: "lbg_2_motivated",
            text: "Mich mit anderen auf einer Bestenliste vergleichen zu können hat mich motiviert mehr Tags zu stellen."
        }, {
            value: "lbg_3_motivating_in_general",
            text: "Ich finde den Vergleich mit anderen auf einer Bestenliste allgemein motivierend."
        }, {
            value: "lbg_4_distracted",
            text: "Ich fühlte mich durch die Bestenliste abgelenkt."
        }]
    },

    /** ++++++++++++++++++++++++++++++++++leaderboard specifics++++++++++++++++++++++++++++++++++ */
    lb_specific_1: {
        type: "matrix",
        name: "lbs_absolute",
        title: "Inwiefern treffen die folgenden Aussagen auf dich zu?",
        isAllRowRequired: true,
        isRequired: true,
        columns: COLUMNS_5_APPLY,
        rows: [{
            value: "lbs_absolute",
            text: "Ich mochte es, dass auf der Bestenliste alle Spieler gleichzeitig angezeigt wurden."
        }]
    },

    lb_specific_2: {
        type: "matrix",
        name: "lbs_relative",
        title: "Inwiefern treffen die folgenden Aussagen auf dich zu?",
        isAllRowRequired: true,
        isRequired: true,
        columns: COLUMNS_5_APPLY,
        rows: [{
            value: "lbs_relative",
            text: "Ich mochte es, dass auf der Bestenliste nur die Spieler angezeigt wurden, welche direkt über und unter mir platziert waren."
        }]
    },

    lb_specific_3: {
        type: "matrix",
        name: "lbs_absolute_chosen_motivating",
        title: "Inwiefern treffen die folgenden Aussagen auf dich zu?",
        isAllRowRequired: true,
        isRequired: true,
        columns: COLUMNS_5_APPLY,
        rows: [{
            value: "lbs_3",
            text: "Ich habe die Version der Bestenliste welche alle Spieler gleichzeitig anzeigt hat ausgewählt, weil ich diese Version motivierender fand als die Bestenliste welche nur die Spieler angezeigt hat welche direkt über und unter mir platziert waren."
        }]
    },

    lb_specific_4 : {
        type: "comment",
        name: "lbs_absolute_chosen_explain",
        isRequired: true,
        //rows: 3,
        title: "Warum haben Sie die Bestenliste ausgewählt, welche alle Spieler gleichzeitig angezeigt hat, anstatt der Bestenliste, welche nur die Spieler angezeigt hat welche direkt über und unter mir platziert waren?"
    },

    lb_specific_5: {
        type: "matrix",
        name: "lbs_relative_chosen_motivating",
        title: "Inwiefern treffen die folgenden Aussagen auf dich zu?",
        isAllRowRequired: true,
        isRequired: true,
        columns: COLUMNS_5_APPLY,
        rows: [{
            value: "lbs_relative_chosen_motivating",
            text: "Ich habe die Version der Bestenliste, welche nur die Spieler angezeigt hat welche direkt über und unter mir platziert waren, ausgewählt, weil ich diese Version motivierender fand als die Bestenliste, welche alle Spieler gleichzeitig anzeigt hat."
        }]
    },

    lb_specific_6 : {
        type: "comment",
        name: "lbs_relative_chosen_explain",
        isRequired: true,
        //rows: 3,
        title: "Warum haben Sie die Bestenliste ausgewählt, welche nur die Spieler angezeigt hat welche direkt über und unter mir platziert waren, anstatt der Bestenliste welche alle Spieler gleichzeitig angezeigt hat?"
    },


   /** ++++++++++++++++++++++++++++++++++choice specifics++++++++++++++++++++++++++++++++++ */

   choice_specific_1: {
    type: "matrix",
    name: "choice_specific_1",
    title: "Inwiefern treffen die folgenden Aussagen auf dich zu?",
    isAllRowRequired: true,
    isRequired: true,
    columns: COLUMNS_5_APPLY,
    rows: [{
        value: "choice_tutorial",
        text: "Das Tutorial half mir, meine Wahlmöglichkeiten zu verstehen."
    }, {
        value: "choice_overstained",
        text: "Ich fühlte mich überfordert zu entscheiden, welche Version der Bestenliste ich verwenden möchte."
    }, {
        value: "choice_satisfied",
        text: "Ich war mit der getroffenen Wahl, bezüglich der verschiedenen Versionen der Bestenliste zufrieden."
    }, {
        value: "choice_liked",
        text: "Ich finde es gut, dass ich entscheiden konnte welche Version der Bestenliste verwendet wurde."
    }, {
        value: "choice_motivated",
        text: "Ich fühlte mich durch die Wahlmöglichkeit, welche Version der Bestenliste ich verwenden möchte, motiviert, die Aufgabe gut zu erfüllen."
    }, {
        value: "choice_more_options",
        text: "Ich hätte gerne noch weitere Entscheidungsmöglichkeiten gehabt."
    }]
},

choice_specific_2: {
    type: "matrix",
    name: "choice_none_extra_elements",
    title: "Inwiefern treffen die folgenden Aussagen auf dich zu?",
    isAllRowRequired: true,
    isRequired: true,
    columns: COLUMNS_5_APPLY,
    rows: [{
        value: "choice_none_extra_elements",
        text: "Ich hätte es gut gefunden, wenn die Aufgabe zusätzliche Elemente gehabt hätte (z. B. Punkte für jeden Tag erhalten, oder eine Bestenliste um meine Leistung mit anderen Spielern zu vergleichen)."
    }]
},

//Only in Relative Condition
choice_specific_3: {
    type: "matrix",
    name: "choice_prefered_absolute",
    title: "Inwiefern treffen die folgenden Aussagen auf dich zu?",
    isAllRowRequired: true,
    isRequired: true,
    columns: COLUMNS_5_APPLY,
    rows: [{
        value: "choice_prefered_absolute",
        text: "Hier sehen Sie eine Bestenliste, welche alle Spieler anzeigt. Hätten Sie lieber diese Bestenliste verwendet?"
    }]
},

//Only in Relative Condition
choice_specific_3_1: {
    type: "matrix",
    name: "choice_abs_first_options",
    title: "Inwiefern treffen die folgenden Aussagen auf dich zu?",
    isAllRowRequired: true,
    isRequired: true,
    columns: COLUMNS_5_APPLY,
    rows: [{
        value: "choice_abs_first_options",
        text: "Hier sehen Sie eine Bestenliste, welche alle Spieler anzeigt, und die Bestenliste welche Sie verwendet haben. Hätten Sie gerne die Auswahl gehabt welche Version der Bestenliste Sie verwenden möchten?"
    }]
},

//Only in Absolute Condition
choice_specific_4: {
    type: "matrix",
    name: "choice_prefered_relative",
    title: "Inwiefern treffen die folgenden Aussagen auf dich zu?",
    isAllRowRequired: true,
    isRequired: true,
    columns: COLUMNS_5_APPLY,
    rows: [{
        value: "choice_prefered_relative",
        text: "Hier sehen Sie eine Bestenliste, welche nur die Spieler anzeigt welche direkt über und unter Ihnen platziert sind. Hätten Sie lieber diese Bestenliste verwendet?"
    }]
},

//Only in Absolute Condition
choice_specific_4_1: {
    type: "matrix",
    name: "choice_rel_first_options",
    title: "Inwiefern treffen die folgenden Aussagen auf dich zu?",
    isAllRowRequired: true,
    isRequired: true,
    columns: COLUMNS_5_APPLY,
    rows: [{
        value: "choice_rel_first_options",
        text: "Hier sehen Sie eine Bestenliste, welche nur die Spieler anzeigt welche direkt über und unter Ihnen platziert sind, und die Bestenliste, welche Sie verwendet haben. Hätten Sie gerne die Auswahl gehabt welche Version der Bestenliste Sie verwenden möchten?"
    }]
},

choice_specific_5: {
    type: "matrix",
    name: "choice_specific_5",
    //title: "Inwiefern treffen die folgenden Aussagen auf dich zu?",
    isAllRowRequired: true,
    isRequired: true,
    columns: COLUMNS_5_APPLY,
    rows: [{
        value: "choice_none_options",
        text: "Hier sehen Sie eine Bestenliste, welche nur die Spieler anzeigt welche direkt über und unter Ihnen platziert waren, und eine Bestenliste welche alle Spieler anzeigt. Hätten Sie gerne die Auswahl gehabt welche Version der Bestenliste Sie verwenden möchten?"
    }]
},

choice_specific_5_1: {
    type: "choice_specific_5_1",
    name: "choice_none_decision",
    title: "Welche Version der Bestenliste hätten Sie gewählt?",
    isRequired: true,
    choices: ["Linke Version","Rechte Version"]
},

choice_specific_6: {
    type: "comment",
    name: "choice_none_explain",
    title: "Warum hätten Sie diese Version der Bestenliste gewählt?",
    isRequired: true,
},





//BASICS



    basics_1:{
        type: "dropdown",
        name: "gaming_time",
        title: "Wie viele Stunden pro Woche spielen Sie im Schnitt Spiele (egal ob analog oder digital)?",
        isRequired: true,
        choices: ["unter 18", "18-24", "25-31", "32-38", "39-45", "46-52", "53-59", "60 und älter", "Möchte ich nicht beantworten"]
    },
    basics_2:{
        type: "dropdown",
        name: "basics_gamification_experience",
        title: "Unter \"Gamification\" versteht man den Einsatz spieltypischer Elemente (z.B. Punkte/Ranglisten) in spielfremden Umgebungen zur Verhaltensänderung und zur Steigerung der Motivation (z.B. Vergabe von Punkten in Fitnessapps). Haben Sie in der Vergangenheit Erfahrungen mit gamifizierten Systemen gemacht?",
        isRequired: true,
        choices: CHOICES_YES_NO,
    },
    basics_3:{
    },
    basics_4:{
    type: "matrix",
    name: "basics_gami_used",
    title: "Inwiefern treffen die folgenden Aussagen auf dich zu?",
    isAllRowRequired: true,
    isRequired: true,
    columns: COLUMNS_5_APPLY,
    rows: [{
        value: "basics_gami_used",
        text: "Ich hätte es bei der Aufgabe in dieser Studie gut gefunden, wenn Gamification verwendet worden wäre."
}]
    },
    basics_5:{
        type: "matrix",
        name: "basics_gami_good",
        title: "Inwiefern treffen die folgenden Aussagen auf dich zu?",
        isAllRowRequired: true,
        isRequired: true,
        columns: COLUMNS_5_APPLY,
        rows: [{
            value: "basics_gami_good",
            text: "Ich fand die in dieser Studie angebotene Gamification gut."
    }]
    },
    
    basics_7: {
        type: "matrix",
        name: "basic_7",
        title: "Inwiefern treffen die folgenden Aussagen auf dich zu?",
        isAllRowRequired: true,
        isRequired: true,
        columns: COLUMNS_5_AGGREE,
        rows: [{
            value: "game_affinity",
            text: "Ich halte mich selbst für spielaffin."
        }, {
            value: "video_game_frequency",
            text: "Ich spiele häufig Videospiele."
        }, {
            value: "video_game_passion",
            text: "Ich habe eine Leidenschaft für Videospiele."
        }, {
            value: "board_game_frequency",
            text: "Ich spiele häufig Brettspiele."
        }, {
            value: "board_game_passion",
            text: "Ich habe eine Leidenschaft für Brettspiele."
        },{
            value: "game_performance",
            text: "Es ist mir in Spielen allgemein wichtig, gute Leistungen zu bringen."
        }]
    },

    big_five: {
        type: "matrix",
        name: "big_five_matrix",
        title: "Inwiefern treffen die folgenden Aussagen auf dich zu?",
        isAllRowRequired: true,
        isRequired: true,
        columns: COLUMNS_5_AGGREE,
        rows: [{
            value: "bf_reserved",
            text: "Ich bin eher zurückhaltend, reserviert."
        }, {
            value: "bf_trust",
            text: "Ich schenke anderen leicht Vertrauen, glaube an das Gute im Menschen."
        }, {
            value: "bf_convenient",
            text: "Ich bin bequem, neige zur Faulheit."
        }, {
            value: "bf_relaxed_stress",
            text: "Ich bin entspannt, lasse mich durch Stress nicht aus der Ruhe bringen."
        }, {
            value: "bf_art_interest",
            text: "Ich habe nur wenig künstlerisches Interesse."
        }, {
            value: "bf_social",
            text: "Ich gehe aus mir heraus, bin gesellig."
        }, {
            value: "bf_criticize",
            text: "Ich neige dazu, andere zu kritisieren."
        }, {
            value: "bf_task_properly",
            text: "Ich erledige Aufgaben gründlich."
        }, {
            value: "bf_fast_nervous",
            text: "Ich werde leicht nervös und unsicher."
        }, {
            value: "bf_fantasy",
            text: "Ich habe eine aktive Vorstellungskraft, bin fantasievoll."
        }]
    },
    sus: {
        type: "matrix",
        name: "sus_matrix",
        title: "Inwiefern treffen die folgenden Aussagen auf dich zu?",
        isAllRowRequired: true,
        isRequired: true,
        columns: COLUMNS_5_AGGREE,
        rows: [{
            value: "sus_frequently",
            text: "Ich denke, dass ich das System gerne häufig benutzen würde."
        }, {
            value: "sus_unnecessary_complex",
            text: "Ich fand das System unnötig komplex."
        }, {
            value: "sus_easiness_to_use",
            text: "Ich fand das System einfach zu benutzen."
        }, {
            value: "sus_technical_experienced",
            text: "Ich glaube, ich würde die Hilfe einer technisch versierten Person benötigen, um das System benutzen zu können."
        }, {
            value: "sus_functions_well_integrated",
            text: "Ich fand, die verschiedenen Funktionen in diesem System waren gut integriert."
        }, {
            value: "sus_too_inconsistent",
            text: "Ich denke, das System enthielt zu viele Inkonsistenzen."
        }, {
            value: "sus_fast_learnable",
            text: "Ich kann mir vorstellen, dass die meisten Menschen den Umgang mit diesem System sehr schnell lernen."
        }, {
            value: "sus_inconvenient ",
            text: "Ich fand das System sehr umständlich zu nutzen."
        }, {
            value: "sus_safety_while_using",
            text: "Ich fühlte mich bei der Benutzung des Systems sehr sicher."
        }, {
            value: "sus_lot_to_learn_before",
            text: "Ich musste eine Menge lernen, bevor ich anfangen konnte das System zu verwenden."
        }]
    },
    game_affinity: {
        type: "matrix",
        name: "design_game_affinity",
        //title: "Inwiefern treffen die folgenden Aussagen auf dich zu?",
        isAllRowRequired: true,
        isRequired: true,
        columns: COLUMNS_5_AGGREE,
        rows: [{
            value: "game_affinity",
            text: "Ich halte mich selbst für spielaffin."
        }, {
            value: "video_game_frequency",
            text: "Ich spiele häufig Videospiele."
        }, {
            value: "video_game_passion",
            text: "Ich habe eine Leidenschaft für Videospiele."
        }, {
            value: "board_game_frequency",
            text: "Ich spiele häufig Brettspiele."
        }, {
            value: "board_game_passion",
            text: "Ich habe eine Leidenschaft für Brettspiele."
        },{
            value: "game_performance",
            text: "Es ist mir in Spielen allgemein wichtig, gute Leistungen zu bringen."
        }]
    },
    care_comment_1: {
        type: "dropdown",
        name: "cc_usable",
        title: "Sollten Ihrer ehrlichen Meinung nach Ihre Daten bei der Analyse der Studienergebnisse verwendet werden?",
        isRequired: true,
        choices: CHOICES_YES_NO
    },
    care_comment_2: {
        type: "comment",
        name: "cc_comments",
        title: "Haben Sie noch Anregungen oder Kommentare zur Studie?",
        isRequired: false,
    },
    end: {
        type: "dropdown",
        name: "end_usable",
        title: "Dürfen wir unter diesem Aspekt Ihre Daten für die Studie weiterhin verwenden?",
        isRequired: true,
        choices: CHOICES_YES_NO        
    },
    asterisk_explanation: {
        type: "html",
        name: "asterisk_explanation_info",
        html: "<div class='center'><em>Hinweis: Fragen, die mit einem Stern (*) gekennzeichnet sind, sind besonders wichtig für uns und müssen " +
        "ausgefüllt werden, bevor du zur nächsten Seite gelangen kannst.</em></div>"
    },
    speed_test: [{
        type: "html",
        name: "speed_test_label",
        html: "<p class='pb-2'>Bitte gebe den folgenden Satz in das Feld darunter ein. " +
        "Jeder korrekt eingetippte Buchstabe verschwindet aus dem Satz. Ein Leerzeichen (\" \") zählt ebenfalls als Buchstabe. " +
        "Falls du dich vertippst, kannst du ganz einfach mit dem korrekten Buchstaben weiter machen, du musst den falschen Buchstaben nicht löschen. " +
        "Wenn du fertig bist, erscheint deine Tippgeschwindigkeit in dem entsprechenden Feld.</p>" +
        "<p id='speed_test_sentence' class='speed_test_sentence concept_recap pt-3 pb-3'>Wollen wir in die Ferne reisen, so müssen wir zunächst das Nahe durchqueren. Wollen wir in die Höhe hinaufsteigen, so müssen wir ganz unten damit beginnen.</p>" +
        "<input type='text' id='speed_test_input' class='w-60 form-control pt-2' placeholder='Tippe hier bitte den Satz ein.'/>"
    }, {
        type: "text",
        title: "Deine Tippgeschwindigkeit",
        name: "speed_test_value",
        isRequired: true,
        placeHolder: "Dieses Feld wird automatisch ausgefüllt, sobald du den Satz eingetippt hast.",
        requiredErrorText: "Bitte tippe den obigen Satz vollständig ein."
    }
    ]
};

/* ----------- THE "REAL" QUESTIONNAIRES ------------------- */
var QUEST_ABSOLUTE ={
    title: "Abschließender Fragebogen",
    showProgressBar: "top",
    pages: [ {
        questions: [PART_QUESTS.asterisk_explanation].concat(PART_QUESTS.imi)
    },/*{
        questions: [PART_QUESTS.asterisk_explanation].concat(PART_QUESTS.maximization_scale)
    },{
        questions: [PART_QUESTS.asterisk_explanation].concat(PART_QUESTS.regret_scale)
    },*/{
        questions: [PART_QUESTS.asterisk_explanation].concat(PART_QUESTS.task_perception)
    },/*{
        questions: [PART_QUESTS.asterisk_explanation].concat(PART_QUESTS.perception_points)
    },*/{
        questions: [PART_QUESTS.asterisk_explanation].concat(PART_QUESTS.general_leaderboard).concat(PART_QUESTS.lb_specific_1)
    },{
        questions: [PART_QUESTS.asterisk_explanation,PART_QUESTS.choice_specific_4,{
            type: "image",
                name: "choice_prefered_relative_IMG",
                imageLink: "img/rel_lb.PNG",
                imageWidth: "452px",
                imageHeight: "659,2px"},
                PART_QUESTS.choice_specific_4_1,{
                    type: "image",
                        name: "choice_rel_first_options_IMG",
                        imageLink: "img/choice_rel_first_options_img.PNG",
                        imageWidth: "904px",
                        imageHeight: "668px"}
            ]
    },{
        questions:[PART_QUESTS.asterisk_explanation].concat(PART_QUESTS.demographics)
    },{
        questions:[PART_QUESTS.asterisk_explanation,PART_QUESTS.basics_1,/*PART_QUESTS.basics,*/{
            type: "dropdown",
            name: "basics_gami_exp_except_study",
            title: "Unter \"Gamification\" versteht man den Einsatz spieltypischer Elemente (z.B. Punkte/Ranglisten) in spielfremden Umgebungen zur Verhaltensänderung und zur Steigerung der Motivation (z.B. Vergabe von Punkten in Fitnessapps). Haben Sie, abgesehen von der Gamifizierung, die in dieser Studie angeboten bzw. genutzt wurde, in der Vergangenheit Erfahrungen mit gamifizierten Systemen gemacht?",
            isRequired: true,
            choices: CHOICES_YES_NO 
        },{
            type: "matrix",
            name: "basics_gami_general_liking",
            isRequired: true,
            visibleIf: "{basics_gami_exp_except_study}='Ja'",
            columns: COLUMNS_5_APPLY,
            rows: [{
                value: "lbs_5",
                text: "Ich verwende gerne gamifizierte Systeme."
            }]
        },
        PART_QUESTS.basics_5,PART_QUESTS.basics_7]
    },{
        questions:[PART_QUESTS.asterisk_explanation].concat(PART_QUESTS.care_comment_1,PART_QUESTS.care_comment_2).concat(PART_QUESTS.end)
    }]
};

var QUEST_RELATIVE ={
    title: "Abschließender Fragebogen",
    showProgressBar: "top",
    pages: [{
        questions: [PART_QUESTS.asterisk_explanation].concat(PART_QUESTS.imi)
    },/*{
        questions: [PART_QUESTS.asterisk_explanation].concat(PART_QUESTS.maximization_scale)
    },{
        questions: [PART_QUESTS.asterisk_explanation].concat(PART_QUESTS.regret_scale)
    },*/{
        questions: [PART_QUESTS.asterisk_explanation].concat(PART_QUESTS.task_perception)
    },/*{
        questions: [PART_QUESTS.asterisk_explanation].concat(PART_QUESTS.perception_points)
    },*/{
        questions: [PART_QUESTS.asterisk_explanation].concat(PART_QUESTS.general_leaderboard).concat(PART_QUESTS.lb_specific_2)
    },{
        questions: [PART_QUESTS.asterisk_explanation,PART_QUESTS.choice_specific_3,{
            type: "image",
                name: "choice_prefered_absolute_IMG",
                imageLink: "img/abs_lb.PNG",
                imageWidth: "563px",
                imageHeight: "835px"},
                PART_QUESTS.choice_specific_3_1,{
                    type: "image",
                        name: "choice_abs_first_options_IMG",
                        imageLink: "img/choice_abs_first_options_img.PNG",
                        imageWidth: "994,1px",
                        imageHeight: "726,23px"}
            ]
    },{
        questions:[PART_QUESTS.asterisk_explanation].concat(PART_QUESTS.demographics)
    },{
        questions:[PART_QUESTS.asterisk_explanation,PART_QUESTS.basics_1,{
            type: "dropdown",
            name: "basics_gamification_experience",
            title: "Unter \"Gamification\" versteht man den Einsatz spieltypischer Elemente (z.B. Punkte/Ranglisten) in spielfremden Umgebungen zur Verhaltensänderung und zur Steigerung der Motivation (z.B. Vergabe von Punkten in Fitnessapps). Haben Sie, abgesehen von der Gamifizierung, die in dieser Studie angeboten bzw. genutzt wurde, in der Vergangenheit Erfahrungen mit gamifizierten Systemen gemacht?",
            isRequired: true,
            choices: CHOICES_YES_NO 
        },{
            type: "matrix",
            name: "basics_gami_general_liking",
            isRequired: true,
            visibleIf: "{basics_gamification_experience}='Ja'",
            columns: COLUMNS_5_APPLY,
            rows: [{
                value: "lbs_5",
                text: "Ich verwende gerne gamifizierte Systeme."
            }]
        },
        PART_QUESTS.basics_5,PART_QUESTS.basics_7]
    },{
        questions:[PART_QUESTS.asterisk_explanation].concat(PART_QUESTS.care_comment_1,PART_QUESTS.care_comment_2).concat(PART_QUESTS.end)
    }]
};

var QUEST_CONTROL ={
    title: "Abschließender Fragebogen",
    showProgressBar: "top",
    pages: [{
        questions: [PART_QUESTS.asterisk_explanation].concat(PART_QUESTS.imi)
    },/*{
        questions: [PART_QUESTS.asterisk_explanation].concat(PART_QUESTS.maximization_scale)
    },{
        questions: [PART_QUESTS.asterisk_explanation].concat(PART_QUESTS.regret_scale)
    },*/{
        questions: [PART_QUESTS.asterisk_explanation].concat(PART_QUESTS.task_perception)
    },{
        questions: [PART_QUESTS.asterisk_explanation,{

        },{
            type: "image",
                name: "banner",
                imageLink: "img/choice_rel_first_options_img.PNG",
                imageWidth: "1130px",
                imageHeight: "835px"},PART_QUESTS.choice_specific_5,PART_QUESTS.choice_specific_5_1,PART_QUESTS.choice_specific_6
            ]
    },{
        questions:[PART_QUESTS.asterisk_explanation].concat(PART_QUESTS.demographics)
    },{
        questions:[PART_QUESTS.asterisk_explanation,PART_QUESTS.basics_1,{
            type: "dropdown",
            name: "basics_gamification_experience",
            title: "Unter \"Gamification\" versteht man den Einsatz spieltypischer Elemente (z.B. Punkte/Ranglisten) in spielfremden Umgebungen zur Verhaltensänderung und zur Steigerung der Motivation (z.B. Vergabe von Punkten in Fitnessapps). Haben Sie in der Vergangenheit Erfahrungen mit gamifizierten Systemen gemacht?",
            isRequired: true,
            choices: CHOICES_YES_NO,
        },{
            type: "matrix",
            name: "basics_gami_general_liking",
            isRequired: true,
            visibleIf: "{basics_gami_exp_except_study}='Ja'",
            columns: COLUMNS_5_APPLY,
            rows: [{
                value: "lbs_5",
                text: "Ich verwende gerne gamifizierte Systeme."
            }]
        },
        PART_QUESTS.basics_4,PART_QUESTS.basics_7]
    },{
        questions:[PART_QUESTS.asterisk_explanation].concat(PART_QUESTS.care_comment_1,PART_QUESTS.care_comment_2).concat(PART_QUESTS.end)
    }]
};

var QUEST_ABSOLUTE_CHOSEN ={
    title: "Abschließender Fragebogen",
    showProgressBar: "top",
    pages: [{
        questions: [PART_QUESTS.asterisk_explanation].concat(PART_QUESTS.imi)
    },/*{
        questions: [PART_QUESTS.asterisk_explanation].concat(PART_QUESTS.maximization_scale)
    },{
        questions: [PART_QUESTS.asterisk_explanation].concat(PART_QUESTS.regret_scale)
    },*/{
        questions: [PART_QUESTS.asterisk_explanation].concat(PART_QUESTS.task_perception)
    },/*{
        questions: [PART_QUESTS.asterisk_explanation].concat(PART_QUESTS.perception_points)
    },*/{
        questions: [PART_QUESTS.asterisk_explanation].concat(PART_QUESTS.general_leaderboard).concat(PART_QUESTS.lb_specific_1).concat(PART_QUESTS.lb_specific_3).concat(PART_QUESTS.lb_specific_4)
    },{
        questions: [PART_QUESTS.asterisk_explanation].concat(PART_QUESTS.choice_specific_1)
    },{
        questions:[PART_QUESTS.asterisk_explanation].concat(PART_QUESTS.demographics)
    },{
        questions:[PART_QUESTS.asterisk_explanation,PART_QUESTS.basics_1,{
            type: "dropdown",
            name: "basics_gami_exp_except_study",
            title: "Unter \"Gamification\" versteht man den Einsatz spieltypischer Elemente (z.B. Punkte/Ranglisten) in spielfremden Umgebungen zur Verhaltensänderung und zur Steigerung der Motivation (z.B. Vergabe von Punkten in Fitnessapps). Haben Sie, abgesehen von der Gamifizierung, die in dieser Studie angeboten bzw. genutzt wurde, in der Vergangenheit Erfahrungen mit gamifizierten Systemen gemacht?",
            isRequired: true,
            choices: CHOICES_YES_NO 
        },{
            type: "matrix",
            name: "basics_gami_general_liking",
            isRequired: true,
            visibleIf: "{basics_gami_exp_except_study}='Ja'",
            columns: COLUMNS_5_APPLY,
            rows: [{
                value: "lbs_5",
                text: "Ich verwende gerne gamifizierte Systeme."
            }]
        },
        PART_QUESTS.basics_5,PART_QUESTS.basics_7]
    },{
        questions:[PART_QUESTS.asterisk_explanation].concat(PART_QUESTS.care_comment_1,PART_QUESTS.care_comment_2).concat(PART_QUESTS.end)
    }]
};

var QUEST_RELATIVE_CHOSEN ={
    title: "Abschließender Fragebogen",
    showProgressBar: "top",
    pages: [{
        questions: [PART_QUESTS.asterisk_explanation].concat(PART_QUESTS.imi)
    },/*{
        questions: [PART_QUESTS.asterisk_explanation].concat(PART_QUESTS.maximization_scale)
    },{
        questions: [PART_QUESTS.asterisk_explanation].concat(PART_QUESTS.regret_scale)
    },*/{
        questions: [PART_QUESTS.asterisk_explanation].concat(PART_QUESTS.task_perception)
    },/*{
        questions: [PART_QUESTS.asterisk_explanation].concat(PART_QUESTS.perception_points)
    },*/{
        questions: [PART_QUESTS.asterisk_explanation].concat(PART_QUESTS.general_leaderboard).concat(PART_QUESTS.lb_specific_2).concat(PART_QUESTS.lb_specific_5).concat(PART_QUESTS.lb_specific_6)
    },{
        questions: [PART_QUESTS.asterisk_explanation].concat(PART_QUESTS.choice_specific_1)
    },{
        questions:[PART_QUESTS.asterisk_explanation].concat(PART_QUESTS.demographics)
    },{
        questions:[PART_QUESTS.asterisk_explanation,PART_QUESTS.basics_1,{
            type: "dropdown",
            name: "basics_gami_exp_except_study",
            title: "Unter \"Gamification\" versteht man den Einsatz spieltypischer Elemente (z.B. Punkte/Ranglisten) in spielfremden Umgebungen zur Verhaltensänderung und zur Steigerung der Motivation (z.B. Vergabe von Punkten in Fitnessapps). Haben Sie, abgesehen von der Gamifizierung, die in dieser Studie angeboten bzw. genutzt wurde, in der Vergangenheit Erfahrungen mit gamifizierten Systemen gemacht?",
            isRequired: true,
            choices: CHOICES_YES_NO 
        },{
            type: "matrix",
            name: "basics_gami_general_liking",
            isRequired: true,
            visibleIf: "{basics_gami_exp_except_study}='Ja'",
            columns: COLUMNS_5_APPLY,
            rows: [{
                value: "lbs_5",
                text: "Ich verwende gerne gamifizierte Systeme."
            }]
        },
        PART_QUESTS.basics_5,PART_QUESTS.basics_7]
    },{
        questions:[PART_QUESTS.asterisk_explanation].concat(PART_QUESTS.care_comment_1,PART_QUESTS.care_comment_2).concat(PART_QUESTS.end)
    }]
};



var QUEST_ENJOY_CHOICE_1 ={
    title: "Vergnügen",
    showProgressBar: "top",
    pages: [{
        questions: [PART_QUESTS.asterisk_explanation].concat(PART_QUESTS.KIM_enjoyment_choice1)
    }]
};

var QUEST_ENJOY_CHOICE_2 ={
    title: "Vergnügen",
    showProgressBar: "top",
    pages: [{
        questions: [PART_QUESTS.asterisk_explanation].concat(PART_QUESTS.KIM_enjoyment_choice2)
    }]
};

var MAXIMIZATION_SCALE ={
    title: "Maximieren",
    showProgressBar: "top",
    pages: [{
        questions: [PART_QUESTS.asterisk_explanation].concat(PART_QUESTS.maximization_scale)
    }]
};
/**
 * The demographics questionnaire for the normal participants
 * @type {{title: string, pages: *[]}}
 */ 
var QUEST_DEMOGRAPHICS_NORMAL = {
    title: "Demographische Daten",
    showProgressBar: "top",
    pages: [{
        questions: [PART_QUESTS.asterisk_explanation].concat(PART_QUESTS.demographics)
    }, {
        questions: [PART_QUESTS.asterisk_explanation, PART_QUESTS.big_five]
    }]
};

/**
 * The demographics questionnaire for the design participants
 * @type {{title: string, pages: *[]}}
 */
var QUEST_DEMOGRAPHICS_DESIGN = {
    title: "Demographische Daten",
    pages: [{
        questions: [PART_QUESTS.asterisk_explanation].concat(PART_QUESTS.demographics).concat(PART_QUESTS.speed_test)
    }]
};

/**
 * The questionnaire for the design process
 * @type {{showProgressBar: string, pages: *[]}}
 */
var QUEST_DESIGN = {
    showProgressBar: "top",
    title: "Design deines persönlichen Spiels",
    pages: [{
        questions: [
            PART_QUESTS.asterisk_explanation,
            {
                type: "html",
                name: "concept_info",
                html: "" +
                "<p>\n" +
                "    Auf der vorherigen Seite hast du gesehen, wie Stichworte zur Stimmung eines Bildes erstellt werden.\n" +
                "    Im Folgenden hast du nun die Möglichkeit, dir ein Konzept zu überlegen, das dich persönlich\n" +
                "    dazu motivieren soll, mehr Stichwörter pro Bild zu erstellen.\n" +
                "    Hierfür kannst du annehmen, dass nacheinander insgesamt <strong>15 Bilder</strong> bearbeitet werden sollen, die\n" +
                "    jeweils für <strong>5 Sekunden</strong> sichtbar sind.\n" +
                "</p>\n" +
                "<p>\n" +
                "    Das Konzept sollte <strong>ein Spiel oder spiele-artig </strong>im<strong> Kontext dieser\n" +
                "    Webseite</strong> sein.\n" +
                "    <strong>Nicht</strong> im Kontext dieser Webseite ist z. B. eine Smartphone-App, ein Brettspiel, oder\n" +
                "    eine Anwendung ohne Bezug auf die zuvor gezeigte Stichwort-Erstellung.\n" +
                "    Du kannst frei entscheiden, wie dein Spielkonzept aussehen soll, und z. B. ob es ein Spiel \"nur für\n" +
                "    dich\" oder ein Spiel mit anderen ist.\n" +
                "    Bitte beschreibe dein Spielkonzept mit mindestens <strong>700 Zeichen</strong>, gerne aber mehr.\n" +
                "</p>\n" +
                "<p>\n" +
                "    Sobald du dein Spielkonzept abgeschickt hast, werden wir es überprüfen und realisieren.\n" +
                "    Danach senden wir <strong>dir eine E-Mail</strong> mit weiteren Informationen darüber, wie du es\n" +
                "    ausprobieren kannst.\n" +
                "</p>"
            }, {
                type: "comment",
                name: "concept",
                rows: 10,
                isRequired: true,
                validators: [{
                    type: "text",
                    minLength: "700"
                }
                ],
                title: "Wie würde solch ein Spielkonzept für dich aussehen?"
            }, {
                type: "html",
                name: "chars_reached",
                html: "<p class=\"pull-right txt_red\" id=\"design_chars_counter\">\n" +
                "    <small id=\"char_cnt\">0</small>\n" +
                "    <small> / mindestens 700</small>\n" +
                "</p>"
            }, {
                type: "comment",
                name: "concept_motivation",
                isRequired: true,
                rows: 2,
                title: "Warum denkst du, dass dein Spielkonzept dich motiviert mehr Stichwörter pro Bild zu erstellen?"
            }, {
                type: "text",
                name: "concept_most_important",
                isRequired: true,
                title: "Was ist für dich das Wichtigste an deinem Spielkonzept?"
            }, {
                type: "matrix",
                name: "concept_satisfaction",
                title: "Bitte bewerte die folgende Aussagen zu deinem Spielkonzept.",
                isRequired: true,
                isAllRowRequired: true,
                columns: COLUMNS_5_AGGREE,
                rows: [{
                    value: "satisfied",
                    text: "Ich bin zufrieden mit meinem Spielkonzept."
                }, {
                    value: "easiness",
                    text: "Es war leicht für mich ein Spielkonzept für den Prozess des Bilder-Taggens zu entwickeln."
                }, {
                    value: "motivation_for_others",
                    text: "Ich glaube, mein Spielkonzept könnte auch Andere motivieren, Bilder zu Taggen."
                }, {
                    value: "motivation_for_me",
                    text: "Ich glaube, mein Spielkonzept würde mich motivieren, Bilder zu Taggen."
                }, {
                    value: "relevance_of_setting",
                    text: "Das Taggen von Bildern ist relevant für mich."
                }, {
                    value: "already_motivated",
                    text: "Das Taggen von Bildern motiviert mich bereits - ich brauche kein Spiel, um mich zu motivieren."
                }]
            }, {
                type: "dropdown",
                name: "design_feasibility",
                title: "Wie schätzt du die Umsetzbarkeit deines Spielkonzepts ein?",
                choices: ["Leicht umsetzbar", "Schwer umsetzbar", "Nicht umsetzbar", "Kann ich nicht einschätzen"],
                isRequired: true,
                colCount: 0
            }, {
                type: "comment",
                name: "design_why_not_feasible",
                title: "Warum denkst du, dass eine Umsetzung nur schwer möglich ist? (optional)",
                visibleIf: "{design_feasibility} = 'Schwer umsetzbar'"
            }, {
                type: "comment",
                name: "design_why_not_feasible",
                title: "Warum denkst du, dass eine Umsetzung nicht möglich ist? (optional)",
                visibleIf: "{design_feasibility} = 'Nicht umsetzbar'"
            }, {
                type: "comment",
                name: "design_why_not_feasible",
                title: "Warum denkst du, dass du die Umsetzbarkeit nicht einschätzen kannst? (optional)",
                visibleIf: "{design_feasibility} = 'Kann ich nicht einschätzen'"
            }, {
                type: "dropdown",
                name: "design_game_already_designed",
                title: "Ich habe zuvor bereits ein Spiel selbst designt oder war Teil eines solchen Prozesses.",
                isRequired: true,
                colCount: 0,
                choices: CHOICES_YES_NO
            }, {
                type: "dropdown",
                name: "image_tagging_known_before",
                title: "Ich kannte das Prinzip des Bilder-Taggens bereits vor der Studie.",
                isRequired: true,
                colCount: 0,
                choices: CHOICES_YES_NO
            }]
    }, {
        title: "Fragen zu deiner Erfahrung mit Videospielen und Brettspielen",
        questions: [
            PART_QUESTS.asterisk_explanation,
            PART_QUESTS.game_affinity,
            {
                type: "text",
                name: "design_playtime",
                title: "Wie oft in der Woche spielst du Brett- oder Videospiele?"
            }, {
                type: "multipletext",
                name: "concept_email",
                title: "Deine E-Mail-Adresse, damit wir dich kontaktieren können, sobald wir dein Spielkonzept umgesetzt haben.",
                isRequired: true,
                colCount: 1,
                items: [{
                    name: "concept_email_first",
                    title: "Bitte trage deine E-Mail-Adresse ein.",
                    validators: [{
                        type: "email"
                    }]
                }, {
                    name: "concept_email_repeat",
                    title: "Bitte wiederhole deine E-Mail-Adresse.",
                    validators: [{
                        type: "email"
                    }]
                }]
            }, {
                type: "html",
                name: "mail_usage_info",
                html: "<p><em>Hinweis:</em> Wir nutzen deine E-Mail-Adresse ausschließlich dazu, dich zu kontaktieren, sobald dein Spielkonzept umgesetzt wurde. " +
                "Sie wird nach dem Ende der Studie von uns gelöscht, fließt nicht in die Auswertung mit ein und wird " +
                "insbesondere nicht für Werbezwecke an Dritte weitergegeben. " +
                "Weitere Infos kannst du in den <a href='javascript:btn_oc_viewDataPrivacy()'>Datenschutzhinweisen</a> nachlesen.</p>"
            }
        ]
    }]
};

/**
 * The end questionnaire for the normal progress
 * @type {{showProgressBar: string, showPrevButton: boolean, title: string, pages: *[]}}
 */
var QUEST_END_NORMAL = {
    showProgressBar: "top",
    showPrevButton: false,
    title: "Abschließender Fragebogen",
    pages: [
        {
            questions: [
                PART_QUESTS.asterisk_explanation,
                PART_QUESTS.imi
            ]
        }, {
            title: "Fragen zur Gebrauchstauglichkeit des Systems",
            name: "sus",
            questions: [PART_QUESTS.asterisk_explanation,
                PART_QUESTS.sus
            ]
        }, {
            questions: [
                PART_QUESTS.asterisk_explanation,
                PART_QUESTS.game_affinity,
                PART_QUESTS.additional_comments_study
            ]
        }
    ]
};

/**
 * The end questionnaire for the design process.
 * @type {{showPrevButton: boolean, title: string, pages: *[]}}
 */
var QUEST_END_DESIGN = {
    showPrevButton: false,
    showProgressBar: "top",
    title: "Abschließender Fragebogen",
    pages: [{
        title: "Fragen zur Realisierung deines Spielkonzepts",
        name: "design_implementation",
        questions: [
            PART_QUESTS.asterisk_explanation,
            {
                type: "html",
                name: "concept_recap",
                html: "<p>Damit du die folgenden Fragen zur Umsetzung deines Spielkonzepts besser beantworten " +
                "kannst, möchten wir dich bitten, dass du dein Konzept noch einmal durchliest, bevor du die " +
                "Fragen beantwortest.</p><br>" +
                "<p><strong>Dein Spielkonzept</strong></p>" +
                "<p class='concept_recap' id='concept_recap_concept'>Lädt...</p>" +
                "<p><strong>Was motiviert dich an deinem Spielkonzept</strong></p>" +
                "<p class='concept_recap' id='concept_recap_motivation'>Lädt...</p>" +
                "<p><strong>Das Wichtigste an deinem Spielkonzept</strong></p>" +
                "<p class='concept_recap' id='concept_recap_most_important'>Lädt...</p>"
            }, {
                type: "matrix",
                name: "design_implementation",
                title: "Inwiefern stimmst du den folgenden Aussagen zu?",
                isAllRowRequired: true,
                isRequired: true,
                columns: COLUMNS_5_AGGREE,
                rows: [{
                    value: "imp_satisfied_with_concept",
                    text: "Ich bin mit meinem Spielkonzept (siehe oben) zufrieden."
                }, {
                    value: "imp_satisfied_opt",
                    text: "Mein Spielkonzept wurde optisch zufriedenstellend umgesetzt."
                }, {
                    value: "imp_all_aspects_implemented",
                    text: "Alle Aspekte meines Spielkonzepts wurden umgesetzt."
                }, {
                    value: "imp_satisfied_general",
                    text: "Das Spiel beim Bilder-Taggen entspricht meinem Spielkonzept."
                }, {
                    value: "imp_motiv_design",
                    text: "Das Spiel beim Bilder-Taggen hat mich dazu motiviert, Bilder zu taggen."
                }, {
                    value: "imp_motiv_design_process",
                    text: "Mein Spielekonzept selbst zu entwickeln hat mich dazu motiviert, Bilder zu taggen."
                }]
            }, {
                type: "comment",
                name: "imp_optical_comment",
                title: "Welche Aspekte wurden optisch nicht zufriedenstellend umgesetzt? (optional)",
                visibleIf: "{design_implementation.imp_satisfied_opt} < 3"
            }, {
                type: "comment",
                name: "imp_aspects_comment",
                title: "Welche Aspekte deines Spielkonzepts wurden nicht umgesetzt? (optional)",
                visibleIf: "{design_implementation.imp_all_aspects_implemented} < 3"
            }, {
                type: "dropdown",
                name: "self_design_more_tags",
                title: "Bitte wähle die am meisten passende Antwort.",
                isRequired: true,
                choices: [
                    "OHNE mein Spielkonzept hätte ich WENIGER Tags erstellt bzw. Bilder bearbeitet.",
                    "OHNE mein Spielkonzept hätte ich GLEICH VIEL Tags erstellt bzw. Bilder bearbeitet.",
                    "OHNE mein Spielkonzept hätte ich MEHR Tags erstellt bzw. Bilder bearbeitet."
                ]
            }, {
                type: "dropdown",
                name: "change_something",
                title: "Wenn ich könnte, würde ich im Nachhinein gerne etwas an meinem Spielkonzept ändern.",
                isRequired: true,
                choices: CHOICES_YES_NO
            }, {
                type: "comment",
                name: "changes",
                visibleIf: "{change_something}='Ja'",
                title: "Bitte beschreibe, welchen Teil / welche Teile du an deinem Spielkonzept ändern würdest (optional):",
                rows: 4
            }]
    }, {
        title: "Fragen zur Gebrauchstauglichkeit des Systems",
        name: "sus",
        questions: [PART_QUESTS.asterisk_explanation, {
            type: "html",
            name: "platform_info",
            html: "<strong>Hinweis</strong>: Mit <strong>System</strong> ist dein realisiertes Spielkonzept gemeint."
        },
            PART_QUESTS.sus
        ]
    }, {
        title: "Die folgenden Fragen helfen uns dabei, deine Tag-Auswahl besser zu verstehen.",
        name: "imi",
        questions: [
            PART_QUESTS.asterisk_explanation,
            PART_QUESTS.imi,
            PART_QUESTS.additional_comments_study
        ]
    }]
};

/**
 * The big five questionnaire
 * @type {{title: string, pages: *[]}}
 */
var QUEST_BIG_FIVE = {
    title: "Demographische Daten",
    pages: [{
        questions: [
            PART_QUESTS.asterisk_explanation,
            PART_QUESTS.big_five
        ]
    }]
};

var SPEED_TEST = {
    title: "Speed test",
    pages: [{
        questions: PART_QUESTS.speed_test
    }]
};

/* ------------------------ CSS stuff -------------------------------- */
var QUEST_CSS_GENERIC = {
    matrix: {
        root: "table table-striped matrixtable"
    },
    navigationButton: "btn btn-primary"
};

/* ---------------------- VALIDATORS -------------------------------- */
/**
 * Custom survey validation questions
 * @param s (?)
 * @param options The questions
 */
function surveyValideQuestions(s, options) {
    if (options.name === 'concept_email') {
        var e1 = options.value['concept_email_first'];
        var e2 = options.value['concept_email_repeat'];

        if (e1.toLowerCase() !== e2.toLowerCase()) {
            options.error = 'Die E-Mail-Adressen müssen übereinstimmen.';
        }
    }
}
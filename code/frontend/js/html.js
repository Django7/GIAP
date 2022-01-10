/* -------------- view managers ------------------- */

/**
 * Sets the welcome text
 */
function setWelcomeText() {
    $.get('views/mst_welcome.html', function (template) {
        var in_design_implemented = arrayContainsElement(USER_GROUP, 'design_implemented');
        var params = {
            design_implemented: in_design_implemented,
            platform_closed: !PLATFORM_OPEN && !in_design_implemented
        };

        var rendered = Mustache.render(template, params);
        $('#main_container').html(rendered);
    });
}

/**
 * Sets the 'unsupported device' screen.
 */
function setUnsupportedDevice() {
    $('#main_container').load('views/cnt_mobile_device.html');
}

/**
 * Sets the image flipper (Front: image, Back: image annotation process)
 */
function setImageFlipper() {
    $('#div_it_img_card').flip({
        trigger: 'manual'
    });
}

/**
 * Activates the tag-it field
 */
function setTaggingField(autocomplete_tags) {
    printLog("TAGGING FIELD SET");
    autocomplete_tags = autocomplete_tags || [];

    var tagitField = $('#myTags');

    // destroy if exists
    // TODO: This fucker won't work
    // tagitField.tagit('destroy');

    if (autocomplete_tags.length > 0) {
        tagitField.tagit({
            singleFiled: true,
            afterTagAdded: increaseVisiblePoints,
            afterTagRemoved: decreaseVisiblePoints,
            caseSensitive: false,
            availableTags: autocomplete_tags
        });
    } else {
        tagitField.tagit({
            singleFiled: true,
            afterTagAdded: increaseVisiblePoints,
            afterTagRemoved: decreaseVisiblePoints,
            caseSensitive: false
        });
    }
}



function startEnjoymentChoice1Survey(callafter){
    startSurveyGeneric('kim_enjoyment_choice1', QUEST_ENJOY_CHOICE_1,callafter, null);
}

function startEnjoymentChoice2Survey(callafter){
    startSurveyGeneric('kim_enjoyment_choice2', QUEST_ENJOY_CHOICE_2,callafter, null);
}
/**
 * Starts the demographics Survey
 */
function startDemographicsSurveyNormal(callafter) {
    startSurveyGeneric('demographics', QUEST_DEMOGRAPHICS_NORMAL, callafter, null);
}

/**
 * Starts the demographics Survey
 */
function startDemographicsSurveyDesign(callafter) {
    startSurveyGeneric('demographics', QUEST_DEMOGRAPHICS_DESIGN, callafter, null);
}

/**
 * Starts the demographics Survey
 */
function startDemographicsBigFiveSurvey(callafter) {
    startSurveyGeneric('big_five', QUEST_BIG_FIVE, callafter, null);
}

/**
 * Initiate the design task survey (the one directly after designing the task)
 */
function startDesignTaskSurvey(callafter) {
    startSurveyGeneric('design', QUEST_DESIGN, callafter, null);
}

/**
 * Initiate the end questionnaire for the normal TD approach
 */
function startEndNormalSurvey(callafter) {
    startSurveyGeneric('end_normal', QUEST_END_NORMAL, callafter, null);
}

function startAbsoluteEndSurvey(callafter) {
    startSurveyGeneric('end_absolute', QUEST_ABSOLUTE ,callafter, null);
}

function startRelativeEndSurvey(callafter) {
    startSurveyGeneric('end_relative', QUEST_RELATIVE ,callafter, null);
}

function startControlEndSurvey(callafter) {
    startSurveyGeneric('end_control', QUEST_CONTROL ,callafter, null);
}

function startChoiceAbsoluteEndSurvey(callafter) {
    startSurveyGeneric('end_choice_absolute', QUEST_ABSOLUTE_CHOSEN ,callafter, null);
}

function startChoiceRelativeEndSurvey(callafter) {
    startSurveyGeneric('end_choice_relative', QUEST_RELATIVE_CHOSEN ,callafter, null);
}
/**
 * Initiate the end questionnaire for the test group
 */
function startEndDesignSurvey(callafter) {
    startSurveyGeneric('end_design', QUEST_END_DESIGN, callafter, function () {
        getConcept();
    });
}

function startSpeedTest() {
    startSurveyGeneric('demographics', SPEED_TEST, function () {
    }, function () {
    });
}

/**
 * Starts a DesignTaskSurvey:
 *  1. Set the environment
 *  2. Query the questionnaire
 * Warning: Does NOT handle the get, i.e. does not render the survey
 * Calls the callafterSurvey if the survey was already finished.
 * @param name: The name of the survey
 * @param jsonSurvey: the survey to show
 * @param callafterSurvey: The function to call after the survey was finished
 * @param callafterRender: The function to call after the survey environment is rendered and set
 */
function startSurveyGeneric(name, jsonSurvey, callafterSurvey, callafterRender) {
    callafterRender = callafterRender || null;
    // If the survey was already done, move directly to the callafterSurvey
    if (QUESTS[name]) {
        callafterSurvey();
        return;
    }
    $.get('views/mst_survey_frame.html', function (template) {
        var params = {'name': name};
        var rendered = Mustache.render(template, params);
        $('#main_container').html(rendered);

        // Execute the callafterRender, if needed
        if (null != callafterRender) { 
            callafterRender();
        }

        // Start the survey itself
        startSurvey(name, $('#survey_' + name), jsonSurvey, function () {
            callafterSurvey();
        });
    });
}

var CURRENT_SURVEY;

/**
 * Starts a survey at a specific element
 * When finishing the survey, the following steps get done:
 *  1. Send the result to the server
 *  2. Call the callafter
 * @param name The name of the survey
 * @param elem The element to start the survey in
 * @param json The survey in json format
 * @param callafter CalledAfter the survey was complete
 */
function startSurvey(name, elem, json, callafter) {
    CURRENT_SURVEY = new Survey.Model(json);
    CURRENT_SURVEY.locale = 'de';
    CURRENT_SURVEY.showPrevButton = false;
    CURRENT_SURVEY.showCompletedPage = false;
    QUEST_CURRENT_TO_SEND.start_time = Date.now();
    elem.Survey({
        model: CURRENT_SURVEY,
        css: QUEST_CSS_GENERIC,
        onComplete: function (result) {
            // Sends the result to the server
            var res = JSON.stringify(result.data);
            sendQuestionnairePOST(name, res);
            QUEST_CURRENT_TO_SEND.end_time = Date.now();
            sendQuestionnaireDuration(name, Math.floor((QUEST_CURRENT_TO_SEND.end_time - QUEST_CURRENT_TO_SEND.start_time)/1000));

            // Set the questionnaire to tone
            QUESTS[name] = true;

            // Set the callafter to execute, when the "OK" from the
            QUEST_CURRENT_TO_SEND.callafter = callafter;
        },
        onValidateQuestion: surveyValideQuestions
    });

    // Set the key up event to the concept, if such a question is present
    var question = CURRENT_SURVEY.getQuestionByName('concept');
    if (null != question) {
        var elt = $('#' + question.propertyHash['id'] + 'i');
        if (null != elt) {
            setDesignKeyUpEvent(elt);
        }
    }

    // Add the typing speed calculator
    if (name === 'demographics' && arrayContainsElement(USER_GROUP, 'design')){
        setSpeedTestEventListener();
    }
}

/**
 * Renders a mustache file and displays (append/set) it to a specified element
 * @param elem The element to render the template in
 * @param template_path The path to the template
 * @param params the parameters used for the template
 * @param fun_list The function list to execute after the rendering was successful
 * @param append append the result to @elem (true) or replace the content (false)
 */
function renderAndSetMustacheElement(elem, template_path, params, fun_list, append) {
    $.get(template_path, function (template) {
        var rendered = Mustache.render(template, params);
        if (append) {
            elem.append(rendered);
        } else {
            elem.html(rendered);
        }

        fun_list.forEach(function (fun) {
            fun();
        });
    });
}

/**
 * Sets an image
 * @param image The image to display
 */
function setImage(image) {
    $('#bilderbuch').attr('src', image);
}

/**
 * Sets example morales under the image
 * @param examples The examples to show
 */
function setExampleMorales(examples) {
    $('#tut_example_morales').html(examples);
}

/**
 * Sets the points
 * @param points The points to display
 */
function setPoints(points) {
    $('.game_element_point').html("Punkte: " + points);
}

/**
 * Sets a leaderboard using the API's response.
 * Means: It transforms the response and sets it.
 * @param leaderboard The leaderboard to display (in API response format)
 */
function setLeaderboardFromAPI(leaderboard) {
    var arrayOfData = [];
    for (var i = 0; i < leaderboard.length; i++) {
        var person = leaderboard[i];
        if (person['name'] === USER_NAME || person['name'] === 'Du') { //case: player in main task
            arrayOfData[i] = [person['points'], 'Du', '#0923f4', 1];
        }else if (person['name'] === USER_NAME || person['name'] === 'Du (Bsp.)'){ //case: player in tutorial
            arrayOfData[i] = [person['points'], 'Du (Bsp.)', '#0923f4', 1];
        }else {//case: non-player
            arrayOfData[i] = [person['points'], person['name'], '#607cae', 0];
        }
    }
    LEADERBOARD_ARRAY = arrayOfData;
    printLog(arrayOfData);
    //setLeaderboard();
    setLeaderboard(true);
}

function setRelativeLeaderboardFromAPI(leaderboard){
    
    NICKNAME = getCookie('lb_username');
    var Data = [];
    for (var i = 0; i < leaderboard.length; i++) {
        var person = leaderboard[i];
        if (person['name'] === USER_NAME || person['name'] === 'Du') { //case: player in main task
            Data[i] = [i+1, NICKNAME /*Du*/, person['points'],1];
            CURRENT_PLAYER_POSITION=i;
        }else if (person['name'] === USER_NAME || person['name'] === 'Du (Bsp.)'){ //case: player in tutorial
            Data[i] = [i+1,'Du (Bsp.)',person['points'],1];
            CURRENT_PLAYER_POSITION=i;
        }else {//case: non-player
            Data[i] = [i+1,person['name'], person['points'],0];
        }
    }


printLog(Data);
    LEADERBOARD_ARRAY = Data;
    createRelativeDynamicLeaderboard();
}

//removes all the players from the relative leaderboard who are not in direct proximity to the player
function createRelativeDynamicLeaderboard(){
    //speichern, wie viele leute vor dem ersten angezeigten spieler entfernt werden
    fetch = document.getElementById('table_leaderboard');
    
    updateRanking();

    for (var i = 0; i < LEADERBOARD_ARRAY.length; i++) {
        var person = LEADERBOARD_ARRAY[i];
        if (person[1] === USER_NAME || person[1] === 'Du'|| person[1] === NICKNAME ) { //case: player in main task
            CURRENT_PLAYER_POSITION=i;
        }else if (person[1] === USER_NAME || person[1] === 'Du (Bsp.)'){ //case: player in tutorial
            CURRENT_PLAYER_POSITION=i;
        }
    }


    var RawData = [];
    var currentposition = 0;
    RawData = JSON.parse(JSON.stringify(LEADERBOARD_ARRAY));
    for (var j = 0; j < LEADERBOARD_ARRAY.length; j++) {
        //printLog(LEADERBOARD_ARRAY.length);
        if(j!=CURRENT_PLAYER_POSITION && j!=CURRENT_PLAYER_POSITION+1 && j!=CURRENT_PLAYER_POSITION-1){
           // printLog("spliced");
            RawData.splice(currentposition,1);
           // printLog(visiblePlayerCount);
        }else if(CURRENT_PLAYER_POSITION==0){currentposition=2;}
        else {currentposition = 3;}
    
    } 
    printLog(RawData);
    var placeHolder = ["...","...","...",0];
    var Data = [];
    var playerIsAtTop = 1;

    if(RawData[0][0]!=1){
        Data[0] = placeHolder;
    } else playerIsAtTop =0;

    for (var c = playerIsAtTop; c < RawData.length+playerIsAtTop; c++) {
        Data[c]=RawData[c-playerIsAtTop];
    }
    //Data.concat(RawData);
    if(LEADERBOARD_ARRAY[LEADERBOARD_ARRAY.length-1][1]!="Du" && LEADERBOARD_ARRAY[LEADERBOARD_ARRAY.length-1][1]!="Du (Bsp.)" && LEADERBOARD_ARRAY[LEADERBOARD_ARRAY.length-2][1]!="Du" && LEADERBOARD_ARRAY[LEADERBOARD_ARRAY.length-2][1]!="Du (Bsp.)" && LEADERBOARD_ARRAY[LEADERBOARD_ARRAY.length-1][1]!=NICKNAME && LEADERBOARD_ARRAY[LEADERBOARD_ARRAY.length-2][1]!=NICKNAME){
        Data[Data.length] = placeHolder;
    } 
    //Data.push(placeHolder);

    printLog(Data);
    removeLeaderboardEntrys(fetch);


    var player_is_here = false;
    for(var i=0; i <Data.length; i++){
        if(Data[i][1] === 'Du (Bsp.)' || Data[i][1] === 'Du' || Data[i][1] === NICKNAME ){player_is_here=true;}

        var newRow = fetch.insertRow(fetch.length);
        for(var j=0; j<Data[i].length-1; j++){
            var cell = newRow.insertCell(j);
            cell.innerHTML = Data[i][j];
            if(player_is_here || Data[i][0]=="..."){     
            cell.style.fontWeight = 'bold';  
            } 
        }
        player_is_here=false;
    }
    //setVisible($('#fant_barchart'));
}

/* ----------------------- Code for the absolute leaderboard ------------------------- */
/** 
* transforms leaderboard data into useable string for the table generation 
*/
function setAbsoluteLeaderboardFromAPI(leaderboard){
    NICKNAME = getCookie('lb_username');
    var Data = [];
    for (var i = 0; i < leaderboard.length; i++) {
        var person = leaderboard[i];
        if (person['name'] === USER_NAME || person['name'] === 'Du') { //case: player in main task
            Data[i] = [i+1, NICKNAME/*'Du'*/, person['points'],1];
            CURRENT_PLAYER_POSITION=i;
        }else if (person['name'] === USER_NAME || person['name'] === 'Du (Bsp.)'){ //case: player in tutorial
            Data[i] = [i+1,'Du (Bsp.)',person['points'],1];
            CURRENT_PLAYER_POSITION=i;
        }else {//case: non-player
            Data[i] = [i+1,person['name'], person['points'],0];
        }
    }
    LEADERBOARD_ARRAY = Data;
    printLog(LEADERBOARD_ARRAY.length);
    createDynamicLeaderboard();
}



function createDynamicLeaderboard(){
    fetch = document.getElementById('table_leaderboard');
    updateRanking();
    //printLog("VisiblePlayerCount="+ visiblePlayerCount);
    printLog("init_lb_state"+INITIAL_LEADERBOARD_STATE);

    removeLeaderboardEntrys(fetch);

    
    var player_is_here = false;
    for(var i=0; i <LEADERBOARD_ARRAY.length; i++){
        if(LEADERBOARD_ARRAY[i][1] === 'Du (Bsp.)' || LEADERBOARD_ARRAY[i][1] === 'Du' || LEADERBOARD_ARRAY[i][1] === NICKNAME ){player_is_here=true;}

        var newRow = fetch.insertRow(fetch.length);
        for(var j=0; j<LEADERBOARD_ARRAY[i].length-1; j++){
            var cell = newRow.insertCell(j);
            cell.innerHTML = LEADERBOARD_ARRAY[i][j];
            if(player_is_here){     
            cell.style.fontWeight = 'bold';  
            } 
        }
        player_is_here=false;
    }

   // setVisible($('#fant_barchart'));
}


/** notwendig, da die Rankings sonst nach adaptLeaderboard falsch sein könnten */
function updateRanking(){
    //var leaderboard = LEADERBOARD_ARRAY;
    var rem = -1;
    for (var i = 0; i < LEADERBOARD_ARRAY.length; i++) {
        LEADERBOARD_ARRAY[i][0]=i+1;
    }
    for (var i = 0; i < LEADERBOARD_ARRAY.length-1; i++) {
        if(LEADERBOARD_ARRAY[i][2]==LEADERBOARD_ARRAY[i+1][2]){
            rem = i;
        }
    }
    if(rem!=-1){LEADERBOARD_ARRAY[rem+1][0]=rem+1;}
}


/**löscht das aktuelle leaderboard vom thead abwaerts */
function removeLeaderboardEntrys(fetch){
    while (fetch.firstChild) {
        fetch.removeChild(fetch.firstChild);
    }
}

/**
 * Sets the leaderboard according to the leaderboard_array.
 * Deletes the last element such that the user is only visible when he/she has more points than the last place.
 * @param anim Animation: true or false.
 */
function setLeaderboard(anim) {
    var temp_lb = jQuery.extend([], LEADERBOARD_ARRAY);

    // Remove all players with less than 1100 points
    // TODO: improve this thing
    printLog('Hier ist leaderboard');
    var index = 0;
    while (index !== -1) {
        index = -1;
        for (var i = 0; i < temp_lb.length; i++) {
            if (temp_lb[i][0] < 0) {  //Django
                index = i;
                break;
            }
        }
        if (index !== -1) {
            temp_lb.splice(index, 1);
        }
    }

    var username = getCookie('lb_username');
    if (username && username.length > 0) {
        replaceInArrayGeneric(LEADERBOARD_ARRAY, 1, 3, username, 1)
    }
    
    var lb = $('#div_it_lb');
    lb.html('');
    lb.jqBarGraph({
        data: temp_lb,
        animate: anim,
        height: 500,
        width: 370
    });
}

function setstandardLeaderboard(){ 
    setMainPoints();
    setVisible($('#div_new_leaderboard'));
}





/* ----------------------- The overlays ------------------------- */

/**
 * Welcome overlay
 */
function viewWelcomeOverlay() {
    printLog("start Welcome Overlay");
    setVisible($('#btn_quit_study'));
    var params = {};
    if (arrayContainsElement(USER_GROUP, 'design_implemented')) {
        params['design_implemented'] = true;
    } else if (arrayContainsElement(USER_GROUP, 'design')) {
        params['design'] = true;
    } else if (arrayContainsElement(USER_GROUP, 'choice')) {
        params['choice'] = true;
    } else {
        params['normal'] = true
    }

    $.get('views/dialogs/dia_mst_welcome.html', function (template) {
        var rendered = Mustache.render(template, params);
        rendered = rendered.replace(/[\r\n]/g, '');
        BootstrapDialog.show({  
            title: 'Einführung',
            message: rendered,
            closable: false,
            buttons: [{
                label: 'Weiter',
                action: function (dialogItself) {
                    dialogItself.close();
                    printLog("start Tutorial"); 
                    setTaggingTutorial();
                }
            }]
        });
    });
}

/**
 * Impressum overlay
 */
function viewImpressum() {
    BootstrapDialog.show({
        title: 'Impressum',
        message: $('<div></div>').load('views/dialogs/dia_impressum.html'),
        closable: true,
        buttons: [{
            label: 'Schließen',
            action: function (dialogItself) {
                dialogItself.close();
            }
        }]
    });
}

/**
 * Data privacy overlay
 */
function viewDataPrivacy() {
    $.get('views/dialogs/dia_mst_data_privacy.html', function (template) {
        var args = {};
        if (arrayContainsElement(USER_GROUP, 'design')) {
            args['design_only'] = true;
        } else {
            args['normal_only'] = true;
        }

        var rendered = Mustache.render(template, args);
        BootstrapDialog.show({
            title: 'Datenschutz',
            message: $('<div></div>').html(rendered),
            closable: true,
            buttons: [{
                label: 'Schließen',
                action: function (dialogItself) {
                    dialogItself.close();
                }
            }]
        });
    });
}

function viewChoiceOverlay1(){

    $.get('views/dialogs/dialogs_abs_rel_choice/mst_choice_view1.html', function (template) {
        var in_design_implemented = arrayContainsElement(USER_GROUP, 'design_implemented');
        var params = {
            design_implemented: in_design_implemented,
            platform_closed: !PLATFORM_OPEN && !in_design_implemented
        };

        var rendered = Mustache.render(template, params);
        $('#main_container').html(rendered);
    });
    
    
}

function viewChoiceOverlay2(){

    $.get('views/dialogs/dialogs_abs_rel_choice/mst_choice_view2.html', function (template) {
        var in_design_implemented = arrayContainsElement(USER_GROUP, 'design_implemented');
        var params = {
            design_implemented: in_design_implemented,
            platform_closed: !PLATFORM_OPEN && !in_design_implemented
        };

        var rendered = Mustache.render(template, params);
        $('#main_container').html(rendered);
    });
    
    
}

/**
 * Shows the stop survey dialog
 */
function viewStopSurvey() {
    BootstrapDialog.show({
        title: 'Teilnahme beenden',
        message: $('<div></div>').load('views/dialogs/dia_stop_survey.html'),
        closable: false,
        type: BootstrapDialog.TYPE_DANGER,
        buttons: [{
            label: 'Teilnahme beenden',
            action: function (dialogItself) {
                // TODO: Server-seitig den Benutzer löschen
                logout();
                dialogItself.close();
            }
        }, {
            label: 'Weitermachen',
            action: function (dialogItself) {
                dialogItself.close();
            }
        }]
    });
}

/**
 * Tutorial finished overlay
 */
function viewTutorialFinished() {
    printLog("view tutorial finished");
    BootstrapDialog.show({
        title: 'Testlauf geschafft!',
        message: $('<div></div>').load(getTutorialFinishText()),
        closable: false,
        buttons: [{
            label: 'Beginnen',
            action: function (dialogItself) {
                dialogItself.close();
                setTaggingEnvironment();
            }
        }]
    });
}

/**
 * Gets the tutorial finished text depending on the user group
 * @returns {string}
 */
function getTutorialFinishText() {
    if (arrayContainsElement(USER_GROUP, 'design')) {
        return 'views/dialogs/dia_tutorial_finished_design.html';
    }
    return 'views/dialogs/dia_tutorial_finished.html';
}

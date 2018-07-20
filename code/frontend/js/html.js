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
        if (person['name'] === USER_NAME || person['name'] === 'Du') {
            arrayOfData[i] = [person['points'], 'Du', '#0923f4', 1];
        }else if (person['name'] === USER_NAME || person['name'] === 'Du (Bsp.)'){
            arrayOfData[i] = [person['points'], 'Du (Bsp.)', '#0923f4', 1];
        }else {
            arrayOfData[i] = [person['points'], person['name'], '#607cae', 0];
        }
    }
    LEADERBOARD_ARRAY = arrayOfData;
    setLeaderboard(true);
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
    var index = 0;
    while (index !== -1) {
        index = -1;
        for (var i = 0; i < temp_lb.length; i++) {
            if (temp_lb[i][0] < 1100) {
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
        height: 200,
        width: 370
    });
}

/* ----------------------- The overlays ------------------------- */

/**
 * Welcome overlay
 */
function viewWelcomeOverlay() {
    setVisible($('#btn_quit_study'));
    var params = {};
    if (arrayContainsElement(USER_GROUP, 'design_implemented')) {
        params['design_implemented'] = true;
    } else if (arrayContainsElement(USER_GROUP, 'design')) {
        params['design'] = true;
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

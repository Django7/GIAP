

/**
 * Registering a new user.
 * Does not explicitly logging in the user (the API's answer triggers the event)
 */
function btn_oc_welcomeScreen_next() {
    setVisible($('#btn_quit_study'));
    if ($('#data_privacy').prop('checked') === false) {
        viewErrorOverlay('Bitte lese und bestätige die Hinweise zum Datenschutz.');
        return;
    }

    // Start with the tagging process (or questionnaires, or...)
    if (arrayContainsElement(USER_GROUP, 'design')) {
        startDemographicsSurveyDesign(function () {
            viewWelcomeOverlay();
        });                                     //hier die condition hinzufügen
    } else if (arrayContainsElement(USER_GROUP, 'design_implemented')) {
        startDemographicsBigFiveSurvey(function () {
            viewWelcomeOverlay();
        });
    } else if (arrayContainsOnOfThoseElements(USER_GROUP, [ 'td', 'id_test_12'])) {
        startDemographicsSurveyNormal(function () {
            viewWelcomeOverlay();
        });
    } else if (arrayContainsOnOfThoseElements(USER_GROUP, ['none','absolute','relative','choice'])) {
        viewWelcomeOverlay();
    } else {
        printErr("Could not find a starting survey for user in group(s) " + USER_GROUP);
    }
}

/**
 * Shows the impressum dialog
 */
function btn_oc_viewImpressum() {
    viewImpressum();
}

/**
 * Shows the data privacy dialog
 */
function btn_oc_viewDataPrivacy() {
    viewDataPrivacy();
}

/**
 * Shows the dialog to stop the survey
 */
function btn_oc_stopSurvey() {
    viewStopSurvey();
}


function btn_oc_viewChoice1(){
    viewChoiceOverlay1();
}

function btn_oc_viewChoice2(){
    viewChoiceOverlay2();
}

function btn_oc_absoluteLBchosen(){
    
    LEADERBOARD_CHOSEN = 1;
    send(json_post_choice_absolute());
    setCookie('leaderboard_chosen', '1');
    setCookie('tut_done', 'true');
    UDGE.onTutorialFinished();
    //setTaggingEnvironment();
}

function btn_oc_relativeLBchosen(){
    
    LEADERBOARD_CHOSEN = 2;
    send(json_post_choice_relative());
    setCookie('leaderboard_chosen', '2');
    setCookie('tut_done', 'true');
    UDGE.onTutorialFinished();
    //setTaggingEnvironment();
}
/**
 * Shows the tutorial finished dialog
 */
function btn_oc_viewTutorialFinished() {
    var tags = [];
    $('#myTags').each(function () {
        tags.push($(this).text())
    });
    tags = tags[0].split('×').join(',');
    if (tags.length === 0) {
        viewInfoOverlay('' +
            'Damit du den Ablauf besser üben kannst, möchten wir dich bitten, hier <strong>mindestens ein Stichwort</strong> einzugeben. ' +
            'Diese Einschränkung wird im regulären Ablauf wegfallen.');
    } else {
        postImageTags();
        UDGE.onTutorialFinished();

        if (arrayContainsElement(USER_GROUP, 'design_implemented')) {
            setCookie('tut_done_design_implemented', 'true');
        } else {
            setCookie('tut_done', 'true');
        }
        reinitGameElements();
    }
}




/**
 * Starts an extra round
 */
function btn_oc_end_extraRound() {
    if(getMainUserGroup() === null) {
        startAdditionalRound();
    }else{
        UDGE.onStartExtraRound();
    }
}

/**
 * Sends the tags to the server
 */
function btn_oc_postImageTags() {
    postImageTags();
}

/**
 * Downloads the quest as text file.
 * TODO: IE is a whiny bitch...
 */
function btn_oc_download_quest() {
    var toDownload = {
        user: USER_NAME,
        name: QUEST_CURRENT_TO_SEND.name,
        result: QUEST_CURRENT_TO_SEND.result
    };
    download_FF_CH(QUEST_CURRENT_TO_SEND.name, JSON.stringify(toDownload));
}

/**
 * Initiate (and later render) the end questionnaires.
 */
function btn_oc_end_questionnaire() {
    if (arrayContainsElement(USER_GROUP, 'design_implemented')) {
        startEndDesignSurvey(function () { 
            setEnd();
        });
    } else if (arrayContainsElement(USER_GROUP, 'design')) {
        printErr('Tried to start survey when in design task. This should not happen!');
    
    
    } else if(arrayContainsElement(USER_GROUP, 'absolute')){
            startIMI(function () {
                startTaskPerception(function () {
                    startLBS_ABS(function(){
                        startChoice_ABS(function () {
                            startDemographic_Gami(function () {
                                startBasics_Gami(function () {
                                    startFinal_ABS(function () {
                                        startDebrief_ABS(function (){
                                        setEnd();
                                     });
                                });
                            });
                        });
                    });
                });
            });
        });
    } else if(arrayContainsElement(USER_GROUP, 'relative')){
        startIMI(function () {
            startTaskPerception(function () {
                startLBS_REL(function(){
                    startChoice_REL(function () {
                        startDemographic_Gami(function () {
                            startBasics_Gami(function () {
                                startFinal_REL(function () {
                                    startDebrief_REL(function (){
                                        setEnd();
                                    });
                            });
                        });
                    });
                });
            });
        });
    });
    } else if(arrayContainsElement(USER_GROUP, 'choice')){
        send(json_get_chosen_leaderboard_message());
    } else {
        startIMIControl(function () {
            startTaskPerception_Control(function () {
                startChoice_Control(function () {
                    startDemographic_Control(function () {
                        startBasics_Control(function () {
                            startFinal_Control(function () {
                                startDebrief_Control(function (){
                                    setEnd();
                                });
                            });
                    });
                });
            });
        });
    });
}
    
    /*{
        startIMI(function () {
            startTaskPerception(function () {
                setEnd();
        });
    });
}*/
}

/**
 * Gets the leaderboard username from the respective text field
 */
function btn_oc_setUserNameForLeaderboard() {
    var $div_it_lb_username = $('#div_it_lb_username');
    var name = $div_it_lb_username.val();
    printLog("Set user name for leaderboard: " + name);

    var oldName = getCookie('lb_username');
    if (oldName !== name) {
        if (Curse_Words().is_curse_word(name)) {
            $div_it_lb_username.val('');

            viewGenericOverlay(
                'Schimpfwort erkannt',
                'Der Schimpfwortfilter hat "' + name + '" als Schimpfwort eingestuft. Bitte nutze einen anderen Spielernamen.',
                BootstrapDialog.TYPE_DANGER,
                '');
        } else {
            setCookie('lb_username', name);

            if (arrayContainsElement(USER_GROUP, 'design_implemented')) {
                UDGE.onChangeLeaderBoardName();
            } else {
                adaptLeaderboard();
            }
        }
    }
}

/**
 * implements the file upload function for user 796 (id_match_797)
 */
function uploadExtraPicture(){
    $('#fileUpload_797').click();
    $('#fileUpload_797').prop('disabled', true);
    setVisible($('#filesUploaded'));

}
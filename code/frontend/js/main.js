/**
 * Initializes the webapp
 * 1. Loads and sets the welcome text
 * 2. Establishes connection to the API
 * 3. Starts heartbeating
 */
function init() {
    initStaticEnvironment();
    establishConnection();
    heartbeating();
    initSurvey();
    initMinimalWindowSize();
}

/**
 * Sends a heartbeat every 100 seconds to the API.
 * This prevents the connection in getting closed.
 */
function heartbeating() {
    setInterval(function () {
        printLog("Sending heartbeat.");
        sendHeartbeat();
    }, 100000);
}

/**
 * Sets the survey style to our bootstrap theme
 */
function initSurvey() {
    Survey.Survey.cssType = "bootstrap";
}

/**
 * Flips the image immediately
 * @param inTutorial are we currently in tutorial (--> trigger other things?)
 */
function flipImage(inTutorial) {
    printLog('Flipping image triggered');
    $('#div_it_img_card').flip(true);

    setTaggingField();

    // Trigger events after flipping the image
    UDGE.afterFlipImage(inTutorial);
}

/**
 * Flips the image in 'sec' seconds
 * @param sec Time until the image should flip
 */
function flipIn(sec) {
    $('#div_it_flip_sec').html(sec);
    if (sec === 0) {
        flipImage(false);
    } else {
        setTimeout(function () {
            flipIn(sec - 1);
        }, 1000);
    }
}

/**
 * Sends the Tags to the server
 */
function postImageTags() {
    printLog('Next image clicked. Get the tags and send them to the server.');
    $('#next_img').prop('disabled', true);
    printLog('Sending tags to server');

    // The trigger for the after post
    UDGE.afterPostImage();

    var tags = $("#myTags").tagit("assignedTags").join(',');
    // addUserTagsToImageList(CURRENT_IMAGE, tags);
    sendPost(tags);
}

/**
 * Loads the tagging environment.
 * This method calls setGenericTaggingEnvironment with pre-defined functions and parameters
 */
function setTaggingEnvironment() {
    setVisible($('#btn_quit_study'));
    var mc = $('#main_container');

    var fun_array = [function () {
        getImage();
        setImageFlipper();
    }];
    var mst_params = {};

    // Set the tagging environment with pre-defined functions
    setGenericTaggingEnvironment(mc, fun_array, mst_params, false);
}

/**
 * Loads the final tagging environment.
 * This function loads the plain tagging environment without requesting a new image and setting the flipper
 */
function setFinalTaggingEnvironment() {
    var mc = $('#main_container');

    var fun_array = [function () {
        setEnd();
    }];
    var mst_params = {end_screen: true};

    // Set the tagging environment with pre-defined functions
    setGenericTaggingEnvironment(mc, fun_array, mst_params, true);
}

/**
 * This method sets the tagging environment and allows to use a pre defined container and pre filled function arrays with parameters.
 *
 * This is the place where most of the magic happens:
 * - Add your new elements here
 * - Change current elements here, e.g., if you need other information from the server
 *
 * The function is split into 2 exclusive parts.
 * As soon as the user is in the design group, no other group takes effect. This implies that it is absolutely
 * necessary to remove the user from the design group when assigning his/her elements!
 *
 * Also, if the user is in group 'none' and, for example, 'td', 'none' gets ignored.
 * --> 'none' is an exclusive group, but this must get managed properly by the database manager.
 *
 * @param container The container to render the environment in.
 * @param fun_array The initial function array to use (i.e. for getting images or so).
 * @param mst_params The initial mustache parameters.
 */
function setGenericTaggingEnvironment(container, fun_array, mst_params, frame_only) {
    /* Check if the user is in the design condition.
    If yes, show only this, no other element, and especially no tagging environment.*/
    if (arrayContainsElement(USER_GROUP, "design")) {
        if (QUESTS['design']) {
            setEnd();
        } else {
            startDesignTaskSurvey(function () {
                setEnd();
            });
        }
        return;
    } else { /* Otherwise, add the game elements to the tagging environment */
        if (getMainUserGroup() === null) {
            if (arrayContainsElement(USER_GROUP, "td")) {
                mst_params['stats'] = true;
                mst_params['points'] = true;
                mst_params['leaderboard'] = true;
                fun_array = fun_array.concat([function () {
                    getPoints();
                    getLeaderboard();
                }]);
            }
        } else {
            UDGE.setTaggingEnvironment(mst_params, fun_array, frame_only);
        }
    }
    renderAndSetMustacheElement(container, 'views/mst_tagging_environment.html', mst_params, fun_array, false);
}

/**
 * Loads the tagging tutorial
 * Distinguishes between self designed concepts and the top down variants
 */
function setTaggingTutorial() {
    var mc = $('#main_container');

    var fun_array = [function () {
        setExampleImage();
        setImageFlipper();
        disableTagFieldAndNextButton();
        // setTaggingField();
    }];
    var mst_params = {tutorial: true};

    // TODO: Merge tutorials
    // TODO: Remove else-ifs and append them intelligently
    if (arrayContainsElement(USER_GROUP, "design_implemented")) {
        mst_params['tutorial_implemented_design'] = true;
        setVisibleTutorialViews(mst_params);
        fun_array = fun_array.concat([function () {
            startSelfDesignedTutorial();
        }]);
    } else if (arrayContainsElement(USER_GROUP, "design")) {
        mst_params['tutorial_normal'] = true;
        fun_array = fun_array.concat([function () {
            startBasicTutorial();
        }]);
    } else if (arrayContainsElement(USER_GROUP, "none")) {
        mst_params['tutorial_normal'] = true;
        fun_array = fun_array.concat([function () {
            startBasicTutorial();
        }]);
    } else if (arrayContainsElement(USER_GROUP, "td")) {
        mst_params['tutorial_normal'] = true;
        mst_params['stats'] = true;
        mst_params['points'] = true;
        mst_params['leaderboard'] = true;
        fun_array = fun_array.concat([function () {
            setExamplePointsAndLB();
            startPAndLTutorial()
        }]);
    }else if(arrayContainsElement(USER_GROUP, "id_test_12")) {
        mst_params['tutorial_normal'] = true;
        setVisibleTutorialViews(mst_params);
        fun_array = fun_array.concat([function () {
            startIDTest12Tutorial();
        }]);
    } else {
        printErr("User does not fit in a group!");
    }
    renderAndSetMustacheElement(mc, 'views/mst_tagging_environment.html', mst_params, fun_array, false);
}

/**
 * Adds the needed visible tutorial views
 * @param mst_params The tutorials to need
 */
function setVisibleTutorialViews(mst_params) {
    for (var i = 0; i < USER_GROUP.length; i++) {
        mst_params[USER_GROUP[i]] = true;
    }
    mst_params['stats'] = true;
}

/**
 * Sets the end-screen, depending on the users group:
 * 1. Check if the tagging environment is properly set:
 *  YES: Proceed with the end screen
 *  NO: Call the tagging environment leading to this screen again
 * 2. Sets the final screen with congratulation, extra rounds, etc.
 *
 * CAUTION: This could lead to an infinite loop if not used properly.
 */
function setEnd() {
    var $btn_quit_study = $('#btn_quit_study');
    var $main_controller = $('#main_container');

    setVisible($btn_quit_study);
    // The basic view (non-design + additional round)
    var fun_array = [
        function () {
            $('#div_it_lb_username').val(getCookie('lb_username'));
        }
    ];

    var mst_params = {
        normal: true,
        show_quest_btn: true,
        show_extra_btn: true,
        g_add_round: true,
        design_implemented : arrayContainsElement(USER_GROUP, 'design_implemented'),
        generic_implementation : arrayContainsElement(USER_GROUP, 'generic_implementation')
    };

    // Final questionnaire already submitted?
    if (QUESTS['end_normal'] || QUESTS['end_design']) {
        mst_params['show_quest_btn'] = false;
        mst_params['show_extra_btn'] = false;
        mst_params['with_frame'] = true;
        // Also set the exit button to invisible
        setInvisible($btn_quit_study);
    } else {
        var endDiv = $('#div_it_img_card');

        if (arrayContainsElement(USER_GROUP, 'design')) {
            endDiv = $main_controller;
        } else if (endDiv.length === 0) {
            setFinalTaggingEnvironment();
            return;
        }

        // extra round already done?
        var exRounds = extraRoundPerformed();
        if (exRounds > 0) {
            mst_params['show_extra_performed'] = true;
            mst_params['extra_performed'] = exRounds;
            if (exRounds > 1) {
                mst_params['extra_more_than_one'] = true;
            }
        }

        // If no more images are left
        if (NO_MORE_IMAGES) {
            mst_params['normal'] = false;
            mst_params['no_more_images'] = true;
            mst_params['show_extra_btn'] = false;
        }

        if (arrayContainsElement(USER_GROUP, 'design')) {
            mst_params['normal'] = false;
            mst_params['design'] = true;
            mst_params['with_frame'] = true;
            mst_params['g_add_round'] = false;
            setInvisible($btn_quit_study);
        }

        if (arrayContainsElement(USER_GROUP, 'td')) {
            mst_params['leaderboard'] = true;
        }

        UDGE.setEnd(mst_params, fun_array);
    }

    var divToShow = mst_params['show_quest_btn'] || arrayContainsElement(USER_GROUP, 'design') ? endDiv : $main_controller;
    renderAndSetMustacheElement(divToShow, 'views/mst_end.html', mst_params, fun_array, false);
}

/**
 * Starts the Basic tutorial
 */
function startBasicTutorial() {
    var next_img_btn = $('#next_img');
    next_img_btn.prop('onclick', null).off('click');

    // Building the tutorial dialog
    var title = 'Stimmung im Bild';
    var message = $('<div></div>').load('views/dialogs/dia_tutorial_image_front.html');
    var btn_name = 'Weiter';
    var callafter = function () {
        flipIn(5);
        setTimeout(function () {
            viewRightTutorialOverlay(
                'Stichworte erstellen',
                $('<div></div>').load('views/dialogs/dia_tutorial_image_back.html'),
                'Weiter',
                function () {
                    enableTagFieldAndButton();
                    next_img_btn.click(nextTutorialImage);
                },
                true);
        }, 5000);
    };
    var close = true;
    viewRightTutorialOverlay(title, message, btn_name, callafter, close);
}

/**
 * Decides whether a next image should get shown or the tutorial finish should get done
 *
 */
function nextTutorialImage() {
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
        if (TUTORIAL_PIC >= TUTORIAL_PICS.length) {
            btn_oc_viewTutorialFinished();
        } else {
            // Post tutorial images
            postImageTags();
            // Wait some time until the next image appears (to simulate some "load")
            setTimeout(function () {
                // Flip the image, set a new image, clear the tag field and start the counter
                $('#div_it_img_card').flip(false);

                // Remove all tags without triggering tagit's "removeTag" trigger trigger.
                // TODO: Make nicer, this is pretty brutal!
                $('.tagit-choice').remove();

                setExampleImage();
                $('#next_img').prop('disabled', false);

                // Change the message if it's the last image
                if (TUTORIAL_PIC >= TUTORIAL_PICS.length) {
                    setInvisible($('#tut_next_img_label'));
                    setVisible($('#tut_next_img_end_label'));
                }

                flipIn(5);
            }, 500);
        }
    }
}

/**
 * Start the self defined tutorial
 */
function startSelfDesignedTutorial() {
    printLog("Start design implemented tutorial");

    var next_img_btn = $('#next_img');
    next_img_btn.prop('onclick', null).off('click');
    next_img_btn.prop('disabled', true);

    // The statistic view (right part of the screen)
    var div_it_stats = $('#div_it_stats');
    setInvisible(div_it_stats);

    UDGE.startTutorial();

}

/**
 * Starts the Points and Leaderboard tutorial
 */
function startPAndLTutorial() {
    var next_img_btn = $('#next_img');
    next_img_btn.prop('onclick', null).off('click');
    next_img_btn.prop('disabled', true);

    // The statistic view (right part of the screen)
    var div_it_stats = $('#div_it_stats');
    setInvisible(div_it_stats);

    viewRightTutorialOverlay(
        'Stimmung im Bild',
        $('<div></div>').load('views/dialogs/dia_tutorial_image_front.html'),
        'Weiter',
        function () {
            flipIn(5);
            setTimeout(function () {
                viewRightTutorialOverlay(
                    'Stichworte erstellen',
                    $('<div></div>').load('views/dialogs/dia_tutorial_image_back.html'),
                    'Weiter',
                    function () {
                        setVisible(div_it_stats);
                        viewLeftTutorialOverlay(
                            'Punkte und Bestenliste',
                            $('<div></div>').load('views/dialogs/dia_tutorial_pts_and_lb.html'),
                            'Weiter',
                            function () {
                                enableTagFieldAndButton();
                                next_img_btn.click(nextTutorialImage);
                            },
                            true
                        );
                    },
                    true);
            }, 5000);
        },
        true);
}

/**
 * Starts the Aquarium tutorial
 * This is an incredible cheeky adaption of the aquarium's tutorial. Shame on you!
 */
function startAquariumTutorial() {
    var next_img_btn = $('#next_img');
    next_img_btn.prop('onclick', null).off('click');

    // Create an example view of the right view
    ID_AQUARIUM_339 = ID_Aquarium_339();
    ID_AQUARIUM_339.init('div_it_id_aquarium_339');

    // The statistic view (right part of the screen)
    var div_it_stats = $('#div_it_stats');
    setInvisible(div_it_stats);

    viewRightTutorialOverlay(
        'Stimmung im Bild',
        $('<div></div>').load('views/dialogs/dia_tutorial_image_front.html'),
        'Weiter',
        function () {
            flipIn(5);
            setTimeout(function () {
                viewRightTutorialOverlay(
                    'Stichworte erstellen',
                    $('<div></div>').load('views/dialogs/dia_tutorial_image_back.html'),
                    'Weiter',
                    function () {
                        setVisible(div_it_stats);
                        ID_AQUARIUM_339.setTutorialView();
                        viewLeftTutorialOverlay(
                            'Aquarium',
                            $('<div></div>').load('views/dialogs/dia_tutorial_ge_id_aquarium_339.html'),
                            'Weiter',
                            function () {
                                enableTagFieldAndButton();
                                next_img_btn.click(nextTutorialImage);
                            },
                            true
                        );
                    },
                    true);
            }, 5000);
        },
        true);
}

/**
 * Starts the additional Round
 */
function startAdditionalRound() {
    var ex_img_ctr = getCookie("ex_img_ctr");
    if (ex_img_ctr === "") {
        ex_img_ctr = "0";
        setCookie("ex_img_ctr", "0");
    }

    ADD_TASKS = true;
    ADD_IMGS = ADD_IMGS_MAX - Number(ex_img_ctr);
    setTaggingEnvironment();
}

/**
 * Logging out an (logged in) user
 */
function logout() {
    send(json_get_logout_message(""));
    initStaticEnvironment();
    deleteAllCookies();
    location.href = window.location.href.split('?')[0];
}

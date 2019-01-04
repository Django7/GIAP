/*
    ##################### Game concept implementations ##############
 */
// User designed game elements
var UDGE = {
    custom_design: false,
    main_user_group: "",
    COMMAND_HANDLER: function () {
        printErr("UDGE command handler used but not initialized")
    },
    startTutorial: function () {
        printErr("UDGE used but not initialized")
    },
    setTaggingEnvironment: function (mst_params, fun_array, frame_only) {
        printErr("UDGE used but not initialized")
    },
    setEnd: function (mst_params, fun_array) {
        printErr("UDGE used but not initialized")
    },
    afterGetImage: function () {
        printErr("UDGE used but not initialized")
    },
    afterPostImage: function () {
        printErr("UDGE used but not initialized")
    },
    afterFlipImage: function (inTutorial) {
        printErr("UDGE used but not initialized")
    },
    afterTagAdded: function (event, ui) {
        printErr("UDGE used but not initialized")
    },
    afterTagRemoved: function (event, ui) {
        printErr("UDGE used but not initialized")
    },
    onInterpretCommand: function (content) {
        printErr("UDGE used but not initialized")
    },
    onChangeLeaderBoardName: function () {
        printErr("UDGE used but not initialized");
    },
    onTutorialFinished: function () {
        printErr("UDGE used but not initialized");
    },
    onStartExtraRound: function(){
        printErr("UDGE used but not initialized");
    }
};

/**
 * Initializes the game elements or better say, the game concepts
 * @param main_user_group_id The main user group
 */
function init_user_designed_game_elements(main_user_group_id) {
    UDGE.custom_design = true;
    UDGE.main_user_group = main_user_group_id;

    setUDGETutorial(main_user_group_id);
    setUDGETaggingEnvironment(main_user_group_id);
    setUDGEEnd(main_user_group_id);
    setUDGEAfterGetImage(main_user_group_id);
    setUDGEAfterPostImage(main_user_group_id);
    setUDGEAfterFlipImage(main_user_group_id);
    setUDGEAfterTagAdded(main_user_group_id);
    setUDGEAfterTagRemoved(main_user_group_id);
    setUDGEOnInterpretCommand(main_user_group_id);
    setUDGEOnChangeLeaderBoardName(main_user_group_id);
    setUDGEOnTutorialFinished(main_user_group_id);
    setUDGEOnStartExtraRound(main_user_group_id);
}

/**
 * Sets the tutorial of the respective designs
 * @param main_user_group_id
 */
function setUDGETutorial(main_user_group_id) {
    switch (main_user_group_id) {

        case "id_points_151": {
            UDGE.startTutorial = function () {
                printLog("start id points 151 tutorial");
                startIDPoints151Tutorial();
            };
            break;
        }
        case "id_points_review_210": {
            UDGE.startTutorial = function () {
                printLog("start id points review 210 tutorial");
                startIDPointsReview210Tutorial();
            };
            break;
        }
        case "id_points_review_125": {
            UDGE.startTutorial = function () {
                printLog("start id points review 125 tutorial");
                startIDPointsReview125Tutorial();
            };
            break;
        }
        case "id_beat_friend_51": {
            UDGE.startTutorial = function () {
                printLog("start id points review 51 tutorial");
                startIDBeatFriend51Tutorial();
            };
            break;
        }
        case "id_points_similar_61": {
            UDGE.startTutorial = function () {
                printLog("start id points similar 61 tutorial");
                startIDPointsSimilar61Tutorial();
            };
            break;
        }
        case "id_aquarium_339": {
            UDGE.startTutorial = function () {
                printLog("start id aquarium 339 tutorial");
                startIDAquarium339Tutorial();
            };
            break;
        }
        case "id_teams_simple_104": {
            UDGE.startTutorial = function () {
                printLog("start id teams simple 104 tutorial");
                startIDTeamsSimple104Tutorial();
            };
            break;
        }
        case "id_teams_points_369": {
            UDGE.startTutorial = function () {
                printLog("start id teams simple 369 tutorial");
                startIDTeamsPoints369Tutorial();
            };
            break;
        }
        case "id_single_teams_407": {
            UDGE.startTutorial = function () {
                printLog("start id teams simple 407 tutorial");
                startIDSingleTeams407Tutorial();
            };
            break;
        }
        case "id_levels_498": {
            UDGE.startTutorial = function () {
                printLog("start id levels 498 tutorial");
                startIDLevels498Tutorial();
            };
            break;
        }
        case "id_points_96": {
            UDGE.startTutorial = function () {
                printLog("start id points 96 tutorial");
                startIDPoints96Tutorial();
            };
            break;
        }
        case "id_complex_115": {
            UDGE.startTutorial = function () {
                printLog("start id complex 115 tutorial");
                startIDComplex115Tutorial();
            };
            break;
        }
        case "id_points_review_438": {
            UDGE.startTutorial = function () {
                printLog("start id points review 438 tutorial");
                startIDPointsReview438Tutorial();
            };
            break;
        }
        case "id_test_11": {
            UDGE.startTutorial = function () {
                printLog("start id test 11 tutorial");
                startIDTest11Tutorial();
            };
            break;
        }
        case "id_test_12": {
            UDGE.startTutorial = function () {
                printLog("start id test 12 tutorial");
                startIDTest12Tutorial();
            };
            break;
        }
        default: {
            UDGE.startTutorial = function () {
                startBasicTutorial();
            };
        }
    }
}

/**
 * Sets the function for the tagging environment
 * @param main_user_group_id
 */
function setUDGETaggingEnvironment(main_user_group_id) {
    switch (main_user_group_id) {
        case 'id_points_151': {
            UDGE.setTaggingEnvironment = function (mst_params, fun_array, frame_only) {
                mst_params['stats'] = true;
                mst_params['id_points_151'] = true;
                fun_array.push(function () {
                    if (!frame_only) {
                        ID_POINTS_151.setView(0);
                    }
                    getMyLastImageTagCount();
                })
            };
            break;
        }
        case 'id_points_review_210': {
            UDGE.setTaggingEnvironment = function (mst_params, fun_array, frame_only) {
                mst_params['stats'] = true;
                mst_params['id_points_review_210'] = true;
                mst_params['confirm'] = "Bestätigen";
                fun_array.push(function () {
                    if (!frame_only) {
                        ID_POINTS_REVIEW_210.setView(0);
                    }
                })
            };
            break;
        }
        case 'id_points_review_125': {
            UDGE.setTaggingEnvironment = function (mst_params, fun_array, frame_only) {
                mst_params['stats'] = true;
                mst_params['id_points_review_125'] = true;
                mst_params['confirm'] = "Bestätigen";
                fun_array.push(function () {
                    if (!frame_only) {
                        ID_POINTS_REVIEW_125.setView(0);
                    }
                })
            };
            break;
        }
        case 'id_beat_friend_51': {
            UDGE.setTaggingEnvironment = function (mst_params, fun_array, frame_only) {
                mst_params['stats'] = true;
                mst_params['id_beat_friend_51'] = true;
                mst_params['confirm'] = "Bestätigen";
                fun_array.push(function () {
                    if (!frame_only) {
                        ID_BEAT_FRIEND_51.setView(0);
                    }
                })
            };
            break;
        }
        case 'id_points_review_438': {
            UDGE.setTaggingEnvironment = function (mst_params, fun_array, frame_only) {
                mst_params['stats'] = true;
                mst_params['id_points_review_438'] = true;
                mst_params['confirm'] = "Bestätigen";
                fun_array.push(function () {
                    if (!frame_only) {
                        ID_POINTS_REVIEW_438.setView(0);
                    }
                })
            };
            break;
        }
        case 'id_points_similar_61': {
            UDGE.setTaggingEnvironment = function (mst_params, fun_array, frame_only) {
                mst_params['stats'] = true;
                mst_params['id_points_similar_61'] = true;
                mst_params['confirm'] = "Bestätigen";
                fun_array.push(function () {
                    if (!frame_only) {
                        ID_POINTS_SIMILAR_61.setView();
                    }
                })
            };
            break;
        }
        case 'id_aquarium_339': {
            UDGE.setTaggingEnvironment = function (mst_params, fun_array, frame_only) {
                mst_params['stats'] = true;
                mst_params['id_aquarium_339'] = true;
                fun_array.push(function () {
                    if (!frame_only) {
                        ID_AQUARIUM_339.setView(0);
                    }
                    getMyTagCount();
                })
            };
            break;
        }
        case 'id_teams_simple_104': {
            UDGE.setTaggingEnvironment = function (mst_params, fun_array, frame_only) {
                mst_params['stats'] = true;
                mst_params['id_teams_simple_104'] = true;
                mst_params['confirm'] = "Bestätigen";
                fun_array.push(function () {
                    if (!frame_only) {
                        ID_TEAMS_SIMPLE_104.setView();
                    }
                })
            };
            break;
        }
        case 'id_teams_points_369': {
            UDGE.setTaggingEnvironment = function (mst_params, fun_array, frame_only) {
                mst_params['stats'] = true;
                mst_params['id_teams_points_369'] = true;
                fun_array.push(function () {
                    if (!frame_only) {
                        ID_TEAMS_POINTS_369.setView();
                    }
                })
            };
            break;
        }
        case 'id_single_teams_407': {
            UDGE.setTaggingEnvironment = function (mst_params, fun_array, frame_only) {
                mst_params['stats'] = true;
                mst_params['id_single_teams_407'] = true;
                mst_params['surrender'] = true;
                fun_array.push(function () {
                    if (!frame_only) {
                        ID_SINGLE_TEAMS_407.setView();
                    }
                })
            };
            break;
        }
        case 'id_levels_498': {
            UDGE.setTaggingEnvironment = function (mst_params, fun_array, frame_only) {
                mst_params['stats'] = true;
                mst_params['id_levels_498'] = true;
                mst_params['confirm'] = "Bestätigen";
                fun_array.push(function () {
                    if (!frame_only) {
                        ID_LEVELS_498.setView();
                    }
                })
            };
            break;
        }
        case 'id_points_96': {
            UDGE.setTaggingEnvironment = function (mst_params, fun_array, frame_only) {
                mst_params['stats'] = true;
                mst_params['id_points_96'] = true;
                fun_array.push(function () {
                    if (!frame_only) {
                        ID_POINTS_96.setView(frame_only);
                    }
                })
            };
            break;
        }
        case 'id_complex_115': {
            UDGE.setTaggingEnvironment = function (mst_params, fun_array, frame_only) {
                mst_params['stats'] = true;
                mst_params['id_complex_115'] = true;
                fun_array.push(function () {
                    if (!frame_only) {
                        ID_COMPLEX_115.setView(frame_only);
                    }
                })
            };
            break;
        }
        case 'id_test_11': {
            UDGE.setTaggingEnvironment = function (mst_params, fun_array, frame_only) {
                mst_params['stats'] = true;
                mst_params['id_test_11'] = true;
                fun_array.push(function () {
                    if (!frame_only) {
                        ID_TEST_11.setView();
                    }
                })
            };
            break;
        }
        case 'id_test_12': {
            UDGE.setTaggingEnvironment = function (mst_params, fun_array, frame_only) {
                mst_params['stats'] = true;
                mst_params['id_test_12'] = true;
                fun_array.push(function () {
                    if (!frame_only) {
                        ID_TEST_12.setView();
                    }
                })
            };
            break;
        }
        default: {
        }
    }
}

/**
 * Sets the UGDE end
 */
function setUDGEEnd(main_user_group_id) {
    switch (main_user_group_id) {
        case "id_prizes_59": {
            UDGE.setEnd = function (mst_params, fun_array) {
                mst_params['leaderboard'] = true;
                ID_PRIZES_59.setEndView();
            };
            break;
        }
        case "id_points_151": {
            UDGE.setEnd = function (mst_params, fun_array) {
                // username in the beginning
                ID_POINTS_151.setEndView();
            };
            break;
        }
        case "id_points_review_210": {
            UDGE.setEnd = function (mst_params, fun_array) {
                ID_POINTS_REVIEW_210.setEndView();
            };
            break;
        }
        case "id_points_review_125": {
            UDGE.setEnd = function (mst_params, fun_array) {
                ID_POINTS_REVIEW_125.setEndView();
            };
            break;
        }
        case "id_beat_friend_51": {
            UDGE.setEnd = function (mst_params, fun_array) {
                mst_params['leaderboard'] = true;
                ID_BEAT_FRIEND_51.setEndView();
            };
            break;
        }
        case "id_points_review_438": {
            UDGE.setEnd = function (mst_params, fun_array) {
                ID_POINTS_REVIEW_438.setEndView();
            };
            break;
        }
        case "id_points_similar_61": {
            UDGE.setEnd = function (mst_params, fun_array) {
                mst_params['leaderboard'] = true;
                ID_POINTS_SIMILAR_61.setEndView();
            };
            break;
        }
        case "id_aquarium_339": {
            UDGE.setEnd = function (mst_params, fun_array) {
                ID_AQUARIUM_339.setEndView();
            };
            break;
        }
        case "id_teams_simple_104": {
            UDGE.setEnd = function (mst_params, fun_array) {
                ID_TEAMS_SIMPLE_104.setEndView();
            };
            break;
        }
        case "id_teams_points_369": {
            UDGE.setEnd = function (mst_params, fun_array) {
                ID_TEAMS_POINTS_369.setEndView();
            };
            break;
        }
        case "id_single_teams_407": {
            UDGE.setEnd = function (mst_params, fun_array) {
                ID_SINGLE_TEAMS_407.setEndView();
            };
            break;
        }
        case "id_levels_498": {
            UDGE.setEnd = function (mst_params, fun_array) {
                mst_params['leaderboard'] = true;
                ID_LEVELS_498.setEndView();
            };
            break;
        }
        case "id_points_96": {
            UDGE.setEnd = function (mst_params, fun_array) {
                mst_params['leaderboard'] = true;
                ID_POINTS_96.setEndView();
            };
            break;
        }
        case "id_complex_115": {
            UDGE.setEnd = function (mst_params, fun_array) {
                mst_params['leaderboard'] = true;
                ID_COMPLEX_115.setEndView();
            };
            break;
        }
        case "id_test_11": {
            UDGE.setEnd = function (mst_params, fun_array) {
                mst_params['leaderboard'] = true;
                ID_TEST_11.setPoints(getCookie('11_points'));
                ID_TEST_11.setEndView();
            };
            break;
        }
        case "id_test_12": {
            UDGE.setEnd = function (mst_params, fun_array) {
                ID_TEST_12.setEndView();
            };
            break;
        }
        default: {
            UDGE.setEnd = function (mst_params, fun_array) {
            };
        }
    }
}

/**
 * Defines what happens when receiving an image
 */
function setUDGEAfterGetImage(main_user_group_id) {
    switch (main_user_group_id) {
        case "id_points_review_210": {
            UDGE.afterGetImage = function () {
                get20MostUsedTagsForCurrentImage();
            };
            break;
        }
        case "id_points_review_125": {
            UDGE.afterGetImage = function () {
                get20MostUsedTagsForCurrentImage();
            };
            break;
        }
        case "id_beat_friend_51": {
            UDGE.afterGetImage = function () {
                get40MostUsedTagsForCurrentImage();
                getDistinctMoodsForThisImage();
            };
            break;
        }
        case "id_points_review_438": {
            UDGE.afterGetImage = function () {
                get25MostUsedTagsForCurrentImage();
            };
            break;
        }
        case "id_points_similar_61": {
            UDGE.afterGetImage = function () {
                get10MostUsedTagsForCurrentImage();
            };
            break;
        }
        case "id_teams_simple_104": {
            UDGE.afterGetImage = function () {
                get25MostUsedTagsForCurrentImage();
            };
            break;
        }
        case "id_teams_points_369": {
            UDGE.afterGetImage = function () {
                get25MostUsedTagsForCurrentImage();
            };
            break;
        }
        case "id_single_teams_407": {
            UDGE.afterGetImage = function () {
                get25MostUsedTagsForCurrentImage();
            };
            break;
        }
        case "id_levels_498": {
            UDGE.afterGetImage = function () {
                get25MostUsedTagsForCurrentImage();
            };
            break;
        }
        case "id_complex_115": {
            UDGE.afterGetImage = function () {
                get15MostUsedTagsForCurrentImage();
            };
            break;
        }
        case "id_test_11": {
            UDGE.afterGetImage = function () {
                get40MostUsedTagsForCurrentImage();
                getDistinctMoodsForThisImage();
            };
            break;
        }
        case "id_test_12": {
            UDGE.afterGetImage = function() {
                //get10MostUsedTagsForCurrentImage();
                ID_TEST_12.setTags([{tag: 'unruhig'}, {tag: 'verlassen'}, {tag: 'düster'}, {tag: 'glücklich'}, {tag: 'ruhig'},
                    {tag: 'verträumt'}, {tag: 'dunkel'}, {tag: 'trist'}, {tag: 'warm'}]);
            };
            break;
        }
        default: {
            UDGE.afterGetImage = function () {
            };
        }
    }
}

/**
 * Defines what happens when posting an image to the server
 */
function setUDGEAfterPostImage(main_user_group_id) {
    switch (main_user_group_id) {
        case 'id_points_review_210': {
            UDGE.afterPostImage = function () {
                ID_POINTS_REVIEW_210.storePoints();
            };
            break;
        }
        case 'id_points_review_125': {
            UDGE.afterPostImage = function () {
                ID_POINTS_REVIEW_125.storePoints();
            };
            break;
        }
        case 'id_points_151': {
            UDGE.afterPostImage = function () {
                deleteCookie('151_pts_img');
            };
            break;
        }
        case 'id_beat_friend_51': {
            UDGE.afterPostImage = function () {
                ID_BEAT_FRIEND_51.storePoints();
            };
            break;
        }
        case 'id_points_review_438': {
            UDGE.afterPostImage = function () {
                ID_POINTS_REVIEW_438.storePoints();
            };
            break;
        }
        case 'id_points_similar_61': {
            UDGE.afterPostImage = function () {
                ID_POINTS_SIMILAR_61.storePoints();
            };
            break;
        }
        case 'id_points_96': {
            UDGE.afterPostImage = function () {
                ID_POINTS_96.storePoints();
            };
            break;
        }
        case 'id_complex_115': {
            UDGE.afterPostImage = function () {
                ID_COMPLEX_115.storePoints();
            };
            break;
        }
        case 'id_single_teams_407': {
            UDGE.afterPostImage = function () {
                ID_SINGLE_TEAMS_407.storeStats();
            };
            break;
        }
        case 'id_levels_498': {
            UDGE.afterPostImage = function () {
                ID_LEVELS_498.storeStats();
            };
            break;
        }
        case 'id_teams_points_369': {
            UDGE.afterPostImage = function () {
                ID_TEAMS_POINTS_369.storeStats();
            };
            break;
        }
        case 'id_test_11': {
            UDGE.afterPostImage = function () {
                ID_TEST_11.storePoints();
                ID_TEST_11.generateNewPointsDistribution(1);
            };
            break;
        }
        case 'id_test_12': {
            UDGE.afterPostImage = function() {
                ID_TEST_12.storeStats();
            };
            break;
        }
        default: {
            UDGE.afterPostImage = function () {
            };
        }
    }
}

/**
 * Defines what happen when an image gets flipped
 * @param main_user_group_id
 */
function setUDGEAfterFlipImage(main_user_group_id) {
    switch (main_user_group_id) {
        case 'id_teams_simple_104': {
            UDGE.afterFlipImage = function (inTutorial) {
                ID_TEAMS_SIMPLE_104.startTimer();
            };
            break;
        }
        case 'id_teams_points_369': {
            UDGE.afterFlipImage = function (inTutorial) {
            };
            break;
        }
        case 'id_single_teams_407': {
            UDGE.afterFlipImage = function (inTutorial) {
                ID_SINGLE_TEAMS_407.startOpponentTimer();
            };
            break;
        }
        case 'id_points_review_125': {
            UDGE.afterFlipImage = function (inTutorial) {
                ID_POINTS_REVIEW_125.startTimer();
            };
            break;
        }
        case 'id_beat_friend_51': {
            UDGE.afterFlipImage = function (inTutorial) {
            };
            break;
        }
        case 'id_points_review_438': {
            UDGE.afterFlipImage = function (inTutorial) {
                ID_POINTS_REVIEW_438.startTimer();
            };
            break;
        }
        case 'id_test_12': {
            UDGE.afterFlipImage = function(inTutorial) {
                ID_TEST_12.setTimer();
                printLog('image flipped');
            };
            break;
        }
        default: {
            UDGE.afterFlipImage = function (inTutorial) {
            };
        }
    }
}

/**
 * Defines what happen after a tag was added
 * @param main_user_group_id
 */
function setUDGEAfterTagAdded(main_user_group_id) {
    switch (main_user_group_id) {
        case "id_prizes_59": {
            UDGE.afterTagAdded = function (event, ui) {
                ID_PRIZES_59.addNewTag();
            };
            break;
        }
        case "id_points_review_210": {
            UDGE.afterTagAdded = function (event, ui) {
                ID_POINTS_REVIEW_210.addNewTag(ui.tagLabel);
            };
            break;
        }
        case "id_points_review_125": {
            UDGE.afterTagAdded = function (event, ui) {
                ID_POINTS_REVIEW_125.addNewTag(ui.tagLabel);
            };
            break;
        }
        case "id_beat_friend_51": {
            UDGE.afterTagAdded = function (event, ui) {
                ID_POINTS_REVIEW_125.addNewTag();
            };
            break;
        }
        case "id_points_review_438": {
            UDGE.afterTagAdded = function (event, ui) {
                ID_POINTS_REVIEW_438.addNewTag(ui.tagLabel);
            };
            break;
        }
        case "id_points_similar_61": {
            UDGE.afterTagAdded = function (event, ui) {
                ID_POINTS_SIMILAR_61.addNewTag();
            };
            break;
        }
        case "id_aquarium_339": {
            UDGE.afterTagAdded = function (event, ui) {
                ID_AQUARIUM_339.addNewTag();
            };
            break;
        }
        case "id_points_96": {
            UDGE.afterTagAdded = function (event, ui) {
                ID_POINTS_96.addNewTag(ui.tagLabel);
            };
            break;
        }
        case "id_complex_115": {
            UDGE.afterTagAdded = function (event, ui) {
                ID_COMPLEX_115.addNewTag(ui.tagLabel);
            };
            break;
        }
        case "id_single_teams_407": {
            UDGE.afterTagAdded = function (event, ui) {
                ID_SINGLE_TEAMS_407.addNewTag(ui.tagLabel);
            };
            break;
        }
        case "id_levels_498": {
            UDGE.afterTagAdded = function (event, ui) {
                ID_LEVELS_498.addNewTag(ui.tagLabel);
            };
            break;
        }
        case "id_test_11": {
            UDGE.afterTagAdded = function(event, ui) {
                ID_TEST_11.addNewTag();
            };
            break;
        }
        case "id_test_12": {
            UDGE.afterTagAdded = function(event, ui) {
                printLog('tag added');
                ID_TEST_12.addNewTag(ui.tagLabel);
            };
            break;
        }
        default: {
            UDGE.afterTagAdded = function (event, ui) {
            };
        }
    }
}

/**
 * Defines what happen after a tag was removed
 * @param main_user_group_id
 */
function setUDGEAfterTagRemoved(main_user_group_id) {
    switch (main_user_group_id) {
        case "id_prizes_59": {
            UDGE.afterTagRemoved = function (event, ui) {
                ID_PRIZES_59.removeNewTag();
            };
            break;
        }
        case "id_points_review_210": {
            UDGE.afterTagRemoved = function (event, ui) {
                ID_POINTS_REVIEW_210.removeNewTag(ui.tagLabel);
            };
            break;
        }
        case "id_points_review_125": {
            UDGE.afterTagRemoved = function (event, ui) {
                ID_POINTS_REVIEW_125.removeNewTag(ui.tagLabel);
            };
            break;
        }
        case "id_beat_friend_51": {
            UDGE.afterTagRemoved = function (event, ui) {
                ID_BEAT_FRIEND_51.removeNewTag(ui.tagLabel);
            };
            break;
        }
        case "id_points_review_438": {
            UDGE.afterTagRemoved = function (event, ui) {
                ID_POINTS_REVIEW_438.removeNewTag(ui.tagLabel);
            };
            break;
        }
        case "id_points_similar_61": {
            UDGE.afterTagRemoved = function (event, ui) {
                ID_POINTS_SIMILAR_61.removeNewTag();
            };
            break;
        }
        case "id_aquarium_339": {
            UDGE.afterTagRemoved = function (event, ui) {
                ID_AQUARIUM_339.removeNewTag();
            };
            break;
        }
        case "id_points_96": {
            UDGE.afterTagRemoved = function (event, ui) {
                ID_POINTS_96.removeNewTag(ui.tagLabel);
            };
            break;
        }
        case "id_complex_115": {
            UDGE.afterTagRemoved = function (event, ui) {
                ID_COMPLEX_115.removeNewTag(ui.tagLabel);
            };
            break;
        }
        case "id_single_teams_407": {
            UDGE.afterTagRemoved = function (event, ui) {
                ID_SINGLE_TEAMS_407.removeNewTag(ui.tagLabel);
            };
            break;
        }
        case "id_levels_498": {
            UDGE.afterTagRemoved = function (event, ui) {
                ID_LEVELS_498.removeNewTag(ui.tagLabel);
            };
            break;
        }
        case "id_test_11": {
            UDGE.afterTagRemoved = function(event, ui) {
                ID_TEST_11.removeNewTag();
            };
            break;
        }
        case "id_test_12": {
            UDGE.afterTagRemoved = function(event, ui) {
                ID_TEST_12.removeNewTag(ui.tagLabel);
            };
            break;
        }
        default: {
            UDGE.afterTagRemoved = function (event, ui) {
            };
        }
    }
}

/**
 * Defines what happen after a command comes back from the server
 * @param main_user_group_id
 *
 * TODO: improve this thing
 * TODO: Applaud me for making this pretty awesome (I dare you to look into git history, it WAS even more ugly)
 * TODO: geil, ne Banane!
 */
function setUDGEOnInterpretCommand(main_user_group_id) {

    // The handlers valid for every user (getting the concept)
    UDGE.COMMAND_HANDLER['get_concept'] = function (content) {
        var cquest = JSON.parse(JSON.parse(content['value'][0]['json_answer']));
        var concept = cquest['concept'];
        var concept_motivation = cquest['concept_motivation'];
        var concept_most_important = cquest['concept_most_important'];

        $('#concept_recap_concept').html(concept);
        $('#concept_recap_motivation').html(concept_motivation);
        $('#concept_recap_most_important').html(concept_most_important);
    };

    // The handlers valid only for certain users
    switch (main_user_group_id) {
        case "id_points_151": {
            UDGE.COMMAND_HANDLER['get_my_tag_count'] = function (content) {
                ID_POINTS_151.setPointsAndLB(content['value'][0]['num']);
            };
            UDGE.COMMAND_HANDLER['get_my_last_image_tag_count'] = function (content) {
                ID_POINTS_151.setMyPoints(content['value'][0]['num']);
            };
            break;
        }
        case "id_points_review_210": {
            UDGE.COMMAND_HANDLER['get_my_tag_count'] = function (content) {
                ID_POINTS_REVIEW_210.updatePoints(content['value'][0]['num'], -1);
            };
            UDGE.COMMAND_HANDLER['get_most_20_tags_for_this_image'] = function (content) {
                ID_POINTS_REVIEW_210.setOtherPlayersTags(content['value']);
            };
            break;
        }
        case "id_points_review_125": {
            UDGE.COMMAND_HANDLER['get_my_tag_count'] = function (content) {
                ID_POINTS_REVIEW_125.updatePoints(content['value'][0]['num'], -1);
            };
            UDGE.COMMAND_HANDLER['get_most_20_tags_for_this_image'] = function (content) {
                ID_POINTS_REVIEW_125.setOtherPlayersTags(content['value']);
            };
            break;
        }
        case "id_beat_friend_51": {
            UDGE.COMMAND_HANDLER['get_my_tag_count'] = function (content) {
                ID_BEAT_FRIEND_51.setPoints(content['value'][0]['num']);
            };
            UDGE.COMMAND_HANDLER['get_most_40_tags_for_this_image'] = function (content) {
                ID_BEAT_FRIEND_51.setOtherPlayersTags(content['value']);
            };
            UDGE.COMMAND_HANDLER['get_mood_count_for_this_image'] = function (content) {
                ID_BEAT_FRIEND_51.setDistinctMoods(content['value'][0]['num']);
            };
            break;
        }
        case "id_points_review_438": {
            UDGE.COMMAND_HANDLER['get_my_tag_count'] = function (content) {
                // Take the double number of tags as points (only needed when no cookies are present)
                ID_POINTS_REVIEW_438.updatePoints(content['value'][0]['num'] * 2);
            };
            UDGE.COMMAND_HANDLER['get_most_25_tags_for_this_image'] = function (content) {
                ID_POINTS_REVIEW_438.setOtherPlayersTags(content['value']);
            };
            break;
        }
        case "id_teams_simple_104": {
            UDGE.COMMAND_HANDLER['get_most_25_tags_for_this_image'] = function (content) {
                ID_TEAMS_SIMPLE_104.setOtherTags(content['value']);
            };
            break;
        }
        case "id_teams_points_369": {
            UDGE.COMMAND_HANDLER['get_most_25_tags_for_this_image'] = function (content) {
                ID_TEAMS_POINTS_369.setOtherTags(content['value']);
            };
            break;
        }
        case "id_single_teams_407": {
            UDGE.COMMAND_HANDLER['get_most_25_tags_for_this_image'] = function (content) {
                ID_SINGLE_TEAMS_407.setOtherTags(content['value']);
            };
            break;
        }
        case "id_levels_498": {
            UDGE.COMMAND_HANDLER['get_most_25_tags_for_this_image'] = function (content) {
                ID_LEVELS_498.setOtherTags(content['value']);
            };
            break;
        }
        case "id_points_similar_61": {
            UDGE.COMMAND_HANDLER['get_my_tag_count'] = function (content) {
                ID_POINTS_SIMILAR_61.updatePoints(content['value'][0]['num']);
            };
            UDGE.COMMAND_HANDLER['get_most_10_tags_for_this_image'] = function (content) {
                ID_POINTS_SIMILAR_61.setOtherPlayersTags(content['value']);
            };
            break;
        }
        case "id_aquarium_339": {
            UDGE.COMMAND_HANDLER['get_my_tag_count'] = function (content) {
                ID_AQUARIUM_339.setTagCount(content['value'][0]['num']);
            };
            break;
        }
        case "id_points_96": {
            UDGE.COMMAND_HANDLER['get_my_tag_count'] = function (content) {
                ID_POINTS_96.setPoints(content['value'][0]['num']);
            };
            break;
        }
        case "id_complex_115": {
            UDGE.COMMAND_HANDLER['get_most_15_tags_for_this_image'] = function (content) {
                ID_COMPLEX_115.setWords(content['value']);
            };
            UDGE.COMMAND_HANDLER['get_my_tag_count'] = function (content) {
                ID_COMPLEX_115.setTagCount(content['value'][0]['num']);
            };
            UDGE.COMMAND_HANDLER['get_worked_images'] = function (content) {
                ID_COMPLEX_115.setLevel(content['value'][0]['num']);
            };
            break;
        }
        case "id_test_11": {
            UDGE.COMMAND_HANDLER['get_my_tag_count'] = function (content) {
                ID_TEST_11.setPoints(content['value'][0]['num']);
            };
            UDGE.COMMAND_HANDLER['get_most_40_tags_for_this_image'] = function (content) {
                ID_TEST_11.setOtherPlayersTags(content['value']);
            };
            UDGE.COMMAND_HANDLER['get_mood_count_for_this_image'] = function (content) {
                if(content['value'][0] === undefined)
                    ID_TEST_11.setDistinctMoods(0);
                else ID_TEST_11.setDistinctMoods(content['value'][0]);
                //ID_TEST_11.setDistinctMoods(content['value'][0]['num']);
            };
            break;
        }
        case "id_test_12": {
            UDGE.COMMAND_HANDLER['get_most_10_tags_for_this_image'] = function (content) {
                ID_TEST_12.setTags(content['value']);
            };
            break;
        }
        default: {
            // Do nothing
        }
    }

    // Setting the handler for the handlers (dafuq?)
    UDGE.onInterpretCommand = function (content) {
        if (UDGE.COMMAND_HANDLER.hasOwnProperty(content['status'])) {
            UDGE.COMMAND_HANDLER[content['status']](content);
        } else {
            printLog('Received command that current UDGE cannot handle: ' + content['status']);
        }
    }
}

/**
 * Sets the on change leaderboard name function
 * @param main_user_group_id
 */
function setUDGEOnChangeLeaderBoardName(main_user_group_id) {
    switch (main_user_group_id) {
        case "id_prizes_59": {
            UDGE.onChangeLeaderBoardName = function (event, ui) {
                ID_PRIZES_59.setLeaderboard();
            };
            break;
        }
        case "id_complex_115": {
            UDGE.onChangeLeaderBoardName = function (event, ui) {
                ID_COMPLEX_115.updateLeaderboard(false);
            };
            break;
        }
        case "id_beat_friend_51": {
            UDGE.onChangeLeaderBoardName = function (event, ui) {
                ID_BEAT_FRIEND_51.viewStatistics();
            };
            break;
        }
        case "id_points_similar_61": {
            UDGE.onChangeLeaderBoardName = function (event, ui) {
                ID_POINTS_SIMILAR_61.updateLeaderboard();
            };
            break;
        }
        case "id_points_96": {
            UDGE.onChangeLeaderBoardName = function (event, ui) {
                ID_POINTS_96.setLeaderboard();
            };
            break;
        }
        case "id_levels_498": {
            UDGE.onChangeLeaderBoardName = function (event, ui) {
                ID_LEVELS_498.setLeaderboard();
            };
            break;
        }
        default: {
            UDGE.onChangeLeaderBoardName = function (event, ui) {
            };
        }
    }
}

function setUDGEOnStartExtraRound(main_user_group_id){
    switch(main_user_group_id){
        case "id_levels_498":{
            UDGE.onStartExtraRound = function(event, ui){
                // Todo: This is code replication from tutorial.
                // Todo: Code replication is bad, mkay. Make this clean, mkay.
                function id_levels_498_temp_fun(){
                    BootstrapDialog.show({
                        title: 'Spiel bereit',
                        message: $('<div>Es wurde ein Mitspieler gefunden. Mit einem Klick auf <em>Starten</em> kannst du das Spiel starten.</div>'),
                        closable: false,
                        buttons: [{
                            label: 'Starten',
                            action: function (dialogItself) {
                                dialogItself.close();
                                startAdditionalRound();
                            }
                        }]
                    });
                }

                var btn_clicked = false;
                BootstrapDialog.show({
                    title: 'Gegenspieler finden',
                    message: $('<div></div>').load('views/dialogs/dia_tutorial_ge_id_levels_498_lobby_no_tutorial_cheer.html'),
                    closable: false,
                    buttons: [{
                        label: 'Spieler herausfordern',
                        action: function (dialogItself) {
                            if(!btn_clicked) {
                                btn_clicked = true;
                                setVisible($('#levels_498_challenge'));
                                setTimeout(function () {
                                    dialogItself.close();
                                    id_levels_498_temp_fun();
                                }, getRandomNumber(5000, 10000));
                            }
                        }
                    }, {
                        label: 'Herausforderung suchen',
                        action: function (dialogItself) {
                            if(!btn_clicked) {
                                btn_clicked = true;
                                setVisible($('#levels_498_wait_for_challenge'));
                                setTimeout(function () {
                                    dialogItself.close();
                                    id_levels_498_temp_fun();
                                }, getRandomNumber(5000, 10000));
                            }
                        }
                    }]
                });
            };
            break;
        }
        default:{
            UDGE.onStartExtraRound = function(event, ui){
                startAdditionalRound();
            }
        }
    }
}

/**
 * Sets the on tutorial function
 * @param main_user_group_id
 */
function setUDGEOnTutorialFinished(main_user_group_id) {
    switch (main_user_group_id) {
        case "id_points_151": {
            UDGE.onTutorialFinished = function (event, ui) {
                BootstrapDialog.show({
                    title: 'Nickname',
                    message: $('<div>Bitte gebe hier deinen Nicknamen (1-8 Zeichen) ein, der später im Leaderboard erscheinen soll.</div>' +
                        '<input class="pt-2 pb-2" type="text" id="dia_nickname_id_points">' +
                        '<div id="dia_nickname_id_points_error" class="invisible txt_red">Bitte gebe einen Nicknamen mit 1-8 Zeichen an.</div>'),
                    closable: false,
                    buttons: [{
                        label: 'Weiter',
                        action: function (dialogItself) {
                            var nick = $('#dia_nickname_id_points').val();
                            if (nick.length > 0 && nick.length < 9) {
                                setCookie('lb_username', nick);
                                dialogItself.close();
                                viewTutorialFinished();
                            } else {
                                setVisible($('#dia_nickname_id_points_error'));
                            }
                        }
                    }]
                });

            };
            break;
        }
        case "id_points_review_210": {
            UDGE.onTutorialFinished = function (event, ui) {
                BootstrapDialog.show({
                    title: 'Lobby',
                    message: $('<div></div>').load('views/dialogs/dia_tutorial_ge_id_points_review_210_lobby.html'),
                    closable: false,
                    buttons: [{
                        label: 'Suchen',
                        action: function (dialogItself) {
                            setVisible($('#points_review_210_lobby_loader'));
                            setTimeout(function () {
                                dialogItself.close();
                                BootstrapDialog.show({
                                    title: 'Spiel bereit',
                                    message: $('<div>Es wurden 2 Mitspieler gefunden. Klicke auf <em>Starten</em> um mit dem Bilder-Taggen zu beginnen.</div>'),
                                    closable: false,
                                    buttons: [{
                                        label: 'Starten',
                                        action: function (dialogItself) {
                                            dialogItself.close();
                                            deleteCookie("210_points");
                                            setTaggingEnvironment();
                                        }
                                    }]
                                });
                            }, getRandomNumber(5000, 10000));
                        }
                    }, {
                        label: 'Abbrechen',
                        action: function (dialogItself) {
                            dialogItself.close();
                        }
                    }]
                });
            };
            break;
        }
        case "id_points_review_125": {
            UDGE.onTutorialFinished = function (event, ui) {
                BootstrapDialog.show({
                    title: 'Lobby',
                    message: $('<div></div>').load('views/dialogs/dia_tutorial_ge_id_points_review_125_lobby.html'),
                    closable: false,
                    buttons: [{
                        label: 'Suchen',
                        action: function (dialogItself) {
                            setVisible($('#points_review_125_lobby_loader'));
                            setTimeout(function () {
                                dialogItself.close();
                                BootstrapDialog.show({
                                    title: 'Spiel bereit',
                                    message: $('<div>Es wurden 2 Mitspieler gefunden. Klicke auf <em>Starten</em> um mit dem Bilder-Taggen zu beginnen.</div>'),
                                    closable: false,
                                    buttons: [{
                                        label: 'Starten',
                                        action: function (dialogItself) {
                                            dialogItself.close();
                                            deleteCookie("125_points");
                                            setTaggingEnvironment();
                                        }
                                    }]
                                });
                            }, getRandomNumber(5000, 10000));
                        }
                    }, {
                        label: 'Abbrechen',
                        action: function (dialogItself) {
                            dialogItself.close();
                        }
                    }]
                });
            };
            break;
        }
        case "id_complex_115": {
            UDGE.onTutorialFinished = function (event, ui) {
                deleteCookie("115_points");
                viewTutorialFinished();
            };
            break;
        }
        case "id_beat_friend_51": {
            UDGE.onTutorialFinished = function (event, ui) {
                deleteCookie('51_points');
                viewTutorialFinished();
            };
            break;
        }
        case "id_points_review_438": {
            UDGE.onTutorialFinished = function (event, ui) {
                deleteCookie("438_points");
                viewTutorialFinished();
            };
            break;
        }
        case "id_points_similar_61": {
            UDGE.onTutorialFinished = function (event, ui) {
                deleteCookie("61_points");
                viewTutorialFinished();
            };
            break;
        }
        case "id_teams_simple_104": {
            UDGE.onTutorialFinished = function (event, ui) {
                BootstrapDialog.show({
                    title: 'Nickname',
                    message: $('<div>Bitte gebe hier deinen Nickname an, der anderen Spielern angezeigt werden soll.</div>' +
                        '<br><input class="pt-2 pb-2" type="text" id="dia_nickname_id_teams_simple_104">' +
                        '<div id="dia_nickname_id_teams_simple_104_error" class="invisible txt_red">Bitte gebe einen Nicknamen ein.</div>'),
                    closable: false,
                    buttons: [{
                        label: 'Weiter',
                        action: function (dialogItself) {
                            var nick = $('#dia_nickname_id_teams_simple_104').val();
                            if (nick.length > 0) {

                                // Set the username and close the dialog
                                setCookie('lb_username', nick);
                                dialogItself.close();

                                // Reset the wins
                                setCookie('t_s_wins_t1', 0);
                                setCookie('t_s_wins_t2', 0);

                                BootstrapDialog.show({
                                    title: 'Lobby',
                                    message: $('<div></div>').load('views/dialogs/dia_tutorial_ge_id_teams_simple_104_lobby.html'),
                                    closable: false,
                                    buttons: [{
                                        label: 'Suchen',
                                        action: function (dialogItself) {
                                            setVisible($('#teams_simple_104_lobby_loader'));
                                            setTimeout(function () {
                                                dialogItself.close();
                                                BootstrapDialog.show({
                                                    title: 'Spiel bereit',
                                                    message: $('<div>Es wurden 3 Mitspieler gefunden. Klicke auf <em>Starten</em> um mit dem Bilder-Taggen zu beginnen. Die Spieler werden zufällig auf die beiden Teams verteilt.</div>'),
                                                    closable: false,
                                                    buttons: [{
                                                        label: 'Starten',
                                                        action: function (dialogItself) {
                                                            dialogItself.close();
                                                            setTaggingEnvironment();
                                                        }
                                                    }]
                                                });
                                            }, getRandomNumber(4300, 5000));

                                            $('#teams_simple_wait_p1').html(nick);

                                            setTimeout(function () {
                                                setVisible($('#teams_simple_wait_p2'));
                                            }, 3000);

                                            setTimeout(function () {
                                                setVisible($('#teams_simple_wait_p3'));
                                            }, 3500);

                                            setTimeout(function () {
                                                setVisible($('#teams_simple_wait_p4'));
                                            }, 4500);
                                        }
                                    }, {
                                        label: 'Abbrechen',
                                        action: function (dialogItself) {
                                            dialogItself.close();
                                        }
                                    }]
                                });
                            } else {
                                setVisible($('#dia_nickname_id_teams_simple_104_error'));
                            }
                        }
                    }]
                });

            };
            break;
        }
        case "id_teams_points_369": {
            UDGE.onTutorialFinished = function (event, ui) {
                BootstrapDialog.show({
                    title: 'Nickname',
                    message: $('<div>Bitte gebe hier deinen Nickname an, der anderen Spielern angezeigt werden soll.</div>' +
                        '<br><input class="pt-2 pb-2" type="text" id="dia_nickname_id_teams_points_369">' +
                        '<div id="dia_nickname_id_teams_points_369_error" class="invisible txt_red">Bitte gebe einen Nicknamen ein.</div>'),
                    closable: false,
                    buttons: [{
                        label: 'Weiter',
                        action: function (dialogItself) {
                            var nick = $('#dia_nickname_id_teams_points_369').val();
                            if (nick.length > 0) {

                                // Set the username and close the dialog
                                setCookie('lb_username', nick);
                                dialogItself.close();

                                // Reset the wins
                                setCookie('t_p_wins_t1', 0);
                                setCookie('t_p_wins_t2', 0);
                                deleteCookie('t_p_players');

                                setTaggingEnvironment();
                            } else {
                                setVisible($('#dia_nickname_id_teams_points_369_error'));
                            }
                        }
                    }]
                });

            };
            break;
        }
        case "id_single_teams_407": {
            UDGE.onTutorialFinished = function (event, ui) {
                BootstrapDialog.show({
                    title: 'Lobby',
                    message: $('<div></div>').load('views/dialogs/dia_tutorial_ge_id_single_teams_407_lobby.html'),
                    closable: false,
                    buttons: [{
                        label: 'Suchen',
                        action: function (dialogItself) {
                            setVisible($('#single_teams_407_lobby_loader'));
                            setTimeout(function () {
                                dialogItself.close();
                                BootstrapDialog.show({
                                    title: 'Spiel bereit',
                                    message: $('<div></div>').load('views/small_elements/mst_id_single_teams_407_modus_chooser.html'),
                                    closable: false,
                                    buttons: [{
                                        label: 'Singleplayer',
                                        action: function (dialogItself) {
                                            setCookie('407_view_type', 'single');
                                            dialogItself.close();
                                            setTaggingEnvironment();
                                        }
                                    }, {
                                        label: 'Multiplayer',
                                        action: function (dialogItself) {
                                            setCookie('407_view_type', 'multi');
                                            dialogItself.close();
                                            setTaggingEnvironment();
                                        }
                                    }]
                                });
                            }, getRandomNumber(8000, 10000));
                        }
                    }, {
                        label: 'Abbrechen',
                        action: function (dialogItself) {
                            dialogItself.close();
                        }
                    }]
                });

            };
            break;
        }
        case "id_levels_498": {
            UDGE.onTutorialFinished = function (event, ui) {
                function id_levels_498_temp_fun(){
                    BootstrapDialog.show({
                        title: 'Spiel bereit',
                        message: $('<div>Es wurde ein Mitspieler gefunden. Mit einem Klick auf <em>Starten</em> kannst du das Spiel starten.</div>'),
                        closable: false,
                        buttons: [{
                            label: 'Starten',
                            action: function (dialogItself) {
                                setCookie('498_user_wins', 0);
                                setCookie('498_user_wins_total', 0);
                                setCookie('498_opponent_wins', 0);
                                setCookie('498_level', 1);
                                dialogItself.close();
                                setTaggingEnvironment();
                            }
                        }]
                    });
                }

                var btn_clicked = false;
                BootstrapDialog.show({
                    title: 'Gegenspieler finden',
                    message: $('<div></div>').load('views/dialogs/dia_tutorial_ge_id_levels_498_lobby.html'),
                    closable: false,
                    buttons: [{
                        label: 'Spieler herausfordern',
                        action: function (dialogItself) {
                            if(!btn_clicked) {
                                btn_clicked = true;
                                setVisible($('#levels_498_challenge'));
                                setTimeout(function () {
                                    dialogItself.close();
                                    id_levels_498_temp_fun();
                                }, getRandomNumber(5000, 10000));
                            }
                        }
                    }, {
                        label: 'Herausforderung suchen',
                        action: function (dialogItself) {
                            if(!btn_clicked) {
                                btn_clicked = true;
                                setVisible($('#levels_498_wait_for_challenge'));
                                setTimeout(function () {
                                    dialogItself.close();
                                    id_levels_498_temp_fun();
                                }, getRandomNumber(5000, 10000));
                            }
                        }
                    }]
                });

            };
            break;
        }
        case "id_points_96": {
            UDGE.onTutorialFinished = function (event, ui) {
                setCookie('96_points', 0);
                viewTutorialFinished();
            };
            break;
        }
        case "id_test_11": {
            UDGE.onTutorialFinished = function (event, ui) {
                BootstrapDialog.show({
                    title: 'Nickname',
                    message: $('<div>Bitte gebe hier deinen Nicknamen (1-8 Zeichen) ein, der später im Leaderboard erscheinen soll.</div>' +
                        '<input class="pt-2 pb-2" type="text" id="dia_nickname_id_points">' +
                        '<div id="dia_nickname_id_points_error" class="invisible txt_red">Bitte gebe einen Nicknamen mit 1-8 Zeichen an.</div>'),
                    closable: false,
                    buttons: [{
                        label: 'Weiter',
                        action: function (dialogItself) {
                            var nick = $('#dia_nickname_id_points').val();
                            if (nick.length > 0 && nick.length < 9) {
                                setCookie('lb_username', nick);
                                dialogItself.close();
                                deleteCookie('11_points');
                                viewTutorialFinished();
                            } else {
                                setVisible($('#dia_nickname_id_points_error'));
                            }
                        }
                    }]
                });

            };
            break;
        }
        case "id_test_12": {
            UDGE.onTutorialFinished = function (event, ui) {
                BootstrapDialog.show({
                    title: 'Spielersuche',
                    message: $('<div></div>').load('views/dialogs/dia_tutorial_ge_id_test_12_search.html'),
                    closable: false,
                    buttons: [{
                        label: 'Suchen',
                        action: function (dialogItself) {
                            setVisible($('#id_test_12_loader'));
                            setTimeout(function() {
                                dialogItself.close();
                                BootstrapDialog.show({
                                    label: 'Spiel bereit',
                                    message: $('<div> Es wurde ein Gegenspieler gefunden.</div>' +
                                        '<div> Klicke auf <em> Weiter </em> um das Tutorial zu beenden und das Spiel zu beginnen. </div>'),
                                    closable: false,
                                    buttons: [{
                                        label: 'Weiter',
                                        action: function(dialogItself) {
                                            dialogItself.close();
                                            setTaggingEnvironment();
                                        }
                                    }]
                                });
                            }, getRandomNumber(7000, 10000));

                        }
                    }, {
                        label: 'Abbrechen',
                        action: function(dialogItself) {
                            dialogItself.close();
                        }
                    }]
                });
            };
            break;
        }

        default: {
            UDGE.onTutorialFinished = function (event, ui) {
                viewTutorialFinished();
            };
        }
    }
}

/*
 ################### TUTORIALS #########################
 */

/**
 * Start the points 151 tutorial
 */
function startIDPoints151Tutorial() {
    var next_img_btn = $('#next_img');
    next_img_btn.prop('onclick', null).off('click');

    // Create an example view of the right view
    ID_POINTS_151 = ID_Points_151();
    ID_POINTS_151.init('div_it_id_points_151');

    viewRightTutorialOverlay(
        'Prinzip des Bilder-Taggens',
        $('<div></div>').load('views/dialogs/dia_tutorial_design_implemented.html'),
        'Weiter',
        function () {
            flipIn(5);
            setTimeout(function () {
                setVisible($('#div_it_stats'));
                ID_POINTS_151.setTutorialView();
                viewLeftTutorialOverlay(
                    'Punkte',
                    $('<div></div>').load('views/dialogs/dia_tutorial_ge_id_points_151.html'),
                    'Weiter',
                    function () {
                        enableTagFieldAndButton();
                        next_img_btn.click(btn_oc_viewTutorialFinished);
                    },
                    true
                );
            }, 5000);
        },
        true);
}

/**
 * Start the review 210 tutorial
 */
function startIDPointsReview210Tutorial() {
    var next_img_btn = $('#next_img');

    // Create an example view of the right view
    ID_POINTS_REVIEW_210 = ID_Points_Review_210();
    ID_POINTS_REVIEW_210.init('div_it_id_points_review_210');

    viewRightTutorialOverlay(
        'Prinzip des Bilder-Taggens',
        $('<div></div>').load('views/dialogs/dia_tutorial_design_implemented.html'),
        'Weiter',
        function () {
            flipIn(5);

            next_img_btn.html('Bestätigen');
            $('#tut_next_img_hint').html('Mit einem Klick auf <em>Bestätigen</em> beendest du deine Eingabe und fährst fort.');

            setTimeout(function () {
                setVisible($('#div_it_stats'));
                ID_POINTS_REVIEW_210.setTutorialView();
                viewLeftTutorialOverlay(
                    'Punkte',
                    $('<div></div>').load('views/dialogs/dia_tutorial_ge_id_points_review_210_1.html'),
                    'Weiter',
                    function () {
                        enableTagFieldAndButton();
                        next_img_btn.prop('onclick', null).off('click');
                        next_img_btn.click(startIDPointsReview210Tutorial_part_2);
                    },
                    true
                );
            }, 5000);
        },
        true);
}

/**
 * The second part of the 210er tutorial, explaining the counter players
 */
function startIDPointsReview210Tutorial_part_2() {
    // Check whether at least one tag was created
    var tags = $("#myTags").tagit("assignedTags");
    if (tags.length === 0) {
        viewInfoOverlay('' +
            'Damit du den Ablauf besser üben kannst, möchten wir dich bitten, hier <strong>mindestens ein Stichwort</strong> einzugeben. ' +
            'Diese Einschränkung wird im regulären Ablauf wegfallen.');
    } else {
        // Disabling the tag field
        disableTagField();

        // Changing the button
        var next_img_btn = $('#next_img');
        next_img_btn.html('Bestätigt');
        setInvisible($('#tut_next_img_hint'));
        ID_POINTS_REVIEW_210.setOtherPlayersTags([
            {tag: 'unruhig'}, {tag: 'verlassen'}, {tag: 'düster'},
            {tag: 'ruhig'}, {tag: 'warm'}, {tag: 'chaotisch'},
            {tag: 'traurig'}, {tag: 'durcheinander'}, {tag: 'einsam'}]);
        ID_POINTS_REVIEW_210.calculateAndDisplayPoints();
        viewLeftTutorialOverlay(
            'Andere Spieler',
            $('<div></div>').load('views/dialogs/dia_tutorial_ge_id_points_review_210_2.html'),
            'Weiter',
            function () {
                disableTagFieldAndNextButton();
                next_img_btn.prop('onclick', null).off('click');
                $('#next_img_points_review').click(btn_oc_viewTutorialFinished);
            },
            true
        );
    }
}

/**
 * Start the aquarium 339 tutorial
 */
function startIDAquarium339Tutorial() {
    var next_img_btn = $('#next_img');
    next_img_btn.prop('onclick', null).off('click');

    // Create an example view of the right view
    ID_AQUARIUM_339 = ID_Aquarium_339();
    ID_AQUARIUM_339.init('div_it_id_aquarium_339');

    viewRightTutorialOverlay(
        'Prinzip des Bilder-Taggens',
        $('<div></div>').load('views/dialogs/dia_tutorial_design_implemented.html'),
        'Weiter',
        function () {
            flipIn(5);
            setTimeout(function () {
                setVisible($('#div_it_stats'));
                ID_AQUARIUM_339.setTutorialView();
                viewLeftTutorialOverlay(
                    'Aquarium',
                    $('<div></div>').load('views/dialogs/dia_tutorial_ge_id_aquarium_339.html'),
                    'Weiter',
                    function () {
                        enableTagFieldAndButton();
                        next_img_btn.click(btn_oc_viewTutorialFinished);
                    },
                    true
                );
            }, 5000);
        },
        true);
}

/**
 * Start the teams simple 104 tutorial
 */
function startIDTeamsSimple104Tutorial() {
    var next_img_btn = $('#next_img');
    next_img_btn.prop('onclick', null).off('click');

    // Create an example view of the right view
    ID_TEAMS_SIMPLE_104 = ID_Teams_Simple_104();
    ID_TEAMS_SIMPLE_104.init('div_it_id_teams_simple_104');

    viewRightTutorialOverlay(
        'Prinzip des Bilder-Taggens',
        $('<div></div>').load('views/dialogs/dia_tutorial_design_implemented.html'),
        'Weiter',
        function () {
            flipIn(5);
            setTimeout(function () {
                setVisible($('#div_it_stats'));
                ID_TEAMS_SIMPLE_104.setTutorialView();
                ID_TEAMS_SIMPLE_104.setOtherTags([
                    {tag: 'unruhig'}, {tag: 'verlassen'}, {tag: 'düster'},
                    {tag: 'ruhig'}, {tag: 'warm'}, {tag: 'chaotisch'},
                    {tag: 'traurig'}, {tag: 'durcheinander'}, {tag: 'einsam'}]);
                viewLeftTutorialOverlay(
                    'Zeit',
                    $('<div></div>').load('views/dialogs/dia_tutorial_ge_id_teams_simple_104_1.html'),
                    'Weiter',
                    function () {
                        enableNextButton();
                        next_img_btn.prop('onclick', null).off('click');
                        next_img_btn.click(startIDTeamsSimple104Tutorial_part2);
                    },
                    true
                );
            }, 5000);
        },
        true);
}

/**
 * Starts part 2 of the tutorial
 */
function startIDTeamsSimple104Tutorial_part2() {
    var tags = $("#myTags").tagit("assignedTags");
    if (tags.length === 0) {
        viewInfoOverlay('' +
            'Damit du den Ablauf besser üben kannst, möchten wir dich bitten, hier <strong>mindestens ein Stichwort</strong> einzugeben. ' +
            'Diese Einschränkung wird im regulären Ablauf wegfallen.');
    } else {
        var next_img_btn = $('#next_img');
        viewLeftTutorialOverlay(
            'Mitspieler',
            $('<div></div>').load('views/dialogs/dia_tutorial_ge_id_teams_simple_104_2.html'),
            'Weiter',
            function () {
                ID_TEAMS_SIMPLE_104.confirmTags();
                next_img_btn.prop('onclick', null).off('click');
                $('#next_img_teams_simple').click(btn_oc_viewTutorialFinished);
            },
            true
        );
    }
}

/**
 * Start the teams simple 104 tutorial
 */
function startIDTeamsPoints369Tutorial() {
    var next_img_btn = $('#next_img');
    next_img_btn.prop('onclick', null).off('click');

    // Create an example view of the right view
    ID_TEAMS_POINTS_369 = ID_Teams_Points_369();
    ID_TEAMS_POINTS_369.init('div_it_id_teams_points_369');

    viewRightTutorialOverlay(
        'Prinzip des Bilder-Taggens',
        $('<div></div>').load('views/dialogs/dia_tutorial_design_implemented.html'),
        'Weiter',
        function () {
            flipIn(5);
            setTimeout(function () {
                setVisible($('#div_it_stats'));
                ID_TEAMS_POINTS_369.setTutorialView();
                ID_TEAMS_POINTS_369.setOtherTags([
                    {tag: 'unruhig'}, {tag: 'verlassen'}, {tag: 'düster'},
                    {tag: 'ruhig'}, {tag: 'warm'}, {tag: 'chaotisch'},
                    {tag: 'traurig'}, {tag: 'durcheinander'}, {tag: 'einsam'}]);
                viewLeftTutorialOverlay(
                    'Zeit',
                    $('<div></div>').load('views/dialogs/dia_tutorial_ge_id_teams_points_369_1.html'),
                    'Weiter',
                    function () {
                        enableNextButton();
                        next_img_btn.prop('onclick', null).off('click');
                        next_img_btn.click(startIDTeamsPoints369Tutorial_part2);
                    },
                    true
                );
            }, 5000);
        },
        true);
}

/**
 * Starts part 2 of the tutorial
 */
function startIDTeamsPoints369Tutorial_part2() {
    var tags = $("#myTags").tagit("assignedTags");
    if (tags.length === 0) {
        viewInfoOverlay('' +
            'Damit du den Ablauf besser üben kannst, möchten wir dich bitten, hier <strong>mindestens ein Stichwort</strong> einzugeben. ' +
            'Diese Einschränkung wird im regulären Ablauf wegfallen.');
    } else {
        var next_img_btn = $('#next_img');
        ID_TEAMS_POINTS_369.confirmTags();
        viewLeftTutorialOverlay(
            'Mitspieler',
            $('<div></div>').load('views/dialogs/dia_tutorial_ge_id_teams_points_369_2.html'),
            'Weiter',
            function () {
                next_img_btn.prop('onclick', null).off('click');
                $('#next_img_teams_points').click(btn_oc_viewTutorialFinished);
            },
            true
        );
    }
}

/**
 * Start the single teams 407 tutorial
 */
function startIDSingleTeams407Tutorial() {
    var next_img_btn = $('#next_img');
    next_img_btn.prop('onclick', null).off('click');

    // Create an example view of the right view
    ID_SINGLE_TEAMS_407 = ID_Single_Teams_407();
    ID_SINGLE_TEAMS_407.init('div_it_id_single_teams_407');

    viewRightTutorialOverlay(
        'Prinzip des Bilder-Taggens',
        $('<div></div>').load('views/dialogs/dia_tutorial_design_implemented.html'),
        'Weiter',
        function () {
            flipIn(5);
            setTimeout(function () {
                setVisible($('#div_it_stats'));
                ID_SINGLE_TEAMS_407.setTutorialView();
                ID_SINGLE_TEAMS_407.setOtherTags([
                    {tag: 'unruhig'}, {tag: 'verlassen'}, {tag: 'düster'},
                    {tag: 'ruhig'}, {tag: 'warm'}, {tag: 'chaotisch'},
                    {tag: 'traurig'}, {tag: 'durcheinander'}, {tag: 'einsam'}]);
                viewLeftTutorialOverlay(
                    'Getroffene Wörter',
                    $('<div></div>').load('views/dialogs/dia_tutorial_ge_id_single_teams_407_1.html'),
                    'Weiter',
                    function () {
                        enableNextButton();
                    },
                    true
                );
            }, 5000);
        },
        true);
}

/**
 * Start the levels 498 tutorial
 */
function startIDLevels498Tutorial() {
    var next_img_btn = $('#next_img');
    next_img_btn.prop('onclick', null).off('click');

    // Create an example view of the right view
    ID_LEVELS_498 = ID_levels_498();
    ID_LEVELS_498.init('div_it_id_levels_498');

    viewRightTutorialOverlay(
        'Prinzip des Bilder-Taggens',
        $('<div></div>').load('views/dialogs/dia_tutorial_design_implemented.html'),
        'Weiter',
        function () {
            flipIn(5);
            setTimeout(function () {
                setVisible($('#div_it_stats'));
                ID_LEVELS_498.setTutorialView();
                ID_LEVELS_498.setOtherTags([
                    {tag: 'unruhig'}, {tag: 'verlassen'}, {tag: 'düster'},
                    {tag: 'ruhig'}, {tag: 'warm'}, {tag: 'chaotisch'},
                    {tag: 'traurig'}, {tag: 'durcheinander'}, {tag: 'einsam'}]);
                viewLeftTutorialOverlay(
                    'Level und Leaderboard',
                    $('<div></div>').load('views/dialogs/dia_tutorial_ge_id_levels_498_1.html'),
                    'Weiter',
                    function () {
                        enableNextButton();
                    },
                    true
                );
            }, 5000);
        },
        true);
}


/**
 * Start the points 96 tutorial
 */
function startIDPoints96Tutorial() {
    var next_img_btn = $('#next_img');
    next_img_btn.prop('onclick', null).off('click');

    // Create an example view of the right view
    ID_POINTS_96 = ID_Points_96();
    ID_POINTS_96.init('div_it_id_points_96');

    viewRightTutorialOverlay(
        'Prinzip des Bilder-Taggens',
        $('<div></div>').load('views/dialogs/dia_tutorial_design_implemented.html'),
        'Weiter',
        function () {
            flipIn(5);
            setTimeout(function () {
                setVisible($('#div_it_stats'));
                ID_POINTS_96.setTutorialView();
                viewLeftTutorialOverlay(
                    'Punkte',
                    $('<div></div>').load('views/dialogs/dia_tutorial_ge_id_points_96.html'),
                    'Weiter',
                    function () {
                        enableTagFieldAndButton();
                        next_img_btn.click(btn_oc_viewTutorialFinished);
                    },
                    true
                );
            }, 5000);
        },
        true);
}

/**
 * Start the complex 115 tutorial
 */
function startIDComplex115Tutorial() {
    var next_img_btn = $('#next_img');
    next_img_btn.prop('onclick', null).off('click');

    // Create an example view of the right view
    ID_COMPLEX_115 = ID_Complex_115();
    ID_COMPLEX_115.init('div_it_id_complex_115');

    viewRightTutorialOverlay(
        'Prinzip des Bilder-Taggens',
        $('<div></div>').load('views/dialogs/dia_tutorial_design_implemented.html'),
        'Weiter',
        function () {
            flipIn(5);
            setTimeout(function () {
                setVisible($('#div_it_stats'));
                ID_COMPLEX_115.setTutorialView();

                // Show tutorial screen .5 seconds delayed (give the view a chance to render)
                setTimeout(function () {
                    viewLeftTutorialOverlayCustom(
                        'Treffer und Score',
                        $('<div></div>').load('views/dialogs/dia_tutorial_ge_id_complex_115_1.html'),
                        'Weiter',
                        function () {
                            startIDComplex115Tutorial_part2();
                        },
                        true,
                        $('#div_it_id_complex_115_words_and_points_div')
                    );
                }, 500);
            }, 5000);
        },
        true);
}

/**
 * Starts the second part of the complex 115 tutorial
 */
function startIDComplex115Tutorial_part2() {
    var next_img_btn = $('#next_img');
    viewLeftTutorialOverlayCustom(
        'Highscore und Level',
        $('<div></div>').load('views/dialogs/dia_tutorial_ge_id_complex_115_2.html'),
        'Weiter',
        function () {
            enableTagFieldAndButton();
            next_img_btn.click(btn_oc_viewTutorialFinished);
        },
        true,
        $('#div_it_id_complex_115_lb_and_level')
    );
}

/**
 * Start the review 125 tutorial
 */
function startIDPointsReview125Tutorial() {
    var next_img_btn = $('#next_img');

    // Create an example view of the right view
    ID_POINTS_REVIEW_125 = ID_Points_Review_125();
    ID_POINTS_REVIEW_125.init('div_it_id_points_review_125');

    viewRightTutorialOverlay(
        'Prinzip des Bilder-Taggens',
        $('<div></div>').load('views/dialogs/dia_tutorial_design_implemented.html'),
        'Weiter',
        function () {
            flipIn(5);

            next_img_btn.html('Bestätigen');
            $('#tut_next_img_hint').html('Mit einem Klick auf <em>Bestätigen</em> beendest du deine Eingabe und fährst fort.');

            setTimeout(function () {
                setVisible($('#div_it_stats'));
                ID_POINTS_REVIEW_125.setTutorialView();
                viewLeftTutorialOverlay(
                    'Punkte',
                    $('<div></div>').load('views/dialogs/dia_tutorial_ge_id_points_review_125_1.html'),
                    'Weiter',
                    function () {
                        enableTagFieldAndButton();
                        next_img_btn.prop('onclick', null).off('click');
                        next_img_btn.click(startIDPointsReview125Tutorial_part_2);
                    },
                    true
                );
            }, 5000);
        },
        true);
}

/**
 * The second part of the 125er tutorial, explaining the counter players
 */
function startIDPointsReview125Tutorial_part_2() {
    // Check whether at least one tag was created
    var tags = $("#myTags").tagit("assignedTags");
    if (tags.length === 0) {
        viewInfoOverlay('' +
            'Damit du den Ablauf besser üben kannst, möchten wir dich bitten, hier <strong>mindestens ein Stichwort</strong> einzugeben. ' +
            'Diese Einschränkung wird im regulären Ablauf wegfallen.');
    } else {
        // Disabling the tag field
        disableTagField();

        // Changing the button
        var next_img_btn = $('#next_img');
        next_img_btn.html('Bestätigt');
        setInvisible($('#tut_next_img_hint'));
        ID_POINTS_REVIEW_125.setOtherPlayersTags([
            {tag: 'unruhig'}, {tag: 'verlassen'}, {tag: 'düster'},
            {tag: 'ruhig'}, {tag: 'warm'}, {tag: 'chaotisch'},
            {tag: 'traurig'}, {tag: 'durcheinander'}, {tag: 'einsam'}]);
        ID_POINTS_REVIEW_125.displayOtherPlayersTags();
        // ID_POINTS_REVIEW_125.updatePoints(17);
        viewLeftTutorialOverlay(
            'Andere Spieler',
            $('<div></div>').load('views/dialogs/dia_tutorial_ge_id_points_review_125_2.html'),
            'Weiter',
            function () {
                disableTagFieldAndNextButton();
                next_img_btn.prop('onclick', null).off('click');
                $('#next_img_points_review').click(btn_oc_viewTutorialFinished);
            },
            true
        );
    }
}

/**
 * Start the beat friend 51 tutorial
 */
function startIDBeatFriend51Tutorial() {
    var next_img_btn = $('#next_img');

    // Create an example view of the right view
    ID_BEAT_FRIEND_51 = ID_Beat_Friend_51();
    ID_BEAT_FRIEND_51.init('div_it_id_beat_friend_51');

    viewRightTutorialOverlay(
        'Prinzip des Bilder-Taggens',
        $('<div></div>').load('views/dialogs/dia_tutorial_design_implemented.html'),
        'Weiter',
        function () {
            flipIn(5);

            next_img_btn.html('Bestätigen');
            $('#tut_next_img_hint').html('Mit einem Klick auf <em>Bestätigen</em> beendest du deine Eingabe und fährst fort.');

            setTimeout(function () {
                setVisible($('#div_it_stats'));
                ID_BEAT_FRIEND_51.setTutorialView();
                viewLeftTutorialOverlay(
                    'Durchschnittliche Tags',
                    $('<div></div>').load('views/dialogs/dia_tutorial_ge_id_beat_friend_51_1.html'),
                    'Weiter',
                    function () {
                        enableTagFieldAndButton();
                        next_img_btn.prop('onclick', null).off('click');
                        next_img_btn.click(startIDBeatFriend51Tutorial_part_2);
                    },
                    true
                );
            }, 5000);
        },
        true);
}

/**
 * The second part of the 51er tutorial.
 */
function startIDBeatFriend51Tutorial_part_2() {
    // Check whether at least one tag was created
    var tags = $("#myTags").tagit("assignedTags");
    if (tags.length === 0) {
        viewInfoOverlay('' +
            'Damit du den Ablauf besser üben kannst, möchten wir dich bitten, hier <strong>mindestens ein Stichwort</strong> einzugeben. ' +
            'Diese Einschränkung wird im regulären Ablauf wegfallen.');
    } else {
        // Disabling the tag field
        disableTagField();

        // Changing the button
        var next_img_btn = $('#next_img');
        next_img_btn.html('Bestätigt');
        setInvisible($('#tut_next_img_hint'));
        ID_BEAT_FRIEND_51.setOtherPlayersTags([
            {tag: 'unruhig', num: 5}, {tag: 'verlassen', num: 3}, {tag: 'düster', num: 4},
            {tag: 'ruhig', num: 4}, {tag: 'warm', num: 4}, {tag: 'chaotisch', num: 3},
            {tag: 'traurig', num: 3}, {tag: 'durcheinander', num: 1}, {tag: 'einsam', num: 1}]);
        ID_BEAT_FRIEND_51.setDistinctMoods(42);
        ID_BEAT_FRIEND_51.displayOtherPlayersTags();
        setTimeout(function () {
            viewLeftTutorialOverlay(
                'Gegenspieler und Statistiken',
                $('<div></div>').load('views/dialogs/dia_tutorial_ge_id_beat_friend_51_2.html'),
                'Weiter',
                function () {
                    disableTagFieldAndNextButton();
                    next_img_btn.prop('onclick', null).off('click');
                    $('#next_img_beat_friend').click(btn_oc_viewTutorialFinished);
                },
                true
            );
        }, 1000);
    }
}

/**
 * Start the test 11 tutorial
 */
function startIDTest11Tutorial() {
    var next_img_btn = $('#next_img');
    next_img_btn.prop('onclick', null).off('click');

    // Create an example view of the right view
    ID_TEST_11 = ID_Test_11();
    ID_TEST_11.init('div_it_id_test_11');

    viewRightTutorialOverlay(
        'Prinzip des Bilder-Taggens',
        $('<div></div>').load('views/dialogs/dia_tutorial_design_implemented.html'),
        'Weiter',
        function () {
            flipIn(5);
            setTimeout(function () {
                setVisible($('#div_it_stats'));
                ID_TEST_11.setTutorialView();
                viewLeftTutorialOverlay(
                    'Der Durchschnitt',
                    $('<div></div>').load('views/dialogs/dia_tutorial_ge_id_test_11.html'),
                    'Weiter',
                    function () {
                        enableTagFieldAndButton();
                        var next_btn = $('#next_img');
                        next_btn.html('Bestätigen');
                        next_img_btn.prop('onclick', null).off('click');
                        next_img_btn.click(startIDTest11Tutorial_part_2);
                    },
                    true
                );
            }, 5000);
        },
        true);
}

function startIDTest11Tutorial_part_2() {
    // Check whether at least one tag was created
    var tags = $("#myTags").tagit("assignedTags");
    if (tags.length === 0) {
        viewInfoOverlay('' +
            'Damit du den Ablauf besser üben kannst, möchten wir dich bitten, hier <strong>mindestens ein Stichwort</strong> einzugeben. ' +
            'Diese Einschränkung wird im regulären Ablauf wegfallen.');
    } else {
        // Disabling the tag field
        disableTagField();

        // Changing the button
        var next_img_btn = $('#next_img');
        next_img_btn.html('Bestätigt');
        ID_TEST_11.displayPoints();
        viewLeftTutorialOverlay(
            'Wörter anderer Spieler',
            $('<div></div>').load('views/dialogs/dia_tutorial_ge_id_test_11_2.html'),
            'Weiter',
            function () {
                disableTagFieldAndNextButton();
                $('#next_img_test_11').prop('onclick', null).off('click');
                $('#next_img_test_11').click(function() {
                    btn_oc_viewTutorialFinished();
                });
            },
            true
        );
    }
}

/**
 * Start the similar 61 tutorial
 */
function startIDPointsSimilar61Tutorial() {
    var next_img_btn = $('#next_img');

    // Create an example view of the right view
    ID_POINTS_SIMILAR_61 = ID_Points_Similar_61();
    ID_POINTS_SIMILAR_61.init('div_it_id_points_similar_61');

    viewRightTutorialOverlay(
        'Prinzip des Bilder-Taggens',
        $('<div></div>').load('views/dialogs/dia_tutorial_design_implemented.html'),
        'Weiter',
        function () {
            flipIn(5);

            next_img_btn.html('Bestätigen');
            $('#tut_next_img_hint').html('Mit einem Klick auf <em>Bestätigen</em> beendest du deine Eingabe und fährst fort.');

            setTimeout(function () {
                setVisible($('#div_it_stats'));
                ID_POINTS_SIMILAR_61.setTutorialView();
                viewLeftTutorialOverlay(
                    'Punkte',
                    $('<div></div>').load('views/dialogs/dia_tutorial_ge_id_points_similar_61_1.html'),
                    'Weiter',
                    function () {
                        enableTagFieldAndButton();
                        next_img_btn.prop('onclick', null).off('click');
                        next_img_btn.click(startIDPointsSimilar61Tutorial_part_2);
                    },
                    true
                );
            }, 5000);
        },
        true);
}

/**
 * The second part of the 210er tutorial, explaining the counter players
 */
function startIDPointsSimilar61Tutorial_part_2() {
    // Check whether at least one tag was created
    var tags = $("#myTags").tagit("assignedTags");
    if (tags.length === 0) {
        viewInfoOverlay('' +
            'Damit du den Ablauf besser üben kannst, möchten wir dich bitten, hier <strong>mindestens ein Stichwort</strong> einzugeben. ' +
            'Diese Einschränkung wird im regulären Ablauf wegfallen.');
    } else {
        // Disabling the tag field
        disableTagField();

        // Changing the button
        var next_img_btn = $('#next_img');
        next_img_btn.html('Bestätigt');
        ID_POINTS_SIMILAR_61.setOtherPlayersTags([
            {tag: 'unruhig'}, {tag: 'verlassen'}, {tag: 'düster'}, {tag: 'ruhig'}, {tag: 'warm'},
            {tag: 'chaotisch'}, {tag: 'traurig'}, {tag: 'durcheinander'}, {tag: 'einsam'}, {tag: 'sommerlich'}]);
        ID_POINTS_SIMILAR_61.displayOtherPlayersTags();
        viewLeftTutorialOverlay(
            'Wörter anderer Spieler',
            $('<div></div>').load('views/dialogs/dia_tutorial_ge_id_points_similar_61_2.html'),
            'Weiter',
            function () {
                disableTagFieldAndNextButton();
                next_img_btn.prop('onclick', null).off('click');
                $('#next_img_points_similar_61').click(btn_oc_viewTutorialFinished);
            },
            true
        );
    }
}

/**
 * Start the review 438 tutorial
 */
function startIDPointsReview438Tutorial() {
    var next_img_btn = $('#next_img');

    // Create an example view of the right view
    ID_POINTS_REVIEW_438 = ID_Points_Review_438();
    ID_POINTS_REVIEW_438.init('div_it_id_points_review_438');

    viewRightTutorialOverlay(
        'Prinzip des Bilder-Taggens',
        $('<div></div>').load('views/dialogs/dia_tutorial_design_implemented.html'),
        'Weiter',
        function () {
            flipIn(5);

            next_img_btn.html('Bestätigen');
            $('#tut_next_img_hint').html('Mit einem Klick auf <em>Bestätigen</em> beendest du deine Eingabe und fährst fort.');

            setTimeout(function () {
                setVisible($('#div_it_stats'));
                ID_POINTS_REVIEW_438.setTutorialView();
                viewLeftTutorialOverlay(
                    'Punkte',
                    $('<div></div>').load('views/dialogs/dia_tutorial_ge_id_points_review_438_1.html'),
                    'Weiter',
                    function () {
                        enableTagFieldAndButton();
                        next_img_btn.prop('onclick', null).off('click');
                        next_img_btn.click(startIDPointsReview438Tutorial_part_2);
                    },
                    true
                );
            }, 5000);
        },
        true);
}

/**
 * The second part of the 438er tutorial, explaining the counter players
 */
function startIDPointsReview438Tutorial_part_2() {
    // Check whether at least one tag was created
    var tags = $("#myTags").tagit("assignedTags");
    if (tags.length === 0) {
        viewInfoOverlay('' +
            'Damit du den Ablauf besser üben kannst, möchten wir dich bitten, hier <strong>mindestens ein Stichwort</strong> einzugeben. ' +
            'Diese Einschränkung wird im regulären Ablauf wegfallen.');
    } else {
        // Disabling the tag field
        disableTagField();

        // Changing the button
        var next_img_btn = $('#next_img');
        next_img_btn.html('Bestätigt');
        setInvisible($('#points_review_438_timer_div'));
        ID_POINTS_REVIEW_438.setOtherPlayersTags([
            {tag: 'unruhig', num: 5}, {tag: 'verlassen', num: 3}, {tag: 'düster', num: 4},
            {tag: 'ruhig', num: 4}, {tag: 'warm', num: 4}, {tag: 'chaotisch', num: 3},
            {tag: 'traurig', num: 3}, {tag: 'durcheinander', num: 1}, {tag: 'einsam', num: 1}]);
        ID_POINTS_REVIEW_438.displayOtherPlayersTags();
        viewLeftTutorialOverlay(
            'Tags anderer Spieler',
            $('<div></div>').load('views/dialogs/dia_tutorial_ge_id_points_review_438_2.html'),
            'Weiter',
            function () {
                disableTagFieldAndNextButton();
                next_img_btn.prop('onclick', null).off('click');
                $('#next_img_points_review').click(btn_oc_viewTutorialFinished);
            },
            true
        );
    }
}

/**
* start the test_12 tutorial
 */

function startIDTest12Tutorial(){
    var next_img_btn = $('#next_img');
    next_img_btn.prop('onclick', null).off('click');
    //create example view

    ID_TEST_12 = ID_Test_12();
    ID_TEST_12.init('div_it_id_test_12');

    viewRightTutorialOverlay(
        'Prinzip des Bilder-Taggens',
        $('<div></div>').load('views/dialogs/dia_tutorial_design_implemented.html'),
        'Weiter',
        function () {
            flipIn(5);
            setTimeout(function () {
                setVisible($('#div_it_stats'));
                ID_TEST_12.setTutorialView();
                ID_TEST_12.setTags([{tag: 'unruhig'}, {tag: 'verlassen'}, {tag: 'düster'},
                    {tag: 'ruhig'}, {tag: 'warm'}, {tag: 'chaotisch'},
                    {tag: 'traurig'}, {tag: 'durcheinander'}, {tag: 'einsam'}]);
                viewLeftTutorialOverlay(
                    'Gegenspieler',
                    $('<div></div>').load('views/dialogs/dia_tutorial_ge_id_test_12.html'),
                    'Weiter',
                    function () {
                        enableNextButton();
                    },
                    true
                );
            }, 5000);
        },
        true);
}

/**
 * start the second part of the test_12 tutorial
 */
/**
function startIDTest12Tutorial_part_2() {
    // Check whether at least one tag was created
    var tags = $("#myTags").tagit("assignedTags");
    ID_TEST_12.setTags([{tag: 'unruhig'}, {tag: 'verlassen'}, {tag: 'düster'},
        {tag: 'ruhig'}, {tag: 'warm'}, {tag: 'chaotisch'},
        {tag: 'traurig'}, {tag: 'durcheinander'}, {tag: 'einsam'}]);
    if (tags.length === 0) {
        viewInfoOverlay('' +
            'Damit du den Ablauf besser üben kannst, möchten wir dich bitten, hier <strong>mindestens ein Stichwort</strong> einzugeben. ' +
            'Diese Einschränkung wird im regulären Ablauf wegfallen.');
    } else {
        // Disabling the tag field
        disableTagField();
        // Changing the button
        var next_img_btn = $('#next_img');
        next_img_btn.html('Bestätigt');
        viewLeftTutorialOverlay(
            'Runden',
            $('<div></div>').load('views/dialogs/dia_tutorial_ge_id_test_12_2.html'),
            'Weiter',
            function () {
                disableTagFieldAndNextButton();
                next_img_btn.prop('onclick', null).off('click');
                $('#next_img_test_12').click(btn_oc_viewTutorialFinished());
            },
            true
        );
    }
}
*/


/*
    ###################### EXAMPLES ##########################
 */

/**
 * Sets te fixed Example Image
 */
function setExampleImage() {
    if (TUTORIAL_PIC >= TUTORIAL_PICS.length) {
        printErr('Tried to show a non existing tutorial image (index out of array).');
    } else {
        // Set the image
        setImage(TUTORIAL_PICS[TUTORIAL_PIC]);
        // Set the respective examples
        setExampleMorales(TUTORIAL_EXAMPLES[TUTORIAL_PIC]);

        // Increase the tutorial pic counter and set the new image string (for posting).
        ++TUTORIAL_PIC;
        CURRENT_IMAGE = "TUTORIAL_" + TUTORIAL_PIC;
    }
}

/**
 * Sets some example points for the tutorial
 */
function setExamplePoints() {
    POINTS = 1200;
    POINTS_INCR = 100;
    setPoints(1200);
}

/**
 * Sets some example points for the tutorial and additionally some example players for the leaderboard
 */
function setExamplePointsAndLB() {
    setExamplePoints();
    var leaderboard = [
        {'name': 'verdani', points: 10200},
        {'name': 'neo23', points: 6000},
        {'name': 'legolas', points: 2900},
        {'name': 'Du (Bsp.)', points: 1200},
        {'name': 'anork85', points: 1100}
    ];
    setLeaderboardFromAPI(leaderboard);
}


/**
 * Disables the tag field and the button to go to the next image
 */
function disableTagFieldAndNextButton() {
    disableTagField();
    disableNextButton();
}

/**
 * Disables the tagging field
 */
function disableTagField() {
    // $('#myTags').prop('disabled', true);
    var $myTags = $('#myTags');
    $myTags.find('*').attr('disabled', true);
}

/**
 * Disables the next button
 */
function disableNextButton() {
    $('#next_img').prop('disabled', true);
}

/**
 * Enables the tag field and the button to go to the next image
 */
function enableTagFieldAndButton() {
    enableTagField();
    enableNextButton();
}

/**
 * Enables the tagging field
 */
function enableTagField() {
    var $myTags = $('#myTags');
    $myTags.find('*').attr('disabled', false);
}

/**
 * Disable the next Button
 */
function enableNextButton() {
    $('#next_img').prop('disabled', false);
}

/*
    ##################### POINTS ########################
 */

/**
 * Defines what happens after a tag was added
 */
function increaseVisiblePoints(event, ui) {
    if (arrayContainsOnOfThoseElements(USER_GROUP, ['design_implemented', 'id_test_12'])) {
        // Trigger self designed stuff
        UDGE.afterTagAdded(event, ui);
    } else {
        POINTS += POINTS_INCR;
        setPoints(POINTS);
        adaptLeaderboard();
    }
}

/**
 * Defines what happens after a tag was removed
 */
function decreaseVisiblePoints(event, ui) {
    // Decrease iff control variable is set
    if (DECREASE_POINTS) {
        if (arrayContainsOnOfThoseElements(USER_GROUP, ['design_implemented', 'id_test_12'])) {
            // Trigger self designed stuff
            UDGE.afterTagRemoved(event, ui);
        } else {
            POINTS -= POINTS_INCR;
            setPoints(POINTS);
            adaptLeaderboard();
        }
    }
}

/*
    ################### LEADERBOARD ######################
 */

/**
 * Adapts the leaderboard
 */
function adaptLeaderboard() {
    LEADERBOARD_ARRAY = replaceInArrayGeneric(LEADERBOARD_ARRAY, 1, 3, POINTS, 0);
    setLeaderboard(false);
}

/*
    ############### HELPER METHODS ######################
 */

/**
 * Uses eval to compare a with b, using a defined comparator.
 * I.e., it returns the result of "a [comparator] b"
 * @param a The LHO
 * @param b The RHO
 * @param comparator The operator to compare LHO with RHO
 * @returns {any} Could be anything (i.e., 3 + 4 is also valid) but it's intended to compare two values,
 * i.e., returning a boolean value
 */
function compare(a, b, comparator) {
    return eval(String(a) + String(comparator) + String(b));
}

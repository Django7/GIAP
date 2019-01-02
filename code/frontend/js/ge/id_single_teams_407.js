/**
 * This class holds methods and variables for user with id 151
 * @returns {{init: init, setView: setView, updateView: updateView}}
 * @constructor
 */
ID_Single_Teams_407 = function () {
    /* The goals list and the element to display the goals in */
    var ELT = "",
        TIMER = null,
        TIMER_MIN = 60, //60
        TIMER_MAX = 80, //80
        OTHER_TAGS = [],
        WORD_HIT_CNTR = 0,
        STATS = {
            t1_wins: 0,
            t2_wins: 0,
            view_type: 'single' // | 'teams'
        },
        TAGS_TO_CREATE = 4,
        USER_WON_THIS_ROUND = false,
        IN_TUTORIAL = false,

        /**
         * Initializes the compare element
         */
        init = function (element) {
            ELT = element;
        },

        /**
         * Sets the view
         */
        setView = function () {
            IN_TUTORIAL = false;
            setIDTeamsSimpleView(false, false);
        },

        addNewTag = function (tag) {
            if (wordInOtherTags(tag)) {
                ++WORD_HIT_CNTR;
                $('#single_teams_407_word_list').append('<li class="pt-3">\n' +
                    '            <button type="button" class="btn bg-dark-gray other_tags_review_fitting">\n' +
                    '            ' + tag + '\n' +
                    '            </button>\n' +
                    '        </li>');
            }

            if (WORD_HIT_CNTR >= TAGS_TO_CREATE) {
                confirmTags(true, false);
            }
        },

        removeNewTag = function (tag) {
            if (wordInOtherTags(tag)) {
                --WORD_HIT_CNTR;
            }
        },

        /**
         * The tutorial view with predefined leaderboard
         */
        setTutorialView = function () {
            IN_TUTORIAL = true;
            setIDTeamsSimpleView(true, false);
        },

        /**
         * Sets the final view, consisting of a leaderboard
         */
        setEndView = function () {
            IN_TUTORIAL = false;
            setIDTeamsSimpleView(false, true);
        },

        /**
         * Sets the view.
         * In this case, there is no view at the beginning.
         * The view gets visible when showing the results.
         * Except when the end page is visible.
         */
        setIDTeamsSimpleView = function (in_tutorial, in_end) {
            getStats();
            WORD_HIT_CNTR = 0;
            if (in_end) {
                $.get('views/mst_id_single_teams_407.html', function (template) {
                    var params = {
                        end_page: true
                    };

                    var rendered = Mustache.render(template, params);
                    $('#' + ELT).html(rendered);
                });
            } else {
                $('#' + ELT).html(
                    '<div style="font-size: large">' +
                    'Deine getroffenen Wörter:' +
                    '<ul id="single_teams_407_word_list" class="list-inline">' +
                    '</ul>' +
                    '</div>'
                );
                setCustomButtonBehavior();
                if (in_tutorial) {
                    // TARGET_TAGS_FOR_THIS_IMAGE = 3;
                    TAGS_TO_CREATE = 3;
                } else {
                    // TARGET_TAGS_FOR_THIS_IMAGE = getRandomNumber(TARGET_TAGS_PER_IMAGE_MIN, TARGET_TAGS_PER_IMAGE_MAX + 1);
                }
            }
        },

        /**
         * Get statistics from cookies
         */
        getStats = function () {
            var t1_wins = getCookie('407_t1_wins');
            var t2_wins = getCookie('407_t2_wins');
            var view_type = getCookie('407_view_type');

            STATS.t1_wins = t1_wins.length > 0 ? Number(t1_wins) : 0;
            STATS.t2_wins = t2_wins.length > 0 ? Number(t2_wins) : 0;
            STATS.view_type = view_type.length > 0 ? view_type : 'single';
            TAGS_TO_CREATE = view_type === 'single' ? 4 : 4;
        },

        /**
         * Stores the statistics to cookies
         */
        storeStats = function () {
            setCookie('407_t1_wins', STATS.t1_wins);
            setCookie('407_t2_wins', STATS.t2_wins);
            setCookie('407_view_type', STATS.view_type);
        },

        /**
         * Starts an opponent's timer
         */
        startOpponentTimer = function () {
            if(!IN_TUTORIAL) {
                printLog('Start opponents timer for 407');
                TIMER = setTimeout(function () {
                    confirmTags(false, false);
                }, getRandomNumber(TIMER_MIN, TIMER_MAX + 1) * 1000);
            }else{
                printLog('Did not start opponents timer for 407 because in tutorial mode.');
            }
        },

        /**
         * stops an opponent's timer
         */
        stopOpponentTimer = function () {
            printLog('Stopping opponents timer for 407');
            clearTimeout(TIMER);
        },

        /**
         * Starts the check for words procedure
         */
        displayWinner = function (user_gave_up, opponent_gave_up) {
            $.get('views/mst_id_single_teams_407.html', function (template) {
                var params = {
                    multiplayer: STATS.view_type === 'multi',
                    singleplayer: STATS.view_type === 'single',
                    end_page: false,
                    t1_win_round: USER_WON_THIS_ROUND,
                    t2_win_round: !USER_WON_THIS_ROUND,
                    t1_wins: STATS.t1_wins,
                    t2_wins: STATS.t2_wins,
                    giving_up: user_gave_up || opponent_gave_up,
                    btn_listener: IN_TUTORIAL ? 'btn_oc_viewTutorialFinished()' : 'btn_oc_postImageTags()'
                };

                var rendered = Mustache.render(template, params);
                $('#' + ELT).append(rendered);
            });
        },

        /**
         * Checks whether the word is in the other words
         * @param tag
         */
        wordInOtherTags = function (tag) {
            for (var i = 0; i < OTHER_TAGS.length; i++) {
                if (OTHER_TAGS[i].tag.toLowerCase() === tag.toLowerCase()) {
                    return true;
                }
            }
            return false;
        },

        /**
         * Sets a custom behavior for the "next button"
         */
        setCustomButtonBehavior = function () {
            var next_btn = $('#next_img');
            next_btn.html('Runde aufgeben');
            next_btn.prop('onclick', null).off('click');
            next_btn.click(function () {
                // Confirm the tags by click
                confirmTags(false, true);
            });
        },

        /**
         * Sets the other tags for this image
         * @param tags
         */
        setOtherTags = function (tags) {
            OTHER_TAGS = tags;
        },

        /**
         * Confirms the tags.
         * @param user_won Did the user won through finding the right words?
         * @param user_gave_up Did the user pressed the "Runde aufgeben" button
         */
        confirmTags = function (user_won, user_gave_up) {
            stopOpponentTimer();
            $('#next_img').html(user_gave_up ? 'Aufgegeben' : 'Runde beendet');
            disableTagFieldAndNextButton();

            // If the user won regularly
            if (user_won) {
                ++STATS.t1_wins;
                USER_WON_THIS_ROUND = true;
            }

            // If the user gave up
            if (user_gave_up) {
                ++STATS.t2_wins;
                USER_WON_THIS_ROUND = false;
            }

            // This should never appear
            if (user_won && user_gave_up) {
                printWarn('User won and gave up at the same time. This should not happen...');
            }

            // The timer ran out
            var opponent_gave_up = false;
            if (!user_won && !user_gave_up) {
                if (Math.random() >= 0.5) {
                    ++STATS.t1_wins;
                    opponent_gave_up = true;
                    USER_WON_THIS_ROUND = true;
                } else {
                    ++STATS.t2_wins;
                    USER_WON_THIS_ROUND = false;
                }
            }

            displayWinner(user_gave_up, opponent_gave_up);
        };

    /**
     * Return the 'public' methods
     */
    return {
        init: init,
        setEndView: setEndView,
        setView: setView,
        addNewTag: addNewTag,
        removeNewTag: removeNewTag,
        setOtherTags: setOtherTags,
        confirmTags: confirmTags,
        storeStats: storeStats,
        startOpponentTimer: startOpponentTimer,
        setTutorialView: setTutorialView
    };
};
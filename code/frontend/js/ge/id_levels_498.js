/**
 * This class holds methods and variables for user with id 151
 * @returns {{init: init, setView: setView, updateView: updateView}}
 * @constructor
 */
ID_levels_498 = function () {
    /* The goals list and the element to display the goals in */
    var ELT = "",
        OTHER_TAGS = [],
        WORD_HIT_CNTR = 0,
        STATS = {
            user_wins: 0,
            user_wins_total: 0,
            opponent_wins: 0,
            level: 1
        },
        LVL_UP=false,
        TAGS_TO_CREATE = 3,
        IN_TUTORIAL = false,
        IN_END = false,

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
            IN_END = false;
            setIDLevelsView(false, false);
        },

        addNewTag = function (tag) {
            if (wordInOtherTags(tag)) {
                ++WORD_HIT_CNTR;
                $('#levels_498_word_list').append('<li class="pt-3">\n' +
                    '            <button type="button" class="btn bg-dark-gray other_tags_review_fitting">\n' +
                    '            ' + tag + '\n' +
                    '            </button>\n' +
                    '        </li>');
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
            setIDLevelsView(true, false);
        },

        /**
         * Sets the final view, consisting of a leaderboard
         */
        setEndView = function () {
            IN_TUTORIAL = false;
            IN_END = true;
            setIDLevelsView(false, true);
        },

        /**
         * Sets the view.
         * In this case, there is no view at the beginning.
         * The view gets visible when showing the results.
         * Except when the end page is visible.
         */
        setIDLevelsView = function () {
            getStats();
            WORD_HIT_CNTR = 0;

            $.get('views/mst_id_levels_498.html', function (template) {
                var params = {
                    level: STATS.level
                };
                var rendered = Mustache.render(template, params);
                $('#' + ELT).html(rendered);

                setCustomButtonBehavior();
                if (IN_TUTORIAL) {
                    TAGS_TO_CREATE = 3;
                    setLeaderboard(true);
                }

                if(IN_END){
                    updateWins();
                    showWinner();
                    setLeaderboard(true);
                }
            });
        },

        /**
         * Get statistics from cookies
         */
        getStats = function () {
            var user_wins = getCookie('498_user_wins');
            var user_wins_total = getCookie('498_user_wins_total');
            var opponent_wins = getCookie('498_opponent_wins');
            var level = getCookie('498_level');

            STATS.user_wins = user_wins.length > 0 ? Number(user_wins) : 0;
            STATS.user_wins_total = user_wins_total.length > 0 ? Number(user_wins_total) : 0;
            STATS.opponent_wins = opponent_wins.length > 0 ? Number(opponent_wins) : 0;
            STATS.level = level.length > 0 ? Number(level) : 1;
        },

        /**
         * Stores the statistics to cookies
         */
        storeStats = function () {
            setCookie('498_user_wins', STATS.user_wins);
            setCookie('498_user_wins_total', STATS.user_wins_total);
            setCookie('498_opponent_wins', STATS.opponent_wins);
            setCookie('498_level', STATS.level);
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
            next_btn.html('Bestätigen');
            next_btn.prop('onclick', null).off('click');
            next_btn.click(function () {
                confirmTags();
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
         * Shows the leaderboard with at total 5 players (including the participant)
         */
        setLeaderboard = function (anim) {
            anim = anim || false;

            setVisible($('#div_it_id_levels_498_lb_div'));

            var username = getCookie('lb_username');
            if (username === "") {
                username = 'Du';
            }

            if (IN_TUTORIAL){
                username = "Du (Bsp.)";
            }

            // Normal point distribution with mean percentage
            var s1 = 14;
            var s2 = 9;
            var s3 = 5;
            var s4 = 2;

            var leaderboard = [
                [s1, 'verdani', '#607cae', 0],
                [STATS.user_wins_total, username, '#5b67f1', 1],
                [s2, 'neo23', '#607cae', 0],
                [s3, 'legolas', '#607cae', 0],
                [s4, 'anork85', '#607cae', 0]
            ];

            var lb = $('#div_it_id_levels_498_lb');
            lb.html('');
            lb.jqBarGraph({
                data: leaderboard,
                animate: anim,
                sort: 'desc'
            });
        },

        updateWins = function(){
            // TODO: test this fix (B_IMGS_LEFT <= 1 sufficient?)
            if(IN_END && B_IMGS_LEFT <= 1 && ADD_IMGS <= 0){
                if(STATS.user_wins >= STATS.opponent_wins){
                    // only if there are games done
                    if(STATS.user_wins + STATS.opponent_wins > 0){
                        ++STATS.level;
                        LVL_UP = true;
                    }
                }else{
                    STATS.level = STATS.level > 1 ? --STATS.level : 1;
                    LVL_UP = false;
                }
                $('#div_it_id_levels_498_level').html(STATS.level);

                STATS.user_wins = 0;
                STATS.opponent_wins = 0;
                storeStats();
            }
        },

        showWinner = function(){
            $.get('views/small_elements/mst_id_levels_498_winner.html', function (template) {
                var user_won = WORD_HIT_CNTR >= TAGS_TO_CREATE;
                var params = {
                    end_page: IN_END,
                    lvl_up : LVL_UP,
                    user_won : user_won,
                    btn_listener: IN_TUTORIAL ? 'btn_oc_viewTutorialFinished()' : 'btn_oc_postImageTags()',
                };

                var rendered = Mustache.render(template, params);
                $('#div_it_id_levels_498_levels_winner_div').html(rendered);
            });
        },

        /**
         * Confirms the tags.
         */
        confirmTags = function () {
            $('#next_img').html('Bestätigt');
            disableTagFieldAndNextButton();

            var user_won = WORD_HIT_CNTR >= TAGS_TO_CREATE;

            if(user_won){
                ++STATS.user_wins;
                ++STATS.user_wins_total;
                if(IN_END || IN_TUTORIAL) {
                    setLeaderboard(false);
                }
            }else{
                ++STATS.opponent_wins;
            }

            updateWins();
            showWinner();
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
        storeStats: storeStats,
        setLeaderboard: setLeaderboard,
        setTutorialView: setTutorialView
    };
};
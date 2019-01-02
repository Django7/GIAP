/**
 * This class holds methods and variables for user with id 151
 * @returns {{init: init, setView: setView, updateView: updateView}}
 * @constructor
 */
ID_Teams_Points_369 = function () {
    /**
     * Return the 'public' methods
     */

    /* The goals list and the element to display the goals in */
    var ELT = "",
        CONFIRMED = [0, 0, 0, 0],
        USER_NAME = "Du",
        USERS = [],
        IN_TUTORIAL = false,
        POINTS_T1 = 0,
        POINTS_T2 = 0,
        OTHER_TAGS = [],

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
            setIDTeamsSimpleView(false, false);
        },

        /**
         * The tutorial view with predefined leaderboard
         */
        setTutorialView = function () {
            IN_TUTORIAL = true;
            USERS = ["Du", "Beispiel-Spieler 1", "Beispiel-Spieler 2", "Beispiel-Spieler 3"];
            setIDTeamsSimpleView(true, false);
        },

        /**
         * Sets the final view, consisting of a leaderboard
         */
        setEndView = function () {
            setIDTeamsSimpleView(false, true);
        },

        /**
         * Shuffles the players
         */
        shufflePlayers = function () {
            USERS = shuffleArray(["verdani", "legolas", "anork85", USER_NAME]);
            setCookie('t_p_players', USERS.join(','));
            POINTS_T1 = 0;
            setCookie('t_p_wins_t1', 0);
            POINTS_T2 = 0;
            setCookie('t_p_wins_t2', 0);
        },

        /**
         * Store the statistics to the cookies
         */
        storeStats = function () {
            setCookie('t_p_players', USERS.join(','));
            setCookie('t_p_wins_t1', POINTS_T1);
            setCookie('t_p_wins_t2', POINTS_T2);
        },

        /**
         * Get the statistics from the cookies
         */
        getStats = function () {
            USER_NAME = getCookie('lb_username');
            if(USER_NAME.length === 0){
                USER_NAME = 'Du';
            }
            USERS = getCookie('t_p_players').split(',');
            if (USERS.length !== 4) {
                shufflePlayers();
            }
            POINTS_T1 = getCookie('t_p_wins_t1');
            POINTS_T1 = POINTS_T1 === 0 ? 0 : Number(POINTS_T1);
            POINTS_T2 = getCookie('t_p_wins_t2');
            POINTS_T2 = POINTS_T2 === 0 ? 0 : Number(POINTS_T2);
        },

        /**
         * Sets the view.
         * In this case, there is nothing to view.
         * The view appears after confirming the words
         */
        setIDTeamsSimpleView = function (in_tutorial, in_end) {
            CONFIRMED = [0, 0, 0, 0];

            // If there is no user, there can't also be no points --> get from the cookies
            if (USERS.length === 0) {
                getStats();
            }

            setCustomButtonBehavior();

            // if in end show the endscreen
            if (in_end) {
                $.get('views/mst_id_teams_points_369.html', function (template) {
                    var rendered = Mustache.render(template, {end_page: true});
                    $('#' + ELT).html(rendered);
                });
            }

        },

        /**
         * Sets the player timer after the user confirmed his tags
         */
        setPlayersTimers = function () {
            // player, verdani, legolas, anork
            var t1 = getRandomNumber(0, 1000);   // 0-1 seconds
            var t2 = getRandomNumber(0, 2500);  // 0-5 seconds
            var t3 = getRandomNumber(0, 2500);  // 0-5 seconds
            var t4 = getRandomNumber(0, 2500);  // 0-5 seconds

            // Set the users to confirmed
            setToConfirmed('teams_points_t1_p1_state', t1, 0);
            setToConfirmed('teams_points_t1_p2_state', t2, 1);
            setToConfirmed('teams_points_t2_p1_state', t3, 2);
            setToConfirmed('teams_points_t2_p2_state', t4, 3);
        },

        /**
         * Changes the text of the players to "bestätigt"
         * @param elt
         * @param time
         * @param id
         */
        setToConfirmed = function (elt, time, id) {
            setTimeout(function () {
                $('#' + elt).html('bestätigt');
                CONFIRMED[id] = 1;
                if (allConfirmed()) {
                    showNewPoints();
                }
            }, time);
        },

        /**
         * Starts the check for words procedure
         */
        displayTeams = function () {
            $.get('views/mst_id_teams_points_369.html', function (template) {
                var params = {
                    points_t1: POINTS_T1,
                    points_t2: POINTS_T2,
                    t1_p1_name: USERS[0],
                    t1_p2_name: USERS[1],
                    t2_p1_name: USERS[2],
                    t2_p2_name: USERS[3]
                };

                var rendered = Mustache.render(template, params);
                $('#' + ELT).html(rendered);

                setVisible($('#teams_points_winner_round_loader'));
                setPlayersTimers();
            });
        },

        /**
         * Shows the new points
         */
        showNewPoints = function(){
            setInvisible($('#teams_points_winner_round_loader'));

            var tags = $("#myTags").tagit("assignedTags");
            var tags_hit = 0;
            for (var i = 0; i < tags.length; i++) {
                if (wordInOtherTags(tags[i])) {
                    ++tags_hit;
                }
            }
            printLog('Number of words hit: ' + tags_hit);

            // calculate points for the teams
            var tags_user = tags_hit === 0 ? -3 : tags_hit;
            // 0-5 hits if the user made no hit
            // 1-5 if the user hit at least one word
            var tags_opponents = tags_user > 0 ? getRandomNumber(1, 6) : getRandomNumber(0, 8) - 2; // 0 - 5 hits (with 3/8 probability of getting 0 hits)
            tags_opponents = tags_opponents <= 0 ? -3 : tags_opponents;

            if (USERS.indexOf(USER_NAME) <= 2) {
                increasePoints(1, tags_user);
                increasePoints(2, tags_opponents);
            } else {
                increasePoints(1, tags_opponents);
                increasePoints(2, tags_user);
            }

            var $teams_pts_t1_points = $('#teams_pts_t1_points');
            var pts_before_t1 = $teams_pts_t1_points.html();
            $teams_pts_t1_points.html(POINTS_T1);
            if(Number(pts_before_t1) < POINTS_T1){
                $('#teams_pts_t1').addClass('font-green');
            }else{
                $('#teams_pts_t1').addClass('font-red');
            }

            var $teams_pts_t2_points = $('#teams_pts_t2_points');
            var pts_before_t2 = $teams_pts_t2_points.html();
            $teams_pts_t2_points.html(POINTS_T2);
            if(Number(pts_before_t2) < POINTS_T2){
                $('#teams_pts_t2').addClass('font-green');
            }else{
                $('#teams_pts_t2').addClass('font-red');
            }

            if(POINTS_T1 >= 10  ||  POINTS_T2 >= 10){
                setVisible($('#teams_points_shuffle_teams'));
                shufflePlayers();
            }

            setVisible($('#next_img_teams_points'));
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
         * Increases the win counter for the team with the specified team id
         * @param team_id
         * @param pts_to_add
         */
        increasePoints = function (team_id, pts_to_add) {
            if (team_id === 1) {
                POINTS_T1 += pts_to_add;
            } else {
                POINTS_T2 += pts_to_add;
            }
        },

        /**
         * Check whether all users confirmed their tags
         * @returns {boolean}
         */
        allConfirmed = function () {
            for (var i = 1; i < CONFIRMED.length; i++) {
                if (CONFIRMED[i] !== 1) {
                    return false;
                }
            }
            return true;
        },

        /**
         * Sets a custom behavior for the "next button"
         */
        setCustomButtonBehavior = function () {
            var next_btn = $('#next_img');
            next_btn.html('Bestätigen');
            next_btn.prop('onclick', null).off('click');
            next_btn.click(function () {
                confirmTags()
            });
        },

        /**
         * Confirm the user tags
         */
        confirmTags = function(){
            $('#next_img').html('Bestätigt');
            disableTagFieldAndNextButton();
            displayTeams();
        },

        /**
         * Sets the other tags for this image
         * @param tags
         */
        setOtherTags = function (tags) {
            OTHER_TAGS = tags;
        };

    return {
        init: init,
        setEndView: setEndView,
        setView: setView,
        setOtherTags: setOtherTags,
        storeStats: storeStats,
        setTutorialView: setTutorialView,
        confirmTags: confirmTags
    };
};
/**
 * This class holds methods and variables for user with id 151
 * @returns {{init: init, setView: setView, updateView: updateView}}
 * @constructor
 */
ID_Teams_Simple_104 = function () {
    /* The goals list and the element to display the goals in */
    var ELT = "",
        CONFIRMED = [0, 0, 0, 0],
        TARGET_TAGS_PER_IMAGE = 3,
        TIMER = null,
        TIMER_MAX = 90,
        IN_TUTORIAL = false,
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
            setIDTeamsSimpleView(true, false);
        },

        /**
         * Sets the final view, consisting of a leaderboard
         */
        setEndView = function () {
            setIDTeamsSimpleView(false, true);
        },

        /**
         * Starts the countdown timer
         */
        startTimer = function () {
            if (IN_TUTORIAL) {
                printLog('Do not start timer for 104, because in tutorial mode');
            } else {
                printLog('Starting timer for 104 for seconds: ' + TIMER_MAX);
                timerTick(TIMER_MAX);
            }
        },

        /**
         * A single timer tick.
         * Updates the seconds in the view and checks whether the tags should get confirmed (--> Proceed)
         * @param cntr
         */
        timerTick = function (cntr) {
            $('#teams_simple_timer').html(cntr);
            // Recursive break
            if (cntr <= 0) {
                // confirm the tags by timeout
                confirmTags();
                return;
            }
            TIMER = setTimeout(function () {
                $('#teams_simple_timer').html(cntr - 1);
                timerTick(cntr - 1);
            }, 1000);
        },

        /**
         * Stops the timer
         */
        stopTimer = function () {
            printLog('Stopping timer for 104');
            clearTimeout(TIMER);
        },

        /**
         * Gets the wins from the cookies and sets them accordingly
         */
        updateWins = function () {
            var t1 = getCookie('t_s_wins_t1');
            t1 = t1.length === 0 ? "0" : t1;
            var t2 = getCookie('t_s_wins_t2');
            t2 = t2.length === 0 ? "0" : t2;

            $('#teams_simple_t1_wins').html(t1);
            $('#teams_simple_t2_wins').html(t2);
        },

        /**
         * Sets the view
         */
        setIDTeamsSimpleView = function (in_tutorial, in_end) {
            CONFIRMED = [0, 0, 0, 0];
            $.get('views/mst_id_teams_simple_104.html', function (template) {
                var params = {};
                var uname = getCookie('lb_username');
                if (uname.length === 0) {
                    uname = "Du";
                }

                if (in_tutorial) {
                    params = {
                        t1_p1_name: uname,
                        t1_p2_name: "Beispiel-Spieler 1",
                        t2_p1_name: "Beispiel-Spieler 2",
                        t2_p2_name: "Beispiel-Spieler 3"
                    }
                } else {
                    params = {
                        t1_p1_name: uname,
                        t1_p2_name: "verdani",
                        t2_p1_name: "legolas",
                        t2_p2_name: "anork85"
                    }
                }

                // if in the end condition
                if (in_end) {
                    setInvisible($('#teams_simple_timer_div'));
                    var winner = "unentschieden";
                    var t1 = Number(getCookie('t_s_wins_t1'));
                    var t2 = Number(getCookie('t_s_wins_t2'));

                    // Set the winner
                    if (t1 > t2) {
                        winner = 'Team 1';
                        params['winner_1'] = uname;
                        params['winner_2'] = 'verdani';
                    } else if (t2 > t1) {
                        winner = 'Team 2';
                        params['winner_1'] = 'legolas';
                        params['winner_2'] = 'anork85';
                    } else {
                        params['winner_1'] = uname + ' + verdani';
                        params['winner_2'] = 'legolas + anork85';
                    }

                    params['end_page'] = true;
                    params['winner'] = winner;
                }

                // Set Custom behavior
                setCustomButtonBehavior();

                var rendered = Mustache.render(template, params);
                $('#' + ELT).html(rendered);

                // Update the teams wins
                updateWins();
            });
        },

        /**
         * Sets the player timer after the user confirmed his tags
         */
        setPlayersTimers = function () {
            // player, verdani, legolas, anork
            var t1 = getRandomNumber(0, 1000);   // 0-1 seconds
            var t2 = getRandomNumber(0, 8000);  // 0-8 seconds
            var t3 = getRandomNumber(0, 8000);  // 0-8 seconds
            var t4 = getRandomNumber(0, 8000);  // 0-8 seconds

            // Set the users to confirmed
            setToConfirmed('teams_simple_t1_p1_state', t1, 0);
            setToConfirmed('teams_simple_t1_p2_state', t2, 1);
            setToConfirmed('teams_simple_t2_p1_state', t3, 2);
            setToConfirmed('teams_simple_t2_p2_state', t4, 3);
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
                    startCheckForWords();
                }
            }, time);
        },

        /**
         * Starts the check for words procedure
         */
        startCheckForWords = function () {
            // sets the timer to invisible
            $('#teams_simple_timer_div').css('visibility', 'hidden');
            // setInvisible($('#teams_simple_timer_div'));

            var $loader = $('#teams_simple_winner_round_loader');
            setVisible($loader);
            var random_timer = getRandomNumber(1000, 1500);
            setTimeout(function () {
                setInvisible($loader);

                // check whether team 1 or team 2 won
                var str = "";
                var tags = $("#myTags").tagit("assignedTags");


                var tags_hit = 0;
                for (var i = 0; i < tags.length; i++) {
                    if (wordInOtherTags(tags[i])) {
                        ++tags_hit;
                    }
                }
                printLog('Number of words hit: ' + tags_hit);

                var words_t1 = -1;
                var words_t2 = -1;
                if (tags_hit >= TARGET_TAGS_PER_IMAGE) {
                    printLog('Team 1 won');
                    str = "<strong>Team 1</strong>";
                    increaseWinCounter(1);
                    words_t1 = Math.random() >= 0.5 ? 2 * tags_hit : 2 * tags_hit - 1;
                } else {
                    printLog('Team 2 won');
                    increaseWinCounter(2);
                    str = "<strong>Team 2</strong>";
                    words_t2 = getRandomNumber(4, 11);
                }

                if (words_t1 === -1) {
                    words_t1 = words_t2 - getRandomNumber(1, 4);
                }else if(words_t2){
                    words_t2 = words_t1 - getRandomNumber(1, 4);
                }

                $('#teams_simple_words_t1').html(words_t1);
                $('#teams_simple_words_t2').html(words_t2);
                $('#teams_simple_winner_round').html(str);
                setVisible($('#teams_simple_winner_round_div'));
                updateWins();
            }, random_timer);
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
         */
        increaseWinCounter = function (team_id) {
            var cntr = getCookie('t_s_wins_t' + team_id);
            if (cntr.length > 0 && cntr !== 'undefined') {
                cntr = Number(cntr);
            } else {
                cntr = 0;
            }
            ++cntr;
            setCookie('t_s_wins_t' + team_id, cntr);
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
                // Confirm the tags by click
                stopTimer();
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
         * Confirms the tags.
         */
        confirmTags = function () {
            $('#next_img').html('Bestätigt');
            disableTagFieldAndNextButton();

            // Set the team elements to visible
            setVisible($('#teams_simple_teams'));

            // start the players counter
            setPlayersTimers();
        };

    /**
     * Return the 'public' methods
     */
    return {
        init: init,
        setEndView: setEndView,
        setView: setView,
        setOtherTags: setOtherTags,
        startTimer: startTimer,
        confirmTags: confirmTags,
        setTutorialView: setTutorialView
    };
};
/**
 * This class holds methods and variables for user with id 125
 * @returns {{init: init, setView: setView, updateView: updateView}}
 * @constructor
 */
ID_Points_Review_125 = function () {
    /* The goals list and the element to display the goals in */
    var ELT = "",
        POINTS = 0,
        USER_TAGS = [],
        OTHER_PLAYERS_TAGS = [],
        TIMER_MAX = 90,
        IN_TUTORIAL = false,
        IN_END = false,
        TIMER = null,
        PLAYERS = 3,

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

            setIDPointsReviewView(false);
            USER_TAGS = [];
        },

        /**
         * Sets the other users tags
         * @param tags
         */
        setOtherPlayersTags = function (tags) {
            OTHER_PLAYERS_TAGS = tags;
        },

        /**
         * Displays the list to review
         */
        displayOtherPlayersTags = function (in_tutorial) {
            setVisible($('#div_it_id_points_review_other_tags'));
            $.get('views/small_elements/mst_id_points_review_125_table.html', function (template) {
                var params = {};

                if (in_tutorial) {
                    params.other_tags = OTHER_PLAYERS_TAGS;
                } else {
                    var tags_to_display = [];
                    for (var i = 0; i < OTHER_PLAYERS_TAGS.length; i++) {
                        var found = false;
                        for (var j = 0; j < USER_TAGS.length; j++) {
                            if (OTHER_PLAYERS_TAGS[i].tag.toLowerCase() === USER_TAGS[j].tag.toLowerCase()) {
                                found = true;
                            }
                        }
                        if (!found) {
                            tags_to_display.push({tag: OTHER_PLAYERS_TAGS[i].tag});
                        }
                    }

                    // Vary in number of tags
                    var num_of_tags = getRandomNumber(4, 12);
                    if (num_of_tags > tags_to_display.length) {
                        num_of_tags = tags_to_display.length;
                    }

                    // Splice the number to the right amount
                    tags_to_display.splice(num_of_tags);

                    // Set the tags
                    params.other_tags = tags_to_display;
                }

                if (params.other_tags.length > 0) {
                    params['tags_present'] = true;
                }

                var rendered = Mustache.render(template, params);
                $('#div_it_id_points_review_table').html(rendered);
                $('.other_tags_review_fitting').click(function (event) {
                    oc_toggleFittingElement($(event.target));
                });
            });
        },

        /**
         * Adds a new tag typed in by the user
         */
        addNewTag = function (tag) {
            USER_TAGS.push({tag: tag});
        },

        /**
         * Removes a new tag removed by the user
         */
        removeNewTag = function (tag) {
            var tag_index = -1;
            for (var i = 0; i < USER_TAGS.length; i++) {
                if (USER_TAGS[i].tag === tag) {
                    tag_index = i;
                    break; // Can you feel the performance improvement? "woooow" - Owen Wilson
                }
            }

            // Remove the tag from the array, if existing
            if (tag_index !== -1) {
                USER_TAGS.splice(tag_index, 1);
            } else {
                printWarn("Tried to delete non existing element from tag list for concept 125.");
            }
        },

        /**
         * The tutorial view with predefined leaderboard
         */
        setTutorialView = function () {
            IN_TUTORIAL = true;
            setIDPointsReviewView(true);
        },

        /**
         * Updates the points view
         */
        updatePoints = function (points, add_pts) {
            POINTS = points;

            if (add_pts !== -1 && add_pts !== "undefined") {
                POINTS += add_pts;
                $('#div_it_id_points_review_points').html('Punkte: ' + POINTS + " (+ " + add_pts + ")");
            } else {
                $('#div_it_id_points_review_points').html('Punkte: ' + POINTS);
            }

            setVisible($('#id_points_review_125_place_annotation'));

            var string = 'dritten';
            if (POINTS >= 30 && POINTS < 102) {
                string = 'zweiten';
            } else if (POINTS >= 102) {
                string = 'ersten';
            }

            $('#id_points_review_125_place').html(string);
        },

        /**
         * Sets the final view, consisting of a leaderboard
         */
        setEndView = function () {
            IN_END = true;
            setIDPointsReviewView(false, true);
        },

        /**
         * Toggles the fitting element (selected or not)
         */
        oc_toggleFittingElement = function (elt) {
            if (elt.is('span')) {
                elt = elt.parent();
            }

            if (elt.hasClass('other_tags_review_fitting_selected')) {
                elt.removeClass('other_tags_review_fitting_selected');
            } else {
                elt.addClass('other_tags_review_fitting_selected');
            }

            elt.blur();
        },

        /**
         * Sets the points cookies
         */
        storePoints = function () {
            setCookie('125_points', POINTS);
        },

        /**
         * Starts the countdown timer
         */
        startTimer = function () {
            if (IN_TUTORIAL || IN_END) {
                printLog('Do not start timer for 125, because in tutorial/end mode');
            } else {
                printLog('Starting timer for 125 for seconds: ' + TIMER_MAX);
                timerTick(TIMER_MAX);
            }
        },

        /**
         * A single timer tick.
         * Updates the seconds in the view and checks whether the tags should get confirmed (--> Proceed)
         * @param cntr
         */
        timerTick = function (cntr) {
            $('#points_review_125_timer').html(cntr);
            // Recursive break
            if (cntr <= 0) {
                // confirm the tags by timeout
                confirmTags();
                return;
            }
            TIMER = setTimeout(function () {
                $('#points_review_125_timer').html(cntr - 1);
                timerTick(cntr - 1);
            }, 1000);
        },

        /**
         * Stops the timer
         */
        stopTimer = function () {
            printLog('Stopping timer for 125');
            clearTimeout(TIMER);
        },

        /**
         * Sets the view
         */
        setIDPointsReviewView = function (in_tutorial, in_end) {
            if (POINTS === 0) {
                var cpts = getCookie('125_points');
                if (cpts === '0' || cpts.length === 0) {
                    if (!in_tutorial) {
                        getMyTagCount();
                    }
                } else {
                    POINTS = Number(cpts);
                }
            }

            $.get('views/mst_id_points_review_125.html', function (template) {
                var params = {};
                if (in_end) {
                    params['final_view'] = true;
                    params['end_page'] = true;
                }
                var rendered = Mustache.render(template, params);
                $('#' + ELT).html(rendered);

                setCustomButtonBehavior();

                if (in_tutorial) {
                    updatePoints(12, -1);
                } else {
                    updatePoints(POINTS, -1);
                }
            });
        },

        /**
         * The handler for the "Bewerten" button
         */
        btn_oc_rate = function () {
            // disable the rating table
            $('#div_it_id_points_review_table').find('*').attr('disabled', true);

            // Wait for other players

            setVisible($('#points_review_125_waiting_div'));

            // Disable the "Bewerten" button
            $('#next_img_points_rate').attr('disabled', true);

            // Set the timeout to wait for other players.
            // Wait for 5-10 seconds and then activate the button
            setTimeout(function () {
                // Set the waiting text to "Fertig"
                $('#points_review_125_waiting').html('Fertig.');

                // Activate the button
                $('#next_img_points_review').attr('disabled', false);

                // Update the user's points
                var pts = getCorrelationPoints();
                updatePoints(POINTS, pts);

            }, getRandomNumber(5000, 10000));
        },

        /**
         * Gets the additional points, based on the number of correlations with other players
         */
        getCorrelationPoints = function () {
            var add_pts = 0;
            for (var i = 0; i < OTHER_PLAYERS_TAGS.length; i++) {
                var wother = OTHER_PLAYERS_TAGS[i];
                for (var j = 0; j < USER_TAGS.length; j++) {
                    var wuser = USER_TAGS[j];

                    // If there is a correlation, the user gets some bonus points for it
                    if (wuser.tag.toLowerCase() === wother.tag.toLowerCase()) {
                        add_pts += (wuser.tag.length % PLAYERS) + 1;
                    }
                }
            }
            return add_pts;
        },

        /**
         * Sets a custom behavior for the "next button"
         */
        setCustomButtonBehavior = function () {
            var next_btn = $('#next_img');
            next_btn.html('Bestätigen');
            next_btn.prop('onclick', null).off('click');
            next_btn.click(function () {
                stopTimer();
                confirmTags();
            });
        },

        /**
         * Confirming the tags, i.e., triggering the list to appear
         */
        confirmTags = function(){
            var next_btn = $('#next_img');
            next_btn.html('Bestätigt');
            setInvisible($('#points_review_125_timer_div'));
            disableTagFieldAndNextButton();
            displayOtherPlayersTags();
        };

    /**
     * Return the 'public' methods
     */
    return {
        init: init,
        addNewTag: addNewTag,
        removeNewTag: removeNewTag,
        setOtherPlayersTags: setOtherPlayersTags,
        displayOtherPlayersTags: displayOtherPlayersTags,
        setEndView: setEndView,
        setView: setView,
        startTimer: startTimer,
        storePoints: storePoints,
        updatePoints: updatePoints,
        setTutorialView: setTutorialView,
        btn_oc_rate: btn_oc_rate
    };
};
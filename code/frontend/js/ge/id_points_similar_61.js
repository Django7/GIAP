/**
 * This class holds methods and variables for user with id 125
 * @returns {{init: init, setView: setView, updateView: updateView}}
 * @constructor
 */
ID_Points_Similar_61 = function () {
    /* The goals list and the element to display the goals in */
    var ELT = "",
        POINTS = 0,
        OTHER_PLAYERS_TAGS = [],
        MEAN_OF_TAGS = 0,
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

            setIDPointsSimilarView(false);
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
            setVisible($('#div_it_id_points_similar_61_other_tags'));
            $.get('views/small_elements/mst_id_points_similar_61_table.html', function (template) {

                var num_to_display = Math.ceil(MEAN_OF_TAGS);

                var params = {
                    mean: MEAN_OF_TAGS,
                    mean_round: num_to_display,
                    count: $("#myTags").tagit("assignedTags").length
                };

                if (in_tutorial) {
                    params.other_tags = OTHER_PLAYERS_TAGS;
                } else {
                    var tags_to_display = [];
                    for (var i = 0; i < num_to_display; i++) {
                        if (i < OTHER_PLAYERS_TAGS.length) {
                            tags_to_display.push({tag: OTHER_PLAYERS_TAGS[i].tag});
                        }
                    }
                    // Set the tags
                    params.other_tags = tags_to_display;
                }

                var rendered = Mustache.render(template, params);
                $('#div_it_id_points_similar_61_table').html(rendered);
            });
        },

        /**
         * Adds a new tag typed in by the user
         */
        addNewTag = function () {
            updatePoints(POINTS + 1);
        },

        /**
         * Removes a new tag removed by the user
         */
        removeNewTag = function () {
            updatePoints(POINTS - 1);
        },

        /**
         * The tutorial view with predefined leaderboard
         */
        setTutorialView = function () {
            IN_TUTORIAL = true;
            setIDPointsSimilarView(true, false);
        },

        /**
         * Updates the points view
         */
        updatePoints = function (points) {
            POINTS = points;
            $('#div_it_id_points_similar_61_points').html('Wörter: ' + POINTS);
            setLeaderboard();
        },

        /**
         * Sets the final view, consisting of a leaderboard
         */
        setEndView = function () {
            IN_END = true;
            setIDPointsSimilarView(false, true);
        },

        /**
         * Sets the points cookies
         */
        storePoints = function () {
            setCookie('61_points', POINTS);
        },

        /**
         * Sets the view
         */
        setIDPointsSimilarView = function (in_tutorial, in_end) {
            MEAN_OF_TAGS = getRandomNumber(400, 800) / 100;

            if (POINTS === 0) {
                var cpts = getCookie('61_points');
                if (cpts === '0' || cpts.length === 0) {
                    if (!in_tutorial) {
                        getMyTagCount();
                    }
                } else {
                    POINTS = Number(cpts);
                }
            }

            $.get('views/mst_id_points_similar_61.html', function (template) {
                var params = {};
                if (in_end) {
                    params['final_view'] = true;
                    params['end_page'] = true;
                }
                var rendered = Mustache.render(template, params);
                $('#' + ELT).html(rendered);


                setCustomButtonBehavior();

                if (in_tutorial) {
                    updatePoints(14);
                } else {
                    updatePoints(POINTS);
                }

                if (in_end) {
                    setLeaderboard();
                }
            });
        },

        /**
         * Shows the leaderboard with at total 5 players (including the participant)
         */
        setLeaderboard = function () {

            var username = getCookie('lb_username');
            if (username === "") {
                username = 'Du';
            }

            if (IN_TUTORIAL) {
                username = "Du (Bsp.)";
            }

            var s1 = 102;
            var s2 = 61;
            var s3 = 29;
            var s4 = 11;

            var leaderboard = [
                [s1, 'verdani', '#607cae', 0],
                [POINTS, username, '#5b67f1', 1],
                [s2, 'neo23', '#607cae', 0],
                [s3, 'legolas', '#607cae', 0],
                [s4, 'anork85', '#607cae', 0]
            ];

            var lb = $('#div_it_points_similar_61');
            lb.html('');
            lb.jqBarGraph({
                data: leaderboard,
                animate: true,
                sort: 'desc',
                height: 200,
                width: 370
            });
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
         * Confirming the tags, i.e., triggering the list to appear
         */
        confirmTags = function () {
            var next_btn = $('#next_img');
            next_btn.html('Bestätigt');
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
        storePoints: storePoints,
        updatePoints: updatePoints,
        setTutorialView: setTutorialView,
        updateLeaderboard: setLeaderboard
    };
};
/**
 * This class holds methods and variables for user with id 51
 * @returns {{init: init, setView: setView, updateView: updateView}}
 * @constructor
 */
ID_Beat_Friend_51 = function () {
    /* The goals list and the element to display the goals in */
    var ELT = "",
        POINTS = 0,
        OTHER_PLAYERS_TAGS = [],
        IN_TUTORIAL = false,
        IN_END = false,
        DISTINCT_MOODS = 0,

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
        },

        /**
         * Sets the other users tags
         * @param tags
         */
        setOtherPlayersTags = function (tags) {
            OTHER_PLAYERS_TAGS = tags;
        },

        /**
         * Shuffles the array and returns the first three elements
         * @returns {*|T[]}
         */
        get3RandomWordsToLike = function () {
            return shuffleArray(OTHER_PLAYERS_TAGS).splice(0, 3);
        },

        /**
         * Returns the number of moods that are equal to other users
         * @returns {number}
         */
        getNumberOfSameMoods = function () {
            var counter = 0;
            var tags = $("#myTags").tagit("assignedTags");
            for (var i = 0; i < tags.length; i++) {
                for (var j = 0; j < OTHER_PLAYERS_TAGS.length; j++) {
                    if (tags[i].toLowerCase() === OTHER_PLAYERS_TAGS[j].tag.toLowerCase()) {
                        counter += OTHER_PLAYERS_TAGS[j].num;
                    }
                }
            }
            return counter;
        },

        /**
         * Sets the number of distinct moods for this image
         * @param num
         */
        setDistinctMoods = function(num){
            DISTINCT_MOODS = num;
        },

        /**
         * Displays the list to review
         */
        displayStatistics = function () {
            $.get('views/small_elements/mst_id_beat_friend_51_table.html', function (template) {
                // Update points
                POINTS += $("#myTags").tagit("assignedTags").length;

                var params = {
                    end_page: IN_END,
                    different_moods_count: DISTINCT_MOODS,
                    points: POINTS,
                    same_mood_count: getNumberOfSameMoods(),
                    other_tags: get3RandomWordsToLike()
                };

                // Render the statistics, print them and activate the buttons
                var rendered = Mustache.render(template, params);
                $('#beat_friend_ranking_etc').html(rendered);
                $('.other_tags_review_fitting').click(function (event) {
                    oc_toggleFittingElement($(event.target));
                });

                var username = getCookie('lb_username');
                username = username === "" ? 'Du' : username;

                if(IN_TUTORIAL){
                    username = "Du (Bsp.)";
                }

                // Display the ranking
                var leaderboard = [
                    [102, 'verdani', '#607cae', 0],
                    [POINTS, username, '#5b67f1', 1],
                    [60, 'neo23', '#607cae', 0],
                    [29, 'legolas', '#607cae', 0],
                    [11, 'anork85', '#607cae', 0]
                ];

                var lb = $('#div_it_id_beat_friend_51_lb');
                lb.html('');
                lb.jqBarGraph({
                    data: leaderboard,
                    animate: true,
                    sort: 'desc',
                    height: 200,
                    width: 370
                });
            });
        },

        /**
         * Adds a new tag typed in by the user
         */
        addNewTag = function (tag) {
        },

        /**
         * Removes a new tag removed by the user
         */
        removeNewTag = function (tag) {
        },

        /**
         * The tutorial view with predefined leaderboard
         */
        setTutorialView = function () {
            IN_TUTORIAL = true;
            POINTS = 0;
            setIDPointsReviewView(true);
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
            setCookie('51_points', POINTS);
        },

        /**
         * Sets the view
         */
        setIDPointsReviewView = function (in_tutorial, in_end) {
            if (POINTS === 0) {
                var cpts = getCookie('51_points');
                if (cpts === '0' || cpts.length === 0) {
                    if (!in_tutorial) {
                        getMyTagCount();
                    }
                } else {
                    POINTS = Number(cpts);
                }
            }

            $.get('views/mst_id_beat_friend_51.html', function (template) {
                var params = {
                    points: POINTS,
                    end_page: in_end
                };
                var rendered = Mustache.render(template, params);
                $('#' + ELT).html(rendered);

                setCustomButtonBehavior();

                // Set a random number of avg images
                $('#beat_friend_moods_avg').html(getRandomNumber(200, 700) / 100);

                // if in end page, directly print the ranking
                if (in_end) {
                    confirmTags();
                }
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
         * Sets the points.
         * Used for when there is a need to get it from the server
         */
        setPoints = function (pts) {
            POINTS = pts;
        },

        /**
         * Confirming the tags, i.e., triggering the list to appear
         */
        confirmTags = function () {
            var next_btn = $('#next_img');
            next_btn.html('Bestätigt');
            disableTagFieldAndNextButton();
            displayStatistics();
        };

    /**
     * Return the 'public' methods
     */
    return {
        init: init,
        addNewTag: addNewTag,
        removeNewTag: removeNewTag,
        setOtherPlayersTags: setOtherPlayersTags,
        displayOtherPlayersTags: displayStatistics,
        setEndView: setEndView,
        setView: setView,
        storePoints: storePoints,
        setTutorialView: setTutorialView,
        setPoints: setPoints,
        viewStatistics: displayStatistics,
        setDistinctMoods: setDistinctMoods
    };
};
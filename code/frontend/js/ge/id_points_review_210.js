/**
 * This class holds methods and variables for user with id 151
 * @returns {{init: init, setView: setView, updateView: updateView}}
 * @constructor
 */
ID_Points_Review_210 = function () {
    /* The goals list and the element to display the goals in */
    var ELT = "",
        POINTS = 0,
        USER_TAGS = [],
        OTHER_PLAYERS_TAGS = [],
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
            $.get('views/small_elements/mst_id_points_review_210_table.html', function (template) {
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
                    var num_of_tags = getRandomNumber(1, 8);
                    if (num_of_tags > tags_to_display.length) {
                        num_of_tags = tags_to_display.length;
                    }

                    // Splice the number to the right amount
                    var popup_1 = num_of_tags < tags_to_display.length ? tags_to_display[num_of_tags] : "undefined";
                    var popup_2 = num_of_tags + 1 < tags_to_display.length ? tags_to_display[num_of_tags + 1] : "undefined";
                    tags_to_display.splice(num_of_tags);

                    // First random popup
                    if (popup_1 !== "undefined" && Math.random() >= 0.5) {
                        setTimeout(function () {
                            $('#points_210_list').append('<li id="points_review_210_pop_1" class="pt-3"><button type="button" class="btn bg-dark-gray other_tags_review_fitting">' + popup_1.tag + ' <span class="glyphicon glyphicon-ok"></span></button></li>');
                            $('#points_review_210_pop_1').click(function (event) {
                                oc_toggleFittingElement($(event.target));
                            });
                        }, getRandomNumber(1000, 4000));
                    }

                    // Second random popup
                    if (popup_2 !== "undefined" && Math.random() >= 0.5) {
                        setTimeout(function () {
                            $('#points_210_list').append('<li id="points_review_210_pop_2" class="pt-3"><button type="button" class="btn bg-dark-gray other_tags_review_fitting">' + popup_2.tag + ' <span class="glyphicon glyphicon-ok"></span></button></li>');
                            $('#points_review_210_pop_2').click(function (event) {
                                oc_toggleFittingElement($(event.target));
                            });
                        }, getRandomNumber(1000, 4000));
                    }

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
                printWarn("Tried to delete non existing element from tag list for concept 210.");
            }
        },

        /**
         * The tutorial view with predefined leaderboard
         */
        setTutorialView = function () {
            setIDPointsReviewView(true);
        },

        /**
         * Updates the points view.
         * @param points: The basic points to display
         * @param add_pts: The additional points through correlation
         */
        updatePoints = function (points, add_pts) {
            POINTS = points;

            if (add_pts !== -1 && add_pts !== "undefined") {
                POINTS += add_pts;
                $('#div_it_id_points_review_points').html('Punkte: ' + POINTS + " (+ " + add_pts + ")");
            } else {
                $('#div_it_id_points_review_points').html('Punkte: ' + POINTS);
            }


            setVisible($('#id_points_review_210_place_annotation'));

            var string = 'dritten';
            if (POINTS >= 30 && POINTS < 102) {
                string = 'zweiten';
            } else if (POINTS >= 102) {
                string = 'ersten';
            }

            $('#id_points_review_210_place').html(string);
        },

        /**
         * Sets the final view, consisting of a leaderboard
         */
        setEndView = function () {
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
            setCookie('210_points', POINTS);
        },

        /**
         * Sets the view
         */
        setIDPointsReviewView = function (in_tutorial, in_end) {
            if (POINTS === 0) {
                var cpts = getCookie('210_points');
                if (cpts === '0' || cpts.length === 0) {
                    if (!in_tutorial) {
                        getMyTagCount();
                    }
                } else {
                    POINTS = Number(cpts);
                }
            }

            $.get('views/mst_id_points_review_210.html', function (template) {
                var params = {};
                if (in_end) {
                    params['final_view'] = true;
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
                        add_pts += (wuser.tag.length % PLAYERS);
                    }
                }
            }
            return add_pts;
        },

        /**
         * Calculates and displays the points
         */
        calculateAndDisplayPoints = function () {
            var next_btn = $('#next_img');
            var pts = getCorrelationPoints();
            updatePoints(POINTS, pts);
            next_btn.html('Bestätigt');
            disableTagFieldAndNextButton();
            displayOtherPlayersTags();
        },

        /**
         * Sets a custom behavior for the "next button"
         */
        setCustomButtonBehavior = function () {
            var next_btn = $('#next_img');
            next_btn.html('Bestätigen');
            next_btn.prop('onclick', null).off('click');
            next_btn.click(function () {
                calculateAndDisplayPoints();
            });
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
        calculateAndDisplayPoints: calculateAndDisplayPoints
    };
};
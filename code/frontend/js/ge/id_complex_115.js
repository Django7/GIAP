/**
 * This class holds methods and variables for user with id 115
 * @returns {{init: init, setView: setView, updateView: updateView}}
 * @constructor
 */
ID_Complex_115 = function () {
    /*
    Points distribution when adding/removing a tag.
    Or: Influence of POINTS_IMG on POINTS
    POINTS_IMG       POINTS     explanation
        0              -6           0 - (3 * 2) = -6
        1              -3           1 - (2 * 2) = -3
        2               0           2 - (1 * 2) = 0
        3               3           3
        4               4           4
        5               5           5
     */

    /* The goals list and the element to display the goals in */
    var ELT = "",
        POINTS = 0,
        POINTS_IMG = 0,
        TAG_COUNT = 0,
        WORDS = {},
        LEVEL = 0,
        IN_END = false,
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
            IN_END = false;
            IN_TUTORIAL = false;
            setIDComplexView(false, false);
        },

        /**
         * Set the tagged words
         * @param tags
         */
        setWords = function (tags) {
            WORDS = {};
            for (var i = 0; i < tags.length; i++) {
                WORDS[tags[i].tag] = true;
            }
        },

        /**
         * Sets the tag counter, used for the end screen
         * @param tag_count
         */
        setTagCount = function (tag_count) {
            TAG_COUNT = tag_count;

            // if the points are -6 then there was something wrong, i.e. new session + cookies deleted
            // Use the fall back (points = 3/4 * tag_count)
            if (POINTS === -6 && TAG_COUNT > 0) {
                POINTS = Math.round(TAG_COUNT * .75);
            }

            setLeaderboard(true);
        },

        /**
         * Checks whether a tag is present in the word list or not
         * @param tag
         * @returns {boolean}
         */
        tagInWords = function (tag) {
            for (var word in WORDS) {
                if (word.toLowerCase() === tag.toLowerCase()) {
                    return true;
                }
            }
            return false;
        },

        /**
         * Adds a new tag to the points
         * @param tag
         */
        addNewTag = function (tag) {
            if (tagInWords(tag)) {
                ++POINTS_IMG;

                // increase total points
                // See comment at the top of this "class"
                // Switch case for readability, if could be sufficient.
                switch (POINTS_IMG) {
                    case 0:
                        printWarn('previous negative word count for this image.');
                        // SHOULD never happen
                        break;
                    case 1:
                    case 2:
                    case 3:
                        POINTS += 3;
                        break;
                    case 4:
                    case 5:
                        ++POINTS;
                        break;
                    default:
                        // Upper bound at 5 words
                        POINTS_IMG = 5;
                }

                updatePointsAndLB();
            }
        },

        /**
         * Removes an existing
         * @param tag
         */
        removeNewTag = function (tag) {
            if (tagInWords(tag)) {
                --POINTS_IMG;
                if (POINTS_IMG < 0) {
                    POINTS_IMG = 0;
                }

                // Decreases total points
                // See comment at the top of this "class"
                // Switch case for readability, if could be sufficient.
                switch (POINTS_IMG) {
                    case 0:
                    case 1:
                    case 2:
                        POINTS -= 3;
                        break;
                    case 3:
                    case 4:
                        --POINTS;
                        break;
                    case 5:
                        // SHOULD never happen
                        printWarn('previous > 6 word count for this image.');
                        break;
                    default:
                        // Upper bound at 5 words
                        POINTS_IMG = 0;
                }

                updatePointsAndLB();
            }
        },

        /**
         * Stores the points to the cookies
         */
        storePoints = function () {
            setCookie('115_points', POINTS);
        },


        /**
         * The tutorial view with predefined leaderboard
         */
        setTutorialView = function () {
            IN_TUTORIAL = true;
            LEVEL = 1;
            POINTS = -6;

            WORDS['unruhig'] = true;
            WORDS['verlassen'] = true;
            WORDS['düster'] = true;
            WORDS['hell'] = true;
            WORDS['ruhig'] = true;
            WORDS['sonne'] = true;
            WORDS['warm'] = true;
            WORDS['chaotisch'] = true;
            WORDS['gelb'] = true;
            WORDS['abstrakt'] = true;
            WORDS['kunst'] = true;
            WORDS['wald'] = true;
            WORDS['traurig'] = true;
            WORDS['durcheinander'] = true;
            WORDS['grün'] = true;
            setIDComplexView();
        },

        /**
         * Updates the points views
         */
        updatePoints = function () {

            // Update the points for this image
            var $word_cntr = $('#div_it_id_complex_115_words');
            $word_cntr.html(POINTS_IMG);
            var $word_cntr_bg = $('#div_it_id_complex_115_words_bg');
            if (POINTS_IMG >= 3) {
                if ($word_cntr_bg.hasClass('bg-danger')) {
                    $word_cntr_bg.removeClass('bg-danger');
                    $word_cntr_bg.addClass('bg-success');
                }
            } else {
                if ($word_cntr_bg.hasClass('bg-success')) {
                    $word_cntr_bg.removeClass('bg-success');
                    $word_cntr_bg.addClass('bg-danger');
                }
            }

            // Update the user's total points
            var $pts_total = $('#div_it_id_complex_115_points');
            $pts_total.html(POINTS);
            var $pts_total_bg = $('#div_it_id_complex_115_points_bg');
            if (POINTS / LEVEL >= 3) {
                if ($pts_total_bg.hasClass('bg-danger')) {
                    $pts_total_bg.removeClass('bg-danger');
                    $pts_total_bg.addClass('bg-success');
                }
            } else {
                if ($pts_total_bg.hasClass('bg-success')) {
                    $pts_total_bg.removeClass('bg-success');
                    $pts_total_bg.addClass('bg-danger');
                }
            }
        },

        /**
         * Updates the levels view
         */
        updateLevel = function () {
            if (IN_TUTORIAL) {
                $('#div_it_id_complex_115_level').html('Einführung');
            } else {
                $('#div_it_id_complex_115_level').html(LEVEL);
            }

        },

        /**
         * Sets the final view, consisting of a leaderboard
         */
        setEndView = function () {
            IN_END = true;
            setIDComplexView();
            getMyTagCount();
        },

        /**
         * Updates points + LB without animation
         */
        updatePointsAndLB = function () {
            updatePoints();
            setLeaderboard(false);
        },

        /**
         * Updates the points and the leaderboard
         */
        setPointsAndLB = function () {
            if (IN_TUTORIAL) {
                POINTS = -6
            }

            updatePoints();
            setLeaderboard(true);
        },

        /**
         * Sets the level and displays it
         * @param lvl
         */
        setLevel = function (lvl) {
            LEVEL = lvl;
            updateLevel(false);
            updatePoints();
            setLeaderboard(true);
        },

        /**
         * Shows the leaderboard with at total 5 players (including the participant)
         */
        setLeaderboard = function (anim) {
            anim = anim || false;

            var username = getCookie('lb_username');
            if (username === "") {
                username = IN_TUTORIAL ? 'Du (Bsp.)' : 'Du';
            }

            // Normal point distribution with mean percentage
            var s1 = IN_END ? 100.25 : 73;
            var s2 = IN_END ? 61.25 : 45;
            var s3 = IN_END ? 29.5 : 22;
            var s4 = IN_END ? 11.0 : 8;
            var upts = POINTS;
            if (IN_END) {
                if (TAG_COUNT - POINTS > LEVEL * 2.5) {
                    upts = POINTS + LEVEL * 2.5;
                } else {
                    upts = TAG_COUNT;
                }
            }

            var leaderboard = [
                [s1, 'verdani', '#607cae', 0],
                [upts, username, '#5b67f1', 1],
                [s2, 'neo23', '#607cae', 0],
                [s3, 'legolas', '#607cae', 0],
                [s4, 'anork85', '#607cae', 0]
            ];

            var lb = $('#div_it_id_complex_115_lb');
            lb.html('');
            lb.jqBarGraph({
                data: leaderboard,
                height: 200,
                width: 370,
                animate: anim,
                sort: 'desc'
            });
        },

        /**
         * Sets the view
         */
        setIDComplexView = function () {
            getNumberOfImagesWorkedOn();

            // Gets the current points, requests them from server, if needed
            if (POINTS === 0) {
                // getMyTagCount();
                var cpts = getCookie('115_points');
                if (!(cpts === '0' || cpts.length === 0)) {
                    POINTS = Number(cpts);
                }else{
                    // Get the tag count
                    if(!IN_TUTORIAL) {
                        getMyTagCount();
                    }
                }
            }

            // Delete the current image's points
            POINTS_IMG = 0;

            if (!IN_END) {
                // Updates the level
                // If there is no level (e.g., user reloads the page), then this equals to 1.
                // The correct level then gets queried from the server later
                ++LEVEL;

                // At the beginning, the users get -6 Points (no word entered)
                POINTS += -6;
            }

            $.get('views/mst_id_complex_115.html', function (template) {
                var params = {
                    level: LEVEL,
                    points_max: 5,
                    bonus_with_without: 'ohne'
                };

                if (IN_END) {
                    params['bonus_with_without'] = 'mit'
                }

                var rendered = Mustache.render(template, params);
                $('#' + ELT).html(rendered);

                setPointsAndLB();
                updateLevel();

                // Get the images tags if not in end and tutorial
                if (!IN_END && !IN_TUTORIAL) {
                    // get15MostUsedTagsForCurrentImage();
                    getNumberOfImagesWorkedOn();
                } else if (IN_END) {
                    setInvisible($('#div_it_id_complex_115_words_and_points_div'));
                    setInvisible($('#div_it_id_complex_115_level_div'));
                }
            });
        };

    /**
     * Return the 'public' methods
     */
    return {
        init: init,
        setEndView: setEndView,
        setView: setView,
        setWords: setWords,
        setLevel: setLevel,
        setTagCount: setTagCount,
        addNewTag: addNewTag,
        removeNewTag: removeNewTag,
        storePoints: storePoints,
        setTutorialView: setTutorialView,
        updateLeaderboard: setLeaderboard,
        updatePoints: updatePoints
    };
};
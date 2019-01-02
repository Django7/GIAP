/**
 * This class holds methods and variables representing a system to compare the tags with others
 * @returns {{init: init, setView: setView, updateView: updateView}}
 * @constructor
 */
ID_prizes_59 = function () {
    /* The goals list and the element to display the goals in */
    var ELT = "",
        POINTS_PER_TAG = 100,
        POINTS_PER_TAG_BONUS = 50,
        PERCENTAGE_OF_UNIQUE_ELEMENTS = 9.6,
        POINTS = 0,
        BONUS_POINTS = 0,

        /**
         * Initializes the compare element
         */
        init = function (element) {
            ELT = element;
        },

        /**
         * Sets the view
         */
        setView = function (tags) {
            setPoints(tags);
            setIDPrizesView();
        },

        /**
         * Calculates and sets the points
         * @param tags The number of tags
         */
        setPoints = function (tags) {
            POINTS = tags * POINTS_PER_TAG;
        },

        /**
         * Adds a new tag typed in by the user
         */
        addNewTag = function () {
            POINTS += POINTS_PER_TAG;
            updatePoints();
        },

        /**
         * Removes a new tag removed by the user
         */
        removeNewTag = function () {
            POINTS -= POINTS_PER_TAG;
            updatePoints();
        },

        /**
         * Updates the points view
         */
        updatePoints = function () {
            $('#div_it_id_prizes_points').html('Basispunkte: ' + POINTS);
        },

        /**
         * Sets the final view, consisting of a leaderboard
         */
        setEndView = function () {
            $.get('views/mst_id_prizes_59.html', function (template) {
                BONUS_POINTS = (Math.floor(POINTS * PERCENTAGE_OF_UNIQUE_ELEMENTS / 100 / POINTS_PER_TAG) * POINTS_PER_TAG_BONUS);
                var params = {
                    bonus_points: BONUS_POINTS,
                    show_information: false
                };
                var rendered = Mustache.render(template, params);
                $('#' + ELT).html(rendered);
                updatePoints();
                setLeaderboard(true);
            });
        },

        /**
         * Shows the leaderboard with at total 5 players (including the participant)
         */
        setLeaderboard = function (anim) {
            anim = anim || false;

            var username = getCookie('lb_username');
            if (username === "") {
                username = 'Du';
            }

            var s1 = getTotalPoints(102);
            var s2 = getTotalPoints(60);
            var s3 = getTotalPoints(29);
            var s4 = getTotalPoints(11);

            var leaderboard = [
                [s1, 'verdani', '#607cae', 0],
                [POINTS + BONUS_POINTS, username, '#5b67f1', 1],
                [s2, 'neo23', '#607cae', 0],
                [s3, 'legolas', '#607cae', 0],
                [s4, 'anork85', '#607cae', 0]
            ];

            var lb = $('#div_it_lb');
            lb.html('');
            lb.jqBarGraph({
                data: leaderboard,
                animate: anim,
                sort: 'desc'
            });
        },

        /**
         * Gets the total number of points (basis + bonus)
         * @param tags
         * @returns {number}
         */
        getTotalPoints = function (tags) {
            return tags * POINTS_PER_TAG + (Math.floor(tags * PERCENTAGE_OF_UNIQUE_ELEMENTS / 100) * POINTS_PER_TAG_BONUS);
        },

        /**
         * Sets the view
         */
        setIDPrizesView = function () {
            $.get('views/mst_id_prizes_59.html', function (template) {
                var params = {
                    show_information: true
                };
                var rendered = Mustache.render(template, params);
                $('#' + ELT).html(rendered);
                updatePoints();
            });
        };

    /**
     * Return the 'public' methods
     */
    return {
        init: init,
        addNewTag: addNewTag,
        removeNewTag: removeNewTag,
        setEndView: setEndView,
        setView: setView,
        setPoints: setPoints,
        updatePoints: updatePoints,
        setLeaderboard: setLeaderboard
    };
};
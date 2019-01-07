/**
 * This class holds methods and variables for user with id 151
 * @returns {{init: init, setView: setView, updateView: updateView}}
 * @constructor
 */
ID_Points_151 = function () {
    /* The goals list and the element to display the goals in */
    var ELT = "",
        POINTS_PER_TAG = 100,
        PERCENTAGE_OF_BONUS_POINTS = 22.5,
        POINTS = 0,
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
        setView = function (tags) {
            IN_TUTORIAL = false;
            IN_END = false;
            setIDPointsView(false, false);
        },

        /**
         * The tutorial view with predefined leaderboard
         */
        setTutorialView = function () {
            IN_TUTORIAL = true;
            setIDPointsView(true, true);
        },

        /**
         * Sets the points, used when getting the tag count from the server
         * @param points
         */
        setMyPoints = function (points) {
            if (getCookie('151_pts_img').length > 0){
                POINTS = getCookie('151_pts_img');
            }else{
                POINTS = getTotalPoints(points);
                setCookie('151_pts_img', POINTS);
            }
            updatePoints();

        },

        /**
         * Updates the points view
         */
        updatePoints = function () {
            $('#div_it_id_points_points').html('Punkte im letzten Bild: ' + POINTS);

        },


        /**
         * Set the leaderboard and points
         * @param points
         */
        setPointsAndLB = function (points) {
            POINTS = getTotalPoints(points);
            //updatePoints();
            setLeaderboard(true);
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

            if (IN_TUTORIAL) {
                username = 'Du (Bsp.)'
            }

            var s1 = 12495;
            var s2 = 7350;
            var s3 = 3550;
            var s4 = 1345;

            var leaderboard = [
                [s1, 'verdani', '#607cae', 0],
                [POINTS, username, '#5b67f1', 1],
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
            if (tags === 0) {
                return 0;
            }

            var additional_pts = tags * PERCENTAGE_OF_BONUS_POINTS / 100;
            additional_pts += getRandomNumberFloat(0, additional_pts / 2) - additional_pts / 4;
            additional_pts = additional_pts < 0 ? 0 : additional_pts;
            return round5(Math.floor((tags + additional_pts) * POINTS_PER_TAG));
        },

        /**
         * Sets the final view, consisting of a leaderboard
         */
        setEndView = function () {
            IN_END = true;
            setIDPointsView(true, false);
        },

        /**
         * Sets the view
         */
        setIDPointsView = function (leaderboard_visible, in_tutorial) {
            $.get('views/mst_id_points_151.html', function (template) {
                var params = {
                    leaderboard: leaderboard_visible
                };
                var rendered = Mustache.render(template, params);
                $('#' + ELT).html(rendered);

                if (in_tutorial) {
                    setPointsAndLB(3);
                } else if (leaderboard_visible) {
                    $('#div_it_lb').html('Gesamtpunktzahl wird berechnet...');

                    // Mimic calculation
                    setTimeout(function () {
                        getMyTagCount();
                    }, 1000);
                }

                updatePoints();
            });
        };

    /**
     * Return the 'public' methods
     */
    return {
        init: init,
        setEndView: setEndView,
        setView: setView,
        setTutorialView: setTutorialView,
        setPointsAndLB: setPointsAndLB,
        setMyPoints: setMyPoints,
        setLeaderboard: setLeaderboard
    };
};
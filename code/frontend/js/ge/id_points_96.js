/**
 * This class holds methods and variables for user with id 151
 * @returns {{init: init, setView: setView, updateView: updateView}}
 * @constructor
 */
ID_Points_96 = function () {
    /* The goals list and the element to display the goals in */
    var ELT = "",
        POINTS = 0,
        MAX_POINTS = 100,
        MIN_POINTS = 50,
        WORDS = {},
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
            IN_TUTORIAL = false;
            setIDPointsView(false, false);
        },

        /**
         * Set the points (only needed when reloading and cookies not set)
         * @param tags
         */
        setPoints = function(tags){
            POINTS = round5(getRandomNumber(tags * MIN_POINTS, tags * MAX_POINTS));

            // Store Points to make sure they are available the next time
            storePoints();

            // show the points and leaderboards, latter only if needed
            setPointsAndLB();
        },

        /**
         * Adds a new tag to the points
         * @param tag
         */
        addNewTag = function(tag){
            var points_for_tag = 0;
            if (tag in WORDS){
                points_for_tag = WORDS[tag];
            }else{
                points_for_tag = round5(getRandomNumber(MIN_POINTS, MAX_POINTS));
            }
            WORDS[tag] = points_for_tag;
            POINTS += points_for_tag;

            updatePointsAndLB();
        },

        /**
         * Removes an existing
         * @param tag
         */
        removeNewTag = function (tag){
            var points_to_remove = WORDS[tag];
            if(typeof points_to_remove !== 'number'){
                points_to_remove = 0;
            }
            POINTS -= points_to_remove;

            updatePointsAndLB();
        },

        /**
         * Resets the words, used when working on a new image
         */
        resetWords = function (){
            WORDS = {};
        },

        /**
         * Stores the points to the cookies
         */
        storePoints = function(){
            setCookie('96_points', POINTS);
        },

        /**
         * The tutorial view with predefined leaderboard
         */
        setTutorialView = function(){
            IN_TUTORIAL = true;
            setIDPointsView(true, true);
        },

        /**
         * Updates the points view
         */
        updatePoints = function () {
            $('#div_it_id_points_points').html('Punkte: ' + POINTS);
        },

        /**
         * Sets the final view, consisting of a leaderboard
         */
        setEndView = function () {
            setIDPointsView(true, false);
        },

        /**
         * Updates points + LB without animation
         */
        updatePointsAndLB = function(){
            updatePoints();
            setLeaderboard(false);
        },

        /**
         * Updates the points and the leaderboard
         */
        setPointsAndLB = function(){
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
                username = 'Du';
            }

            if (IN_TUTORIAL){
                username = "Du (Bsp.)";
            }

            // Normal point distribution with mean percentage
            var s1 = 7650;
            var s2 = 4512;
            var s3 = 2175;
            var s4 = 725;

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
         * Sets the view
         */
        setIDPointsView = function (leaderboard_visible, in_tutorial) {
            // Gets the current points, requests them from server, if needed
            if (POINTS === 0){
                var cpts = getCookie('96_points');
                if(cpts === '0' || cpts.length === 0){
                    getMyTagCount();
                }else{
                    POINTS = Number(cpts);
                }
            }

            // Resets the words for the new view (= new image)
            resetWords();

            $.get('views/mst_id_points_96.html', function (template) {
                var params = {
                    leaderboard: leaderboard_visible
                };
                var rendered = Mustache.render(template, params);
                $('#' + ELT).html(rendered);

                if(in_tutorial || leaderboard_visible){
                    setPointsAndLB();
                }else{
                    updatePoints();
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
        setPoints: setPoints,
        addNewTag: addNewTag,
        removeNewTag: removeNewTag,
        storePoints: storePoints,
        setTutorialView: setTutorialView,
        setPointsAndLB: setPointsAndLB,
        updatePoints: updatePoints,
        setLeaderboard: setLeaderboard
    };
};
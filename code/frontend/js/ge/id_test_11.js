ID_Test_11 = function () {
    /* The goals list and the element to display the goals in */
    var ELT = "",
        AVERAGE_TAGS = (Math.random() * 2 + 6).toFixed(2),
        YOUR_TAGS = 0,
        IN_TUTORIAL = false,
        IN_END = false,
        OTHERS = [
            [(Math.random() * 120).toFixed(0), 'ProFlamer', '#607cae', 0],
            [(Math.random() * 120).toFixed(0), 'McSwizzle', '#607cae', 0],
            [(Math.random() * 120).toFixed(0), 'Xycor', '#607cae', 0],
            [(Math.random() * 120).toFixed(0), 'McDaSchu', '#607cae', 0]
        ],

        /**
         * Initializes the compare element
         */
        init = function (element) {
            ELT = element;
        },

        setView = function() {
            $.get('views/mst_id_test_11.html', function (template) {
                var params = {
                    points: POINTS,
                    end_screen: false
                };
                var rendered = Mustache.render(template, params);
                $('#' + ELT).html(rendered);
                $('#averageTags').text(AVERAGE_TAGS);
            });
        },

        setTutorialView = function() {
            IN_TUTORIAL = true;
            setView();
        },

        addNewTag = function() {
            YOUR_TAGS++;
            $('#yourTags').text(YOUR_TAGS);

            POINTS += POINTS_INCR;
            setPoints(POINTS);
            adaptLeaderboard();
        },

        removeNewTag = function() {
            YOUR_TAGS--;
            $('#yourTags').text(YOUR_TAGS);

            POINTS -= POINTS_INCR;
            setPoints(POINTS);
            adaptLeaderboard();
        },

        generateNewPointsDistribution = function() {
            for(var i = 0; i < OTHERS.length; i++) {
                OTHERS[i][0] = (Math.random() * 120).toFixed(0);
            }
        },

        displayPoints = function() {
            $.get('views/small_elements/mst_id_test_11_table.html', function (template) {
                // Update points
                POINTS += $("#myTags").tagit("assignedTags").length;

                var params = {
                    end_page: false,
                    points: POINTS
                };

                // Render the statistics, print them and activate the buttons
                var rendered = Mustache.render(template, params);
                $('#beat_friend_ranking_etc').html(rendered);

                var username = getCookie('lb_username');
                username = username === "" ? 'Du' : username;

                if(IN_TUTORIAL){
                    username = "Du (Bsp.)";
                }

                // Display the ranking
                var leaderboard = OTHERS;
                leaderboard.push([[POINTS, username, '#5b67f1', 1]]);

                var lb = $('#div_it_id_test_11_lb');
                lb.html('');
                lb.jqBarGraph({
                    data: leaderboard,
                    animate: true,
                    sort: 'desc',
                    height: 200,
                    width: 370
                });
            });
        };


    /**
     * Return the 'public' methods
     */
    return {
        init: init,
        setView: setView,
        setTutorialView : setTutorialView,
        addNewTag: addNewTag,
        removeNewTag: removeNewTag,
        generateNewPointsDistribution : generateNewPointsDistribution,
        displayPoints : displayPoints
    };
};
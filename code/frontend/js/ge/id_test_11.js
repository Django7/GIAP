ID_Test_11 = function () {
    /* The goals list and the element to display the goals in */
    var ELT = "",
        AVERAGE_TAGS = (Math.random() * 2 + 6).toFixed(2),
        DISTINCT_TAGS = 0,
        YOUR_TAGS = 0,
        OTHER_TAGS = [],
        IN_TUTORIAL = false,
        IN_END = false,
        OTHERS = [
            [(Math.random() * 14).toFixed(0) * 100, 'ProFlamer', '#607cae', 0],
            [(Math.random() * 14).toFixed(0) * 100, 'McSwizzle', '#607cae', 0],
            [(Math.random() * 14).toFixed(0) * 100, 'Xycor', '#607cae', 0],
            [(Math.random() * 14).toFixed(0) * 100, 'McDaSchu', '#607cae', 0]
        ],

        /**
         * Initializes the compare element
         */
        init = function (element) {
            ELT = element;
        },

        setView = function() {
            $.get('views/mst_id_test_11.html', function (template) {
                YOUR_TAGS = 0;
                AVERAGE_TAGS = (Math.random() * 2 + 6).toFixed(2);

                var params = {
                    points: POINTS,
                    end_screen: false
                };
                var rendered = Mustache.render(template, params);
                $('#' + ELT).html(rendered);
                $('#averageTags').text(AVERAGE_TAGS);

                var next_btn = $('#next_img');
                next_btn.html('Bestätigen');
                next_btn.prop('onclick', null).off('click');
                next_btn.click(displayPoints)
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
            OTHERS = [
                [(Math.random() * 14).toFixed(0) * 100, 'ProFlamer', '#607cae', 0],
                [(Math.random() * 14).toFixed(0) * 100, 'McSwizzle', '#607cae', 0],
                [(Math.random() * 14).toFixed(0) * 100, 'Xycor', '#607cae', 0],
                [(Math.random() * 14).toFixed(0) * 100, 'McDaSchu', '#607cae', 0]
            ]
        },

        displayPoints = function() {
            $.get('views/small_elements/mst_id_test_11_table.html', function (template) {
                disableTagField();
                var next_img_btn = $('#next_img');
                next_img_btn.html('Bestätigt');
                // Update points
                POINTS += $("#myTags").tagit("assignedTags").length;

                $('#numTags').text(DISTINCT_TAGS);
                var rateTags = get3randTags();

                var params = {
                    end_page: false,
                    points: POINTS,
                    anyTags : rateTags[0] !== null,
                    tag1 : rateTags[0] !== null,
                    tag2 : rateTags[1] !== null,
                    tag3 : rateTags[2] !== null,
                    tag1text : rateTags[0],
                    tag2text : rateTags[1],
                    tag3text : rateTags[2]
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
                leaderboard.push([YOUR_TAGS * 100, username, '#5b67f1', 1]);

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
        },

        setPoints = function(pts) {
            POINTS = pts;
        },

        setOtherPlayersTags = function(others) {
            OTHER_TAGS = others !== "" ? others : [];
        },

        setDistinctMoods = function(num) {
            DISTINCT_TAGS = num;
        },

        storePoints = function() {
            setCookie('11_points', POINTS);
        },

        get3randTags = function () {
            var tag1, tag2, tag3;
            var tempTags = shuffleArray(OTHER_TAGS).splice(0, 3);

            tag1 = tempTags[0] === undefined ? null : tempTags[0];
            tag2 = tempTags[1] === undefined ? null : tempTags[1];
            tag3 = tempTags[2] === undefined ? null : tempTags[2];

            return [tag1, tag2, tag3];
        },

        setUsername= function(name) {
            setCookie('lb_username', name);
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
        displayPoints : displayPoints,
        setOtherPlayersTags : setOtherPlayersTags,
        setDistinctMoods : setDistinctMoods,
        storePoints : storePoints,
        setUsername : setUsername
    };
};
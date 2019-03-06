ID_Points_751 = function () {
    /* The goals list and the element to display the goals in */
    var ELT = "",
        POINTS = 0,
        POINTS_ROUND = 0,
        OTHER_TAGS = [],
        IN_TUTORIAL = false,
        IN_END = false,
        OTHERS = [
            [0, 'verdani', '#607cae', 0],
            [0, 'neo23', '#607cae', 0],
            [0, 'legolas', '#607cae', 0],
            [0, 'anork85', '#607cae', 0]
        ],
        pointsVerd = 6 + parseInt((Math.random() * 2).toFixed(0)),
        pointsNeo =  4 + parseInt((Math.random() * 2).toFixed(0)),
        pointsLego = 2 + parseInt((Math.random() * 2).toFixed(0)) ,
        pointsAnork = 1 + parseInt((Math.random() * 2).toFixed(0)),
        username = "",

        /**
         * Initializes the compare element
         */
        init = function (element) {
            ELT = element;
        },

        setView = function() {
            OTHERS[0][0] = pointsVerd;
            OTHERS[1][0] = pointsNeo;
            OTHERS[2][0] = pointsLego;
            OTHERS[3][0] = pointsAnork;

            POINTS_ROUND = 0;

            $.get('views/mst_id_points_751.html', function (template) {
                var params = {
                    end_screen: false
                };

                var rendered = Mustache.render(template, params);
                $('#' + ELT).html(rendered);

                var next_btn = $('#next_img');
                next_btn.html('Bestätigen');
                next_btn.prop('onclick', null).off('click');
                next_btn.click(displayTable);

                $.get('views/small_elements/mst_id_points_751_table.html', function (templateTab) {
                    var params = {
                        end_page: true
                    };
                    // Render the statistics, print them and activate the buttons
                    var rendered = Mustache.render(templateTab, params);
                    $('#id_points_751_table').html('');
                    $('#id_points_751_table').html(rendered);

                    username = getCookie('lb_username');
                    username = username === "" ? 'Du' : username;

                    if(IN_TUTORIAL){
                        username = "Du (Bsp.)";
                    }

                    // Display the ranking
                    var leaderboard = [OTHERS[0], OTHERS[1], OTHERS[2], OTHERS[3]];
                    leaderboard.push([POINTS, username, '#5b67f1', 1]);

                    var lb = $('#div_it_id_points_751_lb');
                    lb.html('');
                    lb.jqBarGraph({
                        data: leaderboard,
                        animate: true,
                        sort: 'desc',
                        height: 200,
                        width: 370
                    });
                });
            });
        },

        displayTable = function() {
            disableTagFieldAndNextButton();
            var next_img_btn = $('#next_img');
            next_img_btn.html('Bestätigt');

            if(IN_TUTORIAL) {
                OTHER_TAGS.push('unruhig');
                OTHER_TAGS.push('verlassen');
                OTHER_TAGS.push('düster');
            }

            //calculate points for current picture
            var tags = $("#myTags").tagit("assignedTags");
            tags.forEach(function(tag) {
                for(var i=0; i<OTHER_TAGS.length; i++) {
                    if(tag === OTHER_TAGS[i]) {
                        POINTS++;
                        POINTS_ROUND++;
                        return;
                    }
                }
                if(Math.random() * 5 <= 1) {
                    POINTS++;
                    POINTS_ROUND++;
                }
            });

            $.get('views/small_elements/mst_id_points_751_table.html', function (templateTab) {
                var params = {
                    end_page: false,
                    basePoints: POINTS_ROUND
                };
                // Render the statistics, print them and activate the buttons
                var rendered = Mustache.render(templateTab, params);
                $('#id_points_751_table').html('');
                $('#id_points_751_table').html(rendered);

                // Display the ranking
                var leaderboard = [OTHERS[0], OTHERS[1], OTHERS[2], OTHERS[3]];
                leaderboard.push([POINTS, username, '#5b67f1', 1]);

                var lb = $('#div_it_id_points_751_lb');
                lb.html('');
                lb.jqBarGraph({
                    data: leaderboard,
                    animate: false,
                    sort: 'desc',
                    height: 200,
                    width: 370
                });
            });
        },

        generateNewPointsDistribution = function() {
            pointsVerd += 6 + parseInt((Math.random() * 2).toFixed(0));
            pointsNeo += 4 + parseInt((Math.random() * 2).toFixed(0));
            pointsLego += 2 + parseInt((Math.random() * 2).toFixed(0));
            pointsAnork += 1 + parseInt((Math.random() * 2).toFixed(0));

            OTHERS = [
                [pointsVerd, 'verdani', '#607cae', 0],
                [pointsNeo, 'neo23', '#607cae', 0],
                [pointsLego, 'legolas', '#607cae', 0],
                [pointsAnork, 'anork85', '#607cae', 0]
            ];
        },

        setTutorialView = function() {
            IN_TUTORIAL = true;
            setView();
        },

        afterTagAdded = function(label) {
            //POINTS++;
        },

        afterTagRemoved = function(label) {
            //POINTS--;
        },

        setPoints = function(pts) {
            POINTS = pts;
        },

        storePoints = function() {
            setCookie('751_points', POINTS);
        },

        setOtherTags = function(others) {
            others.forEach(function (tagAndCount) {
                OTHER_TAGS.push(tagAndCount.tag);
            });
        },

        setEndView = function() {
            IN_END = true;

            $.get('views/mst_id_points_751.html', function (template) {
                disableTagFieldAndNextButton();

                var params = {
                    end_screen: true
                };

                // Render the statistics, print them and activate the buttons
                var rendered = Mustache.render(template, params);
                $('#' + ELT).html(rendered);
            });

        };

    /**
     * Return the 'public' methods
     */
    return {
        init: init,
        setView: setView,
        setTutorialView : setTutorialView,
        afterTagAdded: afterTagAdded,
        afterTagRemoved: afterTagRemoved,
        displayTable : displayTable,
        setOtherTags : setOtherTags,
        storePoints : storePoints,
        setEndView : setEndView,
        setPoints : setPoints,
        generateNewPointsDistribution : generateNewPointsDistribution
    };
};
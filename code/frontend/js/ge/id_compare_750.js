ID_Compare_750 = function () {
    /* The goals list and the element to display the goals in */
    var ELT = "",
        POINTS = 0,
        SHAREPOINTS = 0,
        POINTS_START_ROUND = 0,
        SHAREPOINTS_START_ROUND = 0,
        CONFIRMED_TAGS = false,
        OTHER_TAGS = [],
        OTHER_TAGS_COUNT = [],
        SHOW_POINTS_BOARD = true,
        NUM_OTHER_TAGGERS = 0,
        DISTINCT_TAGS = 0,
        BASE_POINTS_ROUND = 0,
        EXTRA_POINTS_ROUND = 0,
        OTHERS = [
            [0, 'verdani', '#607cae', 0],
            [0, 'neo23', '#607cae', 0],
            [0, 'legolas', '#607cae', 0],
            [0, 'anork85', '#607cae', 0]
        ],
        pointsVerd = (6 + parseFloat((Math.random() * 2).toFixed(0))) * 100,
        pointsNeo = (3 + parseFloat((Math.random() * 2).toFixed(0))) * 100,
        pointsLego = (2 + parseFloat((Math.random() * 2).toFixed(0))) * 100,
        pointsAnork = (parseFloat((Math.random() * 2).toFixed(0))) * 100,
        sharePointsVerd = 0,
        sharePointsNeo = 0,
        sharePointsLego = 0,
        sharePointsAnork = 0,
        username = "",
        IN_TUTORIAL = false,
        IN_END = false,

        /**
         * Initializes the compare element
         */
        init = function (element) {
            ELT = element;
        },

        setView = function() {
            if(IN_TUTORIAL) {
                OTHER_TAGS.push('unruhig');
                OTHER_TAGS_COUNT.push(3);
                OTHER_TAGS.push('verlassen');
                OTHER_TAGS_COUNT.push(5);
                OTHER_TAGS.push('düster');
                OTHER_TAGS_COUNT.push(2);
                NUM_OTHER_TAGGERS = 63;

                var sumShare = Math.floor((OTHER_TAGS_COUNT[0] / NUM_OTHER_TAGGERS) * 100) + Math.floor((OTHER_TAGS_COUNT[1] / NUM_OTHER_TAGGERS) * 100) + Math.floor((OTHER_TAGS_COUNT[2] / NUM_OTHER_TAGGERS) * 100);

                sharePointsVerd = sumShare * 10 - 10;
                sharePointsNeo = Math.round(3/4 * sumShare) * 10;
                sharePointsLego = Math.round(2/4 * sumShare) * 10;
                sharePointsAnork = Math.round(1/4 * sumShare) * 10;
            }

            EXTRA_POINTS_ROUND = 0;
            BASE_POINTS_ROUND = 0;

            POINTS_START_ROUND = POINTS;
            SHAREPOINTS_START_ROUND = SHAREPOINTS;

            CONFIRMED_TAGS = false;

            $.get('views/mst_id_compare_750.html', function (template) {
                OTHERS[0][0] = parseInt(pointsVerd);
                OTHERS[1][0] = parseInt(pointsNeo);
                OTHERS[2][0] = parseInt(pointsLego);
                OTHERS[3][0] = parseInt(pointsAnork);

                var params = {
                    end_screen: false
                };

                var rendered = Mustache.render(template, params);
                $('#' + ELT).html(rendered);
                //$('#shortTextDiv').css({'display' : 'block'});
                var next_btn = $('#next_img');
                next_btn.html('Bestätigen');
                next_btn.prop('onclick', null).off('click');
                next_btn.click(displayAccordances);
                showBoard();
            });
        },

        showBoard = function() {
            $.get('views/small_elements/mst_id_compare_750_table.html', function (templateTab) {
                var params = {
                    end_page: true,
                    points: POINTS
                };

                // Render the statistics, print them and activate the buttons
                var rendered = Mustache.render(templateTab, params);
                $('#id_compare_750_table').html(rendered);

                if(!IN_TUTORIAL) {
                    $('#numTags').text(DISTINCT_TAGS);
                } else {
                    $('#numTags').text(9);
                }

                username = getCookie('lb_username');
                username = username === "" ? 'Du' : username;

                if(IN_TUTORIAL){
                    username = "Du (Bsp.)";
                }

                // Display the ranking
                var leaderboard = [OTHERS[0], OTHERS[1], OTHERS[2], OTHERS[3]];
                leaderboard.push([(POINTS * 100).toFixed(0), username, '#5b67f1', 1]);

                var lb = $('#div_it_id_compare_750_lb');
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

        displayAccordances = function() {
            $.get('views/small_elements/mst_id_compare_750_table.html', function (templateTab) {
                var params = {
                    end_page: false,
                    points: POINTS,
                    basePoints : BASE_POINTS_ROUND * 100,
                    extraPoints : EXTRA_POINTS_ROUND * 10
                };

                CONFIRMED_TAGS = true;

                // Render the statistics, print them and activate the buttons
                var rendered = Mustache.render(templateTab, params);
                $('#id_compare_750_table').html(rendered);

                username = getCookie('lb_username');
                username = username === "" ? 'Du' : username;

                if(IN_TUTORIAL){
                    username = "Du (Bsp.)";
                }

                // Display the ranking
                var leaderboard = [OTHERS[0], OTHERS[1], OTHERS[2], OTHERS[3]];
                leaderboard.push([(POINTS * 100).toFixed(0), username, '#5b67f1', 1]);

                var lb = $('#div_it_id_compare_750_lb');
                lb.html('');
                lb.jqBarGraph({
                    data: leaderboard,
                    animate: false,
                    sort: 'desc',
                    height: 200,
                    width: 370
                });
                if(!SHOW_POINTS_BOARD) toggleLeaderboard();
                disableTagFieldAndNextButton();
                var next_img_btn = $('#next_img');
                next_img_btn.html('Bestätigt');

                //Calculate accordances
                var ownTags = $("#myTags").tagit("assignedTags");
                var counts = [];
                ownTags.forEach(function(ownTag, idx) {
                    for(var i=0; i<OTHER_TAGS.length; i++) {
                        if(ownTag === OTHER_TAGS[i]) {
                            counts[idx] = ((OTHER_TAGS_COUNT[i] / NUM_OTHER_TAGGERS) * 100);
                            return;
                        }
                    }
                    counts[idx] = 0.00;
                });

                var newOrder = [];
                var lowerThan = 101;
                for(var i=0; i<ownTags.length; i++) {
                    var max = -1;
                    for(var j=0; j<ownTags.length; j++) {
                        if(counts[j] > max && counts[j] < lowerThan) {
                            max = counts[j];
                        }
                    }
                    for(var j=0; j<ownTags.length; j++) {
                        if(counts[j] == max) {
                            newOrder.push(j);
                        }
                    }
                    lowerThan = max;
                }

                var orderedCounts = [];
                var orderedOwnTags = [];
                for(var i=0; i<counts.length; i++) {
                    orderedOwnTags[i] = ownTags[newOrder[i]];
                    orderedCounts[i] = counts[newOrder[i]];
                }

                var htmlString = "";
                for(var i=0; i<orderedOwnTags.length; i++) {
                    htmlString += "<p>" + (i+1) + ". " + orderedOwnTags[i] + ": <b>" + orderedCounts[i].toFixed(2).toString() + "%</b></p>\n";
                }

                $('#accordancesDiv').html('');
                $('#accordancesDiv').html(htmlString);
            });
        },

        setTutorialView = function() {
            IN_TUTORIAL = true;
            setView();
        },

        afterTagAdded = function(label) {
            for(var i=0; i<OTHER_TAGS.length; i++) {
                if(label === OTHER_TAGS[i]) {
                    POINTS++;
                    BASE_POINTS_ROUND++;
                    var accom = OTHER_TAGS_COUNT[i] / NUM_OTHER_TAGGERS;
                    accom *= 100;
                    accom = Math.floor(accom);
                    EXTRA_POINTS_ROUND += accom;
                    SHAREPOINTS += accom;
                    return;
                }
            }
        },

        afterTagRemoved = function(label) {
            for(var i=0; i<OTHER_TAGS.length; i++) {
                if(label === OTHER_TAGS[i]) {
                    POINTS--;
                    BASE_POINTS_ROUND--;
                    var accom = OTHER_TAGS_COUNT[i] / NUM_OTHER_TAGGERS;
                    accom *= 100;
                    accom = Math.floor(accom);
                    EXTRA_POINTS_ROUND -= accom;
                    SHAREPOINTS -= accom;
                    return;
                }
            }
        },

        setPoints = function(pts) {
            POINTS = pts;
        },

        storePoints = function() {
            setCookie('750_points', POINTS);
        },

        setOtherTags = function(others) {
            others.forEach(function (tagAndCount) {
                OTHER_TAGS.push(tagAndCount.tag);
                OTHER_TAGS_COUNT.push(tagAndCount.tag_count);
            });
        },

        setNumOtherTaggers = function(num) {
            NUM_OTHER_TAGGERS = num;
        },

        setDistinctMoods = function(num) {
            DISTINCT_TAGS = num;
        },

        generateNewPointsDistribution = function() {
            pointsVerd += (6 + parseFloat((Math.random() * 2).toFixed(0))) * 100;
            pointsNeo += (3 + parseFloat((Math.random() * 2).toFixed(0))) * 100;
            pointsLego += (2 + parseFloat((Math.random() * 2).toFixed(0))) * 100;
            pointsAnork += (parseFloat((Math.random() * 2).toFixed(0))) * 100;

            OTHERS = [
                [pointsVerd, 'verdani', '#607cae', 0],
                [pointsNeo, 'neo23', '#607cae', 0],
                [pointsLego, 'legolas', '#607cae', 0],
                [pointsAnork, 'anork85', '#607cae', 0]
            ];
        },

        incSharedPoints = function() {
            var summedShare = 0;
            OTHER_TAGS_COUNT.forEach(function(count) {
                summedShare += Math.floor((count / NUM_OTHER_TAGGERS) * 100);
            });
            sharePointsVerd += summedShare * 10 - 10;
            sharePointsNeo += Math.round(3/4 * summedShare) * 10;
            sharePointsLego += Math.round(2/4 * summedShare) * 10;
            sharePointsAnork += Math.round(1/4 * summedShare) * 10;
        },

        setEndView = function() {
            IN_END = true;

            $.get('views/mst_id_compare_750.html', function (template) {
                disableTagFieldAndNextButton();

                var params = {
                    end_screen: true
                };

                // Render the statistics, print them and activate the buttons
                var rendered = Mustache.render(template, params);
                $('#' + ELT).html(rendered);
            });

        },

        toggleLeaderboard = function() {
            var leaderboard = [];
            if(SHOW_POINTS_BOARD) {
                SHOW_POINTS_BOARD = false;
                $('#LBHeading').text('Ranking (Überschneidungen)');
                OTHERS = [
                    [sharePointsVerd, 'verdani', '#607cae', 0],
                    [sharePointsNeo, 'neo23', '#607cae', 0],
                    [sharePointsLego, 'legolas', '#607cae', 0],
                    [sharePointsAnork, 'anork85', '#607cae', 0]
                ];
                leaderboard = [OTHERS[0], OTHERS[1], OTHERS[2], OTHERS[3]];
                if(CONFIRMED_TAGS) {
                    leaderboard.push([(SHAREPOINTS * 10).toFixed(0), username, '#5b67f1', 1]);
                } else {
                    leaderboard.push([(SHAREPOINTS_START_ROUND * 10).toFixed(0), username, '#5b67f1', 1]);
                }
            } else {
                SHOW_POINTS_BOARD = true;
                $('#LBHeading').text('Ranking (Allgemein)');
                OTHERS = [
                    [pointsVerd, 'verdani', '#607cae', 0],
                    [pointsNeo, 'neo23', '#607cae', 0],
                    [pointsLego, 'legolas', '#607cae', 0],
                    [pointsAnork, 'anork85', '#607cae', 0]
                ];
                leaderboard = [OTHERS[0], OTHERS[1], OTHERS[2], OTHERS[3]];
                if (CONFIRMED_TAGS) {
                    leaderboard.push([(POINTS * 100).toFixed(0), username, '#5b67f1', 1]);
                } else {
                    leaderboard.push([(POINTS_START_ROUND * 100).toFixed(0), username, '#5b67f1', 1]);
                }
            }

            // Display the ranking
            var lb = $('#div_it_id_compare_750_lb');
            lb.html('');
            lb.jqBarGraph({
                data: leaderboard,
                animate: false,
                sort: 'desc',
                height: 200,
                width: 370
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
        displayAccordances : displayAccordances,
        setOtherTags : setOtherTags,
        setNumOtherTaggers : setNumOtherTaggers,
        setDistinctMoods : setDistinctMoods,
        storePoints : storePoints,
        generateNewPointsDistribution : generateNewPointsDistribution,
        setEndView : setEndView,
        setPoints : setPoints,
        incSharedPoints : incSharedPoints,
        toggleLeaderboard : toggleLeaderboard
    };
};
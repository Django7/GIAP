ID_Points_731 = function () {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", 'dictionaries/de/de.dic', false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                var allTextArr = allText.split('\n');
                allTextArr.forEach(function(line, idx) {
                    if(idx < 15) return;
                    DICT.push(line.split('/')[0].toLowerCase());
                });
            }
        }
    };
    var DICT = [];
    rawFile.send(null);

    /* The goals list and the element to display the goals in */
    var ELT = "",
        DISTINCT_TAGS = 0,
        TAG_COUNT_ALL = 0,
        YOUR_TAGS = 0,
        PIC_COUNT = 1,
        OTHER_TAGS = [],
        IN_TUTORIAL = false,
        IN_END = false,
        TIMER,
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
            $.get('views/mst_id_points_731.html', function (template) {
                if(TAG_COUNT_ALL == 0 && getCookie("731_count_tags_all") != "") {
                    TAG_COUNT_ALL = parseInt(getCookie("731_count_tags_all"));
                }
                var AVERAGE_TAGS = TAG_COUNT_ALL / PIC_COUNT;

                var params = {
                    points: POINTS,
                    avgTags : AVERAGE_TAGS,
                    min : 5,
                    sec : "00",
                    end_screen: false
                };
                var rendered = Mustache.render(template, params);
                $('#' + ELT).html(rendered);
                $('#averageTags').text(AVERAGE_TAGS);

                var next_btn = $('#next_img');
                next_btn.html('Bestätigen');
                next_btn.prop('onclick', null).off('click');
                next_btn.click(displayPoints);
                next_btn.click(stopTimer);
            });
        },

        setTutorialView = function() {
            IN_TUTORIAL = true;
            setView();
        },

        addNewTag = function(label) {
            if(!DICT.includes(label.toLowerCase())) {
                $('#myTags li:nth-last-child(2)').css({'background-color' : 'indianred'});
                YOUR_TAGS--;
            }
            TAG_COUNT_ALL++;
            YOUR_TAGS++;
            var AVERAGE_TAGS = TAG_COUNT_ALL / PIC_COUNT;
            $('#yourTags').text(AVERAGE_TAGS);

            POINTS += POINTS_INCR;
            adaptLeaderboard();
        },

        removeNewTag = function(label) {
            if(!DICT.includes(label.toLowerCase())) {
                YOUR_TAGS++;
            }
            TAG_COUNT_ALL--;
            YOUR_TAGS--;
            var AVERAGE_TAGS = TAG_COUNT_ALL / PIC_COUNT;
            $('#yourTags').text(AVERAGE_TAGS);

            POINTS -= POINTS_INCR;
            adaptLeaderboard();
        },

        generateNewPointsDistribution = function(mult) {
            OTHERS = [
                [(Math.random() * 14).toFixed(0) * 100 * mult, 'ProFlamer', '#607cae', 0],
                [(Math.random() * 14).toFixed(0) * 100 * mult, 'McSwizzle', '#607cae', 0],
                [(Math.random() * 14).toFixed(0) * 100 * mult, 'Xycor', '#607cae', 0],
                [(Math.random() * 14).toFixed(0) * 100 * mult, 'McDaSchu', '#607cae', 0]
            ]
        },

        displayPoints = function() {
            $.get('views/small_elements/mst_id_points_731_table.html', function (template) {
                disableTagFieldAndNextButton();
                var next_img_btn = $('#next_img');
                next_img_btn.html('Bestätigt');

                // Update points
                POINTS += $("#myTags").tagit("assignedTags").length;

                var params = {
                    end_page: false,
                    points: POINTS,
                    anyTags : OTHER_TAGS[0] !== null,
                    tag1 : OTHER_TAGS[0] !== null,
                    tag2 : OTHER_TAGS[1] !== null,
                    tag3 : OTHER_TAGS[2] !== null,
                    tag4 : OTHER_TAGS[3] !== null,
                    tag5 : OTHER_TAGS[4] !== null,
                    tag6 : OTHER_TAGS[5] !== null,
                    tag7 : OTHER_TAGS[6] !== null,
                    tag8 : OTHER_TAGS[7] !== null,
                    tag9 : OTHER_TAGS[8] !== null,
                    tag10 : OTHER_TAGS[9] !== null,
                    tag1text : OTHER_TAGS[0],
                    tag2text : OTHER_TAGS[1],
                    tag3text : OTHER_TAGS[2],
                    tag4text : OTHER_TAGS[3],
                    tag5text : OTHER_TAGS[4],
                    tag6text : OTHER_TAGS[5],
                    tag7text : OTHER_TAGS[6],
                    tag8text : OTHER_TAGS[7],
                    tag9text : OTHER_TAGS[8],
                    tag10text : OTHER_TAGS[9]
                };

                // Render the statistics, print them and activate the buttons
                var rendered = Mustache.render(template, params);
                $('#beat_friend_ranking_etc').html(rendered);

                $('#numTags').text(DISTINCT_TAGS);

                var username = getCookie('lb_username');
                username = username === "" ? 'Du' : username;

                if(IN_TUTORIAL){
                    username = "Du (Bsp.)";
                }

                // Display the ranking
                var leaderboard = OTHERS;

                $("#myTags").tagit("assignedTags").forEach(function(tag) {
                    OTHER_TAGS.forEach(function(otherTag, idx) {
                        if(tag == otherTag) {
                            YOUR_TAGS++;
                            $("#tag" + (idx + 1).toString()).css({'background-color' : 'darkorange'});
                        }
                    })
                });

                leaderboard.push([YOUR_TAGS * 100, username, '#5b67f1', 1]);

                var lb = $('#div_it_id_points_731_lb');
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
            OTHER_TAGS = [];
            for(var i = 0; i < others.length; i++) {
                OTHER_TAGS.push(others[i].tag);
            }
        },

        setDistinctMoods = function(num) {
            DISTINCT_TAGS = num.num;
        },

        storePoints = function() {
            setCookie('731_points', POINTS);
            setCookie('731_count_tags_all', TAG_COUNT_ALL);
            clearInterval(TIMER);
        },

        setUsername = function(name) {
            setCookie('lb_username', name);
        },

        setEndView = function() {
            IN_END = true;

            $.get('views/mst_id_points_731.html', function (template) {
                disableTagFieldAndNextButton();

                var params = {
                    end_screen: true,
                    points: POINTS
                };

                // Render the statistics, print them and activate the buttons
                var rendered = Mustache.render(template, params);
                $('#' + ELT).html(rendered);

                $.get('views/small_elements/mst_id_points_731_table.html', function (template) {
                    disableTagFieldAndNextButton();

                    var params = {
                        end_page: true,
                        anyTags: false
                    };

                    // Render the statistics, print them and activate the buttons
                    var rendered = Mustache.render(template, params);
                    $('#beat_friend_ranking_etc').html(rendered);

                    var username = getCookie('lb_username');
                    username = username === "" ? 'Du' : username;

                    // Display the ranking
                    generateNewPointsDistribution(15);
                    var leaderboard = OTHERS;
                    leaderboard.push([POINTS * 100, username, '#5b67f1', 1]);

                    var lb = $('#div_it_id_points_731_lb');
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

        startTimer = function() {
            var min = 5, sec = 0;
            TIMER = setInterval(function() {
                sec--;
                if(sec < 0) {
                    min --;
                    if(min < 0) {
                        $('#next_img').click();
                        stopTimer();
                        return;
                    }
                    sec = 59;
                }

                $('#id_731_minutes').text(min);
                $('#id_731_seconds').text(sec < 10 ? "0" + sec.toString() : sec);
            }, 1000);
        },

        stopTimer = function() {
            clearInterval(TIMER);
        },

        renewImgCount = function() {
            if(getCookie("imgLeft") != "") {
                PIC_COUNT = 15 - parseInt(getCookie("imgLeft")) + 1;
            }
            YOUR_TAGS = 0;
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
        setUsername : setUsername,
        setEndView : setEndView,
        setPoints : setPoints,
        startTimer : startTimer,
        renewImgCount : renewImgCount
    };
};
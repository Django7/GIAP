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
        BONUS = 0,
        OTHER_TAGS = [],
        IN_TUTORIAL = false,
        IN_END = false,
        TIMER,
        numShownTags = 5,
        OTHERS = [
            [0, 'verdani', '#607cae', 0],
            [0, 'neo23', '#607cae', 0],
            [0, 'legolas', '#607cae', 0],
            [0, 'anork85', '#607cae', 0]
        ],
        pointsVerd = (Math.random() * 14).toFixed(0) * 100,
        pointsNeo = (Math.random() * 14).toFixed(0) * 100,
        pointsLego = (Math.random() * 14).toFixed(0) * 100,
        pointsAnork = (Math.random() * 14).toFixed(0) * 100,
        username = "",

        /**
         * Initializes the compare element
         */
        init = function (element) {
            ELT = element;
        },

        setView = function() {
            $.get('views/mst_id_points_731.html', function (template) {
                $('#id_731_time_text').css({'visibility' : 'visible'});

                OTHERS[0][0] = pointsVerd;
                OTHERS[1][0] = pointsNeo;
                OTHERS[2][0] = pointsLego;
                OTHERS[3][0] = pointsAnork;

                if(TAG_COUNT_ALL == 0 && getCookie("731_count_tags_all") != "") {
                    TAG_COUNT_ALL = parseInt(getCookie("731_count_tags_all"));
                }
                if(BONUS == 0 && getCookie("731_bonus") != "") {
                    BONUS = parseInt(getCookie("731_bonus"));
                }
                if(getCookie("imgLeft") != "") {
                    PIC_COUNT = 15 - parseInt(getCookie("imgLeft")) + 1;
                }
                var AVERAGE_TAGS = TAG_COUNT_ALL / PIC_COUNT;

                var params = {
                    points: POINTS,
                    avgTags : AVERAGE_TAGS.toFixed(2),
                    min : 5,
                    sec : "00",
                    end_screen: false
                };
                var rendered = Mustache.render(template, params);
                $('#' + ELT).html(rendered);
                $('#averageTags').text(AVERAGE_TAGS.toFixed(2));

                var next_btn = $('#next_img');
                next_btn.html('Bestätigen');
                next_btn.prop('onclick', null).off('click');
                next_btn.click(displayPoints);
                next_btn.click(stopTimer);
            });
        },

        showBoard = function() {
            $.get('views/small_elements/mst_id_points_731_table.html', function (templateTab) {
                var params = {
                    end_page: true,
                    points: POINTS
                };

                // Render the statistics, print them and activate the buttons
                var rendered = Mustache.render(templateTab, params);
                $('#beat_friend_ranking_etc').html(rendered);

                if(!IN_TUTORIAL) {
                    $('#numTags').text(DISTINCT_TAGS);
                } else {
                    $('#numTags').text(3);
                }

                username = getCookie('lb_username');
                username = username === "" ? 'Du' : username;

                if(IN_TUTORIAL){
                    username = "Du (Bsp.)";
                }

                // Display the ranking
                var leaderboard = [OTHERS[0], OTHERS[1], OTHERS[2], OTHERS[3]];
                leaderboard.push([TAG_COUNT_ALL * 100, username, '#5b67f1', 1]);

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

        setTutorialView = function() {
            IN_TUTORIAL = true;
            setView();
        },

        addNewTag = function(label) {
            if(!isInDICT(label.toLowerCase())) {
                $('#myTags li:nth-last-child(2)').css({'background-color' : 'indianred'});
                YOUR_TAGS--;
            }
            TAG_COUNT_ALL++;
            YOUR_TAGS++;
            var AVERAGE_TAGS = TAG_COUNT_ALL / PIC_COUNT;
            $('#yourTags').text(AVERAGE_TAGS.toFixed(2));

            POINTS += POINTS_INCR;

            var leaderboard = [OTHERS[0], OTHERS[1], OTHERS[2], OTHERS[3]];
            leaderboard.push([TAG_COUNT_ALL * 100, username, '#5b67f1', 1]);

            var lb = $('#div_it_id_points_731_lb');
            lb.html('');
            lb.jqBarGraph({
                data: leaderboard,
                animate: false,
                sort: 'desc',
                height: 200,
                width: 370
            });
        },

        removeNewTag = function(label) {
            if(!isInDICT(label.toLowerCase())) {
                YOUR_TAGS++;
            }
            TAG_COUNT_ALL--;
            YOUR_TAGS--;
            var AVERAGE_TAGS = TAG_COUNT_ALL / PIC_COUNT;
            $('#yourTags').text(AVERAGE_TAGS.toFixed(2));

            POINTS -= POINTS_INCR;

            var leaderboard = [OTHERS[0], OTHERS[1], OTHERS[2], OTHERS[3]];
            leaderboard.push([TAG_COUNT_ALL * 100, username, '#5b67f1', 1]);

            var lb = $('#div_it_id_points_731_lb');
            lb.html('');
            lb.jqBarGraph({
                data: leaderboard,
                animate: false,
                sort: 'desc',
                height: 200,
                width: 370
            });
        },

        generateNewPointsDistribution = function() {
            pointsVerd += (Math.random() * 14).toFixed(0) * 100;
            pointsNeo += (Math.random() * 14).toFixed(0) * 100;
            pointsLego += (Math.random() * 14).toFixed(0) * 100;
            pointsAnork += (Math.random() * 14).toFixed(0) * 100;

            OTHERS = [
                [pointsVerd, 'verdani', '#607cae', 0],
                [pointsNeo, 'neo23', '#607cae', 0],
                [pointsLego, 'legolas', '#607cae', 0],
                [pointsAnork, 'anork85', '#607cae', 0]
            ]
        },

        displayPoints = function() {
            $('#id_731_time_text').css({'visibility' : 'hidden'});

            disableTagFieldAndNextButton();
            var next_img_btn = $('#next_img');
            next_img_btn.html('Bestätigt');

            // Update points
            POINTS += $("#myTags").tagit("assignedTags").length;

            if(IN_TUTORIAL) {
                OTHER_TAGS.push('unruhig');
                OTHER_TAGS.push('verlassen');
                OTHER_TAGS.push('düster');
            }

            $.get('views/small_elements/mst_id_points_731_table.html', function (templateTab) {
                var params = {
                    end_page: false,
                    points: POINTS,
                    anyTags: OTHER_TAGS.length !== 0
                };

                // Render the statistics, print them and activate the buttons
                var rendered = Mustache.render(templateTab, params);
                $('#beat_friend_ranking_etc').html('');
                $('#beat_friend_ranking_etc').html(rendered);

                var tagsString = "";
                OTHER_TAGS.forEach(function(tag, idx) {
                    if(idx === numShownTags && numShownTags !== OTHER_TAGS.length) {
                        tagsString +=
                            "<li style=\"margin-bottom: 5px\">\n" +
                            "   <button class=\"btn btn-dark-gray\" onclick='ID_POINTS_731.increaseShownTags();'>\n" +
                            "    Mehr Tags anzeigen..." +
                            "   </button>\n" +
                            "</li>\n"

                    } else if (idx < numShownTags) {
                        tagsString +=
                            "<li style=\"margin-bottom: 5px\">\n" +
                            "   <button id=\"tag" + idx + "\" class=\"btn btn-dark-gray\">\n" +
                            "      " + tag + "<br>\n" +
                            "      <span id=\"happy" + idx + "\" style=\"font-size: 25px\" onclick=\"$('#tag" + idx + "').prop('disabled', true); $('#neutral" + idx + "').css({'display' : 'none'}); $('#negative" + idx + "').css({'display' : 'none'})\">🙂</span>\n" +
                            "      <span id=\"neutral" + idx + "\" style=\"font-size: 25px\" onclick=\"$('#tag" + idx + "').prop('disabled', true); $('#happy" + idx + "').css({'display' : 'none'}); $('#negative" + idx + "').css({'display' : 'none'})\">😐</span>\n" +
                            "      <span id=\"negative" + idx + "\" style=\"font-size: 25px\" onclick=\"$('#tag" + idx + "').prop('disabled', true); $('#neutral" + idx + "').css({'display' : 'none'}); $('#happy" + idx + "').css({'display' : 'none'})\">🙁</span>\n" +
                            "   </button>\n" +
                            "</li>\n"
                    }
                });
                $('#tagList').html(tagsString);

                var bonusOld = BONUS;
                $("#myTags").tagit("assignedTags").forEach(function(tag) {
                    OTHER_TAGS.forEach(function(otherTag, idx) {
                        if(tag == otherTag) {
                            BONUS++;
                            $("#tag" + (idx).toString()).css({'background-color' : 'cornflowerblue'});
                        }
                    })
                });
                $('#id_731_accordance').text(BONUS - bonusOld);

                if(!IN_TUTORIAL) {
                    $('#numTags').text(DISTINCT_TAGS);
                } else {
                    $('#numTags').text(3);
                }

                username = getCookie('lb_username');
                username = username === "" ? 'Du' : username;

                if(IN_TUTORIAL){
                    username = "Du (Bsp.)";
                }

                // Display the ranking
                var leaderboard = [OTHERS[0], OTHERS[1], OTHERS[2], OTHERS[3]];
                leaderboard.push([TAG_COUNT_ALL * 100, username, '#5b67f1', 1]);

                var lb = $('#div_it_id_points_731_lb');
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
            $('#numTags').text(DISTINCT_TAGS);
        },

        storePoints = function() {
            setCookie('731_points', POINTS);
            setCookie('731_bonus', BONUS);
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
                        anyTags: false,
                        accordance: BONUS,
                        accBonus: BONUS * 100
                    };

                    // Render the statistics, print them and activate the buttons
                    var rendered = Mustache.render(template, params);
                    $('#beat_friend_ranking_etc').html(rendered);

                    var username = getCookie('lb_username');
                    username = username === "" ? 'Du' : username;

                    // Display the ranking
                    var leaderboard = [OTHERS[0], OTHERS[1], OTHERS[2], OTHERS[3]];
                    leaderboard.push([TAG_COUNT_ALL * 100 + BONUS * 100, username, '#5b67f1', 1]);

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
        },

        isInDICT = function(label) {
            for(var i = 0; i < DICT.length; i++) {
                if(label === DICT[i].trim()) return true;
            }
            return false;
        },

        increaseShownTags = function() {
            numShownTags = numShownTags + 12;
            var tagsString = "";
            OTHER_TAGS.forEach(function(tag, idx) {
                if(idx === numShownTags && numShownTags !== OTHER_TAGS.length) {
                    tagsString +=
                        "<li style=\"margin-bottom: 5px\">\n" +
                        "   <button class=\"btn btn-dark-gray\" onclick='ID_POINTS_731.increaseShownTags();'>\n" +
                        "    Mehr Tags anzeigen..." +
                        "   </button>\n" +
                        "</li>\n"

                } else if (idx < numShownTags) {
                    tagsString +=
                        "<li style=\"margin-bottom: 5px\">\n" +
                        "   <button id=\"tag" + idx + "\" class=\"btn btn-dark-gray\">\n" +
                        "      " + tag + "<br>\n" +
                        "      <span id=\"happy" + idx + "\" style=\"font-size: 25px\" onclick=\"$('#tag" + idx + "').prop('disabled', true); $('#neutral" + idx + "').css({'display' : 'none'}); $('#negative" + idx + "').css({'display' : 'none'})\">🙂</span>\n" +
                        "      <span id=\"neutral" + idx + "\" style=\"font-size: 25px\" onclick=\"$('#tag" + idx + "').prop('disabled', true); $('#happy" + idx + "').css({'display' : 'none'}); $('#negative" + idx + "').css({'display' : 'none'})\">😐</span>\n" +
                        "      <span id=\"negative" + idx + "\" style=\"font-size: 25px\" onclick=\"$('#tag" + idx + "').prop('disabled', true); $('#neutral" + idx + "').css({'display' : 'none'}); $('#happy" + idx + "').css({'display' : 'none'})\">🙁</span>\n" +
                        "   </button>\n" +
                        "</li>\n"
                }
            });
            $('#tagList').html(tagsString);

            $("#myTags").tagit("assignedTags").forEach(function(tag) {
                OTHER_TAGS.forEach(function(otherTag, idx) {
                    if(tag == otherTag) {
                        BONUS++;
                        $("#tag" + (idx).toString()).css({'background-color' : 'cornflowerblue'});
                    }
                })
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
        displayPoints : displayPoints,
        setOtherPlayersTags : setOtherPlayersTags,
        setDistinctMoods : setDistinctMoods,
        storePoints : storePoints,
        setUsername : setUsername,
        setEndView : setEndView,
        setPoints : setPoints,
        startTimer : startTimer,
        stopTimer : stopTimer,
        showBoard : showBoard,
        renewImgCount : renewImgCount,
        increaseShownTags : increaseShownTags
    };
};
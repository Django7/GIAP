ID_Match_797 = function () {
    /* The goals list and the element to display the goals in */
    var ELT = "",
        POINTS = 0,
        POINTS_ROUND = 0,
        IN_TUTORIAL = false,
        IN_END = false,
        OTHERS = [
            [0, 'verdani', '#607cae', 0],
            [0, 'neo23', '#607cae', 0],
            [0, 'legolas', '#607cae', 0],
            [0, 'anork85', '#607cae', 0]
        ],
        TOP40TAGS = [],
        username = '',
        matchingTags = [],
        first = true,
        xtraPicture = true,



        /**
         * Initializes the compare element
         */
        init = function (element) {
            ELT = element;
        },

        setView = function () {

            for (var k = 0; k < TOP40TAGS.length; k++) {
                matchingTags.push(false);
            }
            POINTS_ROUND = 0;
            $.get('views/mst_id_match_797.html', function (template) {
                var params = {
                    end_screen: false
                };
                var rendered = Mustache.render(template, params);
                $('#' + ELT).html(rendered);
                showLeaderboard();
                var next_btn = $('#next_img');
                next_btn.html('Bestätigen');
                next_btn.prop('onclick', null).off('click');
                next_btn.click(function () {
                    checkTags();
                });
            });

        },

        setTutorialView = function () {
            IN_TUTORIAL = true;
            TOP40TAGS = ['unruhig', 'verlassen', 'düster', 'glücklich', 'ruhig', 'verträumt', 'dunkel', 'trist', 'warm'];
            setView();
        },

        setEndView = function () {
            IN_END = true;
            $.get('views/mst_id_match_797.html', function (template) {
                var params = {
                    end_screen: true,
                    add_picture: xtraPicture
                };
                var rendered = Mustache.render(template, params);
                $('#' + ELT).html(rendered);
            });
        },

        addNewTag = function () {

        },

        removeNewTag = function () {

        },

        setTimer = function(time) {
            startTimer(time);
        },


        startTimer = function(duration) {
            var timer = duration, minutes, seconds;
            setInterval(function () {
                minutes = parseInt(timer / 60, 10);
                seconds = parseInt(timer % 60, 10);
                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;
                $('#timer').html("");
                $('#timer').html(minutes + ":"+ seconds);
                if (--timer < 0) {
                    xtraPicture = false;
                }
            }, 1000);

        },

        checkTags = function () {
            disableTagFieldAndNextButton();
            var next_img_btn = $('#next_img');
            next_img_btn.html('Bestätigt');
            var ownTags = $("#myTags").tagit('assignedTags');
            for (var j = 0; j < ownTags.length; j++) {
                compareTag(ownTags[j]);
            }
            setVisible($('#points_round_text'));
            $('#points_round_797').html("");
            $('#points_round_797').html(POINTS_ROUND);
            updateLeaderboard();
            var htmlString = "";
            for (var k = 0; k < TOP40TAGS.length; k++) {
                if (matchingTags[k] === true) {
                    htmlString += "<p class='column'><b>" + TOP40TAGS[k] + "&#10004" + "</b></p>";
                } else {
                    htmlString += "<p class='column'>" + TOP40TAGS[k] + "</p>";
                }
            }
            $('#points_797').html("");
            $('#points_797').html(htmlString);
            setVisible($('#next_img_match_797'));
            $('#next_img_match_797').prop('onclick', null).off('click');
            $('#next_img_match_797').click(function () {
                btn_oc_postImageTags();
            });

        },

        saveTags = function (tags) {
           TOP40TAGS.length = 0;
         matchingTags.length = 0;
            tags.forEach(function (tagAndCount) {
                TOP40TAGS.push(tagAndCount.tag);
            });
        },

        compareTag = function (tag) {
            for (var i = 0; i < TOP40TAGS.length; i++) {
                if (tag.toLowerCase() === TOP40TAGS[i].toLowerCase()) {
                    matchingTags[i] = true;
                    POINTS++;
                    POINTS_ROUND++;
                }
            }
        },

        showLeaderboard = function () {
            username = getCookie('lb_username');
            username = username === "" ? 'Du' : username;

            if (IN_TUTORIAL) {
                username = "Du (Bsp.)";
            }

            // Display the ranking
            if (first) {
                setOtherPoints();
            }
            if (!IN_TUTORIAL) {
                first = false;
            }
            var leaderboard = [OTHERS[0], OTHERS[1], OTHERS[2], OTHERS[3]];
            leaderboard.push([POINTS, username, '#5b67f1', 1]);

            var lb = $('#div_it_id_match_797_lb');
            lb.html('');
            lb.jqBarGraph({
                data: leaderboard,
                animate: false,
                sort: 'desc',
                height: 100,
                width: 270
            });
        },

        updateLeaderboard = function () {
            var leaderboard = [OTHERS[0], OTHERS[1], OTHERS[2], OTHERS[3]];
            leaderboard.push([POINTS, username, '#5b67f1', 1]);

            var lb = $('#div_it_id_match_797_lb');
            lb.html('');
            lb.jqBarGraph({
                data: leaderboard,
                animate: false,
                sort: 'desc',
                height: 100,
                width: 270
            });
        },

        storePoints = function () {
            setCookie('points_797', POINTS);
        },

        getRandomTagCount = function (tags) {
            return tags[Math.floor(Math.random() * tags.length)];
        },

        setOtherPoints = function () {
            var verdPoints = getRandomTagCount([7]) * 15;
            var anorkPoints = getRandomTagCount([5, 6]) * 15;
            var neoPoints = getRandomTagCount([3, 4]) * 15;
            var legoPoints = getRandomTagCount([1, 2]) * 15;
            OTHERS = [
                [verdPoints, 'verdani', '#607cae', 0],
                [neoPoints, 'neo23', '#607cae', 0],
                [legoPoints, 'legolas', '#607cae', 0],
                [anorkPoints, 'anork85', '#607cae', 0]
            ];
        };



    /**
     * Return the 'public' methods
     */
    return {
        init: init,
        setView: setView,
        setTutorialView: setTutorialView,
        setEndView: setEndView,
        addNewTag: addNewTag,
        removeNewTag: removeNewTag,
        saveTags: saveTags,
        checkTags : checkTags,
        storePoints: storePoints,
        setTimer : setTimer,
        startTimer : startTimer,
        setOtherPoints : setOtherPoints
    };

};
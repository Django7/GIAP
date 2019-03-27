ID_Compare_787 = function () {
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
        TOP10TAGS = [],
        TOP15TAGS = [],
        TOP20TAGS = [],
        TOP25TAGS = [],
        TOP40TAGS = [],
        username = '',
        verdPoints = 0,
        neoPoints = 0,
        legoPoints = 0,
        anorkPoints = 0,
        winner = false,
        rounds_won = 0,

        /**
         * Initializes the compare element
         */
        init = function (element) {
            ELT = element;
        },

        setView = function () {
            if (IN_TUTORIAL) {
                TOP10TAGS = ['unruhig', 'verlassen', 'düster', 'glücklich', 'ruhig', 'verträumt', 'dunkel', 'trist', 'warm'];
            }
            POINTS_ROUND = 0;
            $.get('views/mst_id_compare_787.html', function (template) {
                var params = {
                    end_screen: false
                };
                var rendered = Mustache.render(template, params);
                $('#' + ELT).html(rendered);
                var next_btn = $('#next_img');
                next_btn.html('Bestätigen');
                next_btn.prop('onclick', null).off('click');
                next_btn.click(function () {
                    rateTags()
                });
            });
        },

        setTutorialView = function () {
            IN_TUTORIAL = true;
            setView();
        },

        setEndView = function () {
            IN_END = true;
            $.get('views/mst_id_compare_787.html', function (template) {
                var params = {
                    end_screen: true,
                    rounds_won: rounds_won
                };
                var rendered = Mustache.render(template, params);
                $('#' + ELT).html(rendered);
            });
        },

        addNewTag = function () {
        },

        removeNewTag = function () {
        },

        saveTags = function (tags, number) {
            switch (number) {
                case 10: {
                    tags.forEach(function (tagAndCount) {
                        TOP10TAGS.push(tagAndCount.tag);
                    });
                    break;
                }
                case 15: {
                    tags.forEach(function (tagAndCount) {
                        TOP15TAGS.push(tagAndCount.tag);
                    });
                    break;
                }
                case 20: {
                    tags.forEach(function (tagAndCount) {
                        TOP20TAGS.push(tagAndCount.tag);
                    });
                    break;
                }
                case 25: {
                    tags.forEach(function (tagAndCount) {
                        TOP25TAGS.push(tagAndCount.tag);
                    });
                    break;
                }
                case 40: {
                    tags.forEach(function (tagAndCount) {
                        TOP40TAGS.push(tagAndCount.tag);
                    });
                    break;
                }
                default : {

                }
            }

        },

        rateTags = function () {
            disableTagFieldAndNextButton();
            var next_img_btn = $('#next_img');
            next_img_btn.html('Bestätigt');
            var ownTags = $("#myTags").tagit('assignedTags');
            var tagPoints = [];
            for (var i = 0; i < ownTags.length; i++) {
                if (compareTags(TOP10TAGS, ownTags[i])) {
                    POINTS_ROUND += 50;
                    tagPoints[i] = "50 Punkte";
                    continue;
                }
                if (compareTags(TOP15TAGS, ownTags[i])) {
                    POINTS_ROUND += 40;
                    tagPoints[i] = "40 Punkte";
                    continue;
                }
                if (compareTags(TOP25TAGS, ownTags[i])) {
                    POINTS_ROUND += 30;
                    tagPoints[i] = "30 Punkte";
                    continue;
                }
                if (compareTags(TOP25TAGS, ownTags[i])) {
                    POINTS_ROUND += 20;
                    tagPoints[i] = "20 Punkte";
                    continue;
                }
                if (compareTags(TOP40TAGS, ownTags[i])) {
                    POINTS_ROUND += 10;
                    tagPoints[i] = "10 Punkte";
                } else {
                    tagPoints[i] = "0 Punkte";
                }
            }
            checkWinner();
            var tagsOrdered = [];
            var tagPtsordered = [];
            for (var k = 0; k < tagPoints.length; k++) {
                if (tagPoints[k].includes("50")) {
                    tagPtsordered.push(tagPoints[k]);
                    tagsOrdered.push(ownTags[k]);
                }
            }
            for (var l = 0; l < tagPoints.length; l++) {
                if (tagPoints[l].includes("40")) {
                    tagPtsordered.push(tagPoints[l]);
                    tagsOrdered.push(ownTags[l]);
                }
            }
            for (var m = 0; m < tagPoints.length; m++) {
                if (tagPoints[m].includes("30")) {
                    tagPtsordered.push(tagPoints[m]);
                    tagsOrdered.push(ownTags[m]);
                }
            }
            for (var n = 0; n < tagPoints.length; n++) {
                if (tagPoints[n].includes("20")) {
                    tagPtsordered.push(tagPoints[n]);
                    tagsOrdered.push(ownTags[n]);
                }
            }
            for (var o = 0; o < tagPoints.length; o++) {
                if (tagPoints[o].includes("10")) {
                    tagPtsordered.push(tagPoints[o]);
                    tagsOrdered.push(ownTags[o]);
                }
            }
            for (var p = 0; p < tagPoints.length; p++) {
                if (tagPoints[p] === "0 Punkte") {
                    tagPtsordered.push(tagPoints[p]);
                    tagsOrdered.push(ownTags[p]);
                }
            }
            var htmlString = "";
            for (var j = 0; j < ownTags.length; j++) {
                htmlString += "<p>" + tagsOrdered[j] + ": <b>" + tagPtsordered[j] + "</b></p>\n";
            }
            $('#xtraPointsDiv').html('');
            $('#xtraPointsDiv').html(htmlString);
            setVisible($('#LBHeading'));
            showLeaderboard();
            if (winner) {
                setVisible($('#winner_787'));
                rounds_won +=1;
            } else {
                setVisible($('#no_win_787'));
            }
            setVisible($('#next_img_compare_787'));
            $('#next_img_compare_787').prop('onclick', null).off('click');
            $('#next_img_compare_787').click(function () {
                btn_oc_postImageTags();
            });
        },

        compareTags = function (tagList, tag) {
            for (var k = 0; k < tagList.length; k++) {
                if (tag === tagList[k]) {
                    return true;
                }
            }
            return false;
        },

        storePoints = function () {
            setCookie('787_points', POINTS);
        },

        setPoints = function () {
            POINTS += POINTS_ROUND;
        },

        showLeaderboard = function () {
            username = getCookie('lb_username');
            username = username === "" ? 'Du' : username;

            if (IN_TUTORIAL) {
                username = "Du (Bsp.)";
            }

            // Display the ranking
            setOtherPoints();
            var leaderboard = [OTHERS[0], OTHERS[1], OTHERS[2], OTHERS[3]];
            leaderboard.push([POINTS_ROUND, username, '#5b67f1', 1]);

            var lb = $('#div_it_id_compare_787_lb');
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
            leaderboard.push([POINTS_ROUND, username, '#5b67f1', 1]);

            var lb = $('#div_it_id_compare_787_lb');
            lb.html('');
            lb.jqBarGraph({
                data: leaderboard,
                animate: false,
                sort: 'desc',
                height: 100,
                width: 270
            });
        },

        checkWinner = function () {
            var max = Math.max(verdPoints, neoPoints, legoPoints, anorkPoints);
            winner = POINTS_ROUND > max;
        },

        getRandomXtra = function(tagCount) {
            var xtra = [10,20,30,40,50];
            var xtraPoints =0;
            for (var i=0; i <tagCount; i++) {
                xtraPoints += xtra[Math.floor(Math.random()*xtra.length)];
            }
            return xtraPoints;
        },

        getRandomTagCount = function() {
            var tags = [4, 5, 6];
            return tags[Math.floor(Math.random()*tags.length)];
        },

        setOtherPoints = function () {
            verdPoints = getRandomXtra(7);
            neoPoints = getRandomXtra(7);
            var lego = getRandomTagCount();
            legoPoints = getRandomXtra(lego);
            var anork = getRandomTagCount();
            anorkPoints = getRandomXtra(anork);
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
        rateTags: rateTags,
        storePoints: storePoints,
        setOtherPoints: setOtherPoints,
        setPoints: setPoints
    };
};
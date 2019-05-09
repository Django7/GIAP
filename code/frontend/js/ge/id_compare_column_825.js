ID_Compare_Column_825 = function () {
    /* The goals list and the element to display the goals in */
    var ELT = "",
        POINTS = 0,
        WORDS_ROUND = 0,
        IN_TUTORIAL = false,
        IN_END = false,
        TAG_NO = 0,
        OTHERS = [
            [0, 'verdani', '#607cae', 0],
            [0, 'neo23', '#607cae', 0],
            [0, 'legolas', '#607cae', 0],
            [0, 'anork85', '#607cae', 0]
        ],
        username = '',
        minTags = false,
        progressbar_width,


        /**
         * Initializes the compare element
         */
        init = function (element) {
            ELT = element;
        },

        setView = function() {
            WORDS_ROUND = 0;
            setOtherTagCount();
            $.get('views/mst_id_compare_column_825.html', function (template) {
                var params = {
                    end_screen: false,
                    tags_other: TAG_NO
                };
                var rendered = Mustache.render(template, params);
                $('#' + ELT).html(rendered);
                $('#progress_825').css("width", progressbar_width);
                $('#points_825').html(POINTS);
                var next_btn = $('#next_img');
                next_btn.html('Bestätigen');
                next_btn.prop('onclick', null).off('click');
                next_btn.click(function () {
                    showNextButton();
                });
            });

        },

        showNextButton = function() {
            disableTagFieldAndNextButton();
            var next_img_btn = $('#next_img');
            next_img_btn.html('Bestätigt');
            setVisible($('#next_img_compare_column_825'));
            if (IN_TUTORIAL) {
                progressbar_width = 0;
                POINTS = 0;
            } else {
                progressbar_width = $('#progress_825').width();
            }
            $('#next_img_compare_column_825').prop('onclick', null).off('click');
            $('#next_img_compare_column_825').click(function () {
                btn_oc_postImageTags();
            });
        },

        setTutorialView = function() {
            IN_TUTORIAL = true;
            setView();

        },

        setEndView = function() {
            IN_END = true;
            $.get('views/mst_id_compare_column_825.html', function (template) {
                var params = {
                    end_screen: true
                };
                var rendered = Mustache.render(template, params);
                $('#' + ELT).html(rendered);
                showLeaderboard();
            });

        },

        addNewTag = function() {
            WORDS_ROUND++;
            POINTS++;
            $('#points_825').html(POINTS);
            checkMinTags();
            if (POINTS < 105) {
                adjustProgressBar(true);
            }

        },

        removeNewTag = function() {
            WORDS_ROUND--;
            POINTS--;
            $('#points_825').html(POINTS);
            if (WORDS_ROUND < TAG_NO) {
                minTags = false;
            }
            adjustProgressBar(false);

        },

        adjustProgressBar = function(isPositive) {
          var percent = $('#progress_825').width();
          printLog(percent + "is the current width");
          if (isPositive) {
              $('#progress_825').css("width", percent + 4.5);
          } else {
              $('#progress_825').css("width", percent - 4.5);
          }
        },

        checkMinTags = function() {
            if (WORDS_ROUND >= TAG_NO && !minTags) {
                minTags = true;
                BootstrapDialog.show({
                    title: 'Mindestanzahl erreicht',
                    message: $('<div>Sehr gut, du hast mindestens so viele Tags eingegeben wie der Durchschnitt</div>'),
                    closable: false,
                    buttons: [{
                        label: 'Weiter',
                        action: function (dialogItself) {
                            dialogItself.close();
                        }
                    }]
                });
            }
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
            leaderboard.push([POINTS, username, '#5b67f1', 1]);

            var lb = $('#div_it_id_compare_column_825_lb');
            lb.html('');
            lb.jqBarGraph({
                data: leaderboard,
                animate: false,
                sort: 'desc',
                height: 100,
                width: 270
            });
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
        },

        getRandomTagCount = function(tags) {
            return tags[Math.floor(Math.random() * tags.length)];
        },

        storePoints = function () {
            setCookie('825_points', POINTS);
        },

        setOtherTagCount = function() {
            var tags = [6,7,8];
            TAG_NO = getRandomTagCount(tags);
        };

    /**
     * Return the 'public' methods
     */
    return {
        init: init,
        setView : setView,
        setTutorialView : setTutorialView,
        setEndView : setEndView,
        addNewTag : addNewTag,
        removeNewTag : removeNewTag,
        storePoints : storePoints,
        showNextButton : showNextButton

    };
};
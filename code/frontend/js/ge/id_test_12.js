ID_Test_12 = function() {

    var ELT = "",
        IN_TUTORIAL = false,
        TAGS = [],
        MATCHING_TAGS = 0,
        STATS = {
            p1_wins: 0,
            p2_wins: 0,
        },
        USER_WON_THIS_ROUND = false,
        TIMER = null,
        TAGS_TO_MATCH = 4,


        init = function(element) {
            ELT = element;
        },

        setView = function() {
            IN_TUTORIAL = false;
            setIDTest12View(false, false);

        },

        setTutorialView = function() {
            IN_TUTORIAL = true;
            setIDTest12View(true, false);

        },

        setEndView = function() {
            setIDTest12View(false, true);
            $('#rounds_won').text(STATS.p1_wins);
            $('#rounds_won_2').text(STATS.p1_wins);
        },

        setIDTest12View = function(in_tutorial, in_end) {
        getStats();
            MATCHING_TAGS = 0;
            if (in_end) {
                $.get('views/mst_id_test_12.html', function(template) {
                    var params = {
                        end_page: true,
                        p1_win: STATS.p1_wins > STATS.p2_wins,
                        p2_win: STATS.p1_wins <= STATS.p2_wins
                    };
                    var rendered = Mustache.render(template, params);
                    $('#' + ELT).html(rendered);
                });
            } else {
                $('#' + ELT).html(
                    '<div style = "font-size:large">' +
                    'Deine getroffenen Wörter:' +
                    '<ul id="word_list", class="list_inline">' +
                    '</ul>' +
                    '</div>');
                var next_btn = $('#next_img');
                next_btn.html('Runde aufgeben');
                next_btn.prop('onclick', null).off('click');
                next_btn.click(function() {
                    confirmTags(false, true);
                });
            }
            if (in_tutorial) {
                TAGS_TO_MATCH = 3;
            }

        },

        storeStats = function() {
        setCookie('test_12_p1_wins', STATS.p1_wins);
        setCookie('test_12_p2_wins', STATS.p2_wins);
        },

        getStats = function() {
        var p1Wins = getCookie('test_12_p1_wins');
        var p2Wins = getCookie('test_12_p2_wins');

        STATS.p1_wins = p1Wins.length > 0 ? Number(p1Wins) : 0;
        STATS.p2_wins = p2Wins.length > 0 ? Number(p2Wins) : 0;
        },

        addNewTag = function(tag) {
            if (checkTag(tag)) {
                MATCHING_TAGS++;
                $('#word_list').append('<li class="pt-3">\n' +
                    '            <button type="button" class="btn bg-dark-gray other_tags_review_fitting">\n' +
                    '            ' + tag + '\n' +
                    '            </button>\n' +
                    '        </li>');

            }
            if (MATCHING_TAGS >= TAGS_TO_MATCH) {
                confirmTags(true, false);
            }

        },

        removeNewTag = function(tag) {
            if (checkTag(tag)) {
                MATCHING_TAGS--;
            }
        },


        setTimer = function() {
            if (!IN_TUTORIAL) {
                TIMER = setTimeout(function()  {
                    confirmTags(false, false);
                }, getRandomNumber(50, 90) * 1000);
            } else {
                printLog('did not start timer, because it is still tutorial');
            }

        },

        stopTimer = function() {
            clearTimeout(TIMER);
        },

    setTags = function(tags) {
        TAGS = tags;
    },

        checkTag = function(tag) {
            for (var i = 0; i<TAGS.length; i++) {
                if (TAGS[i].tag.toLowerCase() === tag.toLowerCase()) {
                    return true;
                } else {
                    continue;
                }
            }
            return false;
        },

        confirmTags = function(user_won, user_gave_up) {
            stopTimer();
            $('#next_img').html(user_gave_up ? 'Aufgegeben' : 'Runde beendet');
            disableTagFieldAndNextButton();
            if (user_won) {
                STATS.p1_wins++;
                USER_WON_THIS_ROUND = true;
            }

            if (user_gave_up) {
                STATS.p2_wins++;
                USER_WON_THIS_ROUND = false;
            }

            if (user_gave_up && user_won) {
                printWarn('this should not happen');
            }

            var opponent_gave_up = false;
            if (!user_won && !user_gave_up) {
                if (Math.random() >= 0.5) {
                    STATS.p1_wins++;
                    USER_WON_THIS_ROUND = true;
                    opponent_gave_up = true;
                } else {
                    STATS.p2_wins++;
                    USER_WON_THIS_ROUND = false;
                }
            }
            showWinner(user_gave_up, opponent_gave_up);

        },

        showWinner = function(user_gave_up, opponent_gave_up) {

            $.get('views/mst_id_test_12.html', function(template) {
                var params = {
                    p1_win_round : USER_WON_THIS_ROUND,
                    p2_win_round: !USER_WON_THIS_ROUND,
                    submit: user_gave_up || opponent_gave_up,
                    p1_wins: STATS.p1_wins,
                    p2_wins: STATS.p2_wins,
                    end_page: false,
                    btn_listener: IN_TUTORIAL ? 'btn_oc_viewTutorialFinished()' : 'btn_oc_postImageTags()'

                };
                var rendered = Mustache.render(template, params);
                $ ('#' + ELT).append(rendered);
            });

        };

    return {
        init: init,
        setView: setView,
        setEndView: setEndView,
        setTutorialView: setTutorialView,
        addNewTag: addNewTag,
        removeNewTag: removeNewTag,
        setTimer: setTimer,
        confirmTags: confirmTags,
        setTags: setTags,
        storeStats: storeStats,
        getStats: getStats
    };


};

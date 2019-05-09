ID_Compare_809 = function () {
    /* The goals list and the element to display the goals in */
    var ELT = "",
        POINTS = 0,
        WORDS_ROUND = 0,
        IN_TUTORIAL = false,
        IN_END = false,
        TAG_NO = 0,
        NOUN = 0,
        ADJECTIVE = 0,
        OTHER = 0,
        TOP25 = [],
        VISUELL = 0,
        GEFUEHLVOLL = 0,
        KREATIV = 0,
        //DIC_SET = false,
        //DICT = [],
        //DICT_ORDERED = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],


        /**
         * Initializes the compare element
         */
        init = function (element) {
            ELT = element;
        },

        setView = function() {
            WORDS_ROUND = 0;
           // setDictionary();
            setPoints();
            setOtherTagCount();
            $.get('views/mst_id_compare_809.html', function (template) {
                    var params = {
                        end_screen: false,
                        tags_other: TAG_NO
                    };
                    var rendered = Mustache.render(template, params);
                    $('#' + ELT).html(rendered);
                var next_btn = $('#next_img');
                next_btn.html('Bestätigen');
                next_btn.prop('onclick', null).off('click');
                next_btn.click(function () {
                    showTagCount()
                });
            });

        },

        setTutorialView = function() {
            IN_TUTORIAL = true;
            setView();

        },

        setEndView = function() {
            IN_END = true;
            checkGroup();
            $.get('views/mst_id_compare_809.html', function (template) {
                var params = {
                    end_screen: true,
                    visuell_809: VISUELL,
                    gefuehlvoll_809: GEFUEHLVOLL,
                    kreativ_809: KREATIV
                };
                var rendered = Mustache.render(template, params);
                $('#' + ELT).html(rendered);
            });
        },

  /*      setDictionary = function() {
            if (!DIC_SET) {
                $.get('dictionaries/de2/german.dic', function(data) {
                    DICT = data.split("\n");
                });
                for (var l=0; l<DICT.length; l++) {
                    switch (DICT[l].charAt(0).toLowerCase()) {
                        case "a": {
                            DICT_ORDERED[0].push(DICT[l]);
                            break;
                        }
                        case "b" : {
                            DICT_ORDERED[1].push(DICT[l]);
                            break;
                        }
                    }
                }
                DIC_SET = true;
            }
        },
*/
        addNewTag = function(tag) {
            WORDS_ROUND++;
            POINTS++;
            var set = false;
            var in25 = false;
            for (var i = 0; i<TOP25.length; i++) {
                if(tag.toLowerCase() === TOP25[i].toLowerCase()) {
                    in25 = true;
                    break;
                }
            }
            if (!in25) {
                OTHER++;
                set = true;
            }
            if (!set) {
                var capitalLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
                for (var j = 0; j < capitalLetters.length; j++) {
                    if (tag.toString().charAt(0) === capitalLetters[j]) {
                        NOUN++;
                        set = true;
                        break;
                    }
                }
            }
                if (!set) {
                    ADJECTIVE++;
               }
        },

   /*     checkNoun = function (tag) {
            printLog(tag.toString().toLowerCase());
            for (var k=0; k<DICT.length; k++) {
                if (tag.toString().toLowerCase() === DICT[k].toLowerCase()) {
                    printLog(DICT[k]);
                    return isUpperCase(DICT[k].charAt(0));
                }
            }
        },

        isUpperCase = function(a) {
            var b = a.toLowerCase();
            printLog(a + 'und in klein' + b);
            return a !== b;
        },
*/
        removeNewTag = function() {
            WORDS_ROUND--;
            POINTS--;

        },

        showTagCount = function() {
            disableTagFieldAndNextButton();
            var next_img_btn = $('#next_img');
            next_img_btn.html('Bestätigt');
            if (WORDS_ROUND >= TAG_NO) {
                $('#tag_809_more').html('');
                $('#tag_809_more').html(WORDS_ROUND);
                setVisible($('#tags_809_more'));
            } else {
                $('#tag_809_less').html('');
                $('#tag_809_less').html(WORDS_ROUND);
                setVisible($('#tags_809_less'));
            }
            setVisible($('#next_img_compare_809'));
            $('#next_img_compare_809').prop('onclick', null).off('click');
            $('#next_img_compare_809').click(function () {
                btn_oc_postImageTags();
            });
        },

        checkGroup = function() {
            if ( NOUN <= 10) {
                NOUN += 10;
                ADJECTIVE -= 10;
            }
            VISUELL = Math.round((NOUN*100) / POINTS);
            GEFUEHLVOLL = Math.round((ADJECTIVE*100) / POINTS);
            KREATIV = Math.round((OTHER*100) / POINTS);
        },

        saveTags = function(tags) {
            TOP25.length = 0;
            tags.forEach(function (tagAndCount) {
                TOP25.push(tagAndCount.tag);
            });
        },

        setPoints = function() {
            POINTS = getCookie('points_809');
        },


        storePoints = function () {
            setCookie('points_809', POINTS);
        },

        setOtherTagCount = function() {
            var tags = [6,7,8];
            TAG_NO = tags[Math.floor(Math.random() * tags.length)];
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
        showTagCount : showTagCount,
        storePoints : storePoints,
        setPoints : setPoints,
        saveTags : saveTags

    };
};
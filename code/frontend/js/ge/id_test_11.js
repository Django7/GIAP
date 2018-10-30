ID_Test_11 = function () {
    /* The goals list and the element to display the goals in */
    var ELT = "",
        AVERAGE_TAGS = (Math.random() * 2 + 6).toFixed(2),
        YOUR_TAGS = 0,
        IN_TUTORIAL = false,
        IN_END = false,

        /**
         * Initializes the compare element
         */
        init = function (element) {
            ELT = element;
        },

        setView = function() {
            $.get('views/mst_id_test_11.html', function (template) {
                var params = {
                    points: POINTS,
                    end_screen: false
                };
                var rendered = Mustache.render(template, params);
                $('#' + ELT).html(rendered);
                $('#averageTags').text(AVERAGE_TAGS);
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
        };


    /**
     * Return the 'public' methods
     */
    return {
        init: init,
        setView: setView,
        setTutorialView : setTutorialView,
        addNewTag: addNewTag,
        removeNewTag: removeNewTag
    };
};
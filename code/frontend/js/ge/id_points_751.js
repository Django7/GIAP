ID_Points_751 = function () {
    /* The goals list and the element to display the goals in */
    var ELT = "",
        POINTS = 0,
        OTHER_TAGS = [],
        IN_TUTORIAL = false,
        IN_END = false,

        /**
         * Initializes the compare element
         */
        init = function (element) {
            ELT = element;
        },

        setView = function() {
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
            });
        },

        displayTable = function() {
            $.get('views/small_elements/mst_id_points_751_table.html', function (template) {

            });
        },

        setTutorialView = function() {
            IN_TUTORIAL = true;
            setView();
        },

        afterTagAdded = function(label) {
            POINTS++;
        },

        afterTagRemoved = function(label) {
            POINTS--;
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
        setPoints : setPoints
    };
};
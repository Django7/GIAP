ID_Compare_746 = function () {
    /* The goals list and the element to display the goals in */
    var ELT = "",
        POINTS = 0,
        OTHER_TAGS = [],
        OTHER_TAGS_COUNT = [],
        NUM_OTHER_TAGGERS = 0,
        IN_TUTORIAL = false,
        IN_END = false,

        /**
         * Initializes the compare element
         */
        init = function (element) {
            ELT = element;
        },

        setView = function() {
            $.get('views/mst_id_compare_746.html', function (template) {
                var params = {
                    end_screen: false
                };

                var rendered = Mustache.render(template, params);
                $('#' + ELT).html(rendered);

                var next_btn = $('#next_img');
                next_btn.html('Bestätigen');
                next_btn.prop('onclick', null).off('click');
                next_btn.click(displayAccordances);
            });
        },

        displayAccordances = function() {
            $.get('views/small_elements/mst_id_compare_746_comparisons.html', function (template) {

                disableTagFieldAndNextButton();
                var next_img_btn = $('#next_img');
                next_img_btn.html('Bestätigt');

                var params = {
                    end_page: false
                };
                var rendered = Mustache.render(template, params);
                $('#wordStatsDiv').html(rendered);

                if(IN_TUTORIAL) {
                    OTHER_TAGS.push('unruhig');
                    OTHER_TAGS_COUNT.push(3);
                    OTHER_TAGS.push('verlassen');
                    OTHER_TAGS_COUNT.push(5);
                    OTHER_TAGS.push('düster');
                    OTHER_TAGS_COUNT.push(2);
                    NUM_OTHER_TAGGERS = 9;
                }

                //Calculate accordances
                var ownTags = $("#myTags").tagit("assignedTags");
                var htmlString = "";
                ownTags.forEach(function(ownTag) {
                    for(var i=0; i<OTHER_TAGS.length; i++) {
                        if(ownTag === OTHER_TAGS[i]) {
                            htmlString += "<p>" + ownTag + ": <b>" + ((OTHER_TAGS_COUNT[i] / NUM_OTHER_TAGGERS) * 100).toFixed(2).toString() + "%</b></p>\n";
                            return;
                        }
                    }
                    htmlString += "<p>" + ownTag + ": <b>0.00%</b></p>\n";
                });
                $('#accordancesDiv').html('');
                $('#accordancesDiv').html(htmlString);
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
            setCookie('746_points', POINTS);
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

        setEndView = function() {
            IN_END = true;

            $.get('views/mst_id_compare_746.html', function (template) {
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
        displayAccordances : displayAccordances,
        setOtherTags : setOtherTags,
        setNumOtherTaggers : setNumOtherTaggers,
        storePoints : storePoints,
        setEndView : setEndView,
        setPoints : setPoints
    };
};
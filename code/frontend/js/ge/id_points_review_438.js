/**
 * This class holds methods and variables for user with id 438
 * @returns {{init: init, setView: setView, updateView: updateView}}
 * @constructor
 */
ID_Points_Review_438 = function () {
    /* The goals list and the element to display the goals in */
    var ELT = "",
        POINTS = 0,
        OTHER_PLAYERS_TAGS = [],
        TIMER_MAX = 60,
        IN_TUTORIAL = false,
        IN_END = false,
        TIMER = null,
        PLAYERS = 5,
        MAX_OCCURENCE = 1,

        /**
         * Initializes the compare element
         */
        init = function (element) {
            ELT = element;
        },

        /**
         * Sets the view
         */
        setView = function () {
            IN_TUTORIAL = false;
            IN_END = false;

            setIDPointsReviewView(false);
        },

        /**
         * Sets the other users tags
         * @param tags
         */
        setOtherPlayersTags = function (tags) {
            OTHER_PLAYERS_TAGS = tags;
        },

        /**
         * Displays the list to review
         */
        displayOtherPlayersTags = function (in_tutorial) {
            setVisible($('#div_it_id_points_review_other_tags'));
            $.get('views/small_elements/mst_id_points_review_438_table.html', function (template) {
                var points_in_this_image = 0;
                var user_tags = $("#myTags").tagit("assignedTags");
                var tags_to_display = [];

                if(OTHER_PLAYERS_TAGS.length > 0){
                    MAX_OCCURENCE = OTHER_PLAYERS_TAGS[0].num;
                }else{
                    // TODO: check whether this fits
                    MAX_OCCURENCE = 3;
                }

                // Calculate the points and add the user tags to the list
                for(var i = 0; i < user_tags.length; i++){
                    var tag = user_tags[i];
                    var num = -1;
                    for(var j = 0; j < OTHER_PLAYERS_TAGS.length; j++){
                        if(tag.toLowerCase() === OTHER_PLAYERS_TAGS[j].tag.toLowerCase()){
                            num = getPointsRelativeToPlayers(OTHER_PLAYERS_TAGS[j].num);
                            break;
                        }
                    }
                    if(num >= 0){
                        points_in_this_image += num;
                    }
                    tags_to_display.push({tag: tag, num: num > 0 ? num : 0, style:'font-weight:bold'});
                }

                // Append 4- (max) 20 tags of other users the user did not use
                var num_of_tags = getRandomNumber(4,21);
                num_of_tags = num_of_tags >= OTHER_PLAYERS_TAGS.length ? OTHER_PLAYERS_TAGS.length : num_of_tags;

                for(var i = 0; i < num_of_tags; i++){
                    var found = false;
                    for(var j = 0; j < user_tags.length; j++){ // only the first [user_tags.length] words need to get checked

                        if (OTHER_PLAYERS_TAGS[i].tag.toLowerCase() === tags_to_display[j].tag.toLowerCase()) {
                            found = true;
                            break;
                        }
                    }
                    if(!found){
                        tags_to_display.push({tag: OTHER_PLAYERS_TAGS[i].tag, class: 'invisible'});
                    }
                }

                var params={
                    points: points_in_this_image,
                    other_tags: tags_to_display
                };


                var rendered = Mustache.render(template, params);
                $('#div_it_id_points_review_table').html(rendered);

                // Update the points
                updatePoints(POINTS + points_in_this_image);
            });
        },

        /**
         * Adds a new tag typed in by the user
         */
        addNewTag = function (tag) {
        },

        /**
         * Removes a new tag removed by the user
         */
        removeNewTag = function (tag) {
        },

        /**
         * The tutorial view with predefined leaderboard
         */
        setTutorialView = function () {
            IN_TUTORIAL = true;
            setIDPointsReviewView(true);
        },

        /**
         * Updates the points view
         */
        updatePoints = function (points) {
            POINTS = points;
            $('#div_it_id_points_review_points').html('Punkte: ' + POINTS);
        },

        /**
         * Sets the final view, consisting of a leaderboard
         */
        setEndView = function () {
            IN_END = true;
            setIDPointsReviewView(false, true);
        },

        /**
         * Sets the points cookies
         */
        storePoints = function () {
            setCookie('438_points', POINTS);
        },

        /**
         * Starts the countdown timer
         */
        startTimer = function () {
            if (IN_TUTORIAL || IN_END) {
                printLog('Do not start timer for 438, because in tutorial/end mode');
            } else {
                printLog('Starting timer for 438 for seconds: ' + TIMER_MAX);
                timerTick(TIMER_MAX);
            }
        },

        /**
         * A single timer tick.
         * Updates the seconds in the view and checks whether the tags should get confirmed (--> Proceed)
         * @param cntr
         */
        timerTick = function (cntr) {
            $('#points_review_438_timer').html(cntr);
            // Recursive break
            if (cntr <= 0) {
                // confirm the tags by timeout
                confirmTags();
                return;
            }
            TIMER = setTimeout(function () {
                $('#points_review_438_timer').html(cntr - 1);
                timerTick(cntr - 1);
            }, 1000);
        },

        /**
         * Stops the timer
         */
        stopTimer = function () {
            printLog('Stopping timer for 438');
            clearTimeout(TIMER);
        },

        /**
         * Sets the view
         */
        setIDPointsReviewView = function (in_tutorial, in_end) {
            if (POINTS === 0) {
                var cpts = getCookie('438_points');
                if (cpts === '0' || cpts.length === 0) {
                    if (!in_tutorial) {
                        getMyTagCount();
                    }
                } else {
                    POINTS = Number(cpts);
                }
            }

            $.get('views/mst_id_points_review_438.html', function (template) {
                var params = {};
                if (in_end) {
                    params['end_page'] = true;
                }
                var rendered = Mustache.render(template, params);
                $('#' + ELT).html(rendered);

                setCustomButtonBehavior();

                if (in_tutorial) {
                    updatePoints(14);
                } else {
                    updatePoints(POINTS);
                }
            });
        },

        getPointsRelativeToPlayers = function(pts){
            return Math.round(pts / MAX_OCCURENCE * PLAYERS);
        },

        /**
         * Confirming the tags, i.e., triggering the list to appear
         */
        confirmTags = function(){
            var next_btn = $('#next_img');
            next_btn.html('Bestätigt');
            setInvisible($('#points_review_438_timer_div'));
            disableTagFieldAndNextButton();
            displayOtherPlayersTags();
        },

        /**
         * Sets a custom behavior for the "next button"
         */
        setCustomButtonBehavior = function () {
            var next_btn = $('#next_img');
            next_btn.html('Bestätigen');
            next_btn.prop('onclick', null).off('click');
            next_btn.click(function () {
                stopTimer();
                confirmTags();
            });
        };

    /**
     * Return the 'public' methods
     */
    return {
        init: init,
        addNewTag: addNewTag,
        removeNewTag: removeNewTag,
        setOtherPlayersTags: setOtherPlayersTags,
        displayOtherPlayersTags: displayOtherPlayersTags,
        setEndView: setEndView,
        setView: setView,
        startTimer: startTimer,
        storePoints: storePoints,
        setTutorialView: setTutorialView,
        updatePoints: updatePoints
    };
};
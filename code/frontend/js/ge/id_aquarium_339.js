/**
 * This class holds methods and variables for user with id 339, the aquarium.
 *
 * Credits for the bubbles to Dhiraj:
 * http://www.css-jquery-design.com/2014/10/animated-aquarium-with-pure-css/
 *
 * @returns {{init: init, setView: setView, updateView: updateView}}
 * @constructor
 */
ID_Aquarium_339 = function () {
    /* The goals list and the element to display the goals in */
    var ELT = "",
        TAGS = 0,
        TAGS_IN_TUTORIAL = 15,
        TAGS_BETWEEN_VISIBLES = 3,
        VISIBLES = [],
        TAGS_BETWEEN_SURPRISES = 30,
        SURPRISES = [],
        TAGS_FOR_FINAL_SURPRISE = 100,
        FINAL_SURPRISE = '',
        VIEW_SET = false,
        ANIMATION_ID = 0,
        IN_END = false,
        IN_TUTORIAL = false,

        /**
         * Initializes the compare element
         */
        init = function (element) {
            ELT = element;
        },

        /**
         * Initializes functions to make elements (dis)appear
         */
        initVisiblesAndSurprisesFunctions = function () {
            // initialize the visibles
            VISIBLES[0] = [getSetVisible('aquarium_ground'), getSetInvisible('aquarium_ground')];
            VISIBLES[1] = [getSetVisible('aquarium_bubbles'), getSetInvisible('aquarium_bubbles')];
            VISIBLES[2] = [getSetVisible('aquarium_fish_skeleton_2'), getSetInvisible('aquarium_fish_skeleton_2')];
            VISIBLES[3] = [
                function () {
                    var $aquarium_bg = $('#aquarium_bg');
                    $aquarium_bg.removeClass('aquarium_bg_ugly');
                    $aquarium_bg.addClass('aquarium_bg');
                },
                function () {
                    var $aquarium_bg = $('#aquarium_bg');
                    $aquarium_bg.addClass('aquarium_bg_ugly');
                    $aquarium_bg.removeClass('aquarium_bg');
                }];
            VISIBLES[4] = [getSetVisible('aquarium_rock_div_1'), getSetInvisible('aquarium_rock_div_1')];
            VISIBLES[5] = [getSetVisible('aquarium_rock_div_4'), getSetInvisible('aquarium_rock_div_4')];
            VISIBLES[6] = [getSetVisible('aquarium_plant_green_1'), getSetInvisible('aquarium_plant_green_1')];
            VISIBLES[7] = [getSetVisible('aquarium_plant_green_2'), getSetInvisible('aquarium_plant_green_2')];
            VISIBLES[8] = [getSetVisible('aquarium_star_fishes'), getSetInvisible('aquarium_star_fishes')];
            VISIBLES[9] = [getSetVisible('aquarium_rock_div_3'), getSetInvisible('aquarium_rock_div_3')];
            VISIBLES[10] = [getSetVisible('aquarium_fish_eel_1'), getSetInvisible('aquarium_fish_eel_1')];
            VISIBLES[11] = [getSetVisible('aquarium_gold_fish_3'), getSetInvisible('aquarium_gold_fish_3')];
            VISIBLES[12] = [getSetVisible('aquarium_rock_div_2'), getSetInvisible('aquarium_rock_div_2')];
            VISIBLES[13] = [getSetVisible('aquarium_gold_fish_1'), getSetInvisible('aquarium_gold_fish_1')];
            VISIBLES[14] = [getSetVisible('aquarium_fish_green_1'), getSetInvisible('aquarium_fish_green_1')];
            VISIBLES[15] = [getSetVisible('aquarium_gold_fish_2'), getSetInvisible('aquarium_gold_fish_2')];
            VISIBLES[16] = [getSetVisible('aquarium_fish_puffer'), getSetInvisible('aquarium_fish_puffer')];
            VISIBLES[17] = [getSetVisible('aquarium_plant_pink_3'), getSetInvisible('aquarium_plant_pink_3')];
            VISIBLES[18] = [getSetVisible('aquarium_fish_blue'), getSetInvisible('aquarium_fish_blue')];
            VISIBLES[19] = [getSetVisible('aquarium_plant_green_4'), getSetInvisible('aquarium_plant_green_4')];
            VISIBLES[20] = [getSetVisible('aquarium_plant_green_6'), getSetInvisible('aquarium_plant_green_6')];
            VISIBLES[21] = [getSetVisible('aquarium_plant_pink_1'), getSetInvisible('aquarium_plant_pink_1')];
            VISIBLES[22] = [getSetVisible('aquarium_fish_eel_2'), getSetInvisible('aquarium_fish_eel_2')];
            VISIBLES[23] = [getSetVisible('aquarium_plant_green_3'), getSetInvisible('aquarium_plant_green_3')];
            VISIBLES[24] = [getSetVisible('aquarium_fish_green_2'), getSetInvisible('aquarium_fish_green_2')];
            VISIBLES[25] = [getSetVisible('aquarium_fish_red_2'), getSetInvisible('aquarium_fish_red_2')];
            VISIBLES[26] = [getSetVisible('aquarium_fish_orange'), getSetInvisible('aquarium_fish_orange')];
            VISIBLES[27] = [getSetVisible('aquarium_plant_green_5'), getSetInvisible('aquarium_plant_green_5')];
            VISIBLES[28] = [getSetVisible('aquarium_fish_pink'), getSetInvisible('aquarium_fish_pink')];
            VISIBLES[29] = [getSetVisible('aquarium_fish_skeleton_1'), getSetInvisible('aquarium_fish_skeleton_1')];
            VISIBLES[30] = [getSetVisible('aquarium_plant_blue'), getSetInvisible('aquarium_plant_blue')];
            VISIBLES[31] = [getSetVisible('aquarium_fish_red_1'), getSetInvisible('aquarium_fish_red_1')];
            VISIBLES[32] = [getSetVisible('aquarium_plant_pink_2'), getSetInvisible('aquarium_plant_pink_2')];
            VISIBLES[33] = [getSetVisible('aquarium_gold_fish_4'), getSetInvisible('aquarium_gold_fish_4')];

            // initialize the surprises
            SURPRISES[0] = [getSetVisibleSurprise('aquarium_surprise_1'), getSetInvisibleSurprise('aquarium_surprise_1')];
            SURPRISES[1] = [getSetVisibleSurprise('aquarium_surprise_2'), getSetInvisibleSurprise('aquarium_surprise_2')];
            SURPRISES[2] = [getSetVisibleSurprise('aquarium_surprise_3'), getSetInvisibleSurprise('aquarium_surprise_3')];

            // initialize the final surprise
            FINAL_SURPRISE = 'aquarium_surprise_4';
        },

        /**
         * Gets a function to set an element to visible
         * @param elt
         * @returns {Function}
         */
        getSetVisible = function (elt) {
            return function (animate) {
                setVisible($('#' + elt));
            }
        },

        /**
         * Gets a function to set a SURPRISE element to visible
         * @param elt
         * @returns {Function}
         */
        getSetVisibleSurprise = function (elt) {
            return function (animate) {
                var $elt = $('#' + elt);
                setVisible($elt);
                if (animate) {
                    showSurprise(elt);
                }
            }
        },

        /**
         * Gets a function to set an element to invisible
         * @param elt
         * @returns {Function}
         */
        getSetInvisible = function (elt) {
            return function (animate) {
                setInvisible($('#' + elt));
            }
        },

        /**
         * Gets a function to set a SURPRISE element to invisible
         * @param elt
         * @returns {Function}
         */
        getSetInvisibleSurprise = function (elt) {
            return function (animate) {
                setInvisible($('#' + elt));
            }
        },

        /**
         * Sets the view
         */
        setView = function () {
            VIEW_SET = false;
            IN_END = false;
            IN_TUTORIAL = false;
            setIDAquariumView();
        },

        /**
         * Adapts the fishes and surprises
         */
        adaptVisiblesAndSurprises = function (animate) {

            // Show visibles
            var visible_cntr = Math.floor(TAGS / TAGS_BETWEEN_VISIBLES) - 1;
            var exact_cntr = TAGS / TAGS_BETWEEN_VISIBLES - 1;
            for (var i = 0; i < VISIBLES.length; i++) {
                if (i <= visible_cntr) {
                    VISIBLES[i][0](animate && i === exact_cntr);
                } else {
                    VISIBLES[i][1](animate);
                }
            }

            // Show surprises
            var surprise_cntr = Math.floor(TAGS / TAGS_BETWEEN_SURPRISES) - 1;
            exact_cntr = TAGS / TAGS_BETWEEN_SURPRISES - 1;
            for (var i = 0; i < SURPRISES.length; i++) {
                if (visible_cntr > 0) {
                    if (i <= surprise_cntr) {
                        SURPRISES[i][0](animate && i === exact_cntr);
                    } else {
                        SURPRISES[i][1](animate);
                    }
                }
            }

            // Set the hint accordingly
            if (surprise_cntr >= SURPRISES.length - 1) {
                $('#aquarium_tag_surprise').html('Du hast alle regulären Überraschungen freigeschaltet.');
            } else {
                var tags_to_next_surprise = TAGS_BETWEEN_SURPRISES - (TAGS % TAGS_BETWEEN_SURPRISES);
                $('#aquarium_tag_surprise').html('Die nächste Überraschung schaltest du in <strong>' + tags_to_next_surprise + ' Tags</strong> frei.')
            }
        },

        /**
         * Adds a new tag typed in by the user
         */
        addNewTag = function () {
            ++TAGS;
            tagCountChanged(true);
        },

        /**
         * Removes a new tag removed by the user
         */
        removeNewTag = function () {
            --TAGS;
            tagCountChanged(false);
        },

        /**
         * Just a small helper to prevent duplicated code.
         * Checks whether user is in tutorial and if yes limits the number of elements visible
         */
        tagCountChanged = function (animate){
            if (IN_TUTORIAL && TAGS > TAGS_IN_TUTORIAL) {
                $('#aquarium_tag_surprise').html('<span style="color: red">Um dir die Überraschung nicht zu verderben, kannst du in dieser Einführung maximal 5 Elemente freischalten.</span>');
                return;
            }
            adaptVisiblesAndSurprises(animate);
        },

        /**
         * The tutorial view with predefined leaderboard
         */
        setTutorialView = function () {
            IN_TUTORIAL = true;
            setIDAquariumView(true);
        },

        /**
         * Sets the final view, consisting of a leaderboard
         */
        setEndView = function () {
            IN_END = true;
            setIDAquariumView();
        },

        /**
         * Sets the tag count and adjusts the view
         * @param tagcount
         */
        setTagCount = function (tagcount) {
            TAGS = tagcount;
            if (!VIEW_SET) {
                // setView();
                setIDAquariumView();
            } else {
                adaptVisiblesAndSurprises(false);
                showFinalSurprise();
            }
        },

        /**
         * Shows the bubbles
         */
        showBubbles = function () {
            var $bubbles = $('.bubbles');

            function bubbles() {
                // Settings
                var min_bubble_count = 10, // Minimum number of bubbles
                    max_bubble_count = 15, // Maximum number of bubbles
                    min_bubble_size = 1, // Smallest possible bubble diameter (px)
                    max_bubble_size = 4; // Largest possible bubble diameter (px)

                // Calculate a random number of bubbles based on our min/max
                var bubbleCount = min_bubble_count + Math.floor(Math.random() * (max_bubble_count + 1));

                // Create the bubbles
                for (var i = 0; i < bubbleCount; i++) {
                    $bubbles.append('<div class="bubble-container"><div class="bubble"></div></div>');
                }

                // Now randomise the various bubble elements
                $bubbles.find('.bubble-container').each(function () {

                    // Randomise the bubble positions (0 - 100%)
                    var pos_rand = Math.floor(Math.random() * 101);

                    // Randomise their size
                    var size_rand = min_bubble_size + Math.floor(Math.random() * (max_bubble_size + 1));

                    // Randomise the time they start rising (0-15s)
                    var delay_rand = Math.floor(Math.random() * 16);

                    // Randomise their speed (3-8s)
                    var speed_rand = 1.5 + Math.random() * 2;

                    // Cache the this selector
                    var $this = $(this);

                    // Apply the new styles
                    $this.css({
                        'left': pos_rand + '%',

                        '-webkit-animation-duration': speed_rand + 's',
                        '-moz-animation-duration': speed_rand + 's',
                        '-ms-animation-duration': speed_rand + 's',
                        'animation-duration': speed_rand + 's',

                        '-webkit-animation-delay': delay_rand + 's',
                        '-moz-animation-delay': delay_rand + 's',
                        '-ms-animation-delay': delay_rand + 's',
                        'animation-delay': delay_rand + 's'
                    });

                    $this.children('.bubble').css({
                        'width': size_rand + 'px',
                        'height': size_rand + 'px'
                    });

                });
            }

            bubbles();
        },

        /**
         * Animates the turtle (2nd animation).
         * @param id The animation id, basically the recursion break
         */
        animateTurtle = function (id) {
            if (id !== ANIMATION_ID){
                // animation not valid anymore --> ignore and quit the animation
                return;
            }

            var $turtle = $('#aquarium_surprise_2').find('img');

            if (Math.random() >= 0.5) { // blinking
                $turtle.attr('src', 'img/resources/aquarium/ground/turtle_2.png');
                setTimeout(function () {
                    $turtle.attr('src', 'img/resources/aquarium/ground/turtle_1.png');
                }, getRandomNumber(50, 150));
            } else {
                $turtle.attr('src', 'img/resources/aquarium/ground/turtle_3.png');
                setTimeout(function () { // winking
                    $turtle.attr('src', 'img/resources/aquarium/ground/turtle_1.png');
                }, getRandomNumber(150, 250));
            }

            setTimeout(function () {
                animateTurtle(id);
            }, getRandomNumber(4000, 6000));
        },


        /**
         * Activates the animation for all fishes
         */
        animateFishes = function () {
            ++ANIMATION_ID;

            animateFish('aquarium_gold_fish_1', ANIMATION_ID);
            animateFish('aquarium_gold_fish_2', ANIMATION_ID);
            animateFish('aquarium_gold_fish_3', ANIMATION_ID);
            animateFish('aquarium_gold_fish_4', ANIMATION_ID);
            animateFish('aquarium_fish_blue', ANIMATION_ID);
            animateFish('aquarium_fish_eel_1', ANIMATION_ID);
            animateFish('aquarium_fish_eel_2', ANIMATION_ID);
            animateFish('aquarium_fish_green_1', ANIMATION_ID);
            animateFish('aquarium_fish_green_2', ANIMATION_ID);
            animateFish('aquarium_fish_orange', ANIMATION_ID);
            animateFish('aquarium_fish_pink', ANIMATION_ID);
            animateFish('aquarium_fish_puffer', ANIMATION_ID);
            animateFish('aquarium_fish_red_1', ANIMATION_ID);
            animateFish('aquarium_fish_red_2', ANIMATION_ID);
            animateFish('aquarium_fish_skeleton_1', ANIMATION_ID);
            animateFish('aquarium_fish_skeleton_2', ANIMATION_ID);

            animateFish('aquarium_surprise_3', ANIMATION_ID);
            animateFish('aquarium_surprise_4', ANIMATION_ID);
        },

        /**
         * Animates a single fish
         * At the beginning there is a check whether the animation is still valid.
         * If not, the (recursive) call
         * @param fish The fish to animate
         * @param ID The animations validity check ID
         */
        animateFish = function (fish, ID) {
            if (ANIMATION_ID !== ID) {
                return;
            }

            var $target = $('#' + fish);
            var oldq = $target.position();

            // set the fish to a random position if oldq is 0 for both top and left (get a random starting point)
            if (typeof oldq === "undefined" || (oldq.left === 0 && oldq.top === 0)) {
                var tmp = makeNewPosition(fish, $target.parent());
                $target.css({top: tmp[0], left: tmp[1]});
                oldq = {
                    top : tmp[0],
                    left : tmp[1]
                };
            }

            var newq = makeNewPosition(fish, $target.parent());
            var newDirection = newq[1] >= oldq.left; // false: left ; true: right
            if (newDirection && $target.hasClass('mirrored')) {
                $target.removeClass('mirrored');
            } else if (!newDirection && !$target.hasClass('mirrored')) {
                $target.addClass('mirrored');
            }

            // if (fish === 'aquarium_fish_green_1') {
            //     console.log(oldq.top + "x" + oldq.left + " --> " + newq[0] + "x" + newq[1]);
            // }

            var speed = getRandomNumber(4000, 5500);

            $target.animate({
                top: newq[0],
                left: newq[1]
            }, speed, function () {
                animateFish(fish, ID);
            });
        },

        /**
         * Creates a new (random) position
         * @param fish
         * @param $container
         * @returns {*[]}
         */
        makeNewPosition = function (fish, $container) {
            // Get viewport dimensions (remove the dimension of the div)
            $container = ($container || $(window));

            // Get the fish's height to make sure it doesn't swim out of the window
            var $fish = $('#' + fish);
            var h = $container.height() - $fish.height();
            var w = $container.width() - $fish.width();

            var nh = Math.floor(Math.random() * h);
            var nw = Math.floor(Math.random() * w);

            return [nh, nw];
        },

        /**
         * Shows a surprise, pulsating for 5 seconds
         * @param elt
         */
        showSurprise = function (elt) {
            // get the respective image in the element
            var $elt = $('#' + elt + ' img');
            toggleSurprise($elt, 5000);
        },

        /**
         * Toggles a surprise
         * @param $elt The element to toggle (blink)
         * @param ms ms to blink
         */
        toggleSurprise = function ($elt, ms) {
            // Recursion break
            if (ms <= 0) {
                return;
            }

            // blinking
            $elt.fadeOut(500);
            $elt.fadeIn(500);

            // recursive call
            toggleSurprise($elt, ms - 1000);
        },

        /**
         * Shows the final surprise
         */
        showFinalSurprise = function () {
            if (IN_END) {
                if (TAGS >= TAGS_FOR_FINAL_SURPRISE) {
                    setVisible($('#' + FINAL_SURPRISE));
                    showSurprise(FINAL_SURPRISE);
                    $('#aquarium_tag_surprise').html('Du hast die <strong>besondere Überraschung</strong> freigeschaltet.');
                } else {
                    $('#aquarium_tag_surprise').html('Du hast nicht genug Tags erstellt, um die <strong>besondere Überraschung</strong> freizuschalten.');
                }
            }

        },

        /**
         * Sets the view
         */
        setIDAquariumView = function () {
            if (!VIEW_SET) {
                // Set the view to true such that it won't get executed multiple times
                VIEW_SET = true;

                initVisiblesAndSurprisesFunctions();
                $.get('views/mst_id_aquarium_339.html', function (template) {
                    var params = {};
                    var rendered = Mustache.render(template, params);
                    $('#' + ELT).html(rendered);

                    // show the bubbles
                    showBubbles();

                    // animate fishes
                    animateFishes();

                    // Timer for letting the turtle blink
                    animateTurtle(ANIMATION_ID);

                    // Set the respective elementes to visible
                    adaptVisiblesAndSurprises(false);
                });
            }

            // Show the final surprise
            showFinalSurprise();
        };

    /**
     * Return the 'public' methods
     */
    return {
        init: init,
        addNewTag: addNewTag,
        removeNewTag: removeNewTag,
        setEndView: setEndView,
        setTagCount: setTagCount,
        setView: setView,
        setTutorialView: setTutorialView
    };
};
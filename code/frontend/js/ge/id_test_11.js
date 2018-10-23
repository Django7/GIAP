ID_Test_11 = function () {
    /* The goals list and the element to display the goals in */
    var ELT = "",
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
                var params = {};
                var rendered = Mustache.render(template, params);
                $('#' + ELT).html(rendered);
            });
        };

    /**
     * Return the 'public' methods
     */
    return {
        init: init,
        setView: setView
    };
};
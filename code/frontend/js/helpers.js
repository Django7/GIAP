/**
 * Sets a cookie for 365 days
 * @param cname The name to set
 * @param cvalue The cookie's respective value
 */
function setCookie(cname, cvalue) {
    var d = new Date();
    d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

/**
 * Gets a cookie
 * @param cname The cookie to get
 * @returns {string} The value of the cookie
 */
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

/**
 * Deletes a cookie
 * @param name The name of the cookie to delet
 */
function deleteCookie(name) {
    setCookie(name, "", -1);
}


/**
 * Deletes all (!) cookies
 */
function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        while (name.charAt(0) === ' ') {
            name = name.substring(1);
        }
        deleteCookie(name);
    }
}

var AVAILABLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

/**
 * Builds an identifier, useful for passwords and names
 * @param length The length of the string to produce
 * @returns {string} The identifier built
 */
function buildIdentifier(length) {
    var text = "";

    for (var i = 0; i < length; i++) {
        text += AVAILABLE_CHARS.charAt(Math.floor(Math.random() * AVAILABLE_CHARS.length));
    }

    return text;
}

/**
 * Creates a new name
 */
function buildNewName() {
    return buildIdentifier(10);
}

/**
 * Creates a new password
 */
function buildNewPassword() {
    return buildIdentifier(10);
}

/**
 * Sets the key up event to count the number of chars entered.
 * @param element: The element to add the key element to
 */
function setDesignKeyUpEvent(element) {
    element.keyup(function () {
        var length = $(this).val().length;
        $('#char_cnt').html(length);
        if (length >= DESIGN_CHARS_MIN) {
            $('#design_chars_counter').removeClass('txt_red').addClass('txt_black');
        } else {
            $('#design_chars_counter').removeClass('txt_black').addClass('txt_red');
        }
    });
}

var speedtest_started = false;
var speedtest_finished = false;
var speedtest_start, speedtest_end;
var speedtest_errors = 0;
var speedtest_words = 0, speedtest_chars = 0;

/**
 * Sets the respective listener for the speed test
 */
function setSpeedTestEventListener() {
    // Disable input for the typing speed outcome field
    var question = CURRENT_SURVEY.getQuestionByName('speed_test_value');
    $('#' + question.propertyHash['id'] + 'i'). attr('disabled', true);


    // Add event listener
    $('#speed_test_input').keypress(function (e) {
        if (e.which === 0 || speedtest_finished) {
            return;
        }

        var char = String.fromCharCode(e.which);
        var sentence = $('#speed_test_sentence');

        if (!speedtest_started) {
            var text = sentence.html();
            speedtest_chars = text.length;
            speedtest_words = text.split(' ').length;
            speedtest_start = Date.now();
            speedtest_started = true;
        }

        if (sentence.html().charAt(0) === char) {
            sentence.html(sentence.html().substring(1));
        } else {
            ++speedtest_errors;
        }

        if (sentence.html().length === 0 && !speedtest_finished) {
            sentence.remove();
            speedtest_end = Date.now();
            speedtest_finished = true;
            var duration = Math.floor((speedtest_end - speedtest_start) / 1000);
            var words_per_minute = Math.floor(speedtest_words / duration * 60);
            // var chars_per_minute = Math.floor(speedtest_chars / duration) * 60;

            var string = words_per_minute + " Wörter/Minute";
            CURRENT_SURVEY.setValue('speed_test_value', string);
        }
    });
}

/**
 * Displays an error overlay
 * @param msg The message to display
 */
function viewErrorOverlay(msg) {
    viewGenericOverlay('Fehler', msg, BootstrapDialog.TYPE_DANGER, '');
}

/**
 * Displays an information overlay
 * @param msg The message to display
 */
function viewInfoOverlay(msg) {
    viewGenericOverlay('Information', msg, BootstrapDialog.TYPE_WARNING, '');
}


/**
 * Views a tutorial overlay on the left side.
 * This thing is draggable
 * @param title The title to show
 * @param msg The message to show
 * @param btn_name The name of the button
 * @param callafter A function to call after the button was clicked
 * @param close Called after the button was clicked
 */
function viewLeftTutorialOverlay(title, msg, btn_name, callafter, close) {
    var elt = $('#div_it_stats');
    viewTutorialOverlay(title, msg, btn_name, callafter, close, 'dialog-overlay-left', [elt]);
    putElementOnTop(elt);
}

/**
 * Views a tutorial overlay on the left side.
 * This thing is draggable.
 * Compared to the "non-customizable" version, this one allows to set a dedicated element on top
 * @param title The title to show
 * @param msg The message to show
 * @param btn_name The name of the button
 * @param callafter A function to call after the button was clicked
 * @param close Called after the button was clicked
 * @param elt_on_top The element to highlight
 */
function viewLeftTutorialOverlayCustom(title, msg, btn_name, callafter, close, elt_on_top){
    viewTutorialOverlay(title, msg, btn_name, callafter, close, 'dialog-overlay-left', [elt_on_top]);
    putElementOnTop(elt_on_top);
}

/**
 * Views a tutorial overlay on the right side.
 * This thing is draggable
 * @param title The title to show
 * @param msg The message to show
 * @param btn_name The name of the button
 * @param callafter A function to call after the button was clicked
 * @param close Called after the button was clicked
 */
function viewRightTutorialOverlay(title, msg, btn_name, callafter, close) {
    var elt = $('#div_it_img_card');
    viewTutorialOverlay(title, msg, btn_name, callafter, close, 'dialog-overlay-right', [elt]);
    putElementOnTop(elt);
}

/**
 * Views a tutorial overlay
 * @param title The title to show
 * @param msg The message to show
 * @param btn_name The name of the button
 * @param callafter A function to call after the button was clicked
 * @param close Called after the button was clicked
 * @param css The (additional) custom css class for the dialog
 * @param remove_from_top an array defining the elements to delete from top (jquery object)
 */
function viewTutorialOverlay(title, msg, btn_name, callafter, close, css, remove_from_top) {
    BootstrapDialog.show({
        title: title,
        draggable: true,
        message: msg,
        closable: false,
        type: BootstrapDialog.TYPE_PRIMARY,
        size: BootstrapDialog.SIZE_SMALL,
        cssClass: css,
        buttons: [{
            label: btn_name,
            action: function (dialogItself) {
                if (close) {
                    dialogItself.close();
                    for(var i = 0; i < remove_from_top.length; i++){
                        removeElementFromTop(remove_from_top[i]);
                    }
                    removeElementFromTop($('#div_it_img_card'));
                    removeElementFromTop($('#div_it_stats'));
                }
                if (null != callafter) {
                    callafter();
                }
            }
        }]
    });
}


/**
 * Displays a generic overlay.
 * Can get used to build custom alerts.
 * @param title The title of the overlay
 * @param msg the message of the overlay
 * @param type the type of the overlay (e.g., BootstrapDialog.TYPE_DANGER)
 * @param css The css class to use
 */
function viewGenericOverlay(title, msg, type, css) {
    BootstrapDialog.show({
        title: title,
        message: msg,
        type: type,
        cssClass: css,
        buttons: [{
            label: 'Schließen',
            action: function (dialogItself) {
                dialogItself.close();
            }
        }]
    });
}

/**
 * Shows an XBOX-Themed achievement:
 * Deletes all other visible achievements, if there exists one before
 * @param title The title of the achievement
 * @param description The description of the achievement
 */
function showNewAchievementDialog(title, description) {
    $.get('views/mst_achievement.html', function (template) {
        var mst_params = [];
        mst_params['name'] = title;
        mst_params['description'] = description;

        var visibleAchs = $('.achievement-banner');
        for (var i = 0; i < visibleAchs.length; i++) {
            visibleAchs[i].remove();
        }

        var rendered = Mustache.render(template, mst_params);
        $('#main_container').append(rendered);
    });
}

/**
 * Puts an Element on top (over the dialog)
 * @param elem The element to put on top.
 */
function putElementOnTop(elem) {
    elem.addClass('screen_on_top');
}

/**
 * Puts an element back were it belongs to
 * @param elem The element to remove from top.
 */
function removeElementFromTop(elem) {
    elem.removeClass('screen_on_top');
}

/**
 * Sets an element to invisible
 * @param elem
 */
function setInvisible(elem) {
    elem.addClass('invisible');
}

/**
 * Sets an element to visible (removes invisibility)
 * @param elem
 */
function setVisible(elem) {
    elem.removeClass('invisible');
}

/**
 * Determines whether the browser runs on an mobile device or not
 * Source: https://www.opentechguides.com/how-to/article/javascript/98/detect-mobile-device.html
 */
function isMobileDevice() {
    var testExp = new RegExp('' +
        'Android|webOS|iPhone|iPad|' +
        'BlackBerry|Windows Phone|' +
        'Opera Mini|IEMobile|Mobile',
        'i');
    return testExp.test(navigator.userAgent);
}

var resizeTimout;

/**
 * Resizes the window if the user tries to make it smaller
 */
function initMinimalWindowSize() {
    // Check for the validity as well (for the case that the window is initially too small)
    checkWindowSizeValidity();

    // Only fire every .5 seconds
    $(window).resize(function () {
        clearTimeout(resizeTimout);
        resizeTimout = setTimeout(function () {
            checkWindowSizeValidity();
        }, 100);
    });
}

/**
 * Checks whether the window size is big enough
 */
function checkWindowSizeValidity() {
    var too_small = false;
    var width = $(window).width();
    var height = $(window).height();
    printLog("User resized window to " + width + "x" + height);

    // If the window is too narrow, resize width
    if (width < WIN_MIN_WIDTH) {
        printLog("Window too narrow. Resize");
        $(window).width(WIN_MIN_WIDTH);
        too_small = true;
    }

    // If the window is too short, resize height
    if (height < WIN_MIN_HEIGHT) {
        printLog("Window too short. Resize");
        $(window).height(WIN_MIN_HEIGHT);
        too_small = true;
    }

    // If too small show dialog, otherwise hide it (if present)
    if (too_small) {
        viewWindowTooSmallOverlay(width, height);
    } else {
        hideWindowTooSmallOverlay();
    }
}

var currWindowTooSmallOverlay = null;

/**
 * Views the dialog that the window is too small
 * @param cwidth The current width
 * @param cheight The current height
 */
function viewWindowTooSmallOverlay(cwidth, cheight) {
    if (null !== currWindowTooSmallOverlay) {
        setCurrSize(cwidth, cheight);
        return;
    }
    $.get('views/dialogs/dia_mst_window_too_small_message.html', function (template) {
        var args = {'min_width': WIN_MIN_WIDTH, 'min_height': WIN_MIN_HEIGHT};
        var rendered = Mustache.render(template, args);

        currWindowTooSmallOverlay = new BootstrapDialog({
            title: 'Fehler: Browser-Fenster zu klein.',
            message: $('<div></div>').html(rendered),
            animate: false,
            cssClass: 'screen_even_more_on_top',
            type: BootstrapDialog.TYPE_WARNING,
            closable: false
        });
        currWindowTooSmallOverlay.open();
        setCurrSize(cwidth, cheight);
    });
}

/**
 * Hides the dialog that the window is too small
 */
function hideWindowTooSmallOverlay() {
    if (null === currWindowTooSmallOverlay) {
        return;
    }
    currWindowTooSmallOverlay.close();
    currWindowTooSmallOverlay = null;
}

/**
 * Sets the current size of the window in the dialog
 * @param cwidth The current width
 * @param cheight The current height
 */
function setCurrSize(cwidth, cheight) {
    var size = '';
    if (cwidth < WIN_MIN_WIDTH) {
        size += '<span style="color:red">' + cwidth + '</span>';
    } else {
        size += cwidth;
    }
    size += 'x';
    if (cheight < WIN_MIN_HEIGHT) {
        size += '<span style="color:red">' + cheight + '</span>';
    } else {
        size += cheight;
    }
    $('#curr_size').html(size);
}

/**
 * Checks in the cookies the number of extra rounds the user finished completely
 * @returns {number} the number of extra rounds the user finished, 0 if none
 */
function extraRoundPerformed() {
    var ex_rounds = getCookie('extra_round_performed');
    if (ex_rounds === "") {
        return 0;
    } else {
        return Number(ex_rounds);
    }
}

/**
 * Increases the extra round counter (cookie) by one
 */
function increaseExtraRoundCounter() {
    var ex_rounds = getCookie('extra_round_performed');
    if (ex_rounds === "") {
        setCookie('extra_round_performed', '1');
    } else {
        setCookie('extra_round_performed', String(Number(ex_rounds) + 1));
    }
}

/**
 * Increases the extra image Counter
 */
function increaseExtraImageCounter() {
    var ex_img = getCookie('ex_img_ctr');
    if (ex_img === 0) {
        setCookie('ex_img_ctr', '0');
    } else {
        setCookie('ex_img_ctr', String(Number(ex_img) + 1));
    }
}

/**
 * Checks whether an element is present in an array
 * @param array The array to check for the element
 * @param element The element to look for
 * @returns {boolean} true if element is in array, false otherwise
 */
function arrayContainsElement(array, element) {
    return !(array.indexOf(element) === -1);
}

/**
 * Checks whether one of those elements is present in an array
 * @param array The array to check for the elements
 * @param elements The elements to look for
 * @returns {boolean} true if one of those elements is in an array, false otherwise
 */
function arrayContainsOnOfThoseElements(array, elements){
    for (var i = 0; i < elements.length; i++){
        if(arrayContainsElement(array, elements[i])){
            return true;
        }
    }
    return false;
}


/**
 * Replace an element in a 2d array
 * WARNING: This function is highly depending on the array. Only use when you know what you are doing
 * @param array The array to manipulate
 * @param key The key of the element to manipulate
 * @param key_position The position of the key
 * @param new_val The new value
 * @param new_val_position The position in the 2d array
 * @returns {*}
 */
function replaceInArrayGeneric(array, key, key_position, new_val, new_val_position) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][key_position] === key) {
            array[i][new_val_position] = new_val;
        }
    }

    // Sort the array
    array = array.sort(function (a, b) {
        if (a[0] > b[0]) {
            return -1;
        }
        if (a[0] < b[0]) {
            return 1;
        }
        return 0;
    });

    return array;
}

/**
 * Let's you download a file with respective filename and content
 * @param filename The filename suggested to the user
 * @param text The content of the text file
 */
function download_FF_CH(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

/**
 * Returns the URL parameter of the current window, if present
 * @sParam sParam The parameter to get the value for
 * @returns {*} the value of the parameter
 *
 * Credits: http://www.jquerybyexample.net/2012/06/get-url-parameters-using-jquery.html
 */
function getURLParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName;

    for (var i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
}

/**
 * Every user has a single and unique user group defining the implementation
 */
function getMainUserGroup() {

    // User groups in the implemented design conditions.
    for (var i = 0; i < USER_GROUP.length; i++) {
        if (USER_GROUP[i].indexOf("id_") === 0) {
    return USER_GROUP[i];
        }
    }

    // // The additional game condition "td_aquarium" which is basically a implemented design condition.
    // if(arrayContainsElement(USER_GROUP, "td_aquarium")){
    //     return "id_aquarium_339";
    // }

    // The usual three game conditions "td", "design", and "none".
    if(!arrayContainsOnOfThoseElements(USER_GROUP, ["td", "design", "none"])){
        printWarn("Warning: Undefined user's main group (and not in none, design or td)!!!");
    }

    return null;
}

/**
 * Returns a random integer between min (incl.) and max (excl.)
 * --> returns x such that min <= x < max
 * @param min The minimum value
 * @param max The maximum exclusive value
 * @returns {*}
 */
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + 1) + min;
}

/**
 * Returns a random float between min (incl) and max (exxcl)
 * @param max
 * @param min
 * @returns {*}
 */
function getRandomNumberFloat(max, min){
    return (Math.random() * (max - min) + 1 + min);
}

/**
 * This function shows an loading dialog
 */
var loadingVisible = false;

/**
 * This function shows a loading dialog
 */
function viewLoadingDialog() {
    loadingVisible = true;
    BootstrapDialog.show({
        title: 'Lade Daten vom Server',
        message: $('' +
            '<div class="progress w-100">\n' +
            '  <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>\n' +
            '</div>'),
        closable: false
    });

    // Set a fallback timeout
    setTimeout(function () {
        if (loadingVisible) {
            closeLoadingDialog();
            viewErrorOverlay("Der Server konnte die Daten nicht innerhalb einer Minute liefern. " +
                "Bitte versuche es erneut.");
        }
    }, 60000)
}

/**
 * This function closes an loading dialog if one is present
 */
function closeLoadingDialog() {
    loadingVisible = false;
    BootstrapDialog.closeAll();
}

/**
 * Adds an image to the list
 * @param imageName The name of the image
 * @param image The encoded image as a string
 */
function addImageToImageList(imageName, image) {
    for (var i = 0; i < IMAGES.length; i++) {
        if (IMAGES[0].name === imageName) {
            IMAGES[0].image = image;
            return;
        }
    }
    IMAGES.push({
        name: imageName,
        image: image
    });
}

/**
 * This shuffles an array (Fisher-Yates) in O(n)
 * @param array The array to shuffle
 */
function shuffleArray(array) {
    var arrLength = array.length;
    var tmp;
    var index;

    while (arrLength > 0) {
        --arrLength;

        index = Math.floor(Math.random() * arrLength);

        tmp = array[arrLength];
        array[arrLength] = array[index];
        array[index] = tmp;
    }
    return array;
}

/**
 * Rounds a number to the nearest multiple of 5
 * @param number
 * @returns {number}
 */
function round5(number){
    return Math.round(number / 5) * 5;
}

/**
 * Prints a log message, if DEBUG is set to true
 */
function printLog(msg){
    if(DEBUGGING){
        console.log(msg);
    }
}

/**
 * Prints a warning message, if DEBUG is set to true
 */
function printWarn(msg){
    if(DEBUGGING){
        console.warn(msg);
    }
}

/**
 * Prints a error message, if DEBUG is set to true
 */
function printErr(msg){
    if(DEBUGGING){
        console.error(msg);
    }
}
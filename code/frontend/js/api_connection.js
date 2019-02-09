var wsc = null;

/**
 * Establish the connection to the server
 */
function establishConnection() {
    try {
        wsc = new WebSocket(SERVER_URL);

        wsc.onopen = function (msg) {
            printLog('Connection to server established!');
            printLog('Login, if url parameters are set or cookies are available.');


            if (!login_if_url_parameters_set()) {
                if (!login_if_cookie_set()) {
                    printLog('Neither parameters nor cookies present. Register a new user.');
                    registerNewUser();
                }
            }
        };

        wsc.onerror = function (ex) {
            printLog('Error occurred considering the server connection: ' + ex);
        };

        wsc.onmessage = function (msg) {
            printLog('Received message: ' + msg.data.substring(0, 300));
            interpretMessage(msg.data);
        };

        wsc.onclose = function (msg) {
            printLog('Connection to server lost with reason: ' + msg.reason)
        }
    }
    catch (error) {
        printErr('There was an error while establishing a connection to the server "' + SERVER_URL + '".');
        printErr(error.message);
    } finally {
        printLog('It SEEMS that the WS-connection was successfully established. ' +
            'At least the constructor did not throw an error ¯\\_(ツ)_/¯');
    }
}

/**
 * Logging in the user, if such a cookie is set
 * @returns {boolean} true if cookies are present and try to login from there, false otherwise
 */
function login_if_cookie_set() {
    printLog('Try to get cookies and automatically login_from_inputs.');
    var usr = getCookie('usr');
    var pwd = getCookie('pwd');
    if (usr !== '' && pwd !== '') {
        login_from_params(usr, pwd);
        return true;
    }
    return false
}

/**
 * Logging in a user if the parameters are set
 * @returns {boolean} true, if parameters are present and try to login from here, false otherwise
 */
function login_if_url_parameters_set() {
    var usr = getURLParameter('usr');
    var pwd = getURLParameter('pwd');

    if (usr === undefined || usr === '' || pwd === undefined || pwd === '') {
        return false;
    }

    login_from_params(usr, pwd);
    return true;
}

/**
 * Send a message to the server.
 * If the server disconnected, it tries to reconnect again.
 * After this + 1 second, it sends the message again.
 *
 * @param msg The message to send
 */
function send(msg) {
    if (null !== wsc && wsc.readyState === wsc.CONNECTING) {
        // wait 5 seconds and try to send again
        setTimeout(function () {
            send(msg)
        }, 5000);
    } else if (null !== wsc && wsc.readyState !== wsc.CLOSED && wsc.readyState !== wsc.CLOSING) {
        // if its not connecting, closed, or closing, send the message
        wsc.send(msg);
    } else {
        // if anything is fishy (e.g., client not connected), establish a new connection and try to send
        RECONNECTING = true;
        establishConnection();
        setTimeout(function () {
            send(msg)
        }, 5000);
    }
}

/**
 * Interpreting the message:
 * 1. Decode the message
 * 2. Interpret the message according to its type
 * @param msg The message to send
 */
function interpretMessage(msg) {
    var msg_parsed = JSON.parse(msg);
    var content = msg_parsed['content'];
    printLog('Interpreting message of type "' + msg_parsed['type'] + '"');
    switch (msg_parsed['type']) {
        case 'REGISTER':
            interpret_register(content);
            break;
        case 'LOGIN':
            interpret_login(content);
            break;
        case 'LOGOUT':
            interpret_logout(content);
            break;
        case 'GET':
            interpret_get(content);
            break;
        case 'POST':
            interpret_post(content);
            break;
        case 'QUESTIONNAIRE':
            interpret_questionnaire(content);
            break;
        case 'COMMAND':
            interpret_command(content);
            break;
        default:
            printLog('Unknown type "' + msg_parsed['type'])
    }
}

/**
 * Interprets an API's register answer
 * @param content The API's answer
 */
function interpret_register(content) {
    if (content['status'] === 'OK') {
        printLog('Succesfully registered. Logging in.');
        login_from_params(USER_NAME, USER_PWD);
    } else {
        viewInfoOverlay("Benutzername bereits vergeben. Bitte versuche es erneut (Webseite erneut laden).")
    }
}

/**
 * Interprets an API's login answer and performs several steps:
 *  1. Checks if the login was okay and proceed with the following steps, otherwise throw an error
 *  2. set the user group and cookies
 *  3. set the finished questionnaires
 *  4. Check if its an reconnect:
 *      yes:    Do nothing else
 *      no:     Go to the respective view
 * @param content The API's answer
 */
function interpret_login(content) {
    if (content['status'] === 'OK') {

        // Set the user group and respective cookies for user identification
        USER_GROUP = content['group'].split(',');
        setCookie('usr', USER_NAME);
        setCookie('pwd', USER_PWD);
        setCookie('imgLeft', content['b_images_left']);
  /**      for (var i = 0; i < USER_GROUP.length; i++) {
            if (USER_GROUP[i].indexOf("id_") === 0) {         // workaround for design_implemented being present
                USER_GROUP.push("design_implemented");
            }
        } */
        // Set the logout button visible
        // setVisible($('#btn_quit_study'));

        // Set the finished questionnaires
        setFinishedQuestionnaires(content['quests']);

        // initialize the user
        init_user_designed_game_elements(getMainUserGroup());

        // Finally, check if it was a reconnect.
        if (RECONNECTING) {
            RECONNECTING = false;
        } else {
            var design_finished = (arrayContainsElement(USER_GROUP, 'design')) && (QUESTS['design']);
            var normal_finished = (!arrayContainsElement(USER_GROUP, 'design')) && (QUESTS['end_normal']);
            if (content['b_images_left'] === '0' || design_finished || normal_finished) {
                setEnd();
            } else if (inNotDesignAndTutDone() || inFinishedDesignAndTutDone()) {
                // If this is the case, wait 1 second for the server to fetch possible questionnaires
                setTaggingEnvironment();
            } else if (QUESTS['demographic'] && !arrayContainsElement(USER_GROUP, 'design_implemented')) {
                viewWelcomeOverlay();
            } else {
                setWelcomeText();
            }
        }
        // Get all the static stuff
        commands_after_login();
    } else {
        viewErrorOverlay("Der Server meldet folgende Fehlermeldung: " + content['status']);
        logout();
    }

    /**
     * Checks whether the user is NOT in the design IMPLEMENTED group and the tutorial is done
     * @returns {boolean} true iff the condition above is true, false otherwise
     */
    function inNotDesignAndTutDone() {
        return !arrayContainsElement(USER_GROUP, 'design_implemented') && getCookie('tut_done') === 'true';
    }

    /**
     * Checks whether the user IS IN the design IMPLEMENTED group and the tutorial is done
     * @returns {boolean} true iff the condition above is true, false otherwise
     */
    function inFinishedDesignAndTutDone() {
        return arrayContainsElement(USER_GROUP, 'design_implemented') && getCookie('tut_done_design_implemented') === 'true';
    }
}

/**
 * This function is used to get static data. This is especially useful when you want to get things as "goals" or
 * "achievements" that remain the same over the entire session.
 */
function commands_after_login() {
    // General queries

    // User group specific queries
    if (arrayContainsElement(USER_GROUP, 'goals')) {
        getGoals();
    }
}

/**
 * Splits st comma separated (!) string questionnaires and adds it to the runtime environment such that the client knows
 * which questionnaires are already finished.
 * @param questionnaires The finished questionnaires as a comma-separated string
 */
function setFinishedQuestionnaires(questionnaires) {
    var quests = questionnaires.split(',');
    for (var i = 0; i < quests.length; i++) {
        var quest = quests[i];
        QUESTS[quest] = true;
    }
}

/**
 * Interprets an API's logout answer:
 * 1. Nothing to do ;-)
 * @param content The API's answer
 */
function interpret_logout(content) {
}

/**
 * Interprets an API's GET answer
 * @param content The API's answer
 */
function interpret_get(content) {
    // If it's a new image
    if (content['status'] === 'image') {
        interpret_get_image(content);
    } else if (content['status'] === 'get_points') {
        interpret_get_points(content);
    } else if (content['status'] === 'get_leaderboard') {
        interpret_get_leaderboard(content);
    }
}

/**
 * Interprets the GET answer of an image
 * @param content
 */
function interpret_get_image(content) {
    var imageName = content['name'];
    printLog('image name: ' + imageName);

    // If its a GET ALL request
    if (content['all']) {
        var total_images = content['total_images'];
        addImageToImageList(imageName, content['img']);

        // Check whether all images are received
        if (IMAGES.length === total_images) {
            printLog("All images received from the server.");
            // Get all tags to all images
            getAllTagsFromMeAndOthers();
        }

    } else {
        printLog('New image arrived: ' + imageName);
        CURRENT_IMAGE = imageName;
        B_IMGS_LEFT = content['b_images_left'];
        setCookie('imgLeft', B_IMGS_LEFT);
        if (!ADD_TASKS) {
            printLog('Images left (including this one): ' + content['b_images_left']);
        } else {
            printLog('ADDITIONAL images left (including this one): ' + ADD_IMGS);
        }
        if (content['img'] === 'ERROR') {
            printLog('Error while getting the image from the server');
            viewErrorOverlay("Interner Fehler beim Holen des Bildes! Bitte später noch einmal versuchen.");
        } else if (content['img'] === 'NO_IMAGES_LEFT') {
            printLog('No more images left');
            NO_MORE_IMAGES = true;
            setEnd();
            // setEnd_NoImagesLeft();
        } else if (content['img'] === 'RESEND') {
            flipImage(false);
            // In bonus round, decrease the images left
            if (ADD_TASKS && ADD_IMGS > 0) {
                --ADD_IMGS;
            }
        } else {
            var b64 = content['img'];
            // addImageToImageList(imageName, b64);
            setImage('data:image/jpg;base64,' + b64);
            flipIn(5);
            // In bonus round, decrease the images left
            if (ADD_TASKS && ADD_IMGS > 0) {
                --ADD_IMGS;
            }
        }
        UDGE.afterGetImage();
    }
}

/**
 * Interprets the GET answer of points
 * @param content
 */
function interpret_get_points(content) {
    printLog("received points");
    // Extract points and points to increase
    POINTS = content['value'][0]['points'];
    POINTS_INCR = content['value'][0]['points_incr'];
    setPoints(content['value'][0]['points']);
}

/**
 * Interets the GET answer of a leaderboard
 * @param content
 */
function interpret_get_leaderboard(content) {
    printLog('received leaderboard');
    setLeaderboardFromAPI(content['value']);
}

/**
 * Interprets an API's POST answer:
 *  - Shows an error, when the tags could not get stored (whyever)
 *  - Moves to the next image by resetting the tagging environment
 * @param content The API's answer
 */
function interpret_post(content) {
    if (content['status'] === "OK") {
        if (!(B_IMGS_LEFT === 1 || (ADD_TASKS && ADD_IMGS === 0))) {

            // Set the tagging environment with a small delay such that the API has a chance to trigger further commands
            setTimeout(function () {
                setTaggingEnvironment();
            }, 100);

            if (ADD_TASKS) {
                printLog('ADDITIONAL image successfully submitted');
                increaseExtraImageCounter();
            }
        } else {
            if (ADD_TASKS) {
                printLog('ADDITIONAL round successfully finished!');
                increaseExtraRoundCounter();
            }
            setCookie('ex_img_ctr', '0');
            setEnd();
        }
    } else {
        // Activate the button again, such that the user has a chance to try it again
        $('#next_img').prop('disabled', true);
        viewErrorOverlay("Fehlermeldung vom Server erhalten: " + content['status']);
    }
}

/**
 * Interprets an API's questionnaire answer
 * @param content The API's answer
 */
function interpret_questionnaire(content) {
    var name = content['name'];
    if (content.hasOwnProperty('get')) { // Answer to a get request
        if (content['quest'] === 'FINISHED') {
            QUESTS[name] = true;
            return;
        }
    } else if (content.hasOwnProperty('post')) { // Answer to post request
        if (content['result'] === 'OK') {
            printLog('Questionnaire "' + name + '" successfully submitted and accepted by the server!');
            // Run the callafter, delete the temporary quest, and mark it as done
            QUEST_CURRENT_TO_SEND.callafter();

            // Send the duration to the server
            //var duration = Math.floor((QUEST_CURRENT_TO_SEND.end_time - QUEST_CURRENT_TO_SEND.start_time) / 1000);
            //sendQuestionnaireDuration(name, duration);

            QUEST_CURRENT_TO_SEND = {};
            QUESTS[name] = true;
        } else if (content['quest'] === 'ERROR') {
            printLog('Some error occurred while sending the questionnaire "' + name + '" to the server. ' +
                'Creating error dialog.');
            viewErrorOverlay($('<div></div>').load('views/dialogs/dia_questionnaire_post_error.html'));
        } else if (content['quest'] === 'FINISHED') {
            printLog('POST questionnaire was already FINISHED! Name: ' + content['name']);
            // Run the callafter, delete the temporary quest, and mark it as done
            QUEST_CURRENT_TO_SEND.callafter();
            QUEST_CURRENT_TO_SEND = {};
            QUESTS[name] = true;
        }
    } else {
        // Should not happen with current API implementation
        printLog('Neither GET nor POST in questionnaire answer. Ignore this thing: ' + JSON.stringify(content));
    }
}


/**
 * Interprets a command message
 * @param content The content of the message
 */
function interpret_command(content) {
    UDGE.onInterpretCommand(content);
}

/**
 * Registers a new user, generating a user/password combination
 */
function registerNewUser() {
    USER_NAME = buildNewName();
    USER_PWD = buildNewPassword();
    register(USER_NAME, USER_PWD);
}

/**
 * Sends a register request to the server
 * @param name The name to register
 * @param pwd The password to register
 */
function register(name, pwd) {
    send(json_get_register_message(name, pwd));
}

/**
 * Logging in an user from parameters:
 *  1. Check if the device is supported
 *      - yes: login
 *      - no: forward to the respective view
 * @param usr the user to login
 * @param pwd the user's password
 */
function login_from_params(usr, pwd) {
    if (isMobileDevice()) {
        setUnsupportedDevice();
    } else {
        USER_NAME = usr;
        USER_PWD = pwd;
        send(json_get_login_message(usr, pwd));
    }
}

/**
 * Asking for the user's current points
 */
function getPoints() {
    send(json_get_points_message());
}

/**
 * Asking for the current leaderboard
 */
function getLeaderboard() {
    var user = "";
    send(json_get_leaderboard_message(user));
}

/**
 * Asking for the next image
 */
function getImage() {
    send(json_get_image_message());
}

/**
 * Asking for all images the user has solved
 */
function getAllImages() {
    printLog('Requiring all images the user solved from the server.');
    IMAGES = [];
    // IMAGES_ON_CLIENT = 0;
    send(json_get_all_images_message());
}

/**
 * Asking for the user's concept
 */
function getConcept() {
    sendCommand('get_concept');
}


/**
 * Sends a post command to the server
 * @param tags The tags to send
 */
function sendPost(tags) {
    send(json_post_message(tags))
}


/**
 * Sends a heartbeat to the server
 */
function sendHeartbeat() {
    send(json_heartbeat_message());
}

/**
 * Sends a command to the server.
 * Useful, iff only the command needs to get send to the server.
 * @param cmd the command to send
 */
function sendCommand(cmd) {
    send(json_custom_command(cmd));
}


/**
 * Sends a questionnaire duration to the server
 * @param quest_name The name of the questionnaire
 * @param duration The duration the participant took to fill in the questionnaire
 */
function sendQuestionnaireDuration(quest_name, duration){
    send(json_questionnaire_duration_command(quest_name, duration));
}

/**
 * Sends a questionnaire POST request to set a certain questionnaire result.
 * @param name
 * @param result
 */
function sendQuestionnairePOST(name, result) {
    QUEST_CURRENT_TO_SEND.name = name;
    QUEST_CURRENT_TO_SEND.result = result;

    var tmp = json_questionnaire_post(name, result);
    send(tmp);
}

/* ############## GAME elements ############## */

/**
 * Gets the all the tags for all images the user has worked, sorted by his/her tags and tags by others
 */
function getAllTagsFromMeAndOthers() {
    getAllMyTags();
    getAllOthersTags();
}

/**
 * Gets all the tags from the user
 */
function getAllMyTags() {
    sendCommand('get_all_my_tags');
}

/**
 * Gets all the tags from other users
 */
function getAllOthersTags() {
    sendCommand('get_all_others_tags');
}

/**
 * Sends a message to the server, querying the available goals for the user.
 */
function getGoals() {
    sendCommand('get_goals');
}

/**
 * Sends a message to the server querying the users tag counts
 */
function getMyTagCount(){
    sendCommand('get_my_tag_count');
}

/**
 * Queries the tag count for the last image
 */
function getMyLastImageTagCount(){
    sendCommand('get_my_last_image_tag_count');
}

/**
 * Queries the number of distinct moods for this image
 */
function getDistinctMoodsForThisImage(){
    sendCommand('get_mood_count_for_this_image');
}

/**
 * Queries the 20 most used tags for the current image
 */
function get40MostUsedTagsForCurrentImage(){
    sendCommand('get_most_40_tags_for_this_image');
}

/**
 * Queries the 20 most used tags for the current image
 */
function get25MostUsedTagsForCurrentImage(){
    sendCommand('get_most_25_tags_for_this_image');
}

/**
 * Queries the 20 most used tags for the current image
 */
function get20MostUsedTagsForCurrentImage(){
    sendCommand('get_most_20_tags_for_this_image');
}

/**
 * Queries the 15 most used tags for the current image
 */
function get15MostUsedTagsForCurrentImage(){
    sendCommand('get_most_15_tags_for_this_image');
}

/**
 * Queries the 15 most used tags for the current image
 */
function get10MostUsedTagsForCurrentImage(){
    sendCommand('get_most_10_tags_for_this_image');
}

/**
 * Queries the number of worked images for the user
 */
function getNumberOfImagesWorkedOn(){
    sendCommand('get_worked_images')
}

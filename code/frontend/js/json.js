/**
 * Returns a json string to register a new user
 * @param user
 * @param pwd
 * @returns {string}
 */
function json_get_register_message(user, pwd) {
    return JSON.stringify({
        "type" : "REGISTER",
        "content" : {
            "name" : user,
            "pwd" : pwd
        }
    });
}

/**
 * Returns a json string to login_from_inputs a certain user
 * @param user
 * @param pwd
 * @returns {string}
 */
function json_get_login_message(user, pwd) {
    return JSON.stringify({
        "type" : "LOGIN",
        "content":{
            "name" : user,
            "pwd" : pwd
        }
    });
}

/**
 * Returns a json string to logout a certain user
 * @param user
 * @returns {string}
 */
function json_get_logout_message(user) {
    return JSON.stringify({
        "type" : "LOGOUT",
        "content" : {
            "name" : user
        }
    });
}

/**
 * Returns a json string to query the current points
 * @returns {string}
 */
function json_get_points_message() {
    return JSON.stringify({
       "type" : "GET",
       "content" : {
           "points" : 1
       }
    });
}

/**
 * Returns a json string to query the current points
 * @returns {string}
 */
 function json_get_chosen_leaderboard_message() {
    return JSON.stringify({
       "type" : "GET",
       "content" : {
           "leaderboard_chosen" : 1
       }
    });
}


/**
 * Returns a json string to query the leaderboard
 * @param user
 * @returns {string}
 */
function json_get_leaderboard_message(user) {
    return JSON.stringify({
        "type" : "GET",
        "content":{
            "leaderboard" : 1,
            "name" : user
        }
    });
}

function json_get_tutorial_message(user){
    return JSON.stringify({
        "type" : "GET",
        "content":{
            "tutorial" : 1,
            "name" : user
        }
    });
}

/**
 * Returns a json string to query a new image
 * @returns {string}
 */
function json_get_image_message() {
    return JSON.stringify({
        "type" : "GET",
        "content" : {
            "image" : 1
        }
    });
}

/**
 * Returns a json string to query all server images the user already finished
 * @returns {string}
 */
function json_get_all_images_message(){
    return JSON.stringify({
        "type" : "GET",
        "content" : {
            "image" : 1,
            "all": "true"
        }
    });
}

/**
 * Returns a json string to send tags to the server.
 * @param tags The tags to send.
 * @returns {string} the command as a json string.
 */
function json_post_message(tags) {
    return JSON.stringify({
        "type" : "POST",
        "content": {
            "tags": tags,
            "name" : CURRENT_IMAGE
        }
    });
}


/** Returns a json string to send to the server
 *  Notifies the server which leaderboard was chosen
 *  1 = absolute leaderboard, 2 = relative leaderboard
*/

function json_post_choice_absolute(){
    return JSON.stringify({
        "type" : "POST",
        "content": {
            "chosen_lb" : "1"
        }
    })
}

function json_post_choice_relative(){
    return JSON.stringify({
        "type" : "POST",
        "content": {
            "chosen_lb" : "2"
        }
    })
}

/**
 * Returns a json string to send a result of a questionnaire to the server
 * @param name The name of the questionnaire
 * @param result The result to send
 * @returns {string} the command as a json string
 */
function json_questionnaire_post(name, result){
    return JSON.stringify({
        "type" : "QUESTIONNAIRE",
        "content": {
            "post" : "",
            "name" : name,
            "result" : result
        }
    });
}

/**
 * Returns a json string to send a heartbeat.
 * @returns {string} the command as a json string.
 */
function json_heartbeat_message() {
    return JSON.stringify({"type":"HEARTBEAT"});
}

/**
 * Retrurns a String for a custom command
 * @returns {string} the command as a json string.
 */
function json_custom_command(cmd) {
    return JSON.stringify({
        "type" : "COMMAND",
        "content": {
            "cmd" : cmd,
            "args" : []
        }
    });
}

/**
 * Returns a string for a questionnaire duration command
 * @param quest_name The questionnaire's name
 * @param duration The duration
 * @returns {string} the command as a json string.
 */
function json_questionnaire_duration_command(quest_name, duration){
    return JSON.stringify({
        "type" : "COMMAND",
        "content": {
            "cmd" : "set_questionnaire_duration",
            "args" : [String(quest_name), String(duration)]
        }
    });
}
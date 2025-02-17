/** The server URL **/
var SERVER_URL = 'wss://image-tagging-backend.herokuapp.com/ws/wscon';
//var SERVER_URL = 'ws://localhost:8025/ws/wscon';
//var SERVER_URL = 'ws://m.schubhan.de:8025/wscon';
//var SERVER_URL = 'wss://dobuch.de/ws/wscon/';

/** If false, new users get an error message and cannot go beyond the welcome page **/
var PLATFORM_OPEN = true;

/** If in debugging mode, you can view the debug output at the console. Should be turned off for productive systems (performance) **/
var DEBUGGING = true;

/** Tutorial pics **/
var TUTORIAL_PICS = [];
var TUTORIAL_PICS_CHOICE = [];
var TUTORIAL_PIC = 0;
var TUTORIAL_EXAMPLES = [];

/** Setting this to false prevents the point decrease. Used for example in the tutorial view **/
var DECREASE_POINTS = true;

/** The user's credentials and group belonging **/
var USER_NAME = "Lucid Lynx";
var USER_PWD = "";
var USER_GROUP = "-1";

/** Invisible groups are groups that do not have a dedicated view (i.e., take place in different parts of the view) */
var INVISIBLE_GROUPS = [];

/** The current questionnaire to send to the server **/
var QUEST_CURRENT_TO_SEND = {};

/** The image currently displayed **/
var CURRENT_IMAGE = "";
var B_IMGS_LEFT = '-1';
var NO_MORE_IMAGES = false;
var IMAGES = [];
var IMAGES_ON_CLIENT = 0;

/** Are there any images left **/
var ADD_TASKS = false;
var ADD_IMGS = 0;
var ADD_IMGS_MAX = 5;

/** Does the client need to reconnect to the server (connection lost) **/
var RECONNECTING = false;

// Field to remember the state of auto-scrolling the elements
var AUTOSCROLL = true;
var CURRENT_SLIDE = 0;
var WIN_MIN_WIDTH = 1240;
var WIN_MIN_HEIGHT =700;

/** User's current state, containing its points, leaderboards, etc. **/
var POINTS = -1;
var POINTS_INCR = 0;
var LEADERBOARD_ARRAY = [];
var DESIGN_CHARS_MIN = 700;

/** statistics for absolute and relative study**/
var POINTS_ABSOLUTE = -1;
var POINTS_RELATIVE = -1;

/**other */
var INITIAL_LEADERBOARD_STATE = 0;
var CURRENT_PLAYER_POSITION = -1;
var VISIBLE_PLAYERS = 2;
var NICKNAME = "Du";
var LEADERBOARD_CHOSEN = 0;

/** Image statistics (number of tags per image + duration) and goals **/
var ID_PRIZES_59;
var ID_POINTS_151;
var ID_POINTS_REVIEW_210;
var ID_AQUARIUM_339;
var ID_TEAMS_SIMPLE_104;
var ID_POINTS_96;
var ID_COMPLEX_115;
var ID_POINTS_REVIEW_125;
var ID_POINTS_SIMILAR_61;
var ID_POINTS_REVIEW_438;
var ID_SINGLE_TEAMS_407;
var ID_BEAT_FRIEND_51;
var ID_TEAMS_POINTS_369;
var ID_LEVELS_498;
var ID_TEST_11;
var ID_TEST_12;
var ID_POINTS_731;
var ID_COMPARE_746;
var ID_COMPARE_750;
var ID_POINTS_751;
var ID_COMPARE_780;
var ID_CHARACTER_775;
var ID_COMPARE_787;
var ID_MATCH_797;
var ID_COMPARE_809;
var ID_COMPARE_COLUMN_825;

/**
 * Sets the statics to their default values
 */
function initStaticEnvironment() {
    //SERVER_URL = 'ws://m.schubhan.de:8025/ws/wscon';
    SERVER_URL = 'wss://image-tagging-backend.herokuapp.com/ws/wscon';
    //SERVER_URL = 'ws://localhost:8025/ws/wscon';
    //SERVER_URL = 'wss://dobuch.de/ws/wscon/';
    PLATFORM_OPEN = true;
    DEBUGGING = true;

    TUTORIAL_PICS = ['img/abstract_0001.jpg', 'img/abstract_0002.jpg'];
    //, 'img/abstract_0003.jpg'
    TUTORIAL_PICS_CHOICE = ['img/abstract_0001.jpg', 'img/abstract_0002.jpg'];
    TUTORIAL_EXAMPLES = ['unruhig, verlassen, düster', 'glücklich, ruhig, verträumt'];
    //, 'dunkel, trist, warm'
    TUTORIAL_EXAMPLES_CHOICE = ['unruhig, verlassen, düster', 'glücklich, ruhig, verträumt'];
    TUTORIAL_PIC = 0;
    DECREASE_POINTS = true;
    USER_NAME = "Lucid Lynx";
    USER_PWD = "";
    USER_GROUP = "-1";
    INVISIBLE_GROUPS = ["design_implemented", "progress_bar", "summary"];
    QUEST_CURRENT_TO_SEND = {};
    CURRENT_IMAGE = "";
    B_IMGS_LEFT = '-1';
    NO_MORE_IMAGES = false;
    IMAGES = [];
    IMAGES_ON_CLIENT = 0;
    ADD_TASKS = false;
    ADD_IMGS = 0;
    RECONNECTING = false;
    POINTS = -1;
    POINTS_ABSOLUTE = -1;
    POINTS_RELATIVE = -1;
    POINTS_INCR = 0;
    LEADERBOARD_ARRAY = [];
    DESIGN_CHARS_MIN = 700;
    AUTOSCROLL = true;
    CURRENT_SLIDE = 0;
    WIN_MIN_WIDTH = 1240;
    WIN_MIN_HEIGHT = 700;
    AUTOSCROLL = true;
    reinitGameElements();
}

/**
 * This function reinitializes all the game elements needed
 * TODO: If performance issues, init only the needed ones, but should be no problem
 */
function reinitGameElements() {
    ID_PRIZES_59 = ID_prizes_59();
    ID_PRIZES_59.init('div_it_id_prizes_59');
    ID_POINTS_151 = ID_Points_151();
    ID_POINTS_151.init('div_it_id_points_151');
    ID_POINTS_REVIEW_210 = ID_Points_Review_210();
    ID_POINTS_REVIEW_210.init('div_it_id_points_review_210');
    ID_AQUARIUM_339 = ID_Aquarium_339();
    ID_AQUARIUM_339.init('div_it_id_aquarium_339');
    ID_TEAMS_SIMPLE_104 = ID_Teams_Simple_104();
    ID_TEAMS_SIMPLE_104.init('div_it_id_teams_simple_104');
    ID_POINTS_96 = ID_Points_96();
    ID_POINTS_96.init('div_it_id_points_96');
    ID_COMPLEX_115 = ID_Complex_115();
    ID_COMPLEX_115.init('div_it_id_complex_115');
    ID_POINTS_REVIEW_125 = ID_Points_Review_125();
    ID_POINTS_REVIEW_125.init('div_it_id_points_review_125');
    ID_POINTS_SIMILAR_61 = ID_Points_Similar_61();
    ID_POINTS_SIMILAR_61.init('div_it_id_points_similar_61');
    ID_POINTS_REVIEW_438 = ID_Points_Review_438();
    ID_POINTS_REVIEW_438.init('div_it_id_points_review_438');
    ID_SINGLE_TEAMS_407 = ID_Single_Teams_407();
    ID_SINGLE_TEAMS_407.init('div_it_id_single_teams_407');
    ID_BEAT_FRIEND_51 = ID_Beat_Friend_51();
    ID_BEAT_FRIEND_51.init('div_it_id_beat_friend_51');
    ID_TEAMS_POINTS_369 = ID_Teams_Points_369();
    ID_TEAMS_POINTS_369.init('div_it_id_teams_points_369');
    ID_LEVELS_498 = ID_levels_498();
    ID_LEVELS_498.init('div_it_id_levels_498');
    ID_TEST_11 = ID_Test_11();
    ID_TEST_11.init('div_it_id_test_11');
    ID_TEST_12 = ID_Test_12();
    ID_TEST_12.init('div_it_id_test_12');
    ID_POINTS_731 = ID_Points_731();
    ID_POINTS_731.init('div_it_id_points_731');
    ID_COMPARE_746 = ID_Compare_746();
    ID_COMPARE_746.init('div_it_id_compare_746');
    ID_COMPARE_750 = ID_Compare_750();
    ID_COMPARE_750.init('div_it_id_compare_750');
    ID_POINTS_751 = ID_Points_751();
    ID_POINTS_751.init('div_it_id_points_751');
    ID_COMPARE_780 = ID_Compare_780();
    ID_COMPARE_780.init('div_it_id_compare_780');
    ID_CHARACTER_775 = ID_Character_775();
    ID_CHARACTER_775.init('div_it_id_character_775');
    ID_COMPARE_787 = ID_Compare_787();
    ID_COMPARE_787.init('div_it_id_compare_787');
    ID_MATCH_797 = ID_Match_797();
    ID_MATCH_797.init('div_it_id_match_797');
    ID_COMPARE_809 = ID_Compare_809();
    ID_COMPARE_809.init('div_it_id_compare_809');
    ID_COMPARE_COLUMN_825 = ID_Compare_Column_825();
    ID_COMPARE_COLUMN_825.init('div_it_id_compare_column_825');
}
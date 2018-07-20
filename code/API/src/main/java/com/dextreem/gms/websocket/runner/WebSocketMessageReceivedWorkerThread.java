package com.dextreem.gms.websocket.runner;

import com.dextreem.gms.Constants;
import com.dextreem.gms.db.CommandExecutionReturn;
import com.dextreem.gms.db.DataStoreConnector;
import com.dextreem.gms.error.API_IllegalArgumentException;
import com.dextreem.gms.helper.ImageFile;
import com.dextreem.gms.helper.Props;
import com.dextreem.gms.session.CustomSession;
import com.dextreem.gms.session.SessionManager;
import com.dextreem.gms.websocket.model.WebSocketMessageReceived;
import com.dextreem.gms.websocket.model.WebSocketMessageReceivedType;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.io.FileUtils;
import org.apache.log4j.Logger;
import org.java_websocket.WebSocket;

import javax.json.JsonArray;
import javax.json.JsonValue;
import java.io.IOException;
import java.nio.channels.NotYetConnectedException;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.regex.Pattern;

@SuppressWarnings("ALL")
public class WebSocketMessageReceivedWorkerThread implements Runnable {

    private final String message;
    private final SessionManager sessionManager;
    private final WebSocket webSocket;
    private final DataStoreConnector dataStore;

    private final Pattern name_pattern = Pattern.compile(Props.getProp("api.names.pattern"));
    private final Pattern password_pattern = Pattern.compile(Props.getProp("api.password.pattern"));
    private final Logger logger = Logger.getLogger(WebSocketMessageReceivedWorkerThread.class);

    private final ResourceBundle resourceBundle = ResourceBundle.getBundle("texts", Locale.forLanguageTag(Props.getProp("api.client.messages.lang")));

    /**
     * Initializes the worker with the message that should get interpreted
     *
     * @param message   The message to interpret
     * @param session   The session where the message was received
     * @param dataStore The data store reference
     */
    public WebSocketMessageReceivedWorkerThread(
            String message,
            WebSocket webSocket,
            DataStoreConnector dataStore,
            SessionManager sessionManager) {
        this.message = message;
        this.webSocket = webSocket;
        this.dataStore = dataStore;
        this.sessionManager = sessionManager;
    }

    /**
     * Interprets the message
     */
    public boolean interpretMessage() {
        WebSocketMessageReceived wsm = null;
        try {
            wsm = new WebSocketMessageReceived();

            if (!wsm.decode(message)) {
                return false;
            }

            // If its a heartbeat, directly return
            if (wsm.getType() == WebSocketMessageReceivedType.HEARTBEAT) {
                logger.debug(String.format("Received heartbeat by session'%s'", webSocket.getRemoteSocketAddress()));
                return true;
            }

            // If the user is not logged in, he/she is not allowed to do anything besides logging in and registering
            if (!Constants.IN_JUNIT_TEST_MODE) {
                if (wsm.getType() != WebSocketMessageReceivedType.LOGIN && wsm.getType() != WebSocketMessageReceivedType.REGISTER) {
                    CustomSession customSession = sessionManager.sessionToCustomSession(webSocket.getRemoteSocketAddress());
                    if (null == customSession || !sessionManager.userRegistered(customSession.getUser(), customSession)) {
                        logger.warn(String.format(
                                "User '%s' (Session: %s) tried to execute a '%s' query while not logged in or registered",
                                null == customSession ? "null" : customSession.getUser(),
                                webSocket.getRemoteSocketAddress(),
                                wsm.getType().toString()));
                        answer(wsm.getType(), resourceBundle.getString("answer.not.logged.in"));
                        return false;
                    }
                }
            }

            switch (wsm.getType()) {
                case REGISTER: {
                    wsm.checkParameters("!name", "!pwd", "?email");
                    return interpretRegister(wsm) && executeTriggeredCommands(wsm.getType());
                }
                case LOGIN: {
                    wsm.checkParameters("!name", "!pwd");
                    return interpretLogin(wsm) && executeTriggeredCommands(wsm.getType());
                }
                case LOGOUT: {
                    // no parameter needed
                    return interpretLogout(wsm) && executeTriggeredCommands(wsm.getType());
                }
                case GET: {
                    wsm.checkParameters(".points", ".leaderboard", ".image");
                    return interpretGet(wsm) && executeTriggeredCommands(wsm.getType());
                }
                case POST: {
                    wsm.checkParameters("!tags", "!name", "?start_time", "?end_time");
                    return interpretPost(wsm) && executeTriggeredCommands(wsm.getType());
                }
                case QUESTIONNAIRE: {
                    wsm.checkParameters("!name", ".get", ".post", "?result");
                    return interpretQuestionnaire(wsm) && executeTriggeredCommands(wsm.getType());
                }
                case COMMAND: {
                    wsm.checkParameters("!cmd", "?args");
                    return interpretCustom(wsm) && executeTriggeredCommands(wsm.getType());
                }
                case UNKNOWN: {
                    return interpretUnknown(wsm) && executeTriggeredCommands(wsm.getType());
                }
            }
        } catch (API_IllegalArgumentException ex) {
            logger.error("Error while interpreting message: " + ex.getMessage());
            if (null != wsm) {
                answer(wsm.getType(), ex.getMessage());
            }
            return false;
        }
        return true;
    }


    private final Object registerLock = new Object();

    /**
     * Answers to a login request.
     *
     * @param status The status to send, e.g., "OK"
     */
    private void answerRegister(String status) {
        answer(WebSocketMessageReceivedType.REGISTER, status);
    }

    /**
     * Interprets a register message received through a WebSocket.
     *
     * @param wsm The message to interpret.
     * @return true if successfully interpreted, false otherwise
     */
    private boolean interpretRegister(WebSocketMessageReceived wsm) {
        synchronized (registerLock) {
            String name = wsm.getContentString("name");
            String pwd = wsm.getContentString("pwd");
            String oMail = wsm.getContentString("mail");
            String mail = null == oMail ? "" : oMail.toString();

            /* ---------- validity of name and password ------------ */
            // Check name validity
            if (name.isEmpty()) {
                String answer = resourceBundle.getString("answer.register.name.not.present");
                answerRegister(answer);
                throw new API_IllegalArgumentException(answer);
            }
            if (name_pattern.matcher(name).find()) {
                String answer = String.format(resourceBundle.getString("answer.name.invalid.format"), Props.getProp("api.names.pattern"));
                answerRegister(answer);
                throw new API_IllegalArgumentException(answer);
            }

            // Check password validity
            if (pwd.isEmpty()) {
                String answer = resourceBundle.getString("answer.register.pwd.not.present");
                answerRegister(answer);
                throw new API_IllegalArgumentException(answer);
            }
            if (password_pattern.matcher(pwd).find()) {
                String answer = String.format(resourceBundle.getString("answer.pwd.invalid.format"), Props.getProp("api.password.pattern"));
                answerRegister(answer);
                throw new API_IllegalArgumentException(answer);
            }

            // Ignore the debug mode
            if (Constants.IN_JUNIT_TEST_MODE && null == dataStore) {
                return true;
            }

            dataStore.createUser(name, pwd, mail, getGroupAssignment());
            answerRegister(resourceBundle.getString("answer.ok"));
            return true;
        }
    }

    /**
     * Gets a group assignment for a new user.
     * 1. It distributes into the groups as defined in <i>settings.properties/api.group.distribution</i>
     * 2. If settings.properties/api.group.distribution.force is 'yes', it fills the most empty group, again steered by the distribution
     *
     * @return The (pesudo-) random group name, null if an error occurred
     */
    private String getGroupAssignment() {
        String[] basicGroupNames = Props.getProp("api.group.distribution").split(",");
        if (Props.getProp("api.group.distribution.force").toLowerCase().equals("yes")) {

            // Count the number of occurences of each group in the distribution to get the weight
            Map<String, Integer> occ = new HashMap<>();
            for (String group : basicGroupNames) {
                if (occ.containsKey(group)) {
                    occ.put(group, occ.get(group) + 1);
                } else {
                    occ.put(group, 1);
                }
            }

            // Weight the groups and put them into a map by their weight
            Map<Double, String> weightedFinished = new HashMap<>();
            for (String group : occ.keySet()) {
                int finishedUsers = dataStore.getNumOfFinishedUsers(group) + Props.getOffset(group);
                logger.debug(String.format("Finished studies for group '%s': %s", group, finishedUsers));
//                if (finishedUsers == -1) {
//                    logger.error(
//                            String.format(
//                                    "Found group '%s' to get the finished studies for. Group name wrong set or in DB? Check this!",
//                                    group));
//                } else {
                // Add the groups with their weighted finished studies
                double weight = ((double) dataStore.getNumOfFinishedUsers(group) + Props.getOffset(group)) / ((double) occ.get(group));
                logger.info(String.format("Weight for group '%s': %s", group, weight));
                // If two weights have the same weight, randomly take one of them
                if (weightedFinished.containsKey(weight)) {
                    if ((new Random()).nextBoolean()) {
                        weightedFinished.put(weight, group);
                    }
                } else {
                    weightedFinished.put(weight, group);
                }
//                }
            }

            // Having the weighted groups, we can get the smalles double and return its group name
            List<Double> sortedWeightedFinished = new ArrayList<>(weightedFinished.keySet());
            Collections.sort(sortedWeightedFinished);
            if (sortedWeightedFinished.size() > 0) {
                return weightedFinished.get(sortedWeightedFinished.get(0));
            } else {
                logger.error("No appropriate group found to return, using the fallback (Normal random).");
                logger.error("This means, the defined groups could not get found. Check your settings and database content.");
            }
        }

        logger.info("Getting a random user group.");
        int randi = new Random().nextInt(basicGroupNames.length);
        return basicGroupNames[randi];
    }

    /**
     * Interprets a login message received through a WebSocket.
     *
     * @param wsm The message to interpret.
     * @return true if successfully interpreted, false otherwise
     */
    private boolean interpretLogin(WebSocketMessageReceived wsm) {
        String name = wsm.getContentString("name");
        String pwd = wsm.getContentString("pwd");

        // Check name validity
        if (name.isEmpty()) {
            String answer = resourceBundle.getString("answer.login.name.not.present");
            answerLogin(answer);
            throw new API_IllegalArgumentException(answer);
        }
        if (name_pattern.matcher(name).find()) {
            String answer = String.format(resourceBundle.getString("answer.name.invalid.format"), Props.getProp("api.names.pattern"));
            answerLogin(answer);
            throw new API_IllegalArgumentException(answer);
        }

        // Check password validity
        if (pwd.isEmpty()) {
            String answer = resourceBundle.getString("answer.login.pwd.not.present");
            answerLogin(answer);
            throw new API_IllegalArgumentException(answer);
        }
        if (password_pattern.matcher(pwd).find()) {
            String answer = String.format(resourceBundle.getString("answer.pwd.invalid.format"), Props.getProp("api.password.pattern"));
            answerLogin(answer);
            throw new API_IllegalArgumentException(answer);
        }

        if (Constants.IN_JUNIT_TEST_MODE && null == dataStore) {
            return true;
        }

        if (null != dataStore && !dataStore.checkUserCredentials(name, pwd)) {
            String answer = resourceBundle.getString("answer.user.password.combination.not.known");
            answerLogin(answer);
            return false;
        }

        int uid = dataStore.getUserID(name);
        sessionManager.registerUser(name, new CustomSession(name, webSocket));
        ArrayList<Integer> gids = dataStore.getUserGroupIDs(uid);
        Iterator<Integer> gids_iter = gids.iterator();
        StringBuilder sb = new StringBuilder();
        while (gids_iter.hasNext()) {
            int gid = gids_iter.next();
            sb.append(dataStore.getGroupIdentifier(gid));
            if (gids_iter.hasNext()) {
                sb.append(",");
            }
        }
        dataStore.incrementUserLoginCounter(uid);
        answerLogin(resourceBundle.getString("answer.ok"),
                sb.toString(),
                dataStore.basicImagesLeft(uid),
                dataStore.getFinishedQuestionnaires(uid));
        return true;
    }

    /**
     * Answers to a login request.
     *
     * @param status The status to send, e.g., "OK"
     */
    private void answerLogin(String status) {

        answer(WebSocketMessageReceivedType.LOGIN, status);

    }

    /**
     * Answers to a login request.
     *
     * @param status                 The status to send, e.g., "OK"
     * @param group_ids              The group identifiers to send
     * @param basic_images_left      The number of images left to tag at minimum
     * @param finishedQuestionnaires The questionnaires the user already finished
     */
    private void answerLogin(String status, String group_ids, int basic_images_left, String[] finishedQuestionnaires) {
        Map<String, String> fields = new HashMap<>();
        fields.put("status", status);
        fields.put("group", group_ids);
        fields.put("b_images_left", Integer.toString(basic_images_left));

        // Build the string of already finished questionnaires (if available)
        String quests = "";
        if (null != finishedQuestionnaires && finishedQuestionnaires.length > 0) {
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < finishedQuestionnaires.length; i++) {
                sb.append(finishedQuestionnaires[i]);
                if (i < (finishedQuestionnaires.length - 1)) {
                    sb.append(",");
                }
            }
            quests = sb.toString();
        }
        fields.put("quests", quests);
        answer(WebSocketMessageReceivedType.LOGIN, fields);
    }

    /**
     * Interprets a logout message received through a WebSocket.
     *
     * @param wsm The message to interpret.
     * @return true if successfully interpreted, false otherwise
     */
    private boolean interpretLogout(WebSocketMessageReceived wsm) {
        String name = sessionManager.sessionToCustomSession(webSocket.getRemoteSocketAddress()).getUser();

        if (sessionManager.unregisterUser(name)) {
            logger.debug(String.format("Successfully logged out user '%s'", name));
        } else {
            logger.debug(String.format("Tried to logout not logged in user '%s'", name));
            throw new API_IllegalArgumentException("Not logged in, please log in or register.");
        }
        answerLogout("OK");
        return true;
    }

    /**
     * Answers to a logout request.
     *
     * @param status The status to send, e.g., "OK"
     */
    private void answerLogout(String status) {
        answer(WebSocketMessageReceivedType.LOGOUT, status);
    }

    /**
     * Interprets a get message received through a WebSocket.
     * Possible contents are:
     * <ul>
     * <li>points</li>
     * <li>leaderboard</li>
     * <li>image</li>
     * <li>custom</li>
     * </ul>
     * While 'points', 'leaderboard' and 'image' are static implementations, 'custom' accesses the database for finding
     * the right command to execute. Therefore there must be some command arguments present in the command (of course
     * only when the command needs arguments)
     *
     * @param wsm The message to interpret.
     * @return true if successfully interpreted, false otherwise
     */
    private boolean interpretGet(WebSocketMessageReceived wsm) {
        String user = sessionManager.sessionToCustomSession(webSocket.getRemoteSocketAddress()).getUser();
        int userID = dataStore.getUserID(user);

        if (wsm.getContent().containsKey("points")) {
            logger.debug("Interpret and execute 'get_points' command");
            int uid = dataStore.getUserID(user);
            CommandExecutionReturn cer = dataStore.executeCommand("get_points", new Object[]{uid});
            if (null == cer) {
                logger.error("Error: Command not found or not allowed to execute this command!");
                answerGet(resourceBundle.getString("answer.cmd.not.found"));
                return false;
            }
            String result_json = cer.toString();
            answerGet("get_points", result_json);
        } else if (wsm.getContent().containsKey("leaderboard")) {
            logger.debug("Interpret and execute 'get_leaderbord' command");
            int uid = dataStore.getUserID(user);
            CommandExecutionReturn cer = dataStore.executeCommand("get_leaderboard", new Object[]{uid});
            if (null == cer) {
                logger.error("Error: Command not found or not allowed to execute this command!");
                answerGet(resourceBundle.getString("answer.cmd.not.found"));
                return false;
            }
            String result_json = cer.toString();
            answerGet("get_leaderboard", result_json);
        } else if (wsm.getContent().containsKey("image")) {

            if (!wsm.getContent().containsKey("all")) {
                logger.debug("Interpret and execute 'image' command");
                int basic_images_left = dataStore.basicImagesLeft(userID);
                ImageFile image = dataStore.getImage(dataStore.getUserID(user));

                if (null == image) {
                    return answerGetImage(null, basic_images_left, true);
                } else if (image.getName().equals("RESEND")) {
                    return answerGetImage(image, basic_images_left, false);
                } else if (!image.exists() || image.isDirectory()) {
                    return answerGetImage(null, basic_images_left, false);
                }
                return answerGetImage(image, basic_images_left, false);
            } else {
                // User queried ALL images. So get all images and send them back sequentially
                String[] filter = wsm.getContentString("all").split(",");
                List<ImageFile> images = dataStore.getAllImages(userID, filter);
                boolean success = true;
                for (ImageFile image : images) {
                    success = success && answerGetAllImages(image, images.size());
                }
                return success;
            }

        } else {
            logger.warn("Tried to interpret GET message without points, leaderboard, or custom");
            answerGet(resourceBundle.getString("answer.error"));
            return false;
        }
        return true;
    }

    /**
     * Answers to a GET request by setting the status.
     * This is an easy method to answer.
     *
     * @param status The status to send, e.g., "OK" or error messages
     */
    private void answerGet(String status) {
        answer(WebSocketMessageReceivedType.GET, status);
    }

    /**
     * Answers to a GET request by setting the status and a value.
     * Use this e.g. for sending stuff as points and leaderboard
     *
     * @param status The status to send
     * @param value  The value to send
     */
    private void answerGet(String status, String value) {
        answer(WebSocketMessageReceivedType.GET, status, value);
    }

    /**
     * Takes an image object, encodes it with base 64 and send it to the client.
     * If the file object is null, it sends an ERROR message to the client.
     *
     * @param image The image to send to the client.
     * @return true, if the image was successfully, false otherwise
     */
    private boolean answerGetImage(ImageFile image, int basic_images_left, boolean no_images_left) {
        WebSocketMessageReceivedType type = WebSocketMessageReceivedType.GET;

        String image_name = null == image ? "" : image.getName();
        String image_base64 = no_images_left ? "NO_IMAGES_LEFT" : resourceBundle.getString("answer.error");
        if (null != image) {
            // If the image is about to get resend
            if (image.getName().equals("RESEND")) { // If the image is about to get resend
                image_base64 = "RESEND";
                image_name = image.getImageFileName();
            } else { // Otherwise simply send the (encoded) image
                try {
                    byte[] encoded = Base64.encodeBase64(FileUtils.readFileToByteArray(image));
                    image_base64 = new String(encoded, StandardCharsets.US_ASCII);
                } catch (IOException e) {
                    logger.error(String.format(
                            "File '%s' not present or could not get Base64 encoded. Fallback to 'ERROR' message.",
                            image.getAbsoluteFile()));
                    e.printStackTrace();
                }
            }
        }
        try {
            webSocket.send(String.format(
                    "{\"type\": \"%s\",\"content\":{\"status\" : \"image\", \"img\" : \"%s\", \"name\": \"%s\", \"b_images_left\" : %s}}",
                    type.toString(), image_base64, image_name, basic_images_left));
        } catch (NotYetConnectedException e) {
            logger.error(String.format("Error while replying to %s request!", type.toString()));
            e.printStackTrace();
            return false;
        } catch (NullPointerException ex) {
            logger.error(String.format("Error while replying to %s request (Session = %s)!", type.toString(), webSocket));
            ex.printStackTrace();
            return false;
        }
        return true;
    }

    /**
     * Answers to a get all images message
     *
     * @param image       The image to send
     * @param totalToSend The total number of images to send
     * @return
     */
    private boolean answerGetAllImages(ImageFile image, int totalToSend) {
        WebSocketMessageReceivedType type = WebSocketMessageReceivedType.GET;
        try {
            byte[] encoded = Base64.encodeBase64(FileUtils.readFileToByteArray(image));
            String image_base64 = new String(encoded, StandardCharsets.US_ASCII);
            String imageName = image.getName();
            webSocket.send(String.format(
                    "{\"type\": \"%s\",\"content\":{\"status\" : \"image\", \"all\" : \"true\", \"name\": \"%s\", \"total_images\" : %s, \"img\" : \"%s\"}}",
                    type.toString(), imageName, totalToSend, image_base64));
        } catch (IOException e) {
            logger.error(String.format("Error while getting or sending image '%s' for/to the client.", image.getAbsoluteFile()));
            e.printStackTrace();
            return false;
        }
        return true;
    }

    /**
     * Interprets a post message received through a WebSocket.
     * Stores tags in the respective database.
     *
     * @param wsm The message to interpret.
     * @return true if successfully interpreted, false otherwise
     */
    private boolean interpretPost(WebSocketMessageReceived wsm) {
        String user = sessionManager.sessionToCustomSession(webSocket.getRemoteSocketAddress()).getUser();
        int userID = dataStore.getUserID(user);

        String tags_string = wsm.getContentString("tags");
        String image_name = wsm.getContentString("name");
        if (image_name.startsWith("TUTORIAL")) {
            logger.debug("Storing TUTORIAL image tags.");
            dataStore.insertTutorialImage(userID, image_name, tags_string);
            return true;
        } else {
            logger.debug("Storing image tags.");
            if (dataStore.updateImage(userID, image_name, tags_string)) {
                answerPost(resourceBundle.getString("answer.ok"));
                return true;
            } else {
                logger.warn(String.format("Could not store tags (%s) for image %s, user: %s (%s).", tags_string, image_name, user, userID));
                answerPost(resourceBundle.getString("answer.error"));
            }
        }
        return false;
    }

    /**
     * Answers to a POST request.
     *
     * @param status The status to send, e.g., "OK"
     */
    private void answerPost(String status) {
        answer(WebSocketMessageReceivedType.POST, status);
    }

    /**
     * Interprets a questionnaire message received through a WebSocket.
     *
     * @param wsm The message to interpret.
     * @return true if successfully interpreted, false otherwise
     */
    private boolean interpretQuestionnaire(WebSocketMessageReceived wsm) {
        String user = sessionManager.sessionToCustomSession(webSocket.getRemoteSocketAddress()).getUser();
        int userID = dataStore.getUserID(user);
        String questionnaire_name = wsm.getContentString("name");

        if (wsm.containsContent("get")) {
            // Already finished?
            if (dataStore.questionnaireAlreadyFinished(userID, questionnaire_name)) {
                answerQuestionnaireGET(questionnaire_name, "FINISHED");
                return false;
            }

            // Get and return the questionnaire
            String questionnaire = dataStore.getQuestionnaire(userID, questionnaire_name);
            if (null == questionnaire) {
                answerQuestionnaireGET(questionnaire_name, resourceBundle.getString("answer.error"));
            } else {
                answerQuestionnaireGET(questionnaire_name, questionnaire);
            }
        } else if (wsm.containsContent("post")) {
            // Already finished?
            if (dataStore.questionnaireAlreadyFinished(userID, questionnaire_name)) {
                answerQuestionnairePOST(questionnaire_name, "FINISHED");
                return false;
            }

            // Insert the result to the database
            JsonValue jv = wsm.getContentObject("result");
            String cnt = jv.toString();
            if (!dataStore.setQuestionnaire(userID, questionnaire_name, cnt)) {
                answerQuestionnairePOST(questionnaire_name, resourceBundle.getString("answer.error"));
            } else {
                answerQuestionnairePOST(questionnaire_name, resourceBundle.getString("answer.ok"));
            }
        } else {
            logger.warn("User sent questionnaire request without 'get' and 'post' ignoring");
            answerQuestionnairePOST(questionnaire_name, resourceBundle.getString("answer.error"));
            return false;
        }
        return true;
    }

    /**
     * Answers to a questionnaire GET request
     *
     * @param name The name of the questionnaire
     */
    private void answerQuestionnaireGET(String name, String questionnaire_json) {
        StringBuilder answer = new StringBuilder();
        answer.append(String.format("{\"type\": \"%s\",\"content\":{", WebSocketMessageReceivedType.QUESTIONNAIRE.toString()));
        answer.append("\"get\":\"\",");
        answer.append(String.format("\"name\":\"%s\",", name));
        if (questionnaire_json.equals("FINISHED") || questionnaire_json.equals("ERROR")) {
            answer.append(String.format("\"quest\":\"%s\"", questionnaire_json));
        } else {
            answer.append(String.format("\"quest\":%s", questionnaire_json));
        }
        answer.append("}}");

        try {
            sendToClient(answer.toString());
        } catch (IOException e) {
            logger.error(String.format("Error while replying to %s request!", WebSocketMessageReceivedType.QUESTIONNAIRE.toString()));
            e.printStackTrace();
        } catch (NullPointerException ex) {
            logger.error(String.format("Error while replying to %s request (Session = %s)!", WebSocketMessageReceivedType.QUESTIONNAIRE.toString(), webSocket));
            ex.printStackTrace();
        }
    }

    /**
     * Sends a message to the server, throwing exceptions when some error arose.
     *
     * @param message The message to send
     * @throws IOException          Thrown by the sendText() method if something is wrong with the message
     * @throws NullPointerException Thrown if the session is already cloesed and hence the message could not get send
     */
    private void sendToClient(String message) throws IOException, NullPointerException {
        webSocket.send(message);
    }

    /**
     * Answers to a questionnaire POST request
     *
     * @param name   The name of the questionnaire
     * @param result The result to send
     */
    private void answerQuestionnairePOST(String name, String result) {
        Map<String, String> cnt = new HashMap<>();
        cnt.put("post", "");
        cnt.put("name", name);
        cnt.put("result", result);
        answer(WebSocketMessageReceivedType.QUESTIONNAIRE, cnt);
    }

    /**
     * Interprets a custom message received through a WebSocket.
     *
     * @param wsm The message to interpret.
     * @return true if successfully interpreted, false otherwise
     */
    private boolean interpretCustom(WebSocketMessageReceived wsm) {
        String user = sessionManager.sessionToCustomSession(webSocket.getRemoteSocketAddress()).getUser();

        String command = wsm.getContent().getString("cmd");
        JsonArray jsonArray = wsm.getContent().getJsonArray("args");

        String[] arguments = new String[jsonArray.size()];
        for (int i = 0; i < jsonArray.size(); i++) {
            arguments[i] = jsonArray.get(i).toString();
        }

        logger.debug(String.format("Interpret and execute 'custom' command: %s, argument count: %s", command, arguments.length));
        if (null == command) {
            logger.info("Found 'null' command. Return without execution");
            return false;
        }

        int uid = dataStore.getUserID(user);
        Object[] cmd_args = new Object[arguments.length + 1];
        cmd_args[0] = uid;
        System.arraycopy(arguments, 0, cmd_args, 1, arguments.length);

        CommandExecutionReturn cer = dataStore.executeCommand(command, cmd_args);
        String result_json = null == cer ? "" : cer.toString();
        answerCustom(command, result_json);
        return true;
    }

    /**
     * Answers to a custom request.
     *
     * @param value The status to send, e.g., "OK"
     */
    private void answerCustom(String command, String value) {
        answer(WebSocketMessageReceivedType.COMMAND, command, value);
    }

    /**
     * Interprets a message with an unknown message type. Should throw an error beforehand, such that this is not
     * reachable. This method just makes sure that false gets returned in every way.
     *
     * @param wsm The message to interpret
     * @return true if the interpretation was successful, false otherwise (in this case, returns always false)
     */
    private boolean interpretUnknown(WebSocketMessageReceived wsm) {
        logger.fatal("Peter panic: unknown command type.");
        answerUnknown(String.format(resourceBundle.getString("answer.unknown.command"), wsm.getType().toString()));
        return false;
    }

    /**
     * Answers to a unknown request.
     *
     * @param status The status to send, e.g., "OK"
     */
    private void answerUnknown(String status) {
        answer(WebSocketMessageReceivedType.UNKNOWN, status);
    }

    /**
     * Answers to a client
     *
     * @param type   The type of the answer (according to the incoming message)
     * @param status The status to return, e.g., error messages
     */
    private void answer(WebSocketMessageReceivedType type, String status) {
        answer(type, status, "");
    }

    /**
     * Answers to a client
     *
     * @param type   The type of the answer (according to the incoming message)
     * @param status The status to return, e.g., points or leaderboard
     * @param value  The value to send, i.e., when sending points or leaderboard
     */
    private void answer(WebSocketMessageReceivedType type, String status, String value) {
        try {
            if (value.startsWith("[")) {
                webSocket.send(String.format("{\"type\": \"%s\",\"content\":{\"status\" : \"%s\", \"value\" : %s}}", type.toString(), status, value));
            } else {
                webSocket.send(String.format("{\"type\": \"%s\",\"content\":{\"status\" : \"%s\", \"value\" : \"%s\"}}", type.toString(), status, value));
            }
        } catch (NotYetConnectedException e) {
            logger.error(String.format("Error while replying to %s request!", type.toString()));
            e.printStackTrace();
        } catch (NullPointerException ex) {
            logger.error(String.format("Error while replying to %s request (Session = %s)!", type.toString(), webSocket));
            ex.printStackTrace();
        }
    }

    /**
     * Answers to a client with more than a simple status.
     *
     * @param type   The type of the answer (according to the incoming message)
     * @param fields The (custom) fields to send
     */
    private void answer(WebSocketMessageReceivedType type, Map<String, String> fields) {
        StringBuilder content = new StringBuilder();
        content.append(String.format("{\"type\": \"%s\",\"content\":{", type.toString()));
        Iterator<String> keys = fields.keySet().iterator();
        while (keys.hasNext()) {
            String key = keys.next();
            Object to_add = fields.get(key);
            content.append(String.format("\"%s\" : ", key));
            content.append(String.format("\"%s\"", to_add));
            if (keys.hasNext()) {
                content.append(",");
            }
        }
        content.append("}}");
        try {
            webSocket.send(content.toString());
        } catch (NotYetConnectedException e) {
            logger.error(String.format("Error while replying to %s request!", type.toString()));
            e.printStackTrace();
        } catch (NullPointerException ex) {
            logger.error(String.format("Error while replying to %s request (Session = %s)!", type.toString(), webSocket));
            ex.printStackTrace();
        }
    }

//    /**
//     * Checks whether the parameters are present or not.
//     *
//     * @param type       request type for error message
//     * @param parameters The parameters to check for presence, format [constraint-char][parameter]
//     *                   [constraint-char] = ! (mandatory) OR ? (obligatory) OR . (exclusive)
//     *                   e.g.,  "!name": name must be present
//     *                   "!a", ".b", ".c": a must be present AND either b xor c
//     * @throws API_IllegalArgumentException when an argument is missing
//     */
//    private void checkParameters(WebSocketMessageReceivedType type, String... parameters) throws API_IllegalArgumentException {
//        boolean exclusiveParameterPresent = false;
//
////        // TODO: To this properly
////        return;
//
//        for (String parameter : parameters) {
//            char leadingChar = parameter.charAt(0);
//            String cleanedParameter = parameter.substring(1);
//            if (leadingChar == '!' && !message.contains(cleanedParameter)) {
//                throw new API_IllegalArgumentException(String.format("Parameter '%s' must be present in a '%s' request.", cleanedParameter, type.toString()));
//            }
//
//            if (leadingChar == '.') {
//                if (exclusiveParameterPresent && message.contains(cleanedParameter)) {
//                    throw new API_IllegalArgumentException(String.format("Multiple exclusive parameters present in request of type '%s'", type.toString()));
//                } else if (message.contains(cleanedParameter)) {
//                    exclusiveParameterPresent = true;
//                }
//            }
//        }
//    }

    /**
     * Finds and executes commands to trigger
     *
     * @param wsm The command to trigger commands for
     * @return true if the execution (of all commands) was succesful, false otherwise
     */
    private boolean executeTriggeredCommands(WebSocketMessageReceivedType wsm) {
        try {
            logger.info(String.format("Run trigger commands for '%s' command", wsm.toString()));
            String user = sessionManager.sessionToCustomSession(webSocket.getRemoteSocketAddress()).getUser();
            int userID = dataStore.getUserID(user);
            ArrayList<Integer> groupIDs = dataStore.getUserGroupIDs(user);
            String[] commandsToTrigger = dataStore.getTriggerCommands(groupIDs, wsm.toString());
            for (String cmd : commandsToTrigger) {
                dataStore.executeCommand(cmd, new Object[]{userID});
            }
        } catch (NullPointerException ex) {
            // Check for NPE for LOGOUT messages.
            // They are caused by trying to trigger a command for a session that is no more present.
            // If this happens for other messages, do not jump out and properly log that error!
            if (wsm == WebSocketMessageReceivedType.LOGOUT) {
                logger.info("NPE while executing LOGOUT command. This is normal and can get ignored");
                return false;
            }

            logger.error("NPE while executing trigger commands. This is normal for the 'LOGOUT' command!");
            ex.printStackTrace();
            return WebSocketMessageReceivedType.LOGOUT == wsm;
        }
        return true;
    }

    /**
     * Runnable wrapper method around message interpretation
     */
    @Override
    public void run() {
        logger.debug(String.format("Interpreting message from session '%s'", webSocket.getRemoteSocketAddress()));
        long start = System.currentTimeMillis();
        boolean success = this.interpretMessage();
        long end = System.currentTimeMillis();
        double duration = ((double) end - start) / 1000;
        logger.debug(String.format("Message interpreted from session '%s'. Duration: %s seconds. Success: %s",
                webSocket.getRemoteSocketAddress(), duration, success));
    }
}

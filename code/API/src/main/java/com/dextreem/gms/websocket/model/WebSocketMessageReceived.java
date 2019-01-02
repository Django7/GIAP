package com.dextreem.gms.websocket.model;

import com.dextreem.gms.error.API_IllegalArgumentException;
import org.apache.log4j.Logger;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonValue;
import javax.json.stream.JsonParsingException;
import java.io.StringReader;

public class WebSocketMessageReceived {

    private WebSocketMessageReceivedType type = WebSocketMessageReceivedType.UNKNOWN;
    private JsonObject content = null;


    private final Logger logger = Logger.getLogger(WebSocketMessageReceived.class);

    /**
     * Creates a new -empty- WebSocket message
     */
    public WebSocketMessageReceived() {
    }

    /**
     * Decodes the message, interpreting it as a JSON string:
     *  1. Extract type only
     *  2. Extract other data
     * --> unknown types directly could get ignored without querying anything else
     *
     * @param message The message in JSON format.
     * @return false if the decoding process threw an error, true otherwise
     */
    public boolean decode(String message) {
        JsonObject jsonObject = null;

        // 1. Extract type
        try {
            jsonObject = Json.createReader(new StringReader(message)).readObject();
            type = WebSocketMessageReceivedType.valueOf(jsonObject.getString("type"));
        } catch (IllegalArgumentException ex) {
            //ex.printStackTrace();
            if (null == jsonObject) {
                logger.error("Could not create json object from message " + message);
            } else {
                logger.error(String.format("Unknown message type '%s'. Not decode any further! Ignoring this message.", jsonObject.getString("type")));
            }
            logger.error(message);
            throw new API_IllegalArgumentException("Internal error. Please try again or contact us!");
        } catch (JsonParsingException ex) {
            logger.error("Could not decode JSON string (it seems that it's not a JSON string at all). Ignoring this message.");
            logger.error(message);
            ex.printStackTrace();
            throw new API_IllegalArgumentException("Internal error. Please try again or contact us!");
        }

        // 2. Content
        content = jsonObject.getJsonObject("content");
        return true;
    }

    /**
     * Checks whether the parameters are present or not.
     *
     * @param parameters The parameters to check for presence, format [constraint-char][parameter]
     *                   [constraint-char] = ! (mandatory) OR ? (obligatory) OR . (exclusive)
     *                   e.g.,  "!name": name must be present
     *                   "!a", ".b", ".c": a must be present AND either b xor c
     * @throws API_IllegalArgumentException when an argument is missing
     */
    public void checkParameters(String... parameters) throws API_IllegalArgumentException {
        boolean exclusiveParameterPresent = false;

        if(null == content){
            logger.debug("Content is not yet set --> do not check parameters.");
            return;
        }

        for (String parameter : parameters) {
            char leadingChar = parameter.charAt(0);
            String cleanedParameter = parameter.substring(1);
            if (leadingChar == '!' && !content.containsKey(cleanedParameter)) {
                throw new API_IllegalArgumentException(String.format("Parameter '%s' must be present in a '%s' request.", cleanedParameter, type.toString()));
            }

            if (leadingChar == '.') {
                if (exclusiveParameterPresent && content.containsKey(cleanedParameter)) {
                    throw new API_IllegalArgumentException(String.format("Multiple exclusive parameters present in request of type '%s'", type.toString()));
                } else if (content.containsKey(cleanedParameter)) {
                    exclusiveParameterPresent = true;
                }
            }
        }
    }

    /**
     * Gets the content related to a specified key element.
     *
     * @param key The key to look for
     * @return The content as JsonValue if available, null otherwise
     */
    public String getContentString(String key) {
        if (null != content && content.containsKey(key)) {
            return content.getString(key);
        }
        return null;
    }

    /**
     * Gets the content as a JSON object
     *
     * @param key The key to look for
     * @return The content as JsonObject if available, null otherwise
     */
    public JsonValue getContentObject(String key){
        if (null != content && content.containsKey(key)) {
            return content.get(key);
        }
        return null;
    }

    /**
     * Checks if a certain key is present
     *
     * @param key The key to check
     * @return true, if the key is present in the content, false otherwise
     */
    public boolean containsContent(String key) {
        return null != content && content.containsKey(key);
    }

    /**
     * Gets the type of the message
     * @return The message's type
     */
    public WebSocketMessageReceivedType getType() {
        return type;
    }

    /**
     * Gets all the message content as a json object
     * @return all json message content
     */
    public JsonObject getContent() {
        return content;
    }
}

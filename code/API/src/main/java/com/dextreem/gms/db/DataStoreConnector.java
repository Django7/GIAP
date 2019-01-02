package com.dextreem.gms.db;

import com.dextreem.gms.helper.ImageFile;

import java.io.File;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Provides methods to communicate with the data store.
 * This could be for example:
 * - (distributed) File system
 * - in-memory file system
 * - Database
 * A reference implementation is shown in MySQLDataStore that uses a (*surprise*) MySQL database to store all the stuff
 * it needs.
 * <i>Please note:</i> The wording in this interface might sometimes refer to database-context. I'll try to change this
 * for the future...
 */
public interface DataStoreConnector {

    /**
     * Checks whether the data store is available.
     *
     * @return true if its available, false if not
     * @since v1.0
     */
    boolean dataStoreAvailable();

    /**
     * Connects to the data store.
     *
     * @return true if the connection was successful, false otherwise
     * @since v1.0
     */
    boolean connect();

    /**
     * Disconnects from the data store.
     *
     * @return true if the connection was closed successfully, false otherwise
     * @since v1.0
     */
    boolean disconnect();

    /**
     * Check if user credentials are present in the data store and equal to the parameters
     *
     * @param usr The user name to check
     * @param pwd The user's respective password to check
     * @return true if the user is present in the data store and user name and password are identical to the one in the
     * data store
     * @since v1.0
     */
    boolean checkUserCredentials(String usr, String pwd);

    /**
     * Gets all the dat aset existing for a specific table of a specific user
     *
     * @param table The data set to get
     * @param usr   The user to get the table for
     * @return The table content as a list of maps if the table exists and the user is allowed to access it, null otherwise.
     * @since v1.0
     * @deprecated Not used anymore
     */
    List<Map<String, Object>> getDataSet(String table, String usr);

    /**
     * Gets all the data existing for a specific table of a specific user
     *
     * @param table  The table to get
     * @param usr    The user to get the table for
     * @param concat Defines how to append the filters (AND, OR, ...)
     * @param filter The filter to use for the query
     * @return The table content as a list of maps if the table exists and the user is allowed to access it, null otherwise.
     * @since v1.0
     */
    List<Map<String, Object>> getDataSet(String table, String usr, RowFilterConcatenation concat, RowKeyValuePair... filter);

    /**
     * Update a data set (entry) with new values
     *
     * @param table     The table the changes should get apply.
     * @param newValues The new values.
     * @param concat    Defines how the filter elements should get concatenated (AND or OR).
     * @param filter    Filter, managing the results (e.g., only results for certain users)
     * @return true, if the update was successful, false otherwise
     * @since v1.0
     * @deprecated not used anymore
     */
    boolean updateTable(String table, List<RowKeyValuePair> newValues, RowFilterConcatenation concat, RowKeyValuePair... filter);

    /**
     * Inserts the list of values to the data set.
     *
     * @param table  The table to insert all values into.
     * @param values The values to insert.
     * @return true if there successfully inserted, false otherwise.
     */
    boolean insertToTable(String table, RowKeyValuePair... values);

    /**
     * Checks whether the dataset exists
     *
     * @param table The name of the dataset
     * @return true if it exists, false otherwise
     * @since v1.0
     */
    boolean dataset_exists(String table);

    /**
     * Checks whether a user exists or not
     *
     * @param usr The name of the user to check
     * @return true if the user exists, false otherwise
     * @since v1.0
     */
    boolean user_exists(String usr);

    /**
     * Gets an user ID by the user name
     *
     * @param usr The user name to get the id for
     * @return The user's id, -1 if the user does not exists
     * @since v1.0
     */
    int getUserID(String usr);

    /**
     * Gets an user name by ID
     *
     * @param id The id to retrieve the name for
     * @return The user's name, null if the user does not exists
     * @since v1.0
     */
    String getUserName(int id);

    /**
     * Get the user's group ID
     *
     * @param userName The user name to get the group for
     * @return The user group id
     * @since v1.0
     * @deprecated This method only returns the first group. Use the one returning int[] instead
     */
    int getUserGroupID(String userName);

    /**
     * Get ALL the user's group IDs
     *
     * @param userName The user name to get the groups for
     * @return The user group ID's as an array
     * @since v1.3
     */
    ArrayList<Integer> getUserGroupIDs(String userName);

    /**
     * Get the user's group ID
     *
     * @param userID The user id to get the group for
     * @return The user group id
     * @since v1.0
     * @deprecated This method only returns the first group. Use the one returning int[] instead
     */
    int getUserGroupID(int userID);

    /**
     * Get ALL the user's group IDs
     *
     * @param userID The user id to get the group for
     * @return The user group ID's as an array
     * @since v1.3
     */
    ArrayList<Integer> getUserGroupIDs(int userID);

    /**
     * Gets a group identifier (string) for a ID (number)
     *
     * @param groupID The group's id to inspect
     * @return The group identifier
     * @since v1.0
     */
    String getGroupIdentifier(int groupID);

    /**
     * Checks whether a group exists
     *
     * @param group The group to check for
     * @return true if the group exists, false otherwise
     * @since v1.0
     */
    boolean group_exists(String group);

    /**
     * Get the group ID by group identifier
     *
     * @param group The group's identifier
     * @return The group's ID as an int
     * @since v1.0
     */
    int getGroupID(String group);

    /**
     * Get the group name by an group ID
     *
     * @param groupID The group ID to get the name for
     * @return the group name (not IDENTIFIER!)
     * @since v1.0
     */
    String getGroupName(int groupID);

    /**
     * Gets the basic group names from the data store
     *
     * @return Array of the basic group names
     * @since v1.0
     * @deprecated Not used anymore
     */
    String[] getBasicGroupNames();

    /**
     * Creates a user with the specified criterions
     *
     * @param name       The user's name
     * @param password   The user's password
     * @param email      The user's email address
     * @param group_name The user's (initial) group name
     * @return true if the user was successfully created, false otherwise
     * @since v1.0
     */
    boolean createUser(String name, String password, String email, String group_name);

    /**
     * Returns a list of all data sets available
     *
     * @return The list of all data sets
     * @since v1.0
     */
    List<String> dataSet_list();

    /**
     * Gets the next image for a specific user.
     * This requires that the data store can hold or at minimum link the resources to the API
     *
     * @param userID The user id to get the next image
     * @return The next image for the specific user
     * @since v1.0
     */
    ImageFile getImage(int userID);

    /**
     * Gets all images the user already has
     * @param userID The user id to get the images for
     * @param filter The images NOT to retrieve
     * @return All the images in a single array
     * @since v1.4
     */
    List<ImageFile> getAllImages(int userID, String[] filter);

    /**
     * Updates an specified image representation, adding tags to it
     *
     * @param userID     The user to update the image for
     * @param image_name The name of the image to update
     * @param tags       The tags to add to the image
     * @return true, if the image was successfully changed (i.e., tags successfully added), false otherwise
     * @since v1.0
     */
    boolean updateImage(int userID, String image_name, String tags);

    /**
     * Get the number of finished users for a certain group.
     * Does not consider the property api.group.distribution.offsets. If needed, you have to add the offset manually.
     *
     * @param group The group to get the number of finished questionnaires for
     * @return The number of users that finished the study (i.e., submitted the final questionnaire)
     * @since v1.3
     */
    int getNumOfFinishedUsers(String group);

    /**
     * Inserts the tags for a tutorial image
     *
     * @param userID     The user id to insert the tutorial image for
     * @param image_name The image name of the tutorial image
     * @param tags       The tags to store for the image
     */
    void insertTutorialImage(int userID, String image_name, String tags);

    /**
     * Get the number of basic images left for a specific user
     *
     * @param userID The user to check the number of basic images left
     * @return The number of basic images left
     * @since v1.0
     */
    int basicImagesLeft(int userID);

    /**
     * Get the trigger commands for a specific group and a respective command causing the trigger
     *
     * @param groupIDs     The group IDs of the user as a base to get the trigger commands for
     * @param trigger_case The executed command that is able to trigger the respective commands
     * @return The list of commands potentially be able to get triggered, filtered by the trigger e
     * @since v1.0
     */
    String[] getTriggerCommands(ArrayList<Integer> groupIDs, String trigger_case);

    /**
     * Checks whether a certain questionnaire is already finished
     *
     * @param userID The user id to check the questionnaire state for
     * @param name   The name of the questionnaire to check
     * @return true if the questionnaire is already finished by the user, false otherwise
     * @since v1.0
     */
    boolean questionnaireAlreadyFinished(int userID, String name);

    /**
     * Gets a certain questionnaire for the
     *
     * @param userID The user id to get the questionnaire for
     * @param name   The name of the questionnaire
     * @return the questionnaire as string, 'FINISHED' if the questionnaire is already finished by the user
     * @since v1.0
     */
    String getQuestionnaire(int userID, String name);

    /**
     * Sets a certain questionnaire (Adds the result to the table)
     * Does not check whether the questionnaire already was answered.
     *
     * @param userID The user id to set the questionnaire for
     * @param name   The name of the questionnaire
     * @param result The result of the questionnaire as a string
     * @return true if the questionnaire was set successfully, false otherwise.
     * @since v1.0
     */
    boolean setQuestionnaire(int userID, String name, String result);

    /**
     * Increments the user login counter by 1.
     *
     * @param userID The user id to increment the
     * @since v1.3
     */
    void incrementUserLoginCounter(int userID);

    /**
     * Executes a certain command
     *
     * @param command The command to execute
     * @param args    Arguments to add to the command
     * @return The result of the data store query
     * @since v1.0
     */
    CommandExecutionReturn executeCommand(String command, Object[] args);

    /**
     * Gets the questionnaires that were already finished by a specific user
     *
     * @param userID The user to get the questionnaires for
     * @return The finished questionnaires as an array
     * @since v1.0
     */
    String[] getFinishedQuestionnaires(int userID);
}

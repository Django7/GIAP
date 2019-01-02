package com.dextreem.gms.db;

import com.dextreem.gms.error.API_IllegalArgumentException;
import com.dextreem.gms.helper.ImageFile;
import com.dextreem.gms.helper.Props;
import org.apache.log4j.Logger;

import java.sql.*;
import java.util.*;

/**
 * This class provides methods to use a MySQL database as data store.
 * Non of those methods checks for harmful arguments (e.g., main.resources.SQL injection). This must be done before (!) calling one
 * of those methods.
 */
@SuppressWarnings("HardCodedStringLiteral")
public class MySQLDataStore implements DataStoreConnector {

    private final String JDBC_DRIVER = Props.getProp("api.db.jdbc.driver");
    private final String DB_NAME = Props.getProp("api.db.name");
    private final String DB_URL = Props.getProp("api.db.url.base") + DB_NAME;

    private final String USR = Props.getProp("api.db.usr.name");
    private final String PWD = Props.getProp("api.db.usr.pwd");


    private final Logger logger = Logger.getLogger(MySQLDataStore.class);

    private Connection connection = null;

    public MySQLDataStore() {
        try {
            Class.forName(JDBC_DRIVER);
        } catch (ClassNotFoundException ex) {
            logger.error(String.format("Error while registering JDBC driver: %s", JDBC_DRIVER));
            ex.printStackTrace();
        }
    }

    /**
     * Checks whether a connection to the database is available.
     *
     * @return true, if there is a connection, false if not
     */
    @Override
    public boolean dataStoreAvailable() {
        return !(null == connection);
    }

    /**
     * Establishes the connection to the MySQL database if there is...
     * 1. no connection available
     * 2. the existing connection is invalid
     * <p>
     * Waits 5 seconds to check for the connection.
     *
     * @return true, if the connection was established successfully, false otherwise
     */
    @Override
    public boolean connect() {
        try {
            // If the connection exists and is valid, return true, otherwise (re)connect.
            if (null != connection && connection.isValid(5)) {
                return true;
            }

            // Print some control outputs
            if (null == connection) {
                logger.info("Connect to database for the first time.");
            } else {
                logger.info("DB-connection not valid anymore. Reconnecting.");
            }

            connection = DriverManager.getConnection(DB_URL, USR, PWD);
        } catch (SQLException ex) {
            logger.fatal(String.format("Error while trying to establish a connection to %s:", DB_URL));
            ex.printStackTrace();
            return false;
        }
        return true;
    }

    /**
     * Closes the MySQL database connection.
     *
     * @return true, if the connection was closed successfully (or was not open at all), false otherwise.
     */
    @Override
    public boolean disconnect() {
        try {
            if (null != connection) {
                connection.close();
                connection = null;
            }
        } catch (SQLException ex) {
            logger.error("Error while trying to disconnect from the database.");
            ex.printStackTrace();
            return false;
        }
        return true;
    }

    /**
     * Checks if the credentials are in the database and correct.
     * When the database contains more than one user with the specified user name, this method also returns false, since
     * this behavior is highly unwanted. You have to make sure that duplicate user names are not possible during the
     * registration process. Furthermore, does not check for invalid characters (e.g., blanks).
     * Does not check for bad code (e.g., sql injection).
     *
     * @param usr User to check password for
     * @param pwd Password to check
     * @return true, if usr and pwd is equal to the ones in the database, false otherwise.
     */
    @Override
    public boolean checkUserCredentials(String usr, String pwd) {
        connect();

        if (null == usr || null == pwd || usr.isEmpty() || pwd.isEmpty()) {
            logger.error("Error while logging in. Credentials null or empty.");
            return false;
        }
        if (!dataStoreAvailable()) {
            logger.error("Error while logging in. Database not available.");
            return false;
        }

        try {
            String sql = "SELECT name, pwd FROM users WHERE users.name=?";
            PreparedStatement preparedStatement = connection.prepareCall(sql);
            preparedStatement.setString(1, usr);
            ResultSet rs = preparedStatement.executeQuery();
            int result_ctr = 0;
            String u = null, p = null;
            while (rs.next()) {
                u = rs.getString("name");
                p = rs.getString("pwd");
                ++result_ctr;
            }
            if (result_ctr == 0) {
                logger.error(String.format("Error while logging in. '%s' is an unknown user.", usr));
                return false;
            } else if (result_ctr > 1) {
                logger.error(String.format("Error while logging in. Multiple results for user '%s'.", usr));
                return false;
            }

            if (!usr.equals(u)) {
                logger.error(String.format("Discrepancy between user attempting to login ('%s') and database content ('%s').", usr, u));
                return false;
            }

            if (!pwd.equals(p)) {
                logger.error(String.format("Error while logging in. Wrong password for user '%s'", usr));
                return false;
            }
        } catch (SQLException ex) {
            logger.error("Error while retrieving user information from database.");
            return false;
        }
        return true;
    }

    /**
     * Gets the content of a certain table.
     *
     * @param table The table to query.
     * @param usr   The user of which you want to get the table content.
     * @return The rows of the database
     */
    @Override
    public List<Map<String, Object>> getDataSet(String table, String usr) {
        return getDataSet(table, usr, RowFilterConcatenation.AND);
    }

    /**
     * Gets the content of a certain table
     * // TODO: Apply user permissions
     *
     * @param table  The table to query.
     * @param usr    The user of which you want to get the table content.
     * @param concat Defines how the filter elements should get concatenated (AND or OR).
     * @param filter Filter, managing the results (e.g., only results for certain users)
     * @return All the rows present in the table, filtered if selected.
     */
    @Override
    public List<Map<String, Object>> getDataSet(String table, String usr, RowFilterConcatenation concat, RowKeyValuePair... filter) {
        connect();

        boolean user_only = true;
        if (null == usr || usr.isEmpty()) {
            user_only = false;
        }

        if (user_only && !user_exists(usr)) {
            logger.error(String.format("User '%s' does not exist.", usr));
            return null;
        }

        if (!dataset_exists(table)) {
            logger.warn(String.format("Table '%s' does not exist.", table));
            return null;
        }

        try {
            PreparedStatement preparedStatement;
            if (null != filter && filter.length > 0) {
                StringBuilder sqlBuilder = new StringBuilder();
                sqlBuilder.append("SELECT * FROM ").append(table).append(" WHERE ");
                String concat_str = " " + concat.toString() + " ";

                for (int i = 0; i < filter.length; i++) {
                    sqlBuilder.append(filter[i].getColumn_name()).append("= ?");
                    if (i < filter.length - 1) {
                        sqlBuilder.append(concat_str);
                    }
                }

                preparedStatement = connection.prepareStatement(sqlBuilder.toString());
                int counter = 1;
                for (RowKeyValuePair f : filter) {
                    preparedStatement.setObject(counter, f.getColumn_value());
                    ++counter;
                }
            } else {
                String sql = "SELECT * FROM " + table;
                preparedStatement = connection.prepareStatement(sql);
            }

            return resultSetToList(preparedStatement.executeQuery());
        } catch (SQLException ex) {
            logger.error(String.format("Error while querying the table '%s' for user '%s':", table, usr));
            ex.printStackTrace();
        }
        // TODO: Implement users permissions (is he allowed to get the whole table?)
        return null;
    }

    /**
     * Update a table (entry) with new values
     *
     * @param table     The table the changes should get apply.
     * @param newValues The new values.
     * @param concat    Defines how the filter elements should get concatenated (AND or OR).
     * @param filter    Filter, managing the results (e.g., only results for certain users)
     * @return true, if the update was successful, false otherwise
     */
    @Override
    public boolean updateTable(String table, List<RowKeyValuePair> newValues, RowFilterConcatenation concat, RowKeyValuePair... filter) {
        connect();

        if (!dataset_exists(table)) {
            logger.error(String.format("Table '%s' does not exist.", table));
            return false;
        }

        if (null == newValues || newValues.size() == 0) {
            logger.warn(String.format("Nothing to change for table %s. Returning.", table));
            return true;
        }

        try {
            StringBuilder sqlBuilder = new StringBuilder();
            sqlBuilder.append("UPDATE ").append(table).append(" SET ");
            for (int i = 0; i < newValues.size(); i++) {
                sqlBuilder.append(newValues.get(i).getColumn_name()).append("= ?");
                if (i < filter.length - 1) {
                    sqlBuilder.append(",");
                }
            }

            if (null != filter && filter.length > 0) {
                sqlBuilder.append(" WHERE ");
                String concat_str = " " + concat.toString() + " ";

                for (int i = 0; i < filter.length; i++) {
                    sqlBuilder.append(filter[0].getColumn_name()).append("= ?");
                    if (i < filter.length - 1) {
                        sqlBuilder.append(concat_str);
                    }
                }
            }
            PreparedStatement preparedStatement = connection.prepareStatement(sqlBuilder.toString());
            int counter = 1;
            for (RowKeyValuePair newValue : newValues) {
                preparedStatement.setObject(counter, newValue.getColumn_value());
                counter++;
            }

            if (null != filter && filter.length > 0) {
                for (RowKeyValuePair aFilter : filter) {
                    preparedStatement.setObject(counter, aFilter.getColumn_value());
                    counter++;
                }
            }

            return !preparedStatement.execute();
        } catch (SQLException ex) {
            logger.error(String.format("Error while querying the table '%s'", table));
        }
        return true;
    }

    /**
     * Inserts the list of values to the table.
     *
     * @param table  The table to insert all values into.
     * @param values The values to insert.
     * @return true if there successfully inserted, false otherwise.
     */
    @Override
    public boolean insertToTable(String table, RowKeyValuePair... values) {
        connect();

        if (!dataset_exists(table)) {
            logger.error(String.format("Table '%s' does not exist.", table));
            return false;
        }

        if (null == values || values.length == 0) {
            logger.warn(String.format("Nothing to insert for table %s. Returning.", table));
            return true;
        }

        try {
            StringBuilder stringBuilder = new StringBuilder();
            stringBuilder.append("INSERT INTO ").append(table).append(" (");
            for (int i = 0; i < values.length; i++) {
                stringBuilder.append(values[i].getColumn_name());
                if (i < values.length - 1) {
                    stringBuilder.append(", ");
                }
            }
            stringBuilder.append(")");
            stringBuilder.append(" VALUE (");
            for (int i = 0; i < values.length; i++) {
                stringBuilder.append("? ");
                if (i < values.length - 1) {
                    stringBuilder.append(", ");
                }
            }
            stringBuilder.append(")");
            PreparedStatement preparedStatement = connection.prepareStatement(stringBuilder.toString());
            for (int i = 0; i < values.length; i++) {
                preparedStatement.setObject(i + 1, values[i].getColumn_value());
            }

            return !preparedStatement.execute();
        } catch (SQLException ex) {
            logger.error(String.format("Error while inserting new line to table '%s':", table));
            ex.printStackTrace();
            return false;
        }
    }

    /**
     * Checks if the user exists.
     *
     * @param usr The user to check
     * @return true, if the user is present in the user table, false otherwise
     */
    @Override
    public boolean user_exists(String usr) {
        connect();

        if (null == usr || usr.isEmpty()) {
            return false;
        }
        int usrCount = 0;
        try {
            String sql = "SELECT count(*) FROM users WHERE name=?";
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setString(1, usr);
            ResultSet rs = preparedStatement.executeQuery();
            if (rs.next()) {
                usrCount = rs.getInt(1);
                if (usrCount > 1) {
                    logger.warn(String.format("%d entries with same user name '%s' in user table.", usrCount, usr));
                }
            }
        } catch (SQLException ex) {
            logger.error(String.format("Error while checking user presence in table for user '%s'", usr));
        }
        return !(usrCount == 0);
    }

    /**
     * Gets the id of the respective user.
     *
     * @param usr The user which id is asked for.
     * @return The user's id or -1 if there is no such user / an error occurred while querying the id.
     */
    @Override
    public int getUserID(String usr) {
        connect();

        if (!user_exists(usr)) {
            return -1;
        }
        try {
            String sql = "SELECT uid FROM users WHERE name=?";
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setString(1, usr);
            ResultSet rs = preparedStatement.executeQuery();
            if (rs.next()) {
                return rs.getInt("uid");
            }
        } catch (SQLException ex) {
            logger.error(String.format("Error while getting id for user '%s'", usr));
        }
        return -1;
    }

    /**
     * Gets the user name to a certain user ID
     *
     * @param id The ID of the user which name is asked for.
     * @return The user name or null if there is no user with such ID / an error occurred while querying the id.
     */
    @Override
    public String getUserName(int id) {
        connect();

        try {
            String sql = "SELECT name FROM users WHERE uid=?";
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setInt(1, id);
            ResultSet rs = preparedStatement.executeQuery();
            if (rs.next()) {
                return rs.getString("name");
            }
        } catch (SQLException ex) {
            logger.error(String.format("Error while getting name for uid '%d'", id));
        }
        return null;
    }

    /**
     * Returns the first ID of the group the user belongs to.
     *
     * @param userName The user name to query
     * @return The respective group ID
     */
    @Override
    public int getUserGroupID(String userName) {
        return getUserGroupID(getUserID(userName));
    }

    /**
     * Returns ALL IDs of the group the user belongs to
     *
     * @param userName The user name to get the `groups` for
     * @return The user's group IDs as an integer list, can be empty.
     */
    @Override
    public ArrayList<Integer> getUserGroupIDs(String userName) {
        return getUserGroupIDs(getUserID(userName));
    }

    /**
     * Returns the first ID of the group the user belongs to.
     *
     * @param userID The user id to query
     * @return The respective group ID
     */
    @Override
    public int getUserGroupID(int userID) {
        connect();

        try {
            String sql = "SELECT gid FROM users_groups WHERE uid=?";
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setInt(1, userID);
            ResultSet rs = preparedStatement.executeQuery();
            if (rs.next()) {
                return rs.getInt("gid");
            }
        } catch (SQLException ex) {
            logger.error(String.format("Error while getting the user group ID of user with id '%s'", userID));
        }
        return -1;
    }

    /**
     * Gets ALL the user group IDs for a specific user
     *
     * @param userID The user id to get the group for
     * @return an array-list of user group IDs, could be empty
     */
    @Override
    public ArrayList<Integer> getUserGroupIDs(int userID) {
        connect();

        try {
            String sql = "SELECT gid FROM users_groups WHERE uid=?";
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setInt(1, userID);
            ResultSet rs = preparedStatement.executeQuery();
            ArrayList<Integer> gids = new ArrayList<>();
            while (rs.next()) {
                gids.add(rs.getInt("gid"));
            }
            return gids;
        } catch (SQLException ex) {
            logger.error(String.format("Error while getting the user group IDs of user with id '%s'", userID));
        }
        return new ArrayList<>();
    }

    /**
     * Checks whether a group exists or not
     *
     * @param group The group to check
     * @return true, if the group exists, false otherwise
     */
    @Override
    public boolean group_exists(String group) {
        connect();

        if (null == group || group.isEmpty()) {
            return false;
        }
        int groupCount = 0;
        try {
            String sql = "SELECT count(*) FROM `groups` WHERE name=?";
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setString(1, group);
            ResultSet rs = preparedStatement.executeQuery();
            if (rs.next()) {
                groupCount = rs.getInt(1);
                if (groupCount > 1) {
                    logger.warn(String.format("Warning: %d entries with same group name '%s' in group table.", groupCount, group));
                }
            }
        } catch (SQLException ex) {
            logger.error(String.format("Error while checking group  presence in table for group '%s'", group));
        }
        return !(groupCount == 0);
    }

    /**
     * Gets the group id by its name
     *
     * @param group The `groups` name to look for
     * @return The respective group's id
     */
    @Override
    public int getGroupID(String group) {
        connect();

        if (!group_exists(group)) {
            return -1;
        }
        try {
            String sql = "SELECT gid FROM `groups` WHERE name=?";
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setString(1, group);
            ResultSet rs = preparedStatement.executeQuery();
            if (rs.next()) {
                return rs.getInt("gid");
            }
        } catch (SQLException ex) {
            logger.error(String.format("Error while getting id for group '%s'", group));
        }
        return -1;
    }

    /**
     * Gets the group name by its respective group id.
     *
     * @param groupID The id to look for
     * @return The group's name
     */
    @Override
    public String getGroupName(int groupID) {
        connect();

        try {
            String sql = "SELECT name FROM `groups` WHERE gid=?";
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setInt(1, groupID);
            ResultSet rs = preparedStatement.executeQuery();
            if (rs.next()) {
                return rs.getString("name");
            }
        } catch (SQLException ex) {
            logger.error(String.format("Error while getting name for gid '%d'", groupID));
        }
        return null;
    }

    /**
     * Returns the basic group names (default: none, game_td_points, game_custom_jokes, design_task)
     *
     * @return the group names as an array
     */
    @Override
    public String[] getBasicGroupNames() {
        connect();

        try {
            String sql = "SELECT name FROM `groups` WHERE basic=1";
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            ResultSet rs = preparedStatement.executeQuery();
            ArrayList<String> names = new ArrayList<>();
            while (rs.next()) {
                names.add(rs.getString("name"));
            }
            return names.toArray(new String[0]);
        } catch (SQLException ex) {
            logger.error("Error while getting the basic group names");
        }
        return null;
    }

    /**
     * Creates a new user.
     * User name and password is assumed to be neither null nor empty!
     * Also created additional table entries for the basic `groups` (none, design_task, ...)
     *
     * @param name       The name of the new user
     * @param pwd        The password of the new user
     * @param group_name The (basic) group assignment for the new user
     */
    @Override
    public boolean createUser(String name, String pwd, String email, String group_name) {
        connect();

        if (user_exists(name)) {
            throw new API_IllegalArgumentException(String.format("Username '%s' already in use!", name));
        }
        if (!group_exists(group_name)) {
            throw new API_IllegalArgumentException(String.format("Group name '%s' does not exist", group_name));
        }

        if (null == email) {
            email = "";
        }

        // Create new user and add respective group assignment.
        insertToTable("users", new RowKeyValuePair("name", name), new RowKeyValuePair("pwd", pwd), new RowKeyValuePair("mail", email));
        int userID = getUserID(name);
        int groupID = getGroupID(group_name);
        insertToTable("users_groups", new RowKeyValuePair("uid", userID), new RowKeyValuePair("gid", groupID));

        // Create additional table entries, depending on the group_name
        if ("game_td_points".equals(group_name)) {
            insertToTable("game_td_points",
                    new RowKeyValuePair("uid", userID),
                    new RowKeyValuePair("points", 0),
                    new RowKeyValuePair("points_incr", 100),
                    new RowKeyValuePair("representation", "points"),
                    new RowKeyValuePair("visible_for_others", 0));
        }

        return true;
    }

    /**
     * Checks whether the table exists or not
     *
     * @param table The table to check
     * @return true if the table exist, false otherwise
     */
    @Override
    public boolean dataset_exists(String table) {
        return null != table && !table.isEmpty() && dataSet_list().contains(table);
    }

    /**
     * Queries all available tables.
     *
     * @return All tables present in the connected database or null, if there was an error.
     */
    @Override
    public List<String> dataSet_list() {
        connect();

        List<String> table_names = null;
        try {
            String sql = "SELECT table_name FROM information_schema.tables WHERE table_schema=?";
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setString(1, DB_NAME);
            ResultSet rs = preparedStatement.executeQuery();
            table_names = new ArrayList<>();
            while (rs.next()) {
                table_names.add(rs.getString("table_name"));
            }
        } catch (SQLException ex) {
            logger.error("Error while getting the list of all available tables.");
            ex.printStackTrace();
        }
        return table_names;
    }

    /**
     * Gets a (freshly) (randomized) image for the user with the specified ID.
     * Firstly, checks if there is a in_work image to return.
     * If not, gets a new (not yet used) BASIC image.
     * If no BASIC image left, gets a new ADDITIONAL image.
     * If no ADDITIONAL image left, returns null.
     * If the image is gonna to be resend, the path will be RESEND such that the client cannot display the image twice.
     * <p>
     * This method also updates the starting time of the image depending on whether it's a RESEND or not.
     *
     * @param userID The respective user's id.
     * @return the image name incl. path on filesystem.
     */
    @Override
    public synchronized ImageFile getImage(int userID) {
        connect();

        String resourcePath = Props.getProp("api.img.path");
        String name = getUserName(userID);

        if (!user_exists(getUserName(userID))) {
            throw new API_IllegalArgumentException(String.format("Error while getting image: User '%s' does not exist!", name));
        }

        // At first, check if there is an unfinished task. If yes, just return this.
        try {
            String sql = "SELECT images.name, it.start_time FROM images INNER JOIN image_log it ON images.iid = it.iid WHERE uid=? AND in_work=1";
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setInt(1, userID);

            ResultSet rs = preparedStatement.executeQuery();
            // If this is true, there is an image in work
            if (rs.next()) {
                String image_name = rs.getString("images.name");
                Timestamp last_accessed = rs.getTimestamp("it.start_time");
                boolean resend =
                        (System.currentTimeMillis() - last_accessed.getTime())
                                >= (Long.parseLong(Props.getProp("api.img.duration")) * 1000);
                if (resend) {
                    String updateTime = "UPDATE image_log SET start_time=DATE_ADD(NOW(), INTERVAL 5 SECOND) WHERE uid=? AND in_work=1";
                    PreparedStatement ps = connection.prepareStatement(updateTime);
                    ps.setInt(1, userID);
                    ps.execute();
                    return new ImageFile(resourcePath + image_name);
                } else {
                    String updateTime = "UPDATE image_log SET start_time=NOW() WHERE uid=? AND in_work=1";
                    PreparedStatement ps = connection.prepareStatement(updateTime);
                    ps.setInt(1, userID);
                    ps.execute();
                    ImageFile imgFile = new ImageFile("RESEND");
                    imgFile.setImageFileName(image_name);
                    return imgFile;
                }
            }
        } catch (SQLException ex) {
            logger.error("Error while trying to find and return an unfinished image.");
            ex.printStackTrace();
            return null;
        }

        // If getting here, there was no image in work to send back --> get a new BASIC one and set it to 'in_work'
        try {
            String sql_getBasicImage = "" +
                    "SELECT random_basic_image.name\n" +
                    "FROM (\n" +
                    "       SELECT images.name\n" +
                    "       FROM images\n" +
                    "         INNER JOIN\n" +
                    "         (\n" +
                    "           SELECT iid\n" +
                    "           FROM images\n" +
                    "           WHERE iid NOT IN (SELECT iid\n" +
                    "                             FROM image_log\n" +
                    "                             WHERE uid=?)\n" +
                    "                 AND basic_image = 1\n" +
                    "         ) AS basic_images\n" +
                    "       WHERE images.iid = basic_images.iid\n" +
                    "     ) AS random_basic_image\n" +
                    "ORDER BY RAND()\n" +
                    "LIMIT 1";
            PreparedStatement preparedStatement = connection.prepareStatement(sql_getBasicImage);
            preparedStatement.setInt(1, userID);
            ResultSet rs = preparedStatement.executeQuery();
            // If this is true, there is a basic image left to tag
            if (rs.next()) {
                String image_name = rs.getString("random_basic_image.name");

                // Insert respective values to image tags
                setImageTo_inWork(image_name, userID);
                return new ImageFile(resourcePath + image_name);
            }
        } catch (SQLException e) {
            logger.error("Error while trying to find and return a new basic image.");
            e.printStackTrace();
        }

        // If getting here, there is no image in work and no basic image left --> get a new ADDITIONAL one.
        try {
            String sql_getBasicImage = "" +
                    "SELECT random_regular_image.name\n" +
                    "FROM (\n" +
                    "       SELECT images.name, extra_round_counter\n" +
                    "       FROM images\n" +
                    "         INNER JOIN\n" +
                    "         (\n" +
                    "           SELECT iid\n" +
                    "           FROM images\n" +
                    "           WHERE iid NOT IN (SELECT iid\n" +
                    "                             FROM image_log\n" +
                    "                             WHERE uid=?)\n" +
                    "                 AND basic_image=0\n" +
                    "                 AND name NOT LIKE 'TUTORIAL%'" +
                    "         ) AS basic_images\n" +
                    "       WHERE images.iid = basic_images.iid\n" +
                    "     ) AS random_regular_image\n" +
                    "ORDER BY extra_round_counter ASC, RAND()\n" +
                    "LIMIT 1";
            PreparedStatement preparedStatement = connection.prepareStatement(sql_getBasicImage);
            preparedStatement.setInt(1, userID);
            ResultSet rs = preparedStatement.executeQuery();
            // If this is true, there is a basic image left to tag
            if (rs.next()) {
                String image_name = rs.getString("random_regular_image.name");
                setImageTo_inWork(image_name, userID);
                return new ImageFile(resourcePath + image_name);
            }
        } catch (SQLException e) {
            logger.error("Error while trying to find and return a new basic image.");
            e.printStackTrace();
        }
        return null; // No image left
    }

    /**
     * Gets all images the user has solved except the one in the filter
     *
     * @param userID The user id to get the images for
     * @param filter The images NOT to retrieve
     * @return the images as ImageFiles
     */
    @Override
    public List<ImageFile> getAllImages(int userID, String[] filter) {
        connect();

        String resourcePath = Props.getProp("api.img.path");
        String name = getUserName(userID);

        if (!user_exists(getUserName(userID))) {
            throw new API_IllegalArgumentException(String.format("Error while getting image: User '%s' does not exist!", name));
        }

        try {
            String sql_getBasicImage = "" +
                    "SELECT name\n" +
                    "FROM images\n" +
                    "  INNER JOIN image_log ON images.iid = image_log.iid\n" +
                    "WHERE uid=?\n" +
                    "AND name NOT LIKE 'TUTORIAL%'";
            PreparedStatement preparedStatement = connection.prepareStatement(sql_getBasicImage);
            preparedStatement.setInt(1, userID);
            ResultSet rs = preparedStatement.executeQuery();
            List<String> filterList = Arrays.asList(filter);
            ArrayList<ImageFile> images = new ArrayList<>();
            // If this is true, there is a basic image left to tag
            while (rs.next()) {
                String image_name = rs.getString("name");
                if (!filterList.contains(image_name)) {
                    images.add(new ImageFile(resourcePath + image_name));
                }
            }
            return images;
        } catch (SQLException e) {
            throw new API_IllegalArgumentException(String.format("Error while getting all images for user '%s'.", name));
        }
    }

    /**
     * Appends the specified tags to the respective image for the specified user
     *
     * @param userID     The user to set the image for.
     * @param image_name The respective image name.
     * @param tags       The tags to set.
     * @return true if the update did not throw an error, false otherwise.
     */
    @Override
    public boolean updateImage(int userID, String image_name, String tags) {
        connect();

        String username = getUserName(userID);
        try {
            // Insert the tags
            insertImageTags(userID, image_name, tags);

            String sql = "" +
                    "UPDATE image_log\n" +
                    "SET end_time = NOW(), in_work = 0\n" +
                    "WHERE uid = ? AND iid = (\n" +
                    "  SELECT iid\n" +
                    "  FROM images\n" +
                    "  WHERE name = ?\n" +
                    ") AND in_work = 1";
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setInt(1, userID);
            preparedStatement.setString(2, image_name);
            return preparedStatement.executeUpdate() == 1;
        } catch (SQLException ex) {
            logger.error(String.format("Error while updating 'image_log' for user '%s' (ID: %d) with tags '%s'", username, userID, tags));
            return false;
        }
    }

    /**
     * Appends the specified tags to the respective image for the specified user
     *
     * @param userID     The user id to insert the tutorial image for
     * @param image_name The image name of the tutorial image
     * @param tags       The tags to store for the image
     */
    @Override
    public void insertTutorialImage(int userID, String image_name, String tags) {
        connect();

        String username = getUserName(userID);
        try {
            // Insert the tags
            insertImageTags(userID, image_name, tags);

            String sql = "" +
                    "INSERT INTO image_log (uid, iid, start_time, end_time, in_work) " +
                    "VALUE (?, (SELECT iid FROM images WHERE name = ?), NOW(), NOW(), 0)";
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setInt(1, userID);
            preparedStatement.setString(2, image_name);
            preparedStatement.execute();
        } catch (SQLException ex) {
            logger.error(String.format("Error while updating 'image_log' for user '%s' (ID: %d) with tags '%s' for the TUTORIAL image %s", username, userID, tags, image_name));
        }
    }

    /**
     * This method inserts the tags into the tag store. NULL tags get ignored
     *
     * @param userID     The user ID to enter the image for
     * @param image_name The image name
     * @param tags       The tags to enter
     * @throws SQLException when an exception within the database connection occurs
     */
    private void insertImageTags(int userID, String image_name, String tags) throws SQLException {
        // no connect needed,
        if (null == tags) {
            return;
        }

        String[] tag_array = tags.split(",");
        String sql = "" +
                "INSERT INTO image_tags (uid, iid, tag) " +
                "VALUE (?, (SELECT iid FROM images WHERE name=?), ?)";
        PreparedStatement preparedStatement = connection.prepareStatement(sql);
        for (int i = 0; i < tag_array.length; i++) {
            String tag = tag_array[i];
            preparedStatement.setInt(1, userID);
            preparedStatement.setString(2, image_name);
            preparedStatement.setString(3, tag);
            preparedStatement.addBatch();

            // Execute at maximum a batch of 500 image tags
            if ((i > 0 && i % 500 == 0) || i == tag_array.length - 1) {
                preparedStatement.executeBatch();
            }
        }
    }

    /**
     * Sets a certain image to in_work, preventing the API in returning other images.
     * Besides that, sets the start_time to the current time.
     *
     * @param image_name the image to set to in_work.
     * @param userID     the user to set the image for to in_work.
     * @throws SQLException when an error in the sql statement or execution arose.
     */
    private void setImageTo_inWork(String image_name, int userID) throws SQLException {
        connect();

        String sql_insert = "" +
                "INSERT INTO image_log (uid, iid, start_time, in_work)\n" +
                "  VALUE (?,\n" +
                "         (SELECT iid\n" +
                "          FROM images\n" +
                "          WHERE images.name=?),\n" +
                "  NOW(), 1)";
        PreparedStatement insertStatement = connection.prepareStatement(sql_insert);
        insertStatement.setInt(1, userID);
        insertStatement.setString(2, image_name);
        insertStatement.execute();
    }

    /**
     * Checks if the specified user has basic images left to work.
     *
     * @param userID The user to check
     * @return 0 if there is no image left and the respective number of images if there are images left.
     * -1 if there was an error or all basic images were tagged
     */
    @Override
    public int basicImagesLeft(int userID) {
        connect();

        String name = getUserName(userID);
        if (!user_exists(getUserName(userID))) {
            throw new API_IllegalArgumentException(String.format("Error while checking for basic images left: User '%s' does not exist!", name));
        }

        try {
            String sql_getBasicImage = "" +
                    "SELECT count(*) AS num\n" +
                    "FROM (\n" +
                    "       SELECT images.name\n" +
                    "       FROM images\n" +
                    "         INNER JOIN\n" +
                    "         (\n" +
                    "           SELECT iid\n" +
                    "           FROM images\n" +
                    "           WHERE iid NOT IN (SELECT iid\n" +
                    "                             FROM image_log\n" +
                    "                             WHERE uid=? AND in_work=0)\n" +
                    "                 AND basic_image = 1\n" +
                    "         ) AS basic_images\n" +
                    "       WHERE images.iid = basic_images.iid\n" +
                    "     ) AS random_basic_image";
            PreparedStatement preparedStatement = connection.prepareStatement(sql_getBasicImage);
            preparedStatement.setInt(1, userID);
            ResultSet rs = preparedStatement.executeQuery();
            if (rs.next() && rs.getInt("num") >= 0) {
                return rs.getInt("num");
            }
        } catch (SQLException ex) {
            logger.error("Error while checking if there are basic images left.");
            ex.printStackTrace();
        }
        return -1;
    }

    /**
     * Gets the trigger commands of a trigger case, defined in the database
     *
     * @param groupIDs     The group IDs to look for trigger commands
     * @param trigger_case The type of the message received that caused to trigger this
     * @return the commands to trigger
     */
    @Override
    public String[] getTriggerCommands(ArrayList<Integer> groupIDs, String trigger_case) {
        connect();

        if (null == groupIDs || groupIDs.size() == 0) {
            return new String[0];
        }

        try {
            List<String> cmds = new ArrayList<>();
            StringBuilder sb = new StringBuilder();
            sb.append("SELECT command, trigger_cmds FROM users_groups_commands WHERE gid=?");
            for (int i = 1; i < groupIDs.size(); i++) {
                sb.append(" OR gid=?");
            }
            PreparedStatement preparedStatement = connection.prepareStatement(sb.toString());
            for (int i = 0; i < groupIDs.size(); i++) {
                preparedStatement.setInt(i + 1, groupIDs.get(i));
            }
            ResultSet rs = preparedStatement.executeQuery();
            while (rs.next()) {
                String trigger_cmds = rs.getString("trigger_cmds");
                if (trigger_cmds != null && trigger_cmds.contains(trigger_case)) {
                    cmds.add(rs.getString("command"));
                }
            }
            return cmds.toArray(new String[0]);
        } catch (SQLException ex) {
            logger.error("Error while getting the trigger commands");
        }
        return new String[]{};
    }

    /**
     * Executes customized commands and returns the result as a CommandExecutionReturn
     *
     * @param command The command to execute
     * @param args    The arguments for the command. The first element MUST be present and the user id
     * @return The result set as a CommandExecutionReturn or null, if the statement could not get executed or it was no query.
     */
    @Override
    public CommandExecutionReturn executeCommand(String command, Object[] args) {
        connect();

        try {
            // Get the respective statement and immediately return when its null, i.e., there is no such command
            String sql = getSqlStatementByCommand(command, (int) args[0]);
            if (null == sql) {
                return null;
            }

            // Replace possible key words with its respective value.
            int uid = (int) args[0];
            if (sql.contains("%UID%")) {
                sql = sql.replaceAll("%UID%", Integer.toString((int) args[0]));
            }
            if (sql.contains("%UNAME%")) {
                String name = getUserName(uid);
                sql = sql.replaceAll("%UNAME%", "'" + name + "'");
            }

            // Execute for each user's group
            ArrayList<Integer> gids = getUserGroupIDs(uid);
            if (sql.contains("%GID%")) {
                if (null == gids || gids.size() == 0) {
                    throw new API_IllegalArgumentException(
                            String.format("User %s is not in a group but the command command REQUIRES a GUID.", uid));
                }
                for (int gid : gids) {
                    String temp = sql.replaceAll("%GID%", Integer.toString(gid));
                    PreparedStatement preparedStatement = connection.prepareStatement(temp);
                    for (int i = 1; i < args.length; i++) {
                        String arg = (String) args[i];
                        preparedStatement.setString(i, arg);
                    }
                    // TODO: RETURN the values! This one currently only executes the query
                    preparedStatement.execute();
                }
            } else {
                PreparedStatement preparedStatement = connection.prepareStatement(sql);
                for (int i = 1; i < args.length; i++) {
                    String arg = (String) args[i];
                    preparedStatement.setString(i, arg);
                }

                // run the statement and return its result.
                if (preparedStatement.execute()) {
                    return new CommandExecutionReturn(preparedStatement.getResultSet());
                }
            }
        } catch (SQLException ex) {
            logger.error(String.format("Error while executing '%s' command", command));
            ex.printStackTrace();
        }
        return null;
    }

    /**
     * Gets the respective sql statement from the database.
     * <b>NOTE:</b> Returns only the first occurrence of the command. So, if the user is in multiple `groups` with the
     * same command, only the first finding gets returned. Therefore, it is required that the user knows what he/she does.
     *
     * @param command The command to lookup in the database.
     * @param userID  Used to check if the user's group is allowed to run this command
     * @return The sql statement as a String, null if there is no such command or the user (group) is not allowed to execute
     * @throws SQLException when there was an error while retrieving the sql statement.
     */
    private String getSqlStatementByCommand(String command, int userID) throws SQLException {
        connect();

        StringBuilder sb = new StringBuilder();
        sb.append("SELECT sql_command FROM users_groups_commands WHERE command=?");
        ArrayList<Integer> gids = getUserGroupIDs(userID);
        if (null == gids || gids.size() == 0) {
            throw new API_IllegalArgumentException(
                    String.format("User %s is not in a group, but getting sql statement by command requires a group!", userID));
        }
        Iterator<Integer> gids_iter = gids.iterator();
        sb.append(" AND (");
        while (gids_iter.hasNext()) {
            int gid = gids_iter.next();
            sb.append(String.format("gid=%s", gid));
            if (gids_iter.hasNext()) {
                sb.append(" OR ");
            }
        }
        sb.append(")");
        PreparedStatement preparedStatement = connection.prepareStatement(sb.toString());
        preparedStatement.setString(1, command);
        ResultSet rs = preparedStatement.executeQuery();
        if (rs.next()) {
            return rs.getString("sql_command");
        }
        return null;
    }

    /**
     * Convert the ResultSet to a List of Maps, where each Map represents a row with column names and column values
     *
     * @param rs The result set to convert
     * @return The list of maps
     * @throws SQLException when there was an problem while transforming the result set.
     */
    private List<Map<String, Object>> resultSetToList(ResultSet rs) throws SQLException {
        connect();

        ResultSetMetaData md = rs.getMetaData();
        int columns = md.getColumnCount();
        List<Map<String, Object>> rows = new ArrayList<>();
        while (rs.next()) {
            Map<String, Object> row = new HashMap<>(columns);
            for (int i = 1; i <= columns; ++i) {
                row.put(md.getColumnName(i), rs.getObject(i));
            }
            rows.add(row);
        }
        return rows;
    }

    /**
     * Gets a certain questionnaire for a certain user:
     * 1. Check if already finished
     * 2. Get the respective questionnaire
     *
     * @param userID The user ID to get the questionnaire for
     * @param name   The name of the questionnaire
     * @return The questionnaire as JSON string, "FINISHED" if the questionnaire already was finished
     * (i.e., there was a POST for this user and questionnaire), null if no such questionnaire exists
     */
    @Override
    public String getQuestionnaire(int userID, String name) {
        connect();

        if (questionnaireAlreadyFinished(userID, name)) {
            return "FINISHED";
        }

        try {
            String questionnaire = "" +
                    "SELECT json_quest\n" +
                    "FROM questionnaires\n" +
                    "WHERE quest_name=?";
            PreparedStatement preparedStatement = connection.prepareStatement(questionnaire);
            preparedStatement.setString(1, name);
            ResultSet rs = preparedStatement.executeQuery();
            if (rs.next()) {
                return rs.getString("json_quest");
            }
        } catch (SQLException ex) {
            logger.error(String.format("Error while getting a certain questionnaire (%s) for user %s", userID, name));
            ex.printStackTrace();
        }
        return null;
    }

    /**
     * Checks whether the respective questionnaire is already finished by the user
     *
     * @param userID The user ID to check for
     * @param name   The questionnaire name to check for
     * @return true if the questionnaire was finished by the user, false otherwise
     */
    public boolean questionnaireAlreadyFinished(int userID, String name) {
        connect();

        try {
            String already_finished = "" +
                    "SELECT\n" +
                    "  count(*) AS num\n" +
                    "FROM questionnaires\n" +
                    "  INNER JOIN questionnaires_users u ON questionnaires.qid = u.qid\n" +
                    "WHERE quest_name=? AND uid=?";
            PreparedStatement preparedStatement = connection.prepareStatement(already_finished);
            preparedStatement.setString(1, name);
            preparedStatement.setInt(2, userID);
            ResultSet rs = preparedStatement.executeQuery();
            if (rs.next() && rs.getInt("num") > 0) {
                return true;
            }
        } catch (SQLException ex) {
            logger.error(String.format("Error while checking if a certain questionnaire (%s) is finished for user %s.", name, userID));
            ex.printStackTrace();
        }
        return false;
    }

    /**
     * Sets the result of a certain questionnaire for a certain user
     *
     * @param userID The user ID to set the result for
     * @param name   The name of the questionnaire
     * @param result The result to store in the database
     * @return true, if the questionnaire was stored successfully, false otherwise
     */
    @Override
    public boolean setQuestionnaire(int userID, String name, String result) {
        connect();

        int quest_id = getQuestionnaireID(name);
        if (quest_id == -1) {
            return false;
        }
        try {
            String update = "" +
                    "INSERT INTO questionnaires_users (qid, uid, json_answer, submit_time)" +
                    "VALUE (?,?,?, NOW())";
            PreparedStatement preparedStatement = connection.prepareStatement(update);
            preparedStatement.setInt(1, quest_id);
            preparedStatement.setInt(2, userID);
            preparedStatement.setString(3, result);
            return !preparedStatement.execute();
        } catch (SQLException ex) {
            logger.error(String.format("Error while inserting questionnaire (%s) answer into database for user %s.)", name, userID));
            ex.printStackTrace();
        }
        return false;
    }

    /**
     * Increments the user login counter by 1.
     *
     * @param userID The user id to increment the
     */
    @Override
    public void incrementUserLoginCounter(int userID) {
        connect();

        try {
            String update = "UPDATE users SET login_ctr=login_ctr+1 WHERE uid=?";
            PreparedStatement preparedStatement = connection.prepareStatement(update);
            preparedStatement.setInt(1, userID);
            preparedStatement.execute();
        } catch (SQLException ex) {
            logger.error(String.format("Error while incrementing the user's (id: %s) LOGIN counter", userID));
            ex.printStackTrace();
        }
    }

    /**
     * Gets the ID (the first if multiple of the same name are present) to a questionnaire's name
     *
     * @param name The name to search the ID for
     * @return The (first) ID of the questionnaire with the respective name
     */
    private int getQuestionnaireID(String name) {
        connect();

        try {
            String quest_id = "" +
                    "SELECT qid\n" +
                    "FROM questionnaires\n" +
                    "WHERE quest_name=?";
            PreparedStatement preparedStatement = connection.prepareStatement(quest_id);
            preparedStatement.setString(1, name);
            ResultSet rs = preparedStatement.executeQuery();
            if (null != rs && rs.next()) {
                return rs.getInt("qid");
            }
        } catch (SQLException ex) {
            logger.error(String.format("Error while getting a questionnaire's (%s) ID by name.", name));
            ex.printStackTrace();
        }
        return -1;
    }

    /**
     * Gets the user group identifier (not the ID, but the small -textual- identifier)
     *
     * @param groupID The group id to get the identifier for
     * @return The identifier of the respective group
     */
    @Override
    public String getGroupIdentifier(int groupID) {
        connect();

        try {
            String quest_id = "" +
                    "SELECT id\n" +
                    "FROM `groups`\n" +
                    "WHERE gid=?";
            PreparedStatement preparedStatement = connection.prepareStatement(quest_id);
            preparedStatement.setInt(1, groupID);
            ResultSet rs = preparedStatement.executeQuery();
            if (null != rs && rs.next()) {
                return rs.getString("id");
            }
        } catch (SQLException ex) {
            logger.error(String.format("Error while getting a group's (%s) identifier bys group id.", groupID));
            ex.printStackTrace();
        }
        return null;
    }

    /**
     * Gets the finished questionnaires for a specific user
     *
     * @param userID The user id to check for
     * @return A comma-separated string containing the questionnaires already finished
     */
    @Override
    public String[] getFinishedQuestionnaires(int userID) {
        connect();
        try {
            String quest_id = "" +
                    "SELECT quest_name\n" +
                    "FROM questionnaires\n" +
                    "  INNER JOIN questionnaires_users u ON questionnaires.qid = u.qid\n" +
                    "WHERE uid=?";
            PreparedStatement preparedStatement = connection.prepareStatement(quest_id);
            preparedStatement.setInt(1, userID);
            List<String> quests = new ArrayList<>();
            ResultSet rs = preparedStatement.executeQuery();
            while (rs.next()) {
                String quest = rs.getString("quest_name");
                if (quest != null) {
                    quests.add(quest);
                }
            }
            return quests.toArray(new String[0]);
        } catch (SQLException ex) {
            logger.error(String.format("Error while getting a group's (%s) identifier bys group id.", userID));
            ex.printStackTrace();
        }
        return new String[]{};
    }

    /**
     * Get the number of finished users for a certain group:
     *
     * @param group The group to get the number of finished questionnaires for
     * @return The number of users that finished the study (i.e., submitted the final questionnaire),
     * -1 if there was anything of an error
     * @since v1.3
     */
    @Override
    public int getNumOfFinishedUsers(String group) {
        connect();

        String quest_name = group.equals("design_task") ? "design" : "end_normal";
        try {
            String quest_id = "" +
                    "SELECT count(*) AS num\n" +
                    "FROM users_groups\n" +
                    "  INNER JOIN questionnaires_users ON users_groups.uid = questionnaires_users.uid\n" +
                    "WHERE gid = (SELECT gid\n" +
                    "  FROM `groups`\n" +
                    "  WHERE name = ?)\n" +
                    " AND qid = (SELECT qid\n" +
                    "  FROM questionnaires\n" +
                    "  WHERE quest_name = ?)";
            PreparedStatement preparedStatement = connection.prepareStatement(quest_id);
            preparedStatement.setString(1, group);
            preparedStatement.setString(2, quest_name);
            ResultSet rs = preparedStatement.executeQuery();
            if (rs.next()) {
                return rs.getInt("num");
            }
        } catch (SQLException ex) {
            logger.error(String.format("Error while getting a group's (%s) number of finished users.", group));
            ex.printStackTrace();
        }
        return -1;
    }
}

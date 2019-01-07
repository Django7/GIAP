//import com.dextreem.gms.Constants;
//import com.dextreem.gms.db.*;
//import org.junit.After;
//import org.junit.Before;
//import org.junit.Test;
//
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Map;
//import java.util.Random;
//
//import static com.dextreem.gms.helper.HelperMethods.getSaltString;
//import static org.junit.Assert.*;
//
///**
// * This class tests the data store connector.
// * Exemplary, here we use the MySQLDataStore. If you implemented another connector, you simply have to adapt 'initDB()'
// * in order to test your own implementation.
// */
//public class DataStoreConnector_Test {
//    private DataStoreConnector dsc;
//
//    @Before
//    public void initDB() {
//        dsc = new MySQLDataStore();
//        Constants.IN_JUNIT_TEST_MODE = true;
//    }
//
//
//    @After
//    public void closeDBConnection() {
//        dsc.disconnect();
//        dsc = null;
//    }
//
//    /* -------------------- General Database connection operations ------------------ */
//    @Test
//    public void databaseConnectAndDisconnect() {
//        assertFalse(dsc.dataStoreAvailable());
//        dsc.connect();
//        assertTrue(dsc.dataStoreAvailable());
//        dsc.disconnect();
//        assertFalse(dsc.dataStoreAvailable());
//    }
//
//    @Test
//    public void databaseDisconnectWithoutConnection() {
//        assertFalse(dsc.dataStoreAvailable());
//        dsc.disconnect();
//        assertFalse(dsc.dataStoreAvailable());
//    }
//
//    @Test
//    public void databaseUserPresent() {
//        dsc.connect();
//        assertTrue(dsc.user_exists("user_name"));
//        assertFalse(dsc.user_exists("non_existing_user"));
//        assertFalse(dsc.user_exists(""));
//        assertFalse(dsc.user_exists(null));
//    }
//
//    @Test
//    public void databaseTablePresent() {
//        dsc.connect();
//        assertTrue(dsc.dataset_exists("users"));
//        assertFalse(dsc.dataset_exists("non_existing_table"));
//        assertFalse(dsc.dataset_exists(""));
//        assertFalse(dsc.dataset_exists(null));
//    }
//
//    @Test
//    public void databaseGetAllTables() {
//        dsc.connect();
//        List<String> tables = dsc.dataSet_list();
//        assertTrue(tables.contains("game_custom_jokes"));
//        assertTrue(tables.contains("game_td_points"));
//        assertTrue(tables.contains("groups"));
//        assertTrue(tables.contains("image_log"));
//        assertTrue(tables.contains("images"));
//        assertTrue(tables.contains("users"));
//        assertTrue(tables.contains("users_game_custom_jokes"));
//        assertTrue(tables.contains("users_groups"));
//    }
//
//    @Test
//    public void databaseUserNameIdConverter() {
//        dsc.connect();
//        int id = 1; // = user_name
//        String name = "peter"; // = 4
//
//        assertEquals("user_name", dsc.getUserName(id));
//        assertEquals(id, dsc.getUserID(dsc.getUserName(id)));
//
//        assertEquals(4, dsc.getUserID(name));
//        assertEquals(name, dsc.getUserName(dsc.getUserID(name)));
//    }
//
//    @Test
//    public void databaseGetTableIntegrity() {
//        dsc.connect();
//        List<Map<String, Object>> table = dsc.getDataSet("groups", "user_name");
//        assertEquals(4, table.size());
//
//        int[] true_ids = {1, 2, 3, 4};
//        String[] true_names = {"none", "game_td_points", "game_custom_jokes", "design_task"};
//
//        for (int i = 0; i < table.size(); i++) {
//            assertEquals(true_ids[i], table.get(i).get("gid"));
//            assertEquals(true_names[i], table.get(i).get("name"));
//        }
//    }
//
//    @Test
//    public void databaseGetTableIntegrityFiltered() {
//        dsc.connect();
//        List<Map<String, Object>> filtered_table = dsc.getDataSet("groups", "user_name", RowFilterConcatenation.AND, new RowKeyValuePair("gid", 2));
//        assertEquals(1, filtered_table.size());
//        assertEquals(2, filtered_table.get(0).get("gid"));
//        assertEquals("game_td_points", filtered_table.get(0).get("name"));
//
//        filtered_table = dsc.getDataSet("groups", "user_name", RowFilterConcatenation.AND, new RowKeyValuePair("gid", 2), new RowKeyValuePair("gid", 2));
//        assertEquals(1, filtered_table.size());
//        assertEquals(2, filtered_table.get(0).get("gid"));
//        assertEquals("game_td_points", filtered_table.get(0).get("name"));
//
//        filtered_table = dsc.getDataSet("groups", "user_name", RowFilterConcatenation.AND, new RowKeyValuePair("gid", 2), new RowKeyValuePair("gid", 1));
//        assertEquals(0, filtered_table.size());
//
//        filtered_table = dsc.getDataSet("groups", "user_name", RowFilterConcatenation.OR, new RowKeyValuePair("gid", 2), new RowKeyValuePair("gid", 3));
//        assertEquals(2, filtered_table.size());
//        assertEquals(2, filtered_table.get(0).get("gid"));
//        assertEquals("game_td_points", filtered_table.get(0).get("name"));
//        assertEquals(3, filtered_table.get(1).get("gid"));
//        assertEquals("game_custom_jokes", filtered_table.get(1).get("name"));
//
//        filtered_table = dsc.getDataSet("groups", "user_name", RowFilterConcatenation.AND, new RowKeyValuePair("gid", 1337)); // should not exist
//        assertEquals(0, filtered_table.size());
//    }
//
//
//    /* ------------------------- Database Login stuff ------------------------------- */
//
//    @Test
//    public void databaseLogin_correctCredentials() {
//        dsc.connect();
//        assertTrue(dsc.checkUserCredentials("user_name", "safe1"));
//        assertTrue(dsc.checkUserCredentials("max", "safe2"));
//        assertTrue(dsc.checkUserCredentials("pascal", "safe3"));
//        assertTrue(dsc.checkUserCredentials("peter", "safe4"));
//    }
//
//    @Test
//    public void databaseLogin_MultipleIdenticalUserNames() {
//        dsc.connect();
//        assertFalse(dsc.checkUserCredentials("duplicate", "pwd"));
//        assertFalse(dsc.checkUserCredentials("duplicate", "wrong_pwd"));
//    }
//
//    @Test
//    public void databaseLogin_wrongCredentials_name() {
//        dsc.connect();
//        assertFalse(dsc.checkUserCredentials("this_user_should_not_exist", "does_not_matter"));
//    }
//
//    @Test
//    public void databaseLogin_wrongCredentials_pwd() {
//        dsc.connect();
//        assertFalse(dsc.checkUserCredentials("user_name", "wrong_password"));
//    }
//
//    @Test
//    public void databaseLogin_emptyAndNullCredentials() {
//        dsc.connect();
//        assertFalse(dsc.checkUserCredentials("", "some_pwd"));
//        assertFalse(dsc.checkUserCredentials("user_name", ""));
//        assertFalse(dsc.checkUserCredentials("", ""));
//        assertFalse(dsc.checkUserCredentials(null, "some_pwd"));
//        assertFalse(dsc.checkUserCredentials("user_name", null));
//        assertFalse(dsc.checkUserCredentials(null, null));
//    }
//
//    /* ------------------------- Table updates and inserts ------------------------------- */
//
//    @Test
//    public void databaseUpdateTable() {
//        dsc.connect();
//        String newString = getSaltString();
//        List<RowKeyValuePair> changes = new ArrayList<>();
//        changes.add(new RowKeyValuePair("text", newString));
//        assertTrue(dsc.updateTable("change_test_table", changes, RowFilterConcatenation.AND, new RowKeyValuePair("cid", 1)));
//        List<Map<String, Object>> result = dsc.getDataSet("change_test_table", "", RowFilterConcatenation.AND, new RowKeyValuePair("cid", 1));
//        assertEquals(newString, result.get(0).get("text"));
//
//        String newString_2 = getSaltString();
//        List<RowKeyValuePair> changes_2 = new ArrayList<>();
//        changes_2.add(new RowKeyValuePair("text", newString_2));
//        assertFalse(dsc.updateTable("non_existing_table", changes_2, RowFilterConcatenation.AND, new RowKeyValuePair("cid", 1)));
//    }
//
//    @Test
//    public void databaseInsertToTable() {
//        dsc.connect();
//        String newString = getSaltString();
//
//        List<Map<String, Object>> filtered_table = dsc.getDataSet("change_test_table", "user_name", RowFilterConcatenation.AND, new RowKeyValuePair("text", newString));
//        assertEquals(0, filtered_table.size());
//
//        RowKeyValuePair newEntry = new RowKeyValuePair("text", newString);
//        assertTrue(dsc.insertToTable("change_test_table", newEntry));
//
//        filtered_table = dsc.getDataSet("change_test_table", "user_name", RowFilterConcatenation.AND, new RowKeyValuePair("text", newString));
//        assertEquals(1, filtered_table.size());
//
//        assertFalse(dsc.insertToTable("non_existing_table", newEntry));
//
//        // TODO: insert with wrong values and so on
//
//    }
//
//    /* ------------------------- Group / user creation test ------------------------------- */
//
//    @Test
//    public void groupExists() {
//        dsc.connect();
//        assertTrue(dsc.group_exists("none"));
//        assertFalse(dsc.group_exists("not existing"));
//    }
//
//    @Test
//    public void getGroupNameId() {
//        dsc.connect();
//        String group_name = "none";
//        int group_id = 1;
//        assertEquals("none", dsc.getGroupName(dsc.getGroupID(group_name)));
//        assertEquals(1, dsc.getGroupID(dsc.getGroupName(group_id)));
//    }
//
//    @Test
//    public void basicGroupNames() {
//        dsc.connect();
//        String[] basicGroups = dsc.getBasicGroupNames();
//        assertEquals(4, basicGroups.length);
//    }
//
//    @Test
//    public void createUserSuccess() {
//        dsc.connect();
//        String new_user = getSaltString();
//        assertFalse(dsc.user_exists(new_user));
//        dsc.createUser(new_user, "asd", "", "none");
//        assertTrue(dsc.user_exists(new_user));
//
//        assertEquals(dsc.getGroupID("none"), dsc.getUserGroupID(new_user));
//        // TODO: check for group assignment
//    }
//
//    @Test
//    public void createUserFail() {
//        dsc.connect();
//        String new_user = getSaltString();
//        assertFalse(dsc.user_exists(new_user));
//        try {
//            dsc.createUser(new_user, "asd", "", "not_valid");       // invalid group name
//            dsc.createUser(new_user, "", "", "none");               // invalid password
//        } catch (IllegalArgumentException ex) {
//            System.out.println("[DEX] Error while creating user: " + ex.getMessage());
//            assertTrue(true);
//        }
//        assertFalse(dsc.user_exists(new_user));
//
//        // TODO: Check for group assignment
//    }
//
//    /* ------------------- command execution tests --------------------------*/
//
//    @Test
//    public void get_points() {
//        dsc.connect();
//        CommandExecutionReturn cre = dsc.executeCommand("get_points", new Object[]{2});
//        String json = cre.toString();
//        assertTrue(json.startsWith("[{\"uid\":2,\"points\":0.0,\"points_incr\":1.05,\"representation\":\"dollar ($)\",\"visible_for_others\":\"false\",\"last_update\":"));
//    }
//
//    @Test
//    public void get_leaderboard() {
//        dsc.connect();
//    }
//
//    @Test
//    public void set_point() {
//        dsc.connect();
//    }
//
//    @Test
//    public void get_joke() {
//        dsc.connect();
//    }
//
//}

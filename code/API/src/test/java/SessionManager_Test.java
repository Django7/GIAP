//import com.dextreem.gms.Constants;
//import com.dextreem.gms.session.CustomSession;
//import com.dextreem.gms.session.SessionManager;
//import org.junit.After;
//import org.junit.Before;
//import org.junit.Test;
//
//import static junit.framework.TestCase.assertTrue;
//import static org.junit.Assert.assertFalse;
//
///**
// * TODO: Adapt the tests to use valid WebSocket sessions in order to check all the stuff. Currently, it's only something like "Trockenübungen"
// */
//public class SessionManager_Test {
//    private final SessionManager sessionManager = new SessionManager();
//
//    @Before
//    public void before() {
//        Constants.IN_JUNIT_TEST_MODE = true;
//
//        sessionManager.clearRegistration();
//
//        sessionManager.registerUser("user_1", new CustomSession("user_1", null));
//        sessionManager.registerUser("user_2", new CustomSession("user_2", null));
//    }
//
//    @After
//    public void after() {
//
//    }
//
//    @Test
//    public void register(){
////        assertFalse(sessionManager.userRegistered("user_name"));
////        assertFalse(sessionManager.userRegistered("user_name", new CustomSession("user_name", null)));
////
////        assertTrue(sessionManager.registerUser("user_name", new CustomSession("user_name", null)));
////        assertTrue(sessionManager.userPresent("user_name"));
////        assertFalse(sessionManager.userRegistered("user_name"));
////        assertFalse(sessionManager.userRegistered("user_name", new CustomSession("user_name", null)));
////
////        assertFalse(sessionManager.registerUser("user_name_2", new CustomSession("other_user", null)));
////        assertFalse(sessionManager.userPresent("user_name_2"));
//    }
//
//    @Test
//    public void unregister(){
////        assertTrue(sessionManager.userPresent("user_1"));
////        assertTrue(sessionManager.unregisterUser("user_1"));
////        assertFalse(sessionManager.userPresent("user_1"));
////
////        assertFalse(sessionManager.unregisterUser("unknown_user"));
//    }
//}

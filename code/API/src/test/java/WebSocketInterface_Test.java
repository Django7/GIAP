//import com.dextreem.gms.Constants;
//import com.dextreem.gms.Main;
//import com.dextreem.gms.websocket.model.WebSocketMessageReceived;
//import org.glassfish.tyrus.client.ClientManager;
//import org.junit.*;
//
//import javax.websocket.*;
//import java.io.IOException;
//import java.net.URI;
//import java.util.concurrent.CountDownLatch;
//import java.util.concurrent.TimeUnit;
//
//import static com.dextreem.gms.helper.HelperMethods.getSaltString;
//import static org.junit.Assert.fail;
//
//
//public class WebSocketInterface_Test {
//
//    private final String URL = "ws://localhost:8025/ws/wscon";
//
//    private static final String API_TEST_COMMAND = "TEST";
//    private static final int TIMEOUT_SHORT = 5; // seconds
//    private static final int TIMEOUT_LONG = 20; // seconds
//
//
//    @BeforeClass
//    public static void startAPI(){
//        Constants.IN_JUNIT_TEST_MODE = false;
//
//        Runnable api = new Runnable() {
//            @Override
//            public void run() {
//                Main.main(new String[]{API_TEST_COMMAND});
//            }
//        };
//        new Thread(api).start();
//        try {
//            System.out.println("Waiting 3 seconds to start the API");
//            TimeUnit.SECONDS.sleep(3);
//        } catch (InterruptedException e) {
//            e.printStackTrace();
//        }
//    }
//
//    @AfterClass
//    public static void stopAPI(){
//        synchronized(API_TEST_COMMAND){
//            API_TEST_COMMAND.notify();
//        }
//    }
//
//    @Before
//    public void before() {
//    }
//
//    @After
//    public void after() {
//        // Logout every user
//
//    }
//
//    @Test
//    public void malformattedJSON(){
//        sendMessage(json_parse_error, json_parse_error_answer, TIMEOUT_SHORT);
//    }
//
//    @Test
//    public void commands_without_login(){
//        sendMessage(logout_okay, logout_okay_not_logged_in_answer, TIMEOUT_SHORT);
//        sendMessage(get_points_okay, get_okay_not_logged_in_answer, TIMEOUT_SHORT);
//    }
//
//    @Test
//    public void register() {
//        sendMessage(register_okay, register_okay_answer, TIMEOUT_SHORT);
//        sendMessage(register_okay_2, register_okay_2_answer, TIMEOUT_SHORT);
//        sendMessage(register_name_not_present, register_name_not_present_answer, TIMEOUT_SHORT);
//        sendMessage(register_pwd_not_present, register_pwd_not_present_answer, TIMEOUT_SHORT);
//        sendMessage(register_already_taken, register_already_taken_answer, TIMEOUT_SHORT);
//    }
//
//    @Test
//    public void login_logout_okay(){
//        String[] messages = {login_okay, logout_okay};
//        String[] answers = {login_okay_answer, logout_okay_answer};
//        sendMessage(messages, answers, TIMEOUT_SHORT);
//    }
//
//    @Test
//    public void login_fail(){
//        sendMessage(login_name_not_present, login_name_not_present_answer, TIMEOUT_SHORT);
//        sendMessage(login_pwd_not_present, login_pwd_not_present_answer, TIMEOUT_SHORT);
//        sendMessage(login_wrong_password, login_wrong_password_answer, TIMEOUT_SHORT);
//        sendMessage(login_user_unknown, login_user_unknown_answer, TIMEOUT_SHORT);
//    }
//
//    @Test
//    public void get_okay(){
//        String[] messages = {get_login_user, get_points_okay, get_logout_user};
//        String[] answers = {get_login_user_answer, get_points_okay_answer, get_logout_user_answer};
//        sendMessage(messages, answers, TIMEOUT_SHORT);
//    }
//
//    @Test
//    public void get_fail(){
//        String[] messages = {get_login_user, get_double_exclusive_1, get_logout_user};
//        String[] answers = {get_login_user_answer, get_double_exclusive_answer, get_logout_user_answer};
//        sendMessage(messages, answers, TIMEOUT_SHORT);
//
//
//        messages = new String[]{get_login_user, get_double_exclusive_2, get_logout_user};
//        answers = new String[]{get_login_user_answer, get_double_exclusive_answer, get_logout_user_answer};
//        sendMessage(messages, answers, TIMEOUT_SHORT);
//
//
//        messages = new String[]{get_login_user, get_double_exclusive_3, get_logout_user};
//        answers = new String[]{get_login_user_answer, get_double_exclusive_answer, get_logout_user_answer};
//        sendMessage(messages, answers, TIMEOUT_SHORT);
//    }
//
//    @Test
//    public void image_tagging_progress(){
//        String[] messages = {tagging_login, tagging_get_image, tagging_tag_image, tagging_logout};
//        String[] answers = {tagging_login_answer, tagging_get_image_answer, tagging_tag_image_answer, tagging_logout_answer};
//
//        sendMessage(messages, answers, TIMEOUT_SHORT);
//    }
//
//    private final String json_parse_error = "{\"type\": \"REGISTER\",\"content\":{\"name\" : \"user_name\",\"pwd\" : \"pa}";
//    private final String json_parse_error_answer = "{\"type\": \"UNKNOWN\",\"content\":{\"status\" : \"Internal error. Please try again or contact us!\"}}";
//
//    private final String register_okay = "{\"type\": \"REGISTER\",\"content\":{\"name\" : \"" + getSaltString() + "\",\"pwd\" : \"password\"}}";
//    private final String register_okay_answer = "{\"type\": \"REGISTER\",\"content\":{\"status\" : \"OK\"}}";
//    private final String register_okay_2 = "{\"type\": \"REGISTER\",\"content\":{\"name\" : \"" + getSaltString() + "\",\"pwd\" : \"password\", \"mail\" : \"bla@bla.de\"}}";
//    private final String register_okay_2_answer = register_okay_answer;
//    private final String register_name_not_present = "{\"type\": \"REGISTER\",\"content\":{\"pwd\" : \"password\"}}";
//    private final String register_name_not_present_answer = "{\"type\": \"REGISTER\",\"content\":{\"status\" : \"Parameter 'name' must be present in a 'REGISTER' request.\"}}";
//    private final String register_pwd_not_present = "{\"type\": \"REGISTER\",\"content\":{\"name\" : \"user_name\"}}";
//    private final String register_pwd_not_present_answer = "{\"type\": \"REGISTER\",\"content\":{\"status\" : \"Parameter 'pwd' must be present in a 'REGISTER' request.\"}}";
//    private final String register_already_taken = "{\"type\": \"REGISTER\",\"content\":{\"name\" : \"user_name\",\"pwd\" : \"password\"}}";
//    private final String register_already_taken_answer = "{\"type\": \"REGISTER\",\"content\":{\"status\" : \"Username 'user_name' already in use!\"}}";
//
//    private final String logout_okay_not_logged_in_answer = "{\"type\": \"LOGOUT\",\"content\":{\"status\" : \"Not logged in, please log in or register.\"}}";
//    private final String login_okay = "{\"type\": \"LOGIN\",\"content\":{\"name\" : \"user_name\",\"pwd\" : \"safe1\"}}";
//    private final String login_okay_answer = "{\"type\": \"LOGIN\",\"content\":{\"status\" : \"OK\"";
//    private final String logout_okay = "{\"type\": \"LOGOUT\",\"content\":{\"name\" : \"user_name\"}}";
//    private final String logout_okay_answer = "{\"type\": \"LOGOUT\",\"content\":{\"status\" : \"OK\"}}";
//    private final String login_name_not_present = "{\"type\": \"LOGIN\",\"content\":{\"pwd\" : \"password\"}}";
//    private final String login_name_not_present_answer = "{\"type\": \"LOGIN\",\"content\":{\"status\" : \"Parameter 'name' must be present in a 'LOGIN' request.\"}}";
//    private final String login_pwd_not_present = "{\"type\": \"LOGIN\",\"content\":{\"name\" : \"user_name\"}}";
//    private final String login_pwd_not_present_answer = "{\"type\": \"LOGIN\",\"content\":{\"status\" : \"Parameter 'pwd' must be present in a 'LOGIN' request.\"}}";
//    private final String login_wrong_password = "{\"type\": \"LOGIN\",\"content\":{\"name\": \"user_name\", \"pwd\" : \"password\"}}";
//    private final String login_wrong_password_answer = "{\"type\": \"LOGIN\",\"content\":{\"status\" : \"User/password combination is not known to the server.\"}}";
//    private final String login_user_unknown = "{\"type\": \"LOGIN\",\"content\":{\"name\": \"UNKNOWNUSER\", \"pwd\" : \"password\"}}";
//    private final String login_user_unknown_answer = login_wrong_password_answer;
//
//    private final String get_okay_not_logged_in_answer = "{\"type\": \"GET\",\"content\":{\"status\" : \"Not logged in, please log in or register.\"}}";
//    private final String get_login_user = "{\"type\": \"LOGIN\",\"content\":{\"name\" : \"max\",\"pwd\" : \"safe2\"}}";
//    private final String get_login_user_answer = "{\"type\": \"LOGIN\",\"content\":{\"status\" : \"OK\"}}";
//    private final String get_logout_user = "{\"type\": \"LOGOUT\",\"content\":{\"name\" : \"max\"}}";
//    private final String get_logout_user_answer = "{\"type\": \"LOGOUT\",\"content\":{\"status\" : \"OK\"}}";
//    private final String get_points_okay = "{\"type\": \"GET\",\"content\":{\"points\" : 1}}";
//    private final String get_points_okay_answer = "{\"type\": \"GET\",\"content\":{\"status\" : \"[{\"uid\":2,\"points\":0.0,\"points_incr\":1.05,\"representation\":\"dollar ($)\",\"visible_for_others\":\"false\",";
//    private final String get_double_exclusive_1 = "{\"type\": \"GET\",\"content\":{\"points\" : \"1\",\"leaderboard\" : \"1\"}}";
//    private final String get_double_exclusive_2 = "{\"type\": \"GET\",\"content\":{\"points\" : \"1\",\"image\" : \"1\"}}";
//    private final String get_double_exclusive_3 = "{\"type\": \"GET\",\"content\":{\"leaderboard\" : \"1\",\"image\" : \"1\"}}";
//    private final String get_double_exclusive_answer = "{\"type\": \"GET\",\"content\":{\"status\" : \"Multiple exclusive parameters present in request of type 'GET'\"}}";
//
//    private final String tagging_login = "{\"type\": \"LOGIN\",\"content\":{\"name\" : \"pascal\",\"pwd\" : \"safe3\"}}";
//    private final String tagging_login_answer = "{\"type\": \"LOGIN\",\"content\":{\"status\" : \"OK\"}}";
//    private final String tagging_get_image = "{\"type\": \"GET\",\"content\":{\"image\" : 1}}";
//    private final String tagging_get_image_answer = "{\"type\": \"GET\",\"content\":{\"status\" : \"image\", \"img\" :";
//    private final String tagging_tag_image = "{\"type\": \"POST\",\"content\":{\"tags\" : \"hallo, was, ein tolles, tagging, game\", \"name\" : \"%FILENAME%\"}}";
//    private final String tagging_tag_image_answer = "{\"type\": \"POST\",\"content\":{\"status\" : \"OK\"}}";
//    private final String tagging_logout = "{\"type\": \"LOGOUT\",\"content\":{\"name\" : \"pascal\"}}";
//    private final String tagging_logout_answer = "{\"type\": \"LOGOUT\",\"content\":{\"status\" : \"OK\"}}";
//
//    private final String post_okay_minimal = "{\"type\": \"POST\",\"content\":{\"tags\" : \"bla\"}}";
//    private final String post_okay_maximal = "{\"type\": \"POST\",\"content\":{\"tags\" : \"bla\", \"start_time\" : \"bla\", \"end_time\" : \"bla\"}}";
//    private final String post_tag_missing = "{\"type\": \"POST\",\"content\":{\"start_time\" : \"bla\", \"end_time\" : \"bla\"}}";
//
//    private void sendMessage(String message, String expectedAnswer, int timeout) {
//        CountDownLatch messageLatch;
//
//        try {
//            messageLatch = new CountDownLatch(1);
//
//            final ClientEndpointConfig cec = ClientEndpointConfig.Builder.create().build();
//
//            ClientManager client = ClientManager.createClient();
//            client.connectToServer(new Endpoint() {
//
//                @Override
//                public void onOpen(Session session, EndpointConfig config) {
//                    try {
//                        //noinspection Convert2Lambda
//                        session.addMessageHandler(new MessageHandler.Whole<String>() {
//                            @Override
//                            public void onMessage(String message) {
//                                System.out.println("Received message: " + message);
//                                System.out.println("Expected message: " + expectedAnswer);
//                                if(!message.startsWith(expectedAnswer)){
//                                    fail();
//                                }
//                                messageLatch.countDown();
//                            }
//                        });
//                        session.getBasicRemote().sendText(message);
//                    } catch (IOException e) {
//                        e.printStackTrace();
//                    }
//                }
//            }, cec, new URI(URL));
//
//            // If there is a timeout, then fail
//            if(!messageLatch.await(timeout, TimeUnit.SECONDS)){
//                fail();
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//    }
//
//    private void sendMessage(String[] messages, String[] expectedAnswers, int timeout) {
//        CountDownLatch messageLatch;
//
//        final int[] sent_counter = {0};
//        final int[] received_counter = {0};
//        final int num_of_args = messages.length;
//
//        try {
//            messageLatch = new CountDownLatch(messages.length);
//
//            final ClientEndpointConfig cec = ClientEndpointConfig.Builder.create().build();
//            final String[] image_name = {""};
//
//            ClientManager client = ClientManager.createClient();
//            client.connectToServer(new Endpoint() {
//
//                @Override
//                public void onOpen(Session session, EndpointConfig config) {
//                    try {
//                        //noinspection Convert2Lambda
//                        session.addMessageHandler(new MessageHandler.Whole<String>() {
//                            @Override
//                            public void onMessage(String message) {
//                                System.out.println("Received message: " + message);
//                                System.out.println("Expected message: " + expectedAnswers[received_counter[0]]);
//                                if(!message.startsWith(expectedAnswers[received_counter[0]])){
//                                    fail();
//                                }
//
//                                WebSocketMessageReceived wsmr =  new WebSocketMessageReceived();
//                                wsmr.decode(message);
//                                if(null != wsmr.getContentString("img")){
//                                    image_name[0] = wsmr.getContentString("name");
//                                }
//
//                                received_counter[0]++;
//                                messageLatch.countDown();
//                            }
//                        });
//                        while(sent_counter[0] < num_of_args) {
//                            String to_send = messages[sent_counter[0]];
//                            if(!image_name[0].isEmpty()){
//                                to_send.replaceAll("%FILENAME%", image_name[0]);
//                                image_name[0] = "";
//                            }
//                            session.getBasicRemote().sendText(messages[sent_counter[0]]);
//                            try {
//                                TimeUnit.MILLISECONDS.sleep(200);
//                            } catch (InterruptedException e) {
//                                e.printStackTrace();
//                            }
//                            sent_counter[0]++;
//                        }
//                    } catch (IOException e) {
//                        e.printStackTrace();
//                    }
//                }
//            }, cec, new URI(URL));
//
//            // If there is a timeout, then fail
//            if(!messageLatch.await(timeout, TimeUnit.SECONDS)){
//                fail();
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//    }
//
//    private void sendMessage(String message, int timeout){
//        CountDownLatch messageLatch;
//
//        try {
//            messageLatch = new CountDownLatch(1);
//
//            final ClientEndpointConfig cec = ClientEndpointConfig.Builder.create().build();
//
//            ClientManager client = ClientManager.createClient();
//            client.connectToServer(new Endpoint() {
//
//                @Override
//                public void onOpen(Session session, EndpointConfig config) {
//                    try {
//                        //noinspection Convert2Lambda
//                        session.addMessageHandler(new MessageHandler.Whole<String>() {
//                            @Override
//                            public void onMessage(String message) {
//                                System.out.println("Received message: " + message);
//                                messageLatch.countDown();
//                            }
//                        });
//                        session.getBasicRemote().sendText(message);
//                    } catch (IOException e) {
//                        e.printStackTrace();
//                    }
//                }
//            }, cec, new URI(URL));
//
//            // If there is a timeout, then fail
//            if(!messageLatch.await(timeout, TimeUnit.SECONDS)){
//                fail();
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//    }
//}

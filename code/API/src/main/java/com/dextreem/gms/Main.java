package com.dextreem.gms;

import com.dextreem.gms.db.MySQLDataStore;
import com.dextreem.gms.helper.Props;
import com.dextreem.gms.websocket.MyWebSocketServer;
import org.apache.log4j.Logger;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

/**
 * Created by user_name-pc on 29.01.2018.
 */
public class Main {
    private static final String versionNumber = "2.1 (* Final version for additional study.)";

    @SuppressWarnings("WeakerAccess")
    final static Logger logger = Logger.getLogger(Main.class);

    public static void main(String[] args) {
        logger.info("Starting API...");
        logger.info(String.format("Version number is: %s.", versionNumber));

        logger.info("Initializing the properties file.");
        Props.init();
        logger.info("Properties file initialized");

        logger.info("Connecting to database...");
        MySQLDataStore mySQLDataStore = new MySQLDataStore();
        if (mySQLDataStore.connect()) {
            logger.info("Connecting to database: success!");
        } else {
            logger.fatal("Connecting to database: fail!");
            logger.fatal("Could not connect to database. Please try again! Exiting...");
            return;
        }

        logger.info("Starting Websocket server");
        MyWebSocketServer wss = new MyWebSocketServer();
        try {
            if (Props.getProp("api.ws.use.ssl").toLowerCase().equals("yes")) {
                wss.startServerSSL(mySQLDataStore);
            } else {
                wss.startServer(mySQLDataStore);
            }
        }catch(NullPointerException ex){
            logger.fatal(String.format("NPE occured while starting the WebSocket server with ssl property: %s", Props.getProp("api.ws.use.ssl")));
            throw ex;
        }
        logger.info("Started WebSocket server");

        logger.info("API started!");

        /* To block the program from closing immediately */
        System.out.println("To shutdown, please enter exit");
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        try {

            // Check whether in TEST-mode or not
            if (args.length > 0 && "TEST".equals(args[0])) {
                synchronized (args[0]) {
                    args[0].wait();
                }
            } else {
                while (!"exit".equals(reader.readLine().toLowerCase())) {
                    System.out.println("To shutdown, please enter exit");
                }
            }
        } catch (IOException | InterruptedException ex) {
            ex.printStackTrace();
        } finally {
            logger.info("Shutting down DB connection and WebSocket server:");
            logger.info("DB connection...");
            mySQLDataStore.disconnect();
            logger.info("WebSocket server...");
//            wss.stop();
            wss.stopServer();
            logger.info("Done! Bye...");
        }
    }
}

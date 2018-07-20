package com.dextreem.gms.websocket;

import java.io.*;
import java.net.InetSocketAddress;
import java.nio.ByteBuffer;

import com.dextreem.gms.db.DataStoreConnector;
import com.dextreem.gms.helper.Props;
import com.dextreem.gms.session.SessionManager;
import com.dextreem.gms.websocket.runner.WebSocketMessageReceivedThreadPool;
import com.dextreem.gms.websocket.runner.WebSocketMessageReceivedWorkerThread;
import org.apache.log4j.Logger;
import org.java_websocket.WebSocket;
import org.java_websocket.WebSocketImpl;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;
import java.security.cert.CertificateException;
import javax.net.ssl.KeyManagerFactory;
import javax.net.ssl.SSLContext;
import org.java_websocket.server.DefaultSSLWebSocketServerFactory;
import javax.net.ssl.KeyManager;
import javax.xml.bind.DatatypeConverter;
import java.security.KeyFactory;
import java.security.KeyStore;
import java.security.NoSuchAlgorithmException;
import java.security.cert.Certificate;
import java.security.cert.CertificateFactory;
import java.security.cert.X509Certificate;
import java.security.interfaces.RSAPrivateKey;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.PKCS8EncodedKeySpec;

/**
 * A simple WebSocket server supporting both SSL and no-SSL.
 * Heavily used from https://github.com/TooTallNate/Java-WebSocket
 */
public class MyWebSocketServer extends WebSocketServer {
    private static MyWebSocketServer server = null;
    private static DataStoreConnector dataStoreConnector = null;

    private final SessionManager sessionManager;
    private final Logger logger = Logger.getLogger(com.dextreem.gms.websocket.MyWebSocketServer.class);

    /**
     * Creates an WebSocket server and initializes everything needed
     */
    public MyWebSocketServer(){
        super(new InetSocketAddress(Integer.parseInt(Props.getProp("api.ws.host.port"))));

        // Init the session manager
        sessionManager = new SessionManager();
    }

    /**
     * Starts the server with SSL support
     * @param dsc The datastore connector to communicate with
     */
    public void startServerSSL(DataStoreConnector dsc){
        dataStoreConnector = dsc;
        WebSocketImpl.DEBUG = false;
        server = new MyWebSocketServer();

        SSLContext context = getContext();
        if (context != null) {
            server.setWebSocketFactory(new DefaultSSLWebSocketServerFactory(getContext()));
        }
        server.setConnectionLostTimeout(30);
        server.start();
    }

    /**
     * Starts the server WITHOUT SSL support
     * @param dsc The datastore connector to communicate with
     */
    public void startServer(DataStoreConnector dsc){
        dataStoreConnector = dsc;
        WebSocketImpl.DEBUG = false;
        server = new MyWebSocketServer();
        server.start();
        System.out.println("MyWebSocketServer started on port: " + server.getPort());
    }

    /**
     * Stops the server if its running
     */
    public void stopServer(){
        if(null != server){
            try {
                server.stop();
            } catch (IOException | InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

    /**
     * Defines what happens when a user opens a connection
     * @param conn The connection the user opens a connection
     * @param handshake The handshake. Not used
     */
    @Override
    public void onOpen(WebSocket conn, ClientHandshake handshake) {
        logger.info("onOpen: " + conn.getRemoteSocketAddress());
    }

    /**
     * Defines what happens when the the connection gets closed
     * @param conn The connection
     * @param code The code. Not used
     * @param reason The reason. Not used
     * @param remote The remote. Not used
     */
    @Override
    public void onClose(WebSocket conn, int code, String reason, boolean remote) {
        logger.info("onClose: " + conn.getResourceDescriptor());
    }

    /**
     * Defines what happens when an message arrives
     * @param conn The connection
     * @param message The message that has arrived
     */
    @Override
    public void onMessage(WebSocket conn, String message) {
        logger.debug("new message arrived! Create interpreting job.");
        WebSocketMessageReceivedThreadPool
                .execute(new WebSocketMessageReceivedWorkerThread(
                                message,
                                conn,
                                dataStoreConnector,
                                sessionManager
                        )
                );
    }

    /**
     * Defines what happens when an message arrives as a ByteBuffer
     * Not used.
     * @param conn The connection
     * @param message The message that has arrived
     */
    @Override
    public void onMessage(WebSocket conn, ByteBuffer message) {
        logger.error("Received ByteBuffer. Expected to never happen.");
    }


    /**
     * Defines what happens when an error happen.
     * Does simply print the error message
     * @param conn The connection
     * @param ex
     */
    @Override
    public void onError(WebSocket conn, Exception ex) {
        ex.printStackTrace();
        if (conn != null) {
            // some errors like port binding failed may not be assignable to a specific websocket
        }
    }

    /**
     * Defines what happens when the server starts
     */
    @Override
    public void onStart() {
        logger.debug("Starting WebSocket server at port: " + server.getPort());
    }

    /**
     * Gets the SSL context for Let's encrypt.
     * TODO: Link the source where I got this from. Same for the other functions below (the non-commented ones)
     * @return The SSL context
     */
    private static SSLContext getContext() {
        SSLContext context;
        String password = Props.getProp("api.ws.ssl.password");
        String pathname = Props.getProp("api.ws.ssl.pathname");
        try {
            context = SSLContext.getInstance("TLS");

            byte[] certBytes = parseDERFromPEM(getBytes(new File(pathname + File.separator + "cert.pem")), "-----BEGIN CERTIFICATE-----", "-----END CERTIFICATE-----");
            byte[] keyBytes = parseDERFromPEM(getBytes(new File(pathname + File.separator + "privkey.pem")), "-----BEGIN PRIVATE KEY-----", "-----END PRIVATE KEY-----");

            X509Certificate cert = generateCertificateFromDER(certBytes);
            RSAPrivateKey key = generatePrivateKeyFromDER(keyBytes);

            KeyStore keystore = KeyStore.getInstance("JKS");
            keystore.load(null);
            keystore.setCertificateEntry("cert-alias", cert);
            keystore.setKeyEntry("key-alias", key, password.toCharArray(), new Certificate[]{cert});

            KeyManagerFactory kmf = KeyManagerFactory.getInstance("SunX509");
            kmf.init(keystore, password.toCharArray());

            KeyManager[] km = kmf.getKeyManagers();

            context.init(km, null, null);
        } catch (Exception e) {
            context = null;
        }
        return context;
    }

    private static byte[] parseDERFromPEM(byte[] pem, String beginDelimiter, String endDelimiter) {
        String data = new String(pem);
        String[] tokens = data.split(beginDelimiter);
        tokens = tokens[1].split(endDelimiter);
        return DatatypeConverter.parseBase64Binary(tokens[0]);
    }

    private static RSAPrivateKey generatePrivateKeyFromDER(byte[] keyBytes) throws InvalidKeySpecException, NoSuchAlgorithmException {
        PKCS8EncodedKeySpec spec = new PKCS8EncodedKeySpec(keyBytes);

        KeyFactory factory = KeyFactory.getInstance("RSA");

        return (RSAPrivateKey) factory.generatePrivate(spec);
    }

    private static X509Certificate generateCertificateFromDER(byte[] certBytes) throws CertificateException {
        CertificateFactory factory = CertificateFactory.getInstance("X.509");

        return (X509Certificate) factory.generateCertificate(new ByteArrayInputStream(certBytes));
    }

    private static byte[] getBytes(File file) {
        byte[] bytesArray = new byte[(int) file.length()];

        FileInputStream fis = null;
        try {
            fis = new FileInputStream(file);
            fis.read(bytesArray); //read file into bytes[]
            fis.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return bytesArray;
    }

}
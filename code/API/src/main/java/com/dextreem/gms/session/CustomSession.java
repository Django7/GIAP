package com.dextreem.gms.session;

import org.java_websocket.WebSocket;

public class CustomSession{
    private final WebSocket webSocket;
    private final String user;

    public CustomSession(String user, WebSocket webSocket){
        this.user = user;
        this.webSocket = webSocket;
    }

    public WebSocket getSession() {
        return webSocket;
    }

    public String getUser() {
        return user;
    }

    @Override
    public String toString() {
        return user + "_" + webSocket.getRemoteSocketAddress();
    }

    @Override
    public boolean equals(Object obj) {
        return obj instanceof CustomSession && webSocket.getRemoteSocketAddress().equals(((CustomSession) obj).getSession().getRemoteSocketAddress());
    }

    @Override
    public int hashCode() {
        return webSocket.hashCode();
    }
}

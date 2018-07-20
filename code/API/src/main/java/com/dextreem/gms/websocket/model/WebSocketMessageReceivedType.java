package com.dextreem.gms.websocket.model;

@SuppressWarnings("ALL")
public enum WebSocketMessageReceivedType {
    REGISTER("REGISTER"),
    LOGIN("LOGIN"),
    LOGOUT("LOGOUT"),
    GET("GET"),
    POST("POST"),
    QUESTIONNAIRE("QUESTIONNAIRE"),
    COMMAND("COMMAND"),
    UNKNOWN("UNKNOWN"),
    HEARTBEAT("HEARTBEAT");

    private final String name;

    WebSocketMessageReceivedType(String s) {
        name = s;
    }

    public boolean equalsName(String othername) {
        return name.equals(othername);
    }

    public String toString() {
        return name;
    }
}

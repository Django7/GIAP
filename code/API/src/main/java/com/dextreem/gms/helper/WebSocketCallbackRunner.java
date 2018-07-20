package com.dextreem.gms.helper;

public abstract class WebSocketCallbackRunner implements Runnable {

    String message = "";

    public void setMessage(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}

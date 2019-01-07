package com.dextreem.gms.error;

public class API_IllegalArgumentException extends IllegalArgumentException{

    public API_IllegalArgumentException() {
    }

    public API_IllegalArgumentException(String s) {
        super(s);
    }

    public API_IllegalArgumentException(String message, Throwable cause) {
        super(message, cause);
    }

    public API_IllegalArgumentException(Throwable cause) {
        super(cause);
    }
}

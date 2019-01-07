package com.dextreem.gms.db;

public class RowKeyValuePair {

    private final String column_name;
    private final Object column_value;

    public RowKeyValuePair(String name, Object value){
        column_name = name;
        column_value = value;
    }

    public String getColumn_name() {
        return column_name;
    }

    public Object getColumn_value() {
        return column_value;
    }
}



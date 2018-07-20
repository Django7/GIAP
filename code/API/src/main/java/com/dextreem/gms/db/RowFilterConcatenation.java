package com.dextreem.gms.db;

public enum RowFilterConcatenation{
    AND("AND"),
    OR("OR");

    private final String name;

    RowFilterConcatenation(String s){
        name = s;
    }

    public boolean equalsName(String othername){
        return name.equals(othername);
    }

    public String toString(){
        return name;
    }
}
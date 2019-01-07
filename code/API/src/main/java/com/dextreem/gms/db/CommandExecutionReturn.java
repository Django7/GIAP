package com.dextreem.gms.db;

import javax.json.*;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

/**
 * Wrapper around java.sql.ResultSet
 * Its toString() method produces a JSON string.
 */
public class CommandExecutionReturn {
    private final ResultSet resultSet;

    public ResultSet getResultSet() {
        return resultSet;
    }

    /**
     * Creates a new CommandExecutionReturn, which is basically a simple wrapper around a java.sql.ResultSet with the
     * addition that its toString() method produces JSON strings.
     * @param resultSet The freshly created CommandExecutionReturn
     */
    @SuppressWarnings("WeakerAccess") // must be public but intellij wants to set it to private
    public CommandExecutionReturn(ResultSet resultSet) {
        this.resultSet = resultSet;
    }

    /**
     * Produces a JSON conform string from the underlying result set structure.
     * @return The result set as a JSON string.
     */
    @Override
    public String toString() {
        JsonArrayBuilder resultJason = Json.createArrayBuilder();
        try {
            ResultSetMetaData metaData = resultSet.getMetaData();
            while (resultSet.next()) {
                JsonObjectBuilder obj = Json.createObjectBuilder();
                int columns = metaData.getColumnCount();
                for (int i = 1; i <= columns; i++) {
                    String columnName = metaData.getColumnName(i);
                    Object result = resultSet.getObject(columnName);
                    if(result instanceof Integer){
                        obj.add(columnName, resultSet.getInt(columnName));
                    }else if (result instanceof Long){
                        obj.add(columnName, resultSet.getLong(columnName));
                    } else if(result instanceof Double){
                        obj.add(columnName, resultSet.getDouble(columnName));
                    }else{
                        obj.add(columnName, resultSet.getObject(columnName).toString());
                    }
                }
                resultJason.add(obj);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return resultJason.build().toString();
    }
}

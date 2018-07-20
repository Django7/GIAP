package com.dextreem.gms.helper;

import org.apache.log4j.Logger;

import java.io.*;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

/**
 * Small wrapper class around Java's Properties class such that we can statically initialize the
 */
public class Props {

    private static Properties props = new Properties();
    final static Logger logger = Logger.getLogger(Props.class);
    private static final String path = "props/settings.properties";
    private static Map<String, Integer> offsets = null;

    /**
     * Reads and loads properties at {path}
     */
    public static void init() {
        try {
            InputStream in = new FileInputStream(new File(path));
            props.load(in);
            logger.debug(String.format("Properties as a string: %s", props.toString()));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * Returns the property as a String with the key {key}
     *
     * @param key The key to get the property for
     * @return {key}'s respective property, null if {key} does not exist
     */
    public static String getProp(String key) {
        return props.getProperty(key);
    }

    /**
     * Returns the offset for a certain group.
     * This offset is used to let the API "think" there are already N participants in the specific group that finished the study.
     * Note that the offset can be negative as well.
     *
     * @param groupName The name to get the offset for
     * @return The offset or 0 if the group does not exist in the group-offset property string
     */
    public static int getOffset(String groupName) {
        // If the offset is not yet set, set it (only once for each API start)
        if (null == offsets) {
            offsets = new HashMap<>();
            String sOffsets = props.getProperty("api.group.distribution.offsets");
            if (null != offsets) {
                String[] sOffsetTokens = sOffsets.split(",");
                for (String sOffsetToken : sOffsetTokens) {
                    String[] groupOffsets = sOffsetToken.split(":");
                    String group = groupOffsets[0];
                    int offset = Integer.parseInt(groupOffsets[1]);
                    offsets.put(group, offset);
                }
            }
        }

        // Check if the group offset exists and return the respective value if yes
        if (offsets.containsKey(groupName)) {
            return offsets.get(groupName);
        }

        // Return 0 if the group offset does not exist
        return 0;
    }
}

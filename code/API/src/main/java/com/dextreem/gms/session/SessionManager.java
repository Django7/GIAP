package com.dextreem.gms.session;

import org.apache.log4j.Logger;

import java.net.InetSocketAddress;
import java.util.HashMap;
import java.util.Map;

public class SessionManager {
    private Map<String, CustomSession> user_sessions = new HashMap<>();
    private Map<String, CustomSession> sessions_to_user = new HashMap<>();

    private final Logger logger = Logger.getLogger(SessionManager.class);

    /**
     * Registers a user.
     *
     * @param user    The user to register.
     * @param session The user's session.
     * @return true if there was no previous association, false otherwise.
     */
    public synchronized boolean registerUser(String user, CustomSession session) {
        if(null == session || null == session.getSession()){
            logger.error(String.format("Empty session for user '%s'", user));
            return false;
        }
        logger.debug(String.format("Registering user '%s' with session '%s'.", user, session.getSession().getRemoteSocketAddress()));
        if(!user.equals(session.getUser())){
            return false;
        }
        boolean user_present = user_sessions.containsKey(user);
        user_sessions.put(user, session);
        sessions_to_user.put(session.getSession().getRemoteSocketAddress().toString(), session);
        return !user_present;
    }

    /**
     * Unregister a user.
     *
     * @param user The user to unregister.
     * @return true if the user was previously present, false otherwise.
     */
    public synchronized boolean unregisterUser(String user) {
        logger.debug(String.format("Unregister user '%s'", user));
        boolean user_present = user_sessions.containsKey(user);
        if(user_present){
            sessions_to_user.remove(user_sessions.get(user).getSession().getRemoteSocketAddress().toString());
        }
        user_sessions.remove(user);
        return user_present;
    }

    /**
     * Gets the user to a specified session id
     * @param sessionID The session id to determine the user for
     * @return The session's user id
     */
    public synchronized CustomSession sessionToCustomSession(InetSocketAddress sessionID){
        logger.debug(String.format("Get the (registered) user for session '%s'", sessionID));
        return sessions_to_user.get(sessionID.toString());
    }

    /**
     * Checks whether a user is registered.
     * Also checks if the user's session is not null and still open. If not, it unregisters the user automatically.
     * WARNING: Does only check for the user present in the list.
     * It is important to check the user's session as well when wanting an exact match!
     * For this, see userRegistered (String, CustomSession)
     *
     * @param user The user to check for.
     * @return true if the user is present in the map AND his/her session is still valid, false otherwise.
     */
    public synchronized boolean userRegistered(String user) {
        logger.debug(String.format("Check if user '%s' is registered", user));
        if (user_sessions.containsKey(user)
                && null != user_sessions.get(user)
                && null != user_sessions.get(user).getSession()
                && user_sessions.get(user).getSession().isOpen()) {
            return true;
        } else {
            unregisterUser(user);
        }
        return false;
    }

    /**
     * Unregistered an user, additionally identified by his/her session.
     *
     * @param user    The user to check for.
     * @param session The respective user's session.
     * @return true if the user is present in the map AND the user is identical to the session's user AND the session
     * is identical to the parameterized one, false otherwise.
     */
    public synchronized boolean userRegistered(String user, CustomSession session) {

        logger.debug(String.format("Check if user '%s' is registered with session '%s'", user, session.getSession().getRemoteSocketAddress()));
        return userRegistered(user) && user.equals(session.getUser()) && session.equals(user_sessions.get(user));
    }
}

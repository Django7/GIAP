package com.dextreem.gms.websocket.runner;

import org.apache.log4j.Logger;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * A thread pool handling the interpretation of a message.
 * Must be (unfortunately) static such that hte WebSocket handlers can access it.
 */
public class WebSocketMessageReceivedThreadPool {
    private static int size = 20;
    private static ExecutorService executor = Executors.newFixedThreadPool(size);


    final static Logger logger = Logger.getLogger(WebSocketMessageReceivedThreadPool.class);

    /**
     * Execute the runnable in a thread pool
     *
     * @param runnable The runnable to run
     */
    public static void execute(Runnable runnable) {
        executor.execute(runnable);
    }

    /**
     * Gets the size of the thread pool used
     *
     * @return Thread pool size
     */
    public static int getSize() {
        return size;
    }

    /**
     * Shutting down the thread pool, allowing it 1000 ms to shut down normally before simply return.
     */
    public static void shutdown() {
        long shutdownTime = 1000;
        logger.info(String.format("Shutting down thread pool. Give it %s ms to shutdown.", shutdownTime));
        executor.shutdown();
        long start = System.currentTimeMillis();
        try {
            Thread.currentThread().wait();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        long duration = System.currentTimeMillis() - start;
        logger.info(String.format("Thread pool shut down in %d ms", duration));
    }
}

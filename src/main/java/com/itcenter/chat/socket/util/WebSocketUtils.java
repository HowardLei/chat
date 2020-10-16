package com.itcenter.chat.socket.util;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import javax.websocket.Session;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

/**
 * WebSocketUtils class
 * WebSocket 工具类
 * @author apple
 * @date 2019/11/9
 */
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class WebSocketUtils {

    /**
     * 创建默认连接数，默认的连接数为 5
     */
    private static final int CONNECTIONS;
    /**
     * 记录在线的会话的用户与会话的信息
     */
    private static final Map<String, Session> ONLINE_SESSION;

    // 所有静态信息都是在静态代码块当中进行初始化。
    static {
        CONNECTIONS = 5;
        ONLINE_SESSION = new ConcurrentHashMap<>(CONNECTIONS);
    }

    /**
     * 向服务器端添加会话
     *
     * @param userNickname 添加会话的用户名
     * @param session      需要添加的会话
     */
    public static void addSession(String userNickname, Session session) {
        ONLINE_SESSION.putIfAbsent(userNickname, session);
    }

    /**
     * 根据用户名删除对应会话
     *
     * @param userNickname 需要删除的用户名
     */
    public static void removeSession(String userNickname) {
        ONLINE_SESSION.remove(userNickname);
    }

    /**
     * 向某个会话发送信息
     *
     * @param session 需要发送的会话
     * @param message 向会话发送的信息
     */
    public static void sendMessage(Session session, String message) {
        Optional.ofNullable(session).ifPresent(existSession -> {
            var asyncRemote = existSession.getAsyncRemote();
            asyncRemote.sendText(message);
        });
    }

    /**
     * 向全体发送会话信息
     *
     * @param message 发送的会话信息
     */
    public static void sendMessageForAll(String message) {
        ONLINE_SESSION.forEach((key, session) -> sendMessage(session, message));
    }
}

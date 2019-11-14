package com.itcenter.chat.controller;

import com.itcenter.chat.socket.util.WebSocketUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;

import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;

/**
 * WebSocketController class
 *
 * @author apple
 * @date 2019/11/9
 */
@Controller
@ServerEndpoint("/myChat/{userNickname}")
@Slf4j
public class WebSocketController {
    /**
     * 当需要通过 socket 通信的时候，执行该方法。
     * @param userNickName 用户名
     * @param session 加入的会话
     */
    @OnOpen
    public void onOpen(@PathParam("userNickname") String userNickName, Session session) {
        var message = "有新游客[" + userNickName + "]加入聊天室";
        log.info(message);
        WebSocketUtils.addSession(userNickName, session);
        WebSocketUtils.sendMessageForAll(message);
    }

    /**
     * 当有人退出聊天室的时候，触发该方法。
     * @param userNickName 退出用户
     * @param session 删除该会话
     */
    @OnClose
    public void onClose(@PathParam("userNickname") String userNickName, Session session) {
        var message = "游客[" + userNickName + "]退出聊天室！";
        log.info(message);
        WebSocketUtils.removeSession(userNickName);
        WebSocketUtils.sendMessageForAll(message);
    }

    /**
     * 当收到消息的时候，触发该方法。
     * @param userNickname 哪个用户发送的消息
     * @param message 哪个用户发送的消息
     */
    @OnMessage
    public void onMessage(@PathParam("userNickname") String userNickname, String message) {
        var info = "游客[" + userNickname + "]:" + message;
        log.info(info);
        WebSocketUtils.sendMessageForAll(info);
    }

    /**
     * 当出现错误的时候，触发该方法。
     * @param session 需要关闭的会话
     * @param throwable
     */
    @OnError
    public void onError(Session session, Throwable throwable) {
        log.error("异常:", throwable);
        try {
            session.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        throwable.printStackTrace();
    }
}

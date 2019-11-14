package com.itcenter.chat.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * IndexController class
 * 负责控制初始化控制器
 * @author apple
 * @date 2019/11/9
 */
@Controller
public class IndexController {
    /**
     * 配置初始化哪个页面
     * @return 需要配置网页的 html 值
     */
    @RequestMapping("/")
    public String index() {
        return "client";
    }

}

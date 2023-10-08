package com.example.projectmaven.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController {

    @GetMapping("/")
    public String hello() {
        return "Hello.html";
    }


    @GetMapping("/add")
    public String admin() {
        return "Admin.html";
    }


}

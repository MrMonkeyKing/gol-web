package com.example.gameoflifeweb;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class RequestController {

    @GetMapping("/game_of_life")
    public String gameOfLife() {
        return "game_of_life";
    }

    @GetMapping("/test")
    public String test() {
        return "test";
    }
}

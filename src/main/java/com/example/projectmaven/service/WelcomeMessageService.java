package com.example.projectmaven.service;

import com.example.projectmaven.model.WelcomeMessage;

import java.util.List;

public interface WelcomeMessageService {
    WelcomeMessage getMessageByType(String type);

    void createWelcomeMessage(WelcomeMessage welcomeMessage);

    void updateWelcomeMessage(WelcomeMessage welcomeMessage, String message);

    List<WelcomeMessage> getAllMessages();
}

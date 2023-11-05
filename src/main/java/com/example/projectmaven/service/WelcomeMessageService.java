package com.example.projectmaven.service;

import com.example.projectmaven.model.WelcomeMessage;

public interface WelcomeMessageService {
    WelcomeMessage getMessageByType(String type);

    void createWelcomeMessage(WelcomeMessage welcomeMessage);

    void updateWelcomeMessage(WelcomeMessage welcomeMessage, String message);
}

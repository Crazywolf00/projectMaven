package com.example.projectmaven.service;

import com.example.projectmaven.model.WelcomeMessage;
import com.example.projectmaven.repository.WelcomeMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WelcomeMessageServiceImpl implements WelcomeMessageService{

    private final WelcomeMessageRepository welcomeMessageRepository;

    @Autowired
    public WelcomeMessageServiceImpl(WelcomeMessageRepository welcomeMessageRepository) {
        this.welcomeMessageRepository = welcomeMessageRepository;
    }


    @Override
    public WelcomeMessage getMessageByType(String type) {
        return welcomeMessageRepository.getWelcomeMessageByMessageType(type);
    }

    @Override
    public void createWelcomeMessage(WelcomeMessage welcomeMessage) {
        welcomeMessageRepository.save(welcomeMessage);
    }

    @Override
    public void updateWelcomeMessage(WelcomeMessage welcomeMessage, String message) {
        welcomeMessage.setMessage(message);
        welcomeMessageRepository.save(welcomeMessage);
    }
}

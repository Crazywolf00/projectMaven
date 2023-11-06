package com.example.projectmaven.service;

import com.example.projectmaven.model.WelcomeMessage;
import com.example.projectmaven.repository.WelcomeMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class WelcomeMessageServiceImpl implements WelcomeMessageService {

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

    @Override
    public List<WelcomeMessage> getAllMessages() {
        return welcomeMessageRepository.findAll()
                .stream()
                .filter(welcomeMessage -> !Objects.equals(welcomeMessage.getMessageType(), "welcomeMessage"))
                .collect(Collectors.toList());
    }
}

package com.example.projectmaven.service;

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



}

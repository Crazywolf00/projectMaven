package com.example.projectmaven.repository;

import com.example.projectmaven.model.WelcomeMessage;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WelcomeMessageRepository extends ListCrudRepository<WelcomeMessage,Long> {

    WelcomeMessage getWelcomeMessageByMessageType(String type);
}

package com.example.projectmaven.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Data
@Getter
@Setter
public class WelcomeMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String message;

    @Column(unique=true)
    private String messageType;

    public WelcomeMessage(String message, String type) {
        this.message = message;
        this.messageType = type;
    }

    public WelcomeMessage() {

    }
}

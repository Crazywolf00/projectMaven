package com.example.projectmaven.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Data
@Getter
@Setter
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @Lob
    private String review;
    @Lob
    private String answer = "";
    private boolean allow = true;

    public Comment(String name, String review) {
        this.name = name;
        this.review = review;
    }

    public Comment() {

    }
}

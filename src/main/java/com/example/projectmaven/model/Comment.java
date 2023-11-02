package com.example.projectmaven.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Data
@Getter
@Setter
public class Comment {

    @Id
    private Long id;
    private String name;
    @Lob
    private String review;
    @Lob
    private String answer;
    private boolean allow = true;



}

package com.example.projectmaven.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Data
@Getter
@Setter
public class ImagePort {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String categoriesName;
    private String setName;
    private String pathName;

    private String type;


    public ImagePort() {
    }

    public ImagePort(String name, String group, String set, String path, String type) {
        this.name = name;
        this.categoriesName = group;
        this.setName = set;
        this.pathName = path;
        this.type = type;
    }


}

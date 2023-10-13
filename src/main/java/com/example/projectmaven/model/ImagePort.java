package com.example.projectmaven.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategoriesName() {
        return categoriesName;
    }

    public void setCategoriesName(String groupName) {
        this.categoriesName = groupName;
    }

    public String getSetName() {
        return setName;
    }

    public void setSetName(String setName) {
        this.setName = setName;
    }

    public String getPathName() {
        return pathName;
    }

    public void setPathName(String pathName) {
        this.pathName = pathName;
    }
}

package com.example.projectmaven.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class ImagePort {

    @Id
    private Long id;
    private String group;
    private String set;
    private String path;


    public ImagePort() {
    }

    public ImagePort(String group, String set, String path) {
        this.group = group;
        this.set = set;
        this.path = path;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public String getGroup() {
        return group;
    }

    public void setGroup(String group) {
        this.group = group;
    }

    public String getSet() {
        return set;
    }

    public void setSet(String set) {
        this.set = set;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }
}

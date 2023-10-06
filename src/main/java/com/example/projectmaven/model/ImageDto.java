package com.example.projectmaven.model;

public class ImageDto {

    private Long id;
    private String name;
    private String groupName;
    private String setName;
    private String type;


    public ImageDto(ImagePort img) {
        this.id = img.getId();
        this.name = img.getName();
        this.groupName = img.getGroupName();
        this.setName = img.getSetName();
        this.type = img.getType();
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

    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public String getSetName() {
        return setName;
    }

    public void setSetName(String setName) {
        this.setName = setName;
    }


    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}

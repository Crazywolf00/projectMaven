package com.example.projectmaven.model;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class ImageDto {

    private Long id;
    private String name;
    private String groupName;
    private String setName;
    private String type;


    public ImageDto(ImagePort img) {
        this.id = img.getId();
        this.name = img.getName();
        this.groupName = img.getCategoriesName();
        this.setName = img.getSetName();
        this.type = img.getType();
    }


}

package com.example.projectmaven.model;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Data
@Getter
@Setter
public class SetImagesDto {

    private String setName;

    private List<ImagePort> images = new ArrayList<>();

    public SetImagesDto(String set) {
        this.setName = set;
    }

    public void addImage(ImagePort imagePort) {
        images.add(imagePort);
    }
}

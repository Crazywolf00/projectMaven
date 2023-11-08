package com.example.projectmaven.model;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.*;

@Data
@Setter
@Getter
public class CategoryImagesDto {

    private String category;

    private List<ImagePort> imagePortList = new ArrayList<>();

    private List<SetImagesDto> sorteImageList = new ArrayList<>();

    public CategoryImagesDto(String category) {
        this.category = category;
    }

    public void addImage(ImagePort imagePort) {
        imagePortList.add(imagePort);
    }

    public void sortImage() {
        Set<String> setSets = new HashSet<>();
        for (ImagePort img : imagePortList) {
            setSets.add(img.getSetName());
        }

        for (String s : setSets) {
            sorteImageList.add(new SetImagesDto(s));
        }

        for (ImagePort img : imagePortList) {
            for (SetImagesDto setImg : sorteImageList) {
                if(Objects.equals(setImg.getSetName(), img.getSetName())) {
                    setImg.addImage(img);
                    break;
                }
            }
        }
        imagePortList = new ArrayList<>();
    }

}

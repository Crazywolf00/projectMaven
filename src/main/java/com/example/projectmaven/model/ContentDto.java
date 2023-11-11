package com.example.projectmaven.model;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.*;

@Data
@Getter
@Setter
public class ContentDto {

    private WelcomeMessage welcomeMessage = new WelcomeMessage("", "");

    private List<ImagePort> images = new ArrayList<>();

    private List<SetImagesDto> sorteImageList = new ArrayList<>();

    public ContentDto() {
    }

    public ContentDto(WelcomeMessage welcomeMessage) {
        this.welcomeMessage = welcomeMessage;
    }

    public void addImg(ImagePort imagePort) {
        images.add(imagePort);
    }

    public void sortImage() {
        Set<String> setSets = new HashSet<>();
        for (ImagePort img : images) {
            setSets.add(img.getSetName());
        }

        for (String s : setSets) {
            sorteImageList.add(new SetImagesDto(s));
        }

        for (ImagePort img : images) {
            for (SetImagesDto setImg : sorteImageList) {
                if(Objects.equals(setImg.getSetName(), img.getSetName())) {
                    setImg.addImage(img);
                    break;
                }
            }
        }
        images = new ArrayList<>();
    }
}

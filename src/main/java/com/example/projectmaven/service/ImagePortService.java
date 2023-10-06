package com.example.projectmaven.service;

import com.example.projectmaven.model.ImagePort;

import java.util.List;

public interface ImagePortService {

    List<ImagePort> getAll();

    ImagePort getImg(Long id);

    void deleteImg(Long id);

    ImagePort addImg(ImagePort img);

    ImagePort updateImg(ImagePort img, Long id);

}

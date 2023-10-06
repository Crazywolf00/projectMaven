package com.example.projectmaven.service;

import com.example.projectmaven.model.ImagePort;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ImagePortService {

    List<ImagePort> getAll();

    ImagePort getImg(Long id);

    void deleteImg(Long id);

    ImagePort addImg(MultipartFile file) throws IOException;

    ImagePort updateImg(ImagePort img, Long id);

}
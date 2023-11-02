package com.example.projectmaven.service;

import com.example.projectmaven.model.ImagePort;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Set;

public interface ImagePortService {
    List<ImagePort> getMain();

    List<ImagePort> getAll();

    byte[] getImg(Long id) throws IOException;

    void deleteImg(Long id) throws IOException;

    ImagePort addImg(String groupName,int index, String setName, MultipartFile file) throws IOException;

    String getType(Long id);

    ImagePort getImgWithInfo(Long id);
    ImagePort getImgByName(String name);

    Set<String> category();

    ImagePort getImgByIndex(int index);

    void deleteImgByIndex(int index);
}

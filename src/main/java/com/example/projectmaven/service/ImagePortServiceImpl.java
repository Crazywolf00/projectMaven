package com.example.projectmaven.service;

import com.example.projectmaven.model.ImagePort;
import com.example.projectmaven.repository.ImagePortRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class ImagePortServiceImpl implements ImagePortService {

    private ImagePortRepository repository;

    private final Path path = Paths.get("src/main/resources/static/storedImg/");



    @Autowired
    public ImagePortServiceImpl(ImagePortRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<ImagePort> getAll() {
        return repository.findAll();
    }

    @Override
    public ImagePort getImg(Long id) {
        return repository.getById(id);
    }

    @Override
    public void deleteImg(Long id) {
        repository.deleteById(id);
    }

    @Override
    public ImagePort addImg(MultipartFile file) throws IOException {
        Path filePath = Paths.get(String.valueOf(path), file.getOriginalFilename() + " -- "
                + new SimpleDateFormat("ddMMyyyy-HHmmss").format(new Date()));
        file.transferTo(new File(filePath.toUri()));
        ImagePort img = new ImagePort();
        img.setName(file.getOriginalFilename() + " -- "
                + new SimpleDateFormat("dd.MM. yyyy - HH:mm:ss").format(new Date()));
        img.setType(file.getContentType());
        img.setPathName(String.valueOf(filePath));
        return repository.save(img);
    }

    @Override
    public ImagePort updateImg(ImagePort img, Long id) {
        repository.deleteById(id);
        img.setId(id);
        return repository.save(img);
    }
}
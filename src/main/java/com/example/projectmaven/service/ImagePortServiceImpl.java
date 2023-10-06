package com.example.projectmaven.service;

import com.example.projectmaven.model.ImagePort;
import com.example.projectmaven.repository.ImagePortRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImagePortServiceImpl implements ImagePortService {

    private ImagePortRepository repository;

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
    public ImagePort addImg(ImagePort img) {
        return repository.save(img);
    }

    @Override
    public ImagePort updateImg(ImagePort img, Long id) {
        repository.deleteById(id);
        img.setId(id);
        return repository.save(img);
    }
}

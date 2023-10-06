package com.example.projectmaven.controller;

import com.example.projectmaven.model.ImagePort;
import com.example.projectmaven.service.ImagePortServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class ApiController {

    private ImagePortServiceImpl imgService;

    @Autowired
    public ApiController(ImagePortServiceImpl imgService) {
        this.imgService = imgService;
    }

    @GetMapping("/")
    public ResponseEntity<?> getAll() {
        return null;
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<?> getImg(@PathVariable Long id) {
        return null;
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteImg(@PathVariable Long id) {
        return null;
    }

    @PostMapping("/post")
    public ResponseEntity<?> addImg(@RequestBody ImagePort img) {
        return null;
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateImg(@RequestBody ImagePort img,
                                       @PathVariable Long id) {
        return null;
    }
}

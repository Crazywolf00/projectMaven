package com.example.projectmaven.controller;

import com.example.projectmaven.model.ImagePort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class ApiController {

    //add img, delete img, read img, update img

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

}

package com.example.projectmaven.controller;

import com.example.projectmaven.model.ImageDto;
import com.example.projectmaven.model.ImagePort;
import com.example.projectmaven.service.ImagePortServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class ApiController {

    private final ImagePortServiceImpl imgService;

    @Autowired
    public ApiController(ImagePortServiceImpl imgService) {
        this.imgService = imgService;
    }

    @GetMapping("/")
    public ResponseEntity<?> getAll() {
        return ResponseEntity.status(HttpStatus.OK).body(imgService.getAll());
    }

    @GetMapping("/getInfo/{id}")
    public ResponseEntity<?> getImgInfo(@PathVariable Long id) {
        ImageDto dto = new ImageDto(imgService.getImgWithInfo(id));
        return ResponseEntity.status(HttpStatus.OK).body(dto);
    }
    @GetMapping("/getImg/{id}")
    public ResponseEntity<?> getImg(@PathVariable Long id) {
        try {
            return ResponseEntity.status(HttpStatus.OK)
                    .contentType(MediaType.valueOf(imgService.getType(id)))
                    .body(imgService.getImg(id));
        } catch (IOException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping("/post")
    public ResponseEntity<?> addImg(@RequestParam("img") Optional<MultipartFile> img) {
        try {
            if(img.isPresent()) {
                return ResponseEntity.status(HttpStatus.OK).body(imgService.addImg(img.get()));
            } else {
                throw new IOException();
            }
        } catch (IOException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteImg(@PathVariable Long id) {
        return null;
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateImg(@RequestBody ImagePort img,
                                       @PathVariable Long id) {
        return null;
    }
}

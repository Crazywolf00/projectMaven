package com.example.projectmaven.controller;

import com.example.projectmaven.model.ImageDto;
import com.example.projectmaven.model.ImagePort;
import com.example.projectmaven.model.Password;
import com.example.projectmaven.service.ImagePortServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class ApiController {

    private final ImagePortServiceImpl imgService;
    private final Password password = new Password();

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
        System.out.println(id);
        try {
            return ResponseEntity.status(HttpStatus.OK)
                    .contentType(MediaType.valueOf(imgService.getType(id)))
                    .body(imgService.getImg(id));
        } catch (IOException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }


    @GetMapping("/password")
    public ResponseEntity<?> password(@RequestParam String inputPassword) {
        if (password.checkPassword(inputPassword)) {
            return ResponseEntity.status(HttpStatus.OK).body(password.getKey());
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @GetMapping("/main")
    public ResponseEntity<?> getMain() {
        List<ImagePort> images = imgService.getMain();
        images.sort(Comparator.comparingInt(img -> Integer.parseInt(img.getName().split("\\.")[0])));
        return ResponseEntity.status(HttpStatus.OK).body(images);
    }


    @GetMapping("/category")
    public ResponseEntity<?> category(@RequestParam String name) {
        System.out.println(name);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    //--------------------------------SECURITY--------------------------------

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteImg(@RequestParam String key,
                                       @PathVariable Long id) {
        if (password.checkKey(key)) {
            try {
                imgService.deleteImg(id);
                return ResponseEntity.status(HttpStatus.OK).build();
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllAdmin() {
        return ResponseEntity.status(HttpStatus.OK).body(imgService.getAll());
    }

    @PostMapping("/post")
    public ResponseEntity<?> addImg(
            @RequestParam String key,
            @RequestParam Optional<String> groupName,
            @RequestParam Optional<String> setName,
            @RequestParam("img") List<MultipartFile> img) {

        if (password.checkKey(key)) {
            try {
                if (groupName.isPresent() && setName.isPresent()) {
                    for (MultipartFile multipartFile : img) {
                        imgService.addImg(groupName.get(), setName.get(), multipartFile, groupName.get());
                    }
                    return ResponseEntity.status(HttpStatus.OK)
                            .build();
                } else {
                    throw new IOException();
                }
            } catch (IOException ex) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            }
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

    }

    @GetMapping("/allcategory")
    public ResponseEntity<?> getAllCategory(@RequestParam String key) {
        if (password.checkKey(key)) {
            return ResponseEntity.status(HttpStatus.OK).body(imgService.category());
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

}

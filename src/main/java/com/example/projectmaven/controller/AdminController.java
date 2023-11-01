package com.example.projectmaven.controller;

import com.example.projectmaven.model.Password;
import com.example.projectmaven.service.ImagePortServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/admin")
public class AdminController {

    private final ImagePortServiceImpl imgService;
    private final Password password = new Password();

    @Autowired
    public AdminController(ImagePortServiceImpl imgService) {
        this.imgService = imgService;
    }

    @PostMapping("/background")
    public ResponseEntity<?> setBackground(@RequestParam String key,
                                           @RequestParam MultipartFile backgroundImg) {
        if (password.checkKey(key)) {
            try {
                if(imgService.getBackground("background") != null) {
                    imgService.deleteImg(imgService.getBackground("background").getId());
                }
                imgService.addImg("main", "background", backgroundImg);
                return ResponseEntity.status(HttpStatus.OK).build();
            } catch (IOException ex) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            }
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

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
                        imgService.addImg(groupName.get(), setName.get(), multipartFile);
                    }
                    return ResponseEntity.status(HttpStatus.OK).build();
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

    @GetMapping("/password")
    public ResponseEntity<?> password(@RequestParam String inputPassword) {
        if (password.checkPassword(inputPassword)) {
            return ResponseEntity.status(HttpStatus.OK).body(password.getKey());
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }
}

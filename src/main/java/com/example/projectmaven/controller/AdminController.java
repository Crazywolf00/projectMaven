package com.example.projectmaven.controller;

import com.example.projectmaven.model.Password;
import com.example.projectmaven.model.WelcomeMessage;
import com.example.projectmaven.service.CommentServiceImpl;
import com.example.projectmaven.service.ImagePortServiceImpl;
import com.example.projectmaven.service.WelcomeMessageServiceImpl;
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
    private final CommentServiceImpl commentService;
    private final WelcomeMessageServiceImpl welcomeMessageService;
    private final Password password = new Password();

    @Autowired
    public AdminController(ImagePortServiceImpl imgService, CommentServiceImpl commentService, WelcomeMessageServiceImpl welcomeMessageService) {
        this.imgService = imgService;
        this.commentService = commentService;
        this.welcomeMessageService = welcomeMessageService;
    }

    @PostMapping("/mainImg")
    public ResponseEntity<?> setMainImg(@RequestParam String key,
                                        @RequestParam String name,
                                        @RequestParam int index,
                                        @RequestParam MultipartFile inputMainImg) {
        if (password.checkKey(key)) {
            try {
                if (index == 100) {
                    if (imgService.getImgByName(name) != null) {
                        imgService.deleteImg(imgService.getImgByName(name).getId());
                    }
                    imgService.addImg("main", index, name, inputMainImg);
                } else {
                    if (imgService.getImgByIndex(index) != null) {
                        imgService.deleteImg(imgService.getImgByIndex(index).getId());
                    }
                    imgService.addImg("main", index, name, inputMainImg);
                }

                return ResponseEntity.status(HttpStatus.OK).build();
            } catch (IOException ex) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            }
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @GetMapping("/main")
    public ResponseEntity<?> getMain() {
        return ResponseEntity.status(HttpStatus.OK).body(imgService.getMain());
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteImg(@RequestParam String key,
                                       @RequestParam int index) {
        if (password.checkKey(key)) {
            if (index < 99) {
                imgService.deleteImgByIndex(index);
                return ResponseEntity.status(HttpStatus.OK).build();
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            }
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @PatchMapping("/allow/{id}")
    public ResponseEntity<?> updateCommentAllow(@RequestParam String key,
                                                @PathVariable Long id) {

        if (password.checkKey(key)) {
            if (commentService.findById(id) != null) {
                commentService.changeAllow(commentService.findById(id));

                return ResponseEntity.status(HttpStatus.OK).build();
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            }
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @DeleteMapping("/comment/{id}")
    public ResponseEntity<?> deleteComment(@RequestParam String key,
                                           @PathVariable Long id) {
        if (password.checkKey(key)) {
            if (commentService.findById(id) != null) {
                commentService.deleteComment(commentService.findById(id));
                return ResponseEntity.status(HttpStatus.OK).build();
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            }
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @PatchMapping("/answer/{id}")
    public ResponseEntity<?> addAnswerToComment(@RequestParam String key,
                                                @RequestParam String answer,
                                                @PathVariable Long id) {
        if (password.checkKey(key)) {
            if (commentService.findById(id) != null) {
                commentService.addAnswer(commentService.findById(id), answer);
                return ResponseEntity.status(HttpStatus.OK).build();
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            }
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllAdmin() {
        return ResponseEntity.status(HttpStatus.OK).body(imgService.getAll());
    }

    @PostMapping("/images")
    public ResponseEntity<?> addImg(@RequestParam String key,
                                    @RequestParam Optional<String> groupName,
                                    @RequestParam Optional<String> setName,
                                    @RequestParam("img") List<MultipartFile> img) {
        if (password.checkKey(key)) {
            try {
                if (groupName.isPresent() && setName.isPresent()) {
                    for (MultipartFile multipartFile : img) {
                        imgService.addImg(groupName.get(), 200, setName.get(), multipartFile);
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

    @GetMapping("/allCategory")
    public ResponseEntity<?> getAllCategory(@RequestParam String key) {
        if (password.checkKey(key)) {
            return ResponseEntity.status(HttpStatus.OK).body(imgService.category());
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @PostMapping("/welcome")
    public ResponseEntity<?> setWelcomeMessage(@RequestParam String key,
                                               @RequestParam String type,
                                               @RequestParam String message) {
        if (password.checkKey(key)) {
            welcomeMessageService.createWelcomeMessage(new WelcomeMessage(message, type));
            return ResponseEntity.status(HttpStatus.OK).build();
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @PatchMapping("/welcome")
    public ResponseEntity<?> updateWelcomeMessage(@RequestParam String key,
                                                  @RequestParam String type,
                                                  @RequestParam String message) {
        if (password.checkKey(key)) {
            if(welcomeMessageService.getMessageByType(type) != null) {
                welcomeMessageService.updateWelcomeMessage(welcomeMessageService.getMessageByType(type), message);
            } else {
                welcomeMessageService.createWelcomeMessage(new WelcomeMessage(message, type));
            }
            return ResponseEntity.status(HttpStatus.OK).build();
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

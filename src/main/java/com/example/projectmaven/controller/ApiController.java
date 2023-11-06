package com.example.projectmaven.controller;

import com.example.projectmaven.model.Comment;
import com.example.projectmaven.model.ImageDto;
import com.example.projectmaven.model.ImagePort;
import com.example.projectmaven.model.WelcomeMessage;
import com.example.projectmaven.service.CommentServiceImpl;
import com.example.projectmaven.service.ImagePortServiceImpl;
import com.example.projectmaven.service.WelcomeMessageServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class ApiController {

    private final ImagePortServiceImpl imgService;

    private final CommentServiceImpl commentService;
    private final WelcomeMessageServiceImpl welcomeMessageService;


    @Autowired
    public ApiController(ImagePortServiceImpl imgService, CommentServiceImpl commentService, WelcomeMessageServiceImpl welcomeMessageService) {
        this.imgService = imgService;
        this.commentService = commentService;
        this.welcomeMessageService = welcomeMessageService;
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

    @PostMapping("/comment")
    public ResponseEntity<?> addComment(@RequestParam String name,
                                        @RequestParam String comment) {
        if(name.length() == 0 || comment.length() == 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        return ResponseEntity.status(HttpStatus.OK)
                .body(commentService.createNewComment(new Comment(name,comment)));
    }

    @GetMapping("/comments")
    public ResponseEntity<?> getComments() {
        return ResponseEntity.status(HttpStatus.OK).body(commentService.getAllComments());
    }


    @GetMapping("/background")
    public ResponseEntity<?> getBackground(@RequestParam String name) {
        ImagePort imagePort = imgService.getImgByName(name);
        Long id;
        if (imagePort != null) {
            id = imagePort.getId();
        } else {
            return null;
        }
        try {
            return ResponseEntity.status(HttpStatus.OK)
                    .contentType(MediaType.valueOf(imgService.getType(id)))
                    .body(imgService.getImg(id));
        } catch (IOException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }



    @GetMapping("/welcome")
    public ResponseEntity<?> getWelcomeMessage(@RequestParam String type) {
        WelcomeMessage welcomeMessageDatabase= welcomeMessageService.getMessageByType(type);
        return ResponseEntity.status(HttpStatus.OK).body(welcomeMessageDatabase == null ? "" : welcomeMessageDatabase);
    }

    @GetMapping("/messages")
    public ResponseEntity<?> getAllMessages() {
        return ResponseEntity.status(HttpStatus.OK).body(welcomeMessageService.getAllMessages());
    }

}

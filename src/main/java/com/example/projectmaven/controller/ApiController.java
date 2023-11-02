package com.example.projectmaven.controller;

import com.example.projectmaven.model.Comment;
import com.example.projectmaven.model.ImageDto;
import com.example.projectmaven.model.ImagePort;
import com.example.projectmaven.service.CommentServiceImpl;
import com.example.projectmaven.service.ImagePortServiceImpl;
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


    @Autowired
    public ApiController(ImagePortServiceImpl imgService, CommentServiceImpl commentService) {
        this.imgService = imgService;
        this.commentService = commentService;
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



    @GetMapping("/category")
    public ResponseEntity<?> category(@RequestParam String name) {
        System.out.println(name);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

}

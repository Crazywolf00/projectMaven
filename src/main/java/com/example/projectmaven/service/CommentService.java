package com.example.projectmaven.service;

import com.example.projectmaven.model.Comment;

import java.util.List;

public interface CommentService {

    Comment createNewComment(Comment comment);

    List<Comment> getAllComments();

    Comment findById(Long id);


    void changeAllow(Comment comment);
}

package com.example.projectmaven.service;

import com.example.projectmaven.model.Comment;
import com.example.projectmaven.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentServiceImpl implements CommentService{

    private final CommentRepository commentRepository;

    @Autowired
    public CommentServiceImpl(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    @Override
    public Comment createNewComment(Comment comment) {
        return commentRepository.save(comment);
    }
}

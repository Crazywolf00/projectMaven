package com.example.projectmaven.service;

import com.example.projectmaven.model.Comment;
import com.example.projectmaven.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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

    @Override
    public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }

    @Override
    public Comment findById(Long id) {
        if(commentRepository.findById(id).isPresent()) {
            return commentRepository.findById(id).get();
        } else {
            return null;
        }
    }

    @Override
    public void changeAllow(Comment comment) {
        comment.changeAllow();
        commentRepository.save(comment);
    }


}

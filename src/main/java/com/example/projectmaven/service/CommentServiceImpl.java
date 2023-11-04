package com.example.projectmaven.service;

import com.example.projectmaven.model.Comment;
import com.example.projectmaven.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
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
        List<Comment> comments = commentRepository.findAll();
        Collections.reverse(comments);
        return comments;
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

    @Override
    public void deleteComment(Comment comment) {
        commentRepository.delete(comment);
    }

    @Override
    public void addAnswer(Comment comment, String answer) {
        comment.setAnswer(answer);
        commentRepository.save(comment);
    }


}

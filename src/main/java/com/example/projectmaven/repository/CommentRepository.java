package com.example.projectmaven.repository;


import com.example.projectmaven.model.Comment;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.web.bind.annotation.RestController;

@RestController
public interface CommentRepository extends ListCrudRepository<Comment, Long> {
}

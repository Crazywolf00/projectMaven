package com.example.projectmaven.repository;

import com.example.projectmaven.model.ImagePort;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImagePortRepository extends ListCrudRepository<ImagePort,Long> {
}

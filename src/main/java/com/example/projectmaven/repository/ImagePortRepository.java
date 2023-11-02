package com.example.projectmaven.repository;

import com.example.projectmaven.model.ImagePort;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import javax.management.Query;

@Repository
public interface ImagePortRepository extends ListCrudRepository<ImagePort,Long> {

        ImagePort getImagePortBySetName(String name);

        ImagePort getImagePortByImgIndex(int index);
}

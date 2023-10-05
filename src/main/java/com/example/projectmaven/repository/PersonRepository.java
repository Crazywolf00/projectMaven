package com.example.projectmaven.repository;

import com.example.projectmaven.model.Person;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonRepository extends ListCrudRepository<Person,Long> {
}

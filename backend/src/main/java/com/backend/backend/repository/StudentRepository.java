package com.backend.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.backend.model.StudentModel;

@Repository
public interface StudentRepository extends JpaRepository<StudentModel, Integer> {
  
}

package com.backend.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.backend.model.StudentModel;

import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<StudentModel, Integer> {
  Optional<StudentModel> findByEmail(String email);
}

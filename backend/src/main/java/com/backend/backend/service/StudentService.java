package com.backend.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.backend.model.StudentModel;
import com.backend.backend.repository.StudentRepository;

import java.util.Optional;

@Service
public class StudentService {

  @Autowired
  private StudentRepository repository;

  public StudentModel registerStudent(StudentModel student) {
    Optional<StudentModel> existing = repository.findByEmail(student.getEmail());
    if (existing.isPresent()) {
      throw new RuntimeException("Email already registered");
    }
    if (student.getRole() == null || student.getRole().isEmpty()) {
      student.setRole("student");
    }
    return repository.save(student);
  }

  public StudentModel loginStudent(String email, String password) {
    Optional<StudentModel> studentOpt = repository.findByEmail(email);
    if (studentOpt.isEmpty()) {
      throw new RuntimeException("User not found");
    }
    StudentModel student = studentOpt.get();
    if (!student.getPassword().equals(password)) {
      throw new RuntimeException("Invalid password");
    }
    return student;
  }

  public Optional<StudentModel> getStudentById(int uid) {
    return repository.findById(uid);
  }
}

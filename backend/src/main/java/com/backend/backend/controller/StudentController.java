package com.backend.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.backend.backend.model.StudentModel;
import com.backend.backend.model.LoginRequest;
import com.backend.backend.service.StudentService;

import java.util.Optional;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/student")
@CrossOrigin(origins = "*") // Allows requests from any origin (e.g., frontend Vite dev server)
public class StudentController {

    @Autowired
    private StudentService studentService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody StudentModel student) {
        try {
            StudentModel createdStudent = studentService.registerStudent(student);
            return new ResponseEntity<>(createdStudent, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            StudentModel student = studentService.loginStudent(loginRequest.getEmail(), loginRequest.getPassword());
            return new ResponseEntity<>(student, HttpStatus.OK);
        } catch (RuntimeException e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/{uid}")
    public ResponseEntity<?> getStudent(@PathVariable int uid) {
        Optional<StudentModel> studentOpt = studentService.getStudentById(uid);
        if (studentOpt.isPresent()) {
            return new ResponseEntity<>(studentOpt.get(), HttpStatus.OK);
        } else {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Student not found");
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }
}

package com.backend.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "student")
public class StudentModel {

  @Id
  @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
  private int uid;
  private String name;
  private String email;
  private String password;
  private String department;
  private String studentId;
  private String role;
  private java.time.LocalDateTime createdAt;
  private java.time.LocalDateTime updatedAt;
  
  public void setUid(int uid) {
    this.uid = uid;
  }
  public int getUid() {
    return this.uid;
  }

  public void setName(String name) {
    this.name = name;
  }
  public String getName() {
    return this.name;
  }

  public void setEmail(String email) {
    this.email = email;
  }
  public String getEmail() {
    return this.email;
  }

  public void setPassword(String password) {
    this.password = password;
  }
  public String getPassword() {
    return this.password;
  }

  public void setDepartment(String department) {
    this.department = department;
  }
  public String getDepartment() {
    return this.department;
  }

  public void setStudentId(String studentId) {
    this.studentId = studentId;
  }
  public String getStudentId() {
    return this.studentId;
  }

  public void setRole(String role) {
    this.role = role;
  }
  public String getRole() {
    return this.role;
  }

  public void setCreatedAt(java.time.LocalDateTime createdAt) {
    this.createdAt = createdAt;
  }
  public java.time.LocalDateTime getCreatedAt() {
    return this.createdAt;
  }

  public void setUpdatedAt(java.time.LocalDateTime updatedAt) {
    this.updatedAt = updatedAt;
  }
  public java.time.LocalDateTime getUpdatedAt() {
    return this.updatedAt;
  }
  
  @jakarta.persistence.PrePersist
  protected void onCreate() {
    this.createdAt = java.time.LocalDateTime.now();
    this.updatedAt = this.createdAt;
  }

  @jakarta.persistence.PreUpdate
  protected void onUpdate() {
    this.updatedAt = java.time.LocalDateTime.now();
  }
}
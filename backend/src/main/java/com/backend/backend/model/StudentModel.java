package com.backend.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "student")
public class StudentModel {

  @Id
  private int uid;
  private String name;
  private String email;
  private String password;
  private String department;
  
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
  
}
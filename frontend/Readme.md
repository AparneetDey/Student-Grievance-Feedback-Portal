# 🎓 Student Grievance & Feedback Portal

A full-stack web application that allows students to submit grievances and feedback securely (including anonymous submissions) and enables administrators to manage, respond, and track resolution status efficiently.

---

## 🛠 Tech Stack

### Frontend
- React.js  
- HTML5, CSS3  
- Axios (API communication)

### Backend
- Spring Boot  
- MongoDB  
- Spring Security  
- JWT Authentication  

---

## 📌 Project Overview

The system is designed with clear separation between frontend UI models and backend service modules, integrated using RESTful APIs.

Students can:
- Submit grievances anonymously or with identity
- Track grievance status
- Provide feedback

Admins can:
- View all grievances
- Respond via threaded feedback
- Update grievance status
- View analytics

---

## 🖥 Frontend Modules

### 1. UI / Screen Model

Defines all frontend screens and UI elements.

**Screens**
- Landing Page (Login / Register)
- Student Dashboard
- Grievance Submission Page
- Feedback Page
- Grievance Status Page
- Profile Page
- Admin Contact / Help Page
- Admin Dashboard

**UI Elements**
- Forms
- Buttons
- Dropdowns
- File upload
- Status badges

---

### 2. Navigation Flow Model

**Student Flow**

Landing → Login/Register → Dashboard  
→ Submit Grievance → Confirmation → Status Page  
→ Give Feedback → Thank You Page  

**Admin Flow**

Login → Admin Dashboard → View Grievances  
→ Respond → Update Status  

---

### 3. Form & Input Model

**Forms**
- Login Form (Email, Password)
- Registration Form (Name, Roll No, Department, Email, Password)
- Grievance Form (Category, Title, Description, Attachment)
- Feedback Form (Rating, Comment)

**Validations**
- Required fields
- Email format validation
- Character limits
- File size and type validation

---

### 4. State & Interaction Model

**UI States**
- Loading
- Success
- Error
- Empty

**Interactions**
- Button hover and click effects
- Form submit → loader → API response
- Dynamic status badge color changes

---

## ⚙ Backend Modules (Spring Boot + MongoDB)

### 1. Authentication & User Management Module

**Mapped Frontend Screens**
- Login
- Register
- Profile

**Features**
- JWT-based authentication
- Role-based authorization (STUDENT / ADMIN)
- Anonymous token generation
- Password encryption

**APIs**
- POST /auth/register  
- POST /auth/login  
- GET /auth/me  
- POST /auth/anonymous-token  

---

### 2. Grievance & Feedback Management Module

**Mapped Frontend Screens**
- Student Dashboard
- Grievance Submission Page
- Grievance Status Page

**Features**
- Anonymous and identified grievance submission
- Category-based grievance handling
- Student-only grievance visibility

**APIs**
- POST /grievances  
- GET /grievances/my  
- GET /grievances/{id}  

---

### 3. Feedback Threading & Resolution Module

**Mapped Frontend Screens**
- Feedback Page
- Grievance Detail View

**Features**
- Threaded conversations
- Admin–student replies
- Read-only threads after resolution

**APIs**
- POST /feedback/{grievanceId}  
- GET /feedback/{grievanceId}  
- PUT /feedback/{grievanceId}/close  

---

### 4. Admin Dashboard & Analytics Module

**Mapped Frontend Screens**
- Admin Dashboard

**Features**
- View all grievances
- Filter by status, category, and date
- Update grievance status
- View analytics summary

**APIs**
- GET /admin/grievances  
- PATCH /admin/grievances/{id}/status  
- GET /admin/analytics  

---

## 🗂 MongoDB Collections

users  
grievances  
feedback_threads  
anonymous_tokens  

---

## 🔐 Security Features

- JWT authentication
- Role-based access control
- Anonymous grievance handling
- Secured REST APIs

---

## 📊 Evaluation Mapping

| Feature | Implementation |
|------|---------------|
| Role-based visibility | Spring Security + JWT |
| Anonymous submissions | Anonymous tokens |
| Status management | Enum-based grievance states |
| Feedback threading | FeedbackThread collection |
| Frontend-backend integration | REST APIs |

---

## 🚀 Conclusion

This project demonstrates a complete full-stack grievance and feedback management system with secure access, clean UI flow, and modular backend architecture suitable for academic evaluation and real-world use.

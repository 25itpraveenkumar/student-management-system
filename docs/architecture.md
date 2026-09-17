# Architecture Documentation - Student Management System

## Overview
The **Student Management System** is designed following clean enterprise patterns with a decoupled frontend and backend. 

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                             │
│       React 18 Single Page Application (Vite Server :3000)       │
│                                                                 │
│  ┌──────────────┐   ┌──────────────┐   ┌─────────────────────┐  │
│  │ Dashboard.jsx│──▶│StudentForm.jsx│  │ StudentList.jsx     │  │
│  └──────┬───────┘   └──────────────┘   └─────────────────────┘  │
│         │                                                       │
│         ▼                                                       │
│  ┌──────────────┐                                               │
│  │   api.js     │ Axios HTTP Client                             │
│  └──────┬───────┘                                               │
└─────────┼───────────────────────────────────────────────────────┘
          │ JSON / HTTP REST requests (Port 8080)
          ▼
┌─────────────────────────────────────────────────────────────────┐
│                       SERVER LAYER                              │
│              Spring Boot Application (Port 8080)                │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ StudentController.java (@RestController)                  │  │
│  │   └─ Handlers: GET, POST, PUT, DELETE                    │  │
│  └──────────────────────────────┬────────────────────────────┘  │
│                                 │ Calls                         │
│  ┌──────────────────────────────▼────────────────────────────┐  │
│  │ StudentService.java (@Service)                            │  │
│  │   └─ Validates uniqueness, handles business logic         │  │
│  └──────────────────────────────┬────────────────────────────┘  │
│                                 │ Calls                         │
│  ┌──────────────────────────────▼────────────────────────────┐  │
│  │ StudentRepository.java (JpaRepository)                    │  │
│  │   └─ Executes JPQL / SQL queries                          │  │
│  └──────────────────────────────┬────────────────────────────┘  │
└─────────┼───────────────────────┼───────────────────────────────┘
          │ JDBC Connection       │ Hibernate ORM
          ▼                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                      DATABASE LAYER                             │
│              H2 In-Memory DB (or MySQL 8.0)                     │
│                Table: 'students'                                │
└─────────────────────────────────────────────────────────────────┘
```

## Layer Responsibilities

### 1. Presentation Layer (React Frontend)
* **Components**: React modular components (`StudentForm`, `StudentList`, `SearchBar`, `Navbar`, `ConfirmModal`, `NotificationToast`).
* **State Management**: React `useState` and `useEffect` managing live lists, active search query, editing target, and background network status.
* **API Client**: `api.js` encapsulates Axios REST calls and abstracts HTTP error structures into clean UI alerts.

### 2. Controller Layer (`StudentController.java`)
* Handles incoming REST API HTTP requests (`GET`, `POST`, `PUT`, `DELETE`).
* Enforces input validation via `@Valid`.
* Configured with `@CrossOrigin(origins = "*")` to allow local development browser CORS calls.

### 3. Service Layer (`StudentService.java`)
* Contains core business validation logic.
* Checks for duplicate student IDs (`existsByStudentId` and `existsByStudentIdAndIdNot`).
* Throws domain-specific custom exceptions (`ResourceNotFoundException`, `DuplicateResourceException`).

### 4. Repository Layer (`StudentRepository.java`)
* Extends `JpaRepository<Student, Long>`.
* Includes custom JPQL search query matching query string across student ID, name, email, and department.

### 5. Exception Handling Layer (`GlobalExceptionHandler.java`)
* Centralized `@RestControllerAdvice`.
* Translates uncaught exceptions into standard JSON `ErrorResponse` DTOs with appropriate HTTP status codes (400, 404, 409, 500).

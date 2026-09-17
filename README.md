# Student Management System 🎓

A complete, full-stack college CRUD web application for managing student registrations, profiles, and academic details. Built with a **Spring Boot** backend, **React (Vite)** frontend, and **H2/MySQL** database.

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Problem Statement](#problem-statement)
3. [Objectives](#objectives)
4. [Features](#features)
5. [Technology Stack](#technology-stack)
6. [Architecture](#architecture)
7. [Database Structure](#database-structure)
8. [API Endpoints](#api-endpoints)
9. [Project Folder Structure](#project-folder-structure)
10. [Installation Instructions](#installation-instructions)
11. [How to Run Backend](#how-to-run-backend)
12. [How to Run Frontend](#how-to-run-frontend)
13. [How to Test APIs using Postman](#how-to-test-apis-using-postman)
14. [CRUD Operations Explanation](#crud-operations-explanation)
15. [Validation Mechanism](#validation-mechanism)
16. [Error Handling](#error-handling)
17. [Future Enhancements](#future-enhancements)

---

## 1. Project Overview
The **Student Management System** is a modern web application designed for educational institutions to digitize student record management. It enables college administrators and staff to add, view, update, search, and delete student data seamlessly through an intuitive web interface backed by robust RESTful web services.

---

## 2. Problem Statement
Traditional paper-based or manual spreadsheet record-keeping systems for college students are error-prone, hard to search, inefficient for quick updates, and lack data validation. There is a need for a centralized, responsive, and easy-to-use CRUD application that validates user input, prevents duplicate student IDs, and provides immediate feedback.

---

## 3. Objectives
* Build a beginner-friendly full-stack Java web application suitable for college academic submissions and viva presentations.
* Implement complete RESTful CRUD operations adhering to HTTP standards (200, 201, 204, 400, 404, 409).
* Ensure strict dual-layer data validation (Client-side in React & Server-side in Spring Boot).
* Provide zero-configuration out-of-the-box local execution using H2 Database with simple options to switch to MySQL.

---

## 4. Features
* ➕ **Create Student**: Form to input Student ID, Name, Email, Department, Year, and Phone.
* 📋 **Read Students**: Responsive table layout displaying all student attributes with status badges.
* ✏️ **Update Student**: One-click Edit button to pre-populate student details in form and save updates via REST API.
* 🗑️ **Delete Student**: Delete student record with confirmation modal dialog and instant table refresh.
* 🔍 **Real-time Search**: Search students dynamically by Name, Email, Department, or Student ID.
* ⚠️ **Validation & Error Banners**: Field-level inline validation messages and floating toast notifications.
* 📊 **Dashboard Stats**: Real-time stats showing Total Students registered, Active Departments count, and API status.

---

## 5. Technology Stack

### Frontend:
* **React 18**: UI Component Library
* **Vite**: Ultra-fast build tool and local dev server
* **JavaScript (ES6+)**: Logic & Async state handling
* **Vanilla CSS**: Custom design system with glassmorphism aesthetics
* **Axios**: Promise-based HTTP client for REST APIs
* **Lucide React**: Modern iconography

### Backend:
* **Java 17**: Core programming language
* **Spring Boot 3.2**: Web Framework
* **Spring Web**: MVC & RESTful web API endpoints
* **Spring Data JPA**: Data access layer with Hibernate ORM
* **Jakarta Bean Validation**: Server-side annotation validation (`@NotBlank`, `@Email`, `@Pattern`)
* **JUnit 5 & MockMvc**: Integration and Controller testing framework

### Database:
* **H2 Database**: In-memory database for zero-setup execution (Default)
* **MySQL 8.0**: Supported via simple property configuration in `application.properties`

---

## 6. Architecture
The application follows a standard **3-Tier Layered Architecture**:
```
┌────────────────────────────────────────────────────────┐
│                   React + Vite UI                      │
│        (Dashboard, Form, Table, Search, Toast)         │
└───────────────────────────┬────────────────────────────┘
                            │ REST API (JSON)
                            ▼
┌────────────────────────────────────────────────────────┐
│               Spring Boot Controller                   │
│               (StudentController.java)                 │
└───────────────────────────┬────────────────────────────┘
                            │ Business Logic
                            ▼
┌────────────────────────────────────────────────────────┐
│                 Spring Boot Service                    │
│                 (StudentService.java)                  │
└───────────────────────────┬────────────────────────────┘
                            │ Data Access
                            ▼
┌────────────────────────────────────────────────────────┐
│               Spring Data JPA Repository               │
│               (StudentRepository.java)                 │
└───────────────────────────┬────────────────────────────┘
                            │ SQL Queries
                            ▼
┌────────────────────────────────────────────────────────┐
│                 Database (H2 / MySQL)                  │
└────────────────────────────────────────────────────────┘
```

---

## 7. Database Structure

### Entity: `Student` (Table: `students`)

| Column Name  | Data Type    | Constraints                             | Description               |
|--------------|--------------|─────────────────────────────────────────|───────────────────────────|
| `id`         | `BIGINT`     | `PRIMARY KEY`, `AUTO_INCREMENT`         | Internal Database PK      |
| `student_id` | `VARCHAR`    | `NOT NULL`, `UNIQUE`                    | College Student ID        |
| `name`       | `VARCHAR`    | `NOT NULL`                              | Full Name                 |
| `email`      | `VARCHAR`    | `NOT NULL`                              | Email Address             |
| `department` | `VARCHAR`    | `NOT NULL`                              | Academic Department       |
| `year`       | `VARCHAR`    | `NOT NULL`                              | Academic Year             |
| `phone`      | `VARCHAR`    | `NOT NULL`                              | 10-digit Phone Number     |

---

## 8. API Endpoints

| Method   | Endpoint             | Request Body | Status Code | Description                           |
|----------|----------------------|--------------|-------------|---------------------------------------|
| `GET`    | `/api/students`      | None         | `200 OK`    | Fetch all students (optional `?search=`) |
| `GET`    | `/api/students/{id}` | None         | `200 OK` / `404` | Fetch student details by Database ID |
| `POST`   | `/api/students`      | JSON         | `201 Created` / `400` / `409` | Register a new student |
| `PUT`    | `/api/students/{id}` | JSON         | `200 OK` / `400` / `404` / `409` | Update an existing student |
| `DELETE` | `/api/students/{id}` | None         | `204 No Content` / `404` | Remove student record |

---

## 9. Project Folder Structure
```
student-management-system/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/college/studentmanagement/
│   │   │   │       ├── controller/
│   │   │   │       │   └── StudentController.java
│   │   │   │       ├── service/
│   │   │   │       │   └── StudentService.java
│   │   │   │       ├── repository/
│   │   │   │       │   └── StudentRepository.java
│   │   │   │       ├── model/
│   │   │   │       │   └── Student.java
│   │   │   │       ├── exception/
│   │   │   │       │   ├── ResourceNotFoundException.java
│   │   │   │       │   ├── DuplicateResourceException.java
│   │   │   │       │   ├── ErrorResponse.java
│   │   │   │       │   └── GlobalExceptionHandler.java
│   │   │   │       └── StudentManagementApplication.java
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   │       └── java/
│   │           └── com/college/studentmanagement/
│   │               └── controller/
│   │                   └── StudentControllerTest.java
│   └── pom.xml
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── StudentForm.jsx
│   │   │   ├── StudentList.jsx
│   │   │   ├── ConfirmModal.jsx
│   │   │   └── NotificationToast.jsx
│   │   ├── pages/
│   │   │   └── Dashboard.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── styles/
│   │   │   └── index.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
├── docs/
│   ├── architecture.md
│   ├── api-documentation.md
│   └── testing.md
└── README.md
```

---

## 10. Installation Instructions

### Prerequisites:
1. **Java JDK 17** or higher (`java -version`)
2. **Apache Maven** (`mvn -version`)
3. **Node.js v18+ & npm** (`node -v` / `npm -v`)

---

## 11. How to Run Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Build the Spring Boot application and run tests:
   ```bash
   mvn clean package
   ```
3. Run the application:
   ```bash
   mvn spring-boot:run
   ```
4. Backend REST API will start at: `http://localhost:8080/api/students`
5. H2 Database Web Console will be available at: `http://localhost:8080/h2-console`
   * JDBC URL: `jdbc:h2:mem:studentdb`
   * Username: `sa`
   * Password: *(leave empty)*

---

## 12. How to Run Frontend

1. Navigate to the frontend directory in a new terminal window:
   ```bash
   cd frontend
   ```
2. Install npm dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser and visit: `http://localhost:3000`

---

## 13. How to Test APIs using Postman

### Sample Requests:

#### 1. Create Student (POST)
* **URL**: `http://localhost:8080/api/students`
* **Method**: `POST`
* **Headers**: `Content-Type: application/json`
* **Body**:
  ```json
  {
    "studentId": "STU101",
    "name": "John Doe",
    "email": "john@college.edu",
    "department": "Computer Science",
    "year": "2nd Year",
    "phone": "9876543210"
  }
  ```
* **Expected Status**: `201 Created`

#### 2. Get All Students (GET)
* **URL**: `http://localhost:8080/api/students`
* **Method**: `GET`
* **Expected Status**: `200 OK`

#### 3. Update Student (PUT)
* **URL**: `http://localhost:8080/api/students/1`
* **Method**: `PUT`
* **Body**:
  ```json
  {
    "studentId": "STU101",
    "name": "John Doe Updated",
    "email": "john.updated@college.edu",
    "department": "Data Science",
    "year": "3rd Year",
    "phone": "9876543210"
  }
  ```
* **Expected Status**: `200 OK`

#### 4. Delete Student (DELETE)
* **URL**: `http://localhost:8080/api/students/1`
* **Method**: `DELETE`
* **Expected Status**: `204 No Content`

---

## 14. CRUD Operations Explanation

* **Create**: Accepts student details from React form, runs validations, checks for duplicate `studentId` in `StudentService`, and saves record into database.
* **Read**: Fetches list of all students or filters matching records via Spring Data JPA JPQL search query.
* **Update**: Pre-fills existing details into form upon clicking 'Edit'. Modifies target record while ensuring `studentId` uniqueness against other students.
* **Delete**: Removes record by database primary key ID after user confirmation in UI modal.

---

## 15. Validation Mechanism
* **Frontend**: Dynamic state validation before form submission ensuring all required fields are present, email format is valid, and phone number contains 10 digits.
* **Backend**: Jakarta Validation annotations (`@NotBlank`, `@Email`, `@Pattern`) triggered by `@Valid` on controller methods. Returns structured field error map with HTTP 400 status.

---

## 16. Error Handling
* **404 Not Found**: Thrown via `ResourceNotFoundException` when requesting a student ID that does not exist.
* **409 Conflict**: Thrown via `DuplicateResourceException` when creating/updating a student with an already existing `studentId`.
* **400 Bad Request**: Returned when payload fails validation checks.
* **Global Exception Handler**: `@RestControllerAdvice` formats all errors into standard `ErrorResponse` objects with timestamps and descriptive messages.

---

## 17. Future Enhancements
* 🔐 Add Role-Based Authentication (JWT + Spring Security for Admin / Student view).
* 📄 Export student records to PDF / Excel format.
* 🖼️ Profile picture upload for students.
* 📈 Analytics charts showing department-wise student distribution.

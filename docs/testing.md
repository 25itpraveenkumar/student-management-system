# Testing Guide - Student Management System

This document describes how to execute automated backend unit/integration tests and perform manual testing scenarios.

---

## 1. Automated Backend Unit & Integration Tests

The Spring Boot backend uses JUnit 5 and Spring `MockMvc` to test controller endpoints, service validations, duplicate checks, and exception handlers.

### Running Backend Tests:
Navigate to the `backend/` directory and execute:
```bash
mvn test
```

### Test Suite Summary (`StudentControllerTest.java`):
* `testCreateStudent_Success()`: Verifies HTTP 201 Created response when posting valid student JSON.
* `testCreateStudent_ValidationError()`: Verifies HTTP 400 Bad Request with field error map when fields are missing or invalid.
* `testCreateStudent_DuplicateIdError()`: Verifies HTTP 409 Conflict when attempting to reuse an existing `studentId`.
* `testGetAllStudents()`: Verifies fetching student list returns HTTP 200 OK.
* `testGetStudentById_Success()`: Verifies fetching existing student by database ID.
* `testGetStudentById_NotFound()`: Verifies HTTP 404 Not Found for non-existent ID.
* `testUpdateStudent_Success()`: Verifies HTTP 200 OK after updating student fields.
* `testDeleteStudent_Success()`: Verifies HTTP 204 No Content after deleting student.

---

## 2. Manual Testing Scenarios (Postman / cURL)

### Scenario 1: Create Valid Student
```bash
curl -X POST http://localhost:8080/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "studentId": "STU101",
    "name": "Jane Smith",
    "email": "jane@college.edu",
    "department": "Computer Science",
    "year": "2nd Year",
    "phone": "9876543210"
  }'
```
* **Expected Result**: HTTP 201 Created with saved JSON object containing generated `id: 1`.

### Scenario 2: Duplicate Student ID
Repeat the above command with the same `studentId: "STU101"`.
* **Expected Result**: HTTP 409 Conflict with message `"Student ID 'STU101' already exists!"`.

### Scenario 3: Validation Error
```bash
curl -X POST http://localhost:8080/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "studentId": "",
    "name": "",
    "email": "bad-email",
    "department": "",
    "year": "",
    "phone": "123"
  }'
```
* **Expected Result**: HTTP 400 Bad Request containing validation error map for all invalid fields.

### Scenario 4: Delete Student
```bash
curl -X DELETE http://localhost:8080/api/students/1
```
* **Expected Result**: HTTP 204 No Content. Subsequent `GET http://localhost:8080/api/students/1` returns HTTP 404.

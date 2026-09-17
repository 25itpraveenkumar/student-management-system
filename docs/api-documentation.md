# REST API Documentation - Student Management System

Base URL: `http://localhost:8080/api/students`

---

## Endpoints

### 1. Get All Students / Search Students
* **Method**: `GET`
* **URL**: `/api/students`
* **Query Parameters**: `search` *(optional)* - Filter by Name, Email, Dept, or Student ID.
* **Success Response**: `200 OK`
* **Sample Payload**:
```json
[
  {
    "id": 1,
    "studentId": "STU101",
    "name": "John Doe",
    "email": "john@college.edu",
    "department": "Computer Science",
    "year": "2nd Year",
    "phone": "9876543210"
  },
  {
    "id": 2,
    "studentId": "STU102",
    "name": "Alice Smith",
    "email": "alice@college.edu",
    "department": "Information Technology",
    "year": "3rd Year",
    "phone": "9876543211"
  }
]
```

---

### 2. Get Student by ID
* **Method**: `GET`
* **URL**: `/api/students/{id}`
* **Success Response**: `200 OK`
* **Error Response**: `404 Not Found`
```json
{
  "timestamp": "2026-09-17T17:00:00.000",
  "status": 404,
  "error": "Not Found",
  "message": "Student not found with ID: 99"
}
```

---

### 3. Create Student
* **Method**: `POST`
* **URL**: `/api/students`
* **Request Body**:
```json
{
  "studentId": "STU103",
  "name": "Robert Brown",
  "email": "robert@college.edu",
  "department": "Mechanical Engineering",
  "year": "1st Year",
  "phone": "9876543212"
}
```
* **Success Response**: `201 Created`
* **Error Response (Duplicate Student ID)**: `409 Conflict`
```json
{
  "timestamp": "2026-09-17T17:00:00.000",
  "status": 409,
  "error": "Conflict",
  "message": "Student ID 'STU103' already exists!"
}
```
* **Error Response (Validation Failed)**: `400 Bad Request`
```json
{
  "timestamp": "2026-09-17T17:00:00.000",
  "status": 400,
  "error": "Validation Failed",
  "message": "Input validation failed for one or more fields",
  "errors": {
    "name": "Name is required",
    "email": "Email should be valid",
    "phone": "Phone number must be a 10-digit number"
  }
}
```

---

### 4. Update Student
* **Method**: `PUT`
* **URL**: `/api/students/{id}`
* **Request Body**:
```json
{
  "studentId": "STU103",
  "name": "Robert Brown Jr.",
  "email": "robert.jr@college.edu",
  "department": "Data Science",
  "year": "2nd Year",
  "phone": "9876543212"
}
```
* **Success Response**: `200 OK`
* **Error Responses**: `404 Not Found`, `400 Bad Request`, `409 Conflict`

---

### 5. Delete Student
* **Method**: `DELETE`
* **URL**: `/api/students/{id}`
* **Success Response**: `204 No Content`
* **Error Response**: `404 Not Found`

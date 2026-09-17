package com.college.studentmanagement.controller;

import com.college.studentmanagement.model.Student;
import com.college.studentmanagement.repository.StudentRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class StudentControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        studentRepository.deleteAll();
    }

    @Test
    void testCreateStudent_Success() throws Exception {
        Student student = new Student("STU101", "John Doe", "john@college.edu", "Computer Science", "2nd Year", "9876543210");

        mockMvc.perform(post("/api/students")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(student)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.studentId", is("STU101")))
                .andExpect(jsonPath("$.name", is("John Doe")))
                .andExpect(jsonPath("$.email", is("john@college.edu")));
    }

    @Test
    void testCreateStudent_ValidationError() throws Exception {
        Student student = new Student("", "", "invalid-email", "", "", "123");

        mockMvc.perform(post("/api/students")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(student)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status", is(400)))
                .andExpect(jsonPath("$.errors.name", is("Name is required")))
                .andExpect(jsonPath("$.errors.email", is("Email should be valid")));
    }

    @Test
    void testCreateStudent_DuplicateIdError() throws Exception {
        Student student1 = new Student("STU101", "John Doe", "john@college.edu", "Computer Science", "2nd Year", "9876543210");
        studentRepository.save(student1);

        Student student2 = new Student("STU101", "Jane Doe", "jane@college.edu", "Information Technology", "1st Year", "9876543211");

        mockMvc.perform(post("/api/students")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(student2)))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.status", is(409)))
                .andExpect(jsonPath("$.message", is("Student ID 'STU101' already exists!")));
    }

    @Test
    void testGetAllStudents() throws Exception {
        studentRepository.save(new Student("STU101", "John Doe", "john@college.edu", "Computer Science", "2nd Year", "9876543210"));
        studentRepository.save(new Student("STU102", "Alice Smith", "alice@college.edu", "Electronics", "3rd Year", "9876543211"));

        mockMvc.perform(get("/api/students"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)));
    }

    @Test
    void testGetStudentById_Success() throws Exception {
        Student saved = studentRepository.save(new Student("STU101", "John Doe", "john@college.edu", "Computer Science", "2nd Year", "9876543210"));

        mockMvc.perform(get("/api/students/" + saved.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.studentId", is("STU101")))
                .andExpect(jsonPath("$.name", is("John Doe")));
    }

    @Test
    void testGetStudentById_NotFound() throws Exception {
        mockMvc.perform(get("/api/students/9999"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.status", is(404)));
    }

    @Test
    void testUpdateStudent_Success() throws Exception {
        Student saved = studentRepository.save(new Student("STU101", "John Doe", "john@college.edu", "Computer Science", "2nd Year", "9876543210"));

        Student updateDetails = new Student("STU101", "John Updated", "john.updated@college.edu", "Data Science", "3rd Year", "9876543210");

        mockMvc.perform(put("/api/students/" + saved.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updateDetails)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name", is("John Updated")))
                .andExpect(jsonPath("$.department", is("Data Science")));
    }

    @Test
    void testDeleteStudent_Success() throws Exception {
        Student saved = studentRepository.save(new Student("STU101", "John Doe", "john@college.edu", "Computer Science", "2nd Year", "9876543210"));

        mockMvc.perform(delete("/api/students/" + saved.getId()))
                .andExpect(status().isNoContent());

        mockMvc.perform(get("/api/students/" + saved.getId()))
                .andExpect(status().isNotFound());
    }
}

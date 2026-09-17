package com.college.studentmanagement.service;

import com.college.studentmanagement.exception.DuplicateResourceException;
import com.college.studentmanagement.exception.ResourceNotFoundException;
import com.college.studentmanagement.model.Student;
import com.college.studentmanagement.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public List<Student> getAllStudents(String search) {
        if (search != null && !search.trim().isEmpty()) {
            return studentRepository.searchStudents(search.trim());
        }
        return studentRepository.findAll();
    }

    public Student getStudentById(Long id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with ID: " + id));
    }

    public Student createStudent(Student student) {
        if (studentRepository.existsByStudentId(student.getStudentId())) {
            throw new DuplicateResourceException("Student ID '" + student.getStudentId() + "' already exists!");
        }
        return studentRepository.save(student);
    }

    public Student updateStudent(Long id, Student studentDetails) {
        Student existingStudent = getStudentById(id);

        if (studentRepository.existsByStudentIdAndIdNot(studentDetails.getStudentId(), id)) {
            throw new DuplicateResourceException("Student ID '" + studentDetails.getStudentId() + "' is already assigned to another student!");
        }

        existingStudent.setStudentId(studentDetails.getStudentId());
        existingStudent.setName(studentDetails.getName());
        existingStudent.setEmail(studentDetails.getEmail());
        existingStudent.setDepartment(studentDetails.getDepartment());
        existingStudent.setYear(studentDetails.getYear());
        existingStudent.setPhone(studentDetails.getPhone());

        return studentRepository.save(existingStudent);
    }

    public void deleteStudent(Long id) {
        Student student = getStudentById(id);
        studentRepository.delete(student);
    }
}

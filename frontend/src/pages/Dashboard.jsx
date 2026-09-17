import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import StudentForm from '../components/StudentForm';
import StudentList from '../components/StudentList';
import ConfirmModal from '../components/ConfirmModal';
import NotificationToast from '../components/NotificationToast';
import { getStudents, createStudent, updateStudent, deleteStudent } from '../services/api';
import { Users, GraduationCap, Building2 } from 'lucide-react';

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isBackendConnected, setIsBackendConnected] = useState(true);

  const [editingStudent, setEditingStudent] = useState(null);
  const [deletingStudent, setDeletingStudent] = useState(null);
  const [backendFieldErrors, setBackendFieldErrors] = useState(null);

  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Fetch students from Spring Boot API
  const fetchStudents = useCallback(async (searchQuery = '') => {
    setIsLoading(true);
    try {
      const data = await getStudents(searchQuery);
      setStudents(data);
      setIsBackendConnected(true);
    } catch (error) {
      setIsBackendConnected(false);
      addToast(error.message, 'error');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch on mount & search changes with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchStudents(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search, fetchStudents]);

  // Handle Form Submission (Create or Update)
  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    setBackendFieldErrors(null);

    try {
      if (editingStudent) {
        // Update Student
        await updateStudent(editingStudent.id, formData);
        addToast(`Student "${formData.name}" updated successfully!`, 'success');
        setEditingStudent(null);
      } else {
        // Create Student
        await createStudent(formData);
        addToast(`Student "${formData.name}" registered successfully!`, 'success');
      }
      fetchStudents(search);
    } catch (error) {
      if (error.fieldErrors) {
        setBackendFieldErrors(error.fieldErrors);
      }
      addToast(error.message, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Edit Click
  const handleEditClick = (student) => {
    setEditingStudent(student);
    setBackendFieldErrors(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cancel Edit Mode
  const handleCancelEdit = () => {
    setEditingStudent(null);
    setBackendFieldErrors(null);
  };

  // Handle Delete Modal Trigger
  const handleDeleteClick = (student) => {
    setDeletingStudent(student);
  };

  // Confirm Delete Action
  const handleConfirmDelete = async () => {
    if (!deletingStudent) return;
    setIsDeleting(true);

    try {
      await deleteStudent(deletingStudent.id);
      addToast(`Student "${deletingStudent.name}" deleted successfully.`, 'success');
      setDeletingStudent(null);
      if (editingStudent && editingStudent.id === deletingStudent.id) {
        setEditingStudent(null);
      }
      fetchStudents(search);
    } catch (error) {
      addToast(error.message, 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  // Calculate dashboard stats summary
  const totalStudents = students.length;
  const totalDepartments = new Set(students.map((s) => s.department)).size;

  return (
    <div className="app-wrapper">
      <Navbar isBackendConnected={isBackendConnected} />

      <main className="main-container">
        {/* Header Title & Stats */}
        <div className="dashboard-header">
          <h1 className="dashboard-title">Student Management Dashboard</h1>
          <p className="dashboard-subtitle">
            Manage college student registrations, view profiles, filter records, and update details.
          </p>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <Users size={24} />
              </div>
              <div>
                <div className="stat-number">{totalStudents}</div>
                <div className="stat-label">Total Registered Students</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon" style={{ background: 'rgba(168, 85, 247, 0.15)', color: '#c084fc' }}>
                <Building2 size={24} />
              </div>
              <div>
                <div className="stat-number">{totalDepartments}</div>
                <div className="stat-label">Active Departments</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>
                <GraduationCap size={24} />
              </div>
              <div>
                <div className="stat-number">REST API</div>
                <div className="stat-label">Spring Boot + JPA Connected</div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Main Grid: Form (Left) & List (Right) */}
        <div className="dashboard-grid">
          {/* Left Column: Form */}
          <div>
            <StudentForm
              editingStudent={editingStudent}
              onSubmit={handleFormSubmit}
              onCancelEdit={handleCancelEdit}
              isSubmitting={isSubmitting}
              backendFieldErrors={backendFieldErrors}
            />
          </div>

          {/* Right Column: Search + Table */}
          <div>
            <SearchBar search={search} setSearch={setSearch} totalRecords={totalStudents} />
            <StudentList
              students={students}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
              isLoading={isLoading}
            />
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>Student Management System • College CRUD Web Application Activity</p>
      </footer>

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={!!deletingStudent}
        title="Confirm Student Deletion"
        message={
          deletingStudent
            ? `Are you sure you want to delete student "${deletingStudent.name}" (${deletingStudent.studentId})? This operation cannot be reversed.`
            : ''
        }
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingStudent(null)}
        isDeleting={isDeleting}
      />

      {/* Toast Notification Container */}
      <NotificationToast toasts={toasts} removeToast={removeToast} />
    </div>
  );
};

export default Dashboard;

import React, { useState, useEffect } from 'react';
import { UserPlus, Save, AlertCircle, RefreshCw } from 'lucide-react';

const DEPARTMENTS = [
  'Computer Science',
  'Information Technology',
  'Electronics & Communication',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Data Science',
];

const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

const initialFormState = {
  studentId: '',
  name: '',
  email: '',
  department: '',
  year: '',
  phone: '',
};

const StudentForm = ({ editingStudent, onSubmit, onCancelEdit, isSubmitting, backendFieldErrors }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingStudent) {
      setFormData({
        studentId: editingStudent.studentId || '',
        name: editingStudent.name || '',
        email: editingStudent.email || '',
        department: editingStudent.department || '',
        year: editingStudent.year || '',
        phone: editingStudent.phone || '',
      });
      setErrors({});
    } else {
      setFormData(initialFormState);
      setErrors({});
    }
  }, [editingStudent]);

  // Sync backend field-level validation errors into state if present
  useEffect(() => {
    if (backendFieldErrors) {
      setErrors(backendFieldErrors);
    }
  }, [backendFieldErrors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for field on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.studentId.trim()) {
      newErrors.studentId = 'Student ID is required';
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.department) {
      newErrors.department = 'Department is required';
    }

    if (!formData.year) {
      newErrors.year = 'Year is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Phone number must be exactly 10 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const handleReset = () => {
    setFormData(initialFormState);
    setErrors({});
    if (editingStudent) {
      onCancelEdit();
    }
  };

  return (
    <div className="form-card">
      <div className="form-header">
        <h2 className="form-title">
          {editingStudent ? <Save size={20} /> : <UserPlus size={20} />}
          {editingStudent ? 'Edit Student' : 'Add New Student'}
        </h2>
        {editingStudent && (
          <button type="button" className="btn-cancel-edit" onClick={onCancelEdit}>
            Cancel Edit
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {/* Student ID */}
        <div className="form-group">
          <label className="form-label" htmlFor="studentId">Student ID *</label>
          <input
            id="studentId"
            type="text"
            name="studentId"
            className={`form-input ${errors.studentId ? 'has-error' : ''}`}
            placeholder="e.g. STU101"
            value={formData.studentId}
            onChange={handleChange}
          />
          {errors.studentId && (
            <div className="error-text">
              <AlertCircle size={12} /> {errors.studentId}
            </div>
          )}
        </div>

        {/* Name */}
        <div className="form-group">
          <label className="form-label" htmlFor="name">Full Name *</label>
          <input
            id="name"
            type="text"
            name="name"
            className={`form-input ${errors.name ? 'has-error' : ''}`}
            placeholder="e.g. Alex Johnson"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && (
            <div className="error-text">
              <AlertCircle size={12} /> {errors.name}
            </div>
          )}
        </div>

        {/* Email */}
        <div className="form-group">
          <label className="form-label" htmlFor="email">Email Address *</label>
          <input
            id="email"
            type="email"
            name="email"
            className={`form-input ${errors.email ? 'has-error' : ''}`}
            placeholder="e.g. alex@college.edu"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <div className="error-text">
              <AlertCircle size={12} /> {errors.email}
            </div>
          )}
        </div>

        {/* Department */}
        <div className="form-group">
          <label className="form-label" htmlFor="department">Department *</label>
          <select
            id="department"
            name="department"
            className={`form-select ${errors.department ? 'has-error' : ''}`}
            value={formData.department}
            onChange={handleChange}
          >
            <option value="">Select Department</option>
            {DEPARTMENTS.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          {errors.department && (
            <div className="error-text">
              <AlertCircle size={12} /> {errors.department}
            </div>
          )}
        </div>

        {/* Year */}
        <div className="form-group">
          <label className="form-label" htmlFor="year">Academic Year *</label>
          <select
            id="year"
            name="year"
            className={`form-select ${errors.year ? 'has-error' : ''}`}
            value={formData.year}
            onChange={handleChange}
          >
            <option value="">Select Year</option>
            {YEARS.map((yr) => (
              <option key={yr} value={yr}>
                {yr}
              </option>
            ))}
          </select>
          {errors.year && (
            <div className="error-text">
              <AlertCircle size={12} /> {errors.year}
            </div>
          )}
        </div>

        {/* Phone */}
        <div className="form-group">
          <label className="form-label" htmlFor="phone">Phone Number *</label>
          <input
            id="phone"
            type="text"
            name="phone"
            className={`form-input ${errors.phone ? 'has-error' : ''}`}
            placeholder="10-digit phone number"
            value={formData.phone}
            onChange={handleChange}
            maxLength={10}
          />
          {errors.phone && (
            <div className="error-text">
              <AlertCircle size={12} /> {errors.phone}
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <RefreshCw size={16} className="animate-spin" /> Saving...
              </>
            ) : editingStudent ? (
              <>
                <Save size={16} /> Update Student
              </>
            ) : (
              <>
                <UserPlus size={16} /> Add Student
              </>
            )}
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentForm;

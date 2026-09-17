import React from 'react';
import { Edit2, Trash2, Users, Mail, Phone, Building, Calendar } from 'lucide-react';

const StudentList = ({ students, onEdit, onDelete, isLoading }) => {
  if (isLoading) {
    return (
      <div className="table-card">
        <div className="empty-state">
          <div className="empty-title">Loading student records...</div>
        </div>
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <div className="table-card">
        <div className="empty-state">
          <Users className="empty-icon" />
          <div className="empty-title">No Students Found</div>
          <p>Get started by adding a student record or changing your search criteria.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="table-card">
      <div className="table-responsive">
        <table className="student-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Student Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Year</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>
                  <span className="student-id-badge">{student.studentId}</span>
                </td>
                <td>
                  <strong style={{ color: '#fff' }}>{student.name}</strong>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#94a3b8' }}>
                    <Mail size={14} /> {student.email}
                  </div>
                </td>
                <td>
                  <span className="dept-badge">
                    <Building size={12} style={{ display: 'inline', marginRight: '4px' }} />
                    {student.department}
                  </span>
                </td>
                <td>
                  <span className="year-badge">
                    <Calendar size={12} style={{ display: 'inline', marginRight: '4px' }} />
                    {student.year}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#94a3b8' }}>
                    <Phone size={14} /> {student.phone}
                  </div>
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="btn-icon edit"
                      onClick={() => onEdit(student)}
                      title="Edit Student Information"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      className="btn-icon delete"
                      onClick={() => onDelete(student)}
                      title="Delete Student Record"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentList;

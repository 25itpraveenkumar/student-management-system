import React from 'react';
import { AlertTriangle } from 'lucide-react';

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel, isDeleting }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <div className="modal-icon">
            <AlertTriangle size={24} />
          </div>
          <h3 className="modal-title">{title || 'Confirm Action'}</h3>
        </div>
        <div className="modal-body">
          {message || 'Are you sure you want to proceed? This action cannot be undone.'}
        </div>
        <div className="modal-actions">
          <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={isDeleting}>
            Cancel
          </button>
          <button type="button" className="btn btn-danger" onClick={onConfirm} disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Delete Student'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;

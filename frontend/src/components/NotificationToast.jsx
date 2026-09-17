import React from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

const NotificationToast = ({ toasts, removeToast }) => {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast ${toast.type}`}>
          {toast.type === 'success' ? (
            <CheckCircle size={20} color="#4ade80" />
          ) : (
            <AlertCircle size={20} color="#f87171" />
          )}
          <div className="toast-message">{toast.message}</div>
          <button className="toast-close" onClick={() => removeToast(toast.id)}>
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationToast;

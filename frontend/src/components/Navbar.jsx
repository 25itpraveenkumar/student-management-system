import React from 'react';
import { GraduationCap, Server } from 'lucide-react';

const Navbar = ({ isBackendConnected }) => {
  return (
    <header className="navbar">
      <div className="navbar-content">
        <a href="#" className="brand">
          <div className="brand-icon">
            <GraduationCap size={26} />
          </div>
          <span className="brand-title">Student Management System</span>
        </a>

        <div className="badge-backend">
          <Server size={14} />
          <span>Spring Boot Backend</span>
          <span
            className="status-dot"
            style={{
              background: isBackendConnected ? '#4ade80' : '#f87171',
              boxShadow: isBackendConnected
                ? '0 0 8px #4ade80'
                : '0 0 8px #f87171',
            }}
          ></span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

// src/frontend/components/IncidentTikTok.jsx
import React from 'react';
import './Incidents.css';

const IncidentTikTok = () => {
  const columns = ["No.", "Incident", "URL", "Date Reported", "Status", "Officer Responsible"];

  return (
    <div className="incident-page">
      <div className="incident-icon-placeholder" style={{background: '#000000'}}></div>
      <h1 className="page-title">TikTok Incidents</h1>

      <div className="stat-box active"><span className="stat-label">Active</span><span className="stat-count">0</span></div>
      <div className="stat-box pending"><span className="stat-label">Pending</span><span className="stat-count">0</span></div>
      <div className="stat-box resolved"><span className="stat-label">Resolved</span><span className="stat-count">0</span></div>

      <div className="main-table-container">
        <div className="table-header-row">
          {columns.map((col, index) => (
            <div key={index} className="header-item">{col}</div>
          ))}
        </div>
        <div className="empty-row">No data available for TikTok.</div>
      </div>
    </div>
  );
};

export default IncidentTikTok;
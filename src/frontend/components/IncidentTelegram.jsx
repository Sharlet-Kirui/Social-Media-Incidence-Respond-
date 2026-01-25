// src/frontend/components/IncidentTelegram.jsx
import React from 'react';
import './Incidents.css';

const IncidentTelegram = () => {
  const columns = ["No", "Incident", "Username", "Date Reported", "Status"];

  return (
    <div className="incident-page">
      <div className="incident-icon-placeholder" style={{background: '#24A1DE'}}></div>
      <h1 className="page-title">Telegram Incidents</h1>
      
      <div className="stat-box active"><span className="stat-label">Active</span><span className="stat-count">0</span></div>
      <div className="stat-box pending"><span className="stat-label">Pending</span><span className="stat-count">0</span></div>
      <div className="stat-box resolved"><span className="stat-label">Resolved</span><span className="stat-count">0</span></div>

      <div className="main-table-container">
        <div className="table-header-row">
          {columns.map((col, index) => (
            <div key={index} className="header-item">{col}</div>
          ))}
        </div>
        <div className="empty-row">No data available for Telegram.</div>
      </div>
    </div>
  );
};

export default IncidentTelegram;
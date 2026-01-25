// src/frontend/components/IncidentX.jsx
import React from 'react';
import './Incidents.css';

const IncidentX = () => {
  const columns = ["No.", "Account Name", "Platform", "URL", "Date Reported", "Status", "Officer Responsible"];

  return (
    <div className="incident-page">
      <div className="incident-icon-placeholder"></div>
      <h1 className="page-title">X Incidents</h1>
      <p style={{position: 'absolute', left: '135px', top: '160px', color: 'gray'}}>0 incidents</p>

      {/* Stats */}
      <div className="stat-box active"><span className="stat-label">Active</span><span className="stat-count">0</span></div>
      <div className="stat-box pending"><span className="stat-label">Pending</span><span className="stat-count">0</span></div>
      <div className="stat-box resolved"><span className="stat-label">Resolved</span><span className="stat-count">0</span></div>

      {/* Filters */}
      <div className="filter-group" style={{left: '65px', top: '278px'}}>Filter by Date</div>
      <div className="filter-group" style={{left: '303px', top: '278px'}}>Filter by Status</div>
      <button className="btn-apply">Apply Filters</button>
      <button className="btn-add-incident">Add New Incident</button>

      {/* Table */}
      <div className="main-table-container">
        <div className="table-header-row">
          {columns.map((col, index) => (
            <div key={index} className="header-item">{col}</div>
          ))}
        </div>
        <div className="empty-row">No data available for X.</div>
      </div>
    </div>
  );
};

export default IncidentX;
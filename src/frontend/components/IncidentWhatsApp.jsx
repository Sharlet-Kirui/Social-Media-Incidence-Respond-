import React, { useState } from 'react';
import './IncidentWhatsApp.css';

const IncidentWhatsApp = () => {
  // State to handle modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <div className="incident-whatsapp-container">
      {/* 1. Header Section */}
      <div className="header-section">
        <div className="icon-wrapper">
          <div className="chat-icon">
            <svg width="35" height="35" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H6L4 18V4H20V16Z" fill="white"/>
            </svg>
          </div>
        </div>
        <div className="header-text">
          <h1>WhatsApp Incidents</h1>
          <p>0 incidents</p>
        </div>
        {/* 2. Stats Cards Section */}
      <div className="stats-container">
        <div className="stat-card">
          <h3>Active</h3>
          <span className="stat-number">0</span>
        </div>
        <div className="stat-card">
          <h3>Pending</h3>
          <span className="stat-number">0</span>
        </div>
        <div className="stat-card">
          <h3>Resolved</h3>
          <span className="stat-number">0</span>
        </div>
      </div>
      </div>

      

      {/* 3. Actions Section (Filters left, Add button right) */}
      <div className="action-bar">
        <div className="left-actions">
          <input type="text" placeholder="Filter by Date" className="filter-input" />
          <input type="text" placeholder="Filter by Status" className="filter-input" />
          <button className="btn-primary">Apply Filters</button>
        </div>
        <div className="right-actions">
          {/* Button triggers the modal */}
          <button className="btn-primary" onClick={toggleModal}>Add New Incident</button>
        </div>
      </div>

      {/* 4. Table Section */}
      <div className="table-container">
        <div className="table-header">
          <div className="th-cell col-no">No</div>
          <div className="th-cell col-mobile">Mobile Number</div>
          <div className="th-cell col-date">Date Reported</div>
          <div className="th-cell col-status">Status</div>
          <div className="th-cell col-officer">Officer</div>
        </div>
        
        {/* Empty Table Body */}
        <div className="table-body-empty">
          {/* Rows would go here */}
        </div>
      </div>

      {/* --- POP-UP MODAL START --- */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={toggleModal}>
          {/* Stop propagation so clicking inside the form doesn't close it */}
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">Add New Incident</h2>
            
            <form className="modal-form">
              {/* Mobile Number */}
              <div className="form-group">
                <label>Mobile Number</label>
                <input type="text" placeholder="Value" />
              </div>

              {/* Date Reported */}
              <div className="form-group">
                <label>Date Reported</label>
                {/* Using date input, but styled to match design */}
                <input type="date" placeholder="Value" />
              </div>

              {/* Status */}
              <div className="form-group">
                <label>Status</label>
                <select defaultValue="">
                  <option value="" disabled>Value</option>
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>

              {/* Officer */}
              <div className="form-group">
                <label>Officer</label>
                <input type="text" placeholder="Value" />
              </div>

              {/* Add Button */}
              <div className="modal-actions">
                <button type="button" className="btn-add">Add</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* --- POP-UP MODAL END --- */}
    </div>
  );
};

export default IncidentWhatsApp;
import React, { useState } from 'react';
import { Plus, Edit2, MoreHorizontal, Trash } from "lucide-react";
import '../global.css';

const emptyForm = {
  mobileNumber: "",
  dateReported: "",
  status: "Active",
  officer: "",
};

const IncidentWhatsApp = () => {
  // State Management
  const [rows, setRows] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [editingIndex, setEditingIndex] = useState(null);
  const [menuIndex, setMenuIndex] = useState(null);
  
  // --- Search & Filter States ---
  const [searchTerm, setSearchTerm] = useState("");
  const [tempFilterDate, setTempFilterDate] = useState("");
  const [tempFilterStatus, setTempFilterStatus] = useState("");
  const [appliedFilters, setAppliedFilters] = useState({ date: "", status: "" });

  // Calculate Stats
  const activeCount = rows.filter(r => r.status === "Active").length;
  const pendingCount = rows.filter(r => r.status === "Pending").length;
  const resolvedCount = rows.filter(r => r.status === "Resolved").length;

  // --- Handlers ---
  const openCreate = () => {
    setFormData(emptyForm);
    setEditingIndex(null);
    setIsModalOpen(true);
  };

  const openEdit = (index) => {
    setFormData(rows[index]);
    setEditingIndex(index);
    setIsModalOpen(true);
    setMenuIndex(null);
  };

  const handleSubmit = () => {
    if (editingIndex !== null) {
      const updated = [...rows];
      updated[editingIndex] = formData;
      setRows(updated);
    } else {
      setRows([...rows, formData]);
    }
    setIsModalOpen(false);
    setFormData(emptyForm);
  };

  const handleDelete = (index) => {
    setRows(rows.filter((_, i) => i !== index));
    setMenuIndex(null);
  };

  // --- Filter Logic ---
  const handleApplyFilters = () => {
    setAppliedFilters({
      date: tempFilterDate,
      status: tempFilterStatus
    });
  };

  const filteredRows = rows.filter(row => {
    const matchesSearch = row.mobileNumber.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDate = appliedFilters.date 
      ? row.dateReported === appliedFilters.date 
      : true;

    const matchesStatus = appliedFilters.status 
      ? row.status === appliedFilters.status 
      : true;

    return matchesSearch && matchesDate && matchesStatus;
  });

  return (
    <div className="page-container">
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
          <p>{rows.length} incidents found</p>
        </div>
      </div>

      {/* 2. Stats Cards Section */}
      <div className="stats-container">
        <div className="stat-card">
          <h3>Active</h3>
          <span className="stat-number">{activeCount}</span>
        </div>
        <div className="stat-card">
          <h3>Pending</h3>
          <span className="stat-number">{pendingCount}</span>
        </div>
        <div className="stat-card">
          <h3>Resolved</h3>
          <span className="stat-number">{resolvedCount}</span>
        </div>
      </div>

      {/* 3. Actions Section */}
      <div className="action-bar">
        {/* Left: Filters */}
        <div className="left-actions">
           {/* Date Filter */}
           <input 
            type="date" 
            className="filter-input" 
            value={tempFilterDate}
            onChange={(e) => setTempFilterDate(e.target.value)}
          />

          {/* Status Filter */}
          <select 
            className="filter-input"
            value={tempFilterStatus}
            onChange={(e) => setTempFilterStatus(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Resolved">Resolved</option>
          </select>

          <button className="btn-primary" onClick={handleApplyFilters}>Apply Filters</button>
        </div>
        
        {/* Middle: Search */}
        <div className="center-actions">
          <input 
            type="text" 
            placeholder="Search Mobile Number" 
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Right: Add Button */}
        <div className="right-actions">
          <button className="btn-primary" onClick={openCreate}>
            <Plus size={18} /> Add New Incident
          </button>
        </div>
      </div>

      {/* 4. Table Section */}
      <div className="table-container">
        <div className="table-header">
          <div className="th-cell col-wa-no">No</div>
          <div className="th-cell col-wa-mobile">Mobile Number</div>
          <div className="th-cell col-wa-date">Date Reported</div>
          <div className="th-cell col-wa-status">Status</div>
          <div className="th-cell col-wa-officer">Officer</div>
          <div className="th-cell col-wa-action">Action</div>
        </div>
        
        {/* Table Body */}
        {filteredRows.length > 0 ? (
          filteredRows.map((row, i) => (
            <div key={i} className="table-row">
              <div className="td-cell col-wa-no">{i + 1}</div>
              <div className="td-cell col-wa-mobile">{row.mobileNumber}</div>
              <div className="td-cell col-wa-date">{row.dateReported}</div>
              <div className="td-cell col-wa-status">
                <span className={`status-badge ${
                    row.status === "Active" ? "status-active" : 
                    row.status === "Pending" ? "status-pending" : "status-resolved"
                }`}>
                  {row.status}
                </span>
              </div>
              <div className="td-cell col-wa-officer">{row.officer}</div>
              
              <div className="td-cell col-wa-action relative">
                <div className="action-btn-group">
                  <button onClick={() => openEdit(i)} className="icon-btn">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => setMenuIndex(menuIndex === i ? null : i)} className="icon-btn">
                    <MoreHorizontal size={16} />
                  </button>
                </div>

                {/* Dropdown Menu */}
                {menuIndex === i && (
                  <div className="dropdown-menu">
                    <button onClick={() => handleDelete(i)} className="dropdown-item danger">
                      <Trash size={14} /> Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="table-body-empty">No incidents found.</div>
        )}
      </div>

      {/* --- POP-UP MODAL START --- */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">
              {editingIndex !== null ? "Edit Incident" : "Add New Incident"}
            </h2>
            
            <div className="modal-form">
              <div className="form-group">
                <label>Mobile Number</label>
                <input 
                  type="text" 
                  placeholder="Value" 
                  value={formData.mobileNumber}
                  onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Date Reported</label>
                <input 
                  type="date" 
                  value={formData.dateReported}
                  onChange={(e) => setFormData({ ...formData, dateReported: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Status</label>
                <select 
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>

              <div className="form-group">
                <label>Officer</label>
                <input 
                  type="text" 
                  placeholder="Value" 
                  value={formData.officer}
                  onChange={(e) => setFormData({ ...formData, officer: e.target.value })}
                />
              </div>

              <div className="modal-actions">
                 <button className="btn-cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
                 <button className="btn-add" onClick={handleSubmit}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* --- POP-UP MODAL END --- */}
    </div>
  );
};

export default IncidentWhatsApp;
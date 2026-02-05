import React, { useState } from "react";
import { Plus, Edit2, MoreHorizontal, Trash, Copy } from "lucide-react";
import '../global.css';

const emptyForm = {
  incident: "",
  username: "",
  dateReported: "",
  status: "Active",
};

export default function IncidentTelegram() {
  const [rows, setRows] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
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
    setIsOpen(true);
  };

  const openEdit = (index) => {
    setFormData(rows[index]);
    setEditingIndex(index);
    setIsOpen(true);
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
    setIsOpen(false);
    setFormData(emptyForm);
  };

  const handleDelete = (index) => {
    setRows(rows.filter((_, i) => i !== index));
    setMenuIndex(null);
  };

  const handleDuplicate = (index) => {
    setRows([...rows, { ...rows[index] }]);
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
    // 1. Search Check (Incident or Username)
    const matchesSearch = 
      row.incident.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.username.toLowerCase().includes(searchTerm.toLowerCase());

    // 2. Date Check
    const matchesDate = appliedFilters.date 
      ? row.dateReported === appliedFilters.date 
      : true;

    // 3. Status Check
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
            {/* Telegram Logo SVG */}
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.68 3.32a2.3 2.3 0 0 0-2.35-.38l-17 6.6a2.3 2.3 0 0 0 .1 4.28l4.9 1.52 1.9 5.7a1.2 1.2 0 0 0 2.2 0l2.3-4.1 6.3 4.6a2.3 2.3 0 0 0 3.7-1.7V4.3a2.3 2.3 0 0 0-.35-1zM6.9 14.6l12.1-8.1-10 9.7z" fill="white"/>
            </svg>
          </div>
        </div>
        <div className="header-text">
          <h1>Telegram Incidents</h1>
          <p>{rows.length} records found</p>
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
              placeholder="Search Incident or Username" 
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
           />
        </div>

        {/* Right: Add Button */}
        <div className="right-actions">
          <button className="btn-primary" onClick={openCreate}>
            <Plus size={18} /> Add New
          </button>
        </div>
      </div>

      {/* 4. Table Section */}
      <div className="table-container">
        <div className="table-header">
          <div className="th-cell col-tg-no">No.</div>
          <div className="th-cell col-tg-incident">Incident</div>
          <div className="th-cell col-tg-username">Username</div>
          <div className="th-cell col-tg-date">Date Reported</div>
          <div className="th-cell col-tg-status">Status</div>
          <div className="th-cell col-tg-action">Action</div>
        </div>

        {/* Table Body */}
        {filteredRows.length > 0 ? (
          filteredRows.map((row, i) => (
            <div key={i} className="table-row">
              <div className="td-cell col-tg-no">{i + 1}</div>
              <div className="td-cell col-tg-incident">{row.incident}</div>
              <div className="td-cell col-tg-username">{row.username}</div>
              <div className="td-cell col-tg-date">{row.dateReported}</div>
              <div className="td-cell col-tg-status">
                <span className={`status-badge ${
                    row.status === "Active" ? "status-active" : 
                    row.status === "Pending" ? "status-pending" : "status-resolved"
                }`}>
                  {row.status}
                </span>
              </div>
              
              <div className="td-cell col-tg-action relative">
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
                    <button onClick={() => handleDuplicate(i)} className="dropdown-item">
                      <Copy size={14} /> Duplicate
                    </button>
                    <button onClick={() => handleDelete(i)} className="dropdown-item danger">
                      <Trash size={14} /> Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="table-body-empty">No records found</div>
        )}
      </div>

      {/* --- POP-UP MODAL --- */}
      {isOpen && (
        <div className="modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">{editingIndex !== null ? "Edit Incident" : "Add New Incident"}</h2>
            
            <div className="modal-form">
              <div className="form-group">
                <label>Incident</label>
                <input 
                  placeholder="Value" 
                  value={formData.incident} 
                  onChange={(e) => setFormData({ ...formData, incident: e.target.value })} 
                />
              </div>

              <div className="form-group">
                <label>Username</label>
                <input 
                  placeholder="Value" 
                  value={formData.username} 
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })} 
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

              <div className="modal-actions">
                <button onClick={() => setIsOpen(false)} className="btn-cancel">Cancel</button>
                <button onClick={handleSubmit} className="btn-add">Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
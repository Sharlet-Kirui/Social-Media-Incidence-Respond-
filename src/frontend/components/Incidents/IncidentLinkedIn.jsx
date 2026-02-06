import React, { useState } from "react";
import { Plus, Edit2, MoreHorizontal, Trash, Copy } from "lucide-react";
import '../global.css';

const emptyForm = {
  accountName: "", // Maps to Account Name / Description
  url: "",
  dateReported: "",
  status: "Pending",
  officer: "",
};

export default function IncidentLinkedIn() {
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
  const pendingCount = rows.filter(r => r.status === "Pending").length;
  const resolvedCount = rows.filter(r => r.status === "Resolved").length;
  const rejectedCount = rows.filter(r => r.status === "Rejected").length;

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
    // 1. Search Check (Name or URL)
    const matchesSearch = 
      row.accountName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.url.toLowerCase().includes(searchTerm.toLowerCase());

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
            {/* LinkedIn Logo SVG */}
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 3H5C3.895 3 3 3.895 3 5V19C3 20.105 3.895 21 5 21H19C20.105 21 21 20.105 21 19V5C21 3.895 20.105 3 19 3ZM8.5 19H5.5V9H8.5V19ZM7 7.69C6.17 7.69 5.5 7.02 5.5 6.19C5.5 5.36 6.17 4.69 7 4.69C7.83 4.69 8.5 5.36 8.5 6.19C8.5 7.02 7.83 7.69 7 7.69ZM18.5 19H15.5V14.5C15.5 13.12 14.38 12 13 12C11.62 12 10.5 13.12 10.5 14.5V19H7.5V9H10.5V10.3C11.16 9.38 12.38 8.8 13.5 8.8C16.26 8.8 18.5 11.04 18.5 13.8V19Z" fill="white"/>
            </svg>
          </div>
        </div>
        <div className="header-text">
          <h1>LinkedIn Incidents</h1>
          <p>{rows.length} records found</p>
        </div>
      </div>

      {/* 2. Stats Cards Section */}
      <div className="stats-container">
        <div className="stat-card">
          <h3>Pending</h3>
          <span className="stat-number">{pendingCount}</span>
        </div>
        <div className="stat-card">
          <h3>Resolved</h3>
          <span className="stat-number">{resolvedCount}</span>
        </div>
        <div className="stat-card">
          <h3>Rejected</h3>
          <span className="stat-number">{rejectedCount}</span>
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
            <option value="Pending">Pending</option>
            <option value="Resolved">Resolved</option>
            <option value="Rejected">Rejected</option>
          </select>
          
          <button className="btn-primary" onClick={handleApplyFilters}>Apply Filters</button>
        </div>

        {/* Middle: Search */}
        <div className="center-actions">
           <input 
              type="text" 
              placeholder="Search Name or URL" 
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
          <div className="th-cell col-li-no">No.</div>
          <div className="th-cell col-li-name">Account Name / Description</div>
          <div className="th-cell col-li-url">URL</div>
          <div className="th-cell col-li-date">Date Reported</div>
          <div className="th-cell col-li-status">Status</div>
          <div className="th-cell col-li-officer">Officer Responsible</div>
          <div className="th-cell col-li-action">Action</div>
        </div>

        {/* Table Body */}
        {filteredRows.length > 0 ? (
          filteredRows.map((row, i) => (
            <div key={i} className="table-row">
              <div className="td-cell col-li-no">{i + 1}</div>
              <div className="td-cell col-li-name">{row.accountName}</div>
              <div className="td-cell col-li-url">{row.url}</div>
              <div className="td-cell col-li-date">{row.dateReported}</div>
              <div className="td-cell col-li-status">
                <span className={`status-badge ${
                    row.status === "Rejected" ? "status-rejected" : 
                    row.status === "Pending" ? "status-pending" : "status-resolved"
                }`}>
                  {row.status}
                </span>
              </div>
              <div className="td-cell col-li-officer">{row.officer}</div>
              
              <div className="td-cell col-li-action relative">
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
            <h2 className="modal-title">{editingIndex !== null ? "Edit Record" : "Create Record"}</h2>
            
            <div className="modal-form">
              <div className="form-group">
                <label>Account Name / Description</label>
                <input 
                  placeholder="Value" 
                  value={formData.accountName} 
                  onChange={(e) => setFormData({ ...formData, accountName: e.target.value })} 
                />
              </div>

              <div className="form-group">
                <label>URL</label>
                <input 
                  placeholder="Value" 
                  value={formData.url} 
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })} 
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
                <label>Officer Responsible</label>
                <input 
                  placeholder="Value" 
                  value={formData.officer} 
                  onChange={(e) => setFormData({ ...formData, officer: e.target.value })} 
                />
              </div>

              <div className="form-group">
                <label>Status</label>
                <select 
                  value={formData.status} 
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="Pending">Pending</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Rejected">Rejected</option>
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
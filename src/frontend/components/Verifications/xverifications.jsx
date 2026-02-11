import React, { useState } from "react";
import { Plus, Edit2, MoreHorizontal, Trash, Copy } from "lucide-react";
import '../global.css';

const emptyForm = {
  accountName: "",
  platform: "X (Twitter)",
  url: "",
  dateReported: "",
  status: "Rejected",
  officer: "",
};

export default function XVerifications() {
  const [rows, setRows] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [editingIndex, setEditingIndex] = useState(null);
  const [menuIndex, setMenuIndex] = useState(null);
  
  // --- Search & Filter States ---
  const [searchTerm, setSearchTerm] = useState("");
  
  // 1. Temporary State (What the user selects in the inputs)
  const [tempFilterDate, setTempFilterDate] = useState("");
  const [tempFilterStatus, setTempFilterStatus] = useState("");

  // 2. Rejected State (What is actually applied to the table)
  const [appliedFilters, setAppliedFilters] = useState({
    date: "",
    status: ""
  });

  // Calculate Stats
  const rejectedCount = rows.filter(r => r.status === "Rejected").length;
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
  
  // Triggered when "Apply Filters" is clicked
  const handleApplyFilters = () => {
    setAppliedFilters({
      date: tempFilterDate,
      status: tempFilterStatus
    });
  };

  // Combined Filter: Search + Date + Status
  const filteredRows = rows.filter(row => {
    // 1. Search Check
    const matchesSearch = 
      row.accountName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.url.toLowerCase().includes(searchTerm.toLowerCase());

    // 2. Date Check (If filter is set, match exact date)
    const matchesDate = appliedFilters.date 
      ? row.dateReported === appliedFilters.date 
      : true;

    // 3. Status Check (If filter is set, match status)
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
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="white"/>
            </svg>
          </div>
        </div>
        <div className="header-text">
          <h1>X Verifications</h1>
          <p>{rows.length} records found</p>
        </div>
      </div>

      {/* 2. Stats Cards Section */}
      <div className="stats-container">
        <div className="stat-card">
          <h3>Rejected</h3>
          <span className="stat-number">{rejectedCount}</span>
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
        {/* Left: Filters (Updated to match Form) */}
        <div className="left-actions">
          
          {/* Date Picker Filter */}
          <input 
            type="date" 
            className="filter-input" 
            value={tempFilterDate}
            onChange={(e) => setTempFilterDate(e.target.value)}
          />

          {/* Status Dropdown Filter */}
          <select 
            className="filter-input"
            value={tempFilterStatus}
            onChange={(e) => setTempFilterStatus(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="Rejected">Rejected</option>
            <option value="Pending">Pending</option>
            <option value="Resolved">Resolved</option>
          </select>

          <button className="btn-primary" onClick={handleApplyFilters}>
            Apply Filters
          </button>
        </div>

        {/* Middle: Search */}
        <div className="center-actions">
           <input 
              type="text" 
              placeholder="Search Account or URL" 
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
          <div className="th-cell col-xv-no">No.</div>
          <div className="th-cell col-xv-name">Account Name</div>
          <div className="th-cell col-xv-platform">Platform</div>
          <div className="th-cell col-xv-url">URL</div>
          <div className="th-cell col-xv-date">Date Reported</div>
          <div className="th-cell col-xv-status">Status</div>
          <div className="th-cell col-xv-officer">Officer</div>
          <div className="th-cell col-xv-action">Action</div>
        </div>

        {/* Table Body */}
        {filteredRows.length > 0 ? (
          filteredRows.map((row, i) => (
            <div key={i} className="table-row">
              <div className="td-cell col-xv-no">{i + 1}</div>
              <div className="td-cell col-xv-name">{row.accountName}</div>
              <div className="td-cell col-xv-platform">{row.platform}</div>
              <div className="td-cell col-xv-url">{row.url}</div>
              <div className="td-cell col-xv-date">{row.dateReported}</div>
              <div className="td-cell col-xv-status">
                <span className={`status-badge ${
                    row.status === "Rejected" ? "status-rejected" : 
                    row.status === "Pending" ? "status-pending" : "status-resolved"
                }`}>
                  {row.status}
                </span>
              </div>
              <div className="td-cell col-xv-officer">{row.officer}</div>
              
              <div className="td-cell col-xv-action relative">
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
                <label>Account Name</label>
                <input 
                  placeholder="Value" 
                  value={formData.accountName} 
                  onChange={(e) => setFormData({ ...formData, accountName: e.target.value })} 
                />
              </div>

              <div className="form-group">
                <label>Platform</label>
                <input 
                  placeholder="Value" 
                  value={formData.platform} 
                  onChange={(e) => setFormData({ ...formData, platform: e.target.value })} 
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
                  <option value="Rejected">Rejected</option>
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
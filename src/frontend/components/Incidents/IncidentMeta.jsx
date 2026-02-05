import React, { useState } from "react";
import { Plus, Edit2, MoreHorizontal, Trash, Copy } from "lucide-react";
import '../global.css';

const emptyForm = {
  accountName: "",
  platform: "Facebook", // Default
  dateReported: "",
  status: "Active",
  officer: "",
  refNumber: "",
};

export default function IncidentMeta() {
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
    const matchesSearch = 
      row.accountName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.refNumber.toLowerCase().includes(searchTerm.toLowerCase());

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
            {/* Meta (Infinity) Logo SVG */}
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5h-2v-2h2v2zm0-4h-2V7h2v5.5z" fill="white"/>
            </svg>
          </div>
        </div>
        <div className="header-text">
          <h1>Meta Incidents</h1>
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
        <div className="left-actions">
           <input 
            type="date" 
            className="filter-input" 
            value={tempFilterDate}
            onChange={(e) => setTempFilterDate(e.target.value)}
          />
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

        <div className="center-actions">
           <input 
              type="text" 
              placeholder="Search Name or Ref No." 
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
           />
        </div>

        <div className="right-actions">
          <button className="btn-primary" onClick={openCreate}>
            <Plus size={18} /> Add New
          </button>
        </div>
      </div>

      {/* 4. Table Section */}
      <div className="table-container">
        <div className="table-header">
          <div className="th-cell col-meta-no">No.</div>
          <div className="th-cell col-meta-name">Account Name</div>
          <div className="th-cell col-meta-platform">Platform</div>
          <div className="th-cell col-meta-date">Date Reported</div>
          <div className="th-cell col-meta-status">Status</div>
          <div className="th-cell col-meta-officer">Officer</div>
          <div className="th-cell col-meta-ref">Ref Number</div>
          <div className="th-cell col-meta-action">Action</div>
        </div>

        {filteredRows.length > 0 ? (
          filteredRows.map((row, i) => (
            <div key={i} className="table-row">
              <div className="td-cell col-meta-no">{i + 1}</div>
              <div className="td-cell col-meta-name">{row.accountName}</div>
              <div className="td-cell col-meta-platform">{row.platform}</div>
              <div className="td-cell col-meta-date">{row.dateReported}</div>
              <div className="td-cell col-meta-status">
                <span className={`status-badge ${
                    row.status === "Active" ? "status-active" : 
                    row.status === "Pending" ? "status-pending" : "status-resolved"
                }`}>
                  {row.status}
                </span>
              </div>
              <div className="td-cell col-meta-officer">{row.officer}</div>
              <div className="td-cell col-meta-ref">{row.refNumber}</div>
              
              <div className="td-cell col-meta-action relative">
                <div className="action-btn-group">
                  <button onClick={() => openEdit(i)} className="icon-btn">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => setMenuIndex(menuIndex === i ? null : i)} className="icon-btn">
                    <MoreHorizontal size={16} />
                  </button>
                </div>
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
            <h2 className="modal-title">{editingIndex !== null ? "Edit Record" : "Add New Incident"}</h2>
            
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
                <select 
                  value={formData.platform} 
                  onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                >
                  <option value="Facebook">Facebook</option>
                  <option value="Instagram">Instagram</option>
                </select>
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
                <label>Ref Number</label>
                <input 
                  placeholder="Value" 
                  value={formData.refNumber} 
                  onChange={(e) => setFormData({ ...formData, refNumber: e.target.value })} 
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
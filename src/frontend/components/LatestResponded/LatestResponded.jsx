import React, { useState } from "react";
import { Plus, Edit2, MoreHorizontal, Trash, Copy, Clock } from "lucide-react";
import '../global.css'; 

const emptyForm = {
  accountName: "",
  platform: "WhatsApp",
  account: "",
  incident: "",
};

export default function LatestResponded() {
  const [rows, setRows] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [editingIndex, setEditingIndex] = useState(null);
  const [menuIndex, setMenuIndex] = useState(null);
  
  // --- Search & Filter States ---
  const [searchTerm, setSearchTerm] = useState("");
  const [tempFilterPlatform, setTempFilterPlatform] = useState("");
  const [tempFilterIncident, setTempFilterIncident] = useState("");
  const [appliedFilters, setAppliedFilters] = useState({ platform: "", incident: "" });

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
      setRows([...rows, { ...formData, id: Date.now() }]);
    }
    setIsOpen(false);
    setFormData(emptyForm);
  };

  const handleDelete = (targetId) => {
  setRows(rows.filter((row) => row.id !== targetId));
  setMenuIndex(null);
};

  const handleDuplicate = (index) => {
    setRows([...rows, { ...rows[index] }]);
    setMenuIndex(null);
  };

  const handleApplyFilters = () => {
    setAppliedFilters({
      platform: tempFilterPlatform,
      incident: tempFilterIncident,
    });
  };

  const filteredRows = rows.filter(row => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = 
      (row.accountName || "").toLowerCase().includes(term) ||
      (row.account || "").toLowerCase().includes(term) ||
      (row.incident || "").toLowerCase().includes(term) ||
      (row.platform || "").toLowerCase().includes(term);

    return matchesSearch 
      && (appliedFilters.platform ? row.platform === appliedFilters.platform : true)
      && (appliedFilters.incident ? row.incident === appliedFilters.incident : true);
  });

  return (
    <div className="page-container">
      {/* 1. Header Section */}
      <div className="header-section">
        <div className="icon-wrapper">
          <div className="chat-icon">
            <Clock size={30} color="white" />
          </div>
        </div>
        <div className="header-text">
          <h1>Latest Responded Incidents</h1>
          <p>{rows.length} records found</p>
        </div>
      </div>

      {/* 2. Actions Section */}
      <div className="action-bar">
        {/* Left: Filters */}
        <div className="left-actions">
           {/* REMOVED DATE INPUT HERE */}

          {/* Platform Filter */}
          <select 
            className="filter-input"
            value={tempFilterPlatform}
            onChange={(e) => setTempFilterPlatform(e.target.value)}
          >
            <option value="">All Platforms</option>
            <option value="X">X</option>
            <option value="Meta">Meta</option>
            <option value="Telegram">Telegram</option>
            <option value="TikTok">TikTok</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="Facebook">Facebook</option>
            <option value="Instagram">Instagram</option>
          </select>

          {/* Incident Filter */}
          <select 
            className="filter-input"
            value={tempFilterIncident}
            onChange={(e) => setTempFilterIncident(e.target.value)}
          >
            <option value="">All Incidents</option>
            <option value="Hate Speech">Hate Speech</option>
            <option value="Online Child Exploitation">Online Child Exploitation</option>
            <option value="Publication of False Information">Publication of False Information</option>
            <option value="Account Compromise">Account Compromise</option>
            <option value="Impersonation">Impersonation</option>
            <option value="E-Commerce Fraud">E-Commerce Fraud</option>
            <option value="Online Sextortion">Online Sextortion</option>
            <option value="Cyber Harassment">Cyber Harassment</option>
            <option value="Cyber Terrorism">Cyber Terrorism</option>
            <option value="Data Breach">Data Breach</option>
            <option value="Wrongful Suspension">Wrongful Suspension</option>
            <option value="Wrongful Distribution of Obscene Images">Wrongful Distribution of Obscene Images</option>
            <option value="Verification">Verification</option>
          </select>

          <button className="btn-primary" onClick={handleApplyFilters}>Apply Filters</button>
        </div>

        {/* Middle: Search */}
        <div className="center-actions">
           <input 
              type="text" 
              placeholder="Search Account" 
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

      {/* 3. Table Section */}
      <div className="table-container">
        <div className="table-header">
          <div className="th-cell" style={{width: '5%'}}>No.</div>
          <div className="th-cell" style={{width: '20%'}}>Account Name/Desc</div>
          <div className="th-cell" style={{width: '10%'}}>Platform</div>
          {/* FIXED: This header was broken in your code */}
          <div className="th-cell" style={{width: '15%'}}>Account</div> 
          <div className="th-cell" style={{width: '20%'}}>Incident</div>
          <div className="th-cell" style={{width: '10%'}}>Action</div>
        </div>

        {/* Table Body */}
        {filteredRows.length > 0 ? (
          filteredRows.map((row, i) => (
            <div key={i} className="table-row">
              <div className="td-cell" style={{width: '5%'}}>{i + 1}</div>
              <div className="td-cell" style={{width: '20%'}}>{row.accountName}</div>
              <div className="td-cell" style={{width: '10%'}}>{row.platform}</div>
              
              {/* Account Link Logic */}
              <div className="td-cell" style={{width: '15%', overflow: 'hidden'}}>
                <a 
                  href={row.account} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ color: 'blue', textDecoration: 'underline' }} 
                >
                  {row.account}
                </a>
              </div>
              
              <div className="td-cell" style={{width: '20%'}}>{row.incident}</div>
              
              <div className="td-cell relative" style={{width: '10%', zIndex: menuIndex === i ? 50 : 'auto'}}>
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
                    <button onClick={() => handleDelete(row.id)} className="dropdown-item danger">
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
            <h2 className="modal-title">{editingIndex !== null ? "Edit Record" : "Add New Record"}</h2>
            
            <div className="modal-form">
              <div className="form-group">
                <label>Account Name / Description</label>
                <input 
                  placeholder="" 
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
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="X">X (Twitter)</option>
                  <option value="Meta">Meta</option>
                  <option value="Tiktok">Tiktok</option>
                  <option value="Telegram">Telegram</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Facebook">Facebook</option>
                  <option value="Instagram">Instagram</option>
                </select>
              </div>

              <div className="form-group">
                <label>Account (URL)</label>
                <input 
                  placeholder="e.g. https://www.tiktok.com/@example" 
                  value={formData.account} 
                  onChange={(e) => setFormData({ ...formData, account: e.target.value })} 
                />
              </div>

              <div className="form-group">
                <label>Incident</label>
                <select 
                  value={formData.incident} 
                  onChange={(e) => setFormData({ ...formData, incident: e.target.value })}
                  >
                  <option value="">All Incidents</option>
                  <option value="Hate Speech">Hate Speech</option>
                  <option value="Online Child Exploitation">Online Child Exploitation</option>
                  <option value="Publication of False Information">Publication of False Information</option>
                  <option value="Account Compromise">Account Compromise</option>
                  <option value="Impersonation">Impersonation</option>
                  <option value="E-Commerce Fraud">E-Commerce Fraud</option>
                  <option value="Online Sextortion">Online Sextortion</option>
                  <option value="Cyber Harassment">Cyber Harassment</option>
                  <option value="Cyber Terrorism">Cyber Terrorism</option>
                  <option value="Data Breach">Data Breach</option>
                  <option value="Wrongful Suspension">Wrongful Suspension</option>
                  <option value="Wrongful Distribution of Obscene Images">Wrongful Distribution of Obscene Images</option>
                  <option value="Verification">Verification</option>
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
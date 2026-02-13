import React, { useEffect,useState } from 'react';
import { Plus, Edit2, MoreHorizontal, Trash } from "lucide-react";
import '../global.css';
import { DataGrid } from "@mui/x-data-grid";
import { Paper } from "@mui/material";

const emptyForm = {
  mobileNumber: "",
  dateReported: "",
  status: "Rejected",
  officer: "",
  incident:"",
};

const IncidentWhatsApp = () => {
  // State Management
  const [rows, setRows] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [editingIndex, setEditingIndex] = useState(null);
  const [menuIndex, setMenuIndex] = useState(null);
  const [fileChosen,setFileChosen] = useState(false)
  const [displayFileForm,setDisplayFileForm] = useState(true)
  const [filePath,setFilePath] = useState("")
  const fileData = new FormData()
  
  // --- Search & Filter States ---
  const [searchTerm, setSearchTerm] = useState("");
  const [tempFilterDate, setTempFilterDate] = useState("");
  const [tempFilterIncident, setTempFilterIncident] = useState("");
  const [tempFilterStatus, setTempFilterStatus] = useState("");

  const [appliedFilters, setAppliedFilters] = useState({ date: "", status: "",incident:""});

  // Calculate Stats
  const rejectedCount = rows.filter(r => r.status === "Rejected").length;
  const pendingCount = rows.filter(r => r.status === "Pending").length;
  const resolvedCount = rows.filter(r => r.status === "Resolved").length;

  const WHATSAPP_INCIDENTS_URL = "http://localhost:4000/whatsapp-incidents/"
  const FILE_UPLOAD_URL = "http://localhost:4000/whatsapp-incidents/upload-file"

  useEffect(() => {
    fetch(WHATSAPP_INCIDENTS_URL)
    .then((response) => response.json())
    .then((incidents) => setRows(incidents))
    .catch((error) => {
      console.log(error);
    });
  }, []);

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
      fetch(WHATSAPP_INCIDENTS_URL
        , {
        method: "POST",
        headers: {
          "Content-Type": "Application/JSON",
        },
        body: JSON.stringify(formData),
      })
      .then((response) => response.json())
      .catch((error) => {
        console.log(error);
      });
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
      status: tempFilterStatus,
      incident:tempFilterIncident
    });
  };

  const addRecords = () => {

    if(filePath !== ""){

      fileData.append("incidents-file",filePath)
      
      fetch(FILE_UPLOAD_URL
        , {
        method: "POST",
        body: fileData,
      })
      .then((response) => response.json())
      .catch((error) => {
        console.log(error);
      });

      setFileChosen(false)
      setDisplayFileForm(true)

    }else{
      alert("Upload file first")
    }
    
  }

  const filteredRows = rows.filter(row => {
    const matchesSearch = row.mobileNumber.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDate = appliedFilters.date 
      ? row.dateReported === appliedFilters.date 
      : true;

    const matchesStatus = appliedFilters.status 
      ? row.status === appliedFilters.status 
      : true;

    const matchesIncident = appliedFilters.incident ? row.incident === appliedFilters.incident : true;

    return matchesSearch && matchesDate && matchesStatus && matchesIncident;
  });

  const columns = [
    {field:"mobileNumber",headerName:"Link / Mobile Number",width:250,renderCell: (params) => {
        const cellValue = params.value ? params.value.toString() : "";

        // Check if the value looks like a URL
        const isLink = 
          cellValue.includes("http") || 
          cellValue.includes("https") || 
          cellValue.includes("whatsapp.com") || 
          cellValue.includes("wa.me");

        if (isLink) {
          // Ensure the href starts with http/https so the browser opens it correctly
          const href = cellValue.startsWith("http") ? cellValue : `https://${cellValue}`;

          return (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ 
                color: "#1976d2", 
                textDecoration: "underline",
                cursor: "pointer"
              }}
              onClick={(e) => e.stopPropagation()} // Prevent the row from being selected when clicking the link
            >
              {cellValue}
            </a>
          );
        }

        // If not a link, just return the number as plain text
        return cellValue;
      },
    },
    {field:"dateReported",headerName:"Date Reported",width:200},
    {field:"incident",headerName:"Incident",width:400},
    {field:"officer",headerName:"Officer",width:200},
    {field:"status",headerName:"Status",width:200,cellClassName:(params)=>{
      if(params.value == "Pending"){
        return "status-badge status-pending"
      }else if(params.value == "Resolved"){
        return "status-badge status-resolved"
      }else if(params.value == "Rejected"){
        return "status-badge status-rejected"
      }
    }},
    { field: "actions", 
      headerName: "Actions", 
      width: 100,
      renderCell: (params) => {
         // You likely want your edit/delete buttons here. 
         // If you had custom rendering logic for actions, put it here.
         // Otherwise, this empty renderCell prevents it from showing "undefined"
         return null;}
      }
  ]

  const paginationModel = { page: 0, pageSize: 10 };

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
            <option value="Rejected">Rejected</option>
            <option value="Pending">Pending</option>
            <option value="Resolved">Resolved</option>
          </select>

          <select className="filter-input" value={tempFilterIncident} onChange={(e) => setTempFilterIncident(e.target.value)}>
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

        <div className="right-actions">
          <form>
            {displayFileForm &&
              <>
               <label htmlFor="whatsapp-incidents-file" className="btn-primary"><Plus size={18} />Upload from Excel</label>
               <input type="file" id="whatsapp-incidents-file" hidden={true} onChange={()=> {
                if(document.getElementById("whatsapp-incidents-file").value !== ""){
                  setFilePath(event.target.files[0])
                  setFileChosen(true)
                  setDisplayFileForm(false)
                }
              }
              }/>
              </>
            }
            
            
            {fileChosen &&
              <>
              <input type="reset" value={"Drop " + filePath.name} className="btn-drop-file" onClick={()=>{
                setFileChosen(false)
                setDisplayFileForm(true)
              }}/>
              <button type="button" className="btn-submit-file" onClick={addRecords}> Add Records </button>
              </>
            }
          </form>
        </div>
      </div>

      {/* 4. Table Section */}
      <Paper>
        <DataGrid
          columns={columns}
          rows={filteredRows}
          initialState={{pagination:paginationModel}}
          pageSizeOptions={[10,20,30, 100]}
          getRowId={(row) => row._id}
        />
      </Paper>

      {/* <div className="table-container">
        <div className="table-header">
          <div className="th-cell col-wa-no">No</div>
          <div className="th-cell col-wa-mobile">Mobile Number</div>
          <div className="th-cell col-wa-date">Date Reported</div>
          <div className="th-cell col-wa-date">Incident</div>
          <div className="th-cell col-wa-status">Status</div>
          <div className="th-cell col-wa-officer">Officer</div>
          <div className="th-cell col-wa-action">Action</div>
        </div>
        
        {filteredRows.length > 0 ? (
          filteredRows.map((row, i) => (
            <div key={i} className="table-row">
              <div className="td-cell col-wa-no">{i + 1}</div>
              <div className="td-cell col-wa-mobile">{row.mobileNumber}</div>
              <div className="td-cell col-wa-date">{row.dateReported}</div>
              <div className="td-cell col-wa-date">{row.incident}</div>
              <div className="td-cell col-wa-status">
                <span className={`status-badge ${
                    row.status === "Rejected" ? "status-rejected" : 
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
      </div> */}

      {/* --- POP-UP MODAL START --- */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">
              {editingIndex !== null ? "Edit Incident" : "Add New Incident"}
            </h2>
            
            <div className="modal-form">
              <div className="form-group">
                <label>Link / Mobile Number</label> 
                <input 
                  type="text" 
                  placeholder="Enter Mobile Number or WhatsApp Link" 
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
                <label>Incident</label>
                <select value={formData.incident} onChange={(e) => setFormData({ ...formData, incident: e.target.value })}>
                  <option value="Impersonation">Impersonation</option>
                  <option value="Publication of False Information">Publication of False Information</option>
                  <option value="Account Compromise">Account Compromise</option>
                  <option value="E-Commerce Fraud">E-Commerce Fraud</option>
                  <option value="Online Sextortion">Online Sextortion</option>
                  <option value="Cyber Harassment">Cyber Harassment</option>
                  <option value="Online Child Exploitation">Online Child Exploitation</option>
                  <option value="Cyber Terrorism">Cyber Terrorism</option>
                  <option value="Data Breach">Data Breach</option>
                  <option value="Copyright Infringement">Copyright Infringement</option>
                  <option value="Wrongful Suspension">Wrongful Suspension</option>
                  <option value="Hate Speech">Hate Speech</option>
                </select>
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
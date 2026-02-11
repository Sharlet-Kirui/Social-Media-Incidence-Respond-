import React, { useEffect,useState } from "react";
import { Plus, Edit2, MoreHorizontal, Trash, Copy } from "lucide-react";
import '../global.css';
import { DataGrid } from "@mui/x-data-grid";
import { Paper } from "@mui/material";

const emptyForm = {
  incident: "",
  url: "",
  dateReported: "",
  status: "Rejected",
  officer: "",
};

export default function IncidentTikTok() {
  const [rows, setRows] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [editingIndex, setEditingIndex] = useState(null);
  const [menuIndex, setMenuIndex] = useState(null);
  const [fileChosen,setFileChosen] = useState(false)
  const [displayFileForm,setDisplayFileForm] = useState(true)
  const [filePath,setFilePath] = useState("")
  const fileData = new FormData()
  
  const [searchTerm, setSearchTerm] = useState("");
  const [tempFilterDate, setTempFilterDate] = useState("");
  const [tempFilterStatus, setTempFilterStatus] = useState("");
  const [tempFilterIncident, setTempFilterIncident] = useState("");
  const [appliedFilters, setAppliedFilters] = useState({ date: "", status: "", incident:"" });

  const rejectedCount = rows.filter(r => r.status === "Rejected").length;
  const pendingCount = rows.filter(r => r.status === "Pending").length;
  const resolvedCount = rows.filter(r => r.status === "Resolved").length;

  const TIKTOK_INCIDENTS_URL = "http://localhost:4000/tiktok-incidents/"
  const FILE_UPLOAD_URL = "http://localhost:4000/tiktok-incidents/upload-file"

  useEffect(() => {
    fetch(TIKTOK_INCIDENTS_URL)
    .then((response) => response.json())
    .then((incidents) => setRows(incidents))
    .catch((error) => {
      console.log(error);
    });
  }, []);
  
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
      fetch(TIKTOK_INCIDENTS_URL
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

  const handleApplyFilters = () => {
    setAppliedFilters({ date: tempFilterDate, status: tempFilterStatus, incident: tempFilterIncident});
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
    const matchesSearch = 
      row.incident.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.url.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = appliedFilters.date ? row.dateReported === appliedFilters.date : true;
    const matchesStatus = appliedFilters.status ? row.status === appliedFilters.status : true;
    const matchesIncident = appliedFilters.incident ? row.incident === appliedFilters.incident : true;
    return matchesSearch && matchesDate && matchesStatus && matchesIncident;
  });

  const columns = [
    {field:"url",headerName:"URL",width:200},
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
    {headerName:"Actions"}
  ]

  const paginationModel = { page: 0, pageSize: 10 };


  return (
    <div className="page-container">
      {/* 1. Header Section */}
      <div className="header-section">
        <div className="icon-wrapper">
          <div className="chat-icon">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 1 0 1 13.6 6.84 6.84 0 0 0 6.82-6.85V7.97a10.32 10.32 0 0 0 5.25 1.5V6.05a6.47 6.47 0 0 1-3.84-.86z" fill="white"/>
            </svg>
          </div>
        </div>
        <div className="header-text">
          <h1>TikTok Incidents</h1>
          <p>{rows.length} records found</p>
        </div>
      </div>

      {/* 2. Stats & Actions */}
      <div className="stats-container">
        <div className="stat-card">
          <h3>Rejected</h3><span className="stat-number">{rejectedCount}</span>
        </div>
        <div className="stat-card">
          <h3>Pending</h3><span className="stat-number">{pendingCount}</span>
        </div>
        <div className="stat-card">
          <h3>Resolved</h3><span className="stat-number">{resolvedCount}</span>
        </div>
      </div>

      <div className="action-bar">
        <div className="left-actions">
           <input type="date" className="filter-input" value={tempFilterDate} onChange={(e) => setTempFilterDate(e.target.value)}/>
          <select className="filter-input" value={tempFilterStatus} onChange={(e) => setTempFilterStatus(e.target.value)}>
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
        <div className="center-actions">
           <input type="text" placeholder="Search Incident or URL" className="search-input" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
        </div>
        <div className="right-actions">
          <button className="btn-primary" onClick={openCreate}><Plus size={18} /> Add New</button>
        </div>

        <div className="right-actions">
          <form>
            {displayFileForm &&
              <>
               <label htmlFor="tiktok-incidents-file" className="btn-primary"><Plus size={18} />Upload from Excel</label>
               <input type="file" id="tiktok-incidents-file" hidden={true} onChange={()=> {
                if(document.getElementById("tiktok-incidents-file").value !== ""){
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
          pageSizeOptions={[10,20,30]}
          getRowId={(row) => row._id}
        />
      </Paper>
      {/* <div className="table-container">
        <div className="table-header">
          <div className="th-cell col-tiktok-no">No.</div>
          <div className="th-cell col-tiktok-incident">Incident</div>
          <div className="th-cell col-tiktok-url">URL</div>
          <div className="th-cell col-tiktok-date">Date Reported</div>
          <div className="th-cell col-tiktok-status">Status</div>
          <div className="th-cell col-tiktok-officer">Officer</div>
          <div className="th-cell col-tiktok-action">Action</div>
        </div>

        {filteredRows.length > 0 ? (
          filteredRows.map((row, i) => (
            <div key={i} className="table-row">
              <div className="td-cell col-tiktok-no">{i + 1}</div>
              <div className="td-cell col-tiktok-incident">{row.incident}</div>
              <div className="td-cell col-tiktok-url">{row.url}</div>
              <div className="td-cell col-tiktok-date">{row.dateReported}</div>
              <div className="td-cell col-tiktok-status">
                <span className={`status-badge ${row.status === "Rejected" ? "status-rejected" : row.status === "Pending" ? "status-pending" : "status-resolved"}`}>
                  {row.status}
                </span>
              </div>
              <div className="td-cell col-tiktok-officer">{row.officer}</div>
              <div className="td-cell col-tiktok-action relative">
                <div className="action-btn-group">
                  <button onClick={() => openEdit(i)} className="icon-btn"><Edit2 size={16} /></button>
                  <button onClick={() => setMenuIndex(menuIndex === i ? null : i)} className="icon-btn"><MoreHorizontal size={16} /></button>
                </div>
                {menuIndex === i && (
                  <div className="dropdown-menu">
                    <button onClick={() => handleDuplicate(i)} className="dropdown-item"><Copy size={14} /> Duplicate</button>
                    <button onClick={() => handleDelete(i)} className="dropdown-item danger"><Trash size={14} /> Delete</button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="table-body-empty">No records found</div>
        )}
      </div> */}

      {/* --- POP-UP MODAL --- */}
      {isOpen && (
        <div className="modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">{editingIndex !== null ? "Edit Record" : "Add New Incident"}</h2>
            <div className="modal-form">
              <div className="form-group">
                <label>URL</label>
                <input placeholder="Value" value={formData.url} onChange={(e) => setFormData({ ...formData, url: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Date Reported</label>
                <input type="date" value={formData.dateReported} onChange={(e) => setFormData({ ...formData, dateReported: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Officer Responsible</label>
                <input placeholder="Value" value={formData.officer} onChange={(e) => setFormData({ ...formData, officer: e.target.value })} />
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
                <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
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
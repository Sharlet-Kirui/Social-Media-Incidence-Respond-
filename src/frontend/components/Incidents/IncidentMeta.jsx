import React, { useState, useEffect, useMemo } from "react";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { Plus, Edit2, MoreHorizontal, Trash, Copy } from "lucide-react";
import '../global.css';

const emptyForm = {
  accountName: "",
  platform: "Facebook", 
  url: "", // Consolidating: This will store the Malicious Account URL
  dateReported: "",
  incident:"",
  status: "Pending",
  officer: "",
  refNumber: "",
};

export default function IncidentMeta() {
  const [rows, setRows] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [editingIndex, setEditingIndex] = useState(null);
  const [menuIndex, setMenuIndex] = useState(null);
  const [fileChosen, setFileChosen] = useState(false);
  const [displayFileForm, setDisplayFileForm] = useState(true);
  const [filePath, setFilePath] = useState("");
  
  // --- Search & Filter States ---
  const [searchTerm, setSearchTerm] = useState("");
  const [tempFilterDate, setTempFilterDate] = useState("");
  const [tempFilterStatus, setTempFilterStatus] = useState("");
  const [tempFilterIncident, setTempFilterIncident] = useState("");
  const [tempFilterPlatform, setTempFilterPlatform] = useState("");
  const [appliedFilters, setAppliedFilters] = useState({ date: "", status: "", incident: "" , platform: ""});

  // Calculate Stats
  const pendingCount = rows.filter(r => r.status === "Pending").length;
  const resolvedCount = rows.filter(r => r.status === "Resolved").length;
  const rejectedCount = rows.filter(r => r.status === "Rejected").length;

  const META_INCIDENTS_URL = "http://localhost:4000/meta-incidents/"
  const FILE_UPLOAD_URL = "http://localhost:4000/meta-incidents/upload-file"
  const fileData = new FormData()

  useEffect(() => {
    fetch(META_INCIDENTS_URL)
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
      fetch(META_INCIDENTS_URL, {
        method: "POST",
        headers: { "Content-Type": "Application/JSON" },
        body: JSON.stringify(formData),
      })
      .then((response) => response.json())
      .catch((error) => console.log(error));
      
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
    setAppliedFilters({
      date: tempFilterDate,
      status: tempFilterStatus,
      incident: tempFilterIncident,
      platform: tempFilterPlatform,
    });
  };

  const addRecords = () => {
    if(filePath !== ""){
      fileData.append("incidents-file", filePath)
      fetch(FILE_UPLOAD_URL, {
        method: "POST",
        body: fileData,
      })
      .then((response) => response.json())
      .catch((error) => console.log(error));

      setFileChosen(false)
      setDisplayFileForm(true)
    } else {
      alert("Upload file first")
    }
  }

  const filteredRows = rows.filter(row => {
    const safeString = (str) => (str || "").toLowerCase();
    
    const matchesSearch = 
      safeString(row.accountName).includes(searchTerm.toLowerCase()) ||
      safeString(row.refNumber).includes(searchTerm.toLowerCase()) ||
      safeString(row.officer).includes(searchTerm.toLowerCase()) ||
      safeString(row.platform).includes(searchTerm.toLowerCase()) ||
      safeString(row.incident).includes(searchTerm.toLowerCase()) || 
      safeString(row.url).includes(searchTerm.toLowerCase()); // Added URL to search

    const matchesDate = appliedFilters.date ? row.dateReported === appliedFilters.date : true;
    const matchesStatus = appliedFilters.status ? row.status === appliedFilters.status : true;
    const matchesIncident = appliedFilters.incident ? row.incident === appliedFilters.incident : true;
    const matchesPlatform = appliedFilters.platform ? row.platform === appliedFilters.platform : true;

    return matchesSearch && matchesDate && matchesStatus && matchesIncident && matchesPlatform;
  });

  // --- TANSTACK TABLE CONFIGURATION ---
  const columns = useMemo(() => [
    {
      header: "No.",
      accessorFn: (row, i) => i + 1,
    },
    {
      header: "Account Name/ Description",
      accessorKey: "accountName",
    },
    {
      header: "Platform",
      accessorKey: "platform",
    },
    {
      // UPDATED: Header is 'Malicious Account', but data comes from 'url'
      header: "Malicious Account",
      accessorKey: "url", 
      cell: info => <span style={{ color: '#0164A6' }}>{info.getValue()}</span>
    },
    {
      header: "Date Reported",
      accessorKey: "dateReported",
    },
    {
      header: "Incident",
      accessorKey: "incident",
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: info => {
        const status = info.getValue();
        const statusClass = 
          status === "Rejected" ? "status-rejected" : 
          status === "Pending" ? "status-pending" : "status-resolved";
        return <span className={`status-badge ${statusClass}`}>{status}</span>
      }
    },
    {
      header: "Officer",
      accessorKey: "officer",
    },
    {
      header: "Reference Number",
      accessorKey: "refNumber",
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => {
        const i = row.index;
        return (
          <div className="action-btn-group relative">
             <button onClick={() => openEdit(i)} className="icon-btn"><Edit2 size={16} /></button>
             <button onClick={() => setMenuIndex(menuIndex === i ? null : i)} className="icon-btn"><MoreHorizontal size={16} /></button>
             {menuIndex === i && (
                <div className="dropdown-menu">
                  <button onClick={() => handleDuplicate(i)} className="dropdown-item"><Copy size={14} /> Duplicate</button>
                  <button onClick={() => handleDelete(i)} className="dropdown-item danger"><Trash size={14} /> Delete</button>
                </div>
             )}
          </div>
        )
      }
    }
  ], [rows, menuIndex]);

  const table = useReactTable({
    data: filteredRows,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="page-container">
      {/* 1. Header Section */}
      <div className="header-section">
        <div className="icon-wrapper">
          <div className="chat-icon">
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
          <h3>Pending</h3><span className="stat-number">{pendingCount}</span>
        </div>
        <div className="stat-card">
          <h3>Resolved</h3><span className="stat-number">{resolvedCount}</span>
        </div>
        <div className="stat-card">
          <h3>Rejected</h3><span className="stat-number">{rejectedCount}</span>
        </div>
      </div>

      {/* 3. Actions Section */}
      <div className="action-bar">
        <div className="left-actions">
           <input type="date" className="filter-input" value={tempFilterDate} onChange={(e) => setTempFilterDate(e.target.value)} />
           <select className="filter-input" value={tempFilterStatus} onChange={(e) => setTempFilterStatus(e.target.value)}>
            <option value="">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Resolved">Resolved</option>
            <option value="Rejected">Rejected</option>
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
          <select className="filter-input" value={tempFilterPlatform} onChange={(e) => setTempFilterPlatform(e.target.value)}>
            <option value="">All Platforms</option>
            <option value="Facebook">Facebook</option>
            <option value="Instagram">Instagram</option>
          </select>
          <button className="btn-primary" onClick={handleApplyFilters}>Apply Filters</button>
        </div>

        <div className="center-actions">
           <input type="text" placeholder="Search" className="search-input" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
        </div>

        <div className="right-actions">
          <button className="btn-primary" onClick={openCreate}><Plus size={18} /> Add New</button>
        </div>

        <div className="right-actions">
           <form>
             {displayFileForm &&
               <>
                 <label htmlFor="meta-incidents-file" className="btn-primary"><Plus size={18} />Upload from Excel</label>
                 <input type="file" id="meta-incidents-file" hidden={true} onChange={(event)=> {
                   if(document.getElementById("meta-incidents-file").value !== ""){
                     setFilePath(event.target.files[0])
                     setFileChosen(true)
                     setDisplayFileForm(false)
                   }
                 }}/>
               </>
             }
             {fileChosen &&
               <>
               <input type="reset" value={"Drop " + (filePath?.name || "File")} className="btn-drop-file" onClick={()=>{
                 setFileChosen(false)
                 setDisplayFileForm(true)
               }}/>
               <button type="button" className="btn-submit-file" onClick={addRecords}> Add Records </button>
               </>
             }
           </form>
        </div>
      </div>

      {/* 4. Dynamic Table Section */}
      <div className="table-wrapper">
        <table className="dynamic-table">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="table-body-empty">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* --- POP-UP MODAL --- */}
      {isOpen && (
        <div className="modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">{editingIndex !== null ? "Edit Record" : "Add New Incident"}</h2>
            
            <div className="modal-form">
              <div className="form-group">
                <label>Account Name/Description </label>
                <input placeholder="Value" value={formData.accountName} onChange={(e) => setFormData({ ...formData, accountName: e.target.value })} />
              </div>

              <div className="form-group">
                <label>Platform</label>
                <select value={formData.platform} onChange={(e) => setFormData({ ...formData, platform: e.target.value })}>
                  <option value="Facebook">Facebook</option>
                  <option value="Instagram">Instagram</option>
                </select>
              </div>

              <div className="form-group">
                <label>Malicious Account (URL)</label>
                <input 
                  placeholder="https://..." 
                  value={formData.url} 
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })} 
                />
              </div>

              <div className="form-group">
                <label>Date Reported</label>
                <input type="date" value={formData.dateReported} onChange={(e) => setFormData({ ...formData, dateReported: e.target.value })} />
              </div>

              <div className="form-group">
                <label>Incident</label>
                <select value={formData.incident} onChange={(e) => setFormData({ ...formData, incident: e.target.value })}>
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

              <div className="form-group">
                <label>Status</label>
                <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                  <option value="Pending">Pending</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div className="form-group">
                <label>Reference Number</label>
                <input placeholder="Value" value={formData.refNumber} onChange={(e) => setFormData({ ...formData, refNumber: e.target.value })} />
              </div>

              <div className="form-group">
                <label>Officer Responsible</label>
                <input placeholder="Value" value={formData.officer} onChange={(e) => setFormData({ ...formData, officer: e.target.value })} />
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
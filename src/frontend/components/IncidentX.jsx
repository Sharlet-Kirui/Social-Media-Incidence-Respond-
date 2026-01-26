import { useState } from "react";
import "./Incidents.css";

const StatCards = () => (
  <div className="stats">
    {["Active", "Pending", "Resolved"].map((s) => (
      <div className="stat-card" key={s}>
        <p>{s}</p>
        <h3>0</h3>
      </div>
    ))}
  </div>
);

const headers = [
  "No",
  "Account Name",
  "Platform",
  "URL",
  "Date reported",
  "Status",
  "Officer responsible",
];

const AddIncidentModal = ({ onClose }) => (
  <div className="modal-overlay">
    <div className="modal">
      <span className="modal-close" onClick={onClose}>✕</span>
      <h3>Add New Incident</h3>

      <div className="modal-form">
        <input placeholder="Account Name" />
        <input placeholder="Platform (X / Twitter)" />
        <input placeholder="URL" />
        <input type="date" />
        <select>
          <option>Status</option>
          <option>Active</option>
          <option>Pending</option>
          <option>Resolved</option>
        </select>
        <input placeholder="Officer responsible" />
      </div>

      <div className="modal-actions">
        <button className="cancel-btn" onClick={onClose}>Cancel</button>
        <button className="save-btn">Save Incident</button>
      </div>
    </div>
  </div>
);

const IncidentX = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="incidents-page">
      <h2>X (Twitter) Incidents</h2>

      <StatCards />

      <div className="filters">
        <input type="date" />
        <select><option>Status</option></select>
        <button className="apply-btn">Apply</button>
      </div>

      <button className="add-btn" onClick={() => setShowModal(true)}>
        Add New Incident
      </button>

      <div className="table-container">
        <table>
          <thead>
            <tr>{headers.map(h => <th key={h}>{h}</th>)}</tr>
          </thead>
          <tbody />
        </table>
      </div>

      {showModal && <AddIncidentModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default IncidentX;
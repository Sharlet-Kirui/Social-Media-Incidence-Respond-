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
  "Date reported",
  "Status",
  "Officer in charge",
  "Ref Number",
];

const AddIncidentModal = ({ onClose }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal-content" onClick={e => e.stopPropagation()}>
      <h2 className="modal-title">Add New Incident</h2>
      <form className="modal-form">
        <div className="form-group">
          <label>Account Name</label>
          <input placeholder="Account Name" />
        </div>
        <div className="form-group">
          <label>Platform</label>
          <select>
            <option>Facebook</option>
            <option>Instagram</option>
          </select>
        </div>
        <div className="form-group">
          <label>Date Reported</label>
          <input type="date" />
        </div>
        <div className="form-group">
          <label>Status</label>
          <select>
            <option>Status</option>
            <option>Active</option>
            <option>Pending</option>
            <option>Resolved</option>
          </select>
        </div>
        <div className="form-group">
          <label>Officer in charge</label>
          <input placeholder="Officer in charge" />
        </div>
        <div className="form-group">
          <label>Ref Number</label>
          <input placeholder="Ref Number" />
        </div>
        <div className="modal-actions">
          <button type="button" className="btn-add">Add</button>
          <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  </div>
);

const IncidentMeta = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="incidents-page">
      <h2>Meta Incidents</h2>

      <StatCards />

      <div className="filters">
        <input type="date" />
        <select><option>Status</option></select>
        <button className="apply-btn">Apply</button>
      </div>

      <div className="action-bar" style={{ display: 'flex', justifyContent: 'flex-end', margin: '16px 0' }}>
        <button className="add-btn" onClick={() => setShowModal(true)}>
          Add New Incident
        </button>
      </div>

      <div className="table-container">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>{headers.map(h => <th key={h}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {/* Example empty row */}
            <tr>
              {headers.map((h, i) => (
                <td key={i} style={{ textAlign: 'center', color: '#aaa' }}>-</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Modal for adding new incident */}
      {showModal && <AddIncidentModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default IncidentMeta;
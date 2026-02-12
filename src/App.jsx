// src/App.jsx
import React from 'react';
// 1. Import BrowserRouter and alias it as 'Router'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 2. Import your NavBar
import NavBar from './frontend/global/NavBar';

// Import your new component
import IncidentWhatsApp from './frontend/components/Incidents/IncidentWhatsApp';
import LinkedInIncidents from './frontend/components/Incidents/IncidentLinkedIn';
import Profile from './frontend/global/Profile';
import IncidentX from './frontend/components/Incidents/IncidentX';
import IncidentTelegram from './frontend/components/Incidents/IncidentTelegram';
import IncidentTikTok from './frontend/components/Incidents/IncidentTikTok';
import IncidentMeta from './frontend/components/Incidents/IncidentMeta';
import SignIn from './frontend/global/SignIn';
import SignUp from './frontend/global/SIgnUp';
import Dashboard from './frontend/components/Dashboard/Dashboard';



function App() {
  return (
    // 3. EVERYTHING must be inside this <Router> tag
    <Router>
      <NavBar />
      <div style={{ paddingTop: '64px', paddingLeft: '40px', paddingRight: '40px' }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />

          <Route path="/incidence/X" element={<IncidentX />} />
          <Route path="/incidence/meta" element={<IncidentMeta />} />
          <Route path="/incidence/telegram" element={<IncidentTelegram />} />
          <Route path="/incidence/tiktok" element={<IncidentTikTok />} />
          <Route path="/incidence/whatsapp" element={<IncidentWhatsApp />} />
          <Route path="/incidence/linkedIn" element={<LinkedInIncidents/>} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
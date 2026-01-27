// src/App.jsx
import React from 'react';
// 1. Import BrowserRouter and alias it as 'Router'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 2. Import your NavBar
import NavBar from './frontend/global/NavBar';
import CompromisedAccounts from './frontend/components/CompromisedAccounts';

// Import your new component
import IncidentWhatsApp from './frontend/components/IncidentWhatsApp';
import Profile from './frontend/components/Profile';
import Verifications from './frontend/components/Verifications/xverifications';
import Metaverifications from './frontend/components/Verifications/Metaverifications';

function App() {
  return (
    // 3. EVERYTHING must be inside this <Router> tag
    <Router>
      <NavBar />

      <div style={{ paddingTop: '64px', paddingLeft: '40px', paddingRight: '40px' }}>
        <Routes>
          <Route path="/" element={<h1>Home Page</h1>} />
          
          {/* Main Incidence Page */}
          <Route path="/incidence" element={<h1>Incidence Dashboard</h1>} />
          
          {/* Sub-routes for Incidence */}
          <Route path="/incidence/whatsapp" element={<IncidentWhatsApp />} />
          
          {/* Placeholders for other routes */}
          <Route path="/incidence/X" element={<h1>X Incidents</h1>} />
          <Route path="/incidence/meta" element={<h1>Meta Incidents</h1>} />
          <Route path="/incidence/telegram" element={<h1>Telegram Incidents</h1>} />
          <Route path="/incidence/tiktok" element={<h1>TikTok Incidents</h1>} />
          <Route path="/incidence/linkedIn" element={<h1>LinkedIn Incidents</h1>} />

          <Route path="/verification/meta" element={<Metaverifications/>} />
          <Route path="/verification/X" element={<Verifications/>} />
          <Route path="/compromisedaccounts" element= {<CompromisedAccounts />} />
          <Route path="/latestResponded" element={<h1>Latest Responded</h1>} />
          <Route path="/governmentOfficials" element={<h1>Government Officials</h1>} />
          <Route path="/Profile" element={<Profile />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
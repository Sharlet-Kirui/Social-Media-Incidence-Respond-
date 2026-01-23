// src/App.jsx
import React from 'react';
// 1. Import BrowserRouter and alias it as 'Router'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 2. Import your NavBar
import NavBar from './frontend/global/NavBar';
import CompromisedAccounts from './frontend/components/CompromisedAccounts';

function App() {
  return (
    // 3. EVERYTHING must be inside this <Router> tag
    <Router>
      
      {/* 4. NavBar MUST be here, inside the Router, because it has links */}
      <NavBar />

      <div style={{ paddingTop: '64px', paddingLeft: '40px', paddingRight: '40px' }}>
        <Routes>
          <Route path="/" element={<h1>Home Page</h1>} />
          <Route path="/incidence" element={<h1>Incidence Page</h1>} />
          <Route path="/verification" element={<h1>Verification Page</h1>} />
          <Route path="/compromisedaccounts" element= {<CompromisedAccounts />} />
        </Routes>
      </div>

    </Router>
  );
}

export default App;
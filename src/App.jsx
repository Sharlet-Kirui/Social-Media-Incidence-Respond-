// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import the Navbar
import NavBar from './frontend/global/NavBar';

// Import your new components
import IncidentX from './frontend/components/IncidentX';
import IncidentMeta from './frontend/components/IncidentMeta';
import IncidentTelegram from './frontend/components/IncidentTelegram';
import IncidentTikTok from './frontend/components/IncidentTikTok';

function App() {
  return (
    <Router>
      {/* The Navbar stays at the top on every page */}
      <NavBar />

      {/* This div adds space so the Navbar doesn't cover your content */}
      <div style={{ paddingTop: '80px' }}> 
        <Routes>
          {/* Main Dashboard / Home */}
          <Route path="/" element={<h1 style={{textAlign: 'center'}}>CA Incident Dashboard</h1>} />

          {/* Your specific platform routes */}
          <Route path="/incidence/X" element={<IncidentX />} />
          <Route path="/incidence/meta" element={<IncidentMeta />} />
          <Route path="/incidence/telegram" element={<IncidentTelegram />} />
          <Route path="/incidence/tiktok" element={<IncidentTikTok />} />
          
          {/* Fallback for pages not yet created */}
          <Route path="*" element={<h2 style={{padding: '50px'}}>Page coming soon...</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
import React, { useState, useMemo } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [activeYear, setActiveYear] = useState('2026');

  // --- 1. BAR CHART DATA & LOGIC ---
  const barData = [
    { name: 'WhatsApp', value: 60, color: '#03045e' },
    { name: 'X', value: 6, color: '#023e8a' },
    { name: 'Tiktok', value: 30, color: '#0077b6' },
    { name: 'Meta', value: 2, color: '#0096c7' },
    { name: 'Telegram', value: 15, color: '#00b4d8' },
    { name: 'LinkedIn', value: 90, color: '#48cae4' },
  ];

  // Calculate Y-Axis Scale (0 to Max Value)
  const maxBarValue = Math.max(...barData.map(d => d.value));
  // Create 5 ticks: 0, 25%, 50%, 75%, 100% of max
  const yAxisTicks = [
    maxBarValue,
    Math.round(maxBarValue * 0.75),
    Math.round(maxBarValue * 0.5),
    Math.round(maxBarValue * 0.25),
    Math.round(maxBarValue * 0), 
  ];

  // --- 2. LINE GRAPH DATA & LOGIC ---
  const lineDataByYear = {
    '2026': [10, 30, 45, 80, 100],
    '2025': [20, 50, 30, 60, 90],
    '2024': [5, 15, 10, 25, 40],
    '2023': [60, 55, 70, 40, 20],
  };

  const currentLineData = lineDataByYear[activeYear];
  
  // Convert data points to SVG Path "d" string
  // Canvas is 500 wide, 200 high. X steps = 100px. Y scales to 200.
  const getLinePath = (data) => {
    const maxY = 100; // Assuming 100 is max scale
    const points = data.map((val, index) => {
      const x = index * 100 + 50; // Start at 50, step 100
      const y = 200 - (val / maxY) * 180; // Scale Y, leave padding
      return `${x},${y}`;
    });
    return `M${points.join(' L')}`;
  };

  // --- 3. PIE CHART LOGIC (Google Forms Style) ---
  // Simple Math to create SVG arcs
  const pieData = [
    { name: 'Impersonation', value: 10, color: '#00132d' },
    { name: 'Publication of False Information', value: 10, color: '#6ab4f1' },
    { name: 'Account Compromise', value: 10, color: '#002d67' },
    { name: 'E-Commerce Fraud', value: 10, color: '#00377e' },
    { name: 'Online Sextortion', value: 10, color: '#0077b6' },
    { name: 'Cyber Harassment', value: 10, color: '#00b4d8' },
    { name: 'CSAM', value: 10, color: '#6083c5' },
    { name: 'Cyber terrorism', value: 10, color: '#96b8db' },
    { name: 'Data Breach', value: 20, color: '#023e8a' }
  ];

  const getPieSlices = (data) => {
    let cumulativePercent = 0;
    
    return data.map((slice) => {
      const startPercent = cumulativePercent;
      const endPercent = cumulativePercent + slice.value;
      cumulativePercent += slice.value;

      // Convert percent to coordinates
      const x1 = Math.cos(2 * Math.PI * (startPercent / 100));
      const y1 = Math.sin(2 * Math.PI * (startPercent / 100));
      const x2 = Math.cos(2 * Math.PI * (endPercent / 100));
      const y2 = Math.sin(2 * Math.PI * (endPercent / 100));

      // Flag for large arcs (> 50%)
      const largeArc = slice.value > 50 ? 1 : 0;

      // Create Path command
      const pathData = `M 0 0 L ${x1} ${y1} A 1 1 0 ${largeArc} 1 ${x2} ${y2} Z`;

        // Calculate label position
      const midPercent = startPercent + slice.value / 2;
      // 0.65 places text slightly closer to center for better fit
      const labelX = Math.cos(2 * Math.PI * (midPercent / 100)) * 0.65; 
      const labelY = Math.sin(2 * Math.PI * (midPercent / 100)) * 0.65;

      return { ...slice, pathData, labelX, labelY };
    });
  };

  const pieSlices = useMemo(() => getPieSlices(pieData), []);

  // Handler for Pop-up
  const handleBarClick = (platformName) => {
    setSelectedPlatform(platformName);
  };

  return (
    <div className="dashboard-container">
      
      {/* Top Stats */}
      <div className="stats-row">
        <div className="dash-card top-card">
          <h3>Total Incidence</h3>
          <div className="card-value">0</div>
        </div>
        <div className="dash-card top-card">
          <h3>Top Social Media Platform</h3>
          <div className="card-value">0</div>
        </div>
        <div className="dash-card top-card">
          <h3>Top Category</h3>
          <div className="card-value">0</div>
        </div>
      </div>

      <div className="charts-row">
        
        {/* --- LINE CHART --- */}
        <div className="dash-card chart-container">
          <div className="chart-header">
            <h3>Incident Trend over Time</h3>
            <div className="year-tabs">
              {['2026', '2025', '2024', '2023'].map(year => (
                <span 
                  key={year} 
                  className={`tab ${activeYear === year ? 'active' : ''}`}
                  onClick={() => setActiveYear(year)}
                >
                  {year}
                </span>
              ))}
            </div>
          </div>
          <div className="big-number">{currentLineData[currentLineData.length-1]}</div>
          
          <div className="line-graph-area">
             {/* Y-Axis Grid Lines */}
             {[100, 75, 50, 25, 0].map((tick, i) => (
                <div key={i} className="grid-line">
                  <span>{tick}</span><hr/>
                </div>
             ))}
             
             {/* Dynamic SVG Line */}
             <svg className="trend-line-svg" viewBox="0 0 500 200" preserveAspectRatio="none">
                <path 
                  d={getLinePath(currentLineData)} 
                  fill="none" 
                  stroke="#C084FC" 
                  strokeWidth="3" 
                  vectorEffect="non-scaling-stroke"
                />
                 {/* Dots on the line */}
                 {currentLineData.map((val, index) => (
                    <circle 
                      key={index}
                      cx={index * 100 + 50} 
                      cy={200 - (val / 100) * 180} 
                      r="4" 
                      fill="#C084FC" 
                      stroke="white" 
                      strokeWidth="2"
                    />
                 ))}
             </svg>

             {/* X-Axis Labels */}
             <div className="x-axis-labels">
               <span>Jan</span><span>Mar</span><span>Jun</span><span>Sep</span><span>Dec</span>
             </div>
          </div>
        </div>

        {/* --- BAR CHART --- */}
        <div className="dash-card chart-container">
          <div className="chart-header">
            <h3>Number of Incidence per Platform</h3>
          </div>
          
          <div className="bar-chart-area">
            {/* Y Axis Labels */}
            <div className="y-axis-column">
              {yAxisTicks.map((tick) => (
                <span key={tick}>{tick}</span>
              ))}
            </div>

            {/* Grid & Bars */}
            <div className="bars-region">
               {/* Background Lines */}
               <div className="bar-grid-lines">
                 {yAxisTicks.map((_, i) => <hr key={i} />)}
               </div>

               {/* The Bars */}
               <div className="bars-wrapper">
                 {barData.map((item) => (
                   <div 
                    key={item.name} 
                    className="bar-group" 
                    onClick={() => handleBarClick(item.name)}
                   >
                     {/* The Bar */}
                     <div className="bar-track">
                       <div 
                         className="bar-fill" 
                         style={{ 
                           height: `${(item.value / maxBarValue) * 100}%`, // Dynamic Height
                           backgroundColor: item.color 
                         }}
                       >
                         <span className="bar-tooltip">{item.value}</span>
                       </div>
                     </div>
                     {/* X-Axis Label */}
                     <span className="x-axis-label">{item.name}</span>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- POP-UP MODAL --- */}
      {selectedPlatform && (
        <div className="pie-modal-overlay" onClick={() => setSelectedPlatform(null)}>
          <div className="pie-card" onClick={(e) => e.stopPropagation()}>
            <div className="pie-header">
              <h3>{selectedPlatform} Breakdown</h3>
            </div>

            {/* 1. Clean SVG Pie Chart (No Text) */}
            <div className="pie-chart-wrapper">
              <svg viewBox="-1 -1 2 2" className="pie-svg">
                {pieSlices.map((slice, index) => (
                  <path 
                    key={index}
                    d={slice.pathData} 
                    fill={slice.color} 
                    stroke="white" 
                    strokeWidth="0.02" 
                  />
                ))}
              </svg>
            </div>

            {/* 2. Legend Section Below Chart */}
            <div className="pie-legend">
              {pieData.map((item) => (
                <div key={item.name} className="legend-row">
                  <div className="legend-info">
                    <span 
                      className="legend-dot" 
                      style={{ backgroundColor: item.color }}
                    ></span>
                    <span className="legend-name">{item.name}</span>
                  </div>
                  <span className="legend-percent">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
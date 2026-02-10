import React, { useState, useMemo } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [activeYear, setActiveYear] = useState('2026');

  // --- 1. COLOR SCHEMES ---
  const lineColors = {
    '2026': '#03045e', 
    '2025': '#0077b6',
    '2024': '#00b4d8',
    '2023': '#90e0ef', 
  };

  // Gradient Palette: Darkest (#03045e) to Lightest (#caf0f8)
  const bluePalette = [
    '#03045e', // Darkest
    '#023e8a', 
    '#0077b6', 
    '#0096c7', 
    '#00b4d8', 
    '#48cae4', 
    '#90e0ef', 
    '#ade8f4', 
    '#caf0f8'  // Lightest
  ];

  // --- 2. DATA SETUP ---
  
  const incidentCategories = [
    "Hate Speech", "Impersonation", "Account Compromise", "Online Child Exploitation",
    "False Information", "E-Commerce Fraud", "Online Sextortion", "Cyber Harassment",
    "Cyber Terrorism", "Data Breach", "Wrongful Suspension", "Obscene Images", "Verification"
  ];
  
  // STEP 1: Generate Raw Data
  const rawCategoryData = incidentCategories.map(cat => ({
    name: cat,
    value: Math.floor(Math.random() * 100) + 10,
  }));

  // STEP 2: Sort by Value (Highest to Lowest)
  rawCategoryData.sort((a, b) => b.value - a.value);

  // STEP 3: Assign Colors based on Rank
  // Top rank = Darkest Blue. Bottom rank = Lightest Blue.
  const categoryData = rawCategoryData.map((item, index) => {
    // Calculate which color to use based on the item's position in the list
    const paletteIndex = Math.floor((index / rawCategoryData.length) * bluePalette.length);
    // Ensure we don't go out of bounds
    const safeIndex = Math.min(paletteIndex, bluePalette.length - 1);
    
    return {
      ...item,
      color: bluePalette[safeIndex]
    };
  });

  const maxCategoryValue = Math.max(...categoryData.map(d => d.value));

  // ... (Rest of data setup remains the same) ...

  const platforms = ['WhatsApp', 'X', 'TikTok', 'Meta', 'Telegram', 'LinkedIn'];
  const tableData = incidentCategories.map(cat => {
    const row = { category: cat };
    platforms.forEach(plat => { row[plat] = Math.floor(Math.random() * 20); });
    return row;
  });

  const barData = [
    { name: 'WhatsApp', value: 1000, color: '#03045e' },
    { name: 'X', value: 6, color: '#023e8a' },
    { name: 'Tiktok', value: 30, color: '#0077b6' },
    { name: 'Meta', value: 2, color: '#0096c7' },
    { name: 'Telegram', value: 15, color: '#00b4d8' },
    { name: 'LinkedIn', value: 90, color: '#48cae4' },
  ];
  const maxBarValue = Math.max(...barData.map(d => d.value));
  const yAxisTicks = [maxBarValue, Math.round(maxBarValue * 0.75), Math.round(maxBarValue * 0.5), Math.round(maxBarValue * 0.25), 0];

  const lineDataByYear = {
    '2026': [10, 30, 45, 80, 100],
    '2025': [20, 50, 30, 60, 90],
    '2024': [5, 15, 10, 25, 40],
    '2023': [60, 55, 70, 40, 20],
  };
  
  const visibleYears = activeYear === 'All' ? ['2023', '2024', '2025', '2026'] : [activeYear];

  const getLinePath = (data) => {
    const maxY = 100; 
    const points = data.map((val, index) => {
      const x = index * 100 + 50; 
      const y = 200 - (val / maxY) * 180; 
      return `${x},${y}`;
    });
    return `M${points.join(' L')}`;
  };

  const pieData = [
    { name: 'Impersonation', value: 10, color: '#00132d' },
    { name: 'False Info', value: 10, color: '#6ab4f1' },
    { name: 'Account Compromise', value: 10, color: '#002d67' },
    { name: 'Data Breach', value: 20, color: '#023e8a' },
    { name: 'Others', value: 50, color: '#0077b6' }
  ];
  
  const getPieSlices = (data) => {
    let cumulativePercent = 0;
    return data.map((slice) => {
      const startPercent = cumulativePercent;
      const endPercent = cumulativePercent + slice.value;
      cumulativePercent += slice.value;
      const x1 = Math.cos(2 * Math.PI * (startPercent / 100));
      const y1 = Math.sin(2 * Math.PI * (startPercent / 100));
      const x2 = Math.cos(2 * Math.PI * (endPercent / 100));
      const y2 = Math.sin(2 * Math.PI * (endPercent / 100));
      const largeArc = slice.value > 50 ? 1 : 0;
      const pathData = `M 0 0 L ${x1} ${y1} A 1 1 0 ${largeArc} 1 ${x2} ${y2} Z`;
      return { ...slice, pathData };
    });
  };
  const pieSlices = useMemo(() => getPieSlices(pieData), []);

  return (
    <div className="dashboard-container">
      
      {/* Top Stats */}
      <div className="stats-row">
        <div className="dash-card top-card">
          <h3>Total Incidence</h3>
          <div className="card-value">1,240</div>
        </div>
        <div className="dash-card top-card">
          <h3>Top Platform</h3>
          <div className="card-value">LinkedIn</div>
        </div>
        <div className="dash-card top-card">
          <h3>Top Category</h3>
          <div className="card-value">Hate Speech</div>
        </div>
      </div>

      {/* --- ROW 1 --- */}
      <div className="charts-row">
        
        {/* LINE CHART */}
        <div className="dash-card chart-container">
          <div className="chart-header">
            <h3>Incident Trend over Time</h3>
            <div className="year-tabs">
              {['All', '2026', '2025', '2024', '2023'].map(year => (
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
          
          <div className="chart-meta-row">
            {activeYear !== 'All' ? (
               <div className="big-number">{lineDataByYear[activeYear][4]}</div>
            ) : (
               <div className="trend-legend">
                 {Object.entries(lineColors).map(([year, color]) => (
                   <div key={year} className="legend-item-small">
                     <span className="legend-dot-small" style={{ backgroundColor: color }}></span>
                     <span className="legend-text-small">{year}</span>
                   </div>
                 ))}
               </div>
            )}
          </div>
          
          <div className="line-graph-area">
             {[100, 75, 50, 25, 0].map((tick, i) => (
                <div key={i} className="grid-line"><span>{tick}</span><hr/></div>
             ))}
             <svg className="trend-line-svg" viewBox="0 0 500 200" preserveAspectRatio="none">
                {visibleYears.map(year => {
                   const data = lineDataByYear[year];
                   const color = lineColors[year];
                   return (
                     <g key={year}>
                        <path d={getLinePath(data)} fill="none" stroke={color} strokeWidth="3" vectorEffect="non-scaling-stroke" style={{ opacity: activeYear === 'All' ? 0.9 : 1 }} />
                        {data.map((val, index) => (
                          <circle key={index} cx={index * 100 + 50} cy={200 - (val / 100) * 180} r={activeYear === 'All' ? 3 : 4} fill={color} stroke="white" strokeWidth="1.5"/>
                        ))}
                     </g>
                   );
                })}
             </svg>
             <div className="x-axis-labels"><span>Jan</span><span>Mar</span><span>Jun</span><span>Sep</span><span>Dec</span></div>
          </div>
        </div>

        {/* HORIZONTAL BARS */}
        <div className="dash-card chart-container scrollable-chart">
            <div className="chart-header">
                <h3>Incidents per Category across all Platforms</h3>
            </div>
            <div className="horizontal-bars-wrapper">
                {categoryData.map((item, index) => (
                    <div key={index} className="h-bar-row">
                        <span className="h-bar-label">{item.name}</span>
                        <div className="h-bar-track">
                            <div 
                                className="h-bar-fill" 
                                style={{ 
                                    width: `${(item.value / maxCategoryValue) * 100}%`,
                                    backgroundColor: item.color // This now correctly relates to the value
                                }}
                            ></div>
                        </div>
                        <span className="h-bar-value">{item.value}</span>
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* --- ROW 2 --- */}
      <div className="charts-row">
        {/* PLATFORM BARS */}
        <div className="dash-card chart-container">
          <div className="chart-header">
            <h3>Number of Incidence per Platform</h3>
          </div>
          <div className="bar-chart-area">
            <div className="y-axis-column">
              {yAxisTicks.map((tick) => <span key={tick}>{tick}</span>)}
            </div>
            <div className="bars-region">
               <div className="bar-grid-lines">{yAxisTicks.map((_, i) => <hr key={i} />)}</div>
               <div className="bars-wrapper">
                 {barData.map((item) => (
                   <div key={item.name} className="bar-group" onClick={() => setSelectedPlatform(item.name)}>
                     <div className="bar-track">
                       <div className="bar-fill" style={{ height: `${(item.value / maxBarValue) * 100}%`, backgroundColor: item.color }}>
                         <span className="bar-tooltip">{item.value}</span>
                       </div>
                     </div>
                     <span className="x-axis-label">{item.name}</span>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </div>

        {/* DATA TABLE */}
        <div className="dash-card chart-container scrollable-chart">
            <div className="chart-header">
                <h3>Detailed Incident Breakdown</h3>
            </div>
            <div className="table-wrapper">
                <table className="incident-table">
                    <thead>
                        <tr>
                            <th>Incident Type</th>
                            {platforms.map(p => <th key={p}>{p}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((row, i) => (
                            <tr key={i}>
                                <td className="row-header">{row.category}</td>
                                {platforms.map(p => <td key={p}>{row[p]}</td>)}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </div>

      {/* MODAL */}
      {selectedPlatform && (
        <div className="pie-modal-overlay" onClick={() => setSelectedPlatform(null)}>
          <div className="pie-card" onClick={(e) => e.stopPropagation()}>
            <div className="pie-header"><h3>{selectedPlatform} Breakdown</h3></div>
            <div className="pie-chart-wrapper">
              <svg viewBox="-1 -1 2 2" className="pie-svg">
                {pieSlices.map((slice, index) => (
                  <path key={index} d={slice.pathData} fill={slice.color} stroke="white" strokeWidth="0.02" />
                ))}
              </svg>
            </div>
            <div className="pie-legend">
              {pieData.map((item) => (
                <div key={item.name} className="legend-row">
                  <div className="legend-info">
                    <span className="legend-dot" style={{ backgroundColor: item.color }}></span>
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
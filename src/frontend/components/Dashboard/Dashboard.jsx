import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [activeYear, setActiveYear] = useState('2026');

  // --- DATA STATE ---
  const [categoryData, setCategoryData] = useState([]);
  const [platformData, setPlatformData] = useState([]); // Vertical Bars
  const [lineDataByYear, setLineDataByYear] = useState({}); // Line Chart
  
  const [totalIncidents, setTotalIncidents] = useState(0);
  const [topCategory, setTopCategory] = useState("Loading...");
  const [topPlatform, setTopPlatform] = useState("Loading...");
  const [exploitationCount, setExploitationCount] = useState(0);

  // --- 1. COLOR SCHEMES ---
  const lineColors = {
    '2026': '#03045e', '2025': '#0077b6', '2024': '#00b4d8', '2023': '#90e0ef',
  };

  const bluePalette = [
    '#03045e', '#023e8a', '#0077b6', '#0096c7', '#00b4d8', '#48cae4', '#90e0ef', '#ade8f4', '#caf0f8'
  ];

  // --- 2. DATA FETCHING ---
  const categoryEndpoints = {
    "Hate Speech": "hate-speech",
    "Impersonation": "impersonation",
    "Account Compromise": "account-compromise",
    "Online Child Exploitation": "online-child-exploitation",
    "False Information": "publication-of-false-information",
    "E-Commerce Fraud": "ecommerce-fraud",
    "Online Sextortion": "online-sextortion",
    "Cyber Harassment": "cyber-harrassment",
    "Cyber Terrorism": "cyber-terrorism",
    "Data Breach": "data-breach",
    "Wrongful Suspension": "wrongful-suspension",
    "Obscene Images": "wrongful-distribution-of-obscene-images",
    "Verification": "verification"
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // A. FETCH CATEGORIES (Horizontal Bars)
        const catKeys = Object.keys(categoryEndpoints);
        const catRequests = catKeys.map(cat => 
          axios.get(`http://localhost:4000/all-incidents/${categoryEndpoints[cat]}`)
        );
        const catResponses = await Promise.all(catRequests);
        
        const processedCats = catKeys.map((cat, index) => ({
          name: cat,
          value: catResponses[index].data,
        }));
        
        // Sort & Color
        processedCats.sort((a, b) => b.value - a.value);
        const coloredCats = processedCats.map((item, index) => {
            const paletteIndex = Math.floor((index / processedCats.length) * bluePalette.length);
            return { ...item, color: bluePalette[Math.min(paletteIndex, bluePalette.length - 1)] };
        });
        setCategoryData(coloredCats);

        // B. FETCH PLATFORMS (Vertical Bars)
        const platRes = await axios.get('http://localhost:4000/all-incidents/platform-stats');
        setPlatformData(platRes.data);

        // C. FETCH TIMELINE (Line Chart)
        const timeRes = await axios.get('http://localhost:4000/all-incidents/timeline');
        // Ensure we have at least empty arrays if data is missing
        const mergedTimeline = {
             '2026': timeRes.data['2026'] || Array(12).fill(0),
             '2025': timeRes.data['2025'] || Array(12).fill(0),
             '2024': timeRes.data['2024'] || Array(12).fill(0),
             '2023': timeRes.data['2023'] || Array(12).fill(0),
        };
        setLineDataByYear(mergedTimeline);

        // D. CALCULATE STATS CARDS
        const total = coloredCats.reduce((acc, curr) => acc + curr.value, 0);
        setTotalIncidents(total);
        if (coloredCats.length > 0) setTopCategory(coloredCats[0].name);
        if (platRes.data.length > 0) setTopPlatform(platRes.data[0].name);
        
        const expItem = coloredCats.find(i => i.name === "Online Child Exploitation");
        setExploitationCount(expItem ? expItem.value : 0);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAllData();
  }, []);

  // --- 3. CHART HELPERS ---
  
  // FIX 1: Prevent -Infinity on Category Data
  const maxCategoryValue = categoryData.length > 0 
    ? Math.max(...categoryData.map(d => d.value)) 
    : 100;

  // FIX 2: Prevent -Infinity on Platform Data (This caused your specific error)
  const maxBarValue = platformData.length > 0 
    ? Math.max(...platformData.map(d => d.value)) 
    : 100;
  
  // Dynamic Y-Axis
  const yAxisTicks = [
     maxBarValue, 
     Math.round(maxBarValue * 0.75), 
     Math.round(maxBarValue * 0.5), 
     Math.round(maxBarValue * 0.25), 
     0
  ];

  const visibleYears = activeYear === 'All' ? ['2023', '2024', '2025', '2026'] : [activeYear];

  // FIX 3: Safe Line Path calculation
  const getLinePath = (data) => {
    if (!data || data.length === 0) return ""; // Return empty path if no data
    
    // Calculate global max safely
    const allValues = Object.values(lineDataByYear).flat();
    const globalMax = allValues.length > 0 ? Math.max(...allValues) : 10;
    
    const stepX = 500 / 11; 
    
    const points = data.map((val, index) => {
      const x = index * stepX; 
      const y = 200 - (val / globalMax) * 180; 
      return `${x},${y}`;
    });
    return `M${points.join(' L')}`;
  };

  // --- DUMMY TABLE DATA (Still needed unless you create a matrix endpoint) ---
  const platforms = ['WhatsApp', 'X', 'TikTok', 'Meta', 'Telegram', 'LinkedIn'];
  const tableData = categoryData.slice(0, 8).map(cat => {
      const row = { category: cat.name };
      platforms.forEach(p => row[p] = Math.floor(Math.random() * 10)); // Placeholder
      return row;
  });

  // --- PIE DATA (Placeholder) ---
  const pieData = [{ name: 'Data', value: 100, color: '#0077b6' }];
  const pieSlices = useMemo(() => {
    // Simple full circle for placeholder
    return [{ pathData: "M 0 0 L 1 0 A 1 1 0 1 1 1 -0.0001 Z", color: "#0077b6" }];
  }, []);


  return (
    <div className="dashboard-container">
      
      {/* Top Stats */}
      <div className="stats-row">
        <div className="dash-card top-card">
          <h3>Total Incidence</h3>
          <div className="card-value">{totalIncidents.toLocaleString()}</div>
        </div>
        <div className="dash-card top-card">
          <h3>Top Platform</h3>
          <div className="card-value">{topPlatform}</div>
        </div>
        <div className="dash-card top-card">
          <h3>Top Category</h3>
          <div className="card-value">{topCategory}</div>
        </div>
        <div className="dash-card top-card">
          <h3>Child Exploitation</h3>
          <div className="card-value">{exploitationCount}</div>
        </div>
      </div>

      {/* --- ROW 1 --- */}
      <div className="charts-row">
        
        {/* LINE CHART (TIMELINE) */}
        <div className="dash-card chart-container">
          <div className="chart-header">
            <h3>Incident Trend (Monthly)</h3>
            <div className="year-tabs">
              {['All', '2026', '2025', '2024'].map(year => (
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
          
          <div className="line-graph-area">
             {/* Grid Lines */}
             {[100, 75, 50, 25, 0].map((tick, i) => (
                <div key={i} className="grid-line"><hr/></div>
             ))}
             
             <svg className="trend-line-svg" viewBox="0 0 500 200" preserveAspectRatio="none">
                {visibleYears.map(year => {
                   const data = lineDataByYear[year];
                   const color = lineColors[year] || '#ccc';
                   if(!data) return null;
                   
                   return (
                     <g key={year}>
                        <path d={getLinePath(data)} fill="none" stroke={color} strokeWidth="3" />
                        {data.map((val, index) => (
                          <circle key={index} cx={index * (500/11)} cy={200 - (val / (Math.max(...Object.values(lineDataByYear).flat()) || 10)) * 180} r={3} fill={color} />
                        ))}
                     </g>
                   );
                })}
             </svg>
             <div className="x-axis-labels">
                <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
             </div>
          </div>
        </div>

        {/* HORIZONTAL BARS (CATEGORIES) */}
        <div className="dash-card chart-container scrollable-chart">
            <div className="chart-header">
                <h3>Incidents per Category</h3>
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
                                    backgroundColor: item.color 
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
            <h3>Total Incidents per Platform</h3>
          </div>
          <div className="bar-chart-area">
            <div className="y-axis-column">
              {yAxisTicks.map((tick) => <span key={tick}>{tick}</span>)}
            </div>
            <div className="bars-region">
               <div className="bar-grid-lines">{yAxisTicks.map((_, i) => <hr key={i} />)}</div>
               <div className="bars-wrapper">
                 {platformData.map((item) => (
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

        {/* DATA TABLE (Still partially dummy) */}
        <div className="dash-card chart-container scrollable-chart">
            <div className="chart-header">
                <h3>Incident Breakdown Matrix</h3>
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
      
    </div>
  );
};

export default Dashboard;
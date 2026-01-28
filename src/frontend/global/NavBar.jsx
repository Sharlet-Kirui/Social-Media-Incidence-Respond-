import React, { useState } from "react";
import { NavLink } from "react-router-dom"; // Using NavLink for active styling
import "./NavBar.css";
import { User, Settings, LogOut } from "lucide-react";

// import CompromisedAccounts from './frontend/components/CompromisedAccounts';

const Navbar = () => {
  return (
    <nav className="navbar"> f
      {/* Brand / Logo */}
      <div className="navbar-logo">MyApp</div>

      {/* Navigation Links */}
      <ul className="nav-links">
        {/* Simple Link */}
        <li className="nav-item">
          <NavLink to="/" className="nav-link">
            DashBoard
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/latestResponded" className="nav-link">
            Latest Responded
          </NavLink>
        </li>

        {/* Incidence Link with Dropdown */}
        <li className="nav-item">
          {/* Note: You can make the main label a link or just a span */}
          <NavLink to="/incidence" className="nav-link">
            Incidence{" "}
            <span style={{ fontSize: "10px", marginLeft: "5px" }}>▼</span>
          </NavLink>

          <ul className="dropdown-menu">
            <li>
              <NavLink to="/incidence/X" className="dropdown-link">
                X
              </NavLink>
            </li>
            <li>
              <NavLink to="/incidence/meta" className="dropdown-link">
                Meta
              </NavLink>
            </li>
            <li>
              <NavLink to="/incidence/telegram" className="dropdown-link">
                Telegram
              </NavLink>
            </li>
            <li>
              <NavLink to="/incidence/tiktok" className="dropdown-link">
                Tiktok
              </NavLink>
            </li>
            <li>
              <NavLink to="/incidence/whatsapp" className="dropdown-link">
                WhatsApp
              </NavLink>
            </li>
            <li>
              <NavLink to="/incidence/linkedIn" className="dropdown-link">
                LinkedIn
              </NavLink>
            </li>
          </ul>
        </li>

        {/* Verification Link with Dropdown */}
        <li className="nav-item">
          <NavLink to="/verification" className="nav-link">
            Verification{" "}
            <span style={{ fontSize: "10px", marginLeft: "5px" }}>▼</span>
          </NavLink>

          <ul className="dropdown-menu">
            <li>
              <NavLink to="/verification/X" className="dropdown-link">
                X
              </NavLink>
            </li>
            <li>
              <NavLink to="/verification/meta" className="dropdown-link">
                Meta
              </NavLink>
            </li>
          </ul>
        </li>

        <li className="nav-item">
          <NavLink to="/CompromisedAccounts" className="nav-link">
            Compromised Accounts
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/governmentOfficials" className="nav-link">
            Government Officials
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/Profile" className="nav-link">
            <User size={18} style={{ marginRight: "6px" }} />
            Profile{" "}
            <span style={{ fontSize: "10px", marginLeft: "5px" }}>▼</span>
          </NavLink>

          <ul className="dropdown-menu">
            <li>
              <NavLink
                to="/Profile"
                className="dropdown-link"
                style={{ display: "flex", alignItems: "center" }}
              >
                <User size={16} style={{ marginRight: "6px" }} />
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Profile/logout"
                className="dropdown-link"
                style={{ display: "flex", alignItems: "center" }}
              >
                <LogOut size={16} style={{ marginRight: "6px" }} />
                Logout
              </NavLink>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

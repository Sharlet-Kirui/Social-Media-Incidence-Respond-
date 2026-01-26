import { useNavigate } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <div className="navbar-logo">Social Watch</div>

      <div className="navbar-links">
        <span>Latest Responded</span>

        <div className="dropdown">
          <span className="active">Incidence ▾</span>
          <div className="dropdown-menu">
            <div onClick={() => navigate("/incidents/x")}>X (Twitter)</div>
            <div onClick={() => navigate("/incidents/meta")}>Meta</div>
            <div onClick={() => navigate("/incidents/telegram")}>Telegram</div>
            <div onClick={() => navigate("/incidents/tiktok")}>TikTok</div>
          </div>
        </div>

        <span>Verification ▾</span>
        <span>Compromised Accounts</span>
        <span>Government Officials</span>
      </div>

      <div className="navbar-settings">⚙️</div>
    </div>
  );
};

export default NavBar;
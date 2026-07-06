import {
  FaHome,
  FaTint,
  FaFileMedical,
  FaSignOutAlt,
  FaSmile,
  FaRobot,
} from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";
import "../style/Sidebar.css";

export default function Sidebar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");

    alert("Logged out successfully!");

    navigate("/", { replace: true });
  };

  return (
    <div className="sidebar">
      {/* Logo */}
      <div className="logo">
        <div className="logoIcon">🌸</div>

        <div>
          <h2>WomenCare</h2>
          <p>Your Health, Our Priority</p>
        </div>
      </div>

      {/* Menu */}
      <ul className="menu">
        <Link to="/" className="menu-link">
          <li>
            <FaHome /> Dashboard
          </li>
        </Link>

        <Link to="/CycleTracker" className="menu-link">
          <li>📅 Cycle Tracker</li>
        </Link>

        <Link to="/MoodTracker" className="menu-link">
          <li>
            <FaSmile /> Mood Tracker
          </li>
        </Link>

        <Link to="/WaterTracker" className="menu-link">
          <li>
            <FaTint /> Water Tracker
          </li>
        </Link>

        {/*<Link to="/Chatbot" className="menu-link">
          <li>
            <FaRobot /> AI Chatbot
          </li>
        </Link>*/}
      </ul>
    </div>
  );
}
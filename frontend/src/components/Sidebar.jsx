import {
  FaHome,
  FaCalendarAlt,
  FaChartLine,
  FaHistory,
  FaFileMedical,
  FaBell,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import "../style/Sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">

      <div className="logo">

        <div className="logoIcon">🌸</div>

        <div>

          <h2>WomenCare</h2>

          <p>Your Health, Our Priority</p>

        </div>

      </div>

      <ul className="menu">

        <li className="active">
          <FaHome />
          Dashboard
        </li>

        <li>
          <FaCalendarAlt />
          Cycle Tracker
        </li>

        <li>
          <FaChartLine />
          Prediction
        </li>

        <li>
          <FaHistory />
          History
        </li>

        <li>
          <FaFileMedical />
          Reports
        </li>

        <li>
          <FaBell />
          Reminders
        </li>

        <li>
          <FaCog />
          Settings
        </li>

      </ul>

      <button className="logout">

        <FaSignOutAlt />

        Logout

      </button>

    </div>
  );
}
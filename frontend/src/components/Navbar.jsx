import { FaSearch, FaBell } from "react-icons/fa";
import "../style/Navbar.css";

function Navbar() {
  const email = localStorage.getItem("email");

  return (
    <div className="navbar">
      <div className="search-box">
        <FaSearch className="search-icon" />
        <input type="text" placeholder="Search anything..." />
      </div>

      <div className="navbar-right">
        <div className="notification">
          <FaBell />
          <span className="badge">3</span>
        </div>

        <div className="profile">
          <div className="avatar">👩</div>

          <div>
            <h4>Hello,</h4>
            <p>{email || "User"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
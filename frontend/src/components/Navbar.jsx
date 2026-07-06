import { FaSearch, FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../style/Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");

    alert("Logged out successfully!");
    navigate("/", { replace: true });
  };

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
            <p>{email || "Guest"}</p>
          </div>
        </div>

        {token ? (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <button
            className="login-btn"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../style/Dashboard.css";
import Navbar from "../components/Navbar";
function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");

    alert("Logged out successfully!");

    navigate("/", { replace: true });
  };

  return (
    <div className="dashboard">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="main-content">
        {/* Navbar */}
        <Navbar />
        <div className="dashboard-header">

          <div>
            <h1>Hello, Unnati 👋</h1>
            <p>Here's what's happening with your health today.</p>
          </div>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>

        </div>

        {/* Cards */}

        <div className="cards">

          <Link to="/CycleTracker" className="dashboard-card">

            <h2>📅 Menstrual Tracker</h2>

            <p>
              Track your cycle and predict your next period.
            </p>

          </Link>

          <Link to="/SymptomChecker" className="dashboard-card">

            <h2>🩺 AI Symptom Checker</h2>

            <p>
              Check symptoms using AI-powered suggestions.
            </p>

          </Link>

          <Link to="/HealthRecords" className="dashboard-card">

            <h2>📋 Health Records</h2>

            <p>
              Manage all your medical records securely.
            </p>

          </Link>

        </div>

        {/* Health Tip */}

        <div className="tip-card">

          <h2>🌸 Daily Health Tips</h2>

          <ul>

            <li>🥗 Eat iron-rich foods.</li>

            <li>💧 Drink 2–3 litres of water.</li>

            <li>🏃 Exercise for 30 minutes.</li>

            <li>😴 Sleep at least 8 hours.</li>

            <li>🩺 Schedule regular checkups.</li>

          </ul>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;
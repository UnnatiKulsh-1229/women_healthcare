import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../style/Dashboard.css";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useState } from "react";
function Dashboard() {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const userName = email ? email.split("@")[0] : "User";

  const [cycleData, setCycleData] = useState(null);

  useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/");
    return;
  }

  fetchCycleData();

}, []);
const fetchCycleData = async () => {

  try {

    const email = localStorage.getItem("email");

    const response = await axios.get(
      `http://localhost:5000/api/cycle/latest/${email}`
    );

    setCycleData(response.data);

  } catch (err) {

    console.log(err);
  }
};
  const calculateCycleDay = () => {
  if (!cycleData?.last_period) return "--";

  const today = new Date();
  const lastPeriod = new Date(cycleData.last_period);

  const diffTime = today - lastPeriod;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  return diffDays + 1;
};
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");

    alert("Logged out successfully!");

    navigate("/", { replace: true });
  };
  /*const fetchCycleData = async () => {
  try {
    const email = localStorage.getItem("email");

    const response = await axios.get(
      `http://localhost:5000/api/cycle/latest/${email}`
    );

    setCycleData(response.data);
  } catch (err) {
    console.log(err);
  }
};*/

  return (
    <div className="dashboard">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="main-content">
        {/* Navbar */}
        <Navbar />
        <div className="hero">

  <div className="hero-left">
    <h1>Hello, {userName} 👋</h1>
    <p>Here's what's happening with your cycle today.</p>
  </div>

  <div className="cycle-day">
    <span>📅</span>
    <div>
      <small>Today is</small>
      <h3>Cycle Day {calculateCycleDay()}</h3>
    </div>
  </div>
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
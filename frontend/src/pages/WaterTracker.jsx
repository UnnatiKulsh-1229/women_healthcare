import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../style/WaterTracker.css";
import { useState,useEffect } from "react";
import axios from "axios";
function WaterTracker() {
  const [goal] = useState(8);
  const [glasses, setGlasses] = useState(0);
  useEffect(() => {
  fetchWater();
}, []);

const fetchWater = async () => {
  const today = new Date().toISOString().split("T")[0];

  try {
    const res = await axios.get(
      `http://localhost:5000/api/water/today/${email}/${today}`
    );

    setGlasses(res.data.glasses);
  } catch (err) {
    console.log(err);
  }
};
const saveWater = async (count) => {
  const today = new Date().toISOString().split("T")[0];

  try {
    await axios.post(
      "http://localhost:5000/api/water/save",
      {
        user_email: email,
        water_date: today,
        glasses: count,
        goal,
      }
    );
  } catch (err) {
    console.log(err);
  }
};

  const addGlass = () => {
  if (glasses < goal) {
    const value = glasses + 1;
    setGlasses(value);
    saveWater(value);
  }
};

  const removeGlass = () => {
  if (glasses > 0) {
    const value = glasses - 1;
    setGlasses(value);
    saveWater(value);
  }
};

  const percentage = (glasses / goal) * 100;

  return (
    <div className="dashboard">

      <Sidebar />

      <div className="main-content">

        <Navbar />

        <div className="water-container">

          <h1>💧 Water Tracker</h1>

          <h2>
            {glasses} / {goal} Glasses
          </h2>

          <div className="progress-bar">

            <div
              className="progress-fill"
              style={{ width: `${percentage}%` }}
            ></div>

          </div>

          <div className="glass-container">
            {Array.from({ length: glasses }).map((_, index) => (
              <span key={index}>🥤</span>
            ))}
          </div>

          <div className="buttons">

            <button onClick={addGlass}>
              + Add Glass
            </button>

            <button onClick={removeGlass}>
              − Remove Glass
            </button>

          </div>

          <h3>
            {glasses === goal
              ? "🎉 Goal Completed!"
              : "Keep yourself hydrated 💙"}
          </h3>

        </div>

      </div>

    </div>
  );
}
const email = localStorage.getItem("email");
export default WaterTracker;

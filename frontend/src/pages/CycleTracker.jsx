import { useState } from "react";
import "../style/CycleTracker.css";
import axios from "axios";
const userEmail = localStorage.getItem("email");
function Tracker() {
  const [lastPeriod, setLastPeriod] = useState("");
  const [cycleLength, setCycleLength] = useState(28);

  const [nextPeriod, setNextPeriod] = useState("");
  const [ovulationDay, setOvulationDay] = useState("");
  const [fertileStart, setFertileStart] = useState("");
  const [fertileEnd, setFertileEnd] = useState("");
  const [daysRemaining, setDaysRemaining] = useState("");
  const [cycleStatus, setCycleStatus] = useState("");

  const calculatePrediction = () => {
    if (!lastPeriod) {
      alert("Please select your last period date.");
      return;
    }

    const last = new Date(lastPeriod);

    // Next Period
    const next = new Date(last);
    next.setDate(next.getDate() + Number(cycleLength));

    // Ovulation
    const ovulation = new Date(next);
    ovulation.setDate(ovulation.getDate() - 14);

    // Fertile Window
    const fertileS = new Date(ovulation);
    fertileS.setDate(fertileS.getDate() - 5);

    const fertileE = new Date(ovulation);

    // Days Remaining
    const today = new Date();

    const diff = Math.max(
      0,
      Math.ceil((next - today) / (1000 * 60 * 60 * 24))
    );

    // Cycle Status
    let status = "";

    if (cycleLength >= 21 && cycleLength <= 35) {
      status = "Normal Cycle";
    } else {
      status = "Irregular Cycle";
    }

    setNextPeriod(next.toISOString().split("T")[0]);
    setOvulationDay(ovulation.toISOString().split("T")[0]);
    setFertileStart(fertileS.toISOString().split("T")[0]);
    setFertileEnd(fertileE.toISOString().split("T")[0]);
    setDaysRemaining(diff);
    setCycleStatus(status);
  };

 const savePrediction = async () => {

  try {

    const response = await axios.post(
      "http://localhost:5000/api/cycle/add",
      {
        user_email: userEmail,
        last_period: lastPeriod,
        cycle_length: cycleLength,
        next_period: nextPeriod,
        ovulation_day: ovulationDay,
        fertile_start: fertileStart,
        fertile_end: fertileEnd,
        cycle_status: cycleStatus
      }
    );

    alert(response.data.message);

  } catch (error) {

    console.log(error);

    alert("Error saving prediction");

  }
};
  return (
    <div className="tracker-container">

      <div className="tracker-card">

        <h1>🌸 Cycle Prediction</h1>

        <label>Last Period Date</label>

        <input
          type="date"
          value={lastPeriod}
          onChange={(e) => setLastPeriod(e.target.value)}
        />

        <label>Average Cycle Length (Days)</label>

        <input
          type="number"
          value={cycleLength}
          onChange={(e) => setCycleLength(e.target.value)}
        />

        <button
          className="predict-btn"
          onClick={calculatePrediction}
        >
          Predict
        </button>

        {nextPeriod && (

          <div className="prediction-section">

            <div className="prediction-card">
              <h3>🌸 Next Period</h3>
              <p>{new Date(nextPeriod).toDateString()}</p>
              <p>{nextPeriod}</p>
            </div>

            <div className="prediction-card">
              <h3>🥚 Ovulation Day</h3>
              <p>{ovulationDay}</p>
            </div>

            <div className="prediction-card">
              <h3>💖 Fertile Window</h3>
              <p>{fertileStart}</p>
              <p>to</p>
              <p>{fertileEnd}</p>
            </div>

            <div className="prediction-card">
              <h3>⏳ Days Remaining</h3>
              <p>{daysRemaining} Days</p>
            </div>

            <div className="prediction-card">
              <h3>✅ Cycle Status</h3>
              <p>{cycleStatus}</p>
            </div>

            <button
    className="save-btn"
    onClick={savePrediction}
>
    Save Prediction
</button>

          </div>

        )}

      </div>

    </div>
  );
}

export default Tracker;
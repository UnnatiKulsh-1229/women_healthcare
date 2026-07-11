import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../style/Analysis.css";
import { Pie } from "react-chartjs-2";
import { useEffect, useState } from "react";
import axios from "axios";
import {
Chart as ChartJS,
ArcElement,
Tooltip,
Legend
} from "chart.js";
ChartJS.register(
ArcElement,
Tooltip,
Legend
);


function Analysis() {
    const [moodData, setMoodData] = useState([]);
    const email = localStorage.getItem("email");
    const pieData = {
  labels: moodData.map(item => item.mood),
  datasets: [
    {
      label: "Mood",
      data: moodData.map(item => item.count),

      backgroundColor: [
        "#11f318",   // Happy
        "#09f0f8",   // Calm
        "#FFC107",   // Sad
        "#F44336",   // Angry
        "#9C27B0",   // Anxious
        "#cf0893"    // Tired
      ],

      borderWidth: 1,
    },
  ],
};
const options = {
  responsive: true,
  maintainAspectRatio: false,
};
const fetchMood = async () => {
const res = await axios.get(
`http://localhost:5000/api/analysis/mood/${email}`
);
setMoodData(res.data);
};
  useEffect(() => {
fetchMood();
fetchCycle();
fetchHealthRecords();
fetchInsights();
}, []);
//for cycle analysis
const [cycleData, setCycleData] = useState({});
const fetchCycle = async () => {
    try {
        const res = await axios.get(
            `http://localhost:5000/api/analysis/cycle/${email}`
        );
        setCycleData(res.data);
    } catch (err) {
        console.log(err);
    }
};
// for health record
const [recordData, setRecordData] = useState([]);
const fetchHealthRecords = async () => {
    try {
        const res = await axios.get(
            `http://localhost:5000/api/analysis/healthrecords/${email}`
        );
        setRecordData(res.data);
    } catch (err) {
        console.log(err);
    }
};
const recordPieData = {
    labels: recordData.map(item => item.category),
    datasets: [
        {
            label: "Health Records",
            data: recordData.map(item => item.count),
            backgroundColor: [
                "#42A5F5",
                "#66BB6A",
                "#FFA726",
                "#EF5350",
                "#AB47BC",
                "#26C6DA"
            ],
            borderWidth: 1
        }
    ]
};
// AI insight
const [insights, setInsights] = useState({});
const fetchInsights = async () => {
    try{
        const res = await axios.get(
            `http://localhost:5000/api/analysis/insights/${email}`
        );
        setInsights(res.data);
    }catch(err){
        console.log(err);
    }
};
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="analysis-container">
          <h1>📊 Health Analysis Dashboard</h1>
          <div className="analysis-grid">
            <div className="analysis-card">
              <h2>😊 Mood Distribution</h2>
              {moodData.length > 0 ? (
    <div className="pie-chart">
  <Pie data={pieData} options={options} />
</div>
) : (
    <p>No mood data available.</p>
)}
            </div>
            <div className="analysis-card">
              <h2>📅 Cycle Summary</h2>

              <table>
  <tbody>

    <tr>
      <td>Average Cycle</td>
      <td>{cycleData.averageCycle || "-"} Days</td>
    </tr>

    <tr>
      <td>Longest Cycle</td>
      <td>{cycleData.longestCycle || "-"} Days</td>
    </tr>

    <tr>
      <td>Shortest Cycle</td>
      <td>{cycleData.shortestCycle || "-"} Days</td>
    </tr>

    <tr>
      <td>Last Period</td>
      <td>{cycleData.lastPeriod || "-"}</td>
    </tr>

    <tr>
      <td>Next Period</td>
      <td>{cycleData.nextPeriod || "-"}</td>
    </tr>

    <tr>
      <td>Ovulation Day</td>
      <td>{cycleData.ovulationDay || "-"}</td>
    </tr>

    <tr>
      <td>Cycle Status</td>
      <td>{cycleData.cycleStatus || "-"}</td>
    </tr>

  </tbody>
</table>

            </div>

            

            <div className="analysis-card">
              <h2>📁 Health Records</h2>

              <div className="pie-chart">
    {recordData.length > 0 ? (
        <Pie data={recordPieData} options={options} />
    ) : (
        <p>No health records uploaded.</p>
    )}
</div>
            </div>
          </div>
          <div className="insight-card">
            <h2>🤖 AI Health Insights</h2>
            <ul>
  <li>
    {insights.avgCycle >= 35
      ? "⚠️ Your average cycle is longer than typical. Consider consulting a healthcare professional if this pattern continues."
      : "✅ Your average cycle length appears to be within a typical range."}
  </li>

  <li>
    {insights.topMood === "Anxious"
      ? "💙 You've been feeling anxious most often. Consider relaxation exercises or speaking with someone you trust."
      : `😊 Your most common mood has been ${insights.topMood || "not enough data"} .`}
  </li>

  <li>
    {insights.topCategory
      ? `📁 You've uploaded mostly ${insights.topCategory} records. Keeping your medical documents organized is a great habit.`
      : "📁 Upload your health records to get more personalized insights."}
  </li>
</ul>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Analysis;
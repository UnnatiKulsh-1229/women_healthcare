import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../style/Analysis.css";

function Analysis() {

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
              <p>Pie Chart will appear here</p>
            </div>

            <div className="analysis-card">
              <h2>📅 Cycle Summary</h2>

              <table>
                <tbody>
                  <tr>
                    <td>Average Cycle</td>
                    <td>29 Days</td>
                  </tr>

                  <tr>
                    <td>Longest Cycle</td>
                    <td>31 Days</td>
                  </tr>

                  <tr>
                    <td>Shortest Cycle</td>
                    <td>27 Days</td>
                  </tr>

                  <tr>
                    <td>Status</td>
                    <td>Regular</td>
                  </tr>

                </tbody>
              </table>

            </div>

            <div className="analysis-card">
              <h2>🤒 Symptom Distribution</h2>
              <p>Pie Chart will appear here</p>
            </div>

            <div className="analysis-card">
              <h2>📁 Health Records</h2>

              <table>
                <tbody>
                  <tr>
                    <td>Blood Reports</td>
                    <td>3</td>
                  </tr>

                  <tr>
                    <td>Prescriptions</td>
                    <td>5</td>
                  </tr>

                  <tr>
                    <td>Scans</td>
                    <td>2</td>
                  </tr>

                </tbody>
              </table>

            </div>

          </div>

          <div className="insight-card">

            <h2>🤖 AI Health Insights</h2>

            <ul>
              <li>Your cycle has remained regular over the past few months.</li>
              <li>Your most frequently reported mood is Happy.</li>
              <li>Cramps are your most common symptom.</li>
            </ul>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Analysis;
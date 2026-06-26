import { useState } from "react";

function CycleTracker() {
  const [cycle, setCycle] = useState({
    lastPeriod: "",
    cycleLength: "",
  });

  const handleChange = (e) => {
    setCycle({
      ...cycle,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Cycle information saved!");
    console.log(cycle);
  };

  return (
    <div style={styles.container}>
      <h1>Menstrual Cycle Tracker</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        <label>Last Period Date</label>

        <input
          type="date"
          name="lastPeriod"
          value={cycle.lastPeriod}
          onChange={handleChange}
          required
        />

        <label>Cycle Length (Days)</label>

        <input
          type="number"
          name="cycleLength"
          value={cycle.cycleLength}
          onChange={handleChange}
          placeholder="28"
          required
        />

        <button>Save</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "40px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "350px",
    margin: "auto",
    gap: "15px",
  },
};

export default CycleTracker;
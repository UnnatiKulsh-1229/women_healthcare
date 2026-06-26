import { useState } from "react";

function HealthRecords() {
  const [record, setRecord] = useState({
    date: "",
    notes: "",
  });

  const handleChange = (e) => {
    setRecord({
      ...record,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Record Saved!");

    console.log(record);
  };

  return (
    <div style={styles.container}>
      <h1>Health Records</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="date"
          name="date"
          value={record.date}
          onChange={handleChange}
          required
        />

        <textarea
          rows="6"
          name="notes"
          placeholder="Enter health notes..."
          value={record.notes}
          onChange={handleChange}
          required
        ></textarea>

        <button>Save Record</button>
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
    width: "450px",
    margin: "auto",
    gap: "20px",
  },
};

export default HealthRecords;
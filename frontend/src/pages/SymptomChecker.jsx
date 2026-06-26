import { useState } from "react";

function SymptomChecker() {
  const [symptoms, setSymptoms] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Symptoms submitted for AI analysis.");

    console.log(symptoms);
  };

  return (
    <div style={styles.container}>
      <h1>AI Symptom Checker</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        <textarea
          rows="8"
          placeholder="Enter symptoms here..."
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
        ></textarea>

        <button>Analyze Symptoms</button>
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
    width: "500px",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
};

export default SymptomChecker;
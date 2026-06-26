import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <h1>🌸 Women's Healthcare Dashboard</h1>
        <p>Welcome! Take charge of your health with AI-powered insights.</p>
      </header>

      {/* Cards */}
      <div style={styles.cardContainer}>
        <Link to="/tracker" style={styles.card}>
          <h2>📅 Menstrual Tracker</h2>
          <p>
            Track your menstrual cycle, predict your next period, and monitor
            your health.
          </p>
        </Link>

        <Link to="/symptoms" style={styles.card}>
          <h2>🩺 AI Symptom Checker</h2>
          <p>
            Enter your symptoms and receive AI-generated health suggestions.
          </p>
        </Link>

        <Link to="/records" style={styles.card}>
          <h2>📋 Health Records</h2>
          <p>
            Save and manage your medical history and health notes securely.
          </p>
        </Link>
      </div>

      {/* Health Tips */}
      <div style={styles.tipBox}>
        <h2>💡 Daily Health Tips</h2>

        <ul style={styles.list}>
          <li>🥗 Eat a balanced diet rich in iron and calcium.</li>
          <li>💧 Drink at least 2–3 litres of water every day.</li>
          <li>🏃 Exercise for at least 30 minutes daily.</li>
          <li>😴 Get 7–8 hours of quality sleep.</li>
          <li>🩺 Schedule regular health check-ups.</li>
        </ul>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>© 2026 Women's Healthcare AI System</p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f4f7fb",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
  },

  header: {
    textAlign: "center",
    marginBottom: "40px",
  },

  cardContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    flexWrap: "wrap",
    marginBottom: "50px",
  },

  card: {
    width: "280px",
    padding: "25px",
    borderRadius: "12px",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    textDecoration: "none",
    color: "#333",
    transition: "0.3s",
  },

  tipBox: {
    maxWidth: "800px",
    margin: "0 auto",
    backgroundColor: "#ffffff",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  },

  list: {
    lineHeight: "2",
    fontSize: "17px",
  },

  footer: {
    textAlign: "center",
    marginTop: "40px",
    color: "#666",
  },
};

export default Dashboard;
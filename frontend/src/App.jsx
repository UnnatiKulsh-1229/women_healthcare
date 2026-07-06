import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CycleTracker from "./pages/CycleTracker";
import HealthRecords from "./pages/HealthRecords";
import MoodTracker from "./pages/MoodTracker";
import WaterTracker from "./pages/WaterTracker";
import Chatbot from "./pages/Chatbot";
import ProtectedRoute from "./components/protect_route";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/*  Public Routes  */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/*  Protected Routes  */}
        <Route
          path="/CycleTracker"
          element={
            <ProtectedRoute>
              <CycleTracker />
            </ProtectedRoute>
          }
        />

        <Route
          path="/MoodTracker"
          element={
            <ProtectedRoute>
              <MoodTracker />
            </ProtectedRoute>
          }
        />

        <Route
        path="/WaterTracker"
        element={
          <ProtectedRoute>
            <WaterTracker />
          </ProtectedRoute>
        }
      />

        <Route
          path="/Chatbot"
          element={
            <ProtectedRoute>
              <Chatbot />
            </ProtectedRoute>
          }
        />
        <Route
          path="/HealthRecords"
          element={
            <ProtectedRoute>
              <HealthRecords />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
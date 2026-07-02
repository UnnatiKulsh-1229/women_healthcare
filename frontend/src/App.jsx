import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CycleTracker from "./pages/CycleTracker";
import SymptomChecker from "./pages/SymptomChecker";
import HealthRecords from "./pages/HealthRecords";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/CycleTracker" element={<CycleTracker />} />
        <Route path="/SymptomChecker" element={<SymptomChecker />} />
        <Route path="/HealthRecords" element={<HealthRecords />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
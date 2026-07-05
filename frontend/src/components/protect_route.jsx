import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {
  const email = localStorage.getItem("email");
  const location = useLocation();

  if (!email) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
}

export default ProtectedRoute;
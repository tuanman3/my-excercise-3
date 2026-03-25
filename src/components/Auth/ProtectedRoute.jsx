import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (!isLoggedIn) {
    // Redirect to login and replace browser history for can't "Back" again
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

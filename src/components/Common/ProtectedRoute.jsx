import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

/**
  protected route — read login state from Redux instead localStorage directly.
**/
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;

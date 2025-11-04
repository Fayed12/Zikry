// react router
import { Navigate } from "react-router";

function ProtectedRoutes({ children }) {
  const loginStatus =
    sessionStorage.getItem("loginStatus") ||
    localStorage.getItem("loginStatus");

  if (loginStatus === "false" || !loginStatus) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoutes;

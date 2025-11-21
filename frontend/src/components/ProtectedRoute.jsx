import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const Token = localStorage.getItem("adminToken");

  if (!Token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

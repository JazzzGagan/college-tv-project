import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  let admin;

  try {
    admin = JSON.parse(localStorage.getItem("adminAuth"));
  } catch {
    admin = null;
  }

  if (!admin) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

import { Navigate, useLocation } from "react-router-dom";
import LoadingSpinner from "./common/LoadingSpinner";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, requiredRole }) {
  const location = useLocation();
  const { isLoading, isAuthenticated, userRole } = useAuth();

  if (isLoading) {
    return <LoadingSpinner message="Checking your session..." />;
  }

  if (!isAuthenticated) {
    const redirectTarget = encodeURIComponent(
      `${location.pathname}${location.search}`,
    );
    return <Navigate to={`/auth?redirect=${redirectTarget}`} replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}

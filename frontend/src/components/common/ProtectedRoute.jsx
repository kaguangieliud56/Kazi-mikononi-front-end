import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * ProtectedRoute
 * Wraps any route that requires authentication.
 *
 * - While auth is loading (token verification in progress) → shows a spinner
 * - If not authenticated → redirects to /login, preserving the intended URL
 *   in location.state so the Login page can redirect back after success.
 * - If authenticated → renders children
 *
 * Usage in App.jsx:
 *   <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="route-loader">
        <div className="spinner" />
        <p>Verifying session…</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;

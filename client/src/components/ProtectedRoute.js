import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

/**
 * Protected Route - Redirects to admin login if not authenticated
 */
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  const location = useLocation();

  if (!token) {
    // Redirect to admin login, save intended destination
    return <Navigate to="/admin" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;

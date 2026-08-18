import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { Role } from '../types';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: Role[];
}

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated || !user) {
    // Redirect unauthenticated users to the specific portal login
    if (location.pathname.startsWith('/admin')) {
      return <Navigate to="/admin/login" replace />;
    }
    if (location.pathname.startsWith('/teacher')) {
      return <Navigate to="/teacher/login" replace />;
    }
    if (location.pathname.startsWith('/parent')) {
      return <Navigate to="/parent/login" replace />;
    }
    return <Navigate to="/portal" replace />;
  }

  // Verify Role Authorization
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to Access Denied 403 screen instead of silently loading wrong role dashboard
    return <Navigate to="/access-denied" replace />;
  }

  return <>{children}</>;
};

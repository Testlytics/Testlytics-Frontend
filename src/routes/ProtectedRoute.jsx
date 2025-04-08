// src/routes/ProtectedRoute.jsx

import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import {
  isAuthenticatedState,
  userRoleState,
  authLoadingState
} from '../states/UserState';

const ProtectedRoute = ({ allowedRoles, children }) => {
  const isAuthenticated = useRecoilValue(isAuthenticatedState);
  const userRole = useRecoilValue(userRoleState);
  const isLoading = useRecoilValue(authLoadingState);

  if (isLoading) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;

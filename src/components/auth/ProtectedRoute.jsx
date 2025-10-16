import { Navigate } from 'react-router-dom';

import { PATHS } from '@/app/routes/paths';
import { useAuthStore } from '@/stores/authStore';

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to={PATHS.AUTH} replace />;
  }

  return children;
};

export default ProtectedRoute;

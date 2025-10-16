import { Navigate } from 'react-router-dom';

import { PATHS } from '@/app/routes/paths';
import { useAuthStore } from '@/stores/authStore';

export const ProtectedRoute = ({ children }) => {
  const { checkAuth } = useAuthStore();

  // 인증 상태 체크 (렌더링 시점에만)
  if (!checkAuth()) {
    return <Navigate to={PATHS.AUTH} replace />;
  }

  return children;
};

export default ProtectedRoute;

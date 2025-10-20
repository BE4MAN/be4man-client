import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { userAPI } from '@/api/user';
import PageSkeleton from '@/components/feedback/PageSkeleton';
import { useAuthStore } from '@/stores/authStore';

import { PATHS } from './paths';

export const ProtectedRoute = ({ children }) => {
  const { accessToken, refreshToken, user, isLoading } = useAuthStore();

  useEffect(() => {
    const loadUserIfNeeded = async () => {
      if (!isLoading && accessToken && refreshToken && !user) {
        try {
          const userData = await userAPI.fetchUserInfo();
          useAuthStore.getState().setUser(userData);
        } catch (error) {
          console.error('사용자 정보 로드 실패:', error);
          useAuthStore.getState().logout();
        }
      }
    };

    loadUserIfNeeded();
  }, [accessToken, refreshToken, user, isLoading]);

  // Hydration 대기 중
  if (isLoading) {
    return <PageSkeleton />;
  }

  // 토큰 없으면 로그인 페이지로
  if (!accessToken || !refreshToken) {
    return <Navigate to={PATHS.AUTH} replace />;
  }

  return children;
};

export default ProtectedRoute;

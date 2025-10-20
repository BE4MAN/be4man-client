import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import axiosInstance from '@/api/axios';
import { PATHS } from '@/app/routes/paths';
import PageSkeleton from '@/components/feedback/PageSkeleton';
import { API_ENDPOINTS } from '@/config/api';
import { useAuthStore } from '@/stores/authStore';

export const ProtectedRoute = ({ children }) => {
  const { accessToken, refreshToken, user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  // Zustand persist hydration 체크 (localStorage 로드 완료 여부)
  const hasHydrated = useAuthStore.persist.hasHydrated();

  useEffect(() => {
    const loadUserIfNeeded = async () => {
      // 토큰은 있지만 user가 없으면 서버에서 가져오기
      if (accessToken && refreshToken && !user) {
        try {
          const { data } = await axiosInstance.get(API_ENDPOINTS.ME);
          useAuthStore.getState().setUser(data);
        } catch (error) {
          console.error('사용자 정보 로드 실패:', error);
          useAuthStore.getState().logout();
        }
      }
      setIsLoading(false);
    };

    loadUserIfNeeded();
  }, [accessToken, refreshToken, user]);

  // Hydration 대기 중 (localStorage에서 데이터 로드 중)
  if (!hasHydrated || isLoading) {
    return <PageSkeleton />;
  }

  // 토큰 없으면 로그인 페이지로
  if (!accessToken || !refreshToken) {
    return <Navigate to={PATHS.AUTH} replace />;
  }

  // user 로드 중
  if (!user) {
    return <PageSkeleton />;
  }

  return children;
};

export default ProtectedRoute;

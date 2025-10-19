import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { PATHS } from '@/app/routes/paths';
import PageSkeleton from '@/components/feedback/PageSkeleton';
import { useAuth } from '@/hooks/useAuth';
import { useAuthStore } from '@/stores/authStore';

export const ProtectedRoute = ({ children }) => {
  const { accessToken, user, checkAuth } = useAuthStore();
  const { fetchUserInfo } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadUserIfNeeded = async () => {
      // accessToken은 있지만 user가 없으면 서버에서 가져오기
      if (accessToken && !user) {
        try {
          await fetchUserInfo(); // GET /api/accounts/me
        } catch (error) {
          console.error('사용자 정보 로드 실패:', error);
          // 컴포넌트가 마운트된 상태에서만 로그아웃 처리
          if (isMounted) {
            useAuthStore.getState().logout();
          }
        }
      }
      // 컴포넌트가 마운트된 상태에서만 로딩 상태 변경
      if (isMounted) {
        setIsLoading(false);
      }
    };

    loadUserIfNeeded();

    // cleanup: 컴포넌트 언마운트 시 플래그 변경
    return () => {
      isMounted = false;
    };
  }, [accessToken, user, fetchUserInfo]);

  // 로딩 중
  if (isLoading) {
    return <PageSkeleton />;
  }

  // 인증 체크 실패
  if (!checkAuth()) {
    return <Navigate to={PATHS.AUTH} replace />;
  }

  return children;
};

export default ProtectedRoute;

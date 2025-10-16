import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { PATHS } from '@/app/routes/paths';
import { useAuthStore } from '@/stores/authStore';

export const useAuth = () => {
  const navigate = useNavigate();
  const { setUser, clearUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const loginWithGithub = async () => {
    setIsLoading(true);
    try {
      // TODO: 실제 GitHub OAuth 로직 구현
      // 현재는 시뮬레이션
      await new Promise((resolve) => setTimeout(resolve, 300));

      // GitHub에서 받아온 데이터 시뮬레이션
      const githubUser = {
        id: 'github_user_id',
        email: 'user@github.com',
        avatar: 'https://github.com/ghost.png',
      };

      return githubUser;
    } catch (error) {
      console.error('GitHub login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const completeRegistration = async (userData) => {
    setIsLoading(true);
    try {
      // TODO: API 호출하여 사용자 정보 저장
      await new Promise((resolve) => setTimeout(resolve, 100));

      const user = {
        ...userData,
        createdAt: new Date().toISOString(),
      };

      setUser(user);

      // Deploy 페이지로 리다이렉트
      setTimeout(() => {
        navigate(PATHS.DEPLOY);
      }, 500);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    clearUser();
    navigate(PATHS.AUTH);
  };

  return {
    loginWithGithub,
    completeRegistration,
    logout,
    isLoading,
  };
};
